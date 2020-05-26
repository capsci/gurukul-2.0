<template>
    <div>
        <div v-for="(writeup,index) in writeups"
            :key="writeup.question">
            <v-row>
                {{questions[index]}}
            </v-row>
            <v-row>
                <v-textarea
                    filled
                    name="input-8-1"
                    label="Enter your answer here"
                    v-model='answers[index]'>
                </v-textarea>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdditionalMaterialForm',
    props: {
        application: Object,
        emitId: String,
        questions: Array,
    },
    watch: {
        writeups: function(value) {
            this.$emit('updateForm', {[this.emitId]: value});
        }
    },
    computed: {
        writeups: function() {
            return this.questions.map((question, idx) => {
                return {
                    question: question,
                    answer: this.answers[idx]};
            })
        }
    },
    data: function() {
        return {
            answers: []
        }
    },
    methods: {
        setDataFromApplication: function() {
            this.questions = [];
            this.application.writeups.forEach((item) => {
                this.questions.push(item.question);
                this.answers.push(item.answer);
            });
        },
        setDataFromGoogleRow: function() {

        },
    },
    mounted() {
        (this.application.writeups)
            ? this.setDataFromApplication()
            : this.setDataFromGoogleRow();
    },
}
</script>