/* eslint no-undef: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const nock = require("nock");
const command = require("../../commands/top");

describe("top", () => {
  const message = { channel: { send: (text) => { return text; } } };

  describe("#run", () => {
    nock.disableNetConnect();
    nock(/www\.googleapis\.com/)
      .get(/.*/)
      .reply(200, {});
    nock(/www\.googleapis\.com/)
      .persist()
      .filteringPath(() => "/")
      .post("/")
      .reply(200, {});
    nock(/sheets\.googleapis\.com/)
      .persist()
      .get(/.*/)
      .reply(200, {
        values: [
          ["One", 1],
          ["Two", 2],
          ["Three", 3],
          ["Four", 4]
        ]
      });

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