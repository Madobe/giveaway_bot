/*
 * Sets configuration variables.
 */
'use strict'

const Setting = require('../models').Setting

const allowedSettings = [
  'moderator_role',
  'giveaway_role',
  'disqualify_role',
  'donation_channel'
]

/**
 * Exported function.
 */
exports.run = async (client, message, args) => {
  if (args.length < 2) return message.channel.send("At least two arguments must be passed to use this command.")
  if (!allowedSettings.includes(args[0])) return message.channel.send("Invalid setting name.")

  // Check if it was already set, then edit or create
  Setting.findOne({ where: { name: args[0] } }).then(setting => {
    if (setting) {
      setting.value = args[1]

      return message.channel.send("Setting modified.")
    } else {
      Setting.create({ name: args[0], value: args[1] }).then(setting => {
        return message.channel.send("Setting added.")
      }).catch(e => {
        return message.channel.send("Failed to add setting.")
      })
    }
  }).catch(e => {
    return message.channel.send("Database retrieval failed.")
  })
}

exports.conf = {
  permissionLevel: "moderator"
}