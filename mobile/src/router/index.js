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
        path: '/index',
        name: 'index',
        component: resolve => require(['@/views/index'],resolve)
    }
];

const router = new VueRouter({
    routes
});

export default router
