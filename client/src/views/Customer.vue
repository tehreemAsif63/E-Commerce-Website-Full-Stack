<template>
  <div class="Customer-list">
    <h2>User List</h2>
    <ul>
      <li v-for="Customer in customers" :key="Customer._id">
        <strong>Name:</strong> {{ Customer.name }}<br>
        <strong>Email:</strong> {{ Customer.email }}
      </li>
    </ul>
  </div>
</template>
  
<script>
import { Api } from '@/Api'

export default {
  name: 'customer',
  data() {
    return {
      customers: []
    }
  },
  created() {
    Api.get('/customers')
      .then((response) => {
        this.customers = response.data
      })
      .catch((error) => {
        console.error('Error fetching customers:', error)
      })
  }
}
</script>
  
<style scoped>
.Customer-list {
  margin: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}
</style>
