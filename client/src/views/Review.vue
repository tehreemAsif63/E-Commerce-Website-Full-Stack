<template>
  <div>
    <button @click="reviewForm">Review</button>
    <div v-if="showForm">
      <form @submit.prevent="submitReview">
        <div>
          <label class="comment" >Comment:</label>
          <input class="comment-input" v-model="review.comment" type="text">
        </div>
        <div>
          <label for="rating">Rating (0-5):</label>
          <input v-model.number="review.rating" id="rating" type="number" min="0" max="5">
        </div>
        <div>
          <button type="submit">Submit Review</button>
        </div>
      </form>
    </div>
  </div>
</template>
 
<script>
import { Api } from '../Api'
export default {
  props: {
    itemId: String
  },
  data() {
    return {
      showForm: false,
      review: {
        comment: '',
        rating: 0
      },
      submittedReview: null
    }
  },
  methods: {
    reviewForm() {
      this.showForm = !this.showForm 
    },
    async submitReview() {
      if (this.review.rating < 0 || this.review.rating > 5) {
        alert('Rating must be between 0 and 5.')
        return
      }
      if (!this.$store.getters.isLoggedIn) {
        alert('Please log in to submit a review.')
        return
      }
      try {
        await Api.post(`/items/${this.itemId}/reviews`, this.review)
        alert('Review submitted successfully!')
        this.submittedReview = {
          rating: this.review.rating,
          comment: this.review.comment
        }
        this.review.comment = ''
        this.review.rating = 0
        this.showForm = false
      } catch (error) {
        alert('Review was not added.')
        this.showForm = false
      }
    }
  }
}
</script>

  
  
<style scoped>
  .comment {
    display: block;
    margin-top: 10px;
  }

  .comment-input {
    width: 70%;
    padding: 10px;
    margin-bottom: 10px;
  }

  #rating {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }

  button {
    margin-top: 5px;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }

 
  @media (max-width: 768px) {
    .comment-input, #rating {
      width: 70%;
    }
  }
</style>
