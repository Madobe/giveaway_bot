/* eslint no-undef: 0 */
const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;
const units = require("../../commands/collected").units;

describe("collected", () => {
  describe("#getDonation", () => {
    it("returns the highest ID's content", async () => {
      const list = {1: "", 2: "", 3: ""};
      const id = undefined;

      const result = await units.getDonation(list, id);

      expect(result).to.equal("3");
    });
  });

  describe("#isPrime", () => {
    it("requires a number in front", async() => {
      const item = "ember prime";

      const result = await units.isPrime(item);

      expect(result).to.equal(false);
    });

    it("detects 'prime'", async () => {
      const item = "3 ember prime";

      const result = await units.isPrime(item);

      expect(result).to.equal(true);
    });

    it("detects 'primes'", async () => {
      const item = "3 ember primes";

      const result = await units.isPrime(item);

      expect(result).to.equal(true);
    });

    it("returns false if item does not end with prime or primes", async () => {
      const item = "this is just random text";

      const result = await units.isPrime(item);

      expect(result).to.equal(false);
    });
    it("is case-insensitive", async () => {
      const item = "3 Ember PrImE";

      const result = await units.isPrime(item);

      expect(result).to.equal(true);
    });
  });

  describe("#isPlural", () => {
    it("fails for anything not ending with primes", async () => {
      const item = "just some random text";

      const result = await units.isPlural(item);

      expect(result).to.equal(false);
    });

    it("detects 'primes'", async () => {
      const item = "4 Ember Primes";

      const result = await units.isPlural(item);

      expect(result).to.equal(true);
    });

    it("is case-insensitive", async () => {
      const item = "4 Ember PrImEs";

      const result = await units.isPlural(item);

      expect(result).to.equal(true);
    });
  });

  describe("#singularize", () => {
    it("returns an array the size of the first number in the input", async () => {
      const item = "3 Ivara Primes";

      const result = await units.singularize(item);

      expect(result.length).to.equal(3);
    });

    it("removes the s from the end", async () => {
      const item = "3 Ivara Primes";

      const result = await units.singularize(item);

      expect(result[2]).to.equal("Ivara Prime");
    });
  });

  describe("#processItems", () => {
    it("processes a list correctly", async () => {
      const items = ["Ivara Prime", "Ember Prime", "Frost Prime"];

      const result = await units.processItems(items);

      expect(result.length).to.equal(3);
      expect(result[0]).to.equal("Ivara Prime");
      expect(result[1]).to.equal("Ember Prime");
      expect(result[2]).to.equal("Frost Prime");
    });

    it("concats an array that comes from singularize", async () => {
      const items = ["3 Ivara Primes", "2 Ember Primes", "Frost Prime"];

      const result = await units.processItems(items);

      expect(result.length).to.equal(6);
      expect(result[0]).to.equal("Ivara Prime");
      expect(result[1]).to.equal("Ivara Prime");
      expect(result[2]).to.equal("Ivara Prime");
      expect(result[3]).to.equal("Ember Prime");
      expect(result[4]).to.equal("Ember Prime");
      expect(result[5]).to.equal("Frost Prime");
    });
  });

  describe("tidyDetails", () => {
    const ign = "Merleawe";
    const platform = "PC";
    const items = "2 Ivara Prime, 1 Rhino Prime, 10 Memeing Strike";
    const anonymous = "Y";
    const restrictions = "Beginner";
    const notes = "Iz onli gem, y u hev 2 b med?";
    const tag = "Nanamin#1103";
    let details;

    before(async () => {
      const donation = [ign, platform, items, anonymous, restrictions, notes, tag];

      details = await units.tidyDetails(donation);
    });

    it("assigns ign", () => { expect(details.ign).to.equal(ign); });
    it("assigns platform", () => { expect (details.platform).to.equal(platform); });
    it("assigns items", () => { expect(details.items).to.equal(items); });
    it("assigns anonymous", () => { expect(details.anonymous).to.equal(anonymous); });
    it("assigns restrictions", () => { expect(details.restrictions).to.equal(restrictions); });
    it("assigns notes", () => expect(details.notes).to.equal(notes));
    it("assigns tag", () => expect(details.tag).to.equal(tag));
  });

  describe("#conf", () => {
    it("requires the user to be a moderator", () => {
      expect(command.conf.permissionLevel).to.equal("Moderator");
    });
  });
});