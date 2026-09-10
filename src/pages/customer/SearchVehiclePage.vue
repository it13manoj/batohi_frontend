```vue
<template>
  <q-page class="search-page">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header">

      <div>
        <div class="page-title">
          Search Vehicle
        </div>

        <div class="page-subtitle">
          Find the perfect vehicle for your journey.
        </div>
      </div>

      <q-btn
        flat
        color="primary"
        icon="arrow_back"
        label="Dashboard"
        @click="goDashboard"
      />

    </div>


    <!-- =====================================================
         SEARCH FORM
    ====================================================== -->
    <q-card class="search-card">

      <q-card-section>

        <div class="search-title">
          <q-icon
            name="search"
            color="primary"
            size="28px"
          />

          <span>
            Search for a Ride
          </span>
        </div>

        <div class="search-subtitle">
          Enter your travel details to find available vehicles.
        </div>

      </q-card-section>

      <q-separator />

      <q-card-section>

        <div class="row q-col-gutter-md">

          <!-- FROM -->
          <div class="col-12 col-md-3">

            <q-input
              v-model="searchForm.from"
              outlined
              label="From"
              placeholder="Pickup location"
              clearable
            >

              <template #prepend>
                <q-icon
                  name="location_on"
                  color="primary"
                />
              </template>

            </q-input>

          </div>


          <!-- TO -->
          <div class="col-12 col-md-3">

            <q-input
              v-model="searchForm.to"
              outlined
              label="To"
              placeholder="Drop location"
              clearable
            >

              <template #prepend>
                <q-icon
                  name="location_on"
                  color="negative"
                />
              </template>

            </q-input>

          </div>



          <!-- PASSENGERS -->
          <div class="col-12 col-md-2">

            <q-select
              v-model="searchForm.passengers"
              outlined
              label="Passengers"
              :options="passengerOptions"
            >

              <template #prepend>
                <q-icon
                  name="people"
                  color="primary"
                />
              </template>

            </q-select>

          </div>


          <!-- SEARCH -->
          <div class="col-12 col-md-2 flex flex-center">

            <q-btn
              unelevated
              rounded
              color="primary"
              icon="search"
              label="Search"
              class="full-width search-btn"
              @click="searchVehicles"
            />

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         CONTENT
    ====================================================== -->
    <div class="row q-col-gutter-lg q-mt-lg">


      <!-- ===================================================
           FILTER SIDEBAR
      ==================================================== -->
 <div
  v-if="vehicleType.toLowerCase() === 'car'"
  class="col-12 col-md-3"
>

  <q-card class="filter-card">

    <q-card-section>

      <div class="filter-title">

        <q-icon
          name="filter_alt"
          color="primary"
          size="24px"
        />

        <span>
          Filters
        </span>

      </div>

    </q-card-section>

    <q-separator />

    <!-- VEHICLE TYPE -->
    <q-card-section>

      <div class="filter-label">
        Vehicle Type
      </div>

      <q-option-group
        v-model="filters.vehicleType"
        :options="vehicleTypes"
        type="radio"
        color="primary"
      />

    </q-card-section>

    <q-separator />

    <!-- AC / DRIVER -->
    <q-card-section>

      <div class="filter-label">
        Features
      </div>

      <q-checkbox
        v-model="filters.ac"
        label="AC"
        color="primary"
      />

      <q-checkbox
        v-model="filters.driver"
        label="With Driver"
        color="primary"
      />

    </q-card-section>

    <q-separator />

    <!-- PRICE -->
    <q-card-section>

      <div class="filter-label">
        Maximum Price
      </div>

      <div class="price-value">
        ₹{{ filters.maxPrice }}
      </div>

      <q-slider
        v-model="filters.maxPrice"
        :min="500"
        :max="10000"
        :step="500"
        label
        color="primary"
      />

    </q-card-section>

    <!-- CLEAR -->
    <q-card-section>

      <q-btn
        outline
        rounded
        color="primary"
        icon="restart_alt"
        label="Clear Filters"
        class="full-width"
        @click="clearFilters"
      />

    </q-card-section>

  </q-card>

</div>
      <!-- ===================================================
           VEHICLE RESULTS
      ==================================================== -->
      <div class="col-12 col-md-9">

        <!-- RESULT HEADER -->
        <div class="result-header">

          <div>

            <div class="result-title">
              Available Vehicles
            </div>

            <div class="result-subtitle">
              {{ filteredVehicles.length }} vehicles found
            </div>

          </div>


          <!-- SORT -->
          <q-select
            v-model="sortBy"
            outlined
            dense
            label="Sort By"
            :options="sortOptions"
            style="min-width: 180px"
          />

        </div>


        <!-- VEHICLE LIST -->
        <div class="q-mt-md">

          <div
            v-for="vehicle in filteredVehicles"
            :key="vehicle.id"
            class="q-mb-md"
          >

            <q-card class="vehicle-card">

              <div class="row">


                <!-- VEHICLE IMAGE -->
                <div class="col-12 col-md-4">

                  <div class="vehicle-image">

                    <q-icon
                      name="directions_car"
                      size="80px"
                      color="primary"
                    />

                  </div>

                </div>


                <!-- VEHICLE DETAILS -->
                <div class="col-12 col-md-8">

                  <q-card-section>

                    <div class="row items-start justify-between">

                      <div>

                        <div class="vehicle-name">
                          {{ vehicle.name }}
                        </div>

                        <div class="vehicle-type">
                          {{ vehicle.type }}
                        </div>

                      </div>


                      <q-badge
                        color="positive"
                        label="Available"
                        rounded
                      />

                    </div>


                    <!-- FEATURES -->
                    <div class="vehicle-features q-mt-md">

                      <div>
                        <q-icon name="people" />
                        {{ vehicle.seats }} Seats
                      </div>

                      <div>
                        <q-icon name="ac_unit" />
                        {{ vehicle.ac ? 'AC' : 'Non-AC' }}
                      </div>

                      <div>
                        <q-icon name="person" />
                        {{ vehicle.driver ? 'Driver' : 'Self Drive' }}
                      </div>

                    </div>


                    <q-separator class="q-my-md" />


                    <!-- PRICE + BUTTON -->
                    <div class="row items-center justify-between">

                      <div>

                        <div class="price">
                          ₹{{ vehicle.price }}
                        </div>

                        <div class="price-label">
                          per trip
                        </div>

                      </div>


                      <q-btn
                        unelevated
                        rounded
                        color="primary"
                        label="View Details"
                        icon-right="arrow_forward"
                        @click="viewDetails(vehicle)"
                      />

                    </div>

                  </q-card-section>

                </div>

              </div>

            </q-card>

          </div>


          <!-- EMPTY STATE -->
          <q-card
            v-if="filteredVehicles.length === 0"
            class="empty-card"
          >

            <q-card-section class="text-center">

              <q-icon
                name="directions_car_filled"
                size="70px"
                color="grey-5"
              />

              <div class="empty-title">
                No vehicles found
              </div>

              <div class="empty-text">
                Try changing your search or filters.
              </div>

              <q-btn
                outline
                rounded
                color="primary"
                label="Clear Filters"
                class="q-mt-md"
                @click="clearFilters"
              />

            </q-card-section>

          </q-card>

        </div>

      </div>

    </div>

  </q-page>
</template>


<script setup>

import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notify } from 'quasar'


// =====================================================
// ROUTER
// =====================================================

const router = useRouter()
const route = useRoute()
const vehicleType = route.query.vehicleType || ''



// =====================================================
// SEARCH FORM
// =====================================================

const searchForm = ref({
  from: route.query.from || '',
  to: route.query.to || '',
  date: route.query.date || '',
  passengers: Number(route.query.passengers) || 1
})


// =====================================================
// PASSENGERS
// =====================================================

const passengerOptions = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
]


// =====================================================
// FILTERS
// =====================================================

const filters = ref({
  vehicleType: 'All',
  ac: false,
  driver: false,
  maxPrice: 10000
})


const vehicleTypes = [
  {
    label: 'All Vehicles',
    value: 'All'
  },
  {
    label: 'Sedan',
    value: 'Sedan'
  },
  {
    label: 'SUV',
    value: 'SUV'
  },
  {
    label: 'Hatchback',
    value: 'Hatchback'
  },
  {
    label: 'MPV',
    value: 'MPV'
  }
]


// =====================================================
// SORT
// =====================================================

const sortBy = ref('Price: Low to High')

const sortOptions = [
  'Price: Low to High',
  'Price: High to Low',
  'Most Seats'
]


// =====================================================
// VEHICLES
// =====================================================

const vehicles = ref([
  {
    id: 1,
    name: 'Toyota Innova Crysta',
    type: 'MPV',
    seats: 7,
    ac: true,
    driver: true,
    price: 2500
  },
  {
    id: 2,
    name: 'Mahindra Scorpio',
    type: 'SUV',
    seats: 7,
    ac: true,
    driver: true,
    price: 2800
  },
  {
    id: 3,
    name: 'Maruti Ertiga',
    type: 'MPV',
    seats: 6,
    ac: true,
    driver: true,
    price: 2000
  },
  {
    id: 4,
    name: 'Hyundai Aura',
    type: 'Sedan',
    seats: 4,
    ac: true,
    driver: false,
    price: 1500
  },
  {
    id: 5,
    name: 'Maruti Swift',
    type: 'Hatchback',
    seats: 4,
    ac: true,
    driver: false,
    price: 1200
  }
])


// =====================================================
// FILTERED VEHICLES
// =====================================================

const filteredVehicles = computed(() => {

  let result = vehicles.value.filter(vehicle => {

    // Vehicle type
    if (
      filters.value.vehicleType !== 'All' &&
      vehicle.type !== filters.value.vehicleType
    ) {
      return false
    }


    // AC
    if (
      filters.value.ac &&
      !vehicle.ac
    ) {
      return false
    }


    // Driver
    if (
      filters.value.driver &&
      !vehicle.driver
    ) {
      return false
    }


    // Price
    if (
      vehicle.price > filters.value.maxPrice
    ) {
      return false
    }


    // Passenger count
    if (
      vehicle.seats < searchForm.value.passengers
    ) {
      return false
    }


    return true

  })


  // SORT
  if (sortBy.value === 'Price: Low to High') {

    result.sort((a, b) => a.price - b.price)

  }

  else if (sortBy.value === 'Price: High to Low') {

    result.sort((a, b) => b.price - a.price)

  }

  else if (sortBy.value === 'Most Seats') {

    result.sort((a, b) => b.seats - a.seats)

  }


  return result
})


// =====================================================
// SEARCH
// =====================================================

const searchVehicles = () => {

  if (!searchForm.value.from) {

    Notify.create({
      type: 'warning',
      message: 'Please enter pickup location.'
    })

    return
  }


  if (!searchForm.value.to) {

    Notify.create({
      type: 'warning',
      message: 'Please enter drop location.'
    })

    return
  }


  Notify.create({
    type: 'positive',
    message: 'Vehicles updated successfully.'
  })

}


// =====================================================
// CLEAR FILTERS
// =====================================================

const clearFilters = () => {

  filters.value = {
    vehicleType: 'All',
    ac: false,
    driver: false,
    maxPrice: 10000
  }

}


// =====================================================
// VEHICLE DETAILS
// =====================================================

const viewDetails = (vehicle) => {

  router.push({
    path: '/customer/vehicle-details',
    query: {
      id: vehicle.id
    }
  })

}


// =====================================================
// DASHBOARD
// =====================================================

const goDashboard = () => {

  router.push('/customer/dashboard')

}

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.search-page {
  background: #f5f7fb;
  padding: 28px;
  min-height: 100%;
}


/* =====================================================
   PAGE HEADER
===================================================== */

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #172033;
}

.page-subtitle {
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

.search-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #172033;
}

.search-subtitle {
  margin-top: 5px;
  color: #7b8494;
  font-size: 14px;
}

.search-btn {
  height: 52px;
}


/* =====================================================
   FILTER
===================================================== */

.filter-card {
  border-radius: 16px;
  background: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.filter-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 19px;
  font-weight: 700;
  color: #172033;
}

.filter-label {
  font-size: 15px;
  font-weight: 700;
  color: #172033;
  margin-bottom: 10px;
}

.price-value {
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 5px;
}


/* =====================================================
   RESULTS
===================================================== */

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.result-title {
  font-size: 21px;
  font-weight: 700;
  color: #172033;
}

.result-subtitle {
  margin-top: 4px;
  color: #7b8494;
  font-size: 13px;
}


/* =====================================================
   VEHICLE CARD
===================================================== */

.vehicle-card {
  border-radius: 16px;
  background: white;
  overflow: hidden;

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.vehicle-card:hover {
  transform: translateY(-3px);

  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.08);
}


/* =====================================================
   VEHICLE IMAGE
===================================================== */

.vehicle-image {
  height: 100%;
  min-height: 210px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #eef4fb;
}


/* =====================================================
   VEHICLE DETAILS
===================================================== */

.vehicle-name {
  font-size: 20px;
  font-weight: 700;
  color: #172033;
}

.vehicle-type {
  margin-top: 4px;
  color: #7b8494;
  font-size: 14px;
}

.vehicle-features {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  color: #555f70;
  font-size: 14px;
}

.vehicle-features div {
  display: flex;
  align-items: center;
  gap: 5px;
}


/* =====================================================
   PRICE
===================================================== */

.price {
  font-size: 23px;
  font-weight: 700;
  color: #1976d2;
}

.price-label {
  font-size: 12px;
  color: #7b8494;
}


/* =====================================================
   EMPTY
===================================================== */

.empty-card {
  border-radius: 16px;
  padding: 30px;
}

.empty-title {
  margin-top: 12px;
  font-size: 20px;
  font-weight: 700;
  color: #172033;
}

.empty-text {
  margin-top: 5px;
  color: #7b8494;
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 768px) {

  .search-page {
    padding: 16px;
  }

  .page-header {
    align-items: flex-start;
    gap: 10px;
  }

  .page-title {
    font-size: 23px;
  }

  .result-header {
    align-items: flex-start;
    gap: 12px;
    flex-direction: column;
  }

  .vehicle-image {
    min-height: 160px;
  }

  .vehicle-features {
    gap: 10px;
  }

}

</style>
```
