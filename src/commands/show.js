/*
 * Shows the details for a donation without performing any tasks on it.
 */
const Donation = require('../models').Donation
const { DONATION_EMBED_TYPE, toEmbed } = require('../utilities/format-donation')

/**
 * Exported function.
 */
exports.run = async (client, message, args) => {
  Donation.findOne({
    where: args[0] ? { id: args[0] } : {},
    order: [['id', 'DESC']]
  }).then(donation => {
    message.channel.send(toEmbed(message, donation, DONATION_EMBED_TYPE.SHOW, '#0486f7'))
  }).catch(e => console.error(e))
}

exports.conf = {
  permissionLevel: 'giveaway'
}