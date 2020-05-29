"use strict";

var express = require('express');
var router = express.Router();

var Referrer = require('./../../model/Referrer');
var callback = require('./callback');

// Find All
router.get('/all', function(req, res) {
    Referrer
        .find()
        .exec(function(error, referrer) {
            callback.save(error, referrer, res);
        });
})

module.exports = router;
