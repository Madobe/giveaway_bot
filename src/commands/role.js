/*
 * Looks up the given role and returns its ID.
 */
'use strict'

exports.run = async (client, message, args) => {
  if (args.length < 1) return message.channel.send("No role name to look up specified.")

  const role = message.guild.roles.find('name', args.join(' '))

  if (!role) return message.channel.send("Invalid role name provided.")
  else return message.channel.send(role.id)
}

exports.conf = {
  permissionLevel: 'moderator'
}