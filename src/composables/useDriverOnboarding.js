import api from '@/config/api'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'batohi_driver_onboarding_state'

// Vehicle-Specific Subscription Configurations & Pricing Matrix
export const VEHICLE_CONFIG = {
  bike: {
    key: 'bike',
    label: 'Bike',
    icon: 'two_wheeler',
    badgeColor: 'blue-8',
    description: 'Motorcycle & Scooters for swift point-to-point transit',
    freeTrialAvailable: true,
    plans: [
      {
        id: 'bike_1m',
        name: 'Bike 1 Month',
        cycle: '1_month',
        durationLabel: '1 Month',
        baseMonths: 1,
        bonusDays: 0,
        bonusLabel: null,
        totalDays: 30,
        price: 800,
        description:
          'Standard 30-day pass for Bike drivers. 1st month free for all new drivers!',
        tag: null,
        featured: false
      },
      {
        id: 'bike_3m',
        name: 'Bike 3 Months',
        cycle: '3_months',
        durationLabel: '3 Months',
        baseMonths: 3,
        bonusDays: 15,
        bonusLabel: '+15 Days Always FREE',
        totalDays: 105,
        price: 2300,
        description:
          '90 days + 15 days always free bonus! Total 105 days validity.',
        tag: '+15 Days FREE',
        featured: false
      },
      {
        id: 'bike_6m',
        name: 'Bike 6 Months',
        cycle: '6_months',
        durationLabel: '6 Months',
        baseMonths: 6,
        bonusDays: 30,
        bonusLabel: '+1 Month Always FREE',
        totalDays: 210,
        price: 4500,
        description:
          '6 months + 1 full month always free! Total 7 months validity.',
        tag: '+1 Month FREE',
        featured: true
      },
      {
        id: 'bike_1y',
        name: 'Bike 1 Year',
        cycle: '1_year',
        durationLabel: '1 Year',
        baseMonths: 12,
        bonusDays: 90,
        bonusLabel: '+3 Months Always FREE',
        totalDays: 455,
        price: 8500,
        description:
          '12 months + 3 full months always free! Total 15 months validity.',
        tag: '+3 Months FREE',
        featured: false
      }
    ]
  },
  auto: {
    key: 'auto',
    label: 'Auto',
    icon: 'electric_rickshaw',
    badgeColor: 'amber-9',
    description: 'Auto Rickshaws for flexible urban transit',
    freeTrialAvailable: true,
    plans: [
      {
        id: 'auto_1m',
        name: 'Auto 1 Month',
        cycle: '1_month',
        durationLabel: '1 Month',
        baseMonths: 1,
        bonusDays: 0,
        bonusLabel: null,
        totalDays: 30,
        price: 1000,
        description:
          'Standard 30-day pass for Auto drivers. 1st month free for all new drivers!',
        tag: null,
        featured: false
      },
      {
        id: 'auto_3m',
        name: 'Auto 3 Months',
        cycle: '3_months',
        durationLabel: '3 Months',
        baseMonths: 3,
        bonusDays: 15,
        bonusLabel: '+15 Days Always FREE',
        totalDays: 105,
        price: 2800,
        description:
          '90 days + 15 days always free bonus! Total 105 days validity.',
        tag: '+15 Days FREE',
        featured: false
      },
      {
        id: 'auto_6m',
        name: 'Auto 6 Months',
        cycle: '6_months',
        durationLabel: '6 Months',
        baseMonths: 6,
        bonusDays: 30,
        bonusLabel: '+1 Month Always FREE',
        totalDays: 210,
        price: 5500,
        description:
          '6 months + 1 full month always free! Total 7 months validity.',
        tag: '+1 Month FREE',
        featured: true
      },
      {
        id: 'auto_1y',
        name: 'Auto 1 Year',
        cycle: '1_year',
        durationLabel: '1 Year',
        baseMonths: 12,
        bonusDays: 90,
        bonusLabel: '+3 Months Always FREE',
        totalDays: 455,
        price: 10000,
        description:
          '12 months + 3 full months always free! Total 15 months validity.',
        tag: '+3 Months FREE',
        featured: false
      }
    ]
  },
  car: {
    key: 'car',
    label: 'Car',
    icon: 'directions_car',
    badgeColor: 'primary',
    description: 'Sedans, Hatchbacks, Prime & SUV Cabs',
    freeTrialAvailable: true,
    plans: [
      {
        id: 'car_1m',
        name: 'Car 1 Month',
        cycle: '1_month',
        durationLabel: '1 Month',
        baseMonths: 1,
        bonusDays: 0,
        bonusLabel: null,
        totalDays: 30,
        price: 1200,
        description:
          'Standard 30-day pass for Car drivers. 1st month free for all new drivers!',
        tag: null,
        featured: false
      },
      {
        id: 'car_3m',
        name: 'Car 3 Months',
        cycle: '3_months',
        durationLabel: '3 Months',
        baseMonths: 3,
        bonusDays: 15,
        bonusLabel: '+15 Days Always FREE',
        totalDays: 105,
        price: 3500,
        description:
          '90 days + 15 days always free bonus! Total 105 days validity.',
        tag: '+15 Days FREE',
        featured: false
      },
      {
        id: 'car_6m',
        name: 'Car 6 Months',
        cycle: '6_months',
        durationLabel: '6 Months',
        baseMonths: 6,
        bonusDays: 30,
        bonusLabel: '+1 Month Always FREE',
        totalDays: 210,
        price: 6500,
        description:
          '6 months + 1 full month always free! Total 7 months validity.',
        tag: '+1 Month FREE',
        featured: true
      },
      {
        id: 'car_1y',
        name: 'Car 1 Year',
        cycle: '1_year',
        durationLabel: '1 Year',
        baseMonths: 12,
        bonusDays: 90,
        bonusLabel: '+3 Months Always FREE',
        totalDays: 455,
        price: 12500,
        description:
          '12 months + 3 full months always free! Total 15 months validity.',
        tag: '+3 Months FREE',
        featured: false
      }
    ]
  }
}

// Default Initial State
const getDefaultState = () => ({
  isProfileCompleted: false,
  profileStep: 1,
  vehicleCategory: 'bike', // 'bike' | 'auto' | 'car'
  freeTrialClaimed: false,
  subscription: {
    status: 'none', // 'none' | 'active' | 'expired'
    vehicleCategory: 'bike',
    planId: null,
    planName: null,
    price: 0,
    cycle: '1_month',
    durationLabel: '1 Month',
    baseMonths: 1,
    bonusDays: 0,
    totalDays: 30,
    bonusLabel: null,
    isFreeTrial: false,
    startDate: null,
    expiryDate: null,
    transactionId: null,
    paymentMethod: null
  },
  verificationStatus: 'not_submitted', // 'not_submitted' | 'pending' | 'verified' | 'rejected'
  verificationSubmittedAt: null,
  verificationApprovedAt: null,
  verificationNotes: '',
  documents: {
    aadhar: {
      name: 'Aadhaar Card',
      number: '',
      photo: null,
      status: 'pending'
    },
    pan: { name: 'PAN Card', number: '', photo: null, status: 'pending' },
    license: {
      name: 'Driving License',
      number: '',
      photo: null,
      status: 'pending'
    },
    insurance: {
      name: 'Vehicle Insurance',
      number: '',
      photo: null,
      status: 'pending'
    },
    vehicle: {
      name: 'Vehicle Details & RC',
      number: '',
      photo: null,
      status: 'pending'
    }
  }
})

// Load state from localStorage or initialize defaults
const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { ...getDefaultState(), ...parsed }
    }
  } catch (err) {
    console.warn(
      'Failed to load driver onboarding state from localStorage:',
      err
    )
  }
  return getDefaultState()
}

// Shared reactive state
const onboardingState = ref(loadState())

// Helper function to persist state
const persistState = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(onboardingState.value))
  } catch (err) {
    console.error('Failed to persist driver onboarding state:', err)
  }
}

export const useDriverOnboarding = () => {
  const isSubscriptionActive = subscription => {
    if (
      !subscription ||
      String(subscription.status || '').toLowerCase() !== 'active'
    ) {
      return false
    }

    const expiryDate =
      subscription.expiryDate ||
      subscription.expiry_date ||
      subscription.expiresAt ||
      subscription.expires_at
    if (!expiryDate) return true

    const expiryTime = new Date(expiryDate).getTime()
    if (Number.isNaN(expiryTime)) return true

    return expiryTime > Date.now()
  }

  // Computed helpers
  const isProfileCompleted = computed(
    () => !!onboardingState.value.isProfileCompleted
  )

  const isSubscribed = computed(() => {
    return isSubscriptionActive(onboardingState.value.subscription)
  })

  const activePlan = computed(() => onboardingState.value.subscription)

  const vehicleCategory = computed(
    () => onboardingState.value.vehicleCategory || 'bike'
  )

  const isFreeTrialAvailable = computed(() => {
    const subscription = onboardingState.value.subscription

    if (isSubscriptionActive(subscription)) return false

    if (!onboardingState.value.freeTrialClaimed) return true

    const expiryDate =
      subscription?.expiryDate ||
      subscription?.expiry_date ||
      subscription?.expiresAt ||
      subscription?.expires_at
    if (!expiryDate) return false

    const expiryTime = new Date(expiryDate).getTime()
    return Number.isNaN(expiryTime) || expiryTime <= Date.now()
  })

  const verificationStatus = computed(
    () => onboardingState.value.verificationStatus
  )

  const isPendingVerification = computed(() => {
    return onboardingState.value.verificationStatus === 'pending'
  })

  const isVerified = computed(() => {
    return onboardingState.value.verificationStatus === 'verified'
  })

  // Driver can only take rides if profile is completed, subscription is active, AND verified
  const canTakeRides = computed(() => {
    return isProfileCompleted.value && isSubscribed.value && isVerified.value
  })

  // Current onboarding stage (1: Profile, 2: Subscription, 3: Verification, 4: Ready)
  const currentStage = computed(() => {
    if (!isProfileCompleted.value) return 1
    if (!isSubscribed.value) return 2
    if (!isVerified.value) return 3
    return 4
  })

  // Get active plans list for current or specified vehicle category
  const currentVehiclePlans = computed(() => {
    const cat = onboardingState.value.vehicleCategory || 'bike'
    return VEHICLE_CONFIG[cat]?.plans || VEHICLE_CONFIG.bike.plans
  })

  // --- ACTIONS ---

  // Set the driver's vehicle category (e.g. 'bike', 'auto', 'car')
  const setVehicleCategory = cat => {
    if (VEHICLE_CONFIG[cat]) {
      onboardingState.value.vehicleCategory = cat
      persistState()
    }
  }

  // Complete profile step
  const completeProfile = (docsSummary = {}) => {
    onboardingState.value.isProfileCompleted = true
    onboardingState.value.profileStep = 6

    if (
      docsSummary.vehicleCategory &&
      VEHICLE_CONFIG[docsSummary.vehicleCategory.toLowerCase()]
    ) {
      onboardingState.value.vehicleCategory =
        docsSummary.vehicleCategory.toLowerCase()
    }

    if (docsSummary.aadharNumber)
      onboardingState.value.documents.aadhar.number = docsSummary.aadharNumber
    if (docsSummary.panNumber)
      onboardingState.value.documents.pan.number = docsSummary.panNumber
    if (docsSummary.licenseNumber)
      onboardingState.value.documents.license.number = docsSummary.licenseNumber
    if (docsSummary.insuranceNumber)
      onboardingState.value.documents.insurance.number =
        docsSummary.insuranceNumber

    persistState()
  }

  // Activate driver subscription (Calls backend API & updates local state)
  const activateSubscription = async (plan, paymentInfo = {}) => {
    try {
      console.log(plan)

      const isTrial = !!paymentInfo.isFreeTrial || plan.isFreeTrial || false
      const cat = onboardingState.value.vehicleCategory || 'bike'
      const cycleMap = {
        1: 1,
        3: 3,
        6: 6,
        12: 12,
        '1_month': 1,
        '3_months': 3,
        '6_months': 6,
        '1_year': 12
      }
      const baseMonths = Number(
        plan.baseMonths ??
          cycleMap[plan.cycle] ??
          cycleMap[plan.durationLabel] ??
          1
      )
      const bonusDays = Number(
        plan.bonusDays ??
          (baseMonths === 3
            ? 15
            : baseMonths === 6
              ? 30
              : baseMonths === 12
                ? 90
                : 0)
      )
      const totalDays = Number(
        plan.totalDays ?? Math.max(0, baseMonths * 30 + bonusDays)
      )
      const startDate = new Date().toISOString()
      const expiryDate = new Date(
        Date.now() + totalDays * 24 * 60 * 60 * 1000
      ).toISOString()

      // 1. Send request to backend API
      const response = await api.post('/driver/activate-subscription', {
        planId: plan.id,
        planName: plan.name || plan.planName || plan.title,
        vehicleCategory: cat,
        paymentMethod:
          paymentInfo.paymentMethod || (isTrial ? 'Free Trial Offer' : 'UPI'),
        transactionId: paymentInfo.transactionId || null,
        isFreeTrial: isTrial,
        baseMonths,
        bonusDays,
        totalDays,
        startDate,
        expiryDate,
        cycle: plan.cycle || '1_month',
        durationLabel: plan.durationLabel || '1 Month',
        price: Number(plan.price || 0)
      })

      const data = response.data

      if (data && data.success) {
        const sub = data.subscription

        if (isTrial) {
          onboardingState.value.freeTrialClaimed = true
        }

        // 2. Map backend response back to onboardingState
        onboardingState.value.subscription = {
          status: sub.status || 'active',
          vehicleCategory: sub.vehicleCategory || cat,
          planId: sub.planId || plan.id,
          planName: sub.planName || plan.name,
          price: sub.price ?? (isTrial ? 0 : plan.price),
          cycle: sub.cycle || plan.cycle || '1_month',
          durationLabel: sub.durationLabel || plan.durationLabel || '1 Month',
          baseMonths: Number(sub.baseMonths ?? baseMonths),
          bonusDays: Number(sub.bonusDays ?? bonusDays),
          totalDays: Number(sub.totalDays ?? totalDays),
          bonusLabel: sub.bonusLabel || plan.bonusLabel || null,
          isFreeTrial: Boolean(sub.isFreeTrial),
          startDate: sub.startDate || startDate,
          expiryDate: sub.expiryDate || sub.endDate || expiryDate,
          transactionId: sub.transactionId,
          paymentMethod: sub.paymentMethod
        }

        // 3. Update verification state if not already verified
        if (onboardingState.value.verificationStatus !== 'verified') {
          onboardingState.value.verificationStatus = 'pending'
          onboardingState.value.verificationSubmittedAt =
            new Date().toISOString()
          Object.keys(onboardingState.value.documents).forEach(k => {
            if (onboardingState.value.documents[k]) {
              onboardingState.value.documents[k].status = 'pending'
            }
          })
        }

        persistState()

        return {
          success: true,
          message:
            data.message ||
            (isTrial
              ? 'Free trial activated successfully.'
              : 'Subscription activated successfully.'),
          data: onboardingState.value.subscription
        }
      } else {
        return {
          success: false,
          message: data?.message || 'Failed to activate subscription.'
        }
      }
    } catch (error) {
      console.error('Error activating subscription via API:', error)
      return {
        success: false,
        message:
          error.response?.data?.message ||
          'Network error while activating subscription.'
      }
    }
  }

  // Fetch active plan status from backend API
  const fetchActivePlan = async () => {
    try {
      const response = await api.get('/driver/active_plans')
      if (response.data && response.data.success) {
        if (response.data.isSubscribed && response.data.activePlan) {
          const plan = response.data.activePlan
          onboardingState.value.subscription = {
            status: 'active',
            vehicleCategory: onboardingState.value.vehicleCategory,
            planId: plan.id,
            planName: plan.title,
            price: plan.price || 0,
            cycle: plan.cycle || '1_month',
            durationLabel: plan.durationLabel || '1 Month',
            baseMonths: Number(plan.baseMonths ?? 1),
            bonusDays: Number(plan.bonusDays ?? 0),
            totalDays: Number(
              plan.totalDays ??
                Math.max(
                  0,
                  Number(plan.baseMonths ?? 1) * 30 +
                    Number(plan.bonusDays ?? 0)
                )
            ),
            bonusLabel: plan.bonusLabel || null,
            isFreeTrial: Boolean(plan.isFreeTrial),
            startDate: plan.startDate,
            expiryDate: plan.endDate,
            transactionId: plan.transactionId || null,
            paymentMethod: plan.paymentMethod || null
          }
        } else {
          onboardingState.value.subscription.status = 'none'
        }
        persistState()
      }
      return response.data
    } catch (error) {
      console.error('Failed to fetch active plan:', error)
      return { success: false, isSubscribed: false }
    }
  }

  // Sync status
  const fetchDriverStatus = async () => {
    await fetchActivePlan()
    persistState()
    return {
      success: true,
      message: 'Driver onboarding status synced.',
      data: onboardingState.value
    }
  }

  // Claim 1st Month Free Trial specifically via API
  const claimFreeTrial = async (cat = null) => {
    if (cat && VEHICLE_CONFIG[cat]) {
      onboardingState.value.vehicleCategory = cat
    }
    const targetCat = onboardingState.value.vehicleCategory || 'bike'
    const catConfig = VEHICLE_CONFIG[targetCat]

    const trialPlan = {
      id: `${targetCat}_free_trial`,
      name: `${catConfig.label} 1st Month Free Trial`,
      cycle: '1_month',
      durationLabel: '1 Month',
      totalDays: 30,
      price: 0,
      isFreeTrial: true
    }

    await api.post(`/driver/claim-free-trial`, trialPlan)

    return activateSubscription(trialPlan, { isFreeTrial: true })
  }

  // Set document verification status
  const setVerificationStatus = (status, notes = '') => {
    onboardingState.value.verificationStatus = status
    if (status === 'verified') {
      onboardingState.value.verificationApprovedAt = new Date().toISOString()
      Object.keys(onboardingState.value.documents).forEach(k => {
        if (onboardingState.value.documents[k]) {
          onboardingState.value.documents[k].status = 'verified'
        }
      })
    } else if (status === 'pending') {
      onboardingState.value.verificationSubmittedAt = new Date().toISOString()
      onboardingState.value.verificationApprovedAt = null
      Object.keys(onboardingState.value.documents).forEach(k => {
        if (onboardingState.value.documents[k]) {
          onboardingState.value.documents[k].status = 'pending'
        }
      })
    }
    if (notes) {
      onboardingState.value.verificationNotes = notes
    }
    persistState()
  }

  const setDriverState = (driverData = {}) => {
    if (!driverData || typeof driverData !== 'object') return

    const apiData =
      driverData.data && typeof driverData.data === 'object'
        ? driverData.data
        : driverData

    const profileCompleted =
      apiData.isProfileCompleted ??
      apiData.profile_completed ??
      apiData.profileComplete ??
      onboardingState.value.isProfileCompleted
    onboardingState.value.isProfileCompleted = Boolean(profileCompleted)

    const subscriptionData =
      apiData.subscription ||
      apiData.driverSubscription ||
      apiData.subscriptionDetails ||
      {}

    if (subscriptionData && Object.keys(subscriptionData).length) {
      onboardingState.value.subscription = {
        ...onboardingState.value.subscription,
        ...subscriptionData,
        status: String(
          subscriptionData.status ||
            subscriptionData.subscription_status ||
            onboardingState.value.subscription.status ||
            'none'
        ).toLowerCase()
      }
    }

    const verificationValue =
      apiData.verificationStatus ??
      apiData.verification_status ??
      apiData.verification ??
      apiData.status ??
      apiData.isVerified ??
      apiData.is_verified ??
      apiData.verified ??
      apiData.approved ??
      onboardingState.value.verificationStatus

    const rawStatus =
      verificationValue === true || verificationValue === 'true'
        ? 'verified'
        : verificationValue === false || verificationValue === 'false'
          ? 'pending'
          : String(verificationValue || 'pending').toLowerCase()

    onboardingState.value.verificationStatus = [
      'verified',
      'approved',
      'success',
      'active'
    ].includes(rawStatus)
      ? 'verified'
      : [
            'pending',
            'in_review',
            'under_review',
            'submitted',
            'not_submitted'
          ].includes(rawStatus)
        ? 'pending'
        : ['rejected', 'failed', 'declined'].includes(rawStatus)
          ? 'rejected'
          : onboardingState.value.verificationStatus

    if (apiData.documents && typeof apiData.documents === 'object') {
      onboardingState.value.documents = {
        ...onboardingState.value.documents,
        ...apiData.documents
      }
    }

    if (apiData.verificationNotes || apiData.verification_notes) {
      onboardingState.value.verificationNotes =
        apiData.verificationNotes || apiData.verification_notes
    }

    persistState()
  }

  // Reset entire onboarding state
  const resetOnboarding = () => {
    onboardingState.value = getDefaultState()
    persistState()
  }

  return {
    onboardingState,
    vehicleCategory,
    isFreeTrialAvailable,
    currentVehiclePlans,
    isProfileCompleted,
    isSubscribed,
    activePlan,
    verificationStatus,
    isPendingVerification,
    isVerified,
    canTakeRides,
    currentStage,
    fetchActivePlan,
    fetchDriverStatus,
    setVehicleCategory,
    claimFreeTrial,
    completeProfile,
    activateSubscription,
    setVerificationStatus,
    setDriverState,
    resetOnboarding
  }
}
