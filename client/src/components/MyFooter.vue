<template>
  <footer>
   <div class="footer-content">
      This is my footer. I am checking if it works.
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
  justify-content: center;
}
</style>
