"use strict";

const mongoose = require('mongoose');

const mmnaSchema = new mongoose.Schema({
    status: {
        // Applicable values: Not Provided, To Be Reviewed, Accepted, Rejected
        docs: {
            i20: {
                type: String,
                trim: true,
                default: 'Not Provided',
            },
            visa: {
                type: String,
                trim: true,
                default: 'Not Provided',
            },
            admissionLetter: {
                type: String,
                trim: true,
                default: 'Not Provided',
            },
            referrers: [{
                type: String,
                trim: true,
                default: 'Not Provided',
            }],
            passport: {
                type: String,
                trim: true,
                default: 'Not Provided',
            },
            mmnaApplication: {
                type: String,
                trim: true,
                default: 'Not Provided',
            },
            passport: {
                type: String,
                trim: true,
                default: 'Not Provided',
            },
        },
        // Submitted, Under Review, Accepted, Rejected
        application: {
            type: String,
            required: true,
            default: 'Under Review',
        },
    },
    amount: {
        granted: {
            type: Number,
            required: false,
        },
        repayed: {
            type: Number,
            required: false,
        },
    },
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true,
    }
});

mmnaSchema.methods.setStatus = function(application) {
    var docs = application.uploadedDocs;
    if (docs.docI20) {
        this.status.docs.i20 = "To Be Reviewed"
    }
}

module.exports = mongoose.model('MMNA', mmnaSchema, 'MMNA');
