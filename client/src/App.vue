<template>
  <v-app>
    <v-content>
      <component :is="layout"></component>
    </v-content>
  </v-app>
</template>

<script>

import ImportData from './layouts/ImportData';
import ApplicationForm from './layouts/ApplicationForm';

export default {
  computed: {
    layout() {
      return this.$store.getters.layout
    }
  },
  components: {
    'import-data-layout': ImportData,
    'application-form-layout': ApplicationForm
  },
};
</script>
