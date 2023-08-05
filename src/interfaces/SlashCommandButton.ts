import { APIButtonComponentWithCustomId } from "discord.js";
import { Session } from "@interfaces/Session";

export interface SlashCommandButton extends APIButtonComponentWithCustomId {
  execute: (session: Session) => void;
}
