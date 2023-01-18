const { randomColor } = require('../util/random')

class ErrorEmbed {
    constructor(type, message) {
        this.title = `${type} Error`
        this.color = randomColor()
        this.description = message
    }
}
module.exports = ErrorEmbed
