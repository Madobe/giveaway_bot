const loadFile = require("../utilities/file-loader");
const leaderboard = require("../modules/leaderboard");
const initTimers = require("../modules/timer").initTimers;

const Perms = require("./perms");

class Root {
  constructor(client) {
    this.client = client;
    this.client.commands = {};
  }

  async init() {
    this.loadCommands();
    this.login();
    this.listen();
  }

  async loadCommands() {
    this.client.commands = await loadFile("./commands");
  }

  async login() {
    this.client.login(process.env.DISCORD_TOKEN);
  }

  async listen() {
    this.client.on("ready", async () => {
      await leaderboard.updateChannel(this.client);
      setInterval(() => leaderboard.updateChannel(this.client), 60000);
      initTimers(this.client);
    });

    this.client.on("message", async (message) => {
      if (message.author.bot) return;

      const perms = new Perms(message.member);

      if (message.content.startsWith("!")) {
        const args = message.content.slice(1).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = this.client.commands[commandName];

        if (command) {
          if (perms.hasPerms(message.author, command.conf.permissionLevel)) {
            command.run(this.client, message, args);
          } else {
            message.channel.send("You do not have the necessary permissions to use this command.");
          }
        }
      }
    });
  }
}

module.exports = Root;