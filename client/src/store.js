// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { Api } from '@/Api'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: false,
    errorMessage: '',
    customer: {
      customerId: '', 
      email: '',
      name: '',
      lastName: ''
    }
    // ...
  },
  mutations: {
    SET_LOGGED_IN(state, loggedIn) {
      state.loggedIn = loggedIn
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message
    },
    SET_CUSTOMER(state, customer) {
      state.customer = customer
    },
    SET_CUSTOMER_ID(state, customerId) {
      state.customer.customerId = customerId
    },
    RESET_STATE(state) {
      state.loggedIn = false
      state.errorMessage = ''
      state.customer.email = ''
      state.customer.customerId = ''
    }
  },
  actions: {
    async loginCustomer({ commit }, formData) {
      try {
        if (!formData.email || !formData.password) {
          commit('SET_ERROR_MESSAGE', 'Both email and password are required.')
          return
        }
        const response = await Api.post('/login/customer', formData)
        if (response.data.token) {
          commit('SET_LOGGED_IN', true)
          commit('SET_CUSTOMER_ID', response.data.customerId)
          router.push('/myprofile')
        } else {
          commit('SET_ERROR_MESSAGE', 'Login failed. Please check your credentials and try again.')
        }
      } catch (error) {
        commit('SET_ERROR_MESSAGE', 'An error occurred. Please try again later.')
        console.error(error)
      }
    },


    logoutUser({ commit }) {
      commit('RESET_STATE')
    }
  }
})

export default store
