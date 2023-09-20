import { REST, Routes } from "discord.js";
import { log } from "src/utils";
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
    return;
  }
  try {
    const data: any = await rest.get(Routes.applicationCommands(process.env.ID));

    for (const command of data) {
      rest.delete(`${Routes.applicationCommands(process.env.ID)}/${command.id}`);
      log("INFO", `Deleting [ ${command.name} ] slash command...`);
    }

    log("INFO", `Successfully deleted [ ${data.length} ] application slash commands.`);
  } catch (error) {
    log("ERROR", error);
  }
})();
