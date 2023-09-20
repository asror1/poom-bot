import { StaticView } from "@interfaces/StaticView";
import {
  finishButton,
  getAttachmentUrl,
  resumeButton,
  getTimerImage,
  getTimeRemaining
} from "./utils";
import { ActionRowBuilder, BufferResolvable, ButtonBuilder, EmbedBuilder } from "discord.js";
import { Maybe } from "./types/Maybe";
import { Image } from "./types/Image";
import { TimerType } from "./types/TimerType";

export class PausedView implements StaticView {
  readonly title: string = "Session Paused";
  readonly color: number = 0xbe772b;
  components: ActionRowBuilder<ButtonBuilder>[];
  ephemeral: boolean = true;
  files: BufferResolvable[];
  embeds: EmbedBuilder[];
  constructor(pausedOn: TimerType, pausedTime: number) {
    this.components = [
      new ActionRowBuilder<ButtonBuilder>().addComponents(finishButton, resumeButton)
    ];
    const image: Maybe<Image> = getTimerImage(pausedOn, pausedTime);
    if (!image) {
      throw new Error(`No image found for ${pausedOn} view with time ${pausedTime}`);
    }
    this.embeds = [
      new EmbedBuilder()
        .setColor(this.color)
        .setFields({
          name: this.title,
          value: getTimeRemaining(pausedTime)
        })
        .setImage(getAttachmentUrl(image.name))
    ];
    this.files = [image.path];
  }
}
