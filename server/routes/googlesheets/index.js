"use strict";

var express = require('express');
var router = express.Router();

var GSheetsData = require('./../../modules/application/GSheetsData');

/* GET data from Google Sheets. */
router.get('/', function (req, res, next) {
    GSheetsData.getData((err,data) => {
        if(err) {
            res.status(500).json({
                error: err
            });
        }
        else {
            res.json({
                rows: data
            });
        }
    });
});

module.exports = router;
