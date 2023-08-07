import { Client, Interaction } from "discord.js";
import commands from "@commands/index";
import { Maybe } from "../types/Maybe";
import { SlashCommand, Session } from "@interfaces/index";
import { FinishButton } from "@components/FinishButton";
import { SessionStore } from "@data/SessionStore";

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
      if (SessionStore.has(interaction.user.id)) {
        // TODO: handle when user has an active session, and starts another one
        console.log("User has an active session");
      }

      slashCommand.execute(client, interaction);
    } else if (interaction.isButton()) {
      if (interaction.customId.startsWith("finish")) {
        const session: Maybe<Session> = SessionStore.get(interaction.user.id);
        if (session === undefined) return;
        FinishButton.execute(session);
        SessionStore.delete(interaction.user.id);
      }
    }
  });
};
