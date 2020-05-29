<template>
    <div>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="First Name"
                    v-model="firstName"
                    :rules="[rules.required, rules.noSpaces, rules.wordCharsOnly]"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Middle Name"
                    v-model="middleName"
                    :rules="[rules.noSpaces, rules.wordCharsOnly]"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Last Name"
                    v-model="lastName"
                    :rules="[rules.noSpaces, rules.wordCharsOnly]"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Primary Email"
                    prepend-inner-icon="mdi-email"
                    v-model="emailPrimary"
                    :rules="[rules.required, rules.email]"
                    filled />
                <v-text-field
                    label="Secondary Email"
                    prepend-inner-icon="mdi-email"
                    v-model="emailSecondary"
                    :rules="[rules.email]"
                    filled />
            </v-col>
            <v-col cols="3">
                <v-text-field
                    label="Primary Phone Number"
                    :messages="'USA (if possible)'"
                    prepend-inner-icon="mdi-phone"
                    v-model="phonePrimary"
                    :rules="[rules.required, rules.phoneNum]"
                    filled />
                <v-text-field
                    label="Secondary Phone Number"
                    prepend-inner-icon="mdi-phone"
                    v-model="phoneSecondary"
                    :rules="[rules.phoneNum]"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Link to Facebook Profile"
                    prepend-inner-icon="mdi-facebook"
                    v-model="facebook"
                    :rules="[rules.noSpaces]"
                    filled />
                <v-text-field
                    label="Link to LinkedIn Profile"
                    prepend-inner-icon="mdi-linkedin"
                    v-model="linkedin"
                    :rules="[rules.noSpaces]"
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
                    :rules="[rules.required]"
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
                    :rules="[rules.wordCharsOnly]"
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
import { rules, sanitize } from './../../mixins/formHelper';

export default {
    name: 'ApplicantForm',
    props: {
        googleRow: Object,
        application: Object,
        emitId: String,
    },
    mixins: [rules, sanitize],
    components: {
        AddressForm,
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
            rules: rules,
        }
    },
    methods: {
        setDataFromGoogleRow: function() {
            [this.firstName, this.middleName, this.lastName] = sanitize.extractNameFields(this.googleRow.fullName);
            this.phonePrimary = this.googleRow.phonePrimary;
            [this.emailPrimary, this.emailSecondary] = sanitize.splitOnWhitespaceAndDelimeters(this.googleRow.email);
            this.facebook = this.googleRow.facebook;
            this.linkedin = this.googleRow.linkedin;
        },
        setDataFromApplication: function() {
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
       (this.application.applicant)
           ? this.setDataFromApplication()
           : this.setDataFromGoogleRow();
    }
}
</script>

<style scoped>

</style>