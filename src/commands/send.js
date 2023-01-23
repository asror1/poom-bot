const { SlashCommandBuilder, PermissionsBitField, ChannelType } = require('discord.js')
const DefaultEmbed = require('../embeds/DefaultEmbed')
const ErrorEmbed = require('../embeds/ErrorEmbed')
const ErrorType = require('../util/ErrorType')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .addStringOption(option =>
            option.setName('message')
                .setMinLength(1)
                .setRequired(true)
                .setDescription('Message to send'))
        .addChannelOption(option =>
            option.setName('channel')
                .addChannelTypes(ChannelType.GuildText)
                .setDescription("Channel to send the message to"))
        .setDescription('Send a message as the enigma'),
    async execute(interaction) {
        // Declaration and definition of variables used in the command
        let respond = async (embed) => { await interaction.reply({ embeds: [embed], ephemeral: true }) },
            channel = interaction.options.getChannel('channel') || interaction.channel,
            message = interaction.options.getString('message')
        try {
            // Check to see if user has administrator permissions
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return await respond(new ErrorEmbed(ErrorType.InsufficientPermission, "You don't have the neccesary permission to send messages with the bot :/"))
            }
            // ** Attempt to send message to channel ** 
            channel.send({ content: message })
            return await respond(new DefaultEmbed("Success", "Message sent successfully"))
        }
        catch (err) {
            console.error(err);
            return await respond(new ErrorEmbed(ErrorType.Unexpected, "Most likely not your fault, to report the error, please head over to https://github.com/asror1/enigma-bot/issues and submit an issue."))
        }
    }
}
