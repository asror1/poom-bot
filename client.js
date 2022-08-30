const { Client, IntentsBitField, Partials } = require('discord.js');
const clientOptions = {
    intents: [
        IntentsBitField.Flags.GuildMessages,
	IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.MessageContent
    ],
    partials: [
        Partials.User,
	Partials.GuildMember,
        Partials.Message
    ]
}
module.exports = new Client(clientOptions);