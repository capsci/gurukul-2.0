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
                    <v-text-field
                    label="First Name"
                    v-model="referrer.name.first"
                    filled/>
                </v-col>
                <v-col cols="3.5">
                    <v-text-field
                    label="Middle Name"
                    v-model="referrer.name.middle"
                    filled/>
                </v-col>
                <v-col cols="3.5">
                    <v-text-field
                    label="Last Name"
                    v-model="referrer.name.last"
                    filled/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="5">
                    <v-text-field
                    label="Position"
                    v-model="referrer.position"
                    filled/>
                </v-col>
                <v-col cols="7">
                    <v-text-field
                    label="Organization"
                    v-model="referrer.organization"
                    filled/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="5">
                    <v-text-field
                    label="Primary Email"
                    v-model="referrer.email.primary"
                    filled/>
                </v-col>
                <v-col cols="5">
                    <v-text-field
                    label="Secondary Email"
                    v-model="referrer.email.secondary"
                    filled/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field
                    label="Primary Phone"
                    v-model="referrer.phone.primary"
                    filled/>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                    label="Secondary Phone"
                    v-model="referrer.phone.secondary"
                    filled/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="9">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            label="Line1"
                            v-model="referrer.address.line1"
                            filled/>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                            label="Zipcode"
                            v-model="referrer.address.zipcode"
                            filled/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            label="Line2"
                            v-model="referrer.address.line2"
                            filled/>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                            label="State"
                            v-model="referrer.address.state"
                            filled/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            label="City"
                            v-model="referrer.address.city"
                            filled/>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                            label="Country"
                            v-model="referrer.address.country"
                            filled/>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="3">
                    <v-textarea
                        filled
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

export default {
    name: 'ReferrerForm',
    data: function() {
        return {
            referrers: this.$store.getters.application.referrers,
            googleMetaData: this.$store.getters.application.googleMetaData.referrers,
            salutations: ['Mr.', 'Mrs.', 'Miss'],
        }
    },
}
</script>