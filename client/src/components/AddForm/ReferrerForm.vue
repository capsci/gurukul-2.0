<template>
    <div>
        <div v-for="(referrer, index) in referrers"
            :key="index">
            <v-row>
                <v-col cols="1">
                    <v-autocomplete
                        v-model="referrer.salutation"
                        label="Salutation"
                        :items="salutations"
                        filled/>
                </v-col>
                <v-col cols="3.5">
                    <v-text-field-ext
                    label="First Name"
                    v-model="referrer.name.first" />
                </v-col>
                <v-col cols="3.5">
                    <v-text-field-ext
                    label="Middle Name"
                    v-model="referrer.name.middle" />
                </v-col>
                <v-col cols="3.5">
                    <v-text-field-ext
                    label="Last Name"
                    v-model="referrer.name.last" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="5">
                    <v-text-field-ext
                    label="Position"
                    v-model="referrer.position" />
                </v-col>
                <v-col cols="7">
                    <v-text-field-ext
                    label="Organization"
                    v-model="referrer.organization" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="5">
                    <v-text-field-ext
                    label="Primary Email"
                    v-model="referrer.email.primary" />
                </v-col>
                <v-col cols="5">
                    <v-text-field-ext
                    label="Secondary Email"
                    v-model="referrer.email.secondary" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field-ext
                    label="Primary Phone"
                    v-model="referrer.phone.primary" />
                </v-col>
                <v-col cols="4">
                    <v-text-field-ext
                    label="Secondary Phone"
                    v-model="referrer.phone.secondary" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="9">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field-ext
                            label="Line1"
                            v-model="referrer.address.line1" />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field-ext
                            label="Zipcode"
                            v-model="referrer.address.zipcode" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field-ext
                            label="Line2"
                            v-model="referrer.address.line2" />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field-ext
                            label="State"
                            v-model="referrer.address.state" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field-ext
                            label="City"
                            v-model="referrer.address.city" />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field-ext
                            label="Country"
                            v-model="referrer.address.country" />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="3">
                    <v-textarea-ext
                        name="input-8-1"
                        v-bind:value="googleMetaData[index]"
                        label="GoogleSheet Data"
                        disabled />
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import { VTextFieldExt, VTextareaExt } from './../extended/VForm';

export default {
    name: 'ReferrerForm',
    components: {
        VTextFieldExt,
        VTextareaExt,
    },
    data: function() {
        return {
            referrers: this.$store.getters.application.referrers,
            googleMetaData: this.$store.getters.application.googleMetaData.referrers,
            salutations: ['Mr.', 'Mrs.', 'Miss'],
        }
    },
}
</script>