<template>
  <q-page class="invoices-page">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->

    <div class="page-header">

      <div>

        <div class="page-title">
          My Invoices
        </div>

        <div class="page-subtitle">
          View and download invoices for your bookings.
        </div>

      </div>

      <q-btn
        flat
        color="primary"
        icon="arrow_back"
        label="Back to Dashboard"
        @click="goBack"
      />

    </div>


    <!-- =====================================================
         SUMMARY CARDS
    ====================================================== -->

    <div class="row q-col-gutter-lg q-mb-lg">

      <!-- TOTAL -->

      <div class="col-12 col-sm-4">

        <q-card class="summary-card">

          <q-card-section>

            <div class="summary-content">

              <div class="summary-icon blue">
                <q-icon
                  name="receipt_long"
                  size="28px"
                  color="primary"
                />
              </div>

              <div>

                <div class="summary-label">
                  Total Invoices
                </div>

                <div class="summary-value">
                  {{ invoices.length }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- PAID -->

      <div class="col-12 col-sm-4">

        <q-card class="summary-card">

          <q-card-section>

            <div class="summary-content">

              <div class="summary-icon green">
                <q-icon
                  name="check_circle"
                  size="28px"
                  color="positive"
                />
              </div>

              <div>

                <div class="summary-label">
                  Paid Invoices
                </div>

                <div class="summary-value">
                  {{ paidInvoices }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- TOTAL AMOUNT -->

      <div class="col-12 col-sm-4">

        <q-card class="summary-card">

          <q-card-section>

            <div class="summary-content">

              <div class="summary-icon orange">
                <q-icon
                  name="payments"
                  size="28px"
                  color="orange"
                />
              </div>

              <div>

                <div class="summary-label">
                  Total Amount
                </div>

                <div class="summary-value">
                  ₹{{ formatAmount(totalAmount) }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         FILTER CARD
    ====================================================== -->

    <q-card class="filter-card q-mb-lg">

      <q-card-section>

        <div class="row q-col-gutter-md items-center">

          <!-- SEARCH -->

          <div class="col-12 col-md-6">

            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search invoice, booking or vehicle..."
              label="Search"
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
              label="Payment Status"
              :options="statusOptions"
            />

          </div>


          <!-- RESET -->

          <div class="col-12 col-md-3">

            <q-btn
              outline
              rounded
              color="primary"
              icon="refresh"
              label="Reset"
              class="full-width"
              @click="resetFilters"
            />

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         INVOICE LIST
    ====================================================== -->

    <q-card class="invoice-card">

      <q-card-section>

        <div class="section-header">

          <div>

            <div class="section-title">

              <q-icon
                name="receipt_long"
                color="primary"
                size="26px"
              />

              Invoices

            </div>

            <div class="section-subtitle">
              {{ filteredInvoices.length }}
              invoice(s) found
            </div>

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- ===================================================
           EMPTY STATE
      ==================================================== -->

      <q-card-section
        v-if="filteredInvoices.length === 0"
        class="empty-state"
      >

        <q-icon
          name="receipt_long"
          size="70px"
          color="grey-5"
        />

        <div class="empty-title">
          No Invoices Found
        </div>

        <div class="empty-text">
          No invoice matches your current search or filter.
        </div>

        <q-btn
          flat
          color="primary"
          label="Reset Filters"
          icon="refresh"
          class="q-mt-md"
          @click="resetFilters"
        />

      </q-card-section>


      <!-- ===================================================
           DESKTOP TABLE
      ==================================================== -->

      <q-table
        v-else
        class="invoice-table"
        flat
        :rows="filteredInvoices"
        :columns="columns"
        row-key="id"
        hide-pagination
        :pagination="{
          rowsPerPage: 0
        }"
      >

        <!-- INVOICE NUMBER -->

        <template #body-cell-invoiceNumber="props">

          <q-td :props="props">

            <div class="invoice-number">
              {{ props.row.invoiceNumber }}
            </div>

            <div class="invoice-date">
              {{ formatDate(props.row.invoiceDate) }}
            </div>

          </q-td>

        </template>


        <!-- BOOKING -->

        <template #body-cell-booking="props">

          <q-td :props="props">

            <div class="booking-number">
              {{ props.row.bookingNumber }}
            </div>

            <div class="booking-date">
              {{ formatDate(props.row.bookingDate) }}
            </div>

          </q-td>

        </template>


        <!-- VEHICLE -->

        <template #body-cell-vehicle="props">

          <q-td :props="props">

            <div class="vehicle-cell">

              <div class="vehicle-icon">

                <q-icon
                  name="directions_car"
                  color="primary"
                />

              </div>

              <div>

                <div class="vehicle-name">
                  {{ props.row.vehicleName }}
                </div>

                <div class="vehicle-type">
                  {{ props.row.vehicleType }}
                </div>

              </div>

            </div>

          </q-td>

        </template>


        <!-- AMOUNT -->

        <template #body-cell-amount="props">

          <q-td :props="props">

            <div class="amount">
              ₹{{ formatAmount(props.row.totalAmount) }}
            </div>

          </q-td>

        </template>


        <!-- STATUS -->

        <template #body-cell-status="props">

          <q-td :props="props">

            <q-badge
              :color="getStatusColor(props.row.paymentStatus)"
              class="status-badge"
            >

              {{ props.row.paymentStatus }}

            </q-badge>

          </q-td>

        </template>


        <!-- ACTIONS -->

        <template #body-cell-actions="props">

          <q-td
            :props="props"
            class="actions-cell"
          >

            <q-btn
              flat
              round
              color="primary"
              icon="visibility"
              @click="viewInvoice(props.row)"
            >

              <q-tooltip>
                View Invoice
              </q-tooltip>

            </q-btn>


            <q-btn
              flat
              round
              color="primary"
              icon="download"
              @click="downloadInvoice(props.row)"
            >

              <q-tooltip>
                Download Invoice
              </q-tooltip>

            </q-btn>

          </q-td>

        </template>

      </q-table>


      <!-- ===================================================
           MOBILE CARDS
      ==================================================== -->

      <div class="mobile-invoices">

        <q-card
          v-for="invoice in filteredInvoices"
          :key="invoice.id"
          class="mobile-invoice-card"
        >

          <q-card-section>

            <div class="mobile-header">

              <div>

                <div class="invoice-number">
                  {{ invoice.invoiceNumber }}
                </div>

                <div class="invoice-date">
                  {{ formatDate(invoice.invoiceDate) }}
                </div>

              </div>

              <q-badge
                :color="getStatusColor(invoice.paymentStatus)"
                class="status-badge"
              >

                {{ invoice.paymentStatus }}

              </q-badge>

            </div>


            <q-separator class="q-my-md" />


            <div class="mobile-detail">

              <span>
                Booking
              </span>

              <strong>
                {{ invoice.bookingNumber }}
              </strong>

            </div>


            <div class="mobile-detail">

              <span>
                Vehicle
              </span>

              <strong>
                {{ invoice.vehicleName }}
              </strong>

            </div>


            <div class="mobile-detail">

              <span>
                Amount
              </span>

              <strong class="mobile-amount">
                ₹{{ formatAmount(invoice.totalAmount) }}
              </strong>

            </div>


            <div class="mobile-actions">

              <q-btn
                outline
                rounded
                color="primary"
                icon="visibility"
                label="View"
                @click="viewInvoice(invoice)"
              />

              <q-btn
                unelevated
                rounded
                color="primary"
                icon="download"
                label="Download"
                @click="downloadInvoice(invoice)"
              />

            </div>

          </q-card-section>

        </q-card>

      </div>

    </q-card>


    <!-- =====================================================
         INVOICE DIALOG
    ====================================================== -->

    <q-dialog
      v-model="showInvoiceDialog"
      persistent
    >

      <q-card
        class="invoice-dialog"
      >

        <!-- HEADER -->

        <q-card-section>

          <div class="dialog-header">

            <div>

              <div class="dialog-title">
                Invoice
              </div>

              <div class="dialog-number">

                {{
                  selectedInvoice?.invoiceNumber
                }}

              </div>

            </div>

            <q-btn
              flat
              round
              icon="close"
              v-close-popup
            />

          </div>

        </q-card-section>


        <q-separator />


        <!-- INVOICE CONTENT -->

        <q-card-section
          v-if="selectedInvoice"
          class="invoice-document"
        >

          <!-- COMPANY -->

          <div class="invoice-top">

            <div>

              <div class="company-name">
                BatohiDrive
              </div>

              <div class="company-subtitle">
                Vehicle Booking Service
              </div>

            </div>


            <div class="invoice-heading">
              INVOICE
            </div>

          </div>


          <q-separator class="q-my-lg" />


          <!-- INVOICE INFO -->

          <div class="invoice-info-grid">

            <div>

              <div class="invoice-label">
                Invoice Number
              </div>

              <div class="invoice-value">
                {{ selectedInvoice.invoiceNumber }}
              </div>

            </div>


            <div>

              <div class="invoice-label">
                Invoice Date
              </div>

              <div class="invoice-value">
                {{ formatDate(selectedInvoice.invoiceDate) }}
              </div>

            </div>


            <div>

              <div class="invoice-label">
                Booking Number
              </div>

              <div class="invoice-value">
                {{ selectedInvoice.bookingNumber }}
              </div>

            </div>


            <div>

              <div class="invoice-label">
                Payment Status
              </div>

              <div class="invoice-value">
                {{ selectedInvoice.paymentStatus }}
              </div>

            </div>

          </div>


          <q-separator class="q-my-lg" />


          <!-- CUSTOMER -->

          <div class="invoice-section-heading">
            Customer Information
          </div>

          <div class="customer-details">

            <div>

              <span>
                Name
              </span>

              <strong>
                {{ selectedInvoice.customerName }}
              </strong>

            </div>


            <div>

              <span>
                Mobile
              </span>

              <strong>
                {{ selectedInvoice.mobile }}
              </strong>

            </div>

          </div>


          <!-- VEHICLE -->

          <div class="invoice-section-heading q-mt-lg">
            Vehicle Information
          </div>

          <div class="customer-details">

            <div>

              <span>
                Vehicle
              </span>

              <strong>
                {{ selectedInvoice.vehicleName }}
              </strong>

            </div>


            <div>

              <span>
                Type
              </span>

              <strong>
                {{ selectedInvoice.vehicleType }}
              </strong>

            </div>

          </div>


          <!-- AMOUNT -->

          <div class="invoice-section-heading q-mt-lg">
            Payment Details
          </div>


          <div class="invoice-amount-row">

            <span>
              Vehicle Fare
            </span>

            <strong>
              ₹{{ formatAmount(selectedInvoice.vehicleFare) }}
            </strong>

          </div>


          <div class="invoice-amount-row">

            <span>
              Tax
            </span>

            <strong>
              ₹{{ formatAmount(selectedInvoice.tax) }}
            </strong>

          </div>


          <div class="invoice-amount-row">

            <span>
              Discount
            </span>

            <strong class="discount">
              - ₹{{ formatAmount(selectedInvoice.discount) }}
            </strong>

          </div>


          <q-separator class="q-my-md" />


          <div class="invoice-total">

            <span>
              Total Amount
            </span>

            <strong>
              ₹{{ formatAmount(selectedInvoice.totalAmount) }}
            </strong>

          </div>


          <div class="paid-message">

            <q-icon
              name="check_circle"
              color="positive"
              size="20px"
            />

            Payment received successfully.

          </div>

        </q-card-section>


        <!-- ACTIONS -->

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
            unelevated
            color="primary"
            icon="download"
            label="Download"
            @click="downloadInvoice(selectedInvoice)"
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
  useRouter,
  useRoute
} from 'vue-router'

import {
  useQuasar
} from 'quasar'


// =====================================================
// ROUTER
// =====================================================

const router = useRouter()

const route = useRoute()

const $q = useQuasar()


// =====================================================
// STATE
// =====================================================

const search = ref('')

const statusFilter = ref('All')

const showInvoiceDialog = ref(false)

const selectedInvoice = ref(null)


// =====================================================
// STATUS OPTIONS
// =====================================================

const statusOptions = [

  {
    label: 'All',
    value: 'All'
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
    label: 'Failed',
    value: 'Failed'
  }

]


// =====================================================
// TABLE COLUMNS
// =====================================================

const columns = [

  {
    name: 'invoiceNumber',
    label: 'Invoice',
    field: 'invoiceNumber',
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
    name: 'vehicle',
    label: 'Vehicle',
    field: 'vehicleName',
    align: 'left'
  },

  {
    name: 'amount',
    label: 'Amount',
    field: 'totalAmount',
    align: 'right',
    sortable: true
  },

  {
    name: 'status',
    label: 'Payment',
    field: 'paymentStatus',
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
// INVOICE DATA
// =====================================================
//
// Temporary data.
//
// Later this should come from:
//
// invoice.service.js
//
// Example:
//
// const response =
//   await invoiceService.getMyInvoices()
//
// invoices.value = response.data
// =====================================================

const invoices = ref([

  {

    id: 1,

    invoiceNumber:
      'INV-2026-0001',

    bookingNumber:
      'BK-10001',

    bookingDate:
      '2026-08-25',

    invoiceDate:
      '2026-08-20',

    vehicleName:
      'Toyota Innova Crysta',

    vehicleType:
      'MPV',

    customerName:
      'Customer',

    mobile:
      '9876543210',

    vehicleFare:
      2500,

    tax:
      125,

    discount:
      0,

    totalAmount:
      2625,

    paymentStatus:
      'Paid'

  },


  {

    id: 2,

    invoiceNumber:
      'INV-2026-0002',

    bookingNumber:
      'BK-10002',

    bookingDate:
      '2026-08-28',

    invoiceDate:
      '2026-08-20',

    vehicleName:
      'Mahindra Scorpio',

    vehicleType:
      'SUV',

    customerName:
      'Customer',

    mobile:
      '9876543210',

    vehicleFare:
      2800,

    tax:
      140,

    discount:
      0,

    totalAmount:
      2940,

    paymentStatus:
      'Pending'

  },


  {

    id: 3,

    invoiceNumber:
      'INV-2026-0003',

    bookingNumber:
      'BK-10003',

    bookingDate:
      '2026-08-10',

    invoiceDate:
      '2026-08-05',

    vehicleName:
      'Maruti Ertiga',

    vehicleType:
      'MPV',

    customerName:
      'Customer',

    mobile:
      '9876543210',

    vehicleFare:
      2000,

    tax:
      100,

    discount:
      0,

    totalAmount:
      2100,

    paymentStatus:
      'Paid'

  },

  {

    id: 4,

    invoiceNumber:
      'INV-2026-0004',

    bookingNumber:
      'BK-10004',

    bookingDate:
      '2026-07-28',

    invoiceDate:
      '2026-07-25',

    vehicleName:
      'Hyundai Aura',

    vehicleType:
      'Sedan',

    customerName:
      'Customer',

    mobile:
      '9876543210',

    vehicleFare:
      1500,

    tax:
      75,

    discount:
      100,

    totalAmount:
      1475,

    paymentStatus:
      'Paid'

  }

])


// =====================================================
// FILTERED INVOICES
// =====================================================

const filteredInvoices = computed(() => {

  const searchText =
    search.value
      .trim()
      .toLowerCase()


  return invoices.value.filter(
    invoice => {

      const matchesSearch =

        !searchText

        ||

        invoice.invoiceNumber
          .toLowerCase()
          .includes(searchText)

        ||

        invoice.bookingNumber
          .toLowerCase()
          .includes(searchText)

        ||

        invoice.vehicleName
          .toLowerCase()
          .includes(searchText)


      const matchesStatus =

        statusFilter.value === 'All'

        ||

        invoice.paymentStatus ===
          statusFilter.value


      return (
        matchesSearch &&
        matchesStatus
      )

    }
  )

})


// =====================================================
// PAID INVOICES
// =====================================================

const paidInvoices = computed(() => {

  return invoices.value.filter(
    invoice =>
      invoice.paymentStatus ===
      'Paid'
  ).length

})


// =====================================================
// TOTAL AMOUNT
// =====================================================

const totalAmount = computed(() => {

  return invoices.value.reduce(
    (
      total,
      invoice
    ) => {

      return total +
        Number(
          invoice.totalAmount || 0
        )

    },
    0
  )

})


// =====================================================
// VIEW INVOICE
// =====================================================

const viewInvoice = (invoice) => {

  selectedInvoice.value =
    invoice

  showInvoiceDialog.value =
    true

}


// =====================================================
// DOWNLOAD INVOICE
// =====================================================

const downloadInvoice = (invoice) => {

  if (!invoice) {

    return

  }


  /*
   * TEMPORARY DOWNLOAD
   *
   * Later replace this with API:
   *
   * invoiceService.downloadInvoice(
   *   invoice.id
   * )
   *
   * and download the returned PDF.
   */


  $q.notify({

    type: 'positive',

    message:
      `Invoice ${invoice.invoiceNumber} download started.`,

    position: 'top'

  })

}


// =====================================================
// STATUS COLOR
// =====================================================

const getStatusColor = (status) => {

  switch (status) {

    case 'Paid':
      return 'positive'

    case 'Pending':
      return 'orange'

    case 'Failed':
      return 'negative'

    default:
      return 'grey'

  }

}


// =====================================================
// RESET
// =====================================================

const resetFilters = () => {

  search.value = ''

  statusFilter.value =
    'All'

}


// =====================================================
// BACK
// =====================================================

const goBack = () => {

  router.push('/customer/dashboard')

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
// LOAD INVOICE
// =====================================================

const loadInvoices = async () => {

  /*
   * When backend API is ready:
   *
   * const response =
   *   await invoiceService.getMyInvoices()
   *
   * invoices.value =
   *   response.data
   */


  // Open invoice automatically
  // if booking details sends invoiceId.

  const invoiceId =
    Number(
      route.query.invoiceId
    )


  if (invoiceId) {

    const invoice =
      invoices.value.find(
        item =>
          item.id === invoiceId
      )


    if (invoice) {

      viewInvoice(invoice)

    }

  }

}


// =====================================================
// MOUNT
// =====================================================

onMounted(() => {

  loadInvoices()

})

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.invoices-page {

  min-height: 100%;

  padding: 28px;

  background: #f5f7fb;

}


/* =====================================================
   HEADER
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
   SUMMARY
===================================================== */

.summary-card {

  border-radius: 16px;

  background: white;

  box-shadow:
    0 5px 20px
    rgba(
      0,
      0,
      0,
      0.04
    );

}


.summary-content {

  display: flex;

  align-items: center;

  gap: 15px;

}


.summary-icon {

  display: flex;

  align-items: center;

  justify-content: center;

  width: 55px;

  height: 55px;

  border-radius: 14px;

}


.summary-icon.blue {

  background: #eaf2ff;

}


.summary-icon.green {

  background: #eaf8ef;

}


.summary-icon.orange {

  background: #fff5e6;

}


.summary-label {

  color: #7b8494;

  font-size: 13px;

}


.summary-value {

  margin-top: 3px;

  color: #172033;

  font-size: 23px;

  font-weight: 700;

}


/* =====================================================
   FILTER
===================================================== */

.filter-card {

  border-radius: 16px;

  background: white;

  box-shadow:
    0 5px 20px
    rgba(
      0,
      0,
      0,
      0.04
    );

}


/* =====================================================
   INVOICE CARD
===================================================== */

.invoice-card {

  border-radius: 16px;

  background: white;

  box-shadow:
    0 5px 20px
    rgba(
      0,
      0,
      0,
      0.04
    );

}


.section-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

}


.section-title {

  display: flex;

  align-items: center;

  gap: 10px;

  color: #172033;

  font-size: 19px;

  font-weight: 700;

}


.section-subtitle {

  margin-top: 4px;

  color: #8a92a0;

  font-size: 12px;

}


/* =====================================================
   TABLE
===================================================== */

.invoice-table {

  color: #172033;

}


.invoice-number {

  color: #172033;

  font-size: 14px;

  font-weight: 700;

}


.invoice-date {

  margin-top: 3px;

  color: #8a92a0;

  font-size: 11px;

}


.booking-number {

  color: #172033;

  font-size: 13px;

  font-weight: 600;

}


.booking-date {

  margin-top: 3px;

  color: #8a92a0;

  font-size: 11px;

}


.vehicle-cell {

  display: flex;

  align-items: center;

  gap: 10px;

}


.vehicle-icon {

  display: flex;

  align-items: center;

  justify-content: center;

  width: 38px;

  height: 38px;

  border-radius: 9px;

  background: #eef4fb;

}


.vehicle-name {

  color: #172033;

  font-size: 13px;

  font-weight: 600;

}


.vehicle-type {

  margin-top: 2px;

  color: #8a92a0;

  font-size: 11px;

}


.amount {

  color: #1976d2;

  font-size: 15px;

  font-weight: 700;

}


.status-badge {

  padding: 6px 11px;

  border-radius: 15px;

  font-size: 11px;

  font-weight: 600;

}


.actions-cell {

  white-space: nowrap;

}


/* =====================================================
   EMPTY
===================================================== */

.empty-state {

  display: flex;

  align-items: center;

  justify-content: center;

  flex-direction: column;

  min-height: 350px;

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

  font-size: 13px;

}


/* =====================================================
   MOBILE
===================================================== */

.mobile-invoices {

  display: none;

}


/* =====================================================
   DIALOG
===================================================== */

.invoice-dialog {

  width: 750px;

  max-width: 95vw;

  max-height: 90vh;

}


.dialog-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

}


.dialog-title {

  color: #172033;

  font-size: 23px;

  font-weight: 700;

}


.dialog-number {

  margin-top: 3px;

  color: #7b8494;

  font-size: 13px;

}


/* =====================================================
   INVOICE DOCUMENT
===================================================== */

.invoice-document {

  max-height: 65vh;

  overflow-y: auto;

  padding: 30px;

}


.invoice-top {

  display: flex;

  align-items: flex-start;

  justify-content: space-between;

}


.company-name {

  color: #172033;

  font-size: 25px;

  font-weight: 800;

}


.company-subtitle {

  margin-top: 3px;

  color: #7b8494;

  font-size: 12px;

}


.invoice-heading {

  color: #1976d2;

  font-size: 25px;

  font-weight: 800;

}


.invoice-info-grid {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 18px;

}


.invoice-label {

  color: #8a92a0;

  font-size: 11px;

}


.invoice-value {

  margin-top: 4px;

  color: #172033;

  font-size: 14px;

  font-weight: 600;

}


.invoice-section-heading {

  color: #172033;

  font-size: 15px;

  font-weight: 700;

}


.customer-details {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 15px;

  margin-top: 12px;

}


.customer-details span {

  display: block;

  color: #8a92a0;

  font-size: 11px;

}


.customer-details strong {

  display: block;

  margin-top: 4px;

  color: #172033;

  font-size: 13px;

}


.invoice-amount-row {

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 8px 0;

  color: #6b7280;

  font-size: 14px;

}


.invoice-amount-row strong {

  color: #172033;

}


.discount {

  color: #16a05d !important;

}


.invoice-total {

  display: flex;

  align-items: center;

  justify-content: space-between;

  color: #172033;

  font-size: 17px;

  font-weight: 700;

}


.invoice-total strong {

  color: #1976d2;

  font-size: 24px;

}


.paid-message {

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  margin-top: 22px;

  padding: 11px;

  border-radius: 9px;

  background: #eaf8ef;

  color: #287c4c;

  font-size: 13px;

}


/* =====================================================
   MOBILE CARD
===================================================== */

.mobile-invoice-card {

  margin: 12px;

  border-radius: 14px;

  box-shadow:
    0 3px 12px
    rgba(
      0,
      0,
      0,
      0.04
    );

}


.mobile-header {

  display: flex;

  align-items: flex-start;

  justify-content: space-between;

}


.mobile-detail {

  display: flex;

  justify-content: space-between;

  padding: 8px 0;

  color: #7b8494;

  font-size: 13px;

}


.mobile-detail strong {

  color: #172033;

}


.mobile-amount {

  color: #1976d2 !important;

  font-size: 15px;

}


.mobile-actions {

  display: flex;

  gap: 10px;

  margin-top: 15px;

}


.mobile-actions .q-btn {

  flex: 1;

}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 768px) {

  .invoices-page {

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


  .invoice-table {

    display: none;

  }


  .mobile-invoices {

    display: block;

  }


  .invoice-info-grid {

    grid-template-columns: 1fr;

  }


  .customer-details {

    grid-template-columns: 1fr;

  }


  .invoice-document {

    padding: 18px;

  }


  .invoice-top {

    flex-direction: column;

    gap: 15px;

  }


  .invoice-heading {

    font-size: 20px;

  }

}

</style>
