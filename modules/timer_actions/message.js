/**
 * Sends the given text to the given channel.
 * @param {Client} client Discord.js Client object.
 * @param {string} channelId The ID of the channel we send the message in.
 * @param {string} text The message to send.
 */
module.exports = async (client, channelId, text) => {
  const channel = client.channels.get(channelId);

  channel.send(text);
};