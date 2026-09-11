import { ref } from 'vue'
import { LocalStorage, SessionStorage } from 'quasar'
import api from '@/config/api'

const profile = ref(null)
const loading = ref(false)

// Helper function to remove token from all storage locations
const clearAuthData = () => {
  LocalStorage.remove('token')
  SessionStorage.remove('token')
  profile.value = null
}

const decodeJwt = token => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    console.error('Error decoding JWT token:', e)
    return null
  }
}

const getProfile = async () => {
  // Retrieve token from either LocalStorage or SessionStorage
  const token = LocalStorage.getItem('token') || SessionStorage.getItem('token')

  console.log(decodeJwt(token))

  if (!token) {
    clearAuthData()
    return null
  }

  if (decodeJwt(token)?.type != 'USERS') return

  try {
    loading.value = true

    const response = await api.get('/users/profile')
    profile.value = response.data.data

    console.log('Profile:', profile.value)
    return profile.value
  } catch (error) {
    console.error('Profile API error:', error)

    // Clear storage if expired (401) or forbidden (403)
    if (error.response?.status === 401 || error.response?.status === 403) {
      clearAuthData()
    }

    return null
  } finally {
    loading.value = false
  }
}

const logout = () => {
  clearAuthData()
}

export const useAuth = () => {
  return {
    profile,
    loading,
    getProfile,
    logout,
    decodeJwt
  }
}
