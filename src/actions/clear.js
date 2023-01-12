const Errors = {
    InvalidGuild: "InvalidGuild"
}
const {token} = require('../config.json');
const alive = require('../client');
const args = process.argv.slice(2);
const [guildId, ...excludedChannelIds] = args;

alive.on('ready', ()=>{
    const guild = alive.guilds.cache.get(guildId)  || Errors.InvalidGuild;
    if(guild === Errors.InvalidGuild){
        alive.destroy();
        console.error(`${Errors.InvalidGuild}: ${guildId} is not a valid guild id`);
    } else {

        (async function(){
            const channels = await guild.channels.fetch();
            console.log('Clearing channels...');
            channels.forEach(channel=>{
                const found = excludedChannelIds.findIndex(elem=>elem===channel.id);
                if(found===-1){
                    channel.delete();
                    console.log(channel.name);
                }
            })
        }())
    }
})
alive.login(token);