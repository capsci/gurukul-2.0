<template>
    <div>
        <v-row>
            <Autocomplete
                :entries="collegeEntries"
                :label="collegeEntriesLabel"
                :additemtext="addCollegeItemText">
                <template slot="itemTemplate" slot-scope="{ item }">
                    <h3>{{item.name}}</h3>
                    <h4>{{item.city}}, {{item.country}}</h4>
                </template>
                <template slot="selectionTemplate" slot-scope="{ item }">
                    {{item.name}}, {{item.city}}
                </template>
            </Autocomplete>
        </v-row>
        <v-row>
            <Autocomplete
                :entries="referrerEntries"
                :label="referrerEntriesLabel"
                :additemtext="addReferrerItemText">
                <template slot="itemTemplate" slot-scope="{ item }">
                    <h3>{{item.firstName}} {{item.lastName}}</h3>
                    <h4>{{item.position}}, {{item.organization}}</h4>
                    <h4>{{item.email}}</h4>
                </template>
                <template slot="selectionTemplate" slot-scope="{ item }">
                    {{item.firstName}} {{item.lastName}}, {{item.organization}}
                </template>
            </Autocomplete>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="First Name"
                    v-model="firstName"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Middle Name"
                    v-model="middleName"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Last Name"
                    v-model="lastName"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Primary Email"
                    prepend-inner-icon="mdi-email"
                    v-model="emailPrimary"
                    filled />
                <v-text-field
                    label="Secondary Email"
                    prepend-inner-icon="mdi-email"
                    v-model="emailSecondary"
                    filled />
            </v-col>
            <v-col cols="3">
                <v-text-field
                    label="Primary Phone Number"
                    :messages="['USA (if possible)']"
                    prepend-inner-icon="mdi-phone"
                    v-model="phonePrimary"
                    filled />
                <v-text-field
                    label="Secondary Phone Number"
                    prepend-inner-icon="mdi-phone"
                    v-model="phoneSecondary"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Link to Facebook Profile"
                    prepend-inner-icon="mdi-facebook"
                    v-model="facebook"
                    filled />
                <v-text-field
                    label="Link to LinkedIn Profile"
                    prepend-inner-icon="mdi-linkedin"
                    v-model="linkedin"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Date of Birth"
                    type="date"
                    v-model="dateOfBirth"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="US Visa Status"
                    v-model="usVisaStatus"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Entry Date in USA"
                    type="date"
                    v-model="usEntryDate"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-switch
                v-model="inUSA"
                v-bind:label="inUSA ? 'In USA' : 'Not In USA'"
                ></v-switch>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-subheader>Parents Address</v-subheader>
                <v-text-field
                    label="Name"
                    v-model="parentName"
                    filled />
                <AddressForm
                    @updateAddress="updateAddress('parentAddress', $event)" />
            </v-col>
            <v-col cols="6">
                <v-subheader>US Address</v-subheader>
                <AddressForm
                    @updateAddress="updateAddress('usAddress', $event)" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import AddressForm from './AddressForm';
import { formField } from './../../mixins/formField';

import Autocomplete from './../Autocomplete';

export default {
    name: 'ApplicantForm',
    props: {
        googleRow: Object,
        application: Object,
        emitId: String,
    },
    mixins: [formField],
    components: {
        AddressForm,
        Autocomplete,
    },
    watch: {
        applicant: function(value) {
            this.$emit('updateForm', {[this.emitId]: value});
        }
    },
    computed: {
        applicant: function() {
            return {
                firstName: this.firstName,
                middleName: this.middleName,
                lastName: this.lastName,
                emailPrimary: this.emailPrimary,
                emailSecondary: this.emailSecondary,
                phonePrimary: this.phonePrimary,
                phoneSecondary: this.phoneSecondary,
                linkedin: this.linkedin,
                facebook: this.facebook,
                dateOfBirth: this.dateOfBirth,
                parentName: this.parentName,
                inUSA: this.inUSA,
                usVisaStatus: this.usVisaStatus,
                usEntryDate: this.usEntryDate,
                parentAddress: this.parentAddress,
                usAddress: this.usAddress,
            }
        },
    },
    data() {
        return {
            firstName: null,
            middleName: null,
            lastName: null,
            emailPrimary: null,
            emailSecondary: null,
            phonePrimary: null,
            phoneSecondary: null,
            linkedin: null,
            facebook: null,
            dateOfBirth: null,
            parentName: null,
            inUSA: false,
            usVisaStatus: null,
            usEntryDate: null,
            parentAddress: null,
            usAddress: null,
            collegeEntriesLabel: "College Name",
            collegeEntries: [
                {name: 'North Carolina State University', city:'Raleigh', state: 'NC', country:'USA', colloquial: ['NCSU', 'NCState']},
                {name: 'Massachusetts Institute of Technology', city:'Cambridge', state: 'MA', country:'USA', colloquial: ['MIT']},
                {name: 'University of Washington', city:'Seattle', state: 'WA', country:'USA'},
            ],
            referrerEntriesLabel: "Referrer Name",
            referrerEntries: [
                {firstName: 'Tree', lastName: 'Hugger', phonePrimary: '1234', position:'President', organization:'SaveTheTrees', email:'plant1@forest.com', address:'betterworld'},
                {firstName: 'Evil', lastName: 'Twin', phonePrimary: '4321', position:'Demolisher', organization:'FeedTheFactories', email:'burnall@coal.com', address:'RichesLand'},
            ],
            // Since passed props need to be data
            addCollegeItemText: function(entry) {
                var items = entry.colloquial || [];
                return items
                    .concat(entry.name)
                    .filter(x => x!=null )
                    .join(', ');
            },
            addReferrerItemText: function(entry) {
                return [entry.firstName, entry.middleName,
                        entry.lastName, entry.emailPrimary,
                        entry.emailSecondary]
                        .filter(x => x!=null )
                        .join(', ');
            }
        }
    },
    methods: {
        setDataFromGoogleRow: function() {
            console.log("Setting data from google row");
            [this.firstName, this.middleName, this.lastName] = this.extractNameFields(this.googleRow.fullName);
            this.phonePrimary = this.googleRow.phonePrimary;
            [this.emailPrimary, this.emailSecondary] = this.splitOnWhitespaceAndDelimeters(this.googleRow.email);
            this.facebook = this.googleRow.facebook;
            this.linkedin = this.googleRow.linkedin;
        },
        setDataFromApplication: function() {
            console.log("Setting data from application");
            this.firstName = this.application.applicant.firstName;
            this.middleName = this.application.applicant.middleName;
            this.lastName  = this.application.applicant.lastName;
            this.emailPrimary = this.application.applicant.emailPrimary;
            this.emailSecondary = this.application.applicant.emailSecondary;
            this.phonePrimary = this.application.applicant.phonePrimary;
            this.phoneSecondary = this.application.applicant.phoneSecondary;
            this.linkedin = this.application.applicant.linkedin;
            this.facebook = this.application.applicant.facebook;
            this.dateOfBirth = this.application.applicant.dateOfBirth;
            this.parentName = this.application.applicant.parentName;
            this.inUSA = this.application.applicant.inUSA;
            this.usVisaStatus = this.application.applicant.usVisaStatus;
            this.usEntryDate = this.application.applicant.usEntryDate;
            this.parentAddress = this.application.applicant.parentAddress;
            this.usAddress = this.application.applicant.usAddress;
        }
    },
    mounted: function() {
        console.log(this.application);
        console.log(this.application.applicant);
        console.log(this.application._id);
       (this.application._id)
           ? this.setDataFromApplication()
           : this.setDataFromGoogleRow();
    }
}
</script>

<style scoped>

</style>