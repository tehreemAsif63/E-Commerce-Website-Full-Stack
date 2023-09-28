<template>
  <div>
    <div>
      <h1>My Profile</h1>
      <div v-if="!isEditing">
        <p>Name: {{ customer.name }}</p>
        <p>Last Name: {{ customer.lastName }}</p>
        <p>Email: {{ customer.email }}</p>
        <p>Address: {{ customer.address }}</p>
        <button @click="getMyOrders">MyOrders</button>
        <button @click="startEditing">Update Profile</button>
        <button @click="confirmDeleteProfile">Delete Profile</button>
        <div>
          <button @click="changePasswordFormVisible = !changePasswordFormVisible">
            Change Password
          </button>


          <ChangePassword v-if="changePasswordFormVisible" />
        </div>
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
    <div v-if="showOrders">
      <h5>Orders:</h5>
      <li v-for="order in customerOrders" :key="order._id">
        <p>items ordered: {{ order.title }}</p>
        <p>Date: {{ order.date }}</p>
      </li>
      <div>
        <button @click="deleteAllOrders">Delete all orders</button>
      </div>
    </div>

  </div>
</template>

<script>
import { Api } from '../Api'
import ChangePassword from './ChangePassword.vue'
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
      customerOrders: [],
      changePasswordFormVisible: false
    }
  },

  components: {
    ChangePassword 
  },

  methods: {
    async updateProfile() {
      try {
        const customerId = this.$store.state.customer._id
        if (!customerId) {
          return
        }
        const headers = { Authorization: `Bearer ${this.$store.state.token}` }
        const response = await Api.patch(`/customers/${customerId}`, {
          name: this.editedCustomer.name,
          lastName: this.editedCustomer.lastName,
          email: this.editedCustomer.email,
          address: this.editedCustomer.address
        }, { headers })

        this.$store.commit('setCustomer', response.data)
        this.isEditing = false
      } catch (error) {
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
        const headers = { Authorization: `Bearer ${this.$store.state.token}` }
        await Api.delete(`/customers/${this.$store.state.customerId}`, { headers })
        this.$store.commit('setCustomer', null)
        alert('Your account is deleted! Sorry to see you go.')
        this.$router.push('/')
      } catch (error) {
      }
    },
    confirmDeleteProfile() {
      const isConfirmed = window.confirm('Are you sure you want to order this item?')
      if (isConfirmed) {
        this.deleteProfile()
      }
    },

    async getMyOrders() {
      try {
        const customerId = this.$store.state.customer._id
        if (!customerId) {
          return
        }
        const headers = { Authorization: `Bearer ${this.$store.state.token}` }
        const response = await Api.get(`/customers/${customerId}/orders`, { headers })
        if (response.data && response.data.orders) {
          this.customerOrders = response.data.orders.map(order => ({
            title: order.title,
            date: order.date
          }))
          this.showOrders = true
        } else {
          alert('Something went wrong while fetching the orders')
        }
      } catch (error) {
        console.log(error)
      }
    },

    async deleteAllOrders() {
      const confirmation = window.confirm('Are you sure you want to delete all orders?')

      if (confirmation) {
        try {
          const headers = { Authorization: `Bearer ${this.$store.state.token}` }
          const response = await Api.delete('/orders', { headers })

          if (response.status === 204) {
            alert('You deleted all orders.')
          } else {
            alert('Failed to delete orders. Please try again.')
          }
        } catch (error) {
          alert('An error occurred while deleting orders.')
        }
      } else {
        alert('Deletion canceled.')
      }
    }




  }
}
</script>
