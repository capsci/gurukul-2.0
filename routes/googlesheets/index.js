"use strict";

var express = require('express');
var router = express.Router();

var GSheetsData = require('./../../modules/application/GSheetsData');

/* GET data from Google Sheets. */
router.get('/', function (req, res, next) {
    GSheetsData.getData((err,data) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({
                error: err.message
            });
        }
        else {
            res.json({
                error : err,
                rows: data
            });
        }
    });
});

// router.get('/data', function (req, res, next) {
//     GSheetsData.getData()

// });

module.exports = router;
