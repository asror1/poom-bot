import { CommandInteraction, User } from "discord.js";

export type PomodoroSession = {
  interaction: CommandInteraction;
  companinions: User[] | null;
  duration: {
    work: number;
    break: number;
  };
};
