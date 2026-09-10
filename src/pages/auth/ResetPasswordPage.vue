<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="logo">
        <img
          src="../../assets/images/logo3.png"
          alt="batohiDrive Logo"
          style="height: 250px; object-fit: contain"
        />
      </div>

      <h4>Reset Password</h4>

      <p class="subtitle"> Create a new password for your account. </p>

      <form @submit.prevent="resetPassword">
        <!-- New Password -->
        <div class="form-group">
          <label>New Password</label>

          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter new password"
            required
          />
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <label>Confirm Password</label>

          <input
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Confirm new password"
            required
          />
        </div>

        <!-- Show Password -->
        <div class="show-password">
          <input id="showPassword" type="checkbox" v-model="showPassword" />

          <label for="showPassword"> Show Password </label>
        </div>

        <!-- Password Rules -->
        <div class="password-rules">
          <p :class="{ valid: password.length >= 8 }">
            ✓ At least 8 characters
          </p>

          <p :class="{ valid: /[A-Z]/.test(password) }">
            ✓ One uppercase letter
          </p>

          <p :class="{ valid: /[0-9]/.test(password) }"> ✓ One number </p>
        </div>

        <button type="submit" class="btn"> Reset Password </button>
      </form>

      <p v-if="message" class="success">
        {{ message }}
      </p>

      <p v-if="error" class="error">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)

const message = ref('')
const error = ref('')

const resetPassword = () => {
  message.value = ''
  error.value = ''

  if (password.value.length < 8) {
    error.value = 'Password must contain at least 8 characters.'
    return
  }

  if (!/[A-Z]/.test(password.value)) {
    error.value = 'Password must contain at least one uppercase letter.'
    return
  }

  if (!/[0-9]/.test(password.value)) {
    error.value = 'Password must contain at least one number.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  // Backend API will be connected here
  // Example:
  //
  // await axios.post("/api/reset-password", {
  //   email: localStorage.getItem("resetEmail"),
  //   password: password.value
  // });

  message.value = 'Password reset successfully.'

  localStorage.removeItem('resetEmail')
  localStorage.removeItem('otpVerified')

  setTimeout(() => {
    router.push('/')
  }, 1500)
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6f9;
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
}

.logo {
  text-align: center;
  color: #1976d2;
  margin-bottom: 10px;
}

h4 {
  text-align: center;
  color: #222;
}

.subtitle {
  text-align: center;
  color: #777;
  font-size: 14px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 13px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 15px;
}

.form-group input:focus {
  outline: none;
  border-color: #1976d2;
}

.show-password {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
}

.show-password input {
  width: auto;
}

.show-password label {
  margin: 0;
  font-size: 14px;
  font-weight: normal;
}

.password-rules {
  background: #f8f9fa;
  padding: 10px 15px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.password-rules p {
  margin: 5px 0;
  font-size: 13px;
  color: #999;
}

.password-rules p.valid {
  color: #2e7d32;
}

.btn {
  width: 100%;
  padding: 13px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background: #125ca5;
}

.success {
  color: #2e7d32;
  text-align: center;
  margin-top: 15px;
}

.error {
  color: #d32f2f;
  text-align: center;
  margin-top: 15px;
}
</style>
