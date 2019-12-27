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
            flowType: 'D',
            dealflag: '2',
        },
        // 流程编号
        business: {},
        // 客户号
        custId: '',
        // 担保方式
        guaranteeMode: ''
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
        },
        // 更改客户号
        changeCustId(state, payload) {
            state.custId = payload
        },
        // 更改担保方式
        changeGuaranteeMode(state, payload) {
            state.guaranteeMode = payload
        }
    },
    actions: {},
    modules: {}
})
