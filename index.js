const {token} = require('./config.json');
const alive = require('./client');
const messageCreateHandler = require('./event-handlers/messageCreateHandler');
const guildMemberAddHandler = require('./event-handlers/guildMemberAddHandler');
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
}
alive.on('ready', onStart);
alive.on('guildMemberAdd', guildMemberAddHandler);
alive.on('messageCreate', messageCreateHandler);
alive.login(token);

