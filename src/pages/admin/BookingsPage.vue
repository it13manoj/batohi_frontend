<template>
  <q-page class="bookings-page">

    <!-- ================================================= -->
    <!-- PAGE HEADER -->
    <!-- ================================================= -->
    <div class="page-header">

      <div>
        <div class="page-title">
          Bookings
        </div>

        <div class="page-subtitle">
          Manage all BatohiDrive vehicle bookings
        </div>
      </div>

      <q-btn
        color="primary"
        icon="refresh"
        label="Refresh"
        unelevated
        no-caps
        :loading="loading"
        @click="loadBookings"
      />

    </div>


    <!-- ================================================= -->
    <!-- STAT CARDS -->
    <!-- ================================================= -->
    <div class="row q-col-gutter-md q-mb-md">

      <!-- Total -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div>

                <div class="stat-label">
                  Total Bookings
                </div>

                <div class="stat-value">
                  {{ bookings.length }}
                </div>

              </div>

              <q-avatar
                size="52px"
                color="blue-1"
                text-color="primary"
              >
                <q-icon
                  name="event"
                  size="28px"
                />
              </q-avatar>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Pending -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div>

                <div class="stat-label">
                  Pending
                </div>

                <div class="stat-value">
                  {{ pendingBookings }}
                </div>

              </div>

              <q-avatar
                size="52px"
                color="orange-1"
                text-color="orange"
              >
                <q-icon
                  name="schedule"
                  size="28px"
                />
              </q-avatar>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Active -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div>

                <div class="stat-label">
                  Active
                </div>

                <div class="stat-value">
                  {{ activeBookings }}
                </div>

              </div>

              <q-avatar
                size="52px"
                color="green-1"
                text-color="positive"
              >
                <q-icon
                  name="directions_car"
                  size="28px"
                />
              </q-avatar>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Completed -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div>

                <div class="stat-label">
                  Completed
                </div>

                <div class="stat-value">
                  {{ completedBookings }}
                </div>

              </div>

              <q-avatar
                size="52px"
                color="purple-1"
                text-color="purple"
              >
                <q-icon
                  name="check_circle"
                  size="28px"
                />
              </q-avatar>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- SECOND STAT ROW -->
    <!-- ================================================= -->
    <div class="row q-col-gutter-md q-mb-md">

      <!-- Cancelled -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="small-stat-card">

          <q-card-section>

            <div class="small-stat-content">

              <q-icon
                name="cancel"
                size="26px"
                color="negative"
              />

              <div class="q-ml-md">

                <div class="small-stat-label">
                  Cancelled
                </div>

                <div class="small-stat-value">
                  {{ cancelledBookings }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Total Revenue -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="small-stat-card">

          <q-card-section>

            <div class="small-stat-content">

              <q-icon
                name="payments"
                size="26px"
                color="positive"
              />

              <div class="q-ml-md">

                <div class="small-stat-label">
                  Booking Revenue
                </div>

                <div class="small-stat-value">
                  ₹{{ formatNumber(totalRevenue) }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Paid -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="small-stat-card">

          <q-card-section>

            <div class="small-stat-content">

              <q-icon
                name="paid"
                size="26px"
                color="primary"
              />

              <div class="q-ml-md">

                <div class="small-stat-label">
                  Paid Bookings
                </div>

                <div class="small-stat-value">
                  {{ paidBookings }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Unpaid -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="small-stat-card">

          <q-card-section>

            <div class="small-stat-content">

              <q-icon
                name="money_off"
                size="26px"
                color="warning"
              />

              <div class="q-ml-md">

                <div class="small-stat-label">
                  Unpaid
                </div>

                <div class="small-stat-value">
                  {{ unpaidBookings }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- BOOKING TABLE -->
    <!-- ================================================= -->
    <q-card class="booking-card">

      <q-card-section>

        <!-- TABLE HEADER -->
        <div class="table-header">

          <div>

            <div class="table-title">
              Booking List
            </div>

            <div class="table-subtitle">
              View and manage all customer bookings
            </div>

          </div>


          <div class="table-actions">

            <!-- Search -->
            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search booking..."
              style="width: 230px"
            >

              <template #prepend>
                <q-icon name="search" />
              </template>

            </q-input>


            <!-- Booking Status -->
            <q-select
              v-model="statusFilter"
              :options="statusOptions"
              outlined
              dense
              emit-value
              map-options
              style="width: 150px"
            />


            <!-- Payment Status -->
            <q-select
              v-model="paymentFilter"
              :options="paymentOptions"
              outlined
              dense
              emit-value
              map-options
              style="width: 150px"
            />

          </div>

        </div>


        <!-- ================================================= -->
        <!-- TABLE -->
        <!-- ================================================= -->
        <q-table
          flat
          bordered
          class="booking-table q-mt-md"
          :rows="filteredBookings"
          :columns="columns"
          row-key="id"
          :loading="loading"
          :rows-per-page-options="[10, 20, 50]"
        >

          <!-- Booking ID -->
          <template #body-cell-booking="props">

            <q-td :props="props">

              <div class="booking-id">
                #{{ props.row.bookingNumber }}
              </div>

              <div class="booking-created">
                {{ props.row.createdAt }}
              </div>

            </q-td>

          </template>


          <!-- Customer -->
          <template #body-cell-customer="props">

            <q-td :props="props">

              <div class="customer-info">

                <q-avatar
                  size="40px"
                  color="primary"
                  text-color="white"
                >
                  {{ getInitials(props.row.customer.name) }}
                </q-avatar>

                <div class="q-ml-sm">

                  <div class="customer-name">
                    {{ props.row.customer.name }}
                  </div>

                  <div class="customer-mobile">
                    {{ props.row.customer.mobile }}
                  </div>

                </div>

              </div>

            </q-td>

          </template>


          <!-- Vehicle -->
          <template #body-cell-vehicle="props">

            <q-td :props="props">

              <div class="vehicle-name">
                {{ props.row.vehicle.name }}
              </div>

              <div class="vehicle-number">
                {{ props.row.vehicle.registration }}
              </div>

            </q-td>

          </template>


          <!-- Pickup / Drop -->
          <template #body-cell-trip="props">

            <q-td :props="props">

              <div class="trip-location">

                <q-icon
                  name="location_on"
                  color="primary"
                  size="17px"
                />

                {{ props.row.pickup }}

              </div>

              <div class="trip-location drop-location">

                <q-icon
                  name="location_on"
                  color="negative"
                  size="17px"
                />

                {{ props.row.drop }}

              </div>

            </q-td>

          </template>


          <!-- Booking Date -->
          <template #body-cell-date="props">

            <q-td :props="props">

              <div class="date-text">
                {{ props.row.startDate }}
              </div>

              <div class="date-time">
                {{ props.row.startTime }}
              </div>

              <div class="date-arrow">
                →
              </div>

              <div class="date-text">
                {{ props.row.endDate }}
              </div>

            </q-td>

          </template>


          <!-- Amount -->
          <template #body-cell-amount="props">

            <q-td :props="props">

              <div class="amount">
                ₹{{ formatNumber(props.row.amount) }}
              </div>

              <div class="payment-method">
                {{ props.row.paymentMethod }}
              </div>

            </q-td>

          </template>


          <!-- Payment Status -->
          <template #body-cell-paymentStatus="props">

            <q-td :props="props">

              <q-badge
                :color="
                  props.row.paymentStatus === 'Paid'
                    ? 'positive'
                    : 'warning'
                "
                rounded
              >
                {{ props.row.paymentStatus }}
              </q-badge>

            </q-td>

          </template>


          <!-- Booking Status -->
          <template #body-cell-status="props">

            <q-td :props="props">

              <q-badge
                :color="getStatusColor(props.row.status)"
                rounded
                class="status-badge"
              >

                <q-icon
                  :name="getStatusIcon(props.row.status)"
                  class="q-mr-xs"
                />

                {{ props.row.status }}

              </q-badge>

            </q-td>

          </template>


          <!-- Actions -->
          <template #body-cell-actions="props">

            <q-td
              :props="props"
              class="text-center"
            >

              <!-- View -->
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


              <!-- Status -->
              <q-btn
                flat
                round
                dense
                color="orange"
                icon="edit"
                @click="openStatusDialog(props.row)"
              >

                <q-tooltip>
                  Update Status
                </q-tooltip>

              </q-btn>


              <!-- Cancel -->
              <q-btn
                v-if="
                  props.row.status !== 'Cancelled' &&
                  props.row.status !== 'Completed'
                "
                flat
                round
                dense
                color="negative"
                icon="cancel"
                @click="cancelBooking(props.row)"
              >

                <q-tooltip>
                  Cancel Booking
                </q-tooltip>

              </q-btn>

            </q-td>

          </template>


          <!-- No Data -->
          <template #no-data>

            <div class="full-width text-center q-pa-xl">

              <q-icon
                name="event_busy"
                size="60px"
                color="grey-5"
              />

              <div class="text-h6 text-grey-7 q-mt-md">
                No bookings found
              </div>

              <div class="text-grey-5">
                Try changing your search or filters.
              </div>

            </div>

          </template>

        </q-table>

      </q-card-section>

    </q-card>


    <!-- ================================================= -->
    <!-- VIEW BOOKING DIALOG -->
    <!-- ================================================= -->
    <q-dialog v-model="viewDialog">

      <q-card
        v-if="selectedBooking"
        class="booking-dialog"
      >

        <!-- Header -->
        <q-card-section>

          <div class="row items-center">

            <div>

              <div class="text-h6">
                Booking #{{ selectedBooking.bookingNumber }}
              </div>

              <div class="text-caption text-grey">
                Created {{ selectedBooking.createdAt }}
              </div>

            </div>

            <q-space />

            <q-badge
              :color="
                getStatusColor(selectedBooking.status)
              "
              rounded
            >
              {{ selectedBooking.status }}
            </q-badge>

          </div>

        </q-card-section>


        <q-separator />


        <!-- Customer -->
        <q-card-section>

          <div class="section-title">
            Customer Information
          </div>

          <div class="info-box">

            <q-avatar
              size="50px"
              color="primary"
              text-color="white"
            >
              {{
                getInitials(
                  selectedBooking.customer.name
                )
              }}
            </q-avatar>

            <div class="q-ml-md">

              <div class="info-name">
                {{ selectedBooking.customer.name }}
              </div>

              <div class="info-text">
                {{ selectedBooking.customer.email }}
              </div>

              <div class="info-text">
                {{ selectedBooking.customer.mobile }}
              </div>

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <!-- Vehicle -->
        <q-card-section>

          <div class="section-title">
            Vehicle Information
          </div>

          <div class="vehicle-box">

            <q-icon
              name="directions_car"
              size="40px"
              color="primary"
            />

            <div class="q-ml-md">

              <div class="info-name">
                {{ selectedBooking.vehicle.name }}
              </div>

              <div class="info-text">
                {{ selectedBooking.vehicle.registration }}
              </div>

              <div class="info-text">
                {{ selectedBooking.vehicle.type }}
              </div>

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <!-- Trip -->
        <q-card-section>

          <div class="section-title">
            Trip Information
          </div>

          <div class="trip-box">

            <div class="trip-item">

              <q-icon
                name="location_on"
                color="primary"
                size="22px"
              />

              <div>

                <div class="trip-label">
                  Pickup Location
                </div>

                <div class="trip-value">
                  {{ selectedBooking.pickup }}
                </div>

              </div>

            </div>


            <div class="trip-line"></div>


            <div class="trip-item">

              <q-icon
                name="location_on"
                color="negative"
                size="22px"
              />

              <div>

                <div class="trip-label">
                  Drop Location
                </div>

                <div class="trip-value">
                  {{ selectedBooking.drop }}
                </div>

              </div>

            </div>

          </div>


          <div class="row q-col-gutter-md q-mt-md">

            <div class="col-6">

              <div class="date-box">

                <div class="date-box-label">
                  Start Date
                </div>

                <div class="date-box-value">
                  {{ selectedBooking.startDate }}
                </div>

                <div class="date-box-time">
                  {{ selectedBooking.startTime }}
                </div>

              </div>

            </div>


            <div class="col-6">

              <div class="date-box">

                <div class="date-box-label">
                  End Date
                </div>

                <div class="date-box-value">
                  {{ selectedBooking.endDate }}
                </div>

                <div class="date-box-time">
                  {{ selectedBooking.endTime }}
                </div>

              </div>

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <!-- Payment -->
        <q-card-section>

          <div class="section-title">
            Payment Information
          </div>

          <div class="payment-details">

            <div>
              <span>Total Amount</span>
              <strong>
                ₹{{ formatNumber(selectedBooking.amount) }}
              </strong>
            </div>

            <div>
              <span>Payment Method</span>
              <strong>
                {{ selectedBooking.paymentMethod }}
              </strong>
            </div>

            <div>
              <span>Payment Status</span>

              <q-badge
                :color="
                  selectedBooking.paymentStatus === 'Paid'
                    ? 'positive'
                    : 'warning'
                "
                rounded
              >
                {{ selectedBooking.paymentStatus }}
              </q-badge>

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


    <!-- ================================================= -->
    <!-- UPDATE STATUS DIALOG -->
    <!-- ================================================= -->
    <q-dialog v-model="statusDialog">

      <q-card
        style="width: 450px; max-width: 95vw;"
      >

        <q-card-section>

          <div class="text-h6">
            Update Booking Status
          </div>

          <div class="text-caption text-grey">
            Booking #{{ selectedBooking?.bookingNumber }}
          </div>

        </q-card-section>


        <q-separator />


        <q-card-section>

          <q-select
            v-model="newStatus"
            label="Booking Status"
            :options="bookingStatusOptions"
            outlined
            emit-value
            map-options
          />

        </q-card-section>


        <q-card-actions align="right">

          <q-btn
            flat
            label="Cancel"
            color="grey"
            v-close-popup
          />

          <q-btn
            color="primary"
            label="Update Status"
            unelevated
            @click="updateBookingStatus"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>

import {
  ref,
  computed
} from 'vue'

import {
  Notify
} from 'quasar'


// =====================================================
// STATE
// =====================================================

const loading = ref(false)

const search = ref('')

const statusFilter = ref('all')

const paymentFilter = ref('all')

const viewDialog = ref(false)

const statusDialog = ref(false)

const selectedBooking = ref(null)

const newStatus = ref('Pending')


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
    label: 'Active',
    value: 'Active'
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
    label: 'All Payments',
    value: 'all'
  },

  {
    label: 'Paid',
    value: 'Paid'
  },

  {
    label: 'Unpaid',
    value: 'Unpaid'
  }

]


const bookingStatusOptions = [

  {
    label: 'Pending',
    value: 'Pending'
  },

  {
    label: 'Confirmed',
    value: 'Confirmed'
  },

  {
    label: 'Active',
    value: 'Active'
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
    name: 'vehicle',
    label: 'Vehicle',
    field: row => row.vehicle.name,
    align: 'left',
    sortable: true
  },

  {
    name: 'trip',
    label: 'Pickup / Drop',
    field: 'pickup',
    align: 'left'
  },

  {
    name: 'date',
    label: 'Booking Date',
    field: 'startDate',
    align: 'left',
    sortable: true
  },

  {
    name: 'amount',
    label: 'Amount',
    field: 'amount',
    align: 'right',
    sortable: true
  },

  {
    name: 'paymentStatus',
    label: 'Payment',
    field: 'paymentStatus',
    align: 'center'
  },

  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'center'
  },

  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center'
  }

]


// =====================================================
// DEMO BOOKINGS
// =====================================================

const bookings = ref([

  {
    id: 1,
    bookingNumber: 'BD10001',

    customer: {
      name: 'Rahul Kumar',
      email: 'rahul@gmail.com',
      mobile: '9876543210'
    },

    vehicle: {
      name: 'Toyota Innova Crysta',
      registration: 'MP09AB1234',
      type: 'SUV'
    },

    pickup: 'Indore Airport',
    drop: 'Bhopal',

    startDate: '25 Aug 2026',
    startTime: '10:00 AM',

    endDate: '27 Aug 2026',
    endTime: '06:00 PM',

    amount: 9000,

    paymentMethod: 'UPI',
    paymentStatus: 'Paid',

    status: 'Confirmed',

    createdAt: '24 Aug 2026, 04:30 PM'
  },


  {
    id: 2,
    bookingNumber: 'BD10002',

    customer: {
      name: 'Amit Sharma',
      email: 'amit@gmail.com',
      mobile: '9876543211'
    },

    vehicle: {
      name: 'Maruti Swift Dzire',
      registration: 'MP09CD5678',
      type: 'Sedan'
    },

    pickup: 'Indore Railway Station',
    drop: 'Ujjain',

    startDate: '25 Aug 2026',
    startTime: '09:00 AM',

    endDate: '25 Aug 2026',
    endTime: '09:00 PM',

    amount: 2800,

    paymentMethod: 'Card',
    paymentStatus: 'Paid',

    status: 'Active',

    createdAt: '23 Aug 2026, 11:20 AM'
  },


  {
    id: 3,
    bookingNumber: 'BD10003',

    customer: {
      name: 'Priya Singh',
      email: 'priya@gmail.com',
      mobile: '9876543212'
    },

    vehicle: {
      name: 'Hyundai Creta',
      registration: 'MP09EF9012',
      type: 'SUV'
    },

    pickup: 'Indore',
    drop: 'Mandu',

    startDate: '28 Aug 2026',
    startTime: '08:00 AM',

    endDate: '30 Aug 2026',
    endTime: '07:00 PM',

    amount: 7600,

    paymentMethod: 'UPI',
    paymentStatus: 'Unpaid',

    status: 'Pending',

    createdAt: '24 Aug 2026, 01:10 PM'
  },


  {
    id: 4,
    bookingNumber: 'BD10004',

    customer: {
      name: 'Neha Verma',
      email: 'neha@gmail.com',
      mobile: '9876543213'
    },

    vehicle: {
      name: 'Honda City',
      registration: 'MP09GH3456',
      type: 'Sedan'
    },

    pickup: 'Bhopal',
    drop: 'Indore',

    startDate: '20 Aug 2026',
    startTime: '09:00 AM',

    endDate: '22 Aug 2026',
    endTime: '06:00 PM',

    amount: 6400,

    paymentMethod: 'Cash',
    paymentStatus: 'Paid',

    status: 'Completed',

    createdAt: '18 Aug 2026, 10:45 AM'
  },


  {
    id: 5,
    bookingNumber: 'BD10005',

    customer: {
      name: 'Vikas Kumar',
      email: 'vikas@gmail.com',
      mobile: '9876543214'
    },

    vehicle: {
      name: 'Mahindra XUV700',
      registration: 'MP09IJ7890',
      type: 'SUV'
    },

    pickup: 'Indore',
    drop: 'Omkareshwar',

    startDate: '26 Aug 2026',
    startTime: '07:00 AM',

    endDate: '27 Aug 2026',
    endTime: '08:00 PM',

    amount: 5200,

    paymentMethod: 'UPI',
    paymentStatus: 'Paid',

    status: 'Confirmed',

    createdAt: '23 Aug 2026, 05:20 PM'
  },


  {
    id: 6,
    bookingNumber: 'BD10006',

    customer: {
      name: 'Anjali Gupta',
      email: 'anjali@gmail.com',
      mobile: '9876543215'
    },

    vehicle: {
      name: 'Tata Nexon',
      registration: 'MP09KL1122',
      type: 'SUV'
    },

    pickup: 'Indore',
    drop: 'Dewas',

    startDate: '19 Aug 2026',
    startTime: '10:00 AM',

    endDate: '19 Aug 2026',
    endTime: '08:00 PM',

    amount: 3000,

    paymentMethod: 'Card',
    paymentStatus: 'Paid',

    status: 'Cancelled',

    createdAt: '17 Aug 2026, 09:30 AM'
  },


  {
    id: 7,
    bookingNumber: 'BD10007',

    customer: {
      name: 'Rohit Singh',
      email: 'rohit@gmail.com',
      mobile: '9876543216'
    },

    vehicle: {
      name: 'Maruti Baleno',
      registration: 'MP09MN3344',
      type: 'Hatchback'
    },

    pickup: 'Indore',
    drop: 'Ujjain',

    startDate: '29 Aug 2026',
    startTime: '11:00 AM',

    endDate: '29 Aug 2026',
    endTime: '09:00 PM',

    amount: 2400,

    paymentMethod: 'UPI',
    paymentStatus: 'Unpaid',

    status: 'Pending',

    createdAt: '24 Aug 2026, 07:15 PM'
  },


  {
    id: 8,
    bookingNumber: 'BD10008',

    customer: {
      name: 'Pooja Sharma',
      email: 'pooja@gmail.com',
      mobile: '9876543217'
    },

    vehicle: {
      name: 'BMW 5 Series',
      registration: 'MP09OP5566',
      type: 'Luxury'
    },

    pickup: 'Indore',
    drop: 'Bhopal',

    startDate: '18 Aug 2026',
    startTime: '08:00 AM',

    endDate: '20 Aug 2026',
    endTime: '06:00 PM',

    amount: 17000,

    paymentMethod: 'Card',
    paymentStatus: 'Paid',

    status: 'Completed',

    createdAt: '15 Aug 2026, 03:40 PM'
  }

])


// =====================================================
// FILTERED BOOKINGS
// =====================================================

const filteredBookings = computed(() => {

  let result = bookings.value


  // Search
  if (search.value) {

    const keyword =
      search.value
        .toLowerCase()
        .trim()


    result = result.filter(
      booking =>

        booking.bookingNumber
          .toLowerCase()
          .includes(keyword)

        ||

        booking.customer.name
          .toLowerCase()
          .includes(keyword)

        ||

        booking.customer.mobile
          .includes(keyword)

        ||

        booking.vehicle.name
          .toLowerCase()
          .includes(keyword)

        ||

        booking.vehicle.registration
          .toLowerCase()
          .includes(keyword)

        ||

        booking.pickup
          .toLowerCase()
          .includes(keyword)

        ||

        booking.drop
          .toLowerCase()
          .includes(keyword)

    )

  }


  // Status
  if (statusFilter.value !== 'all') {

    result =
      result.filter(
        booking =>
          booking.status ===
          statusFilter.value
      )

  }


  // Payment
  if (paymentFilter.value !== 'all') {

    result =
      result.filter(
        booking =>
          booking.paymentStatus ===
          paymentFilter.value
      )

  }


  return result

})


// =====================================================
// STATISTICS
// =====================================================

const pendingBookings = computed(() => {

  return bookings.value.filter(
    booking =>
      booking.status === 'Pending'
  ).length

})


const activeBookings = computed(() => {

  return bookings.value.filter(
    booking =>
      booking.status === 'Active'
  ).length

})


const completedBookings = computed(() => {

  return bookings.value.filter(
    booking =>
      booking.status === 'Completed'
  ).length

})


const cancelledBookings = computed(() => {

  return bookings.value.filter(
    booking =>
      booking.status === 'Cancelled'
  ).length

})


const paidBookings = computed(() => {

  return bookings.value.filter(
    booking =>
      booking.paymentStatus === 'Paid'
  ).length

})


const unpaidBookings = computed(() => {

  return bookings.value.filter(
    booking =>
      booking.paymentStatus === 'Unpaid'
  ).length

})


const totalRevenue = computed(() => {

  return bookings.value
    .filter(
      booking =>
        booking.paymentStatus === 'Paid'
    )
    .reduce(
      (total, booking) =>
        total + Number(booking.amount),
      0
    )

})


// =====================================================
// FORMAT NUMBER
// =====================================================

const formatNumber = (number) => {

  return Number(number || 0)
    .toLocaleString('en-IN')

}


// =====================================================
// INITIALS
// =====================================================

const getInitials = (name) => {

  if (!name) {
    return 'U'
  }


  return name
    .split(' ')
    .map(
      word =>
        word.charAt(0)
    )
    .slice(0, 2)
    .join('')
    .toUpperCase()

}


// =====================================================
// STATUS COLOR
// =====================================================

const getStatusColor = (status) => {

  switch (status) {

    case 'Pending':
      return 'warning'

    case 'Confirmed':
      return 'primary'

    case 'Active':
      return 'positive'

    case 'Completed':
      return 'purple'

    case 'Cancelled':
      return 'negative'

    default:
      return 'grey'

  }

}


// =====================================================
// STATUS ICON
// =====================================================

const getStatusIcon = (status) => {

  switch (status) {

    case 'Pending':
      return 'schedule'

    case 'Confirmed':
      return 'check'

    case 'Active':
      return 'directions_car'

    case 'Completed':
      return 'check_circle'

    case 'Cancelled':
      return 'cancel'

    default:
      return 'info'

  }

}


// =====================================================
// VIEW BOOKING
// =====================================================

const viewBooking = (booking) => {

  selectedBooking.value = booking

  viewDialog.value = true

}


// =====================================================
// OPEN STATUS DIALOG
// =====================================================

const openStatusDialog = (booking) => {

  selectedBooking.value = booking

  newStatus.value = booking.status

  statusDialog.value = true

}


// =====================================================
// UPDATE BOOKING STATUS
// =====================================================

const updateBookingStatus = () => {

  if (!selectedBooking.value) {
    return
  }


  const index =
    bookings.value.findIndex(
      booking =>
        booking.id ===
        selectedBooking.value.id
    )


  if (index !== -1) {

    bookings.value[index].status =
      newStatus.value

  }


  Notify.create({
    type: 'positive',
    message:
      'Booking status updated successfully'
  })


  statusDialog.value = false

}


// =====================================================
// CANCEL BOOKING
// =====================================================

const cancelBooking = (booking) => {

  if (
    !confirm(
      `Are you sure you want to cancel booking #${booking.bookingNumber}?`
    )
  ) {
    return
  }


  const index =
    bookings.value.findIndex(
      item =>
        item.id === booking.id
    )


  if (index !== -1) {

    bookings.value[index].status =
      'Cancelled'


    Notify.create({
      type: 'positive',
      message:
        'Booking cancelled successfully'
    })

  }

}


// =====================================================
// LOAD BOOKINGS
// =====================================================

const loadBookings = async () => {

  loading.value = true


  try {

    /*
      API will be connected here.

      Example:

      const response = await api.get(
        '/admin/bookings'
      )

      bookings.value =
        response.data.data

    */

    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          500
        )
    )

  }

  catch (error) {

    console.error(
      'Booking loading error:',
      error
    )

    Notify.create({
      type: 'negative',
      message:
        'Unable to load bookings'
    })

  }

  finally {

    loading.value = false

  }

}

</script>


<style scoped>

.bookings-page {
  padding: 24px;
  background: #f5f7fb;
  min-height: 100vh;
}


/* ================================================= */
/* PAGE HEADER */
/* ================================================= */

.page-header {

  display: flex;

  justify-content:
    space-between;

  align-items:
    center;

  margin-bottom:
    24px;

}

.page-title {

  font-size:
    28px;

  font-weight:
    700;

  color:
    #1f2937;

}

.page-subtitle {

  font-size:
    14px;

  color:
    #6b7280;

  margin-top:
    4px;

}


/* ================================================= */
/* STAT CARD */
/* ================================================= */

.stat-card {

  border-radius:
    14px;

  background:
    #ffffff;

  box-shadow:
    0 3px 15px
    rgba(0, 0, 0, 0.05);

}

.stat-content {

  display:
    flex;

  justify-content:
    space-between;

  align-items:
    center;

}

.stat-label {

  color:
    #6b7280;

  font-size:
    14px;

}

.stat-value {

  color:
    #1f2937;

  font-size:
    28px;

  font-weight:
    700;

  margin-top:
    6px;

}


/* ================================================= */
/* SMALL STAT CARD */
/* ================================================= */

.small-stat-card {

  border-radius:
    12px;

  background:
    #ffffff;

  box-shadow:
    0 3px 15px
    rgba(0, 0, 0, 0.04);

}

.small-stat-content {

  display:
    flex;

  align-items:
    center;

}

.small-stat-label {

  font-size:
    13px;

  color:
    #777;

}

.small-stat-value {

  font-size:
    20px;

  font-weight:
    700;

  margin-top:
    3px;

}


/* ================================================= */
/* BOOKING CARD */
/* ================================================= */

.booking-card {

  border-radius:
    14px;

  background:
    #ffffff;

  box-shadow:
    0 3px 15px
    rgba(0, 0, 0, 0.05);

}


/* ================================================= */
/* TABLE HEADER */
/* ================================================= */

.table-header {

  display:
    flex;

  justify-content:
    space-between;

  align-items:
    center;

  gap:
    20px;

}

.table-title {

  font-size:
    19px;

  font-weight:
    700;

}

.table-subtitle {

  color:
    #888;

  font-size:
    13px;

  margin-top:
    3px;

}

.table-actions {

  display:
    flex;

  align-items:
    center;

  gap:
    10px;

}


/* ================================================= */
/* BOOKING */
/* ================================================= */

.booking-id {

  font-weight:
    700;

  color:
    #1976d2;

}

.booking-created {

  font-size:
    11px;

  color:
    #999;

  margin-top:
    3px;

}


/* ================================================= */
/* CUSTOMER */
/* ================================================= */

.customer-info {

  display:
    flex;

  align-items:
    center;

}

.customer-name {

  font-weight:
    600;

  color:
    #1f2937;

}

.customer-mobile {

  font-size:
    11px;

  color:
    #999;

  margin-top:
    2px;

}


/* ================================================= */
/* VEHICLE */
/* ================================================= */

.vehicle-name {

  font-weight:
    600;

}

.vehicle-number {

  font-size:
    11px;

  color:
    #888;

  margin-top:
    3px;

}


/* ================================================= */
/* TRIP */
/* ================================================= */

.trip-location {

  display:
    flex;

  align-items:
    center;

  gap:
    5px;

  font-size:
    12px;

}

.drop-location {

  margin-top:
    5px;

}


/* ================================================= */
/* DATE */
/* ================================================= */

.date-text {

  font-size:
    12px;

  font-weight:
    600;

}

.date-time {

  font-size:
    11px;

  color:
    #777;

}

.date-arrow {

  color:
    #aaa;

  font-size:
    12px;

  margin:
    2px 0;

}


/* ================================================= */
/* AMOUNT */
/* ================================================= */

.amount {

  font-weight:
    700;

}

.payment-method {

  font-size:
    11px;

  color:
    #888;

  margin-top:
    3px;

}


/* ================================================= */
/* STATUS */
/* ================================================= */

.status-badge {

  padding:
    6px 10px;

}


/* ================================================= */
/* BOOKING DIALOG */
/* ================================================= */

.booking-dialog {

  width:
    650px;

  max-width:
    95vw;

}


/* ================================================= */
/* SECTION */
/* ================================================= */

.section-title {

  font-size:
    15px;

  font-weight:
    700;

  margin-bottom:
    14px;

}


/* ================================================= */
/* INFO BOX */
/* ================================================= */

.info-box,
.vehicle-box {

  display:
    flex;

  align-items:
    center;

  padding:
    12px;

  border-radius:
    10px;

  background:
    #f7f8fa;

}

.info-name {

  font-weight:
    600;

  color:
    #222;

}

.info-text {

  font-size:
    12px;

  color:
    #777;

  margin-top:
    2px;

}


/* ================================================= */
/* TRIP BOX */
/* ================================================= */

.trip-box {

  padding:
    15px;

  border-radius:
    10px;

  background:
    #f7f8fa;

}

.trip-item {

  display:
    flex;

  align-items:
    flex-start;

  gap:
    10px;

}

.trip-label {

  font-size:
    11px;

  color:
    #888;

}

.trip-value {

  font-size:
    14px;

  font-weight:
    600;

  margin-top:
    3px;

}

.trip-line {

  width:
    2px;

  height:
    20px;

  background:
    #ddd;

  margin:
    2px 0 2px 10px;

}


/* ================================================= */
/* DATE BOX */
/* ================================================= */

.date-box {

  padding:
    12px;

  border-radius:
    8px;

  background:
    #f7f8fa;

}

.date-box-label {

  font-size:
    11px;

  color:
    #888;

}

.date-box-value {

  font-size:
    14px;

  font-weight:
    600;

  margin-top:
    4px;

}

.date-box-time {

  font-size:
    12px;

  color:
    #777;

  margin-top:
    2px;

}


/* ================================================= */
/* PAYMENT */
/* ================================================= */

.payment-details {

  display:
    grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap:
    15px;

}

.payment-details > div {

  padding:
    12px;

  background:
    #f7f8fa;

  border-radius:
    8px;

}

.payment-details span {

  display:
    block;

  font-size:
    11px;

  color:
    #888;

  margin-bottom:
    5px;

}

.payment-details strong {

  font-size:
    14px;

}


/* ================================================= */
/* RESPONSIVE */
/* ================================================= */

@media (max-width: 1100px) {

  .table-header {

    flex-direction:
      column;

    align-items:
      stretch;

  }

  .table-actions {

    flex-wrap:
      wrap;

  }

}


@media (max-width: 600px) {

  .bookings-page {

    padding:
      15px;

  }

  .page-header {

    flex-direction:
      column;

    align-items:
      flex-start;

    gap:
      15px;

  }

  .table-actions {

    flex-direction:
      column;

    align-items:
      stretch;

  }

  .table-actions .q-input,
  .table-actions .q-select {

    width:
      100% !important;

  }

  .payment-details {

    grid-template-columns:
      1fr;

  }

}

</style>
