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
    props: ['uploadedDocs', 'emitId'],
    watch: {
        additionalDocs: function(value) {
            this.$emit('updateForm', {[this.emitId]: value});
        }
    },
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
    computed: {
        additionalDocs: function() {
            return {
                docI20: this.docI20,
                docAdmissionLetter: this.docAdmissionLetter,
                docPassport: this.docPassport,
                docVisa: this.docVisa,
                docResume: this.docResume,
                docMMNAApplication: this.docMMNAApplication,
                docReference1: this.docReference1,
                docReference2: this.docReference2,
            }
        }
    },
    methods: {
        setDataFromGoogleRow: function() {
            this.docI20 = this.uploadedDocs.includes('I-20');
            this.docAdmissionLetter = this.uploadedDocs.includes('US University - Admission Letter');
            this.docPassport = this.uploadedDocs.includes('Passport Copy');
            this.docVisa = this.uploadedDocs.includes('Visa Copy');
            this.docMMNAApplication = this.uploadedDocs.includes('MMNA Application Form');
        },
    },
    mounted: function() {
        this.setDataFromGoogleRow();
    }
}
</script>