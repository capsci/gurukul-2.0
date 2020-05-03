"use strict";

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: false,
        trim: true,
    },
    // In months
    courseDuration: {
        type: Number,
        required: false
    },
    // aprox dollar
    courseFee: {
        type: Number,
        required: false
    },
    //US Collge or Uninversity
    schoolRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'School',
        trim: true,
    },
    //Format: [Spring|Fall] 20\d{2}
    courseSemester: {
        type: String,
        required: true,
        trim: true,
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
    scholarships: {
        type: String,
        required: false,
        trim: true,
    },
    notes: {
        type: String,
        required: false,
        trim: true,
    },
    writeup: [
        {
            question: {
                type: String,
                required: true,
                trim: true,
            },
            answer: {
                type: String,
                required: true,
                trim: true,
            },
        }
    ],
    prevEducation: [
        {
            schoolRef: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'School'
            },
            gpa: {
                type: String,
                required: false,
                trim: true,
            },
            degree: {
                type: String,
                required: true,
                trim: true,
            },
        }
    ],
    docI20: {
        type: Boolean,
        required: false
    },
    docAdmissionLetter: {
        type: Boolean,
        required: false
    },
    docPassport: {
        type: Boolean,
        required: false
    },
    docVisa: {
        type: Boolean,
        required: false
    },
    docResume: {
        type: Boolean,
        required: false
    },
    docMMNAApplication: {
        type: Boolean,
        required: false
    },
    docReference1: {
        type: Boolean,
        required: false
    },
    docReference2: {
        type: Boolean,
        required: false
    },
});

module.exports = mongoose.model('Application', applicationSchema, 'Application');
