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
            <v-col cols="6">
                <v-text-field
                    label="Position/Title"
                    filled />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    label="Organization"
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
            <v-col cols="4">
                <v-text-field
                    label="Primary Phone Number"
                    prepend-inner-icon="mdi-phone"
                    filled />
                <v-text-field
                    label="Secondary Phone Number"
                    prepend-inner-icon="mdi-phone"
                    filled />
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
    name: 'ReferrerForm',
    props: ['row'],
    components: {
        AddressForm
    }
}
</script>