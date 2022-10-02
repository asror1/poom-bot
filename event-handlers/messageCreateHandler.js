const alive = require('../client');
const handler = require('./commandHandler');

const CommandType = {
    HELP: ["!help"],
    PING: ["!ping"],
    PINBOARD: ["!pinboard"],
    SEARCH: ["!s", "!search"],
    ROLLDIE: ["!rolldie"]
}
module.exports = function(message) {
    if (message.author.tag === alive.user.tag) return;
    if (message.content.startsWith("!")) {
        const [command, ...rest] = message.content.split(" ");
        const commandFound = Object.values(CommandType).reduce(async (_, current) => {
            try {
                if (current.includes(command)) {
                    const reply = await handler[command](rest);
                    message.reply(reply);
                    return true;
                }

            } catch (err) {
                console.log(err);
            }
        })
        if (!commandFound)
            message.reply(handler["default"]());
    }
}
