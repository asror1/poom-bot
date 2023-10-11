import { ButtonBuilder, ButtonStyle } from "discord.js";
export const finishButton = new ButtonBuilder()
  .setCustomId("finish")
  .setLabel("Finish")
  .setEmoji("🏁")
  .setStyle(ButtonStyle.Primary);
export const pauseButton = new ButtonBuilder()
  .setCustomId("pause")
  .setLabel("Pause")
  .setEmoji("✋")
  .setStyle(ButtonStyle.Secondary);
export const resumeButton = new ButtonBuilder()
  .setCustomId("resume")
  .setLabel("Resume")
  .setEmoji("🏃")
  .setStyle(ButtonStyle.Secondary);
