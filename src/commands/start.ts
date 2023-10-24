import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";
import { sessionStore } from "@data";
import { logger } from "@utils";
import { Timer } from "src/Timer";
import { Session } from "src/Session";
import { ExecutableCommand } from "./ExecutableCommand";

export const start: ExecutableCommand = {
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
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (sessionStore.has(interaction.user.id)) {
      // TODO: handle when user has an active session, and starts another one
      logger.error(`User ${interaction.user.username} already has an active session`);
    }
    if (process.env.WORK && process.env.REST) {
      const work: any = interaction.options.get("work");
      const rest: any = interaction.options.get("rest");
      const startWith: any = interaction.options.get("rest_first");
      const session: Session = {
        interaction,
        companions: null,
        duration: {
          work: work || parseInt(process.env.WORK),
          rest: rest || parseInt(process.env.REST)
        },
        startWith: (startWith && "rest") || "work"
      };
      const timer: Timer = new Timer(session);
      logger.info(`Starting session for ${interaction.user.username}`);
      timer.start();
      sessionStore.set(interaction.user.id, timer);
    }
  }
};
