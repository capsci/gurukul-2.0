<template>
    <div>
        <v-row>
            <v-col cols="6">
                <Autocomplete
                    :entries="referrerEntries"
                    :label="`Referrer 1 Name`"
                    :additemtext="addReferrerItemText"
                    :selectedItemId="referrer1"
                    @selectItem="selectedReferrer1">
                    <template slot="itemTemplate" slot-scope="{ item }">
                        <div>
                            <h3>
                                <span v-if="item.salutaion">
                                    {{item.salutaion}}.
                                </span> {{item.firstName}} {{item.lastName}}
                            </h3>
                            <h4>
                                <span v-if="item.position">
                                    {{item.position}}.
                                </span> {{item.organization}}
                            </h4>
                            <h4>{{item.emails.toString()}}</h4>
                            <v-divider />
                        </div>
                    </template>
                    <template slot="selectionTemplate" slot-scope="{ item }">
                        <span v-if="item.salutaion">
                                {{item.salutaion}}.
                        </span> {{item.firstName}} {{item.lastName}}
                        <span v-if="item.organization">
                            , {{item.organization}}
                        </span>
                    </template>
                </Autocomplete>
            </v-col>
            <v-col cols="6">
                <Autocomplete
                    :entries="referrerEntries"
                    :label="`Referrer 2 Name`"
                    :additemtext="addReferrerItemText"
                    :selectedItemId="referrer2"
                    @selectItem="selectedReferrer2">
                    <template slot="itemTemplate" slot-scope="{ item }">
                        <div>
                            <h3>
                                <span v-if="item.salutaion">
                                    {{item.salutaion}}.
                                </span> {{item.firstName}} {{item.lastName}}
                            </h3>
                            <h4>
                                <span v-if="item.position">
                                    {{item.position}}.
                                </span> {{item.organization}}
                            </h4>
                            <h4>{{item.emails.toString()}}</h4>
                            <v-divider />
                        </div>
                    </template>
                    <template slot="selectionTemplate" slot-scope="{ item }">
                        <span v-if="item.salutaion">
                                {{item.salutaion}}.
                        </span> {{item.firstName}} {{item.lastName}}
                        <span v-if="item.organization">
                            , {{item.organization}}
                        </span>
                    </template>
                </Autocomplete>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-textarea
                filled
                name="input-8-1"
                v-bind:value="googleRow.referrer1"
                label="GoogleSheet Data"
                disabled />
            </v-col>
            <v-col cols="6">
                <v-textarea
                filled
                name="input-8-1"
                v-bind:value="googleRow.referrer2"
                label="GoogleSheet Data"
                disabled />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import api from './../../services/api';
import { formField } from './../../mixins/formField';
import Autocomplete from './../Autocomplete';

export default {
    name: 'ReferrerForm',
    mixins: [formField],
    components: {
        Autocomplete,
    },
    props: {
        googleRow: Object,
        application: Object,
        emitId: String,
    },
    watch: {
        referrers: function(value) {
            this.$emit('updateForm', {[this.emitId] : value});
        },
    },
    computed: {
        referrers: function() {
            return {
                referrer1: this.referrer1,
                referrer2: this.referrer2,
            }
        },
    },
    data: function() {
        return {
            referrer1: null,
            referrer2: null,
            referrerEntries: [],
        }
    },
    methods: {
        setDataFromGoogleRow: function() {

        },
        setDataFromApplication: function() {
            this.referrer1 = this.application.referrers.referrer1;
            this.referrer2 = this.application.referrers.referrer2;
        },
        populateReferrerEntries: function() {
            return api.referrer
                .findAll()
                .then(response => {
                    this.referrerEntries = response.data;
                }).catch(error => {
                    console.error(error.response);
                });
        },
        addReferrerItemText: function(entry) {
            var items = [entry.firstName,
                entry.middleName,
                entry.lastName];
            return items
                .concat(entry.emails)
                .filter(x => x!=null )
                .join(', ');
        },
        selectedReferrer1: function(selected) {
            this.referrer1 = (selected)
                ? selected._id : null;
        },
        selectedReferrer2: function(selected) {
            this.referrer2 = (selected)
                ? selected._id : null;
        }
    },
    mounted: async function() {
        await this.populateReferrerEntries();
        (this.application.referrers)
            ? this.setDataFromApplication()
            : this.setDataFromGoogleRow();
        this.ready=true;
    }
}
</script>