const { SlashCommandBuilder, REST, Routes } = require('discord.js')
const { token, clientId } = require('./config.json')

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        const data = await rest.get(Routes.applicationCommands(clientId))
        const promises = []
        for (const command of data) {
            console.log(`Deleting ${command.name} (/) command globally`);
            const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
            rest.delete(deleteUrl)
        }
        Promise.all(promises)
        console.log(`Successfully deleted ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
