```vue
<template>
  <q-page class="search-page">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header">

      <div>
        <div class="page-title">
          Vehicle Type
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

    <div class="row q-col-gutter-lg q-mt-lg ">
        <div class="col-md-4">
          <q-card
            class="action-card vehicleType"
            clickable
            @click="goToSearch('bike')"
          >
            <q-card-section class="text-center">
              <img src="../../assets/images/bike.png" alt="Bike" width="100"  style="width: 100%;"/>
            </q-card-section>
          </q-card>
        </div>

         <div class="col-md-4">
          <q-card
            class="action-card vehicleType"
            clickable
            @click="goToSearch('car')"
          >
            <q-card-section class="text-center">
               <img src="../../assets/images/car.png" alt="Bike" width="100"  style="width: 100%;"/>
            </q-card-section>
          </q-card>
        </div>
         <div class="col-md-4">
          <q-card
            class="action-card vehicleType"
            clickable
            @click="goToSearch('auto')"
          >
            <q-card-section class="text-center">
               <img src="../../assets/images/auto.png" alt="Bike" width="100"  style="width: 100%;"/>
            </q-card-section>
          </q-card>
        </div>

    </div>

  </q-page>
</template>


<script setup>

import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notify } from 'quasar'

const goToSearch = (vehicleType) => {

  router.push({
    path: '/customer/search-vehicle',
    query: {
      vehicleType: vehicleType
    }
  })

}
// =====================================================
// ROUTER
// =====================================================

const router = useRouter()
const route = useRoute()


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

.vehicleType{
  height:90%
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
