import { ButtonBuilder, ButtonStyle } from "discord.js";
import fs from "fs";
import { TimerType } from "./types/TimerType";
import { Image } from "./types/Image";
import dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: `.env.${process.argv[2]}` });

export const ROOT_PATH = __dirname + "/../";
export const EXPORTED_IMAGE_PATH = ROOT_PATH + "/media/exported/";
export const COMPOSED_TIMER_PATH = __dirname + "/timers/";

export function getTimerImage(type: TimerType, time: number): Image {
  const name: string = `final${time}.png`;
  const path: string = COMPOSED_TIMER_PATH + type + "/" + name;

  const image: Image = { path, name };
  if (!fs.existsSync(path)) {
    log("ERROR", `Image ${path} does not exist`);
  }
  return image;
}
const LOG_LEVEL = process.env.LOG_LEVEL || "INFO";
export function log(severity: "ERROR" | "WARN" | "INFO" | "DEBUG", message: any) {
  if ((LOG_LEVEL !== severity && LOG_LEVEL !== "DEBUG") || severity === "ERROR") return;
  fs.appendFile(ROOT_PATH + "\\log.txt", `[${severity}]: ${message}\n`, (err) => {
    if (err) console.error(err);
  });
}

export function minToMillis(minutes: number): number {
  return minutes * 60 * 1000;
}

export function getAttachmentUrl(fileName: string): string {
  return `attachment://${fileName}`;
}
export function getTimeRemaining(time: number) {
  return `\` ${time} ${time > 1 ? "minutes" : "minute"} \` remaining`;
}

export const finishButton = new ButtonBuilder()
  .setCustomId("finish")
  .setLabel("Finish")
  .setEmoji("🏁")
  .setStyle(ButtonStyle.Primary);
export const pauseButton = new ButtonBuilder()
  .setCustomId("pause")
  .setLabel("Pause")
  .setEmoji("✋")
  .setStyle(ButtonStyle.Danger);
export const resumeButton = new ButtonBuilder()
  .setCustomId("resume")
  .setLabel("Resume")
  .setEmoji("🏃")
  .setStyle(ButtonStyle.Secondary);
