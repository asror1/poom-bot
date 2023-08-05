import { Client } from "discord.js";
import commands from "@commands/index";

export const ready = (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }
    await client.application.commands.set(commands);
    console.log(`
  _____               
 |  _  |___ ___ _____ 
 |   __| . | . |     |
 |__|  |___|___|_|_|_|
 
 Logged in as ${client.user.tag}!

      `);
  });
};
