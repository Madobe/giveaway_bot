/* eslint no-undef: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const command = require("../../commands/role");

describe("role", () => {
  const message = {
    channel: { send: (text) => { return text; } },
    guild: {
      roles: {
        find: (field, value) => { return value === "Role" ? { id: 1 } : null; }
      }
    }
  };

  describe("#run", () => {
    it("returns an error message if no arguments were provided", async () => {
      const result = await command.run({}, message, []);

      expect(result).to.startWith("No role name");
    });

    it("returns null if the role doesn't exist", async () => {
      const result = await command.run({}, message, ["Faggot"]);

      expect(result).to.equal(null);
    });

    it("returns a role ID given valid input", async () => {
      const result = await command.run({}, message, ["Role"]);

      expect(result).to.equal(1);
    });
  });

  describe("#conf", () => {
    it("should be available to all users", () => {
      expect(command.conf.permissionLevel).to.equal("none");
    });
  });
});