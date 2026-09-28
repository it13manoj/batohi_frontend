import api from '@/config/api'

export const vehicleTypeService = {
  async getAll() {
    try {
      const res = await api.get('/vehicleType/vehicle-types')
      return res.data?.data || res.data || []
    } catch (e) {
      const adminRes = await api.get('/admin/vehicle-types')
      return adminRes.data?.data || adminRes.data || []
    }
  },

  async getActive() {
    try {
      const res = await api.get('/vehicleType/active')
      return res.data?.data || res.data || []
    } catch (e) {
      const all = await this.getAll()
      return all.filter(t => (t.status || '').toLowerCase() === 'active')
    }
  },

  async create(data) {
    const res = await api.post('/vehicleType/create', data)
    return res.data?.data || res.data
  },

  async update(id, data) {
    try {
      const res = await api.put(`/vehicleType/update/${id}`, data)
      return res.data?.data || res.data
    } catch {
      const adminRes = await api.put(`/admin/vehicle-types/${id}`, data)
      return adminRes.data?.data || adminRes.data
    }
  },

  async updateStatus(id, status) {
    const normalized =
      (status || '').toLowerCase() === 'inactive' ? 'inactive' : 'active'
    try {
      const res = await api.patch(`/vehicleType/status/${id}`, {
        status: normalized
      })
      return res.data?.data || res.data
    } catch {
      const adminRes = await api.patch(`/admin/vehicle-types/${id}/status`, {
        status: normalized
      })
      return adminRes.data?.data || adminRes.data
    }
  },

  async toggleStatus(id) {
    try {
      const res = await api.patch(`/vehicleType/toggle-status/${id}`, {})
      return res.data?.data || res.data
    } catch {
      const adminRes = await api.patch(`/admin/vehicle-types/${id}/status`, {})
      return adminRes.data?.data || adminRes.data
    }
  },

  async delete(id) {
    try {
      const res = await api.delete(`/vehicleType/delete/${id}`)
      return res.data
    } catch {
      const adminRes = await api.delete(`/admin/vehicle-types/${id}`)
      return adminRes.data
    }
  }
}

export default vehicleTypeService
