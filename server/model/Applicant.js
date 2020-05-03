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
    notes: {
        type: String,
        required: false,
        trim: true,
    },
    applicationRefs: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Application'
    },
    //valid date format over 18 years
    dob: {
        type: Date,
        required: false,
        trim: true,
    },
    //from predefined values
    usVisaStatus: {
        type: String,
        required: false,
        trim: true,
    },
    inUSA: {
        type: Boolean,
        required: false
    },
    entryDateInUSA: {
        type: Date,
        required: false
    },
    permanentAddress: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Address'
    },
    usAddress: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Address'
    },
});

module.exports = mongoose.model('Applicant', applicantSchema, 'Applicant');
