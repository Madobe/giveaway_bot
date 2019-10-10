/*
 * Sends a message with an embed showing the top ten donators.
 */
'use strict'

const { RichEmbed } = require('discord.js')
const { getValues } = require('../utilities/gsheets')

/**
 * Exported function.
 */
exports.run = async (client, message, args) => {
  const rows = await getValues("14t9-54udr_eqaCgq9g1rWhPLHY_E-RxfdhKTXxgCERc", "B2:C11")
  const lines = rows.map((row, i) => `${i + 1}. **${row[0]}** - ${row[1]}p`).join("\n")

  const embed = new RichEmbed()
    .setColor("#0486f7")
    .setTitle("Donation Leaderboard")
    .setDescription(lines)
    .setURL("https://docs.google.com/spreadsheets/d/14t9-54udr_eqaCgq9g1rWhPLHY_E-RxfdhKTXxgCERc")

  return message.channel.send(embed)
}

exports.conf = {
  permissionLevel: 'none'
}