<template>
    <v-card>
        <v-card-title>
            Add New Application
            <v-btn icon
                @click="closeDialog"
                style="position: absolute; right: 10px">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 700px">
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
                                                v-bind:row="googleRow"
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
                                                v-bind:row="googleRow"
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
                                                v-bind:referrer="googleRow.referrer1"
                                                v-bind:emitId="formSections.referrers.emitId[0]"
                                                @updateForm="updateForm" />
                                            <ReferrerForm
                                                v-bind:referrer="googleRow.referrer2"
                                                v-bind:emitId="formSections.referrers.emitId[1]"
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
                                                        v-bind:emitId="formSections.previousSchool.emitId[0]"
                                                        @updateForm="updateForm" />
                                                    <PreviousSchoolDetailsForm
                                                        v-bind:emitId="formSections.previousSchool.emitId[1]"
                                                        @updateForm="updateForm" />
                                                    <PreviousSchoolDetailsForm
                                                        v-bind:emitId="formSections.previousSchool.emitId[2]"
                                                        @updateForm="updateForm" />
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
                                                v-bind:emitId="formSections.writeup.emitId[0]"
                                                v-bind:question="formSections.writeup.question[0]"
                                                @updateAnswer="updateForm" />
                                            <WriteupForm
                                                v-bind:emitId="formSections.writeup.emitId[1]"
                                                v-bind:question="formSections.writeup.question[1]"
                                                @updateForm="updateForm" />
                                            <WriteupForm
                                                v-bind:emitId="formSections.writeup.emitId[2]"
                                                v-bind:question="formSections.writeup.question[2]"
                                                @updateForm="updateForm" />
                                            <WriteupForm
                                                v-bind:emitId="formSections.writeup.emitId[3]"
                                                v-bind:question="formSections.writeup.question[3]"
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
                                                v-bind:uploadedDocs="googleRow.docsEmailed"
                                                v-bind:emitId="formSections.additionalDocs.emitId"
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
    props: ['googleRow'],
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
                    emitId: 'schoolDetails'
                },
                referrers: {
                    title: 'Referrers',
                    icon: 'mdi-account-tie',
                    emitId: ['referrer1', 'referrer2']
                },
                previousSchool: {
                    title: 'Previous School Details',
                    icon: 'mdi-book-multiple',
                    emitId: ['prevSchool1', 'prevSchool2', 'prevSchool3', 'prevSchool4'],
                },
                writeup: {
                    title: 'Writeups',
                    icon: 'mdi-grease-pencil',
                    emitId: ['writeup1', 'writeup2', 'writeup3', 'writeup4'],
                    question: ['Your academic, extra curriculum and social achievements/ Membership / Experience/ Association with a Maheshwari / Rajasthani Association or a cause)',
                    'How do you plan to associate with and contribute to MMNA in USA during your studies and in future?',
                    'Justification for requesting educational loan scholarship and how are you planning to finance the education & related expenses? ',
                    'Your future goals and career plans']
                },
                additionalDocs: {
                    title: 'Additional Documents',
                    icon: 'mdi-file-upload',
                    emitId: 'additionalDocs'
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
        saveApplication: function() {
            console.log("SaveFormClicked");
            console.log(this.application);
        },
    },
    mounted: function() {
        if (this.googleRow.applicationId) {
            axios
            .get(endpoint.application.findById + "/" + this.googleRow.applicationId)
            .then(response => {
                this.application = response.data;
            }).catch(error => {
                console.log("Error Fetching application");
                console.error(error.response);
            });
        }
    },
}
</script>
