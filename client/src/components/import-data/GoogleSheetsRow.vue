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
                        <div class="error-message">
                            {{ error }}
                        </div>
                    </v-col>
                    <v-col v-if="!error" cols="1">
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
                                    <Form v-bind:row="row"/>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="blue darken-1" text @click="addFormClicked = false">Close</v-btn>
                                    <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
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
import Config from './../Config';
import Form from './../AddForm/Form';

export default {
    name: 'GoogleSheetsRow',
    props: ['row'],
    components: {
        Form
    },
    data() {
        return {
            applicant_id: null,
            applications_prev: null,
            error: null,
            addFormClicked: false,
        }
    },
    methods: {
        setApplicantID: function() {
            axios
                .post(Config.server.urls.applicant.exists,
                    { email: this.row.email })
                .then(response => {
                    this.applicant_id = response.data.id;
                    if (response.data.id != null) {
                        this.setPrevApplications(response.data.id);
                    }
                })
                .catch(err => {
                    this.error = err.response.data.error;
                });
        },
        setPrevApplications: function(applicant_id) {
            axios
                .post(Config.server.urls.application.prev,
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