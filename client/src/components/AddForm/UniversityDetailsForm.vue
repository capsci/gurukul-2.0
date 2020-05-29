<template>
    <div v-if="ready">
        <v-row>
            <v-col cols="8">
                <Autocomplete
                    :entries="collegeEntries"
                    :label="`College Name`"
                    :additemtext="addCollegeItemText"
                    :selectedItemId="school"
                    @selectItem="selectedSchool">
                    <template slot="itemTemplate" slot-scope="{ item }">
                        <h3>{{item.name}}</h3>
                        <h4>{{item.city}}, {{item.country}}</h4>
                    </template>
                    <template slot="selectionTemplate" slot-scope="{ item }">
                        {{item.name}}, {{item.city}}
                    </template>
                </Autocomplete>
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
import axios from 'axios';
import endpoint from './../../services/endpoint';
import Autocomplete from './../Autocomplete';
import { rules } from './../../mixins/formHelper';

export default {
    name: 'UniversityDetailsForm',
    props: {
        googleRow: Object,
        application: Object,
        emitId: String,
    },
    components: {
        Autocomplete,
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
            collegeEntries: [],
            ready: false,
            rules: rules,
        }
    },
    computed: {
        courseDetails: function() {
            return {
                school: this.school,
                name: this.name,
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
        populateCollegeEntries: function() {
            return axios
                .get(endpoint.school.findAll)
                .then(response => {
                    this.collegeEntries = response.data;
                }).catch(error => {
                    console.error(error.response);
                });
        },
        // Since passed props need to be data
        addCollegeItemText: function(entry) {
            var items = entry.colloquial || [];
            return items
                .concat(entry.name)
                .filter(x => x!=null )
                .join(', ');
        },
        selectedSchool: function(selected) {
            this.school = (selected)
                ? selected._id : null;
        }
    },
    mounted: async function() {
        await this.populateCollegeEntries();
        (this.application.courseDetails)
           ? this.setDataFromApplication()
           : this.setDataFromGoogleRow();
        this.ready=true;
    }
}
</script>