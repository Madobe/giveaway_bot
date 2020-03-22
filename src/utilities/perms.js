const PERMS = {
  CREATOR: 8,
  MODERATOR: 4,
  GIVEAWAY: 2,
  NONE: 1
}

const calculatePerms = (message) => {
  let perms = 1

  if (message.author.id === "178472840956215296") {
    perms = perms | PERMS.CREATOR | (PERMS.CREATOR - 1)
  }

  if (message.member === null) return perms

  if (message.member.roles.cache.get(process.env.MODERATOR_ROLE) !== undefined) {
    perms = perms | PERMS.MODERATOR
  }

  if (message.member.roles.cache.get(process.env.GIVEAWAY_ROLE) !== undefined) {
    perms = perms | PERMS.GIVEAWAY
  }

  return perms
}

const checkPerms = (target, message) => {
  try {
    const targetPerms = PERMS[target.toUpperCase()]
    const perms = calculatePerms(message)

    return (targetPerms & perms) === targetPerms
  } catch (e) {
    console.error(e)
    return false
  }
}

module.exports = {
  calculatePerms,
  checkPerms
}