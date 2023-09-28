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
  </footer>
</template>

<script>
export default {
  name: 'MyFooter'
}
</script>

<style scoped>
footer {
  background: #5d933c;
  color: rgb(249, 242, 242);
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
}

.footer-content {
  text-align: left;
  height: 25.5%; 
  display: flex;
  align-items: left;
  justify-content: space-around;
}

.footer-section {
  margin: 0 10px;
  }

.footer-heading {
  color: rgb(248, 250, 252);
  font-weight: bold;
  font-size: 30px;
  margin-top: 5px;
}

</style>
