import { boot } from 'quasar/wrappers'
import api from '@/config/api'

export default boot(() => {
  let watchId = null

  const startBackgroundTracking = () => {
    if (watchId !== null) return

    if (!navigator.geolocation) {
      console.warn('❌ Geolocation is not supported by this browser.')
      return
    }

    console.log('🚀 Starting continuous background location watcher...')

    watchId = navigator.geolocation.watchPosition(
      async position => {
        const token = localStorage.getItem('token')
        if (!token) {
          return
        }

        const { latitude, longitude, accuracy } = position.coords

        // Increased threshold from 150 to 500 meters so 381m (and similar) won't be skipped
        if (accuracy > 500) {
          console.warn(`⚠️ Skipping very coarse location. Accuracy radius: ${Math.round(accuracy)}m`)
          return
        }

        try {
          await api.post('/users/update-location', {
            latitude,
            longitude
          })
          console.log(`🌐 Background Location Auto-Synced -> Lat: ${latitude}, Lng: ${longitude} (Accuracy: ${Math.round(accuracy)}m)`)
        } catch (err) {
          console.error('❌ Background Location API Error:', err.response?.data || err.message)
        }
      },
      error => {
        console.error(`❌ Geolocation Hardware Error Code ${error.code}: ${error.message}`)
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0
      }
    )
  }

  setInterval(() => {
    const token = localStorage.getItem('token')
    if (token && watchId === null) {
      startBackgroundTracking()
    } else if (!token && watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      watchId = null
      console.log('🔒 User logged out. Background location tracking paused.')
    }
  }, 10000)

  if (localStorage.getItem('token')) {
    startBackgroundTracking()
  }
})
