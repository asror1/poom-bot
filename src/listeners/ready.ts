import { Client, Collection, ApplicationCommand } from "discord.js";
import commands from "@commands";
import { logger } from "@utils";

export const ready = (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }
    logger.info("Application is successfully connected.");
    const registered: Collection<
      string,
      ApplicationCommand<any>
    > = await client.application.commands.set(commands);
    registered.forEach((command) => {
      logger.info(`( ${command.name} ) command registered!`);
    });
    console.log(`
  _____               
 |  _  |___ ___ _____ 
 |   __| . | . |     |
 |__|  |___|___|_|_|_|
 
 Logged in as ${client.user.tag}!

      `);
  });
};
