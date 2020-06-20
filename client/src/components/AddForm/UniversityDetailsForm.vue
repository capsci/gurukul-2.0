<template>
    <div>
        <v-row>
            <v-col cols="8">
                <v-text-field
                    label="School Name"
                    v-model="university.name"
                    :rules="[rules.required]"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    label="Course Name"
                    v-model="university.courseName"
                    :rules="[rules.required]"
                    filled />
                <v-text-field
                    label="Course Semester"
                    hint="Spring/Fall 2020"
                    v-model="university.semester"
                    :rules="[rules.required]"
                    filled />
                <v-text-field
                    label="Approximate Tuition Fees"
                    v-model="university.fees"
                    filled />
            </v-col>
            <v-col cols=6>
                <v-text-field
                    label="Course Duration"
                    v-model="university.courseDuration"
                    hint="In months"
                    filled />
                <v-textarea
                    filled
                    name="input-4-1"
                    v-model="university.otherScholarships"
                    hint="Format- $$$$: Rewarder"
                    label="Other scholarshipsIf any" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-subheader>School Address</v-subheader>
                <v-text-field
                    label="Line1"
                    v-model="university.address.line1"
                    filled/>
                <v-text-field
                    label="Line2"
                    v-model="university.address.line2"
                    filled/>
                <v-text-field
                    label="City"
                    v-model="university.address.city"
                    filled/>
                <v-text-field
                    label="Zipcode"
                    v-model="university.address.zipcode"
                    filled/>
                <v-text-field
                    label="State"
                    v-model="university.address.state"
                    filled/>
                <v-text-field
                    label="Country"
                    v-model="university.address.country"
                    filled/>
            </v-col>
            <v-col cols="6">
                <v-textarea
                filled
                v-bind:value="googleMetaData.universityDetails"
                label="GoogleSheet Data"
                disabled />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { rules } from './../../mixins/formHelper';

export default {
    name: 'UniversityDetailsForm',
    mixins: [rules],
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