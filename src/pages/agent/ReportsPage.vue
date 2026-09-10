<template>
  <q-page class="agent-report-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Reports
        </div>

        <div class="text-grey-7">
          View and analyze your agent account performance
        </div>
      </div>

      <div class="row q-gutter-sm">

        <!-- REFRESH -->
        <q-btn
          flat
          round
          dense
          color="primary"
          icon="refresh"
          :loading="loading"
          @click="getReports"
        >
          <q-tooltip>
            Refresh Reports
          </q-tooltip>
        </q-btn>

        <!-- EXPORT -->
        <q-btn
          color="primary"
          icon="download"
          label="Export"
          unelevated
          @click="exportReport"
          :disable="filteredReports.length === 0"
        />

      </div>

    </div>


    <!-- =====================================================
         SUMMARY CARDS
    ====================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- TOTAL BOOKINGS -->
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
              icon="event_note"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Total Bookings
              </div>

              <div class="text-h5 text-weight-bold">
                {{ totalBookings }}
              </div>

              <div class="text-caption text-grey-6">
                {{ completedBookings }} completed
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- TOTAL REVENUE -->
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
              icon="payments"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Total Revenue
              </div>

              <div class="text-h5 text-weight-bold">
                {{ formatCurrency(totalRevenue) }}
              </div>

              <div class="text-caption text-positive">
                Booking revenue
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- COMMISSION -->
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
              icon="account_balance_wallet"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Commission
              </div>

              <div class="text-h5 text-weight-bold">
                {{ formatCurrency(totalCommission) }}
              </div>

              <div class="text-caption text-grey-6">
                Agent earnings
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- CANCELLED -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="summary-card"
        >

          <q-card-section class="row items-center">

            <q-avatar
              color="red-1"
              text-color="negative"
              icon="cancel"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Cancelled
              </div>

              <div class="text-h5 text-weight-bold">
                {{ cancelledBookings }}
              </div>

              <div class="text-caption text-negative">
                {{ cancellationRate }}% cancellation rate
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         FILTER CARD
    ====================================================== -->
    <q-card
      flat
      bordered
      class="filter-card q-mb-lg"
    >

      <q-card-section>

        <div class="text-subtitle1 text-weight-bold q-mb-md">
          Report Filters
        </div>

        <div class="row q-col-gutter-md">

          <!-- DATE FROM -->
          <div class="col-12 col-sm-6 col-md-3">

            <q-input
              v-model="filters.fromDate"
              outlined
              dense
              readonly
              label="From Date"
            >

              <template #prepend>
                <q-icon name="event" />
              </template>

              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >

                <q-date
                  v-model="filters.fromDate"
                  mask="YYYY-MM-DD"
                />

              </q-popup-proxy>

            </q-input>

          </div>


          <!-- DATE TO -->
          <div class="col-12 col-sm-6 col-md-3">

            <q-input
              v-model="filters.toDate"
              outlined
              dense
              readonly
              label="To Date"
            >

              <template #prepend>
                <q-icon name="event" />
              </template>

              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >

                <q-date
                  v-model="filters.toDate"
                  mask="YYYY-MM-DD"
                />

              </q-popup-proxy>

            </q-input>

          </div>


          <!-- REPORT TYPE -->
          <div class="col-12 col-sm-6 col-md-2">

            <q-select
              v-model="filters.reportType"
              :options="reportTypeOptions"
              outlined
              dense
              emit-value
              map-options
              label="Report Type"
            >

              <template #prepend>
                <q-icon name="assessment" />
              </template>

            </q-select>

          </div>


          <!-- STATUS -->
          <div class="col-12 col-sm-6 col-md-2">

            <q-select
              v-model="filters.status"
              :options="statusOptions"
              outlined
              dense
              clearable
              emit-value
              map-options
              label="Status"
            >

              <template #prepend>
                <q-icon name="filter_alt" />
              </template>

            </q-select>

          </div>


          <!-- APPLY -->
          <div class="col-12 col-md-2 flex items-center">

            <q-btn
              color="primary"
              icon="search"
              label="Apply"
              unelevated
              class="full-width"
              @click="applyFilters"
            />

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         PERFORMANCE CARDS
    ====================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- AVERAGE BOOKING VALUE -->
      <div class="col-12 col-md-4">

        <q-card
          flat
          bordered
          class="performance-card"
        >

          <q-card-section>

            <div class="row items-center justify-between">

              <div>

                <div class="text-caption text-grey-7">
                  Average Booking Value
                </div>

                <div class="text-h6 text-weight-bold q-mt-xs">
                  {{ formatCurrency(averageBookingValue) }}
                </div>

              </div>

              <q-avatar
                color="blue-1"
                text-color="primary"
                icon="trending_up"
              />

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- COMPLETION RATE -->
      <div class="col-12 col-md-4">

        <q-card
          flat
          bordered
          class="performance-card"
        >

          <q-card-section>

            <div class="row items-center justify-between">

              <div>

                <div class="text-caption text-grey-7">
                  Completion Rate
                </div>

                <div class="text-h6 text-weight-bold q-mt-xs">
                  {{ completionRate }}%
                </div>

              </div>

              <q-avatar
                color="green-1"
                text-color="positive"
                icon="check_circle"
              />

            </div>

            <q-linear-progress
              class="q-mt-md"
              rounded
              size="7px"
              :value="completionRate / 100"
              color="positive"
            />

          </q-card-section>

        </q-card>

      </div>


      <!-- NET EARNINGS -->
      <div class="col-12 col-md-4">

        <q-card
          flat
          bordered
          class="performance-card"
        >

          <q-card-section>

            <div class="row items-center justify-between">

              <div>

                <div class="text-caption text-grey-7">
                  Net Agent Earnings
                </div>

                <div class="text-h6 text-weight-bold q-mt-xs">
                  {{ formatCurrency(netEarnings) }}
                </div>

              </div>

              <q-avatar
                color="purple-1"
                text-color="purple"
                icon="account_balance"
              />

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         MAIN REPORT TABLE
    ====================================================== -->
    <q-card
      flat
      bordered
      class="main-card"
    >

      <!-- TABLE HEADER -->
      <q-card-section>

        <div class="row items-center justify-between">

          <div>

            <div class="text-h6 text-weight-bold">
              {{ getReportTitle() }}
            </div>

            <div class="text-caption text-grey-7">
              {{ filteredReports.length }} records found
            </div>

          </div>


          <!-- SEARCH -->
          <div class="report-search">

            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search booking, customer, vehicle..."
            >

              <template #prepend>
                <q-icon name="search" />
              </template>

            </q-input>

          </div>

        </div>

      </q-card-section>

      <q-separator />


      <!-- TABLE -->
      <q-card-section class="q-pa-none">

        <q-table
          flat
          :rows="filteredReports"
          :columns="columns"
          row-key="id"
          :loading="loading"
          v-model:pagination="pagination"
          class="reports-table"
          no-data-label="No reports found"
        >

          <!-- BOOKING ID -->
          <template #body-cell-bookingId="props">

            <q-td :props="props">

              <div class="booking-id">
                {{ props.row.bookingId || '-' }}
              </div>

              <div class="text-caption text-grey-6">
                {{ formatDate(props.row.bookingDate) }}
              </div>

            </q-td>

          </template>


          <!-- CUSTOMER -->
          <template #body-cell-customer="props">

            <q-td :props="props">

              <div class="row items-center no-wrap">

                <q-avatar
                  size="38px"
                  color="blue-1"
                  text-color="primary"
                >
                  {{ getInitials(props.row.customerName) }}
                </q-avatar>

                <div class="q-ml-sm">

                  <div class="text-weight-medium">
                    {{ props.row.customerName || 'Customer' }}
                  </div>

                  <div class="text-caption text-grey-7">
                    {{ props.row.customerMobile || '-' }}
                  </div>

                </div>

              </div>

            </q-td>

          </template>


          <!-- VEHICLE -->
          <template #body-cell-vehicle="props">

            <q-td :props="props">

              <div
                v-if="props.row.vehicleName"
                class="row items-center no-wrap"
              >

                <q-icon
                  name="directions_car"
                  color="primary"
                  size="20px"
                />

                <div class="q-ml-sm">

                  <div class="text-weight-medium">
                    {{ props.row.vehicleName }}
                  </div>

                  <div class="text-caption text-grey-7">
                    {{ props.row.vehicleRegistration || '-' }}
                  </div>

                </div>

              </div>

              <span
                v-else
                class="text-grey-6"
              >
                -
              </span>

            </q-td>

          </template>


          <!-- DRIVER -->
          <template #body-cell-driver="props">

            <q-td :props="props">

              <div
                v-if="props.row.driverName"
                class="row items-center no-wrap"
              >

                <q-avatar
                  size="32px"
                  color="grey-2"
                  text-color="grey-8"
                >
                  {{ getInitials(props.row.driverName) }}
                </q-avatar>

                <span class="q-ml-sm">
                  {{ props.row.driverName }}
                </span>

              </div>

              <span
                v-else
                class="text-grey-6"
              >
                Not Assigned
              </span>

            </q-td>

          </template>


          <!-- AMOUNT -->
          <template #body-cell-amount="props">

            <q-td :props="props">

              <div class="text-weight-bold">
                {{ formatCurrency(props.row.amount) }}
              </div>

            </q-td>

          </template>


          <!-- COMMISSION -->
          <template #body-cell-commission="props">

            <q-td :props="props">

              <div class="text-weight-bold text-positive">
                {{ formatCurrency(props.row.commission) }}
              </div>

            </q-td>

          </template>


          <!-- STATUS -->
          <template #body-cell-status="props">

            <q-td
              :props="props"
              class="text-center"
            >

              <q-chip
                dense
                :color="getStatusColor(props.row.status)"
                text-color="white"
              >

                <q-icon
                  :name="getStatusIcon(props.row.status)"
                  size="15px"
                  class="q-mr-xs"
                />

                {{ props.row.status }}

              </q-chip>

            </q-td>

          </template>


          <!-- ACTIONS -->
          <template #body-cell-actions="props">

            <q-td
              :props="props"
              class="text-right"
            >

              <q-btn
                flat
                round
                dense
                color="primary"
                icon="visibility"
                @click="viewReport(props.row)"
              >

                <q-tooltip>
                  View Report
                </q-tooltip>

              </q-btn>

            </q-td>

          </template>


          <!-- BOTTOM -->
          <template #bottom-row>

            <q-tr>

              <q-td
                colspan="5"
                class="text-right text-weight-bold"
              >
                Total
              </q-td>

              <q-td class="text-weight-bold">
                {{ formatCurrency(filteredTotalAmount) }}
              </q-td>

              <q-td class="text-positive text-weight-bold">
                {{ formatCurrency(filteredTotalCommission) }}
              </q-td>

              <q-td colspan="2"></q-td>

            </q-tr>

          </template>

        </q-table>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         REPORT DETAILS DIALOG
    ====================================================== -->
    <q-dialog v-model="detailsDialog">

      <q-card class="report-details-dialog">

        <!-- HEADER -->
        <q-card-section
          class="row items-center justify-between"
        >

          <div>

            <div class="text-h6 text-weight-bold">
              Report Details
            </div>

            <div
              v-if="selectedReport"
              class="text-caption text-grey-7"
            >
              Booking {{ selectedReport.bookingId }}
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


        <q-card-section v-if="selectedReport">

          <!-- STATUS -->
          <div class="text-center q-mb-lg">

            <q-icon
              name="assessment"
              color="primary"
              size="55px"
            />

            <div class="text-h6 text-weight-bold q-mt-sm">
              {{ selectedReport.bookingId }}
            </div>

            <q-chip
              dense
              :color="getStatusColor(selectedReport.status)"
              text-color="white"
              class="q-mt-sm"
            >
              {{ selectedReport.status }}
            </q-chip>

          </div>


          <!-- BOOKING INFORMATION -->
          <div class="detail-section">

            <div class="detail-section-title">
              Booking Information
            </div>

            <div class="row q-col-gutter-md">

              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Booking ID
                  </span>

                  <strong>
                    {{ selectedReport.bookingId || '-' }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Booking Date
                  </span>

                  <strong>
                    {{ formatDate(selectedReport.bookingDate) }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Customer
                  </span>

                  <strong>
                    {{ selectedReport.customerName || '-' }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Customer Mobile
                  </span>

                  <strong>
                    {{ selectedReport.customerMobile || '-' }}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          <!-- VEHICLE INFORMATION -->
          <div class="detail-section">

            <div class="detail-section-title">
              Vehicle & Driver
            </div>

            <div class="row q-col-gutter-md">

              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Vehicle
                  </span>

                  <strong>
                    {{ selectedReport.vehicleName || '-' }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Registration Number
                  </span>

                  <strong>
                    {{ selectedReport.vehicleRegistration || '-' }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Driver
                  </span>

                  <strong>
                    {{ selectedReport.driverName || 'Not Assigned' }}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          <!-- FINANCIAL INFORMATION -->
          <div class="detail-section">

            <div class="detail-section-title">
              Financial Information
            </div>

            <div class="row q-col-gutter-md">

              <div class="col-12 col-sm-4">

                <div class="detail-item">

                  <span>
                    Booking Amount
                  </span>

                  <strong>
                    {{ formatCurrency(selectedReport.amount) }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-4">

                <div class="detail-item">

                  <span>
                    Commission
                  </span>

                  <strong class="text-positive">
                    {{ formatCurrency(selectedReport.commission) }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-4">

                <div class="detail-item">

                  <span>
                    Net Earnings
                  </span>

                  <strong>
                    {{ formatCurrency(selectedReport.netEarnings) }}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          <!-- NOTES -->
          <div
            v-if="selectedReport.notes"
            class="detail-section"
          >

            <div class="detail-section-title">
              Notes
            </div>

            <div class="notes-box">
              {{ selectedReport.notes }}
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
            color="primary"
            icon="print"
            label="Print"
            unelevated
            @click="printSelectedReport"
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
   LOADING
========================================================= */

const loading = ref(false)


/* =========================================================
   SEARCH
========================================================= */

const search = ref('')


/* =========================================================
   FILTERS
========================================================= */

const filters = ref({

  fromDate: '',

  toDate: '',

  reportType: 'booking',

  status: null

})


/* =========================================================
   REPORT TYPE OPTIONS
========================================================= */

const reportTypeOptions = [

  {
    label: 'Booking Report',
    value: 'booking'
  },

  {
    label: 'Revenue Report',
    value: 'revenue'
  },

  {
    label: 'Commission Report',
    value: 'commission'
  },

  {
    label: 'Driver Report',
    value: 'driver'
  },

  {
    label: 'Vehicle Report',
    value: 'vehicle'
  }

]


/* =========================================================
   STATUS OPTIONS
========================================================= */

const statusOptions = [

  {
    label: 'Completed',
    value: 'Completed'
  },

  {
    label: 'Confirmed',
    value: 'Confirmed'
  },

  {
    label: 'Pending',
    value: 'Pending'
  },

  {
    label: 'Cancelled',
    value: 'Cancelled'
  },

  {
    label: 'In Progress',
    value: 'In Progress'
  }

]


/* =========================================================
   REPORT DATA
========================================================= */

const reports = ref([])


/* =========================================================
   TABLE COLUMNS
========================================================= */

const columns = [

  {
    name: 'bookingId',
    label: 'Booking',
    field: 'bookingId',
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
    name: 'driver',
    label: 'Driver',
    field: 'driverName',
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
    name: 'commission',
    label: 'Commission',
    field: 'commission',
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
   DETAILS DIALOG
========================================================= */

const detailsDialog = ref(false)

const selectedReport = ref(null)


/* =========================================================
   DEFAULT DATES
========================================================= */

const setDefaultDates = () => {

  const today = new Date()

  const firstDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  )

  filters.value.fromDate =
    formatInputDate(firstDay)

  filters.value.toDate =
    formatInputDate(today)

}


/* =========================================================
   FORMAT INPUT DATE
========================================================= */

const formatInputDate = date => {

  const year =
    date.getFullYear()

  const month =
    String(date.getMonth() + 1)
      .padStart(2, '0')

  const day =
    String(date.getDate())
      .padStart(2, '0')

  return `${year}-${month}-${day}`

}


/* =========================================================
   GET REPORTS
========================================================= */

const getReports = async () => {

  try {

    loading.value = true


    /*
     * Change endpoint according to your backend.
     */

    const response =
      await axios.get(
        '/agents/reports',
        {
          params: {

            fromDate:
              filters.value.fromDate,

            toDate:
              filters.value.toDate,

            reportType:
              filters.value.reportType,

            status:
              filters.value.status || undefined

          }
        }
      )


    const data =
      response.data?.data ||
      response.data ||
      []


    reports.value =
      Array.isArray(data)
        ? data.map(normalizeReport)
        : []


  } catch (error) {

    console.error(
      'Get Reports Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        error.response?.data?.message ||
        'Unable to load reports.'

    })


  } finally {

    loading.value = false

  }

}


/* =========================================================
   NORMALIZE REPORT
========================================================= */

const normalizeReport = report => {

  const amount =
    Number(
      report.amount ||
      report.totalAmount ||
      report.bookingAmount ||
      report.price ||
      0
    )


  const commission =
    Number(
      report.commission ||
      report.agentCommission ||
      0
    )


  return {

    id:
      report.id ||
      report.bookingId,

    bookingId:
      report.bookingId ||
      report.booking_id ||
      report.id ||
      '-',

    bookingDate:
      report.bookingDate ||
      report.booking_date ||
      report.createdAt ||
      report.created_at ||
      '',

    customerName:
      report.customerName ||
      report.customer?.name ||
      report.user?.name ||
      'Customer',

    customerMobile:
      report.customerMobile ||
      report.customer?.mobile ||
      report.user?.mobile ||
      '-',

    vehicleName:
      report.vehicleName ||
      report.vehicle?.name ||
      '',

    vehicleRegistration:
      report.vehicleRegistration ||
      report.vehicle?.registrationNumber ||
      report.vehicle?.registration_number ||
      '',

    driverName:
      report.driverName ||
      report.driver?.name ||
      '',

    amount,

    commission,

    netEarnings:
      Number(
        report.netEarnings ||
        report.net_earnings ||
        commission
      ),

    status:
      report.status ||
      'Pending',

    notes:
      report.notes ||
      report.description ||
      ''

  }

}


/* =========================================================
   FILTERED REPORTS
========================================================= */

const filteredReports = computed(() => {

  const keyword =
    search.value
      .toLowerCase()
      .trim()


  return reports.value.filter(
    report => {

      const matchesSearch =

        !keyword ||

        String(report.bookingId)
          .toLowerCase()
          .includes(keyword) ||

        String(report.customerName)
          .toLowerCase()
          .includes(keyword) ||

        String(report.customerMobile)
          .toLowerCase()
          .includes(keyword) ||

        String(report.vehicleName)
          .toLowerCase()
          .includes(keyword) ||

        String(report.vehicleRegistration)
          .toLowerCase()
          .includes(keyword) ||

        String(report.driverName)
          .toLowerCase()
          .includes(keyword)


      const matchesStatus =

        !filters.value.status ||

        report.status ===
        filters.value.status


      return (
        matchesSearch &&
        matchesStatus
      )

    }
  )

})


/* =========================================================
   TOTAL BOOKINGS
========================================================= */

const totalBookings = computed(() => {

  return reports.value.length

})


/* =========================================================
   COMPLETED BOOKINGS
========================================================= */

const completedBookings = computed(() => {

  return reports.value.filter(
    report =>
      report.status === 'Completed'
  ).length

})


/* =========================================================
   CANCELLED BOOKINGS
========================================================= */

const cancelledBookings = computed(() => {

  return reports.value.filter(
    report =>
      report.status === 'Cancelled'
  ).length

})


/* =========================================================
   TOTAL REVENUE
========================================================= */

const totalRevenue = computed(() => {

  return reports.value.reduce(
    (total, report) =>
      total +
      Number(report.amount || 0),
    0
  )

})


/* =========================================================
   TOTAL COMMISSION
========================================================= */

const totalCommission = computed(() => {

  return reports.value.reduce(
    (total, report) =>
      total +
      Number(report.commission || 0),
    0
  )

})


/* =========================================================
   NET EARNINGS
========================================================= */

const netEarnings = computed(() => {

  return reports.value.reduce(
    (total, report) =>
      total +
      Number(report.netEarnings || 0),
    0
  )

})


/* =========================================================
   AVERAGE BOOKING VALUE
========================================================= */

const averageBookingValue = computed(() => {

  if (!reports.value.length) {
    return 0
  }

  return (
    totalRevenue.value /
    reports.value.length
  )

})


/* =========================================================
   COMPLETION RATE
========================================================= */

const completionRate = computed(() => {

  if (!totalBookings.value) {
    return 0
  }

  return Math.round(
    (
      completedBookings.value /
      totalBookings.value
    ) * 100
  )

})


/* =========================================================
   CANCELLATION RATE
========================================================= */

const cancellationRate = computed(() => {

  if (!totalBookings.value) {
    return 0
  }

  return (
    (
      cancelledBookings.value /
      totalBookings.value
    ) * 100
  ).toFixed(1)

})


/* =========================================================
   FILTERED TOTAL AMOUNT
========================================================= */

const filteredTotalAmount = computed(() => {

  return filteredReports.value.reduce(
    (total, report) =>
      total +
      Number(report.amount || 0),
    0
  )

})


/* =========================================================
   FILTERED COMMISSION
========================================================= */

const filteredTotalCommission = computed(() => {

  return filteredReports.value.reduce(
    (total, report) =>
      total +
      Number(report.commission || 0),
    0
  )

})


/* =========================================================
   APPLY FILTERS
========================================================= */

const applyFilters = () => {

  if (
    filters.value.fromDate &&
    filters.value.toDate &&
    filters.value.fromDate >
    filters.value.toDate
  ) {

    $q.notify({

      type: 'warning',

      message:
        'From date cannot be greater than To date.'

    })

    return

  }


  pagination.value.page = 1

  getReports()

}


/* =========================================================
   REPORT TITLE
========================================================= */

const getReportTitle = () => {

  const found =
    reportTypeOptions.find(
      item =>
        item.value ===
        filters.value.reportType
    )


  return found
    ? found.label
    : 'Reports'

}


/* =========================================================
   VIEW REPORT
========================================================= */

const viewReport = report => {

  selectedReport.value =
    report

  detailsDialog.value =
    true

}


/* =========================================================
   EXPORT REPORT
========================================================= */

const exportReport = () => {

  if (!filteredReports.value.length) {

    $q.notify({

      type: 'warning',

      message:
        'No report data available to export.'

    })

    return

  }


  const headers = [

    'Booking ID',

    'Booking Date',

    'Customer',

    'Customer Mobile',

    'Vehicle',

    'Registration',

    'Driver',

    'Amount',

    'Commission',

    'Net Earnings',

    'Status'

  ]


  const rows =
    filteredReports.value.map(
      report => [

        report.bookingId,

        report.bookingDate,

        report.customerName,

        report.customerMobile,

        report.vehicleName,

        report.vehicleRegistration,

        report.driverName,

        report.amount,

        report.commission,

        report.netEarnings,

        report.status

      ]
    )


  const csv = [

    headers,

    ...rows

  ]
    .map(row =>
      row
        .map(value =>
          `"${String(
            value ?? ''
          ).replaceAll(
            '"',
            '""'
          )}"`
        )
        .join(',')
    )
    .join('\n')


  const blob =
    new Blob(
      [csv],
      {
        type:
          'text/csv;charset=utf-8;'
      }
    )


  const url =
    URL.createObjectURL(blob)


  const link =
    document.createElement('a')


  link.href = url

  link.setAttribute(
    'download',
    `agent-report-${filters.value.fromDate}-${filters.value.toDate}.csv`
  )


  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)

  URL.revokeObjectURL(url)


  $q.notify({

    type: 'positive',

    message:
      'Report exported successfully.'

  })

}


/* =========================================================
   PRINT SELECTED REPORT
========================================================= */

const printSelectedReport = () => {

  if (!selectedReport.value) {
    return
  }


  const report =
    selectedReport.value


  const printWindow =
    window.open(
      '',
      '_blank',
      'width=900,height=700'
    )


  if (!printWindow) {

    $q.notify({

      type: 'warning',

      message:
        'Please allow popups to print the report.'

    })

    return

  }


  printWindow.document.write(`

    <html>

      <head>

        <title>
          Report ${report.bookingId}
        </title>

        <style>

          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #1f2937;
          }

          h1 {
            margin-bottom: 5px;
          }

          .subtitle {
            color: #6b7280;
            margin-bottom: 30px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          td {
            border: 1px solid #ddd;
            padding: 12px;
          }

          td:first-child {
            font-weight: bold;
            width: 35%;
            background: #f8fafc;
          }

          .amount {
            font-size: 18px;
            font-weight: bold;
          }

        </style>

      </head>

      <body>

        <h1>
          BatohiDrive Agent Report
        </h1>

        <div class="subtitle">
          Booking ${report.bookingId}
        </div>

        <table>

          <tr>
            <td>Booking ID</td>
            <td>${report.bookingId}</td>
          </tr>

          <tr>
            <td>Booking Date</td>
            <td>${formatDate(report.bookingDate)}</td>
          </tr>

          <tr>
            <td>Customer</td>
            <td>${report.customerName}</td>
          </tr>

          <tr>
            <td>Customer Mobile</td>
            <td>${report.customerMobile}</td>
          </tr>

          <tr>
            <td>Vehicle</td>
            <td>${report.vehicleName || '-'}</td>
          </tr>

          <tr>
            <td>Registration</td>
            <td>${report.vehicleRegistration || '-'}</td>
          </tr>

          <tr>
            <td>Driver</td>
            <td>${report.driverName || 'Not Assigned'}</td>
          </tr>

          <tr>
            <td>Amount</td>
            <td class="amount">
              ${formatCurrency(report.amount)}
            </td>
          </tr>

          <tr>
            <td>Commission</td>
            <td class="amount">
              ${formatCurrency(report.commission)}
            </td>
          </tr>

          <tr>
            <td>Net Earnings</td>
            <td class="amount">
              ${formatCurrency(report.netEarnings)}
            </td>
          </tr>

          <tr>
            <td>Status</td>
            <td>${report.status}</td>
          </tr>

        </table>

      </body>

    </html>

  `)


  printWindow.document.close()

  printWindow.focus()

  setTimeout(() => {

    printWindow.print()

    printWindow.close()

  }, 300)

}


/* =========================================================
   FORMAT CURRENCY
========================================================= */

const formatCurrency = amount => {

  return new Intl.NumberFormat(
    'en-IN',
    {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }
  ).format(
    Number(amount || 0)
  )

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


  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {

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
   GET INITIALS
========================================================= */

const getInitials = name => {

  if (!name) {
    return 'U'
  }


  return String(name)
    .split(' ')
    .filter(Boolean)
    .map(
      word =>
        word.charAt(0)
    )
    .join('')
    .substring(0, 2)
    .toUpperCase()

}


/* =========================================================
   STATUS COLOR
========================================================= */

const getStatusColor = status => {

  switch (status) {

    case 'Completed':
      return 'positive'

    case 'Confirmed':
      return 'primary'

    case 'In Progress':
      return 'blue'

    case 'Pending':
      return 'orange'

    case 'Cancelled':
      return 'negative'

    default:
      return 'grey'

  }

}


/* =========================================================
   STATUS ICON
========================================================= */

const getStatusIcon = status => {

  switch (status) {

    case 'Completed':
      return 'check_circle'

    case 'Confirmed':
      return 'verified'

    case 'In Progress':
      return 'directions_car'

    case 'Pending':
      return 'schedule'

    case 'Cancelled':
      return 'cancel'

    default:
      return 'help'

  }

}


/* =========================================================
   PAGE LOAD
========================================================= */

onMounted(() => {

  setDefaultDates()

  getReports()

})

</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.agent-report-page {
  background: #f5f7fb;
  min-height: 100%;
}


/* =========================================================
   SUMMARY CARD
========================================================= */

.summary-card {
  background: #ffffff;
  border-radius: 14px;
  transition: all 0.2s ease;
}


.summary-card:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 24px
    rgba(15, 23, 42, 0.08);
}


/* =========================================================
   FILTER CARD
========================================================= */

.filter-card {
  background: #ffffff;
  border-radius: 14px;
}


/* =========================================================
   PERFORMANCE CARD
========================================================= */

.performance-card {
  background: #ffffff;
  border-radius: 14px;
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
   SEARCH
========================================================= */

.report-search {
  width: 320px;
}


/* =========================================================
   TABLE
========================================================= */

.reports-table {
  width: 100%;
}


/* =========================================================
   BOOKING ID
========================================================= */

.booking-id {
  font-weight: 700;
  color: #2563eb;
}


/* =========================================================
   DETAILS DIALOG
========================================================= */

.report-details-dialog {
  width: 700px;
  max-width: 95vw;
  border-radius: 16px;
}


/* =========================================================
   DETAIL SECTION
========================================================= */

.detail-section {
  margin-bottom: 20px;
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
  padding: 12px 14px;
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

  .agent-report-page {
    padding: 12px !important;
  }


  .text-h5 {
    font-size: 21px;
  }


  .report-search {
    width: 100%;
    margin-top: 12px;
  }


  .report-details-dialog {
    width: 95vw;
  }

}

</style>
