<template>
  <div class="visit-us">
    <p>MIT License</p> 
    <p>&copy; Copyright (c) [2023]</p> 
    <p>Today: {{ currentDateTime }}</p>
        <p></p>
  </div>
</template>

<script>
export default {
  name: 'Terms',
  data() {
    return {
      currentDateTime: ''
    }
  },
  created() {
    this.updateCurrentDateTime()
  },
  methods: {
    updateCurrentDateTime() {
      const now = new Date()
      const year = now.getFullYear()
      const date = now.toLocaleDateString()
      const time = now.toLocaleTimeString()
      this.currentDateTime = `${date} ${time}, ${year}`
    }
  }
}
</script>

<style scoped>
.visit-us {
  padding: 100px;

  border: 4px solid lightgreen;
  border-radius: 20px;
  background-color: #f9f9f9;
  margin: 10px ;
  position:margin-bottom;
}

</style>