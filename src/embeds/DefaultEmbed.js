/** 
*    Default embed to be used by the bot  
*    @param {string} title - The title of the embed 
*    @param {string} message - Messages to be sent in the embed
*/
// TODO: Refactor to extend the @discordjs/builders MessageEmbed class
class DefaultEmbed {
    constructor(title, message) {
        if (!message) {
            throw "Cannot send an emty embed, must have a message"
        }
        else {
            if (title) this.title = title
            this.color = 0x6d8d8a
            this.description = message
        }
    }
}
module.exports = DefaultEmbed
