import { REST, Routes } from "discord.js";
import { logger } from "@utils";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.TOKEN) {
  logger.error("No discord token provided.");
  process.exit(1);
}
const rest: REST = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  if (!process.env.ID) {
    logger.error("No discord application id provided.");
    return;
  }
  try {
    const data: any = await rest.get(Routes.applicationCommands(process.env.ID));

    for (const command of data) {
      rest.delete(`${Routes.applicationCommands(process.env.ID)}/${command.id}`);
      logger.info(`Deleting ( ${command.name} ) slash command...`);
    }

    logger.info(`Successfully deleted ${data.length} application slash commands.`);
  } catch (error) {
    logger.error(error);
  }
})();
