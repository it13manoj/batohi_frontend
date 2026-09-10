```vue
<template>
  <q-page class="driver-earnings-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">
          Earnings
        </div>

        <div class="text-grey-7 q-mt-xs">
          Track your trips, income and payment history
        </div>
      </div>

      <q-btn
        outline
        color="primary"
        icon="download"
        label="Export"
        no-caps
        @click="exportEarnings"
      />
    </div>


    <!-- =====================================================
         SUMMARY CARDS
    ====================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- Total Earnings -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="earning-card">
          <q-card-section>
            <div class="row items-center justify-between">

              <div>
                <div class="text-grey-7 text-caption">
                  Total Earnings
                </div>

                <div class="text-h5 text-weight-bold q-mt-sm">
                  ₹{{ formatAmount(summary.totalEarnings) }}
                </div>

                <div class="text-positive text-caption q-mt-xs">
                  <q-icon name="trending_up" />
                  {{ summary.earningGrowth }}% this month
                </div>
              </div>

              <q-avatar
                color="primary"
                text-color="white"
                icon="account_balance_wallet"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>


      <!-- This Month -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="earning-card">
          <q-card-section>
            <div class="row items-center justify-between">

              <div>
                <div class="text-grey-7 text-caption">
                  This Month
                </div>

                <div class="text-h5 text-weight-bold q-mt-sm">
                  ₹{{ formatAmount(summary.monthEarnings) }}
                </div>

                <div class="text-grey-6 text-caption q-mt-xs">
                  {{ summary.monthTrips }} completed trips
                </div>
              </div>

              <q-avatar
                color="blue"
                text-color="white"
                icon="calendar_month"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>


      <!-- Pending -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="earning-card">
          <q-card-section>
            <div class="row items-center justify-between">

              <div>
                <div class="text-grey-7 text-caption">
                  Pending
                </div>

                <div class="text-h5 text-weight-bold q-mt-sm">
                  ₹{{ formatAmount(summary.pending) }}
                </div>

                <div class="text-warning text-caption q-mt-xs">
                  Payment processing
                </div>
              </div>

              <q-avatar
                color="orange"
                text-color="white"
                icon="pending"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>


      <!-- Available Balance -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="earning-card">
          <q-card-section>
            <div class="row items-center justify-between">

              <div>
                <div class="text-grey-7 text-caption">
                  Available Balance
                </div>

                <div class="text-h5 text-weight-bold q-mt-sm">
                  ₹{{ formatAmount(summary.availableBalance) }}
                </div>

                <div class="text-grey-6 text-caption q-mt-xs">
                  Ready for withdrawal
                </div>
              </div>

              <q-avatar
                color="green"
                text-color="white"
                icon="payments"
              />
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

        <div class="text-subtitle1 text-weight-bold q-mb-md">
          Earnings Filter
        </div>

        <div class="row q-col-gutter-md">

          <!-- Date From -->
          <div class="col-12 col-md-3">
            <q-input
              v-model="filters.fromDate"
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
                      v-model="filters.fromDate"
                      mask="YYYY-MM-DD"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>


          <!-- Date To -->
          <div class="col-12 col-md-3">
            <q-input
              v-model="filters.toDate"
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
                      v-model="filters.toDate"
                      mask="YYYY-MM-DD"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>


          <!-- Status -->
          <div class="col-12 col-md-3">
            <q-select
              v-model="filters.status"
              :options="statusOptions"
              outlined
              dense
              label="Payment Status"
              emit-value
              map-options
              clearable
            />
          </div>


          <!-- Search -->
          <div class="col-12 col-md-3">
            <q-input
              v-model="filters.search"
              outlined
              dense
              label="Search Trip"
              placeholder="Trip ID / Customer"
              clearable
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

        </div>


        <div class="row justify-end q-mt-md">
          <q-btn
            color="primary"
            icon="filter_alt"
            label="Apply Filter"
            no-caps
            @click="applyFilter"
          />

          <q-btn
            flat
            color="grey-7"
            label="Reset"
            no-caps
            class="q-ml-sm"
            @click="resetFilter"
          />
        </div>

      </q-card-section>
    </q-card>


    <!-- =====================================================
         EARNINGS TABLE
    ====================================================== -->
    <q-card class="earnings-table-card">

      <q-card-section class="row items-center justify-between">
        <div>
          <div class="text-h6 text-weight-bold">
            Earnings History
          </div>

          <div class="text-caption text-grey-6">
            {{ filteredEarnings.length }} transactions found
          </div>
        </div>

        <q-btn
          flat
          round
          icon="refresh"
          color="primary"
          :loading="loading"
          @click="loadEarnings"
        >
          <q-tooltip>
            Refresh
          </q-tooltip>
        </q-btn>
      </q-card-section>


      <q-separator />


      <q-table
        :rows="filteredEarnings"
        :columns="columns"
        row-key="id"
        flat
        :loading="loading"
        :pagination="pagination"
        class="earnings-table"
        no-data-label="No earnings found"
      >

        <!-- Trip ID -->
        <template #body-cell-tripId="props">
          <q-td :props="props">
            <div class="text-weight-bold text-primary">
              {{ props.row.tripId }}
            </div>

            <div class="text-caption text-grey-6">
              {{ props.row.date }}
            </div>
          </q-td>
        </template>


        <!-- Customer -->
        <template #body-cell-customer="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">

              <q-avatar
                size="34px"
                color="grey-3"
                text-color="grey-8"
              >
                {{ getInitials(props.row.customer) }}
              </q-avatar>

              <div class="q-ml-sm">
                <div class="text-weight-medium">
                  {{ props.row.customer }}
                </div>

                <div class="text-caption text-grey-6">
                  {{ props.row.vehicle }}
                </div>
              </div>

            </div>
          </q-td>
        </template>


        <!-- Route -->
        <template #body-cell-route="props">
          <q-td :props="props">
            <div class="route-cell">

              <div>
                <q-icon
                  name="radio_button_checked"
                  color="primary"
                  size="14px"
                />
                {{ props.row.pickup }}
              </div>

              <div class="route-line"></div>

              <div>
                <q-icon
                  name="location_on"
                  color="negative"
                  size="14px"
                />
                {{ props.row.drop }}
              </div>

            </div>
          </q-td>
        </template>


        <!-- Fare -->
        <template #body-cell-fare="props">
          <q-td :props="props">
            <div class="text-weight-bold">
              ₹{{ formatAmount(props.row.fare) }}
            </div>
          </q-td>
        </template>


        <!-- Commission -->
        <template #body-cell-commission="props">
          <q-td :props="props">
            <span class="text-negative">
              - ₹{{ formatAmount(props.row.commission) }}
            </span>
          </q-td>
        </template>


        <!-- Net Earnings -->
        <template #body-cell-net="props">
          <q-td :props="props">
            <div class="text-positive text-weight-bold">
              ₹{{ formatAmount(props.row.net) }}
            </div>
          </q-td>
        </template>


        <!-- Status -->
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="statusColor(props.row.status)"
              :label="props.row.status"
              rounded
            />
          </q-td>
        </template>


        <!-- Action -->
        <template #body-cell-action="props">
          <q-td :props="props">
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

    </q-card>


    <!-- =====================================================
         EARNING DETAILS DIALOG
    ====================================================== -->
    <q-dialog v-model="detailsDialog">

      <q-card style="width: 520px; max-width: 95vw;">

        <q-card-section class="row items-center justify-between">
          <div>
            <div class="text-h6 text-weight-bold">
              Earning Details
            </div>

            <div class="text-caption text-grey-6">
              {{ selectedEarning?.tripId }}
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

          <div class="detail-row">
            <span>Customer</span>
            <strong>{{ selectedEarning.customer }}</strong>
          </div>

          <div class="detail-row">
            <span>Vehicle</span>
            <strong>{{ selectedEarning.vehicle }}</strong>
          </div>

          <div class="detail-row">
            <span>Pickup</span>
            <strong>{{ selectedEarning.pickup }}</strong>
          </div>

          <div class="detail-row">
            <span>Drop</span>
            <strong>{{ selectedEarning.drop }}</strong>
          </div>

          <q-separator class="q-my-md" />

          <div class="detail-row">
            <span>Total Fare</span>
            <strong>
              ₹{{ formatAmount(selectedEarning.fare) }}
            </strong>
          </div>

          <div class="detail-row">
            <span>Commission</span>
            <strong class="text-negative">
              - ₹{{ formatAmount(selectedEarning.commission) }}
            </strong>
          </div>

          <div class="detail-row total-row">
            <span>Net Earnings</span>
            <strong class="text-positive">
              ₹{{ formatAmount(selectedEarning.net) }}
            </strong>
          </div>

          <div class="q-mt-md">
            <q-badge
              :color="statusColor(selectedEarning.status)"
              :label="selectedEarning.status"
            />
          </div>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Close"
            color="primary"
            v-close-popup
          />
        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { Notify } from 'quasar'

/* =====================================================
   STATE
===================================================== */

const loading = ref(false)

const detailsDialog = ref(false)

const selectedEarning = ref(null)


/* =====================================================
   SUMMARY
===================================================== */

const summary = ref({
  totalEarnings: 84560,
  earningGrowth: 12.5,
  monthEarnings: 28450,
  monthTrips: 42,
  pending: 4250,
  availableBalance: 24200
})


/* =====================================================
   FILTERS
===================================================== */

const filters = ref({
  fromDate: '',
  toDate: '',
  status: '',
  search: ''
})


const statusOptions = [
  {
    label: 'Paid',
    value: 'Paid'
  },
  {
    label: 'Pending',
    value: 'Pending'
  },
  {
    label: 'Processing',
    value: 'Processing'
  }
]


/* =====================================================
   EARNINGS DATA
===================================================== */

const earnings = ref([
  {
    id: 1,
    tripId: 'TRP-1001',
    date: '2026-08-26',
    customer: 'Rahul Kumar',
    vehicle: 'Toyota Innova',
    pickup: 'Patna Airport',
    drop: 'Muzaffarpur',
    fare: 2800,
    commission: 280,
    net: 2520,
    status: 'Paid'
  },
  {
    id: 2,
    tripId: 'TRP-1002',
    date: '2026-08-25',
    customer: 'Amit Singh',
    vehicle: 'Maruti Dzire',
    pickup: 'Patna Junction',
    drop: 'Gaya',
    fare: 2200,
    commission: 220,
    net: 1980,
    status: 'Paid'
  },
  {
    id: 3,
    tripId: 'TRP-1003',
    date: '2026-08-24',
    customer: 'Priya Sharma',
    vehicle: 'Toyota Etios',
    pickup: 'Rajendra Nagar',
    drop: 'Nalanda',
    fare: 1900,
    commission: 190,
    net: 1710,
    status: 'Processing'
  },
  {
    id: 4,
    tripId: 'TRP-1004',
    date: '2026-08-23',
    customer: 'Rohit Verma',
    vehicle: 'Mahindra XUV',
    pickup: 'Patna',
    drop: 'Vaishali',
    fare: 2500,
    commission: 250,
    net: 2250,
    status: 'Paid'
  },
  {
    id: 5,
    tripId: 'TRP-1005',
    date: '2026-08-22',
    customer: 'Neha Gupta',
    vehicle: 'Toyota Innova',
    pickup: 'Patna Airport',
    drop: 'Darbhanga',
    fare: 3200,
    commission: 320,
    net: 2880,
    status: 'Pending'
  },
  {
    id: 6,
    tripId: 'TRP-1006',
    date: '2026-08-21',
    customer: 'Sanjay Kumar',
    vehicle: 'Maruti Ertiga',
    pickup: 'Patna',
    drop: 'Bihar Sharif',
    fare: 2100,
    commission: 210,
    net: 1890,
    status: 'Paid'
  },
  {
    id: 7,
    tripId: 'TRP-1007',
    date: '2026-08-20',
    customer: 'Pooja Singh',
    vehicle: 'Toyota Crysta',
    pickup: 'Patna Airport',
    drop: 'Bodh Gaya',
    fare: 3600,
    commission: 360,
    net: 3240,
    status: 'Paid'
  }
])


/* =====================================================
   TABLE COLUMNS
===================================================== */

const columns = [
  {
    name: 'tripId',
    label: 'Trip',
    field: 'tripId',
    align: 'left',
    sortable: true
  },
  {
    name: 'customer',
    label: 'Customer',
    field: 'customer',
    align: 'left',
    sortable: true
  },
  {
    name: 'route',
    label: 'Route',
    field: 'pickup',
    align: 'left'
  },
  {
    name: 'fare',
    label: 'Fare',
    field: 'fare',
    align: 'right',
    sortable: true
  },
  {
    name: 'commission',
    label: 'Commission',
    field: 'commission',
    align: 'right'
  },
  {
    name: 'net',
    label: 'Net Earnings',
    field: 'net',
    align: 'right',
    sortable: true
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'center'
  },
  {
    name: 'action',
    label: '',
    field: 'action',
    align: 'center'
  }
]


/* =====================================================
   PAGINATION
===================================================== */

const pagination = ref({
  page: 1,
  rowsPerPage: 10
})


/* =====================================================
   FILTERED EARNINGS
===================================================== */

const filteredEarnings = computed(() => {

  return earnings.value.filter(item => {

    const search = filters.value.search
      ? filters.value.search.toLowerCase()
      : ''

    const matchesSearch =
      !search ||
      item.tripId.toLowerCase().includes(search) ||
      item.customer.toLowerCase().includes(search)

    const matchesStatus =
      !filters.value.status ||
      item.status === filters.value.status

    const matchesFromDate =
      !filters.value.fromDate ||
      item.date >= filters.value.fromDate

    const matchesToDate =
      !filters.value.toDate ||
      item.date <= filters.value.toDate

    return (
      matchesSearch &&
      matchesStatus &&
      matchesFromDate &&
      matchesToDate
    )
  })
})


/* =====================================================
   METHODS
===================================================== */

function formatAmount(amount) {
  return Number(amount || 0).toLocaleString('en-IN')
}


function getInitials(name) {

  if (!name) return ''

  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
}


function statusColor(status) {

  switch (status) {

    case 'Paid':
      return 'positive'

    case 'Pending':
      return 'warning'

    case 'Processing':
      return 'info'

    default:
      return 'grey'
  }
}


function applyFilter() {

  pagination.value.page = 1

  Notify.create({
    type: 'positive',
    message: 'Earnings filter applied'
  })
}


function resetFilter() {

  filters.value = {
    fromDate: '',
    toDate: '',
    status: '',
    search: ''
  }

  pagination.value.page = 1
}


function viewEarning(row) {

  selectedEarning.value = row

  detailsDialog.value = true
}


function exportEarnings() {

  const data = filteredEarnings.value

  if (!data.length) {

    Notify.create({
      type: 'warning',
      message: 'No earnings available to export'
    })

    return
  }

  const headers = [
    'Trip ID',
    'Date',
    'Customer',
    'Vehicle',
    'Pickup',
    'Drop',
    'Fare',
    'Commission',
    'Net Earnings',
    'Status'
  ]

  const rows = data.map(item => [
    item.tripId,
    item.date,
    item.customer,
    item.vehicle,
    item.pickup,
    item.drop,
    item.fare,
    item.commission,
    item.net,
    item.status
  ])

  const csv = [
    headers,
    ...rows
  ]
    .map(row =>
      row
        .map(value =>
          `"${String(value).replace(/"/g, '""')}"`
        )
        .join(',')
    )
    .join('\n')

  const blob = new Blob(
    [csv],
    { type: 'text/csv;charset=utf-8;' }
  )

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')

  link.href = url
  link.download = 'driver-earnings.csv'

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)

  URL.revokeObjectURL(url)

  Notify.create({
    type: 'positive',
    message: 'Earnings exported successfully'
  })
}


/* =====================================================
   API READY METHOD
===================================================== */

async function loadEarnings() {

  loading.value = true

  try {

    /*
      Connect your API here.

      Example:

      const response = await api.get('/driver/earnings')

      earnings.value = response.data.data

      summary.value = response.data.summary
    */

    await new Promise(resolve => setTimeout(resolve, 500))

  } catch (error) {

    console.error('Earnings Error:', error)

    Notify.create({
      type: 'negative',
      message: 'Unable to load earnings'
    })

  } finally {

    loading.value = false
  }
}


/* =====================================================
   INITIAL LOAD
===================================================== */

onMounted(() => {
  loadEarnings()
})
</script>


<style scoped>
/* =====================================================
   PAGE
===================================================== */

.driver-earnings-page {
  background: #f7f8fa;
  min-height: 100%;
}


/* =====================================================
   SUMMARY CARDS
===================================================== */

.earning-card {
  height: 100%;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  box-shadow: none;
  transition: 0.2s ease;
}

.earning-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.06);
}


/* =====================================================
   FILTER
===================================================== */

.filter-card {
  border-radius: 12px;
  box-shadow: none;
  border: 1px solid #e8e8e8;
}


/* =====================================================
   TABLE
===================================================== */

.earnings-table-card {
  border-radius: 12px;
  box-shadow: none;
  border: 1px solid #e8e8e8;
}

.earnings-table {
  border-radius: 0 0 12px 12px;
}


/* =====================================================
   ROUTE
===================================================== */

.route-cell {
  min-width: 180px;
  font-size: 13px;
}

.route-cell > div {
  display: flex;
  align-items: center;
  gap: 5px;
}

.route-line {
  height: 12px;
  width: 1px;
  background: #cfcfcf;
  margin-left: 6px;
}


/* =====================================================
   DETAILS
===================================================== */

.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-row span {
  color: #777;
}

.detail-row strong {
  text-align: right;
}

.total-row {
  border-bottom: none;
  font-size: 17px;
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 600px) {

  .driver-earnings-page {
    padding: 12px !important;
  }

  .text-h5 {
    font-size: 21px;
  }

  .earning-card {
    min-height: 120px;
  }

  .filter-card {
    margin-bottom: 16px;
  }

  .route-cell {
    min-width: 150px;
  }

}
</style>
```
