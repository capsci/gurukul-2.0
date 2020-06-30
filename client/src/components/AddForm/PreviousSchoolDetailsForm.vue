<template>
    <div>
        <v-row v-for="(school,index) in this.prevSchools"
            :key="index">
            <v-col cols="4">
                <v-text-field-ext
                    label="Degree"
                    v-model="school.degree" />
            </v-col>
            <v-col cols="6">
                <v-text-field-ext
                    label="School/University Name"
                    v-model="school.name" />
            </v-col>
            <v-col cols="2">
                <v-text-field-ext
                    label="GPA/Grade"
                    v-model="school.grade" />
            </v-col>
        </v-row>
        <div>
            <v-btn
                primary
                @click="addSchool">
                Add Previous Education
            </v-btn>
        </div>
    </div>
</template>

<script>
import { VTextFieldExt } from './../extended/VForm';

export default {
    name: 'PreviousSchoolDetailsForm',
    components: {
        VTextFieldExt,
    },
    data: function() {
        return {
            prevSchools: this.$store.getters.application.info.prevEducation,
        }
    },
    methods: {
        addSchool(degree, name, grade) {
            this.$store.getters.application.info
                .addPrevEducation(degree, name, grade);
        }
    },
}
</script>