"use strict";

const serverUrl = 'http://localhost:3000';

const googleDataUrl = serverUrl + '/googlesheets';

const addressUrl = serverUrl + '/address';
const applicantUrl = serverUrl + '/applicant';
const applicationUrl = serverUrl + '/application';
const referrerUrl = serverUrl + '/referrer';
const schoolUrl = serverUrl + '/school';

const googleData = {
    get: googleDataUrl,
}

const address = {
    save: addressUrl,
    findById: addressUrl,
};

const applicant = {
    save: applicantUrl,
    findByEmail: applicantUrl,
    findById: applicantUrl,
    findAll: applicantUrl + '/all',
};

const application = {
    save: applicationUrl,
    findById: applicationUrl,
};

const referrer = {
    save: referrerUrl,
    findByEmail: referrerUrl,
    findById: referrerUrl,
};

const school = {
    save: schoolUrl,
    findById: schoolUrl,
};

module.exports = Object.freeze({
    googleData: googleData,
    address: address,
    applicant: applicant,
    application: application,
    referrer: referrer,
    school: school,
});
