<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8">
        <h1 id="my-profile-title" class="mb-4">My Profile</h1>
        <div v-if="!isEditing">
          <p>Welcome {{ customer.name }} {{ customer.lastName }}</p>
          <p>Your Details:</p>
          <p>Email: {{ customer.email }}</p>
          <p>Address: {{ customer.address }}</p>
          <button class="btn btn-secondary" @click="getMyOrders">Orders</button>
          <button class="btn btn-secondary" @click="startEditing">Update Profile</button>
          <button class="btn btn-secondary" @click="confirmDeleteProfile">Delete Profile</button>
          <div class="mt-4">
            <button class="btn btn-secondary" @click="changePasswordFormVisible = !changePasswordFormVisible">
              Change Password
            </button>
            <ChangePassword v-if="changePasswordFormVisible" />
          </div>
        </div>
        <div v-else>
          <form @submit.prevent="updateProfile">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" class="form-control" v-model="editedCustomer.name" required>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name:</label>
              <input type="text" id="lastName" class="form-control" v-model="editedCustomer.lastName" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" class="form-control" v-model="editedCustomer.email" required>
            </div>
            <div class="form-group">
              <label for="address">Address:</label>
              <input type="text" id="address" class="form-control" v-model="editedCustomer.address" required>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
            <button class="btn btn-secondary" @click="cancelEditing">Cancel</button>
          </form>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mt-4">
          <div v-if="showOrders">
            <h5>My orders:</h5>
            <ul class="list-group">
              <li class="list-group-item" v-for="order in customerOrders" :key="order._id">
                <p>Items Ordered: {{ order.title }}</p>
                <p>Date: {{ order.date }}</p>
                <p>Time: {{order.time }}</p>
              </li>
            </ul>
            <div class="mt-4">
              <button class="btn btn-danger" @click="deleteAllOrders">Delete All Orders</button>
            </div>
          </div>
        </div>
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
        const response = await Api.patch(`/customers/${customerId}`, {
          name: this.editedCustomer.name,
          lastName: this.editedCustomer.lastName,
          email: this.editedCustomer.email,
          address: this.editedCustomer.address
        })
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
        const customerId = this.$store.state.customer._id
        await Api.delete(`/customers/${customerId}`)
        this.$store.commit('setCustomer', null)
        alert('Your account is deleted! Sorry to see you go.')
        this.$router.push('/')
      } catch (error) {
      } 
    },

    confirmDeleteProfile() {
      const isConfirmed = window.confirm('Are you sure you want to remove your profile?')
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
        const response = await Api.get(`/customers/${customerId}/orders`)
        if (response.data && response.data.orders) {
          this.customerOrders = response.data.orders.map(order => ({
            title: order.title,
            date: this.formatDate(order.date),
            time: this.formatTime(order.date)
          }))
          this.showOrders = true
        } else {
          alert('Something went wrong while fetching the orders')
        }
      } catch (error) {
        console.log(error)
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    },
    formatTime(date) {
      const options = { hour: '2-digit', minute: '2-digit' }
      return new Date(date).toLocaleTimeString(undefined, options)
    },

    async deleteAllOrders() {
      const confirmation = window.confirm('Are you sure you want to delete all orders?')
      if (confirmation) {
        try {
          const response = await Api.delete('/orders')
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
<style>

#my-profile-title {
  font-size: 24px; 
  color: #333; 
  margin-bottom: 20px; 

}

</style>