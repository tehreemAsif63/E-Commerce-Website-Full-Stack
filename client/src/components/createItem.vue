<template>
    <div>
        <h2>Create Item</h2>
        <form @submit.prevent="createItem">
            <div class="form-group">
                <label for="name">Item Name</label>
                <input type="text" id="name" v-model="name" required />
            </div>
            <div class="form-group">
                <label for="price">Item Price</label>
                <input type="number" id="price" v-model="price" required />
            </div>
            <div class="form-group">
                <label for="image">Item Image</label>
                <input type="file" id="image" name="image" value="" required />
            </div>
            <button type="submit">Create</button>
        </form>
    </div>
</template>
<script>
import { Api } from '@/Api'
export default {
  name: 'CreateItem',
  data() {
    return {
      name: '',
      price: '',
      image: null
    }
  },
  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0]
    },
    createItem() {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('price', this.price)
      formData.append('image', this.image)
      Api.post('/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          console.log('Item created:', response.data)

          this.name = ''
          this.price = ''
          this.image = ''
        })
        .catch((error) => {
          console.error('Error creating item:', error)
        })
    }
  }
}
</script>
