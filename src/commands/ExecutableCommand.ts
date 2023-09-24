import { ChatInputApplicationCommandData, ChatInputCommandInteraction } from "discord.js";

export interface ExecutableCommand extends ChatInputApplicationCommandData {
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
