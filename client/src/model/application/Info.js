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
    setFromSavedApplication(info) {
        this.university.setFromSavedApplication(info.university);
        info.prevEducation.forEach(school => {
            this.prevEducation.push(
                new Education(school.name, school.degree, school.gpa)
            );
        });
        info.writeups.forEach(writeup => {
            this.writeups.push(
                new WriteUp(writeup.question, writeup.answer)
            );
        });
        info.docs.forEach(doc => {
            this.docs.push(
                new Doc(doc.name, doc.uploaded)
            );
        });
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
    addPrevEducation(name, degree, grade) {
        this.prevEducation.push(new Education(name, degree, grade));
    }
    addWriteup(question, answer) {
        this.writeups.push(new WriteUp(question, answer));
    }
    addDocument(docName, uploaded) {
        this.docs.push(new Document(docName, uploaded));
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
    setFromSavedApplication(university) {
        this.name = university.school;
        this.address = university.address;
        this.courseName = university.courseName;
        this.courseDuration = university.courseDuration;
        this.semester = university.semester;
        this.fees = university.fees;
        this.otherScholarships = university.otherScholarships;
    }
    setFromGoogleRow(googleRow) {
        // TODO: extract university name
        this.fees = googleRow.courseTuitionFee;
        this.otherScholarships = googleRow.otherScholarships;
        this.courseName = googleRow.courseName;
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