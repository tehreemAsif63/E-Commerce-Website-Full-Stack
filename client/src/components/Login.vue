<template>
  <div class="login-container">
    <h1>{{ $store.state.loggedIn ? 'Logout' : 'Login' }}</h1>
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
          v-model="formData.email"
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
          v-model="formData.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" class="login-button">
        {{ $store.state.loggedIn ? 'Logout' : 'Login' }}
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
import router from '../router'
export default {
  name: 'Login',
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async toggleLogin() {
      if (this.$store.state.loggedIn) {
        // Log out
        this.$store.dispatch('logoutCustomer')
        router.push('/login')
      } else {
        // Log in
        this.$store.dispatch('loginCustomer', this.formData)
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
  margin: 40px auto; /* Center horizontally */
  display: flex;
  flex-direction: column;
  text-align: center; /* Center text */
  min-height: 40vh; /* Makes the container at least the height of the viewport */
}

.login-form {
  margin-top: 20px;

}

.login-button {
  background-color: lightblue; /* Change the background color on hover */
  color: white;
}

.login-button:hover {
  background-color: blue; /* Change the background color on hover */
}
</style>
