<template>
    <div>
        <div v-for="referrer in references"
            :key="referrer.firstName">
            <v-row>
                <v-col cols="1">
                    <v-autocomplete
                        v-model="referrer.salutation"
                        label="Salutation"
                        :items="salutations"
                        filled/>
                </v-col>
                <v-col cols="3.5">
                    <v-text-field
                    label="First Name"
                    v-model="referrer.firstName"
                    filled/>
                </v-col>
                <v-col cols="3.5">
                    <v-text-field
                    label="Middle Name"
                    v-model="referrer.middleName"
                    filled/>
                </v-col>
                <v-col cols="3.5">
                    <v-text-field
                    label="Last Name"
                    v-model="referrer.lastName"
                    filled/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="5">
                    <v-text-field
                    label="Position"
                    v-model="referrer.position"
                    filled/>
                </v-col>
                <v-col cols="7">
                    <v-text-field
                    label="Organization"
                    v-model="referrer.organization"
                    filled/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="5">
                    <v-text-field
                    label="Primary Email"
                    v-model="referrer.emailPrimary"
                    filled/>
                </v-col>
                <v-col cols="5">
                    <v-text-field
                    label="Secondary Email"
                    v-model="referrer.emailSecondary"
                    filled/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field
                    label="Primary Phone"
                    v-model="referrer.phonePrimary"
                    filled/>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                    label="Secondary Phone"
                    v-model="referrer.phoneSecondary"
                    filled/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="9">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            label="Line1"
                            v-model="referrer.address.line1"
                            filled/>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                            label="Zipcode"
                            v-model="referrer.address.zipcode"
                            filled/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            label="Line2"
                            v-model="referrer.address.line2"
                            filled/>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                            label="State"
                            v-model="referrer.address.state"
                            filled/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            label="City"
                            v-model="referrer.address.city"
                            filled/>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                            label="Country"
                            v-model="referrer.address.country"
                            filled/>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="3">
                    <v-textarea
                        filled
                        name="input-8-1"
                        v-bind:value="referrer.googleRowData"
                        label="GoogleSheet Data"
                        disabled />
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import { formField } from './../../mixins/formField';

export default {
    name: 'ReferrerForm',
    mixins: [formField],
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
                referrer1: this.references[0],
                referrer2: this.references[1],
            }
        },
    },
    data: function() {
        return {
            references: Array(2).fill({
                    saluation: null,
                    firstName: null,
                    middleName: null,
                    lastName: null,
                    position: null,
                    organization: null,
                    emailPrimary: null,
                    emailSecondary: null,
                    phonePrimary: null,
                    phoneSecondary: null,
                    address: {
                        line1: null,
                        line2: null,
                        city: null,
                        zipcode: null,
                        state: null,
                        country: null,
                    },
                    googleRowData: "Pre",
                }),
            salutations: ['Mr.', 'Mrs.', 'Miss'],
        }
    },
    methods: {
        setDataFromGoogleRow: function() {

        },
        setDataFromApplication: function() {
            this.referrer1 = this.application.referrers.referrer1;
            this.referrer2 = this.application.referrers.referrer2;
        },
    },
    mounted: function() {
        this.references[0].googleRowData = this.googleRow.referrer1;
        this.references[1].googleRowData = this.googleRow.referrer2;
        (this.application.referrers)
            ? this.setDataFromApplication()
            : this.setDataFromGoogleRow();
    }
}
</script>