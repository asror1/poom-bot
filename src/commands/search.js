const { SlashCommandBuilder } = require('discord.js')
const fetchQuery = require('../api/fetchSearch');
const QueryEmbed = require('../embeds/QueryEmbed');
const QueryResult = require('../util/QueryResult');
const ErrorEmbed = require('../embeds/ErrorEmbed')
const ErrorType = require('../util/ErrorType')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Word/Phrase to search')
                .setRequired(true)
                .setMinLength(2)
        )
        .setDescription('Search a word/phrase on Google!'),
    async execute(interaction) {
        try {

            let query = interaction.options.getString('query'),
                response
            if (!query) {
                response = { embeds: [new ErrorEmbed(ErrorType.InvalidInput, `No query inputted`)] }
            }
            else {
                let result = await fetchQuery(query.replaceAll(/\s/g, "%20"))
                result = result?.data?.items[0] || {}
                if (!result.snippet || !result.link)
                    response = { embeds: [new ErrorEmbed(ErrorType.InvalidResult, `Unable to retrieve any result with the specified query: ${query}`)] }
                else
                    response = { embeds: [new QueryEmbed(query, new QueryResult(result.title, result.link, result.snippet))] }

            }
            await interaction.reply(response)
        }
        catch (err) {
            console.error(err)
        }
    }
}
