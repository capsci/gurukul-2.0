"use strict";

var config = require('./../../secret/config.json');
var GoogleSheets = require('./../../modules/interfaces/GoogleSheets');
var SpreadsheetCol = require('./../../config/Constants').SpreadsheetCol;

function getStructuredDataFromGoogle(callback) {
    return GoogleSheets.read(config.GoogleSheets.id, config.GoogleSheets.range, (err, data) => {
        var newData = [];
        if (!err) {
            // Remove Header Row
            data.shift();
            data.forEach((row) => {
                newData.push({
                    applicationTime: row[SpreadsheetCol.applicationTime],
                    fullName: row[SpreadsheetCol.fullName],
                    usAddress: row[SpreadsheetCol.usAddress],
                    email: row[SpreadsheetCol.email],
                    phonePrimary: row[SpreadsheetCol.phonePrimary],
                    parentAddress: row[SpreadsheetCol.parentAddress],
                    referrer1: row[SpreadsheetCol.referrer1],
                    referrer2: row[SpreadsheetCol.referrer2],
                    facebook: row[SpreadsheetCol.facebook],
                    linkedin: row[SpreadsheetCol.linkedin],
                    courseName: row[SpreadsheetCol.courseName],
                    schoolNameAndAddress: row[SpreadsheetCol.schoolNameAndAddress],
                    courseTuitionFee: row[SpreadsheetCol.courseTuitionFee],
                    otherScholarships: row[SpreadsheetCol.otherScholarships],
                    uploadedDocs: row[SpreadsheetCol.uploadedDocs],
                });
            });
        }
        callback(err, newData);
    });
}

module.exports = {
    getData                : getStructuredDataFromGoogle
};
