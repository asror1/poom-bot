const { getRandomValue, getRandomInt } = require('../src/random');

describe.skip("random module test", () => {
    it('should be able to generate a random integer in the range 1-6', () => {
        const iterations = 100
        let equalCounter = 0
        for (let i = 0; i < iterations; i++) {
            let int1 = getRandomInt(1, 7);
            let int2 = getRandomInt(1, 7);
            if (int1 === int2) ++equalCounter
            expect(int1).toBeGreaterThanOrEqual(1);
            expect(int2).toBeLessThanOrEqual(6);
        }
        expect(equalCounter).toBeLessThan(50);
        expect(equalCounter).toBeGreaterThanOrEqual(5);
    })
    it("should not be able to generate a the maximum value specified", () => {
        const iterations = 20
        for (let i = 0; i < iterations; i++) {
            expect(getRandomInt(1, 2)).not.toBe(2);
        }
    });
    it("should return a random value from an array", () => {
        const iterations = 100
        const threshold = 20
        const arr = ["a", "b", "c"]
        let aCounter = bCounter = cCounter = 0
        for (let i = 0; i < iterations; i++) {
            let val = getRandomValue(arr)
            if (val === "a") ++aCounter
            if (val === "b") ++bCounter
            if (val === "c") ++cCounter
        }
        expect(aCounter).toBeGreaterThanOrEqual(threshold)
        expect(bCounter).toBeGreaterThanOrEqual(threshold)
        expect(cCounter).toBeGreaterThanOrEqual(threshold)

    });
});
