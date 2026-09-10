<template>
  <q-page class="driver-register-page">
    <div class="register-container">
      <!-- =====================================================
           LEFT SIDE
      ====================================================== -->
      <div class="register-left">
        <!-- BRAND -->
        <div class="brand-section">
          <div class="brand-logo">
            <img src="../../assets/images/logo3.png" alt="BatohiDrive Logo" />
          </div>

          <div class="brand-content">
            <div class="brand-name"> Batohi </div>

            <div class="brand-subtitle"> Every Path. Every Journey. </div>
          </div>
        </div>

        <!-- WELCOME -->
        <div class="welcome-section">
          <h1> Join Batohi as a Driver </h1>

          <p>
            Create your driver account and start managing your driving services
            with our secure platform.
          </p>

          <!-- FEATURES -->
          <div class="features">
            <!-- FEATURE 1 -->
            <div class="feature">
              <div class="feature-icon">
                <q-icon name="verified_user" size="22px" />
              </div>

              <div class="feature-content">
                <strong> Secure Driver Account </strong>

                <span> Your personal information stays protected. </span>
              </div>
            </div>

            <!-- FEATURE 2 -->
            <div class="feature">
              <div class="feature-icon">
                <q-icon name="directions_car" size="22px" />
              </div>

              <div class="feature-content">
                <strong> Manage Your Rides </strong>

                <span> Manage bookings and driving activities easily. </span>
              </div>
            </div>

            <!-- FEATURE 3 -->
            <div class="feature">
              <div class="feature-icon">
                <q-icon name="speed" size="22px" />
              </div>

              <div class="feature-content">
                <strong> Fast & Reliable </strong>

                <span> Access your driver dashboard from anywhere. </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- =====================================================
           RIGHT SIDE
      ====================================================== -->
      <div class="register-right">
        <q-card class="register-card">
          <!-- HEADER -->
          <q-card-section class="register-header">
            <!-- MOBILE LOGO -->
            <div class="mobile-logo">
              <img src="../../assets/images/logo3.png" alt="BatohiDrive Logo" />
            </div>

            <h2> Driver Registration </h2>

            <p> Create your Batohi driver account </p>
          </q-card-section>

          <!-- FORM -->
          <q-card-section>
            <q-form
              ref="registerForm"
              @submit.prevent="handleRegister"
              class="q-gutter-md"
            >
              <!-- =================================================
                   DRIVER NAME
              ================================================== -->
              <q-input
                v-model="form.name"
                outlined
                label="Driver Name"
                placeholder="Enter your full name"
                autocomplete="name"
                :disable="loading"
                :rules="[val => !!val?.trim() || 'Driver name is required']"
              >
                <template #prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <!-- =================================================
                   EMAIL
              ================================================== -->
              <q-input
                v-model="form.email"
                outlined
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

              <!-- =================================================
                   MOBILE
              ================================================== -->
              <q-input
                v-model="form.mobile"
                outlined
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

              <!-- =================================================
                   DRIVING LICENSE NUMBER
              ================================================== -->
              <q-input
                v-model="form.licenseNumber"
                outlined
                label="Driving License Number"
                placeholder="Enter driving license number"
                maxlength="20"
                :disable="loading"
                :rules="[
                  val => !!val?.trim() || 'Driving license number is required',

                  val =>
                    val.trim().length >= 5 ||
                    'Enter a valid driving license number'
                ]"
              >
                <template #prepend>
                  <q-icon name="badge" />
                </template>
              </q-input>

              <!-- =================================================
                   PASSWORD
              ================================================== -->
              <q-input
                v-model="form.password"
                outlined
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

              <!-- =================================================
                   CONFIRM PASSWORD
              ================================================== -->
              <q-input
                v-model="form.confirmPassword"
                outlined
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
                    :name="
                      showConfirmPassword ? 'visibility' : 'visibility_off'
                    "
                    class="cursor-pointer"
                    @click="showConfirmPassword = !showConfirmPassword"
                  />
                </template>
              </q-input>

              <!-- =================================================
                   TERMS
              ================================================== -->
              <q-checkbox
                v-model="form.terms"
                :disable="loading"
                :rules="[val => val || 'Please accept Terms & Conditions']"
              >
                <template #default>
                  <span> I agree to the Terms & Conditions </span>
                </template>
              </q-checkbox>

              <!-- =================================================
                   REGISTER BUTTON
              ================================================== -->
              <q-btn
                type="submit"
                label="Register as Driver"
                icon="person_add"
                color="primary"
                unelevated
                no-caps
                class="register-button full-width"
                :loading="loading"
                :disable="loading"
              />
            </q-form>
          </q-card-section>

          <!-- =====================================================
               LOGIN
          ====================================================== -->
          <q-card-section class="login-section">
            <span> Already have a driver account? </span>

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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { Notify } from 'quasar'
import api from '@/config/api'

/* =====================================================
   ROUTER
===================================================== */

const router = useRouter()

/* =====================================================
   FORM
===================================================== */

const registerForm = ref(null)

const loading = ref(false)

const showPassword = ref(false)

const showConfirmPassword = ref(false)

/* =====================================================
   FORM DATA
===================================================== */

const form = reactive({
  name: '',

  email: '',

  mobile: '',

  licenseNumber: '',

  password: '',

  confirmPassword: '',

  terms: false
})

/* =====================================================
   SANITIZE MOBILE
===================================================== */

const sanitizeMobile = value => {
  form.mobile = String(value || '')
    .replace(/\D/g, '')
    .substring(0, 10)
}

/* =====================================================
   REGISTER DRIVER
===================================================== */

const handleRegister = async () => {
  /* -----------------------------------------------
     VALIDATE FORM
  ------------------------------------------------ */

  const isValid = await registerForm.value.validate()

  if (!isValid) {
    return
  }

  /* -----------------------------------------------
     TERMS CHECK
  ------------------------------------------------ */

  if (!form.terms) {
    Notify.create({
      type: 'negative',

      message: 'Please accept Terms & Conditions',

      position: 'top'
    })

    return
  }

  /* -----------------------------------------------
     PASSWORD CHECK
  ------------------------------------------------ */

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
    /* ---------------------------------------------
       REQUEST DATA
       console.log( form.mobile)
    ---------------------------------------------- */

    const requestData = {
      username: form.name.trim(),

      email: form.email.trim().toLowerCase(),

      mobile_no: form.mobile,

      license_number: form.licenseNumber.trim().toUpperCase(),

      user_type: 'driver',

      status: 1,

      password: form.password
    }

    console.log('Driver Register Request:', requestData)

    /* ---------------------------------------------
       API REQUEST
    ---------------------------------------------- */

    const response = await api.post('/users/create', requestData)

    console.log('Driver Register Response:', response.data)

    /* ---------------------------------------------
       SUCCESS
    ---------------------------------------------- */

    Notify.create({
      type: 'positive',

      message: response.data?.message || 'Driver registration successful',

      position: 'top',

      timeout: 3000
    })

    /* ---------------------------------------------
       RESET FORM
    ---------------------------------------------- */

    form.name = ''

    form.email = ''

    form.mobile = ''

    form.licenseNumber = ''

    form.password = ''

    form.confirmPassword = ''

    form.terms = false

    /* ---------------------------------------------
       GO TO LOGIN
    ---------------------------------------------- */

    setTimeout(() => {
      router.push('/driver-login')
    }, 1000)
  } catch (error) {
    console.error('Driver Registration Error:', error)

    console.error('Status:', error.response?.status)

    console.error('Response:', error.response?.data)

    let message = 'Driver registration failed. Please try again.'

    /* ---------------------------------------------
       SERVER ERROR
    ---------------------------------------------- */

    if (error.response) {
      message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        `Registration failed (${error.response.status})`
    }

    /* ---------------------------------------------
       NETWORK ERROR
    ---------------------------------------------- */ else if (error.request) {
      message =
        'Unable to connect to the server. Please check your API server and network connection.'
    }

    /* ---------------------------------------------
       OTHER ERROR
    ---------------------------------------------- */ else {
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

/* =====================================================
   GO TO LOGIN
===================================================== */

const goToLogin = () => {
  router.push('/driver-login')
}
</script>

<style scoped>
/* =====================================================
   PAGE
===================================================== */

.driver-register-page {
  min-height: 100vh;

  background: #f5f7fb;
}

/* =====================================================
   CONTAINER
===================================================== */

.register-container {
  min-height: 100vh;

  display: flex;
}

/* =====================================================
   LEFT SIDE
===================================================== */

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

/* =====================================================
   BRAND
===================================================== */

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

  display: block;
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

/* =====================================================
   WELCOME
===================================================== */

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

/* =====================================================
   FEATURES
===================================================== */

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

/* =====================================================
   RIGHT SIDE
===================================================== */

.register-right {
  width: 50%;

  min-height: 100vh;

  padding: 30px;

  display: flex;

  align-items: center;

  justify-content: center;
}

/* =====================================================
   CARD
===================================================== */

.register-card {
  width: 100%;

  max-width: 500px;

  border-radius: 18px;

  box-shadow: 0 12px 45px rgba(0, 0, 0, 0.08);
}

/* =====================================================
   HEADER
===================================================== */

.register-header {
  text-align: center;

  padding-top: 30px;
}

.register-header h2 {
  margin: 0;

  font-size: 30px;

  font-weight: 700;

  color: #1f2937;
}

.register-header p {
  margin-top: 8px;

  color: #6b7280;
}

/* =====================================================
   MOBILE LOGO
===================================================== */

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

/* =====================================================
   REGISTER BUTTON
===================================================== */

.register-button {
  height: 48px;

  border-radius: 8px;

  font-size: 16px;

  font-weight: 600;
}

/* =====================================================
   LOGIN SECTION
===================================================== */

.login-section {
  display: flex;

  justify-content: center;

  align-items: center;

  gap: 4px;

  color: #6b7280;
}

/* =====================================================
   RESPONSIVE
===================================================== */

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
    font-size: 25px;
  }
}
</style>
