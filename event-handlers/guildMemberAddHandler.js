const {rapid_api_key} = require('../config.json');
const {default: axios} = require('axios');
module.exports = async (member=undefined)=>{
    if(!member) return;
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
    const phrases = [
        'Listen',
        'Hear me out',
        'Check this out',
        'You gonna like this one',
        'Escucha',
        'Man',
        'Dudeeee'
    ];
    const url = 'https://geek-jokes.p.rapidapi.com/api?format=json';
    const options = {
        headers: {
            'X-RapidAPI-Key': rapid_api_key,
            'X-RapidAPI-Host': 'geek-jokes.p.rapidapi.com'
        }
    };
    try {
        let response = await axios.get(url, options);
        response = response.data;
        member.guild?.channels.first().send(`Hey ${member.user.username}, ${phrases[Math.round(Math.random()* phrases.length)%phrases.length]}... ${response?.joke || defaultJokes[Math.round(Math.random()* defaultJokes.length)%defaultJokes.length]}`);
    } catch(err){
        console.error(err);
    }
}