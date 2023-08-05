import { Snowflake } from "discord.js";

export interface Session {
  owner: Snowflake;
  members: Snowflake[] | null;
  guild: Snowflake | null;
  interaction: Snowflake;
  workInterval: number;
  breakInterval: number;
}
