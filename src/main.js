// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';
import * as Sentry from '@sentry/browser'

import uPoint from 'upoint-vue-ui';
import locale from 'upoint-vue-ui/locale/lang/ru-RU'

import 'upoint-vue-ui/assets/css/main.css'

import './assets/main.css'

Vue.prototype.$isDeveloper = process.env.NODE_ENV === 'development';


Vue.use(uPoint, {size: 'mini', locale});

Sentry.init({
    dsn: 'https://ed70a752cdfc4542a97bcebc9a68ad29@sentry.io/1372958',
    integrations: [new Sentry.Integrations.Vue({ Vue })]
});

Vue.config.errorHandler = (err, vm, info) => {
    // Обработка ошибки. В `info` подробности Vue-специфичной ошибки,
    // например, в каком хуке жизненного цикла произошла ошибка.
    // Доступно только в версиях 2.2.0+
}


Vue.config.productionTip = false;

upoint.db.connect().then(() => {

    // r.tableDrop('counterparties').run(conn)
    // r.tableDrop('counterparties_faces').run(conn)
    // r.tableDrop('counterparties_bank_details').run(conn)
    // r.tableDrop('counterparties_locations').run(conn)

    // r.tableCreate('counterparties').run(conn, () => {
    //     console.log('Table create counterparties')
    // });
    // r.tableCreate('counterparties_faces').run(conn, () => {
    //     console.log('Table create counterparties-faces')
    //     r.table('counterparties_faces').indexCreate('counterparties_id').run(conn)
    // });
    // r.tableCreate('counterparties_bank_details').run(conn, () => {
    //     console.log('Table create counterparties-bank-details')
    //     r.table('counterparties_bank_details').indexCreate('counterparties_id').run(conn)
    // });
    // r.tableCreate('counterparties_locations').run(conn, () => {
    //     console.log('Table create counterparties-locations')
    //     r.table('counterparties_locations').indexCreate('counterparties_id').run(conn)
    // });
}).finally(() => {
    new Vue({
        el: '#app',
        router,
        store,
        components: {App},
        template: '<App/>'
    })
});