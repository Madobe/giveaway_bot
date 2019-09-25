const storage = require("node-persist");
const addSeconds = require("date-fns/add_seconds");
const format = require("date-fns/format");

const parseTime = require("../modules/timer").parseTime;

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const roleId = "496818633633431582";
  const member = message.mentions.members.first();
  const seconds = parseTime(args[1]);
  const time = addSeconds(new Date(), seconds);

  if (!member) return message.channel.send("No target mentioned.");
  if (time === 0) return message.channel.send("Invalid time.");

  member.addRole(roleId, "Added via the !disqualified command.")
    .catch(console.error);

  await storage.init();

  const timers = await storage.getItem("timers") || [];

  timers.push({
    time: time,
    action: "removeRole",
    guildId: message.guild.id,
    memberId: member.id,
    roleId: roleId
  });
  await storage.setItem("timers", timers);
  return message.channel.send(`Specified member has been disqualified until ${format(time, "MMM D, YYYY hh:mm:ss A")}.`);
};

exports.conf = {
  permissionLevel: "Giveaway"
};