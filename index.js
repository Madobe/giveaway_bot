const Discord = require("discord.js");
const client = new Discord.Client();
const storage = require("node-persist");

const GSheets = require("./services/gsheets");
const gsheet = new GSheets();

const getLeaderboard = async () => {
  const rows = await gsheet.getValues("14t9-54udr_eqaCgq9g1rWhPLHY_E-RxfdhKTXxgCERc", "A2:B11");
  return rows.map((row, i) => `${i + 1}. ${row[0]} - ${row[1]}p`).join("\n");
};

const updateLeaderboardChannel = async () => {
  await storage.init();
  const leaderboardChannelId = await storage.getItem("leaderboardChannelId");
  if (leaderboardChannelId === undefined) return;
  const leaderboardChannel = client.channels.get(leaderboardChannelId);
  const lastMessage = (await leaderboardChannel.fetchMessages({ limit: 1})).array()[0];

  if (lastMessage.author.id === client.user.id) {
    lastMessage.edit(await getLeaderboard());
  } else {
    leaderboardChannel.send(await getLeaderboard());
  }

  console.log("Leaderboard updated.");
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
    message.channel.send("https://discordapp.com/oauth2/authorize?&client_id=504764999655489565&scope=bot&permissions=68608");
  } else if(message.content.startsWith("!leaderchannel")) {
    const channelId = message.content.split(" ").slice(1)[0];
    message.channel.send(`Leaderboards channel has been set to <#${channelId}> with ID ${channelId}.`);
    await storage.init();
    await storage.setItem("leaderboardChannelId", channelId);
  }
});

client.login(process.env.DISCORD_TOKEN);