import { CommandInteraction, Client, ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "@interfaces/index";
import { sessionStore } from "@data/SessionStore";
import { PomodoroTimer } from "src/PomodoroTimer";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: `.env.${process.argv[2]}` });

export const Start: SlashCommand = {
  name: "start",
  description: "Start pomodoro session",
  options: [
    {
      name: "work",
      description: "Work duration",
      type: ApplicationCommandOptionType.Number,
      required: false,
      minValue: 1,
      maxValue: 60
    },
    {
      name: "break",
      description: "Break duration",
      type: ApplicationCommandOptionType.Number,
      required: false,
      minValue: 1,
      maxValue: 60
    },
    {
      name: "break_first",
      description: "Start session with the break timer",
      type: ApplicationCommandOptionType.Boolean,
      required: false
    }
  ],
  execute: async (_client: Client, interaction: CommandInteraction) => {
    if (sessionStore.has(interaction.user.id)) {
      await interaction.reply("You already have a session running");
      return;
    }
    const workDuration: any = interaction.options.get("work");
    const breakDuration: any = interaction.options.get("break");
    const breakFirst: any = interaction.options.get("break_first");
    const pomodoroTimer: PomodoroTimer = new PomodoroTimer({
      interaction: interaction,
      companinions: null,
      duration: {
        work: parseFloat(process.env.WORK || workDuration || "25"),
        break: parseFloat(process.env.BREAK || breakDuration || "5")
      }
    });
    if (!breakFirst) {
      pomodoroTimer.startWorkTimer();
    } else {
      pomodoroTimer.startBreakTimer();
    }
    sessionStore.set(interaction.user.id, pomodoroTimer);
  }
};
