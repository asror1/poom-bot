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
        // Declaration and definition of variables used in the command
        let respond = async (embed) => { await interaction.reply({ embeds: [embed] }) },
            number = interaction.options.getNumber('number')
        try {
            // ** Dice embed rolls the die the specified amount or only once ** 
            if (number) {
                return await respond(new DiceEmbed(number))
            }
            return await respond(new DiceEmbed(1))
        }
        catch (err) {
            console.error(err)
            return await respond(new ErrorEmbed(ErrorType.Unexpected, "Most likely not your fault, to report the error, please head over to https://github.com/asror1/enigma-bot/issues and submit an issue."))
        }
    }
}
