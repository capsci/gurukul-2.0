"use strict";

/*
* This is client side model for Referrer
*/

class Referrer {
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
        this.position = null;
        this.organization = null;
        this.address = {
            line1  : null,
            line2  : null,
            city   : null,
            zipcode: null,
            state  : null,
            country: null,
        };
    }
    setFromSavedApplication(referrer) {
        this.name  = {
            salutation: referrer.salutation,
            first     : referrer.firstName,
            middle    : referrer.middleName,
            last      : referrer.lastName,
        };
        this.email = {
            primary  : referrer.emailPrimary,
            secondary: referrer.emailSecondary,
        };
        this.phone = {
            primary  : referrer.phonePrimary,
            secondary: referrer.phoneSecondary,
        };
        this.position = referrer.position;
        this.organization = referrer.organization;
        this.address = {
            line1  : referrer.address.line1,
            line2  : referrer.address.line2,
            city   : referrer.address.city,
            zipcode: referrer.address.zipcode,
            state  : referrer.address.state,
            country: referrer.address.country,
        };
    }
}

export default Referrer;