const storage = require("node-persist");

const userInput = require("../modules/userinput");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const questions = [
    "What is your in-game name (IGN)?",
    "What platform are you on?",
    "What items would you like to donate? Please separate them with commas.",
    "Would you like to remain anonymous? Y/N",
    `Should there be any restrictions placed on who can win the items you have donated? You can set it to the following or a custom restriction:
Beginner - Up to 100h in-game time.
Novice - Less than 250h in-game time.
Unowned - The winner must not already have a copy of this item.
Unmastered - The winner must have not already mastered the item being donated.
If you would not like to add a restriction, just type \`none\`.`,
    "Are there any notes you would like to add? (Type N if no.)"
  ];

  let userResponses = [];
  for(let i = 0; i < questions.length; i++) {
    userResponses.push(await userInput.getSingleInput(message, questions[i], userResponses));
  }

  userResponses[1] = userResponses[1].toUpperCase(); // Platform
  userResponses[3] = userResponses[3].toUpperCase(); // Anonymity
  if(userResponses[4].toLowerCase() === "none") userResponses[4] = ""; // Restrictions
  if(userResponses[5].toUpperCase() === "N") userResponses[5] = ""; // Notes
  userResponses.push(message.author.tag);

  await storage.init();
  let donationsList = await storage.getItem("donationsList") || {};
  const donationId = Date.now();
  donationsList[donationId] = userResponses;
  await storage.setItem("donationsList", donationsList);
  message.channel.send("Donation logged with these responses:\n" + userResponses.join("\n"));

  const donationNotificationChannelId = await storage.getItem("donationNotificationChannelId");
  if (donationNotificationChannelId === undefined) return;
  const donationNotificationChannel = client.channels.get(donationNotificationChannelId);
  donationNotificationChannel.send(
    `New donation received.
\`\`\`ID: ${donationId}
IGN: ${userResponses[0]} ${userResponses[3] === "Y" ? "(anonymous)" : ""}
Platform: ${userResponses[1]}
Items: ${userResponses[2]}
Restrictions: ${userResponses[4]}
Additional Notes: ${userResponses[5]}\`\`\``
  );
};

exports.conf = {
  permissionLevel: "none"
};