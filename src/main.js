// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';

import uPoint from 'upoint-vue-ui';
import locale from 'upoint-vue-ui/locale/lang/ru-RU'

import 'upoint-vue-ui/assets/css/main.css'

import './assets/main.css'


Vue.use(uPoint, {size: 'mini', locale});

Vue.config.productionTip = false;

upoint.db.connect().then(() => {
    r.tableCreate('counterparties').run(conn, () => {
        console.log('Table create counterparties')
    });
    r.tableCreate('counterparties-faces').run(conn, () => {
        console.log('Table create counterparties-faces')
    });
}).finally(() => {
    new Vue({
        el: '#app',
        router,
        store,
        components: {App},
        template: '<App/>'
    })
});
