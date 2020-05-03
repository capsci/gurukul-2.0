"use strict";

var express = require('express');
var router = express.Router();

var GSheetsData = require('./../../modules/application/GSheetsData');
var Applicant = require('./../../model/Applicant');
var callback = require('./callback');

// Save Applicant
router.post('/', function(req, res){
    const applicant = Applicant(req.body);
    applicant
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

// TODO: Remove
router.post('/exists', async function(req, res, next) {
    var email = req.body.email;
    if (!email) {
        res
            .status(400)
            .json({error: 'Email Not Provided'});
    }
    else {
        try {
            var id = await GSheetsData.getApplicantsFromEmail(email);
            res.json({id: id});
        }
        catch(err) {
            console.log("Caught Exception");
            console.log(err);
            res
                .status(400)
                .json({error: err});
        }
    }
});

module.exports = router;
