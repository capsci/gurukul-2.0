"use strict";

var express = require('express');
var router = express.Router();

var Applicant = require('./../../model/Applicant');
var Application = require('./../../model/Application');

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
