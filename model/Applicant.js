"use strict";

const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
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
    // US if possible
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
    //US Collge or Uninversity
    schoolRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'School'
    },
    //Format: [Spring|Fall] 20\d{2}
    scholarshipSemester: {
        type: String,
        required: true
    },
    referrer1Ref: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Referrer'
    },
    referrer2Ref: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Referrer'
    },
    notes: {
        type: String,
        required: false
    },
    applicationRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Application'
    }
});

module.exports = mongoose.model('Applicant', applicantSchema, 'Applicant');
