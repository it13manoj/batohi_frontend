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
         ONBOARDING & VERIFICATION STATUS BANNER
    ========================================================== -->
    <q-banner
      v-if="!canTakeRides"
      class="rounded-borders q-mb-lg"
      :class="{
        'bg-amber-1 text-dark border-amber': isPendingVerification,
        'bg-blue-1 text-primary border-blue': !isProfileCompleted || !isSubscribed
      }"
      bordered
    >
      <template #avatar>
        <q-icon
          :name="isPendingVerification ? 'hourglass_top' : (!isProfileCompleted ? 'person' : 'card_membership')"
          size="28px"
          :color="isPendingVerification ? 'warning' : 'primary'"
        />
      </template>

      <div class="text-subtitle1 text-weight-bold">
        <span v-if="!isProfileCompleted">Driver Profile Incomplete</span>
        <span v-else-if="!isSubscribed">Driver Subscription Required</span>
        <span v-else-if="isPendingVerification">Document Verification in Progress</span>
      </div>

      <div class="text-body2 q-mt-xs">
        <span v-if="!isProfileCompleted">
          Please complete your driver profile details to unlock your driver subscription and document verification.
        </span>
        <span v-else-if="!isSubscribed">
          You need an active 0% commission subscription pass to receive customer ride requests.
        </span>
        <span v-else-if="isPendingVerification">
          Your uploaded documents are currently being verified by the admin team. You will be able to go online and accept rides as soon as approval is completed.
        </span>
      </div>

      <template #action>
        <q-btn
          v-if="!isProfileCompleted"
          color="primary"
          unelevated
          no-caps
          label="Complete Profile"
          class="text-weight-bold"
          @click="$router.push({ name: 'DriverProfile' })"
        />
        <q-btn
          v-else-if="!isSubscribed"
          color="primary"
          unelevated
          no-caps
          label="Get Subscription Pass"
          class="text-weight-bold"
          @click="$router.push({ name: 'DriverSubscription' })"
        />
        <q-btn
          v-else-if="isPendingVerification"
          color="warning"
          text-color="dark"
          unelevated
          no-caps
          icon="verified_user"
          label="Check Verification Status"
          class="text-weight-bold"
          @click="$router.push({ name: 'DriverVerification' })"
        />
      </template>
    </q-banner>

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

              <div class="row items-center">
                <div class="text-h6 text-weight-bold">
                  {{ driver.name || 'Driver' }}
                </div>
                <q-badge
                  :color="isVerified ? 'positive' : (isPendingVerification ? 'warning' : 'grey-7')"
                  :text-color="isPendingVerification ? 'dark' : 'white'"
                  class="q-ml-sm text-weight-bold"
                  rounded
                >
                  <q-icon :name="isVerified ? 'check_circle' : 'hourglass_top'" size="13px" class="q-mr-xs" />
                  {{ isVerified ? 'Verified Driver' : (isPendingVerification ? 'Verification Pending' : 'Unverified') }}
                </q-badge>
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
              >
                <q-tooltip v-if="!canTakeRides">
                  Document verification required to go online
                </q-tooltip>
              </q-toggle>

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

  <q-card
    v-if="acceptedRide"
    class="active-ride-card q-mb-lg"
  >
    <q-card-section class="active-ride-header">
      <div class="row items-center justify-between">
        <div class="row items-center no-wrap">
          <q-avatar color="green-1" text-color="positive" icon="navigation" size="42px" />
          <div class="q-ml-md">
            <div class="text-h6 text-weight-bold">Current Accepted Ride</div>
            <div class="text-caption text-grey-7">
              Navigate to {{ acceptedRide.rider?.username || 'your rider' }}
            </div>
          </div>
        </div>
        <q-chip color="positive" text-color="white" dense>
          <q-icon name="check_circle" size="15px" class="q-mr-xs" />
          Accepted
        </q-chip>
      </div>
    </q-card-section>

    <div
      id="map-current-accepted"
      class="active-ride-map"
    ></div>

    <q-card-section class="active-ride-details">
      <div class="row q-col-gutter-md items-center">
        <div class="col-12 col-sm-7">
          <div class="text-caption text-grey-6 text-uppercase text-weight-medium">
            Pickup location
          </div>
          <div class="text-body2 text-weight-medium ellipsis-2-lines q-mt-xs">
            <q-icon name="my_location" color="positive" size="17px" class="q-mr-xs" />
            {{ acceptedRide.riderAddress || acceptedRide.from || acceptedRide.pickupLocation || formatCoordinates(acceptedRide.rider) }}
          </div>
        </div>
        <div class="col-6 col-sm-2">
          <div class="text-caption text-grey-6">Distance</div>
          <div class="text-subtitle2 text-weight-bold text-primary q-mt-xs">
            {{ acceptedRide.pickupMetrics?.distance || 'Calculating...' }}
          </div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="text-caption text-grey-6">Estimated time</div>
          <div class="text-subtitle2 text-weight-bold text-positive q-mt-xs">
            {{ acceptedRide.pickupMetrics?.duration || 'Calculating...' }}
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-sm">
        <div class="col-12 col-sm-6">
          <div class="location-pill">
            <q-icon name="directions_car" color="primary" size="16px" />
            <div class="q-ml-sm">
              <div class="text-caption text-grey-6">Driver location</div>
              <div class="text-caption text-weight-medium">
                {{ acceptedRide.driverAddress || formatCoordinates(acceptedRide.driver) }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="location-pill">
            <q-icon name="person_pin_circle" color="negative" size="16px" />
            <div class="q-ml-sm">
              <div class="text-caption text-grey-6">Rider location</div>
              <div class="text-caption text-weight-medium">
                {{ acceptedRide.riderAddress || formatCoordinates(acceptedRide.rider) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="acceptedRide.routeError" class="route-help text-caption text-negative q-mt-sm">
        <q-icon name="location_off" size="14px" class="q-mr-xs" />
        {{ acceptedRide.routeError }}
      </div>
      <div v-else-if="!acceptedRide.pickupMetrics" class="route-help text-caption text-grey-7 q-mt-sm">
        <q-spinner-dots color="primary" size="16px" class="q-mr-xs" />
        Calculating the best route from your location to the rider...
      </div>
    </q-card-section>

    <q-card-actions align="right" class="active-ride-actions">
      <q-btn
        flat
        color="primary"
        icon="near_me"
        label="Open in Google Maps"
        @click="openExternalNavigation(acceptedRide)"
      />
      <q-btn
        unelevated
        :color="isRideReadyToComplete(acceptedRide) ? 'positive' : 'primary'"
        :icon="isRideReadyToComplete(acceptedRide) ? 'flag' : 'play_arrow'"
        :label="isRideReadyToComplete(acceptedRide) ? 'Complete Ride' : 'Start Ride'"
        @click="isRideReadyToComplete(acceptedRide) ? completeRide(acceptedRide) : openOtpModal(acceptedRide)"
      />
    </q-card-actions>
  </q-card>

  <q-card class="ride-requests-card q-mb-lg">
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
    <q-list v-else separator class="ride-request-list q-pa-none">
      <q-item
        v-for="trip in upcomingTrips"
        :key="trip.id"
        class="ride-request q-pa-md flex-column"
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
        <div class="trip-actions row items-center justify-between full-width q-pa-sm">
          <div>
            <span class="text-caption text-grey-7">Fare: </span>
            <span class="text-subtitle2 text-weight-bolder text-primary">₹{{ trip.fare }}</span>
            <span class="text-caption text-grey-6 q-ml-sm">({{ trip.distance }})</span>
          </div>

          <!-- Dynamic Action Buttons -->
          <div class="row q-gutter-x-xs">
            <template v-if="!isActiveRide(trip)">
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

            <template v-else>
              <q-btn
                dense
                unelevated
                :color="isRideReadyToComplete(trip) ? 'positive' : 'primary'"
                :icon="isRideReadyToComplete(trip) ? 'flag' : 'play_arrow'"
                :label="isRideReadyToComplete(trip) ? 'Complete Ride' : 'Start Ride'"
                size="sm"
                @click="isRideReadyToComplete(trip) ? completeRide(trip) : openOtpModal(trip)"
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

            <div v-if="loading" class="empty-state">
              <q-spinner-dots color="primary" size="32px" />
              <div class="text-grey-7 q-mt-sm">Loading completed trips...</div>
            </div>

            <q-list
              v-else-if="recentTrips.length"
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


            <div v-else class="empty-state">

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
import { ref, computed, onMounted, nextTick, onUnmounted } from 'vue'
import { useQuasar, Notify } from 'quasar'
import { useRouter } from 'vue-router'
import { useLocationTracker } from '@/composables/useLocationTracker'
import { useDriverOnboarding } from '@/composables/useDriverOnboarding'
import api from '@/config/api'

// 1. Leaflet & Plugins Setup
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

// Attach L globally so leaflet-routing-machine can extend it safely
if (typeof window !== 'undefined') {
  window.L = L
}

/* =========================================================
   CUSTOM INLINE SVG ICONS (CORS-Safe & Render Reliable)
========================================================= */
// Modern SVG Driver Vehicle Icon (Primary Blue Pin with Vehicle)
const driverSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="36" height="36">
  <path fill="#1976D2" d="M172.268 501.67C26.97 291.03 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.03-172.268 309.67a24 24 0 0 1-37.464 0z"/>
  <circle cx="192" cy="192" r="120" fill="#FFFFFF"/>
  <path fill="#1976D2" d="M135 155c-6.6 0-12 5.4-12 12v35c0 6.6 5.4 12 12 12h122c6.6 0 12-5.4 12-12v-35c0-6.6-5.4-12-12-12H135zm12 16h98v20h-98v-20zm-20 62c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm130 0c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14z"/>
</svg>
`)}`

// Modern SVG Rider Location Pin (Red Target Pointer)
const riderSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="36" height="36">
  <path fill="#D32F2F" d="M172.268 501.67C26.97 291.03 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.03-172.268 309.67a24 24 0 0 1-37.464 0z"/>
  <circle cx="192" cy="192" r="110" fill="#FFFFFF"/>
  <circle cx="192" cy="192" r="60" fill="#D32F2F"/>
  <circle cx="192" cy="192" r="25" fill="#FFFFFF"/>
</svg>
`)}`

/* =========================================================
   COMPOSABLES & ROUTER
========================================================= */
const { startTracking } = useLocationTracker()
const $q = useQuasar()
const router = useRouter()
const {
  isProfileCompleted,
  isSubscribed,
  activePlan,
  isVerified,
  isPendingVerification,
  canTakeRides
} = useDriverOnboarding()

/* =========================================================
   REACTIVE STATES
========================================================= */
const loading = ref(false)
const statusUpdating = ref(false)
const acceptingId = ref(null)

// OTP Modal & Start Ride States
const showOtpModal = ref(false)
const otpInput = ref('')
const isVerifying = ref(false)
const selectedTrip = ref(null)

// Leaflet Map Active Instances Dictionary
const mapInstances = {}

const safeRemoveMap = (mapKey) => {
  const currentMap = mapInstances[mapKey]
  if (!currentMap) return

  try {
    const container = currentMap.getContainer?.()
    if (container && container.parentNode) {
      currentMap.remove()
    }
  } catch (error) {
    console.warn('Map cleanup warning:', error)
  } finally {
    delete mapInstances[mapKey]
  }
}

// Driver Profile State
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

// Analytics & Dashboard States
const stats = ref({ todayTrips: 0, completedTrips: 0, todayEarnings: 0, totalEarnings: 0 })
const earnings = ref({ monthly: 0, paid: 0, pending: 0 })
const performance = ref({ completionRate: 0, rating: 0, totalTrips: 0 })

// Trips & Notifications
const currentTrip = ref(null)
const upcomingTrip = ref(null)
const upcomingTrips = ref([])
const recentTrips = ref([])
const notifications = ref([])
const notificationDialog = ref(false)

/* =========================================================
   COMPUTED PROPERTIES
========================================================= */
const notificationCount = computed(() => {
  return notifications.value.filter(notification => !notification.read).length
})

const isAcceptedRide = (trip) => {
  const status = String(trip?.status || trip?.ride_status || trip?.booking_status || '').toLowerCase()
  return ['accepted', 'accept', 'driver_accepted', 'confirmed'].includes(status)
}

const isRideStarted = (trip) => {
  const status = String(trip?.status || trip?.ride_status || trip?.booking_status || '').toLowerCase()
  return ['started', 'start', 'in_progress', 'ongoing', 'on_trip','confirmed'].includes(status)
}

const isActiveRide = trip => isAcceptedRide(trip) || isRideStarted(trip)
const isRideReadyToComplete = trip => isRideStarted(trip)

const acceptedRide = computed(() => {
  const dashboardRides = [currentTrip.value, upcomingTrip.value]
  const requestRide = upcomingTrips.value.find(isActiveRide)
  return requestRide || dashboardRides.find(isActiveRide) || currentTrip.value || null
})

const licenseWarning = computed(() => {
  if (!driver.value.licenseExpiry) return false
  const expiry = new Date(driver.value.licenseExpiry)
  if (Number.isNaN(expiry.getTime())) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const difference = expiry.getTime() - today.getTime()
  return Math.ceil(difference / (1000 * 60 * 60 * 24)) <= 30
})

/* =========================================================
   API DATA FETCHERS
========================================================= */
const loadDashboard = async () => {
  try {
    loading.value = true
    const response = await api.get('/driver/dashboard')
    const data = response.data?.data || response.data || {}

    const driverRawData = data.driver || (data.id ? data : null)
    if (driverRawData) {
      driver.value = normalizeDriver(driverRawData)
      driver.value.isOnline = driverRawData.status
    }

    const statsData = data.stats || {}
    const earningsData = data.earnings || data.earning || {}
    const todayEarnings = toNumber(
      statsData.todayEarnings,
      statsData.today_earnings,
      earningsData.today,
      earningsData.todayEarnings,
      earningsData.today_earnings
    )
    const totalEarnings = toNumber(
      statsData.totalEarnings,
      statsData.total_earnings,
      earningsData.total,
      earningsData.totalEarnings,
      earningsData.total_earnings,
      earningsData.lifetime
    )
    stats.value = {
      todayTrips: Number(statsData.todayTrips || 0),
      completedTrips: Number(statsData.completedTrips || 0),
      todayEarnings,
      totalEarnings
    }

    earnings.value = {
      monthly: toNumber(earningsData.monthly, earningsData.monthlyEarnings, earningsData.monthly_earnings),
      paid: toNumber(earningsData.paid, earningsData.paidAmount, earningsData.paid_amount),
      pending: toNumber(earningsData.pending, earningsData.pendingAmount, earningsData.pending_amount)
    }

    const performanceData = data.performance || {}
    performance.value = {
      completionRate: Number(performanceData.completionRate || 0),
      rating: Number(performanceData.rating || driverRawData?.rating || 0),
      totalTrips: Number(performanceData.totalTrips || driverRawData?.total_rides || 0)
    }

    currentTrip.value = normalizeTrip(data.currentTrip)
    upcomingTrip.value = normalizeTrip(data.upcomingTrip)

    const dashboardAcceptedRide = normalizeTrip(
      data.currentAcceptedRide
      || data.acceptedRide
      || data.activeRide
      || (isAcceptedRide(currentTrip.value) ? currentTrip.value : null)
      || (isAcceptedRide(upcomingTrip.value) ? upcomingTrip.value : null)
    )

    if (dashboardAcceptedRide && !upcomingTrips.value.some(trip => trip.id === dashboardAcceptedRide.id)) {
      upcomingTrips.value = [dashboardAcceptedRide, ...upcomingTrips.value]
    }
    const dashboardRecentTrips = Array.isArray(data.recentTrips)
      ? data.recentTrips
      : []
    recentTrips.value = getCompletedTrips(dashboardRecentTrips)
    notifications.value = Array.isArray(data.notifications) ? data.notifications : []

    if (!recentTrips.value.length) await fetchCompletedTrips()
    if (!earnings.value.monthly && !earnings.value.paid && !earnings.value.pending) {
      await fetchEarningsFallback()
    }

    await nextTick()
    if (acceptedRide.value) {
      await trackRide()
      initPickupMap(acceptedRide.value, 'current-accepted')
    }
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

const getCompletedTrips = trips => trips
  .map(normalizeTrip)
  .filter(trip => String(trip?.status || '').toLowerCase() === 'completed')
  .sort((firstTrip, secondTrip) => {
    const firstDate = new Date(firstTrip.tripDate || 0).getTime()
    const secondDate = new Date(secondTrip.tripDate || 0).getTime()
    return secondDate - firstDate
  })
  .slice(0, 5)

const fetchCompletedTrips = async () => {
  try {
    const response = await api.get('/driver/find/all/ride')
    let data = response.data?.data || response.data || []
    if (!Array.isArray(data) && data && typeof data === 'object') data = [data]
    recentTrips.value = getCompletedTrips(Array.isArray(data) ? data : [])
  } catch (error) {
    console.error('Error loading completed trips:', error)
  }
}

const fetchEarningsFallback = async () => {
  try {
    const response = await api.get('/driver/find/all/ride')
    let data = response.data?.data || response.data || []
    if (!Array.isArray(data) && data && typeof data === 'object') data = [data]
    if (!Array.isArray(data)) return

    const rides = data.map(normalizeTrip)
    const paid = rides
      .filter(trip => String(trip.status).toLowerCase() === 'completed')
      .reduce((total, trip) => total + trip.earning, 0)
    const pending = rides
      .filter(trip => !['completed', 'cancelled', 'canceled', 'rejected'].includes(String(trip.status).toLowerCase()))
      .reduce((total, trip) => total + trip.earning, 0)

    earnings.value = {
      monthly: paid + pending,
      paid,
      pending
    }

    if (!stats.value.totalEarnings) stats.value.totalEarnings = paid
  } catch (error) {
    console.error('Error loading earnings fallback:', error)
  }
}

const fetchUpcoming = async () => {
  try {
    loading.value = true
    const existingAcceptedRide = acceptedRide.value
    const response = await api.get('/driver/find/pending/ride')
    const data = response.data?.data || response.data || []
    upcomingTrips.value = Array.isArray(data) ? data.map(normalizeTrip) : []

    if (existingAcceptedRide) {
      const refreshedRide = upcomingTrips.value.find(trip => trip.id === existingAcceptedRide.id)
      if (refreshedRide && isRideStarted(existingAcceptedRide) && !isRideStarted(refreshedRide)) {
        Object.assign(refreshedRide, existingAcceptedRide)
      }
    }

    if (existingAcceptedRide && !upcomingTrips.value.some(trip => trip.id === existingAcceptedRide.id)) {
      upcomingTrips.value = [existingAcceptedRide, ...upcomingTrips.value]
    }

    // Refresh live coordinates before rendering the active map.
    await nextTick()
    if (acceptedRide.value) {
      await trackRide()
      console.log(acceptedRide.value,"acceptedRide.value,")
      initPickupMap(acceptedRide.value, 'current-accepted')
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


/* =========================================================
   RIDE ACTIONS & MAP LOGIC
========================================================= */

const trackRide = async () => {
  const trip = acceptedRide.value
  if (!trip) return null

  try {
    const pickLocationRes = await api.get(`/driver/pick/location`)
    const locationData = pickLocationRes.data?.data || pickLocationRes.data || {}
    const riderLocation = locationData.rider || locationData.pickup || locationData.customer
    const driverLocation = locationData.driver || locationData.vehicle
    const normalizedStatus = String(locationData.status || '').toLowerCase()

    if (riderLocation) {
      const riderLatitude = riderLocation.latitude ?? riderLocation.lat ?? locationData.rider_latitude ?? locationData.latitude_from ?? locationData.pickup_latitude
      const riderLongitude = riderLocation.longitude ?? riderLocation.lng ?? locationData.rider_longitude ?? locationData.longitude_from ?? locationData.pickup_longitude

      if (Number.isFinite(Number(riderLatitude)) && Number.isFinite(Number(riderLongitude))) {
        trip.rider = {
          ...trip.rider,
          ...riderLocation,
          latitude: Number(riderLatitude),
          longitude: Number(riderLongitude)
        }
      }
    } else if (normalizedStatus !== 'confirmed' && (locationData.rider_latitude || locationData.latitude_from)) {
      trip.rider = {
        ...trip.rider,
        latitude: Number(locationData.rider_latitude ?? locationData.latitude_from ?? locationData.pickup_latitude),
        longitude: Number(locationData.rider_longitude ?? locationData.longitude_from ?? locationData.pickup_longitude)
      }
    }

    if (driverLocation) {
      const driverLatitude = driverLocation.latitude ?? driverLocation.lat ?? locationData.driver_latitude ?? locationData.latitude_driver
      const driverLongitude = driverLocation.longitude ?? driverLocation.lng ?? locationData.driver_longitude ?? locationData.longitude_driver

      if (Number.isFinite(Number(driverLatitude)) && Number.isFinite(Number(driverLongitude))) {
        trip.driver = {
          ...trip.driver,
          ...driverLocation,
          latitude: Number(driverLatitude),
          longitude: Number(driverLongitude)
        }
      }
    } else if (normalizedStatus !== 'confirmed' && (locationData.driver_latitude || locationData.latitude_driver)) {
      trip.driver = {
        ...trip.driver,
        latitude: Number(locationData.driver_latitude ?? locationData.latitude_driver),
        longitude: Number(locationData.driver_longitude ?? locationData.longitude_driver)
      }
    }

    if (normalizedStatus) {
      trip.status = normalizedStatus
    }

    return trip
  } catch (error) {
    console.warn('Using dashboard coordinates for pickup map.', error)
    return trip
  }
}

// 1. Accept Ride Action
const acceptRide = async (trip) => {
  if (!canTakeRides.value) {
    if (!isVerified.value) {
      $q.dialog({
        title: 'Documents Under Verification',
        message: 'You cannot accept rides until your uploaded documents are verified and approved by the admin team.',
        ok: 'Check Verification Status',
        cancel: 'Close'
      }).onOk(() => {
        router.push({ name: 'DriverVerification' })
      })
      return
    }
    if (!isSubscribed.value) {
      $q.dialog({
        title: 'Subscription Required',
        message: 'An active driver subscription pass is required to accept customer rides.',
        ok: 'View Plans',
        cancel: 'Close'
      }).onOk(() => {
        router.push({ name: 'DriverSubscription' })
      })
      return
    }
  }

  acceptingId.value = trip.id
  try {
    const response = await api.put(`/driver/accept-ride/${trip.id}`)

    if (response.data?.success || response.status === 200) {
      trip.status = 'accepted'

      // Attempt to retrieve accurate pickup coordinates from API
      await trackRide()

      Notify.create({
        type: 'positive',
        message: 'Ride accepted! Tap "Start Ride" when rider enters vehicle.'
      })

      // Wait for DOM to render map container div
      await nextTick()
      initPickupMap(acceptedRide.value || trip, 'current-accepted')
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

// 2. Initialize Leaflet Routing Map safely
const initPickupMap = (trip, mapKey = trip.id) => {
  const containerId = mapKey === 'current-accepted' ? 'map-current-accepted' : `map-${trip.id}`
  const mapContainer = document.getElementById(containerId)
  if (!mapContainer || !mapContainer.isConnected) return

  safeRemoveMap(mapKey)

  const routePoints = getRideRoutePoints(trip)
  const driverPoint = routePoints.from
  const riderPoint = routePoints.to

  if (!driverPoint || !riderPoint) {
    trip.routeError = 'Location data is not available yet.'
    console.warn('Missing valid coordinates for route calculation.')
    return
  }

  trip.routeError = ''
  trip.pickupMetrics = createFallbackMetrics(driverPoint, riderPoint)
  loadAddressDetails(trip, driverPoint, riderPoint)

  const map = L.map(containerId).setView([driverPoint.lat, driverPoint.lng], 14)
  mapInstances[mapKey] = map

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  // Custom SVG Leaflet Icons
  const driverIcon = L.icon({
    iconUrl: driverSvg,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -32]
  })

  const riderIcon = L.icon({
    iconUrl: riderSvg,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -32]
  })

  L.marker([driverPoint.lat, driverPoint.lng], { icon: driverIcon })
    .addTo(map)
    .bindPopup(routePoints.fromLabel)
  L.marker([riderPoint.lat, riderPoint.lng], { icon: riderIcon })
    .addTo(map)
    .bindPopup(routePoints.toLabel)

  // OSRM supplies the actual road geometry, including turns and bends.
  renderRealRoute(map, trip, driverPoint, riderPoint)

}

// 3. Decline/Reject Ride
const rejectRide = async (bookingId) => {
  try {
    const response = await api.put(`/driver/reject-ride/${bookingId}`)
    if (response.data?.success) {
      Notify.create({ type: 'info', message: 'Ride request declined.' })

      // Destroy map instance if created
      safeRemoveMap(bookingId)
      if (acceptedRide.value?.id === bookingId) {
        safeRemoveMap('current-accepted')
      }

      upcomingTrips.value = upcomingTrips.value.filter(trip => trip.id !== bookingId)
    }
  } catch (error) {
    console.error('Error rejecting ride:', error)
    Notify.create({
      type: 'negative',
      message: error.response?.data?.message || 'Failed to reject ride.'
    })
  }
}

// 4. Open External Google Maps Application
const openExternalNavigation = (trip) => {

  const rLat = trip.rider?.latitude || trip.latitude_to
  const rLng = trip.rider?.longitude || trip.longitude_to
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${rLat},${rLng}&travelmode=driving`, '_blank')
}

// 5. OTP Handlers & Ride Start
const openOtpModal = (trip) => {
  selectedTrip.value = trip
  otpInput.value = ''
  showOtpModal.value = true
}

const verifyOtpAndStart = async () => {
  if (!otpInput.value || otpInput.value.trim().length < 4) {
    Notify.create({ type: 'warning', message: 'Please enter a valid OTP' })
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
      const apiStatus = response.data?.data?.status || response.data?.status
      selectedTrip.value.status = isRideStarted({ status: apiStatus }) ? apiStatus : 'started'

      Notify.create({ type: 'positive', message: 'OTP verified! Ride started successfully.' })
      showOtpModal.value = false
      await trackRide()
      await nextTick()
      initPickupMap(selectedTrip.value, 'current-accepted')
      await fetchUpcoming()
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
      message: error.response?.data?.message || 'Verification failed.'
    })
  } finally {
    isVerifying.value = false
  }
}

const completeRide = async (trip) => {
  if (!trip?.id) return

  try {
    const response = await api.put(`/driver/complete-ride/${trip.id}`, {
      booking_id: trip.id
    })

    if (response.data?.success || response.status === 200) {
      trip.status = response.data?.data?.status || response.data?.status || 'completed'
      Notify.create({ type: 'positive', message: 'Ride completed successfully.' })
      await fetchUpcoming()
    } else {
      Notify.create({
        type: 'negative',
        message: response.data?.message || 'Unable to complete ride.'
      })
    }
  } catch (error) {
    console.error('Error completing ride:', error)
    Notify.create({
      type: 'negative',
      message: error.response?.data?.message || 'Unable to complete ride.'
    })
  }
}

/* =========================================================
   DRIVER ONLINE STATUS TOGGLE
========================================================= */
const changeDriverStatus = async (status) => {
  // If attempting to go online, enforce verification and subscription
  if (status && !canTakeRides.value) {
    driver.value.isOnline = false
    if (!isVerified.value) {
      $q.dialog({
        title: 'Verification In Progress',
        message: 'You cannot go online until your uploaded documents are verified and approved by the admin team.',
        ok: 'Check Verification Status',
        cancel: 'Close'
      }).onOk(() => {
        router.push({ name: 'DriverVerification' })
      })
      return
    }
    if (!isSubscribed.value) {
      $q.dialog({
        title: 'Subscription Required',
        message: 'You must have an active driver subscription pass to go online.',
        ok: 'View Plans',
        cancel: 'Close'
      }).onOk(() => {
        router.push({ name: 'DriverSubscription' })
      })
      return
    }
  }

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
   NORMALIZATION UTILITIES
========================================================= */
const normalizeDriver = (driverData) => {
  if (!driverData) return {}
  const fullName = [driverData.first_name, driverData.last_name].filter(Boolean).join(' ')
  return {
    id: driverData.id,
    name: fullName || driverData.name || driverData.user?.username || 'Driver',
    mobile: driverData.mobile_number || driverData.mobile || driverData.user?.mobile_no || '',
    email: driverData.email || driverData.user?.email || '',
    image: driverData.profile_image || driverData.image || '',
    isOnline: driverData.availability_status === 'online' || driverData.isOnline === true || driverData.is_online === true,
    licenseExpiry: driverData.license_expiry_date || driverData.licenseExpiry || '',
    vehicleId: driverData.vehicle?.id || driverData.vehicleId || null,
    vehicleName: driverData.vehicle?.vehicle_name || driverData.vehicleName || '',
    vehicleType: driverData.vehicle?.fuel_type || driverData.vehicleType || '',
    vehicleRegistration: driverData.vehicle?.registration_no || driverData.vehicleRegistration || ''
  }
}

const normalizeTrip = (trip) => {
  if (!trip) return null
  return {
    ...trip,
    id: trip.id,
    bookingId: trip.bookingId || trip.booking_id || trip.booking?.id || trip.id,
    customerName: trip.customerName || trip.customer?.name || trip.user?.name || '',
    pickupLocation: trip.pickupLocation || trip.pickup_location || trip.pickupAddress || trip.from || '',
    dropLocation: trip.dropLocation || trip.drop_location || trip.dropAddress || trip.to || '',
    tripDate: trip.tripDate || trip.trip_date || trip.date || '',
    pickupTime: trip.pickupTime || trip.pickup_time || trip.time || '',
    status: trip.status || 'Assigned',
    earning: toNumber(trip.earning, trip.driverEarning, trip.driver_earning, trip.amount, trip.fare),
    fare: toNumber(trip.fare, trip.price, trip.amount, trip.total_amount),
    distance: trip.distance || trip.trip_distance || '',
    latitude_from: trip.latitude_from ?? trip.pickup_latitude ?? trip.from_latitude,
    longitude_from: trip.longitude_from ?? trip.pickup_longitude ?? trip.from_longitude,
    latitude_to: trip.latitude_to ?? trip.drop_latitude ?? trip.to_latitude,
    longitude_to: trip.longitude_to ?? trip.drop_longitude ?? trip.to_longitude,
    pickupMetrics: trip.pickupMetrics || null,
    driver: trip.driver || null,
    rider: trip.rider || trip.customer || null
  }
}

const toNumber = (...values) => {
  const value = values.find(item => item !== undefined && item !== null && item !== '')
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}

const getCoordinates = (point, fallbackLatitude, fallbackLongitude) => {
  const latitude = Number(point?.latitude ?? point?.lat ?? fallbackLatitude)
  const longitude = Number(point?.longitude ?? point?.lng ?? fallbackLongitude)

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null
  return { lat: latitude, lng: longitude }
}

const getRideRoutePoints = (trip) => {
  const driverPoint = getCoordinates(
    trip.driver,
    trip.driver_latitude ?? trip.driver_lat ?? trip.latitude_driver ?? trip.driverLatitude,
    trip.driver_longitude ?? trip.driver_lng ?? trip.longitude_driver ?? trip.driverLongitude
  )

  const pickupPoint = getCoordinates(
    trip.rider,
    trip.latitude_from ?? trip.rider_latitude ?? trip.pickup_latitude ?? trip.riderLatitude,
    trip.longitude_from ?? trip.rider_longitude ?? trip.pickup_longitude ?? trip.riderLongitude
  )

  const dropPoint = getCoordinates(
    trip.drop || trip.destination,
    trip.latitude_to ?? trip.drop_latitude ?? trip.to_latitude,
    trip.longitude_to ?? trip.drop_longitude ?? trip.to_longitude
  )

  if (String(trip?.status || '').toLowerCase() === 'confirmed' && pickupPoint && dropPoint) {
    return {
      from: pickupPoint,
      to: dropPoint,
      fromLabel: 'Pickup Location',
      toLabel: 'Destination'
    }
  }

  return {
    from: driverPoint || pickupPoint,
    to: pickupPoint || driverPoint,
    fromLabel: 'Your Location (Driver)',
    toLabel: 'Rider Pickup Location'
  }
}

const createFallbackMetrics = (from, to) => {
  const distance = haversineDistance(from, to)
  const duration = Math.max(1, Math.round((distance / 30) * 60))
  return {
    distance: `${distance.toFixed(2)} km approx.`,
    duration: `${duration} mins approx.`
  }
}

const haversineDistance = (from, to) => {
  const earthRadius = 6371
  const latitudeDifference = ((to.lat - from.lat) * Math.PI) / 180
  const longitudeDifference = ((to.lng - from.lng) * Math.PI) / 180
  const latitudeOne = (from.lat * Math.PI) / 180
  const latitudeTwo = (to.lat * Math.PI) / 180
  const value = Math.sin(latitudeDifference / 2) ** 2
    + Math.cos(latitudeOne) * Math.cos(latitudeTwo) * Math.sin(longitudeDifference / 2) ** 2
  return earthRadius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value))
}

const renderRealRoute = async (map, trip, from, to) => {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`
    )
    const data = await response.json()
    const route = data.routes?.[0]

    if (!route?.geometry?.coordinates?.length) {
      throw new Error('OSRM returned no route geometry')
    }

    const routeCoordinates = route.geometry.coordinates.map(([longitude, latitude]) => [latitude, longitude])
    const routeLine = L.polyline(routeCoordinates, {
      color: '#1565C0',
      weight: 6,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map)

    map.fitBounds(routeLine.getBounds(), { padding: [36, 36] })
    trip.pickupMetrics = {
      distance: `${(route.distance / 1000).toFixed(2)} km`,
      duration: `${Math.max(1, Math.round(route.duration / 60))} mins`
    }
    trip.routeError = ''
  } catch (error) {
    console.warn('Unable to render the real road route.', error)
    trip.routeError = 'Road route unavailable. Check your map connection.'
  }
}

const loadAddressDetails = async (trip, driverPoint, riderPoint) => {
  const [driverAddress, riderAddress] = await Promise.all([
    reverseGeocode(driverPoint),
    reverseGeocode(riderPoint)
  ])

  trip.driverAddress = driverAddress
  trip.riderAddress = riderAddress
}

const reverseGeocode = async (point) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${point.lat}&lon=${point.lng}`
    )
    const data = await response.json()
    return data.display_name || ''
  } catch (error) {
    console.warn('Unable to reverse geocode location.', error)
    return ''
  }
}

/* =========================================================
   NAVIGATION & FORMATTERS
========================================================= */
const viewTrip = trip => trip?.id && router.push({ name: 'DriverTripDetails', params: { id: trip.id } })
const goToAssignedTrips = () => router.push({ name: 'DriverAssignedTrips' })
const goToEarnings = () => router.push({ name: 'DriverEarnings' })
const goToTripHistory = () => router.push({ name: 'DriverTripHistory' })
const goToProfile = () => router.push({ name: 'DriverProfile' })
const openNotifications = () => { notificationDialog.value = true }

const formatCoordinates = (point) => {
  const coordinates = getCoordinates(point)
  return coordinates ? `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}` : 'Location unavailable'
}

const getInitials = (name) => name ? name.split(' ').filter(Boolean).map(w => w.charAt(0)).join('').substring(0, 2).toUpperCase() : 'D'
const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(amount || 0))
const formatDate = (date) => date && !Number.isNaN(new Date(date).getTime()) ? new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'
const formatDateTime = (date) => date && !Number.isNaN(new Date(date).getTime()) ? new Date(date).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'

/* =========================================================
   LIFECYCLE HOOKS
========================================================= */
onMounted(async () => {
  if (typeof window !== 'undefined') {
    window.L = L
    await import('leaflet-routing-machine')
  }
  startTracking()
  loadDashboard()
  fetchUpcoming()
})

// Memory leak prevention: Clean up active Leaflet map instances on unmount
onUnmounted(() => {
  Object.keys(mapInstances).forEach((key) => {
    safeRemoveMap(key)
  })
})
</script>
<style scoped>

/* =========================================================
   PAGE
========================================================= */

.driver-dashboard {

  background: #f4f7fb;

  min-height: 100%;

  color: #172033;

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
   RIDE REQUESTS
========================================================= */

.active-ride-card {

  overflow: hidden;

  background: #ffffff;

  border: 1px solid #cfe2d7;

  border-radius: 16px;

  box-shadow: 0 14px 32px rgba(26, 93, 56, 0.1);

}


.active-ride-header {

  background: linear-gradient(135deg, #f2fbf5 0%, #ffffff 72%);

}


.active-ride-map {

  width: 100%;

  height: 330px;

  background: #e7eef5;

  border-top: 1px solid #e2ebe5;

  border-bottom: 1px solid #e2ebe5;

}


.active-ride-details {

  background: #fbfdfb;

}


.location-pill {

  display: flex;

  align-items: center;

  min-height: 52px;

  padding: 8px 10px;

  background: #ffffff;

  border: 1px solid #e4ebe6;

  border-radius: 9px;

}


.active-ride-actions {

  padding: 12px 16px 16px;

}

.ride-requests-card {

  overflow: hidden;

  background: #ffffff;

  border: 1px solid #e5eaf2;

  border-radius: 16px;

  box-shadow: 0 12px 30px rgba(26, 43, 72, 0.06);

}


.ride-request {

  background: #ffffff;

  transition: background 0.2s ease;

}


.ride-request:hover {

  background: #fbfcfe;

}


.accepted-route {

  overflow: hidden;

  padding: 10px;

  background: #f7faff;

  border: 1px solid #dbe8fa;

  border-radius: 12px;

}


.route-summary {

  min-height: 38px;

  background: #eaf3ff;

  border-radius: 8px;

}


.pickup-map {

  width: 100%;

  height: 260px;

  overflow: hidden;

  background: #e7eef5;

  border: 1px solid #d9e1eb;

  border-radius: 10px;

}


.route-help {

  display: flex;

  align-items: center;

}


.trip-actions {

  gap: 12px;

  background: #f7f9fc;

  border: 1px solid #e7ebf1;

  border-radius: 10px;

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


  .pickup-map {

    height: 220px;

  }


  .active-ride-map {

    height: 250px;

  }


  .trip-actions {

    align-items: stretch;

    flex-direction: column;

  }


  .trip-actions > div {

    justify-content: flex-end;

    width: 100%;

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
