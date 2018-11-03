/* eslint no-undef: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const command = require("../../commands/help");

describe("help", () => {
  const message = { channel: { send: (text) => { return text; } } };

  describe("#run", () => {
    it("should return a string surrounded by ```", async () => {
      const helpText = await command.run({}, message, {});

      expect(helpText).to.be.a("string");
      expect(helpText).to.startsWith("```");
      expect(helpText).to.endsWith("```");
    });
  });

  describe("#conf", () => {
    it("should be available to all users", () => {
      expect(command.conf.permissionLevel).to.equal("none");
    });
  });
});