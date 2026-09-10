<template>
  <q-page class="admin-dashboard">

    <!-- ================= PAGE HEADER ================= -->
    <div class="page-header">

      <div>
        <div class="page-title">
          Dashboard
        </div>

        <div class="page-subtitle">
          Welcome back, Admin
        </div>
      </div>

      <q-btn
        color="primary"
        icon="refresh"
        label="Refresh"
        unelevated
        @click="loadDashboard"
      />

    </div>


    <!-- ================= STAT CARDS ================= -->
    <div class="row q-col-gutter-md">

      <!-- Users -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-top">

              <div>
                <div class="stat-title">
                  Total Users
                </div>

                <div class="stat-value">
                  {{ stats.users }}
                </div>

                <div class="stat-change positive">
                  <q-icon name="trending_up" />
                  12% this month
                </div>
              </div>

              <q-avatar
                color="blue-1"
                text-color="primary"
                size="55px"
              >
                <q-icon
                  name="people"
                  size="30px"
                />
              </q-avatar>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Vehicles -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-top">

              <div>
                <div class="stat-title">
                  Total Vehicles
                </div>

                <div class="stat-value">
                  {{ stats.vehicles }}
                </div>

                <div class="stat-change positive">
                  <q-icon name="trending_up" />
                  8% this month
                </div>
              </div>

              <q-avatar
                color="orange-1"
                text-color="orange"
                size="55px"
              >
                <q-icon
                  name="directions_car"
                  size="30px"
                />
              </q-avatar>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Bookings -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-top">

              <div>
                <div class="stat-title">
                  Total Bookings
                </div>

                <div class="stat-value">
                  {{ stats.bookings }}
                </div>

                <div class="stat-change positive">
                  <q-icon name="trending_up" />
                  18% this month
                </div>
              </div>

              <q-avatar
                color="green-1"
                text-color="green"
                size="55px"
              >
                <q-icon
                  name="event_available"
                  size="30px"
                />
              </q-avatar>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Revenue -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-top">

              <div>
                <div class="stat-title">
                  Total Revenue
                </div>

                <div class="stat-value">
                  ₹{{ stats.revenue }}
                </div>

                <div class="stat-change positive">
                  <q-icon name="trending_up" />
                  22% this month
                </div>
              </div>

              <q-avatar
                color="purple-1"
                text-color="purple"
                size="55px"
              >
                <q-icon
                  name="payments"
                  size="30px"
                />
              </q-avatar>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- ================= CHART + BOOKING SUMMARY ================= -->
    <div class="row q-col-gutter-md q-mt-md">

      <!-- Revenue Chart -->
      <div class="col-12 col-lg-8">

        <q-card class="dashboard-card">

          <q-card-section>

            <div class="card-header">

              <div>
                <div class="card-title">
                  Revenue Overview
                </div>

                <div class="card-subtitle">
                  Monthly revenue performance
                </div>
              </div>

              <q-select
                v-model="selectedPeriod"
                :options="periodOptions"
                dense
                outlined
                emit-value
                map-options
                style="width: 130px"
              />

            </div>

            <div class="revenue-chart">

              <div
                v-for="item in revenueData"
                :key="item.month"
                class="chart-column"
              >

                <div class="chart-value">
                  ₹{{ item.value }}
                </div>

                <div
                  class="chart-bar"
                  :style="{
                    height: `${item.height}px`
                  }"
                ></div>

                <div class="chart-label">
                  {{ item.month }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Booking Summary -->
      <div class="col-12 col-lg-4">

        <q-card class="dashboard-card">

          <q-card-section>

            <div class="card-title">
              Booking Summary
            </div>

            <div class="card-subtitle">
              Current booking status
            </div>


            <div
              v-for="item in bookingSummary"
              :key="item.label"
              class="booking-status"
            >

              <div class="row items-center">

                <q-avatar
                  size="38px"
                  :color="item.color"
                  text-color="white"
                >
                  <q-icon :name="item.icon" />
                </q-avatar>

                <div class="q-ml-md">

                  <div class="status-label">
                    {{ item.label }}
                  </div>

                  <div class="status-count">
                    {{ item.count }} bookings
                  </div>

                </div>

                <q-space />

                <div class="status-percent">
                  {{ item.percent }}%
                </div>

              </div>

              <q-linear-progress
                :value="item.percent / 100"
                :color="item.color"
                rounded
                class="q-mt-sm"
              />

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- ================= RECENT BOOKINGS ================= -->
    <div class="q-mt-md">

      <q-card class="dashboard-card">

        <q-card-section>

          <div class="card-header">

            <div>
              <div class="card-title">
                Recent Bookings
              </div>

              <div class="card-subtitle">
                Latest vehicle bookings
              </div>
            </div>

            <q-btn
              flat
              color="primary"
              label="View All"
              @click="$router.push('/admin/bookings')"
            />

          </div>


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
                  :color="getStatusColor(props.value)"
                  rounded
                >
                  {{ props.value }}
                </q-badge>

              </q-td>

            </template>


            <template #body-cell-amount="props">

              <q-td :props="props">
                ₹{{ props.value }}
              </q-td>

            </template>

          </q-table>

        </q-card-section>

      </q-card>

    </div>

  </q-page>
</template>


<script setup>

import { ref, onMounted } from 'vue'

const selectedPeriod = ref('6months')

const periodOptions = [
  {
    label: '6 Months',
    value: '6months'
  },
  {
    label: '1 Year',
    value: '1year'
  }
]


const stats = ref({
  users: 1250,
  vehicles: 186,
  bookings: 3245,
  revenue: '18,45,600'
})


const revenueData = ref([
  {
    month: 'Mar',
    value: '2.1K',
    height: 80
  },
  {
    month: 'Apr',
    value: '2.8K',
    height: 110
  },
  {
    month: 'May',
    value: '3.4K',
    height: 140
  },
  {
    month: 'Jun',
    value: '3.1K',
    height: 125
  },
  {
    month: 'Jul',
    value: '4.2K',
    height: 170
  },
  {
    month: 'Aug',
    value: '5.1K',
    height: 210
  }
])


const bookingSummary = ref([
  {
    label: 'Completed',
    count: 1850,
    percent: 57,
    color: 'positive',
    icon: 'check_circle'
  },
  {
    label: 'Pending',
    count: 420,
    percent: 13,
    color: 'warning',
    icon: 'schedule'
  },
  {
    label: 'Active',
    count: 650,
    percent: 20,
    color: 'primary',
    icon: 'directions_car'
  },
  {
    label: 'Cancelled',
    count: 325,
    percent: 10,
    color: 'negative',
    icon: 'cancel'
  }
])


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


const recentBookings = ref([
  {
    id: '#BD1001',
    customer: 'Rahul Kumar',
    vehicle: 'Toyota Innova',
    date: '22 Aug 2026',
    amount: '4,500',
    status: 'Completed'
  },
  {
    id: '#BD1002',
    customer: 'Amit Sharma',
    vehicle: 'Swift Dzire',
    date: '22 Aug 2026',
    amount: '2,800',
    status: 'Active'
  },
  {
    id: '#BD1003',
    customer: 'Priya Singh',
    vehicle: 'Hyundai Creta',
    date: '21 Aug 2026',
    amount: '5,200',
    status: 'Pending'
  },
  {
    id: '#BD1004',
    customer: 'Neha Verma',
    vehicle: 'Honda City',
    date: '21 Aug 2026',
    amount: '3,600',
    status: 'Cancelled'
  },
  {
    id: '#BD1005',
    customer: 'Vikas Kumar',
    vehicle: 'Mahindra XUV',
    date: '20 Aug 2026',
    amount: '6,400',
    status: 'Completed'
  }
])


const getStatusColor = (status) => {

  switch (status) {

    case 'Completed':
      return 'positive'

    case 'Active':
      return 'primary'

    case 'Pending':
      return 'warning'

    case 'Cancelled':
      return 'negative'

    default:
      return 'grey'

  }

}


const loadDashboard = () => {

  // Later API call will come here.

  console.log('Dashboard refreshed')

}


onMounted(() => {
  loadDashboard()
})

</script>


<style scoped>

.admin-dashboard {
  padding: 24px;
  background: #f5f7fb;
  min-height: 100vh;
}

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
  color: #6b7280;
  margin-top: 4px;
}


/* ================= STAT CARD ================= */

.stat-card {
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
}

.stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-title {
  color: #6b7280;
  font-size: 14px;
}

.stat-value {
  font-size: 27px;
  font-weight: 700;
  margin-top: 6px;
}

.stat-change {
  font-size: 12px;
  margin-top: 8px;
}

.stat-change.positive {
  color: #21ba45;
}


/* ================= DASHBOARD CARD ================= */

.dashboard-card {
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
}

.card-subtitle {
  font-size: 13px;
  color: #888;
  margin-top: 3px;
}


/* ================= REVENUE CHART ================= */

.revenue-chart {
  height: 270px;
  margin-top: 25px;

  display: flex;
  align-items: flex-end;
  justify-content: space-around;

  border-bottom: 1px solid #ddd;
}

.chart-column {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.chart-value {
  font-size: 11px;
  color: #777;
  margin-bottom: 5px;
}

.chart-bar {
  width: 35px;
  background: #1976d2;
  border-radius: 6px 6px 0 0;
  min-height: 10px;
}

.chart-label {
  font-size: 12px;
  color: #777;
  margin-top: 8px;
  margin-bottom: -25px;
}


/* ================= BOOKING STATUS ================= */

.booking-status {
  margin-top: 22px;
}

.status-label {
  font-weight: 600;
}

.status-count {
  font-size: 12px;
  color: #888;
}

.status-percent {
  font-weight: 600;
}


/* ================= MOBILE ================= */

@media (max-width: 600px) {

  .admin-dashboard {
    padding: 15px;
  }

  .page-header {
    align-items: flex-start;
  }

  .page-title {
    font-size: 22px;
  }

  .page-header .q-btn {
    font-size: 12px;
  }

}

</style>
