exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  return message.channel.send(`\`\`\`
!collected - Writes to the spreadsheet. Only use when items have been claimed.
!donation - Make a donation.
!donationnotificationchannel - Where to put the notification that somebody did !donation.
!help - You're reading it.
!invite - Link to invite the bot. Not available.
!leaderchannel - Which channel gets the auto-updating leaderboards.
!top - See the current top donators.
!wonby - Set winners. (!wonby row | tags | igns)\`\`\``);
};

exports.conf = {
  permissionLevel: "none"
};