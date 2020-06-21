<template>
    <div>
        <div v-for="(writeup,index) in writeups"
            :key="index">
            <v-row>
                {{writeup.question}}
            </v-row>
            <v-row>
                <v-textarea
                    filled
                    name="input-8-1"
                    label="Enter your answer here"
                    v-model='writeup.answer'>
                </v-textarea>
            </v-row>
        </div>
        <div>
            <v-row>
                <v-col cols="8">
                    <v-text-field
                        label="Question"
                        v-model="question"
                        filled />
                </v-col>
                <v-col cols="4">
                    <v-btn
                        primary
                        @click="addQuestion">
                        Add Writeup Question
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdditionalMaterialForm',
    data: function() {
        return {
            writeups: this.$store.getters.application.info.writeups,
            question: null,
        }
    },
    methods: {
        addQuestion: function() {
            if(this.question == null || this.question == "") {
                alert("Insert Question");
                return;
            }
            this.$store.getters.application.info.addWriteup(this.question);
            this.question = null;
        }
    },
}
</script>