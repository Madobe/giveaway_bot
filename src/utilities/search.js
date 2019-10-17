/*
 * Provides functions which can search with different inputs (eg. display name or tag). Only does
 * exact matches.
 */
const { compact, concat, curry, flow, head, drop } = require('lodash/fp')

/**
 * Gets users from the input given.
 * @param {*} client Discord.js Client.
 * @param {Array} needles Tags, usernames, or user IDs to search for.
 * @param {Array} results What has been found so far.
 */
const findUsers = curry((client, needles, results = []) => {
  if (needles.length === 0) {
    return results.filter(x => x !== undefined)
  } else {
    const text = head(needles)
    const filter = u => u.tag === text || u.username === text || u.id === text
    const match = client.users.filter(filter).first()

    return findUsers(client, drop(1, needles), [...results, match])
  }
})

/**
 * Gets users from the input given and combines them with mentions on the Message object.
 * @param {*} client Discord.js Client.
 * @param {*} message Discord.js Message.
 * @param {Array} needles Tags, usernames, or user IDs to search for.
 */
const findMessageUsers = curry((client, message, needles) => {
  return flow([
    findUsers,
    concat(message.mentions.users.array()),
    compact
  ])(client, needles)
})

module.exports = {
  findUsers,
  findMessageUsers
}