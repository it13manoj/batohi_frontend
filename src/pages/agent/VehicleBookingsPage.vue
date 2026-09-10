<template>
  <q-page class="agent-bookings-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Vehicle Bookings
        </div>

        <div class="text-grey-7">
          Manage bookings for your vehicles
        </div>
      </div>

      <q-btn
        flat
        round
        dense
        icon="refresh"
        color="primary"
        :loading="loading"
        @click="getBookings"
      >
        <q-tooltip>
          Refresh Bookings
        </q-tooltip>
      </q-btn>

    </div>


    <!-- =====================================================
         SUMMARY CARDS
    ====================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- TOTAL -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="summary-card"
        >

          <q-card-section class="row items-center">

            <q-avatar
              color="blue-1"
              text-color="primary"
              icon="event"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Total Bookings
              </div>

              <div class="text-h5 text-weight-bold">
                {{ bookings.length }}
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- PENDING -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="summary-card"
        >

          <q-card-section class="row items-center">

            <q-avatar
              color="orange-1"
              text-color="orange"
              icon="schedule"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Pending
              </div>

              <div class="text-h5 text-weight-bold">
                {{ pendingBookings }}
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- CONFIRMED -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="summary-card"
        >

          <q-card-section class="row items-center">

            <q-avatar
              color="green-1"
              text-color="positive"
              icon="check_circle"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Confirmed
              </div>

              <div class="text-h5 text-weight-bold">
                {{ confirmedBookings }}
              </div>

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

          <q-card-section class="row items-center">

            <q-avatar
              color="purple-1"
              text-color="purple"
              icon="task_alt"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Completed
              </div>

              <div class="text-h5 text-weight-bold">
                {{ completedBookings }}
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         BOOKINGS TABLE
    ====================================================== -->
    <q-card
      flat
      bordered
      class="main-card"
    >

      <!-- FILTERS -->
      <q-card-section>

        <div class="row q-col-gutter-md items-center">

          <!-- SEARCH -->
          <div class="col-12 col-md-4">

            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search booking, customer or vehicle..."
            >

              <template #prepend>
                <q-icon name="search" />
              </template>

            </q-input>

          </div>


          <!-- BOOKING STATUS -->
          <div class="col-12 col-sm-6 col-md-3">

            <q-select
              v-model="statusFilter"
              :options="statusOptions"
              outlined
              dense
              emit-value
              map-options
              clearable
              label="Booking Status"
            />

          </div>


          <!-- PAYMENT STATUS -->
          <div class="col-12 col-sm-6 col-md-3">

            <q-select
              v-model="paymentFilter"
              :options="paymentOptions"
              outlined
              dense
              emit-value
              map-options
              clearable
              label="Payment Status"
            />

          </div>


          <!-- RESET -->
          <div class="col-12 col-md-2">

            <q-btn
              outline
              color="primary"
              icon="filter_alt_off"
              label="Reset"
              class="full-width"
              @click="resetFilters"
            />

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- TABLE -->
      <q-card-section class="q-pa-none">

        <q-table
          flat
          :rows="filteredBookings"
          :columns="columns"
          row-key="id"
          :loading="loading"
          :pagination="pagination"
          class="bookings-table"
          no-data-label="No bookings found"
        >

          <!-- =================================================
               BOOKING
          ================================================== -->
          <template #body-cell-booking="props">

            <q-td :props="props">

              <div>

                <div class="booking-id">
                  #{{ props.row.bookingNumber }}
                </div>

                <div class="text-caption text-grey-7">
                  {{ formatDate(props.row.createdAt) }}
                </div>

              </div>

            </q-td>

          </template>


          <!-- =================================================
               CUSTOMER
          ================================================== -->
          <template #body-cell-customer="props">

            <q-td :props="props">

              <div class="row items-center no-wrap">

                <q-avatar
                  size="40px"
                  color="primary"
                  text-color="white"
                >
                  {{ getInitials(props.row.customerName) }}
                </q-avatar>

                <div class="q-ml-sm">

                  <div class="text-weight-medium">
                    {{ props.row.customerName }}
                  </div>

                  <div class="text-caption text-grey-7">
                    {{ props.row.customerMobile }}
                  </div>

                </div>

              </div>

            </q-td>

          </template>


          <!-- =================================================
               VEHICLE
          ================================================== -->
          <template #body-cell-vehicle="props">

            <q-td :props="props">

              <div class="row items-center no-wrap">

                <q-avatar
                  rounded
                  size="48px"
                  class="vehicle-avatar"
                >

                  <img
                    :src="
                      props.row.vehicleImage ||
                      defaultVehicleImage
                    "
                    alt="Vehicle"
                  />

                </q-avatar>

                <div class="q-ml-sm">

                  <div class="text-weight-medium">
                    {{ props.row.vehicleName }}
                  </div>

                  <div class="text-caption text-grey-7">
                    {{ props.row.registrationNumber }}
                  </div>

                </div>

              </div>

            </q-td>

          </template>


          <!-- =================================================
               TRIP DATE
          ================================================== -->
          <template #body-cell-trip="props">

            <q-td :props="props">

              <div class="date-item">

                <q-icon
                  name="event"
                  size="17px"
                  color="primary"
                />

                <div>

                  <div class="text-weight-medium">
                    {{ formatDate(props.row.startDate) }}
                  </div>

                  <div class="text-caption text-grey-7">

                    {{
                      formatDate(
                        props.row.endDate
                      )
                    }}

                  </div>

                </div>

              </div>

            </q-td>

          </template>


          <!-- =================================================
               AMOUNT
          ================================================== -->
          <template #body-cell-amount="props">

            <q-td :props="props">

              <div class="text-weight-bold">
                ₹{{ formatPrice(props.row.amount) }}
              </div>

              <div class="text-caption text-grey-7">
                Total
              </div>

            </q-td>

          </template>


          <!-- =================================================
               BOOKING STATUS
          ================================================== -->
          <template #body-cell-status="props">

            <q-td
              :props="props"
              class="text-center"
            >

              <q-chip
                dense
                :color="
                  getBookingStatusColor(
                    props.row.status
                  )
                "
                text-color="white"
              >

                <q-icon
                  :name="
                    getBookingStatusIcon(
                      props.row.status
                    )
                  "
                  size="15px"
                  class="q-mr-xs"
                />

                {{ props.row.status }}

              </q-chip>

            </q-td>

          </template>


          <!-- =================================================
               PAYMENT STATUS
          ================================================== -->
          <template #body-cell-payment="props">

            <q-td
              :props="props"
              class="text-center"
            >

              <q-chip
                dense
                :color="
                  getPaymentStatusColor(
                    props.row.paymentStatus
                  )
                "
                text-color="white"
              >

                {{ props.row.paymentStatus }}

              </q-chip>

            </q-td>

          </template>


          <!-- =================================================
               ACTIONS
          ================================================== -->
          <template #body-cell-actions="props">

            <q-td
              :props="props"
              class="text-right"
            >

              <!-- VIEW -->
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="visibility"
                @click="viewBooking(props.row)"
              >

                <q-tooltip>
                  View Booking
                </q-tooltip>

              </q-btn>


              <!-- CONFIRM -->
              <q-btn
                v-if="
                  props.row.status === 'Pending'
                "
                flat
                round
                dense
                color="positive"
                icon="check_circle"
                @click="
                  updateBookingStatus(
                    props.row,
                    'Confirmed'
                  )
                "
              >

                <q-tooltip>
                  Confirm Booking
                </q-tooltip>

              </q-btn>


              <!-- CANCEL -->
              <q-btn
                v-if="
                  props.row.status === 'Pending' ||
                  props.row.status === 'Confirmed'
                "
                flat
                round
                dense
                color="negative"
                icon="cancel"
                @click="
                  updateBookingStatus(
                    props.row,
                    'Cancelled'
                  )
                "
              >

                <q-tooltip>
                  Cancel Booking
                </q-tooltip>

              </q-btn>


              <!-- COMPLETE -->
              <q-btn
                v-if="
                  props.row.status === 'Confirmed'
                "
                flat
                round
                dense
                color="purple"
                icon="task_alt"
                @click="
                  updateBookingStatus(
                    props.row,
                    'Completed'
                  )
                "
              >

                <q-tooltip>
                  Mark Completed
                </q-tooltip>

              </q-btn>

            </q-td>

          </template>

        </q-table>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         BOOKING DETAILS DIALOG
    ====================================================== -->
    <q-dialog v-model="detailsDialog">

      <q-card class="booking-details-dialog">

        <!-- HEADER -->
        <q-card-section
          class="row items-center justify-between"
        >

          <div>

            <div class="text-h6 text-weight-bold">
              Booking Details
            </div>

            <div
              v-if="selectedBooking"
              class="text-caption text-grey-7"
            >
              #{{ selectedBooking.bookingNumber }}
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


        <q-card-section
          v-if="selectedBooking"
          class="q-gutter-md"
        >

          <!-- CUSTOMER -->
          <div class="detail-section">

            <div class="detail-section-title">
              Customer Information
            </div>

            <div class="row q-col-gutter-md">

              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Customer Name
                  </span>

                  <strong>
                    {{ selectedBooking.customerName }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Mobile
                  </span>

                  <strong>
                    {{ selectedBooking.customerMobile }}
                  </strong>

                </div>

              </div>


              <div class="col-12">

                <div class="detail-item">

                  <span>
                    Email
                  </span>

                  <strong>
                    {{ selectedBooking.customerEmail || '-' }}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          <!-- VEHICLE -->
          <div class="detail-section">

            <div class="detail-section-title">
              Vehicle Information
            </div>

            <div class="row q-col-gutter-md">

              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Vehicle
                  </span>

                  <strong>
                    {{ selectedBooking.vehicleName }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Registration Number
                  </span>

                  <strong>
                    {{ selectedBooking.registrationNumber }}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          <!-- TRIP -->
          <div class="detail-section">

            <div class="detail-section-title">
              Trip Information
            </div>

            <div class="row q-col-gutter-md">

              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Pickup Location
                  </span>

                  <strong>
                    {{ selectedBooking.pickupLocation || '-' }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Drop Location
                  </span>

                  <strong>
                    {{ selectedBooking.dropLocation || '-' }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Start Date
                  </span>

                  <strong>
                    {{ formatDate(selectedBooking.startDate) }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    End Date
                  </span>

                  <strong>
                    {{ formatDate(selectedBooking.endDate) }}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          <!-- PAYMENT -->
          <div class="detail-section">

            <div class="detail-section-title">
              Payment Information
            </div>

            <div class="row q-col-gutter-md">

              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{{ formatPrice(selectedBooking.amount) }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Payment Status
                  </span>

                  <strong>
                    {{ selectedBooking.paymentStatus }}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          <!-- NOTES -->
          <div
            v-if="selectedBooking.notes"
            class="detail-section"
          >

            <div class="detail-section-title">
              Notes
            </div>

            <div class="notes-box">
              {{ selectedBooking.notes }}
            </div>

          </div>

        </q-card-section>


        <!-- FOOTER -->
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

          <q-btn
            v-if="
              selectedBooking &&
              selectedBooking.status === 'Pending'
            "
            color="positive"
            icon="check"
            label="Confirm"
            unelevated
            @click="
              updateBookingStatus(
                selectedBooking,
                'Confirmed'
              )
            "
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

import axios from 'axios'


/* =========================================================
   QUASAR
========================================================= */

const $q = useQuasar()


/* =========================================================
   DEFAULT IMAGE
========================================================= */

const defaultVehicleImage =
  'https://cdn.quasar.dev/img/parallax2.jpg'


/* =========================================================
   TABLE COLUMNS
========================================================= */

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
    field: 'customerName',
    align: 'left',
    sortable: true
  },

  {
    name: 'vehicle',
    label: 'Vehicle',
    field: 'vehicleName',
    align: 'left',
    sortable: true
  },

  {
    name: 'trip',
    label: 'Trip',
    field: 'startDate',
    align: 'left',
    sortable: true
  },

  {
    name: 'amount',
    label: 'Amount',
    field: 'amount',
    align: 'left',
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
    name: 'payment',
    label: 'Payment',
    field: 'paymentStatus',
    align: 'center',
    sortable: true
  },

  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'right'
  }

]


/* =========================================================
   PAGINATION
========================================================= */

const pagination = ref({

  page: 1,

  rowsPerPage: 10

})


/* =========================================================
   BOOKINGS
========================================================= */

const bookings = ref([])

const loading = ref(false)


/* =========================================================
   FILTERS
========================================================= */

const search = ref('')

const statusFilter = ref(null)

const paymentFilter = ref(null)


/* =========================================================
   FILTER OPTIONS
========================================================= */

const statusOptions = [

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
  }

]


const paymentOptions = [

  {
    label: 'Paid',
    value: 'Paid'
  },

  {
    label: 'Pending',
    value: 'Pending'
  },

  {
    label: 'Failed',
    value: 'Failed'
  },

  {
    label: 'Refunded',
    value: 'Refunded'
  }

]


/* =========================================================
   DETAILS DIALOG
========================================================= */

const detailsDialog = ref(false)

const selectedBooking = ref(null)


/* =========================================================
   FILTERED BOOKINGS
========================================================= */

const filteredBookings = computed(() => {

  const keyword =
    search.value
      .toLowerCase()
      .trim()


  return bookings.value.filter(
    booking => {

      const matchesSearch =

        !keyword ||

        booking.bookingNumber
          ?.toLowerCase()
          .includes(keyword) ||

        booking.customerName
          ?.toLowerCase()
          .includes(keyword) ||

        booking.customerMobile
          ?.toLowerCase()
          .includes(keyword) ||

        booking.vehicleName
          ?.toLowerCase()
          .includes(keyword) ||

        booking.registrationNumber
          ?.toLowerCase()
          .includes(keyword)


      const matchesStatus =

        !statusFilter.value ||

        booking.status ===
        statusFilter.value


      const matchesPayment =

        !paymentFilter.value ||

        booking.paymentStatus ===
        paymentFilter.value


      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      )

    }
  )

})


/* =========================================================
   SUMMARY
========================================================= */

const pendingBookings = computed(() => {

  return bookings.value.filter(
    booking =>
      booking.status === 'Pending'
  ).length

})


const confirmedBookings = computed(() => {

  return bookings.value.filter(
    booking =>
      booking.status === 'Confirmed'
  ).length

})


const completedBookings = computed(() => {

  return bookings.value.filter(
    booking =>
      booking.status === 'Completed'
  ).length

})


/* =========================================================
   GET BOOKINGS
========================================================= */

const getBookings = async () => {

  try {

    loading.value = true


    /*
     * Change this endpoint if your backend
     * uses another booking API.
     */

    const response =
      await axios.get(
        '/agents/bookings'
      )


    const data =
      response.data?.data ||
      response.data ||
      []


    bookings.value =
      Array.isArray(data)
        ? data.map(normalizeBooking)
        : []


  } catch (error) {

    console.error(
      'Get Bookings Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        error.response?.data?.message ||
        'Unable to load vehicle bookings.'

    })

  } finally {

    loading.value = false

  }

}


/* =========================================================
   NORMALIZE BOOKING
========================================================= */

const normalizeBooking = booking => {

  return {

    id:
      booking.id,

    bookingNumber:
      booking.bookingNumber ||
      booking.booking_number ||
      booking.bookingId ||
      booking.id,

    customerName:
      booking.customerName ||
      booking.customer?.name ||
      booking.user?.name ||
      'Customer',

    customerMobile:
      booking.customerMobile ||
      booking.customer?.mobile ||
      booking.user?.mobile ||
      '-',

    customerEmail:
      booking.customerEmail ||
      booking.customer?.email ||
      booking.user?.email ||
      '',

    vehicleName:
      booking.vehicleName ||
      booking.vehicle?.name ||
      'Vehicle',

    registrationNumber:
      booking.registrationNumber ||
      booking.vehicle?.registrationNumber ||
      '-',

    vehicleImage:
      booking.vehicleImage ||
      booking.vehicle?.image ||
      '',

    startDate:
      booking.startDate ||
      booking.pickupDate ||
      booking.bookingStartDate ||
      '',

    endDate:
      booking.endDate ||
      booking.dropDate ||
      booking.bookingEndDate ||
      '',

    pickupLocation:
      booking.pickupLocation ||
      booking.pickup_address ||
      booking.from ||
      '',

    dropLocation:
      booking.dropLocation ||
      booking.drop_address ||
      booking.to ||
      '',

    amount:
      booking.amount ||
      booking.totalAmount ||
      booking.total ||
      0,

    status:
      booking.status ||
      'Pending',

    paymentStatus:
      booking.paymentStatus ||
      booking.payment?.status ||
      'Pending',

    notes:
      booking.notes ||
      booking.description ||
      '',

    createdAt:
      booking.createdAt ||
      booking.created_at ||
      ''

  }

}


/* =========================================================
   VIEW BOOKING
========================================================= */

const viewBooking = booking => {

  selectedBooking.value =
    booking

  detailsDialog.value =
    true

}


/* =========================================================
   UPDATE BOOKING STATUS
========================================================= */

const updateBookingStatus = (
  booking,
  newStatus
) => {

  let message =
    `Are you sure you want to mark booking #${booking.bookingNumber} as ${newStatus.toLowerCase()}?`


  $q.dialog({

    title:
      `${newStatus} Booking`,

    message,

    cancel: {
      label: 'Cancel',
      flat: true
    },

    persistent: true,

    ok: {
      label: newStatus,
      color:
        newStatus === 'Cancelled'
          ? 'negative'
          : 'primary'
    }

  }).onOk(async () => {

    try {

      $q.loading.show({
        message:
          'Updating booking status...'
      })


      await axios.patch(

        `/agents/bookings/${booking.id}/status`,

        {
          status: newStatus
        }

      )


      booking.status =
        newStatus


      if (
        selectedBooking.value?.id ===
        booking.id
      ) {

        selectedBooking.value =
          booking

      }


      $q.notify({

        type: 'positive',

        message:
          `Booking ${newStatus.toLowerCase()} successfully.`

      })


    } catch (error) {

      console.error(
        'Update Booking Status Error:',
        error
      )


      $q.notify({

        type: 'negative',

        message:
          error.response?.data?.message ||
          'Unable to update booking status.'

      })

    } finally {

      $q.loading.hide()

    }

  })

}


/* =========================================================
   RESET FILTERS
========================================================= */

const resetFilters = () => {

  search.value = ''

  statusFilter.value = null

  paymentFilter.value = null

}


/* =========================================================
   FORMAT DATE
========================================================= */

const formatDate = date => {

  if (!date) {
    return '-'
  }


  const parsedDate =
    new Date(date)


  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }


  return parsedDate.toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  )

}


/* =========================================================
   FORMAT PRICE
========================================================= */

const formatPrice = amount => {

  return (
    Number(amount) || 0
  ).toLocaleString(
    'en-IN'
  )

}


/* =========================================================
   INITIALS
========================================================= */

const getInitials = name => {

  if (!name) {
    return 'C'
  }


  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()

}


/* =========================================================
   BOOKING STATUS COLOR
========================================================= */

const getBookingStatusColor = status => {

  switch (status) {

    case 'Pending':
      return 'orange'

    case 'Confirmed':
      return 'positive'

    case 'Completed':
      return 'purple'

    case 'Cancelled':
      return 'negative'

    default:
      return 'grey'

  }

}


/* =========================================================
   BOOKING STATUS ICON
========================================================= */

const getBookingStatusIcon = status => {

  switch (status) {

    case 'Pending':
      return 'schedule'

    case 'Confirmed':
      return 'check_circle'

    case 'Completed':
      return 'task_alt'

    case 'Cancelled':
      return 'cancel'

    default:
      return 'help'

  }

}


/* =========================================================
   PAYMENT STATUS COLOR
========================================================= */

const getPaymentStatusColor = status => {

  switch (status) {

    case 'Paid':
      return 'positive'

    case 'Pending':
      return 'orange'

    case 'Failed':
      return 'negative'

    case 'Refunded':
      return 'purple'

    default:
      return 'grey'

  }

}


/* =========================================================
   LOAD
========================================================= */

onMounted(() => {

  getBookings()

})

</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.agent-bookings-page {
  background: #f5f7fb;
  min-height: 100%;
}


/* =========================================================
   SUMMARY
========================================================= */

.summary-card {
  background: #ffffff;
  border-radius: 14px;
  transition: 0.2s ease;
}


.summary-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 24px
    rgba(15, 23, 42, 0.08);
}


/* =========================================================
   MAIN CARD
========================================================= */

.main-card {
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
}


/* =========================================================
   TABLE
========================================================= */

.bookings-table {
  width: 100%;
}


.booking-id {
  font-weight: 700;
  color: #1d4ed8;
}


.vehicle-avatar {
  background: #f1f5f9;
  border: 1px solid #e5e7eb;
}


.vehicle-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


/* =========================================================
   DATE
========================================================= */

.date-item {
  display: flex;
  align-items: center;
  gap: 8px;
}


/* =========================================================
   DETAILS DIALOG
========================================================= */

.booking-details-dialog {
  width: 700px;
  max-width: 95vw;
  border-radius: 16px;
}


/* =========================================================
   DETAIL SECTION
========================================================= */

.detail-section {
  margin-bottom: 18px;
}


.detail-section-title {
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 10px;
}


/* =========================================================
   DETAIL ITEM
========================================================= */

.detail-item {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 11px 14px;
}


.detail-item span {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}


.detail-item strong {
  display: block;
  font-size: 14px;
  color: #1f2937;
}


/* =========================================================
   NOTES
========================================================= */

.notes-box {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 14px;
  color: #4b5563;
  line-height: 1.6;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 768px) {

  .agent-bookings-page {
    padding: 12px !important;
  }


  .text-h5 {
    font-size: 21px;
  }


  .booking-details-dialog {
    width: 95vw;
  }

}

</style>
