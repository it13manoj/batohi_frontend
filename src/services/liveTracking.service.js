import api from '@/config/api'

const liveTrackingService = {
  /**
   * Get current live tracking data for a booking (for customer/rider view)
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
   * Update driver GPS location during active ride
   * @param {number} bookingId - Active booking ID
   * @param {number} lat - Current latitude
   * @param {number} lng - Current longitude
   * @param {object} extras - Optional: heading, speed, accuracy
   */
  async updateDriverLocation(bookingId, lat, lng, extras = {}) {
    try {
      const res = await api.post('/driver/location/update', {
        booking_id: bookingId,
        latitude: lat,
        longitude: lng,
        heading: extras.heading || null,
        speed: extras.speed || null,
        accuracy: extras.accuracy || null
      })
      return res.data
    } catch (err) {
      console.warn('updateDriverLocation error:', err?.message)
      return null
    }
  },

  /**
   * Confirm passenger pickup and start live tracking
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
   * Get breadcrumb tracking history for a booking
   */
  async getTrackingHistory(bookingId) {
    try {
      const res = await api.get(`/live-tracking/history/${bookingId}`)
      return res.data
    } catch (err) {
      console.warn('getTrackingHistory error:', err?.message)
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
