<template>
    <div>
        <v-row>
            <v-col cols="8">
                <v-text-field
                    label="College Name"
                    v-model="schoolName"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    label="Course Name"
                    v-model="courseName"
                    filled />
                <v-text-field
                    label="Course Semester"
                    hint="Spring/Fall 2020"
                    v-model="courseSemester"
                    filled />
                <v-text-field
                    label="Approximate Tuition Fees"
                    v-model="courseFee"
                    filled />
            </v-col>
            <v-col cols=6>
                <v-text-field
                    label="Course Duration"
                    v-model="courseDuration"
                    hint="In months"
                    filled />
                <v-textarea
                    filled
                    name="input-8-1"
                    v-model="otherScholarships"
                    hint="Format- $$$$: Rewarder"
                    label="Other scholarshipsIf any" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <AddressForm
                    @updateAddress="updateAddress" />
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
    props: ['row', 'emitId'],
    mixins: [formField],
    components: {
        AddressForm
    },
    watch: {
        universityDetails: function(value) {
            this.$emit('updateForm', {[this.emitId]: value});
        }
    },
    data: function() {
        return {
            schoolName: null,
            courseDuration: null,
            courseFee: null,
            courseSemester: null,
            courseName: null,
            otherScholarships: null,
            address: null,
        }
    },
    computed: {
        universityDetails: function() {
            return {
                courseDuration: this.courseDuration,
                courseFee: this.courseFee,
                courseSemester: this.courseSemester,
                courseName: this.courseName,
                otherScholarships: this.otherScholarships,
                schoolName: this.schoolName,
                address: this.address,
            }
        },
    },
    methods: {
        setDataFromGoogleRow: function() {
            this.courseFee = this.row.courseTuitionFee;
            this.otherScholarships = this.row.otherScholarships;
            this.courseName = this.row.courseName;
            this.schoolName = this.splitOnNewline(this.row.schoolNameAndAddress)[0];
        },
        updateAddress: function(value) {
            this.address = value;
        }
    },
    mounted: function() {
        this.setDataFromGoogleRow();
    }
}
</script>