"use strict";

const mongoose = require('mongoose');

const mmnaSchema = new mongoose.Schema({
    applicantRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // TODO: After finalizing applicant schema
        ref: 'ApplicationMaterial',
    },
    applicationMaterialRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ApplicationMaterial',
    },
    // Format Spring/Fall 20xx
    semester: {
        type: String,
        required: false,
        trim: true,
    },
    applicationStatus: {
        type: String,
        required: false,
        trim: true,
    },
    status: {
        referrer1: {
            type: String,
            required: false,
            trim: true,
        },
        referrer2: {
            type: String,
            required: false,
            trim: true,
        },
        applicationMaterial: {
            type: String,
            required: false,
            trim: true,
        },
    },
    amount: {
        granted: {
            type: Number,
            required: false,
            trim: true,
        },
        pending: {
            type: Number,
            required: false,
            trim: true,
        },
    },
});

module.exports = mongoose.model('MMNA', mmnaSchema, 'MMNA');
