<template>
    <div>
        <v-row>
            <v-col cols="8">
                <v-text-field
                    label="School Name"
                    v-model="school"
                    :rules="[rules.required]"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    label="Course Name"
                    v-model="name"
                    :rules="[rules.required]"
                    filled />
                <v-text-field
                    label="Course Semester"
                    hint="Spring/Fall 2020"
                    v-model="semester"
                    :rules="[rules.required]"
                    filled />
                <v-text-field
                    label="Approximate Tuition Fees"
                    v-model="fees"
                    filled />
            </v-col>
            <v-col cols=6>
                <v-text-field
                    label="Course Duration"
                    v-model="duration"
                    hint="In months"
                    filled />
                <v-textarea
                    filled
                    name="input-4-1"
                    v-model="otherScholarships"
                    hint="Format- $$$$: Rewarder"
                    label="Other scholarshipsIf any" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-subheader>School Address</v-subheader>
                <v-text-field
                    label="Line1"
                    v-model="address.line1"
                    filled/>
                <v-text-field
                    label="Line2"
                    v-model="address.line2"
                    filled/>
                <v-text-field
                    label="City"
                    v-model="address.city"
                    filled/>
                <v-text-field
                    label="Zipcode"
                    v-model="address.zipcode"
                    filled/>
                <v-text-field
                    label="State"
                    v-model="address.state"
                    filled/>
                <v-text-field
                    label="Country"
                    v-model="address.country"
                    filled/>
            </v-col>
            <v-col cols="6">
                <v-textarea
                filled
                v-bind:value="googleRowData"
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
    props: {
        googleRow: Object,
        application: Object,
        emitId: String,
    },
    mixins: [rules],
    watch: {
        courseDetails: function(value) {
            this.$emit('updateForm', {[this.emitId]: value});
        }
    },
    data: function() {
        return {
            school: null,
            duration: null,
            fees: null,
            semester: null,
            name: null,
            otherScholarships: null,
            address: {
                line1: null,
                line2: null,
                city: null,
                zipcode: null,
                state: null,
                country: null,
            },
            rules: rules,
        }
    },
    computed: {
        courseDetails: function() {
            return {
                school: this.school,
                name: this.name,
                address: this.address,
                semester: this.semester,
                duration: this.duration,
                fees: this.fees,
                otherScholarships: this.otherScholarships,
            }
        },
        googleRowData: function() {
            return this.googleRow.courseName + "\n"
                + this.googleRow.schoolNameAndAddress + "\n"
                + "Fees: " + this.googleRow.courseTuitionFee + "\n"
                + "OtherScholarships: " + this.googleRow.otherScholarships;
        },
    },
    methods: {
        setDataFromGoogleRow: function() {
            this.fees = this.googleRow.courseTuitionFee;
            this.otherScholarships = this.googleRow.otherScholarships;
            this.name = this.googleRow.courseName;
        },
        setDataFromApplication: function() {
            this.courseDuration = this.application.courseDetails.duration;
            this.courseFee = this.application.courseDetails.fees;
            this.courseSemester = this.application.courseDetails.semester;
            this.courseName = this.application.courseDetails.name;
            this.otherScholarships = this.application.courseDetails.otherScholarships;
            this.school = this.application.courseDetails.school;
        },
    },
    mounted: function() {
        (this.application.courseDetails)
           ? this.setDataFromApplication()
           : this.setDataFromGoogleRow();
    }
}
</script>