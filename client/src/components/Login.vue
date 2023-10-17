<template>
  <div class="login-container">
    <h1>{{ $store.getters.isLoggedIn ? 'Logout' : 'Login' }}</h1>
    <b-form @submit.prevent="toggleLogin" class="login-form">
      <b-form-group
        id="email-group"
        label="Email:"
        label-for="email"
        label-cols-sm="2"
        label-align-sm="right"
      >
        <b-form-input
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
        {{ $store.getters.isLoggedIn ? 'Logout' : 'Login' }}
      </b-button>
    </b-form>
    <b-alert
      v-if="$store.state.errorMessage"
      variant="danger"
      dismissible
      fade
      class="error-message"
    >
      {{ $store.state.errorMessage }}
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
            console.log('Logged in, changing direction')
          } else {
            console.error('Authentication failed')
          }
        } catch (error) {
          console.error('Login failed:', error)
        }
      }
    }
  }
}
</script>


<style scoped>
.login-container {
  background-color: #2C3E50;
  color: #EAEAEA;
  padding: 40px;
  border: 2px solid #F8B400;
  border-radius: 20px;
  width: 400px;
  margin: 40px auto; 
  display: flex;
  flex-direction: column;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.login-form {
  margin-top: 20px;
}


.login-button {
  background-color: #F8B400;
  color: #2C3E50;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Noto Sans', sans-serif;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #C69200;
}
</style>
