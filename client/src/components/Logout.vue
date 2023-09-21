<template>
    <div class="logout">
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
    </div>
  </template>
  
<script>
export default {
  // You can add any additional logic here if needed
  mounted() {
    // Assuming you have a Vuex store, you can use this to perform the logout action
    this.$store.dispatch('logoutUser')
  }
}
</script>
  
  <style scoped>
  .logout {
    text-align: center;
    margin-top: 50px;
  }
  </style>
