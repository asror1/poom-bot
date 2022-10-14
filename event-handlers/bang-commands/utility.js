const COLORS = ["#cb8175", "#e2a97e", "#f0cf8e", "#f6edcd", "#a8c8a6", "#6d8d8a", "#655057"];
const randInt = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

exports.NUMBERS = ["First", "Second", "Third", "Fourth", "Fifth"];
exports.randInt = randInt;
exports.COLORS = COLORS;
exports.randColor = () => {
    return COLORS[randInt(0, COLORS.length)];
}
