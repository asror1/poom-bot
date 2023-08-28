import {
  InteractionReplyOptions,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  MessageActionRowComponentBuilder,
  CommandInteraction,
  User,
  ButtonInteraction
} from "discord.js";
import { PomodoroSession } from "./types/PomodoroSession";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: `.env.${process.argv[2]}` });

// TODO: improve this code structure, we can probably modularize this better
export class PomodoroTimer {
  #minToMillis = (minutes: number): number => minutes * 60 * 1000;
  intervalId: any;
  workDuration: number;
  breakDuration: number;
  readonly interaction: CommandInteraction;
  readonly companinions: User[] | null;
  readonly tickRate: number;
  buttonRow: ActionRowBuilder<MessageActionRowComponentBuilder>;
  buttonHandlers: Map<string, (interaction: ButtonInteraction) => void> = new Map();
  workDone: number;
  isBreak: boolean = false;
  timeRemaining: number;

  constructor({
    interaction,
    companinions,
    duration: { work: w, break: b }
  }: PomodoroSession) {
    if (w > 60 || b > 60) {
      throw new Error("Duration or tick rate must be less than 60 minutes");
    }
    if (w < 1 || b < 1) {
      throw new Error("Duration must be at least 1 minute");
    }
    this.tickRate = this.#minToMillis(parseFloat(process.env.MINUTE || "1"));
    this.workDone = 0;
    this.workDuration = Math.round(w);
    this.timeRemaining = this.workDuration;
    this.breakDuration = Math.round(b);
    this.interaction = interaction;
    this.companinions = companinions;
    this.buttonHandlers = new Map();

    const finishButton: ButtonBuilder = new ButtonBuilder()
      .setCustomId("finish")
      .setLabel("Finish")
      .setEmoji("🏁")
      .setStyle(ButtonStyle.Primary);

    this.buttonHandlers.set("finish", (_interaction: ButtonInteraction): void => {
      const embed: EmbedBuilder = new EmbedBuilder()
        .setColor(0x7a4841)
        .setTitle(
          `Work Duration:  \` ${this?.workDone} minutes${"!".repeat(this?.workDone / 50)} \``
        );
      this.interaction.editReply({
        embeds: [embed],
        components: [],
        files: []
      });
      setTimeout(() => {
        this.interaction.deleteReply();
      }, this.#minToMillis(1));
      clearInterval(this.intervalId);
    });

    const pauseButton: ButtonBuilder = new ButtonBuilder()
      .setCustomId("pause")
      .setLabel("Pause")
      .setEmoji("✋")
      .setStyle(ButtonStyle.Secondary);

    const resumeButton: ButtonBuilder = new ButtonBuilder()
      .setCustomId("resume")
      .setLabel("Resume")
      .setEmoji("🏃")
      .setStyle(ButtonStyle.Secondary);

    this.buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      finishButton,
      pauseButton
    );
    this.buttonHandlers.set("pause", (_interaction: ButtonInteraction): void => {
      this.buttonRow.setComponents(finishButton, resumeButton);
      const embed: EmbedBuilder = new EmbedBuilder()
        .setColor(0xbe772b)
        .setTitle(`Session Paused`)
        .setDescription(
          `\` ${this.timeRemaining} ${this.timeRemaining > 1 ? "minutes" : "minute"
          } \` remaining`
        );
      if (this.isBreak) {
        embed.setImage(`attachment://poom_break_${this.timeRemaining}.png`);
      } else {
        embed.setImage(`attachment://poom_work_${this.timeRemaining}.png`);
      }
      const file: string = this.isBreak
        ? `media\\exported\\poom_break_${this.timeRemaining}.png`
        : `media\\exported\\poom_work_${this.timeRemaining}.png`;
      this.interaction.editReply({
        embeds: [embed],
        components: [this.buttonRow],
        files: [file]
      });
      clearInterval(this.intervalId);
    });
    this.buttonHandlers.set("resume", (_interaction: ButtonInteraction): void => {
      this.buttonRow.setComponents(finishButton, pauseButton);
      if (this.isBreak) {
        this.startBreakTimer();
      } else {
        this.startWorkTimer();
      }
    });
  }

  getWorkView(minsRemaining: number): InteractionReplyOptions {
    if (minsRemaining > 60 || minsRemaining < 1) {
      throw new Error("Invalid work duration. Must be between 1 and 60 minutes");
    }
    const embed: EmbedBuilder = new EmbedBuilder()
      .setColor(0xe8c170)
      .setFields({
        name: "Grind Time!",
        value: `\` ${minsRemaining} ${minsRemaining > 1 ? "minutes" : "minute"} \` remaining`
      })
      .setImage(`attachment://poom_work_${minsRemaining}.png`);
    return {
      components: [this.buttonRow],
      ephemeral: true,
      embeds: [embed],
      files: [`media\\exported\\poom_work_${minsRemaining}.png`]
    };
  }

  async startWorkTimer(): Promise<void> {
    const workView: InteractionReplyOptions = this.getWorkView(this.timeRemaining);
    if (this.interaction.replied) {
      await this.interaction.editReply(workView);
    } else {
      await this.interaction.reply(workView);
    }
    this.intervalId = setInterval(async () => {
      this.workDone += 1;
      if (this.timeRemaining === 1) {
        this.isBreak = true;
        this.timeRemaining = this.breakDuration;
        this.startBreakTimer();
        clearInterval(this.intervalId);
        return;
      }
      await this.interaction.editReply(this.getWorkView(--this.timeRemaining));
    }, this.tickRate);
  }

  getBreakView(minsRemaining: number): InteractionReplyOptions {
    if (minsRemaining > 60 || minsRemaining < 1) {
      throw new Error("Invalid break duration. Must be between 1 and 60 minutes.");
    }
    const embed: EmbedBuilder = new EmbedBuilder()
      .setColor(0xc09473)
      .setFields({
        name: "Break Time!",
        value: `\` ${minsRemaining} ${minsRemaining > 1 ? "minutes" : "minute"} \` remaining`
      })
      .setImage(`attachment://poom_break_${minsRemaining}.png`);
    return {
      components: [this.buttonRow],
      ephemeral: true,
      embeds: [embed],
      files: [`media\\exported\\poom_break_${minsRemaining}.png`]
    };
  }

  async startBreakTimer(): Promise<void> {
    if (this.interaction.replied) {
      await this.interaction.editReply(this.getBreakView(this.timeRemaining));
    } else {
      await this.interaction.reply(this.getBreakView(this.timeRemaining));
    }
    this.intervalId = setInterval(async () => {
      if (this.timeRemaining === 1) {
        this.isBreak = false;
        this.timeRemaining = this.workDuration;
        this.startWorkTimer();
        clearInterval(this.intervalId);
        return;
      }
      await this.interaction.editReply(this.getBreakView(--this.timeRemaining));
    }, this.tickRate);
  }
}
