<template>
  <div class="help">
    <h2 class="section-heading">Help Center</h2>
    
    <p class="section-sub-heading">Frequently Asked Questions</p>

    <p class="questions">How do I place an order?</p>
    <p class="paragraphing">Go to the product page, select your item, and click "Add to Cart." Proceed to checkout, provide shipping information, and complete the payment.</p>
    <p></p>

    <p class="questions">How can I track my order?</p>
    <p class="paragraphing">Once your order is shipped, we'll email you a tracking link.</p>
    <p></p>

    <p class="questions">Troubleshooting Tips</p>
    <p class="paragraphing">1. Unable to login? Contact support for assistance.</p>
    <p class="paragraphing">2. Payment declined? Check card details or try a different payment method.</p>

    <p class="questions">Contact Us</p>
    <p class="paragraphing">Email: support@example.com</p>
    <p class="paragraphing">Phone: +46-7123-456789</p>

<div class="bottom-links">
      <router-link to="/user-guides" class="link">User Guides</router-link>
      <router-link to="/privacy-policy" class="link">Privacy Policy</router-link>
      <router-link to="/feedback" class="link">Feedback</router-link>
</div>

 </div>
</template>

<script>
export default {
  name: 'Help'
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #6f6fb0a4;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.help{
  padding: 100px;
  border: 10px solid #e0e0e0;
  border-radius: 20px;
  background-color: #81b97bcc;
  margin: 20px 10;
}

.section-heading {
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 30px;
  color: azure;
}
.section-sub-heading{
font-size: 50px;
font-weight: 900;
margin-bottom: 10px;
margin-top: 10px;
}
.questions{
font-size: 35px;
font-weight: bold;
margin-bottom: 0px; 
margin: 2%;
}

.paragraphing {
  
  font-size: 25px;
  margin-bottom: 0px;
  line-height: 1.6;
  padding: 2px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.bottom-links {
  display: flex;
  justify-content: center;
  margin-top: 20px; 
}

.link {
  margin: 0 20px; 
  margin-top: 70px;
  font-size: 20px;
  font-weight: bold;
  color: #0066cc; 
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

</style>
