<template>
    <div>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="First Name"
                    v-model="firstName"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Middle Name"
                    v-model="middleName"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Last Name"
                    v-model="lastName"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    label="Position/Title"
                    v-model="position"
                    filled />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    label="Organization"
                    v-model="organization"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Primary Email"
                    prepend-inner-icon="mdi-email"
                    v-model="emailPrimary"
                    filled />
                <v-text-field
                    label="Secondary Email"
                    prepend-inner-icon="mdi-email"
                    v-model="emailSecondary"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Primary Phone Number"
                    prepend-inner-icon="mdi-phone"
                    v-model="phonePrimary"
                    filled />
                <v-text-field
                    label="Secondary Phone Number"
                    prepend-inner-icon="mdi-phone"
                    v-model="phoneSecondary"
                    filled />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <AddressForm
                   @updateAddress="updateAddress" />
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
    props: ['referrer', 'emitId'],
    watch: {
        referrerDetails: function(value) {
            this.$emit('updateForm', {[this.emitId] : value});
        }
    },
    computed: {
        referrerDetails: function() {
            return {
                firstName: this.firstName,
                middleName: this.middleName,
                lastName: this.lastName,
                position: this.position,
                organization: this.organization,
                emailPrimary: this.emailPrimary,
                emailSecondary: this.emailSecondary,
                phonePrimary: this.phonePrimary,
                phoneSecondary: this.phoneSecondary,
                address: this.address,
            }
        }
    },
    data: function() {
        return {
            firstName: null,
            middleName: null,
            lastName: null,
            position: null,
            organization: null,
            emailPrimary: null,
            emailSecondary: null,
            phonePrimary: null,
            phoneSecondary: null,
            address: null,
        }
    },
    components: {
        AddressForm
    },
    methods: {
        setDataFromGoogleRow: function() {
            if (!this.referrer) {
                return;
            }
            var fullName = this.splitOnNewline(this.referrer)[0];
            [this.firstName, this.middleName, this.lastName] = this.extractNameFields(fullName);
        },
        updateAddress: function(value) {
            this.address = value;
        }
    },
    mounted: function() {
        this.setDataFromGoogleRow();
    }
}
</script>