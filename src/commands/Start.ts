import { CommandInteraction, Client } from "discord.js";
import { Session } from "@interfaces/Session";
import { WorkTimer, BreakTimer } from "@components/index";
import { SlashCommand } from "@interfaces/SlashCommand";
import { SessionStore } from "@data/SessionStore";

const DEFAULT_WORK_DURATION: number = 5;
const DEFAULT_BREAK_DURATION: number = 3;
const DEFAULT_WORK_UPDATE_DURATION: number = 1;
const DEFAULT_BREAK_UPDATE_DURATION: number = 1;
const minutesToMilliseconds = (minutes: number): number => minutes * 60 * 1000;
export const Start: SlashCommand = {
  name: "start",
  description: "Start pomodoro session",
  execute: async (_client: Client, interaction: CommandInteraction) => {
    let workRemaining: number = DEFAULT_WORK_DURATION;
    let workUpdate: number = minutesToMilliseconds(DEFAULT_WORK_UPDATE_DURATION);

    await interaction.reply(WorkTimer.render(workRemaining));

    const workId: any = setInterval(async () => {
      workRemaining = workRemaining - DEFAULT_WORK_UPDATE_DURATION;
      console.log(workRemaining);
      if (workRemaining === 0) {
        workUpdate = minutesToMilliseconds(DEFAULT_BREAK_DURATION);
        let breakRemaining: number = DEFAULT_BREAK_DURATION;
        const breakUpdate: number = minutesToMilliseconds(DEFAULT_BREAK_UPDATE_DURATION);
        const breakId = setInterval(async () => {
          breakRemaining = breakRemaining - DEFAULT_BREAK_UPDATE_DURATION;
          if (breakRemaining === 0) {
            workUpdate = minutesToMilliseconds(DEFAULT_WORK_DURATION);
            workRemaining = DEFAULT_WORK_DURATION;
            clearInterval(breakId);
          } else {
            await interaction.editReply(BreakTimer.render(breakRemaining));
          }
        }, breakUpdate);
      } else {
        await interaction.editReply(WorkTimer.render(workRemaining));
      }
    }, workUpdate);
    const session: Session = {
      sessionOwer: interaction.user,
      sessionMembers: null,
      intervalId: workId,
      interaction: interaction,
      workDuraiton: minutesToMilliseconds(DEFAULT_WORK_DURATION),
      breakDuration: minutesToMilliseconds(DEFAULT_BREAK_DURATION)
    };
    SessionStore.set(interaction.user.id, session);
  }
};
