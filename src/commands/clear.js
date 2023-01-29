const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')
const ErrorEmbed = require('../embeds/ErrorEmbed')
const ErrorType = require('../util/ErrorType')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear channel'),
    async execute(interaction) {
        // Declaration and definition of variables used in the command
        let respond = async (embed) => { await interaction.reply({ embeds: [embed], ephemeral: true }) },
            channel = interaction.channel,
            parentChannel = await interaction.guild.channels.fetch(channel.parentId)

        try {
            // Check to see if user has permission to manage channels 
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                return await respond(new ErrorEmbed(ErrorType.InsufficientPermission, "You don't have the neccesary permission to manage channels :/"))
            }
            // ** Create the same exact channel that is being deleted ** 
            channel = await interaction.guild.channels.create({ name: channel.name, type: channel.type, position: channel.rawPosition })
            // ** Set the parent channel to be the same one **
            channel.setParent(parentChannel)
            // ** Delete the intented channel, thus removing all the messages **
            interaction.channel.delete("Chat Reset")
        }
        catch (err) {
            console.error(err);
            return await respond(new ErrorEmbed(ErrorType.Unexpected, "Most likely not your fault, to report the error, please head over to https://github.com/asror1/enigma-bot/issues and submit an issue."))
        }
    }
}
