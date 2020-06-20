import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        application: null,
    },
    mutations: {
        SET_APPLICATION (state, payload) {
            state.application = payload;
        },
    },
    getters: {
        application (state) {
            return state.application;
        }
    }
});