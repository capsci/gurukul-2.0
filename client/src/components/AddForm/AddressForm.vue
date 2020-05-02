<template>
    <div>
        <v-row>
            <v-col cols="8">
                <v-text-field
                    label="Address Line 1"
                    v-model="line1"
                    filled />
                <v-text-field
                    label="Address Line 2"
                    v-model="line2"
                    filled />
                <v-text-field
                    label="City"
                    v-model="city"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Zip Code"
                    v-model="zipcode"
                    filled />
                <v-text-field
                    label="State"
                    v-model="state"
                    filled />
                <v-text-field
                    label="Country"
                    v-model="country"
                    filled />
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'AddressForm',
    watch: {
        address: function(value) {
            this.$emit('updateAddress', value);
        }
    },
    data: function() {
        return {
            line1: null,
            line2: null,
            city: null,
            zipcode: null,
            state: null,
            country: null,
        }
    },
    computed: {
        address: function() {
            return {
                line1: this.line1,
                line2: this.line2,
                city: this.city,
                zipcode: this.zipcode,
                state: this.state,
                country: this.country,
            }
        }
    }
}
</script>