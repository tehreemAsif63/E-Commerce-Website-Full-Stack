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
    setCustomer(state, customer) {
      state.customer = customer
      
      localStorage.setItem('customer', JSON.stringify(customer))
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    clearState(state) {
      state.customer = null
      state.token = null
      state.customerId = null
      localStorage.removeItem('customer')
      localStorage.removeItem('token')
    }
  },
  actions: {
    logoutUser({ commit }) {
      commit('clearState')
    },
    initializeStore({ commit }) {
      const customer = JSON.parse(localStorage.getItem('customer'))
      const token = localStorage.getItem('token')

      if (customer && token) {
        commit('setCustomer', customer)
        commit('setToken', token)
      }
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token
    }
  }
})
