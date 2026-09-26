import { jwtDecode } from 'jwt-decode'
import { LocalStorage, SessionStorage } from 'quasar'
import api from '@/config/api'

export const decodeToken = token => {
  if (!token) return null
  try {
    return jwtDecode(token)
  } catch (error) {
    try {
      // Manual fallback base64 decode
      const base64Url = token.split('.')[1]
      if (!base64Url) return null
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      return JSON.parse(
        decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
      )
    } catch (e) {
      return null
    }
  }
}

export const getToken = () => {
  return (
    LocalStorage.getItem('token') ||
    SessionStorage.getItem('token') ||
    localStorage.getItem('token') ||
    sessionStorage.getItem('token') ||
    null
  )
}

export const isTokenValid = token => {
  const t = token || getToken()
  if (!t) return false
  const decoded = decodeToken(t)
  if (!decoded) {
    // If token is a mock/demo token in local development
    if (typeof t === 'string' && t.startsWith('demo-')) return true
    return false
  }
  if (!decoded.exp) return true // Token without exp is valid
  // Exp is in seconds; Date.now() is in milliseconds
  return decoded.exp * 1000 > Date.now()
}

export const getUserRole = token => {
  const t = token || getToken()
  let role = ''
  if (t) {
    const decoded = decodeToken(t)
    if (decoded) {
      role = decoded.type || decoded.role || decoded.user_type || ''
    }
  }
  if (!role) {
    try {
      const user = JSON.parse(
        localStorage.getItem('user') || sessionStorage.getItem('user') || '{}'
      )
      role = user.role || user.user_type || user.type || ''
    } catch (e) {
      // ignore
    }
  }
  if (!role) {
    role = localStorage.getItem('role') || sessionStorage.getItem('role') || ''
  }
  return String(role).toUpperCase()
}

export const getDashboardRoute = role => {
  const r = (role || getUserRole()).toUpperCase()
  if (r === 'ADMIN') return '/admin/dashboard'
  if (r === 'DRIVER') {
    // Check if onboarding is completed
    const onboarding = localStorage.getItem('driver_onboarding_state')
    if (onboarding) {
      try {
        const parsed = JSON.parse(onboarding)
        if (parsed.isVerified || parsed.verificationStatus === 'verified') {
          return '/driver/dashboard'
        }
      } catch (e) {
        // ignore
      }
    }
    return '/driver/profile'
  }
  if (r === 'AGENT' || r === 'AGENTS') return '/agent/dashboard'
  return '/customer/dashboard'
}

export const saveAuthSession = (token, user, remember = true) => {
  // Always store in localStorage so long-lived sessions survive tab/browser restarts
  localStorage.setItem('token', token)
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  }
  if (user?.role || user?.user_type) {
    localStorage.setItem('role', (user.role || user.user_type).toLowerCase())
  }
  if (remember) {
    sessionStorage.setItem('token', token)
    if (user) sessionStorage.setItem('user', JSON.stringify(user))
    if (user?.role || user?.user_type) {
      sessionStorage.setItem(
        'role',
        (user.role || user.user_type).toLowerCase()
      )
    }
  }
  localStorage.setItem('session_created_at', String(Date.now()))

  if (
    api &&
    api.defaults &&
    api.defaults.headers &&
    api.defaults.headers.common
  ) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export const clearAuthSession = () => {
  const keysToRemove = [
    'token',
    'accessToken',
    'user',
    'driver',
    'agent',
    'role',
    'auth',
    'driver_id',
    'driverId',
    'driverResetEmail',
    'driverResetToken',
    'driverOtpVerified',
    'session_created_at',
    'otpVerified',
    'pendingAuthEmail',
    'pendingAuthUserId',
    'driver_onboarding_state'
  ]

  keysToRemove.forEach(k => {
    try {
      localStorage.removeItem(k)
      sessionStorage.removeItem(k)
    } catch (e) {}
  })

  try {
    sessionStorage.clear()
  } catch (e) {}

  try {
    LocalStorage.remove('token')
    LocalStorage.remove('user')
    LocalStorage.remove('role')
    SessionStorage.remove('token')
    SessionStorage.remove('user')
    SessionStorage.remove('role')
  } catch (e) {}

  if (
    api &&
    api.defaults &&
    api.defaults.headers &&
    api.defaults.headers.common
  ) {
    delete api.defaults.headers.common['Authorization']
  }
}
