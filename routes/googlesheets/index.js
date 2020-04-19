"use strict";

var express = require('express');
var router = express.Router();

var GoogleSheets = require('./../../my_modules/3pinterface/GoogleSheets');
var Secret = require('./../../secret/Constants');

/* GET data from Google Sheet page. */
router.get('/', function (req, res, next) {
    GoogleSheets.read(Secret.Spreadsheet.ID, "Form Responses 1",
        (err, data) => {
            if(err) {
                console.log(err);
                res.status(500).json({ message: err.message });
            }
            res.json({
                error : err,
                rows: data
            })
        });
});

module.exports = router;
