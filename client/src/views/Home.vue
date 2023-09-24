<template>
  <div class="page-container">
    <item-list @add-to-cart="addToCart"></item-list>
    <cart :cart="cart" @remove-from-cart="removeFromCart"></cart>
    <order :cart="cart" />
    <img src="@/assets/skye.jpg" alt="Background Image" class="background-image">
  </div>
</template>

<script>
import ItemList from './ItemList.vue'
import Cart from './Cart.vue'
import Order from './Order.vue'

export default {
  components: {
    ItemList,
    Cart,
    Order
  },
  data() {
    return {
      cart: []
    }
  },
  methods: {
    addToCart(item) {
      this.cart.push(item)
    },
    removeFromCart(index) {
      if (index >= 0 && index < this.cart.length) {
        this.cart.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.page-container {
  /* Set the background image */
  background-image: url('@/assets/skye.jpg');
  background-size: cover; /* Adjust as needed */
  background-repeat: no-repeat;
  background-attachment: fixed; /* To make it fixed if desired */
}

.background-image {
  /* Hide the image used for the background */
  display: none;
}
</style>
