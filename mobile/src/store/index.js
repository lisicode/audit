import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 1,
        todos: [
            {id: 1, text: 'a1', done: true},
            {id: 2, text: 'a2', done: false}
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(e => e.text == 'a2')
        }
    },
    mutations: {
        increment(state, payload) {
            state.count = payload.amount
        },
        changeTodos(state, payload) {
            state.todos = payload.newTodos
        }
    },
    actions: {},
    modules: {}
})
