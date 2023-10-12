<template>
  <div class="page-container">
    <b-row>
      <b-col lg="8">
        <item-list @add-to-cart="addToCart"></item-list>
      </b-col>
      <b-col lg="9">
        <cart :cart="cart" @remove-from-cart="removeFromCart"></cart>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <order :cart="cart" />
      </b-col>
    </b-row>
    <b-img
      src="@/assets/skye.jpg"
      alt="Background Image"
      class="background-image"
      fluid
    ></b-img>
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
