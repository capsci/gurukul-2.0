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
    phonePrimary: {
        type: String,
        required: true,
        trim: true,
    },
    phoneSecondary: {
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
    line1: {
        type: String,
        required: false,
        trim: true,
    },
    line2: {
        type: String,
        required: false,
        trim: true,
    },
    city: {
        type: String,
        required: false,
        trim: true,
    },
    state: {
        type: String,
        required: false,
        trim: true,
    },
    zipcode: {
        type: Number,
        required: false
    },
    country: {
        type: String,
        required: false,
        trim: true,
    }
});

module.exports = mongoose.model('Referrer', referrerSchema, 'Referrer');
