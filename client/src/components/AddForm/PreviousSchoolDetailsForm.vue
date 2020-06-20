<template>
    <div>
        <div v-for="(school,index) in this.prevSchools"
            :key="index">
            <v-row>
                <v-col cols="4">
                    <v-text-field
                        label="Degree"
                        v-model="school.degree"
                        filled />
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        label="School/University Name"
                        v-model="school.name"
                        filled />
                </v-col>
                <v-col cols="2">
                    <v-text-field
                        label="GPA/Grade"
                        v-model="school.grade"
                        filled />
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PreviousSchoolDetailsForm',
    data: function() {
        return {
            prevSchools: this.$store.getters.application.info.prevEducation,
        }
    },
}
</script>