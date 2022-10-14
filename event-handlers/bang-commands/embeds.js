const { EmbedBuilder } = require('discord.js');
const manual = require('../../manual.json');
const utility = require('./utility');
const { randColor, randInt, NUMBERS } = utility;

const QUERY_IMAGE = "https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png";
const DICE_IMAGE = "https://cdn.dribbble.com/users/6059148/screenshots/14425859/media/3f67e0e620f3818a68a03fdb874b7a56.gif";
const MULTIPLE_DICE_IMAGE = "https://i.gifer.com/RlY0.gif";

const EmbedWrapper = (embed) => {
    return { embeds: [embed] };
}
exports.ErrorEmbed = (type, message) => {
    return EmbedWrapper(new EmbedBuilder()
        .setTitle(`Error: ${type}`)
        .setColor(randColor())
        .setDescription(message));
}
exports.HelpEmbed = (command) => {
    const embed = new EmbedBuilder().setColor(randColor());
    if (command == "!help") {
        return EmbedWrapper(embed
            .setTitle(manual["!help"]["title"])
            .setDescription(manual["!help"]["desc"])
            .addFields(manual["!help"]["fields"])
            .setURL(manual["!help"]["link"])
        )
    }
    return EmbedWrapper(embed
        .setTitle(manual[command]["title"])
        .setDescription(manual[command]["desc"])
        .addFields(manual[command]["fields"])
    )
}
exports.RollEmbed = (num) => {
    const embed = new EmbedBuilder()
        .setColor(randColor())
    if (num == 1) {
        return EmbedWrapper(embed
            .setThumbnail(DICE_IMAGE)
            .addFields({
                name: "*You rolled a...*",
                value: `:game_die: ${randInt(1, 6)} :game_die:`
            }))
    }
    else {
        let total = 0;
        for (let i = 0; i < num; ++i) {
            let roll = randInt(1, 6);
            embed.addFields({
                name: `${NUMBERS[i]} roll :game_die:`,
                value: `${roll}`
            })
            total += roll;
        }
        return EmbedWrapper(embed
            .setTitle("*You rolled...*")
            .setThumbnail(MULTIPLE_DICE_IMAGE)
            .addFields({
                name: "Total",
                value: `**${total}**`
            })
        );
    }
}
exports.QueryEmbed = (query, { snippet, link, title }, fallback) => {
    if (!snippet || !link)
        return ErrorEmbed("No Results Found", fallback);
    return EmbedWrapper(new EmbedBuilder()
        .setTitle("Search Result")
        .setColor(randColor())
        .setDescription(query)
        .setThumbnail(QUERY_IMAGE)
        .addFields(
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
        ));
}
