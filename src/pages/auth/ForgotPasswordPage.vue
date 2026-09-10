<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="logo">
        <img
          src="../../assets/images/logo3.png"
          alt="batohiDrive Logo"
          style="height: 150px; object-fit: contain"
        />
      </div>

      <h4>Forgot Password?</h4>

      <p class="subtitle">
        Enter your registered email address and we will send you an OTP.
      </p>

      <form @submit.prevent="sendOtp">
        <div class="form-group">
          <label>Email Address</label>

          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <button type="submit" class="btn"> Send OTP </button>
      </form>

      <p v-if="message" class="success">
        {{ message }}
      </p>

      <p v-if="error" class="error">
        {{ error }}
      </p>

      <div class="bottom-link">
        <router-link to="/"> ← Back to Login </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const message = ref('')
const error = ref('')

const sendOtp = () => {
  message.value = ''
  error.value = ''

  if (!email.value) {
    error.value = 'Please enter your email.'
    return
  }

  // Backend API will be connected here
  // Example:
  // await axios.post("/api/forgot-password", {
  //   email: email.value
  // });

  localStorage.setItem('resetEmail', email.value)

  message.value = 'OTP sent successfully.'

  setTimeout(() => {
    router.push('/verify-otp')
  }, 1000)
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
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
}

.logo {
  text-align: center;
  color: #1976d2;
  margin-bottom: 20px;
}

h4 {
  text-align: center;
  margin-bottom: 10px;
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

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 13px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 15px;
}

input:focus {
  outline: none;
  border-color: #1976d2;
}

.btn {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 6px;
  background: #1976d2;
  color: white;
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

.bottom-link {
  text-align: center;
  margin-top: 25px;
}

.bottom-link a {
  color: #1976d2;
  text-decoration: none;
}
</style>
