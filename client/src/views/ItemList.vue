<template>
   <div class="contain">
    <b-row class="items-list" >
      <div v-for="item in items" :key="item._id" class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4">
        <b-card :title="item.name" :img-src="item.image" img-alt="Item Image" img-top tag="article" class="mb-2">
          <b-card-text class="price">
            {{ item.price }} SEK
          </b-card-text>
          <b-button class="button" @click="addToCart(item)" variant="success">Add to cart</b-button>
          <Review :itemId="item._id" :reviews="item.reviews"></Review>
        </b-card>
      </div>
    </b-row>
  </div>
</template>

<script>
import { Api } from '../Api'
import Review from './Review.vue'
export default {
  components: {
    Review
  },
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    async fetchItems() {
      try {
        const response = await Api.get('/items')
        this.items = response.data
      } catch (error) {
    
      }
    },
    addToCart(item) {
      this.$emit('add-to-cart', item)
    }
  }
}
</script>
<style scoped>
.button {
  background-color: lightgreen;
  color: white;
}
.items-list {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.contain{
  margin-top: 10%;
}
</style>
