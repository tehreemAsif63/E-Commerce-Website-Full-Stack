<template>
    <div>
      <h2>Order Confirmation</h2>
      <div v-if="cart.length === 0">
        Your cart is empty.
      </div>
      <div v-else>
        <div v-for="(item, index) in cart" :key="index" class="cart-item">
          <div class="cart-item-info">
            <img :src="item.image" alt="Item Image" />
            <h3>{{ item.name }}</h3>
            <p>Price: {{ item.price }}</p>
          </div>
        </div>
        <p>Total Price: ${{ getTotalPrice() }}</p>
        <button @click="placeOrder">Place Order</button>
      </div>
    </div>
  </template>
  
<script>
import { Api } from '../Api'
export default {
  props: {
    cart: Array
  },
  data() {
    return {
      loggedIn: null // Assuming you pass the cart data to this component as a prop
    }
  },
  computed: {
    loggedInCustomer() {
      // Assuming you have a way to access the logged-in customer from your store
      return this.$store.state.loggedIn
    }
  },
  methods: {
    getTotalPrice() {
      return this.cart.reduce((total, item) => total + parseFloat(item.price), 0)
    },
    async  placeOrder() {
      /* if (!this.loggedIn) {
        // Redirect to the login page if the user is not logged in
        this.$router.push('/login') // Update the route as needed
        return
      } */
  
      // Create a new order with the items from the cart
      const newOrder = {
        title: 'Order', // You can customize the title as needed
        date: new Date().toISOString(), // Set the order date
        items: this.cart.map(item => ({
          itemId: item._id,
          quantity: 1 // You can customize this based on the quantity selected by the user
        })),
        customer: ''// Assuming you have customer data with a unique _id
      }
      console.log(newOrder)
      try {
        // Send the new order to your server using axios
        const response = await Api.post('/orders', newOrder)

        // Check the response status and handle success or error accordingly
        if (response.status === 201) {
          // Order was successfully created
          console.log('Order placed successfully!')
          // ...other actions on success
        } else {
          // Handle any other response status codes or errors
          console.error('Error placing order:', response.data)
          // ...handle error as needed
        }
      } catch (error) {
        // Handle network or other errors
        console.error('An error occurred while placing the order:', error)
        // ...handle error as needed
      }
  
      // Send the new order to your server or perform the necessary actions
      // to save it to your database
      // Example: axios.post('/api/orders', newOrder)
  
      // Clear the cart after placing the order
      this.$emit('clear-cart')
  
      // Optionally, you can show a success message or navigate to an order confirmation page
      this.$router.push('/') // Update the route as needed
    }
  }
}
</script>
