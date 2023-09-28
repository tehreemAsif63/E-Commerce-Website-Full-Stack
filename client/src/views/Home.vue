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

export default {
  components: {
    ItemList,
    Cart
   
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

  background-image: url('@/assets/skye.jpg');
  background-size: cover; 
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.background-image {
  display: none;
}
</style>
