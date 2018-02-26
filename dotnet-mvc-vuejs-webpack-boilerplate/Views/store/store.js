import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    storage: window.localStorage
});

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    plugins: [vuexLocalStorage.plugin]
});