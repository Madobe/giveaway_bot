/*
 * Asks the command invoker the questions in src/resources/donationquestions.json and collects the
 * responses.
 */
const Donation = require('../models').Donation
const Setting = require('../models').Setting
// @ts-ignore
const donationQuestions = require('../resources/donationquestions.json')
const getResponses = require('../utilities/inputter')
const { DONATION_EMBED_TYPE, toEmbed } = require('../utilities/format-donation')

/**
 * Changes the anonymous property on the responses object from a string to a boolean.
 * @param {Object} responses An object representing the responses to the donation questions.
 */
const anonymousToBoolean = responses => {
  return {
    ...responses,
    anonymous: responses.anonymous.toLowerCase() === 'y' ? true : false
  }
}

/**
 * Exported function.
 */
exports.run = async (client, message, args) => {
  const responses = {
    ...anonymousToBoolean(await getResponses(message, donationQuestions, 'cancel')),
    discord_tag: message.author.tag,
    discord_id: message.author.id
  }

  if (!responses.notes) return message.channel.send("Donation process cancelled.")

  Donation.create(responses).then(donation => {
    // Send embed to the invoker's channel
    message.channel.send(toEmbed(message, donation, DONATION_EMBED_TYPE.DONATE_NOTIFICATION, '#0486f7'))

    // Send embed to the notifications channel
    Setting.findOne({ where: { name: 'donation_channel' } }).then(setting => {
      if (setting) {
        return client.channels.fetch(setting.value).then(channel => channel.send(toEmbed(message, donation, DONATION_EMBED_TYPE.DONATE, '#0486f7')))
      } else {
        return message.channel.send("No notification channel has been set for donations. Contact staff.")
      }
    }).catch(e => {
      console.log(e)
      return message.channel.send("Database retrieval failed.")
    })
  })
}

exports.conf = {
  permissionLevel: "none"
}