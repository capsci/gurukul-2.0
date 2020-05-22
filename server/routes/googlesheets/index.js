"use strict";

var express = require('express');
var router = express.Router();

var GSheetsData = require('./../../modules/application/GSheetsData');
var GSheetsRow = require('./../../model/GSheetsRow');
var callback = require('./../model/callback');

/* GET data from Google Sheets. */
router.get('/', function (req, res, next) {
    GSheetsRow
        .find()
        .exec(function(error, data) {
            callback.find(error, data, res);
        });
});

/* GET data from Google Sheets and updates local database. */
router.get('/update', function (req, res, next) {
    GSheetsData.getData((err,data) => {
        if(err) {
            res.status(500).json({
                error: err,
            });
        }
        else {
            var options = { upsert: true,};
            data.forEach((row) => {
                var query = {applicationTime: row.applicationTime};
                var gSheetsRow = GSheetsRow(row);
                var a = GSheetsRow.updateOne(
                    query,
                    {$setOnInsert: gSheetsRow},
                    options,
                    function(error, doc){
                        if(error) {
                            console.log(error);
                            res.status(500).json({
                                error: err,
                            });
                        }
                });
            });
            // TODO: Send number of updated records plus number of new records
            res.status(201).json({updated: data.length});
        }
    });
});

module.exports = router;
