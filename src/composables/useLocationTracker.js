import { ref, onUnmounted } from 'vue'
import api from '@/config/api'

export function useLocationTracker() {
  const watchId = ref(null)

  const startTracking = () => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported.')
      return
    }

    watchId.value = navigator.geolocation.watchPosition(
      async position => {
        const { latitude, longitude } = position.coords

        try {
          await api.post('/users/update-location', {
            latitude,
            longitude
          })
        } catch (err) {
          console.error('Error updating live location:', err)
        }
      },
      error => console.error('Geolocation Tracking Error:', error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000
      }
    )
  }

  const stopTracking = () => {
    if (watchId.value !== null) {
      navigator.geolocation.clearWatch(watchId.value)
      watchId.value = null
    }
  }

  onUnmounted(() => {
    stopTracking()
  })

  return { startTracking, stopTracking }
}
