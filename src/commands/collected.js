/*
 * Writes a donation to the Google Spreadsheet. If an ID is provided, that specific donation is the
 * one written. If not, then it uses the last donation made.
 */
const {
  drop,
  flow,
  join,
  split,
  trim
} = require('lodash/fp')
const { MessageEmbed } = require('discord.js')
const format = require("date-fns/format")
const Donation = require('../models').Donation
const { insertRow } = require('../utilities/gsheets')
const { toTitleCase } = require('../utilities/string-ops')
const config = require('../config')[process.env.NODE_ENV]

/**
 * Formats message.content to remove the other parts of the command.
 * @param {String} s The message content that should be formatted to be inserted as staff notes.
 * @returns {String} The string without the first two parts.
 */
const formatNotes = flow([
  split(' '),
  drop(2),
  join(' ')
])

/**
 * Returns a template for a row on the Google Spreadsheet.
 * @param {*} message Discord.js Message object.
 * @param {*} donation Sequelize model for donations.
 * @returns {Array<*>} Row template.
 */
const getTemplate = (message, donation) => [
  // @ts-ignore
  format(new Date(), "yyyy-MM-dd HH:mm:ss"),               // 0 - Date
  null,                                                    // 1 - Status
  true,                                                    // 2 - Collected?
  false,                                                   // 3 - Started?
  false,                                                   // 4 - Ended?
  false,                                                   // 5 - Delivered?
  "ITEM HERE",                                             // 6 - Item
  "",                                                      // 7 - Plat Value (Estimated)
  donation.platform,                                       // 8 - Platform
  donation.restrictions,                                   // 9 - Restrictions
  donation.anonymous ? "anonymous" : donation.discord_tag, // 10 - Donated By (Discord Tag)
  donation.anonymous ? "anonymous" : donation.discord_id,  // 11 - Donated By (Discord ID)
  donation.ign,                                            // 12 - Donated By (IGN)
  message.author.tag,                                      // 13 - Held By
  "",                                                      // 14 - Won By
  "",                                                      // 15 - Won By (Discord ID)
  "",                                                      // 16 - Won By (IGN)
  donation.notes === "N" ? "" : donation.notes,         // 17 - Donor Notes
  formatNotes(message.content)                             // 18 - Staff Notes
]

/**
 * Returns an embed representing a donation.
 * @param {*} donation Sequelize model for donations.
 * @returns {MessageEmbed} Embed of a donation.
 */
const toEmbed = (message, donation) => new MessageEmbed()
  .setTitle('Rows Added to Spreadsheet')
  .setColor('#0486f7')
  .addField('Donation ID (Database Internal)', donation.id)
  .addField('Discord', `${donation.discord_tag} (ID:${donation.discord_id})`)
  .addField('IGN', donation.ign)
  .addField('Platform', donation.platform)
  .addField('Items', donation.items)
  .addField('Anonymous', donation.anonymous ? "Yes" : "No")
  .addField('Availability', donation.availability)
  .addField('Restrictions', donation.restrictions)
  .addField('Notes', donation.notes === "N" ? "N/A" : donation.notes)
  .addField('Collector', `${message.author.tag} (ID:${message.author.id})`)

/**
 * Splits an item entry into multiple rows if that item entry contains an item name, a number, and 
 * the letter x directly before or after the number. The only exception to this is platinum.
 * @param {String} item The item name. May contain amounts (eg. Item x2).
 * @param {Array<*>} template An array of values for the spreadsheet. Only item names change in 
 * this.
 * @returns {Array<Array<*>>} A 2D array of rows.
 */
const splitMultiples = (item, template) => {
  const platRegex = /\b(?:plat|platinum)\b/i
  const amountRegex = /\b(?:x([0-9]+))|(?:([0-9]+)x)\b/i

  if (!platRegex.test(item) && amountRegex.test(item)) {
    const [_, a, b] = amountRegex.exec(item)
    const amount = parseInt(a || b)
    const itemName = toTitleCase(trim(item.replace(amountRegex, '')))
    const row = Object.assign([], template, { 6: itemName })

    return Array.from({ length: amount }, (x, i) => row)
  } else {
    return [Object.assign([], template, { 6: toTitleCase(trim(item)) })]
  }
}

/**
 * Replaces the item column in the template rows with each item and gathers the results.
 * @param {Array<String>} items An array of item names. The only variable across rows.
 * @param {Array<*>} template An array of values for the spreadsheet. Only item names change in
 * this.
 * @param {Array<*>} rows The resulting rows after putting item names in. Accumulator.
 * @returns {Array<Array<*>>} A 2D array of rows.
 */
const formRows = (items, template, rows = []) => {
  if (items.length === 0) {
    return rows
  } else {
    return formRows(
      drop(1, items),
      template,
      [
        ...rows,
        ...splitMultiples(items[0], template)
      ]
    )
  }
}

/**
 * Exported function.
 */
exports.run = async (client, message, args) => {
  Donation.findOne({
    where: args[0] ? { id: args[0] } : {},
    order: [['id', 'DESC']]
  }).then(donation => {
    // @ts-ignore
    const rows = formRows(split(config.general.phrase_delimiter, donation.items), getTemplate(message, donation))

    insertRow(
      process.env.TRACKER_SPREADSHEET_ID,
      "A2:R",
      rows
    )

    message.channel.send(toEmbed(message, donation))
  }).catch(e => console.error(e))
}

exports.conf = {
  permissionLevel: 'giveaway'
}