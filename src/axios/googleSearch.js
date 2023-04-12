const { default: axios } = require('axios');
const { search_api_key: key, cxId: id } = require('../config.json');

module.exports = async (query) => {
    const url = "https://customsearch.googleapis.com/customsearch/v1?"
        + `cx=${id}&`
        + `key=${key}&`
        + `gl=us&`
        + `num=1&`
        + `q=${query.replaceAll(/\s/g, "%20")}`;
    const options = {
        headers: { "Accept": "application/json" }
    }
    try {
        const response = await axios.get(url, options)
        return response?.data?.items[0];
    }
    catch (err) {
        console.error(err);
    }
}
