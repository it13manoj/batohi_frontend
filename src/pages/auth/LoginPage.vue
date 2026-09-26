<template>
  <q-page class="login-page">
    <div class="login-container">
      <!-- ================= LEFT SIDE ================= -->
      <div class="login-left">
        <div class="brand-section">
          <div class="brand-logo">
            <img
              src="../../assets/images/logo3.png"
              alt="batohiDrive Logo"
              style="height: 60px; object-fit: contain"
            />
          </div>

          <div>
            <div class="brand-name">Batohi</div>
            <div class="brand-subtitle">Every Path. Every Journey.</div>
          </div>
        </div>

        <div class="welcome-section">
          <h1>Welcome Back</h1>

          <p>
            Login to your Batohi account and manage everything from one secure
            platform.
          </p>

          <div class="features">
            <div class="feature">
              <div class="feature-icon">
                <q-icon name="verified_user" />
              </div>

              <div>
                <strong>Secure Access</strong>
                <span>Multi-factor authentication protects your account.</span>
              </div>
            </div>

            <div class="feature">
              <div class="feature-icon">
                <q-icon name="dashboard" />
              </div>

              <div>
                <strong>Centralized Management</strong>
                <span>Manage rides, drivers, and bookings seamlessly.</span>
              </div>
            </div>

            <div class="feature">
              <div class="feature-icon">
                <q-icon name="speed" />
              </div>

              <div>
                <strong>Fast & Reliable</strong>
                <span>Real-time tracking and continuous 30-day session.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= RIGHT SIDE ================= -->
      <div class="login-right">
        <q-card class="login-card">
          <!-- ==============================================
               PANEL 1: EMAIL & PASSWORD LOGIN
          =============================================== -->
          <div v-if="currentStep === 'LOGIN'">
            <!-- Header -->
            <q-card-section class="login-header">
              <div class="mobile-logo">
                <img
                  src="../../assets/images/logo3.png"
                  alt="batohiDrive Logo"
                  style="height: 100px; object-fit: contain"
                />
              </div>

              <h2>Login</h2>
              <p>Select your portal to access your panel</p>

              <!-- Role Tab Selection -->
              <q-tabs
                v-model="activeRole"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="USERS" icon="person" label="User" />
                <q-tab name="DRIVER" icon="directions_car" label="Driver" />
                <q-tab name="AGENT" icon="support_agent" label="Agent" />
              </q-tabs>
            </q-card-section>

            <!-- Form -->
            <q-card-section>
              <q-form
                ref="loginForm"
                @submit.prevent="handleLogin"
                class="q-gutter-md"
              >
                <!-- Email -->
                <q-input
                  v-model="form.email"
                  outlined
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  autocomplete="email"
                  :rules="[
                    val => !!val || 'Email is required',
                    val => /.+@.+\..+/.test(val) || 'Enter a valid email'
                  ]"
                >
                  <template #prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>

                <!-- Password -->
                <q-input
                  v-model="form.password"
                  outlined
                  label="Password"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[val => !!val || 'Password is required']"
                >
                  <template #prepend>
                    <q-icon name="lock" />
                  </template>

                  <template #append>
                    <q-icon
                      :name="showPassword ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>

                <!-- Forgot Password -->
                <div class="forgot-password">
                  <q-btn
                    flat
                    no-caps
                    color="primary"
                    label="Forgot Password?"
                    @click="goToForgotPassword"
                  />
                </div>

                <!-- Remember Me (Session stays valid 1 month) -->
                <div class="row items-center justify-between">
                  <q-checkbox v-model="form.remember" label="Keep me logged in (30 days)" />
                  <span class="text-caption text-positive row items-center">
                    <q-icon name="security" size="14px" class="q-mr-xs" />
                    Secure SSL
                  </span>
                </div>

                <!-- Single Login Button for Active Role -->
                <q-btn
                  type="submit"
                  :label="`Continue to ${roleLabel} Portal`"
                  :icon="roleIcon"
                  color="primary"
                  unelevated
                  no-caps
                  class="login-button full-width"
                  :loading="loading"
                />
              </q-form>
            </q-card-section>

            <!-- Register -->
            <q-card-section class="register-section">
              <span>Don't have an account?</span>
              <q-btn
                flat
                no-caps
                color="primary"
                label="Create Account"
                @click="goToRegister"
              />
            </q-card-section>

            <q-separator />

            <!-- Dedicated Admin Portal Access -->
            <q-card-section class="text-center q-py-sm bg-grey-1">
              <div class="row items-center justify-center text-caption text-grey-7 q-gutter-x-xs">
                <q-icon name="shield" color="primary" size="16px" />
                <span>System Administrator?</span>
                <q-btn
                  flat
                  dense
                  no-caps
                  color="primary"
                  label="Admin Portal Login →"
                  to="/admin/login"
                  class="text-weight-bold"
                />
              </div>
            </q-card-section>
          </div>

          <!-- ==============================================
               PANEL 2: DEDICATED OTP VERIFICATION PANEL
          =============================================== -->
          <div v-else-if="currentStep === 'OTP'" class="otp-panel">
            <q-card-section class="login-header q-pb-none">
              <div class="row justify-center q-mb-sm">
                <q-avatar size="64px" color="blue-1" text-color="primary">
                  <q-icon name="mark_email_read" size="36px" />
                </q-avatar>
              </div>

              <div class="row justify-center q-mb-xs">
                <q-badge color="primary" text-color="white" class="q-px-sm q-py-xs text-weight-bold text-caption">
                  <q-icon name="verified_user" class="q-mr-xs" size="13px" />
                  TWO-FACTOR AUTHENTICATION
                </q-badge>
              </div>

              <h2>OTP Verification</h2>
              <p class="q-mb-xs">
                Enter the 6-digit code sent to your registered email
              </p>
              <div class="email-badge-container q-mb-md">
                <q-chip outline color="primary" icon="email" dense class="text-weight-bold">
                  {{ pendingAuth.email }}
                </q-chip>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-sm">
              <!-- 6-Digit Code Inputs -->
              <div class="otp-inputs-row row justify-center q-gutter-x-sm q-my-md">
                <input
                  v-for="(digit, idx) in 6"
                  :key="idx"
                  :ref="el => setOtpInputRef(el, idx)"
                  v-model="otpDigits[idx]"
                  type="text"
                  inputmode="numeric"
                  maxlength="1"
                  autocomplete="one-time-code"
                  class="otp-digit-box text-center"
                  @input="onOtpDigitInput(idx, $event)"
                  @keydown="onOtpDigitKeydown(idx, $event)"
                  @paste="onOtpPaste($event)"
                />
              </div>

              <!-- Error Banner -->
              <q-banner
                v-if="otpError"
                rounded
                dense
                class="bg-red-1 text-negative q-mb-md"
              >
                <template #avatar>
                  <q-icon name="error" color="negative" size="18px" />
                </template>
                {{ otpError }}
              </q-banner>

              <!-- Resend Section -->
              <div class="row items-center justify-between q-my-md q-px-xs text-caption">
                <span class="text-grey-7">Didn't receive the OTP?</span>
                <span v-if="resendCountdown > 0" class="text-grey-6 text-weight-medium">
                  Resend in <strong>{{ resendCountdown }}s</strong>
                </span>
                <q-btn
                  v-else
                  flat
                  dense
                  no-caps
                  color="primary"
                  label="Resend OTP"
                  icon="refresh"
                  :loading="resendLoading"
                  @click="handleResendOtp"
                  class="text-weight-bold"
                />
              </div>

              <!-- Verify Button -->
              <q-btn
                color="primary"
                unelevated
                no-caps
                size="lg"
                class="login-button full-width text-weight-bold"
                :loading="otpLoading"
                @click="handleVerifyOtp"
              >
                <span>Verify OTP & Enter Panel</span>
                <q-icon name="arrow_forward" size="18px" class="q-ml-sm" />
              </q-btn>

              <!-- Back to Login / Change Email -->
              <div class="text-center q-mt-md">
                <q-btn
                  flat
                  no-caps
                  dense
                  color="grey-8"
                  icon="arrow_back"
                  label="Back to Login / Change Email"
                  @click="backToLogin"
                  class="text-caption text-weight-medium"
                />
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { Capacitor } from '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications'
import api from '@/config/api'
import { requestNotificationPermission } from '@/boot/firebase'
import { isTokenValid, getUserRole, getDashboardRoute, saveAuthSession, clearAuthSession } from '@/utils/auth.js'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

// Step State: 'LOGIN' or 'OTP'
const currentStep = ref('LOGIN')

const loginForm = ref(null)
const loading = ref(false)
const showPassword = ref(false)
const activeRole = ref('USERS')

const form = reactive({
  email: '',
  password: '',
  remember: true
})

// OTP State
const pendingAuth = reactive({
  userId: null,
  email: '',
  role: 'USERS'
})
const otpDigits = reactive(['', '', '', '', '', ''])
const otpRefs = []
const setOtpInputRef = (el, idx) => {
  if (el) otpRefs[idx] = el
}
const otpLoading = ref(false)
const otpError = ref('')
const resendLoading = ref(false)
const resendCountdown = ref(60)
let resendTimer = null

const roleLabel = computed(() => {
  if (activeRole.value === 'ADMIN') return 'Admin'
  if (activeRole.value === 'DRIVER') return 'Driver'
  if (activeRole.value === 'AGENT') return 'Agent'
  return 'User'
})

const roleIcon = computed(() => {
  if (activeRole.value === 'ADMIN') return 'admin_panel_settings'
  if (activeRole.value === 'DRIVER') return 'directions_car'
  if (activeRole.value === 'AGENT') return 'support_agent'
  return 'person'
})

// Check if user is ALREADY logged in with valid token (valid up to 1 month)
// Do NOT redirect back to login page if token is valid, unless explicit logout!
onMounted(() => {
  if (route.query.logout === 'true' || route.query.logged_out === 'true') {
    clearAuthSession()
    return
  }

  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  if (token && isTokenValid(token)) {
    const role = getUserRole(token)
    const target = getDashboardRoute(role)
    router.replace(target)
  }
})

// Safe Geolocation fetcher with fallback for mobile WebViews
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported.'))
    } else {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error),
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 30000
        }
      )
    }
  })
}

// Pass token explicitly to ensure Axios isn't unauthenticated
const sendLocationToServer = async (coords, userRole, token) => {
  try {
    await api.post(
      '/users/update-location',
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
        role: userRole
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (err) {
    console.error('Failed to send location to server:', err.response?.data || err.message)
  }
}

// Step 1: Login Handler
const handleLogin = async () => {
  const isValid = await loginForm.value.validate()
  if (!isValid) return

  loading.value = true

  try {
    const requestData = {
      email: form.email.trim(),
      password: form.password,
      role: activeRole.value
    }

    const response = await api.post('/users/login', requestData)
    const data = response.data

    // If OTP verification is required (standard secure flow)
    if (data.otp_required || !data.token) {
      pendingAuth.userId = data.user_id || null
      pendingAuth.email = data.email || form.email.trim()
      pendingAuth.role = data.user_type || activeRole.value

      currentStep.value = 'OTP'
      resetOtpBoxes()
      startResendCountdown()

      $q.notify({
        type: 'info',
        message: data.message || 'OTP sent to your email. Please verify to continue.',
        position: 'top',
        timeout: 3000
      })

      // Focus first digit box
      nextTick(() => {
        if (otpRefs[0]) otpRefs[0].focus()
      })
      return
    }

    // Direct token received (fallback flow)
    await completeLoginFlow(data.token, data.user)

  } catch (error) {
    console.error('Login Error:', error)
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Login failed. Please check your credentials.',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

// ========================================================
// OTP INPUT & VERIFICATION HANDLERS
// ========================================================
const resetOtpBoxes = () => {
  for (let i = 0; i < 6; i++) {
    otpDigits[i] = ''
  }
  otpError.value = ''
}

const onOtpDigitInput = (idx, event) => {
  const val = event.target.value
  otpError.value = ''

  if (val && idx < 5) {
    nextTick(() => {
      if (otpRefs[idx + 1]) otpRefs[idx + 1].focus()
    })
  }

  // If all 6 digits entered, auto-verify
  const code = otpDigits.join('')
  if (code.length === 6) {
    handleVerifyOtp()
  }
}

const onOtpDigitKeydown = (idx, event) => {
  if (event.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
    if (otpRefs[idx - 1]) {
      otpRefs[idx - 1].focus()
    }
  } else if (event.key === 'Enter') {
    handleVerifyOtp()
  }
}

const onOtpPaste = (event) => {
  event.preventDefault()
  const pasted = (event.clipboardData || window.clipboardData).getData('text').trim()
  if (!pasted) return

  const digits = pasted.replace(/\D/g, '').slice(0, 6).split('')
  digits.forEach((d, i) => {
    otpDigits[i] = d
  })

  const nextIdx = Math.min(digits.length, 5)
  if (otpRefs[nextIdx]) {
    otpRefs[nextIdx].focus()
  }

  if (digits.length === 6) {
    handleVerifyOtp()
  }
}

const startResendCountdown = () => {
  clearInterval(resendTimer)
  resendCountdown.value = 60
  resendTimer = setInterval(() => {
    if (resendCountdown.value > 0) {
      resendCountdown.value--
    } else {
      clearInterval(resendTimer)
    }
  }, 1000)
}

const handleResendOtp = async () => {
  resendLoading.value = true
  otpError.value = ''

  try {
    const response = await api.post('/users/resend-otp', {
      user_id: pendingAuth.userId,
      email: pendingAuth.email
    })

    $q.notify({
      type: 'positive',
      message: response.data?.message || 'A new OTP has been sent to your email.',
      position: 'top'
    })
    startResendCountdown()
    resetOtpBoxes()
    if (otpRefs[0]) otpRefs[0].focus()
  } catch (err) {
    otpError.value = err.response?.data?.message || 'Failed to resend OTP. Please try again.'
  } finally {
    resendLoading.value = false
  }
}

const handleVerifyOtp = async () => {
  const code = otpDigits.join('').trim()
  if (code.length !== 6) {
    otpError.value = 'Please enter a complete 6-digit OTP code.'
    return
  }

  otpLoading.value = true
  otpError.value = ''

  try {
    const response = await api.post('/users/verify-otp', {
      user_id: pendingAuth.userId,
      email: pendingAuth.email,
      otp: code
    })

    const data = response.data
    if (!data.token) {
      throw new Error('Authentication token not received.')
    }

    $q.notify({
      type: 'positive',
      message: 'OTP verified successfully! Welcome to Batohi.',
      position: 'top'
    })

    await completeLoginFlow(data.token, data.user)

  } catch (error) {
    console.error('OTP Verification Error:', error)
    otpError.value = error.response?.data?.message || 'Invalid or expired OTP. Please try again.'
  } finally {
    otpLoading.value = false
  }
}

const backToLogin = () => {
  currentStep.value = 'LOGIN'
  clearInterval(resendTimer)
  resetOtpBoxes()
}

// Complete login session setup and enter matching panel
const completeLoginFlow = async (token, user) => {
  // Save 30-day session
  saveAuthSession(token, user, form.remember)
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`

  // Non-blocking location capture
  try {
    const coords = await getCurrentLocation()
    await sendLocationToServer(coords, activeRole.value, token)
  } catch (geoErr) {
    console.warn('Geolocation skipped:', geoErr.message)
  }

  // Push notifications
  enableNotifications().catch(err => console.warn('Push setup failed:', err))

  // Determine user role and redirect to designated panel
  const role = user?.user_type || user?.role || pendingAuth.role || activeRole.value
  const targetRoute = getDashboardRoute(role)
  router.push(targetRoute)
}

const goToRegister = () => router.push('/register')
const goToForgotPassword = () => router.push('/forgot-password')

async function enableNotifications() {
  try {
    if (Capacitor.isNativePlatform()) {
      let permStatus = await PushNotifications.checkPermissions()

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions()
      }

      if (permStatus.receive === 'granted') {
        PushNotifications.addListener('registration', async (token) => {
          await syncTokenWithBackend(token.value)
        })
        await PushNotifications.register()
      }
      return
    }

    const deviceToken = await requestNotificationPermission()
    if (deviceToken) {
      await syncTokenWithBackend(deviceToken)
    }
  } catch (error) {
    console.error('Error enabling notifications:', error)
  }
}

async function syncTokenWithBackend(token) {
  try {
    await api.post('/users/device/token', { deviceToken: token })
  } catch (err) {
    console.error('Failed to sync device token:', err.response?.data || err.message)
  }
}
</script>

<style scoped>
/* PAGE & LAYOUT */
.login-page {
  min-height: 100vh;
  background: #f5f7fb;
}

.login-container {
  min-height: 100vh;
  display: flex;
}

/* LEFT SIDE */
.login-left {
  width: 50%;
  min-height: 100vh;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  background: linear-gradient(135deg, #1976d2, #0d47a1);
}

.brand-section {
  position: absolute;
  top: 40px;
  left: 50px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-logo {
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
}

.brand-name {
  font-size: 28px;
  font-weight: 700;
}

.brand-subtitle {
  font-size: 13px;
  opacity: 0.8;
}

.welcome-section {
  max-width: 500px;
}

.welcome-section h1 {
  font-size: 42px;
  margin: 0 0 15px;
  font-weight: 700;
}

.welcome-section > p {
  font-size: 17px;
  line-height: 1.7;
  opacity: 0.9;
}

.features {
  margin-top: 40px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 22px;
}

.feature-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
}

.feature strong {
  display: block;
  font-size: 15px;
}

.feature span {
  display: block;
  margin-top: 3px;
  font-size: 13px;
  opacity: 0.75;
}

/* RIGHT SIDE */
.login-right {
  width: 50%;
  min-height: 100vh;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 100%;
  max-width: 480px;
  border-radius: 18px;
  box-shadow: 0 12px 45px rgba(0, 0, 0, 0.08);
}

.login-header {
  text-align: center;
  padding-top: 35px;
}

.login-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
}

.login-header p {
  margin-top: 6px;
  margin-bottom: 12px;
  color: #6b7280;
}

.mobile-logo {
  display: none;
  width: 65px;
  height: 65px;
  margin: 0 auto 15px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
}

/* OTP INPUT STYLING */
.otp-panel {
  padding: 8px;
}

.email-badge-container {
  display: flex;
  justify-content: center;
}

.otp-digit-box {
  width: 48px;
  height: 56px;
  border: 2px solid #cbd5e1;
  border-radius: 10px;
  background: #f8fafc;
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
}

.otp-digit-box:focus {
  border-color: #1976d2;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.15);
}

.demo-code-hint {
  border: 1px dashed #94a3b8;
}

/* FORM ELEMENTS */
.forgot-password {
  display: flex;
  justify-content: flex-end;
  margin-top: -8px;
}

.login-button {
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
}

.register-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: #6b7280;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .login-left {
    display: none;
  }

  .login-right {
    width: 100%;
    padding: 20px;
  }

  .mobile-logo {
    display: flex;
  }
}

@media (max-width: 500px) {
  .login-right {
    padding: 12px;
  }

  .login-card {
    border-radius: 12px;
  }

  .login-header h2 {
    font-size: 24px;
  }

  .otp-digit-box {
    width: 40px;
    height: 48px;
    font-size: 20px;
  }
}
</style>
