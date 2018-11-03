/* eslint no-undef: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const command = require("../../commands/donationresponses");

const storage = require("node-persist");

describe("donationresponses", () => {
  const channelId = "1234567890";

  const client = {};
  const message = {
    content: `!command ${channelId}`,

    channel: {
      send: (text) => { return text; }
    }
  };
  const args = { storageOpts: { dir: ".temp/storage" } };

  describe("#run", () => {
    before(async () => {
      await storage.init(args.storageOpts);
    });

    after(async () => {
      await storage.clear();
    });

    it("saves the value", async () => {
      await command.run(client, message, args);
      const value = await storage.getItem("donationNotificationChannelId");
      expect(value).to.equal(channelId);
    });

    describe("#conf", () => {
      it("requires the user to be a moderator", () => {
        expect(command.conf.permissionLevel).to.equal("Moderator");
      });
    });
  });
});