/* eslint no-undef: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const userInput = require("../../modules/userinput");

describe("help", () => {
  describe("#getUserInput", () => {
    const message = {
      channel: {
        awaitMessages: async () => {
          return { first: () => { return { content: "response" }; } };
        }
      }
    };

    it("collects a response", async () => {
      const result = await userInput.getUserInput(message);

      expect(result).to.equal("response");
    });
  });

  // #getSingleInput is just the same as above + message.channel.send so no point testing it
});