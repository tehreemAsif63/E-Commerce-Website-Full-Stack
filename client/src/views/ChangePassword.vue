<template>
  <div>
    <form @submit.prevent="changePassword">
      <b-form-group>
        <b-input
          type="password"
          id="oldPassword"
          v-model="passwordData.oldPassword"
          required
          placeholder="Enter your old password"
          size="sm"
        />
      </b-form-group>

      <b-form-group
      >
        <b-input
          type="password"
          id="newPassword"
          v-model="passwordData.newPassword"
          required
          placeholder="Enter your new password"
          size="sm"
        />
      </b-form-group>

      <b-form-group
      >
        <b-input
          type="password"
          id="confirmPassword"
          v-model="passwordData.confirmPassword"
          required
          placeholder="Confirm your new password"
          size="sm"
        />
      </b-form-group>

      <b-button type="submit" variant="primary" size="sm">Confirm</b-button>
    </form>
  </div>
</template>

  
<script>
import { Api } from '../Api'

export default {
  data() {
    return {
      passwordData: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      editingMode: false 
    }
  },
  methods: {
    async changePassword() {
      try {
        const { oldPassword, newPassword, confirmPassword } = this.passwordData

        if (newPassword !== confirmPassword) {
          alert('New password and confirmation do not match.')
          return
        }

        const customerId = this.$store.state.customer._id
        const response = await Api.post('/customers/validate-password', {
          customerId,
          oldPassword
        })

        if (response.status === 200) {
          await Api.put(`/customers/${customerId}`, { newPassword })
          alert('Password changed successfully.')
          this.editingMode = false
        } else {
          alert('Failed to change password. Please check your old password and try again.')
        }
      } catch (error) {
        alert('An error occurred while changing your password. Please try again later.')
      }
    }
  }
}
</script>
  
<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  margin-bottom: 5px;
  margin-top: 10px;
}

b-input {
  width: 100%; /* Use full width for small screens */
  margin: 5px 0; /* Add vertical margin for better spacing */
}

b-button[type="submit"] {
  margin-top: 15px;
}

@media (max-width: 768px) {
  form {
    height: auto; /* Allow content to determine height */
  }

  b-button[type="submit"] {
    margin-top: 15px;
  }
}
</style>
