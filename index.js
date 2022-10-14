const { token } = require('./config.json');
const alive = require('./client');
const messageCreateHandler = require('./event-handlers/messageCreateHandler');
const guildMemberAddHandler = require('./event-handlers/guildMemberAddHandler');
const { ActivityType } = require('discord.js');
function onStart() {
    console.log(`
    
    
     █████╗ ██╗     ██╗██╗   ██╗███████╗
    ██╔══██╗██║     ██║██║   ██║██╔════╝
    ███████║██║     ██║██║   ██║█████╗  
    ██╔══██║██║     ██║╚██╗ ██╔╝██╔══╝  
    ██║  ██║███████╗██║ ╚████╔╝ ███████╗
    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝  ╚══════╝

    ${alive.user.tag} is logged in!
    `);
    alive.user.setActivity("!h | !help", { type: ActivityType.Listening });
}
alive.on('ready', onStart);
alive.on('guildMemberAdd', guildMemberAddHandler);
alive.on('messageCreate', messageCreateHandler);
alive.login(token);

