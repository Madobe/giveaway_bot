/**
 * This file handles the setting of timers and performing each of the actions they require. Actions
 * handled by a timer must be serializable without the usage of any objects (rebuild objects from
 * the primitive values).
 */
const storage = require("node-persist");
const addSeconds = require("date-fns/add_seconds");

/**
 * Sends the given text to the given channel.
 * @param {Client} client Discord.js Client object.
 * @param {string} channelId The ID of the channel we send the message in.
 * @param {string} text The message to send.
 */
const message = async (client, channelId, text) => {
  const channel = client.channels.get(channelId);

  channel.send(text);
};

/**
 * Removes the given role from the given member.
 * @param {Client} client Discord.js Client object.
 * @param {string} guildId The ID of the guild the member to remove the role from is in.
 * @param {string} memberId The ID of the member to remove the role from.
 * @param {string} roleId The ID of the role to remove.
 */
const removeRole = async (client, guildId, memberId, roleId) => {
  const guild = client.guilds.get(guildId);
  const member = guild.members.get(memberId);

  member.removeRole(roleId)
    .catch(console.error);
};

/**
 * Reads initial timer data from the storage. Only used if the bot reboots.
 * @param {Client} client Discord.js Client object.
 */
const initTimers = async (client) => {
  await storage.init();

  const timers = await storage.getItem("timers") || [];
  const activeTimers = [];
  const currentTime = new Date();

  for (let i = 0; i < timers.length; i++) {
    const timer = timers[i];
    const timerTime = new Date(timer.time);

    if (timerTime <= currentTime) {
      switch (timer.action) {
      case "message":
        message(client, timer.channelId, timer.text);
        break;
      case "removeRole":
        removeRole(client, timer.guildId, timer.memberId, timer.roleId);
        break;
      default:
        return;
      }

      if (timer.repeat) {
        timer.time = addSeconds(currentTime, timer.interval).toISOString();

        activeTimers.push(timer);
      }
    } else {
      activeTimers.push(timer);
    }
  }

  await storage.setItem("timers", activeTimers);
  setTimeout(() => initTimers(client, activeTimers), 5000);
};

/**
 * Utility function for use with timers. Processes how long of a time is indicated by the string.
 * @param {string} s String input from user.
 * @return {number} THe number of seconds the s is equal to.
 */
const parseTime = (s) => {
  try {
    const ratioToSeconds = {
      s: 1,
      m: 60,
      h: 60 * 60,
      d: 60 * 60 * 24
    };
    const regex = /(\d+)([smhd]*)/i;
    const found = s.match(regex); // For "5d" => ["5d", "5", "d"]
    const multiplier = ratioToSeconds[found[2]] || 1;

    return parseInt(found[1]) * multiplier;
  } catch (err) {
    return 0;
  }
};

module.exports = {
  initTimers: initTimers,
  parseTime: parseTime
};