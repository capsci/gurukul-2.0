"use strict";

const DOC_TYPE = {
    passport       : 'Passport',
    visa           : 'Visa',
    i20            : 'I-20',
    admissionLetter: 'Admission Letter',
    mmnaApplication: 'MMNA Application',
    resume         : 'Resume',
    reference1     : 'Referrence 1',
    reference2     : 'Referrence 2',
};

class Info {
    constructor() {
        this.university = new University();
        this.prevEducation = [];
        this.writeups = [];
        this.docs = [];
    }
    setFromSavedApplication(data) {
        this.university.setFromSavedApplication(data);
        data.previousSchools.forEach(school => {
            this.prevEducation.push(
                new Education(school.name, school.degree, school.gpa)
            );
        });
        data.writeups.forEach(writeup => {
            this.writeups.push(
                new WriteUp(writeup.question, writeup.answer)
            );
        });
        this.docs.push(
            new Doc(DOC_TYPE.passport, data.uploadedDocs.docPassport)
        );
        this.docs.push(
            new Doc(DOC_TYPE.visa, data.uploadedDocs.docVisa)
        );
        this.docs.push(
            new Doc(DOC_TYPE.i20, data.uploadedDocs.docI20)
        );
        this.docs.push(
            new Doc(DOC_TYPE.admissionLetter, data.uploadedDocs.docAdmissionLetter)
        );
        this.docs.push(
            new Doc(DOC_TYPE.mmnaApplication, data.uploadedDocs.docMMNAApplication)
        );
        this.docs.push(
            new Doc(DOC_TYPE.resume, data.uploadedDocs.docResume)
        );
        this.docs.push(
            new Doc(DOC_TYPE.reference1, data.uploadedDocs.docReferrence1)
        );
        this.docs.push(
            new Doc(DOC_TYPE.reference2, data.uploadedDocs.docReferrence2)
        );
    }
    setFromGoogleRow(googleRow) {
        this.university.setFromGoogleRow(googleRow);
        googleRow.uploadedDocs.includes('Passport Copy')
            ? this.docs.push( new Doc(DOC_TYPE.passport, true) )
            : this.docs.push( new Doc(DOC_TYPE.passport, false) );
        googleRow.uploadedDocs.includes('Visa Copy')
            ? this.docs.push( new Doc(DOC_TYPE.visa, true) )
            : this.docs.push( new Doc(DOC_TYPE.visa, false) );
        googleRow.uploadedDocs.includes('I-20')
            ? this.docs.push( new Doc(DOC_TYPE.i20, true) )
            : this.docs.push( new Doc(DOC_TYPE.i20, false) );
        googleRow.uploadedDocs.includes('US University - Admission Letter')
            ? this.docs.push( new Doc(DOC_TYPE.admissionLetter, true) )
            : this.docs.push( new Doc(DOC_TYPE.admissionLetter, false) );
        googleRow.uploadedDocs.includes('MMNA Application Form')
            ? this.docs.push( new Doc(DOC_TYPE.mmnaApplication, true) )
            : this.docs.push( new Doc(DOC_TYPE.mmnaApplication, false) );
    }
}

/*
* This is client side model for University
*/

class University {
    constructor() {
        this.name = null;
        this.address = {
            line1  : null,
            line2  : null,
            city   : null,
            zipcode: null,
            state  : null,
            country: null,
        };
        this.courseName = null;
        this.courseDuration = null,
        this.semester = null;
        this.fees = null;
        this.otherScholarships = null;
    }
    setFromSavedApplication(data) {
        this.name = data.courseDetails.school;
        this.address = {
            line1: data.courseDetails.address.line1,
            line2: data.courseDetails.address.line2,
            city: data.courseDetails.address.city,
            zipcode: data.courseDetails.address.zipcode,
            state: data.courseDetails.address.state,
            country: data.courseDetails.address.country,
        };
        this.courseName = data.courseDetails.name;
        this.courseDuration = data.courseDetails.duration;
        this.semester = data.courseDetails.semester;
        this.fees = data.courseDetails.fees;
        this.otherScholarships = data.courseDetails.otherScholarships;
    }
    setFromGoogleRow(googleRow) {
        // TODO: extract university name
        this.fees = googleRow.courseTuitionFee;
        this.otherScholarships = googleRow.otherScholarships;
        this.universityDetails.courseName = googleRow.courseName;
    }
}

/*
* This is client side model for Previous Education
*/

class Education {
    constructor(name, degree, grade) {
        this.name = name;
        this.degree = degree;
        this.grade = grade;
    }
}

/*
* This is client side model for Writeups
*/

class WriteUp {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}

/*
* This is client side model for Doc
*/

class Doc {
    constructor(docName, uploaded) {
        this.name = docName;
        this.uploaded = uploaded || false;
    }
}

export default Info;