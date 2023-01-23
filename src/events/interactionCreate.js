const { Events } = require('discord.js')
const ErrorEmbed = require('../embeds/ErrorEmbed')
const ErrorType = require('../util/ErrorType')

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        // Check to see if interaction was passed in and it is a chat input command
        if (!interaction || !interaction.isChatInputCommand()) {
            console.error("Interaction was not passed into command handler, or the interaction is not a chat input command")
            return
        }
        let respond = async (embed) => { await interaction.reply({ embeds: [embed], ephemeral: true }) },
            command = interaction.client.commands.get(interaction.commandName)

        try {
            if (!command) {
                throw `No command matching ${interaction.commandName} was found.`
            }
            // ** Execute the command handler for the indicated command ** 
            await command.execute(interaction);

        } catch (err) {
            console.error(err);
            return await respond(new ErrorEmbed(ErrorType.Unexpected, "Most likely not your fault, to report the error, please head over to https://github.com/asror1/enigma-bot/issues and submit an issue."))

        }

    }
}
