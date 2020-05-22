"use strict";

const mongoose = require('mongoose');

const gSheetsRowSchema = new mongoose.Schema({
    applicationTime: {
        type: Date,
    },
    fullName: {
        type: String,
        trim: true,
    },
    usAddress: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    phonePrimary: {
        type: String,
        trim: true,
    },
    parentAddress: {
        type: String,
        trim: true,
    },
    referrer1: {
        type: String,
        trim: true,
    },
    referrer2: {
        type: String,
        trim: true,
    },
    facebook: {
        type: String,
        trim: true,
    },
    linkedin: {
        type: String,
        trim: true,
    },
    courseName: {
        type: String,
        trim: true,
    },
    schoolNameAndAddress: {
        type: String,
        trim: true,
    },
    courseTuitionFee: {
        type: String,
        trim: true,
    },
    otherScholarships: {
        type: String,
        trim: true,
    },
    docsEmailed: {
        type: String,
        trim: true,
    },
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }
});

module.exports = mongoose.model('GSheetsRow', gSheetsRowSchema, 'GSheetsRow');
