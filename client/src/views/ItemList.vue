<template>
   <div>
    <b-row class="items-list" >
      <div v-for="item in items" :key="item._id" class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4">
        <b-card :title="item.name" :img-src="item.image" img-alt="Item Image" img-top tag="article" class="mb-2">
          <b-card-text class="price">
            {{ item.price }}
          </b-card-text>
          <b-button class="button" @click="addToCart(item)" variant="success">Add to Cart</b-button>
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
    fetchItems() {
      Api.get('/items')
        .then((response) => {
          this.items = response.data
        })
        .catch((error) => {
          console.log(error)
        })
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
</style>
