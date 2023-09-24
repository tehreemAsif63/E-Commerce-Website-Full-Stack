<template>
    <div class="logout">
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
    </div>
  </template>
  
<script>
export default {
  mounted() {
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
