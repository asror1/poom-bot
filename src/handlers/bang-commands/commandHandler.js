const fetchQuery = require('../../api/fetchQuery');
const { HelpEmbed, QueryEmbed, RollEmbed, ErrorEmbed } = require('./embeds');
const CommandType = require('./CommandType.json');
const ErrorType = require('./ErrorType.json');

module.exports = {
    "!help": (args) => {
        let [command] = args;
        if (!command) return HelpEmbed("!help");
        command = "!" + command.replaceAll("!", "");
        let c = Object.values(CommandType).find(elem => elem.includes(command));
        if (!c)
            return ErrorEmbed(ErrorType.INVALID_COMMAND, "Please check the manual... !h / !help");
        return HelpEmbed(c.at(-1));
    },
    "!search": async (args) => {
        const query = args.join(' ');
        let parsed = query.replaceAll(query[query.search(/^\w/g)], "%20");
        let result = await fetchQuery(parsed);
        result = result?.data?.items[0] || {};
        return QueryEmbed(query, result, `Invalid query... ${query}`);
    },
    "!rolldie": (args = []) => {
        const num = args[0];
        if (num == undefined) {
            return RollEmbed(1);
        }
        else if (num <= 0 || num > 5) {
            return ErrorEmbed(ErrorType.LIMIT_EXCEEDED, "Range of die allowed... 1-5");
        }
        let t = parseInt(num);
        if (isNaN(t)) {
            return ErrorEmbed(ErrorType.INVALID_INPUT, `\"${num}\" is not a number!`);
        }
        return RollEmbed(t)
    },
    "default": () => {
        return ErrorEmbed(ErrorType.INVALID_COMMAND, "Please check the manual... !h / !help")
    }
}
