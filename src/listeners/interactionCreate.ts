import { Client, Interaction } from "discord.js";
import { Maybe } from "../types/Maybe";
import { Session } from "../types/Session";
import { sessionStore } from "@data/SessionStore";
import { Timer } from "../Timer";
import dotenv from "dotenv";
import { log } from "src/utils";
dotenv.config();
dotenv.config({ path: `.env.${process.argv[2]}` });

export const interactionCreate = (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isChatInputCommand()) {
      if (sessionStore.has(interaction.user.id)) {
        // TODO: handle when user has an active session, and starts another one
        log("ERROR", `User ${interaction.user.username} already has an active session`);
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
          startWith: startWith && "rest" || "work"

        };
        const timer: Timer = new Timer(session);
        log("INFO", `Starting session for ${interaction.user.username}`);
        timer.start();
        sessionStore.set(interaction.user.id, timer);
      }
    } else if (interaction.isButton()) {
      const timer: Maybe<Timer> = sessionStore.get(interaction.user.id);
      if (!timer) {
        // Since there is no other way that a button interaction would be
        // registered outside of a pomodoro session, this should never happen
        throw new Error("Pomodoro timer not found for user " + interaction.user);
      }
      if (interaction.customId === "finish") {
        timer.finish();
        log("INFO", `Finishing session for ${interaction.user.username}`);
      } else if (interaction.customId === "pause") {
        timer.pause();
      } else if (interaction.customId === "resume") {
        timer.resume();
      }
    }
  });
};
