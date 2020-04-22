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
        <div
          v-for="(row,index) in gs_data"
          v-bind:key="index"
          class="row"
        >
        <span class="applicationTime"> {{row.applicationTime}} </span>
        <span class="fullName"> {{row.fullName}}</span>
        <span class="email"> {{row.email}} </span>
        <span class="facebook"> {{row.facebook}} </span>
        <span class="linkedin"> {{row.linkedin}} </span>
        <span class="courseInfo"> {{row.courseInfo}} </span>
        <span class="courseTuitionFee"> {{row.courseTuitionFee}} </span>
        <span class="otherScholarships"> {{row.otherScholarships}} </span>
        <span class="referrer"> {{row.referrer1}} </span>
        <span class="referrer"> {{row.referrer2}} </span>
        <span class="docsEmailed"> {{row.docsEmailed}} </span>
        <span v-if="row._applicant_id != null">
          <span v-if="row._applicant_id.startsWith('(')" class="red">
            {{ row._applicant_id }}
          </span>
          <span v-else-if="row._applicant_id.length > 10" class="green">
            Existing
          </span>
        </span>
        <span v-else>
          <button @click="addApplication(row)">Add</button>
        </span>
        </div>
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
      gs_data: null
    }
  },
  methods: {
    initComponent: function () {
      axios
        .get(Config.server.urls.googlesheets)
        .then(response => {
          this.gs_data = response.data.rows;
          this.getMetaData();
        }).catch(error => {
          console.error(error.response);
        });
    },
    getMetaData: function() {
      this.gs_data.forEach((row, index) => {
        this.setApplicantID(row.email, index);
      });
    },
    setApplicantID: function(email, index) {
      axios
        .post(Config.server.urls.applicant.exists, { email: email })
        .then(response => {
          this.gs_data[index]._applicant_id = response.data.id;
          if (response.data.id) {
            this.setPrevApplications(response.data.id, index);
          }
        })
        .catch(error => {
          this.gs_data[index]._applicant_id = "(" + error.response.data.error + ")";
        });
    },
    setPrevApplications: function(applicant_id, index) {
      axios
        .post(Config.server.urls.application.prev, { applicant_id: applicant_id })
        .then(response => {
          this.gs_data[index]._appplications_prev = response.data.id;
        })
        .catch(error => {
          console.log(error.response.data);
          this.gs_data[index]._appplications_prev = "(" + error.response.data.error + ")";
        });
    },
    addApplication: function(row) {
      console.log("Adding:" + JSON.stringify(row));
    }
  },
  mounted: function() {
    this.initComponent();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  padding-top: 5%;
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>
