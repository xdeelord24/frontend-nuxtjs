// store/webhook.js
export const state = () => ({
    webhookData: null,
    data: null,
})

export const mutations = {
    setWebhookData(state, data) {
        state.webhookData = data
    },
    setData(state, data) {
        state.data = data
    },
}
export const actions = {
    fetchWebhookData({ commit }, data) {
        commit('setWebhookData', data)
    },
    fetchData({ commit }, data) {
        commit('setData', data)
    }
}
export const getters = {
    getWebhookData(state) {
        return state.webhookData
    },
    getData(state) {
        return state.data
    },
}