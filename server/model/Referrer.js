"use strict";

const mongoose = require('mongoose');

const referrerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    middleName: {
        type: String,
        required: false,
        trim: true,
    },
    lastName: {
        type: String,
        required: false,
        trim: true,
    },
    phoneNumPrimary: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumSecondary: {
        type: String,
        required: false,
        trim: true,
    },
    emailPrimary: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    emailSecondary: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
    },
    position: {
        type: String,
        required: false,
        trim: true,
    },
    organization: {
        type: String,
        required: false,
        trim: true,
    },
    addressRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Address'
    },
    notes: {
        type: String,
        required: false,
        trim: true,
    },
});

module.exports = mongoose.model('Referrer', referrerSchema, 'Referrer');
