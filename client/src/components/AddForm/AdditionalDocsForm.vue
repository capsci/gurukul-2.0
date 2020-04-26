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
                    v-model="docAddmissionLetter"
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
    props: ['row'],
}
</script>