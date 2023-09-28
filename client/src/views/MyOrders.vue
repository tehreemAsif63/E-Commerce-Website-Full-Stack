<template>

    <div>
      <h3>Orders:</h3>
      <ul>
        <li v-for="order in myOrders" :key="order._id">
          <p>Items Ordered: {{ order.title }}</p>
          <p>Date: {{ order.date }}</p>
        </li>
      </ul>
    </div>
  </template>
  
<script>
import { Api } from '../Api' 
  
export default {
  data() {
    return {
      myOrders: []
    }
  },
  async created() {
    await this.getMyOrders()
  },
  methods: {
    async getMyOrders() {
      const customerId = this.$store.state.customer._id
      try {
        const headers = { Authorization: `Bearer ${this.$store.state.token}` }
        const response = await Api.get(`/customers/${customerId}/orders`, { headers })
  
        if (response.data && response.data.orders) {
          this.myOrders = response.data.orders.map((order) => ({
            title: order.title,
            date: order.date
          }))
        } else {
          alert('Something went wrong while fetching the orders')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
