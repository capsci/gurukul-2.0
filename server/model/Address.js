"use strict";

const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Address', addressSchema, "Address");
