/**
 * Capitalizes the first letter of each word (separated by whitespace).
 * @param {String} str The string to convert to title case.
 */
const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

/**
 * Places an underscore between each word instead of a space.
 * @param {String} s The string to convert to snake case.
 */
const toSnakeCase = (s) => {
  return s.replace(/(.)([A-Z][a-z]+)/, '$1_$2').replace(/([a-z0-9])([A-Z])/, '$1_$2').toLowerCase()
}

module.exports = {
  toTitleCase,
  toSnakeCase
}