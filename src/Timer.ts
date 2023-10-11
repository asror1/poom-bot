import { minsToMs } from "@utils";
import { FinalView, PausedView, RestView, WorkView, footer } from "@views";
import { Session } from "./Session";
import dotenv from "dotenv";
import { EmbedBuilder } from "discord.js";

dotenv.config();
dotenv.config({ path: `.env.${process.argv[2]}` });

export class Timer {
  intervalId: any;
  workDone: number = 0;
  timeRemaining: number;
  resting: boolean;
  readonly refresh: number = minsToMs(parseFloat(process.env.MINUTE || "1")); // 1 minute
  readonly viewEmbedTemplate: EmbedBuilder;
  private readonly session: Session;

  constructor(session: Session) {
    let { work, rest } = session.duration;
    if (work > 60 || rest > 60) {
      throw new Error("Time must be less than 60 minutes");
    }
    if (work < 1 || rest < 1) {
      throw new Error("Time must be at least 1 minute");
    }
    this.resting = session.startWith === "rest";
    work = Math.round(work);
    rest = Math.round(rest);

    this.timeRemaining = session.startWith === "work" ? work : rest;

    session.duration.work = work;
    session.duration.rest = rest;

    this.session = session;

    this.viewEmbedTemplate = new EmbedBuilder()
      .setAuthor({
        name: `${session.interaction.user.displayName}'s Pomodoro Session`,
        iconURL: session.interaction?.user.avatarURL() as string | undefined
      })
      .setFooter(footer)
      .setURL("https://github.com/asror1/poom-bot")
      .setColor(0xc09473);
  }

  async finish(): Promise<void> {
    this.session.interaction.user.send(
      new FinalView(this.session.interaction.createdTimestamp, this.workDone)
    );
    this.session.interaction.deleteReply();
    clearInterval(this.intervalId);
  }
  pause(): void {
    this.session.interaction.editReply(
      new PausedView(
        this.viewEmbedTemplate,
        (this.resting && "rest") || "work",
        this.timeRemaining
      )
    );
    clearInterval(this.intervalId);
  }
  start(): void {
    if (this.resting) {
      this.startRest();
    } else {
      this.startWork();
    }
  }
  resume(): void {
    this.start();
  }

  private async startWork(): Promise<void> {
    const view: WorkView = new WorkView(this.viewEmbedTemplate, this.timeRemaining);
    if (this.session.interaction.replied) {
      await this.session.interaction.editReply(view);
    } else {
      await this.session.interaction.reply(view);
    }
    this.intervalId = setInterval(async () => {
      this.workDone += 1;
      if (this.timeRemaining === 1) {
        this.resting = true;
        this.timeRemaining = this.session.duration.rest;
        this.startRest();
        clearInterval(this.intervalId);
        return;
      }
      view.render(--this.timeRemaining);
      await this.session.interaction.editReply(view);
    }, this.refresh);
  }

  private async startRest(): Promise<void> {
    const view: RestView = new RestView(this.viewEmbedTemplate, this.timeRemaining);
    if (this.session.interaction.replied) {
      await this.session.interaction.editReply(view);
    } else {
      await this.session.interaction.reply(view);
    }
    this.intervalId = setInterval(async () => {
      if (this.timeRemaining === 1) {
        this.resting = false;
        this.timeRemaining = this.session.duration.work;
        this.startWork();
        clearInterval(this.intervalId);
        return;
      }
      view.render(--this.timeRemaining);
      await this.session.interaction.editReply(view);
    }, this.refresh);
  }
}
