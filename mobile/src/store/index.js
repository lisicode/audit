import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 页面导航
        nav: {
            url: 'home',
        },
        // 流程筛选条件
        screening: {
            flowType: 'B',
            dealflag: '2',
        },
        // 流程编号
        business: {}
    },
    getters: {},
    mutations: {
        // 更改页面导航
        changeNav(state, payload) {
            state.nav = payload
        },
        // 更改流程筛选条件
        changeScreening(state, payload) {
            state.screening = payload
        },
        // 更改流程编号
        changeBusiness(state, payload) {
            state.business = payload
        }
    },
    actions: {},
    modules: {}
})
