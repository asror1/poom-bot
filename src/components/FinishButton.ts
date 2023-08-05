import { Session } from "@interfaces/Session";
import { SlashCommandButton } from "@interfaces/SlashCommandButton";
import { ButtonStyle, ComponentType } from "discord.js";

const finishButton: SlashCommandButton = {
  custom_id: "finish",
  label: "Finish",
  type: ComponentType.Button,
  emoji: {
    name: "🏁"
  },
  style: ButtonStyle.Primary,
  execute: (session: Session) => {
    console.log("temp");
  }
};
export default finishButton;
