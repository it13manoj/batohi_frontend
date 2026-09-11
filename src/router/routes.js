const routes = [
  // =========================
  // MAIN APPLICATION
  // =========================

  // =========================
  // AUTHENTICATION
  // =========================
  {
    path: '/',
    component: () => import('@/layouts/AuthLayout.vue'),

    children: [
      // Login
      {
        path: '',
        component: () => import('@/pages/auth/LoginPage.vue')
      },

      {
        path: 'driver-login',
        component: () => import('@/pages/auth/DriverLoginPage.vue')
      },

      // Register
      {
        path: 'register',
        component: () => import('@/pages/auth/RegisterPage.vue')
      },

      {
        path: 'driver-register',
        component: () => import('@/pages/auth/DriverRegisterpage.vue')
      },

      // Forgot Password
      {
        path: 'forgot-password',
        component: () => import('@/pages/auth/ForgotPasswordPage.vue')
      },

      {
        path: 'driver-forgot-password',
        component: () => import('@/pages/auth/driver/ForgotPasswordPage.vue')
      },

      // Reset Password
      {
        path: 'reset-password',
        component: () => import('@/pages/auth/ResetPasswordPage.vue')
      },
      {
        path: 'driver-reset-password',
        component: () => import('@/pages/auth/driver/ResetPasswordPage.vue')
      },

      // Verify OTP
      {
        path: 'verify-otp',
        component: () => import('@/pages/auth/VerifyOtpPage.vue')
      },
      {
        path: 'driver-verify-otp',
        component: () => import('@/pages/auth/driver/VerifyOtpPage.vue')
      }
    ]
  },
  // =====================================================
  // CUSTOMER ROUTES
  // =====================================================

  {
    path: '/customer',

    component: () => import('@/layouts/CustomerLayout.vue'),

    children: [
      // -------------------------------------------------
      // Customer Default
      // /customer
      // → /customer/dashboard
      // -------------------------------------------------

      {
        path: '',
        redirect: {
          name: 'customer-dashboard'
        }
      },

      // -------------------------------------------------
      // Dashboard
      // /customer/dashboard
      // -------------------------------------------------

      {
        path: 'dashboard',
        name: 'customer-dashboard',
        component: () => import('@/pages/customer/DashboardPage.vue')
      },

      // -------------------------------------------------
      // Search Vehicle
      // /customer/search-vehicle
      // -------------------------------------------------

      {
        path: 'vehicle-type',
        name: 'vehicle-type',
        component: () => import('@/pages/customer/VehicleType.vue')
      },

      {
        path: 'search-vehicle',
        name: 'customer-search-vehicle',
        component: () => import('@/pages/customer/SearchVehiclePage.vue')
      },

      // -------------------------------------------------
      // Vehicle Details
      // /customer/vehicle-details
      // -------------------------------------------------

      {
        path: 'vehicle-details',
        name: 'customer-vehicle-details',
        component: () => import('@/pages/customer/VehicleDetailsPage.vue')
      },

      // -------------------------------------------------
      // Booking
      // /customer/booking
      // -------------------------------------------------

      {
        path: 'booking',
        name: 'customer-booking',
        component: () => import('@/pages/customer/BookingPage.vue')
      },

      // -------------------------------------------------
      // My Bookings
      // /customer/my-bookings
      // -------------------------------------------------

      {
        path: 'my-bookings',
        name: 'customer-my-bookings',
        component: () => import('@/pages/customer/MyBookingsPage.vue')
      },

      // -------------------------------------------------
      // Booking Details
      // /customer/booking-details
      // -------------------------------------------------

      {
        path: 'booking-details',
        name: 'customer-booking-details',
        component: () => import('@/pages/customer/BookingDetailsPage.vue')
      },

      // -------------------------------------------------
      // Invoices
      // /customer/invoices
      // -------------------------------------------------

      {
        path: 'invoices',
        name: 'customer-invoices',
        component: () => import('@/pages/customer/InvoicesPage.vue')
      },

      // -------------------------------------------------
      // Payments
      // /customer/payments
      // -------------------------------------------------

      {
        path: 'payments',
        name: 'customer-payments',
        component: () => import('@/pages/customer/PaymentsPage.vue')
      },

      // -------------------------------------------------
      // Profile
      // /customer/profile
      // -------------------------------------------------

      {
        path: 'profile',
        name: 'customer-profile',
        component: () => import('@/pages/customer/ProfilePage.vue')
      },

      // -------------------------------------------------
      // Notifications
      // /customer/notifications
      // -------------------------------------------------

      {
        path: 'notifications',
        name: 'customer-notifications',
        component: () => import('@/pages/customer/NotificationsPage.vue')
      },

      {
        path: 'faq',
        name: 'customer-faq',
        component: () => import('@/pages/customer/FaqPage.vue')
      },

      {
        path: 'terms-and-conditions',
        name: 'customer-terms',
        component: () => import('@/pages/customer/TermsAndConditionsPage.vue')
      },

      {
        path: 'privacy-policy',
        name: 'customer-privacy-policy',
        component: () => import('@/pages/customer/PrivacyPolicyPage.vue')
      },

      {
        path: 'cancellation-policy',
        name: 'customer-cancellation-policy',
        component: () => import('@/pages/customer/CancellationPolicyPage.vue')
      },

      {
        path: 'refund-policy',
        name: 'customer-refund-policy',
        component: () => import('@/pages/customer/RefundPolicyPage.vue')
      },

      {
        path: 'about-us',
        name: 'customer-about-us',
        component: () => import('@/pages/customer/AboutUsPage.vue')
      }
    ]
  },

  // =====================================================
  // ADMIN PANEL
  // =====================================================
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),

    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },

      // Dashboard
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/pages/admin/DashboardPage.vue')
      },

      {
        path: 'customers',
        name: 'admin-customers',
        component: () => import('@/pages/admin/CustomersPage.vue')
      },

      {
        path: 'vehicles',
        name: 'admin-vehicles',
        component: () => import('@/pages/admin/VehiclesPage.vue')
      },

      {
        path: 'bookings',
        name: 'admin-bookings',
        component: () => import('@/pages/admin/BookingsPage.vue')
      },

      {
        path: 'payments',
        name: 'admin-payments',
        component: () => import('@/pages/admin/PaymentsPage.vue')
      },

      {
        path: 'invoices',
        name: 'admin-invoices',
        component: () => import('@/pages/admin/InvoicesPage.vue')
      },

      {
        path: 'drivers',
        name: 'admin-drivers',
        component: () => import('@/pages/admin/DriversPage.vue')
      },

      {
        path: 'agents',
        name: 'admin-agents',
        component: () => import('@/pages/admin/AgentsPage.vue')
      },

      {
        path: 'vehicle-types',
        name: 'admin-vehicle-types',
        component: () => import('@/pages/admin/VehicleTypesPage.vue')
      },

      {
        path: 'coupons',
        name: 'admin-coupons',
        component: () => import('@/pages/admin/CouponsPage.vue')
      },

      {
        path: 'notifications',
        name: 'admin-notifications',
        component: () => import('@/pages/admin/NotificationsPage.vue')
      },

      {
        path: 'reviews',
        name: 'admin-reviews',
        component: () => import('@/pages/admin/ReviewsPage.vue')
      },

      {
        path: 'reports',
        name: 'admin-reports',
        component: () => import('@/pages/admin/ReportsPage.vue')
      },

      {
        path: 'settings',
        name: 'admin-settings',
        component: () => import('@/pages/admin/SettingsPage.vue')
      },

      {
        path: 'profile',
        name: 'admin-profile',
        component: () => import('@/pages/admin/AdminProfilePage.vue')
      },

      {
        path: 'faq',
        name: 'admin-faq',
        component: () => import('@/pages/admin/FaqPage.vue')
      },

      {
        path: 'terms-and-conditions',
        name: 'admin-terms',
        component: () => import('@/pages/admin/TermsAndConditionsPage.vue')
      },

      {
        path: 'privacy-policy',
        name: 'admin-privacy-policy',
        component: () => import('@/pages/admin/PrivacyPolicyPage.vue')
      },

      {
        path: 'cancellation-policy',
        name: 'admin-cancellation-policy',
        component: () => import('@/pages/admin/CancellationPolicyPage.vue')
      },

      {
        path: 'refund-policy',
        name: 'admin-refund-policy',
        component: () => import('@/pages/admin/RefundPolicyPage.vue')
      },

      {
        path: 'about-us',
        name: 'admin-about-us',
        component: () => import('@/pages/admin/AboutUsPage.vue')
      }
    ]
  },

  // =====================================================
  // AGENT PANEL
  // =====================================================

  {
    path: '/agent',

    component: () => import('@/layouts/AgentLayout.vue'),

    meta: {
      requiresAuth: true,
      roles: ['agent']
    },

    children: [
      {
        path: '',
        redirect: '/agent/dashboard'
      },

      {
        path: 'dashboard',
        name: 'agent-dashboard',
        component: () => import('@/pages/agent/DashboardPage.vue')
      },

      {
        path: 'profile',
        name: 'agent-profile',
        component: () => import('@/pages/agent/ProfilePage.vue')
      },

      {
        path: 'vehicles',
        name: 'agent-vehicles',
        component: () => import('@/pages/agent/VehiclesPage.vue')
      },

      {
        path: 'vehicles/add',
        name: 'agent-add-vehicle',
        component: () => import('@/pages/agent/AddVehiclePage.vue')
      },

      {
        path: 'vehicles/:id/edit',
        name: 'agent-edit-vehicle',
        component: () => import('@/pages/agent/EditVehiclePage.vue')
      },

      {
        path: 'vehicle-bookings',
        name: 'agent-vehicle-bookings',
        component: () => import('@/pages/agent/VehicleBookingsPage.vue')
      },

      {
        path: 'drivers',
        name: 'agent-drivers',
        component: () => import('@/pages/agent/DriversPage.vue')
      },

      {
        path: 'earnings',
        name: 'agent-earnings',
        component: () => import('@/pages/agent/EarningsPage.vue')
      },

      {
        path: 'reports',
        name: 'agent-reports',
        component: () => import('@/pages/agent/ReportsPage.vue')
      },

      {
        path: 'faq',
        name: 'AgentFAQ',
        component: () => import('@/pages/agent/FaqPage.vue')
      },

      {
        path: 'terms-and-conditions',
        name: 'AgentTermsAndConditions',
        component: () => import('@/pages/agent/TermsAndConditionsPage.vue')
      },

      {
        path: 'privacy-policy',
        name: 'AgentPrivacyPolicy',
        component: () => import('@/pages/agent/PrivacyPolicyPage.vue')
      },

      {
        path: 'cancellation-policy',
        name: 'AgentCancellationPolicy',
        component: () => import('@/pages/agent/CancellationPolicyPage.vue')
      },

      {
        path: 'refund-policy',
        name: 'AgentRefundPolicy',
        component: () => import('@/pages/agent/RefundPolicyPage.vue')
      },

      {
        path: 'about-us',
        name: 'AgentAboutUs',
        component: () => import('@/pages/agent/AboutUsPage.vue')
      }
    ]
  },

  // =====================================================
  // Driver PANEL
  // =====================================================

  {
    path: '/driver',
    component: () => import('@/layouts/DriverLayout.vue'),

    children: [
      {
        path: '',
        redirect: '/driver/dashboard'
      },

      {
        path: 'dashboard',
        name: 'DriverDashboard',
        component: () => import('@/pages/driver/DashboardPage.vue')
      },

      {
        path: 'assigned-trips',
        name: 'DriverAssignedTrips',
        component: () => import('@/pages/driver/AssignedTripsPage.vue')
      },
      {
        path: 'vehicle-type',
        name: 'VehicleType',
        component: () => import('@/pages/driver/VehicleType.vue')
      },
      {
        path: 'vehicle',
        name: 'Vehicle',
        component: () => import('@/pages/driver/VehicleManager.vue')
      },
      {
        path: 'earnings',
        name: 'DriverEarnings',
        component: () => import('@/pages/driver/EarningsPage.vue')
      },

      {
        path: 'profile',
        name: 'DriverProfile',
        component: () => import('@/pages/driver/ProfilePage.vue')
      },

      {
        path: 'trip-history',
        name: 'DriverTripHistory',
        component: () => import('@/pages/driver/TripHistoryPage.vue')
      },

      {
        path: 'trip/:id',
        name: 'DriverTripDetails',
        component: () => import('@/pages/driver/TripDetailsPage.vue')
      },
      {
        path: 'management',
        name: 'driver-management',
        component: () => import('@/pages/driver/ManagementPage.vue')
      },

      {
        path: 'notifications',
        name: 'DriverNotifications',
        component: () => import('@/pages/driver/NotificationPage.vue')
      },

      {
        path: 'faq',
        name: 'driver-faq',
        component: () => import('@/pages/driver/FaqPage.vue')
      },

      {
        path: 'terms-and-conditions',
        name: 'driver-terms',
        component: () => import('@/pages/driver/TermsAndConditionsPage.vue')
      },

      {
        path: 'privacy-policy',
        name: 'driver-privacy-policy',
        component: () => import('@/pages/driver/PrivacyPolicyPage.vue')
      },

      {
        path: 'cancellation-policy',
        name: 'driver-cancellation-policy',
        component: () => import('@/pages/driver/CancellationPolicyPage.vue')
      },

      {
        path: 'refund-policy',
        name: 'driver-refund-policy',
        component: () => import('@/pages/driver/RefundPolicyPage.vue')
      },

      {
        path: 'about-us',
        name: 'driver-about-us',
        component: () => import('@/pages/driver/AboutUsPage.vue')
      }
    ]
  },

  // =========================
  // 404 PAGE
  // =========================
  {
    path: '/:catchAll(.*)*',

    component: () => import('@/pages/ErrorNotFound.vue')
  }
]

export default routes
