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
            <router-link to="/mycart" class="nav-link text-white">🛒</router-link>
          </li>
        </ul>
      
      
      </div>
    </div>
  </nav>
</template>



<script>
export default {
  computed: {
   
    loginLink() {
      return this.$store.state.loggedIn ? '/logout' : '/login'
    },
  
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
  .text-script {
  font-family: 'Script Font', cursive; /* Replace 'Script Font' with the actual font you want to use */
}

.bg-lightgreen {
  background-color: lightgreen;
}
  
  </style>