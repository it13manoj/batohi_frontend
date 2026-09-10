```vue
<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- ================= LOGO ================= -->
      <div class="logo">
        <img src="../../../assets/images/logo3.png" alt="batohiDrive Logo" />
      </div>

      <!-- ================= TITLE ================= -->
      <h4> Driver Forgot Password? </h4>

      <!-- ================= SUBTITLE ================= -->
      <p class="subtitle">
        Enter your registered email address and we will send you an OTP to reset
        your driver account password.
      </p>

      <!-- ================= FORM ================= -->
      <form @submit.prevent="sendOtp">
        <div class="form-group">
          <label for="email"> Email Address </label>

          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your registered email"
            autocomplete="email"
            required
            :disabled="loading"
          />
        </div>

        <!-- ================= SEND OTP BUTTON ================= -->
        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? 'Sending OTP...' : 'Send OTP' }}
        </button>
      </form>

      <!-- ================= SUCCESS MESSAGE ================= -->
      <p v-if="message" class="success">
        {{ message }}
      </p>

      <!-- ================= ERROR MESSAGE ================= -->
      <p v-if="error" class="error">
        {{ error }}
      </p>

      <!-- ================= DEMO OTP INFO ================= -->
      <div v-if="showDemoInfo" class="demo-box">
        <div class="demo-title"> Demo Mode </div>

        <div class="demo-text">
          OTP will be:
          <strong>123456</strong>
        </div>
      </div>

      <!-- ================= BACK TO DRIVER LOGIN ================= -->
      <div class="bottom-link">
        <router-link to="/"> ← Back to Driver Login </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// =====================================================
// ROUTER
// =====================================================

const router = useRouter()

// =====================================================
// STATE
// =====================================================

const email = ref('')

const message = ref('')

const error = ref('')

const loading = ref(false)

const showDemoInfo = ref(false)

// =====================================================
// SEND OTP
// =====================================================

const sendOtp = () => {
  // ---------------------------------------------------
  // Clear previous messages
  // ---------------------------------------------------

  message.value = ''

  error.value = ''

  showDemoInfo.value = false

  // ---------------------------------------------------
  // Email validation
  // ---------------------------------------------------

  const enteredEmail = email.value.trim()

  if (!enteredEmail) {
    error.value = 'Please enter your email.'

    return
  }

  // ---------------------------------------------------
  // Email format validation
  // ---------------------------------------------------

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(enteredEmail)) {
    error.value = 'Please enter a valid email address.'

    return
  }

  // ---------------------------------------------------
  // Loading
  // ---------------------------------------------------

  loading.value = true

  // ===================================================
  // DEMO MODE
  // No API
  // ===================================================

  setTimeout(() => {
    // -------------------------------------------------
    // Save email for OTP page
    //
    // IMPORTANT:
    // VerifyOtpPage reads from sessionStorage
    // -------------------------------------------------

    sessionStorage.setItem('driverResetEmail', enteredEmail)

    // -------------------------------------------------
    // Clear old reset data
    // -------------------------------------------------

    sessionStorage.removeItem('driverOtpVerified')

    sessionStorage.removeItem('driverResetToken')

    // -------------------------------------------------
    // Stop loading
    // -------------------------------------------------

    loading.value = false

    // -------------------------------------------------
    // Success message
    // -------------------------------------------------

    message.value = 'OTP sent successfully to your registered email.'

    showDemoInfo.value = true

    // =================================================
    // GO TO VERIFY OTP PAGE
    // =================================================

    setTimeout(() => {
      router.push('/driver-verify-otp')
    }, 1000)
  }, 800)
}
</script>

<style scoped>
/* =====================================================
   AUTH CONTAINER
===================================================== */

.auth-container {
  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  background: #f4f6f9;

  padding: 20px;
}

/* =====================================================
   AUTH CARD
===================================================== */

.auth-card {
  width: 100%;

  max-width: 420px;

  background: #ffffff;

  padding: 40px;

  border-radius: 12px;

  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);

  box-sizing: border-box;
}

/* =====================================================
   LOGO
===================================================== */

.logo {
  text-align: center;

  margin-bottom: 20px;
}

.logo img {
  height: 150px;

  max-width: 100%;

  object-fit: contain;
}

/* =====================================================
   TITLE
===================================================== */

h4 {
  text-align: center;

  margin: 0 0 10px;

  color: #222;

  font-size: 24px;

  font-weight: 600;
}

/* =====================================================
   SUBTITLE
===================================================== */

.subtitle {
  text-align: center;

  color: #777;

  font-size: 14px;

  line-height: 1.6;

  margin-bottom: 30px;
}

/* =====================================================
   FORM GROUP
===================================================== */

.form-group {
  margin-bottom: 20px;
}

/* =====================================================
   LABEL
===================================================== */

label {
  display: block;

  margin-bottom: 8px;

  font-weight: 600;

  color: #333;

  font-size: 14px;
}

/* =====================================================
   INPUT
===================================================== */

input {
  width: 100%;

  padding: 13px;

  border: 1px solid #ddd;

  border-radius: 6px;

  box-sizing: border-box;

  font-size: 15px;

  transition: 0.2s;
}

input:focus {
  outline: none;

  border-color: #1976d2;

  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.08);
}

input::placeholder {
  color: #aaa;
}

input:disabled {
  background: #f5f5f5;

  cursor: not-allowed;
}

/* =====================================================
   BUTTON
===================================================== */

.btn {
  width: 100%;

  padding: 13px;

  border: none;

  border-radius: 6px;

  background: #1976d2;

  color: white;

  font-size: 16px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.btn:hover {
  background: #125ca5;
}

.btn:disabled {
  background: #90caf9;

  cursor: not-allowed;
}

/* =====================================================
   SUCCESS
===================================================== */

.success {
  color: #2e7d32;

  text-align: center;

  margin-top: 15px;

  font-size: 14px;
}

/* =====================================================
   ERROR
===================================================== */

.error {
  color: #d32f2f;

  text-align: center;

  margin-top: 15px;

  font-size: 14px;
}

/* =====================================================
   DEMO BOX
===================================================== */

.demo-box {
  margin-top: 15px;

  padding: 12px 15px;

  border-radius: 8px;

  background: #fff8e1;

  border: 1px solid #ffe082;

  text-align: center;
}

.demo-title {
  color: #8d6e00;

  font-size: 13px;

  font-weight: 700;

  margin-bottom: 4px;
}

.demo-text {
  color: #6d5a00;

  font-size: 13px;
}

.demo-text strong {
  color: #1976d2;

  font-size: 15px;
}

/* =====================================================
   BACK LINK
===================================================== */

.bottom-link {
  text-align: center;

  margin-top: 25px;
}

.bottom-link a {
  color: #1976d2;

  text-decoration: none;

  font-size: 14px;

  font-weight: 500;
}

.bottom-link a:hover {
  text-decoration: underline;
}

/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 480px) {
  .auth-container {
    padding: 15px;
  }

  .auth-card {
    padding: 30px 22px;
  }

  h4 {
    font-size: 21px;
  }

  .logo img {
    height: 120px;
  }
}
</style>
```
