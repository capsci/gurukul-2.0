"use strict";

import { sanitize } from './../../mixins/formHelper';

/*
* This is client side model for Applicant
*/

class Applicant {

    constructor() {
        this.name = {
            salutation: null,
            first     : null,
            middle    : null,
            last      : null,
        };
        this.email = {
            primary  : null,
            secondary: null,
        };
        this.phone = {
            primary  : null,
            secondary: null,
        };
        this.socialMedia = {
            facebook: null,
            linkedin: null,
        };
        this.dob = null;
        this.inUSA = null;
        this.USAEntryDate = null;
        this.USAVisaStatus = null;
        this.address = {
            line1  : null,
            line2  : null,
            city   : null,
            zipcode: null,
            state  : null,
            country: null,
        };
        this.parent = {
            name: null,
            address: {
                line1  : null,
                line2  : null,
                city   : null,
                zipcode: null,
                state  : null,
                country: null,
            },
        }
    }

    setFromSavedApplication(data) {
        this.name = {
            salutation: null,
            first     : data.applicant.firstName,
            middle    : data.applicant.middleName,
            last      : data.applicant.lastName,
        };
        this.email = {
            primary  : data.applicant.emailPrimary,
            secondary: data.applicant.emailSecondary,
        };
        this.phone = {
            primary  : data.applicant.phonePrimary,
            secondary: data.applicant.phoneSecondary,
        };
        this.socialMedia = {
            facebook: data.applicant.facebook,
            linkedin: data.applicant.linkedin,
        };
        this.dob = data.applicant.dateOfBirth;
        this.inUSA = data.applicant.inUSA;
        this.USAEntryDate = data.applicant.usEntryDate;
        this.USAVisaStatus = data.applicant.usVisaStatus;
        this.address = {
            line1  : data.applicant.usAddress.line1,
            line2  : data.applicant.usAddress.line2,
            city   : data.applicant.usAddress.city,
            zipcode: data.applicant.usAddress.zipcode,
            state  : data.applicant.usAddress.state,
            country: data.applicant.usAddress.country,
        };
        this.parent = {
            name: data.applicant.parentName,
            address: {
                line1  : data.applicant.parentAddress.line1,
                line2  : data.applicant.parentAddress.line2,
                city   : data.applicant.parentAddress.city,
                zipcode: data.applicant.parentAddress.zipcode,
                state  : data.applicant.parentAddress.state,
                country: data.applicant.parentAddress.country,
            }
        };
    }
    setFromGoogleRow(googleRow) {
        [this.name.first, this.name.middle, this.name.last]
            = sanitize.extractNameFields(googleRow.fullName);

        this.phone.primary = googleRow.phonePrimary;

        [this.email.primary, this.email.secondary]
            = sanitize.splitOnWhitespaceAndDelimeters(googleRow.email);

        this.socialMedia.facebook = googleRow.facebook;
        this.socialMedia.linkedin = googleRow.linkedin;
    }
}

export default Applicant;
