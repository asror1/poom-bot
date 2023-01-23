const { randomColor } = require('../util/random')
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
