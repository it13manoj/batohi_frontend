import axios from 'axios'
import { LocalStorage, SessionStorage } from 'quasar'
import { Capacitor } from '@capacitor/core'

const BASE_URL = 'https://api.batohidriver.com/api/v1'
// const BASE_URL = 'http://localhost:3300/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000
})

// Force native fetch adapter on Android/iOS to bypass webview XHR CORS restrictions
if (Capacitor.isNativePlatform()) {
  api.defaults.adapter = 'fetch'
}

// Endpoints that do NOT require an Authorization token
const PUBLIC_ENDPOINTS = ['/users/login', '/users/create', '/users/register']

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
    } else {
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

export default api

export const imagesBaseUrl = 'https://api.batohidriver.com/uploads'
// export const imagesBaseUrl = 'http://localhost:3300/uploads'
