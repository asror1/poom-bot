const { ChannelType } = require('discord.js')
const geekJoke = require('../axios')
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
            let joke = await geekJoke(),
                channels = await member.guild.channels.fetch()

            let channel = this.#findChannel(channels, ChannelType.GuildText, 'welcome')
            if (!channel) {
                console.error(`No text channel found in ( ${guild.name} | ${guild.id} ) `);
                return;
            }
            channel.send(this.#greet(member.user.id, joke));
        }
        catch (err) {
            console.error(err);
        }
    }
    /**
    * Find a  channel in a given list of channels
    *
    * @param {Array} channels - The list of channels to search
    * @param {ChannelType} type? - The type of channel to search for (default: ChannelType.GuildText)
    * @param {string} name? - The name of the channel to search for 
    *
    * @returns {Channel} - Found channel or undefined
    *
    * @example findChannel(channels, ChannelType.GuildText, 'welcome') // Find a text channel named 'welcome'
    */
    #findChannel = (channels = [], type = ChannelType.GuildText, name) => {
        let typeChannels = channels.filter(elem => elem.type === type)
        if (name) {
            return typeChannels.find(elem => elem.name.includes(name)) || typeChannels[0]
        }
        return typeChannels[0]
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
    #greet = (memberId, joke) => {
        const greeting = getRandomValue(greetings) || "Hey",
            hook = getRandomValue(hooks) || "You're not going to believe this",
            joke = joke || getRandomValue(jokes) || "I'm a joke",
            newMember = (memberId ? `<@${memberId}>` : "New Traveler"),
            emoji = getRandomValue(emojis) || ":smile:";

        return `${greeting} ${newMember}! ${hook}... ${joke} ${emoji}`;
    }
    constructor({ colors = [], jokes = [], greetings = [], hooks = [], emojis = [] }) {
        this.colors = colors
        this.jokes = jokes
        this.greetings = greetings
        this.hooks = hooks
        this.emojis = emojis
    }
}
module.exports = Enigma
