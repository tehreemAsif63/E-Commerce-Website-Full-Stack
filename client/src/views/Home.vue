<template>
  <div>
    <item-list @add-to-cart="addToCart"></item-list>
    <cart :cart="cart" @remove-from-cart="removeFromCart"></cart>
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
