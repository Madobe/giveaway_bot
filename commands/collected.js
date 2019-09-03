const storage = require("node-persist");
const format = require("date-fns/format");

const GSheets = require("../services/gsheets");
const gsheet = new GSheets();

const numberOnly = (str) => {
  return str.replace(/\D/g, '');
};

/**
 * Checks if an ID was provided. If not, it returns the last donation made.
 * @param {Object} list A hash with donation details organized via the time they were created.
 * @param {string} id A string representing a key from list.
 */
const getDonation = (list, id) => {
  if(id === undefined || id === "") {
    return Object.keys(list).sort((a, b) => b - a)[0];
  }
  console.log(id);
  return id;
};

/**
 * Checks an item to see if it's prime.
 * @param {string} item The item name we're checking.
 */
const isPrime = (item) => {
  return /\b(primes?d{0})\b/gi.test(item.toLowerCase());
};

/**
 * Checks to see if the item name is plural. Specifically, if it's the word "primes".
 * @param {string} item The item name we're checking.
 */
const isPlural = (item) => {
  return /bprimes\b/gi.test(item);
};

/**
 * Removes the s on an item name and multiplies it.
 * @param {string} item The item name we're operating on.
 * @return {Array<string>} An array of the item name, multiplied by the number originally in it.
 */
const singularize = async (item) => {
  if(isPlural(item)) item = item.replace(/\bprimes\b/gi, 'Prime')

  const amountRegex = /(^x?[0-9]x?|x?[0-9]x?$)/gi;
  let amount = item.match(amountRegex)[0];
  amount = parseInt(numberOnly(amount));

  let copies = [];
  item = item.replace(amountRegex, '').trim();

  for (let i = 0; i < amount; i++) {
    copies.push(item);
  }

  return copies;
};

/**
 * Takes the items and sees if any are prime and multiples. If they are, then 
 * they are split apart into multiple copies of the item.
 * ie. "3 Ember Prime" => "Ember Prime", "Ember Prime", "Ember Prime"
 * @param {Array<string>} items An array of item names.
 * @return {Array<string>} An array of items which have been split even further.
 */
const processItems = async (items) => {
  let splitItems = [];

  for(let i = 0; i < items.length; i++) {
    if(isPrime(items[i])) {
      splitItems = splitItems.concat(singularize(items[i]));
    } else {
      splitItems.push(items[i]);
    }
  }

  let promisedArray = await Promise.all(splitItems);
  promisedArray = [].concat(...promisedArray);
  return promisedArray;
};

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  let id = message.content.split(" ")[1];

  const storageOpts = args instanceof Array ? {} : args.storageOpts;
  await storage.init(storageOpts);
  let list = await storage.getItem("donationsList");

  let details;
  try {
    details = list[getDonation(list, id)];
  } catch(err) {
    return message.channel.send("No donations have been made yet.");
  }

  const date = format(new Date(), "YYYY-MM-DD HH:mm:ss");
  const items = details.items.split(/\s*,\s*/);
  const splitItems = await processItems(items);

  const userId = details.userId || client.users.find("tag", details.tag).id;
  const rows = splitItems.map(item => {
    return [
      date, // Timestamp
      null, // Switch
      true, // Collected
      false, // Started
      false, // Ended
      false, // Delivered
      item, // Item
      "", // Plat value (Estimated)
      details.platform, // Platform
      details.restrictions, // Restrictions
      details.anonymous ? "anonymous" : details.tag, // Donated By
      details.anonymous ? "anonymous" : userId, // Donated By (Discord ID)
      details.anonymous ? "anonymous" : details.ign, // Donated By (IGN)
      message.author.tag, // Held By
      "", // Won By
      "", // Won By (Discord ID)
      "", // Won By (IGN)
      details.notes, // Donor Notes
      message.content.split(" ").slice(2).join(" ") // Staff Notes
    ];
  });

  await gsheet.insertRow(
    process.env.TRACKER_SPREADSHEET_ID,
    "A2:R",
    rows
  );

  message.channel.send("Spreadsheet updated.");

  return splitItems;
};

exports.conf = {
  permissionLevel: "Giveaway"
};

// Exported specifically for unit testing
exports.units = {
  getDonation: getDonation,
  isPrime: isPrime,
  isPlural: isPlural,
  singularize: singularize,
  processItems: processItems
};