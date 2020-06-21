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
        <v-row>
                <v-col cols="5">
                    <v-text-field
                        label="Document Name"
                        v-model="docName"
                        filled />
                </v-col>
                <v-col cols="3">
                    <v-switch
                        v-model="uploaded"
                        v-bind:label="docName"/>
                </v-col>
                <v-col cols="4">
                    <v-btn
                        primary
                        @click="addDoc">
                        Add New Doc
                    </v-btn>
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
            docName: null,
            uploaded: false,
        }
    },
    methods: {
        addDoc() {
            if(this.docName == null || this.docName == "") {
                alert("Document Name");
                return;
            }
            this.$store.getters.application.info.addDocument(this.docName, this.uploaded);
            this.docName = null;
            this.uploaded = false;
        }
    },
}
</script>