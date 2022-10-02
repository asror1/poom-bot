const alive = require('../client');
const handler = require('./commandHandler');

// Supported commands, the fullest command must go at the end of their array.
const CommandType = {
    HELP: ["!h", "!help"],
    PING: ["!ping"],
    PINBOARD: ["!pb, !pinboard"],
    SEARCH: ["!s", "!search"],
    ROLLDIE: ["!rd", "!rolldie"]
}
module.exports = function(message) {
    if (message.author.tag === alive.user.tag) return;
    if (message.content.startsWith("!")) {
        const [command, ...rest] = message.content.split(" ");
        const found = Object.values(CommandType).reduce(async (prev, current) => {
            try {
                if ((Array.isArray(prev) && prev.includes(command))
                    || (Array.isArray(current) && current.includes(command))) {
                    const reply = await handler[
                        Array.isArray(prev) ?
                            prev[prev.length - 1] :
                            current[current.length - 1]
                    ](rest);
                    message.reply(reply);
                    return true;
                }

            } catch (err) {
                console.log(err);
            }
        })
        if (!found)
            message.reply(handler["default"]());
    }
}
