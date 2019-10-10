module.exports = {
  general: {
    // The minimum amount of time that any timer-creating function will allow, will be parsed as any other time string
    minimum_time: '5m',
    // Sets the delimiter (what to split on) for anything that doesn't split by whitespace
    phrase_delimiter: ',',
    // Sets the delimiter for more programmatical separation; appears if the above is also used in the same
    programmatical_delimiter: '|'
  },
  formats: {
    // Formatting options for dates in embeds; uses internal
    date: {
      locale: 'en-us',
      options: {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    }
  }
}