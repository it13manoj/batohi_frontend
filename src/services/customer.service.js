import api from '@/config/api'

export const customerService = {
  async getProfile() {
    const res = await api.get('/users/profile')
    return res.data?.data || res.data
  },

  async updateProfile(formData) {
    const res = await api.post('/users/profile', formData)
    return res.data?.data || res.data
  },

  async getMyBookings() {
    const res = await api.get('/booking/allrides')
    return res.data?.data || res.data || []
  }
}

export default customerService
