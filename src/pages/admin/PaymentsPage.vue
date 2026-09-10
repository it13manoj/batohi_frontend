<template>
  <q-page class="payments-page">

    <!-- ================================================= -->
    <!-- PAGE HEADER -->
    <!-- ================================================= -->
    <div class="page-header">

      <div>
        <div class="page-title">
          Payments
        </div>

        <div class="page-subtitle">
          Manage and monitor all BatohiDrive payments
        </div>
      </div>

      <q-btn
        color="primary"
        icon="refresh"
        label="Refresh"
        no-caps
        unelevated
        :loading="loading"
        @click="loadPayments"
      />

    </div>


    <!-- ================================================= -->
    <!-- STAT CARDS -->
    <!-- ================================================= -->
    <div class="row q-col-gutter-md q-mb-md">

      <!-- Total Payments -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div>

                <div class="stat-label">
                  Total Payments
                </div>

                <div class="stat-value">
                  {{ payments.length }}
                </div>

              </div>

              <q-avatar
                size="52px"
                color="blue-1"
                text-color="primary"
              >
                <q-icon
                  name="payments"
                  size="28px"
                />
              </q-avatar>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Successful -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div>

                <div class="stat-label">
                  Successful
                </div>

                <div class="stat-value">
                  {{ successfulPayments }}
                </div>

              </div>

              <q-avatar
                size="52px"
                color="green-1"
                text-color="positive"
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
                  {{ pendingPayments }}
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


      <!-- Failed -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div>

                <div class="stat-label">
                  Failed
                </div>

                <div class="stat-value">
                  {{ failedPayments }}
                </div>

              </div>

              <q-avatar
                size="52px"
                color="red-1"
                text-color="negative"
              >
                <q-icon
                  name="error"
                  size="28px"
                />
              </q-avatar>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- REVENUE CARDS -->
    <!-- ================================================= -->
    <div class="row q-col-gutter-md q-mb-md">

      <!-- Total Revenue -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="small-stat-card">

          <q-card-section>

            <div class="small-stat-content">

              <q-icon
                name="account_balance_wallet"
                size="27px"
                color="positive"
              />

              <div class="q-ml-md">

                <div class="small-stat-label">
                  Total Revenue
                </div>

                <div class="small-stat-value">
                  ₹{{ formatNumber(totalRevenue) }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Today's Revenue -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="small-stat-card">

          <q-card-section>

            <div class="small-stat-content">

              <q-icon
                name="today"
                size="27px"
                color="primary"
              />

              <div class="q-ml-md">

                <div class="small-stat-label">
                  Today's Revenue
                </div>

                <div class="small-stat-value">
                  ₹{{ formatNumber(todayRevenue) }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Refunded -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="small-stat-card">

          <q-card-section>

            <div class="small-stat-content">

              <q-icon
                name="currency_exchange"
                size="27px"
                color="orange"
              />

              <div class="q-ml-md">

                <div class="small-stat-label">
                  Refunded
                </div>

                <div class="small-stat-value">
                  ₹{{ formatNumber(totalRefunded) }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Net Revenue -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="small-stat-card">

          <q-card-section>

            <div class="small-stat-content">

              <q-icon
                name="trending_up"
                size="27px"
                color="positive"
              />

              <div class="q-ml-md">

                <div class="small-stat-label">
                  Net Revenue
                </div>

                <div class="small-stat-value">
                  ₹{{ formatNumber(netRevenue) }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- PAYMENT TABLE -->
    <!-- ================================================= -->
    <q-card class="payment-card">

      <q-card-section>

        <!-- TABLE HEADER -->
        <div class="table-header">

          <div>

            <div class="table-title">
              Payment Transactions
            </div>

            <div class="table-subtitle">
              View and manage all customer payment transactions
            </div>

          </div>


          <div class="table-actions">

            <!-- Search -->
            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search payment..."
              style="width: 230px"
            >

              <template #prepend>
                <q-icon name="search" />
              </template>

            </q-input>


            <!-- Payment Status -->
            <q-select
              v-model="statusFilter"
              :options="statusOptions"
              emit-value
              map-options
              outlined
              dense
              style="width: 150px"
            />


            <!-- Payment Method -->
            <q-select
              v-model="methodFilter"
              :options="methodOptions"
              emit-value
              map-options
              outlined
              dense
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
          class="payment-table q-mt-md"
          :rows="filteredPayments"
          :columns="columns"
          row-key="id"
          :loading="loading"
          :rows-per-page-options="[10, 20, 50]"
        >

          <!-- Payment ID -->
          <template #body-cell-payment="props">

            <q-td :props="props">

              <div class="payment-id">
                {{ props.row.paymentId }}
              </div>

              <div class="transaction-id">
                {{ props.row.transactionId }}
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


          <!-- Booking -->
          <template #body-cell-booking="props">

            <q-td :props="props">

              <div class="booking-number">
                #{{ props.row.bookingNumber }}
              </div>

              <div class="vehicle-name">
                {{ props.row.vehicle }}
              </div>

            </q-td>

          </template>


          <!-- Amount -->
          <template #body-cell-amount="props">

            <q-td
              :props="props"
              class="text-right"
            >

              <div class="amount">
                ₹{{ formatNumber(props.row.amount) }}
              </div>

              <div class="payment-method">
                {{ props.row.method }}
              </div>

            </q-td>

          </template>


          <!-- Date -->
          <template #body-cell-date="props">

            <q-td :props="props">

              <div class="date-text">
                {{ props.row.date }}
              </div>

              <div class="date-time">
                {{ props.row.time }}
              </div>

            </q-td>

          </template>


          <!-- Status -->
          <template #body-cell-status="props">

            <q-td :props="props">

              <q-badge
                :color="getStatusColor(props.row.status)"
                rounded
                class="status-badge"
              >

                <q-icon
                  :name="getStatusIcon(props.row.status)"
                  size="15px"
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
                @click="viewPayment(props.row)"
              >

                <q-tooltip>
                  View Payment
                </q-tooltip>

              </q-btn>


              <!-- Refund -->
              <q-btn
                v-if="
                  props.row.status === 'Successful'
                "
                flat
                round
                dense
                color="orange"
                icon="currency_exchange"
                @click="openRefundDialog(props.row)"
              >

                <q-tooltip>
                  Refund Payment
                </q-tooltip>

              </q-btn>

            </q-td>

          </template>


          <!-- NO DATA -->
          <template #no-data>

            <div class="full-width text-center q-pa-xl">

              <q-icon
                name="payments"
                size="60px"
                color="grey-5"
              />

              <div class="text-h6 text-grey-7 q-mt-md">
                No payments found
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
    <!-- VIEW PAYMENT DIALOG -->
    <!-- ================================================= -->
    <q-dialog v-model="viewDialog">

      <q-card
        v-if="selectedPayment"
        class="payment-dialog"
      >

        <!-- Header -->
        <q-card-section>

          <div class="row items-center">

            <div>

              <div class="text-h6">
                Payment Details
              </div>

              <div class="text-caption text-grey">
                {{ selectedPayment.paymentId }}
              </div>

            </div>

            <q-space />

            <q-badge
              :color="
                getStatusColor(
                  selectedPayment.status
                )
              "
              rounded
            >
              {{ selectedPayment.status }}
            </q-badge>

          </div>

        </q-card-section>


        <q-separator />


        <!-- Payment Summary -->
        <q-card-section>

          <div class="section-title">
            Payment Summary
          </div>

          <div class="payment-summary">

            <div class="summary-amount">
              ₹{{ formatNumber(selectedPayment.amount) }}
            </div>

            <div class="summary-label">
              Payment Amount
            </div>

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
              size="48px"
              color="primary"
              text-color="white"
            >
              {{
                getInitials(
                  selectedPayment.customer.name
                )
              }}
            </q-avatar>

            <div class="q-ml-md">

              <div class="info-name">
                {{ selectedPayment.customer.name }}
              </div>

              <div class="info-text">
                {{ selectedPayment.customer.email }}
              </div>

              <div class="info-text">
                {{ selectedPayment.customer.mobile }}
              </div>

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <!-- Transaction -->
        <q-card-section>

          <div class="section-title">
            Transaction Information
          </div>

          <div class="transaction-details">

            <div>
              <span>Payment ID</span>

              <strong>
                {{ selectedPayment.paymentId }}
              </strong>
            </div>


            <div>
              <span>Transaction ID</span>

              <strong>
                {{ selectedPayment.transactionId }}
              </strong>
            </div>


            <div>
              <span>Booking ID</span>

              <strong>
                #{{ selectedPayment.bookingNumber }}
              </strong>
            </div>


            <div>
              <span>Payment Method</span>

              <strong>
                {{ selectedPayment.method }}
              </strong>
            </div>


            <div>
              <span>Date</span>

              <strong>
                {{ selectedPayment.date }}
              </strong>
            </div>


            <div>
              <span>Time</span>

              <strong>
                {{ selectedPayment.time }}
              </strong>
            </div>

          </div>

        </q-card-section>


        <q-separator />


        <!-- Vehicle -->
        <q-card-section>

          <div class="section-title">
            Booking Information
          </div>

          <div class="vehicle-box">

            <q-icon
              name="directions_car"
              size="40px"
              color="primary"
            />

            <div class="q-ml-md">

              <div class="info-name">
                {{ selectedPayment.vehicle }}
              </div>

              <div class="info-text">
                Booking #{{ selectedPayment.bookingNumber }}
              </div>

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
    <!-- REFUND DIALOG -->
    <!-- ================================================= -->
    <q-dialog v-model="refundDialog">

      <q-card
        style="width: 450px; max-width: 95vw;"
      >

        <q-card-section>

          <div class="text-h6">
            Refund Payment
          </div>

          <div class="text-caption text-grey">
            {{ selectedPayment?.paymentId }}
          </div>

        </q-card-section>


        <q-separator />


        <q-card-section>

          <div class="refund-warning">

            <q-icon
              name="warning"
              color="warning"
              size="28px"
            />

            <div class="q-ml-md">

              <div class="refund-title">
                Refund Confirmation
              </div>

              <div class="refund-text">
                Are you sure you want to refund this
                payment?
              </div>

            </div>

          </div>


          <div class="refund-amount">

            <span>
              Refund Amount
            </span>

            <strong>
              ₹{{ formatNumber(
                selectedPayment?.amount
              ) }}
            </strong>

          </div>


          <q-input
            v-model="refundReason"
            outlined
            type="textarea"
            label="Refund Reason"
            class="q-mt-md"
            rows="3"
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
            color="negative"
            label="Confirm Refund"
            unelevated
            :loading="refundLoading"
            @click="refundPayment"
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

const refundLoading = ref(false)

const search = ref('')

const statusFilter = ref('all')

const methodFilter = ref('all')

const viewDialog = ref(false)

const refundDialog = ref(false)

const selectedPayment = ref(null)

const refundReason = ref('')


// =====================================================
// STATUS OPTIONS
// =====================================================

const statusOptions = [

  {
    label: 'All Status',
    value: 'all'
  },

  {
    label: 'Successful',
    value: 'Successful'
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


// =====================================================
// PAYMENT METHOD OPTIONS
// =====================================================

const methodOptions = [

  {
    label: 'All Methods',
    value: 'all'
  },

  {
    label: 'UPI',
    value: 'UPI'
  },

  {
    label: 'Card',
    value: 'Card'
  },

  {
    label: 'Net Banking',
    value: 'Net Banking'
  },

  {
    label: 'Wallet',
    value: 'Wallet'
  },

  {
    label: 'Cash',
    value: 'Cash'
  }

]


// =====================================================
// TABLE COLUMNS
// =====================================================

const columns = [

  {
    name: 'payment',
    label: 'Payment',
    field: 'paymentId',
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
    name: 'booking',
    label: 'Booking',
    field: 'bookingNumber',
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
    name: 'date',
    label: 'Date',
    field: 'date',
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
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center'
  }

]


// =====================================================
// DEMO PAYMENT DATA
// =====================================================

const payments = ref([

  {
    id: 1,

    paymentId: 'PAY10001',

    transactionId: 'TXN782341',

    bookingNumber: 'BD10001',

    customer: {
      name: 'Rahul Kumar',
      email: 'rahul@gmail.com',
      mobile: '9876543210'
    },

    vehicle: 'Toyota Innova Crysta',

    amount: 9000,

    method: 'UPI',

    status: 'Successful',

    date: '25 Aug 2026',

    time: '10:32 AM'
  },


  {
    id: 2,

    paymentId: 'PAY10002',

    transactionId: 'TXN782342',

    bookingNumber: 'BD10002',

    customer: {
      name: 'Amit Sharma',
      email: 'amit@gmail.com',
      mobile: '9876543211'
    },

    vehicle: 'Maruti Swift Dzire',

    amount: 2800,

    method: 'Card',

    status: 'Successful',

    date: '25 Aug 2026',

    time: '09:15 AM'
  },


  {
    id: 3,

    paymentId: 'PAY10003',

    transactionId: 'TXN782343',

    bookingNumber: 'BD10003',

    customer: {
      name: 'Priya Singh',
      email: 'priya@gmail.com',
      mobile: '9876543212'
    },

    vehicle: 'Hyundai Creta',

    amount: 7600,

    method: 'UPI',

    status: 'Pending',

    date: '24 Aug 2026',

    time: '01:20 PM'
  },


  {
    id: 4,

    paymentId: 'PAY10004',

    transactionId: 'TXN782344',

    bookingNumber: 'BD10004',

    customer: {
      name: 'Neha Verma',
      email: 'neha@gmail.com',
      mobile: '9876543213'
    },

    vehicle: 'Honda City',

    amount: 6400,

    method: 'Cash',

    status: 'Successful',

    date: '22 Aug 2026',

    time: '06:30 PM'
  },


  {
    id: 5,

    paymentId: 'PAY10005',

    transactionId: 'TXN782345',

    bookingNumber: 'BD10005',

    customer: {
      name: 'Vikas Kumar',
      email: 'vikas@gmail.com',
      mobile: '9876543214'
    },

    vehicle: 'Mahindra XUV700',

    amount: 5200,

    method: 'UPI',

    status: 'Successful',

    date: '23 Aug 2026',

    time: '05:45 PM'
  },


  {
    id: 6,

    paymentId: 'PAY10006',

    transactionId: 'TXN782346',

    bookingNumber: 'BD10006',

    customer: {
      name: 'Anjali Gupta',
      email: 'anjali@gmail.com',
      mobile: '9876543215'
    },

    vehicle: 'Tata Nexon',

    amount: 3000,

    method: 'Card',

    status: 'Refunded',

    date: '19 Aug 2026',

    time: '09:30 PM'
  },


  {
    id: 7,

    paymentId: 'PAY10007',

    transactionId: 'TXN782347',

    bookingNumber: 'BD10007',

    customer: {
      name: 'Rohit Singh',
      email: 'rohit@gmail.com',
      mobile: '9876543216'
    },

    vehicle: 'Maruti Baleno',

    amount: 2400,

    method: 'UPI',

    status: 'Pending',

    date: '24 Aug 2026',

    time: '07:20 PM'
  },


  {
    id: 8,

    paymentId: 'PAY10008',

    transactionId: 'TXN782348',

    bookingNumber: 'BD10008',

    customer: {
      name: 'Pooja Sharma',
      email: 'pooja@gmail.com',
      mobile: '9876543217'
    },

    vehicle: 'BMW 5 Series',

    amount: 17000,

    method: 'Card',

    status: 'Successful',

    date: '20 Aug 2026',

    time: '06:45 PM'
  },


  {
    id: 9,

    paymentId: 'PAY10009',

    transactionId: 'TXN782349',

    bookingNumber: 'BD10009',

    customer: {
      name: 'Suresh Patel',
      email: 'suresh@gmail.com',
      mobile: '9876543218'
    },

    vehicle: 'Kia Seltos',

    amount: 4800,

    method: 'Net Banking',

    status: 'Failed',

    date: '21 Aug 2026',

    time: '03:15 PM'
  },


  {
    id: 10,

    paymentId: 'PAY10010',

    transactionId: 'TXN782350',

    bookingNumber: 'BD10010',

    customer: {
      name: 'Karan Mehta',
      email: 'karan@gmail.com',
      mobile: '9876543219'
    },

    vehicle: 'Toyota Fortuner',

    amount: 12500,

    method: 'UPI',

    status: 'Successful',

    date: '25 Aug 2026',

    time: '11:10 AM'
  }

])


// =====================================================
// FILTERED PAYMENTS
// =====================================================

const filteredPayments = computed(() => {

  let result = payments.value


  // Search
  if (search.value) {

    const keyword =
      search.value
        .toLowerCase()
        .trim()


    result = result.filter(
      payment =>

        payment.paymentId
          .toLowerCase()
          .includes(keyword)

        ||

        payment.transactionId
          .toLowerCase()
          .includes(keyword)

        ||

        payment.bookingNumber
          .toLowerCase()
          .includes(keyword)

        ||

        payment.customer.name
          .toLowerCase()
          .includes(keyword)

        ||

        payment.customer.mobile
          .includes(keyword)

        ||

        payment.vehicle
          .toLowerCase()
          .includes(keyword)

    )

  }


  // Status filter
  if (statusFilter.value !== 'all') {

    result = result.filter(
      payment =>
        payment.status ===
        statusFilter.value
    )

  }


  // Method filter
  if (methodFilter.value !== 'all') {

    result = result.filter(
      payment =>
        payment.method ===
        methodFilter.value
    )

  }


  return result

})


// =====================================================
// STATISTICS
// =====================================================

const successfulPayments = computed(() => {

  return payments.value.filter(
    payment =>
      payment.status === 'Successful'
  ).length

})


const pendingPayments = computed(() => {

  return payments.value.filter(
    payment =>
      payment.status === 'Pending'
  ).length

})


const failedPayments = computed(() => {

  return payments.value.filter(
    payment =>
      payment.status === 'Failed'
  ).length

})


const totalRevenue = computed(() => {

  return payments.value
    .filter(
      payment =>
        payment.status === 'Successful'
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount),
      0
    )

})


const todayRevenue = computed(() => {

  const today =
    '25 Aug 2026'

  return payments.value
    .filter(
      payment =>
        payment.status === 'Successful'
        &&
        payment.date === today
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount),
      0
    )

})


const totalRefunded = computed(() => {

  return payments.value
    .filter(
      payment =>
        payment.status === 'Refunded'
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount),
      0
    )

})


const netRevenue = computed(() => {

  return totalRevenue.value -
    totalRefunded.value

})


// =====================================================
// FORMAT NUMBER
// =====================================================

const formatNumber = (number) => {

  return Number(number || 0)
    .toLocaleString('en-IN')

}


// =====================================================
// GET INITIALS
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

    case 'Successful':
      return 'positive'

    case 'Pending':
      return 'warning'

    case 'Failed':
      return 'negative'

    case 'Refunded':
      return 'orange'

    default:
      return 'grey'

  }

}


// =====================================================
// STATUS ICON
// =====================================================

const getStatusIcon = (status) => {

  switch (status) {

    case 'Successful':
      return 'check_circle'

    case 'Pending':
      return 'schedule'

    case 'Failed':
      return 'error'

    case 'Refunded':
      return 'currency_exchange'

    default:
      return 'info'

  }

}


// =====================================================
// VIEW PAYMENT
// =====================================================

const viewPayment = (payment) => {

  selectedPayment.value = payment

  viewDialog.value = true

}


// =====================================================
// OPEN REFUND DIALOG
// =====================================================

const openRefundDialog = (payment) => {

  selectedPayment.value = payment

  refundReason.value = ''

  refundDialog.value = true

}


// =====================================================
// REFUND PAYMENT
// =====================================================

const refundPayment = async () => {

  if (!selectedPayment.value) {
    return
  }


  if (!refundReason.value.trim()) {

    Notify.create({
      type: 'warning',
      message:
        'Please enter refund reason'
    })

    return

  }


  refundLoading.value = true


  try {

    /*
      API will be connected here.

      Example:

      await api.post(
        `/admin/payments/${selectedPayment.value.id}/refund`,
        {
          reason: refundReason.value
        }
      )

    */


    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          700
        )
    )


    const index =
      payments.value.findIndex(
        payment =>
          payment.id ===
          selectedPayment.value.id
      )


    if (index !== -1) {

      payments.value[index].status =
        'Refunded'

    }


    Notify.create({
      type: 'positive',
      message:
        'Payment refunded successfully'
    })


    refundDialog.value = false

  }

  catch (error) {

    console.error(
      'Refund error:',
      error
    )

    Notify.create({
      type: 'negative',
      message:
        'Unable to refund payment'
    })

  }

  finally {

    refundLoading.value = false

  }

}


// =====================================================
// LOAD PAYMENTS
// =====================================================

const loadPayments = async () => {

  loading.value = true


  try {

    /*
      Connect your API here.

      Example:

      const response = await api.get(
        '/admin/payments'
      )

      payments.value =
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
      'Payment loading error:',
      error
    )

    Notify.create({
      type: 'negative',
      message:
        'Unable to load payments'
    })

  }

  finally {

    loading.value = false

  }

}

</script>


<style scoped>

.payments-page {

  padding: 24px;

  background: #f5f7fb;

  min-height: 100vh;

}


/* ================================================= */
/* PAGE HEADER */
/* ================================================= */

.page-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 24px;

}

.page-title {

  font-size: 28px;

  font-weight: 700;

  color: #1f2937;

}

.page-subtitle {

  font-size: 14px;

  color: #6b7280;

  margin-top: 4px;

}


/* ================================================= */
/* STAT CARD */
/* ================================================= */

.stat-card {

  border-radius: 14px;

  background: #ffffff;

  box-shadow:
    0 3px 15px
    rgba(0, 0, 0, 0.05);

}

.stat-content {

  display: flex;

  justify-content: space-between;

  align-items: center;

}

.stat-label {

  color: #6b7280;

  font-size: 14px;

}

.stat-value {

  color: #1f2937;

  font-size: 28px;

  font-weight: 700;

  margin-top: 6px;

}


/* ================================================= */
/* SMALL STAT CARD */
/* ================================================= */

.small-stat-card {

  border-radius: 12px;

  background: #ffffff;

  box-shadow:
    0 3px 15px
    rgba(0, 0, 0, 0.04);

}

.small-stat-content {

  display: flex;

  align-items: center;

}

.small-stat-label {

  font-size: 13px;

  color: #777;

}

.small-stat-value {

  font-size: 20px;

  font-weight: 700;

  margin-top: 3px;

}


/* ================================================= */
/* PAYMENT CARD */
/* ================================================= */

.payment-card {

  border-radius: 14px;

  background: #ffffff;

  box-shadow:
    0 3px 15px
    rgba(0, 0, 0, 0.05);

}


/* ================================================= */
/* TABLE HEADER */
/* ================================================= */

.table-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 20px;

}

.table-title {

  font-size: 19px;

  font-weight: 700;

}

.table-subtitle {

  color: #888;

  font-size: 13px;

  margin-top: 3px;

}

.table-actions {

  display: flex;

  align-items: center;

  gap: 10px;

}


/* ================================================= */
/* PAYMENT ID */
/* ================================================= */

.payment-id {

  font-weight: 700;

  color: #1976d2;

}

.transaction-id {

  font-size: 11px;

  color: #999;

  margin-top: 3px;

}


/* ================================================= */
/* CUSTOMER */
/* ================================================= */

.customer-info {

  display: flex;

  align-items: center;

}

.customer-name {

  font-weight: 600;

  color: #1f2937;

}

.customer-mobile {

  font-size: 11px;

  color: #999;

  margin-top: 2px;

}


/* ================================================= */
/* BOOKING */
/* ================================================= */

.booking-number {

  font-weight: 600;

  color: #1976d2;

}

.vehicle-name {

  font-size: 11px;

  color: #888;

  margin-top: 3px;

}


/* ================================================= */
/* AMOUNT */
/* ================================================= */

.amount {

  font-size: 15px;

  font-weight: 700;

}

.payment-method {

  font-size: 11px;

  color: #888;

  margin-top: 3px;

}


/* ================================================= */
/* DATE */
/* ================================================= */

.date-text {

  font-size: 12px;

  font-weight: 600;

}

.date-time {

  font-size: 11px;

  color: #888;

  margin-top: 3px;

}


/* ================================================= */
/* STATUS */
/* ================================================= */

.status-badge {

  padding: 6px 10px;

}


/* ================================================= */
/* PAYMENT DIALOG */
/* ================================================= */

.payment-dialog {

  width: 600px;

  max-width: 95vw;

}


/* ================================================= */
/* SECTION TITLE */
/* ================================================= */

.section-title {

  font-size: 15px;

  font-weight: 700;

  margin-bottom: 14px;

}


/* ================================================= */
/* PAYMENT SUMMARY */
/* ================================================= */

.payment-summary {

  padding: 20px;

  text-align: center;

  border-radius: 10px;

  background: #f7f8fa;

}

.summary-amount {

  font-size: 30px;

  font-weight: 700;

  color: #1976d2;

}

.summary-label {

  font-size: 12px;

  color: #888;

  margin-top: 4px;

}


/* ================================================= */
/* INFO BOX */
/* ================================================= */

.info-box {

  display: flex;

  align-items: center;

  padding: 12px;

  border-radius: 10px;

  background: #f7f8fa;

}

.info-name {

  font-weight: 600;

  color: #222;

}

.info-text {

  font-size: 12px;

  color: #777;

  margin-top: 2px;

}


/* ================================================= */
/* TRANSACTION DETAILS */
/* ================================================= */

.transaction-details {

  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 12px;

}

.transaction-details > div {

  padding: 12px;

  background: #f7f8fa;

  border-radius: 8px;

}

.transaction-details span {

  display: block;

  font-size: 11px;

  color: #888;

  margin-bottom: 5px;

}

.transaction-details strong {

  font-size: 13px;

  word-break: break-word;

}


/* ================================================= */
/* VEHICLE BOX */
/* ================================================= */

.vehicle-box {

  display: flex;

  align-items: center;

  padding: 14px;

  background: #f7f8fa;

  border-radius: 10px;

}


/* ================================================= */
/* REFUND */
/* ================================================= */

.refund-warning {

  display: flex;

  align-items: flex-start;

  padding: 14px;

  border-radius: 10px;

  background: #fff8e1;

}

.refund-title {

  font-weight: 700;

}

.refund-text {

  font-size: 12px;

  color: #777;

  margin-top: 4px;

}

.refund-amount {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 15px;

  margin-top: 15px;

  border-radius: 8px;

  background: #f7f8fa;

}

.refund-amount span {

  color: #777;

  font-size: 13px;

}

.refund-amount strong {

  font-size: 18px;

  color: #d32f2f;

}


/* ================================================= */
/* RESPONSIVE */
/* ================================================= */

@media (max-width: 1100px) {

  .table-header {

    flex-direction: column;

    align-items: stretch;

  }

  .table-actions {

    flex-wrap: wrap;

  }

}


@media (max-width: 600px) {

  .payments-page {

    padding: 15px;

  }

  .page-header {

    flex-direction: column;

    align-items: flex-start;

    gap: 15px;

  }

  .table-actions {

    flex-direction: column;

    align-items: stretch;

  }

  .table-actions .q-input,
  .table-actions .q-select {

    width: 100% !important;

  }

  .transaction-details {

    grid-template-columns: 1fr;

  }

}

</style>
