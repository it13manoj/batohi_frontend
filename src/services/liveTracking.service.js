import api from '@/config/api'

const liveTrackingService = {
  /**
   * Get current live tracking data for a booking (customer-side poll)
   * Returns: { success, data: { current_location, trip_progress, route_history } }
   */
  async getLiveTracking(bookingId) {
    try {
      const res = await api.get(`/live-tracking/live/${bookingId}`)
      return res.data
    } catch (err) {
      console.warn('getLiveTracking error:', err?.message)
      return null
    }
  },

  /**
   * Push driver GPS location — called by driver every watchPosition callback
   * Also stores a route history point every 2 minutes server-side
   */
  async updateDriverLocation(bookingId, lat, lng, extras = {}) {
    try {
      const res = await api.post('/driver/location/update', {
        booking_id: bookingId,
        latitude: lat,
        longitude: lng,
        heading:  extras.heading  ?? null,
        speed:    extras.speed    ?? null,
        accuracy: extras.accuracy ?? null
      })
      return res.data
    } catch (err) {
      console.warn('updateDriverLocation error:', err?.message)
      return null
    }
  },

  /**
   * Save a route history breadcrumb point (lat/lng) every 2 minutes
   * Associates with booking, userId, and driverId for full audit trail
   */
  async saveRouteHistoryPoint(bookingId, lat, lng, userId, driverId) {
    try {
      const res = await api.post('/live-tracking/route-history', {
        booking_id: bookingId,
        latitude:   lat,
        longitude:  lng,
        user_id:    userId   || null,
        driver_id:  driverId || null,
        recorded_at: new Date().toISOString()
      })
      return res.data
    } catch (err) {
      // Silently ignore — history is supplementary, don't break the ride
      console.warn('saveRouteHistoryPoint error:', err?.message)
      return null
    }
  },

  /**
   * Fetch full route history breadcrumb trail for a completed or active booking
   * Returns array of { latitude, longitude, recorded_at }
   */
  async getRouteHistory(bookingId) {
    try {
      const res = await api.get(`/live-tracking/history/${bookingId}`)
      return res.data
    } catch (err) {
      console.warn('getRouteHistory error:', err?.message)
      return null
    }
  },

  /**
   * Confirm passenger pickup (driver triggers this)
   */
  async confirmPickup(bookingId, lat, lng) {
    try {
      const res = await api.post('/live-tracking/confirm-pickup', {
        booking_id: bookingId,
        latitude: lat,
        longitude: lng
      })
      return res.data
    } catch (err) {
      console.warn('confirmPickup error:', err?.message)
      return null
    }
  },

  /**
   * Mark ride tracking as completed
   */
  async completeTracking(bookingId) {
    try {
      const res = await api.post('/live-tracking/complete', { booking_id: bookingId })
      return res.data
    } catch (err) {
      console.warn('completeTracking error:', err?.message)
      return null
    }
  }
}

export default liveTrackingService
