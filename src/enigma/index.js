const Enigma = require('./Enigma')

const colors = [
    "cb8175",
    "e2a97e",
    "f0cf8e",
    "f6edcd",
    "a8c8a6",
    "6d8d8a",
    "655057"
]
const jokes = [
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
const hooks = [
    "Listen",
    "Hear me out",
    "Check this out",
    "You gonna like this one",
    "Escucha",
    "Man",
    "Dudeeee"
]
const greetings = [
    "Hey!",
    "Howdy",
    "Hola!",
    "Herro!",
    "Greetings!",
    "How do you do!",
    "Yo!"
]
const emojis = [
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
const enigma = new Enigma({ colors: colors, jokes: jokes, hooks: hooks, greetings: greetings, emojis: emojis })
module.exports = enigma
