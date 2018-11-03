/**
 * Waits for a single message from the person talking to the bot.
 * @param {Message} message Represents a message sent by a user.
 * @return {string} The plain text entered by the user.
 */
const getUserInput = async (message) => {
  const filter = m => m.author.id === message.author.id;
  let response;
  await message.channel.awaitMessages(filter, { max: 1 })
    .then(collected => response = collected.first().content);
  return response;
};

/**
 * Send question and get the input.
 * @param {Message} message Represents a message sent by a user.
 * @param {string} question The question being asked.
 */
const getSingleInput = async (message, question) => {
  if(typeof(question) === "object") question = question.join("\n");
  message.channel.send(question);
  return await getUserInput(message);
};

module.exports = {
  getUserInput: getUserInput,
  getSingleInput: getSingleInput
};