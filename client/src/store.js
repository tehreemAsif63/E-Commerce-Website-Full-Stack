import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customer: null,
    token: null,
    customerId: null
  },
  mutations: {
    setCustomerId(state, customerId) {
      state.customerId = customerId
    },
    setCustomer(state, customer) {
      state.customer = customer
    },
    setToken(state, token) {
      state.token = token
    },
    clearState(state) {
      state.customer = null
      state.token = null
      state.customerId = null
    }
  },
  actions: {
    logoutUser({ commit }) {
      commit('clearState')
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token
    }
  }
})
