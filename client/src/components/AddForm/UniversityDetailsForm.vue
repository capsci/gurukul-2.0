<template>
    <div>
        <v-row>
            <v-col cols="8">
                <v-text-field-ext
                    label="School Name"
                    v-model="university.name"
                    :rules="[rules.required]" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field-ext
                    label="Course Name"
                    v-model="university.courseName"
                    :rules="[rules.required]" />
                <v-text-field-ext
                    label="Course Semester"
                    hint="Spring/Fall 2020"
                    v-model="university.semester"
                    :rules="[rules.required]" />
                <v-text-field-ext
                    label="Approximate Tuition Fees"
                    v-model="university.fees" />
            </v-col>
            <v-col cols=6>
                <v-text-field-ext
                    label="Course Duration"
                    v-model="university.courseDuration"
                    hint="In months" />
                <v-textarea-ext
                    name="input-4-1"
                    v-model="university.otherScholarships"
                    hint="Format- $$$$: Rewarder"
                    label="Other scholarshipsIf any" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-subheader>School Address</v-subheader>
                <v-text-field-ext
                    label="Line1"
                    v-model="university.address.line1" />
                <v-text-field-ext
                    label="Line2"
                    v-model="university.address.line2" />
                <v-text-field-ext
                    label="City"
                    v-model="university.address.city" />
                <v-text-field-ext
                    label="Zipcode"
                    v-model="university.address.zipcode" />
                <v-text-field-ext
                    label="State"
                    v-model="university.address.state" />
                <v-text-field-ext
                    label="Country"
                    v-model="university.address.country" />
            </v-col>
            <v-col cols="6">
                <v-textarea-ext
                    v-bind:value="googleMetaData.universityDetails"
                    label="GoogleSheet Data"
                    disabled />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { rules } from './../../mixins/formHelper';
import { VTextFieldExt, VTextareaExt } from './../extended/VForm';

export default {
    name: 'UniversityDetailsForm',
    mixins: [rules],
    components: {
        VTextFieldExt,
        VTextareaExt,
    },
    data: function() {
        var application = this.$store.getters.application;
        return {
            university: application.info.university,
            googleMetaData: application.googleMetaData,
            rules: rules,
        }
    },
}
</script>