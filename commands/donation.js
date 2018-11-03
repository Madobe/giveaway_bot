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
    if(response.toLowerCase() === "cancel") return "cancel";
    responses.push(response);
  }

  return responses;
};

/**
 * Takes the donation responses and assign to to keys on a hash and format them.
 * @param {Array<string>} responses An array of the responses to the donation questions.
 */
const tidyResponses = async (message, responses) => {
  return {
    ign: responses[0],
    platform: responses[1].toUpperCase(),
    items: responses[2],
    anonymous: responses[3].toUpperCase() === "Y",
    restrictions: responses[4].toLowerCase() === "none" ? "" : responses[4],
    notes: responses[5].toUpperCase() === "N" ? "" : responses[5],
    tag: message.author.tag
  };
};

/**
 * Persists the donation entry using node-persist.
 * @param {Message} message A Discord.js Message object.
 * @param {*} args Can be either a hash or array of arguments. Hash if it came from somewhere within the app.
 * @param {Object} responses The responses in a hash.
 * @return {Number} The ID of the donation that was saved.
 */
const saveDonation = async (message, args, responses) => {
  await storage.init(args.storageOpts);
  let list = await storage.getItem("donationsList") || {};
  const id = Date.now();
  list[id] = responses;
  await storage.setItem("donationsList", list);

  message.channel.send(`Donation logged with these responses:
\`\`\`
IGN: ${responses.ign}
Platform: ${responses.platform}
Items: ${responses.items}
Anonymous? ${responses.anonymous ? "Yes" : "No" }
Restrictions: ${responses.restrictions}
Notes: ${responses.notes}
Submitter: ${responses.tag}
\`\`\``);

  return id;
};

/**
 * 
 * @param {Client} client A Discord.js Client object.
 * @param {Message} message A Discord.js Message object.
 * @param {Object} responses An object representing a donation entry.
 * @param {Number} id The ID for the donation entry.
 */
const sendNotification = async (client, message, responses, id) => {
  // Post that a new donation has been made in the donation notification channel
  const donationNotificationChannelId = await storage.getItem("donationNotificationChannelId");
  const donationNotificationChannel = client.channels.get(donationNotificationChannelId);
  if (donationNotificationChannel === undefined) return message.channel.send(`No notification channel set. New donation created under ID "${id}"`);
  donationNotificationChannel.send(
    `New donation received.
\`\`\`Discord Tag: ${responses[6]}
ID: ${id}
IGN: ${responses[0]} ${responses[3] === "Y" ? "(anonymous)" : ""}
Platform: ${responses[1]}
Items: ${responses[2]}
Restrictions: ${responses[4]}
Additional Notes: ${responses[5]}\`\`\``
  );
};

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const _responses = await getResponses(message);
  if(_responses === "cancel") return;
  const responses = await tidyResponses(_responses);

  const id = await saveDonation(message, args, responses);
  await sendNotification(client, message, responses, id);
};

exports.conf = {
  permissionLevel: "none"
};

exports.units = {
  getResponses: getResponses,
  tidyResponses: tidyResponses,
  saveDonation: saveDonation,
  sendNotification: sendNotification
};