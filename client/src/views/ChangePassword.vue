<template>
    <div>
        <h2>Change Password</h2>
        <form @submit.prevent="changePassword">
            <label for="oldPassword">Old Password:</label>
            <input type="password" id="oldPassword" v-model="passwordData.oldPassword" required>
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" v-model="passwordData.newPassword" required>
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" v-model="passwordData.confirmPassword" required>
            <button type="submit">Change Password</button>
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
  
<style scoped></style>
