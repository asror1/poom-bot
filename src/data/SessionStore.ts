import { Snowflake } from "discord.js";
import { Timer } from "../Timer";

export const sessionStore = new Map<Snowflake, Timer>();
