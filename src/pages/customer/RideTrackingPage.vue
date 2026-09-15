<template>
  <q-page class="flex flex-center column relative-position full-width full-height">
    <!-- Map Canvas Container -->
    <div id="tracking-map" class="map-container"></div>

    <!-- Status Floating Bottom Card -->
    <q-card class="status-card q-pa-md shadow-3">
      <q-card-section class="q-pa-none">
        <!-- Status: Pending -->
        <div v-if="bookingStatus === 'pending'" class="text-center q-py-sm">
          <q-spinner-dots color="primary" size="40px" />
          <div class="text-h6 text-primary q-mt-sm">Waiting for Driver to Accept...</div>
          <div class="text-caption text-grey-7 q-mb-xs">Tracking driver approach to your location.</div>

          <!-- OTP Box for Pending State -->
          <div v-if="otpCode" class="otp-box q-mt-md q-pa-sm rounded-borders">
            <div class="text-caption text-grey-8 text-weight-bold">YOUR PICKUP OTP</div>
            <div class="text-h4 text-weight-bolder text-primary tracking-widest q-my-xs">
              {{ otpCode }}
            </div>
            <div class="text-caption text-grey-7">Share this OTP with your driver upon arrival</div>
          </div>
        </div>

        <!-- Status: Confirmed / Accepted (Driver & Vehicle Info Display) -->
        <div v-else-if="bookingStatus === 'confirmed' || bookingStatus === 'accepted'" class="driver-info-container">
          <div class="row items-center justify-between q-mb-xs">
            <div class="text-subtitle2 text-positive text-weight-bold row items-center">
              <q-icon name="check_circle" color="positive" size="20px" class="q-mr-xs" />
              Ride {{ bookingStatus === 'confirmed' ? 'Confirmed' : 'Accepted' }} • Driver On The Way
            </div>
            <!-- OTP Badge Display -->
            <q-badge v-if="otpCode" color="amber-10" class="text-subtitle1 q-px-sm text-weight-bold">
              OTP: {{ otpCode }}
            </q-badge>
          </div>

          <div class="row items-center justify-between q-my-sm">
            <!-- Driver Avatar & Name -->
            <div class="row items-center">
              <q-avatar size="54px" class="shadow-1 q-mr-sm">
                <img
                  v-if="driverProfileImage"
                  :src="driverProfileImage"
                  alt="Driver Profile"
                />
                <q-icon v-else name="account_circle" size="54px" color="grey-6" />
              </q-avatar>

              <div>
                <div class="text-subtitle1 text-weight-bold line-height-tight">
                  {{ driverFullName }}
                </div>
                <div class="row items-center text-caption text-grey-8">
                  <q-icon name="star" color="amber" size="16px" class="q-mr-xs" />
                  <span class="text-weight-bold">{{ driverDetails?.rating || '0.00' }}</span>
                  <span class="q-ml-xs">({{ driverDetails?.total_rides || 0 }} rides)</span>
                </div>
              </div>
            </div>

            <!-- Call / Contact Action Button -->
            <q-btn
              round
              color="positive"
              icon="call"
              :href="`tel:${driverDetails?.mobile_number || rideDetails?.driver?.mobile_no}`"
            />
          </div>

          <!-- Vehicle Details Badge Banner -->
          <div v-if="vehicleDetails" class="vehicle-card q-pa-sm q-mb-sm rounded-borders">
            <div class="row justify-between items-center">
              <div>
                <span class="text-weight-bold text-capitalize">{{ vehicleDetails.vehicle_name }}</span>
                <span class="text-caption text-grey-7 q-ml-xs">({{ vehicleDetails.colour }})</span>
              </div>
              <q-badge color="primary" class="text-subtitle2 q-px-sm">
                {{ vehicleDetails.registration_no }}
              </q-badge>
            </div>
          </div>
        </div>

        <!-- Status: Rejected -->
        <div v-else-if="bookingStatus === 'rejected'" class="text-center q-py-sm">
          <q-icon name="cancel" color="negative" size="40px" />
          <div class="text-h6 text-negative q-mt-sm">Ride Declined</div>
          <div class="text-body2 text-grey-8 q-mb-md">The driver is unavailable. Please try another ride.</div>
          <q-btn color="primary" label="Back to Search" @click="goBack" class="full-width" />
        </div>

        <q-separator class="q-my-md" />

        <!-- Ride Details Summary -->
        <div v-if="rideDetails" class="q-gutter-y-xs">
          <div class="row items-center text-subtitle2">
            <q-icon name="my_location" color="blue" class="q-mr-xs" />
            <span class="ellipsis">{{ rideDetails.from }}</span>
          </div>
          <div class="row items-center text-subtitle2">
            <q-icon name="location_on" color="red" class="q-mr-xs" />
            <span class="ellipsis">{{ rideDetails.to }}</span>
          </div>
          <div class="row justify-between items-center q-mt-sm">
            <span class="text-grey-7">Estimated Fare:</span>
            <span class="text-h6 text-weight-bold text-primary">₹{{ rideDetails.fare }}</span>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import api from '@/config/api'

const route = useRoute()
const router = useRouter()
const bookingId = route.params.bookingId

const bookingStatus = ref('pending')
const rideDetails = ref(null)

let map = null
let pollTimer = null
let currentPolyline = null
let markersGroup = null

// Custom Leaflet Icons
const vehicleBikeIcon = L.divIcon({
  className: 'custom-map-icon',
  html: `
    <div style="
      background-color: #027be3;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 8px rgba(0,0,0,0.4);
      border: 2px solid white;">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M19.44 9.03L15.42 5.01c-.39-.39-1.02-.39-1.41 0l-1.06 1.06 2.12 2.12c.39.39.39 1.02 0 1.41l-4.24 4.24c-.39.39-1.02.39-1.41 0L7.3 11.72 6.24 12.78c-.39.39-.39 1.02 0 1.41l4.02 4.02c.39.39 1.02.39 1.41 0l1.06-1.06-2.12-2.12c-.39-.39-.39-1.02 0-1.41l4.24-4.24c.39-.39 1.02-.39 1.41 0l2.12 2.12 1.06-1.06c.39-.39.39-1.03 0-1.42z"/>
        <path d="M19 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-14 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
        <path d="M5 18c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm14 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-6.27-5h-3.46l-1.54-3.5h7.27l-2.27 3.5z"/>
      </svg>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
})

const dropPinIcon = L.divIcon({
  className: 'custom-map-icon',
  html: `
    <div style="
      background-color: #c10015;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 8px rgba(0,0,0,0.4);
      border: 2px solid white;">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
})

// Computed Helpers for Driver, Vehicle & OTP
const otpCode = computed(() => rideDetails.value?.otp?.otp || null)
const driverDetails = computed(() => rideDetails.value?.driver?.driver || null)
const vehicleDetails = computed(() => driverDetails.value?.vehicle || null)

const driverFullName = computed(() => {
  if (driverDetails.value?.first_name) {
    return `${driverDetails.value.first_name} ${driverDetails.value.last_name || ''}`.trim()
  }
  return rideDetails.value?.driver?.username || 'Driver'
})

const driverProfileImage = computed(() => {
  const path = driverDetails.value?.profile_image
  if (!path) return null
  if (path.startsWith('http')) return path
  const baseURL = api.defaults.baseURL ? api.defaults.baseURL.replace(/\/api\/?$/, '') : ''
  return `${baseURL}${path}`
})

// Base Map Initialization
const initMapContainer = () => {
  if (map) return
  map = L.map('tracking-map').setView([25.6033, 85.1092], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  markersGroup = L.layerGroup().addTo(map)
}

// Render Route via OSRM
const renderRoute = async (start, end, startLabel, endLabel) => {
  if (!map) initMapContainer()

  markersGroup.clearLayers()
  if (currentPolyline) {
    map.removeLayer(currentPolyline)
    currentPolyline = null
  }

  L.marker([start.lat, start.lng], { icon: vehicleBikeIcon })
    .addTo(markersGroup)
    .bindPopup(startLabel)

  L.marker([end.lat, end.lng], { icon: dropPinIcon })
    .addTo(markersGroup)
    .bindPopup(endLabel)

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
    const res = await fetch(url)
    const data = await res.json()

    if (data.routes && data.routes.length) {
      const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]])

      currentPolyline = L.polyline(coordinates, {
        color: (bookingStatus.value === 'confirmed' || bookingStatus.value === 'accepted') ? '#28a745' : '#007bff',
        weight: 5,
        opacity: 0.8
      }).addTo(map)

      map.fitBounds(currentPolyline.getBounds(), { padding: [50, 50] })
    }
  } catch (err) {
    console.error('Failed to load OSRM route line:', err)
  }
}

// Dynamic Route Switcher based on Booking Status
const updateMapRoute = () => {
  if (!rideDetails.value) return

  // Generate full pickup-to-dropoff route ON CONFIRMED / ACCEPTED status
  if (bookingStatus.value === 'confirmed' || bookingStatus.value === 'accepted') {
    const pickupLoc = {
      lat: Number(rideDetails.value.latitude_from),
      lng: Number(rideDetails.value.longitude_from)
    }
    const dropLoc = {
      lat: Number(rideDetails.value.latitude_to),
      lng: Number(rideDetails.value.longitude_to)
    }

    if (pickupLoc.lat && dropLoc.lat) {
      renderRoute(pickupLoc, dropLoc, 'Pickup Point', 'Destination Drop Point')
    }
  } else {
    // Default/Pending: Track Driver approach to Rider Pickup Location
    const driverLoc = {
      lat: Number(rideDetails.value.driver?.latitude),
      lng: Number(rideDetails.value.driver?.longitude)
    }
    const riderLoc = {
      lat: Number(rideDetails.value.rider?.latitude),
      lng: Number(rideDetails.value.rider?.longitude)
    }

    if (driverLoc.lat && riderLoc.lat) {
      renderRoute(driverLoc, riderLoc, 'Driver Vehicle', 'Your Pickup Location')
    }
  }
}

// Polling API for Booking Status and OTP
const checkBookingStatus = async () => {
  try {
    const res = await api.get(`/driver/bookings/status/${bookingId}`)
    if (res.data.success) {
      const newStatus = res.data.data.status
      const statusChanged = bookingStatus.value !== newStatus

      bookingStatus.value = newStatus
      rideDetails.value = res.data.data

      if (statusChanged || !currentPolyline) {
        updateMapRoute()
      }

      if (bookingStatus.value !== 'pending') {
        clearInterval(pollTimer)
      }
    }
  } catch (err) {
    console.error('Error fetching ride status:', err)
  }
}

onMounted(async () => {
  initMapContainer()
  await checkBookingStatus()

  pollTimer = setInterval(checkBookingStatus, 3000)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})

const goBack = () => {
  router.push('/search-vehicle')
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
  z-index: 1;
}

.status-card {
  position: absolute;
  bottom: 20px;
  left: 5%;
  right: 5%;
  z-index: 1000;
  border-radius: 16px;
  background-color: #ffffff;
}

.vehicle-card {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
}

.line-height-tight {
  line-height: 1.2;
}

.otp-box {
  background-color: #e3f2fd;
  border: 2px dashed #027be3;
}

.tracking-widest {
  letter-spacing: 6px;
}
</style>
