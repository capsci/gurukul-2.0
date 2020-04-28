<template>
    <div>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="First Name"
                    v-bind:value="firstName"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Middle Name"
                    v-bind:value="middleName"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Last Name"
                    v-bind:value="lastName"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Primary Email"
                    prepend-inner-icon="mdi-email"
                    v-bind:value="emailPrimary"
                    filled />
                <v-text-field
                    label="Secondary Email"
                    prepend-inner-icon="mdi-email"
                    v-bind:value="emailSecondary"
                    filled />
            </v-col>
            <v-col cols="3">
                <v-text-field
                    label="Primary Phone Number"
                    :messages="['USA (if possible)']"
                    prepend-inner-icon="mdi-phone"
                    v-bind:value="phonePrimary"
                    filled />
                <v-text-field
                    label="Secondary Phone Number"
                    prepend-inner-icon="mdi-phone"
                    v-bind:value="phoneSecondary"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Link to Facebook Profile"
                    prepend-inner-icon="mdi-facebook"
                    v-bind:value="facebook"
                    filled />
                <v-text-field
                    label="Link to LinkedIn Profile"
                    prepend-inner-icon="mdi-linkedin"
                    v-bind:value="linkedin"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Date of Birth"
                    type="date"
                    v-bind:value="dateOfBirth"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="US Visa Status"
                    v-bind:value="usVisaStatus"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Entry Date in USA"
                    type="date"
                    v-bind:value="usEntryDate"
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
                    v-bind:value="parentName"
                    filled />
                <AddressForm />
            </v-col>
            <v-col cols="6">
                <v-subheader>US Address</v-subheader>
                <AddressForm />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import AddressForm from './AddressForm';
import { formField } from './../../mixins/formField'

export default {
    name: 'ApplicantForm',
    props: ['row'],
    mixins: [formField],
    components: {
        AddressForm
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
            inUSA: false,
            usVisaStatus: null,
            usEntryDate: null,
        }
    },
    methods: {
        setDataFromGoogleRow: function() {
            if (!this.row) {
                return;
            }
            [this.firstName, this.middleName, this.lastName] = this.splitOnWhitespaceAndDelimeters(this.row.fullName);
            if (!this.lastName) {
                this.lastName = this.middleName;
                this.middleName = null;
            }
            this.phonePrimary = this.row.phonePrimary;
            [this.emailPrimary, this.emailSecondary] = this.splitOnWhitespaceAndDelimeters(this.row.email);
            this.facebook = this.row.facebook;
            this.linkedin = this.row.linkedin;
        },
    },
    mounted: function() {
        this.setDataFromGoogleRow();
    }
}
</script>

<style scoped>

</style>