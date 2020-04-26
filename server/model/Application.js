"use strict";

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    //valid date format over 18 years
    dob: {
        type: Date,
        required: false
    },
    //from predefined values
    usVisaStatus: {
        type: String,
        required: false
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
    // In months
    scholarshipCourseDuration: {
        type: Number,
        required: false
    },
    // aprox dollar
    tutionFee: {
        type: Number,
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
    scholarships: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    prevEducation: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('Application', applicationSchema, 'Application');

// class Application {
//     constructor() {
//         self.prevEducation = [
//             {schoolRef: "schoolRef", major: "Degree/Major/Certificate", grade: "GPA/Grade"},
//             {schoolRef: "schoolRef", major: "Degree/Major/Certificate", grade: "GPA/Grade"}
//         ];
//         // 4 questions
//         self.wrtiteups = [ {question : "Question1", answer : "LongAnswer"},
//                         {question : "Question2", answer : "ReallyLongAnswer"}];
//                         self.scholarshipMajor = "MS CS/MBA";
//         filesUploaded = {"i20" : false,
//                           "resume" : false,
//                           "passport" : false,
//                           "visa" : false,
//                           "admissionLetter" : false,
//                           "referenceLetter1" : false,
//                           "referenceLetter2" : false,
//                           "mmnaApplicationForm" : false
//             };
//     }
// }
