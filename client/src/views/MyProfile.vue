<template>
  <div>
    <h1>My Profile</h1>
    <div v-if="customer">
      <p>Name: {{ customer.name }}</p>
      <p>Email: {{ customer.email }}</p>
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
  async created() {
    if (!this.customer.customerId) {
      this.$router.push('/login')
      return
    }

    try {
      const response = await Api.get(`/customers/${this.customer.customerId}`)
      this.$store.commit('SET_CUSTOMER', response.data)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
