const {rapid_api_key} = require('../config.json');
module.exports = async (member)=>{
    const defaultJokes = [
        "Why is Peter Pan always flying? Because he Neverlands.",
        "Which state has the most streets? Rhode Island.",
        "What do you call 26 letters that went for a swim? Alphawetical.",
        "What’s the name of a very polite, European body of water? Merci.",
        "Why was the color green notoriously single? It was always so jaded.",
        "I used to hate facial hair, but then it grew on me.",
        "I want to make a brief joke, but it’s a little cheesy.",
        "Why did the coach go to the bank? To get his quarterback.",
        "How do celebrities stay cool? They have many fans."];
    const url = 'https://geek-jokes.p.rapidapi.com/api?format=json';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': rapid_api_key,
            'X-RapidAPI-Host': 'geek-jokes.p.rapidapi.com'
        }
    };
    let response = await fetch(url, options);
    let joke = await response.json();
    member.guild.channels.first().send(`Hey ${member.user.username}! - ${joke?.joke || defaultJokes[Math.round(Math.random()* defaultJokes.length())]} `);
}