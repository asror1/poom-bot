const alive = require('../client');
const handler = require('./bang-commands/commandHandler');
const CommandType = require('./bang-commands/CommandType.json');

module.exports = async function(message) {
    if (message.author.tag === alive.user.tag) return;
    if (message.content.startsWith("!")) {
        const [command, ...rest] = message.content.split(" ");
        let c = Object.values(CommandType).find(elem => elem.includes(command));
        if (!c) {
            message.reply(handler["default"]());
        }
        else {
            let reply = await handler[c.at(-1)](rest);
            message.reply(reply);
        }
    }
}
