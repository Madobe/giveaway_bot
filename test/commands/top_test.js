/* eslint no-undef: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;

const command = require("../../commands/top");
const mockGsheets = require("../shared/mock_gheets");

describe("top", () => {
  const message = { channel: { send: (text) => { return text; } } };

  describe("#run", () => {
    mockGsheets();

    it("returns a string", async () => {
      const result = await command.run({}, message, {});

      expect(result).to.be.a("string");
    });
  });

  describe("#conf", () => {
    it("should be available to all users", () => {
      expect(command.conf.permissionLevel).to.equal("none");
    });
  });
});