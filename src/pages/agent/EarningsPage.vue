```vue
<template>
  <q-page class="agent-earnings-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Earnings
        </div>

        <div class="text-grey-7">
          Track your agent revenue, commission and payouts
        </div>
      </div>


      <div class="row q-gutter-sm">

        <!-- EXPORT -->
        <q-btn
          outline
          color="primary"
          icon="download"
          label="Export"
          :disable="filteredEarnings.length === 0"
          @click="exportEarnings"
        />

        <!-- REFRESH -->
        <q-btn
          color="primary"
          icon="refresh"
          label="Refresh"
          unelevated
          :loading="loading"
          @click="getEarnings"
        />

      </div>

    </div>


    <!-- =====================================================
         SUMMARY CARDS
    ====================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- TOTAL EARNINGS -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="summary-card"
        >

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="green-1"
                text-color="positive"
                icon="account_balance_wallet"
              />

              <div class="q-ml-md">

                <div class="text-caption text-grey-7">
                  Total Earnings
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ formatCurrency(totalEarnings) }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- TOTAL BOOKINGS -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="summary-card"
        >

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="blue-1"
                text-color="primary"
                icon="receipt_long"
              />

              <div class="q-ml-md">

                <div class="text-caption text-grey-7">
                  Total Bookings
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ totalBookings }}
                </div>

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

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="orange-1"
                text-color="orange"
                icon="percent"
              />

              <div class="q-ml-md">

                <div class="text-caption text-grey-7">
                  Commission
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ formatCurrency(totalCommission) }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- NET EARNINGS -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="summary-card"
        >

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="purple-1"
                text-color="purple"
                icon="payments"
              />

              <div class="q-ml-md">

                <div class="text-caption text-grey-7">
                  Net Earnings
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ formatCurrency(netEarnings) }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         EARNINGS OVERVIEW
    ====================================================== -->
    <q-card
      flat
      bordered
      class="main-card q-mb-lg"
    >

      <q-card-section>

        <div class="row items-center justify-between">

          <div>

            <div class="text-h6 text-weight-bold">
              Earnings Overview
            </div>

            <div class="text-caption text-grey-7">
              Revenue performance for the selected period
            </div>

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- SIMPLE MONTHLY GRAPH -->
      <q-card-section>

        <div class="earnings-chart">

          <div
            v-for="item in monthlyEarnings"
            :key="item.month"
            class="chart-column"
          >

            <div class="chart-value">
              {{ formatShortCurrency(item.amount) }}
            </div>

            <div
              class="chart-bar"
              :style="{
                height: `${getChartHeight(item.amount)}%`
              }"
            />

            <div class="chart-label">
              {{ item.month }}
            </div>

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         FILTER CARD
    ====================================================== -->
    <q-card
      flat
      bordered
      class="main-card"
    >

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


          <!-- DATE FROM -->
          <div class="col-12 col-sm-6 col-md-2">

            <q-input
              v-model="dateFrom"
              outlined
              dense
              readonly
              label="From Date"
              clearable
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
                  v-model="dateFrom"
                  mask="YYYY-MM-DD"
                />

              </q-popup-proxy>

            </q-input>

          </div>


          <!-- DATE TO -->
          <div class="col-12 col-sm-6 col-md-2">

            <q-input
              v-model="dateTo"
              outlined
              dense
              readonly
              label="To Date"
              clearable
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
                  v-model="dateTo"
                  mask="YYYY-MM-DD"
                />

              </q-popup-proxy>

            </q-input>

          </div>


          <!-- PAYMENT STATUS -->
          <div class="col-12 col-sm-6 col-md-2">

            <q-select
              v-model="paymentStatusFilter"
              :options="paymentStatusOptions"
              outlined
              dense
              clearable
              emit-value
              map-options
              label="Payment Status"
            />

          </div>


          <!-- RESET -->
          <div class="col-12 col-sm-6 col-md-2">

            <q-btn
              flat
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


      <!-- =====================================================
           EARNINGS TABLE
      ====================================================== -->
      <q-card-section class="q-pa-none">

        <q-table
          flat
          :rows="filteredEarnings"
          :columns="columns"
          row-key="id"
          :loading="loading"
          v-model:pagination="pagination"
          class="earnings-table"
          no-data-label="No earnings found"
          no-results-label="No matching earnings found"
          :rows-per-page-options="[10, 20, 50, 100]"
        >

          <!-- BOOKING -->
          <template #body-cell-booking="props">

            <q-td :props="props">

              <div class="text-weight-bold">
                {{ props.row.bookingNumber || '-' }}
              </div>

              <div class="text-caption text-grey-7">
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

                  <img
                    v-if="props.row.customerImage"
                    :src="props.row.customerImage"
                    alt="Customer"
                  />

                  <span v-else>
                    {{ getInitials(props.row.customerName) }}
                  </span>

                </q-avatar>

                <div class="q-ml-sm">

                  <div class="text-weight-medium">
                    {{ props.row.customerName || '-' }}
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

              <div class="row items-center no-wrap">

                <q-icon
                  name="directions_car"
                  color="primary"
                  size="20px"
                />

                <div class="q-ml-sm">

                  <div class="text-weight-medium">
                    {{ props.row.vehicleName || '-' }}
                  </div>

                  <div class="text-caption text-grey-7">
                    {{ props.row.vehicleRegistration || '-' }}
                  </div>

                </div>

              </div>

            </q-td>

          </template>


          <!-- GROSS -->
          <template #body-cell-gross="props">

            <q-td :props="props">

              <div class="text-weight-bold">
                {{ formatCurrency(props.row.grossAmount) }}
              </div>

            </q-td>

          </template>


          <!-- COMMISSION -->
          <template #body-cell-commission="props">

            <q-td :props="props">

              <div class="text-negative text-weight-medium">
                - {{ formatCurrency(props.row.commission) }}
              </div>

              <div class="text-caption text-grey-6">
                {{ props.row.commissionPercent || 0 }}%
              </div>

            </q-td>

          </template>


          <!-- NET -->
          <template #body-cell-net="props">

            <q-td :props="props">

              <div class="text-positive text-weight-bold">
                {{ formatCurrency(props.row.netAmount) }}
              </div>

            </q-td>

          </template>


          <!-- PAYMENT STATUS -->
          <template #body-cell-paymentStatus="props">

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

                <q-icon
                  :name="
                    getPaymentStatusIcon(
                      props.row.paymentStatus
                    )
                  "
                  size="15px"
                  class="q-mr-xs"
                />

                {{ props.row.paymentStatus }}

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
                @click="viewEarning(props.row)"
              >

                <q-tooltip>
                  View Details
                </q-tooltip>

              </q-btn>

            </q-td>

          </template>

        </q-table>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         EARNING DETAILS DIALOG
    ====================================================== -->
    <q-dialog v-model="detailsDialog">

      <q-card class="earning-details-dialog">

        <!-- HEADER -->
        <q-card-section
          class="row items-center justify-between"
        >

          <div>

            <div class="text-h6 text-weight-bold">
              Earning Details
            </div>

            <div class="text-caption text-grey-7">
              Booking revenue information
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


        <q-card-section v-if="selectedEarning">

          <!-- BOOKING HEADER -->
          <div class="earning-detail-header">

            <div>

              <div class="text-caption text-grey-7">
                Booking Number
              </div>

              <div class="text-h6 text-weight-bold">
                {{ selectedEarning.bookingNumber || '-' }}
              </div>

            </div>


            <q-chip
              dense
              :color="
                getPaymentStatusColor(
                  selectedEarning.paymentStatus
                )
              "
              text-color="white"
            >
              {{ selectedEarning.paymentStatus }}
            </q-chip>

          </div>


          <!-- CUSTOMER -->
          <div class="detail-section">

            <div class="detail-section-title">
              Customer
            </div>

            <div class="detail-item">

              <div class="row items-center">

                <q-avatar
                  size="45px"
                  color="blue-1"
                  text-color="primary"
                >

                  <span>
                    {{
                      getInitials(
                        selectedEarning.customerName
                      )
                    }}
                  </span>

                </q-avatar>

                <div class="q-ml-md">

                  <div class="text-weight-bold">
                    {{ selectedEarning.customerName || '-' }}
                  </div>

                  <div class="text-caption text-grey-7">
                    {{ selectedEarning.customerMobile || '-' }}
                  </div>

                </div>

              </div>

            </div>

          </div>


          <!-- VEHICLE -->
          <div class="detail-section">

            <div class="detail-section-title">
              Vehicle
            </div>

            <div class="detail-item">

              <div class="row items-center">

                <q-icon
                  name="directions_car"
                  color="primary"
                  size="28px"
                />

                <div class="q-ml-md">

                  <div class="text-weight-bold">
                    {{ selectedEarning.vehicleName || '-' }}
                  </div>

                  <div class="text-caption text-grey-7">
                    {{
                      selectedEarning.vehicleRegistration ||
                      '-'
                    }}
                  </div>

                </div>

              </div>

            </div>

          </div>


          <!-- EARNING BREAKDOWN -->
          <div class="detail-section">

            <div class="detail-section-title">
              Earning Breakdown
            </div>

            <div class="earning-breakdown">

              <div class="breakdown-row">

                <span>
                  Booking Amount
                </span>

                <strong>
                  {{
                    formatCurrency(
                      selectedEarning.grossAmount
                    )
                  }}
                </strong>

              </div>


              <div class="breakdown-row">

                <span>
                  Commission
                  ({{
                    selectedEarning.commissionPercent || 0
                  }}%)
                </span>

                <strong class="text-negative">
                  -
                  {{
                    formatCurrency(
                      selectedEarning.commission
                    )
                  }}
                </strong>

              </div>


              <q-separator class="q-my-sm" />


              <div class="breakdown-row net-row">

                <span>
                  Net Earnings
                </span>

                <strong class="text-positive">
                  {{
                    formatCurrency(
                      selectedEarning.netAmount
                    )
                  }}
                </strong>

              </div>

            </div>

          </div>


          <!-- DATE -->
          <div class="detail-section">

            <div class="detail-section-title">
              Booking Date
            </div>

            <div class="detail-item">

              <q-icon
                name="event"
                color="primary"
                class="q-mr-sm"
              />

              {{ formatDate(selectedEarning.bookingDate) }}

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
   API ENDPOINT
========================================================= */

const EARNINGS_ENDPOINT =
  '/agents/earnings'


/* =========================================================
   DATA
========================================================= */

const earnings = ref([])

const loading = ref(false)


/* =========================================================
   FILTERS
========================================================= */

const search = ref('')

const dateFrom = ref('')

const dateTo = ref('')

const paymentStatusFilter = ref(null)


/* =========================================================
   PAGINATION
========================================================= */

const pagination = ref({

  page: 1,

  rowsPerPage: 10

})


/* =========================================================
   DETAILS
========================================================= */

const detailsDialog = ref(false)

const selectedEarning = ref(null)


/* =========================================================
   PAYMENT STATUS OPTIONS
========================================================= */

const paymentStatusOptions = [

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
    name: 'gross',
    label: 'Amount',
    field: 'grossAmount',
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
    name: 'net',
    label: 'Net Earnings',
    field: 'netAmount',
    align: 'right',
    sortable: true
  },

  {
    name: 'paymentStatus',
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
   NORMALIZE EARNING
========================================================= */

const normalizeEarning = item => {

  const gross =
    Number(
      item.grossAmount ??
      item.amount ??
      item.totalAmount ??
      item.bookingAmount ??
      0
    )


  const commission =
    Number(
      item.commission ??
      item.agentCommission ??
      0
    )


  const commissionPercent =
    Number(
      item.commissionPercent ??
      item.agentCommissionPercent ??
      (
        gross > 0
          ? (commission / gross) * 100
          : 0
      )
    )


  const calculatedNet =
    gross - commission


  return {

    id:
      item.id ??
      item.bookingId,

    bookingNumber:
      item.bookingNumber ||
      item.booking?.bookingNumber ||
      item.booking?.booking_code ||
      item.bookingCode ||
      `#${item.bookingId || item.id || '-'}`,

    bookingDate:
      item.bookingDate ||
      item.date ||
      item.createdAt ||
      item.booking?.createdAt ||
      '',

    customerName:
      item.customerName ||
      item.customer?.name ||
      item.booking?.customer?.name ||
      item.user?.name ||
      'Customer',

    customerMobile:
      item.customerMobile ||
      item.customer?.mobile ||
      item.customer?.phone ||
      item.booking?.customer?.mobile ||
      item.user?.mobile ||
      '',

    customerImage:
      item.customerImage ||
      item.customer?.image ||
      item.user?.image ||
      '',

    vehicleName:
      item.vehicleName ||
      item.vehicle?.name ||
      item.vehicle?.model ||
      item.booking?.vehicle?.name ||
      '',

    vehicleRegistration:
      item.vehicleRegistration ||
      item.vehicle?.registrationNumber ||
      item.vehicle?.registration_number ||
      item.booking?.vehicle?.registrationNumber ||
      '',

    grossAmount:
      gross,

    commission:
      commission,

    commissionPercent:
      commissionPercent,

    netAmount:
      Number(
        item.netAmount ??
        item.netEarnings ??
        item.agentEarnings ??
        calculatedNet
      ),

    paymentStatus:
      item.paymentStatus ||
      item.payment_status ||
      item.payment?.status ||
      'Pending'

  }

}


/* =========================================================
   GET EARNINGS
========================================================= */

const getEarnings = async () => {

  try {

    loading.value = true


    const response =
      await axios.get(
        EARNINGS_ENDPOINT
      )


    const responseData =
      response.data


    let data = []


    if (
      Array.isArray(responseData)
    ) {

      data = responseData

    } else if (
      Array.isArray(responseData?.data)
    ) {

      data = responseData.data

    } else if (
      Array.isArray(responseData?.rows)
    ) {

      data = responseData.rows

    } else if (
      Array.isArray(responseData?.earnings)
    ) {

      data = responseData.earnings

    }


    earnings.value =
      data.map(normalizeEarning)


  } catch (error) {

    console.error(
      'Get Earnings Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        error.response?.data?.message ||
        'Unable to load earnings.'

    })

  } finally {

    loading.value = false

  }

}


/* =========================================================
   FILTERED EARNINGS
========================================================= */

const filteredEarnings = computed(() => {

  const keyword =
    search.value
      .toLowerCase()
      .trim()


  return earnings.value.filter(item => {

    const matchesSearch =

      !keyword ||

      String(
        item.bookingNumber || ''
      )
        .toLowerCase()
        .includes(keyword) ||

      String(
        item.customerName || ''
      )
        .toLowerCase()
        .includes(keyword) ||

      String(
        item.customerMobile || ''
      )
        .toLowerCase()
        .includes(keyword) ||

      String(
        item.vehicleName || ''
      )
        .toLowerCase()
        .includes(keyword) ||

      String(
        item.vehicleRegistration || ''
      )
        .toLowerCase()
        .includes(keyword)


    const bookingDate =
      item.bookingDate
        ? formatDateForCompare(
            item.bookingDate
          )
        : ''


    const matchesFromDate =
      !dateFrom.value ||
      bookingDate >= dateFrom.value


    const matchesToDate =
      !dateTo.value ||
      bookingDate <= dateTo.value


    const matchesPaymentStatus =
      !paymentStatusFilter.value ||
      item.paymentStatus ===
      paymentStatusFilter.value


    return (
      matchesSearch &&
      matchesFromDate &&
      matchesToDate &&
      matchesPaymentStatus
    )

  })

})


/* =========================================================
   SUMMARY
========================================================= */

const totalEarnings = computed(() => {

  return earnings.value.reduce(
    (sum, item) =>
      sum + Number(
        item.grossAmount || 0
      ),
    0
  )

})


const totalBookings = computed(() => {

  return earnings.value.length

})


const totalCommission = computed(() => {

  return earnings.value.reduce(
    (sum, item) =>
      sum + Number(
        item.commission || 0
      ),
    0
  )

})


const netEarnings = computed(() => {

  return earnings.value.reduce(
    (sum, item) =>
      sum + Number(
        item.netAmount || 0
      ),
    0
  )

})


/* =========================================================
   MONTHLY EARNINGS
========================================================= */

const monthlyEarnings = computed(() => {

  const months = {}

  earnings.value.forEach(item => {

    if (!item.bookingDate) {
      return
    }


    const date =
      new Date(
        item.bookingDate
      )


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return
    }


    const key =
      date.toLocaleDateString(
        'en-US',
        {
          month: 'short'
        }
      )


    months[key] =
      (months[key] || 0) +
      Number(
        item.netAmount || 0
      )

  })


  const currentDate =
    new Date()


  const result = []


  for (
    let i = 5;
    i >= 0;
    i--
  ) {

    const date =
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      )


    const month =
      date.toLocaleDateString(
        'en-US',
        {
          month: 'short'
        }
      )


    result.push({

      month,

      amount:
        months[month] || 0

    })

  }


  return result

})


/* =========================================================
   CHART HEIGHT
========================================================= */

const getChartHeight = amount => {

  const max =
    Math.max(
      ...monthlyEarnings.value.map(
        item => item.amount
      ),
      1
    )


  return Math.max(
    5,
    (amount / max) * 100
  )

}


/* =========================================================
   VIEW EARNING
========================================================= */

const viewEarning = earning => {

  selectedEarning.value =
    earning

  detailsDialog.value =
    true

}


/* =========================================================
   RESET FILTERS
========================================================= */

const resetFilters = () => {

  search.value = ''

  dateFrom.value = ''

  dateTo.value = ''

  paymentStatusFilter.value =
    null

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
   PAYMENT STATUS ICON
========================================================= */

const getPaymentStatusIcon = status => {

  switch (status) {

    case 'Paid':
      return 'check_circle'

    case 'Pending':
      return 'schedule'

    case 'Failed':
      return 'error'

    case 'Refunded':
      return 'undo'

    default:
      return 'help'

  }

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
   SHORT CURRENCY
========================================================= */

const formatShortCurrency = amount => {

  const value =
    Number(amount || 0)


  if (value >= 100000) {

    return `₹${(
      value / 100000
    ).toFixed(1)}L`

  }


  if (value >= 1000) {

    return `₹${(
      value / 1000
    ).toFixed(1)}K`

  }


  return `₹${value.toFixed(0)}`

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
   DATE COMPARISON FORMAT
========================================================= */

const formatDateForCompare = date => {

  const parsed =
    new Date(date)


  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {

    return ''

  }


  const year =
    parsed.getFullYear()


  const month =
    String(
      parsed.getMonth() + 1
    ).padStart(2, '0')


  const day =
    String(
      parsed.getDate()
    ).padStart(2, '0')


  return `${year}-${month}-${day}`

}


/* =========================================================
   GET INITIALS
========================================================= */

const getInitials = name => {

  if (!name) {
    return 'C'
  }


  return String(name)
    .trim()
    .split(/\s+/)
    .map(word =>
      word.charAt(0)
    )
    .join('')
    .substring(0, 2)
    .toUpperCase()

}


/* =========================================================
   CSV EXPORT
========================================================= */

const exportEarnings = () => {

  if (
    filteredEarnings.value.length === 0
  ) {

    $q.notify({

      type: 'warning',

      message:
        'No earnings available to export.'

    })

    return

  }


  const headers = [

    'Booking Number',

    'Booking Date',

    'Customer',

    'Customer Mobile',

    'Vehicle',

    'Registration',

    'Gross Amount',

    'Commission',

    'Commission %',

    'Net Earnings',

    'Payment Status'

  ]


  const rows =
    filteredEarnings.value.map(
      item => [

        item.bookingNumber,

        formatDate(
          item.bookingDate
        ),

        item.customerName,

        item.customerMobile,

        item.vehicleName,

        item.vehicleRegistration,

        item.grossAmount,

        item.commission,

        item.commissionPercent,

        item.netAmount,

        item.paymentStatus

      ]
    )


  const csvContent = [

    headers,

    ...rows

  ]
    .map(row =>
      row
        .map(value =>
          `"${String(
            value ?? ''
          ).replace(
            /"/g,
            '""'
          )}"`
        )
        .join(',')
    )
    .join('\n')


  const blob =
    new Blob(
      [csvContent],
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
    `agent-earnings-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`
  )


  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)

  URL.revokeObjectURL(url)


  $q.notify({

    type: 'positive',

    message:
      'Earnings exported successfully.'

  })

}


/* =========================================================
   LOAD PAGE
========================================================= */

onMounted(() => {

  getEarnings()

})

</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.agent-earnings-page {
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

.earnings-table {
  width: 100%;
}


/* =========================================================
   CHART
========================================================= */

.earnings-chart {
  height: 260px;

  display: flex;

  align-items: flex-end;

  justify-content: space-around;

  gap: 18px;

  padding:
    25px
    20px
    10px;

  border-radius: 12px;

  background: #f8fafc;
}


.chart-column {
  flex: 1;

  max-width: 80px;

  height: 100%;

  display: flex;

  flex-direction: column;

  justify-content: flex-end;

  align-items: center;
}


.chart-value {
  font-size: 11px;

  font-weight: 600;

  color: #475569;

  margin-bottom: 5px;

  white-space: nowrap;
}


.chart-bar {
  width: 42px;

  min-height: 8px;

  border-radius:
    7px
    7px
    2px
    2px;

  background:
    linear-gradient(
      to top,
      #1976d2,
      #42a5f5
    );

  transition:
    height 0.4s ease;
}


.chart-label {
  font-size: 12px;

  color: #64748b;

  margin-top: 8px;
}


/* =========================================================
   DETAILS DIALOG
========================================================= */

.earning-details-dialog {
  width: 620px;

  max-width: 95vw;

  border-radius: 16px;

  overflow: hidden;
}


/* =========================================================
   DETAIL HEADER
========================================================= */

.earning-detail-header {
  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 14px;

  background: #f8fafc;

  border-radius: 10px;
}


/* =========================================================
   DETAIL SECTION
========================================================= */

.detail-section {
  margin-top: 20px;
}


.detail-section-title {
  font-size: 14px;

  font-weight: 700;

  color: #1f2937;

  margin-bottom: 9px;
}


/* =========================================================
   DETAIL ITEM
========================================================= */

.detail-item {
  background: #f8fafc;

  border:
    1px solid
    #e5e7eb;

  border-radius: 10px;

  padding: 13px 15px;
}


/* =========================================================
   BREAKDOWN
========================================================= */

.earning-breakdown {
  background: #f8fafc;

  border:
    1px solid
    #e5e7eb;

  border-radius: 10px;

  padding: 15px;
}


.breakdown-row {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  font-size: 14px;

  padding: 7px 0;
}


.breakdown-row span {
  color: #64748b;
}


.breakdown-row strong {
  color: #1f2937;
}


.net-row {
  font-size: 16px;

  font-weight: 700;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 768px) {

  .agent-earnings-page {
    padding: 12px !important;
  }


  .text-h5 {
    font-size: 21px;
  }


  .earnings-chart {
    height: 220px;

    gap: 5px;

    padding:
      15px
      5px
      10px;
  }


  .chart-bar {
    width: 30px;
  }


  .earning-details-dialog {
    width: 95vw;
  }

}


@media (max-width: 480px) {

  .agent-earnings-page {
    padding: 8px !important;
  }


  .summary-card {
    border-radius: 10px;
  }


  .main-card {
    border-radius: 10px;
  }


  .earnings-chart {
    overflow-x: auto;

    justify-content:
      flex-start;
  }


  .chart-column {
    min-width: 55px;
  }

}

</style>
```
