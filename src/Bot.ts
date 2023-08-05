import { Client } from "discord.js";
import { ready, interactionCreate } from "@listeners/index";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: ["Guilds", "GuildMessages"],
});

ready(client);
interactionCreate(client);

client.login(process.env.TOKEN);
