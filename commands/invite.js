exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.channel.send("https://discordapp.com/oauth2/authorize?&client_id=505827078176899094&scope=bot&permissions=68608");
};

exports.conf = {
  permissionLevel: "none"
};