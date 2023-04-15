const { default: axios } = require('axios')

module.exports = async () => {
    const url = 'https://geek-jokes.sameerkumar.website/api?format=json';
    const options = {
        headers: {
            Accept: "application/json"
        }
    }
    try {

        const response = await axios.get(url, options);
        return response?.data?.joke;

    } catch (err) {
        console.error(err);
    }
};

