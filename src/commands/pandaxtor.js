/**
 * Pandaxtor's custom command.
 */
exports.run = async (client, message, args) => {
  return message.channel.send("Awoo!")
}


exports.conf = {
  permissionLevel: "none"
}