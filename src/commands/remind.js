const storage = require("node-persist");
const addSeconds = require("date-fns/add_seconds");
const format = require("date-fns/format");

const parseTime = require("../modules/timer").parseTime;

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  await storage.init();

  const timers = await storage.getItem("timers") || [];
  const seconds = parseTime(args[0]);

  if (seconds === 0) return message.channel.send("Invalid time.");

  const time = addSeconds(new Date(), seconds);
  const newTimer = {
    time: time,
    action: "message",
    channelId: message.channel.id,
    text: args.slice(1)
  };

  timers.push(newTimer);
  storage.setItem("timers", timers);
  message.channel.send(`The message will be sent to this channel at ${format(time, "MMM D, YYYY hh:mm:ss A")}.`);
};

exports.conf = {
  permissionLevel: "none"
};