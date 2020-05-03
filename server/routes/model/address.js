"use strict";

var express = require('express');
var router = express.Router();

var Address = require('./../../model/Address');
var callback = require('./callback');

// Save Address
router.post('/', function(req, res){
    const address = Address(req.body.address);
    address
        .save(function(error, data) {
            callback.save(error, data, res);
        });
});

// Find by ID
router.get('/:id', function(req, res) {
    console.log("Finding" +  req.params.id)
    Address
        .findById(req.params.id)
        .exec(function(error, address) {
            callback.save(error, address, res);
        });
})

module.exports = router;
