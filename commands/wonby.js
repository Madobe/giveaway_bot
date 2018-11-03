// Expected format: !wonby row | tags | igns
const GSheets = require("../services/gsheets");
const gsheet = new GSheets();

/**
 * Gathers all the Discord tags in the message.
 * @param {Message} message A Discord.js Message object.
 * @return {Array<string>} An array of Discord tags.
 */
const collectDiscordTags = async (message) => {
  const text = message.content.split("|")[1];
  const mentions =  message.mentions.users.map((user) => user.tag);
  const tags = text.split(" ");

  let uniqueTags = {};
  for(let i = 0; i < mentions.length; i++) {
    uniqueTags[mentions[i]] = true;
  }
  for(let i = 0; i < tags.length; i++) {
    if(tags[i].indexOf("#") === -1) continue;
    uniqueTags[tags[i]] = true;
  }

  return Object.keys(uniqueTags);
};

/**
 * Gathers and splits all the IGNs in the message.
 * @param {Message} message A Discord.js Message object.
 * @return {Array<string>} An array of IGNs.
 */
const processIGNs = async (message) => {
  const igns = message.content.split("|")[2];
  const splitIGNs = igns.split(/\s*,\s*/g).map(ign => ign.trim());
  return splitIGNs;
};

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const row = message.content.split("|")[0].split(" ")[1];
  const tags = await collectDiscordTags(message);
  const igns = await processIGNs(message);

  gsheet.updateRow(
    "1xFBhGMz-H-7uuZfHi4ZdvWWZrzEHywA4AaVvRCEsYYc",
    `M${row}:N${row}`,
    [[tags.join("\n"), igns.join("\n")]]
  );

  message.channel.send("Winners have been updated on the spreadsheet.");
};

exports.conf = {
  permissionLevel: "Moderator"
};

exports.units = {
  collectDiscordTags: collectDiscordTags,
  processIGNs: processIGNs
};