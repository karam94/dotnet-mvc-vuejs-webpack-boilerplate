import Vue from "vue";
import Store from "../store/store.js";
import HowAreYou from "../components/HowAreYou.vue";

const app = new Vue({
    el: '#vue-app',
    store: Store,
    components: { HowAreYou }
});