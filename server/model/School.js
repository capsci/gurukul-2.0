"use strict";

const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    addressRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Address'
    },
});

module.exports = mongoose.model('School', schoolSchema, 'School');

