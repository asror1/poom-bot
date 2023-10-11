import { ChatInputCommandInteraction } from "discord.js";
import { ExecutableCommand } from "./ExecutableCommand";
import { FeedbackView } from "@views";

export const feedback: ExecutableCommand = {
  name: "feedback",
  description: "Submit your feedback to improve poom!",
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply(new FeedbackView());
  }
};
