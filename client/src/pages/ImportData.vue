<template>
    <v-main class="container">
        <v-data-table
            :headers="headers"
            :items="gs_data"
            height="500"
            :search="filterString"
            :custom-filter="customFilter"
            item-key="applicationTime">
            <!-- TODO : v-slot:top with search filter -->
            <template v-slot:top>
                <v-row class="text-center">
                    <v-col cols="4" />
                    <v-col>
                        <v-text-field
                            v-model="filters.applicantName"
                            label="Applicant Name"
                            append-icon="mdi-account-search" />
                    </v-col>
                    <v-col cols="2">
                            <v-select
                                v-model="filters.applicationState"
                                :items="applicationStates"
                                label="Application Status" />
                    </v-col>
                    <v-col cols="4" />
                </v-row>
            </template>
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
                <span>
                    <v-dialog
                        v-model="item.showDialog"
                        persistent scrollable
                        max-width="1200px">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                v-if="item.applicationId"
                                color="primary" dark small v-on="on">
                                Edit
                                <v-icon>Edit mdi-account-edit</v-icon>
                            </v-btn>
                            <v-btn v-else color="primary" dark small v-on="on">
                                Add
                                <v-icon>Add mdi-account-plus</v-icon>
                            </v-btn>
                        </template>
                        <FormCard
                            v-bind:googleRow="item"
                            v-bind:formTitle="`${item.applicationId ? 'Edit Application': 'Add New Application'} `"
                            v-on:closeDialog="closeDialog(item)"/>
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
    </v-main>
</template>

<script>
import api from './../services/api';
import { formField } from './../mixins/formField';
import FormCard from './../components/AddForm/FormCard';

export default {
    name: 'ImportData',
    mixins: [formField],
    components: {
        FormCard,
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
                    sortable: false, width:"10%"},
            ]
        },
        filterString: function() {
            // Since v-data-table 'search' only takes string
            //    and we need to filter on multiple values
            return this.filters.applicationState + '+'
                + this.filters.applicantName;
        }
    },
    data: function(){
        return {
            gs_data: [],
            applicationStates: ['All', 'Added', 'Pending'],
            filters: {
                applicationState: 'All',
                applicantName: '',
            },
        }
    },
    methods: {
        getGoogleSheetData: function () {
            api.googleData
                .getGoogleData()
                .then(response => {
                    this.gs_data = response.data;
                }).catch(error => {
                    console.error(error.response);
                });
        },
        addToGsData: function () {
            this.gs_data = this.gs_data.map(entry => {
                var showDialog = false;
                return Object.assign({}, entry, { showDialog })
            });
        },
        closeDialog: function(item) {
            item.showDialog = false;
        },
        customFilter: function( value, search, item) {
            if ( (item.applicationId)
                && this.filters.applicationState=='Pending') {
                    return false;
            }
            if ( !(item.applicationId)
                && this.filters.applicationState=='Added') {
                    return false;
            }

            var lc_fullName = item.fullName.toLowerCase();
            var lc_searchName = this.filters.applicantName.toLowerCase();
            return lc_fullName.indexOf(lc_searchName) != -1;
        }
    },
    mounted: function() {
        this.getGoogleSheetData();
    }
}
</script>