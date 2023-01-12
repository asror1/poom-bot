const {rapid_api_key} = require('../config.json');
const {default: axios} = require('axios');
const defaultJokes = [
    "Why is Peter Pan always flying? Because he Neverlands.",
    "Which state has the most streets? Rhode Island.",
    "What do you call 26 letters that went for a swim? Alphawetical.",
    "What’s the name of a very polite, European body of water? Merci.",
    "Why was the color green notoriously single? It was always so jaded.",
    "I used to hate facial hair, but then it grew on me.",
    "I want to make a brief joke, but it’s a little cheesy.",
    "Why did the coach go to the bank? To get his quarterback.",
    "How do celebrities stay cool? They have many fans."
];
const hooks = [
    'Listen',
    'Hear me out',
    'Check this out',
    'You gonna like this one',
    'Escucha',
    'Man',
    'Dudeeee'
];
const greetings = [
    'Hey', 'Howdy', 'Hola', 'Herro', 'Greetings', 'How do you do', 'Yo'
];
const emojis = [
    '🖖','👀', '👅', '👊', '💥', '💯', '😎', '😏', '😳', '😹'
];

module.exports = async (member)=>{
    if(!member) return;
    const url = 'https://geek-jokes.p.rapidapi.com/api?format=json';
    const options = {
        headers: {
            'X-RapidAPI-Key': rapid_api_key,
            'X-RapidAPI-Host': 'geek-jokes.p.rapidapi.com'
        }
    };
    try {
        let response = await axios.get(url, options);
        let joke = response?.data?.joke;
        let channel = await member.guild?.channels.fetch();
        channel = channel.find(elem=>elem.type===0);
        channel.send(generateMadlib(member.user.id, joke));
    } catch(err){
        console.error(err);
    }
}
const randomIndex = (max) => Math.round(Math.random() * max) % max;
const generateMadlib = (id, joke) =>{
    let greeting = greetings[randomIndex(greetings.length)];
    let hook = hooks[randomIndex(hooks.length)];
    joke = joke || defaultJokes[randomIndex(defaultJokes.length)];
    joke = joke.replaceAll('Chuck Norris', "Danny DeVito");
    joke = joke.replaceAll('Chuck', "Danny");
    joke = joke.replaceAll('Norris', "DeVito");
    let emoji = emojis[randomIndex(emojis.length)];
    return `${greeting} <@${id}>! ${hook}... ${joke} ${emoji}`;
}
