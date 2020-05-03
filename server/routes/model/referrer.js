"use strict";

var express = require('express');
var router = express.Router();

var Referrer = require('./../../model/Referrer');
var callback = require('./callback');

// Save Referrer
router.post('/', function(req, res){
    const referrer = Referrer(req.body);
    referrer
        .save()
        .select('_id')
        .exec(function(error, data) {
            callback.save(error, data, res);
        });
});

// Find by email
router.get('/', function(req, res) {
    const email = req.query.email;
    if (!email) {
        callback.missingParam('email', res);
        return;
    }
    Referrer
        .find({
            $or: [ {emailPrimary: email}, {emailSecondary: email}]
        })
        .select('_id')
        .exec(function(error, referrer) {
            callback.find(error, referrer, res);
        });
});

// Find by ID
router.get('/:id', function(req, res) {
    console.log("Finding By Id" +  req.params.id)
    Referrer
        .findById(req.params.id)
        .select('_id')
        .exec(function(error, referrer) {
            callback.find(error, referrer, res);
        });
});

module.exports = router;
