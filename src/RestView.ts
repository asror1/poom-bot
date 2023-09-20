import { ActionRowBuilder, BufferResolvable, ButtonBuilder, EmbedBuilder } from "discord.js";
import { Image } from "./types/Image";
import { DynamicView } from "@interfaces/DynamicView";
import { getComposedImage } from "./utils";
import { getAttachmentUrl, finishButton, pauseButton, getTimeRemaining } from "./utils";
import { Maybe } from "./types/Maybe";
import { TimerType } from "./types/TimerType";

export class RestView implements DynamicView {
  readonly title: string = "Rest Time!";
  readonly type: TimerType = "rest";
  readonly template: EmbedBuilder;
  components: ActionRowBuilder<ButtonBuilder>[];
  ephemeral: boolean = true;
  embeds: EmbedBuilder[];
  files: BufferResolvable[];
  render(timeRemaining: number): void {
    const image: Maybe<Image> = getComposedImage({
      type: this.type,
      time: timeRemaining
    });
    if (!image) {
      throw new Error(`No image found for ${this.type} view with time ${timeRemaining}`);
    }
    this.embeds = [
      this.template
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

  constructor(template: EmbedBuilder, initialTime: number) {
    this.template = template;
    const image: Maybe<Image> = getComposedImage({
      type: this.type,
      time: initialTime
    });
    if (!image) {
      throw new Error(`No image found for ${this.type} view with time ${initialTime}`);
    }
    this.components = [
      new ActionRowBuilder<ButtonBuilder>().addComponents(finishButton, pauseButton)
    ];
    this.embeds = [
      this.template
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
