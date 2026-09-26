import { defineStore } from 'pinia'
import adminService from '@/services/admin.service'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    // Dashboard
    dashboardStats: {
      users: 0,
      vehicles: 0,
      bookings: 0,
      revenue: '0'
    },
    revenueData: [],
    bookingSummary: [],
    recentBookings: [],

    // Lists
    customers: [],
    customerMeta: { total: 0, active: 0, inactive: 0, newCount: 0 },
    drivers: [],
    driverMeta: { total: 0, active: 0, inactive: 0, pending: 0 },
    vehicles: [],
    vehicleMeta: { total: 0, available: 0, booked: 0, maintenance: 0 },
    vehicleTypes: [],
    vehicleTypeMeta: { total: 0, active: 0 },
    bookings: [],
    bookingMeta: {
      total: 0,
      pending: 0,
      confirmed: 0,
      active: 0,
      completed: 0,
      cancelled: 0
    },
    payments: [],
    paymentMeta: {
      totalVolume: 0,
      successfulCount: 0,
      pendingCount: 0,
      refundedCount: 0
    },
    invoices: [],
    agents: [],
    agentMeta: { total: 0, active: 0 },
    coupons: [],
    notifications: [],
    reviews: [],
    reports: null,
    settings: {},
    profile: null,

    // Status
    loading: false,
    error: null
  }),

  actions: {
    // ---------------- Dashboard ----------------
    async fetchDashboard() {
      this.loading = true
      this.error = null
      try {
        const res = await adminService.getDashboard()
        if (res) {
          if (res.stats) this.dashboardStats = res.stats
          if (res.revenueData) this.revenueData = res.revenueData
          if (res.bookingSummary) this.bookingSummary = res.bookingSummary
          if (res.recentBookings) this.recentBookings = res.recentBookings
        }
        return res
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // ---------------- Customers ----------------
    async fetchCustomers(params = {}) {
      this.loading = true
      try {
        const res = await adminService.getCustomers(params)
        this.customers = res.data || []
        this.customerMeta = res.meta || this.customerMeta
        return res
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async addCustomer(data) {
      const res = await adminService.createCustomer(data)
      await this.fetchCustomers()
      return res
    },

    async updateCustomer(id, data) {
      const res = await adminService.updateCustomer(id, data)
      await this.fetchCustomers()
      return res
    },

    async removeCustomer(id) {
      const res = await adminService.deleteCustomer(id)
      this.customers = this.customers.filter(c => c.id !== id)
      return res
    },

    // ---------------- Drivers ----------------
    async fetchDrivers(params = {}) {
      this.loading = true
      try {
        const res = await adminService.getDrivers(params)
        this.drivers = res.data || []
        this.driverMeta = res.meta || this.driverMeta
        return res
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async addDriver(data) {
      const res = await adminService.createDriver(data)
      await this.fetchDrivers()
      return res
    },

    async updateDriver(id, data) {
      const res = await adminService.updateDriver(id, data)
      await this.fetchDrivers()
      return res
    },

    async removeDriver(id) {
      const res = await adminService.deleteDriver(id)
      this.drivers = this.drivers.filter(d => d.id !== id)
      return res
    },

    // ---------------- Vehicles ----------------
    async fetchVehicles(params = {}) {
      this.loading = true
      try {
        const res = await adminService.getVehicles(params)
        this.vehicles = res.data || []
        this.vehicleMeta = res.meta || this.vehicleMeta
        return res
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async addVehicle(data) {
      const res = await adminService.createVehicle(data)
      await this.fetchVehicles()
      return res
    },

    async updateVehicle(id, data) {
      const res = await adminService.updateVehicle(id, data)
      await this.fetchVehicles()
      return res
    },

    async removeVehicle(id) {
      const res = await adminService.deleteVehicle(id)
      this.vehicles = this.vehicles.filter(v => v.id !== id)
      return res
    },

    // ---------------- Vehicle Types ----------------
    async fetchVehicleTypes(params = {}) {
      this.loading = true
      try {
        const res = await adminService.getVehicleTypes(params)
        this.vehicleTypes = res.data || []
        this.vehicleTypeMeta = res.meta || this.vehicleTypeMeta
        return res
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async addVehicleType(data) {
      const res = await adminService.createVehicleType(data)
      await this.fetchVehicleTypes()
      return res
    },

    async updateVehicleType(id, data) {
      const res = await adminService.updateVehicleType(id, data)
      await this.fetchVehicleTypes()
      return res
    },

    async removeVehicleType(id) {
      const res = await adminService.deleteVehicleType(id)
      this.vehicleTypes = this.vehicleTypes.filter(vt => vt.id !== id)
      return res
    },

    // ---------------- Bookings ----------------
    async fetchBookings(params = {}) {
      this.loading = true
      try {
        const res = await adminService.getBookings(params)
        this.bookings = res.data || []
        this.bookingMeta = res.meta || this.bookingMeta
        return res
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateBookingStatus(id, status) {
      const res = await adminService.updateBookingStatus(id, status)
      const target = this.bookings.find(b => b.id === id)
      if (target) target.status = status
      return res
    },

    // ---------------- Payments ----------------
    async fetchPayments(params = {}) {
      this.loading = true
      try {
        const res = await adminService.getPayments(params)
        this.payments = res.data || []
        this.paymentMeta = res.meta || this.paymentMeta
        return res
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async refundPayment(id, reason = '') {
      const res = await adminService.refundPayment(id, reason)
      const target = this.payments.find(p => p.id === id)
      if (target) {
        target.status = 'Refunded'
        target.refundAmount = target.amount
      }
      return res
    },

    // ---------------- Invoices ----------------
    async fetchInvoices(params = {}) {
      this.loading = true
      try {
        const res = await adminService.getInvoices(params)
        this.invoices = Array.isArray(res) ? res : res.data || []
        return this.invoices
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async addInvoice(data) {
      const res = await adminService.createInvoice(data)
      await this.fetchInvoices()
      return res
    },

    // ---------------- Agents ----------------
    async fetchAgents(params = {}) {
      this.loading = true
      try {
        const res = await adminService.getAgents(params)
        this.agents = res.data || []
        this.agentMeta = res.meta || this.agentMeta
        return res
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async addAgent(data) {
      const res = await adminService.createAgent(data)
      await this.fetchAgents()
      return res
    },

    // ---------------- Coupons ----------------
    async fetchCoupons(params = {}) {
      this.loading = true
      try {
        const res = await adminService.getCoupons(params)
        this.coupons = Array.isArray(res) ? res : res.data || []
        return this.coupons
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async addCoupon(data) {
      const res = await adminService.createCoupon(data)
      await this.fetchCoupons()
      return res
    },

    async removeCoupon(id) {
      const res = await adminService.deleteCoupon(id)
      this.coupons = this.coupons.filter(c => c.id !== id)
      return res
    },

    // ---------------- Notifications ----------------
    async fetchNotifications(params = {}) {
      this.loading = true
      try {
        const res = await adminService.getNotifications(params)
        this.notifications = Array.isArray(res) ? res : res.data || []
        return this.notifications
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async sendNotification(data) {
      const res = await adminService.sendNotification(data)
      await this.fetchNotifications()
      return res
    },

    // ---------------- Reviews ----------------
    async fetchReviews(params = {}) {
      this.loading = true
      try {
        const res = await adminService.getReviews(params)
        this.reviews = Array.isArray(res) ? res : res.data || []
        return this.reviews
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async removeReview(id) {
      const res = await adminService.deleteReview(id)
      this.reviews = this.reviews.filter(r => r.id !== id)
      return res
    },

    // ---------------- Reports ----------------
    async fetchReports(params = {}) {
      this.loading = true
      try {
        const res = await adminService.getReports(params)
        this.reports = res
        return res
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // ---------------- Settings ----------------
    async fetchSettings() {
      this.loading = true
      try {
        const res = await adminService.getSettings()
        this.settings = res || {}
        return this.settings
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async saveSettings(data) {
      const res = await adminService.updateSettings(data)
      this.settings = { ...this.settings, ...data }
      return res
    },

    // ---------------- Profile ----------------
    async fetchProfile() {
      this.loading = true
      try {
        const res = await adminService.getProfile()
        this.profile = res || {}
        return this.profile
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async saveProfile(data) {
      const res = await adminService.updateProfile(data)
      this.profile = { ...this.profile, ...data }
      return res
    },

    async updatePassword(data) {
      return await adminService.changePassword(data)
    }
  }
})

export default useAdminStore
