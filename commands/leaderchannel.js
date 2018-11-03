const storage = require("node-persist");

const leaderboard = require("../modules/leaderboard");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const channelId = message.content.split(" ").slice(1)[0];
  message.channel.send(`Leaderboards channel has been set to <#${channelId}> with ID ${channelId}.`);
  await storage.init(args.storageOpts);
  await storage.setItem("leaderboardChannelId", channelId);
  leaderboard.updateChannel(client, args);
};

exports.conf = {
  permissionLevel: "Moderator"
};