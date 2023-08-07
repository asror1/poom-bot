import { InteractionReplyOptions } from "discord.js";
import { TimerType } from "../types/TimerType";

export interface Timer {
  type: TimerType;
  render: (timeRemaining: number) => InteractionReplyOptions;
}
