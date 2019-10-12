/* eslint no-undef: 0, no-unused-vars: 0 */
const chai = require("chai")
chai.use(require("chai-string"))
const expect = chai.expect

describe("donation", () => {
  before(function() {
    return require('../../src/models').sequelize.sync()
  })

  beforeEach(function() {
    this.Donation = require('../../src/models').Donation
  })

  describe("create", function() {
    it("creates a donation", function() {
      return this.Donation.create({
        ign: "Name",
        platform: "PC",
        items: "Ivara Prime",
        anonymous: false,
        availability: "GMT+0",
        restrictions: "none",
        notes: "N"
      }).bind(this).then(donation => {
        expect(donation.ign).to.equal("Name")
        expect(donation.platform).to.equal("PC")
        expect(donation.items).to.equal("Ivara Prime")
        expect(donation.anonymous).to.equal(false)
        expect(donation.availability).to.equal("GMT+0")
        expect(donation.restrictions).to.equal("none")
        expect(donation.notes).to.equal("N")
      })
    })
  })
})