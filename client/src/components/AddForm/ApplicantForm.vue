<template>
    <div>
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
import { formField } from './../../mixins/formField'

export default {
    name: 'ApplicantForm',
    props: ['row', 'emitId'],
    mixins: [formField],
    components: {
        AddressForm
    },
    watch: {
        applicant: function() {
            this.updateForm();
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
            usAddress: null
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
        updateForm: function(){
            this.$emit('updateForm', {[this.emitId]: this.applicant});
        },
        updateAddress: function(key, value) {
            this[key] = value;
        }
    },
    mounted: function() {
        this.setDataFromGoogleRow();
    }
}
</script>

<style scoped>

</style>