/*
 * Populates the database with data. If it existed.
 */
const db = require('../src/models')
const Donation = db.Donation

// @ts-ignore
const donations = require('./donations')

db.sequelize.sync()

const makeDonations = function(t) {
  const results = []

  console.log(donations.length)

  for (let i = 0; i < donations.length; i++) {
    results.push(Donation.create({
      ign: donations[i].ign,
      platform: donations[i].platform,
      items: donations[i].items,
      anonymous: donations[i].anonymous,
      availability: donations[i].availability,
      restrictions: donations[i].restrictions,
      notes: donations[i].notes,
      discord_tag: donations[i].tag,
      discord_id: donations[i].userId || '0'
    }, { transaction: t }))
  }

  return results
}

db.sequelize.transaction(t => {
  return Promise.all(makeDonations(t))
})