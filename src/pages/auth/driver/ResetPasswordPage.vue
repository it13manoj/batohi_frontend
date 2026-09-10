```vue
<template>
  <q-page class="reset-password-page flex flex-center q-pa-md">
    <!-- =====================================================
         RESET PASSWORD CARD
    ====================================================== -->
    <q-card class="reset-card">
      <!-- ================= LOGO ================= -->
      <div class="text-center q-mb-md">
        <img
          src="@/assets/images/logo3.png"
          alt="BatohiDrive Logo"
          class="logo"
        />
      </div>

      <!-- ================= TITLE ================= -->
      <div class="text-center">
        <div class="text-h5 text-weight-bold text-grey-9"> Reset Password </div>

        <div class="text-body2 text-grey-6 q-mt-sm">
          Create a new password for your driver account.
        </div>
      </div>

      <!-- ================= EMAIL ================= -->
      <div v-if="email" class="email-box q-mt-md">
        <q-icon name="email" color="primary" size="20px" />

        <div>
          <div class="text-caption text-grey-6"> Account </div>

          <div class="text-body2 text-weight-medium text-primary">
            {{ email }}
          </div>
        </div>
      </div>

      <!-- ================= FORM ================= -->
      <q-form class="q-mt-lg" @submit.prevent="resetPassword">
        <!-- =================================================
             NEW PASSWORD
        ================================================== -->
        <q-input
          v-model="password"
          outlined
          rounded
          label="New Password"
          placeholder="Enter new password"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="new-password"
          :disable="loading"
          :rules="[
            val => !!val || 'New password is required',
            val => val.length >= 8 || 'Password must be at least 8 characters'
          ]"
        >
          <template #prepend>
            <q-icon name="lock" />
          </template>

          <template #append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <!-- =================================================
             PASSWORD STRENGTH
        ================================================== -->
        <div v-if="password" class="password-strength q-mt-xs">
          <div class="text-caption text-grey-6 q-mb-xs">
            Password strength
          </div>

          <q-linear-progress
            rounded
            size="6px"
            :value="passwordStrength.value"
            :color="passwordStrength.color"
          />

          <div
            class="text-caption q-mt-xs"
            :class="`text-${passwordStrength.color}`"
          >
            {{ passwordStrength.label }}
          </div>
        </div>

        <!-- =================================================
             CONFIRM PASSWORD
        ================================================== -->
        <q-input
          v-model="confirmPassword"
          outlined
          rounded
          label="Confirm Password"
          placeholder="Confirm new password"
          :type="showConfirmPassword ? 'text' : 'password'"
          autocomplete="new-password"
          class="q-mt-md"
          :disable="loading"
          :rules="[
            val => !!val || 'Please confirm your password',
            val => val === password || 'Passwords do not match'
          ]"
        >
          <template #prepend>
            <q-icon name="lock_reset" />
          </template>

          <template #append>
            <q-icon
              :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </template>
        </q-input>

        <!-- =================================================
             PASSWORD REQUIREMENTS
        ================================================== -->
        <div class="requirements q-mt-md">
          <div class="text-caption text-grey-7 text-weight-medium q-mb-sm">
            Password should contain:
          </div>

          <!-- Minimum Length -->
          <div class="requirement" :class="{ valid: hasMinLength }">
            <q-icon
              :name="hasMinLength ? 'check_circle' : 'radio_button_unchecked'"
            />

            <span> At least 8 characters </span>
          </div>

          <!-- Uppercase -->
          <div class="requirement" :class="{ valid: hasUppercase }">
            <q-icon
              :name="hasUppercase ? 'check_circle' : 'radio_button_unchecked'"
            />

            <span> One uppercase letter </span>
          </div>

          <!-- Number -->
          <div class="requirement" :class="{ valid: hasNumber }">
            <q-icon
              :name="hasNumber ? 'check_circle' : 'radio_button_unchecked'"
            />

            <span> One number </span>
          </div>

          <!-- Special Character -->
          <div class="requirement" :class="{ valid: hasSpecialCharacter }">
            <q-icon
              :name="
                hasSpecialCharacter ? 'check_circle' : 'radio_button_unchecked'
              "
            />

            <span> One special character </span>
          </div>
        </div>

        <!-- =================================================
             RESET BUTTON
        ================================================== -->
        <q-btn
          type="submit"
          color="primary"
          unelevated
          rounded
          no-caps
          size="lg"
          class="full-width q-mt-lg"
          :loading="loading"
          :disable="
            loading ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword ||
            password.length < 8
          "
        >
          Reset Password
        </q-btn>
      </q-form>

      <!-- =================================================
           SUCCESS MESSAGE
      ================================================= -->
      <q-banner v-if="message" rounded class="bg-green-1 text-green-9 q-mt-md">
        <template #avatar>
          <q-icon name="check_circle" color="positive" />
        </template>

        {{ message }}
      </q-banner>

      <!-- =================================================
           ERROR MESSAGE
      ================================================= -->
      <q-banner v-if="error" rounded class="bg-red-1 text-negative q-mt-md">
        <template #avatar>
          <q-icon name="error" color="negative" />
        </template>

        {{ error }}
      </q-banner>

      <!-- =================================================
           BACK TO LOGIN
      ================================================= -->
      <div class="text-center q-mt-lg">
        <q-btn
          flat
          no-caps
          color="grey-7"
          icon="arrow_back"
          label="Back to Driver Login"
          :to="'/driver-login'"
        />
      </div>

      <!-- =================================================
           FOOTER
      ================================================= -->
      <div class="footer-text"> Secure driver account password reset </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

// =====================================================
// QUASAR / ROUTER
// =====================================================

const $q = useQuasar()

const router = useRouter()

// =====================================================
// STATE
// =====================================================

const email = ref('')

const password = ref('')

const confirmPassword = ref('')

const loading = ref(false)

const message = ref('')

const error = ref('')

const showPassword = ref(false)

const showConfirmPassword = ref(false)

// =====================================================
// PASSWORD REQUIREMENTS
// =====================================================

const hasMinLength = computed(() => {
  return password.value.length >= 8
})

const hasUppercase = computed(() => {
  return /[A-Z]/.test(password.value)
})

const hasNumber = computed(() => {
  return /[0-9]/.test(password.value)
})

const hasSpecialCharacter = computed(() => {
  return /[^A-Za-z0-9]/.test(password.value)
})

// =====================================================
// PASSWORD STRENGTH
// =====================================================

const passwordStrength = computed(() => {
  const value = password.value

  if (!value) {
    return {
      value: 0,
      label: '',
      color: 'grey'
    }
  }

  let score = 0

  // Length
  if (value.length >= 8) {
    score++
  }

  // Uppercase
  if (/[A-Z]/.test(value)) {
    score++
  }

  // Lowercase
  if (/[a-z]/.test(value)) {
    score++
  }

  // Number
  if (/[0-9]/.test(value)) {
    score++
  }

  // Special character
  if (/[^A-Za-z0-9]/.test(value)) {
    score++
  }

  // Weak
  if (score <= 2) {
    return {
      value: 0.35,
      label: 'Weak',
      color: 'negative'
    }
  }

  // Medium
  if (score <= 4) {
    return {
      value: 0.7,
      label: 'Medium',
      color: 'warning'
    }
  }

  // Strong
  return {
    value: 1,

    label: 'Strong',

    color: 'positive'
  }
})

// =====================================================
// CHECK RESET SESSION
// =====================================================

onMounted(() => {
  // ---------------------------------------------------
  // Get Email
  // ---------------------------------------------------

  email.value = sessionStorage.getItem('driverResetEmail') || ''

  // ---------------------------------------------------
  // Get OTP Verification Status
  // ---------------------------------------------------

  const otpVerified = sessionStorage.getItem('driverOtpVerified')

  // ===================================================
  // OTP NOT VERIFIED
  // ===================================================

  if (otpVerified !== 'true') {
    $q.notify({
      type: 'warning',

      message: 'Please verify OTP first.',

      position: 'top'
    })

    router.replace('/driver-verify-otp')

    return
  }

  // ===================================================
  // EMAIL NOT FOUND
  // ===================================================

  if (!email.value) {
    $q.notify({
      type: 'warning',

      message: 'Reset session expired. Please try again.',

      position: 'top'
    })

    router.replace('/driver-forgot-password')
  }
})

// =====================================================
// RESET PASSWORD
// =====================================================

const resetPassword = () => {
  // Clear previous messages

  message.value = ''

  error.value = ''

  // ===================================================
  // EMAIL VALIDATION
  // ===================================================

  if (!email.value) {
    error.value = 'Email address not found.'

    return
  }

  // ===================================================
  // OTP VERIFICATION CHECK
  // ===================================================

  const otpVerified = sessionStorage.getItem('driverOtpVerified')

  if (otpVerified !== 'true') {
    error.value = 'OTP verification expired. Please verify OTP again.'

    $q.notify({
      type: 'warning',

      message: 'Please verify OTP again.',

      position: 'top'
    })

    router.replace('/driver-verify-otp')

    return
  }

  // ===================================================
  // PASSWORD VALIDATION
  // ===================================================

  if (password.value.length < 8) {
    error.value = 'Password must be at least 8 characters.'

    return
  }

  // ===================================================
  // UPPERCASE VALIDATION
  // ===================================================

  if (!hasUppercase.value) {
    error.value = 'Password must contain at least one uppercase letter.'

    return
  }

  // ===================================================
  // NUMBER VALIDATION
  // ===================================================

  if (!hasNumber.value) {
    error.value = 'Password must contain at least one number.'

    return
  }

  // ===================================================
  // SPECIAL CHARACTER VALIDATION
  // ===================================================

  if (!hasSpecialCharacter.value) {
    error.value = 'Password must contain at least one special character.'

    return
  }

  // ===================================================
  // CONFIRM PASSWORD
  // ===================================================

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'

    return
  }

  // ===================================================
  // RESET PASSWORD
  // ===================================================

  loading.value = true

  setTimeout(() => {
    try {
      // ===============================================
      // SAVE PASSWORD FOR DEMO PURPOSE
      // ===============================================

      localStorage.setItem('driverPassword', password.value)

      // Save associated email

      localStorage.setItem('driverPasswordEmail', email.value)

      // ===============================================
      // SUCCESS MESSAGE
      // ===============================================

      message.value = 'Password reset successfully.'

      $q.notify({
        type: 'positive',

        message: 'Password reset successfully.',

        position: 'top'
      })

      // ===============================================
      // CLEAR RESET SESSION
      // ===============================================

      sessionStorage.removeItem('driverResetEmail')

      sessionStorage.removeItem('driverOtpVerified')

      sessionStorage.removeItem('driverResetToken')

      // ===============================================
      // REDIRECT TO DRIVER LOGIN
      // ===============================================

      setTimeout(() => {
        router.push('/driver-login')
      }, 1200)
    } catch (err) {
      console.error('Driver Reset Password Error:', err)

      error.value = 'Unable to reset password. Please try again.'

      $q.notify({
        type: 'negative',

        message: 'Unable to reset password. Please try again.',

        position: 'top'
      })
    } finally {
      loading.value = false
    }
  }, 800)
}
</script>

<style scoped>
/* =====================================================
   PAGE
===================================================== */

.reset-password-page {
  min-height: 100vh;
  background: #f4f6f9;
}

/* =====================================================
   CARD
===================================================== */

.reset-card {
  width: 100%;
  max-width: 460px;
  padding: 35px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
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
   EMAIL BOX
===================================================== */

.email-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 15px;
  background: #f5f9ff;
  border: 1px solid #e1ecfa;
  border-radius: 10px;
}

/* =====================================================
   PASSWORD STRENGTH
===================================================== */

.password-strength {
  padding: 0 5px;
}

/* =====================================================
   REQUIREMENTS
===================================================== */

.requirements {
  padding: 12px 14px;
  border-radius: 10px;
  background: #f8f9fa;
  border: 1px solid #eeeeee;
}

.requirement {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #777777;
  font-size: 12px;
  margin-bottom: 7px;
}

.requirement:last-child {
  margin-bottom: 0;
}

.requirement .q-icon {
  font-size: 16px;
}

.requirement.valid {
  color: #2e7d32;
}

/* =====================================================
   FOOTER
===================================================== */

.footer-text {
  margin-top: 18px;
  padding-top: 15px;
  border-top: 1px solid #eeeeee;
  text-align: center;
  font-size: 11px;
  color: #9e9e9e;
}

/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 600px) {
  .reset-password-page {
    padding: 15px;
  }

  .reset-card {
    padding: 25px 20px;
    border-radius: 12px;
  }

  .logo {
    width: 125px;
    height: 90px;
  }
}
</style>
```
