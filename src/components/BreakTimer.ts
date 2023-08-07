import {
  EmbedBuilder,
  APIActionRowComponent,
  APIMessageActionRowComponent,
  ComponentType
} from "discord.js";
import { Timer } from "@interfaces/Timer";
import { PauseButton, FinishButton } from "@components/index";

export const BreakTimer: Timer = {
  type: "break",
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
        name: "Break Time!!",
        value: `ᶘ ◕ᴥ◕ᶅ [${timeRemaining}:00] minutes left until work time!`
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
