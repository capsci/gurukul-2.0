"use strict";

var GoogleSheets = require('./../../modules/interfaces/GoogleSheets');
var Secret = require('./../../secret/Constants');
var SpreadsheetCol = require('./../../config/Constants').SpreadsheetCol;

function getStructuredDataFromGoogle(callback) {
    return GoogleSheets.read(Secret.Spreadsheet.ID, "Form Responses 1!A2:Z1000", (err, data) => {
        var newData = [];
        if (!err) {
            // Remove Header Row
            data.shift();
            data.forEach((row) => {
                newData.push({
                    applicationTime: row[SpreadsheetCol.applicationTime],
                    fullName: row[SpreadsheetCol.fullName],
                    email: row[SpreadsheetCol.email],
                    referrer1: row[SpreadsheetCol.referrer1],
                    referrer2: row[SpreadsheetCol.referrer2],
                    facebook: row[SpreadsheetCol.facebook],
                    linkedin: row[SpreadsheetCol.linkedin],
                    courseInfo: row[SpreadsheetCol.courseInfo],
                    schoolNameAndAddress: row[SpreadsheetCol.schoolNameAndAddress],
                    docsEmailed: row[SpreadsheetCol.docsEmailed],
                });
            });
        }
        callback(err, newData);
    });
}

module.exports = {
    getData : function getData(callback) {
        return getStructuredDataFromGoogle(callback);
    }
};

async function getDatabaseIDs(err, data) {
    var calculated_data = [];
    if(err) {
        throw err;
    }
    data.forEach((row, index) => {
        var objects = [];
        try{
            // TODO: Throw error if multiple ids found
            var applicants = getApplicantsFromEmails(row[Config.SpreadsheetCol.email]);
            objects.push(applicants[0])
        }
        catch(err){
            console.log("caught");
            console.log(err);
            objects.push({error: err})
        }
        return objects;
    });
}

async function getApplicantsFromEmails(emailString) {
    if(!emailString) {
        throw "Email Not Provided";
    }
    var emails = extractEmails(emailString);
    if (!emails) {
        throw `Cannot extract email from string '${emailString}'`;
    }
    return await Applicant.findByEmail(emails);
}

// TODO : Move to common utilities
function extractEmails (text)
{
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}
