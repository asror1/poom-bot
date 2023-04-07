const EnigmaBot = require('../src/util/EnigmaBot')

describe('enigma bot should contain all the neccesary functionalities', () => {
    let enigmaBot, colors, jokes, greetings, hooks, emojis
    beforeEach(() => {
        colors = ["cb8175", "e2a97e"]
        jokes = ["Why is Peter Pan always flying? Because he Neverlands."]
        greetings = ["Herro"]
        hooks = ["Hear me out..."]
        emojis = ["👍"]
        enigmaBot = new EnigmaBot(colors, jokes, greetings, hooks, emojis)
    })
    it('should not be able to return maximum (2) with min=1, max=2 since max is meant to be exclusive', () => {
        for (let i = 0; i < 100; i++) {
            expect(EnigmaBot.getRandomInt(1, 2)).not.toBe(2)
        }
    })
    it('should be able to generate a random integer in the range 1-6', () => {
        expect(EnigmaBot.getRandomInt(1, 7)).toBeGreaterThanOrEqual(1)
        expect(EnigmaBot.getRandomInt(1, 7)).toBeLessThanOrEqual(6)
    })
    it('should be able to return a random color as a hexadecimal number', () => {
        const firstColor = parseInt(colors[0], 16)
        const secondColor = parseInt(colors[1], 16)
        expect([firstColor, secondColor]).toContain(enigmaBot.getRandomColor())
    })
})
