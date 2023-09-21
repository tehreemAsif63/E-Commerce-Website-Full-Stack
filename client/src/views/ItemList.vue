<template>
  <div>
    <h2>Item List</h2>
    <div v-for="item in items" :key="item.id" class="item-card">
      <div class="item-info">
        <img :src="item.image" alt="Item Image" />
        <h3>{{ item.name }}</h3>
        <p>Price: ${{ item.price }}</p>
      </div>
      <button @click="addToCart(item)">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import { Api } from '../Api'
export default {
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    fetchItems() {
      Api.get('/items')
        .then((response) => {
          this.items = response.data
        })
        .catch((error) => {
          console.error('Error fetching items:', error)
        })
    },
    addToCart(item) {
      this.$emit('add-to-cart', item)
    }
  }
}
</script>

<style scoped>
.item-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  display: inline-block;
}

.item-info {
  text-align: center;
}
</style>
