<template>
    <div class="container">
    <button class="custom-button" @click="confirmOrder">Checkout</button>
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
        } else {
          alert('Something went wront')
        }
      } catch (error) {
        alert('fetching orders failed. Try again!')
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
<style>
.custom-button {
  background-color: #007bff; 
  color: #fff; 
  padding: 10px 20px; 
  border: none; 
  border-radius: 5px;
  cursor: pointer; 
  font-size: 16px; 
  font-weight: 600; 
  transition: background-color 0.3s, color 0.3s; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-button:hover {
  background-color: #0056b3; 
}
</style>
