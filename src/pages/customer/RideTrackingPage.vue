<template>
  <q-page class="flex flex-center column relative-position full-width full-height">
    <!-- Map Canvas Container -->
    <div id="tracking-map" class="map-container"></div>

    <!-- GPS Status Pill -->
    <div v-if="isActiveRide" class="gps-pill row items-center q-px-sm q-py-xs">
      <q-icon name="gps_fixed" color="positive" size="14px" class="q-mr-xs" />
      <span class="text-caption text-positive text-weight-bold">LIVE</span>
      <span class="text-caption text-grey-7 q-ml-xs">· updates every 4s</span>
    </div>

    <!-- Status Floating Bottom Card -->
    <q-card class="status-card q-pa-md shadow-3">
      <q-card-section class="q-pa-none">

        <!-- ══ Status: Pending ══ -->
        <div v-if="bookingStatus === 'pending'" class="text-center q-py-sm">
          <q-spinner-dots color="primary" size="40px" />
          <div class="text-h6 text-primary q-mt-sm">Waiting for Driver to Accept...</div>
          <div class="text-caption text-grey-7 q-mb-xs">Your booking has been placed. A driver will accept shortly.</div>

          <div v-if="otpCode" class="otp-box q-mt-md q-pa-sm rounded-borders">
            <div class="text-caption text-grey-8 text-weight-bold">YOUR PICKUP OTP</div>
            <div class="text-h4 text-weight-bolder text-primary tracking-widest q-my-xs">{{ otpCode }}</div>
            <div class="text-caption text-grey-7">Share this OTP with your driver upon arrival</div>
          </div>
        </div>

        <!-- ══ Status: Accepted / Started ══ -->
        <div v-else-if="isActiveRide" class="driver-info-container">
          <!-- Status header row -->
          <div class="row items-center justify-between q-mb-xs">
            <div class="text-subtitle2 text-positive text-weight-bold row items-center">
              <q-icon name="check_circle" color="positive" size="20px" class="q-mr-xs" />
              <span v-if="bookingStatus === 'started'">Ride In Progress 🚗</span>
              <span v-else>Ride Confirmed • Driver On The Way</span>
            </div>
            <q-badge v-if="otpCode && bookingStatus !== 'started'" color="amber-10" class="text-subtitle1 q-px-sm text-weight-bold">
              OTP: {{ otpCode }}
            </q-badge>
          </div>

          <!-- Driver avatar + info -->
          <div class="row items-center justify-between q-my-sm">
            <div class="row items-center">
              <q-avatar size="54px" class="shadow-1 q-mr-sm">
                <img v-if="driverProfileImage" :src="driverProfileImage" alt="Driver Profile" />
                <q-icon v-else name="account_circle" size="54px" color="grey-6" />
              </q-avatar>
              <div>
                <div class="text-subtitle1 text-weight-bold line-height-tight">{{ driverFullName }}</div>
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

            <!-- Call button -->
            <q-btn round color="positive" icon="call"
              :disable="!driverMobile"
              :href="driverMobile ? `tel:${driverMobile}` : undefined" />
          </div>

          <!-- Vehicle badge -->
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

        <!-- ══ Status: Rejected / Cancelled ══ -->
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

        <!-- ══ Status: Completed ══ -->
        <div v-else-if="bookingStatus === 'completed'" class="text-center q-py-sm">
          <q-icon name="check_circle" color="positive" size="48px" />
          <div class="text-h6 text-positive q-mt-sm">Ride Completed!</div>
          <div class="text-body2 text-grey-8 q-mb-md">You have reached your destination. Thank you for riding with us!</div>
          <q-btn color="primary" label="Back to Dashboard" @click="goBack" class="full-width" />
        </div>

        <q-separator class="q-my-md" />

        <!-- ETA / Progress bar -->
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

        <!-- Route history trail indicator -->
        <div v-if="routeTrail.length > 1" class="row items-center text-caption text-purple q-mb-sm">
          <q-icon name="route" size="14px" class="q-mr-xs" />
          <span>{{ routeTrail.length }} route points recorded</span>
        </div>

        <!-- Ride details -->
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

        <!-- Cancel button -->
        <div v-if="canCancelRide" class="q-mt-md">
          <q-btn outline color="negative" label="Cancel Ride" icon="cancel"
            class="full-width" :loading="cancelling" @click="confirmCancelRide" />
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
import { useRouteHistory } from '@/composables/useRouteHistory'
import { drawRouteOnMap, extractBookingCoords } from '@/utils/routingUtils'

const $q     = useQuasar()
const route  = useRoute()
const router = useRouter()
const bookingId = route.params.bookingId

// ── State ───────────────────────────────────────────────────────────
const bookingStatus     = ref('pending')
const rideDetails       = ref(null)
const cancelling        = ref(false)
const liveTrackingData  = ref(null)

// Leaflet instances
let map                 = null
let pollTimer           = null
let currentPolyline     = null
let markersGroup        = null
let driverMarkerInst    = null
let pickupMarkerInst    = null
let dropMarkerInst      = null
let trailPolylineInst   = null
let animFrame           = null

// Initial total distance for progress calc
const initialTotalDistance = ref(null)

// Route history composable
const routeHistory = useRouteHistory()
const routeTrail   = routeHistory.trail

// ── Status constants ────────────────────────────────────────────────
const ACTIVE_STATUSES   = ['confirmed', 'accepted', 'started', 'in_transit', 'in_progress', 'on_trip']
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

// ── Custom Leaflet icons ────────────────────────────────────────────
const makeIcon = (bgColor, svgPath, size = 40) => L.divIcon({
  className: 'custom-map-icon',
  html: `<div style="background:${bgColor};width:${size}px;height:${size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(0,0,0,.4);border:2px solid #fff">${svgPath}</div>`,
  iconSize:   [size, size],
  iconAnchor: [size / 2, size / 2],
  popupAnchor:[0, -size / 2]
})

const CAR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 0 24 24" width="22px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-5h14v5z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>`
const PIN_SVG  = `<svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 0 24 24" width="22px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`

const vehicleIcon = makeIcon('#027be3', CAR_SVG, 42)
const pickupIcon  = makeIcon('#027be3', PIN_SVG, 36)
const dropIcon    = makeIcon('#c10015', PIN_SVG, 40)

// ── Computed helpers ────────────────────────────────────────────────
const canCancelRide = computed(() => ['pending', 'accepted'].includes(bookingStatus.value))
const otpCode       = computed(() => rideDetails.value?.bookOtp?.[0]?.otp || null)
const driverDetails = computed(() => rideDetails.value?.driver?.driver || null)
const vehicleDetails= computed(() => driverDetails.value?.vehicle || null)

const driverMobile  = computed(() => {
  const d = driverDetails.value || {}
  const r = rideDetails.value?.driver || {}
  return d.mobile_number || d.mobile || d.phone || r.mobile_no || r.mobile_number || r.mobile || ''
})

const driverFullName = computed(() => {
  if (driverDetails.value?.first_name) return `${driverDetails.value.first_name} ${driverDetails.value.last_name || ''}`.trim()
  return rideDetails.value?.driver?.username || 'Driver'
})

const driverProfileImage = computed(() => {
  const path = driverDetails.value?.profile_image
  if (!path) return null
  if (path.startsWith('http')) return path
  const base = (api.defaults.baseURL || '').replace(/\/api\/?$/, '')
  return `${base}${path}`
})

const tripProgressValue = computed(() => {
  const p = liveTrackingData.value?.trip_progress
  if (!p) return null
  const remaining = parseFloat(p.distance_remaining_km)
  const total     = parseFloat(p.total_distance_km)
  if (!isNaN(remaining) && !isNaN(total) && total > 0) return Math.max(0, Math.min(1, (total - remaining) / total))
  if (!isNaN(remaining) && initialTotalDistance.value > 0) return Math.max(0, Math.min(1, (initialTotalDistance.value - remaining) / initialTotalDistance.value))
  return 0.5
})

// ── Map initialization ──────────────────────────────────────────────
const initMap = () => {
  if (map) return
  map = L.map('tracking-map').setView([25.6033, 85.1092], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)
  markersGroup = L.layerGroup().addTo(map)
}

// ── Draw route (OSRM → alt OSRM → curved fallback) ────────────────────
const drawRoute = async (startLat, startLng, endLat, endLng, startLabel, endLabel, color = '#007bff') => {
  if (!map) initMap()

  // Remove old pickup/drop markers
  if (pickupMarkerInst) { markersGroup.removeLayer(pickupMarkerInst); pickupMarkerInst = null }
  if (dropMarkerInst)   { markersGroup.removeLayer(dropMarkerInst);   dropMarkerInst   = null }

  // Place markers
  pickupMarkerInst = L.marker([startLat, startLng], { icon: pickupIcon }).addTo(markersGroup).bindPopup(startLabel || 'Start')
  dropMarkerInst   = L.marker([endLat,   endLng],   { icon: dropIcon   }).addTo(markersGroup).bindPopup(endLabel   || 'End')

  // Draw route with auto-fallback (never leaves map empty)
  currentPolyline = await drawRouteOnMap(L, map, startLat, startLng, endLat, endLng, {
    color,
    weight: 5,
    opacity: 0.85,
    existingPolyline: currentPolyline
  })
}

// ── Update breadcrumb trail on map ──────────────────────────────────
const updateTrailPolyline = () => {
  if (!map || routeTrail.value.length < 2) return
  if (trailPolylineInst) {
    trailPolylineInst.setLatLngs(routeTrail.value)
  } else {
    trailPolylineInst = L.polyline(routeTrail.value, {
      color: '#7b61ff', weight: 3, opacity: 0.75, dashArray: '6 8'
    }).addTo(map)
  }
}

// ── Smooth animated driver marker move ──────────────────────────────
// Interpolates from current position to target over ~600ms
let animTarget   = null
let animStart    = null
let animFrom     = null

const animateDriverTo = (toLat, toLng) => {
  if (!map) return

  const from = driverMarkerInst ? driverMarkerInst.getLatLng() : null

  if (!driverMarkerInst) {
    driverMarkerInst = L.marker([toLat, toLng], { icon: vehicleIcon })
      .addTo(markersGroup)
      .bindPopup('Driver')
    return
  }

  if (!from || (Math.abs(from.lat - toLat) < 0.00001 && Math.abs(from.lng - toLng) < 0.00001)) return

  animFrom   = { lat: from.lat, lng: from.lng }
  animTarget = { lat: toLat, lng: toLng }
  animStart  = performance.now()

  const DURATION = 600 // ms

  const step = (now) => {
    if (!animTarget || !animFrom) return
    const t = Math.min((now - animStart) / DURATION, 1)
    const lat = animFrom.lat + (animTarget.lat - animFrom.lat) * t
    const lng = animFrom.lng + (animTarget.lng - animFrom.lng) * t
    driverMarkerInst.setLatLng([lat, lng])
    if (t < 1) {
      animFrame = requestAnimationFrame(step)
    } else {
      animTarget = null
    }
  }

  if (animFrame) cancelAnimationFrame(animFrame)
  animFrame = requestAnimationFrame(step)
}

// ── Route selection based on booking status ─────────────────────────
const updateMapRoute = async () => {
  if (!rideDetails.value) return
  const raw = rideDetails.value
  const s   = bookingStatus.value

  // Extract coordinates from raw API response — handles all field name variants
  const coords = extractBookingCoords(raw)
  if (!coords) {
    console.warn('[RideTracking] No coordinates found. Raw data keys:', Object.keys(raw))
    return
  }

  const { pickupLat, pickupLng, dropLat, dropLng } = coords

  if (['started', 'in_transit', 'in_progress', 'on_trip'].includes(s)) {
    // Ride in progress → pickup to drop (green)
    await drawRoute(pickupLat, pickupLng, dropLat, dropLng, 'Pickup Point', 'Your Destination', '#28a745')

  } else if (['accepted', 'confirmed'].includes(s)) {
    // Driver accepted → try to show driver→pickup, else show full pickup→drop
    const dLat = Number(raw.driver?.latitude || raw.driver?.driver?.latitude || 0)
    const dLng = Number(raw.driver?.longitude || raw.driver?.driver?.longitude || 0)

    if (dLat && dLng) {
      await drawRoute(dLat, dLng, pickupLat, pickupLng, 'Driver', 'Your Pickup', '#007bff')
    } else {
      await drawRoute(pickupLat, pickupLng, dropLat, dropLng, 'Your Pickup', 'Destination', '#007bff')
    }
  } else {
    // Pending / unknown — always show pickup→drop so map isn't blank
    await drawRoute(pickupLat, pickupLng, dropLat, dropLng, 'Your Pickup', 'Destination', '#9b59b6')
  }
}

// ── Poll booking status ──────────────────────────────────────────────
const checkBookingStatus = async () => {
  try {
    const res = await api.get(`/driver/bookings/status/${bookingId}`)
    if (res.data.success) {
      const raw       = res.data.data
      const newStatus = normalizeStatus(raw.status)
      const changed   = bookingStatus.value !== newStatus

      bookingStatus.value = newStatus
      rideDetails.value   = raw

      if (changed || !currentPolyline) updateMapRoute()

      if (TERMINAL_STATUSES.includes(newStatus)) stopPolling()
    }
  } catch (err) {
    console.error('checkBookingStatus error:', err)
  }
}

// ── Poll live tracking (driver GPS) ─────────────────────────────────
const checkLiveTracking = async () => {
  if (!ACTIVE_STATUSES.includes(bookingStatus.value)) return
  try {
    const res = await liveTrackingService.getLiveTracking(bookingId)
    if (res?.success && res?.data) {
      liveTrackingData.value = res.data

      // Current live location
      const loc = res.data.current_location
      if (loc?.latitude && loc?.longitude) {
        const lat = Number(loc.latitude)
        const lng = Number(loc.longitude)

        // Animate the driver marker
        animateDriverTo(lat, lng)

        // Add to in-memory breadcrumb trail and draw it
        routeHistory.appendPoint(lat, lng)
        updateTrailPolyline()
      }

      // Load historical route points from API if trail is empty
      if (routeTrail.value.length === 0 && res.data.route_history?.length) {
        res.data.route_history.forEach(p => routeHistory.appendPoint(Number(p.latitude), Number(p.longitude)))
        updateTrailPolyline()
      }
    }
  } catch (err) {
    console.warn('checkLiveTracking error:', err?.message)
  }
}

// ── Poll control ────────────────────────────────────────────────────
const stopPolling = () => {
  if (pollTimer) { clearInterval(pollTimer); pollTimer = null }
}

// ── Cancel ride ─────────────────────────────────────────────────────
const confirmCancelRide = () => {
  Dialog.create({ title: 'Cancel Ride', message: 'Are you sure you want to cancel this booking?', cancel: true, persistent: true })
    .onOk(() => cancelRide())
}

const cancelRide = async () => {
  cancelling.value = true
  try {
    const res = await api.put(`/driver/cancel/${bookingId}`)
    if (res.data.success || res.status === 200) {
      bookingStatus.value = 'cancelled'
      stopPolling()
      Notify.create({ type: 'positive', message: 'Your ride has been cancelled.' })
    } else {
      Notify.create({ type: 'negative', message: res.data?.message || 'Failed to cancel ride.' })
    }
  } catch (err) {
    Notify.create({ type: 'negative', message: err.response?.data?.message || 'Failed to cancel ride.' })
  } finally {
    cancelling.value = false
  }
}

// ── Lifecycle ────────────────────────────────────────────────────────
onMounted(async () => {
  initMap()
  await checkBookingStatus()
  await checkLiveTracking()

  // Poll every 4 seconds
  pollTimer = setInterval(async () => {
    await checkBookingStatus()
    await checkLiveTracking()
  }, 4000)
})

onUnmounted(() => {
  stopPolling()
  if (animFrame) cancelAnimationFrame(animFrame)
  routeHistory.stop()
  if (map) { map.remove(); map = null }
})

const goBack = () => router.push('/customer/dashboard')
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

/* GPS live pill badge */
.gps-pill {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
  background: rgba(255,255,255,0.9);
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.vehicle-card {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
}

.line-height-tight { line-height: 1.2; }

.otp-box {
  background-color: #e3f2fd;
  border: 2px dashed #027be3;
}

.tracking-widest { letter-spacing: 6px; }
</style>
