import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
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
const messaging = getMessaging(app)

export async function requestNotificationPermission() {
  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey:
        'BJm2bYo-OoP3HfUaF9ICjD-ZxoAQqDdWc4ogznMvcKh3uhPGXjtMwMexh2uk52R735P7NbxGlWC6q24djMzSH7Y' // Found in Firebase Console -> Project Settings -> Cloud Messaging
    })
    console.log('FCM Device Token:', token)
    // Send this token to your backend database to target this device
    return token
  }
}

// Handle incoming messages when the app is active in the foreground
onMessage(messaging, payload => {
  console.log('Foreground notification received: ', payload)

  // Show a Quasar toast notification
  Notify.create({
    message: payload.notification.title,
    caption: payload.notification.body,
    color: 'primary',
    position: 'top-right'
  })
})

export { messaging }
