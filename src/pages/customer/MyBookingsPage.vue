<template>
  <q-page class="my-bookings-page">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->

    <div class="page-header">

      <div>
        <div class="page-title">
          My Bookings
        </div>

        <div class="page-subtitle">
          View and manage all your vehicle bookings.
        </div>
      </div>

      <q-btn
        unelevated
        rounded
        color="primary"
        icon="add"
        label="Book a Vehicle"
        @click="goToSearch"
      />

    </div>


    <!-- =====================================================
         STATISTICS
    ====================================================== -->

    <div class="row q-col-gutter-md q-mb-lg">

      <!-- TOTAL -->

      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div class="stat-icon total-icon">
                <q-icon
                  name="receipt_long"
                  size="28px"
                  color="primary"
                />
              </div>

              <div>

                <div class="stat-label">
                  Total Bookings
                </div>

                <div class="stat-value">
                  {{ totalBookings }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- CONFIRMED -->

      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div class="stat-icon confirmed-icon">
                <q-icon
                  name="check_circle"
                  size="28px"
                  color="positive"
                />
              </div>

              <div>

                <div class="stat-label">
                  Confirmed
                </div>

                <div class="stat-value">
                  {{ confirmedBookings }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- PENDING -->

      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div class="stat-icon pending-icon">
                <q-icon
                  name="schedule"
                  size="28px"
                  color="orange"
                />
              </div>

              <div>

                <div class="stat-label">
                  Pending
                </div>

                <div class="stat-value">
                  {{ pendingBookings }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- COMPLETED -->

      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div class="stat-icon completed-icon">
                <q-icon
                  name="task_alt"
                  size="28px"
                  color="teal"
                />
              </div>

              <div>

                <div class="stat-label">
                  Completed
                </div>

                <div class="stat-value">
                  {{ completedBookings }}
                </div>

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

          <!-- SEARCH -->

          <div class="col-12 col-md-5">

            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search booking, vehicle or location..."
            >

              <template #prepend>
                <q-icon name="search" />
              </template>

            </q-input>

          </div>


          <!-- STATUS -->

          <div class="col-12 col-md-3">

            <q-select
              v-model="statusFilter"
              outlined
              dense
              emit-value
              map-options
              :options="statusOptions"
              label="Booking Status"
            />

          </div>


          <!-- DATE -->

          <div class="col-12 col-md-3">

            <q-select
              v-model="dateFilter"
              outlined
              dense
              emit-value
              map-options
              :options="dateOptions"
              label="Date"
            />

          </div>


          <!-- RESET -->

          <div class="col-12 col-md-1">

            <q-btn
              flat
              round
              icon="refresh"
              color="primary"
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
         BOOKING LIST
    ====================================================== -->

    <div class="section-header">

      <div>

        <div class="section-title">
          Booking History
        </div>

        <div class="section-subtitle">
          {{ filteredBookings.length }} booking(s) found
        </div>

      </div>

    </div>


    <!-- =====================================================
         EMPTY STATE
    ====================================================== -->

    <q-card
      v-if="filteredBookings.length === 0"
      class="empty-card"
    >

      <q-card-section class="empty-content">

        <q-icon
          name="event_busy"
          size="70px"
          color="grey-5"
        />

        <div class="empty-title">
          No Bookings Found
        </div>

        <div class="empty-text">
          You don't have any bookings matching your search.
        </div>

        <q-btn
          unelevated
          rounded
          color="primary"
          icon="directions_car"
          label="Book a Vehicle"
          class="q-mt-md"
          @click="goToSearch"
        />

      </q-card-section>

    </q-card>


    <!-- =====================================================
         BOOKING CARDS
    ====================================================== -->

    <div
      v-else
      class="booking-list"
    >

      <q-card
        v-for="booking in filteredBookings"
        :key="booking.id"
        class="booking-card"
      >

        <q-card-section>

          <div class="row q-col-gutter-lg">

            <!-- =================================================
                 VEHICLE
            ================================================== -->

            <div class="col-12 col-md-3">

              <div class="vehicle-section">

                <div class="vehicle-image">

                  <q-icon
                    name="directions_car"
                    size="58px"
                    color="primary"
                  />

                </div>

                <div>

                  <div class="vehicle-name">
                    {{ booking.vehicleName }}
                  </div>

                  <div class="vehicle-type">
                    {{ booking.vehicleType }}
                  </div>

                </div>

              </div>

            </div>


            <!-- =================================================
                 BOOKING DETAILS
            ================================================== -->

            <div class="col-12 col-md-6">

              <div class="booking-number">
                Booking #{{ booking.bookingNumber }}
              </div>

              <div class="detail-grid">

                <!-- DATE -->

                <div class="detail-item">

                  <q-icon
                    name="event"
                    color="primary"
                  />

                  <div>

                    <div class="detail-label">
                      Journey Date
                    </div>

                    <div class="detail-value">
                      {{ formatDate(booking.bookingDate) }}
                    </div>

                  </div>

                </div>


                <!-- TIME -->

                <div class="detail-item">

                  <q-icon
                    name="schedule"
                    color="primary"
                  />

                  <div>

                    <div class="detail-label">
                      Pickup Time
                    </div>

                    <div class="detail-value">
                      {{ booking.bookingTime }}
                    </div>

                  </div>

                </div>


                <!-- PICKUP -->

                <div class="detail-item">

                  <q-icon
                    name="location_on"
                    color="positive"
                  />

                  <div>

                    <div class="detail-label">
                      Pickup
                    </div>

                    <div class="detail-value">
                      {{ booking.pickupLocation }}
                    </div>

                  </div>

                </div>


                <!-- DROP -->

                <div class="detail-item">

                  <q-icon
                    name="location_on"
                    color="negative"
                  />

                  <div>

                    <div class="detail-label">
                      Drop
                    </div>

                    <div class="detail-value">
                      {{ booking.dropLocation }}
                    </div>

                  </div>

                </div>

              </div>

            </div>


            <!-- =================================================
                 STATUS & PRICE
            ================================================== -->

            <div class="col-12 col-md-3">

              <div class="booking-right">

                <q-badge
                  :color="getStatusColor(booking.status)"
                  class="status-badge"
                >
                  {{ booking.status }}
                </q-badge>


                <div class="booking-price">

                  <div class="price-label">
                    Total Amount
                  </div>

                  <div class="price-value">
                    ₹{{ formatAmount(booking.totalAmount) }}
                  </div>

                </div>


                <div class="booking-actions">

                  <q-btn
                    flat
                    rounded
                    color="primary"
                    icon="visibility"
                    label="View Details"
                    @click="viewBooking(booking)"
                  />

                  <q-btn
                    v-if="canCancel(booking)"
                    flat
                    rounded
                    color="negative"
                    icon="cancel"
                    label="Cancel"
                    @click="openCancelDialog(booking)"
                  />

                </div>

              </div>

            </div>

          </div>

        </q-card-section>

      </q-card>

    </div>


    <!-- =====================================================
         CANCEL BOOKING DIALOG
    ====================================================== -->

    <q-dialog v-model="showCancelDialog">

      <q-card
        style="width: 480px; max-width: 95vw"
      >

        <q-card-section>

          <div class="dialog-title">

            <q-icon
              name="warning"
              color="negative"
              size="28px"
            />

            Cancel Booking

          </div>

        </q-card-section>

        <q-separator />

        <q-card-section>

          <div class="dialog-text">

            Are you sure you want to cancel booking

            <strong>
              #{{ selectedBooking?.bookingNumber }}
            </strong>?

          </div>

          <div class="cancel-note q-mt-md">

            Cancellation charges may apply according to
            the booking cancellation policy.

          </div>

        </q-card-section>

        <q-card-actions align="right">

          <q-btn
            flat
            label="No, Keep Booking"
            color="grey-7"
            v-close-popup
          />

          <q-btn
            unelevated
            label="Yes, Cancel"
            color="negative"
            icon="cancel"
            @click="cancelBooking"
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
  useRouter
} from 'vue-router'

import {
  useQuasar
} from 'quasar'


// =====================================================
// ROUTER
// =====================================================

const router = useRouter()

const $q = useQuasar()


// =====================================================
// FILTERS
// =====================================================

const search = ref('')

const statusFilter = ref('all')

const dateFilter = ref('all')


// =====================================================
// FILTER OPTIONS
// =====================================================

const statusOptions = [

  {
    label: 'All Status',
    value: 'all'
  },

  {
    label: 'Pending',
    value: 'Pending'
  },

  {
    label: 'Confirmed',
    value: 'Confirmed'
  },

  {
    label: 'Completed',
    value: 'Completed'
  },

  {
    label: 'Cancelled',
    value: 'Cancelled'
  },

  {
    label: 'Rejected',
    value: 'Rejected'
  }

]


const dateOptions = [

  {
    label: 'All Dates',
    value: 'all'
  },

  {
    label: 'Upcoming',
    value: 'upcoming'
  },

  {
    label: 'Past',
    value: 'past'
  }

]


// =====================================================
// BOOKING DATA
// =====================================================
//
// This is temporary frontend data.
//
// Later replace this with:
// booking.service.js
// or
// booking.store.js
//
// =====================================================

const bookings = ref([

  {
    id: 1,
    bookingNumber: 'BK-10001',

    vehicleId: 1,
    vehicleName: 'Toyota Innova Crysta',
    vehicleType: 'MPV',

    bookingDate: '2026-08-25',
    bookingTime: '09:00 AM',

    pickupLocation: 'Patna Airport',
    dropLocation: 'Muzaffarpur',

    passengers: 5,

    totalAmount: 2625,

    status: 'Confirmed'
  },


  {
    id: 2,
    bookingNumber: 'BK-10002',

    vehicleId: 2,
    vehicleName: 'Mahindra Scorpio',
    vehicleType: 'SUV',

    bookingDate: '2026-08-28',
    bookingTime: '08:30 AM',

    pickupLocation: 'Patna Railway Station',
    dropLocation: 'Gaya',

    passengers: 4,

    totalAmount: 2940,

    status: 'Pending'
  },


  {
    id: 3,
    bookingNumber: 'BK-10003',

    vehicleId: 3,
    vehicleName: 'Maruti Ertiga',
    vehicleType: 'MPV',

    bookingDate: '2026-08-10',
    bookingTime: '10:00 AM',

    pickupLocation: 'Muzaffarpur',
    dropLocation: 'Patna',

    passengers: 4,

    totalAmount: 2100,

    status: 'Completed'
  },


  {
    id: 4,
    bookingNumber: 'BK-10004',

    vehicleId: 4,
    vehicleName: 'Hyundai Aura',
    vehicleType: 'Sedan',

    bookingDate: '2026-08-05',
    bookingTime: '07:30 AM',

    pickupLocation: 'Patna',
    dropLocation: 'Nalanda',

    passengers: 3,

    totalAmount: 1575,

    status: 'Cancelled'
  }

])


// =====================================================
// STATISTICS
// =====================================================

const totalBookings = computed(() => {

  return bookings.value.length

})


const confirmedBookings = computed(() => {

  return bookings.value.filter(
    booking =>
      booking.status === 'Confirmed'
  ).length

})


const pendingBookings = computed(() => {

  return bookings.value.filter(
    booking =>
      booking.status === 'Pending'
  ).length

})


const completedBookings = computed(() => {

  return bookings.value.filter(
    booking =>
      booking.status === 'Completed'
  ).length

})


// =====================================================
// FILTERED BOOKINGS
// =====================================================

const filteredBookings = computed(() => {

  let result = [
    ...bookings.value
  ]


  // ===================================================
  // SEARCH
  // ===================================================

  const searchText =
    search.value
      .trim()
      .toLowerCase()


  if (searchText) {

    result =
      result.filter(booking => {

        return (

          booking.bookingNumber
            .toLowerCase()
            .includes(searchText)

          ||

          booking.vehicleName
            .toLowerCase()
            .includes(searchText)

          ||

          booking.vehicleType
            .toLowerCase()
            .includes(searchText)

          ||

          booking.pickupLocation
            .toLowerCase()
            .includes(searchText)

          ||

          booking.dropLocation
            .toLowerCase()
            .includes(searchText)

        )

      })

  }


  // ===================================================
  // STATUS
  // ===================================================

  if (
    statusFilter.value !== 'all'
  ) {

    result =
      result.filter(
        booking =>
          booking.status ===
          statusFilter.value
      )

  }


  // ===================================================
  // DATE
  // ===================================================

  if (
    dateFilter.value !== 'all'
  ) {

    const today =
      new Date()

    today.setHours(
      0,
      0,
      0,
      0
    )


    result =
      result.filter(
        booking => {

          const bookingDate =
            new Date(
              booking.bookingDate
            )

          if (
            dateFilter.value ===
            'upcoming'
          ) {

            return bookingDate >= today

          }


          if (
            dateFilter.value ===
            'past'
          ) {

            return bookingDate < today

          }


          return true

        }
      )

  }


  return result

})


// =====================================================
// STATUS COLOR
// =====================================================

const getStatusColor = (status) => {

  switch (status) {

    case 'Confirmed':
      return 'positive'

    case 'Pending':
      return 'orange'

    case 'Completed':
      return 'teal'

    case 'Cancelled':
      return 'negative'

    case 'Rejected':
      return 'negative'

    default:
      return 'grey'

  }

}


// =====================================================
// CAN CANCEL
// =====================================================

const canCancel = (booking) => {

  return (

    booking.status === 'Pending' ||

    booking.status === 'Confirmed'

  )

}


// =====================================================
// VIEW BOOKING
// =====================================================

const viewBooking = (booking) => {

  router.push({

    name: 'customer-booking-details',

    query: {
      bookingId: booking.id
    }

  })

}


// =====================================================
// CANCEL DIALOG
// =====================================================

const showCancelDialog =
  ref(false)

const selectedBooking =
  ref(null)


const openCancelDialog = (booking) => {

  selectedBooking.value =
    booking

  showCancelDialog.value =
    true

}


// =====================================================
// CANCEL BOOKING
// =====================================================

const cancelBooking = () => {

  if (
    !selectedBooking.value
  ) {

    return

  }


  /*
   * Temporary frontend implementation.
   *
   * Later replace this with:
   *
   * await bookingService.cancelBooking(
   *   selectedBooking.value.id
   * )
   */


  const booking =
    bookings.value.find(
      item =>
        item.id ===
        selectedBooking.value.id
    )


  if (booking) {

    booking.status =
      'Cancelled'

  }


  showCancelDialog.value =
    false


  $q.notify({

    type: 'positive',

    message:
      'Booking cancelled successfully',

    position: 'top'

  })


  selectedBooking.value =
    null

}


// =====================================================
// RESET FILTERS
// =====================================================

const resetFilters = () => {

  search.value = ''

  statusFilter.value = 'all'

  dateFilter.value = 'all'

}


// =====================================================
// GO TO SEARCH
// =====================================================

const goToSearch = () => {

  router.push(
    '/customer/search-vehicle'
  )

}


// =====================================================
// FORMAT DATE
// =====================================================

const formatDate = (date) => {

  if (!date) {
    return '-'
  }


  const dateObject =
    new Date(date)


  return dateObject.toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  )

}


// =====================================================
// FORMAT AMOUNT
// =====================================================

const formatAmount = (amount) => {

  return Number(
    amount || 0
  ).toLocaleString(
    'en-IN'
  )

}


// =====================================================
// LOAD BOOKINGS
// =====================================================

const loadBookings = async () => {

  /*
   * Later connect your API here.
   *
   * Example:
   *
   * const response =
   *   await bookingService.getMyBookings()
   *
   * bookings.value =
   *   response.data
   */

}


// =====================================================
// ON MOUNT
// =====================================================

onMounted(() => {

  loadBookings()

})

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.my-bookings-page {

  min-height: 100%;

  padding: 28px;

  background: #f5f7fb;

}


/* =====================================================
   PAGE HEADER
===================================================== */

.page-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 24px;

}


.page-title {

  color: #172033;

  font-size: 28px;

  font-weight: 700;

}


.page-subtitle {

  margin-top: 5px;

  color: #6b7280;

  font-size: 15px;

}


/* =====================================================
   STAT CARD
===================================================== */

.stat-card {

  height: 100%;

  border-radius: 16px;

  background: white;

  box-shadow:
    0 5px 20px rgba(
      0,
      0,
      0,
      0.04
    );

}


.stat-content {

  display: flex;

  align-items: center;

  gap: 15px;

}


.stat-icon {

  display: flex;

  align-items: center;

  justify-content: center;

  width: 55px;

  height: 55px;

  border-radius: 14px;

}


.total-icon {

  background: #eef4fb;

}


.confirmed-icon {

  background: #eaf8ef;

}


.pending-icon {

  background: #fff6e6;

}


.completed-icon {

  background: #e8f7f5;

}


.stat-label {

  color: #7b8494;

  font-size: 13px;

}


.stat-value {

  margin-top: 4px;

  color: #172033;

  font-size: 25px;

  font-weight: 700;

}


/* =====================================================
   FILTER
===================================================== */

.filter-card {

  border-radius: 16px;

  background: white;

  box-shadow:
    0 5px 20px rgba(
      0,
      0,
      0,
      0.04
    );

}


/* =====================================================
   SECTION HEADER
===================================================== */

.section-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 15px;

}


.section-title {

  color: #172033;

  font-size: 20px;

  font-weight: 700;

}


.section-subtitle {

  margin-top: 4px;

  color: #7b8494;

  font-size: 13px;

}


/* =====================================================
   BOOKING CARD
===================================================== */

.booking-card {

  margin-bottom: 16px;

  border-radius: 16px;

  background: white;

  box-shadow:
    0 5px 20px rgba(
      0,
      0,
      0,
      0.04
    );

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

}


.booking-card:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 25px rgba(
      0,
      0,
      0,
      0.08
    );

}


/* =====================================================
   VEHICLE
===================================================== */

.vehicle-section {

  display: flex;

  align-items: center;

  gap: 15px;

}


.vehicle-image {

  display: flex;

  align-items: center;

  justify-content: center;

  width: 90px;

  height: 80px;

  flex-shrink: 0;

  border-radius: 14px;

  background: #eef4fb;

}


.vehicle-name {

  color: #172033;

  font-size: 17px;

  font-weight: 700;

}


.vehicle-type {

  margin-top: 5px;

  color: #7b8494;

  font-size: 13px;

}


/* =====================================================
   BOOKING NUMBER
===================================================== */

.booking-number {

  margin-bottom: 15px;

  color: #1976d2;

  font-size: 15px;

  font-weight: 700;

}


/* =====================================================
   DETAILS
===================================================== */

.detail-grid {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 18px;

}


.detail-item {

  display: flex;

  align-items: flex-start;

  gap: 9px;

}


.detail-label {

  color: #8a92a0;

  font-size: 11px;

}


.detail-value {

  margin-top: 3px;

  color: #3e4654;

  font-size: 13px;

  font-weight: 600;

  line-height: 1.4;

}


/* =====================================================
   RIGHT SIDE
===================================================== */

.booking-right {

  display: flex;

  flex-direction: column;

  align-items: flex-end;

  height: 100%;

}


.status-badge {

  padding: 7px 12px;

  border-radius: 20px;

  font-size: 12px;

  font-weight: 600;

}


.booking-price {

  margin-top: 15px;

  text-align: right;

}


.price-label {

  color: #7b8494;

  font-size: 12px;

}


.price-value {

  margin-top: 3px;

  color: #1976d2;

  font-size: 22px;

  font-weight: 700;

}


.booking-actions {

  display: flex;

  flex-wrap: wrap;

  justify-content: flex-end;

  margin-top: auto;

  gap: 4px;

}


/* =====================================================
   EMPTY
===================================================== */

.empty-card {

  border-radius: 16px;

  background: white;

}


.empty-content {

  display: flex;

  align-items: center;

  flex-direction: column;

  justify-content: center;

  padding: 70px 20px;

  text-align: center;

}


.empty-title {

  margin-top: 15px;

  color: #172033;

  font-size: 20px;

  font-weight: 700;

}


.empty-text {

  margin-top: 6px;

  color: #7b8494;

  font-size: 14px;

}


/* =====================================================
   DIALOG
===================================================== */

.dialog-title {

  display: flex;

  align-items: center;

  gap: 10px;

  color: #172033;

  font-size: 20px;

  font-weight: 700;

}


.dialog-text {

  color: #4f5969;

  font-size: 15px;

  line-height: 1.6;

}


.dialog-text strong {

  color: #172033;

}


.cancel-note {

  padding: 12px;

  border-radius: 10px;

  background: #fff7ed;

  color: #9a5b16;

  font-size: 13px;

  line-height: 1.5;

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 768px) {

  .my-bookings-page {

    padding: 16px;

  }


  .page-header {

    align-items: flex-start;

    flex-direction: column;

    gap: 12px;

  }


  .page-title {

    font-size: 23px;

  }


  .page-header .q-btn {

    width: 100%;

  }


  .detail-grid {

    grid-template-columns: 1fr;

  }


  .booking-right {

    align-items: flex-start;

  }


  .booking-price {

    text-align: left;

  }


  .booking-actions {

    justify-content: flex-start;

    margin-top: 15px;

  }

}

</style>
