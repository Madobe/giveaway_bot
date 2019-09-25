exports.run = async (client, message, args) => {
  if(args.length < 1) return message.channel.send("No role name to look up specified.");
  const roleName = args.join(" ");
  const role = message.guild.roles.find("name", roleName);
  if(!role) return null;
  const roleID = role.id;
  return message.channel.send(roleID);
};

exports.conf = {
  permissionLevel: "none"
};