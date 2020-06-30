<script>
import { VTextarea } from 'vuetify/lib';

export default {
    name: 'v-textarea-ext',
    extends: VTextarea,
    props: {
        filled: {
            type: Boolean,
            default: true,
        },
        dense: {
            type: Boolean,
            default: true,
        },
    },
};
</script>
