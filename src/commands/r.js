/*
 * Tells people to read the damn rules.
 */
exports.run = async (client, message, args) => {
  return message.channel.send("Please read through <#487094681537347584> thoroughly to learn how to type in <#489712298114547713>.");
}


exports.conf = {
  permissionLevel: "none"
};