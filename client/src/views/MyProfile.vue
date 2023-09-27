<template>
  <div>
    <h1>My Profile</h1>
    <div v-if="!isEditing">
      <p>Name: {{ customer.name }}</p>
      <p>Last Name: {{ customer.lastName }}</p>
      <p>Email: {{ customer.email }}</p>
      <p>Address: {{ customer.address }}</p>
      <button @click="getMyOrders">Load Orders</button>
        <div v-if="showOrders">
        <h3>Orders:</h3>
        <ul>
          <li v-for="order in customerOrders" :key="order._id">
            <p>Title: {{ order.title }}</p>
            <p>Date: {{ order.date }}</p>
          </li>
        </ul>
      </div>
      <button @click="startEditing">Update Profile</button>
      <button @click="deleteProfile">Delete Profile</button>
    </div>

    <div v-else>
      <form @submit.prevent="updateProfile">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="editedCustomer.name" required>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="editedCustomer.lastName" required>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="editedCustomer.email" required>
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="editedCustomer.address" required>
        <button type="submit">Save</button>
        <button @click="cancelEditing">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { Api } from '../Api'

export default {
  computed: {
    customer() {
      return this.$store.state.customer
    }
  },
  data() {
    return {
      isEditing: false,
      editedCustomer: { ...this.$store.state.customer },
      showOrders: false,
      customerOrders: [] 
    }
  },

  methods: {
    async updateProfile() {
      try {
        const customerId = this.$store.state.customer._id
        if (!customerId) {
          console.error('Customer ID not found in store.')
          return
        }

        const response = await Api.patch(`/customers/${customerId}`, {
          name: this.editedCustomer.name,
          lastName: this.editedCustomer.lastName,
          email: this.editedCustomer.email,
          address: this.editedCustomer.address
        })

        this.$store.commit('setCustomer', response.data)
        this.isEditing = false
      } catch (error) {
        console.error(error)
      }
    },
    startEditing() {
      this.isEditing = true
    },
    cancelEditing() {
      this.isEditing = false
      this.editedCustomer = { ...this.$store.state.customer }
    },
    async deleteProfile() {
      try {
        await Api.delete(`/customers/${this.$store.state.customerId}`)
        this.$store.commit('setCustomer', null)
        this.$router.push('/')
      } catch (error) {
        console.error(error)
      }
    },
    async getMyOrders() {
      try {
        const customerId = this.$store.state.customer._id
        if (!customerId) {
          console.error('Customer ID is null or undefined.')
          return
        }

        const response = await Api.get(`/customers/${customerId}/orders`)

     
        if (response.data && response.data.orders) {
          this.customerOrders = response.data.orders.map(order => ({
            title: order.title,
            date: order.date
          }))
          this.showOrders = true 
        } else {
          console.error('Invalid response structure:', response.data)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }



  }
}
</script>
