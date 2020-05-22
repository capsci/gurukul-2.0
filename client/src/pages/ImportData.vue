<template>
    <v-content class="container">
        <v-data-table
            :headers="headers"
            :items="gs_data"
            item-key="applicationTime">
            <template #item.fullName="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon small
                            v-on="on">mdi-av-timer</v-icon>
                    </template>
                    <span>{{item.applicationTime}}</span>
                </v-tooltip>
                {{item.fullName}}
            </template>
            <template #item.schoolName="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon small
                            v-on="on">mdi-school</v-icon>
                    </template>
                    <span>{{item.schoolNameAndAddress}}</span>
                </v-tooltip>
                {{splitOnNewline(item.schoolNameAndAddress)[0]}}
            </template>
            <template #item.contact="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon
                            v-on="on">mdi-phone</v-icon>
                    </template>
                    <span>{{item.phonePrimary}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon
                            v-on="on">mdi-email</v-icon>
                    </template>
                    <span>{{item.email}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon
                            v-on="on">mdi-facebook</v-icon>
                    </template>
                    <span>{{item.facebook}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon
                            v-on="on">mdi-linkedin</v-icon>
                    </template>
                    <span>{{item.linkedin}}</span>
                </v-tooltip>
            </template>
            <template #item.referrers="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on">
                            <v-icon small
                            v-on="on">mdi-account-tie</v-icon>
                        </span>
                    </template>
                    <span>
                        {{item.referrer1}}
                    </span>
                </v-tooltip>
                {{splitOnDelimeter(splitOnNewline(item.referrer1)[0],",")[0]}}
                <br>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on">
                            <v-icon small
                            v-on="on">mdi-account-tie</v-icon>
                        </span>
                    </template>
                    <span>
                        {{item.referrer2}}
                    </span>
                </v-tooltip>
                {{splitOnDelimeter(splitOnNewline(item.referrer2)[0],",")[0]}}
            </template>
            <template #item.action="{ item }">
                <span v-if="item.applicationId">
                    Exists
                </span>
                <span v-else>
                    <v-dialog
                        v-model="item.addFormClicked"
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
                                    @click="item.addFormClicked = false"
                                    style="position: absolute; right: 10px">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text style="height: 700px">
                                <Form v-bind:row="item" v-on:formUpdated="formUpdated"/>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="blue darken-1" text @click="addFormClicked = false">Close</v-btn>
                                <v-btn color="blue darken-1" text @click="saveApplication">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </span>
            </template>
            <!-- Expansion slot is currently disabled -->
            <template #expanded-item="{ headers, item}">
                <td :colspan="headers.length">
                    {{item.fullName}}
                </td>
            </template>
        </v-data-table>
    </v-content>
</template>

<script>
import axios from 'axios';
import endpoint from './../services/endpoint';
import { formField } from './../mixins/formField';
import Form from './../components/AddForm/Form';

export default {
    name: 'ImportData',
    mixins: [formField],
    components: {
        Form,
    },
    computed: {
        headers: function() {
            return [
                {text: 'Applicant', value: 'fullName',
                    sortable: false, width:"15%"},
                {text: 'Course', value: 'courseName',
                    sortable: false, width:"15%"},
                {text: 'School', value: 'schoolName',
                    sortable: false, width:"15%"},
                {text: 'Contact', value: 'contact',
                    sortable: false, width:"10%"},
                {text: 'Referrers', value: 'referrers',
                    sortable: false, width:"15%"},
                {text: 'Action', value: 'action',
                    sortable: false, width:"5%"},
            ]
        },
    },
    data: function(){
        return {
            gs_data: [],
            addFormClicked: false,
        }
    },
    methods: {
        getGoogleSheetData: function () {
        axios
            .get(endpoint.googleData.get)
            .then(response => {
                this.gs_data = response.data;
            }).catch(error => {
                console.error(error.response);
            });
        },
        addToGsData: function () {
            this.gs_data = this.gs_data.map(entry => {
                var addFormClicked = false;
                return Object.assign({}, entry, { addFormClicked })
            });
        },
        //savetoMongo
        saveApplication: function() {

        },
        formUpdated: function() {

        },
    },
    mounted: function() {
        this.getGoogleSheetData();
    }
}
</script>