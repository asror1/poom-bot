const { default: axios } = require('axios');
const { search_api_key: key, cxId: id } = require('../config.json');

module.exports = async (query) => {
    const url = "https://customsearch.googleapis.com/customsearch/v1?"
        + `cx=${id}&`
        + `key=${key}&`
        + `gl=us&`
        + `num=2&`
        + `q=${query}`;
    return await axios.get(url, { headers: { "Accept": "application/json" } })
}
