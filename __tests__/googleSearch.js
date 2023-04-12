const { default: axios } = require('axios')
const { googleSearch } = require('../src/axios')

jest.mock('axios')

describe("Google Search Api axios wrapper", () => {
    it("should be able to resolve to the intented object", async () => {
        const response = {
            data: {
                items: [
                    {
                        title: "Oatmeal - Wikipedia",
                        link: "https://en.wikipedia.org/wiki/Oatmeal",
                        snippet: "Oatmeal is a dish made from ground or rolled oats..."
                    }
                ]
            }
        }
        axios.get.mockResolvedValue(response)
        await expect(googleSearch("What is oatmeal?")).resolves.toBe(response.data.items[0])
    })
    it("should not throw an error, even on an erronous api response", async () => {
        axios.get.mockRejectedValue(new Error("API Error"))
        await expect(googleSearch("What is oatmeal?")).resolves.not.toThrow()

    });
    it("should not throw an error, even if invalid response format", async () => {
        const response = {
            data: {
                item: {
                    title: "Oatmeal - Wikipedia",
                    link: "https://en.wikipedia.org/wiki/Oatmeal",
                    snippet: "Oatmeal is a dish made from ground or rolled oats..."
                }
            }
        }
        axios.get.mockResolvedValue(response)
        await expect(googleSearch("What is oatmeal?")).resolves.not.toThrow()
    });
});
