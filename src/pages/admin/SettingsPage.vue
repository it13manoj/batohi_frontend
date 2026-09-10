<template>
  <q-page class="settings-page q-pa-md">

    <!-- ================= HEADER ================= -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Settings
        </div>

        <div class="text-grey-7">
          Manage your BatohiDrive application settings
        </div>
      </div>

      <q-btn
        color="primary"
        icon="save"
        label="Save Changes"
        unelevated
        :loading="saving"
        @click="saveSettings"
      />

    </div>


    <!-- ================= SETTINGS LAYOUT ================= -->
    <div class="row q-col-gutter-lg">

      <!-- ================= LEFT MENU ================= -->
      <div class="col-12 col-md-3">

        <q-card class="settings-menu-card">

          <q-list
            padding
            separator
          >

            <!-- GENERAL -->
            <q-item
              clickable
              :active="activeTab === 'general'"
              active-class="settings-active"
              @click="activeTab = 'general'"
            >

              <q-item-section avatar>

                <q-icon name="settings" />

              </q-item-section>

              <q-item-section>

                <q-item-label>
                  General
                </q-item-label>

                <q-item-label caption>
                  Basic application settings
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- COMPANY -->
            <q-item
              clickable
              :active="activeTab === 'company'"
              active-class="settings-active"
              @click="activeTab = 'company'"
            >

              <q-item-section avatar>

                <q-icon name="business" />

              </q-item-section>

              <q-item-section>

                <q-item-label>
                  Company
                </q-item-label>

                <q-item-label caption>
                  Company information
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- BOOKING -->
            <q-item
              clickable
              :active="activeTab === 'booking'"
              active-class="settings-active"
              @click="activeTab = 'booking'"
            >

              <q-item-section avatar>

                <q-icon name="event_available" />

              </q-item-section>

              <q-item-section>

                <q-item-label>
                  Booking
                </q-item-label>

                <q-item-label caption>
                  Booking preferences
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- FARE -->
            <q-item
              clickable
              :active="activeTab === 'fare'"
              active-class="settings-active"
              @click="activeTab = 'fare'"
            >

              <q-item-section avatar>

                <q-icon name="currency_rupee" />

              </q-item-section>

              <q-item-section>

                <q-item-label>
                  Fare & Pricing
                </q-item-label>

                <q-item-label caption>
                  Pricing configuration
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- NOTIFICATIONS -->
            <q-item
              clickable
              :active="activeTab === 'notifications'"
              active-class="settings-active"
              @click="activeTab = 'notifications'"
            >

              <q-item-section avatar>

                <q-icon name="notifications" />

              </q-item-section>

              <q-item-section>

                <q-item-label>
                  Notifications
                </q-item-label>

                <q-item-label caption>
                  Notification preferences
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- PAYMENT -->
            <q-item
              clickable
              :active="activeTab === 'payment'"
              active-class="settings-active"
              @click="activeTab = 'payment'"
            >

              <q-item-section avatar>

                <q-icon name="payments" />

              </q-item-section>

              <q-item-section>

                <q-item-label>
                  Payments
                </q-item-label>

                <q-item-label caption>
                  Payment configuration
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- SECURITY -->
            <q-item
              clickable
              :active="activeTab === 'security'"
              active-class="settings-active"
              @click="activeTab = 'security'"
            >

              <q-item-section avatar>

                <q-icon name="security" />

              </q-item-section>

              <q-item-section>

                <q-item-label>
                  Security
                </q-item-label>

                <q-item-label caption>
                  Security preferences
                </q-item-label>

              </q-item-section>

            </q-item>

          </q-list>

        </q-card>

      </div>


      <!-- ================= RIGHT CONTENT ================= -->
      <div class="col-12 col-md-9">


        <!-- ================================================= -->
        <!-- GENERAL SETTINGS -->
        <!-- ================================================= -->

        <q-card
          v-if="activeTab === 'general'"
          class="settings-card"
        >

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              General Settings
            </div>

            <div class="text-caption text-grey-6">
              Configure basic application preferences
            </div>

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div class="row q-col-gutter-lg">

              <!-- APP NAME -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="settings.appName"
                  outlined
                  label="Application Name"
                />

              </div>


              <!-- APP EMAIL -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="settings.appEmail"
                  outlined
                  type="email"
                  label="Application Email"
                />

              </div>


              <!-- SUPPORT PHONE -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="settings.supportPhone"
                  outlined
                  label="Support Phone"
                />

              </div>


              <!-- TIMEZONE -->
              <div class="col-12 col-md-6">

                <q-select
                  v-model="settings.timezone"
                  outlined
                  label="Timezone"
                  :options="timezoneOptions"
                />

              </div>


              <!-- CURRENCY -->
              <div class="col-12 col-md-6">

                <q-select
                  v-model="settings.currency"
                  outlined
                  label="Currency"
                  :options="currencyOptions"
                  emit-value
                  map-options
                />

              </div>


              <!-- LANGUAGE -->
              <div class="col-12 col-md-6">

                <q-select
                  v-model="settings.language"
                  outlined
                  label="Default Language"
                  :options="languageOptions"
                  emit-value
                  map-options
                />

              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- ================================================= -->
        <!-- COMPANY SETTINGS -->
        <!-- ================================================= -->

        <q-card
          v-if="activeTab === 'company'"
          class="settings-card"
        >

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Company Information
            </div>

            <div class="text-caption text-grey-6">
              Manage company information displayed to customers
            </div>

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div class="row q-col-gutter-lg">

              <!-- LOGO -->
              <div class="col-12">

                <div class="text-subtitle2 q-mb-sm">
                  Company Logo
                </div>

                <div class="row items-center">

                  <q-avatar
                    size="90px"
                    color="primary"
                    text-color="white"
                    class="logo-preview"
                  >

                    <img
                      v-if="logoPreview"
                      :src="logoPreview"
                      alt="Company Logo"
                    />

                    <q-icon
                      v-else
                      name="business"
                      size="45px"
                    />

                  </q-avatar>


                  <div class="q-ml-md">

                    <q-btn
                      outline
                      color="primary"
                      icon="upload"
                      label="Upload Logo"
                      @click="triggerLogoUpload"
                    />

                    <input
                      ref="logoInput"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="handleLogoUpload"
                    />

                    <div class="text-caption text-grey-6 q-mt-xs">
                      PNG, JPG or WEBP. Maximum 2MB.
                    </div>

                  </div>

                </div>

              </div>


              <!-- COMPANY NAME -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="settings.companyName"
                  outlined
                  label="Company Name"
                />

              </div>


              <!-- GST -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="settings.gstNumber"
                  outlined
                  label="GST Number"
                />

              </div>


              <!-- EMAIL -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="settings.companyEmail"
                  outlined
                  type="email"
                  label="Company Email"
                />

              </div>


              <!-- PHONE -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="settings.companyPhone"
                  outlined
                  label="Company Phone"
                />

              </div>


              <!-- ADDRESS -->
              <div class="col-12">

                <q-input
                  v-model="settings.companyAddress"
                  outlined
                  type="textarea"
                  rows="3"
                  label="Company Address"
                />

              </div>


              <!-- WEBSITE -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="settings.website"
                  outlined
                  label="Website"
                />

              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- ================================================= -->
        <!-- BOOKING SETTINGS -->
        <!-- ================================================= -->

        <q-card
          v-if="activeTab === 'booking'"
          class="settings-card"
        >

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Booking Settings
            </div>

            <div class="text-caption text-grey-6">
              Configure booking rules and availability
            </div>

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div class="settings-section">

              <div class="text-subtitle1 text-weight-bold q-mb-md">
                Booking Preferences
              </div>


              <div class="row q-col-gutter-lg">

                <!-- ADVANCE BOOKING -->
                <div class="col-12 col-md-6">

                  <q-input
                    v-model.number="settings.advanceBookingDays"
                    outlined
                    type="number"
                    label="Advance Booking Days"
                    hint="Maximum days customer can book in advance"
                  />

                </div>


                <!-- MIN BOOKING -->
                <div class="col-12 col-md-6">

                  <q-input
                    v-model.number="settings.minimumBookingMinutes"
                    outlined
                    type="number"
                    label="Minimum Booking Time"
                    suffix="minutes"
                  />

                </div>


                <!-- CANCELLATION -->
                <div class="col-12 col-md-6">

                  <q-input
                    v-model.number="settings.cancellationMinutes"
                    outlined
                    type="number"
                    label="Free Cancellation Time"
                    suffix="minutes"
                  />

                </div>


                <!-- AUTO ASSIGN -->
                <div class="col-12">

                  <q-toggle
                    v-model="settings.autoAssignDriver"
                    label="Automatically assign nearest available driver"
                    color="primary"
                  />

                </div>


                <!-- CASH -->
                <div class="col-12">

                  <q-toggle
                    v-model="settings.allowCashPayment"
                    label="Allow cash payment"
                    color="primary"
                  />

                </div>


                <!-- SCHEDULE -->
                <div class="col-12">

                  <q-toggle
                    v-model="settings.allowScheduledBooking"
                    label="Allow scheduled bookings"
                    color="primary"
                  />

                </div>

              </div>

            </div>


            <q-separator class="q-my-lg" />


            <!-- BOOKING STATUS -->
            <div>

              <div class="text-subtitle1 text-weight-bold q-mb-md">
                Booking Status
              </div>

              <div class="row q-col-gutter-md">

                <div class="col-12 col-md-6">

                  <q-toggle
                    v-model="settings.bookingEnabled"
                    label="Accept new bookings"
                    color="positive"
                  />

                </div>

                <div class="col-12 col-md-6">

                  <q-toggle
                    v-model="settings.maintenanceMode"
                    label="Maintenance mode"
                    color="negative"
                  />

                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- ================================================= -->
        <!-- FARE SETTINGS -->
        <!-- ================================================= -->

        <q-card
          v-if="activeTab === 'fare'"
          class="settings-card"
        >

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Fare & Pricing
            </div>

            <div class="text-caption text-grey-6">
              Configure base fare and additional charges
            </div>

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div class="row q-col-gutter-lg">

              <!-- BASE FARE -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model.number="settings.baseFare"
                  outlined
                  type="number"
                  prefix="₹"
                  label="Base Fare"
                />

              </div>


              <!-- PER KM -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model.number="settings.perKmRate"
                  outlined
                  type="number"
                  prefix="₹"
                  label="Per Kilometer Rate"
                />

              </div>


              <!-- PER MINUTE -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model.number="settings.perMinuteRate"
                  outlined
                  type="number"
                  prefix="₹"
                  label="Per Minute Rate"
                />

              </div>


              <!-- DRIVER COMMISSION -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model.number="settings.driverCommission"
                  outlined
                  type="number"
                  suffix="%"
                  label="Driver Commission"
                />

              </div>


              <!-- PLATFORM FEE -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model.number="settings.platformFee"
                  outlined
                  type="number"
                  prefix="₹"
                  label="Platform Fee"
                />

              </div>


              <!-- GST -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model.number="settings.gstRate"
                  outlined
                  type="number"
                  suffix="%"
                  label="GST Rate"
                />

              </div>


              <!-- SURGE -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model.number="settings.surgeMultiplier"
                  outlined
                  type="number"
                  step="0.1"
                  label="Surge Multiplier"
                />

              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- ================================================= -->
        <!-- NOTIFICATION SETTINGS -->
        <!-- ================================================= -->

        <q-card
          v-if="activeTab === 'notifications'"
          class="settings-card"
        >

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Notification Settings
            </div>

            <div class="text-caption text-grey-6">
              Control customer and driver notifications
            </div>

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div class="notification-setting">

              <div>

                <div class="text-weight-bold">
                  Email Notifications
                </div>

                <div class="text-caption text-grey-6">
                  Send booking updates through email
                </div>

              </div>

              <q-toggle
                v-model="settings.emailNotifications"
                color="primary"
              />

            </div>


            <q-separator class="q-my-md" />


            <div class="notification-setting">

              <div>

                <div class="text-weight-bold">
                  SMS Notifications
                </div>

                <div class="text-caption text-grey-6">
                  Send booking updates through SMS
                </div>

              </div>

              <q-toggle
                v-model="settings.smsNotifications"
                color="primary"
              />

            </div>


            <q-separator class="q-my-md" />


            <div class="notification-setting">

              <div>

                <div class="text-weight-bold">
                  Push Notifications
                </div>

                <div class="text-caption text-grey-6">
                  Send push notifications to mobile applications
                </div>

              </div>

              <q-toggle
                v-model="settings.pushNotifications"
                color="primary"
              />

            </div>


            <q-separator class="q-my-md" />


            <div class="notification-setting">

              <div>

                <div class="text-weight-bold">
                  Booking Confirmation
                </div>

                <div class="text-caption text-grey-6">
                  Notify customer after successful booking
                </div>

              </div>

              <q-toggle
                v-model="settings.bookingConfirmationNotification"
                color="primary"
              />

            </div>


            <q-separator class="q-my-md" />


            <div class="notification-setting">

              <div>

                <div class="text-weight-bold">
                  Driver Assignment
                </div>

                <div class="text-caption text-grey-6">
                  Notify driver when a booking is assigned
                </div>

              </div>

              <q-toggle
                v-model="settings.driverAssignmentNotification"
                color="primary"
              />

            </div>


            <q-separator class="q-my-md" />


            <div class="notification-setting">

              <div>

                <div class="text-weight-bold">
                  Payment Notification
                </div>

                <div class="text-caption text-grey-6">
                  Notify customers about payment updates
                </div>

              </div>

              <q-toggle
                v-model="settings.paymentNotification"
                color="primary"
              />

            </div>

          </q-card-section>

        </q-card>


        <!-- ================================================= -->
        <!-- PAYMENT SETTINGS -->
        <!-- ================================================= -->

        <q-card
          v-if="activeTab === 'payment'"
          class="settings-card"
        >

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Payment Settings
            </div>

            <div class="text-caption text-grey-6">
              Configure payment methods
            </div>

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div class="row q-col-gutter-lg">

              <!-- PAYMENT GATEWAY -->
              <div class="col-12 col-md-6">

                <q-select
                  v-model="settings.paymentGateway"
                  outlined
                  label="Payment Gateway"
                  :options="paymentGatewayOptions"
                />

              </div>


              <!-- CURRENCY -->
              <div class="col-12 col-md-6">

                <q-select
                  v-model="settings.paymentCurrency"
                  outlined
                  label="Payment Currency"
                  :options="currencyOptions"
                  emit-value
                  map-options
                />

              </div>


              <!-- RAZORPAY KEY -->
              <div class="col-12">

                <q-input
                  v-model="settings.gatewayKey"
                  outlined
                  label="Gateway API Key"
                  type="password"
                  autocomplete="off"
                />

              </div>


              <!-- ONLINE PAYMENT -->
              <div class="col-12">

                <q-toggle
                  v-model="settings.onlinePaymentEnabled"
                  label="Enable online payments"
                  color="positive"
                />

              </div>


              <!-- CASH -->
              <div class="col-12">

                <q-toggle
                  v-model="settings.allowCashPayment"
                  label="Allow cash payment"
                  color="primary"
                />

              </div>


              <!-- UPI -->
              <div class="col-12">

                <q-toggle
                  v-model="settings.upiEnabled"
                  label="Enable UPI payments"
                  color="primary"
                />

              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- ================================================= -->
        <!-- SECURITY SETTINGS -->
        <!-- ================================================= -->

        <q-card
          v-if="activeTab === 'security'"
          class="settings-card"
        >

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Security Settings
            </div>

            <div class="text-caption text-grey-6">
              Manage account and application security
            </div>

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div class="notification-setting">

              <div>

                <div class="text-weight-bold">
                  Two-Factor Authentication
                </div>

                <div class="text-caption text-grey-6">
                  Require OTP verification during admin login
                </div>

              </div>

              <q-toggle
                v-model="settings.twoFactorAuth"
                color="positive"
              />

            </div>


            <q-separator class="q-my-md" />


            <div class="notification-setting">

              <div>

                <div class="text-weight-bold">
                  Login Notifications
                </div>

                <div class="text-caption text-grey-6">
                  Notify admin when a new login occurs
                </div>

              </div>

              <q-toggle
                v-model="settings.loginNotifications"
                color="primary"
              />

            </div>


            <q-separator class="q-my-md" />


            <div class="notification-setting">

              <div>

                <div class="text-weight-bold">
                  Session Timeout
                </div>

                <div class="text-caption text-grey-6">
                  Automatically logout inactive administrators
                </div>

              </div>

              <q-toggle
                v-model="settings.sessionTimeoutEnabled"
                color="primary"
              />

            </div>


            <div
              v-if="settings.sessionTimeoutEnabled"
              class="q-mt-md"
            >

              <q-input
                v-model.number="settings.sessionTimeoutMinutes"
                outlined
                type="number"
                label="Session Timeout"
                suffix="minutes"
              />

            </div>


            <q-separator class="q-my-lg" />


            <div>

              <div class="text-subtitle1 text-weight-bold q-mb-md">
                Change Admin Password
              </div>


              <div class="row q-col-gutter-md">

                <div class="col-12">

                  <q-input
                    v-model="password.current"
                    outlined
                    :type="
                      showCurrentPassword
                        ? 'text'
                        : 'password'
                    "
                    label="Current Password"
                    autocomplete="current-password"
                  >

                    <template #append>

                      <q-icon
                        :name="
                          showCurrentPassword
                            ? 'visibility_off'
                            : 'visibility'
                        "
                        class="cursor-pointer"
                        @click="
                          showCurrentPassword =
                            !showCurrentPassword
                        "
                      />

                    </template>

                  </q-input>

                </div>


                <div class="col-12 col-md-6">

                  <q-input
                    v-model="password.newPassword"
                    outlined
                    :type="
                      showNewPassword
                        ? 'text'
                        : 'password'
                    "
                    label="New Password"
                    autocomplete="new-password"
                  >

                    <template #append>

                      <q-icon
                        :name="
                          showNewPassword
                            ? 'visibility_off'
                            : 'visibility'
                        "
                        class="cursor-pointer"
                        @click="
                          showNewPassword =
                            !showNewPassword
                        "
                      />

                    </template>

                  </q-input>

                </div>


                <div class="col-12 col-md-6">

                  <q-input
                    v-model="password.confirmPassword"
                    outlined
                    :type="
                      showConfirmPassword
                        ? 'text'
                        : 'password'
                    "
                    label="Confirm Password"
                    autocomplete="new-password"
                  >

                    <template #append>

                      <q-icon
                        :name="
                          showConfirmPassword
                            ? 'visibility_off'
                            : 'visibility'
                        "
                        class="cursor-pointer"
                        @click="
                          showConfirmPassword =
                            !showConfirmPassword
                        "
                      />

                    </template>

                  </q-input>

                </div>

              </div>


              <q-btn
                class="q-mt-md"
                outline
                color="primary"
                label="Change Password"
                icon="lock"
                :loading="changingPassword"
                @click="changePassword"
              />

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>

  </q-page>
</template>


<script setup>

import {
  ref,
  reactive,
  onMounted
} from 'vue'

import {
  useQuasar
} from 'quasar'

import axios from 'axios'


const $q = useQuasar()


// =====================================================
// STATE
// =====================================================

const activeTab = ref('general')

const saving = ref(false)

const changingPassword = ref(false)

const logoInput = ref(null)

const logoPreview = ref('')


// =====================================================
// PASSWORD VISIBILITY
// =====================================================

const showCurrentPassword = ref(false)

const showNewPassword = ref(false)

const showConfirmPassword = ref(false)


// =====================================================
// PASSWORD
// =====================================================

const password = reactive({

  current: '',

  newPassword: '',

  confirmPassword: ''

})


// =====================================================
// SETTINGS
// =====================================================

const settings = reactive({

  // GENERAL

  appName: 'BatohiDrive',

  appEmail: 'support@batohidrive.com',

  supportPhone: '+91 9876543210',

  timezone: 'Asia/Kolkata',

  currency: 'INR',

  language: 'en',


  // COMPANY

  companyName: 'BatohiDrive',

  gstNumber: '',

  companyEmail: 'support@batohidrive.com',

  companyPhone: '+91 9876543210',

  companyAddress: '',

  website: '',


  // BOOKING

  advanceBookingDays: 30,

  minimumBookingMinutes: 30,

  cancellationMinutes: 15,

  autoAssignDriver: true,

  allowCashPayment: true,

  allowScheduledBooking: true,

  bookingEnabled: true,

  maintenanceMode: false,


  // FARE

  baseFare: 50,

  perKmRate: 15,

  perMinuteRate: 2,

  driverCommission: 80,

  platformFee: 20,

  gstRate: 5,

  surgeMultiplier: 1.0,


  // NOTIFICATIONS

  emailNotifications: true,

  smsNotifications: true,

  pushNotifications: true,

  bookingConfirmationNotification: true,

  driverAssignmentNotification: true,

  paymentNotification: true,


  // PAYMENT

  paymentGateway: 'Razorpay',

  paymentCurrency: 'INR',

  gatewayKey: '',

  onlinePaymentEnabled: true,

  upiEnabled: true,


  // SECURITY

  twoFactorAuth: false,

  loginNotifications: true,

  sessionTimeoutEnabled: true,

  sessionTimeoutMinutes: 30

})


// =====================================================
// OPTIONS
// =====================================================

const timezoneOptions = [

  'Asia/Kolkata',

  'Asia/Dubai',

  'Asia/Singapore',

  'UTC'

]


const currencyOptions = [

  {
    label: 'Indian Rupee (₹)',
    value: 'INR'
  },

  {
    label: 'US Dollar ($)',
    value: 'USD'
  },

  {
    label: 'Euro (€)',
    value: 'EUR'
  }

]


const languageOptions = [

  {
    label: 'English',
    value: 'en'
  },

  {
    label: 'Hindi',
    value: 'hi'
  }

]


const paymentGatewayOptions = [

  'Razorpay',

  'Stripe',

  'PayU',

  'Cashfree'

]


// =====================================================
// LOGO UPLOAD
// =====================================================

function triggerLogoUpload() {

  logoInput.value?.click()

}


function handleLogoUpload(event) {

  const file =
    event.target.files?.[0]


  if (!file) {
    return
  }


  // Maximum 2MB

  if (
    file.size >
    2 * 1024 * 1024
  ) {

    $q.notify({

      type: 'negative',

      message:
        'Logo size must be less than 2MB'

    })

    return

  }


  logoPreview.value =
    URL.createObjectURL(file)

}


// =====================================================
// LOAD SETTINGS
// =====================================================

async function loadSettings() {

  try {

    /*
     * =================================================
     * BACKEND API
     * =================================================
     *
     * const response = await axios.get(
     *   '/admin/settings'
     * )
     *
     * Object.assign(
     *   settings,
     *   response.data.data
     * )
     */


  } catch (error) {

    console.error(
      'Load Settings Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        'Unable to load settings'

    })

  }

}


// =====================================================
// SAVE SETTINGS
// =====================================================

async function saveSettings() {

  saving.value = true


  try {

    /*
     * =================================================
     * BACKEND API
     * =================================================
     *
     * const response = await axios.put(
     *   '/admin/settings',
     *   settings
     * )
     */


    $q.notify({

      type: 'positive',

      message:
        'Settings saved successfully'

    })

  } catch (error) {

    console.error(
      'Save Settings Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        'Unable to save settings'

    })

  } finally {

    saving.value = false

  }

}


// =====================================================
// CHANGE PASSWORD
// =====================================================

async function changePassword() {

  if (
    !password.current ||
    !password.newPassword ||
    !password.confirmPassword
  ) {

    $q.notify({

      type: 'negative',

      message:
        'Please fill all password fields'

    })

    return

  }


  if (
    password.newPassword.length < 8
  ) {

    $q.notify({

      type: 'negative',

      message:
        'New password must contain at least 8 characters'

    })

    return

  }


  if (
    password.newPassword !==
    password.confirmPassword
  ) {

    $q.notify({

      type: 'negative',

      message:
        'New password and confirmation password do not match'

    })

    return

  }


  changingPassword.value = true


  try {

    /*
     * =================================================
     * BACKEND API
     * =================================================
     *
     * await axios.post(
     *   '/admin/change-password',
     *   {
     *     currentPassword:
     *       password.current,
     *
     *     newPassword:
     *       password.newPassword
     *   }
     * )
     */


    password.current = ''

    password.newPassword = ''

    password.confirmPassword = ''


    $q.notify({

      type: 'positive',

      message:
        'Password changed successfully'

    })

  } catch (error) {

    console.error(
      'Change Password Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        'Unable to change password'

    })

  } finally {

    changingPassword.value = false

  }

}


// =====================================================
// MOUNT
// =====================================================

onMounted(() => {

  loadSettings()

})

</script>


<style scoped>

.settings-page {
  background: #f5f7fb;
  min-height: 100%;
}


/* ===============================
   SETTINGS MENU
================================ */

.settings-menu-card {

  border-radius: 12px;

  border: 1px solid #e8eaf0;

  overflow: hidden;

  position: sticky;

  top: 20px;

}


/* ===============================
   ACTIVE MENU
================================ */

.settings-active {

  color: #1976d2;

  background: #eaf3ff;

  border-right: 3px solid #1976d2;

}


.settings-active .q-icon {

  color: #1976d2;

}


/* ===============================
   SETTINGS CARD
================================ */

.settings-card {

  border-radius: 12px;

  border: 1px solid #e8eaf0;

  box-shadow:
    0 2px 10px rgba(
      0,
      0,
      0,
      0.04
    );

}


/* ===============================
   LOGO
================================ */

.logo-preview {

  border: 1px solid #e0e3e8;

  background: #f8f9fb;

}


.logo-preview img {

  width: 100%;

  height: 100%;

  object-fit: contain;

}


/* ===============================
   NOTIFICATION SETTING
================================ */

.notification-setting {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

}


/* ===============================
   MOBILE
================================ */

@media (max-width: 768px) {

  .settings-page {

    padding: 12px !important;

  }


  .settings-menu-card {

    position: static;

  }


  .notification-setting {

    align-items: flex-start;

  }

}

</style>
