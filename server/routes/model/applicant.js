"use strict";

var express = require('express');
var router = express.Router();

var Applicant = require('./../../model/Applicant');
var callback = require('./callback');

// Save Applicant
router.post('/', function(req, res){
    let applicant = new Applicant(req.body.applicant);
    applicant
        .save(function(error, data) {            
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
    Applicant
        .find({
            $or: [ {emailPrimary: email}, {emailSecondary: email}]
        })
        .select('_id')
        .exec(function(error, applicant) {
            callback.find(error, applicant, res);
        });
});

// Find by ID
router.get('/:id', function(req, res) {
    Applicant
        .findById(req.params.id)
        .exec(function(error, applicant) {
            callback.find(error, applicant, res);
        });
});

module.exports = router;
