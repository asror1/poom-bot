const { REST, Routes } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    const data = await rest.get(Routes.applicationCommands(process.env.ID));

    console.log("\n");

    for (const command of data) {
      rest.delete(`${Routes.applicationCommands(process.env.ID)}/${command.id}`);
      console.log(`Deleting [ ${command.name} ] slash command...`);
    }

    console.log(`Successfully deleted [ ${data.length} ] application slash commands.`);
  } catch (error) {
    console.error(error);
  }
})();
