const { default: axios } = require('axios');
const { search_api_key: key, cxId: id } = require('../config.json');

module.exports = async (query) => {
    const url = "https://customsearch.googleapis.com/customsearch/v1?"
        + `cx=${id}&`
        + `key=${key}&`
        + `gl=us&`
        + `num=2&`
        + `q=${query}`;
    const options = {
        headers: { "Accept": "application/json" }
    }
    let response
    try {
        response = await axios.get(url, options)
    }
    catch (err) {
        console.error(err);
    }
    return response
}
