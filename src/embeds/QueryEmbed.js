const { query: queryImg } = require('./images.json')
// TODO: Convert to use EnigmaBot class
const { randomColor } = require('../util/random')

class QueryEmbed {
    constructor(query, queryResult) {
        this.title = "Search Result"
        this.color = randomColor()
        this.description = query
        this.thumbnail = { url: queryImg }
        this.fields = [{
            name: "*Title*",
            value: queryResult.title
        },
        {
            name: "*Result*",
            value: queryResult.snippet
        },
        {
            name: "*Link*",
            value: queryResult.link
        }
        ]
    }
}
module.exports = QueryEmbed
