<template>
  <div>
    <h2>Shopping Cart</h2>
    <div v-if="cart.length === 0">
      Your cart is empty.
    </div>
    <div v-else>
      <div v-for="(item, index) in cart" :key="index" class="cart-item">
        <div class="cart-item-info">
          <img :src="item.image" alt="Item Image" />
          <h3>{{ item.name }}</h3>
          <p>Price: {{ item.price }}</p>
        </div>
        <button @click="removeFromCart(index)">Remove</button>
      </div>
      <p>Total Price: ${{ getTotalPrice() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: Array,
    isLoggedIn: Boolean // Assuming you have a prop for checking if the user is logged in
  },
  methods: {
    removeFromCart(index) {
      // Emit an event to remove an item from the cart
      this.$emit('remove-from-cart', index)
    },
    getTotalPrice() {
      return this.cart.reduce((total, item) => total + parseFloat(item.price), 0)
    }
  }
}
</script>
