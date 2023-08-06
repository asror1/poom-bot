import {
  EmbedBuilder,
  APIActionRowComponent,
  APIMessageActionRowComponent,
  ComponentType
} from "discord.js";
import { Timer } from "@interfaces/Timer";
import { PauseButton, FinishButton } from "@components/index";

export const WorkTimer: Timer = {
  type: "work",
  render: (timeRemaining: number) => {
    if (timeRemaining > 60) {
      throw new Error(
        "Remaining time must be in minutes, not seconds or milliseconds. Remaining time also cannot be more than an hour"
      );
    }
    const row: APIActionRowComponent<APIMessageActionRowComponent> = {
      components: [FinishButton, PauseButton],
      type: ComponentType.ActionRow
    };
    const embed: EmbedBuilder = new EmbedBuilder()
      .setColor(0xe8c170)
      .setFields({
        name: "Pomodoro Session Started!",
        value: `ᶘ ◕ᴥ◕ᶅ [${timeRemaining}:00] minutes on the clock`
      })
      .setImage(`attachment://poom${timeRemaining}.png`);
    return {
      components: [row],
      ephemeral: true,
      embeds: [embed],
      files: [`media\\exported\\poom${timeRemaining}.png`]
    };
  }
};
