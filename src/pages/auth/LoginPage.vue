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
            <div class="brand-name"> Batohi </div>
            <div class="brand-subtitle"> Every Path. Every Journey. </div>
          </div>
        </div>

        <div class="welcome-section">
          <h1> Welcome Back </h1>

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
                <strong> Secure Access </strong>
                <span> Your account is securely protected. </span>
              </div>
            </div>

            <div class="feature">
              <div class="feature-icon">
                <q-icon name="dashboard" />
              </div>

              <div>
                <strong> Centralized Management </strong>
                <span> Manage your work from one place. </span>
              </div>
            </div>

            <div class="feature">
              <div class="feature-icon">
                <q-icon name="speed" />
              </div>

              <div>
                <strong> Fast & Reliable </strong>
                <span> Quick and reliable system performance. </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= RIGHT SIDE ================= -->
      <div class="login-right">
        <q-card class="login-card">
          <!-- Header -->
          <q-card-section class="login-header">
            <div class="mobile-logo">
              <img
                src="../../assets/images/logo3.png"
                alt="batohiDrive Logo"
                style="height: 100px; object-fit: contain"
              />
            </div>

            <h2> Login </h2>
            <p> Select your portal to access your panel </p>

            <!-- 3-Role Tab Selection -->
            <q-tabs
              v-model="activeRole"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="customer" icon="person" label="User" />
              <q-tab name="driver" icon="directions_car" label="Driver" />
              <q-tab name="agent" icon="support_agent" label="Agent" />
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

              <!-- Remember Me -->
              <q-checkbox v-model="form.remember" label="Remember me" />

              <!-- Single Login Button for Active Role -->
              <q-btn
                type="submit"
                :label="`Login as ${roleLabel}`"
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
            <span> Don't have an account? </span>
            <q-btn
              flat
              no-caps
              color="primary"
              label="Create Account"
              @click="goToRegister"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import api from '@/config/api'

// Router & Quasar
const router = useRouter()
const $q = useQuasar()

// Form References & State
const loginForm = ref(null)
const loading = ref(false)
const showPassword = ref(false)
const activeRole = ref('customer') // Options: 'customer' | 'driver' | 'agent'

const form = reactive({
  email: '',
  password: '',
  remember: false
})

// Dynamic UI labels based on tab choice
const roleLabel = computed(() => {
  if (activeRole.value === 'driver') return 'Driver'
  if (activeRole.value === 'agent') return 'Agent'
  return 'User'
})

const roleIcon = computed(() => {
  if (activeRole.value === 'driver') return 'directions_car'
  if (activeRole.value === 'agent') return 'support_agent'
  return 'person'
})

// Login Handler
const handleLogin = async () => {
  const isValid = await loginForm.value.validate()
  if (!isValid) return

  loading.value = true

  try {
    const requestData = {
      email: form.email,
      password: form.password,
      role: activeRole.value
    }

    const response = await api.post('/users/login', requestData)
    const data = response.data

    if (data.token) {
      if (form.remember) {
        localStorage.setItem('token', data.token)
      } else {
        sessionStorage.setItem('token', data.token)
      }
    }

    $q.notify({
      type: 'positive',
      message: data.message || `Logged in as ${roleLabel.value} successfully`
    })

    // Redirect to matching portal path based on active tab
    if (activeRole.value === 'driver') {
      router.push('/driver/dashboard')
    } else if (activeRole.value === 'agent') {
      router.push('/agent/dashboard')
    } else {
      router.push('/customer/dashboard')
    }
  } catch (error) {
    console.error('Login Error:', error)
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Invalid email or password'
    })
  } finally {
    loading.value = false
  }
}

// Navigation
const goToRegister = () => {
  router.push('/register')
}

const goToForgotPassword = () => {
  router.push('/forgot-password')
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
  font-size: 30px;
  font-weight: 700;
  color: #1f2937;
}

.login-header p {
  margin-top: 8px;
  margin-bottom: 16px;
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
    font-size: 25px;
  }
}
</style>
