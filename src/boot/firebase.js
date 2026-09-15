import { initializeApp } from 'firebase/app'
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported
} from 'firebase/messaging'
import { Capacitor } from '@capacitor/core'
import { Notify } from 'quasar'

const firebaseConfig = {
  apiKey: 'AIzaSyDv2kkZPznQon9G833Ola1mJ-If9W6-Er4',
  authDomain: 'Ybatohi-driver.firebaseapp.com',
  projectId: 'batohi-driver',
  storageBucket: 'batohi-driver.firebasestorage.app',
  messagingSenderId: '317124968447',
  appId: '1:317124968447:web:20d63dfe2e92c7a18bb1ca'
}

const app = initializeApp(firebaseConfig)

// 2. Safely initialize Web Messaging only if supported and NOT on native Android/iOS
let messaging = null

// Use an IIFE or async setup to verify browser support before initializing
isSupported()
  .then(supported => {
    if (
      supported &&
      !Capacitor.isNativePlatform() &&
      typeof window !== 'undefined' &&
      'Notification' in window
    ) {
      messaging = getMessaging(app)

      // Listen for foreground messages on web
      onMessage(messaging, payload => {
        console.log('Foreground notification received: ', payload)

        Notify.create({
          message: payload.notification?.title || 'Notification',
          caption: payload.notification?.body || '',
          color: 'primary',
          position: 'top-right'
        })
      })
    } else {
      console.warn(
        'Firebase Web Messaging is not supported or running on native mobile.'
      )
    }
  })
  .catch(err => {
    console.error('Error checking messaging support:', err)
  })

// 3. Platform-safe request notification function
export async function requestNotificationPermission() {
  // Return early if running on Native Android/iOS (WebView doesn't support Web Notification API)
  if (Capacitor.isNativePlatform()) {
    console.log(
      'Native mobile platform detected. Skipping Web Push permission.'
    )
    return null
  }

  // Safety check for browser environments missing Notification API
  if (
    typeof window === 'undefined' ||
    !('Notification' in window) ||
    !messaging
  ) {
    console.warn('Web Notifications are not supported in this environment.')
    return null
  }

  try {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey:
          'BJm2bYo-OoP3HfUaF9ICjD-ZxoAQqDdWc4ogznMvcKh3uhPGXjtMwMexh2uk52R735P7NbxGlWC6q24djMzSH7Y'
      })
      console.log('FCM Device Token:', token)
      return token
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error)
  }

  return null
}

export { messaging }
