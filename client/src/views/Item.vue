<template>
    <div>
      <h2>Item List</h2>
      <div class="item-card" v-for="item in items" :key="item._id">
        <img :src="item.image" alt="Item Image" class="item-image" />
        <div class="item-details">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-price">{{ item.price }}</div>
          <button @click="addToCart(item)">Add to Cart</button>
        </div>
      </div>
    </div>
  </template>
  
<script>
import { Api } from '@/Api'
  
export default {
  name: 'item',
  data() {
    return {
      items: []
    }
  },
  async mounted() {
    try {
      const response = await Api.get('/items')
      this.items = response.data
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  },
  methods: {
    addToCart(item) {
      // Implement the logic to add the item to the cart here
      // You can use a Vuex store or emit an event to communicate with a parent component.
      console.log('Added to cart:', item.name)
    }
  }
}
</script>
  
  <style scoped>
  .item-card {
    width: 4cm;
    height: auto;
    border: 1px solid #ccc;
    margin: 10px;
    padding: 10px;
    display: inline-block;
    text-align: center;
  }
  
  .item-image {
    max-width: 100%;
    max-height: 100px; /* Adjust the height as needed */
    margin-bottom: 10px;
  }
  
  .item-name {
    font-weight: bold;
  }
  
  .item-price {
    margin-top: auto;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
