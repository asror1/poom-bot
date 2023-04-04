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
        // Declaration and definition of variables used in the command
        let respond = async (embed) => { await interaction.reply({ embeds: [embed] }) },
            query = interaction.options.getString('query')
        try {
            // ** Fetch the result for the indicated query on google search ** 
            let result = await fetchQuery(query.replaceAll(/\s/g, "%20"))
            result = result?.data?.items[0] || {}

            // ** Check to see if the query produced a result **
            if (!result.snippet || !result.link)
                return await respond(new ErrorEmbed(ErrorType.InvalidResult, `Unable to retrieve any result with the specified query: ${query}`))

            // ** Respond with the result that was retrieve from google search **
            return await respond(new QueryEmbed(query, new QueryResult(result.title, result.link, result.snippet)))
        }
        catch (err) {
            console.error(err)
            return await respond(new ErrorEmbed(ErrorType.Unexpected, "Most likely not your fault, to report the error, please head over to https://github.com/asror1/enigma-bot/issues and submit an issue."))
        }
    }
}