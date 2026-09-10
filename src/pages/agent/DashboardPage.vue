<template>
  <q-page class="agent-dashboard q-pa-md">

    <!-- =====================================
         HEADER
    ====================================== -->

    <div class="row items-center justify-between q-mb-lg">

      <div>

        <div class="text-h5 text-weight-bold">
          Agent Dashboard
        </div>

        <div class="text-grey-6">
          Welcome back, {{ agentName }}
        </div>

      </div>


      <q-btn
        color="primary"
        icon="add"
        label="Add Vehicle"
        unelevated
        @click="
          $router.push('/agent/vehicles/add')
        "
      />

    </div>


    <!-- =====================================
         STATISTICS
    ====================================== -->

    <div class="row q-col-gutter-md q-mb-lg">


      <!-- VEHICLES -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="blue-1"
                text-color="primary"
                size="50px"
              >

                <q-icon
                  name="directions_car"
                  size="28px"
                />

              </q-avatar>


              <div class="q-ml-md">

                <div class="text-caption text-grey-6">
                  Total Vehicles
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ stats.totalVehicles }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- BOOKINGS -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="green-1"
                text-color="positive"
                size="50px"
              >

                <q-icon
                  name="event"
                  size="28px"
                />

              </q-avatar>


              <div class="q-ml-md">

                <div class="text-caption text-grey-6">
                  Total Bookings
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ stats.totalBookings }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- ACTIVE BOOKINGS -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="orange-1"
                text-color="orange"
                size="50px"
              >

                <q-icon
                  name="pending_actions"
                  size="28px"
                />

              </q-avatar>


              <div class="q-ml-md">

                <div class="text-caption text-grey-6">
                  Active Bookings
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ stats.activeBookings }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- EARNINGS -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="purple-1"
                text-color="purple"
                size="50px"
              >

                <q-icon
                  name="currency_rupee"
                  size="28px"
                />

              </q-avatar>


              <div class="q-ml-md">

                <div class="text-caption text-grey-6">
                  Total Earnings
                </div>

                <div class="text-h5 text-weight-bold">
                  ₹{{ stats.earnings }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================
         MAIN CONTENT
    ====================================== -->

    <div class="row q-col-gutter-lg">


      <!-- RECENT BOOKINGS -->
      <div class="col-12 col-lg-8">

        <q-card class="dashboard-card">

          <q-card-section>

            <div class="row items-center">

              <div>

                <div class="text-h6 text-weight-bold">
                  Recent Bookings
                </div>

                <div class="text-caption text-grey-6">
                  Latest vehicle bookings
                </div>

              </div>

              <q-space />

              <q-btn
                flat
                color="primary"
                label="View All"
                @click="
                  $router.push(
                    '/agent/vehicle-bookings'
                  )
                "
              />

            </div>

          </q-card-section>


          <q-separator />


          <q-card-section class="q-pa-none">

            <q-table
              flat
              :rows="recentBookings"
              :columns="bookingColumns"
              row-key="id"
              hide-pagination
            >

              <template #body-cell-status="props">

                <q-td :props="props">

                  <q-badge
                    :color="
                      getStatusColor(
                        props.row.status
                      )
                    "
                  >
                    {{ props.row.status }}
                  </q-badge>

                </q-td>

              </template>


              <template #body-cell-amount="props">

                <q-td :props="props">

                  <span class="text-weight-bold">
                    ₹{{ props.row.amount }}
                  </span>

                </q-td>

              </template>

            </q-table>

          </q-card-section>

        </q-card>

      </div>


      <!-- VEHICLE STATUS -->
      <div class="col-12 col-lg-4">

        <q-card class="dashboard-card">

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Vehicle Status
            </div>

            <div class="text-caption text-grey-6">
              Current vehicle availability
            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div
              v-for="item in vehicleStatus"
              :key="item.label"
              class="status-row"
            >

              <div class="row items-center">

                <q-icon
                  :name="item.icon"
                  :color="item.color"
                  size="20px"
                />

                <span class="q-ml-sm">
                  {{ item.label }}
                </span>

              </div>


              <div class="text-weight-bold">
                {{ item.count }}
              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- QUICK ACTIONS -->

        <q-card class="dashboard-card q-mt-lg">

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Quick Actions
            </div>

          </q-card-section>


          <q-card-section class="q-pt-none">

            <q-btn
              outline
              color="primary"
              icon="add"
              label="Add Vehicle"
              class="full-width q-mb-sm"
              @click="
                $router.push(
                  '/agent/vehicles/add'
                )
              "
            />


            <q-btn
              outline
              color="primary"
              icon="event"
              label="View Bookings"
              class="full-width q-mb-sm"
              @click="
                $router.push(
                  '/agent/vehicle-bookings'
                )
              "
            />


            <q-btn
              outline
              color="primary"
              icon="assessment"
              label="View Reports"
              class="full-width"
              @click="
                $router.push(
                  '/agent/reports'
                )
              "
            />

          </q-card-section>

        </q-card>

      </div>

    </div>

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


const $q = useQuasar()


// ==============================================
// AGENT
// ==============================================

const agentName = ref('Agent')


// ==============================================
// STATS
// ==============================================

const stats = ref({

  totalVehicles: 25,

  totalBookings: 128,

  activeBookings: 12,

  earnings: '1,25,500'

})


// ==============================================
// RECENT BOOKINGS
// ==============================================

const recentBookings = ref([

  {
    id: 'BK1001',
    customer: 'Rahul Kumar',
    vehicle: 'Toyota Innova',
    date: '25 Aug 2026',
    amount: '3,500',
    status: 'Confirmed'
  },

  {
    id: 'BK1002',
    customer: 'Amit Singh',
    vehicle: 'Swift Dzire',
    date: '24 Aug 2026',
    amount: '2,200',
    status: 'Completed'
  },

  {
    id: 'BK1003',
    customer: 'Priya Sharma',
    vehicle: 'Honda City',
    date: '24 Aug 2026',
    amount: '3,000',
    status: 'Pending'
  },

  {
    id: 'BK1004',
    customer: 'Neha Gupta',
    vehicle: 'Ertiga',
    date: '23 Aug 2026',
    amount: '2,800',
    status: 'Cancelled'
  }

])


// ==============================================
// TABLE COLUMNS
// ==============================================

const bookingColumns = [

  {
    name: 'id',
    label: 'Booking ID',
    field: 'id',
    align: 'left'
  },

  {
    name: 'customer',
    label: 'Customer',
    field: 'customer',
    align: 'left'
  },

  {
    name: 'vehicle',
    label: 'Vehicle',
    field: 'vehicle',
    align: 'left'
  },

  {
    name: 'date',
    label: 'Date',
    field: 'date',
    align: 'left'
  },

  {
    name: 'amount',
    label: 'Amount',
    field: 'amount',
    align: 'right'
  },

  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'center'
  }

]


// ==============================================
// VEHICLE STATUS
// ==============================================

const vehicleStatus = ref([

  {
    label: 'Available',
    count: 12,
    icon: 'check_circle',
    color: 'positive'
  },

  {
    label: 'Booked',
    count: 8,
    icon: 'event',
    color: 'primary'
  },

  {
    label: 'Maintenance',
    count: 3,
    icon: 'build',
    color: 'orange'
  },

  {
    label: 'Inactive',
    count: 2,
    icon: 'cancel',
    color: 'negative'
  }

])


// ==============================================
// STATUS COLOR
// ==============================================

function getStatusColor(status) {

  switch (status) {

    case 'Confirmed':
      return 'primary'

    case 'Completed':
      return 'positive'

    case 'Pending':
      return 'orange'

    case 'Cancelled':
      return 'negative'

    default:
      return 'grey'

  }

}


// ==============================================
// LOAD DASHBOARD
// ==============================================

async function loadDashboard() {

  /*
   * Connect your API here.
   *
   * Example:
   *
   * const response =
   *   await agentService.getDashboard()
   *
   * stats.value =
   *   response.data.stats
   *
   * recentBookings.value =
   *   response.data.bookings
   */

}


// ==============================================
// MOUNT
// ==============================================

onMounted(() => {

  loadDashboard()

})

</script>


<style scoped>

.agent-dashboard {
  background: #f5f7fb;
  min-height: 100%;
}


/* =========================================
   STAT CARD
========================================= */

.stat-card {

  border-radius: 12px;

  border: 1px solid #e5e7eb;

  box-shadow:
    0 2px 10px
    rgba(0, 0, 0, 0.04);

}


/* =========================================
   DASHBOARD CARD
========================================= */

.dashboard-card {

  border-radius: 12px;

  border: 1px solid #e5e7eb;

  box-shadow:
    0 2px 10px
    rgba(0, 0, 0, 0.04);

}


/* =========================================
   STATUS ROW
========================================= */

.status-row {

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 14px 0;

  border-bottom: 1px solid #eeeeee;

}


.status-row:last-child {

  border-bottom: none;

}

</style>
