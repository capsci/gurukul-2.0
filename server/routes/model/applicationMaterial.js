"use strict";

var express = require('express');
var router = express.Router();

var ApplicationMaterial = require('./../../model/ApplicationMaterial');
var MMNA = require('./../../model/MMNA');
var callback = require('./callback');

// Save ApplicationMaterial
router.post('/', function(req, res){
    console.log("Save new");
    saveNewApplication(req, res);
});

// Save ApplicationMaterial
router.post('/:id', function(req, res){
    var applicationId = req.params.id;
    try {
        if (applicationId) {
            console.log("Update Existing");
            updateExistingApplicationMaterial(req, res);
        }
        else {
            console.log("Adding new")
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

async function updateExistingApplicationMaterial() {

}

module.exports = router;
