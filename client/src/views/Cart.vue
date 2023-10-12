<template>
  <b-container fluid>
    <b-row>
        <div class="shopping-cart-container">
          <div class="shopping-cart">
            <h4>Shopping Cart</h4>
            <div v-if="cart.length === 0">
              Your cart is empty.
            </div>
            <div v-else>
              <div v-for="(item, index) in cart" :key="index" class="cart-item">
                <div class="cart-item-info">
                  <b-img :src="item.image" alt="Item Image" class="item-image"></b-img>
                  <div class="item-details">
                    <h6>{{ item.name }}</h6>
                    <p>{{ item.price }}</p>
                  </div>
                </div>
                <b-button @click="removeFromCart(index)"  class="remove-button">
                  Remove
                </b-button>
              </div>
              <p class="total-price">Total Price: {{ getTotalPrice() }} SEK</p>
              <order :cart="cart" />
            </div>
          </div>
        </div>
    </b-row>
  </b-container>
</template>
<script>
import Order from './Order.vue'
export default {
  name: 'Cart',
  components: {
    Order
  },
  props: {
    cart: Array,
    isLoggedIn: Boolean 
  },
  methods: {
    removeFromCart(index) {
      this.$emit('remove-from-cart', index)
    },
    getTotalPrice() {
      return this.cart.reduce((total, item) => total + parseFloat(item.price), 0)
    }
  }
}
</script>

<style>
.shopping-cart-container {
  position: fixed;
  top: 100px; 
  right: 10px; 
  z-index: 999;
}

.shopping-cart {
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 20px;
  width: 300px; 
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.cart-item {
  display: flex;
  margin-bottom: 10px;
}

.item-image {
  max-width: 50px; 
  margin-right: 10px;
}

.item-details {
  flex-grow: 1;
}

.total-price {
  font-weight: bold;
  margin-top: 10px;
}
.remove-button {
  background-color: lightgreen; 
  color: #fff; 
  border: none;
  padding: 5px 10px; 
  font-size: 14px; 
  cursor: pointer;
  position: absolute;
  right: 40px;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #0056b3; 
}
</style>