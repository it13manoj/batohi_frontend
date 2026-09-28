import api from '@/config/api'

export const vehicleService = {
  async getAll(params = {}) {
    const res = await api.get('/admin/vehicles', { params })
    return res.data?.data || res.data || []
  },

  async getById(id) {
    const res = await api.get(`/vehicle/find?id=${id}`)
    return res.data?.data || res.data
  },

  async getByDriver() {
    const res = await api.get('/vehicle/findBydriver')
    return res.data?.data || res.data
  },

  async create(data) {
    const res = await api.post('/vehicle/create', data)
    return res.data?.data || res.data
  }
}

export default vehicleService
