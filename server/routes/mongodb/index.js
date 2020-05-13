"use strict";

var express = require('express');
var router = express.Router();

var Applicant = require('./../../model/Applicant');
var Application = require('./../../model/Application');
var Referrer = require('./../../model/Referrer');
var School = require('./../../model/School');

router.get('/applicant', async function (req, res, next) {
    try {
        const applicants = await Applicant.find();
        res.json(applicants);
        console.log(applicants);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/application', async function (req, res, next) {
    try {
        const applications = await Application.find();
        res.json(applications);
        console.log(applications);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/referrer', async function (req, res, next) {
    try {
        const referrers = await Referrer.find();
        res.json(referrers);
        console.log(referrers);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/school', async function (req, res, next) {
    try {
        const schools = await School.find();
        res.json(schools);
        console.log(schools);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
