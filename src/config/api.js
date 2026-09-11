import axios from 'axios'
import { LocalStorage, SessionStorage } from 'quasar'

// const BASE_URL = 'https://api.batohidriver.com/api/v1'
const BASE_URL = 'https://api.batohidriver.com/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000
})

// Endpoints that do NOT require an Authorization token
const PUBLIC_ENDPOINTS = [
  '/users/', // Login / public users endpoint
  '/users/create', // Registration
  '/users/login', // Alternative login route
  '/users/register' // Alternative registration route
]

api.interceptors.request.use(
  config => {
    // Standardize URL path checking
    const requestPath = config.url ? config.url.toLowerCase() : ''
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some(endpoint =>
      requestPath.endsWith(endpoint.toLowerCase())
    )

    // Retrieve token from Quasar Storage with native fallback
    const token =
      LocalStorage.getItem('token') ||
      SessionStorage.getItem('token') ||
      localStorage.getItem('token') ||
      sessionStorage.getItem('token')

    config.headers = config.headers || {}

    // Only attach Authorization header if endpoint is NOT in the public list
    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete config.headers.Authorization
    }

    // Handle Content-Type header dynamically
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    } else {
      config.headers['Content-Type'] = 'application/json'
    }

    return config
  },
  error => Promise.reject(error)
)

export default api

// export const imagesBaseUrl = 'https://api.batohidriver.com/uploads'
export const imagesBaseUrl = 'https://api.batohidriver.com/uploads'
