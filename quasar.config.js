import { defineConfig } from '#q-app'

export default defineConfig((/* ctx */) => {
  return {
    boot: ['firebase', 'location-tracker'],

    css: ['app.scss'],

    extras: ['material-icons'],

    build: {
      vueRouterMode: 'history'
    },

    devServer: {
      open: true
    },

    framework: {
      config: {},
      plugins: ['Notify', 'Dialog']
    },

    animations: [],

    ssr: {
      prodPort: 3000,
      middlewares: ['render']
    },

    ssg: {},

    pwa: {
      workboxMode: 'GenerateSW'
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'batohi-main'
      }
    },

    bex: {
      extraScripts: []
    }
  }
})
