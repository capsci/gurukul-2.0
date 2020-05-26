<template>
    <div>
        <div v-for="index in this.numberOfSchools"
            :key="index">
            <v-row>
                <v-col cols="4">
                    <v-text-field
                        label="Degree"
                        v-model="degrees[index]"
                        filled />
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        label="School/University Name"
                        v-model="names[index]"
                        filled />
                </v-col>
                <v-col cols="2">
                    <v-text-field
                        label="GPA/Grade"
                        v-model="gpas[index]"
                        filled />
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PreviousSchoolDetailsForm',
    props: {
        application: Object,
        emitId: String,
        numberOfSchools: Number,
    },
    watch: {
        previousSchools: function(value) {
            this.$emit('updateForm', {[this.emitId]: value});
        },
    },
    data: function() {
        return {
            degrees: [],
            names: [],
            gpas:[],
        }
    },
    computed: {
        previousSchools: function() {
            return Array(this.numberOfSchools)
                .fill({})
                .map((x, idx) => {
                return {
                    degree: this.degrees[idx],
                    name: this.names[idx],
                    gpa: this.gpas[idx]};
            })
        },
    },
    methods: {
        setDataFromApplication: function() {
            this.numberOfSchools = this.application.previousSchools.length;
            this.application.previousSchools.forEach((item) => {
                this.degrees.push(item.degree);
                this.names.push(item.name);
                this.gpas.push(item.gpa);
            });
        },
        setDataFromGoogleRow: function() {
           this.degrees = new Array(this.numberOfSchools);
        },
    },
    mounted() {
        (this.application.previousSchools)
            ? this.setDataFromApplication()
            : this.setDataFromGoogleRow();
    },
}
</script>