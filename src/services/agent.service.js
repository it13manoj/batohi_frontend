import api from '@/boot/axios'

const agentService = {
  // =========================================
  // DASHBOARD
  // =========================================

  getDashboard() {
    return api.get('/agent/dashboard')
  },

  // =========================================
  // PROFILE
  // =========================================

  getProfile() {
    return api.get('/agent/profile')
  },

  updateProfile(data) {
    return api.put('/agent/profile', data)
  },

  // =========================================
  // VEHICLES
  // =========================================

  getVehicles(params = {}) {
    return api.get('/agent/vehicles', {
      params
    })
  },

  getVehicle(id) {
    return api.get(`/agent/vehicles/${id}`)
  },

  createVehicle(data) {
    return api.post('/agent/vehicles', data)
  },

  updateVehicle(id, data) {
    return api.put(`/agent/vehicles/${id}`, data)
  },

  deleteVehicle(id) {
    return api.delete(`/agent/vehicles/${id}`)
  },

  // =========================================
  // BOOKINGS
  // =========================================

  getBookings(params = {}) {
    return api.get('/agent/bookings', {
      params
    })
  },

  getBooking(id) {
    return api.get(`/agent/bookings/${id}`)
  },

  // =========================================
  // DRIVERS
  // =========================================

  getDrivers(params = {}) {
    return api.get('/agent/drivers', {
      params
    })
  },

  // =========================================
  // EARNINGS
  // =========================================

  getEarnings(params = {}) {
    return api.get('/agent/earnings', {
      params
    })
  },

  // =========================================
  // REPORTS
  // =========================================

  getReports(params = {}) {
    return api.get('/agent/reports', {
      params
    })
  }
}

export default agentService
