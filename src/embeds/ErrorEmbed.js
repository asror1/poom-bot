// TODO: Convert to extend the @discordjs/builders MessageEmbed class
class ErrorEmbed {
    constructor(type, message) {
        this.title = `${type} Error`
        this.color = 0xcb8175
        this.description = message
    }
}
module.exports = ErrorEmbed
