<template>
  <nav class="navbar">
    <div class="container">
      
      <router-link to="/" class="logo">
        <img src="@/assets/yourShop.jpeg" alt="Your Shop" />
      </router-link> 
      <ul class="nav-links">
        <li>
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li>
          <router-link to="/items" class="nav-link">Products</router-link>
        </li>
        <li>
          <router-link :to="loginLink" class="nav-link">{{ loginText }}</router-link>
        </li>
        
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  
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

* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   transition: all 0.3s ease; 
}

body {
   font-family: 'Noto Sans', sans-serif;
   background-color: #f7f8fa;
   color: #333;
}

a {
   text-decoration: none;
   color: inherit;
   transition: color 0.3s ease; 
}

ul {
   list-style: none;
}

.navbar {
   background-color: #2C3E50;
   color: #EAEAEA;
   height: 90px; 
   padding: 0 20px; 
   font-size: 16px; 
   border-bottom: 3px solid #F8B400; 
   display: flex; 
   align-items: center; 
}

.container {
   display: flex;
   justify-content: space-between;
   align-items: center;
   max-width: 1200px;
   margin: 0 auto;
   width: 100%; 
}

.logo img {
  height: 75px; 
  width: auto; 
}
.nav-links {
   display: flex;
   gap: 25px; 
   align-items: center; 
}

.nav-links a {
   color: #EAEAEA; 
   padding: 10px 15px; 
}
.nav-links a:hover, .nav-links a:focus {
   color: #F8B400; 
   border-bottom: 2px solid transparent; 
   outline: none; 
}

</style>
