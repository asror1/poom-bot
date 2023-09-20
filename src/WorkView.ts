import { ActionRowBuilder, BufferResolvable, ButtonBuilder, EmbedBuilder } from "discord.js";
import { Image } from "./types/Image";
import { DynamicView } from "@interfaces/DynamicView";
import {
  getAttachmentUrl,
  finishButton,
  pauseButton,
  getTimeRemaining,
  getTimerImage
} from "./utils";
import { Maybe } from "./types/Maybe";
import { TimerType } from "./types/TimerType";

export class WorkView implements DynamicView {
  readonly title: string = "Grind Time!";
  readonly color: number = 0xe8c170;
  readonly type: TimerType = "work";
  components: ActionRowBuilder<ButtonBuilder>[];
  ephemeral: boolean = true;
  embeds: EmbedBuilder[];
  files: BufferResolvable[];
  render(timeRemaining: number): void {
    const image: Maybe<Image> = getTimerImage(this.type, timeRemaining);
    if (!image) {
      throw new Error(`No image found for ${this.type} view with time ${timeRemaining}`);
    }
    this.embeds = [
      new EmbedBuilder()
        .setColor(this.color)
        .setFields([
          {
            name: this.title,
            value: getTimeRemaining(timeRemaining)
          }
        ])
        .setImage(getAttachmentUrl(image.name))
    ];
    this.files = [image.path];
  }

  constructor(initialTime: number) {
    const image: Maybe<Image> = getTimerImage(this.type, initialTime);
    if (!image) {
      throw new Error(`No image found for ${this.type} view with time ${initialTime}`);
    }
    this.components = [
      new ActionRowBuilder<ButtonBuilder>().addComponents(finishButton, pauseButton)
    ];
    this.embeds = [
      new EmbedBuilder()
        .setColor(this.color)
        .setFields([
          {
            name: this.title,
            value: getTimeRemaining(initialTime)
          }
        ])
        .setImage(getAttachmentUrl(image.name))
    ];
    this.files = [image.path];
  }
}
