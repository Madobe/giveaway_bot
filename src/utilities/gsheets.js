const { google } = require("googleapis")
// @ts-ignore
const credentials = require("../config/credentials")

const scopes = ["https://www.googleapis.com/auth/spreadsheets"]

/**
 * Creates an oAuth2 client for the given credentials.
 * @returns {Promise} Auth client.
 */
const authorize = async () => {
  const jwtClient = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: scopes
  })

  return new Promise((resolve, reject) => {
    jwtClient.authorize((error, tokens) => {
      if (error) {
        reject(error)
      } else {
        google.options({
          auth: jwtClient
        })
        resolve(jwtClient)
      }
    })
  })
}

/**
 * Fetches the data for a given spreadsheet.
 * @param {string} spreadsheetId The ID of the spreadsheet to gather data from.
 * @param {string} cellRange The A1:B1 form cell range to query for.
 * @returns {Promise} Google API service.
 */
const getValues = async (spreadsheetId, cellRange) => {
  await authorize()

  const sheets = google.sheets({version: "v4"})

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: cellRange,
      valueRenderOption: "UNFORMATTED_VALUE",
    }, (err, res) => {
      if (err) reject(err)
      return resolve(res.data.values)
    })
  })
}

/**
 * Inserts a row into a Google Spreadsheet.
 * @param {string} spreadsheetId The ID of the spreadsheet to insert a row into.
 * @param {string} cellRange The A1 notation for which cells to insert under.
 * @param {string[][]} values A two-depth array of the values to insert.
 */
const insertRow = async (spreadsheetId, cellRange, values) => {
  await authorize()

  const resource = { values }
  const sheets = google.sheets({version: "v4"})

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: cellRange,
      valueInputOption: "RAW",
      insertDataOption: "OVERWRITE",
      resource
    }, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

/**
 * Updates a row on a Google Spreadsheet.
 * @param {string} spreadsheetId The ID of the spreadsheet to update a row of.
 * @param {string} cellRange The A1 notation for which cells to update.
 * @param {string[][]} values A two-depth array of the new values.
 */
const updateRow = async (spreadsheetId, cellRange, values) => {
  await authorize()

  const resource = { values }
  const sheets = google.sheets({version: "v4"})

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: cellRange,
      valueInputOption: "RAW",
      resource
    }, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

module.exports = {
  getValues,
  insertRow,
  updateRow
}