"use strict";

var express = require('express');
var router = express.Router();

var Constants = require('../config/Constants');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Gurukul Admin' });
});

/* GET home page. */
router.get('/constants', function (req, res, next) {
    res.json(Constants);
});

module.exports = router;
