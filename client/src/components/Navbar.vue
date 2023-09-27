<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-lightgreen">
    <div class="container">
      <router-link to="/" class="navbar-brand text-script text-white">H & M</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/items" class="nav-link text-white">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/customers" class="nav-link text-white">About</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="loginLink" class="nav-link text-white">{{ loginText }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white">🛒</router-link>
          </li>
        </ul>
      <div>
      <Cart></Cart>
    </div>
      </div>
    </div>
  </nav>
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
  .navbar {
    background-color: lightgreen;
    color: white;
    height: 90px;
    padding: 10px 0;
    font-size: large;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Script Font', cursive;
  }
  .logo {
    font-size: 24px;
    font-weight: bold;
  }
  .nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
  }
  .nav-links li {
    padding: 0;
    margin: 0;
  }
  .nav-links a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
  .cart-logo {
    font-size: 24px;
    cursor: pointer;
  }
  .text-script {
  font-family: 'Script Font', cursive; 
}

.bg-lightgreen {
  background-color: lightgreen;
}
  
  </style>