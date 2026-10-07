/**
 * useRouteHistory — composable for recording + drawing the live route trail
 *
 * Records a lat/lng breadcrumb point to the backend every HISTORY_INTERVAL_MS (2 min).
 * Also keeps an in-memory trail that can be drawn as a dashed polyline on a Leaflet map.
 *
 * Usage (driver side):
 *   const history = useRouteHistory()
 *   history.start(bookingId, userId, driverId)
 *   history.recordPoint(lat, lng)   // call on every GPS fix
 *   history.stop()
 *
 * Usage (customer side):
 *   const history = useRouteHistory()
 *   history.appendPoint(lat, lng)   // call when new location arrives from API
 *   history.drawTrail(leafletMap)
 */
import { ref, onUnmounted } from 'vue'
import liveTrackingService from '@/services/liveTracking.service'

const HISTORY_INTERVAL_MS = 2 * 60 * 1000 // 2 minutes

export function useRouteHistory() {
  /** All recorded [lat, lng] pairs in order */
  const trail = ref([])

  /** Leaflet polyline instance for the breadcrumb trail */
  let trailPolyline = null

  // Internal state
  let bookingId   = null
  let userId      = null
  let driverId    = null
  let historyTimer = null
  let lastSaved   = 0        // timestamp of last server save

  // ─── Public API ────────────────────────────────────────────────

  /**
   * Start route history recording (call once when trip starts)
   */
  function start(bId, uId, dId) {
    bookingId = bId
    userId    = uId
    driverId  = dId
    trail.value = []
    lastSaved   = 0
  }

  /**
   * Record a new GPS point from the driver.
   * Adds to the in-memory trail and saves to the server every 2 minutes.
   */
  async function recordPoint(lat, lng) {
    if (!lat || !lng) return

    // Always push to in-memory trail
    trail.value.push([lat, lng])

    const now = Date.now()
    if (now - lastSaved >= HISTORY_INTERVAL_MS) {
      lastSaved = now
      // Fire-and-forget — don't await to avoid slowing GPS callback
      liveTrackingService.saveRouteHistoryPoint(bookingId, lat, lng, userId, driverId)
    }
  }

  /**
   * Append a new point received from the API (customer-side poll)
   */
  function appendPoint(lat, lng) {
    if (!lat || !lng) return
    const last = trail.value[trail.value.length - 1]
    // Only add if moved > ~5m (avoid duplicate points from same GPS fix)
    if (last) {
      const dlat = Math.abs(lat - last[0])
      const dlng = Math.abs(lng - last[1])
      if (dlat < 0.00005 && dlng < 0.00005) return
    }
    trail.value.push([lat, lng])
  }

  /**
   * Draw / update the dashed breadcrumb trail on a Leaflet map
   */
  function drawTrail(map) {
    if (!map || trail.value.length < 2) return

    if (trailPolyline) {
      trailPolyline.setLatLngs(trail.value)
    } else {
      // Lazy import Leaflet to avoid SSR issues
      import('leaflet').then(L => {
        trailPolyline = L.polyline(trail.value, {
          color:     '#7b61ff',
          weight:    3,
          opacity:   0.7,
          dashArray: '6 8'
        }).addTo(map)
      })
    }
  }

  /**
   * Remove the trail polyline from the map
   */
  function clearTrail(map) {
    if (trailPolyline && map) {
      map.removeLayer(trailPolyline)
      trailPolyline = null
    }
    trail.value = []
  }

  /**
   * Stop recording and clean up
   */
  function stop() {
    if (historyTimer) {
      clearInterval(historyTimer)
      historyTimer = null
    }
    bookingId = null
    userId    = null
    driverId  = null
  }

  // Auto-clean on component unmount
  onUnmounted(() => {
    stop()
  })

  return {
    trail,
    start,
    stop,
    recordPoint,
    appendPoint,
    drawTrail,
    clearTrail
  }
}

