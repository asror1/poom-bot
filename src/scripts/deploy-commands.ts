import { REST, Routes } from "discord.js";
import { log } from "src/utils";
import commands from "@commands/index";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.TOKEN) {
  log("ERROR", "No discord token provided.");
  process.exit(1);
}
const rest: REST = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  if (!process.env.ID) {
    log("ERROR", "No discord application id provided.");
    process.exit(1);
  }
  try {
    await rest.put(Routes.applicationCommands(process.env.ID), {
      body: commands
    });
    log("INFO", `Successfully reloaded ${commands.length} poom commands.`);
  } catch (error) {
    log("ERROR", error);
  }
})();
