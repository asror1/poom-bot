import { StaticView } from "@interfaces/StaticView";
import { ActionRowBuilder, BufferResolvable, ButtonBuilder, EmbedBuilder } from "discord.js";

export class FinalView implements StaticView {
  components: ActionRowBuilder<ButtonBuilder>[];
  ephemeral: boolean = true;
  embeds: EmbedBuilder[];
  files: BufferResolvable[];
  constructor(workDone: number) {
    this.components = [];
    this.embeds = [
      new EmbedBuilder().setTitle(
        `You've worked for \` ${workDone} minutes${"!".repeat(Math.floor(workDone / 25))} \``
      )
    ];
    this.files = [];
  }
}
