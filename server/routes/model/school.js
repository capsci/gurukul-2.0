"use strict";

var express = require('express');
var router = express.Router();

var School = require('./../../model/School');
var callback = require('./callback');

// Find All
router.get('/all', function(req, res) {
    School
        .find()
        .exec(function(error, school) {
            callback.save(error, school, res);
        });
})

module.exports = router;
