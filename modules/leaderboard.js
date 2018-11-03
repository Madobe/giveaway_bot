const storage = require("node-persist");

const GSheets = require("../services/gsheets");
const gsheet = new GSheets();

/**
 * Queries Google Spreadsheets for the top 10 donators.
 * @return {Array<string>} An array of strings, each representing a person with their plat values.
 */
const generate = async () => {
  const rows = await gsheet.getValues("14t9-54udr_eqaCgq9g1rWhPLHY_E-RxfdhKTXxgCERc", "A2:B11");
  return rows.map((row, i) => `${i + 1}. **${row[0]}** - ${row[1]}p`).join("\n");
};

/**
 * Looks in the leaderboard channel, if set, and updates the latest message to 
 * represent the current leaders. If the last message is not from the bot, it 
 * sends a new one instead of editing.
 */
const updateChannel = async (client, args) => {
  await storage.init(args.storageOpts);
  const leaderboardChannelId = await storage.getItem("leaderboardChannelId");
  const leaderboardChannel = client.channels.get(leaderboardChannelId);
  if(leaderboardChannel === undefined) return;
  const lastMessage = (await leaderboardChannel.fetchMessages({ limit: 1 })).array()[0];

  if (lastMessage.author.id === client.user.id) {
    lastMessage.edit(await generate());
  } else {
    leaderboardChannel.send(await generate());
  }

  console.log("Leaderboard updated.");
};

module.exports = {
  generate: generate,
  updateChannel: updateChannel
};