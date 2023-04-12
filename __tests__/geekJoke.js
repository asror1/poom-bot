const { default: axios } = require('axios')
const { geekJoke } = require('../src/axios')

jest.mock('axios')

describe("Geek Joke Api axios request", () => {
    test("successful request", async () => {
        const data = {
            joke: "Some joke about Chuck Norris"
        }
        axios.get.mockResolvedValue({ data });
        await expect(geekJoke()).resolves.toBe(data.joke);

    });
    test("invalid response format being properly handled", async () => {
        const data = "Some joke about Chuck Norris"
        axios.get.mockResolvedValue({ data });
        await expect(geekJoke()).resolves.toBeUndefined();
    });
    test("unsuccessful request", async () => {
        const errorMessage = "Network Error";
        axios.get.mockImplementation(() => Promise.reject(new Error(errorMessage)));
        await expect(geekJoke()).resolves.toBeUndefined();
    });
});
