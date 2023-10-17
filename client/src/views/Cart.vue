<template>
  <b-container fluid>
    <div class="shopping-cart-container" :class="{ 'empty-cart': !isCartOpen }">
      <b-icon icon="cart4" @click="toggleCart"></b-icon>
      <div class="cart-item-count">{{ cartItemCount }}</div>
      <div v-if="cart.length === 0">
      </div>
      <div v-else v-show="isCartOpen">
        <div v-for="(item, index) in cart" :key="index" class="cart-item">
          <div class="cart-item-info">
            <b-img :src="item.image" alt="Item Image" class="item-image"></b-img>
            <div class="item-details">
              <h6 class="item-name">{{ item.name }}</h6>
              <p class="item-price">{{ item.price }} SEK</p>
            </div>
          </div>
            <b-icon @click="removeFromCart(index)" class="remove-icon" icon="trash"></b-icon>
        </div>
        <p class="total-price">Total Price: {{ getTotalPrice() }} SEK</p>
        <order :cart="cart" />
      </div>
    </div>
  </b-container>
</template>

<script>
import Order from './Order.vue'
export default {
  name: 'Cart',
  components: {
    Order
  },
  data() {
    return {
      isCartOpen: false,
      cartItemCount: 0
    } 
  },
    
  props: {
    cart: Array,
    isLoggedIn: Boolean
  },
  methods: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen
    },
    removeFromCart(index) {
      this.$emit('remove-from-cart', index)
      this.cartItemCount--
    },
    getTotalPrice() {
      return this.cart.reduce((total, item) => total + parseFloat(item.price), 0)
    }
  },
  watch: {
    cart: {
      handler(newCart) {
        this.cartItemCount = newCart.length
      },
      immediate: true
    }
  }
}
</script>

<style>
.shopping-cart-container {
  position: fixed;
  top: 120px;
  right: 10px;
  z-index: 999;
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 20px;
  width: 300px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
@media screen and (max-width: 768px) {
  .shopping-cart-container {
    width: 50%; 
    margin: 0 auto;
    margin-top: 20%; 
  }}
  .empty-cart {
  width: 50px; 
  height: 50px;
  border-radius: 50%; 
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; 
  transition: background-color 0.3s;

 
}

.empty-cart:hover {
  background-color: #00ffaa; 
}

.cart-item {
  display: flex;
  margin-bottom: 10px;
}

.item-name {
  font-size: 14px;
  font-weight: bold;
  margin: 0;
}

.item-price {
  font-size: 12px;
  color: #777;
  margin: 0;
}

.item-image {
  max-width: 50px;
  margin-right: 10px;
}

.total-price {
  font-weight: bold;
  margin-top: 10px;
}

.remove-icon {
  position: absolute;
  right: 40px;

  &:hover {
    transform: scale(1.4); 
  }
 
}
.cart-icon {
  font-size: 24px; 
  cursor: pointer; 
  transition: transform 0.3s; 

  
  &:hover {
    transform: scale(1.4); 
  }
}

</style>