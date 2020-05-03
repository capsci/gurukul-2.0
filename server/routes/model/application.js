"use strict";

var express = require('express');
var router = express.Router();

var Applicant = require('./../../model/Applicant');
var Application = require('./../../model/Application');
var callback = require('./callback');

// Save Application
router.post('/', function(req, res){
    const application = Application(req.body);
    application
        .save()
        .select('_id')
        .exec(function(error, data) {
            callback.save(error, data, res);
        });
});

// TODO: Find by applicant
router.get('/', function(req, res) {
    res.status(501).send({}); // Not Implemented
});

// Find by ID
router.get('/:id', function(req, res) {
    Application
        .findById(req.params.id)
        .exec(function(error, application) {
            callback.find(error, application, res);
        });
});

// TODO: Remove if not required
router.post('/prev', async function(req, res, next) {
    var applicant_id = req.body.applicant_id;
    if (!applicant_id) {
        res
            .status(400)
            .json({error: 'Applicant ID Not Provided'});
    }
    else {
        try {
            var applicant = await Applicant.findById(applicant_id);
            var applications = await Application.find().where('_id').in(applicant.applicationRefs);
            res.json({previous_applications: applications});
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
