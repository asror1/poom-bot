import { CommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";

export interface SlashCommand extends ChatInputApplicationCommandData {
  execute: (client: Client, interaction: CommandInteraction) => void;
}
