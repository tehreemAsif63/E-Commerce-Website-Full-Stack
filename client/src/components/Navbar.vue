<template>
  <b-navbar toggleable="lg" type="light" class="custom-navbar">
      <b-navbar-brand to="/" class="text-script text-white">Amazong</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-nav class="ml-auto">
          <b-nav-item to="/" class="custom-nav-item">Home</b-nav-item>
          <b-nav-item to="/about" class="custom-nav-item">About us</b-nav-item>
          <b-nav-item :to="loginLink" class="custom-nav-item">
            <b-icon :icon="loginIcon"></b-icon> {{ loginText }}
          </b-nav-item>
        </b-nav>
        <div>
        </div>
      </b-collapse>
  </b-navbar>
</template>

<script>

export default {
 
  computed: {
    loginLink() {
      return this.$store.getters.isLoggedIn ? '/myprofile' : '/login'
    },
    loginText() {
      return this.$store.getters.isLoggedIn ? 'My Profile' : 'Login'
    },
    loginIcon() {
      return this.$store.getters.isLoggedIn ? 'person-check-fill' : 'person-fill'
    }
  }

    
  
}
</script>

<style scoped>
.custom-navbar {
  background-color: lightgreen;
  padding: 30px;

  
}
.custom-nav-item {
  color: white;
}
</style>