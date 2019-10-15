/*
 * Fills in who won on a row.
 */
'use strict'

const { flow, head, last, map, nth, split, trim } = require('lodash/fp')
const { RichEmbed } = require('discord.js')
const { findUsers } = require('../utilities/search')
const { updateRow } = require('../utilities/gsheets')
const config = require('../config')[process.env.NODE_ENV]

/**
 * Pulls out the row number from the message.
 * @param {string} _ The message contents.
 * @returns {string} The row number.
 */
const getRow = flow([
  split('|'),
  head,
  split(' '),
  nth(1)
])

/**
 * Gets the Discord tags of the people.
 */
const getTags = client => flow([
  split(config.general.programmatical_delimiter),
  nth(1),
  split(config.general.phrase_delimiter),
  map(s => trim(s)),
  findUsers(client),
  map(u => u.tag)
])

/**
 * Gets the Discord IDs of the people.
 */
const getIDs = client => flow([
  split(config.general.programmatical_delimiter),
  nth(1),
  split(config.general.phrase_delimiter),
  map(s => trim(s)),
  findUsers(client),
  map(u => u.id)
])

/**
 * Gets the IGNs from the message content.
 * @param {string} _ The message content.
 * @returns {string[]} The IGNs.
 */
const getIGNs = flow([
  split(config.general.programmatical_delimiter),
  last,
  split(config.general.phrase_delimiter),
  map(s => trim(s))
])

/**
 * The exported function
 */
exports.run = async (client, message, args) => {
  if (args.length < 3) return message.channel.send("This command requires a row number, usernames/tags/IDs, and IGNs as arguments.")

  const row = getRow(message.content) || 0
  const tags = getTags(client)(message.content)
  const ids = getIDs(client)(message.content)
  const igns = getIGNs(message.content)

  if (row.replace(/\D/g, '') !== row) return message.channel.send("Row number must be an integer.")
  if (tags.length === 0 && ids.length === 0) return message.channel.send("None of the provided search terms for Discord users returned any results.")
  if (igns.length === 0) return message.channel.send("No IGNs provided.")

  updateRow(
    process.env.TRACKER_SPREADSHEET_ID,
    `D${row}:E${row}`,
    // @ts-ignore
    [[true, true]]
  )

  updateRow(
    process.env.TRACKER_SPREADSHEET_ID,
    `O${row}:Q${row}`,
    [[tags.join("\n"), ids.join("\n"), igns.join("\n")]]
  )

  return message.channel.send(new RichEmbed()
    .setTitle('Winners Updated')
    .setColor('#0486f7')
    .addField("Row Number", row)
    .addField("Discord Tags", tags.join(', '))
    .addField("Discord IDs", ids.join(', '))
    .addField("In-Game Names", igns.join(', '))
  )
}

exports.conf = {
  permissionLevel: 'giveaway'
}