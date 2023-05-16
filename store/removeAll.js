const getDefaultState = () => {
    return {
        items: [],
        status: 'empty'
    }
}

// initial state
const state = getDefaultState()

const actions = {
    resetCartState({ commit }) {
        commit('resetState')
    },
    addItem({ state, commit }, item) { /* ... */ }
}

const mutations = {
    resetState(state) {
        // Merge rather than replace so we don't lose observers
        // https://github.com/vuejs/vuex/issues/1118
        Object.assign(state, getDefaultState())
    }
}

export default {
    state,
    getters: {},
    actions,
    mutations
}