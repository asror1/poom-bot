const { Events, ChannelType } = require('discord.js')
//const greetMember = require('../util/greetMember')
const EnigmaBot = require('../util/EnigmaBot')

const enigmaBot = new EnigmaBot();

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        if (!member) {
            console.error("Member was not passed into guildMemberAdd handler");
            return
        }
        enigmaBot.greet(member)
    }
}
