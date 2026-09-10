<template>
  <q-layout view="hHh LpR fFf" class="driver-layout">
    <!-- =====================================================
         HEADER
    ====================================================== -->
    <q-header elevated class="driver-header">
      <q-toolbar>
        <!-- MOBILE MENU -->
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="lt-md"
          @click="drawerOpen = !drawerOpen"
        >
          <q-tooltip> Menu </q-tooltip>
        </q-btn>

        <!-- DESKTOP COLLAPSE -->
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="gt-sm"
          @click="toggleMiniState"
        >
          <q-tooltip>
            {{ miniState ? 'Expand Menu' : 'Collapse Menu' }}
          </q-tooltip>
        </q-btn>

        <!-- PAGE TITLE -->
        <div class="header-title q-ml-sm">
          <div class="text-weight-bold">
            {{ currentPageTitle }}
          </div>

          <div class="text-caption text-grey-6"> Driver Panel </div>
        </div>

        <q-space />

        <!-- =================================================
             NOTIFICATIONS
        ================================================== -->
        <q-btn
          flat
          round
          dense
          icon="notifications_none"
          class="q-mr-sm"
          @click="openNotifications"
        >
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
             PROFILE MENU
        ================================================== -->
        <q-btn flat no-caps class="profile-btn">
          <q-avatar size="38px" color="primary" text-color="white">
            <img v-if="driver.image" :src="driver.image" alt="Driver" />

            <span v-else>
              {{ driverInitials }}
            </span>
          </q-avatar>

          <div class="q-ml-sm gt-xs text-left">
            <div class="text-weight-medium">
              {{ driver.name }}
            </div>

            <div class="text-caption text-grey-6"> Driver </div>
          </div>

          <q-icon name="keyboard_arrow_down" class="q-ml-xs" />

          <!-- PROFILE DROPDOWN -->
          <q-menu anchor="bottom right" self="top right" :offset="[0, 8]">
            <q-list style="min-width: 220px" padding>
              <!-- USER -->
              <q-item class="profile-menu-header">
                <q-item-section avatar>
                  <q-avatar size="45px" color="primary" text-color="white">
                    <img v-if="driver.image" :src="driver.image" alt="Driver" />

                    <span v-else>
                      {{ driverInitials }}
                    </span>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-bold">
                    {{ driver.name }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ driver.mobile }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator class="q-my-sm" />

              <!-- PROFILE -->
              <q-item clickable v-close-popup @click="goToProfile">
                <q-item-section avatar>
                  <q-icon name="person" color="primary" />
                </q-item-section>

                <q-item-section> My Profile </q-item-section>
              </q-item>

              <!-- NOTIFICATIONS -->
              <q-item clickable v-close-popup @click="openNotifications">
                <q-item-section avatar>
                  <q-icon name="notifications" color="primary" />
                </q-item-section>

                <q-item-section> Notifications </q-item-section>
              </q-item>

              <q-separator class="q-my-sm" />

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
      v-model="drawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      :width="270"
      :mini-width="76"
      class="driver-drawer"
    >
      <!-- =================================================
           LOGO / BRAND
      ================================================== -->
      <div class="driver-brand" :class="{ 'driver-brand-mini': miniState }">
        <div class="brand-logo-wrapper">
          <img
            src="../assets/images/logo3.png"
            alt="BatohiDrive"
            class="brand-logo"
          />
        </div>

        <div v-if="!miniState" class="brand-text">
          <div class="brand-name"> BatohiDrive </div>

          <div class="brand-subtitle"> Driver Panel </div>
        </div>
      </div>

      <q-separator />

      <!-- =================================================
           DRIVER PROFILE
      ================================================== -->
      <div v-if="!miniState" class="driver-profile q-pa-md">
        <q-avatar size="52px" color="primary" text-color="white">
          <img v-if="driver.image" :src="driver.image" alt="Driver" />

          <span v-else>
            {{ driverInitials }}
          </span>
        </q-avatar>

        <div class="q-ml-md">
          <div class="text-weight-bold">
            {{ driver.name }}
          </div>

          <div class="text-caption text-grey-6"> Driver </div>

          <div class="driver-status">
            <span class="status-dot"></span>

            Online
          </div>
        </div>
      </div>

      <!-- MINI PROFILE -->
      <div v-else class="mini-profile q-pa-sm">
        <q-avatar size="44px" color="primary" text-color="white">
          <img v-if="driver.image" :src="driver.image" alt="Driver" />

          <span v-else>
            {{ driverInitials }}
          </span>
        </q-avatar>

        <q-tooltip>
          {{ driver.name }}
        </q-tooltip>
      </div>

      <q-separator />

      <!-- =================================================
           NAVIGATION
      ================================================== -->
      <q-scroll-area class="drawer-scroll">
        <q-list padding class="navigation-list">
          <!-- =================================================
               MAIN
          ================================================== -->

          <div v-if="!miniState" class="menu-section-title"> MAIN </div>

          <!-- DASHBOARD -->
          <q-item
            clickable
            :active="isRouteActive('DriverDashboard')"
            active-class="active-menu"
            @click="navigate('DriverDashboard')"
          >
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Dashboard </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              Dashboard
            </q-tooltip>
          </q-item>

          <!-- =================================================
               TRIPS
          ================================================== -->

          <div v-if="!miniState" class="menu-section-title"> TRIPS </div>

          <!-- ASSIGNED TRIPS -->
          <q-item
            clickable
            :active="isRouteActive('DriverAssignedTrips')"
            active-class="active-menu"
            @click="navigate('DriverAssignedTrips')"
          >
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Assigned Trips </q-item-label>
            </q-item-section>

            <q-item-section v-if="!miniState && assignedTripCount > 0" side>
              <q-badge color="primary" rounded>
                {{ assignedTripCount }}
              </q-badge>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              Assigned Trips
            </q-tooltip>
          </q-item>

          <!-- TRIP HISTORY -->
          <q-item
            clickable
            :active="isRouteActive('DriverTripHistory')"
            active-class="active-menu"
            @click="navigate('DriverTripHistory')"
          >
            <q-item-section avatar>
              <q-icon name="history" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Trip History </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              Trip History
            </q-tooltip>
          </q-item>

          <!-- TRIP DETAILS -->
          <q-item
            clickable
            :active="isRouteActive('DriverTripDetails')"
            active-class="active-menu"
            @click="navigate('DriverTripDetails')"
          >
            <q-item-section avatar>
              <q-icon name="route" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Trip Details </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              Trip Details
            </q-tooltip>
          </q-item>

          <!-- =================================================
               ACCOUNT
          ================================================== -->

          <div v-if="!miniState" class="menu-section-title"> ACCOUNT </div>

          <!-- EARNINGS -->
          <q-item
            clickable
            :active="isRouteActive('DriverEarnings')"
            active-class="active-menu"
            @click="navigate('DriverEarnings')"
          >
            <q-item-section avatar>
              <q-icon name="payments" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Earnings </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              Earnings
            </q-tooltip>
          </q-item>

          <!-- PROFILE -->
          <q-item
            clickable
            :active="isRouteActive('DriverProfile')"
            active-class="active-menu"
            @click="navigate('DriverProfile')"
          >
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Profile </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              Profile
            </q-tooltip>
          </q-item>

          <!-- =================================================
               MANAGEMENT
          ================================================== -->

          <div v-if="!miniState" class="menu-section-title"> MANAGEMENT </div>

          <!-- MANAGEMENT -->
          <q-item
            clickable
            :active="isRouteActive('driver-management')"
            active-class="active-menu"
            @click="navigate('driver-management')"
          >
            <q-item-section avatar>
              <q-icon name="manage_accounts" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Management </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              Management
            </q-tooltip>
          </q-item>

          <!-- NOTIFICATIONS -->
          <q-item
            clickable
            :active="isRouteActive('DriverNotifications')"
            active-class="active-menu"
            @click="openNotifications"
          >
            <q-item-section avatar>
              <q-icon name="notifications" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Notifications </q-item-label>
            </q-item-section>

            <q-item-section v-if="!miniState && notificationCount > 0" side>
              <q-badge color="negative" rounded>
                {{ notificationCount }}
              </q-badge>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              Notifications
            </q-tooltip>
          </q-item>

          <!-- =================================================
               LEGAL & SUPPORT
          ================================================== -->

          <div v-if="!miniState" class="menu-section-title">
            LEGAL & SUPPORT
          </div>

          <!-- FAQ -->
          <q-item
            clickable
            :active="isRouteActive('driver-faq')"
            active-class="active-menu"
            @click="navigate('driver-faq')"
          >
            <q-item-section avatar>
              <q-icon name="help_outline" />
            </q-item-section>

            <q-item-section>
              <q-item-label> FAQ </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              FAQ
            </q-tooltip>
          </q-item>

          <!-- TERMS & CONDITIONS -->
          <q-item
            clickable
            :active="isRouteActive('driver-terms')"
            active-class="active-menu"
            @click="navigate('driver-terms')"
          >
            <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Terms & Conditions </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              Terms & Conditions
            </q-tooltip>
          </q-item>

          <!-- PRIVACY POLICY -->
          <q-item
            clickable
            :active="isRouteActive('driver-privacy-policy')"
            active-class="active-menu"
            @click="navigate('driver-privacy-policy')"
          >
            <q-item-section avatar>
              <q-icon name="privacy_tip" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Privacy Policy </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              Privacy Policy
            </q-tooltip>
          </q-item>

          <!-- CANCELLATION POLICY -->
          <q-item
            clickable
            :active="isRouteActive('DriverCancellationPolicy')"
            active-class="active-menu"
            @click="navigate('DriverCancellationPolicy')"
          >
            <q-item-section avatar>
              <q-icon name="event_busy" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Cancellation Policy </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              Cancellation Policy
            </q-tooltip>
          </q-item>

          <!-- REFUND POLICY -->
          <q-item
            clickable
            :active="isRouteActive('DriverRefundPolicy')"
            active-class="active-menu"
            @click="navigate('DriverRefundPolicy')"
          >
            <q-item-section avatar>
              <q-icon name="currency_exchange" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Refund Policy </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              Refund Policy
            </q-tooltip>
          </q-item>

          <!-- ABOUT US -->
          <q-item
            clickable
            :active="isRouteActive('DriverAboutUs')"
            active-class="active-menu"
            @click="navigate('DriverAboutUs')"
          >
            <q-item-section avatar>
              <q-icon name="info_outline" />
            </q-item-section>

            <q-item-section>
              <q-item-label> About Us </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
            >
              About Us
            </q-tooltip>
          </q-item>
        </q-list>
      </q-scroll-area>

      <!-- =================================================
           SIDEBAR FOOTER
      ================================================== -->
      <div class="drawer-footer">
        <q-separator />

        <!-- LOGOUT -->
        <q-item clickable @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" color="negative" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-negative"> Logout </q-item-label>
          </q-item-section>

          <q-tooltip v-if="miniState" anchor="center right" self="center left">
            Logout
          </q-tooltip>
        </q-item>
      </div>
    </q-drawer>

    <!-- =====================================================
         MAIN CONTENT
    ====================================================== -->
    <q-page-container class="driver-page-container">
      <router-view />
    </q-page-container>

    <!-- =====================================================
         LOGOUT DIALOG
    ====================================================== -->
    <q-dialog v-model="logoutDialog">
      <q-card class="logout-dialog">
        <!-- HEADER -->
        <q-card-section class="row items-center">
          <q-avatar color="red-1" text-color="negative" icon="logout" />

          <div class="q-ml-md">
            <div class="text-h6 text-weight-bold"> Logout </div>

            <div class="text-grey-7"> Are you sure you want to logout? </div>
          </div>
        </q-card-section>

        <q-separator />

        <!-- ACTIONS -->
        <q-card-actions align="right" class="q-pa-md">
          <!-- CANCEL -->
          <q-btn
            flat
            label="Cancel"
            color="grey-7"
            no-caps
            @click="logoutDialog = false"
          />

          <!-- CONFIRM LOGOUT -->
          <q-btn
            unelevated
            color="negative"
            icon="logout"
            label="Logout"
            no-caps
            :loading="loggingOut"
            @click="confirmLogout"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import { useRouter, useRoute } from 'vue-router'

import { useQuasar } from 'quasar'

/* =========================================================
   QUASAR
========================================================= */

const $q = useQuasar()

/* =========================================================
   ROUTER
========================================================= */

const router = useRouter()

const route = useRoute()

/* =========================================================
   DRAWER
========================================================= */

const drawerOpen = ref(true)

const miniState = ref(false)

/* =========================================================
   DRIVER
========================================================= */

const driver = ref({
  name: 'Driver',

  mobile: '',

  email: '',

  image: '',

  id: null
})

/* =========================================================
   COUNTS
========================================================= */

const assignedTripCount = ref(0)

const notificationCount = ref(0)

/* =========================================================
   LOGOUT
========================================================= */

const logoutDialog = ref(false)

const loggingOut = ref(false)

/* =========================================================
   PAGE TITLES
========================================================= */

const pageTitles = {
  DriverDashboard: 'Dashboard',

  DriverAssignedTrips: 'Assigned Trips',

  DriverTripHistory: 'Trip History',

  DriverTripDetails: 'Trip Details',

  DriverEarnings: 'Earnings',

  DriverProfile: 'Profile',

  'driver-management': 'Management',

  DriverNotifications: 'Notifications',

  DriverFaq: 'FAQ',

  DriverTerms: 'Terms & Conditions',

  DriverPrivacyPolicy: 'Privacy Policy',

  DriverCancellationPolicy: 'Cancellation Policy',

  DriverRefundPolicy: 'Refund Policy',

  DriverAboutUs: 'About Us'
}

/* =========================================================
   CURRENT PAGE TITLE
========================================================= */

const currentPageTitle = computed(() => {
  return pageTitles[route.name] || 'Driver Dashboard'
})

/* =========================================================
   DRIVER INITIALS
========================================================= */

const driverInitials = computed(() => {
  if (!driver.value.name) {
    return 'D'
  }

  return driver.value.name
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
})

/* =========================================================
   TOGGLE MINI
========================================================= */

const toggleMiniState = () => {
  miniState.value = !miniState.value
}

/* =========================================================
   CHECK ACTIVE ROUTE
========================================================= */

const isRouteActive = routeName => {
  if (!route.name) {
    return false
  }

  return route.name === routeName
}

/* =========================================================
   NAVIGATION
========================================================= */

const navigate = routeName => {
  router.push({
    name: routeName
  })

  // Close drawer on mobile
  if ($q.screen.lt.md) {
    drawerOpen.value = false
  }
}

/* =========================================================
   PROFILE
========================================================= */

const goToProfile = () => {
  router.push({
    name: 'DriverProfile'
  })
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

const openNotifications = () => {
  router.push({
    name: 'DriverNotifications'
  })
}

/* =========================================================
   LOGOUT
========================================================= */

const logout = () => {
  logoutDialog.value = true
}

/* =========================================================
   CONFIRM LOGOUT
========================================================= */

const confirmLogout = async () => {
  try {
    loggingOut.value = true

    /* -------------------------------------------------------
       CLEAR AUTHENTICATION DATA
    ------------------------------------------------------- */

    localStorage.removeItem('token')

    localStorage.removeItem('accessToken')

    localStorage.removeItem('user')

    localStorage.removeItem('driver')

    localStorage.removeItem('role')

    localStorage.removeItem('auth')

    sessionStorage.removeItem('token')

    /* -------------------------------------------------------
       CLOSE DIALOG
    ------------------------------------------------------- */

    logoutDialog.value = false

    /* -------------------------------------------------------
       REDIRECT TO DRIVER LOGIN
    ------------------------------------------------------- */

    await router.replace('/')
  } catch (error) {
    console.error('Logout Error:', error)
  } finally {
    loggingOut.value = false
  }
}

/* =========================================================
   LOAD DRIVER DATA
========================================================= */

const loadDriver = () => {
  try {
    const storedDriver = localStorage.getItem('driver')

    const storedUser = localStorage.getItem('user')

    let userData = null

    if (storedDriver) {
      userData = JSON.parse(storedDriver)
    } else if (storedUser) {
      userData = JSON.parse(storedUser)
    }

    if (userData) {
      driver.value = {
        id: userData.id || userData.driverId || null,

        name: userData.name || userData.driverName || 'Driver',

        mobile: userData.mobile || userData.phone || '',

        email: userData.email || '',

        image: userData.image || userData.profileImage || userData.avatar || ''
      }
    }
  } catch (error) {
    console.error('Driver data error:', error)
  }
}

/* =========================================================
   LOAD COUNTS
========================================================= */

const loadCounts = () => {
  /*
   * Replace these values with API data
   * when driver APIs are connected.
   */

  assignedTripCount.value = 0

  notificationCount.value = 0
}

/* =========================================================
   ON MOUNTED
========================================================= */

onMounted(() => {
  loadDriver()

  loadCounts()
})
</script>

<style scoped>
/* =========================================================
   MAIN LAYOUT
========================================================= */

.driver-layout {
  background: #f5f7fb;
}

/* =========================================================
   HEADER
========================================================= */

.driver-header {
  background: #ffffff;

  color: #1f2937;

  border-bottom: 1px solid #e5e7eb;
}

.driver-header .q-toolbar {
  min-height: 70px;
}

.header-title {
  line-height: 1.2;
}

.header-title > div:first-child {
  font-size: 17px;
}

/* =========================================================
   PROFILE BUTTON
========================================================= */

.profile-btn {
  min-height: 48px;

  border-radius: 10px;

  padding: 4px 8px;
}

.profile-btn:hover {
  background: #f3f4f6;
}

/* =========================================================
   DRAWER
========================================================= */

.driver-drawer {
  background: #ffffff;

  color: #374151;
}

.driver-drawer :deep(.q-drawer__content) {
  overflow: hidden;
}

/* =========================================================
   BRAND
========================================================= */

.driver-brand {
  min-height: 75px;

  display: flex;

  align-items: center;

  padding: 12px 18px;

  gap: 12px;
}

.driver-brand-mini {
  justify-content: center;

  padding: 12px 8px;
}

.brand-logo-wrapper {
  width: 42px;

  height: 42px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;
}

.brand-logo {
  max-width: 100%;

  max-height: 100%;

  object-fit: contain;
}

.brand-text {
  min-width: 0;
}

.brand-name {
  font-size: 18px;

  font-weight: 800;

  color: #111827;
}

.brand-subtitle {
  font-size: 11px;

  color: #6b7280;

  margin-top: 1px;
}

/* =========================================================
   DRIVER PROFILE
========================================================= */

.driver-profile {
  display: flex;

  align-items: center;
}

.driver-profile .q-avatar {
  flex-shrink: 0;
}

.driver-profile img,
.mini-profile img {
  width: 100%;

  height: 100%;

  object-fit: cover;
}

.driver-status {
  display: flex;

  align-items: center;

  gap: 5px;

  color: #16a34a;

  font-size: 11px;

  margin-top: 3px;
}

.status-dot {
  width: 7px;

  height: 7px;

  background: #22c55e;

  border-radius: 50%;

  display: inline-block;
}

.mini-profile {
  display: flex;

  justify-content: center;

  align-items: center;
}

/* =========================================================
   DRAWER SCROLL
========================================================= */

.drawer-scroll {
  height: calc(100vh - 235px);
}

/* =========================================================
   MENU SECTION TITLE
========================================================= */

.menu-section-title {
  font-size: 10px;

  font-weight: 700;

  color: #9ca3af;

  letter-spacing: 1px;

  padding: 14px 16px 7px;
}

/* =========================================================
   NAVIGATION
========================================================= */

.navigation-list {
  padding: 12px 10px;
}

.navigation-list .q-item {
  min-height: 48px;

  border-radius: 9px;

  margin-bottom: 4px;

  color: #4b5563;
}

.navigation-list .q-item:hover {
  background: #f3f6fb;
}

.navigation-list .q-item .q-icon {
  font-size: 22px;
}

/* =========================================================
   ACTIVE MENU
========================================================= */

.active-menu {
  background: #eaf2ff !important;

  color: #1976d2 !important;

  font-weight: 600;
}

.active-menu .q-icon {
  color: #1976d2;
}

/* =========================================================
   DRAWER FOOTER
========================================================= */

.drawer-footer {
  position: absolute;

  bottom: 0;

  left: 0;

  right: 0;

  background: #ffffff;
}

.drawer-footer .q-item {
  min-height: 55px;

  margin: 6px 10px;

  border-radius: 9px;
}

.drawer-footer .q-item:hover {
  background: #fff1f2;
}

/* =========================================================
   PAGE CONTAINER
========================================================= */

.driver-page-container {
  background: #f5f7fb;

  min-height: 100vh;
}

/* =========================================================
   LOGOUT DIALOG
========================================================= */

.logout-dialog {
  width: 420px;

  max-width: 92vw;

  border-radius: 16px;
}

/* =========================================================
   PROFILE MENU
========================================================= */

.profile-menu-header {
  min-height: 65px;
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1023px) {
  .driver-header .q-toolbar {
    min-height: 64px;
  }
}

@media (max-width: 599px) {
  .header-title {
    display: none;
  }

  .driver-page-container {
    padding-bottom: 10px;
  }

  .profile-btn {
    padding: 3px;
  }
}
</style>
