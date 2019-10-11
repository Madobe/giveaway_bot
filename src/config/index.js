module.exports = {
  development: {
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
    },
    clean_channel: {
      // 0 0 0 * * 0 is midnight every week on Sunday
      crontime: '0 0 0 * * 0',
      channel_id: '521269391510339584',
      // Message IDs that aren't deleted in the purge
      ignore_ids: [
        '521269534511071242'
      ]
    }
  },
  production: {
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
    },
    clean_channel: {
      // 0 0 0 * * 0 is midnight every week on Sunday
      crontime: '0 0 0 * * 0',
      channel_id: '489712298114547713',
      // Message IDs that aren't deleted in the purge
      ignore_ids: [
        '517792618801790997'
      ]
    }
  },
  test: {
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
    },
    clean_channel: {
      // 0 0 0 * * 0 is midnight every week on Sunday
      crontime: '0 0 0 * * 0',
      channel_id: '489712298114547713',
      // Message IDs that aren't deleted in the purge
      ignore_ids: [
        '517792618801790997'
      ]
    }
  }
}