<template>
    <div>
        <v-row>
            <v-col cols="8">
                <v-text-field
                    label="College Name"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    label="Course Info"
                    filled />
                <v-text-field
                    label="Course Semester"
                    filled />
                <v-text-field
                    label="Approximate Tuition Fees"
                    filled />
            </v-col>
            <v-col cols=6>
                <v-textarea
                filled
                name="input-8-1"
                label="Other scholarshipsIf any" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <AddressForm />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import AddressForm from './AddressForm';

export default {
    name: 'UniversityDetailsForm',
    components: {
        AddressForm
    }
}
</script>