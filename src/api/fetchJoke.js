const { default: axios } = require('axios')

module.exports = async () => {
    const url = 'https://geek-jokes.sameerkumar.website/api?format=json';
    const options = {
        headers: {
            Accept: "application/json"
        }
    }
    try {
        return await axios.get(url, options);
    } catch (err) {
        console.error(err);
    }
};


