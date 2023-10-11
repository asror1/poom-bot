import { CommandInteraction, User } from "discord.js";

export type Session = {
  interaction: CommandInteraction;
  companions: User[] | null;
  duration: {
    work: number;
    rest: number;
  };
  startWith: "work" | "rest";
};
