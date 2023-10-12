<template>
  <div>
    <button @click="confirmOrder">Checkout</button>
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
        const response = await Api.post(`/customers/${customerId}/orders`, newOrder)
        if (response.status === 201) {
          this.$emit('clear-cart')
          this.$router.push('/myprofile')
          console.log(newOrder)
        } else {
          alert('Something went wront')
        }
      } catch (error) {
      }
    },
    confirmOrder() {
      const isConfirmed = window.confirm('Are you sure you want to order this item?')
      if (isConfirmed) {
        this.placeOrder()
      }
    }
  }
}
</script>
