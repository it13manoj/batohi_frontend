<template>
  <q-page class="assigned-trip-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Assigned Trips
        </div>

        <div class="text-grey-7 q-mt-xs">
          Manage your assigned vehicle trips and bookings
        </div>
      </div>

      <q-btn
        unelevated
        color="primary"
        icon="refresh"
        label="Refresh"
        @click="refreshTrips"
      />
    </div>


    <!-- =====================================================
         SUMMARY CARDS
    ====================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- Total -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="summary-card">
          <q-card-section class="row items-center">

            <q-avatar
              color="blue-1"
              text-color="primary"
              size="48px"
            >
              <q-icon name="route" size="26px" />
            </q-avatar>

            <div class="q-ml-md">
              <div class="text-caption text-grey-7">
                Total Trips
              </div>

              <div class="text-h5 text-weight-bold">
                {{ trips.length }}
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>


      <!-- Pending -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="summary-card">
          <q-card-section class="row items-center">

            <q-avatar
              color="orange-1"
              text-color="orange"
              size="48px"
            >
              <q-icon name="schedule" size="26px" />
            </q-avatar>

            <div class="q-ml-md">
              <div class="text-caption text-grey-7">
                Pending
              </div>

              <div class="text-h5 text-weight-bold">
                {{ pendingTrips }}
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>


      <!-- Active -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="summary-card">
          <q-card-section class="row items-center">

            <q-avatar
              color="green-1"
              text-color="positive"
              size="48px"
            >
              <q-icon name="directions_car" size="26px" />
            </q-avatar>

            <div class="q-ml-md">
              <div class="text-caption text-grey-7">
                Active
              </div>

              <div class="text-h5 text-weight-bold">
                {{ activeTrips }}
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>


      <!-- Completed -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="summary-card">
          <q-card-section class="row items-center">

            <q-avatar
              color="purple-1"
              text-color="purple"
              size="48px"
            >
              <q-icon name="check_circle" size="26px" />
            </q-avatar>

            <div class="q-ml-md">
              <div class="text-caption text-grey-7">
                Completed
              </div>

              <div class="text-h5 text-weight-bold">
                {{ completedTrips }}
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>

    </div>


    <!-- =====================================================
         FILTER SECTION
    ====================================================== -->
    <q-card class="filter-card q-mb-lg">
      <q-card-section>

        <div class="row q-col-gutter-md items-center">

          <!-- Search -->
          <div class="col-12 col-md-5">

            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search booking, customer or location..."
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>

          </div>


          <!-- Status -->
          <div class="col-12 col-md-3">

            <q-select
              v-model="statusFilter"
              outlined
              dense
              emit-value
              map-options
              :options="statusOptions"
              label="Trip Status"
            />

          </div>


          <!-- Date -->
          <div class="col-12 col-md-3">

            <q-input
              v-model="dateFilter"
              outlined
              dense
              type="date"
              label="Trip Date"
            />

          </div>


          <!-- Reset -->
          <div class="col-12 col-md-1">

            <q-btn
              flat
              round
              color="grey-7"
              icon="filter_alt_off"
              @click="resetFilters"
            >
              <q-tooltip>
                Reset Filters
              </q-tooltip>
            </q-btn>

          </div>

        </div>

      </q-card-section>
    </q-card>


    <!-- =====================================================
         TRIP LIST
    ====================================================== -->
    <div class="row q-col-gutter-md">

      <div
        v-for="trip in filteredTrips"
        :key="trip.id"
        class="col-12 col-lg-6"
      >

        <q-card class="trip-card">

          <!-- Card Header -->
          <q-card-section>

            <div class="row items-center justify-between">

              <div class="row items-center">

                <q-avatar
                  color="primary"
                  text-color="white"
                  size="44px"
                >
                  <q-icon name="directions_car" />
                </q-avatar>

                <div class="q-ml-md">

                  <div class="text-subtitle1 text-weight-bold">
                    {{ trip.bookingNumber }}
                  </div>

                  <div class="text-caption text-grey-7">
                    {{ formatDate(trip.date) }} • {{ trip.time }}
                  </div>

                </div>

              </div>


              <q-badge
                :color="statusColor(trip.status)"
                class="status-badge"
              >
                {{ formatStatus(trip.status) }}
              </q-badge>

            </div>

          </q-card-section>


          <q-separator />


          <!-- Locations -->
          <q-card-section>

            <div class="location-row">

              <div class="location-icon pickup">
                <q-icon name="radio_button_checked" />
              </div>

              <div class="location-content">
                <div class="text-caption text-grey-6">
                  Pickup
                </div>

                <div class="text-body2 text-weight-medium">
                  {{ trip.pickup }}
                </div>
              </div>

            </div>


            <div class="route-line"></div>


            <div class="location-row">

              <div class="location-icon drop">
                <q-icon name="location_on" />
              </div>

              <div class="location-content">
                <div class="text-caption text-grey-6">
                  Drop-off
                </div>

                <div class="text-body2 text-weight-medium">
                  {{ trip.drop }}
                </div>
              </div>

            </div>

          </q-card-section>


          <q-separator />


          <!-- Customer / Vehicle -->
          <q-card-section>

            <div class="row q-col-gutter-md">

              <!-- Customer -->
              <div class="col-12 col-sm-6">

                <div class="text-caption text-grey-6">
                  Customer
                </div>

                <div class="row items-center q-mt-xs">

                  <q-avatar
                    size="34px"
                    color="grey-3"
                    text-color="grey-8"
                  >
                    <q-icon name="person" />
                  </q-avatar>

                  <div class="q-ml-sm">

                    <div class="text-body2 text-weight-medium">
                      {{ trip.customer.name }}
                    </div>

                    <div class="text-caption text-grey-6">
                      {{ trip.customer.phone }}
                    </div>

                  </div>

                </div>

              </div>


              <!-- Vehicle -->
              <div class="col-12 col-sm-6">

                <div class="text-caption text-grey-6">
                  Vehicle
                </div>

                <div class="row items-center q-mt-xs">

                  <q-avatar
                    size="34px"
                    color="blue-1"
                    text-color="primary"
                  >
                    <q-icon name="directions_car" />
                  </q-avatar>

                  <div class="q-ml-sm">

                    <div class="text-body2 text-weight-medium">
                      {{ trip.vehicle.name }}
                    </div>

                    <div class="text-caption text-grey-6">
                      {{ trip.vehicle.number }}
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </q-card-section>


          <q-separator />


          <!-- Fare / Distance -->
          <q-card-section>

            <div class="row items-center justify-between">

              <div>

                <div class="text-caption text-grey-6">
                  Distance
                </div>

                <div class="text-body2 text-weight-medium">
                  {{ trip.distance }}
                </div>

              </div>


              <div class="text-right">

                <div class="text-caption text-grey-6">
                  Trip Fare
                </div>

                <div class="text-h6 text-weight-bold text-primary">
                  ₹{{ trip.fare }}
                </div>

              </div>

            </div>

          </q-card-section>


          <q-separator />


          <!-- Actions -->
          <q-card-actions
            align="right"
            class="q-pa-md"
          >

            <q-btn
              flat
              color="primary"
              icon="visibility"
              label="View"
              @click="viewTrip(trip)"
            />


            <!-- Pending -->
            <q-btn
              v-if="trip.status === 'pending'"
              unelevated
              color="primary"
              icon="check"
              label="Accept"
              @click="acceptTrip(trip)"
            />


            <!-- Accepted -->
            <q-btn
              v-if="trip.status === 'accepted'"
              unelevated
              color="positive"
              icon="play_arrow"
              label="Start Trip"
              @click="startTrip(trip)"
            />


            <!-- Started -->
            <q-btn
              v-if="trip.status === 'started'"
              unelevated
              color="positive"
              icon="check_circle"
              label="Complete"
              @click="completeTrip(trip)"
            />

          </q-card-actions>

        </q-card>

      </div>


      <!-- Empty State -->
      <div
        v-if="filteredTrips.length === 0"
        class="col-12"
      >

        <q-card class="empty-card">

          <q-card-section class="text-center q-pa-xl">

            <q-icon
              name="route"
              size="70px"
              color="grey-5"
            />

            <div class="text-h6 text-grey-7 q-mt-md">
              No trips found
            </div>

            <div class="text-body2 text-grey-6 q-mt-sm">
              No assigned trips match your current filters.
            </div>

            <q-btn
              outline
              color="primary"
              label="Reset Filters"
              class="q-mt-md"
              @click="resetFilters"
            />

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         TRIP DETAILS DIALOG
    ====================================================== -->
    <q-dialog v-model="showDetails">

      <q-card
        class="trip-details-dialog"
        style="width: 650px; max-width: 95vw"
      >

        <q-card-section class="row items-center justify-between">

          <div>

            <div class="text-h6 text-weight-bold">
              Trip Details
            </div>

            <div
              v-if="selectedTrip"
              class="text-caption text-grey-6"
            >
              {{ selectedTrip.bookingNumber }}
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


        <q-card-section v-if="selectedTrip">

          <!-- Status -->
          <div class="row items-center justify-between q-mb-lg">

            <div class="text-subtitle1 text-weight-bold">
              Trip Information
            </div>

            <q-badge
              :color="statusColor(selectedTrip.status)"
            >
              {{ formatStatus(selectedTrip.status) }}
            </q-badge>

          </div>


          <!-- Date / Time -->
          <div class="row q-col-gutter-md q-mb-lg">

            <div class="col-6">

              <div class="detail-box">

                <q-icon
                  name="event"
                  color="primary"
                  size="24px"
                />

                <div class="q-ml-sm">

                  <div class="text-caption text-grey-6">
                    Date
                  </div>

                  <div class="text-body2 text-weight-medium">
                    {{ formatDate(selectedTrip.date) }}
                  </div>

                </div>

              </div>

            </div>


            <div class="col-6">

              <div class="detail-box">

                <q-icon
                  name="schedule"
                  color="primary"
                  size="24px"
                />

                <div class="q-ml-sm">

                  <div class="text-caption text-grey-6">
                    Pickup Time
                  </div>

                  <div class="text-body2 text-weight-medium">
                    {{ selectedTrip.time }}
                  </div>

                </div>

              </div>

            </div>

          </div>


          <!-- Route -->
          <div class="text-subtitle1 text-weight-bold q-mb-md">
            Route
          </div>

          <div class="route-detail">

            <div class="route-point">

              <q-icon
                name="radio_button_checked"
                color="primary"
                size="20px"
              />

              <div class="q-ml-md">

                <div class="text-caption text-grey-6">
                  Pickup Location
                </div>

                <div class="text-body2 text-weight-medium">
                  {{ selectedTrip.pickup }}
                </div>

              </div>

            </div>


            <div class="route-detail-line"></div>


            <div class="route-point">

              <q-icon
                name="location_on"
                color="negative"
                size="20px"
              />

              <div class="q-ml-md">

                <div class="text-caption text-grey-6">
                  Drop Location
                </div>

                <div class="text-body2 text-weight-medium">
                  {{ selectedTrip.drop }}
                </div>

              </div>

            </div>

          </div>


          <q-separator class="q-my-lg" />


          <!-- Customer -->
          <div class="text-subtitle1 text-weight-bold q-mb-md">
            Customer Information
          </div>

          <div class="customer-detail">

            <q-avatar
              color="primary"
              text-color="white"
              size="48px"
            >
              <q-icon name="person" />
            </q-avatar>

            <div class="q-ml-md">

              <div class="text-body1 text-weight-bold">
                {{ selectedTrip.customer.name }}
              </div>

              <div class="text-caption text-grey-6">
                {{ selectedTrip.customer.phone }}
              </div>

            </div>

          </div>


          <q-separator class="q-my-lg" />


          <!-- Vehicle -->
          <div class="text-subtitle1 text-weight-bold q-mb-md">
            Vehicle Information
          </div>

          <div class="vehicle-detail">

            <q-avatar
              color="blue-1"
              text-color="primary"
              size="48px"
            >
              <q-icon name="directions_car" />
            </q-avatar>

            <div class="q-ml-md">

              <div class="text-body1 text-weight-bold">
                {{ selectedTrip.vehicle.name }}
              </div>

              <div class="text-caption text-grey-6">
                {{ selectedTrip.vehicle.number }}
              </div>

            </div>

          </div>


          <q-separator class="q-my-lg" />


          <!-- Fare -->
          <div class="row items-center justify-between">

            <div>

              <div class="text-caption text-grey-6">
                Total Distance
              </div>

              <div class="text-body1 text-weight-medium">
                {{ selectedTrip.distance }}
              </div>

            </div>


            <div class="text-right">

              <div class="text-caption text-grey-6">
                Trip Fare
              </div>

              <div class="text-h5 text-weight-bold text-primary">
                ₹{{ selectedTrip.fare }}
              </div>

            </div>

          </div>

        </q-card-section>


        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            label="Close"
            color="grey-7"
            v-close-popup
          />

          <q-btn
            v-if="selectedTrip?.status === 'pending'"
            unelevated
            color="primary"
            label="Accept Trip"
            icon="check"
            @click="acceptTrip(selectedTrip)"
          />

          <q-btn
            v-if="selectedTrip?.status === 'accepted'"
            unelevated
            color="positive"
            label="Start Trip"
            icon="play_arrow"
            @click="startTrip(selectedTrip)"
          />

          <q-btn
            v-if="selectedTrip?.status === 'started'"
            unelevated
            color="positive"
            label="Complete Trip"
            icon="check_circle"
            @click="completeTrip(selectedTrip)"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()


// =====================================================
// STATE
// =====================================================

const search = ref('')
const statusFilter = ref('all')
const dateFilter = ref('')

const showDetails = ref(false)
const selectedTrip = ref(null)


// =====================================================
// STATUS OPTIONS
// =====================================================

const statusOptions = [
  {
    label: 'All Trips',
    value: 'all'
  },
  {
    label: 'Pending',
    value: 'pending'
  },
  {
    label: 'Accepted',
    value: 'accepted'
  },
  {
    label: 'Started',
    value: 'started'
  },
  {
    label: 'Completed',
    value: 'completed'
  }
]


// =====================================================
// SAMPLE TRIPS
// Replace this with API response
// =====================================================

const trips = ref([
  {
    id: 1,
    bookingNumber: 'BK-1001',
    date: '2026-08-27',
    time: '09:30 AM',

    pickup: 'Patna Junction, Patna',
    drop: 'Airport Road, Patna',

    customer: {
      name: 'Rahul Kumar',
      phone: '+91 98765 43210'
    },

    vehicle: {
      name: 'Swift Dzire',
      number: 'BR01AB1234'
    },

    distance: '18 KM',
    fare: 850,

    status: 'pending'
  },

  {
    id: 2,
    bookingNumber: 'BK-1002',
    date: '2026-08-27',
    time: '01:00 PM',

    pickup: 'Boring Road, Patna',
    drop: 'Danapur Railway Station',

    customer: {
      name: 'Amit Singh',
      phone: '+91 91234 56789'
    },

    vehicle: {
      name: 'Toyota Etios',
      number: 'BR01CD5678'
    },

    distance: '24 KM',
    fare: 1200,

    status: 'accepted'
  },

  {
    id: 3,
    bookingNumber: 'BK-1003',
    date: '2026-08-28',
    time: '08:00 AM',

    pickup: 'Kankarbagh, Patna',
    drop: 'Rajendra Nagar',

    customer: {
      name: 'Priya Sharma',
      phone: '+91 99887 66554'
    },

    vehicle: {
      name: 'Hyundai Aura',
      number: 'BR01EF7890'
    },

    distance: '12 KM',
    fare: 650,

    status: 'started'
  },

  {
    id: 4,
    bookingNumber: 'BK-1004',
    date: '2026-08-25',
    time: '10:00 AM',

    pickup: 'Gandhi Maidan, Patna',
    drop: 'Bihta',

    customer: {
      name: 'Suresh Kumar',
      phone: '+91 98761 23456'
    },

    vehicle: {
      name: 'Maruti Ertiga',
      number: 'BR01GH3456'
    },

    distance: '38 KM',
    fare: 1800,

    status: 'completed'
  }
])


// =====================================================
// COMPUTED
// =====================================================

const pendingTrips = computed(() => {
  return trips.value.filter(
    trip => trip.status === 'pending'
  ).length
})


const activeTrips = computed(() => {
  return trips.value.filter(
    trip =>
      trip.status === 'accepted' ||
      trip.status === 'started'
  ).length
})


const completedTrips = computed(() => {
  return trips.value.filter(
    trip => trip.status === 'completed'
  ).length
})


const filteredTrips = computed(() => {

  let result = [...trips.value]

  // Status filter
  if (statusFilter.value !== 'all') {

    result = result.filter(
      trip => trip.status === statusFilter.value
    )

  }


  // Date filter
  if (dateFilter.value) {

    result = result.filter(
      trip => trip.date === dateFilter.value
    )

  }


  // Search
  if (search.value.trim()) {

    const keyword = search.value
      .toLowerCase()
      .trim()

    result = result.filter(trip => {

      return (
        trip.bookingNumber
          .toLowerCase()
          .includes(keyword) ||

        trip.customer.name
          .toLowerCase()
          .includes(keyword) ||

        trip.customer.phone
          .toLowerCase()
          .includes(keyword) ||

        trip.pickup
          .toLowerCase()
          .includes(keyword) ||

        trip.drop
          .toLowerCase()
          .includes(keyword) ||

        trip.vehicle.name
          .toLowerCase()
          .includes(keyword) ||

        trip.vehicle.number
          .toLowerCase()
          .includes(keyword)
      )

    })

  }

  return result
})


// =====================================================
// HELPERS
// =====================================================

function formatDate(date) {

  if (!date) return ''

  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }

  return new Date(date).toLocaleDateString(
    'en-IN',
    options
  )
}


function formatStatus(status) {

  const statusMap = {
    pending: 'Pending',
    accepted: 'Accepted',
    started: 'In Progress',
    completed: 'Completed'
  }

  return statusMap[status] || status
}


function statusColor(status) {

  const colors = {
    pending: 'orange',
    accepted: 'primary',
    started: 'positive',
    completed: 'purple'
  }

  return colors[status] || 'grey'
}


// =====================================================
// VIEW TRIP
// =====================================================

function viewTrip(trip) {

  selectedTrip.value = trip
  showDetails.value = true
}


// =====================================================
// ACCEPT TRIP
// =====================================================

function acceptTrip(trip) {

  if (!trip) return

  $q.dialog({
    title: 'Accept Trip',
    message: `Do you want to accept booking ${trip.bookingNumber}?`,
    cancel: true,
    persistent: true
  }).onOk(() => {

    trip.status = 'accepted'

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

function startTrip(trip) {

  if (!trip) return

  $q.dialog({
    title: 'Start Trip',
    message: `Start trip ${trip.bookingNumber}?`,
    cancel: true,
    persistent: true
  }).onOk(() => {

    trip.status = 'started'

    showDetails.value = false

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

function completeTrip(trip) {

  if (!trip) return

  $q.dialog({
    title: 'Complete Trip',
    message: `Mark ${trip.bookingNumber} as completed?`,
    cancel: true,
    persistent: true
  }).onOk(() => {

    trip.status = 'completed'

    showDetails.value = false

    $q.notify({
      type: 'positive',
      message: 'Trip completed successfully',
      position: 'top-right'
    })

  })
}


// =====================================================
// REFRESH
// =====================================================

function refreshTrips() {

  $q.notify({
    type: 'positive',
    message: 'Trips refreshed',
    position: 'top-right'
  })

  // Later:
  // fetchTrips()
}


// =====================================================
// RESET FILTERS
// =====================================================

function resetFilters() {

  search.value = ''
  statusFilter.value = 'all'
  dateFilter.value = ''
}

</script>


<style scoped>

.assigned-trip-page {
  background: #f6f8fb;
  min-height: 100vh;
}


/* =====================================================
   SUMMARY CARDS
===================================================== */

.summary-card {
  border-radius: 14px;
  border: 1px solid #e8ebf0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}


/* =====================================================
   FILTER
===================================================== */

.filter-card {
  border-radius: 14px;
  border: 1px solid #e8ebf0;
}


/* =====================================================
   TRIP CARD
===================================================== */

.trip-card {
  border-radius: 16px;
  border: 1px solid #e7eaf0;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  height: 100%;
}


.trip-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
}


.status-badge {
  padding: 7px 10px;
  border-radius: 20px;
}


/* =====================================================
   LOCATION
===================================================== */

.location-row {
  display: flex;
  align-items: flex-start;
}


.location-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}


.location-icon.pickup {
  color: #1976d2;
}


.location-icon.drop {
  color: #e53935;
}


.location-content {
  flex: 1;
  padding-left: 4px;
}


.route-line {
  height: 25px;
  border-left: 2px dashed #d5d9df;
  margin-left: 14px;
}


/* =====================================================
   EMPTY
===================================================== */

.empty-card {
  border-radius: 16px;
  border: 1px solid #e8ebf0;
}


/* =====================================================
   DETAILS
===================================================== */

.trip-details-dialog {
  border-radius: 16px;
}


.detail-box {
  display: flex;
  align-items: center;
  padding: 14px;
  background: #f8f9fb;
  border-radius: 10px;
}


.route-detail {
  padding-left: 4px;
}


.route-point {
  display: flex;
  align-items: flex-start;
}


.route-detail-line {
  height: 35px;
  border-left: 2px dashed #d5d9df;
  margin-left: 9px;
}


.customer-detail,
.vehicle-detail {
  display: flex;
  align-items: center;
  padding: 14px;
  background: #f8f9fb;
  border-radius: 10px;
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 600px) {

  .assigned-trip-page {
    padding: 12px !important;
  }


  .trip-card {
    border-radius: 12px;
  }


  .summary-card {
    border-radius: 12px;
  }


  .q-card__actions {
    flex-wrap: wrap;
  }

}

</style>
