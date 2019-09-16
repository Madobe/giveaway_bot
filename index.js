const Discord = require("discord.js");
const client = new Discord.Client();

const Root = require("./models/root");
const root = new Root(client);

root.init();