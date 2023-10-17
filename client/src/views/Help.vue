<template>
  <div class="help">
    <h2 class="section-heading">Help Center</h2>
    
    <p class="section-sub-heading">Frequently Asked Questions</p>

    <!-- FAQ Section -->
    <div class="faq-section">
      <div class="faq-item">
        <p class="question">How do I place an order?</p>
        <p class="answer">Go to the product page, select your item, and click "Add to Cart." Proceed to checkout, provide shipping information, and complete the payment.</p>
      </div>
      
      <div class="faq-item">
        <p class="question">How can I track my order?</p>
        <p class="answer">Once your order is shipped, we'll email you a tracking link.</p>
      </div>
      
      <div class="faq-item">
        <p class="question">Troubleshooting Tips</p>
        <p class="answer">1. Unable to login? Contact support for assistance.</p>
        <p class="answer">2. Payment declined? Check card details or try a different payment method.</p>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="contact-section">
      <p class="contact-heading">Contact Us</p>
      <p>Email: support@example.com</p>
      <p>Phone: +46-7123-456789</p>
    </div>

</div>

</template>

<script>
export default {
  name: 'Help'
}
</script>

<style scoped>
.help {
  max-width: 1200px;
  margin: 40px auto;
  padding: 50px;
  border-radius: 10px;
  background-color: #394240; 
  color: #EAEAEA; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  border: none; 
  padding-bottom: 100px;
}

.section-heading {
  font-family: 'Raleway', sans-serif;
  font-size: 48px; 
  font-weight: bold;
  color: #F8B400; 
  margin-bottom: 20px;
  text-align: center;
}

.section-sub-heading {
  font-family: 'Noto Sans', sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.faq-section, .contact-section {
  margin-bottom: 40px;
}

.question, .contact-heading {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
}

.answer {
  font-size: 18px;
  margin-bottom: 20px;
  line-height: 1.6; 
}

.contact-section p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 100px;
}

.bottom-links {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 100px;
}

.link {
  font-family: 'Noto Sans', sans-serif;
  margin: 0 15px;
  font-size: 18px;
  color: #F8B400;
  text-decoration: none;
  transition: color 0.3s ease; 
}

.link:hover {
  color: #FFD166; 
}
</style>
