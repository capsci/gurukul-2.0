<template>
    <div>
        <v-row>
            <v-col cols="4">
                <v-text-field-ext
                    label="First Name"
                    v-model="applicant.name.first"
                    :rules="[rules.required, rules.noSpaces, rules.wordCharsOnly]" />
            </v-col>
            <v-col cols="4">
                <v-text-field-ext
                    label="Middle Name"
                    v-model="applicant.name.middle"
                    :rules="[rules.noSpaces, rules.wordCharsOnly]" />
            </v-col>
            <v-col cols="4">
                <v-text-field-ext
                    label="Last Name"
                    v-model="applicant.name.last"
                    :rules="[rules.noSpaces, rules.wordCharsOnly]" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field-ext
                    label="Primary Email"
                    prepend-inner-icon="mdi-email"
                    v-model="applicant.email.primary"
                    :rules="[rules.required, rules.email]" />
                <v-text-field-ext
                    label="Secondary Email"
                    prepend-inner-icon="mdi-email"
                    v-model="applicant.email.secondary"
                    :rules="[rules.email]" />
            </v-col>
            <v-col cols="3">
                <v-text-field-ext
                    label="Primary Phone Number"
                    :messages="'USA (if possible)'"
                    prepend-inner-icon="mdi-phone"
                    v-model="applicant.phone.primary"
                    :rules="[rules.required, rules.phoneNum]" />
                <v-text-field-ext
                    label="Secondary Phone Number"
                    prepend-inner-icon="mdi-phone"
                    v-model="applicant.phone.secondary"
                    :rules="[rules.phoneNum]" />
            </v-col>
            <v-col cols="4">
                <v-text-field-ext
                    label="Link to Facebook Profile"
                    prepend-inner-icon="mdi-facebook"
                    v-model="applicant.socialMedia.facebook"
                    :rules="[rules.noSpaces]" />
                <v-text-field-ext
                    label="Link to LinkedIn Profile"
                    prepend-inner-icon="mdi-linkedin"
                    v-model="applicant.socialMedia.linkedin"
                    :rules="[rules.noSpaces]" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field-ext
                    label="Date of Birth"
                    type="date"
                    v-model="applicant.dob" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field-ext
                    label="US Visa Status"
                    v-model="applicant.USAVisaStatus"
                    :rules="[rules.required]" />
            </v-col>
            <v-col cols="4">
                <v-text-field-ext
                    label="Entry Date in USA"
                    type="date"
                    v-model="applicant.USAEntryDate" />
            </v-col>
            <v-col cols="4">
                <v-switch
                    v-model="applicant.inUSA"
                    v-bind:label="applicant.inUSA ? 'In USA' : 'Not In USA'"
                ></v-switch>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-subheader>Parents Name & Address</v-subheader>
                <v-text-field-ext
                    label="Name"
                    v-model="applicant.parent.name"
                    :rules="[rules.wordCharsOnly]" />
                <v-text-field-ext
                    label="Line1"
                    v-model="applicant.parent.address.line1" />
                <v-text-field-ext
                    label="Line2"
                    v-model="applicant.parent.address.line2" />
                <v-text-field-ext
                    label="City"
                    v-model="applicant.parent.address.city" />
                <v-text-field-ext
                    label="Zipcode"
                    v-model="applicant.parent.address.zipcode" />
                <v-text-field-ext
                    label="State"
                    v-model="applicant.parent.address.state" />
                <v-text-field-ext
                    label="Country"
                    v-model="applicant.parent.address.country" />
            </v-col>
            <v-col cols="6">
                <v-subheader>US Address</v-subheader>
                <v-text-field-ext
                    label="Line1"
                    v-model="applicant.address.line1" />
                <v-text-field-ext
                    label="Line2"
                    v-model="applicant.address.line2" />
                <v-text-field-ext
                    label="City"
                    v-model="applicant.address.city" />
                <v-text-field-ext
                    label="Zipcode"
                    v-model="applicant.address.zipcode" />
                <v-text-field-ext
                    label="State"
                    v-model="applicant.address.state" />
                <v-text-field-ext
                    label="Country"
                    v-model="applicant.address.country" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { rules } from './../../mixins/formHelper';
import { VTextFieldExt } from './../extended/VForm';

export default {
    name: 'ApplicantForm',
    mixins: [rules],
    components: {
        VTextFieldExt,
    },
    data() {
        return {
            applicant: this.$store.getters.application.applicant,
            rules    : rules,
        }
    },
}
</script>

<style scoped>

</style>