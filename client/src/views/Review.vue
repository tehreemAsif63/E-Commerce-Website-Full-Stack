<template>
  <div>
    <button @click="showReviewForm">Review</button>
    <div v-if="showForm">
      <h3>Add a Review</h3>
      <form @submit.prevent="submitReview">
        <div>
          <label class="comment" for="comment">Comment:</label>
          <input class="comment-input" v-model="review.comment" id="comment" type="text">
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
    <div v-if="submittedReview">
      <h3>Submitted Review</h3>
      <p>Rating: {{ submittedReview.rating }}</p>
      <p>Comment: {{ submittedReview.comment }}</p>
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
    showReviewForm() {
      this.showForm = true
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
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`
        }
        await Api.post(`/items/${this.itemId}/reviews`, this.review, { headers })
        alert('Review submitted successfully!')
        this.submittedReview = {
          rating: this.review.rating,
          comment: this.review.comment
        }
        this.review.comment = ''
        this.review.rating = 0
        this.showForm = false
      } catch (error) {

      }
    }
  }
}
</script>

  
  
<style scoped>
.comment {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
}
.comment-input {
  width: 150px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
</style>
