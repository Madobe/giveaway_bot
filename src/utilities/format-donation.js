/*
 * Provides commands used to format a donation to be more readable.
 */
const {
  drop,
  flow,
  join,
  map,
  split,
  trim
} = require('lodash/fp')
const { MessageEmbed } = require('discord.js')
const format = require("date-fns/format")

/**
 * Enum to indicate what type of embed to output.
 */
const DONATION_EMBED_TYPE = {
  "DONATE": 1,
  "DONATE_NOTIFICATION": 2,
  "COLLECT": 3,
  "SHOW": 4
}

/**
 * Expands restrictions to their full form.
 * @param {String} s The restrictions in collapsed form.
 * @returns {String} All the expanded restrictions as a comma-delimited string.
 */
const expansions = {
  "beginner": "Beginner - Less than 100h in-game time",
  "novice": "Novice - Less than 250h in-game time",
  "unowned": "Unowned - Must not already have a copy of this item (In the case of frames, weapons, and companions: must have never owned)"
}

const formatRestrictions = flow([
  split(','),
  map(s => trim(s)),
  map(s => expansions[s.toLowerCase()] ? expansions[s.toLowerCase()] : s),
  join(', ')
])

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
  format(new Date(), "yyyy-MM-dd HH:mm:ss"),                  // 0 - Date
  null,                                                       // 1 - Status
  true,                                                       // 2 - Collected?
  false,                                                      // 3 - Started?
  false,                                                      // 4 - Ended?
  false,                                                      // 5 - Delivered?
  "ITEM HERE",                                                // 6 - Item
  "",                                                         // 7 - Plat Value (Estimated)
  donation.platform,                                          // 8 - Platform
  formatRestrictions(donation.restrictions),                  // 9 - Restrictions
  donation.anonymous ? "anonymous" : donation.discord_tag,    // 10 - Donated By (Discord Tag)
  donation.anonymous ? "anonymous" : donation.discord_id,     // 11 - Donated By (Discord ID)
  donation.ign,                                               // 12 - Donated By (IGN)
  message.author.tag,                                         // 13 - Held By
  "",                                                         // 14 - Won By
  "",                                                         // 15 - Won By (Discord ID)
  "",                                                         // 16 - Won By (IGN)
  donation.notes.toUpperCase() === "N" ? "" : donation.notes, // 17 - Donor Notes
  formatNotes(message.content)                                // 18 - Staff Notes
]

/**
 * Returns an embed representing a donation.
 * @param {*} message Discord.js Message.
 * @param {*} donation Sequelize model for donations.
 * @param {Number} type The type of embed to output.
 * @param {String} color The color code to use for the embed.
 * @returns {MessageEmbed} Embed of a donation.
 */
const toEmbed = (message, donation, type, color = '#0486f7') => {
  const titles = {
    [DONATION_EMBED_TYPE.DONATE]: "New Donation",
    [DONATION_EMBED_TYPE.DONATE_NOTIFICATION]: "Donation Responses",
    [DONATION_EMBED_TYPE.COLLECT]: "Rows Added to Spreadsheet",
    [DONATION_EMBED_TYPE.SHOW]: "Donation Information"
  }
  const embed = new MessageEmbed()
    .setTitle(titles[type])
    .setColor(color)
    .addField('Donation ID (Database Internal)', donation.id)
    .addField('Discord', `${donation.discord_tag} (ID:${donation.discord_id})`)
    .addField('IGN', donation.ign)
    .addField('Platform', donation.platform)
    .addField('Items', donation.items)
    .addField('Anonymous', donation.anonymous ? "Yes" : "No")
    .addField('Availability', donation.availability)
    .addField('Restrictions', formatRestrictions(donation.restrictions))
    .addField('Notes', donation.notes.toUpperCase() === "N" ? "N/A" : donation.notes)
  
  if (type == DONATION_EMBED_TYPE.COLLECT) {
    embed.addField('Collector', `${message.author.tag} (ID:${message.author.id})`)
  }

  return embed
}

module.exports = {
  DONATION_EMBED_TYPE,
  getTemplate,
  toEmbed
}