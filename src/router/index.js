import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/Index'
import Create from '@/pages/Create'
import Info from '@/pages/Info'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/create',
            name: 'create',
            component: Create
        },
        {
            path: '/info/:id',
            name: 'info',
            component: Info
        },
        {
            path: '/info/:id/main/edit',
            name: 'main-edit',
            component: require('../pages/info/mainEdit').default
        },
        {
            path: '/info/:id/contact-faces/create',
            name: 'contactFaces-create',
            component: require('../pages/info/contactFacesCreate').default
        },
        {
            path: '/info/:id/contact-faces/edit',
            name: 'contactFaces-edit',
            component: require('../pages/info/contactFacesEdit').default
        },
        {
            path: '/info/:id/bank-details/create',
            name: 'bankDetails-create',
            component: require('../pages/info/bankDetailsCreate').default
        },
        {
            path: '/info/:id/bank-details/edit',
            name: 'bankDetails-edit',
            component: require('../pages/info/bankDetailsEdit').default
        },
        {
            path: '/info/:id/locations/create',
            name: 'locations-create',
            component: require('../pages/info/locationsCreate').default
        },
        {
            path: '/info/:id/locations/edit',
            name: 'locations-edit',
            component: require('../pages/info/locationsEdit').default
        }
    ]
})
