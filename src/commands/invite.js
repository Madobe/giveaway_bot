/*
 * Sends the invite link for this bot to the channel.
 */
exports.run = async (client, message, args) => {
  return message.channel.send("https://discordapp.com/oauth2/authorize?&client_id=505827078176899094&scope=bot&permissions=68608");
};

exports.conf = {
  permissionLevel: "none"
};