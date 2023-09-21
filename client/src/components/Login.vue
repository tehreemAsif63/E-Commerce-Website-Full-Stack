<template>
  <div class="login-container">
    <h1>{{ $store.state.loggedIn ? 'Logout' : 'Login' }}</h1>
    <form @submit.prevent="toggleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="formData.password" required />
      </div>
      <button type="submit">{{ $store.state.loggedIn ? 'Logout' : 'Login' }}</button>
    </form>
    <p v-if="$store.state.errorMessage" class="error-message">{{ $store.state.errorMessage }}</p>
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
