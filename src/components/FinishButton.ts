import { Session } from "@interfaces/Session";
import { SlashCommandButton } from "@interfaces/SlashCommandButton";
import { ButtonStyle, ComponentType, EmbedBuilder } from "discord.js";

export const FinishButton: SlashCommandButton = {
  custom_id: "finish",
  label: "Finish",
  type: ComponentType.Button,
  emoji: {
    name: "🏁"
  },
  style: ButtonStyle.Primary,
  execute: (session: Session) => {
    clearInterval(session.intervalId);
    const embed = new EmbedBuilder()
      .setFields([
        {
          name: "Another successful work session! (...right? 🤔)",
          value: "Here's a cookie for you 🍪"
        }
      ])
      .setColor(0xe8c170);

    session.interaction.editReply({
      embeds: [embed]
    });
  }
};
