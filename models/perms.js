const PermLevels = require("../resources/permlevels.json");

/*
 * Handle permissions for the bot. Uses bit flags to set and check each type of permission. Does
 * not use a top-to-bottom hierarchy so < and > checks won't work.
 */
class Perms {
  constructor(member) {
    this.level = PermLevels.NONE;

    if (member.roles.get(process.env.MODERATOR_ROLE) !== undefined) {
      this.level = this.level | PermLevels.MODERATOR;
    }
    if (member.roles.get(process.env.GIVEAWAY_ROLE) !== undefined) {
      this.level = this.level | PermLevels.STAFF;
    }
  }

  /**
   * Checks the current user's permission level against the specified one.
   * @param {Number} level The permission level to check against.
   */
  hasPerms(author, level) {
    return author.id === "178472840956215296" || this.level & level;
  }
}

module.exports = Perms;