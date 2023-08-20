import { CommandInteraction, Client, ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "@interfaces/index";
import { sessionStore } from "@data/SessionStore";
import { PomodoroTimer } from "src/PomodoroTimer";

export const Start: SlashCommand = {
  name: "start",
  description: "Start pomodoro session",
  options: [
    {
      name: "work",
      description: "Duration of work session",
      required: false,
      type: ApplicationCommandOptionType.Integer,
      minValue: 1,
      maxValue: 60
    },
    {
      name: "break",
      description: "Duration of the break",
      required: false,
      type: ApplicationCommandOptionType.Integer,
      minValue: 1,
      maxValue: 60
    }
  ],
  execute: async (_client: Client, interaction: CommandInteraction) => {
    const work: any = interaction.options.get("work")?.value;
    const breakDuration: any = interaction.options.get("break")?.value;
    const pomodoroTimer: PomodoroTimer = new PomodoroTimer({
      interaction: interaction,
      companinions: null,
      duration: {
        work: work || 25,
        break: breakDuration || 5
      }
    });
    pomodoroTimer.startWorkTimer();
    sessionStore.set(interaction.user.id, pomodoroTimer);
  }
};
