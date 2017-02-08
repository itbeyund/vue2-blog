
/* ============
 * axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js
 *
 * https://github.com/mzabriskie/axios
 */
window.axios = require('axios');

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
};

/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue'
Vue.config.silent = true;
Vue.config.devtools = true;

/* ============
 * Vuex Store
 * ============
 *
 * The store of the application
 *
 * http://vuex.vuejs.org/en/index.html
 * https://github.com/robinvdvleuten/vuex-persistedstate
 */
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store(require('../store'));

/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter(require('./router'));

export default {router, store}
