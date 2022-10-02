// Imports... 
// EmbedBuilder - for constructing message Embeds for responding to commands.
// axios -  for sending an api request, to google search api.
// fs - stands for File System, used to read and write(append) pinboard data.
// key - google search api key, 
// id - search engine id for making requests to custom search engine
// manual - manual to bot commands

const { EmbedBuilder } = require('discord.js');
const { default: axios } = require('axios');
const fs = require('fs');
const { search_api_key: key, cxId: id } = require('../config.json');
const manual = require('../manual.json');

// Initializing Variables...
const COLORS = ["#cb8175", "#e2a97e", "#f0cf8e", "#f6edcd", "#a8c8a6", "#6d8d8a", "#655057"];
const PINBOARD_STORE = "./event-handlers/metadata.txt";
const Map = {};
(async function init() {
    try {
        const contents = await fs.promises.readFile(PINBOARD_STORE);
        contents.toString().split('\n').forEach(elem => {
            if (elem && elem.length > 0) {
                const [k, v] = elem.split(',');
                Map[k] = v;
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}())

// Utility Methods...
const randInt = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}
const randColor = () => {
    return COLORS[randInt(0, COLORS.length)];
}
const embedWrapper = (data) => {
    return { embeds: [data] };
}
const fetchResults = async (query) => {
    const url = `https://customsearch.googleapis.com/customsearch/v1?cx=${id}&key=${key}&gl=us&num=2&q=${query}`;
    return await axios.get(url, { headers: { "Accept": "application/json" } })
}
const formatResults = (query, { snippet, link, title }, fallback) => {
    const embed = new EmbedBuilder()
        .setTitle("Google Search")
        .setColor(randColor())
        .setDescription(query)
        .setThumbnail("https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png")
    if (!snippet || !link) {
        embed.setDescription(fallback);
        return embedWrapper(embed);
    }
    embed.addFields(
        {
            name: "*Title*",
            value: title
        },
        {
            name: "*Result*",
            value: snippet
        },
        {
            name: "*Link*",
            value: link
        }

    )
    return embedWrapper(embed);
}

// Main export, command handler.
module.exports = {
    "!help": () => {
        return manual["!help"];
    },
    "!ping": () => {
        return "pong!";
    },
    "!search": async (args) => {
        try {
            const query = args.join(' ');
            let parsed = query.replaceAll(query[query.search(/^\w/g)], "%20");
            let result = await fetchResults(parsed);
            result = result?.data?.items[0] || {};
            return formatResults(query, result, "No results found :slight_frown:");
        } catch (err) {
            console.log(err);
        }
    },
    "!pinboard": (args) => {
        const [subCommand, key, value] = args;
        switch (subCommand) {
            case 'put': {
                fs.appendFile(PINBOARD_STORE `\n${key}, ${value}`, err => {
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
        return embedWrapper(
            new EmbedBuilder()
                .setColor(randColor())
                .addFields({
                    name: "*You rolled a...*",
                    value: `:game_die: **${randInt(2, 6)}** :game_die:`
                })
                .setThumbnail("https://cdn.dribbble.com/users/6059148/screenshots/14425859/media/3f67e0e620f3818a68a03fdb874b7a56.gif")
        )

    },
    "default": () => {
        return "Error: Command not found :face_with_peeking_eye:"
    }
}
