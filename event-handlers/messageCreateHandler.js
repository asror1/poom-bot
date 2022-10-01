const alive = require('../client');
const handler = require('./commandHandler');

const CommandType = {
    HELP: "!help",
    PING: "!ping",
    PINBOARD: "!pinboard",
    SEARCH: "!search",
    JOKE: "!joke"
}
module.exports = async function(message) {
    if (message.author.tag === alive.user.tag) return;
    if (message.content.startsWith("!")) {
        const [command, ...rest] = message.content.split(" ");
        switch (command) {
            case CommandType.HELP:
                message.reply(handler[command]());
                break;
            case CommandType.PING:
                message.reply(handler[command]());
                break;
            case CommandType.SEARCH:
                const r1 = await handler[command](rest.join(' '));
                message.reply(r1);
                break;
            case CommandType.PINBOARD:
                let [subCommand, ...args] = rest;
                message.reply(handler[command](subCommand, args));
                break;
            default:
                message.reply(handler["default"]());
                break;
        }
    }
}
