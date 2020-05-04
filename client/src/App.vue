<template>
    <v-app>
        <v-content>
            <component :is="layout">
                <router-view />
            </component>
        </v-content>
    </v-app>
</template>

<script>

const default_layout = 'default';

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || default_layout) + '-layout';
        }
    }
};
</script>
