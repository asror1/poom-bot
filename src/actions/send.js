const { token } = require('../config.json')
const alive = require('../client');
const args = process.argv.slice(2);
const [guildId, channelId, ...message] = args;

alive.on('ready', async () => {
    const guild = alive.guilds.cache.get(guildId);
    const channel = await guild.channels.fetch(channelId);
    channel.send(message.join(' '));
})
alive.login(token);
