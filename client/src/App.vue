<template>
  <v-app>
    <component :is="layout"></component>
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
}
</script>
