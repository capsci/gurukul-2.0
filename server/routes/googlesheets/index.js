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

/* Add application to local Google Sheets data. */
router.post('/application/:id', async function (req, res, next) {
    var query = {_id: req.params.id};
    var update = {
            $set: {applicationId: req.body.id}
        };
    var options = { upsert: true};
    await GSheetsRow.find(query).exec(function(err,data) {
        console.log("Before");
        console.log(data);
    })
    await GSheetsRow
        .updateOne(query, update, options)
        .exec(function(error, data) {
            console.log("During");
            console.log(data);
            callback.find(error, data, res);
        });
    await GSheetsRow.find(query).exec(function(err,data) {
        console.log("After");
        console.log(data);
    })
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
