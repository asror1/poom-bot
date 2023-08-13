import {
  InteractionReplyOptions,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  MessageActionRowComponentBuilder,
  CommandInteraction,
  User
} from "discord.js";
import { PomodoroSession } from "./types/PomodoroSession";

export class PomodoroTimer {
  intervalId: any;
  workDuration: number;
  breakDuration: number;
  interaction: CommandInteraction;
  companinions: User[] | null;
  tickRate: number;
  defaultButtonRow: ActionRowBuilder<MessageActionRowComponentBuilder>;
  pausedButtonRow: ActionRowBuilder<MessageActionRowComponentBuilder>;
  #minToMillis = (minutes: number): number => minutes * 60 * 1000;

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
    this.tickRate = this.#minToMillis(0.1);
    this.workDuration = Math.round(w);
    this.breakDuration = Math.round(b);
    this.interaction = interaction;
    this.companinions = companinions;

    const finishButton: ButtonBuilder = new ButtonBuilder()
      .setCustomId("finish")
      .setLabel("Finish")
      .setEmoji("🏁")
      .setStyle(ButtonStyle.Primary);

    const pauseButton: ButtonBuilder = new ButtonBuilder()
      .setCustomId("pause")
      .setLabel("Pause")
      .setEmoji("✋")
      .setStyle(ButtonStyle.Secondary);

    const resumeButton: ButtonBuilder = new ButtonBuilder()
      .setCustomId("resume")
      .setLabel("Resume")
      .setEmoji("▶️")
      .setStyle(ButtonStyle.Secondary);

    this.defaultButtonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      finishButton,
      pauseButton
    );
    this.pausedButtonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      finishButton,
      resumeButton
    );
  }

  getWorkView(timeRemaining: number): InteractionReplyOptions {
    if (timeRemaining > 60 || timeRemaining < 1) {
      throw new Error("Invalid work duration. Must be between 1 and 60 minutes");
    }
    const embed: EmbedBuilder = new EmbedBuilder()
      .setColor(0xe8c170)
      .setFields({
        name: "Pomodoro Session Started!",
        value: `ᶘ ◕ᴥ◕ᶅ [${timeRemaining}:00] minutes on the clock`
      })
      .setImage(`attachment://poom${timeRemaining}.png`);
    return {
      components: [this.defaultButtonRow],
      ephemeral: true,
      embeds: [embed],
      files: [`media\\exported\\poom${timeRemaining}.png`]
    };
  }

  async startWorkTimer(): Promise<void> {
    let workRemaining = this.workDuration;
    const workView: InteractionReplyOptions = this.getWorkView(workRemaining);
    if (this.interaction.replied) {
      await this.interaction.editReply(workView);
    } else {
      await this.interaction.reply(workView);
    }
    this.intervalId = setInterval(async () => {
      if (workRemaining === 1) {
        this.startBreakTimer();
        clearInterval(this.intervalId);
        return;
      }
      await this.interaction.editReply(this.getWorkView(--workRemaining));
    }, this.tickRate);
  }

  getBreakView(timeRemaining: number): InteractionReplyOptions {
    if (timeRemaining > 60 || timeRemaining < 1) {
      throw new Error("Invalid break duration. Must be between 1 and 60 minutes.");
    }
    const embed: EmbedBuilder = new EmbedBuilder()
      .setColor(0xe8c170)
      .setFields({
        name: "Break Time!!",
        value: `ᶘ ◕ᴥ◕ᶅ [${timeRemaining}:00] minutes left until work time!`
      })
      .setImage(`attachment://poom${timeRemaining}.png`);
    return {
      components: [this.defaultButtonRow],
      ephemeral: true,
      embeds: [embed],
      files: [`media\\exported\\poom${timeRemaining}.png`]
    };
  }

  async startBreakTimer(): Promise<void> {
    let breakRemaining = this.breakDuration;
    if (this.interaction.replied) {
      await this.interaction.editReply(this.getBreakView(breakRemaining));
    } else {
      await this.interaction.reply(this.getBreakView(breakRemaining));
    }
    this.intervalId = setInterval(async () => {
      if (breakRemaining === 1) {
        clearInterval(this.intervalId);
        this.startWorkTimer();
        return;
      }
      await this.interaction.editReply(this.getBreakView(--breakRemaining));
    }, this.tickRate);
  }
}
