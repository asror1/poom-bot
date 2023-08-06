import { Session } from "@interfaces/Session";
import { SlashCommandButton } from "@interfaces/SlashCommandButton";
import { ButtonStyle, ComponentType } from "discord.js";

export const PauseButton: SlashCommandButton = {
  custom_id: "pause",
  label: "Pause",
  type: ComponentType.Button,
  emoji: {
    name: "✋"
  },
  style: ButtonStyle.Secondary,
  execute: (_session: Session) => {
    // TODO: implement pause functionality
    console.log("paused");
  }
};
