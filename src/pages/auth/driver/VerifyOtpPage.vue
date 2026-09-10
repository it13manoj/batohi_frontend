```vue
<template>
  <q-page class="verify-otp-page">
    <!-- ================= BACKGROUND ================= -->
    <div class="background-shape shape-one"></div>
    <div class="background-shape shape-two"></div>

    <!-- ================= OTP CARD ================= -->
    <div class="otp-wrapper">
      <q-card class="otp-card">
        <!-- ================= LOGO ================= -->
        <div class="text-center q-mb-md">
          <img
            src="@/assets/images/logo3.png"
            alt="BatohiDrive Logo"
            class="logo"
          />
        </div>

        <!-- ================= HEADER ================= -->
        <div class="text-center q-mt-lg">
          <div class="page-title"> Verify OTP </div>

          <div class="page-subtitle">
            Enter the verification code sent to your email
          </div>
        </div>

        <!-- ================= EMAIL ================= -->
        <div class="email-box q-mt-lg">
          <q-icon name="email" size="20px" color="primary" />

          <div class="email-content">
            <div class="email-label"> OTP sent to </div>

            <div class="email-text">
              {{ email || 'your registered email' }}
            </div>
          </div>
        </div>

        <!-- ================= OTP INPUT ================= -->
        <div class="otp-section q-mt-lg">
          <div class="input-label"> Enter 6-digit OTP </div>

          <q-input
            v-model="otp"
            outlined
            maxlength="6"
            inputmode="numeric"
            autocomplete="one-time-code"
            class="otp-input"
            placeholder="Enter OTP"
            :error="!!otpError"
            :error-message="otpError"
            @update:model-value="clearError"
            @keyup.enter="verifyOtp"
          />

          <div class="demo-hint">
            Demo OTP:
            <strong>123456</strong>
          </div>
        </div>

        <!-- ================= SUCCESS ================= -->
        <q-banner v-if="successMessage" rounded class="success-banner q-mt-md">
          <template #avatar>
            <q-icon name="check_circle" color="positive" />
          </template>

          {{ successMessage }}
        </q-banner>

        <!-- ================= ERROR ================= -->
        <q-banner v-if="errorMessage" rounded class="error-banner q-mt-md">
          <template #avatar>
            <q-icon name="error" color="negative" />
          </template>

          {{ errorMessage }}
        </q-banner>

        <!-- ================= VERIFY BUTTON ================= -->
        <q-btn
          unelevated
          no-caps
          color="primary"
          class="verify-btn q-mt-lg"
          :loading="loading"
          label="Verify OTP"
          icon="verified"
          @click="verifyOtp"
        />

        <!-- ================= RESEND OTP ================= -->
        <div class="resend-section">
          <span class="resend-text"> Didn't receive the OTP? </span>

          <q-btn
            flat
            no-caps
            color="primary"
            :disable="resendLoading || resendTimer > 0"
            :loading="resendLoading"
            @click="resendOtp"
          >
            {{ resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP' }}
          </q-btn>
        </div>

        <!-- ================= BACK ================= -->
        <div class="back-section">
          <q-btn
            flat
            no-caps
            color="grey-8"
            icon="arrow_back"
            label="Back to Forgot Password"
            @click="goBack"
          />
        </div>

        <!-- ================= FOOTER ================= -->
        <div class="footer-text"> Secure driver account verification </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// =====================================================
// STATE
// =====================================================

const email = ref('')
const otp = ref('')

const loading = ref(false)
const resendLoading = ref(false)

const otpError = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const resendTimer = ref(0)

let timer = null

// =====================================================
// DEMO OTP
// =====================================================

const DEMO_OTP = '123456'

// =====================================================
// ON MOUNTED
// =====================================================

onMounted(() => {
  // Get email saved from Forgot Password page
  email.value = sessionStorage.getItem('driverResetEmail') || ''

  // Clear previous OTP verification state
  sessionStorage.removeItem('driverOtpVerified')
  sessionStorage.removeItem('driverResetToken')

  // If email is missing
  if (!email.value) {
    $q.notify({
      type: 'warning',
      message: 'Please enter your email first.',
      position: 'top'
    })

    router.replace('/driver-forgot-password')
  }
})

// =====================================================
// CLEAR ERROR
// =====================================================

const clearError = () => {
  otpError.value = ''
  errorMessage.value = ''
  successMessage.value = ''
}

// =====================================================
// VERIFY OTP
// =====================================================

const verifyOtp = () => {
  clearError()

  // Remove spaces
  const enteredOtp = String(otp.value).trim()

  // Validate empty OTP
  if (!enteredOtp) {
    otpError.value = 'Please enter the OTP.'
    return
  }

  // Validate 6 digits
  if (!/^\d{6}$/.test(enteredOtp)) {
    otpError.value = 'OTP must contain exactly 6 digits.'
    return
  }

  loading.value = true

  // ===================================================
  // DEMO VERIFICATION
  // No API required
  // ===================================================

  setTimeout(() => {
    if (enteredOtp !== DEMO_OTP) {
      loading.value = false

      otpError.value = 'Invalid OTP. Please enter 123456.'

      errorMessage.value = 'The OTP you entered is incorrect.'

      return
    }

    // =================================================
    // OTP VERIFIED
    // =================================================

    sessionStorage.setItem('driverOtpVerified', 'true')

    sessionStorage.setItem('driverResetToken', 'driver-reset-verified')

    // Make sure email exists
    if (email.value) {
      sessionStorage.setItem('driverResetEmail', email.value)
    }

    successMessage.value = 'OTP verified successfully.'

    loading.value = false

    // =================================================
    // REDIRECT TO RESET PASSWORD
    // =================================================

    setTimeout(() => {
      router.push('/driver-reset-password')
    }, 500)
  }, 700)
}

// =====================================================
// RESEND OTP
// =====================================================

const resendOtp = () => {
  if (resendTimer.value > 0) {
    return
  }

  resendLoading.value = true

  clearError()

  setTimeout(() => {
    resendLoading.value = false

    successMessage.value =
      'A new OTP has been sent. Use 123456 for demo verification.'

    startResendTimer()

    $q.notify({
      type: 'positive',
      message: 'OTP resent successfully.',
      position: 'top'
    })
  }, 700)
}

// =====================================================
// RESEND TIMER
// =====================================================

const startResendTimer = () => {
  resendTimer.value = 30

  if (timer) {
    clearInterval(timer)
  }

  timer = setInterval(() => {
    if (resendTimer.value > 0) {
      resendTimer.value--
    } else {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}

// =====================================================
// BACK TO FORGOT PASSWORD
// =====================================================

const goBack = () => {
  router.push('/driver-forgot-password')
}

// =====================================================
// CLEAR TIMER
// =====================================================

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
/* =====================================================
   PAGE
===================================================== */

.verify-otp-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 16px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fb 0%, #eef3ff 100%);
}

/* =====================================================
   BACKGROUND SHAPES
===================================================== */

.background-shape {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.shape-one {
  width: 350px;
  height: 350px;
  top: -150px;
  left: -100px;
  background: rgba(25, 118, 210, 0.08);
}

.shape-two {
  width: 450px;
  height: 450px;
  bottom: -220px;
  right: -150px;
  background: rgba(25, 118, 210, 0.06);
}

/* =====================================================
   WRAPPER
===================================================== */

.otp-wrapper {
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 2;
}

/* =====================================================
   CARD
===================================================== */

.otp-card {
  width: 100%;
  padding: 34px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

/* =====================================================
   LOGO
===================================================== */

.logo {
  width: 150px;
  height: 105px;
  object-fit: contain;
}

/* =====================================================
   TITLE
===================================================== */

.page-title {
  font-size: 28px;
  font-weight: 800;
  color: #1f2937;
}

.page-subtitle {
  margin-top: 7px;
  font-size: 14px;
  line-height: 1.5;
  color: #6b7280;
}

/* =====================================================
   EMAIL BOX
===================================================== */

.email-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  background: #f4f8ff;
  border: 1px solid #dbeafe;
}

.email-content {
  min-width: 0;
}

.email-label {
  font-size: 12px;
  color: #6b7280;
}

.email-text {
  margin-top: 2px;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  word-break: break-word;
}

/* =====================================================
   OTP
===================================================== */

.input-label {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.otp-input :deep(input) {
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 8px;
}

.demo-hint {
  margin-top: 8px;
  text-align: center;
  font-size: 12px;
  color: #6b7280;
}

.demo-hint strong {
  color: #1976d2;
  font-size: 13px;
}

/* =====================================================
   BANNERS
===================================================== */

.success-banner {
  background: #ecfdf5;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.error-banner {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

/* =====================================================
   VERIFY BUTTON
===================================================== */

.verify-btn {
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
}

/* =====================================================
   RESEND
===================================================== */

.resend-section {
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3px;
}

.resend-text {
  font-size: 13px;
  color: #6b7280;
}

/* =====================================================
   BACK
===================================================== */

.back-section {
  margin-top: 14px;
  text-align: center;
}

/* =====================================================
   FOOTER
===================================================== */

.footer-text {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid #eeeeee;
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
}

/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 600px) {
  .verify-otp-page {
    padding: 20px 12px;
  }

  .otp-card {
    padding: 25px 20px;
    border-radius: 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .brand-name {
    font-size: 20px;
  }

  .logo-circle {
    width: 54px;
    height: 54px;
  }

  .otp-input :deep(input) {
    font-size: 20px;
    letter-spacing: 5px;
  }
}
</style>
```
