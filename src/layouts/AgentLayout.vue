<template>
  <q-layout view="hHh LpR fFf" class="agent-layout">
    <!-- =====================================================
         HEADER
    ====================================================== -->

    <q-header elevated class="agent-header">
      <q-toolbar>
        <!-- MOBILE / DRAWER MENU -->
        <q-btn flat round dense icon="menu" @click="toggleLeftDrawer">
          <q-tooltip> Menu </q-tooltip>
        </q-btn>

        <!-- LOGO -->
        <div class="row items-center">
          <img
            src="../assets/images/logo3.png"
            alt="BatohiDrive"
            class="header-logo"
          />

          <div class="brand-name gt-sm"> BatohiDrive </div>
        </div>

        <q-space />

        <!-- =================================================
             NOTIFICATIONS
        ================================================== -->

        <q-btn flat round icon="notifications" @click="goToNotifications">
          <q-badge
            v-if="notificationCount > 0"
            color="negative"
            floating
            rounded
          >
            {{ notificationCount }}
          </q-badge>

          <q-tooltip> Notifications </q-tooltip>
        </q-btn>

        <!-- =================================================
             USER MENU
        ================================================== -->

        <q-btn flat no-caps class="user-button q-ml-sm">
          <q-avatar color="primary" text-color="white" size="40px">
            <img
              v-if="user.profileImage"
              :src="user.profileImage"
              alt="Profile"
            />

            <span v-else>
              {{ userInitial }}
            </span>
          </q-avatar>

          <!-- USER NAME -->
          <div class="q-ml-sm gt-sm text-left">
            <div class="text-weight-bold">
              {{ user.name }}
            </div>

            <div class="text-caption text-grey-6"> Agent </div>
          </div>

          <q-icon name="keyboard_arrow_down" class="q-ml-sm gt-sm" />

          <!-- USER DROPDOWN -->
          <q-menu>
            <q-list style="min-width: 210px">
              <!-- PROFILE -->
              <q-item clickable v-close-popup @click="goToProfile">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>

                <q-item-section> My Profile </q-item-section>
              </q-item>

              <!-- NOTIFICATIONS -->
              <q-item clickable v-close-popup @click="goToNotifications">
                <q-item-section avatar>
                  <q-icon name="notifications" />
                </q-item-section>

                <q-item-section> Notifications </q-item-section>

                <q-item-section side>
                  <q-badge
                    v-if="notificationCount > 0"
                    color="negative"
                    rounded
                  >
                    {{ notificationCount }}
                  </q-badge>
                </q-item-section>
              </q-item>

              <q-separator />

              <!-- LOGOUT -->
              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-icon name="logout" color="negative" />
                </q-item-section>

                <q-item-section class="text-negative"> Logout </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- =====================================================
         SIDEBAR / DRAWER
    ====================================================== -->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="270"
      class="agent-drawer"
    >
      <!-- =================================================
           DRAWER HEADER
      ================================================== -->

      <div class="drawer-header">
        <img
          src="../assets/images/logo3.png"
          alt="BatohiDrive"
          class="drawer-logo"
        />

        <div>
          <div class="text-h6 text-weight-bold"> BatohiDrive </div>

          <div class="text-caption text-grey-6"> Agent Panel </div>
        </div>
      </div>

      <q-separator />

      <!-- =================================================
           MAIN MENU
      ================================================== -->

      <q-list padding class="agent-menu">
        <!-- ================= DASHBOARD ================= -->

        <q-item
          clickable
          :active="isActive('/agent/dashboard')"
          active-class="active-menu-item"
          @click="navigate('/agent/dashboard')"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Dashboard </q-item-label>
          </q-item-section>
        </q-item>

        <!-- ================= PROFILE ================= -->

        <q-item
          clickable
          :active="isActive('/agent/profile')"
          active-class="active-menu-item"
          @click="navigate('/agent/profile')"
        >
          <q-item-section avatar>
            <q-icon name="person" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Profile </q-item-label>
          </q-item-section>
        </q-item>

        <!-- ================= VEHICLES ================= -->

        <q-item
          clickable
          :active="isActive('/agent/vehicles')"
          active-class="active-menu-item"
          @click="navigate('/agent/vehicles')"
        >
          <q-item-section avatar>
            <q-icon name="directions_car" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Vehicles </q-item-label>
          </q-item-section>
        </q-item>

        <!-- ================= ADD VEHICLE ================= -->

        <q-item
          clickable
          :active="isActive('/agent/vehicles/add')"
          active-class="active-menu-item"
          @click="navigate('/agent/vehicles/add')"
        >
          <q-item-section avatar>
            <q-icon name="add_circle" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Add Vehicle </q-item-label>
          </q-item-section>
        </q-item>

        <!-- ================= VEHICLE BOOKINGS ================= -->

        <q-item
          clickable
          :active="isActive('/agent/vehicle-bookings')"
          active-class="active-menu-item"
          @click="navigate('/agent/vehicle-bookings')"
        >
          <q-item-section avatar>
            <q-icon name="event" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Vehicle Bookings </q-item-label>
          </q-item-section>
        </q-item>

        <!-- ================= DRIVERS ================= -->

        <q-item
          clickable
          :active="isActive('/agent/drivers')"
          active-class="active-menu-item"
          @click="navigate('/agent/drivers')"
        >
          <q-item-section avatar>
            <q-icon name="local_taxi" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Drivers </q-item-label>
          </q-item-section>
        </q-item>

        <!-- ================= EARNINGS ================= -->

        <q-item
          clickable
          :active="isActive('/agent/earnings')"
          active-class="active-menu-item"
          @click="navigate('/agent/earnings')"
        >
          <q-item-section avatar>
            <q-icon name="payments" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Earnings </q-item-label>
          </q-item-section>
        </q-item>

        <!-- ================= REPORTS ================= -->

        <q-item
          clickable
          :active="isActive('/agent/reports')"
          active-class="active-menu-item"
          @click="navigate('/agent/reports')"
        >
          <q-item-section avatar>
            <q-icon name="assessment" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Reports </q-item-label>
          </q-item-section>
        </q-item>

        <!-- =================================================
             LEGAL & SUPPORT
        ================================================== -->

        <q-separator class="q-my-md" />

        <div class="menu-section-title"> LEGAL & SUPPORT </div>

        <!-- ================= FAQ ================= -->

        <q-item
          clickable
          :active="isActive('/agent/faq')"
          active-class="active-menu-item"
          @click="navigate('/agent/faq')"
        >
          <q-item-section avatar>
            <q-icon name="help_outline" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> FAQ </q-item-label>
          </q-item-section>
        </q-item>

        <!-- ================= TERMS ================= -->

        <q-item
          clickable
          :active="isActive('/agent/terms-and-conditions')"
          active-class="active-menu-item"
          @click="navigate('/agent/terms-and-conditions')"
        >
          <q-item-section avatar>
            <q-icon name="description" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Terms & Conditions </q-item-label>
          </q-item-section>
        </q-item>

        <!-- ================= PRIVACY ================= -->

        <q-item
          clickable
          :active="isActive('/agent/privacy-policy')"
          active-class="active-menu-item"
          @click="navigate('/agent/privacy-policy')"
        >
          <q-item-section avatar>
            <q-icon name="privacy_tip" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Privacy Policy </q-item-label>
          </q-item-section>
        </q-item>

        <!-- ================= CANCELLATION ================= -->

        <q-item
          clickable
          :active="isActive('/agent/cancellation-policy')"
          active-class="active-menu-item"
          @click="navigate('/agent/cancellation-policy')"
        >
          <q-item-section avatar>
            <q-icon name="event_busy" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Cancellation Policy </q-item-label>
          </q-item-section>
        </q-item>

        <!-- ================= REFUND ================= -->

        <q-item
          clickable
          :active="isActive('/agent/refund-policy')"
          active-class="active-menu-item"
          @click="navigate('/agent/refund-policy')"
        >
          <q-item-section avatar>
            <q-icon name="currency_exchange" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Refund Policy </q-item-label>
          </q-item-section>
        </q-item>

        <!-- ================= ABOUT US ================= -->

        <q-item
          clickable
          :active="isActive('/agent/about-us')"
          active-class="active-menu-item"
          @click="navigate('/agent/about-us')"
        >
          <q-item-section avatar>
            <q-icon name="info" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label> About Us </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- =================================================
           DRAWER FOOTER
      ================================================== -->

      <div class="drawer-footer">
        <q-btn
          flat
          no-caps
          color="negative"
          icon="logout"
          label="Logout"
          class="full-width"
          @click="logout"
        />
      </div>
    </q-drawer>

    <!-- =====================================================
         PAGE CONTENT
    ====================================================== -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import { useRouter, useRoute } from 'vue-router'

import { useQuasar } from 'quasar'

// ======================================================
// ROUTER
// ======================================================

const router = useRouter()

const route = useRoute()

const $q = useQuasar()

// ======================================================
// DRAWER
// ======================================================

const leftDrawerOpen = ref(true)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// ======================================================
// USER
// ======================================================

const user = ref({
  name: 'Agent',

  email: 'agent@batohidrive.com',

  profileImage: ''
})

// ======================================================
// NOTIFICATION
// ======================================================

const notificationCount = ref(3)

// ======================================================
// USER INITIAL
// ======================================================

const userInitial = computed(() => {
  if (!user.value.name) {
    return 'A'
  }

  return user.value.name.charAt(0).toUpperCase()
})

// ======================================================
// ACTIVE MENU
// ======================================================

function isActive(path) {
  return route.path === path || route.path.startsWith(`${path}/`)
}

// ======================================================
// NAVIGATION
// ======================================================

function navigate(path) {
  router.push(path)

  // Close drawer on mobile
  if ($q.screen.lt.md) {
    leftDrawerOpen.value = false
  }
}

// ======================================================
// PROFILE
// ======================================================

function goToProfile() {
  router.push('/agent/profile')
}

// ======================================================
// NOTIFICATIONS
// ======================================================

function goToNotifications() {
  /*
   * Agar aapke routes.js me AgentNotifications
   * page add ho gaya hai to isko:
   *
   * router.push('/agent/notifications')
   *
   * kar sakte hain.
   */

  $q.notify({
    type: 'info',

    message: 'Notifications will be available soon.'
  })
}

// ======================================================
// LOGOUT
// ======================================================

function logout() {
  $q.dialog({
    title: 'Logout',

    message: 'Are you sure you want to logout?',

    persistent: true,

    ok: {
      label: 'Logout',
      color: 'negative',
      unelevated: true
    },

    cancel: {
      label: 'Cancel',
      flat: true
    }
  }).onOk(() => {
    // Remove authentication data
    localStorage.removeItem('token')

    localStorage.removeItem('accessToken')

    localStorage.removeItem('user')

    localStorage.removeItem('agent')

    localStorage.removeItem('driver')

    // Clear session storage
    sessionStorage.removeItem('token')

    sessionStorage.removeItem('accessToken')

    // Redirect to login
    router.push('/')
  })
}

// ======================================================
// LOAD USER
// ======================================================

function loadUser() {
  const storedUser = localStorage.getItem('user')

  const storedAgent = localStorage.getItem('agent')

  try {
    // First preference: agent
    if (storedAgent) {
      user.value = JSON.parse(storedAgent)

      return
    }

    // Second preference: user
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  } catch (error) {
    console.error('Agent User Parse Error:', error)
  }
}

// ======================================================
// PAGE LOAD
// ======================================================

onMounted(() => {
  loadUser()
})
</script>

<style scoped>
/* ======================================================
   MAIN LAYOUT
====================================================== */

.agent-layout {
  background: #f5f7fb;
}

/* ======================================================
   HEADER
====================================================== */

.agent-header {
  background: #ffffff;

  color: #1f2937;

  border-bottom: 1px solid #e5e7eb;
}

.header-logo {
  height: 38px;

  width: auto;

  object-fit: contain;
}

.brand-name {
  font-size: 20px;

  font-weight: 700;

  margin-left: 10px;
}

.user-button {
  min-height: 50px;
}

/* ======================================================
   DRAWER
====================================================== */

.agent-drawer {
  background: #ffffff;
}

.drawer-header {
  height: 75px;

  display: flex;

  align-items: center;

  padding: 12px 18px;
}

.drawer-logo {
  width: 48px;

  height: 48px;

  object-fit: contain;

  margin-right: 12px;
}

/* ======================================================
   MENU
====================================================== */

.agent-menu {
  padding: 12px;

  padding-bottom: 90px;
}

.agent-menu .q-item {
  min-height: 48px;

  border-radius: 8px;

  margin-bottom: 4px;

  color: #4b5563;
}

.agent-menu .q-item:hover {
  background: #f1f5f9;
}

.active-menu-item {
  background: #e8f1ff !important;

  color: #1976d2 !important;

  font-weight: 600;
}

/* ======================================================
   LEGAL SECTION TITLE
====================================================== */

.menu-section-title {
  font-size: 11px;

  font-weight: 700;

  color: #9ca3af;

  letter-spacing: 0.8px;

  padding: 4px 12px 8px;
}

/* ======================================================
   DRAWER FOOTER
====================================================== */

.drawer-footer {
  position: absolute;

  bottom: 0;

  left: 0;

  right: 0;

  padding: 15px;

  background: #ffffff;

  border-top: 1px solid #eeeeee;
}

/* ======================================================
   RESPONSIVE
====================================================== */

@media (max-width: 599px) {
  .brand-name {
    font-size: 17px;
  }

  .header-logo {
    height: 32px;
  }

  .drawer-header {
    padding: 10px 15px;
  }
}
</style>
