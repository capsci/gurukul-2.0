<template>
    <div>
        <v-content>
            <span
                v-if="gs_data == null"
                class="errors">
                Cannot Read Google Data
            </span>
            <span v-else
                v-for="(row,index) in gs_data"
                v-bind:key="index">
                <GoogleSheetsRow v-bind:row="row" />
            </span>
        </v-content>
    </div>
</template>

<script>
import axios from 'axios';
import endpoint from './../services/endpoint';

import GoogleSheetsRow from './../components/import-data/GoogleSheetsRow';

export default {
    name: 'ImportData',
    components: {
        GoogleSheetsRow
    },
    data: function(){
        return {
            gs_data: null,
        }
    },
    methods: {
        getGoogleSheetData: function () {
        axios
            .get(endpoint.googleData.get)
            .then(response => {
                this.gs_data = response.data.rows;
            }).catch(error => {
                console.error(error.response);
            });
        },
    },
    mounted: function() {
        this.getGoogleSheetData();
    }
}
</script>