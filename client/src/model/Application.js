"use strict";

/*
* This serves as coupling between server side and client side data structure.
* Please note any changes in server data schema needs to reflected
*    for both save and retrieve operations.
*/

import api from './../services/api';
import Applicant from './application/Applicant';
import Referrer from './application/Referrer';
import Info from './application/Info';

class Application {

    constructor() {
        this.applicant = new Applicant();
        this.referrers = [];
        this.info = new Info();
        this.googleMetaData = {
            universityDetails : null,
            referrers: {
                referrer1: null,
                referrer2: null,
            },
        };
        this.applicationId = null;
        this.googleRowId = null;
    }

    /*
    * Set data from googleRow
    */
    async initFromGoogleRow(googleRow) {
        this.googleRowId = googleRow._id;
        this.applicationId = googleRow.applicationId;

        //Google Meta Data Here
        this.setGoogleMetaData(googleRow);

        (this.applicationId)
            ? await this.initFromApplicationId(this.applicationId)
            : this.applicant.setFromGoogleRow(googleRow);
    }

    async initFromApplicationId(applicationId) {
        await api.applicationMaterial
            .findById(applicationId)
            .then(response => {
                this.setFromSavedData(response.data);
            }).catch(error => {
                console.log("Error Fetching application");
                console.error(error.response);
            });
    }

    /*
    * Set data from saved application
    */
    setFromSavedData(data) {
        this.applicant.setFromSavedApplication(data);
        this.referrers = [
            new Referrer().setFromSavedApplication(data.referrers.reference1),
            new Referrer().setFromSavedApplication(data.referrers.reference2),
        ];
        this.info.setFromSavedApplication(data);
    }

    setGoogleMetaData(googleRow) {
        this.googleMetaData.universityDetails
            = googleRow.courseName + "\n"
                + googleRow.schoolNameAndAddress + "\n"
                + "Fees: " + googleRow.courseTuitionFee + "\n"
                + "OtherScholarships: " + googleRow.otherScholarships;

        // TODO: Extract and set referrer data
        this.googleMetaData.referrers.referrer1 = googleRow.referrer1;
        this.googleMetaData.referrers.referrer2 = googleRow.referrer2;
    }
};

return Application;
