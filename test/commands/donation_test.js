/* eslint no-undef: 0, no-unused-vars: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const units = require("../../commands/donation").units;

const storage = require("node-persist");

describe("donation", () => {
  describe("#getResponses", () => {
    it("gathers all the responses correctly", async () => {
      const message = {
        channel: {
          awaitMessages: async () => {
            return { first: () => { return { content: "response" }; } };
          },
          send: async () => { return; }
        }
      };

      const responses = await units.getResponses(message);

      expect(responses.length).to.equal(6);
    });

    it("cancels any time", async () => {
      let counter = 0;
      const message = {
        channel: {
          awaitMessages: async () => {
            return {
              first: () => {
                counter += 1;
                if(counter === 3) {
                  return { content: "cancel" };
                } else {
                  return { content: "response" };
                }
              }
            };
          },
          send: async () => { return; }
        }
      };

      const responses = await units.getResponses(message);

      console.log(responses);
      expect(responses).to.equal("cancel");
    });
  });

  describe("#tidyResponses", () => {
    const ign = "Merleawe";
    const platform = "PC";
    const items = "2 Ivara Prime, 1 Rhino Prime, 10 Memeing Strike";
    const anonymous = "Y";
    const restrictions = "Beginner";
    const notes = "Iz onli gem, y u hev 2 b med?";
    const message = { author: { tag: "Nanamin#1103" } };
    let details;

    before(async () => {
      const responses = [ign, platform, items, anonymous, restrictions, notes];
      details = await units.tidyResponses(message, responses);
    });

    it("assigns ign", () => { expect(details.ign).to.equal(ign); });
    it("assigns platform", () => { expect(details.platform).to.equal(platform); });
    it("assigns items", () => { expect(details.items).to.equal(items); });
    it("assigns anonymous", () => { expect(details.anonymous).to.equal(true); });
    it("assigns restrictions", () => { expect(details.restrictions).to.equal(restrictions); });
    it("assigns notes", () => { expect(details.notes).to.equal(notes); });
    it("assigns tag", () => { expect(details.tag).to.equal(message.author.tag); });
  });

  describe("#saveDonation", () => {
    const message = {
      channel: { send: (m) => { return m; } },
      author: { tag: "Nanamin#1103" }
    };
    const args = { storageOpts: ".temp/storage" };

    const ign = "Merleawe";
    const platform = "PC";
    const items = "2 Ivara Prime, 1 Rhino Prime, 10 Memeing Strike";
    const anonymous = "Y";
    const restrictions = "Beginner";
    const notes = "Iz onli gem, y u hev 2 b med?";
    let details;

    beforeEach(async () => {
      await storage.init(args.storageOpts);

      const responses = [ign, platform, items, anonymous, restrictions, notes];
      details = await units.tidyResponses(message, responses);
    });

    afterEach(async () => {
      await storage.clear();
    });

    it("returns the correct ID", async () => {
      const id = await units.saveDonation(message, args, details);

      const list = await storage.getItem("donationsList");
      const savedId = Object.keys(list)[0];

      expect(id.toString()).to.equal(savedId);
    });

    it("saves correctly", async () => {
      const id = await units.saveDonation(message, args, details);

      const list = await storage.getItem("donationsList");
      const saved = list[id];

      expect(saved.ign).to.equal(ign);
      expect(saved.platform).to.equal(platform);
      expect(saved.items).to.equal(items);
      expect(saved.anonymous).to.equal(true);
      expect(saved.restrictions).to.equal(restrictions);
      expect(saved.notes).to.equal(notes);
      expect(saved.tag).to.equal(message.author.tag);
    });
  });

  describe("#sendNotification", () => {
    const message = {
      channel: { send: (m) => { return m; } },
      author: { tag: "Nanamin#1103" }
    };
    const client = { channels: { get: (id) => { return { 1: message.channel }[id]; } } };
    const args = { storageOpts: ".temp/storage" };

    const ign = "Merleawe";
    const platform = "PC";
    const items = "2 Ivara Prime, 1 Rhino Prime, 10 Memeing Strike";
    const anonymous = "Y";
    const restrictions = "Beginner";
    const notes = "Iz onli gem, y u hev 2 b med?";
    let details;

    before(async () => {
      await storage.init(args.storageOpts);

      const responses = [ign, platform, items, anonymous, restrictions, notes];
      details = await units.tidyResponses(message, responses);
    });

    after(async () => {
      await storage.clear();
    });

    it("returns a notification if there's no channel set", async () => {
      await storage.setItem("donationNotificationChannelId", "2");

      const result = await units.sendNotification(client, message, details, "1", args);

      expect(result).to.startWith("No notification channel set");
    });

    it("returns a summary of the donation if there is a channel set", async () => {
      await storage.setItem("donationNotificationChannelId", "1");

      const result = await units.sendNotification(client, message, details, "1", args);

      expect(result).to.startWith("New donation received");
    });
  });
});