const { Client, IntentsBitField, Partials } = require('discord.js');
const clientOptions = {
    intents: [
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.MessageContent
    ],
    partials: [
        Partials.User,
        Partials.Message
    ]
}
module.exports = new Client(clientOptions);