"use strict";

var express = require('express');
var router = express.Router();

router.post('/exists', function(req, res, next) {
    res.send("Blah!");
});

module.exports = router;
