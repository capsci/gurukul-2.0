"use strict";

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    //from predefined values
    visaStatus: {
        type: String,
        required: false,
        trim: true,
    },
    inUSA: {
        type: Boolean,
        required: false
    },
    dateOfArrival: {
        type: Date,
        required: false
    },
    schoolRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'School'
    },
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
    // Format: [Spring|Fall] 20\d{2}
    courseSemester: {
        type: String,
        required: true,
        trim: true,
    },
    scholarships: {
        type: String,
        required: false,
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
    writeups: [
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
            schoolName: {
                type: String,
                required: true,
                trim: true
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
    // I20, Admission Letter, Passport, Visa, Resume
    // MMNA Application, Referrer documents
    uploadedDocs: [{
        docName: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: Boolean,
            required: true,
            trim: true,
        }
    }],
});

module.exports = mongoose.model('Application', applicationSchema, 'Application');
