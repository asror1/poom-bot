const { randomColor, randomInt } = require('../util/random')
// TODO: Convert to use EnigmaBot class
const { die, dice } = require('./images.json')
const numbers = require('./numbers.json')
class DiceEmbed {
    constructor(num) {
        this.color = randomColor()
        if (num == 1) {
            this.thumbnail = {
                url: die
            }
            this.fields = [{
                name: "*You rolled a...*",
                value: `:game_die: ${randomInt(1, 6)} :game_die:`
            }]
        }
        else {
            let total = 0
            let fields = []
            for (let i = 0; i < num; ++i) {
                let roll = randomInt(1, 6);
                fields.push(
                    {
                        name: `${numbers[i]} roll :game_die:`,
                        value: `${roll}`
                    }
                )
                total += roll;
            }
            fields.push({
                name: "Total",
                value: `**${total}**`
            })
            this.title = "*You rolled...*"
            this.thumbnail = {
                url: dice
            }
            this.fields = fields
        }
    }
}
module.exports = DiceEmbed
