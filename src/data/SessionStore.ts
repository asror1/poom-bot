import { Snowflake } from "discord.js";
import { PomodoroTimer } from "../PomodoroTimer";

export const sessionStore = new Map<Snowflake, PomodoroTimer>();
