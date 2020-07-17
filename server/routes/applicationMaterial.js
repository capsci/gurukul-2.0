"use strict";

var express = require('express');
var router = express.Router();

var ApplicationMaterial = require('./../model/ApplicationMaterial');
var MMNA = require('./../model/MMNA');
var callback = require('./callback');

// Save ApplicationMaterial
router.post('/', function(req, res){
    saveNewApplication(req, res);
});

// Save ApplicationMaterial
router.post('/:id', function(req, res){
    var applicationId = req.params.id;
    try {
        if (applicationId) {
            console.log("Update Existing Application");
            updateExistingApplicationMaterial(req, res);
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
    ApplicationMaterial
        .findById(req.params.id)
        .exec( function(error, applicationMaterial) {
            callback.find(error, applicationMaterial, res);
        });
});

async function saveNewApplication(request, response) {
    const applicationMaterial = ApplicationMaterial(request.body);
    var savedApplicationMaterial = await applicationMaterial.save();
    const mmna = MMNA({
        applicationMaterialRef: savedApplicationMaterial._id,
    })
    await mmna.save();
    callback.data(savedApplicationMaterial._id, response);
}

async function updateExistingApplicationMaterial(request, response) {
    var query = {_id: request.params.id};
    const applicationMaterial = ApplicationMaterial(request.body);
    ApplicationMaterial
        .findByIdAndUpdate(request.params.id,
            applicationMaterial,
            {new: false})
        .exec(function(error, data) {
            callback.find(error, data, response);
        });
}

module.exports = router;
