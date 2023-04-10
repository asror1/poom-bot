const fetchJoke = require('../api/fetchJoke')
const { getRandomValue } = require('../random')
class Enigma {
    /**
    *  Greet a member when they join the server
    *
    *  @param {Member} member - The member that joined the server
    *  
    *  @returns {string} - A string containing the a welcome message
    */
    greet = async (member) => {
        try {
            let res = await fetchJoke()
            joke = await res?.data?.joke

            let channels = await member.guild.channels.fetch()

            // ** Find the welcome channel **
            let channel = channels.find(elem => elem.type === ChannelType.GuildText && elem.name.includes("welcome"))

            if (!channel) {
                console.error(`No welcome channel found in ( ${guild.name} | ${guild.id} ) `);
                console.log(`Using random channel to send welcome message for ( ${guild.name} | ${guild.id} )`);
                channel = channels.find(elem => elem.type === ChannelType.GuildText)
                if (!channel) {
                    console.error(`No text channel found in ( ${guild.name} | ${guild.id} ) `);
                    return;
                }
            }
            channel.send(this.greet(member.user.id, joke));
        }
        catch (err) {
            console.error(err);
        }
    }

    /** 
    * Returns a random greeting for a member of the server
    *
    * @param {string} memberId - The id of the member 
    * @param {string} joke - The joke to be told
    *
    * @returns {string} - A randomly generated greeting for the member 
    *
    * @example "Hey @member#1234! You're not going to believe this, the guy who got hit in the head with a can of soda 
    * was lucky it was a soft drink."
    */
    greet = (memberId, joke) => {
        const hook = getRandomValue(hooks),
            greeting = getRandomValue(greetings),
            emoji = getRandomValue(emojis),
            joke = joke || getRandomValue(jokes);

        return `${greeting} <@${memberId}>! ${hook}... ${joke} ${emoji}`;
    }
    constructor({ colors, jokes, greetings, hooks, emojis }) {
        this.colors = colors
        this.jokes = jokes
        this.greetings = greetings
        this.hooks = hooks
        this.emojis = emojis
    }
}
module.exports = Enigma
