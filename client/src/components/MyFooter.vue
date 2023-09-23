<template>
  <footer>
   <div class="footer-content">
      <div class="footer-section">                   
        <h5>About Us</h5>
        <router-link to="/about">Learn more about us</router-link>
      </div>
      <div class="footer-section">
        <h5>Help</h5>
        <router-link to="/help">Get help and support</router-link>
      </div>
      <div class="footer-section">
        <h5>Visit</h5>
        <router-link to="/visit">Visit Us</router-link>
      </div>

      
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MyFooter'
}
</script>

<style scoped>
footer {
  background: #89afc3;
  color: rgb(249, 242, 242);
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
}

.footer-content {
  text-align: center;
  height: 25.5%; 
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.footer-section {
  margin: 0 10px;
}
</style>
