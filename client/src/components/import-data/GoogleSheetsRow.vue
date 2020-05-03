<template>
    <div>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="11">
                        <span> {{row.applicationTime}} </span>
                        <span> {{row.fullName}}</span>
                        <span> {{row.email}} </span>
                        <span> {{row.facebook}} </span>
                        <span> {{row.linkedin}} </span>
                        <span> {{row.courseInfo}} </span>
                        <span> {{row.courseTuitionFee}} </span>
                        <span> {{row.otherScholarships}} </span>
                        <span> {{row.referrer1}} </span>
                        <span> {{row.referrer2}} </span>
                        <span> {{row.docsEmailed}} </span>
                        <div
                            v-for="error in errors"
                            v-bind:key="error">
                            <span class="error-message">
                                {{ error }}
                            </span>
                        </div>
                    </v-col>
                    <v-col v-if="errors.length == 0" cols="1">
                        <v-dialog
                            v-model="addFormClicked"
                            persistent scrollable
                            max-width="1200px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark v-on="on">
                                    Add <v-icon>Add mdi-account-plus</v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    Add New Application
                                    <v-btn icon
                                        @click="addFormClicked = false"
                                        style="position: absolute; right: 10px">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text style="height: 700px">
                                    <Form v-bind:row="row" v-on:formUpdated="formUpdated"/>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="blue darken-1" text @click="addFormClicked = false">Close</v-btn>
                                    <v-btn color="blue darken-1" text @click="saveApplication">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';
import endpoint from './../../services/endpoint';
import Form from './../AddForm/Form';
import { formField } from './../../mixins/formField'

export default {
    name: 'GoogleSheetsRow',
    props: ['row'],
    mixins: [formField],
    components: {
        Form
    },
    data() {
        return {
            applicant_id: null,
            applications_prev: null,
            errors: [],
            addFormClicked: false,
            formData: null,
        }
    },
    methods: {
        setApplicantID: function() {
            var emails = this.extractEmail(this.row.email);
            if (!emails) {
                this.errors
                    .push(`Cannot extract email from string '${this.row.email}'`);
                return;
            }
            var request = {
                params: {
                    email: emails,
                }
            };
            axios
                .get(endpoint.applicant.findByEmail, request)
                .then(response => {
                    if (!response.data) {
                        return;
                    }
                    if (response.data > 1) {
                        this.errors.push("Multiple applicant with email found");
                        return;
                    }
                    this.applicant_id = response.data[0].id;
                    if (this.applicant_id != null) {
                        //this.setPrevApplications(this.applicant_id);
                    }
                })
                .catch(err => {
                        this.errors.push(err.response.data.error)
                });
        },
        setPrevApplications: function(applicant_id) {
            axios
                .post(endpoint.application.findById,
                    { applicant_id: applicant_id })
                .then(response => {
                    this.appplications_prev = response.data.id;
                })
                .catch(err => {
                    this.error = err.response.data.error;
                });
        },
        addApplication: function() {
            this.addFormClicked = true;
        },
        saveApplication: function() {
            console.log(this.formData);
            // TODO: Needs some central interface that can handle DB intraction with multiple collections
                        
            axios
                .post(endpoint.address.save,
                    { address: this.formData.applicant.usAddress })                
                .catch(err => {
                    this.error = err.response.data.error;
                });            

            axios
                .post(endpoint.referrer.save,
                    { referrer: this.formData.referrer })                
                .catch(err => {
                    this.error = err.response.data.error;
                });

            axios
                .post(endpoint.school.save,
                    { school: this.formData.schoolDetails })                
                .catch(err => {
                    this.error = err.response.data.error;
                });

            axios
                .post(endpoint.application.save,
                    { application: this.formData.application })                
                .catch(err => {
                    this.error = err.response.data.error;
                });

            axios
                .post(endpoint.applicant.save,
                    { applicant: this.formData.applicant })                
                .catch(err => {
                    this.error = err.response.data.error;
                });
        },
        // Emit methods for children
        formUpdated: function(data) {
            this.formData = data;
        }
    },
    mounted: function() {
        this.setApplicantID();
    }
}
</script>

<style scoped>
.error-message {
    text-align: center;
    color: red;
}
</style>