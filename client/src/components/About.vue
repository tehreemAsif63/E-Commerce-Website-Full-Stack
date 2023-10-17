<template>
  <div class="about-us">
    <b-container>
      <b-row>
        <b-col md="6" sm="12">
          <h2 class="section-heading">About Us</h2>
          <p class="paragraphing">Welcome to our online shopping store! We embarked on this journey in 2023 during a collaborative web development project. Inspired by the possibilities of e-commerce, we decided to enter into the world of online shopping.</p>
          <p class="paragraphing">At our store, we offer a wide range of products including clothing, stationery, shoes, books, furniture, accessories, and much more. Our commitment is to deliver high-quality items and ensure you have an amazing shopping experience with us.</p>
          <p class="paragraphing">Thank you for being a part of our story. Happy shopping! <span class="heart">❤</span></p>
          <p class="paragraphing">Danesh Mohammadi || Simone Graziosi || Tehreem Asif</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'AboutUs'
}
</script>

<style scoped>
.about-us {
  padding: 20px;
  border: 10px solid #e0e0e0;
  border-radius: 20px;
  background-color: #81b97bcc;
  margin: 20px 10;
}

.section-heading {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
}

.paragraphing {
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 1.6;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.heart {
  color: red;
}
</style>
