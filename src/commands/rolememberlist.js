exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if(args.length < 1) return message.channel.send('No role name to look up specified.');
  
  const roleName = args.join(' ');
  const membersWithRole = message.guild.members.filter((member) => {
    return member.roles.find('name', roleName) !== null;
  });  
  
  const output = `\`\`\`
${membersWithRole.map(member => member.user.tag).join("\n")}
\`\`\``;
  return message.channel.send(output);
};

exports.conf = {
  permissionLevel: 'Giveaway'
};