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
            referrers: [],
        };
        this.applicationId = null;
        this.googleRowId = null;
    }

    init(googleRow) {
        this.googleRowId = googleRow._id;
        this.applicationId = googleRow.applicationId;

        //Google Meta Data Here
        this.setGoogleMetaData(googleRow);

        if(this.applicationId) {
            this.setFromSavedData();
        }
        else {
            this.setFromGoogleRow(googleRow);
        }
    }

    /*
    * Set data from saved application
    */
    setFromGoogleRow(googleRow) {
        this.setGoogleMetaData(googleRow);
        this.applicant.setFromGoogleRow(googleRow);
        this.info.setFromGoogleRow(googleRow);
    }
    /*
    * Set data from saved application
    */
    setFromSavedData() {
        api.applicationMaterial.findById(this.applicationId)
            .then(response => {
                var data = response.data;
                this.applicant.setFromSavedApplication(data);
                this.referrers = [
                    new Referrer()
                        .setFromSavedApplication(data.referrers.reference1),
                    new Referrer()
                        .setFromSavedApplication(data.referrers.reference2),
                ];
                this.info.setFromSavedApplication(data);
            }).catch(error => {
                console.log("Error Fetching application");
                console.error(error);
            })
    }

    setGoogleMetaData(googleRow) {
        this.googleMetaData.universityDetails
            = googleRow.courseName + "\n"
                + googleRow.schoolNameAndAddress + "\n"
                + "Fees: " + googleRow.courseTuitionFee + "\n"
                + "OtherScholarships: " + googleRow.otherScholarships;

        // TODO: Extract and set referrer data
        this.googleMetaData.referrers.push(googleRow.referrer1);
        this.googleMetaData.referrers.push(googleRow.referrer2);
    }

    getApplicant() {
        return this.applicant;
    }
}

export default Application;