const alive = require('../client');
const handler = require('./commandHandler');
const CommandType= {
    HELP: "!help",
    PING: "!ping",
    SEARCH: "!search"
}
module.exports = async function (message) {
    if(message.author.tag === alive.user.tag) return;
    if(message.content.startsWith("!")){
        const [command, ...rest] = message.content.split(" ");
        switch(command){
            case CommandType.HELP: 
                message.reply(handler[command]());
            break;
            case CommandType.PING:
                message.reply(handler[command]());
            break;
            case CommandType.SEARCH:
                const response = await handler[command](rest.join(' '));
                message.reply(response);
            break;
            default: 
                message.reply(handler["default"]);
            break;
        }
    }
}
