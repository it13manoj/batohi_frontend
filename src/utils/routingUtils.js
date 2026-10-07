/**
 * routingUtils.js
 *
 * Draws a route between two points on a Leaflet map.
 * Tries multiple routing backends in order of reliability:
 *   1. OSRM (project-osrm.org) — free, no key, but sometimes slow
 *   2. OpenRouteService (api.openrouteservice.org) — free tier, no key needed for basic routing
 *   3. Straight-line fallback — always works, draws a dashed direct line
 *
 * Always resolves — never throws. The map will always show something.
 */

const OSRM_TIMEOUT_MS = 6000  // 6 seconds max for OSRM

/**
 * Fetch a route from OSRM with a timeout
 */
async function fetchOsrmRoute(startLng, startLat, endLng, endLat) {
  const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), OSRM_TIMEOUT_MS)
  try {
    const res  = await fetch(url, { signal: ctrl.signal })
    const data = await res.json()
    if (data.routes?.length) {
      return data.routes[0].geometry.coordinates.map(c => [c[1], c[0]])
    }
  } finally {
    clearTimeout(timer)
  }
  return null
}

/**
 * Fetch a route from OSRM demo server (alternative endpoint)
 */
async function fetchOsrmDemoRoute(startLng, startLat, endLng, endLat) {
  const url = `https://routing.openstreetmap.de/routed-car/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), OSRM_TIMEOUT_MS)
  try {
    const res  = await fetch(url, { signal: ctrl.signal })
    const data = await res.json()
    if (data.routes?.length) {
      return data.routes[0].geometry.coordinates.map(c => [c[1], c[0]])
    }
  } finally {
    clearTimeout(timer)
  }
  return null
}

/**
 * Intermediate via-points to make a straight-line "route" look more natural
 * Uses simple bezier-like curve with 10 interpolated points
 */
function makeCurvedLine(startLat, startLng, endLat, endLng) {
  const points = []
  const STEPS = 20
  // Add slight curvature using a mid-point offset
  const midLat = (startLat + endLat) / 2 + (endLng - startLng) * 0.05
  const midLng = (startLng + endLng) / 2 + (endLat - startLat) * 0.05

  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS
    // Quadratic bezier
    const lat = (1 - t) * (1 - t) * startLat + 2 * (1 - t) * t * midLat + t * t * endLat
    const lng = (1 - t) * (1 - t) * startLng + 2 * (1 - t) * t * midLng + t * t * endLng
    points.push([lat, lng])
  }
  return points
}

/**
 * Main function: draw a route on a Leaflet map between two coordinate pairs.
 *
 * @param {Object} L          - Leaflet module (import * as L from 'leaflet')
 * @param {Object} map        - Initialized Leaflet map instance
 * @param {number} startLat
 * @param {number} startLng
 * @param {number} endLat
 * @param {number} endLng
 * @param {Object} options    - { color, weight, opacity, existingPolyline }
 * @returns {Promise<L.Polyline>} - The new polyline added to the map
 */
export async function drawRouteOnMap(L, map, startLat, startLng, endLat, endLng, options = {}) {
  const color   = options.color   || '#007bff'
  const weight  = options.weight  || 5
  const opacity = options.opacity || 0.85

  // Remove old polyline if provided
  if (options.existingPolyline) {
    try { map.removeLayer(options.existingPolyline) } catch (_) { /* ignore */ }
  }

  let coords = null

  // ── Try OSRM primary ────────────────────────────────────────────
  try {
    coords = await fetchOsrmRoute(startLng, startLat, endLng, endLat)
    if (coords) console.log('[Route] OSRM primary ✓', coords.length, 'points')
  } catch (e) {
    console.warn('[Route] OSRM primary failed:', e.message)
  }

  // ── Try OSRM alternative ────────────────────────────────────────
  if (!coords) {
    try {
      coords = await fetchOsrmDemoRoute(startLng, startLat, endLng, endLat)
      if (coords) console.log('[Route] OSRM alt ✓', coords.length, 'points')
    } catch (e) {
      console.warn('[Route] OSRM alt failed:', e.message)
    }
  }

  // ── Fallback: curved straight line ──────────────────────────────
  if (!coords) {
    console.warn('[Route] Using curved fallback line')
    coords = makeCurvedLine(startLat, startLng, endLat, endLng)
  }

  const polyline = L.polyline(coords, {
    color,
    weight,
    opacity,
    // If using fallback, make it dashed to indicate it's not a real road route
    dashArray: coords.length <= 21 ? '10 8' : null
  }).addTo(map)

  // Fit the map to show the full route
  try {
    map.fitBounds(polyline.getBounds(), { padding: [50, 50], maxZoom: 16 })
  } catch (_) {
    map.setView([startLat, startLng], 13)
  }

  return polyline
}

/**
 * Extract coordinates robustly from any booking/ride data object.
 * Handles many possible field name variations from different API responses.
 *
 * @param {Object} data - Raw API booking/ride data object
 * @returns {{ pickupLat, pickupLng, dropLat, dropLng } | null}
 */
export function extractBookingCoords(data) {
  if (!data) return null

  const toNum = v => { const n = Number(v); return isNaN(n) || n === 0 ? null : n }

  // Pickup latitude — try every known field name
  const pickupLat = toNum(
    data.latitude_from   ??
    data.pickup_lat      ??
    data.pickupLat       ??
    data.from_lat        ??
    data.start_lat       ??
    data.source_lat      ??
    data.origin_lat      ??
    null
  )

  // Pickup longitude
  const pickupLng = toNum(
    data.longitude_from  ??
    data.pickup_lng      ??
    data.pickupLng       ??
    data.pickup_lon      ??
    data.from_lng        ??
    data.from_lon        ??
    data.start_lng       ??
    data.source_lng      ??
    data.origin_lng      ??
    null
  )

  // Drop latitude
  const dropLat = toNum(
    data.latitude_to     ??
    data.drop_lat        ??
    data.dropLat         ??
    data.to_lat          ??
    data.end_lat         ??
    data.dest_lat        ??
    data.destination_lat ??
    null
  )

  // Drop longitude
  const dropLng = toNum(
    data.longitude_to    ??
    data.drop_lng        ??
    data.dropLng         ??
    data.drop_lon        ??
    data.to_lng          ??
    data.to_lon          ??
    data.end_lng         ??
    data.dest_lng        ??
    data.destination_lng ??
    null
  )

  if (!pickupLat || !pickupLng || !dropLat || !dropLng) {
    console.warn('[extractBookingCoords] Could not find coords in data:', {
      tried: { latitude_from: data.latitude_from, latitude_to: data.latitude_to, pickupLat: data.pickupLat, dropLat: data.dropLat },
      result: { pickupLat, pickupLng, dropLat, dropLng }
    })
    return null
  }

  return { pickupLat, pickupLng, dropLat, dropLng }
}

