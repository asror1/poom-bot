const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('./config.json');
const greet = require('./handlers/greet.js');

const enigma = new Client({ intents: [GatewayIntentBits.Guilds] });
enigma.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        enigma.commands.set(command.data.name, command);
    } else {
        console.log(`[Error] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
function start() {
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
enigma.on(Events.ClientReady, start);
enigma.on(Events.GuildMemberAdd, greet);
enigma.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
})
enigma.login(token);

