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
            salutation: referrer.name.salutation,
            first     : referrer.name.first,
            middle    : referrer.name.middle,
            last      : referrer.name.last,
        };
        this.email = {
            primary  : referrer.email.primary,
            secondary: referrer.email.secondary,
        };
        this.phone = {
            primary  : referrer.phone.primary,
            secondary: referrer.phone.secondary,
        };
        this.position = referrer.position;
        this.organization = referrer.organization;
        this.address = referrer.address;
    }
}

export default Referrer;