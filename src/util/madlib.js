const { randomInt } = require('./random')
const { greetings, hooks, jokes, emojis } = require('./madlib.json')
/** 
* Generates a madlib from static store (./madlib.json)
*/
module.exports = {
    // Greet member with a joke, fallback is jokes from static store
    greet(memberId, joke) {
        joke = joke || jokes[randomInt(0, jokes.length)];
        joke = joke.replaceAll("Chuck Norris", "Danny DeVito");
        let hook = hooks[randomInt(0, hooks.length)],
            greeting = greetings[randomInt(0, greetings.length)],
            emoji = emojis[randomInt(0, emojis.length)];
        return `${greeting} <@${memberId}>! ${hook}... ${joke} ${emoji}`;
    },
    // Greet member with a joke from static store
    greet(memberId) {
        let hook = hooks[randomInt(0, hooks.length)],
            greeting = greetings[randomInt(0, greetings.length)],
            emoji = emojis[randomInt(0, emojis.length)],
            joke = jokes[randomInt(0, jokes.length)]
        return `${greeting} <@${memberId}>! ${hook}... ${joke} ${emoji}`;
    }
}
