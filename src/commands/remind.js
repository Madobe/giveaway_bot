/*
 * Sends a reminder ping with the given content to the person in the channel this was called at the
 * time specified.
 */
'use strict'

const { add, drop, flow, head, join } = require('lodash/fp')
const CronJob = require('cron').CronJob
const MessageTimer = require('../models').MessageTimer
const parseTime = require('../utilities/timer').parseTime
const config = require('../config')[process.env.NODE_ENV]
const locale = config.formats.date.locale
const options = config.formats.date.options

/**
 * Parses the time string as the last element of the array passed to it.
 * @param {Array<String>} _ An array of the arguments that were passed to this command.
 * @returns {Number} Millisecond equivalent of the time string.
 */
const parseArrayTime = flow([
  head,
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
 * Combines the right part of the command to form the reminder text.
 * @param {Array<string>} _ The message contents.
 * @returns {string} The reminder text.
 */
const getReminderText = flow([
  drop(1),
  join(' ')
])

/**
 * Exported function.
 */
exports.run = async (client, message, args) => {
  if (args.length < 2) return message.channel.send("This command requires at least 2 arguments.")
  if (parseArrayTime(args) < parseTime(config.general.minimum_time)) return message.channel.send("Please provide a time of at least 5 minutes.")

  const newDate = new Date(getTimerTime(args))

  MessageTimer.create({
    datetime: newDate,
    userId: message.author.id,
    text: getReminderText(args)
  }).then(timer => {
    const job = new CronJob(newDate, () => message.author.send(getReminderText(args)))
    client.timers = [
      ...client.timers,
      job
    ]
    job.start()

    return message.channel.send(`I will DM you that message at ${newDate.toLocaleString(locale, options)}.`)
  })
}

exports.conf = {
  permissionLevel: 'none'
}