const storage = require("node-persist");
const addSeconds = require("date-fns/add_seconds");

const parseTime = require("../modules/timer").parseTime;
const cleanChannel = require("../modules/timer_actions/cleanchannel");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const [
    channelId,
    time,
    ...ignoreIds
  ] = args;
  const interval = parseTime(time);
  const timeToNextInterval = addSeconds(new Date(), interval);

  if (!channelId || channelId === "") return message.channel.send("Invalid channel ID.");
  if (interval === 0) return message.channel.send("Invalid interval specified, parsed to 0.");

  for (let i = 0; i < ignoreIds.length; i++) {
    if (isNaN(parseInt(ignoreIds[i]))) return message.channel.send("Invalid message ID(s) provided.");
  }

  await storage.init();

  const timers = await storage.getItem("timers") || [];

  for(let i = 0; i < timers.length; i++) {
    if (timers[i].action === "cleanChannel" && timers[i].channelId === channelId) {
      message.channel.send(`
**WARNING**: A previously existing timer for this channel was found and will be replaced with the current one. The previous timer had these arguments:
Interval time: ${interval}
Messages to ignore: ${ignoreIds.toString().replace(/,/gu, ", ")}
`);

      timers.splice(i, 1);
    }
  }

  timers.push({
    time: timeToNextInterval,
    action: "cleanChannel",
    channelId: channelId,
    ignoreIds: ignoreIds,
    repeat: true,
    interval: interval
  });
  await storage.setItem("timers", timers);

  cleanChannel(client, channelId, ignoreIds);
  message.channel.send(`The channel has been cleaned and will be cleaned constantly with an interval of ${time} seconds between sessions.`);
};

exports.conf = {
  permissionLevel: "Moderator"
};