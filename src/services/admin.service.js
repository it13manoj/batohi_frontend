import api from '@/config/api'

export const adminService = {
  // =========================================================
  // 0. AUTHENTICATION
  // =========================================================
  async login(credentials) {
    try {
      const res = await api.post('/admin/login', credentials)
      return res.data
    } catch (err) {
      // Fallback to /user/login if /admin/login is unavailable
      const fallbackRes = await api.post('/user/login', credentials)
      return fallbackRes.data
    }
  },

  // =========================================================
  // 1. DASHBOARD
  // =========================================================
  async getDashboard() {
    const res = await api.get('/admin/dashboard')
    return res.data?.data || res.data
  },

  // =========================================================
  // 2. CUSTOMERS
  // =========================================================
  async getCustomers(params = {}) {
    const res = await api.get('/admin/customers', { params })
    return {
      data: res.data?.data || [],
      meta: res.data?.meta || {}
    }
  },

  async createCustomer(data) {
    const res = await api.post('/admin/customers', data)
    return res.data?.data || res.data
  },

  async updateCustomer(id, data) {
    const res = await api.put(`/admin/customers/${id}`, data)
    return res.data?.data || res.data
  },

  async deleteCustomer(id) {
    const res = await api.delete(`/admin/customers/${id}`)
    return res.data
  },

  // =========================================================
  // 3. DRIVERS
  // =========================================================
  async getDrivers(params = {}) {
    const res = await api.get('/admin/drivers', { params })
    return {
      data: res.data?.data || [],
      meta: res.data?.meta || {}
    }
  },

  async createDriver(data) {
    const res = await api.post('/admin/drivers', data)
    return res.data?.data || res.data
  },

  async updateDriver(id, data) {
    const res = await api.put(`/admin/drivers/${id}`, data)
    return res.data?.data || res.data
  },

  async deleteDriver(id) {
    const res = await api.delete(`/admin/drivers/${id}`)
    return res.data
  },

  async verifyDriver(id, payload = {}) {
    const res = await api.post(`/admin/drivers/${id}/verify`, payload)
    return res.data?.data || res.data
  },

  // =========================================================
  // 4. VEHICLES
  // =========================================================
  async getVehicles(params = {}) {
    const res = await api.get('/admin/vehicles', { params })
    return {
      data: res.data?.data || [],
      meta: res.data?.meta || {}
    }
  },

  async createVehicle(data) {
    const res = await api.post('/admin/vehicles', data)
    return res.data?.data || res.data
  },

  async updateVehicle(id, data) {
    const res = await api.put(`/admin/vehicles/${id}`, data)
    return res.data?.data || res.data
  },

  async updateVehicleStatus(id, status) {
    try {
      const res = await api.put(`/admin/vehicles/${id}`, { status })
      return res.data?.data || res.data
    } catch {
      const patchRes = await api.patch(`/admin/vehicles/${id}/status`, {
        status
      })
      return patchRes.data?.data || patchRes.data
    }
  },

  async deleteVehicle(id) {
    const res = await api.delete(`/admin/vehicles/${id}`)
    return res.data
  },

  // =========================================================
  // 5. VEHICLE TYPES
  // =========================================================
  async getVehicleTypes(params = {}) {
    const res = await api.get('/admin/vehicle-types', { params })
    return {
      data: res.data?.data || [],
      meta: res.data?.meta || {}
    }
  },

  async createVehicleType(data) {
    const res = await api.post('/admin/vehicle-types', data)
    return res.data?.data || res.data
  },

  async updateVehicleType(id, data) {
    const res = await api.put(`/admin/vehicle-types/${id}`, data)
    return res.data?.data || res.data
  },

  async updateVehicleTypeStatus(id, status) {
    try {
      const res = await api.patch(`/admin/vehicle-types/${id}/status`, {
        status
      })
      return res.data?.data || res.data
    } catch {
      const fallback = await api.patch(`/vehicleType/status/${id}`, { status })
      return fallback.data?.data || fallback.data
    }
  },

  async toggleVehicleTypeStatus(id) {
    try {
      const res = await api.patch(`/admin/vehicle-types/${id}/status`, {})
      return res.data?.data || res.data
    } catch {
      const fallback = await api.patch(`/vehicleType/toggle-status/${id}`, {})
      return fallback.data?.data || fallback.data
    }
  },

  async deleteVehicleType(id) {
    const res = await api.delete(`/admin/vehicle-types/${id}`)
    return res.data
  },

  // =========================================================
  // 6. BOOKINGS
  // =========================================================
  async getBookings(params = {}) {
    const res = await api.get('/admin/bookings', { params })
    return {
      data: res.data?.data || [],
      meta: res.data?.meta || {}
    }
  },

  async updateBookingStatus(id, status) {
    const res = await api.patch(`/admin/bookings/${id}/status`, { status })
    return res.data?.data || res.data
  },

  // =========================================================
  // 7. PAYMENTS
  // =========================================================
  async getPayments(params = {}) {
    const res = await api.get('/admin/payments', { params })
    return {
      data: res.data?.data || [],
      meta: res.data?.meta || {}
    }
  },

  async refundPayment(id, reason = '') {
    const res = await api.post(`/admin/payments/${id}/refund`, { reason })
    return res.data
  },

  // =========================================================
  // 8. INVOICES
  // =========================================================
  async getInvoices(params = {}) {
    const res = await api.get('/admin/invoices', { params })
    return res.data?.data || res.data || []
  },

  async createInvoice(data) {
    const res = await api.post('/admin/invoices', data)
    return res.data?.data || res.data
  },

  // =========================================================
  // 9. AGENTS
  // =========================================================
  async getAgents(params = {}) {
    const res = await api.get('/admin/agents', { params })
    return {
      data: res.data?.data || [],
      meta: res.data?.meta || {}
    }
  },

  async createAgent(data) {
    const res = await api.post('/admin/agents', data)
    return res.data?.data || res.data
  },

  // =========================================================
  // 10. COUPONS
  // =========================================================
  async getCoupons(params = {}) {
    const res = await api.get('/admin/coupons', { params })
    return res.data?.data || res.data || []
  },

  async createCoupon(data) {
    const res = await api.post('/admin/coupons', data)
    return res.data?.data || res.data
  },

  async deleteCoupon(id) {
    const res = await api.delete(`/admin/coupons/${id}`)
    return res.data
  },

  // =========================================================
  // 11. NOTIFICATIONS
  // =========================================================
  async getNotifications(params = {}) {
    const res = await api.get('/admin/notifications', { params })
    return res.data?.data || res.data || []
  },

  async sendNotification(data) {
    const res = await api.post('/admin/notifications/send', data)
    return res.data?.data || res.data
  },

  // =========================================================
  // 12. REVIEWS
  // =========================================================
  async getReviews(params = {}) {
    const res = await api.get('/admin/reviews', { params })
    return res.data?.data || res.data || []
  },

  async deleteReview(id) {
    const res = await api.delete(`/admin/reviews/${id}`)
    return res.data
  },

  // =========================================================
  // 13. REPORTS
  // =========================================================
  async getReports(params = {}) {
    const res = await api.get('/admin/reports', { params })
    return res.data?.data || res.data
  },

  // =========================================================
  // 14. SETTINGS
  // =========================================================
  async getSettings() {
    const res = await api.get('/admin/settings')
    return res.data?.data || res.data
  },

  async updateSettings(data) {
    const res = await api.put('/admin/settings', data)
    return res.data?.data || res.data
  },

  // =========================================================
  // 15. PROFILE & PASSWORD
  // =========================================================
  async getProfile() {
    const res = await api.get('/admin/profile')
    return res.data?.data || res.data
  },

  async updateProfile(data) {
    const res = await api.put('/admin/profile', data)
    return res.data?.data || res.data
  },

  async changePassword(data) {
    const res = await api.put('/admin/change-password', data)
    return res.data
  }
}

export default adminService
