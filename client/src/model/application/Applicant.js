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

    setFromSavedApplication(applicant) {
        this.name = {
            salutation: applicant.name.salutation,
            first     : applicant.name.first,
            middle    : applicant.name.middle,
            last      : applicant.name.last,
        };
        this.email = {
            primary  : applicant.email.primary,
            secondary: applicant.email.secondary,
        };
        this.phone = {
            primary  : applicant.phone.primary,
            secondary: applicant.phone.secondary,
        };
        this.socialMedia = {
            facebook: applicant.socialMedia.facebook,
            linkedin: applicant.socialMedia.linkedin,
        };
        this.dob = applicant.dob;
        this.inUSA = applicant.inUSA;
        this.USAEntryDate = applicant.USAEntryDate;
        this.USAVisaStatus = applicant.USAVisaStatus;
        this.address = applicant.address;
        this.parent = {
            name: applicant.parent.name,
            address: applicant.parent.address,
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
