"use strict";

/*
* This serves as coupling between server side and client side data structure.
* Please note any changes in server data schema needs to reflected
*    for both save and retrieve operations.
*/

import { sanitize } from './../mixins/formHelper';
import api from './../services/api';

class Application {

    constructor() {
        this.applicant = {
            name: {
                salutation: null,
                first: null,
                middle: null,
                last: null,
            },
            email: {
                primary: null,
                secondary: null,
            },
            phone: {
                primary: null,
                secondary: null,
            },
            socialMedia: {
                facebook: null,
                linkedin: null,
            },
            dob: null,
            inUSA: null,
            USAEntryDate: null,
            USAVisaStatus: null,
            address: {
                line1: null,
                line2: null,
                city: null,
                zipcode: null,
                state: null,
                country: null,
            },
            parent: {
                name: null,
                address: {
                    line1: null,
                    line2: null,
                    city: null,
                    zipcode: null,
                    state: null,
                    country: null,
                },
            }
        };
        this.universityDetails = {
            name: null,
            address: {
                line1: null,
                line2: null,
                city: null,
                zipcode: null,
                state: null,
                country: null,
            },
            courseName: null,
            courseDuration: null,
            semester: null,
            fees: null,
            otherScholarships: null,
        };
        this.referrers = [{
            name: {
                salutation: null,
                first: null,
                middle: null,
                last: null,
            },
            email: {
                primary: null,
                secondary: null,
            },
            phone: {
                primary: null,
                secondary: null,
            },
            position: null,
            organization: null,
            address: {
                line1: null,
                line2: null,
                city: null,
                zipcode: null,
                state: null,
                country: null,
            },
        },
        {
            name: {
                salutation: null,
                first: null,
                middle: null,
                last: null,
            },
            email: {
                primary: null,
                secondary: null,
            },
            phone: {
                primary: null,
                secondary: null,
            },
            position: null,
            organization: null,
            address: {
                line1: null,
                line2: null,
                city: null,
                zipcode: null,
                state: null,
                country: null,
            },
        }];
        this.previousSchools = [{
            name: null,
            degree: null,
            grade: null,
        },
        {
            name: null,
            degree: null,
            grade: null,
        },
        {
            name: null,
            degree: null,
            grade: null,
        }];
        this.writeups = [{
            question: null,
            answer: null,
        },
        {
            question: null,
            answer: null,
        },
        {
            question: null,
            answer: null,
        },
        {
            question: null,
            answer: null,
        }];
        this.additionalDocs = {
            passport: null,
            visa: null,
            i20: null,
            admission: null,
            mmnaApplication: null,
            resume: null,
            reference1: null,
            reference2: null,
        };
        this.googleMetaData = {
            universityDetails : null,
            referrers: {
                referrer1: null,
                referrer2: null,
            },
        };
        this.applicationId = null;
        this.googleRowId = null;

        // Sealing objecs will prevent new properties to be added
        // You can still update existing properties
        Object.seal(this.applicant);
        Object.seal(this.universityDetails);
        Object.seal(this.referrers);
        Object.seal(this.previousSchools);
        Object.seal(this.writeups);
        Object.seal(this.additionalDocs);
        Object.seal(this.googleMetaData);
    }

    /*
    * Set data from googleRow
    */
    async initFromGoogleRow(googleRow) {
        this.googleRowId = googleRow._id;
        this.applicationId = googleRow.applicationId;

        if (this.applicationId) {
            await this.initFromApplicationId(this.applicationId);
        }

        var extractedName = sanitize.extractNameFields(googleRow.fullName);
        this.applicant.name.first = setIfNotEmpty(
            this.applicant.name.first, extractedName[0]);
        this.applicant.name.middle = setIfNotEmpty(
            this.applicant.name.middle, extractedName[1]);
        this.applicant.name.last = setIfNotEmpty(
            this.applicant.name.last, extractedName[2]);

        this.applicant.phone.primary = setIfNotEmpty(
            this.applicant.phone.primary, googleRow.phonePrimary);

        var extractedEmail = sanitize
            .splitOnWhitespaceAndDelimeters(googleRow.email);
        this.applicant.email.primary = setIfNotEmpty(
            this.applicant.email.primary, extractedEmail[0]);
        this.applicant.email.secondary = setIfNotEmpty(
            this.applicant.email.secondary, extractedEmail[1]);

        this.applicant.socialMedia.facebook = setIfNotEmpty(
            this.applicant.socialMedia.facebook, googleRow.facebook);
        this.applicant.socialMedia.linkedin = setIfNotEmpty(
            this.applicant.socialMedia.linkedin, googleRow.linkedin);

        // TODO: extract university name
        this.universityDetails.fees = setIfNotEmpty(
            this.universityDetails.fees, googleRow.courseTuitionFee);
        this.universityDetails.otherScholarships = setIfNotEmpty(
            this.universityDetails.otherScholarships,
            googleRow.otherScholarships);
        this.universityDetails.courseName = setIfNotEmpty(
            this.universityDetails.courseName, googleRow.courseName);

        this.googleMetaData.universityDetails = googleRow.courseName + "\n"
            + googleRow.schoolNameAndAddress + "\n"
            + "Fees: " + googleRow.courseTuitionFee + "\n"
            + "OtherScholarships: " + googleRow.otherScholarships;

        // TODO: Extract and set referrer data

        this.googleMetaData.referrers.referrer1 = googleRow.referrer1;
        this.googleMetaData.referrers.referrer2 = googleRow.referrer2;

        // TODO: Check this updates latest info correctly
        this.additionalDocs.passport = googleRow.uploadedDocs.includes('Passport Copy');
        this.additionalDocs.visa = googleRow.uploadedDocs.includes('Visa Copy');
        this.additionalDocs.i20 = googleRow.uploadedDocs.includes('US University - Admission Letter');
        this.additionalDocs.mmnaApplication = googleRow.uploadedDocs.includes('MMNA Application Form');

    }

    /*
    * Set data from saved application
    */
    async initFromApplicationId(applicationId) {
        await api.applicationMaterial
            .findById(applicationId)
            .then(response => {
                this.setFromSavedData(response.data);
            }).catch(error => {
                console.log("Error Fetching application");
                console.error(error.response);
            });
    }

    setFromSavedData(data) {
        this.applicant = {
            name: {
                salutation: null,
                first: data.applicant.firstName,
                middle: data.applicant.middleName,
                last: data.applicant.lastName,
            },
            email: {
                primary: data.applicant.emailPrimary,
                secondary: data.applicant.emailSecondary,
            },
            phone: {
                primary: data.applicant.phonePrimary,
                secondary: data.applicant.phoneSecondary,
            },
            socialMedia: {
                facebook: data.applicant.facebook,
                linkedin: data.applicant.linkedin,
            },
            dob: data.applicant.dateOfBirth,
            inUSA: data.applicant.inUSA,
            USAEntryDate: data.applicant.usEntryDate,
            USAVisaStatus: data.applicant.usVisaStatus,
            address: {
                line1: data.applicant.usAddress.line1,
                line2: data.applicant.usAddress.line2,
                city: data.applicant.usAddress.city,
                zipcode: data.applicant.usAddress.zipcode,
                state: data.applicant.usAddress.state,
                country: data.applicant.usAddress.country,
            },
            parent: {
                name: data.applicant.parentName,
                address: {
                    line1: data.applicant.parentAddress.line1,
                    line2: data.applicant.parentAddress.line2,
                    city: data.applicant.parentAddress.city,
                    zipcode: data.applicant.parentAddress.zipcode,
                    state: data.applicant.parentAddress.state,
                    country: data.applicant.parentAddress.country,
                },
            }
        };
        this.universityDetails = {
            name: data.courseDetails.school,
            address: {
                line1: data.courseDetails.address.line1,
                line2: data.courseDetails.address.line2,
                city: data.courseDetails.address.city,
                zipcode: data.courseDetails.address.zipcode,
                state: data.courseDetails.address.state,
                country: data.courseDetails.address.country,
            },
            courseName: data.courseDetails.name,
            courseDuration: data.courseDetails.duration,
            semester: data.courseDetails.semester,
            fees: data.courseDetails.fees,
            otherScholarships: data.courseDetails.otherScholarships,
        };
        this.referrers = [{
            name: {
                salutation: data.referrers.reference1.salutation,
                first: data.referrers.reference1.firstName,
                middle: data.referrers.reference1.middleName,
                last: data.referrers.reference1.lastName,
            },
            email: {
                primary: data.referrers.reference1.emailPrimary,
                secondary: data.referrers.reference1.emailSecondary,
            },
            phone: {
                primary: data.referrers.reference1.phonePrimary,
                secondary: data.referrers.reference1.phoneSecondary,
            },
            position: data.referrers.reference1.position,
            organization: data.referrers.reference1.organization,
            address: {
                line1: data.referrers.reference1.address.line1,
                line2: data.referrers.reference1.address.line2,
                city: data.referrers.reference1.address.city,
                zipcode: data.referrers.reference1.address.zipcode,
                state: data.referrers.reference1.address.state,
                country: data.referrers.reference1.address.country,
            },
        },
        {
            name: {
                salutation: data.referrers.reference2.salutation,
                first: data.referrers.reference2.firstName,
                middle: data.referrers.reference2.middleName,
                last: data.referrers.reference2.lastName,
            },
            email: {
                primary: data.referrers.reference2.emailPrimary,
                secondary: data.referrers.reference2.emailSecondary,
            },
            phone: {
                primary: data.referrers.reference2.phonePrimary,
                secondary: data.referrers.reference2.phoneSecondary,
            },
            position: data.referrers.reference2.position,
            organization: data.referrers.reference2.organization,
            address: {
                line1: data.referrers.reference2.address.line1,
                line2: data.referrers.reference2.address.line2,
                city: data.referrers.reference2.address.city,
                zipcode: data.referrers.reference2.address.zipcode,
                state: data.referrers.reference2.address.state,
                country: data.referrers.reference2.address.country,
            },
        }];
        this.previousSchools = [{
            name: data.previousSchools[0].name,
            degree: data.previousSchools[0].degree,
            grade: data.previousSchools[0].gpa,
        },
        {
            name: data.previousSchools[1].name,
            degree: data.previousSchools[1].degree,
            grade: data.previousSchools[1].gpa,
        },
        {
            name: data.previousSchools[2].name,
            degree: data.previousSchools[2].degree,
            grade: data.previousSchools[2].gpa,
        }];
        this.writeups = [{
            question: data.writeups[0].question,
            answer: data.writeups[0].answer,
        },
        {
            question: data.writeups[1].question,
            answer: data.writeups[1].answer,
        },
        {
            question: data.writeups[2].question,
            answer: data.writeups[2].answer,
        },
        {
            question: data.writeups[3].question,
            answer: data.writeups[3].answer,
        }];
        this.additionalDocs = {
            passport: data.uploadedDocs.docPassport,
            visa: data.uploadedDocs.docVisa,
            i20: data.uploadedDocs.docI20,
            admission: data.uploadedDocs.docAdmissionLetter,
            mmnaApplication: data.uploadedDocs.docMMNAApplication,
            resume: data.uploadedDocs.docResume,
            reference1: data.uploadedDocs.docReference1,
            reference2: data.uploadedDocs.docReference2,
        };
    }
};

// Also checks if undefined
function setIfNotEmpty(oldvalue, newvalue) {
    return oldvalue === ""
        ? ""
        : newvalue;
};

return Application;