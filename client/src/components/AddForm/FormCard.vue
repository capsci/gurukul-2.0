<template>
    <v-card>
        <v-card-title>
            {{ formTitle }}
            <v-btn icon
                @click="closeDialog"
                style="position: absolute; right: 10px">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text v-if="ready" style="height: 700px">
            <v-form>
                <v-container>
                    <v-row>
                        <v-item-group
                            v-model="selectedSection"
                            class="shrink mr-6"
                            mandatory
                            tag="v-flex">
                            <v-item
                                v-for="section in formSections"
                                :key="section.title"
                                v-slot:default="{ active, toggle }">
                                <div>
                                    <v-btn
                                        :input-value="active"
                                        icon
                                        @click="toggle">
                                        <v-icon>{{ section.icon }}</v-icon>
                                    </v-btn>
                                </div>
                            </v-item>
                        </v-item-group>
                        <v-col>
                            <v-window
                            v-model="selectedSection"
                            class="elevation-1"
                            vertical>
                                <v-window-item>
                                    <v-card flat>
                                        <v-card-text>
                                            <v-row align="center">
                                                <strong class="title">
                                                    {{ formSections.applicant.title }}
                                                </strong>
                                                <v-spacer></v-spacer>
                                                <v-icon>
                                                    {{ formSections.applicant.icon }}
                                                </v-icon>
                                            </v-row>
                                            <ApplicantForm
                                                v-bind:googleRow="googleRow"
                                                v-bind:application="application"
                                                v-bind:emitId="formSections.applicant.emitId"
                                                @updateForm="updateForm" />
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item>
                                    <v-card flat>
                                        <v-card-text>
                                            <v-row align="center">
                                                <strong class="title">
                                                    {{ formSections.universityDetails.title }}
                                                </strong>
                                                <v-spacer></v-spacer>
                                                <v-icon>
                                                    {{ formSections.universityDetails.icon }}
                                                </v-icon>
                                            </v-row>
                                            <UniversityDetailsForm
                                                v-bind:googleRow="googleRow"
                                                v-bind:application="application"
                                                v-bind:emitId="formSections.universityDetails.emitId"
                                                @updateForm="updateForm" />
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item>
                                    <v-card flat>
                                        <v-card-text>
                                            <v-row align="center">
                                                <strong class="title">
                                                    {{ formSections.referrers.title }}
                                                </strong>
                                                <v-spacer></v-spacer>
                                                <v-icon>
                                                    {{ formSections.referrers.icon }}
                                                </v-icon>
                                            </v-row>
                                            <ReferrerForm
                                                :googleRow="googleRow"
                                                :application="application"
                                                :emitId="formSections.referrers.emitId"
                                                @updateForm="updateForm" />
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item>
                                    <v-card>
                                        <v-card-text>
                                            <v-row align="center">
                                                <strong class="title">
                                                    {{ formSections.previousSchool.title }}
                                                </strong>
                                                <v-spacer></v-spacer>
                                                <v-icon>
                                                    {{ formSections.previousSchool.icon }}
                                                </v-icon>
                                            </v-row>
                                                    <PreviousSchoolDetailsForm
                                                        :emitId="formSections.previousSchool.emitId"
                                                        :application="application"
                                                        :numberOfSchools="formSections.previousSchool.numberOfSchools"
                                                        @updateForm="updateForm"/>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item>
                                    <v-card flat>
                                        <v-card-text>
                                            <v-row align="center">
                                                <strong class="title">
                                                    {{ formSections.writeup.title}}
                                                </strong>
                                                <v-spacer></v-spacer>
                                                <v-icon>
                                                    {{ formSections.writeup.icon}}
                                                </v-icon>
                                            </v-row>
                                            <WriteupForm
                                                :emitId="formSections.writeup.emitId"
                                                :application="application"
                                                :questions="formSections.writeup.questions"
                                                @updateForm="updateForm" />
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item>
                                    <v-card flat>
                                        <v-card-text>
                                            <v-row align="center">
                                                <strong class="title">
                                                    {{ formSections.additionalDocs.title }}
                                                </strong>
                                                <v-spacer></v-spacer>
                                                <v-icon>
                                                    {{ formSections.additionalDocs.icon }}
                                                </v-icon>
                                            </v-row>
                                            <AddictionalDocsForm
                                                :googleRow="googleRow"
                                                :application="application"
                                                :emitId="formSections.additionalDocs.emitId"
                                                @updateForm="updateForm" />
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                            </v-window>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="blue darken-1"
                text
                @click="closeDialog">
                Close
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="saveApplication">
                Save
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
import axios from 'axios';
import endpoint from './../../services/endpoint';
import ApplicantForm from './ApplicantForm';
import UniversityDetailsForm from './UniversityDetailsForm';
import ReferrerForm from './ReferrerForm';
import PreviousSchoolDetailsForm from './PreviousSchoolDetailsForm';
import WriteupForm from './WriteupForm';
import AddictionalDocsForm from './AdditionalDocsForm';

export default {
    name: "Form",
    props: ['googleRow', 'formTitle'],
    components: {
        ApplicantForm,
        UniversityDetailsForm,
        ReferrerForm,
        PreviousSchoolDetailsForm,
        WriteupForm,
        AddictionalDocsForm
    },
    data() {
        return {
            application: {},
            ready: false,
            // unique sections
            formSections: {
                applicant: {
                    title: 'Applicant Details',
                    icon: 'mdi-file-document-edit',
                    emitId: 'applicant'
                },
                universityDetails:{
                    title: 'University Details',
                    icon: 'mdi-school',
                    emitId: 'courseDetails'
                },
                referrers: {
                    title: 'Referrers',
                    icon: 'mdi-account-tie',
                    emitId: 'referrers',
                },
                previousSchool: {
                    title: 'Previous School Details',
                    icon: 'mdi-book-multiple',
                    emitId: 'previousSchools',
                    numberOfSchools: 3,
                },
                writeup: {
                    title: 'Writeups',
                    icon: 'mdi-grease-pencil',
                    emitId: 'writeups',
                    questions: [
                        'Your academic, extra curriculum and social achievements/ Membership / Experience/ Association with a Maheshwari / Rajasthani Association or a cause)',
                        'How do you plan to associate with and contribute to MMNA in USA during your studies and in future?',
                        'Justification for requesting educational loan scholarship and how are you planning to finance the education & related expenses? ',
                        'Your future goals and career plans']
                },
                additionalDocs: {
                    title: 'Additional Documents',
                    icon: 'mdi-file-upload',
                    emitId: 'uploadedDocs'
                }
            },
            selectedSection: 0,
            formData: {},
        }
    },
    methods: {
        updateForm: function(data) {
            var sectionKey = Object.keys(data)[0];
            this.application[sectionKey] = data[sectionKey];
        },
        closeDialog: function() {
            this.$emit('closeDialog');
        },
        //savetoMongo
        saveApplication: async function() {
            console.log(this.application);
            try {
                // Update Existing
                if(this.googleRow.applicationId) {
                    await axios
                        .post(endpoint.applicationMaterial.update + this.googleRow.applicationId, this.application);
                }
                // Add New
                else {
                    var applicationMaterial = await axios
                        .post(endpoint.applicationMaterial.save, this.application);
                    await axios
                        .post(
                            endpoint.googleData.addApplication + this.googleRow._id, {id: applicationMaterial.data});
                }
            }
            catch (error) {
                console.log("Error Saving applicationMaterial");
                console.error(error.response);
            }
        },
    },
    mounted: function() {
        if (this.googleRow.applicationId) {
            axios
                .get(endpoint.applicationMaterial.findById + "/" + this.googleRow.applicationId)
                .then(response => {
                    this.application = response.data;
                    this.ready = true;
                }).catch(error => {
                    console.log("Error Fetching application");
                    console.error(error.response);
                });
        }
        else {
            console.log("Sending google row");
            this.ready = true;
        }
    },
}
</script>
