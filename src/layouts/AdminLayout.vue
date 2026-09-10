<template>
  <q-layout view="hHh LpR fFf" class="admin-layout">
    <!-- =====================================================
         HEADER
    ====================================================== -->
    <q-header elevated class="admin-header">
      <q-toolbar>
        <!-- MENU -->
        <q-btn flat round dense icon="menu" @click="toggleLeftDrawer" />

        <!-- TITLE -->
        <q-toolbar-title class="text-weight-bold">
          BatohiDrive

          <span class="admin-title"> Admin Panel </span>
        </q-toolbar-title>

        <q-space />

        <!-- =================================================
             NOTIFICATIONS
        ================================================== -->
        <q-btn
          flat
          round
          icon="notifications"
          @click="router.push('/admin/notifications')"
        >
          <q-badge color="red" floating rounded> 3 </q-badge>

          <q-tooltip> Notifications </q-tooltip>
        </q-btn>

        <!-- =================================================
             PROFILE
        ================================================== -->
        <q-btn flat no-caps class="q-ml-sm">
          <q-avatar size="38px">
            <img src="/src/assets/images/logo3.png" alt="Admin" />
          </q-avatar>

          <div class="q-ml-sm gt-xs">
            <div class="admin-name"> Admin </div>

            <div class="admin-role"> Administrator </div>
          </div>

          <q-icon name="keyboard_arrow_down" class="q-ml-xs" />

          <!-- PROFILE MENU -->
          <q-menu>
            <q-list style="min-width: 200px">
              <!-- PROFILE -->
              <q-item
                clickable
                v-close-popup
                @click="router.push('/admin/profile')"
              >
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>

                <q-item-section> My Profile </q-item-section>
              </q-item>

              <!-- SETTINGS -->
              <q-item
                clickable
                v-close-popup
                @click="router.push('/admin/settings')"
              >
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>

                <q-item-section> Settings </q-item-section>
              </q-item>

              <q-separator />

              <!-- LOGOUT -->
              <q-item clickable v-close-popup @click="confirmLogout">
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
         SIDEBAR
    ====================================================== -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="260"
      class="admin-sidebar"
    >
      <!-- ===================================================
           LOGO
      ==================================================== -->
      <div class="admin-logo">
        <img src="/src/assets/images/logo3.png" alt="BatohiDrive" />

        <div>
          <div class="logo-title"> BatohiDrive </div>

          <div class="logo-subtitle"> Admin Panel </div>
        </div>
      </div>

      <!-- ===================================================
           SIDEBAR SCROLL
      ==================================================== -->
      <q-scroll-area class="sidebar-scroll">
        <q-list padding>
          <!-- =================================================
               MAIN
          ================================================== -->
          <div class="menu-section-title"> MAIN </div>

          <!-- DASHBOARD -->
          <q-item
            clickable
            v-ripple
            to="/admin/dashboard"
            exact
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <!-- =================================================
               USER MANAGEMENT
          ================================================== -->
          <div class="menu-section-title"> USER MANAGEMENT </div>

          <!-- CUSTOMERS -->
          <q-item
            clickable
            v-ripple
            to="/admin/customers"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section> Customers </q-item-section>
          </q-item>

          <!-- DRIVERS -->
          <q-item
            clickable
            v-ripple
            to="/admin/drivers"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="badge" />
            </q-item-section>

            <q-item-section> Drivers </q-item-section>
          </q-item>

          <!-- AGENTS -->
          <q-item
            clickable
            v-ripple
            to="/admin/agents"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="support_agent" />
            </q-item-section>

            <q-item-section> Agents </q-item-section>
          </q-item>

          <!-- =================================================
               VEHICLE MANAGEMENT
          ================================================== -->
          <div class="menu-section-title"> VEHICLE MANAGEMENT </div>

          <!-- VEHICLES -->
          <q-item
            clickable
            v-ripple
            to="/admin/vehicles"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="directions_car" />
            </q-item-section>

            <q-item-section> Vehicles </q-item-section>
          </q-item>

          <!-- VEHICLE TYPES -->
          <q-item
            clickable
            v-ripple
            to="/admin/vehicle-types"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="category" />
            </q-item-section>

            <q-item-section> Vehicle Types </q-item-section>
          </q-item>

          <!-- =================================================
               BOOKING & FINANCE
          ================================================== -->
          <div class="menu-section-title"> BOOKING & FINANCE </div>

          <!-- BOOKINGS -->
          <q-item
            clickable
            v-ripple
            to="/admin/bookings"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="event" />
            </q-item-section>

            <q-item-section> Bookings </q-item-section>
          </q-item>

          <!-- PAYMENTS -->
          <q-item
            clickable
            v-ripple
            to="/admin/payments"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="payments" />
            </q-item-section>

            <q-item-section> Payments </q-item-section>
          </q-item>

          <!-- INVOICES -->
          <q-item
            clickable
            v-ripple
            to="/admin/invoices"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="receipt_long" />
            </q-item-section>

            <q-item-section> Invoices </q-item-section>
          </q-item>

          <!-- =================================================
               MARKETING
          ================================================== -->
          <div class="menu-section-title"> MARKETING </div>

          <!-- COUPONS -->
          <q-item
            clickable
            v-ripple
            to="/admin/coupons"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="local_offer" />
            </q-item-section>

            <q-item-section> Coupons </q-item-section>
          </q-item>

          <!-- =================================================
               COMMUNICATION
          ================================================== -->
          <div class="menu-section-title"> COMMUNICATION </div>

          <!-- NOTIFICATIONS -->
          <q-item
            clickable
            v-ripple
            to="/admin/notifications"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="notifications" />
            </q-item-section>

            <q-item-section> Notifications </q-item-section>
          </q-item>

          <!-- REVIEWS -->
          <q-item
            clickable
            v-ripple
            to="/admin/reviews"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Reviews </q-item-section>
          </q-item>

          <!-- =================================================
               REPORTS
          ================================================== -->
          <div class="menu-section-title"> REPORTS </div>

          <!-- REPORTS -->
          <q-item
            clickable
            v-ripple
            to="/admin/reports"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="analytics" />
            </q-item-section>

            <q-item-section> Reports </q-item-section>
          </q-item>

          <!-- =================================================
               SYSTEM
          ================================================== -->
          <div class="menu-section-title"> SYSTEM </div>

          <!-- SETTINGS -->
          <q-item
            clickable
            v-ripple
            to="/admin/settings"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section> Settings </q-item-section>
          </q-item>

          <!-- PROFILE -->
          <q-item
            clickable
            v-ripple
            to="/admin/profile"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>

            <q-item-section> My Profile </q-item-section>
          </q-item>

          <!-- =================================================
               LEGAL & SUPPORT
          ================================================== -->
          <div class="menu-section-title"> LEGAL & SUPPORT </div>

          <!-- FAQ -->
          <q-item
            clickable
            v-ripple
            to="/admin/faq"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="help_outline" />
            </q-item-section>

            <q-item-section> FAQ </q-item-section>
          </q-item>

          <!-- TERMS & CONDITIONS -->
          <q-item
            clickable
            v-ripple
            to="/admin/terms-and-conditions"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>

            <q-item-section> Terms & Conditions </q-item-section>
          </q-item>

          <!-- PRIVACY POLICY -->
          <q-item
            clickable
            v-ripple
            to="/admin/privacy-policy"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="privacy_tip" />
            </q-item-section>

            <q-item-section> Privacy Policy </q-item-section>
          </q-item>

          <!-- CANCELLATION POLICY -->
          <q-item
            clickable
            v-ripple
            to="/admin/cancellation-policy"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="event_busy" />
            </q-item-section>

            <q-item-section> Cancellation Policy </q-item-section>
          </q-item>

          <!-- REFUND POLICY -->
          <q-item
            clickable
            v-ripple
            to="/admin/refund-policy"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="currency_exchange" />
            </q-item-section>

            <q-item-section> Refund Policy </q-item-section>
          </q-item>

          <!-- ABOUT US -->
          <q-item
            clickable
            v-ripple
            to="/admin/about-us"
            active-class="admin-menu-active"
            class="admin-menu-item"
          >
            <q-item-section avatar>
              <q-icon name="info_outline" />
            </q-item-section>

            <q-item-section> About Us </q-item-section>
          </q-item>

          <!-- =================================================
               LOGOUT
          ================================================== -->
          <q-item
            clickable
            v-ripple
            @click="confirmLogout"
            class="admin-menu-item logout-item"
          >
            <q-item-section avatar>
              <q-icon name="logout" color="negative" />
            </q-item-section>

            <q-item-section class="text-negative"> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- =====================================================
         PAGE CONTENT
    ====================================================== -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- =====================================================
         LOGOUT CONFIRMATION
    ====================================================== -->
    <q-dialog v-model="logoutDialog">
      <q-card class="logout-dialog">
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
            Are you sure you want to logout from BatohiDrive Admin Panel?
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
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import { Notify } from 'quasar'

// =========================================================
// ROUTER
// =========================================================

const router = useRouter()

// =========================================================
// LEFT DRAWER
// =========================================================

const leftDrawerOpen = ref(true)

// =========================================================
// LOGOUT DIALOG
// =========================================================

const logoutDialog = ref(false)

// =========================================================
// LOGOUT LOADING
// =========================================================

const loggingOut = ref(false)

// =========================================================
// TOGGLE DRAWER
// =========================================================

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
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
    // -----------------------------------------------------
    // REMOVE AUTHENTICATION DATA
    // -----------------------------------------------------

    localStorage.removeItem('token')

    localStorage.removeItem('user')

    localStorage.removeItem('role')

    localStorage.removeItem('auth')

    // -----------------------------------------------------
    // CLOSE DIALOG
    // -----------------------------------------------------

    logoutDialog.value = false

    // -----------------------------------------------------
    // NOTIFICATION
    // -----------------------------------------------------

    Notify.create({
      type: 'positive',

      message: 'Logged out successfully',

      position: 'top-right',

      timeout: 1500
    })

    // -----------------------------------------------------
    // REDIRECT TO LOGIN
    // -----------------------------------------------------

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
   MAIN LAYOUT
========================================================= */

.admin-layout {
  background: #f5f7fb;
}

/* =========================================================
   HEADER
========================================================= */

.admin-header {
  background: #ffffff;

  color: #222;
}

.admin-header .q-toolbar {
  min-height: 64px;
}

.admin-title {
  font-size: 13px;

  color: #777;

  margin-left: 8px;
}

.admin-name {
  font-size: 14px;

  font-weight: 600;
}

.admin-role {
  font-size: 11px;

  color: #888;
}

/* =========================================================
   SIDEBAR
========================================================= */

.admin-sidebar {
  background: #ffffff;
}

.admin-logo {
  height: 80px;

  display: flex;

  align-items: center;

  padding: 15px 20px;

  border-bottom: 1px solid #eeeeee;
}

.admin-logo img {
  width: 45px;

  height: 45px;

  object-fit: contain;
}

.logo-title {
  font-size: 20px;

  font-weight: 700;

  margin-left: 10px;
}

.logo-subtitle {
  font-size: 12px;

  color: #888;

  margin-left: 10px;
}

/* =========================================================
   SIDEBAR SCROLL
========================================================= */

.sidebar-scroll {
  height: calc(100vh - 140px);
}

/* =========================================================
   MENU SECTION
========================================================= */

.menu-section-title {
  font-size: 10px;

  font-weight: 700;

  color: #9ca3af;

  letter-spacing: 1px;

  padding: 14px 16px 7px;
}

/* =========================================================
   MENU ITEM
========================================================= */

.admin-menu-item {
  min-height: 44px;

  margin: 3px 8px;

  border-radius: 8px;

  color: #4b5563;

  transition: all 0.2s ease;
}

.admin-menu-item:hover {
  background: rgba(25, 118, 210, 0.06);

  color: #1976d2;
}

.admin-menu-item .q-icon {
  font-size: 21px;
}

/* =========================================================
   ACTIVE MENU
========================================================= */

.admin-menu-active {
  background: rgba(25, 118, 210, 0.1) !important;

  color: #1976d2 !important;

  font-weight: 600;
}

.admin-menu-active .q-icon {
  color: #1976d2;
}

/* =========================================================
   LOGOUT ITEM
========================================================= */

.logout-item {
  margin-top: 8px;
}

.logout-item:hover {
  background: rgba(244, 67, 54, 0.06);
}

.logout-item:hover .q-icon {
  color: #d32f2f;
}

/* =========================================================
   SIDEBAR FOOTER
========================================================= */

.sidebar-footer {
  position: absolute;

  left: 0;

  right: 0;

  bottom: 0;

  padding: 10px 20px;

  background: #ffffff;

  border-top: 1px solid #eeeeee;
}

.footer-title {
  font-size: 12px;

  font-weight: 600;

  color: #666;
}

.footer-version {
  font-size: 10px;

  color: #999;

  margin-top: 2px;
}

/* =========================================================
   LOGOUT DIALOG
========================================================= */

.logout-dialog {
  width: 400px;

  max-width: 90vw;
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {
  .admin-title {
    display: none;
  }

  .admin-logo {
    padding-left: 15px;
  }

  .logout-dialog {
    width: 95vw;
  }
}
</style>
