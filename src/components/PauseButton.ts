import {
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  APIActionRowComponent,
  APIMessageActionRowComponent
} from "discord.js";
import { Session } from "@interfaces/Session";
import { SlashCommandButton } from "@interfaces/SlashCommandButton";
import { FinishButton } from "./FinishButton";

export const PauseButton: SlashCommandButton = {
  custom_id: "pause",
  label: "Pause",
  type: ComponentType.Button,
  emoji: {
    name: "✋"
  },
  style: ButtonStyle.Secondary,
  execute: (session: Session) => {
    clearInterval(session.intervalId);
    const embed = new EmbedBuilder()
      .setFields([
        {
          name: "Session paused...",
          value: "Click the button below to resume the session."
        }
      ])
      .setColor(0xc09473);
    const row: APIActionRowComponent<APIMessageActionRowComponent> = {
      components: [FinishButton],
      type: ComponentType.ActionRow
    };
    session.interaction.editReply({
      components: [row],
      embeds: [embed],
      files: []
    });
  }
};
