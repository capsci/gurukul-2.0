import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#482ff7',
                secondary: '#46c3db',
                info: '#17b978',
                warning: '#ee5a5a',
                error: '#ac3f21',
                background: '#dee1ec',
            },
        }
    }
});
