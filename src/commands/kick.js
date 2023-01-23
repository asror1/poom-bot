const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')
const DefaultEmbed = require('../embeds/DefaultEmbed')
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
        // Declaration and definition of variables used in the command
        let respond = async (embed) => { return await interaction.reply({ embeds: [embed], ephemeral: true }) },
            all = interaction.options.getBoolean("all"),
            target = interaction.options.getUser('target'),
            reason = interaction.options.getString('reason') || "No reason, just felt like it ^o^"
        try {
            // Check to see if user has permission to kick members
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                return await respond(new ErrorEmbed(ErrorType.InsufficientPermission, "You must have the permission to kick members!"))
            }
            // ** Kick all members of the guild/server ** 
            if (all) {
                // Fetch all members of the build
                let members = await interaction.guild.members.fetch(),
                    total
                for (let member of members) {
                    member = member[1]
                    // Check to see if member is kickable, owner and enigma aren't
                    if (member.kickable) {
                        // Kick member with included reason, or fallback reason
                        await member.kick({ reason: reason })
                        // Count total amount of users kicked
                        ++total

                    }
                }
                return await respond(new DefaultEmbed("Success!", `Deleted ${total} users`))
            }
            // Check  to see if target user was specified since all option was not set to true
            if (!target) return await respond(new ErrorEmbed(ErrorType.MissingInput, "If you want to delete all users, please set \"all\" option to true, otherwise you must select a user to remove"))
            // ** Kick indicated member ** 
            interaction.guild.members.kick(interaction.guildId, target.id);
            return await respond(new DefaultEmbed("Success!", `Deleted ${target.username}`))
        }
        catch (err) {
            console.error(err)
            return await respond(new ErrorEmbed(ErrorType.Unexpected, "Most likely not your fault, to report the error, please head over to https://github.com/asror1/enigma-bot/issues and submit an issue."))
        }
    }
}
