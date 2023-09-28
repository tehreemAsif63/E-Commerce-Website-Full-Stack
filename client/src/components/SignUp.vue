<template>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <b-form @submit.prevent="signup" class="signup-form">
      
      <b-form-group id="email-group" label="Email:" 
      label-for="email" label-cols-sm="2" label-align-sm="right">
        <b-form-input id="email" v-model="formData.email" 
        type="email" required></b-form-input>
      </b-form-group>

      <b-form-group id="password-group" label="Password:" 
      label-for="password" label-cols-sm="2" label-align-sm="right">
        <b-form-input id="password" v-model="formData.password" 
        type="password" required></b-form-input>
      </b-form-group>

      <b-form-group id="name-group" label="Name:" 
      label-for="name" label-cols-sm="2" label-align-sm="right">
        <b-form-input id="name" v-model="formData.name" required></b-form-input>
      </b-form-group>

      <b-form-group id="lastName-group" label="Last Name:" 
      label-for="lastName" label-cols-sm="2" label-align-sm="right">
        <b-form-input id="lastName" v-model="formData.lastName" 
        required></b-form-input>
      </b-form-group>
      
      <b-button type="submit" variant="primary" 
      class="signup-button">Sign Up</b-button>
    </b-form>
    <router-link to="/login" class="login-link">Login</router-link>

    <b-alert v-if="errorMessage" variant="danger" dismissible fade class="error-message">
      {{ errorMessage }}
    </b-alert>
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
        if (!this.validateForm()) {
          return
        }
        const response = await Api.post('/signup/customer', this.formData)
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
          this.$router.push('/mypofile')
        }
      } catch (error) {
        this.errorMessage = 'Signup failed. Please check your information and try again.'
      }
    },
    validateForm() {
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
.signup-container {
  background-color: lightgreen;
  color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 50vh;
}

.signup-form {
  margin-top: 20px;
}

.signup-button {
  background-color: lightblue;
  color: white;
}

.signup-button:hover {
  background-color: blue;
}
</style>