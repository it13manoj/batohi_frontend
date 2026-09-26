import api from '@/config/api'

export const notificationService = {
  async getAll() {
    const res = await api.get('/admin/notifications')
    return res.data?.data || res.data || []
  },

  async send(data) {
    const res = await api.post('/admin/notifications/send', data)
    return res.data?.data || res.data
  }
}

export default notificationService
