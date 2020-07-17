"use strict";

const mongoose = require('mongoose');

const mmnaSchema = new mongoose.Schema({
    applicationRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Application',
    },
    // Applicable values: Not Provided, Pending, Accepted, Rejected
    docs: {
        i20: {
            type: String,
            trim: true,
        },
        visa: {
            type: String,
            trim: true,
        },
        admissionLetter: {
            type: String,
            trim: true,
        },
        referrers: [{
            type: String,
            trim: true,
        }],
        passport: {
            type: String,
            trim: true,
        },
        mmnaApplication: {
            type: String,
            trim: true,
        },
        passport: {
            type: String,
            trim: true,
        },
    },
    amount: {
        granted: {
            type: Number,
            required: false,
        },
        repayed: {
            type: Number,
            required: false,
        },
    },
    // Submitted, Under Review, Accepted, Rejected
    application: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('MMNA', mmnaSchema, 'MMNA');
