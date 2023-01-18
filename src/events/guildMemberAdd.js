const { Events } = require('discord.js')
module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        if (!member) return
        let joke = await fetchJoke()?.data?.joke;

        // TODO: Improve guild channel selection for sending greeting
        let channel = await member.guild?.channels.fetch();
        channel = channel.find(elem => elem.type === 0);
        channel.send(generateMadlib(member.user.id, joke));
    }
}
