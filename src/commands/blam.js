/**
 * Blam Blam's custom command.
 */
exports.run = async (client, message, args) => {
  return message.channel.send("Blam!")
}


exports.conf = {
  permissionLevel: "none"
}