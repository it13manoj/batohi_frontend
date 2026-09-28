import api from '@/config/api'

export const reviewService = {
  async getAll() {
    const res = await api.get('/admin/reviews')
    return res.data?.data || res.data || []
  },

  async create(data) {
    const res = await api.post('/review/create', data)
    return res.data?.data || res.data
  },

  async delete(id) {
    const res = await api.delete(`/admin/reviews/${id}`)
    return res.data
  }
}

export default reviewService
