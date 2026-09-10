<template>
  <q-page class="trip-details-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div class="row items-center">

        <q-btn
          flat
          round
          icon="arrow_back"
          color="grey-8"
          class="q-mr-sm"
          @click="goBack"
        >
          <q-tooltip>
            Back
          </q-tooltip>
        </q-btn>

        <div>
          <div class="text-h5 text-weight-bold">
            Trip Details
          </div>

          <div class="text-grey-7 q-mt-xs">
            Booking {{ trip.bookingNumber }}
          </div>
        </div>

      </div>


      <!-- Status -->
      <q-badge
        :color="statusColor(trip.status)"
        class="status-badge"
      >
        {{ formatStatus(trip.status) }}
      </q-badge>

    </div>


    <!-- =====================================================
         TOP SUMMARY
    ====================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- Date -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="summary-card">

          <q-card-section class="row items-center">

            <q-avatar
              color="blue-1"
              text-color="primary"
              size="45px"
            >
              <q-icon
                name="event"
                size="24px"
              />
            </q-avatar>

            <div class="q-ml-md">

              <div class="text-caption text-grey-6">
                Trip Date
              </div>

              <div class="text-body1 text-weight-bold">
                {{ formatDate(trip.date) }}
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Time -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="summary-card">

          <q-card-section class="row items-center">

            <q-avatar
              color="orange-1"
              text-color="orange"
              size="45px"
            >
              <q-icon
                name="schedule"
                size="24px"
              />
            </q-avatar>

            <div class="q-ml-md">

              <div class="text-caption text-grey-6">
                Pickup Time
              </div>

              <div class="text-body1 text-weight-bold">
                {{ trip.time }}
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Distance -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="summary-card">

          <q-card-section class="row items-center">

            <q-avatar
              color="green-1"
              text-color="positive"
              size="45px"
            >
              <q-icon
                name="straighten"
                size="24px"
              />
            </q-avatar>

            <div class="q-ml-md">

              <div class="text-caption text-grey-6">
                Distance
              </div>

              <div class="text-body1 text-weight-bold">
                {{ trip.distance }}
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Earnings -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="summary-card">

          <q-card-section class="row items-center">

            <q-avatar
              color="purple-1"
              text-color="purple"
              size="45px"
            >
              <q-icon
                name="payments"
                size="24px"
              />
            </q-avatar>

            <div class="q-ml-md">

              <div class="text-caption text-grey-6">
                Your Earnings
              </div>

              <div class="text-body1 text-weight-bold text-primary">
                ₹{{ trip.driverEarnings }}
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         MAIN CONTENT
    ====================================================== -->
    <div class="row q-col-gutter-lg">


      <!-- ===================================================
           LEFT COLUMN
      ==================================================== -->
      <div class="col-12 col-lg-8">


        <!-- =================================================
             ROUTE CARD
        ================================================== -->
        <q-card class="content-card q-mb-lg">

          <q-card-section>

            <div class="section-title">
              <q-icon
                name="route"
                color="primary"
                class="q-mr-sm"
              />

              Trip Route
            </div>

          </q-card-section>

          <q-separator />


          <q-card-section>

            <!-- Pickup -->
            <div class="location-row">

              <div class="location-marker pickup-marker">

                <q-icon
                  name="radio_button_checked"
                  size="20px"
                />

              </div>

              <div class="location-info">

                <div class="text-caption text-grey-6">
                  Pickup Location
                </div>

                <div class="text-body1 text-weight-bold">
                  {{ trip.pickup }}
                </div>

                <div
                  v-if="trip.pickupLandmark"
                  class="text-caption text-grey-6 q-mt-xs"
                >
                  {{ trip.pickupLandmark }}
                </div>

              </div>

            </div>


            <!-- Route Line -->
            <div class="location-line">
              <div class="route-line"></div>
            </div>


            <!-- Drop -->
            <div class="location-row">

              <div class="location-marker drop-marker">

                <q-icon
                  name="location_on"
                  size="21px"
                />

              </div>

              <div class="location-info">

                <div class="text-caption text-grey-6">
                  Drop-off Location
                </div>

                <div class="text-body1 text-weight-bold">
                  {{ trip.drop }}
                </div>

                <div
                  v-if="trip.dropLandmark"
                  class="text-caption text-grey-6 q-mt-xs"
                >
                  {{ trip.dropLandmark }}
                </div>

              </div>

            </div>

          </q-card-section>


          <!-- Navigation Button -->
          <q-card-actions class="q-pa-md">

            <q-btn
              outline
              color="primary"
              icon="navigation"
              label="Navigate to Pickup"
              @click="navigateToPickup"
            />

            <q-btn
              outline
              color="secondary"
              icon="map"
              label="View Route"
              @click="viewRoute"
            />

          </q-card-actions>

        </q-card>


        <!-- =================================================
             CUSTOMER CARD
        ================================================== -->
        <q-card class="content-card q-mb-lg">

          <q-card-section>

            <div class="section-title">

              <q-icon
                name="person"
                color="primary"
                class="q-mr-sm"
              />

              Customer Information

            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div class="row items-center">

              <q-avatar
                size="60px"
                color="primary"
                text-color="white"
              >
                <q-icon
                  name="person"
                  size="32px"
                />
              </q-avatar>


              <div class="q-ml-md">

                <div class="text-h6 text-weight-bold">
                  {{ trip.customer.name }}
                </div>

                <div class="text-caption text-grey-6">
                  Customer
                </div>

              </div>


              <q-space />


              <div class="row q-gutter-sm">

                <q-btn
                  round
                  outline
                  color="positive"
                  icon="phone"
                  @click="callCustomer"
                >
                  <q-tooltip>
                    Call Customer
                  </q-tooltip>
                </q-btn>


                <q-btn
                  round
                  outline
                  color="primary"
                  icon="message"
                  @click="messageCustomer"
                >
                  <q-tooltip>
                    Message Customer
                  </q-tooltip>
                </q-btn>

              </div>

            </div>


            <q-separator class="q-my-md" />


            <div class="row q-col-gutter-md">

              <div class="col-12 col-sm-6">

                <div class="info-item">

                  <q-icon
                    name="phone"
                    color="grey-7"
                  />

                  <div class="q-ml-sm">

                    <div class="text-caption text-grey-6">
                      Phone
                    </div>

                    <div class="text-body2">
                      {{ trip.customer.phone }}
                    </div>

                  </div>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="info-item">

                  <q-icon
                    name="email"
                    color="grey-7"
                  />

                  <div class="q-ml-sm">

                    <div class="text-caption text-grey-6">
                      Email
                    </div>

                    <div class="text-body2">
                      {{ trip.customer.email }}
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- =================================================
             VEHICLE CARD
        ================================================== -->
        <q-card class="content-card q-mb-lg">

          <q-card-section>

            <div class="section-title">

              <q-icon
                name="directions_car"
                color="primary"
                class="q-mr-sm"
              />

              Vehicle Information

            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div class="row items-center">

              <q-avatar
                size="60px"
                color="blue-1"
                text-color="primary"
              >
                <q-icon
                  name="directions_car"
                  size="32px"
                />
              </q-avatar>


              <div class="q-ml-md">

                <div class="text-h6 text-weight-bold">
                  {{ trip.vehicle.name }}
                </div>

                <div class="text-caption text-grey-6">
                  {{ trip.vehicle.number }}
                </div>

              </div>

            </div>


            <q-separator class="q-my-md" />


            <div class="row q-col-gutter-md">

              <div class="col-6 col-sm-3">

                <div class="vehicle-info">

                  <div class="text-caption text-grey-6">
                    Type
                  </div>

                  <div class="text-body2 text-weight-medium">
                    {{ trip.vehicle.type }}
                  </div>

                </div>

              </div>


              <div class="col-6 col-sm-3">

                <div class="vehicle-info">

                  <div class="text-caption text-grey-6">
                    Model
                  </div>

                  <div class="text-body2 text-weight-medium">
                    {{ trip.vehicle.model }}
                  </div>

                </div>

              </div>


              <div class="col-6 col-sm-3">

                <div class="vehicle-info">

                  <div class="text-caption text-grey-6">
                    Seats
                  </div>

                  <div class="text-body2 text-weight-medium">
                    {{ trip.vehicle.seats }}
                  </div>

                </div>

              </div>


              <div class="col-6 col-sm-3">

                <div class="vehicle-info">

                  <div class="text-caption text-grey-6">
                    Fuel
                  </div>

                  <div class="text-body2 text-weight-medium">
                    {{ trip.vehicle.fuel }}
                  </div>

                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- =================================================
             TRIP TIMELINE
        ================================================== -->
        <q-card class="content-card">

          <q-card-section>

            <div class="section-title">

              <q-icon
                name="timeline"
                color="primary"
                class="q-mr-sm"
              />

              Trip Timeline

            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <q-timeline color="primary">

              <q-timeline-entry
                title="Booking Assigned"
                :subtitle="trip.timeline.assigned"
                icon="assignment"
              >
                Trip was assigned to you.
              </q-timeline-entry>


              <q-timeline-entry
                title="Trip Accepted"
                :subtitle="trip.timeline.accepted"
                icon="check"
                :color="
                  trip.timeline.accepted
                    ? 'positive'
                    : 'grey'
                "
              >
                You accepted this trip.
              </q-timeline-entry>


              <q-timeline-entry
                title="Trip Started"
                :subtitle="trip.timeline.started || 'Not started'"
                icon="play_arrow"
                :color="
                  trip.timeline.started
                    ? 'positive'
                    : 'grey'
                "
              >
                Trip started from the pickup location.
              </q-timeline-entry>


              <q-timeline-entry
                title="Trip Completed"
                :subtitle="trip.timeline.completed || 'Not completed'"
                icon="flag"
                :color="
                  trip.timeline.completed
                    ? 'positive'
                    : 'grey'
                "
              >
                Trip destination reached.
              </q-timeline-entry>

            </q-timeline>

          </q-card-section>

        </q-card>

      </div>


      <!-- ===================================================
           RIGHT COLUMN
      ==================================================== -->
      <div class="col-12 col-lg-4">


        <!-- =================================================
             BOOKING SUMMARY
        ================================================== -->
        <q-card class="content-card q-mb-lg">

          <q-card-section>

            <div class="section-title">
              Booking Summary
            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div class="summary-row">

              <span class="text-grey-7">
                Booking ID
              </span>

              <strong>
                {{ trip.bookingNumber }}
              </strong>

            </div>


            <div class="summary-row">

              <span class="text-grey-7">
                Trip Date
              </span>

              <strong>
                {{ formatDate(trip.date) }}
              </strong>

            </div>


            <div class="summary-row">

              <span class="text-grey-7">
                Pickup Time
              </span>

              <strong>
                {{ trip.time }}
              </strong>

            </div>


            <div class="summary-row">

              <span class="text-grey-7">
                Distance
              </span>

              <strong>
                {{ trip.distance }}
              </strong>

            </div>


            <div class="summary-row">

              <span class="text-grey-7">
                Payment Method
              </span>

              <strong>
                {{ trip.paymentMethod }}
              </strong>

            </div>


            <q-separator class="q-my-md" />


            <div class="summary-row">

              <span class="text-grey-7">
                Trip Fare
              </span>

              <strong>
                ₹{{ trip.fare }}
              </strong>

            </div>


            <div class="summary-row">

              <span class="text-grey-7">
                Platform Fee
              </span>

              <strong class="text-negative">
                - ₹{{ trip.platformFee }}
              </strong>

            </div>


            <q-separator class="q-my-md" />


            <div class="summary-row total-row">

              <span>
                Your Earnings
              </span>

              <strong class="text-primary">
                ₹{{ trip.driverEarnings }}
              </strong>

            </div>

          </q-card-section>

        </q-card>


        <!-- =================================================
             PAYMENT STATUS
        ================================================== -->
        <q-card class="content-card q-mb-lg">

          <q-card-section>

            <div class="section-title">
              Payment
            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div class="row items-center">

              <q-avatar
                size="44px"
                color="green-1"
                text-color="positive"
              >
                <q-icon name="payments" />
              </q-avatar>

              <div class="q-ml-md">

                <div class="text-body1 text-weight-bold">
                  ₹{{ trip.fare }}
                </div>

                <div class="text-caption text-grey-6">
                  {{ trip.paymentMethod }}
                </div>

              </div>


              <q-space />


              <q-badge
                :color="
                  trip.paymentStatus === 'Paid'
                    ? 'positive'
                    : 'orange'
                "
              >
                {{ trip.paymentStatus }}
              </q-badge>

            </div>

          </q-card-section>

        </q-card>


        <!-- =================================================
             ACTIONS
        ================================================== -->
        <q-card class="content-card">

          <q-card-section>

            <div class="section-title q-mb-md">
              Trip Actions
            </div>


            <!-- Pending -->
            <q-btn
              v-if="trip.status === 'pending'"
              unelevated
              color="primary"
              icon="check"
              label="Accept Trip"
              class="full-width q-mb-sm"
              @click="acceptTrip"
            />


            <!-- Accepted -->
            <q-btn
              v-if="trip.status === 'accepted'"
              unelevated
              color="positive"
              icon="play_arrow"
              label="Start Trip"
              class="full-width q-mb-sm"
              @click="startTrip"
            />


            <!-- Started -->
            <q-btn
              v-if="trip.status === 'started'"
              unelevated
              color="positive"
              icon="check_circle"
              label="Complete Trip"
              class="full-width q-mb-sm"
              @click="completeTrip"
            />


            <!-- Call -->
            <q-btn
              outline
              color="positive"
              icon="phone"
              label="Call Customer"
              class="full-width q-mb-sm"
              @click="callCustomer"
            />


            <!-- Navigate -->
            <q-btn
              outline
              color="primary"
              icon="navigation"
              label="Navigate"
              class="full-width"
              @click="navigateToPickup"
            />

          </q-card-section>

        </q-card>

      </div>

    </div>

  </q-page>
</template>


<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()


// =====================================================
// TRIP DATA
// Replace with API data
// =====================================================

const trip = ref({

  id: 1,

  bookingNumber: 'BK-1002',

  date: '2026-08-27',

  time: '01:00 PM',

  status: 'accepted',

  pickup: 'Boring Road, Patna',

  pickupLandmark: 'Near P&M Mall',

  drop: 'Danapur Railway Station',

  dropLandmark: 'Main Gate',

  distance: '24 KM',

  fare: 1200,

  platformFee: 120,

  driverEarnings: 1080,

  paymentMethod: 'UPI',

  paymentStatus: 'Paid',


  customer: {

    name: 'Amit Singh',

    phone: '+91 91234 56789',

    email: 'amit@example.com'

  },


  vehicle: {

    name: 'Toyota Etios',

    number: 'BR01CD5678',

    type: 'Sedan',

    model: 'Etios 2024',

    seats: '4 Seats',

    fuel: 'Petrol'

  },


  timeline: {

    assigned: '27 Aug 2026, 10:30 AM',

    accepted: '27 Aug 2026, 10:45 AM',

    started: null,

    completed: null

  }

})


// =====================================================
// HELPERS
// =====================================================

function formatDate(date) {

  if (!date) return ''

  return new Date(date).toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  )

}


function formatStatus(status) {

  const statusMap = {

    pending: 'Pending',

    accepted: 'Accepted',

    started: 'In Progress',

    completed: 'Completed',

    cancelled: 'Cancelled'

  }

  return statusMap[status] || status

}


function statusColor(status) {

  const colors = {

    pending: 'orange',

    accepted: 'primary',

    started: 'positive',

    completed: 'positive',

    cancelled: 'negative'

  }

  return colors[status] || 'grey'

}


// =====================================================
// BACK
// =====================================================

function goBack() {

  router.back()

}


// =====================================================
// ACCEPT TRIP
// =====================================================

function acceptTrip() {

  $q.dialog({

    title: 'Accept Trip',

    message:
      `Do you want to accept ${trip.value.bookingNumber}?`,

    cancel: true,

    persistent: true

  }).onOk(() => {

    trip.value.status = 'accepted'

    trip.value.timeline.accepted =
      new Date().toLocaleString('en-IN')

    $q.notify({

      type: 'positive',

      message: 'Trip accepted successfully',

      position: 'top-right'

    })

  })

}


// =====================================================
// START TRIP
// =====================================================

function startTrip() {

  $q.dialog({

    title: 'Start Trip',

    message:
      'Are you ready to start this trip?',

    cancel: true,

    persistent: true

  }).onOk(() => {

    trip.value.status = 'started'

    trip.value.timeline.started =
      new Date().toLocaleString('en-IN')

    $q.notify({

      type: 'positive',

      message: 'Trip started successfully',

      position: 'top-right'

    })

  })

}


// =====================================================
// COMPLETE TRIP
// =====================================================

function completeTrip() {

  $q.dialog({

    title: 'Complete Trip',

    message:
      'Do you want to mark this trip as completed?',

    cancel: true,

    persistent: true

  }).onOk(() => {

    trip.value.status = 'completed'

    trip.value.timeline.completed =
      new Date().toLocaleString('en-IN')

    $q.notify({

      type: 'positive',

      message: 'Trip completed successfully',

      position: 'top-right'

    })

  })

}


// =====================================================
// CALL CUSTOMER
// =====================================================

function callCustomer() {

  window.location.href =
    `tel:${trip.value.customer.phone}`

}


// =====================================================
// MESSAGE CUSTOMER
// =====================================================

function messageCustomer() {

  window.location.href =
    `sms:${trip.value.customer.phone}`

}


// =====================================================
// NAVIGATE
// =====================================================

function navigateToPickup() {

  const address = encodeURIComponent(
    trip.value.pickup
  )

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${address}`,
    '_blank'
  )

}


// =====================================================
// VIEW ROUTE
// =====================================================

function viewRoute() {

  const pickup = encodeURIComponent(
    trip.value.pickup
  )

  const drop = encodeURIComponent(
    trip.value.drop
  )

  window.open(
    `https://www.google.com/maps/dir/?api=1&origin=${pickup}&destination=${drop}`,
    '_blank'
  )

}

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.trip-details-page {
  min-height: 100vh;
  background: #f6f8fb;
}


/* =====================================================
   SUMMARY
===================================================== */

.summary-card {

  border-radius: 14px;

  border: 1px solid #e7eaf0;

  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.04);

}


/* =====================================================
   CONTENT CARD
===================================================== */

.content-card {

  border-radius: 16px;

  border: 1px solid #e7eaf0;

  box-shadow:
    0 3px 14px rgba(0, 0, 0, 0.05);

}


.section-title {

  display: flex;

  align-items: center;

  font-size: 17px;

  font-weight: 700;

}


/* =====================================================
   STATUS
===================================================== */

.status-badge {

  padding: 8px 14px;

  border-radius: 20px;

  font-size: 13px;

}


/* =====================================================
   LOCATION
===================================================== */

.location-row {

  display: flex;

  align-items: flex-start;

}


.location-marker {

  width: 34px;

  height: 34px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

}


.pickup-marker {

  background: #e8f1ff;

  color: #1976d2;

}


.drop-marker {

  background: #ffebee;

  color: #e53935;

}


.location-info {

  margin-left: 14px;

  flex: 1;

}


.location-line {

  height: 42px;

  margin-left: 16px;

  display: flex;

  align-items: center;

}


.route-line {

  height: 100%;

  border-left: 2px dashed #cfd4da;

}


/* =====================================================
   INFO
===================================================== */

.info-item {

  display: flex;

  align-items: center;

  padding: 12px;

  background: #f8f9fb;

  border-radius: 10px;

}


.vehicle-info {

  padding: 12px;

  background: #f8f9fb;

  border-radius: 10px;

}


/* =====================================================
   SUMMARY
===================================================== */

.summary-row {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 10px 0;

}


.total-row {

  font-size: 17px;

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 600px) {

  .trip-details-page {

    padding: 12px !important;

  }


  .content-card {

    border-radius: 12px;

  }


  .summary-card {

    border-radius: 12px;

  }


  .status-badge {

    padding: 6px 10px;

  }

}

</style>
