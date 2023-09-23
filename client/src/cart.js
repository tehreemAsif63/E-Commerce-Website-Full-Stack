import { Api } from '@/Api' // Import the Api module

const state = {
  cart: [],
  items: []
}

const mutations = {
  addToCart(state, item) {
    state.cart.push(item)
  },
  removeFromCart(state, index) {
    state.cart.splice(index, 1)
  },
  setItems(state, items) {
    state.items = items
  }
}

const actions = {
  async fetchItems({ commit }) {
    try {
      const response = await Api.get('/items')
      commit('setItems', response.data) // Commit the mutation to update items in the store
    } catch (error) {
      console.error(error)
    }
  },
  addToCart({ commit }, item) {
    commit('addToCart', item)
  },
  removeFromCart({ commit }, index) {
    commit('removeFromCart', index)
  }
}

const getters = {
  cartItemCount: (state) => state.cart.length,
  cartTotalPrice: (state) =>
    state.cart.reduce((total, item) => total + item.price, 0)
}

export default {
  state,
  mutations,
  actions,
  getters
}
