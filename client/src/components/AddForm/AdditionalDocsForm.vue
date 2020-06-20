<template>
    <div>
        <v-row>
            <v-col cols="4"
                v-for="(doc,index) in this.docs"
                :key="index">
                <v-switch
                    v-model="doc.uploaded"
                    v-bind:label="doc.name"
                ></v-switch>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'AdditionalDocsForm',
    data: function() {
        return {
            docs : this.$store.getters.application.info.docs,
            docI20: false,
            docAdmissionLetter: false,
            docPassport: false,
            docVisa: false,
            docResume: false,
            docMMNAApplication: false,
            docReference1: false,
            docReference2: false,
        }
    },
}
</script>