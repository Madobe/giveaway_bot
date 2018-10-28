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
  const rows = items.map(item => {
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
    "A2",
    rows
  );

  message.channel.send("Spreadsheet updated.");
};

exports.conf = {
  permissionLevel: "Moderator"
};