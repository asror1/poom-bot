import { StaticView } from "@views";
import { ActionRowBuilder, BufferResolvable, ButtonBuilder, EmbedBuilder } from "discord.js";

export class FinalView implements StaticView {
  components: ActionRowBuilder<ButtonBuilder>[];
  ephemeral: boolean = false;
  embeds: EmbedBuilder[];
  files: BufferResolvable[];
  constructor(createdTimestamp: number, workDone: number) {
    this.components = [];
    const start: Date = new Date(createdTimestamp);
    const now: Date = new Date();
    this.embeds = [
      new EmbedBuilder().setColor(0x7a4841).setFields({
        name: `${start.toLocaleDateString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        })} - ${now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        })}`,
        value: `You've worked for \` ${workDone} minute${workDone > 1 ? "s" : ""}${"!".repeat(
          Math.floor(workDone / 25)
        )} \``
      })
    ];
    this.files = [];
  }
}
