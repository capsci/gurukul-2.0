<template>
    <div>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Degree"
                    v-model="degree"
                    filled />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    label="School/University Name"
                    v-model="name"
                    filled />
            </v-col>
            <v-col cols="2">
                <v-text-field
                    label="GPA/Grade"
                    v-model="gpa"
                    filled />
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'PreviousSchoolDetailsForm',
    props: ['emitId'],
    watch: {
        previousSchoolDetail: function(value) {
            this.$emit('updateForm', {[this.emitId] : value});
        }
    },
    computed: {
        previousSchoolDetail: function() {
            return {
                degree: this.degree,
                name: this.name,
                gpa: this.gpa,
            }
        }
    },
    data: function() {
        return {
            degree: null,
            name: null,
            gpa: null
        }
    }
}
</script>