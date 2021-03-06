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
        <v-alert
            type="error"
            v-if="errors"
            dismissible>
            {{ errors }}
        </v-alert>
        <v-card-text v-if="ready" style="height: 700px">
            <v-form ref="applicationForm" >
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
                                            <ApplicantForm />
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
                                            <UniversityDetailsForm />
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
                                            <ReferrerForm />
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
                                                    <PreviousSchoolDetailsForm />
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
                                            <WriteupForm />
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
                                            <AddictionalDocsForm />
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
                :disabled="selectedSection == 0"
                @click="selectedSection -= 1" >
                Prev
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                :disabled="selectedSection == ( Object.keys(formSections).length - 1)"
                @click="selectedSection += 1" >
                Next
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="closeDialog" >
                Close
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                :disabled="Object.keys(formSections).length != Object.keys(visitedSections).length"
                @click="saveApplication" >
                Save
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
import Application from './../../model/Application';
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
    watch : {
        selectedSection: function (value) {
            this.visitedSections[value] = 1;
        },
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
                    component: ApplicantForm,
                },
                universityDetails:{
                    title: 'University Details',
                    icon: 'mdi-school',
                },
                referrers: {
                    title: 'Referrers',
                    icon: 'mdi-account-tie',
                },
                previousSchool: {
                    title: 'Previous School Details',
                    icon: 'mdi-book-multiple',
                },
                writeup: {
                    title: 'Writeups',
                    icon: 'mdi-grease-pencil',
                    questions: [
                        'Your academic, extra curriculum and social achievements/ Membership / Experience/ Association with a Maheshwari / Rajasthani Association or a cause)',
                        'How do you plan to associate with and contribute to MMNA in USA during your studies and in future?',
                        'Justification for requesting educational loan scholarship and how are you planning to finance the education & related expenses? ',
                        'Your future goals and career plans']
                },
                additionalDocs: {
                    title: 'Additional Documents',
                    icon: 'mdi-file-upload',
                }
            },
            selectedSection: 0,
            visitedSections: {},
            errors: "",
        }
    },
    methods: {
        closeDialog: function() {
            this.$store.commit('CLEAR_APPLICATION');
            this.$emit('closeDialog');
        },
        //savetoMongo
        saveApplication: async function() {
            if (!this.$refs.applicationForm.validate()) {
                this.errors = 'There are errors on the form';
                return;
            }
            this.$store.getters.application
                .save()
                .then(() => {
                    this.$store.commit('CLEAR_APPLICATION');
                    this.$emit('closeDialog');
            });
        },
    },
    mounted: function() {
        var application = new Application();
        if(this.googleRow.applicationId) {
            application
                .setFromSavedData(this.googleRow.applicationId)
                .then(() => {
                    this.$store.commit('SET_APPLICATION', application);
                    this.ready = true;
                });
        }
        else {
            application.setFromGoogleRow(this.googleRow);
            this.$store.commit('SET_APPLICATION', application);
            this.ready = true;
        }
        this.visitedSections[this.selectedSection] = 1;
    },
}
</script>
