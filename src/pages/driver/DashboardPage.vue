<template>
  <q-page class="driver-dashboard q-pa-md">

    <!-- =========================================================
         PAGE HEADER
    ========================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Driver Dashboard
        </div>

        <div class="text-grey-7 q-mt-xs">
          Welcome back, {{ driver.name || 'Driver' }}
        </div>
      </div>

      <div class="row items-center q-gutter-sm">

        <!-- REFRESH -->
        <q-btn
          flat
          round
          color="primary"
          icon="refresh"
          :loading="loading"
          @click="loadDashboard"
        >
          <q-tooltip>
            Refresh Dashboard
          </q-tooltip>
        </q-btn>

        <!-- NOTIFICATIONS -->
        <q-btn
          flat
          round
          color="primary"
          icon="notifications"
          @click="openNotifications"
        >
          <q-badge
            v-if="notificationCount > 0"
            color="negative"
            floating
          >
            {{ notificationCount }}
          </q-badge>

          <q-tooltip>
            Notifications
          </q-tooltip>
        </q-btn>

      </div>

    </div>


    <!-- =========================================================
         DRIVER STATUS + PROFILE
    ========================================================== -->
    <q-card
      flat
      bordered
      class="profile-status-card q-mb-lg"
    >

      <q-card-section>

        <div class="row items-center justify-between">

          <!-- DRIVER -->
          <div class="row items-center">

            <q-avatar
              size="72px"
              color="primary"
              text-color="white"
              class="driver-avatar"
            >

              <img
                v-if="driver.image"
                :src="driver.image"
                alt="Driver"
              />

              <span v-else>
                {{ getInitials(driver.name) }}
              </span>

            </q-avatar>


            <div class="q-ml-md">

              <div class="text-h6 text-weight-bold">
                {{ driver.name || 'Driver' }}
              </div>

              <div class="text-grey-7">
                {{ driver.mobile || '-' }}
              </div>

              <div class="row items-center q-mt-xs">

                <q-icon
                  name="directions_car"
                  color="primary"
                  size="18px"
                />

                <span class="q-ml-xs text-caption">
                  {{ driver.vehicleName || 'Vehicle not assigned' }}
                </span>

                <span
                  v-if="driver.vehicleRegistration"
                  class="text-caption text-grey-6 q-ml-sm"
                >
                  • {{ driver.vehicleRegistration }}
                </span>

              </div>

            </div>

          </div>


          <!-- ONLINE STATUS -->
          <div class="driver-online-box">

            <div class="text-caption text-grey-7 text-right">
              Driver Status
            </div>

            <div class="row items-center q-mt-xs">

              <q-chip
                dense
                :color="driver.isOnline ? 'positive' : 'grey-7'"
                text-color="white"
                class="q-mr-sm"
              >

                <q-icon
                  :name="
                    driver.isOnline
                      ? 'wifi'
                      : 'wifi_off'
                  "
                  size="15px"
                  class="q-mr-xs"
                />

                {{ driver.isOnline ? 'Online' : 'Offline' }}

              </q-chip>


              <q-toggle
                v-model="driver.isOnline"
                color="positive"
                :disable="statusUpdating"
                @update:model-value="changeDriverStatus"
              />

            </div>

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =========================================================
         LICENSE WARNING
    ========================================================== -->
    <q-banner
      v-if="licenseWarning"
      rounded
      class="license-warning q-mb-lg"
    >

      <template #avatar>
        <q-icon
          name="warning"
          color="orange"
          size="28px"
        />
      </template>

      <div class="text-weight-medium">
        Driving License Expiry Warning
      </div>

      <div class="text-caption q-mt-xs">
        Your driving license expires on
        <strong>{{ formatDate(driver.licenseExpiry) }}</strong>.
        Please renew it before expiry.
      </div>

    </q-banner>


    <!-- =========================================================
         SUMMARY CARDS
    ========================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- TODAY'S TRIPS -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="summary-card"
        >

          <q-card-section>

            <div class="row items-center justify-between">

              <q-avatar
                color="blue-1"
                text-color="primary"
                icon="route"
              />

              <q-icon
                name="today"
                color="grey-5"
              />

            </div>

            <div class="text-caption text-grey-7 q-mt-md">
              Today's Trips
            </div>

            <div class="text-h5 text-weight-bold q-mt-xs">
              {{ stats.todayTrips }}
            </div>

            <div class="text-caption text-grey-6">
              Trips assigned today
            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- COMPLETED -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="summary-card"
        >

          <q-card-section>

            <div class="row items-center justify-between">

              <q-avatar
                color="green-1"
                text-color="positive"
                icon="check_circle"
              />

              <q-icon
                name="done_all"
                color="grey-5"
              />

            </div>

            <div class="text-caption text-grey-7 q-mt-md">
              Completed Trips
            </div>

            <div class="text-h5 text-weight-bold q-mt-xs">
              {{ stats.completedTrips }}
            </div>

            <div class="text-caption text-positive">
              Successfully completed
            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- TODAY EARNINGS -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="summary-card"
        >

          <q-card-section>

            <div class="row items-center justify-between">

              <q-avatar
                color="orange-1"
                text-color="orange"
                icon="payments"
              />

              <q-icon
                name="currency_rupee"
                color="grey-5"
              />

            </div>

            <div class="text-caption text-grey-7 q-mt-md">
              Today's Earnings
            </div>

            <div class="text-h5 text-weight-bold q-mt-xs">
              {{ formatCurrency(stats.todayEarnings) }}
            </div>

            <div class="text-caption text-grey-6">
              Today's income
            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- TOTAL EARNINGS -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="summary-card"
        >

          <q-card-section>

            <div class="row items-center justify-between">

              <q-avatar
                color="purple-1"
                text-color="purple"
                icon="account_balance_wallet"
              />

              <q-icon
                name="trending_up"
                color="positive"
              />

            </div>

            <div class="text-caption text-grey-7 q-mt-md">
              Total Earnings
            </div>

            <div class="text-h5 text-weight-bold q-mt-xs">
              {{ formatCurrency(stats.totalEarnings) }}
            </div>

            <div class="text-caption text-grey-6">
              Lifetime earnings
            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =========================================================
         MAIN CONTENT
    ========================================================== -->
    <div class="row q-col-gutter-lg">

      <!-- =======================================================
           LEFT SIDE
      ======================================================== -->
      <div class="col-12 col-lg-8">


        <!-- =====================================================
             CURRENT TRIP
        ====================================================== -->
        <q-card
          v-if="currentTrip"
          flat
          bordered
          class="dashboard-card q-mb-lg"
        >

          <q-card-section>

            <div class="row items-center justify-between">

              <div>

                <div class="text-h6 text-weight-bold">
                  Current Trip
                </div>

                <div class="text-caption text-grey-7">
                  Active booking
                </div>

              </div>

              <q-chip
                color="orange"
                text-color="white"
                dense
              >
                <q-icon
                  name="directions_car"
                  size="15px"
                  class="q-mr-xs"
                />

                In Progress
              </q-chip>

            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div class="row q-col-gutter-lg">

              <!-- BOOKING -->
              <div class="col-12 col-sm-6">

                <div class="trip-info-label">
                  Booking ID
                </div>

                <div class="trip-info-value">
                  #{{ currentTrip.bookingId || currentTrip.id }}
                </div>

              </div>


              <!-- CUSTOMER -->
              <div class="col-12 col-sm-6">

                <div class="trip-info-label">
                  Customer
                </div>

                <div class="trip-info-value">
                  {{ currentTrip.customerName || '-' }}
                </div>

              </div>


              <!-- PICKUP -->
              <div class="col-12 col-sm-6">

                <div class="trip-info-label">
                  Pickup Location
                </div>

                <div class="row items-start no-wrap q-mt-xs">

                  <q-icon
                    name="radio_button_checked"
                    color="positive"
                    size="18px"
                  />

                  <div class="q-ml-sm trip-location">
                    {{ currentTrip.pickupLocation || '-' }}
                  </div>

                </div>

              </div>


              <!-- DROP -->
              <div class="col-12 col-sm-6">

                <div class="trip-info-label">
                  Drop Location
                </div>

                <div class="row items-start no-wrap q-mt-xs">

                  <q-icon
                    name="location_on"
                    color="negative"
                    size="18px"
                  />

                  <div class="q-ml-sm trip-location">
                    {{ currentTrip.dropLocation || '-' }}
                  </div>

                </div>

              </div>


              <!-- DATE -->
              <div class="col-12 col-sm-6">

                <div class="trip-info-label">
                  Trip Date
                </div>

                <div class="trip-info-value">
                  {{ formatDate(currentTrip.tripDate) }}
                </div>

              </div>


              <!-- TIME -->
              <div class="col-12 col-sm-6">

                <div class="trip-info-label">
                  Pickup Time
                </div>

                <div class="trip-info-value">
                  {{ currentTrip.pickupTime || '-' }}
                </div>

              </div>

            </div>

          </q-card-section>


          <q-card-actions align="right">

            <q-btn
              flat
              color="primary"
              label="View Trip"
              icon="visibility"
              @click="viewTrip(currentTrip)"
            />

            <q-btn
              color="primary"
              unelevated
              label="Open Trip"
              icon="arrow_forward"
              @click="viewTrip(currentTrip)"
            />

          </q-card-actions>

        </q-card>


        <!-- =====================================================
             UPCOMING TRIP
        ====================================================== -->

     <q-card class="q-mb-md rounded-borders shadow-1">
    <!-- Header -->
    <q-card-section class="bg-primary text-white">
      <div class="row items-center justify-between">
        <div>
          <div class="text-h6 text-weight-bold">Ride Requests</div>
          <div class="text-caption">
            {{ upcomingTrips.length }} request(s) waiting for response
          </div>
        </div>
        <q-btn
          flat
          dense
          color="white"
          label="View All"
          @click="goToAssignedTrips"
        />
      </div>
    </q-card-section>

    <!-- Loading State -->
    <q-card-section v-if="loading" class="text-center q-pa-md">
      <q-spinner color="primary" size="2em" />
      <div class="text-caption text-grey-6 q-mt-sm">Loading requests...</div>
    </q-card-section>

    <!-- Empty State -->
    <q-card-section v-else-if="upcomingTrips.length === 0" class="text-center q-pa-md">
      <q-icon name="event_busy" size="3em" color="grey-5" />
      <div class="text-subtitle2 text-grey-7 q-mt-sm">No pending ride requests</div>
    </q-card-section>

    <!-- Dynamic Trip List -->
    <q-list v-else separator class="q-pa-none">
      <q-item
        v-for="trip in upcomingTrips"
        :key="trip.id"
        class="q-pa-md flex-column"
      >
        <!-- Rider Header -->
        <div class="row items-center justify-between full-width q-mb-sm">
          <div class="row items-center q-gutter-x-sm">
            <q-avatar color="primary" text-color="white" icon="person" size="36px" />
            <div>
              <div class="text-subtitle2 text-weight-bold">
                {{ trip.rider?.username || 'Rider' }}
              </div>
              <div class="text-caption text-grey-7">
                <q-icon name="phone" size="12px" class="q-mr-xs" />
                {{ trip.rider?.mobile_no || 'N/A' }}
              </div>
            </div>
          </div>

          <q-chip
            :color="trip.status?.toLowerCase() === 'accepted' ? 'positive' : 'warning'"
            :text-color="trip.status?.toLowerCase() === 'accepted' ? 'white' : 'dark'"
            size="xs"
            class="text-weight-bold text-uppercase"
          >
            {{ trip.status }}
          </q-chip>
        </div>

        <!-- Route Information -->
        <div class="q-gutter-y-xs full-width q-mb-sm">
          <div class="row items-start no-wrap">
            <q-icon name="my_location" color="positive" size="18px" class="q-mr-xs q-mt-xs" />
            <div class="text-body2 text-grey-9 ellipsis-2-lines">
              <span class="text-weight-bold">Pickup:</span> {{ trip.from }}
            </div>
          </div>

          <div class="row items-start no-wrap">
            <q-icon name="place" color="negative" size="18px" class="q-mr-xs q-mt-xs" />
            <div class="text-body2 text-grey-9 ellipsis-2-lines">
              <span class="text-weight-bold">Drop:</span> {{ trip.to }}
            </div>
          </div>
        </div>

        <!-- Trip Specs & Actions -->
        <div class="row items-center justify-between full-width bg-grey-2 q-pa-xs rounded-borders">
          <div>
            <span class="text-caption text-grey-7">Fare: </span>
            <span class="text-subtitle2 text-weight-bolder text-primary">₹{{ trip.fare }}</span>
            <span class="text-caption text-grey-6 q-ml-sm">({{ trip.distance }})</span>
          </div>

          <!-- Dynamic Action Buttons Based on Ride Status -->
          <div class="row q-gutter-x-xs">
            <!-- Initial State: Show Reject & Accept -->
            <template v-if="trip.status?.toLowerCase() !== 'accepted'">
              <q-btn
                dense
                flat
                color="negative"
                icon="close"
                label="Reject"
                size="sm"
                @click="rejectRide(trip.id)"
              />
              <q-btn
                dense
                unelevated
                color="positive"
                icon="check"
                label="Accept"
                size="sm"
                :loading="acceptingId === trip.id"
                @click="acceptRide(trip)"
              />
            </template>

            <!-- Accepted State: Show Start Ride Button -->
            <template v-else>
              <q-btn
                dense
                unelevated
                color="primary"
                icon="play_arrow"
                label="Start Ride"
                size="sm"
                @click="openOtpModal(trip)"
              />
            </template>
          </div>
        </div>
      </q-item>
    </q-list>
  </q-card>

  <!-- OTP Verification Modal -->
  <q-dialog v-model="showOtpModal" persistent>
    <q-card style="min-width: 320px; max-width: 400px;" class="rounded-borders q-pa-sm">
      <q-card-section class="row items-center justify-between q-pb-none">
        <div class="text-h6 text-weight-bold">Enter Start OTP</div>
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <p class="text-body2 text-grey-8">
          Ask the rider for the start-ride OTP to confirm and begin the trip.
        </p>

        <q-input
          v-model="otpInput"
          outlined
          dense
          mask="######"
          label="Enter OTP"
          placeholder="e.g. 1234"
          maxlength="6"
          class="q-mt-sm"
          autofocus
          @keydown.enter="verifyOtpAndStart"
        >
          <template v-slot:prepend>
            <q-icon name="lock" color="primary" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right" class="q-px-md q-pb-md">
        <q-btn flat label="Cancel" color="grey-7" v-close-popup />
        <q-btn
          unelevated
          label="Verify & Start"
          color="positive"
          :loading="isVerifying"
          :disable="!otpInput || otpInput.length < 4"
          @click="verifyOtpAndStart"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
        <!-- =====================================================
             RECENT TRIPS
        ====================================================== -->
        <q-card
          flat
          bordered
          class="dashboard-card"
        >

          <q-card-section>

            <div class="row items-center justify-between">

              <div>

                <div class="text-h6 text-weight-bold">
                  Recent Trips
                </div>

                <div class="text-caption text-grey-7">
                  Your latest completed trips
                </div>

              </div>

              <q-btn
                flat
                dense
                color="primary"
                label="Trip History"
                @click="goToTripHistory"
              />

            </div>

          </q-card-section>


          <q-separator />


          <q-card-section class="q-pa-none">

            <q-list
              v-if="recentTrips.length"
              separator
            >

              <q-item
                v-for="trip in recentTrips"
                :key="trip.id"
                clickable
                @click="viewTrip(trip)"
              >

                <q-item-section avatar>

                  <q-avatar
                    color="green-1"
                    text-color="positive"
                    icon="check_circle"
                  />

                </q-item-section>


                <q-item-section>

                  <q-item-label class="text-weight-medium">
                    Booking #{{ trip.bookingId || trip.id }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ trip.pickupLocation || '-' }}
                    →
                    {{ trip.dropLocation || '-' }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ formatDate(trip.tripDate) }}
                  </q-item-label>

                </q-item-section>


                <q-item-section side>

                  <div class="text-weight-bold">
                    {{ formatCurrency(trip.earning) }}
                  </div>

                  <q-chip
                    dense
                    size="sm"
                    color="positive"
                    text-color="white"
                  >
                    Completed
                  </q-chip>

                </q-item-section>

              </q-item>

            </q-list>


            <div
              v-else
              class="empty-state"
            >

              <q-icon
                name="history"
                size="45px"
                color="grey-5"
              />

              <div class="text-grey-7 q-mt-sm">
                No recent trips found
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- =======================================================
           RIGHT SIDE
      ======================================================== -->
      <div class="col-12 col-lg-4">


        <!-- =====================================================
             QUICK ACTIONS
        ====================================================== -->
        <q-card
          flat
          bordered
          class="dashboard-card q-mb-lg"
        >

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Quick Actions
            </div>

            <div class="text-caption text-grey-7">
              Quickly access driver features
            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div class="quick-actions">

              <q-btn
                outline
                color="primary"
                icon="route"
                label="Assigned Trips"
                class="quick-action-btn"
                @click="goToAssignedTrips"
              />

              <q-btn
                outline
                color="positive"
                icon="account_balance_wallet"
                label="My Earnings"
                class="quick-action-btn"
                @click="goToEarnings"
              />

              <q-btn
                outline
                color="orange"
                icon="history"
                label="Trip History"
                class="quick-action-btn"
                @click="goToTripHistory"
              />

              <q-btn
                outline
                color="purple"
                icon="person"
                label="My Profile"
                class="quick-action-btn"
                @click="goToProfile"
              />

            </div>

          </q-card-section>

        </q-card>


        <!-- =====================================================
             EARNINGS SUMMARY
        ====================================================== -->
        <q-card
          flat
          bordered
          class="dashboard-card q-mb-lg"
        >

          <q-card-section>

            <div class="row items-center justify-between">

              <div>

                <div class="text-h6 text-weight-bold">
                  Earnings
                </div>

                <div class="text-caption text-grey-7">
                  This month's summary
                </div>

              </div>

              <q-icon
                name="payments"
                color="positive"
                size="28px"
              />

            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div class="earnings-total">
              {{ formatCurrency(earnings.monthly) }}
            </div>

            <div class="text-caption text-grey-7">
              Monthly earnings
            </div>


            <div class="row q-col-gutter-md q-mt-lg">

              <div class="col-6">

                <div class="earning-small-box">

                  <div class="text-caption text-grey-7">
                    Paid
                  </div>

                  <div class="text-weight-bold text-positive q-mt-xs">
                    {{ formatCurrency(earnings.paid) }}
                  </div>

                </div>

              </div>


              <div class="col-6">

                <div class="earning-small-box">

                  <div class="text-caption text-grey-7">
                    Pending
                  </div>

                  <div class="text-weight-bold text-orange q-mt-xs">
                    {{ formatCurrency(earnings.pending) }}
                  </div>

                </div>

              </div>

            </div>

          </q-card-section>


          <q-card-actions align="right">

            <q-btn
              flat
              color="primary"
              label="View Earnings"
              icon="arrow_forward"
              @click="goToEarnings"
            />

          </q-card-actions>

        </q-card>


        <!-- =====================================================
             VEHICLE INFORMATION
        ====================================================== -->
        <q-card
          flat
          bordered
          class="dashboard-card q-mb-lg"
        >

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="blue-1"
                text-color="primary"
                icon="directions_car"
              />

              <div class="q-ml-md">

                <div class="text-h6 text-weight-bold">
                  My Vehicle
                </div>

                <div class="text-caption text-grey-7">
                  Assigned vehicle
                </div>

              </div>

            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div
              v-if="driver.vehicleName"
              class="vehicle-info"
            >

              <div class="text-weight-bold text-body1">
                {{ driver.vehicleName }}
              </div>

              <div
                v-if="driver.vehicleRegistration"
                class="text-grey-7 q-mt-xs"
              >
                {{ driver.vehicleRegistration }}
              </div>

              <div
                v-if="driver.vehicleType"
                class="text-caption text-grey-6 q-mt-xs"
              >
                {{ driver.vehicleType }}
              </div>

              <div class="row q-mt-md">

                <q-chip
                  dense
                  color="green-1"
                  text-color="positive"
                >
                  <q-icon
                    name="check_circle"
                    size="15px"
                    class="q-mr-xs"
                  />
                  Assigned
                </q-chip>

              </div>

            </div>


            <div
              v-else
              class="empty-state small"
            >

              <q-icon
                name="directions_car"
                size="40px"
                color="grey-5"
              />

              <div class="text-grey-7 q-mt-sm">
                No vehicle assigned
              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- =====================================================
             DRIVER PERFORMANCE
        ====================================================== -->
        <q-card
          flat
          bordered
          class="dashboard-card"
        >

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Performance
            </div>

            <div class="text-caption text-grey-7">
              Your driving performance
            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <!-- COMPLETION RATE -->
            <div class="performance-row">

              <div class="row items-center justify-between">

                <span class="text-caption text-grey-7">
                  Trip Completion
                </span>

                <strong>
                  {{ performance.completionRate }}%
                </strong>

              </div>

              <q-linear-progress
                :value="performance.completionRate / 100"
                color="positive"
                rounded
                size="8px"
                class="q-mt-sm"
              />

            </div>


            <!-- RATING -->
            <div class="performance-row q-mt-lg">

              <div class="row items-center justify-between">

                <span class="text-caption text-grey-7">
                  Customer Rating
                </span>

                <strong>
                  {{ performance.rating }}/5
                </strong>

              </div>

              <q-rating
                v-model="performance.rating"
                max="5"
                size="22px"
                color="orange"
                readonly
                class="q-mt-xs"
              />

            </div>


            <!-- TOTAL TRIPS -->
            <div class="performance-row q-mt-lg">

              <div class="row items-center justify-between">

                <span class="text-caption text-grey-7">
                  Total Trips
                </span>

                <strong>
                  {{ performance.totalTrips }}
                </strong>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =========================================================
         NOTIFICATION DIALOG
    ========================================================== -->
    <q-dialog v-model="notificationDialog">

      <q-card class="notification-dialog">

        <q-card-section
          class="row items-center justify-between"
        >

          <div>

            <div class="text-h6 text-weight-bold">
              Notifications
            </div>

            <div class="text-caption text-grey-7">
              Latest driver notifications
            </div>

          </div>

          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
          />

        </q-card-section>


        <q-separator />


        <q-card-section class="q-pa-none">

          <q-list
            v-if="notifications.length"
            separator
          >

            <q-item
              v-for="notification in notifications"
              :key="notification.id"
            >

              <q-item-section avatar>

                <q-avatar
                  :color="
                    notification.type === 'trip'
                      ? 'blue-1'
                      : notification.type === 'earning'
                        ? 'green-1'
                        : 'orange-1'
                  "
                  :text-color="
                    notification.type === 'trip'
                      ? 'primary'
                      : notification.type === 'earning'
                        ? 'positive'
                        : 'orange'
                  "
                  :icon="
                    notification.type === 'trip'
                      ? 'route'
                      : notification.type === 'earning'
                        ? 'payments'
                        : 'notifications'
                  "
                />

              </q-item-section>


              <q-item-section>

                <q-item-label class="text-weight-medium">
                  {{ notification.title }}
                </q-item-label>

                <q-item-label caption>
                  {{ notification.message }}
                </q-item-label>

                <q-item-label caption>
                  {{ formatDateTime(notification.createdAt) }}
                </q-item-label>

              </q-item-section>

            </q-item>

          </q-list>


          <div
            v-else
            class="empty-state"
          >

            <q-icon
              name="notifications_none"
              size="50px"
              color="grey-5"
            />

            <div class="text-grey-7 q-mt-sm">
              No notifications
            </div>

          </div>

        </q-card-section>


        <q-card-actions align="right">

          <q-btn
            flat
            color="primary"
            label="Close"
            v-close-popup
          />

        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>
import {
  ref,
  computed,
  onMounted
} from 'vue'

import {
  useQuasar
} from 'quasar'

import {
  useRouter
} from 'vue-router'

import { useLocationTracker } from '@/composables/useLocationTracker'
import api from '@/config/api'
import { Notify } from 'quasar'
const { startTracking } = useLocationTracker()

/* =========================================================
   QUASAR / ROUTER
========================================================= */
const $q = useQuasar()
const router = useRouter()

/* =========================================================
   LOADING
========================================================= */
const loading = ref(false)
const statusUpdating = ref(false)

/* =========================================================
   DRIVER
========================================================= */
const driver = ref({
  id: null,
  name: '',
  mobile: '',
  email: '',
  image: '',
  isOnline: false,
  licenseExpiry: '',
  vehicleId: null,
  vehicleName: '',
  vehicleType: '',
  vehicleRegistration: ''
})

/* =========================================================
   STATISTICS
========================================================= */
const stats = ref({
  todayTrips: 0,
  completedTrips: 0,
  todayEarnings: 0,
  totalEarnings: 0
})

/* =========================================================
   EARNINGS
========================================================= */
const earnings = ref({
  monthly: 0,
  paid: 0,
  pending: 0
})

/* =========================================================
   PERFORMANCE
========================================================= */
const performance = ref({
  completionRate: 0,
  rating: 0,
  totalTrips: 0
})

/* =========================================================
   TRIPS
========================================================= */
const currentTrip = ref(null)
const upcomingTrip = ref(null)
const recentTrips = ref([])

/* =========================================================
   NOTIFICATIONS
========================================================= */
const notifications = ref([])
const notificationDialog = ref(false)

const notificationCount = computed(() => {
  return notifications.value.filter(
    notification => !notification.read
  ).length
})

/* =========================================================
   LICENSE WARNING
========================================================= */
const licenseWarning = computed(() => {
  if (!driver.value.licenseExpiry) {
    return false
  }

  const expiry = new Date(driver.value.licenseExpiry)

  if (Number.isNaN(expiry.getTime())) {
    return false
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const difference = expiry.getTime() - today.getTime()
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24))

  return days <= 30
})

/* =========================================================
   LOAD DASHBOARD
========================================================= */
const loadDashboard = async () => {
  try {
    loading.value = true

    const response = await api.get('/driver/dashboard')

    // Handle nested or top-level API payload structure
    const data = response.data?.data || response.data || {}

    /* DRIVER & VEHICLE MAPPING */
    // If the top-level response is the driver object itself, pass 'data'
    const driverRawData = data.driver || (data.id ? data : null)
    if (driverRawData) {
      driver.value = normalizeDriver(driverRawData)
      driver.value.isOnline = driverRawData.status
    }

    /* STATISTICS */
    const statsData = data.stats || {}
    stats.value = {
      todayTrips: Number(statsData.todayTrips || 0),
      completedTrips: Number(statsData.completedTrips || 0),
      todayEarnings: Number(statsData.todayEarnings || 0),
      totalEarnings: Number(statsData.totalEarnings || 0)
    }

    /* EARNINGS */
    const earningsData = data.earnings || {}
    earnings.value = {
      monthly: Number(earningsData.monthly || 0),
      paid: Number(earningsData.paid || 0),
      pending: Number(earningsData.pending || 0)
    }

    /* PERFORMANCE (Mapped directly from API driver object if nested stats aren't present) */
    const performanceData = data.performance || {}
    performance.value = {
      completionRate: Number(performanceData.completionRate || 0),
      rating: Number(performanceData.rating || driverRawData?.rating || 0),
      totalTrips: Number(performanceData.totalTrips || driverRawData?.total_rides || 0)
    }

    /* CURRENT TRIP */
    currentTrip.value = normalizeTrip(data.currentTrip)

    /* UPCOMING */
    upcomingTrip.value = normalizeTrip(data.upcomingTrip)

    /* RECENT */
    recentTrips.value = Array.isArray(data.recentTrips)
      ? data.recentTrips.map(normalizeTrip)
      : []

    /* NOTIFICATIONS */
    notifications.value = Array.isArray(data.notifications)
      ? data.notifications
      : []

  } catch (error) {
    console.error('Driver Dashboard Error:', error)

    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Unable to load driver dashboard.'
    })
  } finally {
    loading.value = false
  }
}

/* =========================================================
   NORMALIZE DRIVER
========================================================= */
const normalizeDriver = driverData => {
  if (!driverData) {
    return {
      id: null,
      name: '',
      mobile: '',
      email: '',
      image: '',
      isOnline: false,
      licenseExpiry: '',
      vehicleId: null,
      vehicleName: '',
      vehicleType: '',
      vehicleRegistration: ''
    }
  }

  // Construct full name if first_name / last_name exist
  const fullName = [driverData.first_name, driverData.last_name]
    .filter(Boolean)
    .join(' ')

  return {
    id: driverData.id,

    name:
      fullName ||
      driverData.name ||
      driverData.user?.username ||
      'Driver',

    mobile:
      driverData.mobile_number ||
      driverData.mobile ||
      driverData.user?.mobile_no ||
      '',

    email:
      driverData.email ||
      driverData.user?.email ||
      '',

    image:
      driverData.profile_image ||
      driverData.image ||
      '',

    isOnline:
      driverData.availability_status === 'online' ||
      driverData.isOnline === true ||
      driverData.is_online === true,

    licenseExpiry:
      driverData.license_expiry_date ||
      driverData.licenseExpiry ||
      '',

    vehicleId:
      driverData.vehicle?.id ||
      driverData.vehicleId ||
      null,

    vehicleName:
      driverData.vehicle?.vehicle_name ||
      driverData.vehicleName ||
      '',

    vehicleType:
      driverData.vehicle?.fuel_type ||
      driverData.vehicleType ||
      '',

    vehicleRegistration:
      driverData.vehicle?.registration_no ||
      driverData.vehicleRegistration ||
      ''
  }
}

/* =========================================================
   NORMALIZE TRIP
========================================================= */
const normalizeTrip = trip => {
  if (!trip) {
    return null
  }

  return {
    id: trip.id,

    bookingId:
      trip.bookingId ||
      trip.booking_id ||
      trip.booking?.id ||
      trip.id,

    customerName:
      trip.customerName ||
      trip.customer?.name ||
      trip.user?.name ||
      '',

    pickupLocation:
      trip.pickupLocation ||
      trip.pickup_location ||
      trip.pickupAddress ||
      trip.pickup_address ||
      trip.from ||
      '',

    dropLocation:
      trip.dropLocation ||
      trip.drop_location ||
      trip.dropAddress ||
      trip.drop_address ||
      trip.to ||
      '',

    tripDate:
      trip.tripDate ||
      trip.trip_date ||
      trip.date ||
      '',

    pickupTime:
      trip.pickupTime ||
      trip.pickup_time ||
      trip.time ||
      '',

    status:
      trip.status ||
      'Assigned',

    earning: Number(
      trip.earning ||
      trip.driverEarning ||
      trip.driver_earning ||
      trip.amount ||
      0
    )
  }
}


const upcomingTrips = ref([])

const fetchUpcoming = async () => {
  try {
    loading.value = true
    const response = await api.get('/driver/find/pending/ride')

    const data = response.data?.data || response.data || []
    if (Array.isArray(data)) {
      upcomingTrips.value = data
    } else {
      upcomingTrips.value = []
    }
  } catch (error) {
    console.error('Error fetching upcoming trips:', error)
    Notify.create({
      type: 'negative',
      message: 'Failed to load upcoming trip details.'
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUpcoming()
})

// const acceptRide = async (bookingId) => {
//   try {
//     const response = await api.put(`/driver/accept-ride/${bookingId}`)

//     if (response.data?.success) {
//       Notify.create({
//         type: 'positive',
//         message: 'Ride accepted successfully!'
//       })

//       // Remove accepted trip from the pending list locally
//       upcomingTrips.value = upcomingTrips.value.filter((trip) => trip.id !== bookingId)
//     }
//   } catch (error) {
//     console.error('Error accepting ride:', error)
//     Notify.create({
//       type: 'negative',
//       message: error.response?.data?.message || 'Failed to accept ride.'
//     })
//   }
// }

// REJECT RIDE HANDLER
const rejectRide = async (bookingId) => {
  try {
    const response = await api.put(`/driver/reject-ride/${bookingId}`)

    if (response.data?.success) {
      Notify.create({
        type: 'info',
        message: 'Ride request declined.'
      })

      // Remove rejected trip from the pending list locally
      upcomingTrips.value = upcomingTrips.value.filter((trip) => trip.id !== bookingId)
    }
  } catch (error) {
    console.error('Error rejecting ride:', error)
    Notify.create({
      type: 'negative',
      message: error.response?.data?.message || 'Failed to reject ride.'
    })
  }
}

/* =========================================================
   CHANGE DRIVER ONLINE STATUS
========================================================= */
const changeDriverStatus = async status => {
  try {
    statusUpdating.value = true

    await api.post(`/driver/${driver.value.id}/status`, {
      availability_status: status ? 'online' : 'offline',
      isOnline: status
    })

    driver.value.isOnline = status

    $q.notify({
      type: 'positive',
      message: status ? 'You are now online.' : 'You are now offline.'
    })
  } catch (error) {
    console.error('Driver Status Error:', error)

    // Revert switch on API failure
    driver.value.isOnline = !status

    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Unable to update driver status.'
    })
  } finally {
    statusUpdating.value = false
  }
}

/* =========================================================
   NAVIGATION HANDLERS
========================================================= */
const viewTrip = trip => {
  if (!trip?.id) return
  router.push({ name: 'DriverTripDetails', params: { id: trip.id } })
}

const goToAssignedTrips = () => router.push({ name: 'DriverAssignedTrips' })
const goToEarnings = () => router.push({ name: 'DriverEarnings' })
const goToTripHistory = () => router.push({ name: 'DriverTripHistory' })
const goToProfile = () => router.push({ name: 'DriverProfile' })

const openNotifications = () => {
  notificationDialog.value = true
}

/* =========================================================
   UTILITY & FORMATTING FUNCTIONS
========================================================= */
const getInitials = name => {
  if (!name) return 'D'
  return name
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

const formatCurrency = amount => {
  const value = Number(amount || 0)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value)
}

const formatDate = date => {
  if (!date) return '-'
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const formatDateTime = date => {
  if (!date) return '-'
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getDay = date => {
  if (!date) return '-'
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return '-'
  return parsed.getDate()
}

const getDayName = date => {
  if (!date) return ''
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString('en-IN', { weekday: 'short' })
}

const getMonthName = date => {
  if (!date) return ''
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString('en-IN', { month: 'short' })
}

/* =========================================================
   MOUNT LIFECYCLE
========================================================= */
onMounted(() => {
  startTracking()
  loadDashboard()
})

const acceptingId = ref(null)
const showOtpModal = ref(false)
const otpInput = ref('')
const isVerifying = ref(false)
const selectedTrip = ref(null)

// Step 1: Accept the ride (Updates state & UI to show "Start Ride")
const acceptRide = async (trip) => {
  acceptingId.value = trip.id
  try {
    const response = await api.put(`/driver/accept-ride/${trip.id}`)

    if (response.data?.success || response.status === 200) {
      // Update local state to show 'accepted' status
      trip.status = 'accepted'

      Notify.create({
        type: 'positive',
        message: 'Ride accepted! Tap "Start Ride" when rider enters vehicle.'
      })
    } else {
      Notify.create({
        type: 'negative',
        message: response.data?.message || 'Failed to accept ride.'
      })
    }
  } catch (error) {
    console.error('Error accepting ride:', error)
    Notify.create({
      type: 'negative',
      message: error.response?.data?.message || 'Failed to accept ride.'
    })
  } finally {
    acceptingId.value = null
  }
}

// Step 2: Open OTP Modal when "Start Ride" is clicked
const openOtpModal = (trip) => {
  selectedTrip.value = trip
  otpInput.value = ''
  showOtpModal.value = true
}

// Step 3: Verify OTP and start the trip
const verifyOtpAndStart = async () => {
  if (!otpInput.value || otpInput.value.trim().length < 4) {
    Notify.create({
      type: 'warning',
      message: 'Please enter a valid OTP'
    })
    return
  }

  isVerifying.value = true

  try {
    const payload = {
      booking_id: selectedTrip.value.id,
      otp: otpInput.value.trim()
    }

    const response = await api.post('/driver/start/ride', payload)

    if (response.data?.success || response.status === 200) {
      Notify.create({
        type: 'positive',
        message: 'OTP verified! Ride started successfully.'
      })

      showOtpModal.value = false

      // Refresh list or remove trip from pending queue
      if (typeof fetchUpcoming === 'function') {
        fetchUpcoming()
      } else if (typeof upcomingTrips !== 'undefined') {
        upcomingTrips.value = upcomingTrips.value.filter(
          (t) => t.id !== selectedTrip.value.id
        )
      }
    } else {
      Notify.create({
        type: 'negative',
        message: response.data?.message || 'Invalid OTP. Please check and try again.'
      })
    }
  } catch (error) {
    console.error('Error starting ride:', error)
    Notify.create({
      type: 'negative',
      message: error.response?.data?.message || 'Invalid OTP verification failed.'
    })
  } finally {
    isVerifying.value = false
  }
}
</script>
<style scoped>

/* =========================================================
   PAGE
========================================================= */

.driver-dashboard {

  background: #f5f7fb;

  min-height: 100%;

}


/* =========================================================
   PROFILE STATUS CARD
========================================================= */

.profile-status-card {

  background: #ffffff;

  border-radius: 16px;

}


/* =========================================================
   DRIVER AVATAR
========================================================= */

.driver-avatar {

  border: 2px solid #e5e7eb;

  overflow: hidden;

}


.driver-avatar img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


/* =========================================================
   SUMMARY CARD
========================================================= */

.summary-card {

  background: #ffffff;

  border-radius: 14px;

  height: 100%;

  transition: all 0.2s ease;

}


.summary-card:hover {

  transform: translateY(-3px);

  box-shadow:
    0 10px 25px
    rgba(15, 23, 42, 0.08);

}


/* =========================================================
   DASHBOARD CARD
========================================================= */

.dashboard-card {

  background: #ffffff;

  border-radius: 14px;

}


/* =========================================================
   LICENSE WARNING
========================================================= */

.license-warning {

  background: #fff7ed;

  border: 1px solid #fed7aa;

  color: #9a3412;

}


/* =========================================================
   TRIP INFORMATION
========================================================= */

.trip-info-label {

  font-size: 12px;

  color: #6b7280;

}


.trip-info-value {

  font-size: 14px;

  font-weight: 600;

  margin-top: 4px;

}


.trip-location {

  font-size: 14px;

  color: #374151;

  line-height: 1.4;

}


/* =========================================================
   UPCOMING TRIP
========================================================= */

.upcoming-trip {

  display: flex;

  align-items: flex-start;

}


.date-box {

  min-width: 78px;

  padding: 12px;

  text-align: center;

  background: #eff6ff;

  border-radius: 12px;

}


/* =========================================================
   EMPTY STATE
========================================================= */

.empty-state {

  min-height: 180px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-direction: column;

}


.empty-state.small {

  min-height: 100px;

}


/* =========================================================
   QUICK ACTIONS
========================================================= */

.quick-actions {

  display: flex;

  flex-direction: column;

  gap: 10px;

}


.quick-action-btn {

  width: 100%;

  justify-content: flex-start;

}


/* =========================================================
   EARNINGS
========================================================= */

.earnings-total {

  font-size: 28px;

  font-weight: 700;

  color: #16a34a;

}


.earning-small-box {

  background: #f8fafc;

  border: 1px solid #e5e7eb;

  border-radius: 10px;

  padding: 12px;

}


/* =========================================================
   VEHICLE
========================================================= */

.vehicle-info {

  background: #f8fafc;

  border: 1px solid #e5e7eb;

  border-radius: 12px;

  padding: 14px;

}


/* =========================================================
   PERFORMANCE
========================================================= */

.performance-row {

  width: 100%;

}


/* =========================================================
   NOTIFICATION DIALOG
========================================================= */

.notification-dialog {

  width: 600px;

  max-width: 95vw;

  border-radius: 16px;

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 768px) {

  .driver-dashboard {

    padding: 12px !important;

  }


  .profile-status-card {

    border-radius: 12px;

  }


  .profile-status-card
  .q-card__section {

    padding: 14px;

  }


  .driver-online-box {

    margin-top: 16px;

    width: 100%;

  }


  .driver-online-box
  .text-right {

    text-align: left;

  }


  .upcoming-trip {

    flex-direction: column;

  }


  .date-box {

    width: 100%;

  }


  .upcoming-trip
  .q-ml-md {

    margin-left: 0 !important;

    margin-top: 16px;

  }

}


@media (max-width: 500px) {

  .text-h5 {

    font-size: 21px;

  }


  .text-h6 {

    font-size: 18px;

  }


  .summary-card
  .text-h5 {

    font-size: 22px;

  }

}

</style>
