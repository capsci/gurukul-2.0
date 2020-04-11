"use strict";

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const TOKEN_PATH = 'secret/token.json';

var g_spreadsheetId;
var g_range;

function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            return this._getNewToken(oAuth2Client, callback);
        }
        oAuth2Client.setCredentials(JSON.parse(token));
        readData(oAuth2Client,callback);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            readData(oAuth2Client, callback);
        });
    });
}

/**
 * Prints the data in given range from spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/spreadsheetId/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function readData(auth, callback) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
            spreadsheetId: g_spreadsheetId,
            range: g_range,
        }, (err, res) => {
            if (!err)
                res = res.data.values;
            callback(err, res);
        });
}

function read(spreadsheetId, range, callback) {
    if(!spreadsheetId)
        throw "spreadsheetId must be provided";
    if(!range)
        throw "range must be provided";
    g_spreadsheetId = spreadsheetId;
    g_range = range;
    // Load client secrets from a local file.
    fs.readFile('secret/credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        authorize(JSON.parse(content), callback);
    });
}

module.exports = {
    read
}
