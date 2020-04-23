<template>
    <v-container>
        <v-layout>
            <v-btn
                color="primary"
                @click="setLayout('application-form-layout')">
                Application Form layout
            </v-btn>
            <v-btn
                color="secondary"
                @click="setLayout('import-data-layout')">
                Import Data layout
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    methods: {
        setLayout (layout) {
            this.$store.commit('SET_LAYOUT', layout);
        }
    }
}
</script>