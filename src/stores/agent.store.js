import { defineStore } from 'pinia'

import agentService from '@/services/agent.service'

export const useAgentStore = defineStore('agent', {
  state: () => ({
    profile: null,

    dashboard: null,

    vehicles: [],

    bookings: [],

    drivers: [],

    earnings: null,

    reports: [],

    loading: false,

    error: null
  }),

  getters: {
    totalVehicles: state => state.vehicles.length,

    totalBookings: state => state.bookings.length
  },

  actions: {
    // ======================================
    // PROFILE
    // ======================================

    async fetchProfile() {
      this.loading = true

      try {
        const response = await agentService.getProfile()

        this.profile = response.data?.data || response.data
      } catch (error) {
        this.error = error

        throw error
      } finally {
        this.loading = false
      }
    },

    // ======================================
    // DASHBOARD
    // ======================================

    async fetchDashboard() {
      this.loading = true

      try {
        const response = await agentService.getDashboard()

        this.dashboard = response.data?.data || response.data
      } catch (error) {
        this.error = error

        throw error
      } finally {
        this.loading = false
      }
    },

    // ======================================
    // VEHICLES
    // ======================================

    async fetchVehicles(params = {}) {
      this.loading = true

      try {
        const response = await agentService.getVehicles(params)

        this.vehicles = response.data?.data || response.data || []
      } catch (error) {
        this.error = error

        throw error
      } finally {
        this.loading = false
      }
    },

    // ======================================
    // BOOKINGS
    // ======================================

    async fetchBookings(params = {}) {
      this.loading = true

      try {
        const response = await agentService.getBookings(params)

        this.bookings = response.data?.data || response.data || []
      } catch (error) {
        this.error = error

        throw error
      } finally {
        this.loading = false
      }
    },

    // ======================================
    // DRIVERS
    // ======================================

    async fetchDrivers(params = {}) {
      this.loading = true

      try {
        const response = await agentService.getDrivers(params)

        this.drivers = response.data?.data || response.data || []
      } catch (error) {
        this.error = error

        throw error
      } finally {
        this.loading = false
      }
    },

    // ======================================
    // EARNINGS
    // ======================================

    async fetchEarnings(params = {}) {
      this.loading = true

      try {
        const response = await agentService.getEarnings(params)

        this.earnings = response.data?.data || response.data
      } catch (error) {
        this.error = error

        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
