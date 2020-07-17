"use strict";
import axios from 'axios';

const serverUrl = 'http://localhost:3000';

const googleDataUrl = serverUrl + '/googlesheets';

const applicationUrl = serverUrl + '/application';

const googleData = {
    getGoogleData: function() {
        return axios
            .get(
                googleDataUrl);
    },
    addApplication: function(googleRowId, applicationId) {
        return axios
            .post(
                googleDataUrl + '/application/' + googleRowId,
                {id: applicationId});
    },
}

const application = {
    update: function(applicationId, application) {
        return axios
            .post(
                applicationUrl + "/" + applicationId,
                application);
    },
    addNew: function(application) {
        return axios
            .post(
                applicationUrl,
                application);
    },
    findById: function(applicationId) {
        return axios
            .get(
                applicationUrl + "/" + applicationId);
    },
    findAll: function() {
        return axios
            .get(
                applicationUrl + "/all");
    },
};

export default Object.freeze({
    googleData: googleData,
    application: application,
});
