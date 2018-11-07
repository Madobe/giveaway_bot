const Discord = require("discord.js");
const client = new Discord.Client();
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

const leaderboard = require("./modules/leaderboard");

client.commands = {};

/**
 * Checks if the given user has the moderator role (by ID).
 * @param {GuildMember} member The user attempting to run a command.
 */
const isModerator = (member) => {
  return member.roles.get("506311827341443072") !== undefined;
};

/**
 * Checks if the given user has the giveaway staff role (by ID).
 * @param {GuildMember} member The user attempting to run a command.
 */
const isGiveawayStaff = (member) => {
  return member.roles.get("487093541147901953") !== undefined;
};

// We assume that we're only running on ONE SERVER
client.on("ready", async () => {
  await leaderboard.updateChannel(client);
  setInterval(() => leaderboard.updateChannel(client), 60000);
});

client.on("message", async (message) => {
  if(message.author.bot) return;

  if(message.content.startsWith("!")) {
    const args = message.content.slice(1).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands[commandName];
    if(command) {
      if(command.conf.permissionLevel === "none" ||
         command.conf.permissionLevel === "Moderator" && isModerator(message.member) ||
         command.conf.permissionLevel === "Giveaway" && isGiveawayStaff(message.member)) {
        command.run(client, message, args);
      } else {
        message.channel.send("You do not have the necessary permissions to use this command.");
      }
    }
  }
});

const init = async () => {
  const cmdFiles = await readdir("./commands");
  cmdFiles.forEach(file => {
    if(!file.endsWith(".js")) return;

    try {
      const props = require(`./commands/${file}`);
      const name = file.split(".")[0];
      client.commands[name] = props;
    } catch(e) {
      console.log(`Failed to open file ${file}: ${e}`);
    }
  });

  client.login(process.env.DISCORD_TOKEN);
};

init();