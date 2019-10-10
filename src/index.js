// Load in and instantiate the Discord client
const Discord = require('discord.js')
const client = new Discord.Client()

const MainController = require('./controllers/main-controller')
const controller = new MainController()

controller.init(client)