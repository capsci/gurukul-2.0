<template>
    <div>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Degree"
                    filled />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    label="School/University Name"
                    filled />
            </v-col>
            <v-col cols="2">
                <v-text-field
                    label="GPA/Grade"
                    filled />
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'PreviousSchoolDetailsForm'
}
</script>