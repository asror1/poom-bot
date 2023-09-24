import { ActionRowBuilder, BufferResolvable, ButtonBuilder, EmbedBuilder } from "discord.js";
import { TimerType } from "@types";
import { DynamicView, finishButton, pauseButton } from "@views";
import { ImageAttachment, Maybe, remainingToString, getImageAttachment } from "@utils";

export class WorkView implements DynamicView {
  readonly title: string = "Grind Time!";
  readonly type: TimerType = "work";
  readonly template: EmbedBuilder;
  components: ActionRowBuilder<ButtonBuilder>[];
  ephemeral: boolean = true;
  embeds: EmbedBuilder[];
  files: BufferResolvable[];
  render(timeRemaining: number): void {
    const image: Maybe<ImageAttachment> = getImageAttachment({
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
            value: remainingToString(timeRemaining)
          }
        ])
        .setImage(image.url)
    ];
    this.files = [image.path];
  }

  constructor(template: EmbedBuilder, initialTime: number) {
    this.template = template;
    const image: Maybe<ImageAttachment> = getImageAttachment({
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
            value: remainingToString(initialTime)
          }
        ])
        .setImage(image.url)
    ];
    this.files = [image.path];
  }
}
