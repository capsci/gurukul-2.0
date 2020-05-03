"use strict";

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: false
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
        ref: 'School'
    },
    //Format: [Spring|Fall] 20\d{2}
    courseSemester: {
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
