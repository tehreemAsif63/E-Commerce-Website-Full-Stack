<template>
  <div>
    <button @click="placeOrder">Place Order</button>
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
        console.error('Customer ID not found in store.')
        return
      }

      const newOrder = {
        title: this.cart.map(item => item.name).join(', '), 
        date: new Date().toISOString()
      }

      try {
        const response = await Api.post(`/customers/${customerId}/orders`, newOrder)

        if (response.status === 201) {
          console.log('Order placed successfully!')
          this.$emit('clear-cart')
          this.$router.push('/myprofile') 
        } else {
          console.error('Error placing order:', response.data)
        }
      } catch (error) {
        console.error('An error occurred while placing the order:', error)
      }
    }
  }
}
</script>
