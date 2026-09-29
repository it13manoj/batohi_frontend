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
          <div class="text-caption text-grey-7 q-mb-xs">Your booking has been placed. A driver will accept shortly.</div>

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
        <div v-else-if="isActiveRide" class="driver-info-container">
          <div class="row items-center justify-between q-mb-xs">
            <div class="text-subtitle2 text-positive text-weight-bold row items-center">
              <q-icon name="check_circle" color="positive" size="20px" class="q-mr-xs" />
              <span v-if="bookingStatus === 'started'">Ride In Progress 🚗</span>
              <span v-else>Ride Confirmed • Driver On The Way</span>
            </div>
            <!-- OTP Badge Display -->
            <q-badge v-if="otpCode && bookingStatus !== 'started'" color="amber-10" class="text-subtitle1 q-px-sm text-weight-bold">
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
                <div class="row items-center text-caption text-grey-8 q-mt-xs">
                  <q-icon name="phone" size="15px" class="q-mr-xs" />
                  <span>{{ driverMobile || 'Phone number unavailable' }}</span>
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
              :disable="!driverMobile"
              :href="driverMobile ? `tel:${driverMobile}` : undefined"
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

        <!-- Status: Rejected or Cancelled -->
        <div v-else-if="bookingStatus === 'rejected' || bookingStatus === 'cancelled'" class="text-center q-py-sm">
          <q-icon name="cancel" color="negative" size="40px" />
          <div class="text-h6 text-negative q-mt-sm">
            {{ bookingStatus === 'cancelled' ? 'Ride Cancelled' : 'Ride Declined' }}
          </div>
          <div class="text-body2 text-grey-8 q-mb-md">
            {{ bookingStatus === 'cancelled' ? 'You have cancelled this ride.' : 'The driver is unavailable. Please try another ride.' }}
          </div>
          <q-btn color="primary" label="Back to Search" @click="goBack" class="full-width" />
        </div>

        <!-- Status: Completed -->
        <div v-else-if="bookingStatus === 'completed'" class="text-center q-py-sm">
          <q-icon name="check_circle" color="positive" size="48px" />
          <div class="text-h6 text-positive q-mt-sm">Ride Completed!</div>
          <div class="text-body2 text-grey-8 q-mb-md">You have reached your destination. Thank you for riding with us!</div>
          <q-btn color="primary" label="Back to Dashboard" @click="goBack" class="full-width" />
        </div>

        <q-separator class="q-my-md" />

        <!-- Live Tracking ETA / Progress -->
        <div v-if="liveTrackingData?.trip_progress" class="q-mb-sm">
          <div class="row justify-between items-center">
            <div class="row items-center text-caption text-grey-8">
              <q-icon name="near_me" color="primary" size="16px" class="q-mr-xs" />
              <span v-if="liveTrackingData.trip_progress.distance_remaining_km">
                {{ liveTrackingData.trip_progress.distance_remaining_km }} km remaining
              </span>
            </div>
            <div class="row items-center text-caption text-positive text-weight-bold">
              <q-icon name="schedule" size="16px" class="q-mr-xs" />
              <span v-if="liveTrackingData.trip_progress.estimated_arrival_minutes">
                ETA: ~{{ liveTrackingData.trip_progress.estimated_arrival_minutes }} min
              </span>
            </div>
          </div>
          <q-linear-progress
            v-if="tripProgressValue !== null"
            :value="tripProgressValue"
            color="primary"
            class="q-mt-xs"
            rounded
          />
        </div>

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

        <!-- Cancel Ride Button Action -->
        <div v-if="canCancelRide" class="q-mt-md">
          <q-btn
            outline
            color="negative"
            label="Cancel Ride"
            icon="cancel"
            class="full-width"
            :loading="cancelling"
            @click="confirmCancelRide"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar, Notify, Dialog } from 'quasar'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import api from '@/config/api'
import liveTrackingService from '@/services/liveTracking.service'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const bookingId = route.params.bookingId

const bookingStatus = ref('pending')
const rideDetails = ref(null)
const cancelling = ref(false)
const liveTrackingData = ref(null)
const driverMarker = ref(null)

// Track initial total distance for progress calculation
const initialTotalDistance = ref(null)

let map = null
let pollTimer = null
let currentPolyline = null
let markersGroup = null
let pickupMarkerInstance = null
let dropMarkerInstance = null

// ─── Status helpers ───────────────────────────────────────────────
const ACTIVE_STATUSES = ['confirmed', 'accepted', 'started', 'in_transit', 'in_progress', 'on_trip']
const TERMINAL_STATUSES = ['rejected', 'cancelled', 'completed']

const normalizeStatus = (s) => {
  const v = String(s || '').toLowerCase().trim()
  if (['accept', 'accepted', 'driver_accepted', 'confirmed'].includes(v)) return 'accepted'
  if (['start', 'started', 'in_progress', 'ongoing', 'on_trip', 'in_transit'].includes(v)) return 'started'
  if (['complete', 'completed'].includes(v)) return 'completed'
  if (['cancel', 'cancelled', 'canceled'].includes(v)) return 'cancelled'
  if (['reject', 'rejected'].includes(v)) return 'rejected'
  return v
}

const isActiveRide = computed(() => ACTIVE_STATUSES.includes(bookingStatus.value))

// ─── Custom Leaflet Icons ─────────────────────────────────────────
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
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-5h14v5z"/>
        <circle cx="7.5" cy="14.5" r="1.5"/>
        <circle cx="16.5" cy="14.5" r="1.5"/>
      </svg>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
})

const pickupPinIcon = L.divIcon({
  className: 'custom-map-icon',
  html: `
    <div style="
      background-color: #027be3;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 8px rgba(0,0,0,0.4);
      border: 2px solid white;">
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#ffffff">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18]
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

// ─── Computed Helpers ─────────────────────────────────────────────
const canCancelRide = computed(() => {
  return ['pending', 'accepted'].includes(bookingStatus.value)
})

const otpCode = computed(() => rideDetails.value?.bookOtp?.[0]?.otp || null)
const driverDetails = computed(() => rideDetails.value?.driver?.driver || null)
const vehicleDetails = computed(() => driverDetails.value?.vehicle || null)

const driverMobile = computed(() => {
  const details = driverDetails.value || {}
  const rideDriver = rideDetails.value?.driver || {}
  return details.mobile_number
    || details.mobile
    || details.phone
    || rideDriver.mobile_no
    || rideDriver.mobile_number
    || rideDriver.mobile
    || rideDriver.phone
    || ''
})

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

// Dynamic trip progress value (0.0 → 1.0)
const tripProgressValue = computed(() => {
  const progress = liveTrackingData.value?.trip_progress
  if (!progress) return null

  const remaining = parseFloat(progress.distance_remaining_km)
  const total = parseFloat(progress.total_distance_km)

  if (!isNaN(remaining) && !isNaN(total) && total > 0) {
    return Math.max(0, Math.min(1, (total - remaining) / total))
  }

  // Fallback: use initialTotalDistance
  if (!isNaN(remaining) && initialTotalDistance.value > 0) {
    return Math.max(0, Math.min(1, (initialTotalDistance.value - remaining) / initialTotalDistance.value))
  }

  return 0.5 // indeterminate fallback
})

// ─── Map Initialization ───────────────────────────────────────────
const initMapContainer = () => {
  if (map) return
  map = L.map('tracking-map').setView([25.6033, 85.1092], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)

  markersGroup = L.layerGroup().addTo(map)
}

// ─── Route Rendering via OSRM ────────────────────────────────────
const renderRoute = async (start, end, startLabel, endLabel, color = '#007bff') => {
  if (!map) initMapContainer()

  // Clear old polyline
  if (currentPolyline) {
    map.removeLayer(currentPolyline)
    currentPolyline = null
  }

  // Clear old pickup/drop markers but keep driver marker
  if (pickupMarkerInstance) {
    markersGroup.removeLayer(pickupMarkerInstance)
    pickupMarkerInstance = null
  }
  if (dropMarkerInstance) {
    markersGroup.removeLayer(dropMarkerInstance)
    dropMarkerInstance = null
  }

  // Add pickup and drop markers
  pickupMarkerInstance = L.marker([start.lat, start.lng], { icon: bookingStatus.value === 'started' ? pickupPinIcon : vehicleBikeIcon })
    .addTo(markersGroup)
    .bindPopup(startLabel)

  dropMarkerInstance = L.marker([end.lat, end.lng], { icon: dropPinIcon })
    .addTo(markersGroup)
    .bindPopup(endLabel)

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
    const res = await fetch(url)
    const data = await res.json()

    if (data.routes && data.routes.length) {
      const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]])

      // Store initial total distance if not set
      if (!initialTotalDistance.value && data.routes[0].distance) {
        initialTotalDistance.value = data.routes[0].distance / 1000 // convert m → km
      }

      currentPolyline = L.polyline(coordinates, {
        color,
        weight: 5,
        opacity: 0.8
      }).addTo(map)

      map.fitBounds(currentPolyline.getBounds(), { padding: [50, 50] })
    }
  } catch (err) {
    console.error('Failed to load OSRM route line:', err)
    // Fallback: just fit the two markers
    const bounds = L.latLngBounds([
      [start.lat, start.lng],
      [end.lat, end.lng]
    ])
    map.fitBounds(bounds, { padding: [60, 60] })
  }
}

// ─── Dynamic Route based on Status ───────────────────────────────
const updateMapRoute = () => {
  if (!rideDetails.value) return

  const status = bookingStatus.value

  if (status === 'started' || status === 'in_transit' || status === 'in_progress' || status === 'on_trip') {
    // Trip in progress: show pickup → dropoff route
    const pickupLoc = {
      lat: Number(rideDetails.value.latitude_from),
      lng: Number(rideDetails.value.longitude_from)
    }
    const dropLoc = {
      lat: Number(rideDetails.value.latitude_to),
      lng: Number(rideDetails.value.longitude_to)
    }
    if (pickupLoc.lat && dropLoc.lat) {
      renderRoute(pickupLoc, dropLoc, 'Pickup Point', 'Destination Drop', '#28a745')
    }
  } else if (status === 'accepted' || status === 'confirmed') {
    // Driver accepted: show driver → pickup route
    const driverLocLat = Number(rideDetails.value.driver?.latitude || rideDetails.value.driver?.driver?.latitude)
    const driverLocLng = Number(rideDetails.value.driver?.longitude || rideDetails.value.driver?.driver?.longitude)
    const riderLat = Number(rideDetails.value.latitude_from)
    const riderLng = Number(rideDetails.value.longitude_from)

    if (driverLocLat && riderLat) {
      renderRoute(
        { lat: driverLocLat, lng: driverLocLng },
        { lat: riderLat, lng: riderLng },
        'Driver Vehicle',
        'Your Pickup Location',
        '#007bff'
      )
    } else {
      // Fallback: show full route pickup → drop
      const pickupLoc = { lat: riderLat || 25.6033, lng: riderLng || 85.1092 }
      const dropLoc = {
        lat: Number(rideDetails.value.latitude_to),
        lng: Number(rideDetails.value.longitude_to)
      }
      if (pickupLoc.lat && dropLoc.lat) {
        renderRoute(pickupLoc, dropLoc, 'Pickup Point', 'Destination Drop', '#007bff')
      }
    }
  }
}

// ─── Live Driver Marker Update ────────────────────────────────────
const updateDriverMarkerPosition = (lat, lng) => {
  if (!map || !markersGroup) return
  if (driverMarker.value) {
    driverMarker.value.setLatLng([lat, lng])
  } else {
    driverMarker.value = L.marker([lat, lng], { icon: vehicleBikeIcon })
      .addTo(markersGroup)
      .bindPopup('Driver Location')
  }
}

// ─── Booking Status Polling ───────────────────────────────────────
const checkBookingStatus = async () => {
  try {
    const res = await api.get(`/driver/bookings/status/${bookingId}`)
    if (res.data.success) {
      const raw = res.data.data
      const newStatus = normalizeStatus(raw.status)
      const statusChanged = bookingStatus.value !== newStatus

      bookingStatus.value = newStatus
      rideDetails.value = raw

      if (statusChanged || !currentPolyline) {
        updateMapRoute()
      }

      // Stop polling on terminal statuses
      if (TERMINAL_STATUSES.includes(newStatus)) {
        if (pollTimer) {
          clearInterval(pollTimer)
          pollTimer = null
        }
      }
    }
  } catch (err) {
    console.error('Error fetching ride status:', err)
  }
}

// ─── Live Tracking Polling ────────────────────────────────────────
const checkLiveTracking = async () => {
  if (!bookingId) return
  if (!ACTIVE_STATUSES.includes(bookingStatus.value)) return

  try {
    const res = await liveTrackingService.getLiveTracking(bookingId)
    if (res?.success && res?.data) {
      liveTrackingData.value = res.data
      const loc = res.data.current_location

      if (loc?.latitude && loc?.longitude) {
        updateDriverMarkerPosition(Number(loc.latitude), Number(loc.longitude))

        // For started rides: continuously update route from driver current pos → drop
        if (bookingStatus.value === 'started' && rideDetails.value) {
          const dropLat = Number(rideDetails.value.latitude_to)
          const dropLng = Number(rideDetails.value.longitude_to)
          if (dropLat && dropLng) {
            // Only redraw polyline every ~10s to avoid constant OSRM calls
            // Just move the marker; route stays drawn
          }
        }
      }
    }
  } catch (err) {
    console.warn('Live tracking fetch error:', err?.message)
  }
}

// ─── Cancel Ride Handlers ─────────────────────────────────────────
const confirmCancelRide = () => {
  Dialog.create({
    title: 'Cancel Ride',
    message: 'Are you sure you want to cancel this booking?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    cancelRide()
  })
}

const cancelRide = async () => {
  cancelling.value = true
  try {
    const res = await api.put(`/driver/cancel/${bookingId}`)
    if (res.data.success || res.status === 200) {
      bookingStatus.value = 'cancelled'
      if (pollTimer) {
        clearInterval(pollTimer)
        pollTimer = null
      }
      Notify.create({
        type: 'positive',
        message: 'Your ride has been cancelled.'
      })
    } else {
      Notify.create({
        type: 'negative',
        message: res.data?.message || 'Failed to cancel ride.'
      })
    }
  } catch (err) {
    console.error('Error cancelling ride:', err)
    Notify.create({
      type: 'negative',
      message: err.response?.data?.message || 'Failed to cancel ride.'
    })
  } finally {
    cancelling.value = false
  }
}

// ─── Lifecycle ────────────────────────────────────────────────────
onMounted(async () => {
  initMapContainer()
  await checkBookingStatus()
  await checkLiveTracking()

  pollTimer = setInterval(async () => {
    await checkBookingStatus()
    await checkLiveTracking()
  }, 4000) // Poll every 4 seconds
})

onUnmounted(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
  if (map) {
    map.remove()
    map = null
  }
})

const goBack = () => {
  router.push('/customer/dashboard')
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
  max-height: 60vh;
  overflow-y: auto;
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
