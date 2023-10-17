<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8">
        <b-card>
          <template #header>
            <h4>My Profile</h4>
          </template>
          <div v-if="!isEditing">
            <p>Welcome {{ customer.name }} {{ customer.lastName }}</p>
            
            <p> <b-icon icon="envelope"></b-icon> : {{ customer.email }}</p>
            <p><b-icon icon="geo-alt"></b-icon> : {{ customer.address }}</p>

            <button class="btn btn-secondary" @click="startEditing">
              <b-icon icon="pencil"></b-icon>
              Update
            </button>

            <button class="btn btn-secondary" @click="deleteProfile"> 
              <b-icon icon="trash-fill"></b-icon>Delete</button>
            <div class="mt-4">
              <button class="btn btn-secondary" @click="passFormVisible = !passFormVisible">
                Change Password
              </button>
              <ChangePassword v-if="passFormVisible" />
              <div>
                <button class="btn btn-secondary" @click="getMyOrders">Show my orders</button>
              </div>
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
        </b-card>

       
        <b-card v-if="showOrders" class="mt-4">
          <template #header>
            <h4>Your orders</h4>
          </template>
          <ul class="list-group">
            <li class="list-group-item" v-for="order in customerOrders" :key="order._id">
              <p>Items Ordered: {{ order.title }}</p>
              <p> <b-icon icon="calendar2-date"></b-icon> {{ order.date }}</p>
              <p> <b-icon icon="clock-fill"></b-icon> {{ order.time }}</p>
            </li>
          </ul>
          <div class="mt-4">
            <button class="btn btn-danger" @click="deleteAllOrders">Delete All Orders</button>
          </div>
        </b-card>
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
      passFormVisible: false
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
      const isConfirmed = window.confirm('Are you sure you want to remove your profile?')
      if (isConfirmed) {
        try {
          const customerId = this.$store.state.customer._id
          await Api.delete(`/customers/${customerId}`)
          this.$store.commit('setCustomer', null)
          alert('Your account is deleted! Sorry to see you go.')
          this.$router.push('/logout')
        } catch (error) {
          alert('Something went wrong.')
          this.$router.push('/myprofile')   
        } 
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
        alert('Something went wrong. Try again')
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
        alert('DDeleting all orders failed.')
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
 .btn-secondary{
  margin-top: 5px;
  margin-left: 10px;
}
p{
  margin-left: 5px;
}
</style>