/**
* Returns a random integer between min (inclusive) and max (exclusive) 
*
* @param {number} min - The minimum number 
* @param {number} max - The maximum number 
*
* @returns {number} - A random integer between min and max 
*
* @example randomInt(1, 10) // returns a random integer between 1 and 10 
*/
getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min)

/**
* Returns a random value from an array 
*
* @param {array} arr - The array to get a random value from 
*
* @returns {any} - A random value from the array 
* 
* @example getRandomValue([1, 2, 3]) // returns any one of the values from the given array
*/
getRandomValue = (arr = []) => arr[getRandomInt(0, arr.length)]

module.exports = {
    getRandomInt: getRandomInt,
    getRandomValue: getRandomValue
}
