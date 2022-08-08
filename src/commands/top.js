/*
 * Sends a message with an embed showing the top ten donators.
 */
'use strict'

const { MessageEmbed } = require('discord.js')
const { getValues } = require('../utilities/gsheets')

/**
 * Exported function.
 */
exports.run = async (client, message, args) => {
  const rows = await getValues("1b-w_mTH2M1G2bG0p6v5s5eMzEzANXuCw8-IjBz4FUgQ", "B2:C11")
  const lines = rows.map((row, i) => `${i + 1}. **${row[0]}** - ${row[1]}p`).join("\n")

  const embed = new MessageEmbed()
    .setColor("#0486f7")
    .setTitle("Donation Leaderboard")
    .setDescription(lines)
    .setURL("https://docs.google.com/spreadsheets/d/1b-w_mTH2M1G2bG0p6v5s5eMzEzANXuCw8-IjBz4FUgQ")

  return message.channel.send(embed)
}

exports.conf = {
  permissionLevel: 'none'
}
