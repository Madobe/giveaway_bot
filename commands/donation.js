const { RichEmbed } = require("discord.js");
const storage = require("node-persist");

const userInput = require("../modules/userinput");
const questions = require("../resources/donationquestions.json");

/**
 * Get responses to all the donation questions.
 * @param {Message} message A Discord.js Message object.
 * @return {Array<string>} An array representing the user's responses to the questions.
 */
const getResponses = async (message) => {
  let responses = [];

  for(let i = 0; i < questions.length; i++) {
    const response = await userInput.getSingleInput(message, questions[i]);
    if(response.toLowerCase() === "cancel") return message.channel.send("Donation process canceled.");
    responses.push(response);
  }

  return responses;
};

/**
 * Takes the donation responses and assign to to keys on a hash and format them.
 * @param {Array<string>} responses An array of the responses to the donation questions.
 */
const tidyResponses = (message, responses) => {
  return {
    ign: responses[0],
    platform: responses[1].toUpperCase(),
    items: responses[2],
    anonymous: responses[3].toUpperCase() === "Y",
    availability: responses[4],
    restrictions: responses[5].toLowerCase() === "none" ? "" : expandRestrictions(responses[5]),
    notes: responses[6].toUpperCase() === "N" ? "" : responses[6],
    tag: message.author.tag,
    userId: message.author.id
  };
};

/**
 * Takes the restrictions and expand keywords to include descriptions as well as split
 * @param {string} response The user's inputted response for what restrictions are on the donation.
 */
const expandRestrictions = (response) => {
  const expansions = {
    "beginner": "Beginner - Up to 100h in-game time.",
    "novice": "Novice - Less than 250h in-game time.",
    "unowned": "Unowned - The winner must not already have a copy of this item.",
  };

  const restrictions = response.split("|");

  let expanded = [];
  for(let i = 0; i < restrictions.length; i++) {
    const restriction = restrictions[i].toLowerCase().trim();
    expanded.push(expansions[restriction] || restrictions[i].trim());
  }
  return expanded.join("\n");
};

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
  if (donationNotificationChannel === undefined) return message.channel.send(`No notification channel set. New donation created under ID "${id}"`);

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
  const _responses = await getResponses(message);
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