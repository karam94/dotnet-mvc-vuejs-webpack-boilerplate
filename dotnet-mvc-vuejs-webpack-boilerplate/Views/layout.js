import Vue from "vue";
import Store from "./store/store.js";
import Navbar from "./components/Navbar.vue";

const app = new Vue({
    el: '#app',
    store: Store,
    components: { Navbar }
});