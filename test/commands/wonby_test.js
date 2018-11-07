/* eslint no-undef: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const command = require("../../commands/wonby");
const units = require("../../commands/wonby").units;

describe("wonby", () => {
  describe("#collectDiscordTags", async () => {
    it("collects tags that are just text", () => {
      const message = {
        channel: { send: (text) => { return text; } },
        content: "!command 1 | Nanamin#1103 | Merleawe",
        mentions: { users: [] }
      };

      const result = units.collectDiscordTags(message);

      expect(result).to.eql(["Nanamin#1103"]);
    });

    it("collects tags that are mentions", () => {
      const message = {
        channel: { send: (text) => { return text; } },
        content: "!command 1 | <@178472840956215296> | Merleawe",
        mentions: { users: [{ tag: "Nanamin#1103" }] }
      };

      const result = units.collectDiscordTags(message);

      expect(result).to.eql(["Nanamin#1103"]);
    });

    it("removes duplicates", () => {
      const message = {
        channel: { send: (text) => { return text; } },
        content: "!command 1 | Nanamin#1103 Nanamin#1103 | Merleawe",
        mentions: { users: [{ tag: "Nanamin#1103" }, { tag: "Nanamin#1103" }] }
      };

      const result = units.collectDiscordTags(message);

      expect(result).to.eql(["Nanamin#1103"]);
    });
  });

  describe("processIGNs", () => {
    it("collects the IGNs properly", () => {
      const message = { content: "!command 1 | Nanamin#1103 | Merleawe" };

      const result = units.processIGNs(message);

      expect(result).to.eql(["Merleawe"]);
    });
  });

  describe("#conf", () => {
    it("requires the user to be a moderator", () => {
      expect(command.conf.permissionLevel).to.equal("Moderator");
    });
  });
});