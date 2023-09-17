<template>
    <div>
      <h1>Sign Up</h1>
      <form @submit.prevent="signup">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="formData.password" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="formData.lastName" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
<script>
import { Api } from '@/Api'
export default {
  name: 'SignUp',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        name: '',
        lastName: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    async signup() {
      try {
        // Basic client-side validation
        if (!this.validateForm()) {
          return
        }
  
        // Send a POST request to the signup endpoint
        const response = await Api.post('/signup/customer', this.formData)
  
        // Assuming the server returns a token on successful signup
        if (response.data.token) {
          // Store the token in local storage or Vuex store for authentication
          localStorage.setItem('token', response.data.token)
  
          // Redirect to a protected route or perform other actions
          // You can use Vue Router for navigation
          this.$router.push('/mypofile')
        }
      } catch (error) {
        this.errorMessage = 'Signup failed. Please check your information and try again.'
        console.error(error)
      }
    },
    validateForm() {
      // Basic client-side validation
      if (!this.formData.email || !this.formData.password || !this.formData.name || !this.formData.lastName) {
        this.errorMessage = 'All fields are required.'
        return false
      }
      return true
    }
  }
}
</script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>
