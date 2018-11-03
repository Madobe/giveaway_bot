const storage = require("node-persist");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const channelId = message.content.split(" "). slice(1)[0];
  message.channel.send(`Donations notification channel has been set to <#${channelId}> with ID ${channelId}.`);
  const storageOpts = args === undefined ? {} : args.storageOpts;
  await storage.init(storageOpts);
  await storage.setItem("donationNotificationChannelId", channelId);
};

exports.conf = {
  permissionLevel: "Moderator"
};