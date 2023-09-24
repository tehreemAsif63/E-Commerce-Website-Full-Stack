<template>
  <div class="help">
    <h2 class="section-heading">Help Center</h2>
    
    <p class="section-sub-heading">Frequently Asked Questions</p>

    <p class="questions">How do I place an order?</p>
    <p class="paragraphing">Go to the product page, select your item, and click "Add to Cart."</p>
    <p class="paragraphing">Proceed to checkout, provide shipping information, and complete the payment.</p>
    <p></p>

    <p class="questions">How can I track my order?</p>
    <p class="paragraphing">Once your order is shipped, we'll email you a tracking link.</p>
    <p></p>

    <p class="questions">Troubleshooting Tips</p>
    <p class="paragraphing"> IF YOU'RE UNABLE TO LOGIN.</p>
    <p class="paragraphing">Contact support for assistance.</p>
    <p></p>
    <p class="paragraphing">IF YOUR PAYMENT IS DECLINED:</p>

    <p class="paragraphing">Check card details or try a different payment method.</p>

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

.help{
  padding: 100px;
  border: 10px solid #e0e0e0;
  border-radius: 20px;
  background-color: #cfe4ed;
  margin: 20px 10;
}

.section-heading {
  font-size: 70px;
  font-weight: bold;
  margin-bottom: 30px;
}
.section-sub-heading{
font-size: 25px;
font-weight: 900;
margin-bottom: 10px;
margin-top: 10px;
}
.questions{
font-size: 15px;
font-weight: bold;
margin-bottom: 5%; 
margin: 2%;
}

.paragraphing {
  
  font-size: 10px;
  margin-bottom: 10px;
  line-height: 1.6;
  padding: 2px;

}
.bottom-links {
  display: flex;
  justify-content: center;
  margin-top: 20px; 
}

.link {
  margin: 0 20px; 
  margin-top: 20px;
  font-size: 10px;
  font-weight: bold;
  color: #0066cc; 
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

</style>
