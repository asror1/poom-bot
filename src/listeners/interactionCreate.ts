import { ChatInputCommandInteraction, Client, Interaction } from "discord.js";
import { sessionStore } from "@data";
import { Timer } from "../Timer";
import dotenv from "dotenv";
import { logger, Maybe } from "@utils";
import { ExecutableCommand } from "src/commands/ExecutableCommand";
import commands from "@commands";
dotenv.config();
dotenv.config({ path: `.env.${process.argv[2]}` });

export const interactionCreate = (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isChatInputCommand()) {
      const command: Maybe<ExecutableCommand> = commands.find(
        (c) => c.name === interaction.commandName
      );
      if (!command) {
        throw new Error(`${interaction.commandName} is not defined properly`);
      }
      try {
        await command.execute(interaction as ChatInputCommandInteraction);
      } catch (error) {
        logger.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true
        });
      }
    } else if (interaction.isButton()) {
      const timer: Maybe<Timer> = sessionStore.get(interaction.user.id);
      if (!timer) {
        // Since there is no other way that a button interaction would be
        // registered outside of a pomodoro session, this should never happen
        throw new Error("Pomodoro timer not found for user " + interaction.user);
      }
      if (interaction.customId === "finish") {
        timer.finish();
        logger.info(`Finishing session for ${interaction.user.username}`);
      } else if (interaction.customId === "pause") {
        timer.pause();
      } else if (interaction.customId === "resume") {
        timer.resume();
      }
    }
  });
};
