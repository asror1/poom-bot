import { ChatInputApplicationCommandData, ApplicationCommandOptionType } from "discord.js";

export const start: ChatInputApplicationCommandData = {
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
      name: "rest",
      description: "Break duration",
      type: ApplicationCommandOptionType.Number,
      required: false,
      minValue: 1,
      maxValue: 60
    },
    {
      name: "rest_first",
      description: "Start session with the rest timer",
      type: ApplicationCommandOptionType.Boolean,
      required: false
    }
  ],
};
