"use strict";

var express = require('express');
var router = express.Router();

var GoogleSheets = require('./../gurukul/3pinterface/GoogleSheets');
var Secret = require('./../secret/Constants');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Gurukul Admin' });
});

/* GET data from Google Sheet page. */
router.get('/populateFromGoogleSheets', function (req, res, next) {
    GoogleSheets.read(Secret.Spreadsheet.ID, "Responses",
        (err, data) => {
            console.log(data);
            if (err)
                res.render('error', { error: err });
            else
                res.render('populateFromGoogleSheets', { rows: data });
        });
});

module.exports = router;
