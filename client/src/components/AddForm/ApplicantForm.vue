<template>
    <div>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="First Name"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Middle Name"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Last Name"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Primary Email"
                    prepend-inner-icon="mdi-email"
                    filled />
                <v-text-field
                    label="Secondary Email"
                    prepend-inner-icon="mdi-email"
                    filled />
            </v-col>
            <v-col cols="3">
                <v-text-field
                    label="Primary Phone Number"
                    :messages="['USA (if possible)']"
                    prepend-inner-icon="mdi-phone"
                    filled />
                <v-text-field
                    label="Secondary Phone Number"
                    prepend-inner-icon="mdi-phone"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Link to Facebook Profile"
                    prepend-inner-icon="mdi-facebook"
                    filled />
                <v-text-field
                    label="Link to LinkedIn Profile"
                    prepend-inner-icon="mdi-linkedin"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Date of Birth"
                    type="date"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="US Visa Status"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Entry Date in USA"
                    type="date"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-switch
                v-model="inUSA"
                v-bind:label="inUSA ? 'In USA' : 'Not In USA'"
                ></v-switch>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-subheader>Parents Address</v-subheader>
                <AddressForm />
            </v-col>
            <v-col cols="6">
                <v-subheader>US Address</v-subheader>
                <AddressForm />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import AddressForm from './AddressForm';

export default {
    name: 'ApplicantForm',
    props: ['row'],
    components: {
        AddressForm
    },
    data() {
        return {
            inUSA: false,
        }
    }
}
</script>

<style scoped>

</style>