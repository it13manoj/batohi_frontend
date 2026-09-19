<template>
  <q-page class="invoices-page">
    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header">
      <div>
        <div class="page-title"> My Invoices </div>
        <div class="page-subtitle">
          View and download tax invoices and ride receipts for your bookings.
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
                <q-icon name="receipt_long" size="28px" color="primary" />
              </div>
              <div>
                <div class="summary-label"> Total Invoices </div>
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
                <q-icon name="check_circle" size="28px" color="positive" />
              </div>
              <div>
                <div class="summary-label"> Paid Invoices </div>
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
                <q-icon name="payments" size="28px" color="orange" />
              </div>
              <div>
                <div class="summary-label"> Total Amount </div>
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
         MAIN INVOICES CARD
    ====================================================== -->
    <q-card class="invoices-card">
      <!-- TOOLBAR -->
      <q-card-section>
        <div class="toolbar">
          <div class="search-box">
            <q-input
              v-model="search"
              dense
              outlined
              placeholder="Search by invoice, booking, or vehicle..."
              clearable
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <div class="filter-box">
            <q-select
              v-model="statusFilter"
              dense
              outlined
              :options="statusOptions"
              emit-value
              map-options
              style="min-width: 150px"
            />

            <q-btn
              flat
              dense
              color="primary"
              icon="refresh"
              label="Reset"
              @click="resetFilters"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <!-- LOADING STATE -->
      <div v-if="loading" class="q-pa-xl text-center">
        <q-spinner color="primary" size="48px" />
        <div class="text-grey-7 q-mt-sm">Loading invoices...</div>
      </div>

      <!-- TABLE VIEW (Desktop) -->
      <q-table
        v-else
        flat
        :rows="filteredInvoices"
        :columns="columns"
        row-key="id"
        class="invoice-table"
        :pagination="{ rowsPerPage: 10 }"
      >
        <!-- INVOICE COLUMN -->
        <template #body-cell-invoiceNumber="props">
          <q-td :props="props">
            <div class="invoice-link" @click="viewInvoice(props.row)">
              {{ props.row.invoiceNumber }}
            </div>
            <div class="invoice-date-sub">
              {{ formatDate(props.row.invoiceDate) }}
            </div>
          </q-td>
        </template>

        <!-- BOOKING COLUMN -->
        <template #body-cell-booking="props">
          <q-td :props="props">
            <div class="text-weight-medium">
              {{ props.row.bookingNumber }}
            </div>
            <div
              class="text-caption text-grey-7 ellipsis"
              style="max-width: 200px"
            >
              {{ props.row.pickupLocation }} → {{ props.row.dropLocation }}
            </div>
          </q-td>
        </template>

        <!-- VEHICLE COLUMN -->
        <template #body-cell-vehicle="props">
          <q-td :props="props">
            <div class="text-weight-medium">
              {{ props.row.vehicleName }}
            </div>
            <div class="text-caption text-grey-7">
              {{ props.row.vehicleType }}
              <span v-if="props.row.vehicleNumber">
                • {{ props.row.vehicleNumber }}</span
              >
            </div>
          </q-td>
        </template>

        <!-- AMOUNT COLUMN -->
        <template #body-cell-amount="props">
          <q-td :props="props">
            <div class="text-weight-bold text-dark">
              ₹{{ formatAmount(props.row.totalAmount) }}
            </div>
            <div class="text-caption text-grey-7">
              Fare: ₹{{ formatAmount(props.row.vehicleFare) }}
            </div>
          </q-td>
        </template>

        <!-- STATUS COLUMN -->
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

        <!-- ACTIONS COLUMN -->
        <template #body-cell-actions="props">
          <q-td :props="props" class="q-gutter-xs">
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="visibility"
              @click="viewInvoice(props.row)"
            >
              <q-tooltip>View Invoice</q-tooltip>
            </q-btn>

            <q-btn
              flat
              round
              dense
              color="primary"
              icon="download"
              @click="downloadInvoice(props.row)"
            >
              <q-tooltip>Download / Print Invoice</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>

      <!-- MOBILE CARDS (Mobile screen) -->
      <div v-if="!loading" class="mobile-invoices">
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
              <span>Booking</span>
              <strong>{{ invoice.bookingNumber }}</strong>
            </div>

            <div class="mobile-detail">
              <span>Route</span>
              <strong
                class="text-right"
                style="max-width: 60%; font-size: 12px"
              >
                {{ invoice.pickupLocation }} → {{ invoice.dropLocation }}
              </strong>
            </div>

            <div class="mobile-detail">
              <span>Vehicle</span>
              <strong>{{ invoice.vehicleName }}</strong>
            </div>

            <div class="mobile-detail">
              <span>Amount</span>
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
         INVOICE PREVIEW & DOWNLOAD DIALOG
    ====================================================== -->
    <q-dialog v-model="showInvoiceDialog" maximized-on-mobile>
      <q-card class="invoice-dialog">
        <!-- HEADER -->
        <q-card-section>
          <div class="dialog-header">
            <div>
              <div class="dialog-title"> Tax Invoice </div>
              <div class="dialog-number">
                {{ selectedInvoice?.invoiceNumber }}
              </div>
            </div>

            <q-btn flat round dense icon="close" v-close-popup />
          </div>
        </q-card-section>

        <q-separator />

        <!-- INVOICE CONTENT -->
        <q-card-section
          v-if="selectedInvoice"
          class="invoice-document"
          style="max-height: 70vh; overflow-y: auto"
        >
          <!-- COMPANY HEADER -->
          <div class="invoice-top">
            <div>
              <div class="company-name"> BatohiDrive </div>
              <div class="company-subtitle">
                Batohi Technologies Pvt. Ltd. • Patna, Bihar - 800001
              </div>
              <div class="company-sub-tax">
                GSTIN: 10AAACB1234F1Z5 • Support: support@batohidriver.com
              </div>
            </div>

            <div class="text-right">
              <div class="invoice-heading"> TAX INVOICE </div>
              <q-badge
                :color="getStatusColor(selectedInvoice.paymentStatus)"
                class="q-pa-xs text-weight-bold"
              >
                {{ selectedInvoice.paymentStatus }}
              </q-badge>
            </div>
          </div>

          <q-separator class="q-my-md" />

          <!-- INVOICE INFO GRID -->
          <div class="invoice-info-grid">
            <div>
              <div class="invoice-label">Invoice Number</div>
              <div class="invoice-value">{{
                selectedInvoice.invoiceNumber
              }}</div>
            </div>

            <div>
              <div class="invoice-label">Invoice Date</div>
              <div class="invoice-value">{{
                formatDate(selectedInvoice.invoiceDate)
              }}</div>
            </div>

            <div>
              <div class="invoice-label">Booking Number</div>
              <div class="invoice-value">{{
                selectedInvoice.bookingNumber
              }}</div>
            </div>

            <div>
              <div class="invoice-label">Payment Mode</div>
              <div class="invoice-value">{{
                selectedInvoice.paymentMethod || 'Online / UPI'
              }}</div>
            </div>
          </div>

          <q-separator class="q-my-md" />

          <!-- PARTIES SECTION -->
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-sm-6">
              <div class="invoice-section-heading">Customer Information</div>
              <div class="customer-details">
                <div>
                  <span>Name:</span>
                  <strong>{{ selectedInvoice.customerName }}</strong>
                </div>
                <div>
                  <span>Mobile:</span>
                  <strong>{{ selectedInvoice.mobile || 'N/A' }}</strong>
                </div>
                <div>
                  <span>Email:</span>
                  <strong>{{
                    selectedInvoice.email || 'customer@batohidriver.com'
                  }}</strong>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6">
              <div class="invoice-section-heading">Ride & Vehicle Details</div>
              <div class="customer-details">
                <div>
                  <span>Vehicle:</span>
                  <strong
                    >{{ selectedInvoice.vehicleName }} ({{
                      selectedInvoice.vehicleType
                    }})</strong
                  >
                </div>
                <div>
                  <span>Reg No:</span>
                  <strong>{{ selectedInvoice.vehicleNumber || 'N/A' }}</strong>
                </div>
                <div>
                  <span>Driver:</span>
                  <strong
                    >{{ selectedInvoice.driverName }} ({{
                      selectedInvoice.driverMobile || 'N/A'
                    }})</strong
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- TRIP ROUTE -->
          <div
            class="route-preview-box q-pa-sm rounded-borders bg-grey-1 q-mb-md"
          >
            <div class="text-caption text-weight-bold text-grey-8 q-mb-xs"
              >Trip Route</div
            >
            <div class="row items-center q-gutter-xs text-caption">
              <q-badge color="positive" label="Pickup" class="q-mr-xs" />
              <span class="text-weight-medium">{{
                selectedInvoice.pickupLocation
              }}</span>
            </div>
            <div class="row items-center q-gutter-xs text-caption q-mt-xs">
              <q-badge color="negative" label="Drop" class="q-mr-xs" />
              <span class="text-weight-medium">{{
                selectedInvoice.dropLocation
              }}</span>
            </div>
            <div
              class="text-caption text-grey-7 q-mt-xs"
              v-if="selectedInvoice.distance"
            >
              Total Distance: <strong>{{ selectedInvoice.distance }}</strong>
            </div>
          </div>

          <!-- PAYMENT DETAILS -->
          <div class="invoice-section-heading q-mt-md"> Payment Details </div>

          <div class="invoice-amount-row">
            <span>Base Vehicle Fare</span>
            <strong>₹{{ formatAmount(selectedInvoice.vehicleFare) }}</strong>
          </div>

          <div class="invoice-amount-row">
            <span>Central GST (CGST @ 2.5%)</span>
            <strong
              >₹{{
                formatAmount(
                  selectedInvoice.cgst ||
                    Math.round((selectedInvoice.tax || 0) / 2)
                )
              }}</strong
            >
          </div>

          <div class="invoice-amount-row">
            <span>State GST (SGST @ 2.5%)</span>
            <strong
              >₹{{
                formatAmount(
                  selectedInvoice.sgst ||
                    (selectedInvoice.tax || 0) -
                      Math.round((selectedInvoice.tax || 0) / 2)
                )
              }}</strong
            >
          </div>

          <div v-if="selectedInvoice.discount" class="invoice-amount-row">
            <span>Discount</span>
            <strong class="discount"
              >- ₹{{ formatAmount(selectedInvoice.discount) }}</strong
            >
          </div>

          <q-separator class="q-my-md" />

          <div class="invoice-total">
            <span>Total Amount (Inclusive of Taxes)</span>
            <strong>₹{{ formatAmount(selectedInvoice.totalAmount) }}</strong>
          </div>

          <div
            v-if="selectedInvoice.paymentStatus === 'Paid'"
            class="paid-message"
          >
            <q-icon name="check_circle" color="positive" size="20px" />
            Payment received successfully. Thank you for riding with
            BatohiDrive!
          </div>
        </q-card-section>

        <!-- ACTIONS -->
        <q-separator />

        <q-card-actions align="between" class="q-pa-md">
          <q-btn
            flat
            color="primary"
            icon="description"
            label="Download File (.html)"
            @click="downloadInvoiceFile(selectedInvoice)"
          />

          <div class="q-gutter-sm">
            <q-btn flat color="grey-7" label="Close" v-close-popup />

            <q-btn
              unelevated
              color="primary"
              icon="print"
              label="Print / Save PDF"
              @click="downloadInvoice(selectedInvoice)"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import invoiceService from '@/services/invoice.service'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

// State
const loading = ref(true)
const search = ref('')
const statusFilter = ref('All')
const showInvoiceDialog = ref(false)
const selectedInvoice = ref(null)
const invoices = ref([])

// Status Options
const statusOptions = [
  { label: 'All Statuses', value: 'All' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Cancelled', value: 'Cancelled' }
]

// Table Columns
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
    label: 'Booking & Route',
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

// Filtered Invoices
const filteredInvoices = computed(() => {
  const searchText = search.value ? search.value.trim().toLowerCase() : ''

  return invoices.value.filter(invoice => {
    const matchesSearch =
      !searchText ||
      (invoice.invoiceNumber &&
        invoice.invoiceNumber.toLowerCase().includes(searchText)) ||
      (invoice.bookingNumber &&
        invoice.bookingNumber.toLowerCase().includes(searchText)) ||
      (invoice.vehicleName &&
        invoice.vehicleName.toLowerCase().includes(searchText)) ||
      (invoice.pickupLocation &&
        invoice.pickupLocation.toLowerCase().includes(searchText)) ||
      (invoice.dropLocation &&
        invoice.dropLocation.toLowerCase().includes(searchText))

    const matchesStatus =
      statusFilter.value === 'All' ||
      invoice.paymentStatus?.toLowerCase() === statusFilter.value.toLowerCase()

    return matchesSearch && matchesStatus
  })
})

// Statistics
const paidInvoices = computed(() => {
  return invoices.value.filter(
    invoice => invoice.paymentStatus?.toLowerCase() === 'paid'
  ).length
})

const totalAmount = computed(() => {
  return invoices.value.reduce((total, invoice) => {
    return total + Number(invoice.totalAmount || 0)
  }, 0)
})

// View Invoice Modal
const viewInvoice = invoice => {
  selectedInvoice.value = invoice
  showInvoiceDialog.value = true
}

// Download Invoice (Print / Save-as-PDF)
const downloadInvoice = invoice => {
  if (!invoice) return

  invoiceService.downloadInvoice(invoice)

  $q.notify({
    type: 'positive',
    message: `Invoice ${invoice.invoiceNumber} opened for printing / PDF save.`,
    position: 'top',
    icon: 'receipt_long'
  })
}

// Download Standalone HTML Invoice File
const downloadInvoiceFile = invoice => {
  if (!invoice) return

  invoiceService.downloadInvoiceFile(invoice)

  $q.notify({
    type: 'positive',
    message: `Invoice ${invoice.invoiceNumber} file downloaded to your device.`,
    position: 'top',
    icon: 'download'
  })
}

// Status Color Helper
const getStatusColor = status => {
  switch (String(status).toLowerCase()) {
    case 'paid':
      return 'positive'
    case 'pending':
      return 'orange'
    case 'cancelled':
    case 'failed':
      return 'negative'
    default:
      return 'grey'
  }
}

// Reset Filters
const resetFilters = () => {
  search.value = ''
  statusFilter.value = 'All'
}

// Back
const goBack = () => {
  router.push('/customer/dashboard')
}

// Format Date
const formatDate = date => {
  if (!date) return '-'
  const dateObject = new Date(date)
  if (isNaN(dateObject.getTime())) return String(date)
  return dateObject.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

// Format Amount
const formatAmount = amount => {
  return Number(amount || 0).toLocaleString('en-IN')
}

// Load Invoices dynamically
const loadInvoices = async () => {
  loading.value = true
  try {
    const data = await invoiceService.getInvoices()
    invoices.value = data

    // Check if routed with bookingId or invoiceId
    const queryBookingId = route.query.bookingId
    const queryInvoiceId = route.query.invoiceId

    if (queryBookingId) {
      const match = invoices.value.find(
        item =>
          Number(item.bookingId) === Number(queryBookingId) ||
          item.bookingNumber === queryBookingId ||
          item.bookingNumber === `BK-${queryBookingId}`
      )
      if (match) {
        viewInvoice(match)
      }
    } else if (queryInvoiceId) {
      const match = invoices.value.find(
        item =>
          Number(item.id) === Number(queryInvoiceId) ||
          item.invoiceNumber === queryInvoiceId
      )
      if (match) {
        viewInvoice(match)
      }
    }
  } catch (err) {
    console.error('Error loading invoices:', err)
    $q.notify({
      type: 'negative',
      message: 'Failed to load invoices',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

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
  font-size: 27px;
  font-weight: 700;
  color: #172033;
}

.page-subtitle {
  margin-top: 4px;
  color: #6d788d;
  font-size: 14px;
}

/* =====================================================
   SUMMARY CARDS
===================================================== */
.summary-card {
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.summary-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.summary-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.summary-icon.blue {
  background: #eef4ff;
}

.summary-icon.green {
  background: #ecfdf5;
}

.summary-icon.orange {
  background: #fff7ed;
}

.summary-label {
  font-size: 13px;
  color: #8a94a6;
}

.summary-value {
  font-size: 24px;
  font-weight: 700;
  color: #172033;
  margin-top: 2px;
}

/* =====================================================
   INVOICES CARD
===================================================== */
.invoices-card {
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.search-box {
  width: 320px;
  max-width: 100%;
}

.filter-box {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* =====================================================
   TABLE
===================================================== */
.invoice-table {
  background: transparent;
}

.invoice-link {
  font-weight: 700;
  color: #1976d2;
  cursor: pointer;
}

.invoice-link:hover {
  text-decoration: underline;
}

.invoice-date-sub {
  font-size: 11px;
  color: #8a94a6;
  margin-top: 2px;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

/* =====================================================
   MOBILE CARDS
===================================================== */
.mobile-invoices {
  display: none;
  padding: 16px;
}

.mobile-invoice-card {
  border-radius: 12px;
  margin-bottom: 14px;
  border: 1px solid #eef1f6;
  box-shadow: none;
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.invoice-number {
  font-weight: 700;
  font-size: 16px;
  color: #172033;
}

.invoice-date {
  font-size: 12px;
  color: #8a94a6;
  margin-top: 2px;
}

.mobile-detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
  color: #586377;
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
   INVOICE DIALOG
===================================================== */
.invoice-dialog {
  width: 740px;
  max-width: 95vw;
  border-radius: 14px;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dialog-title {
  font-size: 18px;
  font-weight: 700;
  color: #172033;
}

.dialog-number {
  font-size: 13px;
  color: #8a94a6;
  margin-top: 2px;
}

.invoice-document {
  padding: 24px;
}

.invoice-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.company-name {
  font-size: 22px;
  font-weight: 800;
  color: #1976d2;
}

.company-subtitle {
  font-size: 12px;
  color: #6d788d;
  margin-top: 2px;
}

.company-sub-tax {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
}

.invoice-heading {
  font-size: 22px;
  font-weight: 800;
  color: #172033;
  letter-spacing: 0.5px;
}

.invoice-info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  background: #f8fafc;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.invoice-label {
  font-size: 11px;
  color: #8a94a6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.invoice-value {
  font-size: 13px;
  font-weight: 600;
  color: #172033;
  margin-top: 2px;
}

.invoice-section-heading {
  font-size: 14px;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 10px;
}

.customer-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
}

.customer-details div {
  display: flex;
  justify-content: space-between;
}

.customer-details span {
  color: #6d788d;
}

.customer-details strong {
  color: #172033;
}

.route-preview-box {
  border: 1px solid #e2e8f0;
}

.invoice-amount-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
  color: #586377;
}

.invoice-amount-row strong {
  color: #172033;
}

.invoice-amount-row .discount {
  color: #10b981;
}

.invoice-total {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 700;
  color: #1976d2;
}

.paid-message {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 10px;
  border-radius: 8px;
  background: #ecfdf5;
  color: #059669;
  font-size: 12px;
  font-weight: 600;
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
    grid-template-columns: 1fr 1fr;
  }

  .invoice-document {
    padding: 16px;
  }

  .invoice-top {
    flex-direction: column;
    gap: 12px;
  }

  .invoice-heading {
    font-size: 20px;
  }
}
</style>
