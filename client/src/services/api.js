"use strict";
import axios from 'axios';

const serverUrl = 'http://localhost:3000';

const googleDataUrl = serverUrl + '/googlesheets';

const applicationMaterialUrl = serverUrl + '/applicationMaterial';
const referrerUrl = serverUrl + '/referrer';
const schoolUrl = serverUrl + '/school';

const googleData = {
    getGoogleData: function() {
        return axios
            .get(
                googleDataUrl);
    },
    addApplication: function(googleRowId, applicationMaterialId) {
        return axios
            .post(
                googleDataUrl + '/application/' + googleRowId,
                {id: applicationMaterialId});
    },
}

const applicationMaterial = {
    update: function(applicationMaterialId, applicationMaterial) {
        return axios
            .post(
                applicationMaterialUrl + "/" + applicationMaterialId,
                applicationMaterial);
    },
    addNew: function(applicationMaterial) {
        return axios
            .post(
                applicationMaterialUrl,
                applicationMaterial);
    },
    findById: function(applicationMaterialId) {
        return axios
            .get(
                applicationMaterialUrl + "/" + applicationMaterialId);
    },
    findAll: function() {
        return axios
            .get(
                applicationMaterialUrl + "/all");
    },
};

const referrer = {
    findAll: function() {
        return axios
            .get(
                referrerUrl + "/all");
    },
};

const school = {
    findAll: function() {
        return axios
            .get(
                schoolUrl + "/all");
    },
};

export default Object.freeze({
    googleData: googleData,
    referrer: referrer,
    school: school,
    applicationMaterial: applicationMaterial,
});
