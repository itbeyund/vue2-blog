import Vue from 'vue'

/* ============
 * Vue.js Material
 * ============
 *
 * Material Design for Vue.js
 *
 * https://github.com/marcosmoura/vue-material
 */
const VueMaterial = require('vue-material/dist/vue-material');
require('vue-material/dist/vue-material.css');

Vue.use(VueMaterial);

Vue.material.registerTheme({
    default: {
        primary: 'blue',
        accent: 'pink',
        warn: 'deep-orange',
        background: 'white'
    },
});
Vue.material.setCurrentTheme('default');

/* ============
 * leancloud
 * ============
 *
 * https://leancloud.cn/docs/leanstorage-started-js.html
 */
import AV from 'leancloud-storage'

AV.init({
    appId: 'N72dGJaXBCfiQAqIWTq5uHid-gzGzoHsz',
    appKey: '2Q9xOtIBMTQ39hwgbBjKptwy',
    //masterKey: 'XXOMmvyjQfEjptDUj0Eb6X0A'
});

window.AV = AV;

import '../assets/scss/main.scss';

export default {}
