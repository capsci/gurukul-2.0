"use strict";

const app_server = 'http://localhost:3000';

const application_server = app_server + '/application';
const application = {
    exists: application_server + '/exists'
}

const urls = {
    googlesheets: app_server + '/googlesheets',
    constants: app_server + '/constants',
    application
}

const server = {
    urls
};

module.exports = Object.freeze({
    server,
});
