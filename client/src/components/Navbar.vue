
<template>
    <nav class="navbar">
      <div class="container">
        <div class="logo">E Commerce</div>
        <ul class="nav-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/items">Products</router-link></li>
          <li><router-link to="/customers">About</router-link></li>
          <li><router-link to="/">Login</router-link></li>
        </ul>
        <div class="cart-logo">🛒</div>
      </div>
    </nav>
  </template>
  <style scoped>
  .navbar {
    background-color: lightgreen;
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
  </style>