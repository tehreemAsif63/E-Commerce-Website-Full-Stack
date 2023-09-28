<template>
  <div class="login-container">
    <h1>Login</h1>
    <b-form @submit.prevent="toggleLogin" class="login-form">
      <b-form-group
        id="email-group"
        label="Email:"
        label-for="email"
        label-cols-sm="2"
        label-align-sm="right"
      ><b-form-input
          id="email"
          v-model="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="password-group"
        label="Password:"
        label-for="password"
        label-cols-sm="2"
        label-align-sm="right"
      >
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" class="login-button">
       Login
      </b-button>
    </b-form>
    <b-alert v-if="errorMessage" variant="danger" dismissible fade class="error-message">
      {{ errorMessage }}
    </b-alert>
    <router-link to="/signup" class="signup-link">Sign up</router-link>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Api } from '../Api'
export default {
  name: 'Login',
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations(['setCustomer', 'setToken']),
    async toggleLogin(e) {
      e.preventDefault()
      if (this.$store.getters.isLoggedIn) {
        this.setCustomer(null)
        this.setToken(null)
        this.$router.push('/login')
      } else {
        try {
          const response = await Api.post('/login/customer', {
            email: this.email,
            password: this.password
          })
          if (response.status === 200) {
            const { customer, token } = response.data
            console.log('Customer:', customer)
            console.log('Token:', token)
            this.setCustomer(customer)
            this.setToken(token)
            this.$router.push('/myprofile')
          } else {
            this.errorMessage = 'Authentication failed'
          }
        } catch (error) {
          this.errorMessage = 'Authentication failed'
        }
      }
    }
  }
}
</script>


<style scoped>
.login-container {
  background-color: lightgreen;
  color: white;
  padding: 20px;
  border-radius: 5px;
  width:400px;
  height: 100px;
  margin: 40px auto; 
  display: flex;
  flex-direction: column;
  text-align: center; 
  min-height: 40vh; 
}

.login-form {
  margin-top: 20px;

}

.login-button {
  background-color: lightblue; 
  color: white;
}

.login-button:hover {
  background-color: blue; 
}
</style>
