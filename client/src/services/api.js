"use strict";
import axios from 'axios';

const serverUrl = 'http://localhost:3000';

const googleDataUrl = serverUrl + '/googlesheets';

const applicationMaterialUrl = serverUrl + '/applicationMaterial';

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

export default Object.freeze({
    googleData: googleData,
    applicationMaterial: applicationMaterial,
});
