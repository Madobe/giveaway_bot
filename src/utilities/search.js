/*
 * Provides functions which can search with different inputs (eg. display name or tag). Only does
 * exact matches.
 */
const { curry, flow, head, drop, filter } = require('lodash/fp')

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

module.exports = {
  findUsers
}