<template>
  <b-navbar toggleable="lg" type="light" class="custom-navbar">
    <b-container>
      <b-navbar-brand to="/" class="text-script text-white">Amazong</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-nav class="ml-auto">
          <b-nav-item to="/" class="custom-nav-item">Home</b-nav-item>
          <b-nav-item to="/about" class="custom-nav-item">About us</b-nav-item>
          <b-nav-item :to="loginLink" class="custom-nav-item">{{ loginText }}</b-nav-item>
        </b-nav>
        <div>
          <Cart></Cart>
        </div>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import Cart from '../views/Cart.vue'
export default {
  components: {
    Cart
  },
  computed: {
    loginLink() {
      return this.$store.getters.isLoggedIn ? '/logout' : '/login' 
    },
    loginText() {
      return this.$store.getters.isLoggedIn ? 'Logout' : 'Login' 
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
.text-white{

}
</style>