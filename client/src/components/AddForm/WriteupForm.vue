<template>
    <div>
        <v-row>
            {{question}}
        </v-row>
        <v-row>
            <v-textarea
                filled
                name="input-8-1"
                label="Enter your answer here"
                v-model='answer'
        ></v-textarea>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'AdditionalMaterialForm',
    props: ['question', 'emitId'],
    watch: {
        answer: function(value) {
            this.$emit('updateForm', {[this.emitId]: {[this.question]: value}});
        }
    },
    data: function() {
        return {
            answer: null
        }
    }
}
</script>