const fetchJoke = require('../api/fetchJoke')
class EnigmaBot {
    colors =
        [
            "cb8175",
            "e2a97e",
            "f0cf8e",
            "f6edcd",
            "a8c8a6",
            "6d8d8a",
            "655057"
        ]
    jokes = [
        "Why is Peter Pan always flying? Because he Neverlands.",
        "Which state has the most streets? Rhode Island.",
        "What do you call 26 letters that went for a swim? Alphawetical.",
        "What’s the name of a very polite, European body of water? Merci.",
        "Why was the color green notoriously single? It was always so jaded.",
        "I used to hate facial hair, but then it grew on me.",
        "I want to make a brief joke, but it’s a little cheesy.",
        "Why did the coach go to the bank? To get his quarterback.",
        "How do celebrities stay cool? They have many fans."
    ]
    hooks = [
        "Listen...",
        "Hear me out...",
        "Check this out...",
        "You gonna like this one...",
        "Escucha...",
        "Man...",
        "Dudeeee..."
    ]
    greetings = [
        "Hey!",
        "Howdy",
        "Hola!",
        "Herro!",
        "Greetings!",
        "How do you do!",
        "Yo!"
    ]
    emojis = [
        "🖖",
        "👀",
        "👅",
        "👊",
        "💥",
        "💯",
        "😎",
        "😏",
        "😳",
        "😹"
    ]
    /**
    * Returns a random integer between min (inclusive) and max (exclusive) 
    *
    * @param {number} min - The minimum number 
    * @param {number} max - The maximum number 
    *
    * @returns {number} - A random integer between min and max 
    *
    * @example randomInt(1, 10) // returns a random integer between 1 and 10 
    */
    static getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min)

    greet = async (member) => {
        try {
            let res = await fetchJoke()
            joke = await res?.data?.joke

            let channels = await member.guild.channels.fetch()

            // ** Finding the welcome channel **
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
    * Returns a random color from the colors array as a hex string
    *
    * @returns {string} - A random color from the colors array
    *
    * @example 0xFF0000 // red
    */
    getRandomColor = () => parseInt(this.colors[EnigmaBot.getRandomInt(0, this.colors.length)], 16)

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
        const hook = hooks[EnigmaBot.getRandomInt(0, hooks.length)],
            greeting = greetings[EnigmaBot.getRandomInt(0, greetings.length)],
            emoji = emojis[EnigmaBot.getRandomInt(0, emojis.length)];

        return `${greeting} <@${memberId}>! ${hook}... ${joke} ${emoji}`;
    }
    /**
    * Returns a random greeting for a member of the server 
    *
    * @param {string} memberId - The id of the member 
    *
    * @returns {string} - A randomly generated greeting for the member 
    *
    * @example "Hey @member#1234! You're not going to believe this, the guy who got hit in the head with a can of soda
    * was lucky it was a soft drink."
    */
    greet = (memberId) => {
        const hook = hooks[EnigmaBot.getRandomInt(0, hooks.length)],
            greeting = greetings[EnigmaBot.getRandomInt(0, greetings.length)],
            emoji = emojis[EnigmaBot.getRandomInt(0, emojis.length)],
            joke = jokes[EnigmaBot.getRandomInt(0, jokes.length)];

        return `${greeting} <@${memberId}>! ${hook}... ${joke} ${emoji}`;
    }
    constructor(colors, jokes, greetings, hooks, emojis) {
        this.colors = colors
        this.jokes = jokes
        this.greetings = greetings
        this.hooks = hooks
        this.emojis = emojis
    }
}
module.exports = EnigmaBot
