<template>
  <div class="about-us">
    <h2 class="section-heading">About Us</h2>
    <p class="pargraphing">Welcome to our online shopping store! We embarked on this journey in 2023 during a collaborative web development project. Inspired by the possibilities of e-commerce, we decided to enter into the world of online shopping.</p>
    <p></p>
    <p class="pargraphing">At our store, we offer a wide range of products including clothing, stationery, shoes, books, furniture, accessories, and much more. Our commitment is to deliver high-quality items and ensure you have an amazing shopping experience with us.</p>
        <p></p>
    <p class="pargraphing">Thank you for being a part of our story. Happy shopping!  <span class="heart">❤</span> </p>
  </div>
</template>

<script>
export default {
  name: 'AboutUs'
}
</script>

<style scoped>
.about-us {
  padding: 100px;
  border: 10px solid #e0e0e0;
  border-radius: 20px;
  background-color: #f9f9f9;
  margin: 20px 10;
}

.section-heading {
  font-size: 70px;
  font-weight: bold;
  margin-bottom: 30px;
}

.paragraphing {
  
  font-size: 10px;
  margin-bottom: 10px;
  line-height: 1.6;
}

.heart {
  color: red;
}


</style>
