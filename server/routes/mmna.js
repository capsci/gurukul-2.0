"use strict";

var express = require('express');
var router = express.Router();

var MMNA = require('./../model/MMNA');

// List All
router.get('/all', function(req, res) {
    MMNA
        .find()
        .exec( function(error, data) {
            callback.find(error, data, res);
        });
});
