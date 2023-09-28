<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Visit></Visit>
    
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import Visit from './views/Visit.vue'
export default {
  name: 'app',
  components: {
    Navbar,
    Visit
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
