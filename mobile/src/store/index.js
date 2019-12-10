import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        nav: {
            url: 'home',
        }
    },
    getters: {},
    mutations: {
        change(state, payload) {
            state.nav = payload
        }
    },
    actions: {},
    modules: {}
})
