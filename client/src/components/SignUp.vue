<template>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <b-form @submit.prevent="signup" class="singup-form">
      <b-form-input id="email" v-model="formData.email" type="email" required placeholder="Email"
        class="rounded-pill"></b-form-input>
      <b-form-input id="password" v-model="formData.password" type="password" required placeholder="Password"
        class="rounded-pill"></b-form-input>
      <b-form-input id="name" v-model="formData.name" required placeholder="Name" class="rounded-pill"></b-form-input>
      <b-form-input id="lastName" v-model="formData.lastName" required placeholder="Last Name"
        class="rounded-pill"></b-form-input>
      <b-button type="submit" variant="primary" class="signup-button">
        Sign Up
      </b-button>
    </b-form>
    <router-link to="/login" class="login-link">Login</router-link>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
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
        const response = await Api.post('/customers', this.formData)
        if (response.status === 201) {
          this.$router.push('/login')
        } else {
          const responseData = await response.json()
          this.errorMessage = responseData.message
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
  padding: 5%;
  border-radius: 5px;
  margin: 2% auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 50%;
  width: 70%;
}
@media (min-width: 992px) {
  .signup-container {
    width: 30%;
  }
}


.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.rounded-pill {
  margin-top: 5px;
}

.signup-form {
  margin-top: 20px;
}

.signup-button {
  background-color: lightblue;
  color: white;
  margin-top: 5px;
}

.signup-button:hover {
  background-color: blue;
}
</style>