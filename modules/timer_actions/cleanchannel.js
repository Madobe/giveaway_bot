/**
 * Removes all messages from the given channel except for those in the ignore array.
 * @param {Client} client A Discord.js Client object.
 * @param {string} channelId The ID of the channel being worked on.
 * @param {Array<string>} ignoreIds The IDs of the messages to not delete.
 */
module.exports = async (client, channelId, ignoreIds) => {
  const channel = client.channels.get(channelId);

  channel.fetchMessages()
    .then((messages) => {
      const messagesToDelete = messages.filter(m => !ignoreIds.includes(m.id));
      channel.bulkDelete(messagesToDelete);
    });
};