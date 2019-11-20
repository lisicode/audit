import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login',
        component: resolve => require(['@/views/login'],resolve)
    },
    {
        path: '/home',
        name: 'home',
        component: resolve => require(['@/views/home'],resolve)
    },
    {
        path: '/flow',
        name: 'flow',
        component: resolve => require(['@/views/flow'],resolve)
    },
    {
        path: '/query',
        name: 'query',
        component: resolve => require(['@/views/query'],resolve)
    },
    {
        path: '/setting',
        name: 'setting',
        component: resolve => require(['@/views/setting'],resolve)
    },
];

const router = new VueRouter({
    routes
});

export default router
