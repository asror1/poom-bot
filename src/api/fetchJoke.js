const { default: axios } = require('axios')
const { rapid_api_key } = require('../config.json');

module.exports = async () => {
    const url = 'https://geek-jokes.p.rapidapi.com/api?format=json';
    const options = {
        headers: {
            'X-RapidAPI-Key': rapid_api_key,
            'X-RapidAPI-Host': 'geek-jokes.p.rapidapi.com'
        }
    }
    let response
    try {
        response = await axios.get(url, options);
    } catch (err) {
        console.error(err);
    }
    return response
};


