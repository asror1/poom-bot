import { StaticView, finishButton, resumeButton } from "@views";
import { getImageAttachment, remainingToString, Maybe, ImageAttachment } from "@utils";
import { ActionRowBuilder, BufferResolvable, ButtonBuilder, EmbedBuilder } from "discord.js";
import { TimerType } from "@types";

export class PausedView implements StaticView {
  readonly title: string = "Session Paused";
  readonly template: EmbedBuilder;
  components: ActionRowBuilder<ButtonBuilder>[];
  ephemeral: boolean = true;
  files: BufferResolvable[];
  embeds: EmbedBuilder[];
  constructor(template: EmbedBuilder, pausedOn: TimerType, pausedTime: number) {
    this.template = template;
    this.components = [
      new ActionRowBuilder<ButtonBuilder>().addComponents(finishButton, resumeButton)
    ];
    const image: Maybe<ImageAttachment> = getImageAttachment({
      type: pausedOn,
      time: pausedTime,
      paused: true
    });
    if (!image) {
      throw new Error(`No image found for ${pausedOn} view with time ${pausedTime}`);
    }
    this.embeds = [
      this.template
        .setFields({
          name: this.title,
          value: remainingToString(pausedTime)
        })
        .setImage(image.url)
    ];
    this.files = [image.path];
  }
}
