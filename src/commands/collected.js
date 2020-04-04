/*
 * Writes a donation to the Google Spreadsheet. If an ID is provided, that specific donation is the
 * one written. If not, then it uses the last donation made.
 */
const {
  drop,
  split,
  trim
} = require('lodash/fp')
const Donation = require('../models').Donation
const { insertRow } = require('../utilities/gsheets')
const { toTitleCase } = require('../utilities/string-ops')
const {
  DONATION_EMBED_TYPE,
  getTemplate,
  toEmbed
} = require('../utilities/format-donation')
const config = require('../config')[process.env.NODE_ENV]

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

    message.channel.send(toEmbed(message, donation, DONATION_EMBED_TYPE.COLLECT))
  }).catch(e => console.error(e))
}

exports.conf = {
  permissionLevel: 'giveaway'
}