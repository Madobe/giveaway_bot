/**
 * This file handles the setting of timers and performing each of the actions they require. Actions
 * handled by a timer must be serializable without the usage of any objects (rebuild objects from
 * the primitive values).
 */
const storage = require("node-persist");
const addSeconds = require("date-fns/add_seconds");

const message = require("./timer_actions/message");
const removeRole = require("./timer_actions/removerole");
const cleanChannel = require("./timer_actions/cleanchannel");

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
      case "cleanChannel":
        cleanChannel(client, timer.channelId, timer.ignoreIds);
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