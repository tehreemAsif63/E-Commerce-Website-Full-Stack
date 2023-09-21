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
          <p>Price: ${{ item.price }}</p>
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
    cart: Array 
  },
  methods: {
    removeFromCart(index) {
      this.$emit('remove-from-cart', index)
    },
    getTotalPrice() {
      return this.cart.reduce((total, item) => total + item.price, 0)
    }
  }
}
</script>

<style scoped>
.cart-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  display: inline-block;
}

.cart-item-info {
  text-align: center;
}
</style>
