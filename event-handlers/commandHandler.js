const manual = require('../manual.json');
const { search_api_key: key, cxId: id } = require('../config.json');
const { default: axios } = require('axios');
const joke = require('./guildMemberAddHandler');
module.exports = {
    "!help": () => {
        return manual["!help"];
    },
    "!ping": () => {
        return "pong!";
    },
    "!search": async (query) => {
        let result;
        let response = `No result found - \"${query}\"`;
        let parsed = query.replaceAll(query[query.search(/^\w\s/g)], " ").replaceAll(" ", "%20");
        try {
            result = await fetchResults(parsed);
        } catch (err) {
            console.log(err);
        }
        result = result?.data?.items[0] || {};
        return formatSearchResult(result, response);
    },
    "default": () => {
        return "Command not found :/"
    }
}
const fetchResults = async (query) => {
    const response = await axios.get(
        `https://customsearch.googleapis.com/customsearch/v1?cx=${id}&key=${key}&gl=us&num=2&q=${query}`, {
        headers: {
            "Accept": "application/json"
        }
    })
    return response;
}
const formatSearchResult = ({ snippet, link }, fallback) => {
    if (!snippet || !link) return fallback;
    return `Result: ${snippet}

Link: ${link}`;
}