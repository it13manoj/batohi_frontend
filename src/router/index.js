import { defineRouter } from '#q-app'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import routes from './routes.js'
import {
  isTokenValid,
  getUserRole,
  getDashboardRoute,
  clearAuthSession
} from '@/utils/auth.js'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE)
  })

  // Global Navigation Guard: Preserve 1-month session and prevent redirect to login if authenticated
  Router.beforeEach((to, from, next) => {
    // If explicit logout query param is present, force clear session immediately
    if (to.query.logout === 'true' || to.query.logged_out === 'true') {
      clearAuthSession()
      return next()
    }

    const valid = isTokenValid()

    const authPaths = [
      '/',
      '/login',
      '/driver-login',
      '/admin/login',
      '/register',
      '/driver-register',
      '/forgot-password',
      '/driver-forgot-password',
      '/reset-password',
      '/driver-reset-password'
    ]

    // 1. If user is ALREADY authenticated with a valid non-expired token (valid for 1 month)
    if (valid) {
      // Do not allow access to login/auth pages; redirect to their panel directly
      if (authPaths.includes(to.path)) {
        const role = getUserRole()
        const target = getDashboardRoute(role)
        return next(target)
      }
      return next()
    }

    // 2. If token exists but is expired, clear stale session
    const rawToken =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    if (rawToken && !valid) {
      clearAuthSession()
    }

    // 3. Protected route check
    const isProtected =
      to.path.startsWith('/customer') ||
      (to.path.startsWith('/driver') &&
        !to.path.includes('login') &&
        !to.path.includes('register') &&
        !to.path.includes('forgot') &&
        !to.path.includes('reset') &&
        !to.path.includes('verify')) ||
      (to.path.startsWith('/admin') && to.path !== '/admin/login') ||
      to.path.startsWith('/agent')

    if (isProtected && !valid) {
      if (to.path.startsWith('/admin')) {
        return next('/admin/login')
      } else if (to.path.startsWith('/driver')) {
        return next('/driver-login')
      } else {
        return next('/')
      }
    }

    next()
  })

  return Router
})
