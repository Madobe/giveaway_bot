/**
 * Gets the first message typed by the invoking user in the channel they invoked this function from.
 * @param {Message} message The Message object that invoked the command calling this.
 */
const getAnswer = async (message) => {
  const filter = m => m.author.id === message.author.id;
  let response;

  await message.channel
    .awaitMessages(filter, { max: 1 })
    .then(collected => response = collected.first().content);
  return response;
};

/**
 * Gathers answers from the user that sent the message invoking this function.
 * @param {Message} message The Message object that invoked the command calling this.
 * @param {Array} questions The questions to ask. An array of objects with two properties: "name" and "question".
 * @param {String} cancel The string to use for canceling further inputs. Blank means none.
 */
const gatherAnswers = async (message, questions, cancel) => {
  const responses = [];

  for (let i = 0; i < questions.length; i++) {
    const questionText = typeof(questions[i].question) === "String" ? questions[i].question : questions[i].question.join('\n');
    const questionMessage = message.channel.send(questionText);
    const response = await getAnswer(message);

    questionMessage.delete();

    if (response === cancel) return false;

    responses.push(response);
  }

  return responses;
};

module.exports = {
  getAnswer,
  gatherAnswers
};