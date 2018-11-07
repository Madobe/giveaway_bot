/* eslint no-undef: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const nock = require("nock");
const leaderboard = require("../../modules/leaderboard");

describe("leaderboard", () => {
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

  describe("#generate", () => {
    it("returns a string", async () => {
      const result = await leaderboard.generate();

      expect(result).to.be.a("string");
    });
  });

  // #updateChannel is already tested via commands/leaderchannel_test.js
});