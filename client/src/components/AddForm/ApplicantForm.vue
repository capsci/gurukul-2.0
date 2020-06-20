<template>
    <div>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="First Name"
                    v-model="applicant.name.first"
                    :rules="[rules.required, rules.noSpaces, rules.wordCharsOnly]"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Middle Name"
                    v-model="applicant.name.middle"
                    :rules="[rules.noSpaces, rules.wordCharsOnly]"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Last Name"
                    v-model="applicant.name.last"
                    :rules="[rules.noSpaces, rules.wordCharsOnly]"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Primary Email"
                    prepend-inner-icon="mdi-email"
                    v-model="applicant.email.primary"
                    :rules="[rules.required, rules.email]"
                    filled />
                <v-text-field
                    label="Secondary Email"
                    prepend-inner-icon="mdi-email"
                    v-model="applicant.email.secondary"
                    :rules="[rules.email]"
                    filled />
            </v-col>
            <v-col cols="3">
                <v-text-field
                    label="Primary Phone Number"
                    :messages="'USA (if possible)'"
                    prepend-inner-icon="mdi-phone"
                    v-model="applicant.phone.primary"
                    :rules="[rules.required, rules.phoneNum]"
                    filled />
                <v-text-field
                    label="Secondary Phone Number"
                    prepend-inner-icon="mdi-phone"
                    v-model="applicant.phone.secondary"
                    :rules="[rules.phoneNum]"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Link to Facebook Profile"
                    prepend-inner-icon="mdi-facebook"
                    v-model="applicant.socialMedia.facebook"
                    :rules="[rules.noSpaces]"
                    filled />
                <v-text-field
                    label="Link to LinkedIn Profile"
                    prepend-inner-icon="mdi-linkedin"
                    v-model="applicant.socialMedia.linkedin"
                    :rules="[rules.noSpaces]"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Date of Birth"
                    type="date"
                    v-model="applicant.dob"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="US Visa Status"
                    v-model="applicant.USAVisaStatus"
                    :rules="[rules.required]"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Entry Date in USA"
                    type="date"
                    v-model="applicant.USAEntryDate"
                    filled />
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
                <v-text-field
                    label="Name"
                    v-model="applicant.parent.name"
                    :rules="[rules.wordCharsOnly]"
                    filled />
                <v-text-field
                    label="Line1"
                    v-model="applicant.parent.address.line1"
                    filled/>
                <v-text-field
                    label="Line2"
                    v-model="applicant.parent.address.line2"
                    filled/>
                <v-text-field
                    label="City"
                    v-model="applicant.parent.address.city"
                    filled/>
                <v-text-field
                    label="Zipcode"
                    v-model="applicant.parent.address.zipcode"
                    filled/>
                <v-text-field
                    label="State"
                    v-model="applicant.parent.address.state"
                    filled/>
                <v-text-field
                    label="Country"
                    v-model="applicant.parent.address.country"
                    filled/>
            </v-col>
            <v-col cols="6">
                <v-subheader>US Address</v-subheader>
                <v-text-field
                    label="Line1"
                    v-model="applicant.address.line1"
                    filled/>
                <v-text-field
                    label="Line2"
                    v-model="applicant.address.line2"
                    filled/>
                <v-text-field
                    label="City"
                    v-model="applicant.address.city"
                    filled/>
                <v-text-field
                    label="Zipcode"
                    v-model="applicant.address.zipcode"
                    filled/>
                <v-text-field
                    label="State"
                    v-model="applicant.address.state"
                    filled/>
                <v-text-field
                    label="Country"
                    v-model="applicant.address.country"
                    filled/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { rules } from './../../mixins/formHelper';

export default {
    name: 'ApplicantForm',
    mixins: [rules],
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