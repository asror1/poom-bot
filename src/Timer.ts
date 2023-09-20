import { Session } from "./types/Session";
import { minToMillis } from "./utils";
import { FinalView } from "./FinalView";
import { PausedView } from "./PausedView";
import { WorkView } from "./WorkView";
import { RestView } from "./RestView";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: `.env.${process.argv[2]}` });

// TODO: improve this code structure, we can probably modularize this better
export class Timer {
  intervalId: any;
  workDone: number = 0;
  timeRemaining: number;
  resting: boolean;
  readonly refresh: number = minToMillis(parseFloat(process.env.MINUTE || "1")); // 1 minute
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
  }

  async finish(): Promise<void> {
    this.session.interaction.user.send(new FinalView(this.workDone));
    setTimeout(() => {
      this.session.interaction.deleteReply();
    }, minToMillis(1));
    clearInterval(this.intervalId);
  }
  async pause(): Promise<void> {
    this.session.interaction.editReply(
      new PausedView((this.resting && "rest") || "work", this.timeRemaining)
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
    const view: WorkView = new WorkView(this.timeRemaining);
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
    const view: RestView = new RestView(this.timeRemaining);
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
