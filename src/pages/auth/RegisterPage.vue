<template>
  <q-page class="register-page">
    <div class="register-container">
      <!-- ================= LEFT SIDE ================= -->
      <div class="register-left">
        <div class="brand-section">
          <div class="brand-logo">
            <img src="../../assets/images/logo3.png" alt="Batohi Logo" />
          </div>

          <div class="brand-content">
            <div class="brand-name">Batohi</div>
            <div class="brand-subtitle">Every Path. Every Journey.</div>
          </div>
        </div>

        <div class="welcome-section">
          <h1>Join Batohi</h1>
          <p>
            Create an account to start using our platform as a Rider, Driver, or Operational Agent.
          </p>

          <div class="features">
            <div class="feature">
              <div class="feature-icon">
                <q-icon name="verified_user" size="22px" />
              </div>
              <div class="feature-content">
                <strong>Secure & Protected</strong>
                <span>Your personal and financial data is end-to-end protected.</span>
              </div>
            </div>

            <div class="feature">
              <div class="feature-icon">
                <q-icon name="speed" size="22px" />
              </div>
              <div class="feature-content">
                <strong>Fast Onboarding</strong>
                <span>Quick registration and instant account setup.</span>
              </div>
            </div>

            <div class="feature">
              <div class="feature-icon">
                <q-icon name="dashboard" size="22px" />
              </div>
              <div class="feature-content">
                <strong>Unified Portal</strong>
                <span>Access specialized tools tuned to your registration role.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= RIGHT SIDE ================= -->
      <div class="register-right">
        <q-card class="register-card">
          <!-- HEADER -->
          <q-card-section class="register-header">
            <div class="mobile-logo">
              <img src="../../assets/images/logo3.png" alt="Batohi Logo" />
            </div>

            <h2>Create Account</h2>
            <p>Select your role and complete registration</p>

            <!-- ROLE TABS -->
            <q-tabs
              v-model="activeRole"
              dense
              class="text-grey role-tabs"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
              @update:model-value="onRoleChange"
            >
              <q-tab name="user" icon="person" label="User" />
              <q-tab name="driver" icon="directions_car" label="Driver" />
              <q-tab name="agent" icon="support_agent" label="Agent" />
            </q-tabs>
          </q-card-section>

          <!-- FORM -->
          <q-card-section class="q-pt-none">
            <q-form
              ref="registerForm"
              @submit.prevent="handleRegister"
              class="q-gutter-md"
            >
              <!-- FULL NAME -->
              <q-input
                v-model="form.name"
                outlined
                dense
                label="Full Name"
                placeholder="Enter your full name"
                autocomplete="name"
                :disable="loading"
                :rules="[val => !!val?.trim() || 'Full name is required']"
              >
                <template #prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <!-- EMAIL -->
              <q-input
                v-model="form.email"
                outlined
                dense
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                autocomplete="email"
                :disable="loading"
                :rules="[
                  val => !!val?.trim() || 'Email is required',
                  val => /.+@.+\..+/.test(val) || 'Please enter a valid email'
                ]"
              >
                <template #prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

              <!-- MOBILE -->
              <q-input
                v-model="form.mobile"
                outlined
                dense
                type="tel"
                label="Mobile Number"
                placeholder="Enter 10 digit mobile number"
                maxlength="10"
                autocomplete="tel"
                :disable="loading"
                @update:model-value="sanitizeMobile"
                :rules="[
                  val => !!val || 'Mobile number is required',
                  val =>
                    /^[6-9][0-9]{9}$/.test(val) ||
                    'Enter a valid 10 digit mobile number'
                ]"
              >
                <template #prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>

              <!-- DRIVER-SPECIFIC FIELDS -->
              <template v-if="activeRole === 'driver'">
                <q-input
                  v-model="form.licenseNumber"
                  outlined
                  dense
                  label="Driving License Number"
                  placeholder="Enter DL Number"
                  :disable="loading"
                  :rules="[val => !!val?.trim() || 'License number is required for drivers']"
                >
                  <template #prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>

                <q-input
                  v-model="form.vehicleNumber"
                  outlined
                  dense
                  label="Vehicle Registration Number"
                  placeholder="e.g. BR01AB1234"
                  :disable="loading"
                  :rules="[val => !!val?.trim() || 'Vehicle number is required']"
                >
                  <template #prepend>
                    <q-icon name="directions_car" />
                  </template>
                </q-input>
              </template>

              <!-- AGENT-SPECIFIC FIELDS -->
              <template v-if="activeRole === 'agent'">
                <q-input
                  v-model="form.agencyCode"
                  outlined
                  dense
                  label="Agency / Partner Code"
                  placeholder="Enter Agency Identification Code"
                  :disable="loading"
                  :rules="[val => !!val?.trim() || 'Agency code is required for agents']"
                >
                  <template #prepend>
                    <q-icon name="confirmation_number" />
                  </template>
                </q-input>
              </template>

              <!-- PASSWORD -->
              <q-input
                v-model="form.password"
                outlined
                dense
                label="Password"
                placeholder="Enter password"
                autocomplete="new-password"
                :type="showPassword ? 'text' : 'password'"
                :disable="loading"
                :rules="[
                  val => !!val || 'Password is required',
                  val =>
                    val.length >= 6 ||
                    'Password must contain at least 6 characters'
                ]"
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

              <!-- CONFIRM PASSWORD -->
              <q-input
                v-model="form.confirmPassword"
                outlined
                dense
                label="Confirm Password"
                placeholder="Confirm your password"
                autocomplete="new-password"
                :type="showConfirmPassword ? 'text' : 'password'"
                :disable="loading"
                :rules="[
                  val => !!val || 'Please confirm your password',
                  val => val === form.password || 'Passwords do not match'
                ]"
              >
                <template #prepend>
                  <q-icon name="lock_outline" />
                </template>

                <template #append>
                  <q-icon
                    :name="showConfirmPassword ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="showConfirmPassword = !showConfirmPassword"
                  />
                </template>
              </q-input>

              <!-- TERMS -->
              <q-checkbox
                v-model="form.terms"
                label="I agree to the Terms & Conditions"
                :disable="loading"
              />

              <!-- REGISTER BUTTON -->
              <q-btn
                type="submit"
                :label="`Register as ${roleLabel}`"
                :icon="roleIcon"
                color="primary"
                unelevated
                no-caps
                class="register-button full-width"
                :loading="loading"
                :disable="loading"
              />
            </q-form>
          </q-card-section>

          <!-- LOGIN LINK -->
          <q-card-section class="login-section">
            <span>Already have an account?</span>
            <q-btn
              flat
              no-caps
              color="primary"
              label="Login"
              :disable="loading"
              @click="goToLogin"
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
import { Notify } from 'quasar'
import api from '@/config/api'

const router = useRouter()
const registerForm = ref(null)
const loading = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const activeRole = ref('user') // 'user' | 'driver' | 'agent'

const form = reactive({
  name: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  licenseNumber: '',
  vehicleNumber: '',
  agencyCode: '',
  terms: false
})

const roleLabel = computed(() => {
  if (activeRole.value === 'driver') return 'Driver'
  if (activeRole.value === 'agent') return 'Agent'
  return 'User'
})

const roleIcon = computed(() => {
  if (activeRole.value === 'driver') return 'directions_car'
  if (activeRole.value === 'agent') return 'support_agent'
  return 'person_add'
})

const onRoleChange = () => {
  if (registerForm.value) {
    registerForm.value.resetValidation()
  }
}

const sanitizeMobile = value => {
  form.mobile = String(value || '')
    .replace(/\D/g, '')
    .substring(0, 10)
}

const handleRegister = async () => {
  const isValid = await registerForm.value.validate()
  if (!isValid) return

  if (!form.terms) {
    Notify.create({
      type: 'negative',
      message: 'Please accept Terms & Conditions',
      position: 'top'
    })
    return
  }

  if (form.password !== form.confirmPassword) {
    Notify.create({
      type: 'negative',
      message: 'Passwords do not match',
      position: 'top'
    })
    return
  }

  loading.value = true

  try {
    const requestData = {
      username: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      mobile: form.mobile,
      user_type: activeRole.value,
      status: 1,
      password: form.password,
      ...(activeRole.value === 'driver' && {
        license_number: form.licenseNumber.trim(),
        vehicle_number: form.vehicleNumber.trim()
      }),
      ...(activeRole.value === 'agent' && {
        agency_code: form.agencyCode.trim()
      })
    }

    const response = await api.post('/users/create', requestData)

    Notify.create({
      type: 'positive',
      message: response.data?.message || `${roleLabel.value} account created successfully`,
      position: 'top',
      timeout: 3000
    })

    // Reset Form
    form.name = ''
    form.email = ''
    form.mobile = ''
    form.password = ''
    form.confirmPassword = ''
    form.licenseNumber = ''
    form.vehicleNumber = ''
    form.agencyCode = ''
    form.terms = false

    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (error) {
    console.error('Registration Error:', error)

    let message = 'Registration failed. Please try again.'
    if (error.response) {
      message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        `Registration failed (${error.response.status})`
    } else if (error.request) {
      message = 'Unable to connect to the server. Please check your API server and network connection.'
    } else {
      message = error.message || 'Something went wrong.'
    }

    Notify.create({
      type: 'negative',
      message,
      position: 'top',
      timeout: 5000
    })
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/')
}
</script>

<style scoped>
/* PAGE & LAYOUT */
.register-page {
  min-height: 100vh;
  background: #f5f7fb;
}

.register-container {
  min-height: 100vh;
  display: flex;
}

/* LEFT SIDE */
.register-left {
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
  top: 35px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-content {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.1;
}

.brand-subtitle {
  margin-top: 5px;
  font-size: 13px;
  opacity: 0.85;
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
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
}

.feature-content strong {
  display: block;
  font-size: 15px;
}

.feature-content span {
  display: block;
  margin-top: 3px;
  font-size: 13px;
  opacity: 0.75;
}

/* RIGHT SIDE */
.register-right {
  width: 50%;
  min-height: 100vh;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-card {
  width: 100%;
  max-width: 520px;
  border-radius: 18px;
  box-shadow: 0 12px 45px rgba(0, 0, 0, 0.08);
}

.register-header {
  text-align: center;
  padding-top: 28px;
}

.register-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
}

.register-header p {
  margin-top: 6px;
  margin-bottom: 16px;
  color: #6b7280;
}

.role-tabs {
  margin-bottom: 8px;
}

.mobile-logo {
  display: none;
  width: 100px;
  height: 70px;
  margin: 0 auto 15px;
  align-items: center;
  justify-content: center;
}

.mobile-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.register-button {
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
}

.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: #6b7280;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .register-left {
    display: none;
  }

  .register-right {
    width: 100%;
    padding: 20px;
  }

  .mobile-logo {
    display: flex;
  }
}

@media (max-width: 500px) {
  .register-right {
    padding: 12px;
  }

  .register-card {
    border-radius: 12px;
  }

  .register-header h2 {
    font-size: 24px;
  }
}
</style>
