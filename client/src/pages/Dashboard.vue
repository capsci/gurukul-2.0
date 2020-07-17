<template>
    <v-main class="container">
        <v-data-table
            :headers="headers"
            :items="myData"
            :items-per-page="10"
            class="elevation-1"
            show-expand single-expand
            fixed-header multi-sort>
            <template v-slot:top>
                <v-row>
                    <v-col cols=6>
                        <v-card
                            class="mx-auto"
                            max-width="400"
                            outlined >
                            <v-card-title>Application Status</v-card-title>
                            <v-card-text>
                                <v-row wrap justify="center">
                                    <v-switch
                                    v-model="filters.application.pending"
                                    label="Pending"/>
                                <v-switch
                                    v-model="filters.application.done"
                                    label="Done"/>
                                <v-switch
                                    v-model="filters.application.incomplete"
                                    label="Incomplete"/>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols=6>
                        <v-card
                            class="mx-auto"
                            max-width="400"
                            outlined >
                            <v-card-title>Application Material Status</v-card-title>
                            <v-card-text>
                                <v-row wrap justify="center">
                                    <v-switch
                                    v-model="filters.additionalDocs.incomplete"
                                    label="Incomplete"/>
                                <v-switch
                                    v-model="filters.additionalDocs.complete"
                                    label="Complete"/>
                                <v-switch
                                    v-model="filters.additionalDocs.verified"
                                    label="Verified"/>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
            <template #item.applicant="{ item }">
                <h3> {{ item.fullName }}</h3>
                <span class="contactDetails">
                    {{ item.emailPrimary }} | {{ item.phonePrimary }}
                </span>
            </template>
            <template #item.applicationStatus="{ item }">
                <h4>
                    {{ item.mmna[0].applicationStatus }} </h4>
                <ul class="contactDetails">
                    <li>Referrer1 ({{item.mmna[0].referrer1Status}})
                        <span v-if="item.mmna[0].referrer1Status == 'Done'">
                            <v-icon size="15">mdi-check</v-icon>
                        </span>
                        <span v-else>
                            <v-icon size="15">mdi-exclamation</v-icon>
                        </span>
                    </li>
                    <li>
                        Referrer2 ({{item.mmna[0].referrer2Status}})
                        <span v-if="item.mmna[0].referrer2Status == 'Done'">
                            <v-icon size="15">mdi-check</v-icon>
                        </span>
                        <span v-else>
                            <v-icon size="15">mdi-exclamation</v-icon>
                        </span>
                    </li>
                    <li>
                        Application Material ({{item.mmna[0].uploadedDocsStatus}})
                        <span v-if="item.mmna[0].uploadedDocsStatus == 'Verified'">
                            <v-icon size="15">mdi-check</v-icon>
                        </span>
                        <span v-else>
                            <v-icon size="15">mdi-exclamation</v-icon>
                        </span>
                    </li>
                </ul>
            </template>
            <template #expanded-item="{ headers, item}">
                <td :colspan="2">
                Address : {{item.line1}} <br> {{item.line2}} <br>
                    {{item.city}}, {{item.state}} - {{item.zipcode}}
                </td>
                <td :colspan="2">
                Referrers Details
                </td>
                <td :colspan="1">
                Uploaded Document Details
                </td>
                <td :colspan="1">
                Any other information
                </td>
            </template>
        </v-data-table>
    </v-main>
</template>

<script>
import api from './../services/api';

export default {
    name: 'Dashboard',
    data: function() {
        return {
            entries: [],
            error: null,
            filters : {
                application: {
                    pending: false,
                    incomplete: false,
                    done: false,
                },
                additionalDocs: {
                    incomplete: false,
                    complete: false,
                    verified: false,
                }
            },
        }
    },
    computed: {
        myData: function() {
            return this.entries.map(entry => {
                var fullName = this.fullName(entry);
                return Object.assign({}, entry, { fullName })
            }).filter(entry => {
                return !(this.filters.application.ending && this.filterPending(entry))
                    && !(this.filters.application.incomplete && this.filterIncomplete(entry))
                    && !(this.filters.application.done && this.filterDone(entry));
            });
        },
        headers: function() {
            return [
                {text: 'Name', value: 'applicant'},
                {text: 'Scholarship Semester', value: 'mmna[0].semester'},
                {text: 'Application Status', value: 'applicationStatus'},
                {text: 'Amount Given', value: 'mmna[0].amountGiven'},
                {text: 'Amount Pending', value: 'mmna[0].amountPending'},
                ];
        },
    },
    methods: {
        getData: function() {
            api.application
                .findAll()
                .then(response => {
                    this.entries = response.data;
                }).catch(error => {
                    this.error = error.response.data;
                });
        },
        fullName: function(entry) {
            return [entry.firstName, entry.middleName, entry.lastName]
                .filter(x => x!=null )
                .join(' ');
        },
        // filter on pending
        filterPending: function(entry) {
            console.log(entry);
            return false;
        },
        // filter on incomplete
        filterIncomplete: function(entry) {
            console.log(entry);
            return false;
        },
        // filter on done
        filterDone: function(entry) {
            console.log(entry.mmna[0].applicationStatus);
            return false;
        },
        filterVerified: function(entry) {
            return entry.mmna[0].uploadedDocsStatus == "Verified";
        }
    },
    mounted: function() {
        this.getData();
    }
}
</script>

<style scoped>
.contactDetails {
    font-size: 12px;
    font-style: oblique;
}

</style>