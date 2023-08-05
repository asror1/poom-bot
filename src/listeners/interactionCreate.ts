import { CommandInteraction, Client, Interaction } from "discord.js";
import commands from "@commands/index";
import { Maybe } from "../types/Maybe";
import { SlashCommand } from "@interfaces/SlashCommand";

export const interactionCreate = (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isChatInputCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand: Maybe<SlashCommand> = commands.find(
    (c) => c.name === interaction.commandName
  );

  if (!slashCommand) {
    interaction.followUp({ content: "An error has occurred" });
    return;
  }

  slashCommand.execute(client, interaction);
};
