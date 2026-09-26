<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="logo">
        <img
          src="../../assets/images/logo3.png"
          alt="batohiDrive Logo"
          style="height: 100px; object-fit: contain"
        />
      </div>

      <h4>OTP Verification</h4>

      <p class="subtitle">
        Enter the 6-digit OTP code sent to:
        <br />
        <strong class="text-primary">{{ targetEmail || 'your registered email' }}</strong>
      </p>

      <form @submit.prevent="verifyOtp">
        <div class="form-group">
          <label>Enter 6-Digit OTP</label>

          <input
            v-model="otp"
            type="text"
            maxlength="6"
            inputmode="numeric"
            placeholder="••••••"
            required
            class="otp-field"
          />
        </div>

        <button type="submit" class="btn" :disabled="loading">
          <span v-if="!loading">Verify OTP & Continue</span>
          <span v-else>Verifying...</span>
        </button>
      </form>

      <p v-if="message" class="success">
        {{ message }}
      </p>

      <p v-if="error" class="error">
        {{ error }}
      </p>

      <div class="resend">
        <span>Didn't receive OTP?</span>

        <button type="button" @click="resendOtp" :disabled="timer > 0 || resending">
          {{ resending ? 'Sending...' : timer > 0 ? `Resend in ${timer}s` : 'Resend OTP' }}
        </button>
      </div>

      <div class="bottom-link">
        <router-link to="/"> ← Return to Login </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/config/api'
import { saveAuthSession, getDashboardRoute } from '@/utils/auth.js'

const router = useRouter()
const route = useRoute()

const otp = ref('')
const message = ref('')
const error = ref('')
const timer = ref(60)
const loading = ref(false)
const resending = ref(false)

const targetEmail = ref(
  route.query.email ||
    localStorage.getItem('pendingAuthEmail') ||
    localStorage.getItem('resetEmail') ||
    ''
)
const targetUserId = ref(route.query.userId || localStorage.getItem('pendingAuthUserId') || null)
const isResetMode = ref(route.query.mode === 'reset' || (!route.query.mode && !!localStorage.getItem('resetEmail')))

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

const verifyOtp = async () => {
  message.value = ''
  error.value = ''

  if (otp.value.trim().length !== 6) {
    error.value = 'Please enter a valid 6-digit OTP.'
    return
  }

  loading.value = true

  try {
    const response = await api.post('/users/verify-otp', {
      user_id: targetUserId.value,
      email: targetEmail.value,
      otp: otp.value.trim()
    })

    const data = response.data

    if (isResetMode.value && !data.token) {
      localStorage.setItem('otpVerified', 'true')
      message.value = 'OTP verified successfully. Proceeding to password reset.'
      setTimeout(() => {
        router.push('/reset-password')
      }, 1000)
      return
    }

    if (data.token) {
      saveAuthSession(data.token, data.user, true)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      message.value = 'OTP verified! Entering your dashboard...'

      localStorage.removeItem('pendingAuthEmail')
      localStorage.removeItem('pendingAuthUserId')

      setTimeout(() => {
        const targetRoute = getDashboardRoute(data.user?.user_type || data.user?.role)
        router.push(targetRoute)
      }, 1000)
    } else {
      localStorage.setItem('otpVerified', 'true')
      router.push('/reset-password')
    }

  } catch (err) {
    error.value = err.response?.data?.message || 'Invalid or expired OTP code. Please try again.'
  } finally {
    loading.value = false
  }
}

const resendOtp = async () => {
  if (timer.value > 0 || resending.value) return

  resending.value = true
  message.value = ''
  error.value = ''

  try {
    await api.post('/users/resend-otp', {
      user_id: targetUserId.value,
      email: targetEmail.value
    })

    message.value = 'A new OTP has been sent to your email.'
    timer.value = 60
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to resend OTP. Please try again.'
  } finally {
    resending.value = false
  }
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
  max-width: 440px;
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.logo {
  margin-bottom: 16px;
}

h4 {
  margin: 0 0 8px 0;
  font-weight: 700;
  color: #1e293b;
}

.subtitle {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 24px;
}

.form-group {
  text-align: left;
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 13px;
  color: #334155;
}

.otp-field {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 2px solid #cbd5e1;
  font-size: 22px;
  letter-spacing: 8px;
  text-align: center;
  font-weight: 700;
  box-sizing: border-box;
  outline: none;
}

.otp-field:focus {
  border-color: #1976d2;
}

.demo-tip {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 18px;
  background: #f1f5f9;
  padding: 6px;
  border-radius: 6px;
}

.btn {
  width: 100%;
  padding: 14px;
  background: #1976d2;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn:hover {
  background: #1565c0;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success {
  color: #16a34a;
  margin-top: 14px;
  font-size: 13px;
  font-weight: 600;
}

.error {
  color: #dc2626;
  margin-top: 14px;
  font-size: 13px;
  font-weight: 600;
}

.resend {
  margin-top: 24px;
  font-size: 13px;
  color: #64748b;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.resend button {
  background: none;
  border: none;
  color: #1976d2;
  font-weight: 600;
  cursor: pointer;
}

.resend button:disabled {
  color: #94a3b8;
  cursor: not-allowed;
}

.bottom-link {
  margin-top: 20px;
}

.bottom-link a {
  color: #64748b;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
}
</style>
