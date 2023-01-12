const { SlashCommandBuilder, REST, Routes } = require('discord.js')
const { token, clientId } = require('./config.json')

const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationCommands(clientId))
    .then(data => {
        const promises = [];
        for (const command of data) {
            console.log(`Deleting ${command.name} (/) command globally`);
            const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });
