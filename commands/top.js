const leaderboard = require("../modules/leaderboard");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  return message.channel.send(await leaderboard.generate());
};

exports.conf = {
  permissionLevel: "none"
};