const fileLoader = require('../utilities/file-loader');
const { checkPerms } = require('../utilities/perms');

class MainController {
  constructor(db) {
    this.db = db;
  }

  async init(client) {
    client.on('ready', async () => {
      // Update timers
    });

    client.on('message', async (message) => {
      if (message.author.bot) return;

      if (message.content.startsWith('!')) {
        const args = message.content.slice(1).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = client.commands[commandName];

        if (command) {
          if (checkPerms(command.conf.permissionLevel, message)) {
            command.run(client, message, args);
          } else {
            message.channel.send("You do not have the necessary permissions to use this command.");
          }
        }
      }
    });

    client.commands = await fileLoader('./src/commands');

    client.login(process.env.DISCORD_TOKEN);
  }
}

module.exports = MainController;