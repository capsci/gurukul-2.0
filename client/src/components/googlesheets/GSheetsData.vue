<template>
    <div class="gsheetsdata">
      <h1>Google Sheets Data</h1>
      <br><br><br><br>
      <div
        v-if="gs_data == null"
        class="errors">
          Cannot Read Google Data
      </div>
      <div v-else>
        <table>
          <tr
            v-for="(row,index) in gs_data.rows"
            v-bind:key="index">
                <td> {{ row }}</td>
                <!-- <td> {{ row[spreadsheet_cols.referrer1] }}
                  <br> {{ row[spreadsheet_cols.referrer2] }}
                </td>
                <div v-if="index == 4 ">
                  {{ getEntryState(row, index) }}
                </div> -->
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import Config from './../Config'

export default {
  name: 'GSheetsData',
  data: function(){
    return {
      gs_data: null,
      application_state: []
    }
  },
  methods: {
    initComponent: function () {
      axios
        .get(Config.server.urls.googlesheets)
        .then(response => {
          this.gs_data = response.data;
        }).catch(error => {
          console.error(error.response);
        });
    },
    getEntryState: function(row, index) {
      axios
        .post(Config.server.urls.application.exists, { row: row })
        .then(response =>
          (console.log(response.data)));
      console.log(index);
    }
  },
  mounted: function() {
    this.initComponent();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
