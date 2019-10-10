/*
 * Adds the disqualified role to the specified individuals and starts up the timers to remove them.
 * Time arguments can only be one coherent unit with no separations by spaces.
 */
const {
  add,
  drop,
  dropRight,
  flow,
  join,
  last,
  map,
  split,
  trim,
} = require('lodash/fp')
const { RichEmbed } = require('discord.js')
const CronJob = require('cron').CronJob
const config = require('../config')
const db = require('../models')
const findUsers = require('../utilities/search').findUsers
const parseTime = require('../utilities/timer').parseTime

/**
 * Custom parsing of arguments passed to the command, unique to this command. Grabs everything
 * between !command and the time at the end and splits by phrase delimiters instead of spaces.
 * @param {String} _ The full message used to invoke this command.
 * @returns {Array<String>} The arguments from the command, separated by the phrase delimiter.
 */
const splitArgs = flow([
  split(' '),
  drop(1),
  dropRight(1),
  join(' '),
  split(config.general.phrase_delimiter),
  map(x => trim(x))
])

/**
 * Collects the Discord tags of all the members passed in.
 * @param {Array<*>} _ An array of Discord.js GuildMember objects.
 * @returns {Array<String>} An array of Discord tags.
 */
const formatMembers = flow([
  map(x => x.user.tag),
  join(', ')
])

/**
 * Parses the time string as the last element of the array passed to it.
 * @param {Array<String>} _ An array of the arguments that were passed to this command.
 * @return {Number} Millisecond equivalent of the time string.
 */
const parseArrayTime = flow([
  last,
  parseTime
])

/**
 * Parses the time string and adds it to the current time to get when the event should occur.
 * @param {Array<String>} _ An array of the arguments that were passed to this command.
 * @returns {Number} Milliseconds passed since the epoch.
 */
const getTimerTime = flow([
  parseArrayTime,
  add(new Date().getTime()),
  add(5000) // Add 5s because of operation lag
])

/**
 * Forms an embed detailing the operation.
 * @param {Date} date Time that the timer will trigger.
 * @param {Array<*>} members The members that have had the role added to them.
 * @return {RichEmbed} The embed.
 */
const toEmbed = (date, members) => {
  const locale = config.formats.date.locale
  const options = config.formats.date.options

  return new RichEmbed()
    .setTitle("New Disqualification")
    .setColor("#721c24")
    .addField("Current Time", new Date().toLocaleString(locale, options))
    .addField("Until", date.toLocaleString(locale, options))
    .addField("Members", formatMembers(members))
}

/**
 * Exported function.
 */
exports.run = async (client, message, args) => {
  const roleId = await db.Setting.findOne({ where: { name: 'disqualify_role' }})

  if (args.length < 2) return message.channel.send("You must provide at least 2 arguments to this command.")
  if (parseArrayTime(args) < parseTime(config.general.minimum_time)) return message.channel.send("Please provide a time of at least 5 minutes.")
  if (!roleId) return message.channel.send("No disqualification role has been set.")

  // This function requires a bit of custom args parsing
  const needles = splitArgs(message.content)
  const members = [
    ...message.mentions.users.array(),
    ...findUsers(client, needles)
  ].map(u => message.guild.member(u))
  const newDate = new Date(getTimerTime(args))

  db.sequelize.transaction(t => {
    return Promise.all(
      members.map(member => db.RemoveRoleTimer.create({
        datetime: newDate,
        guildId: message.guild.id,
        memberId: member.id,
        roleId: roleId.value
      }, { transaction: t }))
    )
  }).then(result => {
    // Make new timers
    client.timers = [
      ...client.timers,
      ...members.map(member => {
        member.addRole(roleId.value)
        return new CronJob(newDate, () => member.removeRole(roleId.value))
      })
    ]

    try {
      client.timers.forEach(t => t.start())
    } catch (e) {
      return message.channel.send("The calculated time was in the past so the timer will never run. This is due to how the server works and cannot be worked around. Please manually reset the effects of the command and instead specify a longer time.")
    }

    message.channel.send(toEmbed(newDate, members))
  }).catch(e => {
    console.error(e)
  })
}

exports.conf = {
  permissionLevel: "moderator"
}