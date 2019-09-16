const toTitleCase = require("../utilities/string-ops").toTitleCase;
const expandRestrictions = require("./restrictions").expandRestrictions;

module.exports = [
  {
    "name": "ign",
    "question": [
      "Please note that you can type `cancel` at any time during this process to cancel your donation.",
      "",
      "What is your in-game name (IGN)?"
    ]
  },
  {
    "name": "platform",
    "question": "What platform are you on?",
    "format": (input) => { return input.toUpperCase(); }
  },
  {
    "name": "items",
    "question": "What items would you like to donate? Please separate them with commas.",
    "format": (input) => { return toTitleCase(input); }
  },
  {
    "name": "anonymous",
    "question": "Would you like to remain anonymous? Y/N",
    "format": (input) => { return input.toUpperCase() === "Y"; }
  },
  {
    "name": "availability",
    "question": "At what times are you available to trade? Please remember to include the timezone (e.g UTC, GMT, etc)."
  },
  {
    "name": "restrictions",
    "question": [
      "Should there be any restrictions placed on who can win the items you have donated? You can set it to the following or a custom restriction:",
      "Beginner - Up to 100h in-game time.",
      "Novice - Less than 250h in-game time.",
      "Unowned - The winner must not already have a copy of this item.",
      "Typing one of the above will automatically expand the restriction (ie. `Beginner` becomes `Beginner - Up to 100h in-game time.`).",
      "In the event of multiple restrictions, please separate each with a comma.",
      "If you would not like to add a restriction, just type `none`."
    ],
    "format": (input) => { return input.toLowerCase() === "none" ? "N/A" : expandRestrictions(input); }
  },
  {
    "name": "notes",
    "question": "Are there any notes you would like to add? (Type N if no.)",
    "format": (input) => { return input.toUpperCase() === "N" ? "N/A" : input; }
  }
]