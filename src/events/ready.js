const { Events, ActivityType } = require('discord.js')

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(enigma) {
        console.log(`

              (_)                      
     ___ _ __  _  __ _ _ __ ___   __ _ 
    / _ \\ \'_ \\| |/ _\` | \'_ \` _ \\ / _\` |
   |  __/ | | | | (_| | | | | | | (_| |
    \\___|_| |_|_|\\__, |_| |_| |_|\\__,_|
                  __/ |                
                 |___/                 

    ${enigma.user.tag} is logged in!
                `);
        enigma.user.setActivity("everything", { type: ActivityType.Listening });
    }
}
