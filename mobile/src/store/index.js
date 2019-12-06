import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        nav: {
            type: 'home',
            index: 0
        }
    },
    getters: {},
    mutations: {
        change(state, payload) {
            state.nav = payload.nav
        }
    },
    actions: {},
    modules: {}
})
