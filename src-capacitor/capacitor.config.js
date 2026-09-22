const { defineCapacitorConfig } = require('@quasar/app-vite/capacitor');

module.exports = defineCapacitorConfig({
  appId: 'com.batohi.app',
  appName: 'Batohi App',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: false // Bypasses browser WebView CORS restrictions on native Android
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
});
