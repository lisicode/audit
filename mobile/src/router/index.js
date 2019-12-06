import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import login from '../views/login.vue'
import credit from '../views/flow/credit.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: index
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/credit',
        name: 'credit',
        component: credit
    }
];

const router = new VueRouter({
    routes
});

export default router
