const storage = require("node-persist");
const moment = require("moment");

const GSheets = require("../services/gsheets");
const gsheet = new GSheets();

/**
 * Checks if an ID was provided. If not, it returns the last donation made.
 * @param {Object} list A hash with donation details organized via the time they were created.
 * @param {string} id A string representing a key from list.
 */
const getDonation = async (list, id) => {
  if(id === undefined || id === "") {
    return Object.keys(list).sort((a, b) => b - a)[0];
  }
  return id;
};

/**
 * Checks an item to see if it's Prime and has a number in front.
 * @param {string} item The item name we're checking.
 */
const isPrime = async (item) => {
  item = item.toLowerCase();

  if(!isNaN(item[0]) && (item.endsWith("prime") || item.endsWith("primes"))) {
    return true;
  } else {
    return false;
  }
};

/**
 * Checks to see if the item name is plural. Specifically, if it's the word "primes".
 * @param {string} item The item name we're checking.
 */
const isPlural = async (item) => {
  return item.toLowerCase().endsWith("primes");
};

/**
 * Removes the s on an item name and multiplies it.
 * @param {string} item The item name we're operating on.
 * @return {Array<string>} An array of the item name, multiplied by the number originally in it.
 */
const singularize = async (item) => {
  if(isPlural(item)) item = item.slice(0, -1);
  let parts = item.split(" ");
  item = parts.slice(1).join(" ");

  const times = parseInt(parts.shift()) || 1;
  let copies = [];
  for(let i = 0; i < times; i++) {
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
    if(await isPrime(items[i])) {
      splitItems = splitItems.concat(await singularize(items[i]));
    } else {
      splitItems.push(items[i]);
    }
  }

  return splitItems;
};

/**
 * Gets a donation entry and turns it from an array into a hash for readability.
 * @param {Object} donation The donation entry that we're tidying up.
 */
const tidyDetails = async (donation) => {
  return {
    ign: donation[0],
    platform: donation[1],
    items: donation[2],
    anonymous: donation[3],
    restrictions: donation[4],
    notes: donation[5],
    tag: donation[6]
  };
};

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  let donationId = message.content.split(" ")[1];

  await storage.init(args.storageOpts);
  let donationsList = await storage.getItem("donationsList");

  donationId = getDonation(donationsList, donationId);
  const details = tidyDetails(donationsList[donationId]);

  const date = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  const items = details.items.split(/\s*,\s*/);
  const splitItems = processItems(items);

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
      details.anonymous === "Y" ? "anonymous" : details.tag, // Donated By
      message.author.tag, // Held By
      "", // Won By
      "", // Won By (IGN)
      details.notes, // Donor Notes
      message.content.split(" ").slice(2).join(" ") // Staff Notes
    ];
  });

  await gsheet.insertRow(
    "1xFBhGMz-H-7uuZfHi4ZdvWWZrzEHywA4AaVvRCEsYYc",
    "A2:O999",
    rows
  );

  // If they're anonymous, add here too
  if(details.anonymous === "Y") {
    let anonRows = [];
    for(let i = 0; i < splitItems.length; i++) {
      anonRows.push([details.tag]);
    }
    await gsheet.insertRow(
      "1RpyLPCw-qIIuRvqV5kmZxzqbyT0qA8rDIKlCziQsNBs",
      "ANON NAMES!A1",
      anonRows
    );
  }

  message.channel.send("Spreadsheet updated.");

  return splitItems;
};

exports.conf = {
  permissionLevel: "Moderator"
};

// Exported specifically for unit testing
exports.units = {
  getDonation: getDonation,
  isPrime: isPrime,
  isPlural: isPlural,
  singularize: singularize,
  processItems: processItems,
  tidyDetails: tidyDetails
};