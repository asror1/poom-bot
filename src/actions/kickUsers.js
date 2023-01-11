const Errors = {
    InvalidGuild: "InvalidGuild"
}
const {token} = require('../config.json');
const alive = require('../client');
const args = process.argv.slice(2);
const [guildId, ...excludedMemberIds] = args;

alive.on('ready', ()=>{
    const guild = alive.guilds.cache.get(guildId)  || Errors.InvalidGuild;
    if(guild === Errors.InvalidGuild){
        alive.destroy();
        console.error(`${Errors.InvalidGuild}: ${guildId} is not a valid guild id`);
    } else {
        (async function(){
            const members = await guild.members.fetch();
            console.log('Kicking members...')
            members.forEach(member=>{
                const found = excludedMemberIds.findIndex(elem=>elem===member.user.id);
                if(found===-1){
                    member.kick('Bye bye! <3');
                    console.log(member.user.username);
                }
            })
        }())
    }
})
alive.login(token);