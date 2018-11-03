/* eslint no-undef: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const command = require("../../commands/invite");

describe("invite", () => {
  const message = { channel: { send: (text) => { return text; } } };

  describe("#run", () => {
    it("should return a url", async () => {
      const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

      const inviteLink = await command.run({}, message, {});

      expect(inviteLink).to.be.a("string");
      expect(inviteLink).to.match(urlRegex);
    });
  });

  describe("#conf", () => {
    it("should be available to all users", () => {
      expect(command.conf.permissionLevel).to.equal("none");
    });
  });
});