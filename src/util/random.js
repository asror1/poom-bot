const colors = require('./colors.json')
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
function randomColor() {
    return parseInt(colors[randomInt(0, colors.length - 1)], 16)
}
module.exports = {
    randomInt: randomInt,
    randomColor: randomColor
}
