const CronJob = require('cron').CronJob
const { curry, drop, flow, head } = require('lodash/fp')
const db = require('../models')
const { Op } = require('sequelize')
const config = require('../config')[process.env.NODE_ENV].clean_channel

/**
 * Takes a time string and turns it into the equivalent in milliseconds.
 * eg. parseTime("30d 20s")(0)
 * The argument to the second curried function is the start time.
 * @param {String} string The string to convert to a time.
 */
const conversions = Object.freeze({ s: 1000, m: 60000, h: 3600000, d: 86400000 })
const matchAll = (regex, s) => s.matchAll(regex)
const parseTime = flow([
  matchAll.bind(null, /(\d+)([smhd]{1})/gi),
  Array.from,
  head,
  drop(1),
  a => parseInt(a[0]) * conversions[a[1]],
  t => isNaN(t) ? 0 : t
])

/**
 * Initializes all timers and returns them.
 * @param {*} client Discord.js Client.
 */
const loadTimers = (client) => {
  const getUser = timer => { return { ...timer, user: client.users.get(timer.userId) } }
  const getGuild = timer => { return { ...timer, guild: client.guilds.get(timer.guildId) } }
  const getMember = timer => { return { ...timer, member: timer.guild.members.get(timer.memberId) } }
  const makeJob = curry((fn, timer) => new CronJob(new Date(timer.datetime), () => fn(timer)))

  // @ts-ignore
  const sendMessage = flow([
    getUser,
    makeJob(timer => {
      timer.user.send(timer.text)
      return timer
    })
  ])

  // @ts-ignore
  const removeRole = flow([
    getGuild,
    getMember,
    makeJob(timer => {
      timer.member.removeRole(timer.roleId)
      return timer
    })
  ])

  const channelToClean = client.channels.get(config.channel_id)
  const cleanChannel = () => {
    return new CronJob(config.crontime, channelToClean.fetchMessages().then(messages => {
      const messagesToDelete = messages.filter(m => !config.ignore_ids.includes(m.id))
      channelToClean.bulkDelete(messagesToDelete)
    }))
  }

  const currentTime = new Date()
  return [
    { model: db.MessageTimer, method: sendMessage },
    { model: db.RemoveRoleTimer, method: removeRole },
  ].map(type => {
    return type.model.findAll({
      where: {
        datetime: {
          [Op.gt]: currentTime
        }
      }
    }).then(records => {
      return [
        ...records.map(record => type.method(record.dataValues)),
        cleanChannel()
      ]
    })
  })
}

module.exports = {
  loadTimers,
  parseTime
}