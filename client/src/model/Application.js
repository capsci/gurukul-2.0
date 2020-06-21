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
import translate from './../services/translate';

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
    setFromSavedData(applicationId) {
        return api.applicationMaterial.findById(applicationId)
            .then(response => {
                var clientFormat = translate.application
                    .toClient(response.data);
                this.applicant.setFromSavedApplication(clientFormat.applicant);
                this.referrers = [
                    new Referrer()
                        .setFromSavedApplication(clientFormat.referrers[0]),
                    new Referrer()
                        .setFromSavedApplication(clientFormat.referrers[1]),
                ];
                this.info.setFromSavedApplication(clientFormat.info);
                return;
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
        if(googleRow.referrer1) {
            this.googleMetaData.referrers.push(googleRow.referrer1);
            this.addReferrer();
        }
        if(googleRow.referrer2) {
            this.googleMetaData.referrers.push(googleRow.referrer2);
            this.addReferrer();
        }

    }
    addReferrer() {
        this.referrers.push(new Referrer());
    }
}

export default Application;