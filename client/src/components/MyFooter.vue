<template>
  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <router-link to="/about" class="footer-heading">About Us</router-link>
      </div>
      <div class="footer-section">
        <router-link to="/help" class="footer-heading">Help</router-link>
      </div>
      <div class="footer-section">
        <router-link to="/visit" class="footer-heading">Visit Us</router-link>
      </div>
    </div>

    <div class="footer-content2">
      <div class="official-terms">
    <p>MIT License</p>
    <p>&copy; Copyright (c) [2023]</p>
    <p>Today: {{ currentDateTime }}</p>
  </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MyFooter',
  data() {
    return {
      currentDateTime: null
    } 
  },
  created() {
    this.getCurrentDateTime()
  },
  methods: {
    getCurrentDateTime() {
      const now = new Date()
      const dateTimeString = now.toLocaleString()
      this.currentDateTime = dateTimeString
    } 
  } 
} 
</script>


<style scoped>
footer {
  background-color: #394240;
  color: #EAEAEA;
  padding: 20px 0;
  box-sizing: border-box;
  border-top: 3px solid #F8B400;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-section {
  margin: 0 20px;
}

.footer-heading {
  font-family: 'Raleway', sans-serif;
  color: #EAEAEA;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
}

.footer-heading:hover {
  color: #F8B400;
  cursor: pointer;
}

.official-terms {
  padding: 10px;
  background-color: #2C3E50;
  margin: 5px;
  text-align: center;
}

</style>
