<template>
  <div>
    <button @click="confirmPlaceOrder">Place Order</button>
  </div>
</template>

<script>
import { Api } from '../Api'

export default {
  props: {
    cart: Array
  },
  computed: {
    loggedInCustomer() {
      return this.$store.state.customer
    }
  },
  methods: {
    async placeOrder() {
      if (!this.loggedInCustomer) {
        this.$router.push('/login')
        return
      }
      const customerId = this.loggedInCustomer._id
      if (!customerId) {
        return
      }
      const newOrder = {
        title: this.cart.map(item => item.name).join(', '),
        date: new Date().toISOString()
      }
      try {
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`
        }
        const response = await Api.post(`/customers/${customerId}/orders`, newOrder, { headers })
        if (response.status === 201) {
          this.$emit('clear-cart')
          this.$router.push('/myprofile')
        } else {
          alert('something went wront')
        }
      } catch (error) {
      }
    },
    confirmPlaceOrder() {
      const isConfirmed = window.confirm('Are you sure you want to order this item?')
      if (isConfirmed) {
        this.placeOrder()
      }
    }
  }
}
</script>
