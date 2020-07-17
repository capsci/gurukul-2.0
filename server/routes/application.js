"use strict";

var express = require('express');
var router = express.Router();

var Application = require('./../model/Application');
// var MMNA = require('./../model/MMNA');
var callback = require('./callback');

// Save Application
router.post('/', function(req, res){
    saveNewApplication(req, res);
});

// Save Application
router.post('/:id', function(req, res){
    var applicationId = req.params.id;
    try {
        if (applicationId) {
            console.log("Update Existing Application");
            updateExistingApplication(req, res);
        }
        else {
            console.log("Adding New Application")
            saveNewApplication(req, res);
        }
    }
    catch(err) {
        callback.error(err, res);
    }
});

// Find by ID
router.get('/:id', function(req, res) {
    Application
        .findById(req.params.id)
        .exec( function(error, application) {
            callback.find(error, application, res);
        });
});

async function saveNewApplication(request, response) {
    const application = Application(request.body);
    var savedApplication = await application.save();
    // const mmna = MMNA({
    //     applicationRef: savedApplication._id,
    // })
//    await mmna.save();
    callback.data(savedApplication._id, response);
}

async function updateExistingApplication(request, response) {
    var query = {_id: request.params.id};
    const application = Application(request.body);
    Application
        .findByIdAndUpdate(request.params.id,
            application,
            {new: false})
        .exec(function(error, data) {
            callback.find(error, data, response);
        });
}

module.exports = router;
