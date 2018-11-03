/* eslint no-undef: 0 */
const Discord = require("discord.js");
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const command = require("../../commands/leaderchannel");

const storage = require("node-persist");

describe("donationresponses", () => {
  describe("#run", () => {
    const message = {
      channel: {
        send: (m) => { return m; },
        fetchMessages: async () => {
          return new Discord.Collection(
            [[
              1,
              {
                author: { id: 1 },
                edit: (m) => { return m; }
              }
            ]]);
        }
      },
      content: "!command 1"
    };
    const client = {
      channels: { get: () => { return message.channel; } },
      user: { id: 1 }
    };
    const args = { storageOpts: { dir: ".temp/storage" } };

    before(async () => { await storage.init(args.storageOpts); await storage.clear(); });
    after(async () => { await storage.clear(); });

    it("saves the channel ID", async () => {
      await command.run(client, message, args);

      const id = await storage.getItem("leaderboardChannelId");

      expect(id).to.equal("1");
    });
  });

  describe("#conf", () => {
    it("requires the user to be a moderator", () => {
      expect(command.conf.permissionLevel).to.equal("Moderator");
    });
  });
});