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

<div class="footer-icons">
        <i class="icon">
          <img src="/images/cod-footer">
        </i>
        <i class="icon">
          <img src="/images/visa">
        </i>
        
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

.footer-heading {
  color: rgb(248, 250, 252);
  font-weight: bold;
  font-size: 20px;
}
.footer-icons {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Align to the right */
}

.footer-icons .icon {
  margin-left: 10px; /* Add some space between the icons */
  width: 10px;
  height: 10px;
}

</style>
