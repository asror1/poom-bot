import { Session } from "@interfaces/Session";
import { SlashCommandButton } from "@interfaces/SlashCommandButton";
import { ButtonStyle, ComponentType, EmbedBuilder } from "discord.js";

export const ResumeButton: SlashCommandButton = {
  custom_id: "resume",
  label: "Resume",
  type: ComponentType.Button,
  emoji: {
    name: "▶️"
  },
  style: ButtonStyle.Secondary,
  execute: (session: Session) => {
    clearInterval(session.intervalId);
    const embed = new EmbedBuilder()
      .setFields([
        {
          name: "Resume session",
          value: "Get back on your grind!"
        }
      ])
      .setColor(0x7A4841);

    session.interaction.editReply({
      components: [],
      embeds: [embed],
      files: []
    });
  }
};
