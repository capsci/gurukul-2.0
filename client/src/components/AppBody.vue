<template>
    <div class="AppBody">
      <div v-if="show.NavBar"> <NavBar /> </div>
      <div v-if="show.GSheetsData"> <GSheetsData /> </div>
    </div>
</template>

<script>

import NavBar from './NavBar';
import GSheetsData from './googlesheets/GSheetsData';

export default {
  name: 'NavBody',
  components: {
    NavBar,
    GSheetsData
  },
  data: function() {
    return {
      show: {
        'GSheetsData': true,
        'NavBar': true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
