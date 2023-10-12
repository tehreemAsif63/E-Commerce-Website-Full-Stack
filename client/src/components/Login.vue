<template>
  <div class="login-container">
    <h1>Login</h1>
    <b-form @submit.prevent="toggleLogin" class="login-form">
        <b-form-input
          id="email"
          v-model="email"
          required
          placeholder="Email"
          class="rounded-pill"
        ></b-form-input>
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Password"
          class="rounded-pill"
        ></b-form-input>
      <b-button type="submit" variant="primary" class="login-button">
        Login
      </b-button>
    </b-form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
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
      password: '',
      errorMessage: ''
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
          const response = await Api.post('/login/customers', {
            email: this.email,
            password: this.password
          })
          if (response.status === 200) {
            const { customer, token } = response.data
            this.setCustomer(customer)
            this.setToken(token)
            this.$router.push('/myprofile')
          } else {
            this.errorMessage = 'Invalid email or password'
          }
        } catch (error) {
          this.errorMessage = 'Invalid email or password'
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
  padding: 5%;
  border-radius: 5px;
  margin: 2% auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 50%;
  width: 50%;
}
@media (min-width: 992px) {
  .login-container {
    width: 33%;
  }
}

.login-form {
  margin-top: 2%;
}

.login-button {
  background-color: lightblue;
  color: white;
  margin-top: 5px;
  border-radius: 10px;
}

.login-button:hover {
  background-color: blue;
}
.rounded-pill {
margin-top: 5px;
}
.error-message{
  color: red;

}
</style>