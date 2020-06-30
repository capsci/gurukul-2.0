<script>
import { VTextField } from 'vuetify/lib';

export default {
    name: 'v-text-field-ext',
    extends: VTextField,
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
