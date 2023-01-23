const { Events, ChannelType } = require('discord.js')
const Greetor = require('../util/Greetor')

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        if (!member) {
            console.error("Member was not passed into guildMemberAdd handler");
            return
        }
        try {
            // ** Fetch nerdy jokes api for a joke ** 
            let joke = await fetchJoke()?.data?.joke;

            // Define variables needed for handler
            let guild = member.guild,
                channels = await guild.channels.fetch(),
                channel
            // ** Find the welcome channel **
            channel = channels.find(elem => elem.type === ChannelType.GuildText && elem.name.includes("welcome"))
            if (!channel) {
                console.error(`No welcome channel found in ( ${guild.name} | ${guild.id} ) `);
                console.log(`Using random channel to send welcome message for ( ${guild.name} | ${guild.id} )`);
                channel = channels.find(elem => elem.type === ChannelType.GuildText)
            }
            channel.send(Greetor.greet(member.user.id, joke));
        }
        catch (err) {
            console.error(err);
        }
    }
}
