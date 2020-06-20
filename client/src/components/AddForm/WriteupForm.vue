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
    </div>
</template>

<script>
export default {
    name: 'AdditionalMaterialForm',
    data: function() {
        return {
            writeups: this.$store.getters.application.info.writeups,
        }
    },
}
</script>