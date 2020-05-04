"use strict";

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {layout: 'landing'},
            component: require('@/pages/Home').default
        },
        {
            path: '/import',
            name: 'import',
            meta: {layout: 'default'},
            component: () => import('@/pages/ImportData.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            meta: {layout: 'default'},
            component: () => import('@/pages/Dashboard')
        },
        {
            path: '*',
            name: 'Not Found',
            meta: {layout: 'landing'},
            component: () => import('@/pages/NotFound')
        },
    ]
});
