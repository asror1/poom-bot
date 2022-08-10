const {token} = require('./config.json');
const alive = require('./client');
const messageCreateHandler = require('./event-handlers/messageCreateHandler');
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
alive.on('messageCreate', messageCreateHandler);
alive.login(token);

