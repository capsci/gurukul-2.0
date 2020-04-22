"use strict";

const app_server = 'http://localhost:3000';

const application_server = app_server + '/application';
const applicant_server = app_server + '/applicant';

const application = {
    prev: application_server + '/prev', // POST
    save: application_server, // POST
    get: application_server // GET
};
const applicant = {
    exists: applicant_server + '/exists',
    save: applicant_server, // POST
    get: applicant_server // GET
};

const urls = {
    googlesheets: app_server + '/googlesheets',
    constants: app_server + '/constants',
    application,
    applicant
}

const server = {
    urls
};

module.exports = Object.freeze({
    server,
});
