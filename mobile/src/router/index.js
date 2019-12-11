import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import login from '../views/login.vue'
import credit from '../views/flow/credit.vue'
import contract from '../views/flow/contract.vue'
import lending from '../views/flow/lending.vue'
import message from '../views/home/message.vue'

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
    },
    {
        path: '/contract',
        name: 'contract',
        component: contract
    },
    {
        path: '/lending',
        name: 'lending',
        component: lending
    },
    {
        path: '/message',
        name: 'message',
        component: message
    }
];

const router = new VueRouter({
    base: "/approveApp/",
    mode: "history",
    routes
});

export default router
