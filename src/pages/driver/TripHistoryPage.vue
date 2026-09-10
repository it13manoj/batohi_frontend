<template>
  <q-page class="trip-history-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Trip History
        </div>

        <div class="text-grey-7 q-mt-xs">
          View your completed and past trips
        </div>
      </div>

      <q-btn
        unelevated
        color="primary"
        icon="refresh"
        label="Refresh"
        @click="refreshHistory"
      />

    </div>


    <!-- =====================================================
         SUMMARY CARDS
    ====================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- Total Trips -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="summary-card">

          <q-card-section class="row items-center">

            <q-avatar
              color="blue-1"
              text-color="primary"
              size="48px"
            >
              <q-icon
                name="history"
                size="26px"
              />
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


      <!-- Completed -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="summary-card">

          <q-card-section class="row items-center">

            <q-avatar
              color="green-1"
              text-color="positive"
              size="48px"
            >
              <q-icon
                name="check_circle"
                size="26px"
              />
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


      <!-- Cancelled -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="summary-card">

          <q-card-section class="row items-center">

            <q-avatar
              color="red-1"
              text-color="negative"
              size="48px"
            >
              <q-icon
                name="cancel"
                size="26px"
              />
            </q-avatar>

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Cancelled
              </div>

              <div class="text-h5 text-weight-bold">
                {{ cancelledTrips }}
              </div>

            </div>

          </q-card-section>

        </q-card>
      </div>


      <!-- Total Earnings -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="summary-card">

          <q-card-section class="row items-center">

            <q-avatar
              color="purple-1"
              text-color="purple"
              size="48px"
            >
              <q-icon
                name="payments"
                size="26px"
              />
            </q-avatar>

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Total Earnings
              </div>

              <div class="text-h5 text-weight-bold">
                ₹{{ totalEarnings }}
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
          <div class="col-12 col-md-4">

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
          <div class="col-12 col-md-2">

            <q-select
              v-model="statusFilter"
              outlined
              dense
              emit-value
              map-options
              label="Status"
              :options="statusOptions"
            />

          </div>


          <!-- From Date -->
          <div class="col-12 col-md-2">

            <q-input
              v-model="fromDate"
              outlined
              dense
              type="date"
              label="From Date"
            />

          </div>


          <!-- To Date -->
          <div class="col-12 col-md-2">

            <q-input
              v-model="toDate"
              outlined
              dense
              type="date"
              label="To Date"
            />

          </div>


          <!-- Reset -->
          <div class="col-12 col-md-2">

            <q-btn
              outline
              color="grey-7"
              icon="filter_alt_off"
              label="Reset"
              class="full-width"
              @click="resetFilters"
            />

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         TRIP TABLE
    ====================================================== -->
    <q-card class="history-card">

      <q-card-section class="q-pb-sm">

        <div class="row items-center justify-between">

          <div>
            <div class="text-h6 text-weight-bold">
              Past Trips
            </div>

            <div class="text-caption text-grey-6">
              {{ filteredTrips.length }} trip(s) found
            </div>
          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- Desktop Table -->
      <q-table
        v-model:pagination="pagination"
        :rows="filteredTrips"
        :columns="columns"
        row-key="id"
        flat
        :rows-per-page-options="[5, 10, 20, 50]"
        class="trip-table"
      >

        <!-- Booking -->
        <template #body-cell-booking="props">

          <q-td :props="props">

            <div class="text-weight-bold">
              {{ props.row.bookingNumber }}
            </div>

            <div class="text-caption text-grey-6">
              {{ formatDate(props.row.date) }}
            </div>

          </q-td>

        </template>


        <!-- Customer -->
        <template #body-cell-customer="props">

          <q-td :props="props">

            <div class="row items-center no-wrap">

              <q-avatar
                size="34px"
                color="grey-3"
                text-color="grey-8"
              >
                <q-icon name="person" />
              </q-avatar>

              <div class="q-ml-sm">

                <div class="text-weight-medium">
                  {{ props.row.customer.name }}
                </div>

                <div class="text-caption text-grey-6">
                  {{ props.row.customer.phone }}
                </div>

              </div>

            </div>

          </q-td>

        </template>


        <!-- Route -->
        <template #body-cell-route="props">

          <q-td :props="props">

            <div class="route-cell">

              <div class="route-item">
                <q-icon
                  name="radio_button_checked"
                  color="primary"
                  size="15px"
                />

                <span>
                  {{ props.row.pickup }}
                </span>
              </div>

              <div class="route-line-small"></div>

              <div class="route-item">
                <q-icon
                  name="location_on"
                  color="negative"
                  size="15px"
                />

                <span>
                  {{ props.row.drop }}
                </span>
              </div>

            </div>

          </q-td>

        </template>


        <!-- Vehicle -->
        <template #body-cell-vehicle="props">

          <q-td :props="props">

            <div class="text-weight-medium">
              {{ props.row.vehicle.name }}
            </div>

            <div class="text-caption text-grey-6">
              {{ props.row.vehicle.number }}
            </div>

          </q-td>

        </template>


        <!-- Fare -->
        <template #body-cell-fare="props">

          <q-td :props="props">

            <div class="text-weight-bold text-primary">
              ₹{{ props.row.fare }}
            </div>

            <div class="text-caption text-grey-6">
              {{ props.row.paymentStatus }}
            </div>

          </q-td>

        </template>


        <!-- Status -->
        <template #body-cell-status="props">

          <q-td :props="props">

            <q-badge
              :color="statusColor(props.row.status)"
              class="status-badge"
            >
              {{ formatStatus(props.row.status) }}
            </q-badge>

          </q-td>

        </template>


        <!-- Actions -->
        <template #body-cell-actions="props">

          <q-td :props="props">

            <q-btn
              flat
              round
              dense
              color="primary"
              icon="visibility"
              @click="viewTrip(props.row)"
            >

              <q-tooltip>
                View Trip
              </q-tooltip>

            </q-btn>

          </q-td>

        </template>


        <!-- No Data -->
        <template #no-data>

          <div class="full-width text-center q-pa-xl">

            <q-icon
              name="history"
              size="60px"
              color="grey-5"
            />

            <div class="text-h6 text-grey-7 q-mt-md">
              No trip history found
            </div>

            <div class="text-body2 text-grey-6">
              Try changing your filters.
            </div>

          </div>

        </template>

      </q-table>

    </q-card>


    <!-- =====================================================
         TRIP DETAILS DIALOG
    ====================================================== -->
    <q-dialog v-model="showDetails">

      <q-card
        class="trip-details-dialog"
        style="width: 650px; max-width: 95vw"
      >

        <!-- Header -->
        <q-card-section
          class="row items-center justify-between"
        >

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
              class="status-badge"
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
                    Trip Date
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
                    Trip Time
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
            Trip Route
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
                  Pickup
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
                  Drop-off
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
            Customer
          </div>

          <div class="customer-box">

            <q-avatar
              size="48px"
              color="primary"
              text-color="white"
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

              <div class="text-caption text-grey-6">
                {{ selectedTrip.customer.email }}
              </div>

            </div>

          </div>


          <q-separator class="q-my-lg" />


          <!-- Vehicle -->
          <div class="text-subtitle1 text-weight-bold q-mb-md">
            Vehicle
          </div>

          <div class="customer-box">

            <q-avatar
              size="48px"
              color="blue-1"
              text-color="primary"
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


          <!-- Earnings -->
          <div class="row q-col-gutter-md">

            <div class="col-6">

              <div class="detail-box">

                <q-icon
                  name="straighten"
                  color="primary"
                  size="24px"
                />

                <div class="q-ml-sm">

                  <div class="text-caption text-grey-6">
                    Distance
                  </div>

                  <div class="text-body2 text-weight-bold">
                    {{ selectedTrip.distance }}
                  </div>

                </div>

              </div>

            </div>


            <div class="col-6">

              <div class="detail-box">

                <q-icon
                  name="payments"
                  color="positive"
                  size="24px"
                />

                <div class="q-ml-sm">

                  <div class="text-caption text-grey-6">
                    Earnings
                  </div>

                  <div class="text-body2 text-weight-bold">
                    ₹{{ selectedTrip.fare }}
                  </div>

                </div>

              </div>

            </div>

          </div>


          <q-separator class="q-my-lg" />


          <!-- Payment -->
          <div class="row items-center justify-between">

            <div>

              <div class="text-caption text-grey-6">
                Payment Method
              </div>

              <div class="text-body2 text-weight-medium">
                {{ selectedTrip.paymentMethod }}
              </div>

            </div>


            <div class="text-right">

              <div class="text-caption text-grey-6">
                Payment Status
              </div>

              <q-badge
                :color="
                  selectedTrip.paymentStatus === 'Paid'
                    ? 'positive'
                    : 'orange'
                "
              >
                {{ selectedTrip.paymentStatus }}
              </q-badge>

            </div>

          </div>

        </q-card-section>


        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            color="grey-7"
            label="Close"
            v-close-popup
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
// FILTER STATE
// =====================================================

const search = ref('')
const statusFilter = ref('all')

const fromDate = ref('')
const toDate = ref('')


// =====================================================
// DIALOG STATE
// =====================================================

const showDetails = ref(false)
const selectedTrip = ref(null)


// =====================================================
// PAGINATION
// =====================================================

const pagination = ref({
  page: 1,
  rowsPerPage: 10
})


// =====================================================
// STATUS OPTIONS
// =====================================================

const statusOptions = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Completed',
    value: 'completed'
  },
  {
    label: 'Cancelled',
    value: 'cancelled'
  }
]


// =====================================================
// TABLE COLUMNS
// =====================================================

const columns = [
  {
    name: 'booking',
    label: 'Booking',
    field: 'bookingNumber',
    align: 'left',
    sortable: true
  },

  {
    name: 'customer',
    label: 'Customer',
    field: row => row.customer.name,
    align: 'left',
    sortable: true
  },

  {
    name: 'route',
    label: 'Route',
    field: 'pickup',
    align: 'left'
  },

  {
    name: 'vehicle',
    label: 'Vehicle',
    field: row => row.vehicle.name,
    align: 'left'
  },

  {
    name: 'distance',
    label: 'Distance',
    field: 'distance',
    align: 'center',
    sortable: true
  },

  {
    name: 'fare',
    label: 'Earnings',
    field: 'fare',
    align: 'right',
    sortable: true
  },

  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'center',
    sortable: true
  },

  {
    name: 'actions',
    label: 'Action',
    field: 'actions',
    align: 'center'
  }
]


// =====================================================
// TRIP DATA
// Replace this with API data
// =====================================================

const trips = ref([
  {
    id: 1,

    bookingNumber: 'BK-1001',

    date: '2026-08-25',
    time: '09:30 AM',

    pickup: 'Patna Junction, Patna',
    drop: 'Airport Road, Patna',

    customer: {
      name: 'Rahul Kumar',
      phone: '+91 98765 43210',
      email: 'rahul@example.com'
    },

    vehicle: {
      name: 'Swift Dzire',
      number: 'BR01AB1234'
    },

    distance: '18 KM',
    fare: 850,

    paymentMethod: 'Cash',
    paymentStatus: 'Paid',

    status: 'completed'
  },


  {
    id: 2,

    bookingNumber: 'BK-1002',

    date: '2026-08-23',
    time: '01:00 PM',

    pickup: 'Boring Road, Patna',
    drop: 'Danapur Railway Station',

    customer: {
      name: 'Amit Singh',
      phone: '+91 91234 56789',
      email: 'amit@example.com'
    },

    vehicle: {
      name: 'Toyota Etios',
      number: 'BR01CD5678'
    },

    distance: '24 KM',
    fare: 1200,

    paymentMethod: 'UPI',
    paymentStatus: 'Paid',

    status: 'completed'
  },


  {
    id: 3,

    bookingNumber: 'BK-1003',

    date: '2026-08-20',
    time: '08:00 AM',

    pickup: 'Kankarbagh, Patna',
    drop: 'Rajendra Nagar',

    customer: {
      name: 'Priya Sharma',
      phone: '+91 99887 66554',
      email: 'priya@example.com'
    },

    vehicle: {
      name: 'Hyundai Aura',
      number: 'BR01EF7890'
    },

    distance: '12 KM',
    fare: 650,

    paymentMethod: 'Cash',
    paymentStatus: 'Paid',

    status: 'completed'
  },


  {
    id: 4,

    bookingNumber: 'BK-1004',

    date: '2026-08-18',
    time: '10:00 AM',

    pickup: 'Gandhi Maidan, Patna',
    drop: 'Bihta',

    customer: {
      name: 'Suresh Kumar',
      phone: '+91 98761 23456',
      email: 'suresh@example.com'
    },

    vehicle: {
      name: 'Maruti Ertiga',
      number: 'BR01GH3456'
    },

    distance: '38 KM',
    fare: 1800,

    paymentMethod: 'UPI',
    paymentStatus: 'Paid',

    status: 'completed'
  },


  {
    id: 5,

    bookingNumber: 'BK-1005',

    date: '2026-08-15',
    time: '06:30 PM',

    pickup: 'Patna City',
    drop: 'Phulwari Sharif',

    customer: {
      name: 'Vikash Kumar',
      phone: '+91 98123 45678',
      email: 'vikash@example.com'
    },

    vehicle: {
      name: 'WagonR',
      number: 'BR01JK6789'
    },

    distance: '15 KM',
    fare: 700,

    paymentMethod: 'Cash',
    paymentStatus: 'Refunded',

    status: 'cancelled'
  },


  {
    id: 6,

    bookingNumber: 'BK-1006',

    date: '2026-08-12',
    time: '11:30 AM',

    pickup: 'Rajendra Nagar',
    drop: 'Patna Airport',

    customer: {
      name: 'Neha Singh',
      phone: '+91 97654 32109',
      email: 'neha@example.com'
    },

    vehicle: {
      name: 'Honda Amaze',
      number: 'BR01LM1234'
    },

    distance: '16 KM',
    fare: 900,

    paymentMethod: 'UPI',
    paymentStatus: 'Paid',

    status: 'completed'
  }
])


// =====================================================
// COMPUTED STATISTICS
// =====================================================

const completedTrips = computed(() => {

  return trips.value.filter(
    trip => trip.status === 'completed'
  ).length

})


const cancelledTrips = computed(() => {

  return trips.value.filter(
    trip => trip.status === 'cancelled'
  ).length

})


const totalEarnings = computed(() => {

  return trips.value
    .filter(trip => trip.status === 'completed')
    .reduce(
      (total, trip) => total + Number(trip.fare || 0),
      0
    )

})


// =====================================================
// FILTERED TRIPS
// =====================================================

const filteredTrips = computed(() => {

  let result = [...trips.value]


  // Status
  if (statusFilter.value !== 'all') {

    result = result.filter(
      trip => trip.status === statusFilter.value
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


  // From Date
  if (fromDate.value) {

    result = result.filter(
      trip => trip.date >= fromDate.value
    )

  }


  // To Date
  if (toDate.value) {

    result = result.filter(
      trip => trip.date <= toDate.value
    )

  }


  return result

})


// =====================================================
// FORMAT DATE
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


// =====================================================
// FORMAT STATUS
// =====================================================

function formatStatus(status) {

  const statusMap = {

    completed: 'Completed',

    cancelled: 'Cancelled'

  }

  return statusMap[status] || status

}


// =====================================================
// STATUS COLOR
// =====================================================

function statusColor(status) {

  const colors = {

    completed: 'positive',

    cancelled: 'negative'

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
// REFRESH
// =====================================================

function refreshHistory() {

  $q.notify({

    type: 'positive',

    message: 'Trip history refreshed',

    position: 'top-right'

  })

  // Later:
  // fetchTripHistory()

}


// =====================================================
// RESET FILTERS
// =====================================================

function resetFilters() {

  search.value = ''

  statusFilter.value = 'all'

  fromDate.value = ''

  toDate.value = ''

}

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.trip-history-page {
  min-height: 100vh;
  background: #f6f8fb;
}


/* =====================================================
   SUMMARY
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
   HISTORY CARD
===================================================== */

.history-card {

  border-radius: 16px;

  border: 1px solid #e7eaf0;

  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.05);

  overflow: hidden;

}


/* =====================================================
   TABLE
===================================================== */

.trip-table {

  border-radius: 0;

}


.status-badge {

  padding: 6px 10px;

  border-radius: 20px;

}


/* =====================================================
   ROUTE
===================================================== */

.route-cell {

  min-width: 180px;

}


.route-item {

  display: flex;

  align-items: center;

  gap: 6px;

}


.route-item span {

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

  max-width: 180px;

}


.route-line-small {

  height: 14px;

  border-left: 1px dashed #cfd4da;

  margin-left: 7px;

}


/* =====================================================
   DETAILS DIALOG
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


.customer-box {

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

  .trip-history-page {

    padding: 12px !important;

  }


  .summary-card {

    border-radius: 12px;

  }


  .history-card {

    border-radius: 12px;

  }

}

</style>
