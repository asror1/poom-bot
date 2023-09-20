import { StaticView } from "@interfaces/StaticView";
import {
  finishButton,
  getAttachmentUrl,
  resumeButton,
  getComposedImage,
  getTimeRemaining
} from "./utils";
import { ActionRowBuilder, BufferResolvable, ButtonBuilder, EmbedBuilder } from "discord.js";
import { Maybe } from "./types/Maybe";
import { Image } from "./types/Image";
import { TimerType } from "./types/TimerType";

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
    const image: Maybe<Image> = getComposedImage({
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
          value: getTimeRemaining(pausedTime)
        })
        .setImage(getAttachmentUrl(image.name))
    ];
    this.files = [image.path];
  }
}
