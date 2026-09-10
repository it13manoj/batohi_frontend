<template>
  <q-layout view="lHh Lpr lFf">
    <!-- =====================================================
         HEADER
    ====================================================== -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- MENU BUTTON -->
        <q-btn flat round dense icon="menu" @click="drawer = !drawer" />

        <!-- APP NAME -->
        <div class="text-h6 q-ml-md"> BatohiDrive </div>

        <q-space />

        <!-- NOTIFICATIONS -->
        <q-btn flat round icon="notifications" @click="goNotifications">
          <q-tooltip> Notifications </q-tooltip>
        </q-btn>

        <!-- PROFILE -->
        <q-btn flat round icon="account_circle" @click="goProfile">
          <q-tooltip> Profile </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- =====================================================
         SIDEBAR
    ====================================================== -->
    <q-drawer v-model="drawer" show-if-above bordered :width="270">
      <!-- ===================================================
           SIDEBAR BRAND
      ==================================================== -->
      <div class="sidebar-brand q-pa-md">
        <div class="row items-center">
          <q-avatar color="primary" text-color="white" size="45px">
            B
          </q-avatar>

          <div class="q-ml-md">
            <div class="text-weight-bold text-h6"> BatohiDrive </div>

            <div class="text-caption text-grey">
              Every path. Every journey.
            </div>
          </div>
        </div>
      </div>

      <q-separator />

      <!-- ===================================================
           MAIN MENU
      ==================================================== -->
      <q-list padding>
        <!-- DASHBOARD -->
        <q-item clickable v-ripple to="/customer/dashboard" exact>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>

          <q-item-section> Dashboard </q-item-section>
        </q-item>

        <!-- SEARCH VEHICLE -->
        <q-item clickable v-ripple to="/customer/vehicle-type">
          <q-item-section avatar>
            <q-icon name="search" />
          </q-item-section>

          <q-item-section> Search Vehicle </q-item-section>
        </q-item>

        <!-- MY BOOKINGS -->
        <q-item clickable v-ripple to="/customer/my-bookings">
          <q-item-section avatar>
            <q-icon name="book_online" />
          </q-item-section>

          <q-item-section> My Bookings </q-item-section>
        </q-item>

        <!-- PAYMENTS -->
        <q-item clickable v-ripple to="/customer/payments">
          <q-item-section avatar>
            <q-icon name="payments" />
          </q-item-section>

          <q-item-section> Payments </q-item-section>
        </q-item>

        <!-- PROFILE -->
        <q-item clickable v-ripple to="/customer/profile">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>

          <q-item-section> Profile </q-item-section>
        </q-item>

        <!-- NOTIFICATIONS -->
        <q-item clickable v-ripple to="/customer/notifications">
          <q-item-section avatar>
            <q-icon name="notifications" />
          </q-item-section>

          <q-item-section> Notifications </q-item-section>
        </q-item>
      </q-list>

      <!-- ===================================================
           LEGAL & SUPPORT
      ==================================================== -->
      <q-separator class="q-my-sm" />

      <div class="legal-title q-px-md q-pt-sm q-pb-xs"> LEGAL & SUPPORT </div>

      <q-list padding>
        <!-- FAQ -->
        <q-item clickable v-ripple to="/customer/faq">
          <q-item-section avatar>
            <q-icon name="help_outline" color="primary" />
          </q-item-section>

          <q-item-section> FAQ </q-item-section>
        </q-item>

        <!-- TERMS & CONDITIONS -->
        <q-item clickable v-ripple to="/customer/terms-and-conditions">
          <q-item-section avatar>
            <q-icon name="description" color="primary" />
          </q-item-section>

          <q-item-section> Terms & Conditions </q-item-section>
        </q-item>

        <!-- PRIVACY POLICY -->
        <q-item clickable v-ripple to="/customer/privacy-policy">
          <q-item-section avatar>
            <q-icon name="privacy_tip" color="primary" />
          </q-item-section>

          <q-item-section> Privacy Policy </q-item-section>
        </q-item>

        <!-- CANCELLATION POLICY -->
        <q-item clickable v-ripple to="/customer/cancellation-policy">
          <q-item-section avatar>
            <q-icon name="event_busy" color="primary" />
          </q-item-section>

          <q-item-section> Cancellation Policy </q-item-section>
        </q-item>

        <!-- REFUND POLICY -->
        <q-item clickable v-ripple to="/customer/refund-policy">
          <q-item-section avatar>
            <q-icon name="currency_exchange" color="primary" />
          </q-item-section>

          <q-item-section> Refund Policy </q-item-section>
        </q-item>

        <!-- ABOUT US -->
        <q-item clickable v-ripple to="/customer/about-us">
          <q-item-section avatar>
            <q-icon name="info_outline" color="primary" />
          </q-item-section>

          <q-item-section> About Us </q-item-section>
        </q-item>
      </q-list>

      <!-- ===================================================
           SIDEBAR FOOTER
      ==================================================== -->
      <div class="sidebar-footer q-pa-md">
        <q-separator class="q-mb-md" />

        <!-- LOGOUT BUTTON -->
        <q-btn
          outline
          color="negative"
          icon="logout"
          label="Logout"
          class="full-width"
          no-caps
          @click="confirmLogout"
        />

        <!-- COPYRIGHT -->
        <div class="text-caption text-grey text-center q-mt-md">
          © {{ currentYear }} BatohiDrive
        </div>

        <div class="text-caption text-grey-6 text-center q-mt-xs">
          Every path. Every journey.
        </div>
      </div>
    </q-drawer>

    <!-- =====================================================
         PAGE CONTENT
    ====================================================== -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- =====================================================
         LOGOUT CONFIRMATION DIALOG
    ====================================================== -->
    <q-dialog v-model="logoutDialog">
      <q-card style="width: 400px; max-width: 90vw">
        <!-- DIALOG HEADER -->
        <q-card-section class="row items-center">
          <q-avatar color="negative" text-color="white" icon="logout" />

          <div class="q-ml-md">
            <div class="text-h6 text-weight-bold"> Logout </div>

            <div class="text-grey-7"> Confirm logout </div>
          </div>
        </q-card-section>

        <q-separator />

        <!-- DIALOG CONTENT -->
        <q-card-section>
          <div class="text-body1">
            Are you sure you want to logout from BatohiDrive?
          </div>
        </q-card-section>

        <!-- DIALOG ACTIONS -->
        <q-card-actions align="right" class="q-pa-md">
          <!-- CANCEL -->
          <q-btn flat label="Cancel" color="grey-8" no-caps v-close-popup />

          <!-- LOGOUT -->
          <q-btn
            unelevated
            label="Logout"
            color="negative"
            icon="logout"
            no-caps
            :loading="loggingOut"
            @click="logout"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'

// =========================================================
// ROUTER
// =========================================================
const router = useRouter()

// =========================================================
// DRAWER
// =========================================================
const drawer = ref(true)

// =========================================================
// LOGOUT DIALOG
// =========================================================
const logoutDialog = ref(false)

// =========================================================
// LOGOUT LOADING
// =========================================================
const loggingOut = ref(false)

// =========================================================
// CURRENT YEAR
// =========================================================
const currentYear = computed(() => {
  return new Date().getFullYear()
})

// =========================================================
// GO TO PROFILE
// =========================================================
const goProfile = () => {
  router.push('/customer/profile')
}

// =========================================================
// GO TO NOTIFICATIONS
// =========================================================
const goNotifications = () => {
  router.push('/customer/notifications')
}

// =========================================================
// CONFIRM LOGOUT
// =========================================================
const confirmLogout = () => {
  logoutDialog.value = true
}

// =========================================================
// LOGOUT
// =========================================================
const logout = async () => {
  loggingOut.value = true

  try {
    // -------------------------------------------------------
    // Clear authentication data
    // -------------------------------------------------------

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('auth')

    // -------------------------------------------------------
    // Optional: clear all local storage
    // -------------------------------------------------------
    // Agar project mein sirf authentication data nahi
    // balki booking/search data bhi clear karna ho to
    // localStorage.clear() use kar sakte hain.
    //
    // Abhi hum sirf auth-related data clear kar rahe hain.

    // -------------------------------------------------------
    // Close dialog
    // -------------------------------------------------------
    logoutDialog.value = false

    // -------------------------------------------------------
    // Show notification
    // -------------------------------------------------------
    Notify.create({
      type: 'positive',
      message: 'Logged out successfully',
      position: 'top-right',
      timeout: 1500
    })

    // -------------------------------------------------------
    // Redirect to login
    // -------------------------------------------------------
    await router.replace('/')
  } catch (error) {
    console.error('Logout error:', error)

    Notify.create({
      type: 'negative',
      message: 'Unable to logout. Please try again.',
      position: 'top-right'
    })
  } finally {
    loggingOut.value = false
  }
}
</script>

<style scoped>
/* =========================================================
   SIDEBAR BRAND
========================================================= */

.sidebar-brand {
  min-height: 82px;
}

/* =========================================================
   SIDEBAR FOOTER
========================================================= */

.sidebar-footer {
  margin-top: auto;
}

/* =========================================================
   LEGAL SECTION TITLE
========================================================= */

.legal-title {
  font-size: 11px;
  font-weight: 700;
  color: #757575;
  letter-spacing: 0.8px;
}

/* =========================================================
   SIDEBAR MENU ITEM
========================================================= */

.q-item {
  border-radius: 8px;
  margin: 3px 8px;
}

/* =========================================================
   ACTIVE MENU ITEM
========================================================= */

.q-item.q-router-link--active {
  background: rgba(25, 118, 210, 0.1);
  color: var(--q-primary);
}

/* =========================================================
   LOGOUT BUTTON
========================================================= */

.sidebar-footer .q-btn {
  border-radius: 8px;
  font-weight: 600;
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {
  .sidebar-brand {
    padding: 16px;
  }
}
</style>
