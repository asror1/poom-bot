import { CommandInteraction, Client } from "discord.js";
import { Session } from "@interfaces/Session";
import { WorkTimer } from "@components/WorkTimer";
import { SlashCommand } from "@interfaces/SlashCommand";
import { SessionStore } from "@data/SessionStore";

const DEFAULT_WORK_DURATION: number = 25;
const DEFAULT_BREAK_DURATION: number = 5;
const minutesToMilliseconds = (minutes: number): number => minutes * 60 * 1000;
//const millisecondsToMinutes = (milliseconds: number): number => milliseconds / 60 / 1000;
export const Start: SlashCommand = {
  name: "start",
  description: "Start pomodoro session",
  execute: async (_client: Client, interaction: CommandInteraction) => {
    let timeRemaining: number = DEFAULT_WORK_DURATION;
    await interaction.reply(WorkTimer.render(timeRemaining));
    const intervalId: any = setInterval(async () => {
      timeRemaining = timeRemaining - 1;
      interaction.editReply(WorkTimer.render(timeRemaining));
    }, minutesToMilliseconds(1));
    const session: Session = {
      sessionOwer: interaction.user,
      sessionMembers: null,
      intervalId: intervalId,
      interaction: interaction,
      workDuraiton: minutesToMilliseconds(DEFAULT_WORK_DURATION),
      breakDuration: minutesToMilliseconds(DEFAULT_BREAK_DURATION)
    };
    SessionStore.set(interaction.user.id, session);
  }
};
