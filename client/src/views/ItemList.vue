<template>
  <div>
    <h2>items for sale</h2>
    <div class="item-card-container">
      <div v-for="item in items" :key="item._id" class="item-card">
        <b-card :title="item.name" :img-src="item.image" img-alt="Item Image" img-top tag="article"
          style="max-width: 20rem;" class="mb-2">
          <b-card-text>
            {{ item.price }}
          </b-card-text>
          <b-button class='button' @click="addToCart(item)" variant="primary">Add to Cart</b-button>
        </b-card>
      </div>
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
.item-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 10px;
}

.item-card {
  flex: 0 0 calc(15% - 20px);
  margin-right: 20px;
  margin-bottom: 20px;
}

.button {
  background-color: lightgreen;
  color: white;
}
</style>
