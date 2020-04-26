<template>
    <div>
        <v-row>
            <v-col cols="8">
                <v-text-field
                    label="Address Line 1"
                    filled />
                <v-text-field
                    label="Address Line 2"
                    filled />
                <v-text-field
                    label="City"
                    filled />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Zip Code"
                    filled />
                <v-text-field
                    label="State"
                    filled />
                <v-text-field
                    label="Country"
                    filled />
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'AddressForm',
}
</script>