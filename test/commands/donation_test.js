/* eslint no-undef: 0, no-unused-vars: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const command = require("../../commands/donation");
const units = require("../../commands/donation").units;

describe("donation", () => {
  describe("#conf", () => {
    it("should be available to all users", () => {
      expect(command.conf.permissionLevel).to.equal("none");
    });
  });
});