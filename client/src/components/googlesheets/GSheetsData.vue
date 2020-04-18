<template>
    <div class="gsheetsdata">
      <h1>Google Sheets Data</h1>
      <br><br><br><br>
      <div
        v-if="gs_data == null"
        class="errors">
          Cannot Read Google Data
      </div>
      <table v-else>
          <tr
            v-for="(row,index) in gs_data.rows"
            v-bind:key="index">
            <td> {{ row }} </td>
          </tr>
      </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GSheetsData',
  data: function(){
    return {
      gs_data: null
    }
  },
  methods: {
    getGSData: function () {
      axios
        .get('http://localhost:3000/googlesheets')
        .then(response => (
            this.gs_data = response.data
            ));
    }
  },
  mounted: function() {
      this.getGSData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
