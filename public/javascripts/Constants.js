/*jslint es6 */
/*jslint node: true */
"use strict";

// Data sheet name
const SHEET = {
    "name": "Responses",
    "columns": ["timestamp", "name", "email", "address", "phoneNum"]
};

var secret = require('./../../secret/Constants');
const SS_ID = secret.SS_ID;

module.exports = {
    SHEET,
    SS_ID
};
