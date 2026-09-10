```vue
<template>
  <q-page class="dashboard-page">

    <!-- =====================================================
         WELCOME SECTION
    ====================================================== -->
    <section class="welcome-section">
      <div>
        <div class="welcome-title">
          Welcome back, {{ userName }} 👋
        </div>


      </div>

    </section>


    <!-- =====================================================
         QUICK ACTIONS
    ====================================================== -->
    <div class="">

      <div class="row q-col-gutter-md q-mt-sm">

        <!-- SEARCH -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card
            class="action-card"
            clickable
            @click="goToSearch"
          >
            <q-card-section class="text-center">

              <q-icon
                name="search"
                color="primary"
                size="38px"
              />

              <div class="action-title">
                Search Vehicle
              </div>

              <div class="action-description">
                Find a vehicle for your trip
              </div>

            </q-card-section>
          </q-card>
        </div>


        <!-- BOOKINGS -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card
            class="action-card"
            clickable
            @click="goToBookings"
          >
            <q-card-section class="text-center">

              <q-icon
                name="book_online"
                color="primary"
                size="38px"
              />

              <div class="action-title">
                My Bookings
              </div>

              <div class="action-description">
                View your booking history
              </div>

            </q-card-section>
          </q-card>
        </div>


        <!-- PROFILE -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card
            class="action-card"
            clickable
            @click="goToProfile"
          >
            <q-card-section class="text-center">

              <q-icon
                name="person"
                color="primary"
                size="38px"
              />

              <div class="action-title">
                My Profile
              </div>

              <div class="action-description">
                Manage your account
              </div>

            </q-card-section>
          </q-card>
        </div>


        <!-- PAYMENTS -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card
            class="action-card"
            clickable
            @click="goToPayments"
          >
            <q-card-section class="text-center">

              <q-icon
                name="payments"
                color="primary"
                size="38px"
              />

              <div class="action-title">
                Payments
              </div>

              <div class="action-description">
                View payment information
              </div>

            </q-card-section>
          </q-card>
        </div>

      </div>

    </div>


    <!-- =====================================================
         RECENT BOOKINGS
    ====================================================== -->
    <div class="q-mt-xl">

      <div class="row items-center justify-between">
        <div class="section-heading">
          Recent Bookings
        </div>

        <q-btn
          flat
          color="primary"
          label="View All"
          icon-right="arrow_forward"
          @click="goToBookings"
        />
      </div>


      <q-card class="booking-card q-mt-sm">

        <q-list separator>

          <q-item
            v-for="booking in recentBookings"
            :key="booking.id"
            class="booking-item"
          >

            <!-- VEHICLE ICON -->
            <q-item-section avatar>
              <q-avatar
                size="50px"
                color="primary"
                text-color="white"
              >
                <q-icon name="directions_car" />
              </q-avatar>
            </q-item-section>


            <!-- BOOKING DETAILS -->
            <q-item-section>

              <q-item-label class="booking-title">
                {{ booking.vehicle }}
              </q-item-label>

              <q-item-label caption>
                {{ booking.from }} → {{ booking.to }}
              </q-item-label>

              <q-item-label caption>
                {{ booking.date }}
              </q-item-label>

            </q-item-section>


            <!-- STATUS -->
            <q-item-section side>

              <q-badge
                :color="booking.statusColor"
                :label="booking.status"
                rounded
              />

              <div class="booking-price q-mt-xs">
                ₹{{ booking.amount }}
              </div>

            </q-item-section>

          </q-item>


          <!-- EMPTY -->
          <q-item v-if="recentBookings.length === 0">
            <q-item-section class="text-center q-pa-lg">

              <q-icon
                name="event_busy"
                size="45px"
                color="grey"
              />

              <div class="text-grey q-mt-sm">
                No bookings found.
              </div>

            </q-item-section>
          </q-item>

        </q-list>

      </q-card>

    </div>


    <!-- =====================================================
         PROMOTIONAL CARD
    ====================================================== -->
    <q-card class="promo-card q-mt-xl">

      <q-card-section class="row items-center">

        <div class="col">

          <div class="promo-title">
            Travel together, travel better 🚗
          </div>

          <div class="promo-text">
            Find comfortable and affordable vehicles for your next journey
            with BatohiDrive.
          </div>

          <q-btn
            unelevated
            rounded
            color="white"
            text-color="primary"
            label="Find a Ride"
            icon="directions_car"
            class="q-mt-md"
            @click="goToSearch"
          />

        </div>

        <div class="col-auto gt-sm">
          <q-icon
            name="directions_car"
            size="110px"
          />
        </div>

      </q-card-section>

    </q-card>

  </q-page>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'

const router = useRouter()
import { useAuth } from "../../composables/useAuth";

const { profile, loading } = useAuth();
// =====================================================
// USER
// =====================================================

const userName = ref('Customer')


console.log(profile);

// =====================================================
// SEARCH FORM
// =====================================================

const searchForm = ref({
  from: '',
  to: '',
  date: '',
  passengers: 1
})


// =====================================================
// STATISTICS
// =====================================================

const statistics = ref({
  totalBookings: 12,
  upcomingTrips: 2,
  completedTrips: 10,
  savedVehicles: 4
})


// =====================================================
// RECENT BOOKINGS
// =====================================================

const recentBookings = ref([
  {
    id: 1,
    vehicle: 'Toyota Innova Crysta',
    from: 'Patna',
    to: 'Gaya',
    date: '21 Aug 2026',
    amount: '2,500',
    status: 'Confirmed',
    statusColor: 'positive'
  },
  {
    id: 2,
    vehicle: 'Mahindra Scorpio',
    from: 'Patna',
    to: 'Nalanda',
    date: '18 Aug 2026',
    amount: '1,800',
    status: 'Completed',
    statusColor: 'primary'
  },
  {
    id: 3,
    vehicle: 'Maruti Ertiga',
    from: 'Gaya',
    to: 'Patna',
    date: '12 Aug 2026',
    amount: '2,000',
    status: 'Completed',
    statusColor: 'primary'
  }
])


// =====================================================
// SEARCH RIDE
// =====================================================

const searchRide = () => {

  if (!searchForm.value.from || !searchForm.value.to) {
    Notify.create({
      type: 'warning',
      message: 'Please enter pickup and drop location.'
    })

    return
  }

  router.push({
    path: '/customer/search-vehicle',
    query: {
      from: searchForm.value.from,
      to: searchForm.value.to,
      date: searchForm.value.date,
      passengers: searchForm.value.passengers
    }
  })
}


// =====================================================
// NAVIGATION
// =====================================================

const goToSearch = () => {
  router.push('/customer/vehicle-type')
}


const goToBookings = () => {
  router.push('/customer/my-bookings')
}


const goToProfile = () => {
  router.push('/customer/profile')
}


const goToPayments = () => {
  router.push('/customer/payments')
}
</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.dashboard-page {
  background: #f5f7fb;
  padding: 28px;
}


/* =====================================================
   WELCOME
===================================================== */

.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.welcome-title {
  font-size: 28px;
  font-weight: 700;
  color: #172033;
}

.welcome-subtitle {
  margin-top: 5px;
  color: #6b7280;
  font-size: 15px;
}


/* =====================================================
   SEARCH CARD
===================================================== */

.search-card {
  border-radius: 16px;
  background: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #172033;
}

.section-subtitle {
  margin-top: 5px;
  color: #7b8494;
  font-size: 14px;
}

.search-btn {
  height: 52px;
}


/* =====================================================
   STATISTICS
===================================================== */

.stat-card {
  border-radius: 15px;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.stat-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
}

.bg-blue {
  background: #1976d2;
}

.bg-green {
  background: #21ba45;
}

.bg-orange {
  background: #f2a900;
}

.bg-purple {
  background: #7e57c2;
}

.stat-label {
  color: #7b8494;
  font-size: 13px;
}

.stat-value {
  margin-top: 3px;
  font-size: 25px;
  font-weight: 700;
  color: #172033;
}


/* =====================================================
   SECTION HEADING
===================================================== */

.section-heading {
  font-size: 21px;
  font-weight: 700;
  color: #172033;
}


/* =====================================================
   QUICK ACTION
===================================================== */

.action-card {
  border-radius: 15px;
  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.action-title {
  margin-top: 12px;
  font-weight: 700;
  font-size: 16px;
  color: #172033;
}

.action-description {
  margin-top: 5px;
  color: #7b8494;
  font-size: 13px;
}


/* =====================================================
   BOOKINGS
===================================================== */

.booking-card {
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.booking-item {
  padding: 16px;
}

.booking-title {
  font-weight: 700;
  font-size: 16px;
}

.booking-price {
  font-weight: 700;
  color: #172033;
}


/* =====================================================
   PROMO
===================================================== */

.promo-card {
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    #1976d2,
    #1258a4
  );

  color: white;
  overflow: hidden;
}

.promo-title {
  font-size: 24px;
  font-weight: 700;
}

.promo-text {
  margin-top: 8px;
  max-width: 600px;
  opacity: 0.9;
  line-height: 1.6;
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 768px) {

  .dashboard-page {
    padding: 16px;
  }

  .welcome-section {
    align-items: flex-start;
    gap: 15px;
    flex-direction: column;
  }

  .welcome-title {
    font-size: 23px;
  }

  .welcome-section .q-btn {
    width: 100%;
  }

  .promo-title {
    font-size: 20px;
  }

}
</style>
```
