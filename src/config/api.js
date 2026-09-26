import axios from 'axios'
import { LocalStorage, SessionStorage } from 'quasar'
import { Capacitor } from '@capacitor/core'

// const BASE_URL = 'https://api.batohidriver.com/api/v1'
const BASE_URL = 'http://localhost:3300/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000
})

// Force native fetch adapter on Android/iOS to bypass webview XHR CORS restrictions
if (Capacitor.isNativePlatform()) {
  api.defaults.adapter = 'fetch'
}

// Endpoints that do NOT require an Authorization token
const PUBLIC_ENDPOINTS = [
  '/users/login',
  '/users/create',
  '/users/register',
  '/users/verify-otp',
  '/users/verifyotp',
  '/users/resend-otp',
  '/driver/login',
  '/admin/login'
]

api.interceptors.request.use(
  config => {
    // Extract base pathname ignoring query params
    const requestUrl = config.url ? config.url.split('?')[0].toLowerCase() : ''

    // Flexible endpoint match
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some(endpoint =>
      requestUrl.includes(endpoint.toLowerCase())
    )

    // Retrieve token from Quasar Storage or native LocalStorage
    const token =
      LocalStorage.getItem('token') ||
      SessionStorage.getItem('token') ||
      localStorage.getItem('token') ||
      sessionStorage.getItem('token')

    config.headers = config.headers || {}

    // Only attach token if available and endpoint is NOT public
    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`
    } else if (isPublicEndpoint) {
      delete config.headers.Authorization
    }

    // Set Content-Type header dynamically
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    } else if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }

    return config
  },
  error => Promise.reject(error)
)

// Response interceptor: handle token expiration or unauthorized requests
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      const requestUrl = error.config?.url ? error.config.url.toLowerCase() : ''
      const isPublic = PUBLIC_ENDPOINTS.some(endpoint =>
        requestUrl.includes(endpoint.toLowerCase())
      )

      // If token is invalid on a protected endpoint, clean up session
      if (!isPublic) {
        console.warn(
          'API returned 401 Unauthorized for protected route. Session might be expired.'
        )
      }
    }
    return Promise.reject(error)
  }
)

export default api

// export const imagesBaseUrl = 'https://api.batohidriver.com/uploads'
export const imagesBaseUrl = 'http://localhost:3300/uploads'
