<template>
    <div>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="First Name"
                    v-bind:value="firstName"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Middle Name"
                    v-bind:value="middleName"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Last Name"
                    v-bind:value="lastName"
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
            <v-col cols="6">
                <v-textarea
                filled
                name="input-8-1"
                v-bind:value="referrer"
                label="GoogleSheet Data"
                disabled />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import AddressForm from './AddressForm';
import { formField } from './../../mixins/formField'

export default {
    name: 'ReferrerForm',
    mixins: [formField],
    props: ['referrer'],
    data: function() {
        return {
            firstName: null,
            middleName: null,
            lastName: null
        }
    },
    components: {
        AddressForm
    },
    methods: {
        setDataFromGoogleRow: function() {
            var fullName = this.splitOnNewline(this.referrer)[0];
            [this.firstName, this.middleName, this.lastName] = this.extractNameFields(fullName);
        }
    },
    mounted: function() {
        this.setDataFromGoogleRow();
    }
}
</script>