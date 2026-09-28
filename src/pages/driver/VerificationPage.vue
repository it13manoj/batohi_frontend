<template>
  <q-page class="driver-verification-page q-pa-md q-pa-lg-lg">
    <!-- =====================================================
         ONBOARDING PROGRESS TRACKER
    ====================================================== -->
    <q-card class="onboarding-progress-card q-mb-lg" flat bordered>
      <q-card-section class="q-pa-md">
        <div class="row items-center justify-between q-col-gutter-sm">
          <div class="col-12 col-md-6">
            <div class="row items-center">
              <q-avatar size="36px" color="primary" text-color="white" icon="badge" class="q-mr-sm" />
              <div>
                <div class="text-subtitle1 text-weight-bold">Driver Onboarding Journey</div>
                <div class="text-caption text-grey-7">Step 3 of 4: Document Verification</div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="row items-center justify-end q-gutter-x-sm no-wrap text-center stepper-pills">
              <!-- Step 1: Profile -->
              <div class="step-pill" :class="{ 'step-done': isProfileCompleted, 'step-active': currentStage === 1 }">
                <q-icon :name="isProfileCompleted ? 'check_circle' : 'person'" size="18px" />
                <span class="gt-xs">1. Profile</span>
              </div>
              <q-icon name="chevron_right" color="grey-5" size="18px" />

              <!-- Step 2: Subscription -->
              <div class="step-pill" :class="{ 'step-done': isSubscribed, 'step-active': currentStage === 2 }">
                <q-icon :name="isSubscribed ? 'check_circle' : 'card_membership'" size="18px" />
                <span class="gt-xs">2. Subscription</span>
              </div>
              <q-icon name="chevron_right" color="grey-5" size="18px" />

              <!-- Step 3: Verification -->
              <div class="step-pill" :class="{ 'step-done': isVerified, 'step-active': currentStage === 3 }">
                <q-icon :name="isVerified ? 'check_circle' : 'hourglass_top'" size="18px" />
                <span class="gt-xs">3. Verification</span>
              </div>
              <q-icon name="chevron_right" color="grey-5" size="18px" />

              <!-- Step 4: Ready -->
              <div class="step-pill" :class="{ 'step-done': canTakeRides, 'step-active': currentStage === 4 }">
                <q-icon name="directions_car" size="18px" />
                <span class="gt-xs">4. Drive</span>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- =====================================================
         STATE 1: DOCUMENTS VERIFIED & APPROVED
    ====================================================== -->
    <div v-if="isVerified" class="verified-state-container q-mb-xl">
      <q-card class="verified-card text-white text-center q-pa-xl" flat>
        <div class="verified-icon-circle q-mx-auto q-mb-md">
          <q-icon name="verified" size="64px" color="positive" />
        </div>
        <div class="text-h4 text-weight-bolder">Documents Verified & Approved!</div>
        <div class="text-subtitle1 text-grey-2 q-mt-sm max-w-600 q-mx-auto">
          Congratulations! Your driver documents have been successfully verified by the Batohi administration team. You are now fully authorized to go online and accept ride requests.
        </div>

        <div class="q-mt-lg row justify-center q-gutter-md">
          <q-btn
            color="white"
            text-color="primary"
            icon="directions_car"
            label="Go to Dashboard & Start Driving"
            size="lg"
            no-caps
            unelevated
            class="text-weight-bolder q-px-xl"
            @click="goToDashboard"
          />
        </div>
      </q-card>
    </div>

    <!-- =====================================================
         STATE 2: DOCUMENTS REJECTED / NEEDS REVISION
    ====================================================== -->
    <div v-else-if="onboardingState.verificationStatus === 'rejected'" class="rejected-state-container q-mb-xl">
      <q-card class="rejected-card text-center q-pa-xl" flat bordered>
        <div class="rejected-icon-circle q-mx-auto q-mb-md">
          <q-icon name="error_outline" size="54px" color="negative" />
        </div>
        <q-badge color="negative" text-color="white" class="text-weight-bold q-px-md q-py-xs q-mb-sm text-uppercase">
          Action Required: Verification Rejected
        </q-badge>
        <div class="text-h4 text-weight-bolder text-negative">
          Documents Require Revision
        </div>
        <div class="text-subtitle1 text-grey-8 q-mt-sm max-w-600 q-mx-auto">
          {{ onboardingState.verificationNotes || 'One or more of your uploaded documents could not be verified by the Batohi compliance team. Please re-upload clear and valid documents.' }}
        </div>

        <div class="q-mt-lg row justify-center q-gutter-md">
          <q-btn
            color="primary"
            icon="edit"
            label="Re-upload Documents"
            size="md"
            no-caps
            unelevated
            class="text-weight-bold q-px-lg"
            @click="goToProfile"
          />
          <q-btn
            outline
            color="primary"
            icon="refresh"
            label="Check Status Again"
            size="md"
            no-caps
            :loading="refreshing"
            @click="refreshVerificationStatus"
          />
        </div>
      </q-card>
    </div>

    <!-- =====================================================
         STATE 3: DOCUMENTS UNDER VERIFICATION (WAITING)
    ====================================================== -->
    <div v-else class="pending-state-container q-mb-xl">
      <q-card class="pending-card text-center q-pa-xl" flat bordered>
        <div class="pending-icon-circle q-mx-auto q-mb-md">
          <q-spinner-hourglass color="warning" size="54px" />
        </div>
        <q-badge color="warning" text-color="dark" class="text-weight-bold q-px-md q-py-xs q-mb-sm text-uppercase">
          Verification In Progress
        </q-badge>
        <div class="text-h4 text-weight-bolder text-dark">
          Documents Under Verification
        </div>
        <div class="text-subtitle1 text-grey-7 q-mt-sm max-w-600 q-mx-auto">
          Your profile details and subscription have been registered. Our compliance team is currently reviewing your uploaded identity and vehicle documents.
        </div>

        <!-- Verification Notice Box -->
        <div class="notice-box bg-blue-1 text-primary q-pa-md rounded-borders q-mt-lg max-w-600 q-mx-auto text-left">
          <div class="row items-center no-wrap">
            <q-icon name="info" size="24px" class="q-mr-sm" />
            <div class="text-body2">
              <strong>Ride Acceptance is Temporarily Gated:</strong><br />
              For customer safety, the "Go Online" toggle will unlock immediately once your documents are approved by the admin.
            </div>
          </div>
        </div>

        <!-- Refresh Button -->
        <div class="q-mt-lg row justify-center">
          <q-btn
            outline
            color="primary"
            icon="sync"
            label="Check Approval Status"
            :loading="refreshing"
            no-caps
            class="text-weight-bold"
            @click="refreshVerificationStatus"
          />
        </div>

        <!-- Review Timeline Steps -->
        <div class="timeline-row row justify-center q-gutter-md q-mt-xl text-center">
          <div class="timeline-step step-complete">
            <div class="timeline-dot bg-positive text-white">
              <q-icon name="check" size="18px" />
            </div>
            <div class="text-weight-bold text-dark q-mt-xs">Profile Submitted</div>
            <div class="text-caption text-grey-6">Completed</div>
          </div>

          <div class="timeline-step step-complete">
            <div class="timeline-dot bg-positive text-white">
              <q-icon name="check" size="18px" />
            </div>
            <div class="text-weight-bold text-dark q-mt-xs">Subscription Active</div>
            <div class="text-caption text-grey-6">{{ activePlan?.planName || 'Plan Active' }}</div>
          </div>

          <div class="timeline-step step-current">
            <div class="timeline-dot bg-warning text-white">
              <q-icon name="hourglass_top" size="18px" />
            </div>
            <div class="text-weight-bold text-warning q-mt-xs">Admin Review</div>
            <div class="text-caption text-grey-6">In Progress (~2-24h)</div>
          </div>

          <div class="timeline-step step-upcoming">
            <div class="timeline-dot bg-grey-4 text-grey-7">
              <q-icon name="directions_car" size="18px" />
            </div>
            <div class="text-weight-bold text-grey-6 q-mt-xs">Start Taking Rides</div>
            <div class="text-caption text-grey-5">Awaiting Approval</div>
          </div>
        </div>
      </q-card>
    </div>

    <!-- =====================================================
         DOCUMENT CHECKLIST BREAKDOWN
    ====================================================== -->
    <div class="documents-breakdown-section q-mb-xl">
      <div class="row items-center justify-between q-mb-md">
        <div>
          <div class="text-h6 text-weight-bold">Submitted Documents Status</div>
          <div class="text-caption text-grey-7">Track verification progress for each submitted document</div>
        </div>
        <div class="row items-center q-gutter-x-sm">
          <q-btn
            flat
            dense
            no-caps
            color="primary"
            icon="refresh"
            label="Refresh Status"
            :loading="refreshing"
            @click="refreshVerificationStatus"
          />
          <q-btn
            flat
            dense
            no-caps
            color="primary"
            icon="edit"
            label="Update Documents"
            @click="goToProfile"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <!-- Aadhaar -->
        <div class="col-12 col-sm-6 col-md-4">
          <q-card class="doc-card" flat bordered>
            <q-card-section class="q-pa-md">
              <div class="row items-center justify-between">
                <div class="row items-center">
                  <q-icon name="badge" size="24px" color="primary" class="q-mr-sm" />
                  <div class="text-weight-bold">Aadhaar Card</div>
                </div>
                <q-badge
                  :color="isVerified ? 'positive' : (onboardingState.verificationStatus === 'rejected' ? 'negative' : 'warning')"
                  :label="isVerified ? 'Verified' : (onboardingState.verificationStatus === 'rejected' ? 'Action Required' : 'Under Review')"
                  rounded
                />
              </div>
              <div class="text-caption text-grey-6 q-mt-sm">
                Document Number: {{ onboardingState.documents.aadhar.number || 'Provided' }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- PAN Card -->
        <div class="col-12 col-sm-6 col-md-4">
          <q-card class="doc-card" flat bordered>
            <q-card-section class="q-pa-md">
              <div class="row items-center justify-between">
                <div class="row items-center">
                  <q-icon name="credit_card" size="24px" color="primary" class="q-mr-sm" />
                  <div class="text-weight-bold">PAN Card</div>
                </div>
                <q-badge
                  :color="isVerified ? 'positive' : (onboardingState.verificationStatus === 'rejected' ? 'negative' : 'warning')"
                  :label="isVerified ? 'Verified' : (onboardingState.verificationStatus === 'rejected' ? 'Action Required' : 'Under Review')"
                  rounded
                />
              </div>
              <div class="text-caption text-grey-6 q-mt-sm">
                Document Number: {{ onboardingState.documents.pan.number || 'Provided' }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Driving License -->
        <div class="col-12 col-sm-6 col-md-4">
          <q-card class="doc-card" flat bordered>
            <q-card-section class="q-pa-md">
              <div class="row items-center justify-between">
                <div class="row items-center">
                  <q-icon name="directions_car" size="24px" color="primary" class="q-mr-sm" />
                  <div class="text-weight-bold">Driving License</div>
                </div>
                <q-badge
                  :color="isVerified ? 'positive' : (onboardingState.verificationStatus === 'rejected' ? 'negative' : 'warning')"
                  :label="isVerified ? 'Verified' : (onboardingState.verificationStatus === 'rejected' ? 'Action Required' : 'Under Review')"
                  rounded
                />
              </div>
              <div class="text-caption text-grey-6 q-mt-sm">
                Document Number: {{ onboardingState.documents.license.number || 'Provided' }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Vehicle Insurance -->
        <div class="col-12 col-sm-6 col-md-4">
          <q-card class="doc-card" flat bordered>
            <q-card-section class="q-pa-md">
              <div class="row items-center justify-between">
                <div class="row items-center">
                  <q-icon name="security" size="24px" color="primary" class="q-mr-sm" />
                  <div class="text-weight-bold">Vehicle Insurance</div>
                </div>
                <q-badge
                  :color="isVerified ? 'positive' : (onboardingState.verificationStatus === 'rejected' ? 'negative' : 'warning')"
                  :label="isVerified ? 'Verified' : (onboardingState.verificationStatus === 'rejected' ? 'Action Required' : 'Under Review')"
                  rounded
                />
              </div>
              <div class="text-caption text-grey-6 q-mt-sm">
                Document Number: {{ onboardingState.documents.insurance.number || 'POL-VALID' }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Vehicle Details / RC -->
        <div class="col-12 col-sm-6 col-md-4">
          <q-card class="doc-card" flat bordered>
            <q-card-section class="q-pa-md">
              <div class="row items-center justify-between">
                <div class="row items-center">
                  <q-icon name="commute" size="24px" color="primary" class="q-mr-sm" />
                  <div class="text-weight-bold">Vehicle Details & RC</div>
                </div>
                <q-badge
                  :color="isVerified ? 'positive' : (onboardingState.verificationStatus === 'rejected' ? 'negative' : 'warning')"
                  :label="isVerified ? 'Verified' : (onboardingState.verificationStatus === 'rejected' ? 'Action Required' : 'Under Review')"
                  rounded
                />
              </div>
              <div class="text-caption text-grey-6 q-mt-sm">
                Registration: Verified vehicle match
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Profile Photo -->
        <div class="col-12 col-sm-6 col-md-4">
          <q-card class="doc-card" flat bordered>
            <q-card-section class="q-pa-md">
              <div class="row items-center justify-between">
                <div class="row items-center">
                  <q-icon name="face" size="24px" color="primary" class="q-mr-sm" />
                  <div class="text-weight-bold">Driver Photograph</div>
                </div>
                <q-badge
                  :color="isVerified ? 'positive' : (onboardingState.verificationStatus === 'rejected' ? 'negative' : 'warning')"
                  :label="isVerified ? 'Verified' : (onboardingState.verificationStatus === 'rejected' ? 'Action Required' : 'Under Review')"
                  rounded
                />
              </div>
              <div class="text-caption text-grey-6 q-mt-sm">
                Photo: Clear face biometric verified
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

  </q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useDriverOnboarding } from '@/composables/useDriverOnboarding'
import api from '@/config/api'

const router = useRouter()
const $q = useQuasar()

const {
  onboardingState,
  isProfileCompleted,
  isSubscribed,
  activePlan,
  isVerified,
  canTakeRides,
  currentStage,
  setVerificationStatus,
  resetOnboarding,
  setDriverState
} = useDriverOnboarding()

const getDriverIdFromStorage = () => {
  try {
    const candidates = [
      localStorage.getItem('driver'),
      localStorage.getItem('user'),
      sessionStorage.getItem('driver'),
      sessionStorage.getItem('user')
    ]

    for (const item of candidates) {
      if (!item) continue
      try {
        const parsed = JSON.parse(item)
        const id = parsed?.id || parsed?.driverId || parsed?.driver_id || parsed?.driver_code
        if (id) return String(id)
      } catch (error) {
        // ignore parse failures and fall back to JWT-based ID
      }
    }

    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) return null

    const base64Url = token.split('.')[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(
      decodeURIComponent(
        atob(base64)
          .split('')
          .map(char => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    )

    return payload?.id || payload?.driverId || payload?.driver_id || null
  } catch (error) {
    console.warn('Unable to resolve driver ID for verification status:', error)
    return null
  }
}

const driverId = ref(getDriverIdFromStorage())

const fetchDriverStatus = async () => {
  const currentDriverId = getDriverIdFromStorage()
  if (currentDriverId) driverId.value = currentDriverId

  try {
    const response = await api.get('/driver/status')
    const payload = response.data?.data || response.data || {}

    if (payload && typeof payload === 'object') {
      if (payload.driverId || payload.id) driverId.value = String(payload.driverId || payload.id)
      setDriverState(payload)
    }
  } catch (error) {
    console.warn('Driver verification status unavailable. Using local onboarding state.', error)
  }
}

const goToDashboard = () => {
  router.push({ name: 'DriverDashboard' })
}

const goToProfile = () => {
  router.push({ name: 'DriverProfile' })
}

const refreshing = ref(false)

// Refresh live verification status from server
const refreshVerificationStatus = async () => {
  refreshing.value = true
  try {
    await fetchDriverStatus()
    $q.notify({
      type: 'info',
      message: isVerified.value
        ? 'Documents are verified and approved!'
        : onboardingState.value.verificationStatus === 'rejected'
          ? 'Verification requires document revision.'
          : 'Verification is currently in review by admin.',
      position: 'top',
      timeout: 2000
    })
  } catch (err) {
    console.error('Failed to refresh status:', err)
  } finally {
    refreshing.value = false
  }
}

// Fetch live verification data on component load
onMounted(() => {
  fetchDriverStatus()
})
</script>

<style scoped>
.driver-verification-page {
  background: #f8fafc;
  min-height: 100vh;
}

.max-w-600 {
  max-width: 600px;
}

/* Stepper Pills */
.step-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  background: #f1f5f9;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
}

.step-pill.step-active {
  background: #e0f2fe;
  color: #0284c7;
  font-weight: 700;
}

.step-pill.step-done {
  background: #dcfce7;
  color: #16a34a;
  font-weight: 600;
}

/* Verified Card */
.verified-card {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  border-radius: 20px;
  box-shadow: 0 15px 30px -5px rgba(16, 185, 129, 0.3);
}

.verified-icon-circle {
  width: 96px;
  height: 96px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Pending Card */
.pending-card {
  background: #ffffff;
  border-radius: 20px;
}

.pending-icon-circle {
  width: 88px;
  height: 88px;
  background: #fef3c7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Timeline */
.timeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 130px;
}

.timeline-dot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Doc Cards */
.doc-card {
  background: white;
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.doc-card:hover {
  transform: translateY(-2px);
}

.admin-simulator-card {
  border-radius: 12px;
  border-style: dashed;
}
</style>

