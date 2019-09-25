// Load in and instantiate the Discord client
const Discord = require('discord.js');
const client = new Discord.Client();

// Connect to the SQLite database
const Sqlite3 = require('sqlite3');
const db = new Sqlite3.Database('./src/db/database.sqlite', (err) => {
  if (err) {
    return console.error(err);
  }

  console.log("Connected to database at db/database.sqlite.")
});

const MainController = require('./controllers/main-controller');
const controller = new MainController(db);

controller.init(client);