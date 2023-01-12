const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search a word/phrase on Google!'),
    async execute(interaction) {
        await interaction.reply('hello!')
    }
}
