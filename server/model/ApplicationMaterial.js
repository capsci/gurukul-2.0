"use strict";

const mongoose = require('mongoose');

const applicationMaterialSchema = new mongoose.Schema({
    applicant: {
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
        emailPrimary: {
            type: String,
            required: false,
            trim: true,
        },
        emailSecondary: {
            type: String,
            required: false,
            trim: true,
        },
        phonePrimary: {
            type: String,
            required: false,
            trim: true,
        },
        phoneSecondary: {
            type: String,
            required: false,
            trim: true,
        },
        linkedin: {
            type: String,
            required: false,
            trim: true,
        },
        facebook: {
            type: String,
            required: false,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
            required: false,
            trim: true,
        },
        parentName: {
            type: String,
            required: false,
            trim: true,
        },
        inUSA: {
            type: Boolean,
            required: false,
            trim: true,
        },
        usVisaStatus: {
            type: String,
            required: false,
            trim: true,
        },
        usEntryDate: {
            type: Date,
            required: false,
            trim: true,
        },
        parentAddress: {
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
        },
        usAddress: {
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
        },
    },
    courseDetails: {
        school: {
            type: String,
            required: false,
            trim: true,
        },
        name: {
            type: String,
            required: false,
            trim: true,
        },
        semester: {
            type: String,
            required: false,
            trim: true,
        },
        duration: {
            type: String,
            required: false,
            trim: true,
        },
        fees: {
            type: Number,
            required: false,
            trim: true,
        },
        otherScholarships: {
            type: String,
            required: false,
            trim: true,
        },

    }
});

module.exports = mongoose.model('ApplicationMaterial', applicationMaterialSchema, 'ApplicationMaterial');
