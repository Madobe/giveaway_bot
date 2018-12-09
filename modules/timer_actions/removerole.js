/**
 * Removes the given role from the given member.
 * @param {Client} client Discord.js Client object.
 * @param {string} guildId The ID of the guild the member to remove the role from is in.
 * @param {string} memberId The ID of the member to remove the role from.
 * @param {string} roleId The ID of the role to remove.
 */
module.exports = async (client, guildId, memberId, roleId) => {
  const guild = client.guilds.get(guildId);
  const member = guild.members.get(memberId);

  member.removeRole(roleId)
    .catch(console.error);
};