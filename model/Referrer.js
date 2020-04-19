"use strict";

const mongoose = require('mongoose');

const referrerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    phoneNumPrimary: {
        type: String,
        required: true
    },
    phoneNumSecondary: {
        type: String,
        required: false
    },
    emailPrimary: {
        type: String,
        required: true
    },
    emailSecondary: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: false
    },
    organization: {
        type: String,
        required: false
    },
    addressRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Address'
    },
    notes: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Referrer', referrerSchema, 'Referrer');
