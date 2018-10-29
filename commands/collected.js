const storage = require("node-persist");
const moment = require("moment");

const GSheets = require("../services/gsheets");
const gsheet = new GSheets();

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  let donationId = message.content.split(" ")[1];
  await storage.init();
  let donationsList = await storage.getItem("donationsList");
  if(donationId === undefined || donationId === "") {
    donationId = Object.keys(donationsList).sort((a, b) => b - a)[0];
  }
  const donationDetails = donationsList[donationId];

  const date = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  const items = donationDetails[2].split(/\s*,\s*/);

  // Take all Prime items and turn them into individual entries
  // ie. 3 Ember Prime => Ember Prime, Ember Prime, Ember Prime
  let splitItems = [];
  for(let i = 0; i < items.length; i++) {
    let itemNameParts = items[i].split(" ");
    const lcItemName = items[i].toLowerCase();

    if(!isNaN(itemNameParts[0]) && (lcItemName.endsWith("prime") || lcItemName.endsWith("primes"))) {
      // Remove the "s" on the end if it's "primes"
      if(lcItemName.endsWith("primes")) {
        const index = itemNameParts.length - 1;
        itemNameParts[index] = itemNameParts[index].slice(0, -1);
      }

      const times = parseInt(itemNameParts[0]);
      itemNameParts.shift();

      for(let a = 0; a < times; a++) {
        splitItems.push(itemNameParts.join(" "));
      }
    } else {
      splitItems.push(items[i]);
    }
  }

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
      donationDetails[1], // Platform
      donationDetails[4], // Restrictions
      donationDetails[3] === "Y" ? "anonymous" : donationDetails[6], // Donated By
      message.author.tag, // Held By
      "", // Won By
      "", // Won By (IGN)
      donationDetails[5], // Donor Notes
      message.content.split(" ").slice(2).join(" ") // Staff Notes
    ];
  });

  await gsheet.insertRow(
    "1xFBhGMz-H-7uuZfHi4ZdvWWZrzEHywA4AaVvRCEsYYc",
    "A2:O999",
    rows
  );

  // If they're anonymous, add here too
  if(donationDetails[3] === "Y") {
    let anonRows = [];
    for(let i = 0; i < splitItems.length; i++) {
      anonRows.push([donationDetails[6]]);
    }
    await gsheet.insertRow(
      "1RpyLPCw-qIIuRvqV5kmZxzqbyT0qA8rDIKlCziQsNBs",
      "ANON NAMES!A1",
      anonRows
    );
  }

  message.channel.send("Spreadsheet updated.");
};

exports.conf = {
  permissionLevel: "Moderator"
};