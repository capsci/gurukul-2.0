"use strict";

const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    // colloquial will help in finding schools
    colloquial: [{
        type: String,
        required: false,
        trim: true,
    }],
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
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    zipcode: {
        type: String, // For Canadian schools
        required: true
    },
    country: {
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = mongoose.model('School', schoolSchema, 'School');
