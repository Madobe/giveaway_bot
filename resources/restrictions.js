const expansions = {
  "beginner": "Beginner - Up to 100h in-game time.",
  "novice": "Novice - Less than 250h in-game time.",
  "unowned": "Unowned - The winner must not already have a copy of this item."
};

/**
 * Takes the restrictions and expand keywords to include descriptions as well as split
 * @param {string} response The user's inputted response for what restrictions are on the donation.
 */
const expandRestrictions = (response) => {
  const expansions = {
    "beginner": "Beginner - Up to 100h in-game time.",
    "novice": "Novice - Less than 250h in-game time.",
    "unowned": "Unowned - The winner must not already have a copy of this item.",
  };

  const restrictions = response.split(",");

  let expanded = [];
  for(let i = 0; i < restrictions.length; i++) {
    const restriction = restrictions[i].toLowerCase().trim();
    expanded.push(expansions[restriction] || restrictions[i].trim());
  }
  return expanded.join("\n");
};

module.exports = {
  expansions,
  expandRestrictions
};