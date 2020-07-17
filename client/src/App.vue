<template>
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
        <v-main>
            <component :is="layout">
                <router-view />
            </component>
        </v-main>
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
