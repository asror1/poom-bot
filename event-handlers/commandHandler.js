const manual = require('../manual.json');
const { search_api_key: key, cxId: id } = require('../config.json');
const { default: axios } = require('axios');
const fs = require('fs');
const Map = {};
fs.readFile('./event-handlers/metadata.txt', (err, data) => {
    if (err) throw err;
    data.toString().split('\n').forEach(elem => {
        if (elem && elem.length > 0) {
            const [k, v] = elem.split(',');
            Map[k] = v;
        }
    })
})
module.exports = {
    "!help": () => {
        return manual["!help"];
    },
    "!ping": () => {
        return "pong!";
    },
    "!search": async (args) => {
        const query = args.join(' ');
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
    "!pinboard": (args) => {
        const [subCommand, key, value] = args;
        switch (subCommand) {
            case 'put': {
                fs.appendFile('./event-handlers/metadata.txt', `\n${key}, ${value}`, err => {
                    if (err) throw err;
                })
                Map[key] = value;
                return `Stored - Key: ${key}, Value: ${value}`;
            }
            case 'get': {
                return Map[key] || "Error: Invalid Key :face_with_peeking_eye:";
            }
        }
    },
    "!rolldie": () => {
        return `:game_die: **${randInt(1, 6)}** :game_die:`;
    },
    "default": () => {
        return "Error: Command not found :face_with_peeking_eye:"
    }
}
const randInt = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}
const randDouble = (min, max) => {
    return Math.random() * (max - min) + min;
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
