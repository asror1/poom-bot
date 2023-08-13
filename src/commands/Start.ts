import { CommandInteraction, Client } from "discord.js";
import { SlashCommand } from "@interfaces/index";
import { sessionStore } from "@data/sessionStore";
import { PomodoroTimer } from "src/PomodoroTimer";

export const Start: SlashCommand = {
  name: "start",
  description: "Start pomodoro session",
  execute: async (_client: Client, interaction: CommandInteraction) => {
    const pomodoroTimer: PomodoroTimer = new PomodoroTimer({
      interaction: interaction,
      companinions: null,
      duration: {
        work: 1,
        break: 3
      }
    });
    pomodoroTimer.startWorkTimer();
    sessionStore.set(interaction.user.id, pomodoroTimer);
  }
};
