<template>
  <div class="q-pa-md">
    <!-- SEARCH CARD -->
    <q-card class="search-card q-mb-lg">
      <q-card-section>
        <div class="search-title text-h6 text-weight-bold flex items-center gap-sm">
          <q-icon name="search" color="primary" size="28px" />
          <span>Search for a Ride</span>
        </div>
        <div class="search-subtitle text-caption text-grey-7">
          Enter your travel details to find available vehicles.
        </div>
      </q-card-section>

      <q-separator />

    <q-card-section>
  <div class="search-form-grid row q-col-gutter-md">
    <!-- FROM LOCATION -->
    <div :class="isBike ? 'col-12 col-md-4' : 'col-12 col-md-3'">
      <q-select
        v-model="searchForm.from"
        use-input
        fill-input
        hide-selected
        outlined
        label="From"
        placeholder="Search pickup location"
        :options="fromOptions"
        :loading="loadingFrom"
        @filter="filterFromLocations"
        @update:model-value="onSelectFrom"
        clearable
      >
        <template #prepend>
          <q-icon name="location_on" color="primary" />
        </template>
        <template #append>
          <q-btn
            flat
            round
            dense
            icon="my_location"
            color="primary"
            :loading="detectingLocation"
            @click.stop="detectAndSetCurrentLocation"
          >
            <q-tooltip>Use Current Location</q-tooltip>
          </q-btn>
        </template>
        <template #no-option>
          <q-item>
            <q-item-section class="text-grey">
              Type at least 3 characters to search...
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <!-- TO LOCATION -->
    <div :class="isBike ? 'col-12 col-md-4' : 'col-12 col-md-3'">
      <q-select
        v-model="searchForm.to"
        use-input
        fill-input
        hide-selected
        outlined
        label="To"
        placeholder="Search drop location"
        :options="toOptions"
        :loading="loadingTo"
        @filter="filterToLocations"
        @update:model-value="onSelectTo"
        clearable
      >
        <template #prepend>
          <q-icon name="location_on" color="negative" />
        </template>
        <template #no-option>
          <q-item>
            <q-item-section class="text-grey">
              Type at least 3 characters to search...
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <!-- PASSENGERS (HIDDEN FOR BIKE) -->
    <div v-if="!isBike" class="col-12 col-md-2">
      <q-select
        v-model="searchForm.passengers"
        outlined
        label="Passengers"
        :options="passengerOptions"
      >
        <template #prepend>
          <q-icon name="people" color="primary" />
        </template>
      </q-select>
    </div>

    <!-- FARE / PRICE INPUT -->
    <div :class="isBike ? 'col-12 col-md-2' : 'col-12 col-md-2'">
      <q-input
        v-model.number="searchForm.fare"
        type="number"
        outlined
        label="Fare"
        placeholder="Offer price"
        min="0"
      >
        <template #prepend>
          <q-icon name="payments" color="primary" />
        </template>
      </q-input>
    </div>

    <!-- SEARCH BUTTON -->
    <div class="col-12 col-md-2 flex flex-center">
      <q-btn
        unelevated
        rounded
        color="primary"
        icon="search"
        label="Search"
        :loading="searching"
        class="full-width search-btn"
        @click="searchVehicles"
      />
    </div>
  </div>
</q-card-section>



    </q-card>

    <!-- DRIVER/VEHICLE RESULTS LIST -->
    <div v-if="hasSearched" class="results-section">
      <div class="text-h6 text-weight-bold q-mb-md">
        Available Rides ({{ filteredDrivers.length }})
      </div>

      <!-- LOADING STATE -->
      <div v-if="searching" class="text-center q-pa-xl">
        <q-spinner-dots color="primary" size="40px" />
        <div class="text-grey q-mt-sm">Searching for nearby rides...</div>
      </div>

      <!-- NO RESULTS FOUND -->
      <q-card v-else-if="filteredDrivers.length === 0" class="text-center q-pa-xl">
        <q-icon name="directions_car_off" size="48px" color="grey-5" />
        <div class="text-h6 text-grey-7 q-mt-sm">No drivers available nearby</div>
        <div class="text-caption text-grey-6">Try searching in another area or modifying your search details.</div>
      </q-card>

      <!-- RESULTS LIST -->
      <div v-else class="column gap-md">
        <q-card
          v-for="driver in filteredDrivers"
          :key="driver.id"
          class="driver-card flat bordered"
        >
          <q-card-section>
            <div class="driver-grid row items-center justify-between q-col-gutter-md">

              <!-- DRIVER INFO & AVATAR -->
              <div class="col-12 col-sm-4 flex items-center driver-info-block">
                <q-avatar size="56px" class="q-mr-md bg-grey-3">
                  <img
                    v-if="driver.profile_image"
                    :src="getMediaUrl(driver.profile_image)"
                    alt="Driver Photo"
                  />
                  <q-icon v-else name="person" color="grey-7" size="32px" />
                </q-avatar>

                <div>
                  <div class="text-subtitle1 text-weight-bold">
                    {{ driver.first_name }} {{ driver.last_name }}
                  </div>
                  <div class="text-caption text-grey-7 flex items-center">
                    <q-icon name="directions_car" size="16px" class="q-mr-xs" />
                    {{ driver.vehicle?.vehicle_name || 'Vehicle' }} ({{ driver.vehicle?.registration_no || 'N/A' }})
                  </div>
                  <div class="text-caption text-grey-7 flex items-center q-mt-xs">
                    <q-icon name="star" color="warning" size="16px" class="q-mr-xs" />
                    <span>{{ driver.rating || '0.0' }}</span>
                    <span class="q-ml-xs text-grey-6">({{ driver.total_rides || 0 }} rides)</span>
                  </div>
                </div>
              </div>

              <!-- ROUTE & ARRIVAL TIME DETAILS -->
              <div class="col-12 col-sm-5">
                <div class="row items-center q-gutter-x-sm">
                  <q-chip density="compact" color="blue-1" text-color="primary" icon="near_me">
                    {{ formatDistance(driver.distance_km) }} away
                  </q-chip>
                  <q-chip density="compact" color="orange-1" text-color="orange-9" icon="schedule">
                    ETA: {{ calculateDriverEta(driver.distance_km) }}
                  </q-chip>
                </div>

                <div class="q-mt-xs text-body2 text-grey-8">
                  <div class="ellipsis">
                    <q-icon name="fiber_manual_record" color="primary" size="12px" class="q-mr-xs" />
                    <strong>From:</strong> {{ searchForm.from || 'Pickup Address' }}
                  </div>
                  <div class="ellipsis">
                    <q-icon name="location_on" color="negative" size="12px" class="q-mr-xs" />
                    <strong>To:</strong> {{ searchForm.to || 'Drop Address' }}
                  </div>
                </div>
              </div>

              <!-- FARE & BOOK ACTION -->
              <div class="col-12 col-sm-3 text-right flex column items-end justify-center">
                <div class="text-caption text-grey-6">Estimated Fare</div>
                <div class="text-h5 text-weight-bolder text-primary">
                  ₹{{ calculateFare(driver) }}
                </div>
                <q-btn
                  unelevated
                  color="primary"
                  label="Book Ride"
                  class="q-mt-sm full-width"
                  :disable="bookingInProgress"
                  :loading="bookingInProgress && bookingDriverId === driver.id"
                  @click="bookRide(driver)"
                />
              </div>

            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notify } from 'quasar'
import api, { imagesBaseUrl } from '@/config/api'

// ROUTER & NAVIGATION
const router = useRouter()
const route = useRoute()

const vehicleType = computed(() => {
  return (route.query.vehicleType || '').toString().toLowerCase()
})

const isBike = computed(() => {
  return vehicleType.value === 'bike'
})

// STATE MANAGEMENT
const searching = ref(false)
const hasSearched = ref(false)
const loadingFrom = ref(false)
const loadingTo = ref(false)
const detectingLocation = ref(false)
const bookingInProgress = ref(false)
const bookingDriverId = ref(null)

const fromOptions = ref([])
const toOptions = ref([])
const rawDrivers = ref([])

const searchForm = ref({
  from: route.query.from || null,
  to: route.query.to || null,
  passengers: Number(route.query.passengers) || 1,
  fare: Number(route.query.fare) || null,

  fromLat: route.query.fromLat ? Number(route.query.fromLat) : null,
  fromLng: route.query.fromLng ? Number(route.query.fromLng) : null,
  toLat: route.query.toLat ? Number(route.query.toLat) : null,
  toLng: route.query.toLng ? Number(route.query.toLng) : null
})

const passengerOptions = [1, 2, 3, 4, 5, 6, 7, 8]
let debounceTimer = null

const filteredDrivers = computed(() => {
  const maxFare = Number(searchForm.value.fare)

  if (!maxFare || maxFare <= 0) {
    return rawDrivers.value
  }

  return rawDrivers.value.filter((driver) => {
    const fare = Number(calculateFare(driver))
    return Number.isFinite(fare) && fare <= maxFare
  })
})

// MEDIA BASE URL HELPER
const getMediaUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path

  return `${imagesBaseUrl}${path.startsWith('/') ? '' : '/'}${path}`
}

// FORMAT DISTANCE
const formatDistance = (dist) => {
  if (dist === undefined || dist === null) return 'N/A'
  const km = Number(dist)
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(2)} km`
}

// CALCULATE DRIVER ARRIVAL TIME TO PICKUP (ETA)
const calculateDriverEta = (distanceKm) => {
  if (!distanceKm && distanceKm !== 0) return 'N/A'
  const avgSpeedKmPerMin = 25 / 60
  const minutes = Math.ceil(distanceKm / avgSpeedKmPerMin)
  return minutes <= 1 ? '1 min away' : `${minutes} mins away`
}

// CALCULATE FARE BASED ON VEHICLE TYPE AND DISTANCE
const calculateFare = (driver) => {
  // Use backend computed trip details if available, otherwise calculate locally
  if (driver.trip_details?.estimated_fare) {
    return driver.trip_details.estimated_fare
  }
  const baseFare = isBike.value ? Number(driver.vehicle?.vehicleType?.base_fare || 20) : 50
  const ratePerKm = isBike.value ? 8 : 15
  const dist = driver.distance_km || 0
  const totalFare = baseFare + dist * ratePerKm
  return Math.round(totalFare)
}

// GEOCODING / AUTOCOMPLETE
const fetchAddressSuggestions = async (query) => {
  if (!query || query.length < 3) return []

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=in`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await response.json()

    return data.map((item) => ({
      label: item.display_name,
      value: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon)
    }))
  } catch (error) {
    console.error('Geocoding search failed:', error)
    return []
  }
}

const reverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await response.json()
    return data.display_name || null
  } catch (error) {
    console.error('Reverse geocoding failed:', error)
    return null
  }
}

const filterFromLocations = (val, update) => {
  if (val.length < 3) {
    update(() => { fromOptions.value = [] })
    return
  }

  loadingFrom.value = true
  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(async () => {
    const results = await fetchAddressSuggestions(val)
    update(() => {
      fromOptions.value = results
      loadingFrom.value = false
    })
  }, 400)
}

const filterToLocations = (val, update) => {
  if (val.length < 3) {
    update(() => { toOptions.value = [] })
    return
  }

  loadingTo.value = true
  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(async () => {
    const results = await fetchAddressSuggestions(val)
    update(() => {
      toOptions.value = results
      loadingTo.value = false
    })
  }, 400)
}

const onSelectFrom = (selected) => {
  if (typeof selected === 'object' && selected !== null) {
    searchForm.value.from = selected.label
    searchForm.value.fromLat = selected.lat
    searchForm.value.fromLng = selected.lng
  } else if (typeof selected === 'string') {
    searchForm.value.from = selected
    searchForm.value.fromLat = null
    searchForm.value.fromLng = null
  }
}

const onSelectTo = (selected) => {
  if (typeof selected === 'object' && selected !== null) {
    searchForm.value.to = selected.label
    searchForm.value.toLat = selected.lat
    searchForm.value.toLng = selected.lng
  } else if (typeof selected === 'string') {
    searchForm.value.to = selected
    searchForm.value.toLat = null
    searchForm.value.toLng = null
  }
}

// GEOLOCATION
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  })
}

const detectAndSetCurrentLocation = async () => {
  try {
    detectingLocation.value = true
    const coords = await getCurrentLocation()

    searchForm.value.fromLat = coords.latitude
    searchForm.value.fromLng = coords.longitude

    const address = await reverseGeocode(coords.latitude, coords.longitude)
    searchForm.value.from = address || `Location (${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)})`

    // Only search automatically if drop location is also available
    if (searchForm.value.toLat && searchForm.value.toLng) {
      await fetchNearestVehicles()
    }

    Notify.create({
      type: 'positive',
      message: 'Current location detected.'
    })
  } catch (error) {
    console.error('Error detecting location:', error)
    Notify.create({
      type: 'warning',
      message: 'Could not fetch location. Please enter manually.'
    })
  } finally {
    detectingLocation.value = false
  }
}

// FETCH DRIVERS (Passes Pickup & Drop points to Backend)
const fetchNearestVehicles = async () => {
  try {
    searching.value = true
    hasSearched.value = true

    const params = {
      fromLat: searchForm.value.fromLat,
      fromLng: searchForm.value.fromLng,
      toLat: searchForm.value.toLat || undefined,
      toLng: searchForm.value.toLng || undefined,
      passengers: searchForm.value.passengers,
      vehicleType: vehicleType.value || undefined,
      fare: searchForm.value.fare || undefined,
      radius: 15
    }

    const response = await api.get('/users/nearest', { params })

    const data = response.data?.data || response.data || []
    rawDrivers.value = Array.isArray(data) ? data : [data]

  } catch (error) {
    console.error('Error finding drivers:', error)
    Notify.create({
      type: 'negative',
      message: 'Failed to retrieve nearby drivers.'
    })
  } finally {
    searching.value = false
  }
}

// SEARCH VEHICLES (Ensures both Pickup and Drop coordinates are resolved first)
const searchVehicles = async () => {
  if (!searchForm.value.from || !searchForm.value.to) {
    Notify.create({
      type: 'warning',
      message: 'Please provide both From and To locations.'
    })
    return
  }

  try {
    searching.value = true

    // 1. Resolve Pickup ('From') coordinates if missing
    if (!searchForm.value.fromLat || !searchForm.value.fromLng) {
      const queryStr = typeof searchForm.value.from === 'string'
        ? searchForm.value.from
        : searchForm.value.from?.label

      const fromSuggestions = await fetchAddressSuggestions(queryStr)
      if (fromSuggestions.length > 0) {
        searchForm.value.fromLat = fromSuggestions[0].lat
        searchForm.value.fromLng = fromSuggestions[0].lng
      } else {
        Notify.create({
          type: 'negative',
          message: 'Could not resolve pickup address coordinates.'
        })
        return
      }
    }

    // 2. Resolve Drop ('To') coordinates if missing
    if (!searchForm.value.toLat || !searchForm.value.toLng) {
      const queryStr = typeof searchForm.value.to === 'string'
        ? searchForm.value.to
        : searchForm.value.to?.label

      const toSuggestions = await fetchAddressSuggestions(queryStr)
      if (toSuggestions.length > 0) {
        searchForm.value.toLat = toSuggestions[0].lat
        searchForm.value.toLng = toSuggestions[0].lng
      } else {
        Notify.create({
          type: 'negative',
          message: 'Could not resolve drop address coordinates.'
        })
        return
      }
    }

    // 3. Execute request with all parameters attached
    await fetchNearestVehicles()

  } finally {
    searching.value = false
  }
}

const bookRide = async (driver) => {
  // 1. Resolve location strings
  const fromText = typeof searchForm.value.from === 'object' ? searchForm.value.from?.label : searchForm.value.from
  const toText = typeof searchForm.value.to === 'object' ? searchForm.value.to?.label : searchForm.value.to

  if (!fromText || !toText) {
    Notify.create({
      type: 'warning',
      message: 'Both pickup and drop locations are required.'
    })
    return
  }

  const hasActiveBooking = await checkForActiveBooking()
  if (hasActiveBooking) return

  // 2. Format distance & fare
  const fareAmount = calculateFare(driver)
  const distanceVal = driver.trip_details?.distance_km
    ? `${driver.trip_details.distance_km.toFixed(2)} km`
    : formatDistance(driver.distance_km)

  // 3. Match payload keys to your new Booked model schema
  const payload = {
    from: fromText,
    to: toText,
    latitude_from: searchForm.value.fromLat,
    longitude_from: searchForm.value.fromLng,
    latitude_to: searchForm.value.toLat,
    longitude_to: searchForm.value.toLng,
    fare: fareAmount,
    distance: distanceVal,
    passengers: searchForm.value.passengers
  }

  try {
    bookingInProgress.value = true
    bookingDriverId.value = driver.id

    // 4. Send request to backend driver endpoint
    const response = await api.post(`/driver/${driver.id}/find-ride`, payload)

    console.log(response)

    if (response.data?.success || response.status === 200) {
      Notify.create({
        type: 'positive',
        message: `Booking request sent to ${driver.first_name} ${driver.last_name || ''}!`
      })

      router.push({
        name: 'ride-tracking',
        params: { bookingId: response.data.data.id }
      })
    }
  } catch (error) {
    console.error('Error sending ride request:', error)
    Notify.create({
      type: 'negative',
      message: error.response?.data?.message || 'Failed to send ride request.'
    })
  } finally {
    bookingInProgress.value = false
    bookingDriverId.value = null
  }
}

const checkForActiveBooking = async () => {
  try {
    const response = await api.get('/driver/find/all/ride')
    let rides = response.data?.data || response.data || []
    if (!Array.isArray(rides) && rides && typeof rides === 'object') rides = [rides]

    const terminalStatuses = new Set(['completed', 'cancelled', 'canceled', 'rejected'])
    const activeRide = rides.find(ride => {
      const status = String(ride?.status || '').trim().toLowerCase()
      return !terminalStatuses.has(status)
    })

    if (activeRide) {
      Notify.create({
        type: 'warning',
        message: 'You already have an active ride. Complete or cancel it before booking another ride.'
      })
      return true
    }

    return false
  } catch (error) {
    console.error('Error checking active bookings:', error)
    Notify.create({
      type: 'negative',
      message: error.response?.data?.message || 'Unable to verify your current rides.'
    })
    return true
  }
}
onMounted(async () => {
  if (!searchForm.value.from) {
    await detectAndSetCurrentLocation()
  } else if (searchForm.value.fromLat && searchForm.value.toLat) {
    await fetchNearestVehicles()
  }
})
</script>

<style scoped>
.gap-md {
  gap: 16px;
}

.search-form-grid,
.driver-grid {
  margin: 0;
}

.search-form-grid > [class*='col-'],
.driver-grid > [class*='col-'] {
  min-width: 0;
}

.driver-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.driver-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 767px) {
  .search-card :deep(.q-card__section) {
    padding: 14px;
  }

  .search-form-grid {
    row-gap: 12px;
  }

  .search-form-grid > [class*='col-'],
  .driver-grid > [class*='col-'] {
    width: 100% !important;
    max-width: 100% !important;
    flex-basis: 100% !important;
  }

  .search-btn {
    min-height: 44px;
  }

  .driver-grid {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    align-items: stretch;
  }

  .driver-info-block {
    align-items: flex-start;
    gap: 12px;
    min-width: 0;
    width: 100%;
  }

  .driver-card :deep(.q-card__section) {
    padding: 14px 12px;
  }

  .driver-card .text-right {
    text-align: left !important;
    align-items: stretch !important;
  }

  .driver-card .row.items-center.q-gutter-x-sm {
    flex-wrap: wrap;
    row-gap: 8px;
  }

  .driver-card .q-chip {
    max-width: 100%;
  }

  .driver-card .q-chip__content,
  .driver-card .ellipsis {
    white-space: normal;
    overflow-wrap: anywhere;
    text-overflow: unset;
  }

  .driver-card .text-h5 {
    font-size: 1.5rem;
  }
}
</style>
