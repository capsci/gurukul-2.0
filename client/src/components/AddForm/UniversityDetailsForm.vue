<template>
    <div>
        <v-row>
            <v-col cols="8">
                <v-text-field
                    label="College Name"
                    v-bind:value="schoolName"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    label="Course Name"
                    v-bind:value="courseName"
                    filled />
                <v-text-field
                    label="Course Semester"
                    hint="Spring/Fall 2020"
                    v-bind:value="courseSemester"
                    filled />
                <v-text-field
                    label="Approximate Tuition Fees"
                    v-bind:value="courseFee"
                    filled />
            </v-col>
            <v-col cols=6>
                <v-textarea
                filled
                name="input-8-1"
                v-bind:value="otherScholarships"
                hint="Format- $$$$: Rewarder"
                label="Other scholarshipsIf any" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <AddressForm />
            </v-col>
            <v-col cols="6">
                <v-textarea
                filled
                name="input-8-1"
                v-bind:value="row.schoolNameAndAddress"
                label="GoogleSheet Data"
                disabled />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import AddressForm from './AddressForm';
import { formField } from './../../mixins/formField'

export default {
    name: 'UniversityDetailsForm',
    props: ['row'],
    mixins: [formField],
    components: {
        AddressForm
    },
    data: function() {
        return {
            courseDuration: null,
            courseFee: null,
            courseSemester: null,
            courseName: null,
            otherScholarships: null,
            schoolName: null,
            addressLine1: null,
            addressLine2: null,
            addressCity: null,
            addressZipcode: null,
            addressState: null,
            addressIndia: null,
        }
    },
    methods: {
        setDataFromGoogleRow: function() {
            this.courseFee = this.row.courseTuitionFee;
            this.otherScholarships = this.row.otherScholarships;
            this.courseName = this.row.courseName;
            this.schoolName = this.splitOnNewline(this.row.schoolNameAndAddress)[0];
        }
    },
    mounted: function() {
        this.setDataFromGoogleRow();
    }
}
</script>