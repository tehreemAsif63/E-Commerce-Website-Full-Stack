<template>
  <div>
   
    <b-jumbotron header="DIT342 Frontend" lead="Welcome to your DIT342 Frontend Vue.js App">
      <b-button class="btn_message" variant="primary" v-on:click="getMessage()" >Get Message from Server</b-button>
      <p>Message from the server:<br/>
      {{ message }}</p>
    </b-jumbotron>
  </div>
</template>
<script>
// @ is an alias to /src


export default {
  name: 'home',
  components: {
    
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
