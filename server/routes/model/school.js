"use strict";

var express = require('express');
var router = express.Router();

var School = require('./../../model/School');
var callback = require('./callback');

// Save School
router.post('/', function(req, res){
    const school = School(req.body);
    school
        .save()
        .select('_id')
        .exec(function(error, data) {
            callback.save(error, data, res);
        });
});

// Find by ID
router.get('/:id', function(req, res) {
    console.log("Finding" +  req.params.id)
    School
        .findById(req.params.id)
        .exec(function(error, school) {
            callback.save(error, school, res);
        });
})

module.exports = router;
