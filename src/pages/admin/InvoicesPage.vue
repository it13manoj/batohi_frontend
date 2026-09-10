<template>
  <q-page class="invoices-page">

    <!-- ================================================= -->
    <!-- PAGE HEADER -->
    <!-- ================================================= -->
    <div class="page-header">

      <div>
        <div class="page-title">
          Invoices
        </div>

        <div class="page-subtitle">
          Manage customer invoices and billing records
        </div>
      </div>

      <div class="header-actions">

        <q-btn
          color="primary"
          icon="add"
          label="Create Invoice"
          no-caps
          unelevated
          @click="openCreateInvoice"
        />

        <q-btn
          flat
          round
          color="primary"
          icon="refresh"
          :loading="loading"
          @click="loadInvoices"
        >
          <q-tooltip>
            Refresh
          </q-tooltip>
        </q-btn>

      </div>

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
                  Total Invoices
                </div>

                <div class="stat-value">
                  {{ invoices.length }}
                </div>

              </div>

              <q-avatar
                size="52px"
                color="blue-1"
                text-color="primary"
              >
                <q-icon
                  name="receipt_long"
                  size="28px"
                />
              </q-avatar>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Paid -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div>

                <div class="stat-label">
                  Paid
                </div>

                <div class="stat-value">
                  {{ paidInvoices }}
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
                  {{ pendingInvoices }}
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


      <!-- Overdue -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <div>

                <div class="stat-label">
                  Overdue
                </div>

                <div class="stat-value">
                  {{ overdueInvoices }}
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
    <!-- REVENUE SUMMARY -->
    <!-- ================================================= -->
    <div class="row q-col-gutter-md q-mb-md">

      <div class="col-12 col-sm-6 col-md-4">

        <q-card class="summary-card">

          <q-card-section>

            <div class="summary-content">

              <q-icon
                name="payments"
                color="positive"
                size="30px"
              />

              <div class="q-ml-md">

                <div class="summary-label">
                  Total Invoiced
                </div>

                <div class="summary-value">
                  ₹{{ formatNumber(totalInvoiced) }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <div class="col-12 col-sm-6 col-md-4">

        <q-card class="summary-card">

          <q-card-section>

            <div class="summary-content">

              <q-icon
                name="check_circle"
                color="positive"
                size="30px"
              />

              <div class="q-ml-md">

                <div class="summary-label">
                  Total Paid
                </div>

                <div class="summary-value">
                  ₹{{ formatNumber(totalPaid) }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <div class="col-12 col-sm-6 col-md-4">

        <q-card class="summary-card">

          <q-card-section>

            <div class="summary-content">

              <q-icon
                name="pending_actions"
                color="orange"
                size="30px"
              />

              <div class="q-ml-md">

                <div class="summary-label">
                  Outstanding
                </div>

                <div class="summary-value">
                  ₹{{ formatNumber(outstandingAmount) }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- INVOICE TABLE -->
    <!-- ================================================= -->
    <q-card class="invoice-card">

      <q-card-section>

        <!-- TABLE HEADER -->
        <div class="table-header">

          <div>

            <div class="table-title">
              Invoice Records
            </div>

            <div class="table-subtitle">
              View and manage all customer invoices
            </div>

          </div>


          <div class="table-actions">

            <!-- Search -->
            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search invoice..."
              style="width: 240px"
            >

              <template #prepend>
                <q-icon name="search" />
              </template>

            </q-input>


            <!-- Status -->
            <q-select
              v-model="statusFilter"
              :options="statusOptions"
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
          class="invoice-table q-mt-md"
          :rows="filteredInvoices"
          :columns="columns"
          row-key="id"
          :loading="loading"
          :rows-per-page-options="[10, 20, 50]"
        >

          <!-- Invoice -->
          <template #body-cell-invoice="props">

            <q-td :props="props">

              <div class="invoice-number">
                {{ props.row.invoiceNumber }}
              </div>

              <div class="invoice-date">
                Issued: {{ props.row.issueDate }}
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
                {{ props.row.paymentMethod }}
              </div>

            </q-td>

          </template>


          <!-- Due Date -->
          <template #body-cell-dueDate="props">

            <q-td :props="props">

              <div class="date-text">
                {{ props.row.dueDate }}
              </div>

              <div
                v-if="props.row.status === 'Overdue'"
                class="overdue-text"
              >
                Payment overdue
              </div>

            </q-td>

          </template>


          <!-- Status -->
          <template #body-cell-status="props">

            <q-td
              :props="props"
              class="text-center"
            >

              <q-badge
                rounded
                :color="getStatusColor(props.row.status)"
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
                @click="viewInvoice(props.row)"
              >

                <q-tooltip>
                  View Invoice
                </q-tooltip>

              </q-btn>


              <!-- Print -->
              <q-btn
                flat
                round
                dense
                color="secondary"
                icon="print"
                @click="printInvoice(props.row)"
              >

                <q-tooltip>
                  Print Invoice
                </q-tooltip>

              </q-btn>


              <!-- Mark Paid -->
              <q-btn
                v-if="
                  props.row.status === 'Pending' ||
                  props.row.status === 'Overdue'
                "
                flat
                round
                dense
                color="positive"
                icon="check_circle"
                @click="markAsPaid(props.row)"
              >

                <q-tooltip>
                  Mark as Paid
                </q-tooltip>

              </q-btn>

            </q-td>

          </template>


          <!-- NO DATA -->
          <template #no-data>

            <div class="full-width text-center q-pa-xl">

              <q-icon
                name="receipt_long"
                size="60px"
                color="grey-5"
              />

              <div class="text-h6 text-grey-7 q-mt-md">
                No invoices found
              </div>

              <div class="text-grey-5">
                Try changing your search or filter.
              </div>

            </div>

          </template>

        </q-table>

      </q-card-section>

    </q-card>


    <!-- ================================================= -->
    <!-- VIEW INVOICE DIALOG -->
    <!-- ================================================= -->
    <q-dialog v-model="viewDialog">

      <q-card
        v-if="selectedInvoice"
        class="invoice-dialog"
      >

        <!-- Invoice Header -->
        <q-card-section>

          <div class="invoice-preview-header">

            <div>

              <div class="brand-name">
                BatohiDrive
              </div>

              <div class="brand-subtitle">
                Vehicle Booking & Rental Services
              </div>

            </div>

            <div class="invoice-title-section">

              <div class="invoice-title">
                INVOICE
              </div>

              <div class="invoice-number-preview">
                {{ selectedInvoice.invoiceNumber }}
              </div>

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <!-- Customer & Invoice Details -->
        <q-card-section>

          <div class="invoice-info-grid">

            <div>

              <div class="info-label">
                BILLED TO
              </div>

              <div class="info-name">
                {{ selectedInvoice.customer.name }}
              </div>

              <div class="info-text">
                {{ selectedInvoice.customer.email }}
              </div>

              <div class="info-text">
                {{ selectedInvoice.customer.mobile }}
              </div>

            </div>


            <div>

              <div class="info-label">
                INVOICE DETAILS
              </div>

              <div class="invoice-detail-row">

                <span>
                  Invoice Date
                </span>

                <strong>
                  {{ selectedInvoice.issueDate }}
                </strong>

              </div>

              <div class="invoice-detail-row">

                <span>
                  Due Date
                </span>

                <strong>
                  {{ selectedInvoice.dueDate }}
                </strong>

              </div>

              <div class="invoice-detail-row">

                <span>
                  Status
                </span>

                <q-badge
                  rounded
                  :color="
                    getStatusColor(
                      selectedInvoice.status
                    )
                  "
                >
                  {{ selectedInvoice.status }}
                </q-badge>

              </div>

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <!-- Booking Details -->
        <q-card-section>

          <div class="section-title">
            Booking Details
          </div>

          <div class="booking-preview">

            <div>

              <div class="info-label">
                BOOKING
              </div>

              <div class="info-name">
                #{{ selectedInvoice.bookingNumber }}
              </div>

            </div>


            <div>

              <div class="info-label">
                VEHICLE
              </div>

              <div class="info-name">
                {{ selectedInvoice.vehicle }}
              </div>

            </div>


            <div>

              <div class="info-label">
                RENTAL PERIOD
              </div>

              <div class="info-name">
                {{ selectedInvoice.rentalPeriod }}
              </div>

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <!-- Invoice Items -->
        <q-card-section>

          <div class="section-title">
            Invoice Summary
          </div>

          <div class="invoice-items">

            <div class="invoice-item header">

              <span>
                Description
              </span>

              <span>
                Amount
              </span>

            </div>


            <div class="invoice-item">

              <span>
                Vehicle Rental
              </span>

              <strong>
                ₹{{ formatNumber(selectedInvoice.rentalAmount) }}
              </strong>

            </div>


            <div class="invoice-item">

              <span>
                Security Deposit
              </span>

              <strong>
                ₹{{ formatNumber(selectedInvoice.securityDeposit) }}
              </strong>

            </div>


            <div class="invoice-item">

              <span>
                GST
              </span>

              <strong>
                ₹{{ formatNumber(selectedInvoice.gst) }}
              </strong>

            </div>


            <div class="invoice-item total">

              <span>
                Total Amount
              </span>

              <strong>
                ₹{{ formatNumber(selectedInvoice.amount) }}
              </strong>

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <!-- Payment -->
        <q-card-section>

          <div class="payment-info">

            <div>

              <div class="info-label">
                PAYMENT METHOD
              </div>

              <div class="info-name">
                {{ selectedInvoice.paymentMethod }}
              </div>

            </div>


            <div>

              <div class="info-label">
                PAYMENT STATUS
              </div>

              <q-badge
                rounded
                :color="
                  getStatusColor(
                    selectedInvoice.status
                  )
                "
              >
                {{ selectedInvoice.status }}
              </q-badge>

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <q-card-actions align="right">

          <q-btn
            flat
            color="secondary"
            icon="print"
            label="Print"
            no-caps
            @click="printInvoice(selectedInvoice)"
          />

          <q-btn
            flat
            color="grey"
            label="Close"
            no-caps
            v-close-popup
          />

        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- ================================================= -->
    <!-- CREATE INVOICE DIALOG -->
    <!-- ================================================= -->
    <q-dialog v-model="createDialog">

      <q-card
        style="width: 600px; max-width: 95vw;"
      >

        <q-card-section>

          <div class="text-h6">
            Create Invoice
          </div>

          <div class="text-caption text-grey">
            Create a new customer invoice
          </div>

        </q-card-section>


        <q-separator />


        <q-card-section>

          <div class="row q-col-gutter-md">

            <div class="col-12">

              <q-input
                v-model="newInvoice.customerName"
                outlined
                label="Customer Name"
              />

            </div>


            <div class="col-12 col-md-6">

              <q-input
                v-model="newInvoice.bookingNumber"
                outlined
                label="Booking Number"
              />

            </div>


            <div class="col-12 col-md-6">

              <q-input
                v-model.number="newInvoice.amount"
                outlined
                type="number"
                label="Amount"
              />

            </div>


            <div class="col-12 col-md-6">

              <q-input
                v-model="newInvoice.issueDate"
                outlined
                label="Issue Date"
              />

            </div>


            <div class="col-12 col-md-6">

              <q-input
                v-model="newInvoice.dueDate"
                outlined
                label="Due Date"
              />

            </div>


            <div class="col-12">

              <q-select
                v-model="newInvoice.paymentMethod"
                outlined
                label="Payment Method"
                :options="paymentMethods"
              />

            </div>

          </div>

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
            label="Create Invoice"
            unelevated
            :loading="createLoading"
            @click="createInvoice"
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

const createLoading = ref(false)

const search = ref('')

const statusFilter = ref('all')

const viewDialog = ref(false)

const createDialog = ref(false)

const selectedInvoice = ref(null)


// =====================================================
// NEW INVOICE
// =====================================================

const newInvoice = ref({

  customerName: '',

  bookingNumber: '',

  amount: 0,

  issueDate: '',

  dueDate: '',

  paymentMethod: 'UPI'

})


// =====================================================
// OPTIONS
// =====================================================

const statusOptions = [

  {
    label: 'All Status',
    value: 'all'
  },

  {
    label: 'Paid',
    value: 'Paid'
  },

  {
    label: 'Pending',
    value: 'Pending'
  },

  {
    label: 'Overdue',
    value: 'Overdue'
  },

  {
    label: 'Cancelled',
    value: 'Cancelled'
  }

]


const paymentMethods = [

  'UPI',

  'Card',

  'Net Banking',

  'Cash',

  'Wallet'

]


// =====================================================
// TABLE COLUMNS
// =====================================================

const columns = [

  {
    name: 'invoice',
    label: 'Invoice',
    field: 'invoiceNumber',
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
    name: 'dueDate',
    label: 'Due Date',
    field: 'dueDate',
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
// DEMO DATA
// =====================================================

const invoices = ref([

  {
    id: 1,

    invoiceNumber: 'INV-10001',

    bookingNumber: 'BD10001',

    customer: {
      name: 'Rahul Kumar',
      email: 'rahul@gmail.com',
      mobile: '9876543210'
    },

    vehicle: 'Toyota Innova Crysta',

    rentalPeriod: '24 Aug - 25 Aug 2026',

    rentalAmount: 7500,

    securityDeposit: 1000,

    gst: 500,

    amount: 9000,

    paymentMethod: 'UPI',

    status: 'Paid',

    issueDate: '25 Aug 2026',

    dueDate: '25 Aug 2026'
  },


  {
    id: 2,

    invoiceNumber: 'INV-10002',

    bookingNumber: 'BD10002',

    customer: {
      name: 'Amit Sharma',
      email: 'amit@gmail.com',
      mobile: '9876543211'
    },

    vehicle: 'Maruti Swift Dzire',

    rentalPeriod: '24 Aug - 25 Aug 2026',

    rentalAmount: 2300,

    securityDeposit: 300,

    gst: 200,

    amount: 2800,

    paymentMethod: 'Card',

    status: 'Paid',

    issueDate: '25 Aug 2026',

    dueDate: '25 Aug 2026'
  },


  {
    id: 3,

    invoiceNumber: 'INV-10003',

    bookingNumber: 'BD10003',

    customer: {
      name: 'Priya Singh',
      email: 'priya@gmail.com',
      mobile: '9876543212'
    },

    vehicle: 'Hyundai Creta',

    rentalPeriod: '24 Aug - 27 Aug 2026',

    rentalAmount: 6500,

    securityDeposit: 700,

    gst: 400,

    amount: 7600,

    paymentMethod: 'UPI',

    status: 'Pending',

    issueDate: '24 Aug 2026',

    dueDate: '27 Aug 2026'
  },


  {
    id: 4,

    invoiceNumber: 'INV-10004',

    bookingNumber: 'BD10004',

    customer: {
      name: 'Neha Verma',
      email: 'neha@gmail.com',
      mobile: '9876543213'
    },

    vehicle: 'Honda City',

    rentalPeriod: '22 Aug - 24 Aug 2026',

    rentalAmount: 5500,

    securityDeposit: 500,

    gst: 400,

    amount: 6400,

    paymentMethod: 'Cash',

    status: 'Paid',

    issueDate: '22 Aug 2026',

    dueDate: '24 Aug 2026'
  },


  {
    id: 5,

    invoiceNumber: 'INV-10005',

    bookingNumber: 'BD10005',

    customer: {
      name: 'Vikas Kumar',
      email: 'vikas@gmail.com',
      mobile: '9876543214'
    },

    vehicle: 'Mahindra XUV700',

    rentalPeriod: '23 Aug - 25 Aug 2026',

    rentalAmount: 4500,

    securityDeposit: 400,

    gst: 300,

    amount: 5200,

    paymentMethod: 'UPI',

    status: 'Paid',

    issueDate: '23 Aug 2026',

    dueDate: '25 Aug 2026'
  },


  {
    id: 6,

    invoiceNumber: 'INV-10006',

    bookingNumber: 'BD10006',

    customer: {
      name: 'Anjali Gupta',
      email: 'anjali@gmail.com',
      mobile: '9876543215'
    },

    vehicle: 'Tata Nexon',

    rentalPeriod: '19 Aug - 20 Aug 2026',

    rentalAmount: 2600,

    securityDeposit: 200,

    gst: 200,

    amount: 3000,

    paymentMethod: 'Card',

    status: 'Cancelled',

    issueDate: '19 Aug 2026',

    dueDate: '20 Aug 2026'
  },


  {
    id: 7,

    invoiceNumber: 'INV-10007',

    bookingNumber: 'BD10007',

    customer: {
      name: 'Rohit Singh',
      email: 'rohit@gmail.com',
      mobile: '9876543216'
    },

    vehicle: 'Maruti Baleno',

    rentalPeriod: '24 Aug - 26 Aug 2026',

    rentalAmount: 2000,

    securityDeposit: 200,

    gst: 200,

    amount: 2400,

    paymentMethod: 'UPI',

    status: 'Pending',

    issueDate: '24 Aug 2026',

    dueDate: '26 Aug 2026'
  },


  {
    id: 8,

    invoiceNumber: 'INV-10008',

    bookingNumber: 'BD10008',

    customer: {
      name: 'Pooja Sharma',
      email: 'pooja@gmail.com',
      mobile: '9876543217'
    },

    vehicle: 'BMW 5 Series',

    rentalPeriod: '20 Aug - 22 Aug 2026',

    rentalAmount: 15000,

    securityDeposit: 1200,

    gst: 800,

    amount: 17000,

    paymentMethod: 'Card',

    status: 'Paid',

    issueDate: '20 Aug 2026',

    dueDate: '22 Aug 2026'
  },


  {
    id: 9,

    invoiceNumber: 'INV-10009',

    bookingNumber: 'BD10009',

    customer: {
      name: 'Suresh Patel',
      email: 'suresh@gmail.com',
      mobile: '9876543218'
    },

    vehicle: 'Kia Seltos',

    rentalPeriod: '21 Aug - 22 Aug 2026',

    rentalAmount: 4000,

    securityDeposit: 500,

    gst: 300,

    amount: 4800,

    paymentMethod: 'Net Banking',

    status: 'Overdue',

    issueDate: '21 Aug 2026',

    dueDate: '22 Aug 2026'
  },


  {
    id: 10,

    invoiceNumber: 'INV-10010',

    bookingNumber: 'BD10010',

    customer: {
      name: 'Karan Mehta',
      email: 'karan@gmail.com',
      mobile: '9876543219'
    },

    vehicle: 'Toyota Fortuner',

    rentalPeriod: '25 Aug - 27 Aug 2026',

    rentalAmount: 11000,

    securityDeposit: 1000,

    gst: 500,

    amount: 12500,

    paymentMethod: 'UPI',

    status: 'Paid',

    issueDate: '25 Aug 2026',

    dueDate: '27 Aug 2026'
  }

])


// =====================================================
// FILTER
// =====================================================

const filteredInvoices = computed(() => {

  let result = invoices.value


  if (search.value) {

    const keyword =
      search.value
        .toLowerCase()
        .trim()


    result = result.filter(invoice => {

      return (

        invoice.invoiceNumber
          .toLowerCase()
          .includes(keyword)

        ||

        invoice.bookingNumber
          .toLowerCase()
          .includes(keyword)

        ||

        invoice.customer.name
          .toLowerCase()
          .includes(keyword)

        ||

        invoice.customer.mobile
          .includes(keyword)

        ||

        invoice.vehicle
          .toLowerCase()
          .includes(keyword)

      )

    })

  }


  if (statusFilter.value !== 'all') {

    result = result.filter(
      invoice =>
        invoice.status ===
        statusFilter.value
    )

  }


  return result

})


// =====================================================
// STATISTICS
// =====================================================

const paidInvoices = computed(() => {

  return invoices.value.filter(
    invoice =>
      invoice.status === 'Paid'
  ).length

})


const pendingInvoices = computed(() => {

  return invoices.value.filter(
    invoice =>
      invoice.status === 'Pending'
  ).length

})


const overdueInvoices = computed(() => {

  return invoices.value.filter(
    invoice =>
      invoice.status === 'Overdue'
  ).length

})


const totalInvoiced = computed(() => {

  return invoices.value
    .filter(
      invoice =>
        invoice.status !== 'Cancelled'
    )
    .reduce(
      (total, invoice) =>
        total + Number(invoice.amount),
      0
    )

})


const totalPaid = computed(() => {

  return invoices.value
    .filter(
      invoice =>
        invoice.status === 'Paid'
    )
    .reduce(
      (total, invoice) =>
        total + Number(invoice.amount),
      0
    )

})


const outstandingAmount = computed(() => {

  return invoices.value
    .filter(
      invoice =>
        invoice.status === 'Pending'
        ||
        invoice.status === 'Overdue'
    )
    .reduce(
      (total, invoice) =>
        total + Number(invoice.amount),
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

    case 'Paid':
      return 'positive'

    case 'Pending':
      return 'warning'

    case 'Overdue':
      return 'negative'

    case 'Cancelled':
      return 'grey'

    default:
      return 'grey'

  }

}


// =====================================================
// STATUS ICON
// =====================================================

const getStatusIcon = (status) => {

  switch (status) {

    case 'Paid':
      return 'check_circle'

    case 'Pending':
      return 'schedule'

    case 'Overdue':
      return 'error'

    case 'Cancelled':
      return 'cancel'

    default:
      return 'info'

  }

}


// =====================================================
// VIEW INVOICE
// =====================================================

const viewInvoice = (invoice) => {

  selectedInvoice.value = invoice

  viewDialog.value = true

}


// =====================================================
// PRINT INVOICE
// =====================================================

const printInvoice = (invoice) => {

  selectedInvoice.value = invoice

  setTimeout(() => {

    window.print()

  }, 100)

}


// =====================================================
// MARK AS PAID
// =====================================================

const markAsPaid = (invoice) => {

  invoice.status = 'Paid'

  Notify.create({

    type: 'positive',

    message:
      `${invoice.invoiceNumber} marked as paid`

  })

}


// =====================================================
// CREATE INVOICE
// =====================================================

const openCreateInvoice = () => {

  newInvoice.value = {

    customerName: '',

    bookingNumber: '',

    amount: 0,

    issueDate: '',

    dueDate: '',

    paymentMethod: 'UPI'

  }

  createDialog.value = true

}


// =====================================================
// CREATE INVOICE
// =====================================================

const createInvoice = async () => {

  if (
    !newInvoice.value.customerName ||
    !newInvoice.value.bookingNumber ||
    !newInvoice.value.amount
  ) {

    Notify.create({

      type: 'warning',

      message:
        'Please fill all required fields'

    })

    return

  }


  createLoading.value = true


  try {

    /*
      API will be connected here.

      Example:

      await api.post(
        '/admin/invoices',
        newInvoice.value
      )
    */


    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          600
        )
    )


    const id =
      invoices.value.length + 1


    invoices.value.unshift({

      id,

      invoiceNumber:
        `INV-${10000 + id}`,

      bookingNumber:
        newInvoice.value.bookingNumber,

      customer: {

        name:
          newInvoice.value.customerName,

        email: '',

        mobile: ''

      },

      vehicle:
        'Vehicle',

      rentalPeriod:
        '-',

      rentalAmount:
        Number(newInvoice.value.amount),

      securityDeposit:
        0,

      gst:
        0,

      amount:
        Number(newInvoice.value.amount),

      paymentMethod:
        newInvoice.value.paymentMethod,

      status:
        'Pending',

      issueDate:
        newInvoice.value.issueDate ||
        '25 Aug 2026',

      dueDate:
        newInvoice.value.dueDate ||
        '25 Aug 2026'

    })


    Notify.create({

      type: 'positive',

      message:
        'Invoice created successfully'

    })


    createDialog.value = false

  }

  catch (error) {

    console.error(
      'Create invoice error:',
      error
    )

    Notify.create({

      type: 'negative',

      message:
        'Unable to create invoice'

    })

  }

  finally {

    createLoading.value = false

  }

}


// =====================================================
// LOAD INVOICES
// =====================================================

const loadInvoices = async () => {

  loading.value = true


  try {

    /*
      Connect your backend API here.

      Example:

      const response = await api.get(
        '/admin/invoices'
      )

      invoices.value =
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
      'Invoice loading error:',
      error
    )

    Notify.create({

      type: 'negative',

      message:
        'Unable to load invoices'

    })

  }

  finally {

    loading.value = false

  }

}

</script>


<style scoped>

.invoices-page {

  padding: 24px;

  background: #f5f7fb;

  min-height: 100vh;

}


/* ================================================= */
/* HEADER */
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

.header-actions {

  display: flex;

  align-items: center;

  gap: 10px;

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

  align-items: center;

  justify-content: space-between;

}

.stat-label {

  color: #6b7280;

  font-size: 14px;

}

.stat-value {

  font-size: 28px;

  font-weight: 700;

  color: #1f2937;

  margin-top: 6px;

}


/* ================================================= */
/* SUMMARY */
/* ================================================= */

.summary-card {

  border-radius: 12px;

  background: #ffffff;

  box-shadow:
    0 3px 15px
    rgba(0, 0, 0, 0.04);

}

.summary-content {

  display: flex;

  align-items: center;

}

.summary-label {

  color: #777;

  font-size: 13px;

}

.summary-value {

  font-size: 20px;

  font-weight: 700;

  margin-top: 3px;

}


/* ================================================= */
/* INVOICE CARD */
/* ================================================= */

.invoice-card {

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

  font-size: 13px;

  color: #888;

  margin-top: 3px;

}

.table-actions {

  display: flex;

  align-items: center;

  gap: 10px;

}


/* ================================================= */
/* INVOICE */
/* ================================================= */

.invoice-number {

  color: #1976d2;

  font-weight: 700;

}

.invoice-date {

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

  color: #1976d2;

  font-weight: 600;

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

.overdue-text {

  color: #d32f2f;

  font-size: 11px;

  margin-top: 3px;

}


/* ================================================= */
/* STATUS */
/* ================================================= */

.status-badge {

  padding: 6px 10px;

}


/* ================================================= */
/* INVOICE DIALOG */
/* ================================================= */

.invoice-dialog {

  width: 700px;

  max-width: 95vw;

}


/* ================================================= */
/* INVOICE PREVIEW */
/* ================================================= */

.invoice-preview-header {

  display: flex;

  align-items: flex-start;

  justify-content: space-between;

}

.brand-name {

  font-size: 24px;

  font-weight: 800;

  color: #1976d2;

}

.brand-subtitle {

  font-size: 11px;

  color: #777;

  margin-top: 3px;

}

.invoice-title-section {

  text-align: right;

}

.invoice-title {

  font-size: 25px;

  font-weight: 800;

}

.invoice-number-preview {

  color: #777;

  font-size: 12px;

  margin-top: 3px;

}


/* ================================================= */
/* INFO GRID */
/* ================================================= */

.invoice-info-grid {

  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 30px;

}

.info-label {

  font-size: 10px;

  font-weight: 700;

  color: #999;

  letter-spacing: .5px;

  margin-bottom: 6px;

}

.info-name {

  font-size: 14px;

  font-weight: 700;

  color: #222;

}

.info-text {

  font-size: 12px;

  color: #777;

  margin-top: 3px;

}

.invoice-detail-row {

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 15px;

  margin-bottom: 7px;

  font-size: 12px;

}

.invoice-detail-row span {

  color: #777;

}


/* ================================================= */
/* SECTION */
/* ================================================= */

.section-title {

  font-size: 15px;

  font-weight: 700;

  margin-bottom: 14px;

}


/* ================================================= */
/* BOOKING PREVIEW */
/* ================================================= */

.booking-preview {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 15px;

  padding: 15px;

  background: #f7f8fa;

  border-radius: 10px;

}


/* ================================================= */
/* INVOICE ITEMS */
/* ================================================= */

.invoice-items {

  border: 1px solid #e5e7eb;

  border-radius: 8px;

  overflow: hidden;

}

.invoice-item {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 12px 15px;

  border-bottom: 1px solid #eeeeee;

  font-size: 13px;

}

.invoice-item:last-child {

  border-bottom: none;

}

.invoice-item.header {

  font-weight: 700;

  background: #f7f8fa;

}

.invoice-item.total {

  font-size: 15px;

  font-weight: 700;

  background: #f7f8fa;

}


/* ================================================= */
/* PAYMENT */
/* ================================================= */

.payment-info {

  display: flex;

  justify-content: space-between;

  align-items: center;

}


/* ================================================= */
/* RESPONSIVE */
/* ================================================= */

@media (max-width: 1000px) {

  .table-header {

    flex-direction: column;

    align-items: stretch;

  }

  .table-actions {

    flex-wrap: wrap;

  }

}


@media (max-width: 600px) {

  .invoices-page {

    padding: 15px;

  }

  .page-header {

    flex-direction: column;

    align-items: flex-start;

    gap: 15px;

  }

  .header-actions {

    width: 100%;

  }

  .table-actions {

    flex-direction: column;

    align-items: stretch;

  }

  .table-actions .q-input,
  .table-actions .q-select {

    width: 100% !important;

  }

  .invoice-info-grid {

    grid-template-columns: 1fr;

  }

  .booking-preview {

    grid-template-columns: 1fr;

  }

}


/* ================================================= */
/* PRINT */
/* ================================================= */

@media print {

  body * {

    visibility: hidden;

  }

  .invoice-dialog,
  .invoice-dialog * {

    visibility: visible;

  }

  .invoice-dialog {

    position: absolute;

    left: 0;

    top: 0;

    width: 100%;

    max-width: 100%;

    box-shadow: none;

  }

}

</style>
