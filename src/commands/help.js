const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
  const embed = new MessageEmbed()
    .setColor("#0486f7")
    .setTitle("Giveaway Bot Commands")
    .setDescription('Time for any function that uses it is in the form "#[s/m/h/d]" (eg. 30s).')
    .addField(
      "!donation",
      "Make a donation."
    )
    .addField(
      "!help",
      "You're reading it."
    )
    .addField(
      "!invite",
      "Link to invite the bot. Not available."
    )
    .addField(
      "!r",
      "Plz read."
    )
    .addField(
      "!remind time message",
      "Sends the message given back to the channel after the time has elapsed."
    )
    .addField(
      "!top",
      "See the current top donators."
    )

  message.channel.send({ embed })
  
  if (message.member.roles.get(process.env.GIVEAWAY_ROLE) === undefined) {
    return
  }

  const staffEmbed = new MessageEmbed()
    .setColor("#ff471a")
    .setTitle("Giveaway Bot Staff Commands")
    .setDescription("These commands are for staff only. Variables that have ? at the end are optional.")
    .addField(
      "!cleanchannel channelId interval messageIdsToIgnore",
      "Cleans the channel every time the interval passes. Also does an initial clean. Ignores any messages with the given IDs."
    )
    .addField(
      "!collected id?",
      "Writes to the spreadsheet. Only use when items have been claimed. The id parameter is optional. If the parameter is not provided, it operates on the last entry."
    )
    .addField(
      "!disqualify user time",
      "Adds the Disqualified role to the mentioned user for the specified length of time."
    )
    .addField(
      "!donationresponses channelId",
      "Where to put the notification that somebody did !donation."
    )
    .addField(
      "!leaderchannel channelId",
      "Sets which channel gets the auto-updating leaderboards."
    )
    .addField(
      "!role roleName",
      "Returns the ID of the given role."
    )
    .addField(
      "!rolememberlist role",
      "Returns a list of members with the specified role."
    )
    .addField(
      "!wonby row | tags | igns",
      "Set winners on the spreadsheet."
    );

  return message.channel.send({ embed: staffEmbed })
};

exports.conf = {
  permissionLevel: "none"
}