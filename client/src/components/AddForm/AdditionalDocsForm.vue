<template>
    <div>
        <v-row>
            <v-col cols="4">
                <v-switch
                    v-model="docI20"
                    label="I20"
                ></v-switch>
            </v-col>
            <v-col cols="4">
                <v-switch
                    v-model="docAdmissionLetter"
                    label="College Admission Letter"
                ></v-switch>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-switch
                    v-model="docPassport"
                    label="Passport"
                ></v-switch>
            </v-col>
            <v-col cols="4">
                <v-switch
                    v-model="docVisa"
                    label="Visa"
                ></v-switch>
            </v-col>
            <v-col cols="4">
                <v-switch
                    v-model="docResume"
                    label="Resume"
                ></v-switch>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-switch
                    v-model="docMMNAApplication"
                    label="MMNA Application"
                ></v-switch>
            </v-col>
            <v-col cols="4">
                <v-switch
                    v-model="docReference1"
                    label="Reference Letter 1"
                ></v-switch>
            </v-col>
            <v-col cols="4">
                <v-switch
                    v-model="docReference2"
                    label="Referrence Letter 2"
                ></v-switch>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'AdditionalDocsForm',
    props: ['uploadedDocs'],
    data: function() {
        return {
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
    methods: {
        setDataFromGoogleRow: function() {
            if (this.uploadedDocs.includes('I-20')) this.docI20=true;
            if (this.uploadedDocs.includes('US University - Admission Letter')) this.docAdmissionLetter=true;
            if (this.uploadedDocs.includes('Passport Copy')) this.docPassport=true;
            if (this.uploadedDocs.includes('Visa Copy')) this.docVisa=true;
            if (this.uploadedDocs.includes('MMNA Application Form')) this.docMMNAApplication=true;
        },
    },
    mounted: function() {
        this.setDataFromGoogleRow();
    }
}
</script>