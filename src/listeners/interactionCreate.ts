import { Client, Interaction } from "discord.js";
import commands from "@commands/index";
import { Maybe } from "../types/Maybe";
import { SlashCommand } from "@interfaces/index";
import { sessionStore } from "@data/SessionStore";
import { PomodoroTimer } from "src/PomodoroTimer";

export const interactionCreate = (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isChatInputCommand()) {
      const slashCommand: Maybe<SlashCommand> = commands.find(
        (c) => c.name === interaction.commandName
      );

      if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
      }
      if (sessionStore.has(interaction.user.id)) {
        // TODO: handle when user has an active session, and starts another one
        console.log("User has an active session");
      }
      else {
        slashCommand.execute(client, interaction);
      }
    } else if (interaction.isButton()) {
      const pomodoroTimer: Maybe<PomodoroTimer> = sessionStore.get(interaction.user.id);
      if (!pomodoroTimer) {
        // Since there is no other way that a button interaction would be
        // registered outside of a pomodoro session, this should never happen
        throw new Error("Pomodoro timer not found for user " + interaction.user);
      }
      pomodoroTimer.buttonHandlers.get(interaction.customId)?.(interaction);
    }
  });
};
