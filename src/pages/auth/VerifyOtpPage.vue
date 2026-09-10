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

      <h4>Verify OTP</h4>

      <p class="subtitle">
        Enter the 6-digit OTP sent to your registered email.
      </p>

      <form @submit.prevent="verifyOtp">
        <div class="form-group">
          <label>Enter OTP</label>

          <input
            v-model="otp"
            type="text"
            maxlength="6"
            placeholder="Enter 6-digit OTP"
            required
          />
        </div>

        <button type="submit" class="btn"> Verify OTP </button>
      </form>

      <p v-if="message" class="success">
        {{ message }}
      </p>

      <p v-if="error" class="error">
        {{ error }}
      </p>

      <div class="resend">
        <span>Didn't receive OTP?</span>

        <button type="button" @click="resendOtp" :disabled="timer > 0">
          {{ timer > 0 ? `Resend in ${timer}s` : 'Resend OTP' }}
        </button>
      </div>

      <div class="bottom-link">
        <router-link to="/forgot-password"> ← Change Email </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const otp = ref('')
const message = ref('')
const error = ref('')
const timer = ref(30)

let interval

onMounted(() => {
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

const verifyOtp = () => {
  message.value = ''
  error.value = ''

  if (otp.value.length !== 6) {
    error.value = 'Please enter a valid 6-digit OTP.'
    return
  }

  // Backend API will be connected here
  // Example:
  // await axios.post("/api/verify-otp", {
  //   email: localStorage.getItem("resetEmail"),
  //   otp: otp.value
  // });

  localStorage.setItem('otpVerified', 'true')

  message.value = 'OTP verified successfully.'

  setTimeout(() => {
    router.push('/reset-password')
  }, 1000)
}

const resendOtp = () => {
  if (timer.value > 0) return

  message.value = 'A new OTP has been sent.'
  error.value = ''

  timer.value = 30

  // Backend API:
  // await axios.post("/api/resend-otp", {
  //   email: localStorage.getItem("resetEmail")
  // });
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
  color: #222;
}

.subtitle {
  text-align: center;
  color: #777;
  font-size: 14px;
  line-height: 1.5;
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
  font-size: 18px;
  text-align: center;
  letter-spacing: 6px;
}

input:focus {
  outline: none;
  border-color: #1976d2;
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

.resend {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
  color: #666;
}

.resend button {
  display: block;
  margin: 10px auto;
  border: none;
  background: transparent;
  color: #1976d2;
  cursor: pointer;
}

.resend button:disabled {
  color: #999;
  cursor: not-allowed;
}

.bottom-link {
  text-align: center;
  margin-top: 20px;
}

.bottom-link a {
  color: #1976d2;
  text-decoration: none;
}
</style>
