"use strict";

const mongoose = require('mongoose');

const mmnaSchema = new mongoose.Schema({
    applicationRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Application',
    },
    // Format Spring/Fall 20xx
    semester: [{
        type: String,
        required: false,
        trim: true,
    }],
    referrer1Status: {
        type: String,
        required: false,
        trim: true,
    },
    referrer1Status: {
        type: String,
        required: false,
        trim: true,
    },
    applicationMaterialStatus: {
        type: String,
        required: false,
        trim: true,
    },
    applicationStatus: {
        type: String,
        required: false,
        trim: true,
    },
    amountGranted: {
        type: Number,
        required: false,
        trim: true,
    },
    amountPending: {
        type: Number,
        required: false,
        trim: true,
    },
});

module.exports = mongoose.model('MMNA', mmnaSchema, 'MMNA');
