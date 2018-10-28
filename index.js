const Discord = require("discord.js");
const client = new Discord.Client();
const storage = require("node-persist");

const GSheets = require("./services/gsheets");
const gsheet = new GSheets();

/**
 * Queries Google Spreadsheets for the top 10 donators.
 * @return {Array<string>} An array of strings, each representing a person with their plat values.
 */
const getLeaderboard = async () => {
  const rows = await gsheet.getValues("14t9-54udr_eqaCgq9g1rWhPLHY_E-RxfdhKTXxgCERc", "A2:B11");
  return rows.map((row, i) => `${i + 1}. **${row[0]}** - ${row[1]}p`).join("\n");
};

/**
 * Looks in the leaderboard channel, if set, and updates the latest message to 
 * represent the current leaders. If the last message is not from the bot, it 
 * sends a new one instead of editing.
 */
const updateLeaderboardChannel = async () => {
  await storage.init();
  const leaderboardChannelId = await storage.getItem("leaderboardChannelId");
  if (leaderboardChannelId === undefined) return;
  const leaderboardChannel = client.channels.get(leaderboardChannelId);
  const lastMessage = (await leaderboardChannel.fetchMessages({ limit: 1 })).array()[0];

  if (lastMessage.author.id === client.user.id) {
    lastMessage.edit(await getLeaderboard());
  } else {
    leaderboardChannel.send(await getLeaderboard());
  }

  console.log("Leaderboard updated.");
};

/**
 * Waits for a single message from the person talking to the bot.
 * @param {Message} message Represents a message sent by a user.
 * @return {string} The plain text entered by the user.
 */
const getUserInput = async(message) => {
  const filter = m => m.author.id === message.author.id;
  let response;
  await message.channel.awaitMessages(filter, { max: 1 })
    .then(collected => response = collected.first().content);
  return response;
};

/**
 * Ask question > wait for answer > update variables > return
 * @param {Message} message Represents a message sent by a user.
 * @param {string} question The question being asked.
 * @param {Array<string>} userResponses An array of all the values currently gathered from the user.
 */
const getSingleInput = async(message, question) => {
  message.channel.send(question);
  return await getUserInput(message);
};

/**
 * Checks if the given user has the moderator role (by ID).
 * @param {GuildMember} member The user attempting to run a command.
 */
const isModerator = (member) => {
  return member.roles.get("367116941153927170") !== undefined;
};

// We assume that we're only running on ONE SERVER
client.on("ready", async () => {
  await updateLeaderboardChannel();
  setInterval(updateLeaderboardChannel, 60000);
});

client.on("message", async (message) => {
  if(message.author.bot) return;

  if(message.content === "!top") {
    message.channel.send(await getLeaderboard());
  } else if(message.content === "!invite") {
    message.channel.send("https://discordapp.com/oauth2/authorize?&client_id=505827078176899094&scope=bot&permissions=68608");
  } else if(message.content.startsWith("!leaderchannel") && isModerator(message.member)) {
    const channelId = message.content.split(" ").slice(1)[0];
    message.channel.send(`Leaderboards channel has been set to <#${channelId}> with ID ${channelId}.`);
    await storage.init();
    await storage.setItem("leaderboardChannelId", channelId);
    await updateLeaderboardChannel();
  } else if(message.content.startsWith("!donationNotificationChannel") && isModerator(message.member)) {
    const channelId = message.content.split(" "). slice(1)[0];
    message.channel.send(`Donations notification channel has been set to <#${channelId}> with ID ${channelId}.`);
    await storage.init();
    await storage.setItem("donationNotificationChannelId", channelId);
  } else if(message.content === "!donation") {
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
      "Are there any notes you would like to add?"
    ];

    let userResponses = [];
    for(let i = 0; i < questions.length; i++) {
      userResponses.push(await getSingleInput(message, questions[i], userResponses));
    }

    userResponses[3] = userResponses[3].toUpperCase();
    if(userResponses[4] === "none") userResponses[4] = "";
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
  } else if(message.content.startsWith("!collected") && isModerator(message.member)) {
    const donationId = message.content.split(" ")[1];
    await storage.init();
    let donationsList = await storage.getItem("donationsList");
    const donationDetails = donationsList[donationId];
    await gsheet.insertRow(
      "1xFBhGMz-H-7uuZfHi4ZdvWWZrzEHywA4AaVvRCEsYYc",
      "A2",
      [[
        null, // Switch
        true, // Collected
        false, // Started
        false, // Ended
        false, // Delivered
        donationDetails[2], // Item
        "", // Plat value (Estimated)
        donationDetails[1], // Platform
        donationDetails[4], // Restrictions
        donationDetails[3] === "Y" ? "anonymous" : donationDetails[6], // Donated By
        message.author.tag, // Held By
        "", // Won By
        "", // Won By (IGN)
        donationDetails[5], // Donor Notes
        message.content.split(" ").slice(2).join(" ") // Staff Notes
      ]]
    );
  }
});

client.login("NTA1ODI3MDc4MTc2ODk5MDk0.DrZQMg.H7_dSJLYtFEEhO6UZqCEpUFYx9w");