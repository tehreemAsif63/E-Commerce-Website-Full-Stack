
<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">All You Need <span class="heart">❤</span> </div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/items">Products</router-link></li>
        <li>
          <!-- Use a computed property to display "Login" or "Logout" -->
          <router-link :to="loginLink">{{ loginText }}</router-link>
        </li>
      </ul>
      <div class="cart-logo">🛒</div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    // Computed property to determine the login link
    loginLink() {
      return this.$store.state.loggedIn ? '/logout' : '/login'
    },
    // Computed property to determine the login text
    loginText() {
      return this.$store.state.loggedIn ? 'Logout' : 'Login'
    }
  }
}
</script>

  <style scoped>
  .navbar {
    background-color: lightpink;
    color: white;
    padding: 10px 0;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  .logo {
    font-size: 30px;
    font-weight: bolder;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-block-end: 5%;
    margin-right: 10%;
    
    }

  .heart {
  color: rgb(183, 39, 63);
}
  .nav-links {
    list-style: none;
    display: flex;
    gap: 150px;
    font-size: 20px;
    font-weight: bold;
    margin-right: auto;
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
    font-size: 30px;
    cursor: pointer;
    order: 2;
  }
  </style>