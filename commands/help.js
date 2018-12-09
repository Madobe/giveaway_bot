exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  return message.channel.send(`\`\`\`
Variables that have ? at the end are optional.
Time for any function that uses it is in the form "#[s/m/h/d]" (eg. "30s"). No quotation marks.

!donation - Make a donation.
  !donation
!help - You're reading it.
  !help
!invite - Link to invite the bot. Not available.
  !invite
!remind - Sends the message given back to the channel after the time has elapsed.
  !remind time message
!top - See the current top donators.
  !top

Staff only:
!cleanchannel - Cleans the channel every time the interval passes. Also does an initial clean. Ignores any messages with the given IDs.
  !cleanchannel channelId interval messageIdsToIgnore
!collected - Writes to the spreadsheet. Only use when items have been claimed.
  !collected id?
!disqualified - Adds the Disqualified role to the mentioned user for the specified length of time.
  !disqualified user time
!donationresponses - Where to put the notification that somebody did !donation.
  !donationnotificationchannel channelId
!leaderchannel - Which channel gets the auto-updating leaderboards.
  !leaderchannel channelId
!role - Returns the ID of the given role.
  !role roleName
!wonby - Set winners on the spreadsheet.
  !wonby row | tags | igns\`\`\``);
};

exports.conf = {
  permissionLevel: "none"
};