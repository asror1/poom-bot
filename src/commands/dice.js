const { SlashCommandBuilder } = require('discord.js')
const DiceEmbed = require('../embeds/DiceEmbed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolldie')
        .addNumberOption(option =>
            option.setName('number')
                .setDescription('Number of dice to roll')
                .setMaxValue(5)
                .setMinValue(1)
        )
        .setDescription('Roll a virtual die or dice'),
    async execute(interaction) {
        try {

            let number = interaction.options.getNumber('number'),
                response
            if (number) {
                response = { embeds: [new DiceEmbed(number)] }
            }
            else {
                response = { embeds: [new DiceEmbed(1)] }
            }
            await interaction.reply(response)
        }
        catch (err) {
            console.error(err)
        }
    }
}
