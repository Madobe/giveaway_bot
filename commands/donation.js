const { RichEmbed } = require("discord.js");
const storage = require("node-persist");

const Responses = require("../models/responses");
const gatherAnswers = require("../utilities/inputter").gatherAnswers;
const questions = require("../resources/donationquestions.json");

/**
 * Persists the donation entry using node-persist.
 * @param {Message} message A Discord.js Message object.
 * @param {*} args Can be either a hash or array of arguments. Hash if it came from somewhere within the app.
 * @param {Object} responses The responses in a hash.
 * @return {Number} The ID of the donation that was saved.
 */
const saveDonation = async (message, responses, args) => {
  const storageOpts = args === undefined ? {} : args.storageOpts;

  await storage.init(storageOpts);

  let list = await storage.getItem("donationsList") || {};
  const id = Date.now();
  list[id] = responses;

  await storage.setItem("donationsList", list);

  const embed = new RichEmbed()
    .setColor("#0486f7")
    .setTitle("Donation Responses")
    .addField("IGN", `${responses.ign} ${(responses.anonymous ? "(anonymous)" : "")}`)
    .addField("Platform", responses.platform)
    .addField("Items", responses.items)
    .addField("Anonymous?", `${(responses.anonymous ? "Yes" : "No")}`)
    .addField("Availability", responses.availability)
    .addField("Restrictions", responses.restrictions)
    .addField("Notes", responses.notes)
    .addField("Submitter", `${responses.tag} (ID:${responses.userId})`);

  message.channel.send({ embed });

  return id;
};

/**
 * 
 * @param {Client} client A Discord.js Client object.
 * @param {Message} message A Discord.js Message object.
 * @param {Object} responses An object representing a donation entry.
 * @param {Number} id The ID for the donation entry.
 */
const sendNotification = async (client, message, responses, id, args) => {
  const storageOpts = args === undefined ? {} : args.storageOpts;

  await storage.init(storageOpts);

  const donationNotificationChannelId = await storage.getItem("donationNotificationChannelId");
  const donationNotificationChannel = client.channels.get(donationNotificationChannelId);

  if (donationNotificationChannel === undefined) {
    return message.channel.send(`No notification channel set. New donation created under ID "${id}"`);
  }

  const embed = new RichEmbed()
    .setColor("#0486f7")
    .setTitle("New Donation")
    .addField("Discord Tag", `${responses.tag} (ID:${responses.userId})`)
    .addField("ID", id.toString())
    .addField("IGN", `${responses.ign} ${(responses.anonymous ? "(anonymous)" : "")}`)
    .addField("Platform", responses.platform)
    .addField("Items", responses.items)
    .addField("Availability", responses.availability)
    .addField("Restrictions", responses.restrictions)
    .addField("Additional Notes", responses.notes);

  return donationNotificationChannel.send({ embed });
};

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const _responses = await gatherAnswers(message, questions, "cancel");

  if(_responses === "cancel") return;

  const responses = tidyResponses(message, _responses);
  const id = await saveDonation(message, responses, args);

  sendNotification(client, message, responses, id);
};

exports.conf = {
  permissionLevel: "none"
};

exports.units = {
  getResponses: getResponses,
  tidyResponses: tidyResponses,
  expandRestrictions: expandRestrictions,
  saveDonation: saveDonation,
  sendNotification: sendNotification
};