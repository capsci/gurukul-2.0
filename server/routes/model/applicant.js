"use strict";

var express = require('express');
var router = express.Router();

var GSheetsData = require('./../../modules/application/GSheetsData');

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
