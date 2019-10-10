/*
 * User Input
 * Gathers responses to a set of questions. Note that a max stack size of 10k+ is present in Node,
 * so it's unrealistic for the max stack size to be reached.
 */
const { join, head, drop } = require('lodash/fp')
const filter = message => m => m.author.id === message.author.id
const formatText = x => typeof x === 'string' ? x : join('\n', x)

const getResponses = async (message, questions, cancel, responses = {}) => {
  if (questions.length === 0) {
    return responses
  } else {
    const q = head(questions)
    const text = formatText(q.question)
    const msg = message.channel.send(text)
    const messageFilter = filter(message)

    return await message.channel.awaitMessages(messageFilter, { max: 1 }).then(c => {
      if (c.first().content === cancel) return false

      const res = { ...responses, [q.name]: c.first().content }
      msg.then(m => m.delete())

      return getResponses(message, drop(1, questions), cancel, res)
    })
  }
}

module.exports = getResponses