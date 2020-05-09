"use strict";

const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
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
    // US if possible
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
    linkedin: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
    },
    facebook: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
    },
    mmnaRefs: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'MMNA'
    }],
    //valid date format over 18 years
    dob: {
        type: Date,
        required: false,
        trim: true,
    },
    // US Address
    line1: {
        type: String,
        required: true,
        trim: true,
    },
    line2: {
        type: String,
        required: false,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    zipcode: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = mongoose.model('Applicant', applicantSchema, 'Applicant');
