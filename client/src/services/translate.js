"use strict";

/*
* Converts Server data model to structure used by Client
*/
function toClient(server) {
    return {
        applicant: {
            name: {
                salutation: server.applicant.saluation,
                first: server.applicant.firstName,
                middle: server.applicant.middleName,
                last: server.applicant.lastName,
            },
            email: {
                primary: server.applicant.emailPrimary,
                secondary: server.applicant.emailSecondary,
            },
            phone: {
                primary: server.applicant.phonePrimary,
                secodary: server.applicant.phoneSecondary,
            },
            socialMedia: {
                linkedin: server.applicant.facebook,
                facebook: server.applicant.linkedin,
            },
            address: server.applicant.usAddress,
            dob: server.applicant.dateOfBirth,
            inUSA: server.applicant.inUSA,
            USAVisaStatus: server.applicant.usVisaStatus,
            USAEntryDate: server.applicant.usEntryDate,
            parent:{
                name: server.applicant.parentName,
                address: server.applicant.parentAddress,
            }
        },
        referrers: [{
            name:{
                salutation: server.referrers.referrer1.saluation,
                first: server.referrers.referrer1.firstName,
                middle: server.referrers.referrer1.middleName,
                last: server.referrers.referrer1.lastName,
            },
            email:{
                primary: server.referrers.referrer1.emailPrimary,
                secondary: server.referrers.referrer1.emailSecondary,
            },
            phone:{
                primary: server.referrers.referrer1.phonePrimary,
                secondary: server.referrers.referrer1.phoneSecondary,
            },
            position: server.referrers.referrer1.position,
            organization: server.referrers.referrer1.organization,
            address: server.referrers.referrer1.address,
        }, {
            name:{
                salutation: server.referrers.referrer2.saluation,
                first: server.referrers.referrer2.firstName,
                middle: server.referrers.referrer2.middleName,
                last: server.referrers.referrer2.lastName,
            },
            email:{
                primary: server.referrers.referrer2.emailPrimary,
                secondary: server.referrers.referrer2.emailSecondary,
            },
            phone:{
                primary: server.referrers.referrer2.phonePrimary,
                secondary: server.referrers.referrer2.phoneSecondary,
            },
            position: server.referrers.referrer2.position,
            organization: server.referrers.referrer2.organization,
            address: server.referrers.referrer2.address,
        }],
        info: {
            university: {
                name: server.courseDetails.school,
                address: server.courseDetails.address,
                courseName: server.courseDetails.name,
                courseDuration: server.courseDetails.duration,
                semester: server.courseDetails.semester,
                fees: server.courseDetails.fees,
                otherScholarships: server.courseDetails.otherScholarships,
            },
            prevEducation: server.previousSchools,
            writeups: server.writeups,
            docs: [{
                name: 'I-20',
                uploaded: server.uploadedDocs.docI20},
                {name: 'ADMISSION LETTER',
                uploaded: server.uploadedDocs.docAdmissionLetter},
                {name: 'Passport',
                uploaded: server.uploadedDocs.docPassport},
                {name: 'Visa',
                uploaded: server.uploadedDocs.docVisa},
                {name: 'Resume',
                uploaded: server.uploadedDocs.docResume},
                {name: 'MMNA Application',
                uploaded: server.uploadedDocs.docMMNAApplication},
                {name: 'Reference 1',
                uploaded: server.uploadedDocs.docReference1},
                {name: 'Reference 2',
                uploaded: server.uploadedDocs.docReference2}],
        },
    };
}

/*
* Converts Client data model to structure used by Server
*/
function toServer(client) {
    var referrer1 = {};
    if (client.referrers[0]) {
        referrer1 = {
            salutation: client.referrers[0].name.salutation,
            firstName: client.referrers[0].name.first,
            middleName: client.referrers[0].name.middle,
            lastName: client.referrers[0].name.last,
            emailPrimary: client.referrers[0].email.primary,
            emailSecondary: client.referrers[0].email.secondary,
            phonePrimary: client.referrers[0].phone.primary,
            phoneSecondary: client.referrers[0].phone.secondary,
        }
    }
    var referrer2 = {};
    if (client.referrers[1]) {
        referrer2 = {
            salutation: client.referrers[1].name.salutation,
            firstName: client.referrers[1].name.first,
            middleName: client.referrers[1].name.middle,
            lastName: client.referrers[1].name.last,
            emailPrimary: client.referrers[1].email.primary,
            emailSecondary: client.referrers[1].email.secondary,
            phonePrimary: client.referrers[1].phone.primary,
            phoneSecondary: client.referrers[1].phone.secondary,
        }
    }
    var uploadedDocs = {};
    if (client.docs) {
        uploadedDocs = {
            docI20: client.docs.find(
                doc => doc.name == 'I-20'),
            docAdmissionLetter: client.docs.find(
                doc => doc.name == 'Admission Letter'),
            docPassport: client.docs.find(
                doc => doc.name == 'Passport'),
            docVisa: client.docs.find(
                doc => doc.name == 'Visa'),
            docResume: client.docs.find(
                doc => doc.name == 'Resume'),
            docMMNAApplication: client.docs.find(
                doc => doc.name == 'MMNA Application'),
            docReference1: client.docs.find(
                doc => doc.name == 'Reference 1'),
            docReference2: client.docs.find(
                doc => doc.name == 'Reference 2'),
        }
    }
    return {
        applicant: {
            salutation: client.applicant.name.saluation,
            firstName: client.applicant.name.first,
            middleName: client.applicant.name.middle,
            lastName: client.applicant.name.last,
            emailPrimary: client.applicant.email.primary,
            emailSecondary: client.applicant.email.secondary,
            phonePrimary: client.applicant.phone.primary,
            phoneSecondary: client.applicant.phone.secondary,
            linkedin: client.applicant.socialMedia.linkedin,
            facebook: client.applicant.socialMedia.facebook,
            dateOfBirth: client.applicant.dob,
            parentName: client.applicant.parent.name,
            inUSA: client.applicant.inUSA,
            usVisaStatus: client.applicant.USAVisaStatus,
            usEntryDate: client.applicant.USAEntryDate,
            parentAddress: client.applicant.parent.address,
            usAddress: client.applicant.address,
        },
        courseDetails: {
            school: client.info.university.name,
            name: client.info.university.courseName,
            semester: client.info.university.semester,
            duration: client.info.university.courseDuration,
            fees: client.info.university.fees,
            otherScholarships: client.info.university.otherScholarships,
            address: client.info.university.address,
        },
        referrers: {
            referrer1: referrer1,
            referrer2: referrer2,
        },
        previousSchools: client.info.prevEducation,
        writeups: client.info.writeups,
        uploadedDocs: uploadedDocs,
    };
}

export default Object.freeze({
    application: {
        toClient: toClient,
        toServer: toServer,
    },
});