const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')
const DefaultEmbed = require('../embeds/DefaultEmbed')
const DiceEmbed = require('../embeds/DiceEmbed')
const ErrorEmbed = require('../embeds/ErrorEmbed')
const ErrorType = require('../util/ErrorType')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .addBooleanOption(option =>
            option.setName("all")
                .setDescription("Kick *ALL* users")
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName("target")
                .setDescription("Select a user to kick")
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the kick')
        )
        .setDescription('Kick users'),
    async execute(interaction) {
        try {
            let all = interaction.options.getBoolean("all"),
                target = interaction.options.getUser('target'),
                reason = interaction.options.getString('reason') || "No reason, just felt like it",
                respond = async (embed) => { return await interaction.editReply({ embeds: [embed], ephemeral: true }) }
            interaction.deferReply()
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                return await respond(new ErrorEmbed(ErrorType.InsufficientPermission, "You must have the permission to kick members!"))
            }
            if (all) {
                let total = interaction.guild.memberCount
                let members = await interaction.guild.members.fetch()
                //console.log(members);
                for (const member in members) {
                    console.log(member.user.tag)

                    await member.kick({ reason: reason })
                    if (member.kickable) {
                    }
                }
                return await respond(new DefaultEmbed("Success", `Deleted ${total} users`))
            }
            if (!target) return await respond(new ErrorEmbed(ErrorType.MissingInput, "If you want to delete all users, please set \"all\" option to true, otherwise you must select a user to remove"))
            interaction.guild.members.kick(interaction.guildId, target.id);
            return await respond(new DefaultEmbed("Success", `Deleted ${target.username}`))
        }
        catch (err) {
            console.error(err)
        }
    }
}
