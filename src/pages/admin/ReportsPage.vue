<template>
  <q-page class="reports-page q-pa-md">

    <!-- ================= HEADER ================= -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Reports
        </div>

        <div class="text-grey-7">
          Analyze bookings, revenue, customers, drivers and vehicles
        </div>
      </div>

      <div class="row q-gutter-sm">

        <q-btn
          outline
          color="primary"
          icon="download"
          label="Export CSV"
          :loading="exporting"
          @click="exportCSV"
        />

        <q-btn
          color="primary"
          icon="print"
          label="Print Report"
          unelevated
          @click="printReport"
        />

      </div>

    </div>


    <!-- ================= FILTER CARD ================= -->
    <q-card class="filter-card q-mb-lg">

      <q-card-section>

        <div class="text-subtitle1 text-weight-bold q-mb-md">
          Report Filters
        </div>

        <div class="row q-col-gutter-md items-end">

          <!-- REPORT TYPE -->
          <div class="col-12 col-md-3">

            <q-select
              v-model="reportType"
              outlined
              dense
              label="Report Type"
              :options="reportTypeOptions"
              emit-value
              map-options
            />

          </div>


          <!-- DATE FROM -->
          <div class="col-12 col-md-3">

            <q-input
              v-model="dateFrom"
              outlined
              dense
              label="From Date"
              readonly
            >

              <template #append>

                <q-icon
                  name="event"
                  class="cursor-pointer"
                >

                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >

                    <q-date
                      v-model="dateFrom"
                      mask="YYYY-MM-DD"
                    />

                  </q-popup-proxy>

                </q-icon>

              </template>

            </q-input>

          </div>


          <!-- DATE TO -->
          <div class="col-12 col-md-3">

            <q-input
              v-model="dateTo"
              outlined
              dense
              label="To Date"
              readonly
            >

              <template #append>

                <q-icon
                  name="event"
                  class="cursor-pointer"
                >

                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >

                    <q-date
                      v-model="dateTo"
                      mask="YYYY-MM-DD"
                    />

                  </q-popup-proxy>

                </q-icon>

              </template>

            </q-input>

          </div>


          <!-- APPLY -->
          <div class="col-12 col-md-3">

            <div class="row q-gutter-sm">

              <q-btn
                color="primary"
                icon="filter_alt"
                label="Apply Filter"
                unelevated
                @click="applyFilter"
              />

              <q-btn
                flat
                round
                icon="refresh"
                color="primary"
                @click="resetFilter"
              >

                <q-tooltip>
                  Reset
                </q-tooltip>

              </q-btn>

            </div>

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- ================= SUMMARY CARDS ================= -->
    <div
      id="report-content"
      class="row q-col-gutter-md q-mb-lg"
    >

      <!-- BOOKINGS -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="summary-card">

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="blue-1"
                text-color="primary"
                icon="directions_car"
                size="48px"
              />

              <div class="q-ml-md">

                <div class="text-grey-7">
                  Total Bookings
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ summary.totalBookings }}
                </div>

                <div
                  class="text-caption"
                  :class="summary.bookingGrowth >= 0
                    ? 'text-positive'
                    : 'text-negative'"
                >

                  <q-icon
                    :name="
                      summary.bookingGrowth >= 0
                        ? 'trending_up'
                        : 'trending_down'
                    "
                  />

                  {{ Math.abs(summary.bookingGrowth) }}%
                  vs previous period

                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- REVENUE -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="summary-card">

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="green-1"
                text-color="positive"
                icon="payments"
                size="48px"
              />

              <div class="q-ml-md">

                <div class="text-grey-7">
                  Total Revenue
                </div>

                <div class="text-h5 text-weight-bold">
                  ₹{{ formatNumber(summary.totalRevenue) }}
                </div>

                <div class="text-caption text-positive">

                  <q-icon name="trending_up" />

                  {{ summary.revenueGrowth }}%

                  vs previous period

                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- CUSTOMERS -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="summary-card">

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="purple-1"
                text-color="purple"
                icon="people"
                size="48px"
              />

              <div class="q-ml-md">

                <div class="text-grey-7">
                  Customers
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ summary.totalCustomers }}
                </div>

                <div class="text-caption text-positive">

                  +{{ summary.newCustomers }}
                  new customers

                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- AVERAGE BOOKING -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="summary-card">

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="orange-1"
                text-color="orange"
                icon="currency_rupee"
                size="48px"
              />

              <div class="q-ml-md">

                <div class="text-grey-7">
                  Avg. Booking Value
                </div>

                <div class="text-h5 text-weight-bold">
                  ₹{{ formatNumber(summary.averageBooking) }}
                </div>

                <div class="text-caption text-grey-6">
                  Per completed booking
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- ================= CHARTS ================= -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- BOOKING TREND -->
      <div class="col-12 col-md-8">

        <q-card class="chart-card">

          <q-card-section>

            <div class="row items-center justify-between">

              <div>
                <div class="text-h6 text-weight-bold">
                  Booking & Revenue Trend
                </div>

                <div class="text-caption text-grey-6">
                  Performance during selected period
                </div>
              </div>

              <q-select
                v-model="chartPeriod"
                dense
                outlined
                :options="[
                  'Daily',
                  'Weekly',
                  'Monthly'
                ]"
                style="width: 130px"
              />

            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div class="trend-chart">

              <div class="chart-y-labels">

                <span>₹30K</span>
                <span>₹20K</span>
                <span>₹10K</span>
                <span>₹0</span>

              </div>


              <div class="chart-area">

                <div class="chart-grid">

                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>

                </div>


                <svg
                  class="trend-svg"
                  viewBox="0 0 700 250"
                  preserveAspectRatio="none"
                >

                  <!-- REVENUE -->
                  <polyline
                    :points="revenuePoints"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="4"
                    vector-effect="non-scaling-stroke"
                  />

                  <!-- BOOKINGS -->
                  <polyline
                    :points="bookingPoints"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-dasharray="8 5"
                    vector-effect="non-scaling-stroke"
                  />

                </svg>


                <div class="chart-labels">

                  <span
                    v-for="item in chartData"
                    :key="item.label"
                  >
                    {{ item.label }}
                  </span>

                </div>

              </div>

            </div>


            <div class="row justify-center q-gutter-lg q-mt-md">

              <div class="row items-center">

                <span class="legend revenue"></span>

                <span class="q-ml-xs text-caption">
                  Revenue
                </span>

              </div>


              <div class="row items-center">

                <span class="legend bookings"></span>

                <span class="q-ml-xs text-caption">
                  Bookings
                </span>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- BOOKING STATUS -->
      <div class="col-12 col-md-4">

        <q-card class="chart-card">

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Booking Status
            </div>

            <div class="text-caption text-grey-6">
              Booking distribution
            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div class="status-chart">

              <div
                class="donut"
                :style="donutStyle"
              >

                <div class="donut-center">

                  <div class="text-h5 text-weight-bold">
                    {{ summary.totalBookings }}
                  </div>

                  <div class="text-caption text-grey-6">
                    Bookings
                  </div>

                </div>

              </div>

            </div>


            <div class="q-mt-lg">

              <div
                v-for="item in bookingStatus"
                :key="item.label"
                class="row items-center q-mb-sm"
              >

                <span
                  class="status-dot"
                  :style="{ background: item.color }"
                ></span>

                <span class="q-ml-sm col">
                  {{ item.label }}
                </span>

                <span class="text-weight-bold">
                  {{ item.value }}
                </span>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- ================= TOP DRIVERS / VEHICLES ================= -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- TOP DRIVERS -->
      <div class="col-12 col-md-6">

        <q-card class="report-card">

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Top Drivers
            </div>

            <div class="text-caption text-grey-6">
              Based on completed bookings
            </div>

          </q-card-section>


          <q-separator />


          <q-list separator>

            <q-item
              v-for="(driver, index) in topDrivers"
              :key="driver.id"
            >

              <q-item-section avatar>

                <q-avatar
                  color="primary"
                  text-color="white"
                >

                  {{ index + 1 }}

                </q-avatar>

              </q-item-section>


              <q-item-section>

                <q-item-label class="text-weight-bold">
                  {{ driver.name }}
                </q-item-label>

                <q-item-label caption>
                  {{ driver.vehicle }}
                </q-item-label>

              </q-item-section>


              <q-item-section side>

                <div class="text-weight-bold">
                  {{ driver.bookings }}
                </div>

                <div class="text-caption text-grey-6">
                  bookings
                </div>

              </q-item-section>

            </q-item>

          </q-list>

        </q-card>

      </div>


      <!-- TOP VEHICLES -->
      <div class="col-12 col-md-6">

        <q-card class="report-card">

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Popular Vehicle Types
            </div>

            <div class="text-caption text-grey-6">
              Based on number of bookings
            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div
              v-for="vehicle in vehicleTypes"
              :key="vehicle.name"
              class="q-mb-lg"
            >

              <div class="row justify-between q-mb-xs">

                <span class="text-weight-medium">
                  {{ vehicle.name }}
                </span>

                <span class="text-weight-bold">
                  {{ vehicle.bookings }}
                </span>

              </div>


              <q-linear-progress
                :value="vehicle.percentage / 100"
                rounded
                size="10px"
                color="primary"
                track-color="grey-3"
              />


              <div class="text-caption text-grey-6 q-mt-xs">
                {{ vehicle.percentage }}% of total bookings
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- ================= REPORT TABLE ================= -->
    <q-card class="report-table-card">

      <q-card-section>

        <div class="row items-center justify-between">

          <div>

            <div class="text-h6 text-weight-bold">
              Detailed Report
            </div>

            <div class="text-caption text-grey-6">
              Booking and revenue details
            </div>

          </div>

          <q-btn
            flat
            color="primary"
            icon="download"
            label="Download"
            @click="exportCSV"
          />

        </div>

      </q-card-section>


      <q-separator />


      <q-table
        :rows="filteredReportRows"
        :columns="reportColumns"
        row-key="id"
        flat
        bordered
        :pagination="pagination"
        :loading="loading"
        no-data-label="No report data found"
      >

        <!-- BOOKING ID -->
        <template #body-cell-bookingId="props">

          <q-td :props="props">

            <span class="text-weight-bold">
              #{{ props.row.bookingId }}
            </span>

          </q-td>

        </template>


        <!-- CUSTOMER -->
        <template #body-cell-customer="props">

          <q-td :props="props">

            <div class="text-weight-medium">
              {{ props.row.customer }}
            </div>

            <div class="text-caption text-grey-6">
              {{ props.row.mobile }}
            </div>

          </q-td>

        </template>


        <!-- DRIVER -->
        <template #body-cell-driver="props">

          <q-td :props="props">
            {{ props.row.driver }}
          </q-td>

        </template>


        <!-- VEHICLE -->
        <template #body-cell-vehicle="props">

          <q-td :props="props">

            <q-badge
              color="blue-1"
              text-color="primary"
              class="q-pa-sm"
            >
              {{ props.row.vehicle }}
            </q-badge>

          </q-td>

        </template>


        <!-- AMOUNT -->
        <template #body-cell-amount="props">

          <q-td :props="props">

            <span class="text-weight-bold">
              ₹{{ formatNumber(props.row.amount) }}
            </span>

          </q-td>

        </template>


        <!-- STATUS -->
        <template #body-cell-status="props">

          <q-td :props="props">

            <q-badge
              :color="getStatusColor(props.row.status)"
              class="q-pa-sm"
            >
              {{ formatStatus(props.row.status) }}
            </q-badge>

          </q-td>

        </template>


        <!-- DATE -->
        <template #body-cell-date="props">

          <q-td :props="props">
            {{ formatDate(props.row.date) }}
          </q-td>

        </template>

      </q-table>

    </q-card>

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


const $q = useQuasar()


// =====================================================
// STATE
// =====================================================

const loading = ref(false)

const exporting = ref(false)

const reportType = ref('overview')

const chartPeriod = ref('Daily')

const search = ref('')


// =====================================================
// DATES
// =====================================================

function getDateString(date) {

  const year = date.getFullYear()

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0')

  const day = String(
    date.getDate()
  ).padStart(2, '0')

  return `${year}-${month}-${day}`

}


const today = new Date()

const thirtyDaysAgo = new Date()

thirtyDaysAgo.setDate(
  today.getDate() - 30
)


const dateFrom = ref(
  getDateString(thirtyDaysAgo)
)

const dateTo = ref(
  getDateString(today)
)


// =====================================================
// REPORT OPTIONS
// =====================================================

const reportTypeOptions = [

  {
    label: 'Overview',
    value: 'overview'
  },

  {
    label: 'Booking Report',
    value: 'bookings'
  },

  {
    label: 'Revenue Report',
    value: 'revenue'
  },

  {
    label: 'Customer Report',
    value: 'customers'
  },

  {
    label: 'Driver Report',
    value: 'drivers'
  },

  {
    label: 'Vehicle Report',
    value: 'vehicles'
  }

]


// =====================================================
// SUMMARY
// =====================================================

const summary = ref({

  totalBookings: 1250,

  totalRevenue: 485600,

  totalCustomers: 875,

  newCustomers: 126,

  averageBooking: 388,

  bookingGrowth: 12.5,

  revenueGrowth: 18.4

})


// =====================================================
// CHART DATA
// =====================================================

const chartData = ref([

  {
    label: '01 Aug',
    bookings: 35,
    revenue: 12000
  },

  {
    label: '05 Aug',
    bookings: 48,
    revenue: 16000
  },

  {
    label: '10 Aug',
    bookings: 42,
    revenue: 14000
  },

  {
    label: '15 Aug',
    bookings: 65,
    revenue: 22000
  },

  {
    label: '20 Aug',
    bookings: 58,
    revenue: 19000
  },

  {
    label: '25 Aug',
    bookings: 75,
    revenue: 27000
  }

])


// =====================================================
// SVG CHART POINTS
// =====================================================

const revenuePoints = computed(() => {

  const values =
    chartData.value.map(
      item => item.revenue
    )

  const max =
    Math.max(...values) || 1

  return values
    .map((value, index) => {

      const x =
        (index /
          (values.length - 1)) *
        700

      const y =
        230 -
        (value / max) *
        200

      return `${x},${y}`

    })
    .join(' ')

})


const bookingPoints = computed(() => {

  const values =
    chartData.value.map(
      item => item.bookings
    )

  const max =
    Math.max(...values) || 1

  return values
    .map((value, index) => {

      const x =
        (index /
          (values.length - 1)) *
        700

      const y =
        230 -
        (value / max) *
        200

      return `${x},${y}`

    })
    .join(' ')

})


// =====================================================
// BOOKING STATUS
// =====================================================

const bookingStatus = ref([

  {
    label: 'Completed',
    value: 850,
    color: '#21BA45'
  },

  {
    label: 'Confirmed',
    value: 180,
    color: '#1976D2'
  },

  {
    label: 'Pending',
    value: 90,
    color: '#F2C037'
  },

  {
    label: 'Cancelled',
    value: 80,
    color: '#C10015'
  },

  {
    label: 'Rejected',
    value: 50,
    color: '#9E9E9E'
  }

])


// =====================================================
// DONUT STYLE
// =====================================================

const donutStyle = computed(() => {

  const total =
    bookingStatus.value.reduce(
      (sum, item) =>
        sum + item.value,
      0
    )

  let current = 0

  const gradients = []

  bookingStatus.value.forEach(item => {

    const start =
      (current / total) * 360

    current += item.value

    const end =
      (current / total) * 360

    gradients.push(
      `${item.color} ${start}deg ${end}deg`
    )

  })

  return {

    background:
      `conic-gradient(${gradients.join(', ')})`

  }

})


// =====================================================
// TOP DRIVERS
// =====================================================

const topDrivers = ref([

  {
    id: 1,
    name: 'Amit Singh',
    vehicle: 'Toyota Innova',
    bookings: 185
  },

  {
    id: 2,
    name: 'Rakesh Kumar',
    vehicle: 'Swift Dzire',
    bookings: 172
  },

  {
    id: 3,
    name: 'Suresh Kumar',
    vehicle: 'Maruti Ertiga',
    bookings: 160
  },

  {
    id: 4,
    name: 'Vikas Singh',
    vehicle: 'Hyundai Aura',
    bookings: 148
  },

  {
    id: 5,
    name: 'Deepak Kumar',
    vehicle: 'Honda City',
    bookings: 132
  }

])


// =====================================================
// VEHICLE TYPES
// =====================================================

const vehicleTypes = ref([

  {
    name: 'Sedan',
    bookings: 450,
    percentage: 36
  },

  {
    name: 'SUV',
    bookings: 325,
    percentage: 26
  },

  {
    name: 'Hatchback',
    bookings: 250,
    percentage: 20
  },

  {
    name: 'MUV',
    bookings: 150,
    percentage: 12
  },

  {
    name: 'Luxury',
    bookings: 75,
    percentage: 6
  }

])


// =====================================================
// REPORT TABLE
// =====================================================

const reportColumns = [

  {
    name: 'bookingId',
    label: 'Booking ID',
    align: 'left'
  },

  {
    name: 'customer',
    label: 'Customer',
    align: 'left'
  },

  {
    name: 'driver',
    label: 'Driver',
    align: 'left'
  },

  {
    name: 'vehicle',
    label: 'Vehicle',
    align: 'left'
  },

  {
    name: 'amount',
    label: 'Amount',
    align: 'right'
  },

  {
    name: 'status',
    label: 'Status',
    align: 'left'
  },

  {
    name: 'date',
    label: 'Date',
    align: 'left'
  }

]


const reportRows = ref([

  {
    id: 1,
    bookingId: 'BD10001',
    customer: 'Rahul Kumar',
    mobile: '9876543210',
    driver: 'Amit Singh',
    vehicle: 'Sedan',
    amount: 1250,
    status: 'completed',
    date: '2026-08-25'
  },

  {
    id: 2,
    bookingId: 'BD10002',
    customer: 'Priya Sharma',
    mobile: '9876543211',
    driver: 'Rakesh Kumar',
    vehicle: 'SUV',
    amount: 1850,
    status: 'confirmed',
    date: '2026-08-25'
  },

  {
    id: 3,
    bookingId: 'BD10003',
    customer: 'Neha Singh',
    mobile: '9876543212',
    driver: 'Suresh Kumar',
    vehicle: 'Hatchback',
    amount: 950,
    status: 'completed',
    date: '2026-08-24'
  },

  {
    id: 4,
    bookingId: 'BD10004',
    customer: 'Ankit Verma',
    mobile: '9876543213',
    driver: 'Vikas Singh',
    vehicle: 'MUV',
    amount: 2200,
    status: 'cancelled',
    date: '2026-08-24'
  },

  {
    id: 5,
    bookingId: 'BD10005',
    customer: 'Pooja Kumari',
    mobile: '9876543214',
    driver: 'Deepak Kumar',
    vehicle: 'Luxury',
    amount: 3500,
    status: 'completed',
    date: '2026-08-23'
  }

])


const pagination = ref({

  page: 1,

  rowsPerPage: 10

})


// =====================================================
// FILTERED REPORT
// =====================================================

const filteredReportRows = computed(() => {

  const keyword =
    search.value
      .toLowerCase()
      .trim()

  if (!keyword) {

    return reportRows.value

  }

  return reportRows.value.filter(row =>

    row.bookingId
      .toLowerCase()
      .includes(keyword) ||

    row.customer
      .toLowerCase()
      .includes(keyword) ||

    row.driver
      .toLowerCase()
      .includes(keyword)

  )

})


// =====================================================
// APPLY FILTER
// =====================================================

function applyFilter() {

  if (
    dateFrom.value &&
    dateTo.value &&
    dateFrom.value > dateTo.value
  ) {

    $q.notify({

      type: 'negative',

      message:
        'From date cannot be greater than To date'

    })

    return

  }


  loadReports()

}


// =====================================================
// RESET FILTER
// =====================================================

function resetFilter() {

  const today =
    new Date()

  const previous =
    new Date()

  previous.setDate(
    today.getDate() - 30
  )


  dateFrom.value =
    getDateString(previous)

  dateTo.value =
    getDateString(today)

  reportType.value =
    'overview'

  search.value = ''

  loadReports()

}


// =====================================================
// LOAD REPORTS
// =====================================================

async function loadReports() {

  loading.value = true

  try {

    /*
     * =================================================
     * BACKEND API
     * =================================================
     *
     * Replace with your actual endpoint.
     *
     * Example:
     *
     * const response = await axios.get(
     *   '/admin/reports',
     *   {
     *     params: {
     *       type: reportType.value,
     *       from: dateFrom.value,
     *       to: dateTo.value
     *     }
     *   }
     * )
     *
     * summary.value =
     *   response.data.summary
     *
     * reportRows.value =
     *   response.data.rows
     */


  } catch (error) {

    console.error(
      'Load Reports Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        'Unable to load report data'

    })

  } finally {

    loading.value = false

  }

}


// =====================================================
// EXPORT CSV
// =====================================================

function exportCSV() {

  exporting.value = true


  try {

    const headers = [

      'Booking ID',

      'Customer',

      'Mobile',

      'Driver',

      'Vehicle',

      'Amount',

      'Status',

      'Date'

    ]


    const rows =
      filteredReportRows.value.map(
        row => [

          row.bookingId,

          row.customer,

          row.mobile,

          row.driver,

          row.vehicle,

          row.amount,

          row.status,

          row.date

        ]
      )


    const csv = [

      headers,

      ...rows

    ]
      .map(row =>
        row
          .map(value =>
            `"${String(value)
              .replace(/"/g, '""')}"`
          )
          .join(',')
      )
      .join('\n')


    const blob =
      new Blob(
        [csv],
        {
          type: 'text/csv;charset=utf-8;'
        }
      )


    const url =
      URL.createObjectURL(blob)


    const link =
      document.createElement('a')

    link.href = url

    link.setAttribute(
      'download',
      `batohidrive-report-${dateFrom.value}-${dateTo.value}.csv`
    )

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    URL.revokeObjectURL(url)


    $q.notify({

      type: 'positive',

      message:
        'Report exported successfully'

    })

  } catch (error) {

    console.error(
      'Export Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        'Unable to export report'

    })

  } finally {

    exporting.value = false

  }

}


// =====================================================
// PRINT
// =====================================================

function printReport() {

  window.print()

}


// =====================================================
// FORMAT NUMBER
// =====================================================

function formatNumber(value) {

  return Number(value || 0)
    .toLocaleString('en-IN')

}


// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(date) {

  if (!date) {
    return '-'
  }


  return new Date(date)
    .toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    )

}


// =====================================================
// STATUS COLOR
// =====================================================

function getStatusColor(status) {

  const colors = {

    completed: 'positive',

    confirmed: 'primary',

    pending: 'orange',

    cancelled: 'negative',

    rejected: 'grey'

  }


  return colors[status] || 'grey'

}


// =====================================================
// STATUS FORMAT
// =====================================================

function formatStatus(status) {

  if (!status) {
    return '-'
  }


  return (

    status
      .charAt(0)
      .toUpperCase() +

    status.slice(1)

  )

}


// =====================================================
// MOUNT
// =====================================================

onMounted(() => {

  loadReports()

})

</script>


<style scoped>

.reports-page {
  background: #f5f7fb;
  min-height: 100%;
}


/* ===============================
   FILTER CARD
================================ */

.filter-card,
.summary-card,
.chart-card,
.report-card,
.report-table-card {

  border-radius: 12px;

  border: 1px solid #e8eaf0;

  box-shadow:
    0 2px 10px rgba(
      0,
      0,
      0,
      0.04
    );

}


/* ===============================
   CHART
================================ */

.trend-chart {

  display: flex;

  min-height: 280px;

}


.chart-y-labels {

  width: 55px;

  display: flex;

  flex-direction: column;

  justify-content: space-between;

  padding-bottom: 30px;

  font-size: 11px;

  color: #8a8f98;

}


.chart-area {

  position: relative;

  flex: 1;

  min-width: 0;

}


.chart-grid {

  position: absolute;

  inset: 0 0 30px 0;

  display: flex;

  flex-direction: column;

  justify-content: space-between;

}


.chart-grid div {

  border-top: 1px dashed #e0e3e8;

}


.trend-svg {

  position: absolute;

  left: 0;

  right: 0;

  top: 0;

  width: 100%;

  height: 230px;

  color: #1976d2;

}


.chart-labels {

  position: absolute;

  left: 0;

  right: 0;

  bottom: 0;

  display: flex;

  justify-content: space-between;

  color: #8a8f98;

  font-size: 11px;

}


.legend {

  width: 28px;

  height: 4px;

  display: inline-block;

  border-radius: 4px;

}


.legend.revenue {

  background: #1976d2;

}


.legend.bookings {

  background: #42a5f5;

}


/* ===============================
   DONUT
================================ */

.status-chart {

  display: flex;

  justify-content: center;

}


.donut {

  width: 190px;

  height: 190px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

}


.donut-center {

  width: 120px;

  height: 120px;

  border-radius: 50%;

  background: white;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

}


/* ===============================
   STATUS DOT
================================ */

.status-dot {

  width: 10px;

  height: 10px;

  border-radius: 50%;

  display: inline-block;

}


/* ===============================
   MOBILE
================================ */

@media (max-width: 768px) {

  .reports-page {

    padding: 12px !important;

  }

  .trend-chart {

    min-height: 230px;

  }

  .donut {

    width: 160px;

    height: 160px;

  }

  .donut-center {

    width: 100px;

    height: 100px;

  }

}


/* ===============================
   PRINT
================================ */

@media print {

  .reports-page {

    background: white;

    padding: 0;

  }

  .filter-card {

    display: none;

  }

  .q-btn {

    display: none !important;

  }

}

</style>
