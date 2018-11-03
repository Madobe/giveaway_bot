/* eslint no-undef: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const leaderboard = require("../../modules/leaderboard");

describe("leaderboard", () => {
  describe("#generate", () => {
    it("returns a string", async () => {
      const result = await leaderboard.generate();

      expect(result).to.be.a("string");
    });
  });

  // #updateChannel is already tested via commands/leaderchannel_test.js
});