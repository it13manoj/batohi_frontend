<template>
  <q-page class="driver-subscription-page q-pa-md q-pa-lg-lg">
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
                <div class="text-caption text-grey-7">Step 2 of 4: Activate your vehicle subscription pass</div>
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
         ACTIVE SUBSCRIPTION BANNER (IF DRIVER IS SUBSCRIBED)
    ====================================================== -->
    <q-card v-if="isSubscribed" class="active-plan-card q-mb-xl" flat>
      <q-card-section class="q-pa-lg text-white">
        <div class="row items-center justify-between">
          <div class="col-12 col-md-7">
            <div class="row items-center q-gutter-x-sm q-mb-xs">
              <q-badge color="positive" text-color="white" class="q-px-sm q-py-xs text-weight-bold">
                <q-icon name="check_circle" size="14px" class="q-mr-xs" />
                ACTIVE SUBSCRIPTION
              </q-badge>
              <q-badge color="white" text-color="dark" class="text-uppercase text-weight-bold">
                {{ activePlan.vehicleCategory || vehicleCategory }} Pass
              </q-badge>
              <span v-if="activePlan.isFreeTrial" class="text-caption text-amber-2 text-weight-bold">
                (1st Month Free Trial)
              </span>
            </div>
            <div class="text-h4 text-weight-bolder q-mt-xs">{{ activePlan.planName }}</div>
            <div class="text-body2 text-grey-2 q-mt-xs">
              0% platform commission on all rides • Unlimited ride requests • Verified driver dispatch
            </div>
            <div class="row items-center q-gutter-x-md q-mt-md text-caption">
              <div>
                <span class="text-grey-4">Activated:</span>
                <span class="text-weight-bold q-ml-xs">{{ formatDate(activePlan.startDate) }}</span>
              </div>
              <div>
                <span class="text-grey-4">Valid Until:</span>
                <span class="text-weight-bold q-ml-xs">{{ formatDate(activePlan.expiryDate) }}</span>
              </div>
              <div v-if="activePlan.bonusLabel">
                <span class="text-amber-3 text-weight-bold">Bonus:</span>
                <span class="q-ml-xs text-amber-2">{{ activePlan.bonusLabel }}</span>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-5 text-right q-mt-md q-mt-md-none">
            <div class="column items-end">
              <div class="text-caption text-grey-3">Next Action Step</div>
              <q-btn
                color="white"
                text-color="primary"
                icon="verified_user"
                label="Check Document Verification"
                no-caps
                unelevated
                class="q-px-lg q-py-sm text-weight-bold q-mt-xs"
                @click="goToVerification"
              />
              <div class="text-caption text-grey-3 q-mt-xs">
                Ride requests unlock once documents are approved
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- =====================================================
         1ST MONTH FREE TRIAL PROMO CARD
    ====================================================== -->
    <q-card v-if="isFreeTrialAvailable && (!isSubscribed || !activePlan.isFreeTrial)" class="trial-promo-card q-mb-xl" flat bordered>
      <q-card-section class="q-pa-lg">
        <div class="row items-center justify-between">
          <div class="col-12 col-md-8">
            <div class="row items-center q-gutter-x-sm q-mb-xs">
              <q-badge color="amber-10" text-color="white" class="text-weight-bold q-px-sm">
                WELCOME OFFER
              </q-badge>
              <span class="text-caption text-grey-7">Valid for all vehicles</span>
            </div>
            <div class="text-h5 text-weight-bolder text-dark">
              1st Month FREE Subscription for All Drivers!
            </div>
            <div class="text-body2 text-grey-8 q-mt-xs">
              Start earning immediately with <strong>₹0 upfront cost</strong> for your first 30 days!
              Second month onwards, regular vehicle subscription applies.
            </div>
          </div>
          <div class="col-12 col-md-4 text-right q-mt-md q-mt-md-none">
            <q-btn
              color="positive"
              icon="stars"
              :label="`Claim 1st Month Free (${currentCategoryConfig.label})`"
              size="md"
              unelevated
              no-caps
              class="text-weight-bolder q-px-lg q-py-sm"
              @click="openFreeTrialDialog"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- =====================================================
         VEHICLE SELECTOR TABS
    ====================================================== -->
    <div class="page-header text-center q-mb-lg">
      <div class="text-h4 text-weight-bolder text-dark">
        Select Your Vehicle Subscription
      </div>
      <div class="text-subtitle1 text-grey-7 q-mt-xs max-w-700 q-mx-auto">
        Subscription applies specifically to your vehicle category with 0% platform commission and free bonus periods.
      </div>

      <!-- Vehicle Category Toggle: Bike / Auto / Car -->
      <div class="row justify-center q-mt-md">
        <q-btn-toggle
          v-model="activeVehicleCategory"
          toggle-color="primary"
          color="white"
          text-color="grey-9"
          no-caps
          rounded
          unelevated
          class="shadow-1 vehicle-toggle-btn"
          :options="[
            { label: 'Bike (₹800/mo)', value: 'bike', icon: 'two_wheeler' },
            { label: 'Auto (₹1,000/mo)', value: 'auto', icon: 'electric_rickshaw' },
            { label: 'Car (₹1,200/mo)', value: 'car', icon: 'directions_car' }
          ]"
          @update:model-value="onCategoryChange"
        />
      </div>

      <!-- Category Description -->
      <div class="row items-center justify-center q-mt-sm text-caption text-grey-7">
        <q-icon :name="currentCategoryConfig.icon" size="18px" class="q-mr-xs text-primary" />
        Showing subscription plans for <strong>{{ currentCategoryConfig.label }}</strong> ({{ currentCategoryConfig.description }})
      </div>
    </div>

    <!-- =====================================================
         PLANS GRID (1 Mo, 3 Mo, 6 Mo, 1 Year)
    ====================================================== -->
    <div class="row q-col-gutter-lg justify-center items-stretch q-mb-xl">
      <div
        v-for="plan in currentCategoryConfig.plans"
        :key="plan.id"
        class="col-12 col-sm-6 col-md-6 col-lg-3"
      >
        <q-card
          class="plan-card full-height column justify-between"
          :class="{
            'plan-featured': plan.featured,
            'plan-active': isPlanActive(plan)
          }"
          flat
          bordered
        >
          <!-- Bonus Badge on Top -->
          <div v-if="plan.bonusLabel" class="plan-bonus-badge">
            <q-icon name="card_giftcard" size="13px" class="q-mr-xs" />
            {{ plan.bonusLabel }}
          </div>

          <q-card-section class="q-pa-lg">
            <div class="text-caption text-grey-6 text-uppercase text-weight-bold">
              {{ currentCategoryConfig.label }} Pass
            </div>
            <div class="text-h6 text-weight-bolder text-dark q-mt-xs">
              {{ plan.durationLabel }}
            </div>

            <!-- Price -->
            <div class="plan-price-row q-mt-md q-mb-xs">
              <span class="currency-symbol">₹</span>
              <span class="price-val">{{ Number(plan.price).toLocaleString('en-IN') }}</span>
              <span class="price-period">/ {{ plan.durationLabel }}</span>
            </div>

            <!-- Validity & Free Bonus Highlight -->
            <div class="validity-callout q-pa-xs rounded-borders bg-blue-1 text-primary text-caption text-weight-bold q-mb-md">
              <q-icon name="schedule" size="14px" class="q-mr-xs" />
              Total Validity: {{ plan.totalDays }} Days
              <span v-if="plan.bonusDays > 0" class="text-positive q-ml-xs">
                ({{ plan.bonusLabel }})
              </span>
            </div>

            <q-separator class="q-my-md" />

            <!-- Features List -->
            <div class="plan-features q-gutter-y-sm">
              <div class="row items-center text-body2">
                <q-icon name="check_circle" color="positive" size="18px" class="q-mr-sm" />
                <span><strong>0% Commission</strong> on every ride</span>
              </div>
              <div class="row items-center text-body2">
                <q-icon name="check_circle" color="positive" size="18px" class="q-mr-sm" />
                <span>Unlimited ride requests</span>
              </div>
              <div class="row items-center text-body2">
                <q-icon name="check_circle" color="positive" size="18px" class="q-mr-sm" />
                <span>Instant daily UPI settlement</span>
              </div>
              <div v-if="plan.bonusDays > 0" class="row items-center text-body2 text-positive text-weight-bold">
                <q-icon name="redeem" color="positive" size="18px" class="q-mr-sm" />
                <span>{{ plan.bonusLabel }} included</span>
              </div>
              <div v-if="plan.baseMonths >= 6" class="row items-center text-body2">
                <q-icon name="check_circle" color="positive" size="18px" class="q-mr-sm" />
                <span>24/7 Priority road assistance</span>
              </div>
              <div v-if="plan.baseMonths >= 12" class="row items-center text-body2">
                <q-icon name="check_circle" color="positive" size="18px" class="q-mr-sm" />
                <span>₹5 Lakh Accidental Cover</span>
              </div>
            </div>
          </q-card-section>

          <!-- Plan Action Button -->
          <q-card-actions class="q-pa-lg pt-0">
            <q-btn
              v-if="isPlanActive(plan)"
              label="Current Plan"
              color="positive"
              unelevated
              no-caps
              disable
              class="full-width q-py-sm text-weight-bold"
            />
            <q-btn
              v-else
              :label="`Get ${plan.durationLabel} Pass`"
              :color="plan.featured ? 'primary' : 'grey-9'"
              :outline="!plan.featured"
              unelevated
              no-caps
              :disable="isPlanActive(plan)"
              class="full-width q-py-sm text-weight-bold select-plan-btn"
              @click="openCheckout(plan)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- =====================================================
         FREE TRIAL MODAL DIALOG
    ====================================================== -->
    <q-dialog v-model="freeTrialDialog" persistent>
      <q-card class="trial-dialog-card text-center q-pa-lg" style="width: 450px; max-width: 95vw; border-radius: 16px;">
        <q-avatar size="64px" color="amber-1" text-color="amber-10" icon="stars" class="q-mb-md" />
        <div class="text-h5 text-weight-bolder text-dark">
          Activate 1st Month Free Trial
        </div>
        <div class="text-body2 text-grey-7 q-mt-xs">
          Start driving your <strong>{{ currentCategoryConfig.label }}</strong> with 100% free subscription for 30 days!
        </div>

        <q-card flat bordered class="q-pa-md q-my-md bg-grey-1 rounded-borders text-left">
          <div class="row justify-between text-body2 q-mb-xs">
            <span class="text-grey-7">Vehicle Category:</span>
            <span class="text-weight-bold text-capitalize">{{ activeVehicleCategory }}</span>
          </div>
          <div class="row justify-between text-body2 q-mb-xs">
            <span class="text-grey-7">Duration:</span>
            <span class="text-weight-bold">30 Days (1 Month)</span>
          </div>
          <div class="row justify-between text-body2 q-mb-xs">
            <span class="text-grey-7">Trial Fee:</span>
            <span class="text-weight-bolder text-positive">₹0 (FREE)</span>
          </div>
          <div class="row justify-between text-body2">
            <span class="text-grey-7">Platform Commission:</span>
            <span class="text-weight-bold text-positive">0%</span>
          </div>
          <q-separator class="q-my-sm" />
          <div class="text-caption text-grey-6">
            * Second month onwards, standard subscription (₹{{ currentCategoryConfig.plans[0].price }}/mo) will apply.
          </div>
        </q-card>

        <div class="row q-gutter-sm justify-end">
          <q-btn flat label="Cancel" color="grey-7" no-caps v-close-popup />
          <q-btn
            color="positive"
            label="Activate Free Trial (₹0)"
            icon="check_circle"
            no-caps
            unelevated
            class="q-px-lg text-weight-bolder"
            :loading="isProcessingPayment"
            @click="handleActivateFreeTrial"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- =====================================================
         CHECKOUT & PAYMENT DIALOG (PAID PLANS)
    ====================================================== -->
    <q-dialog v-model="checkoutDialog" persistent max-width="500px">
      <q-card class="checkout-card" style="width: 500px; max-width: 95vw; border-radius: 14px;">
        <q-card-section class="row items-center justify-between q-pb-none">
          <div class="text-h6 text-weight-bold">Subscribe & Activate</div>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-lg" v-if="selectedPlan">
          <!-- Selected Plan Summary -->
          <div class="selected-plan-banner q-pa-md rounded-borders q-mb-md">
            <div class="row items-center justify-between">
              <div>
                <div class="text-caption text-grey-7 text-uppercase text-weight-bold">
                  {{ currentCategoryConfig.label }} Pass
                </div>
                <div class="text-subtitle1 text-weight-bold text-primary">{{ selectedPlan.name }}</div>
                <div class="text-caption text-grey-6">
                  Validity: <strong>{{ selectedPlan.totalDays }} Days</strong>
                  <span v-if="selectedPlan.bonusLabel" class="text-positive q-ml-xs">({{ selectedPlan.bonusLabel }})</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-h5 text-weight-bolder text-dark">₹{{ selectedPlan.price }}</div>
                <div class="text-caption text-positive text-weight-bold">0% Commission</div>
              </div>
            </div>
          </div>

          <!-- Coupon Code -->
          <div class="coupon-section q-mb-md">
            <div class="text-caption text-grey-7 q-mb-xs">Promo / Referral Code</div>
            <div class="row q-col-gutter-xs">
              <div class="col">
                <q-input
                  v-model="couponCode"
                  placeholder="e.g. WELCOME50"
                  outlined
                  dense
                  class="coupon-input"
                />
              </div>
              <div class="col-auto">
                <q-btn
                  label="Apply"
                  color="primary"
                  unelevated
                  dense
                  no-caps
                  class="q-px-md"
                  @click="applyCoupon"
                />
              </div>
            </div>
            <div v-if="couponApplied" class="text-caption text-positive q-mt-xs">
              <q-icon name="check" size="14px" /> ₹50 discount applied!
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="payment-methods-section q-mb-md">
            <div class="text-caption text-grey-7 text-weight-bold q-mb-sm">Select Payment Method</div>
            <q-list bordered separator class="rounded-borders">
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="paymentMethod" val="card" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">Debit / Credit Card</q-item-label>
                  <q-item-label caption>Visa, Mastercard, RuPay, Amex</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="credit_card" size="24px" color="primary" />
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="paymentMethod" val="upi" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">UPI</q-item-label>
                  <q-item-label caption>Google Pay, PhonePe, Paytm, BHIM</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="qr_code_2" size="24px" color="primary" />
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="paymentMethod" val="bank" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">Net Banking / Bank Transfer</q-item-label>
                  <q-item-label caption>Powered by Stripe secure checkout</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="account_balance" size="24px" color="grey-7" />
                </q-item-section>
              </q-item>
            </q-list>
            <div class="text-caption text-grey-6 q-mt-sm">
              Secure payment details are collected on the Stripe checkout page. No card or banking information is entered inside this app.
            </div>
          </div>

          <!-- Total Calculation -->
          <div class="price-breakdown q-pa-sm bg-grey-1 rounded-borders text-caption q-mb-md">
            <div class="row justify-between q-mb-xs">
              <span class="text-grey-7">Plan Price:</span>
              <span>₹{{ selectedPlan.price }}</span>
            </div>
            <div v-if="couponApplied" class="row justify-between text-positive q-mb-xs">
              <span>Coupon Discount:</span>
              <span>- ₹50</span>
            </div>
            <div class="row justify-between q-mb-xs">
              <span class="text-grey-7">GST / Platform Fee:</span>
              <span>₹0 (Waived)</span>
            </div>
            <q-separator class="q-my-xs" />
            <div class="row justify-between text-subtitle2 text-weight-bolder text-dark">
              <span>Total Payable:</span>
              <span>₹{{ finalAmount }}</span>
            </div>
          </div>
        </q-card-section>

        <!-- Pay Button -->
        <q-card-actions align="right" class="q-pa-lg pt-0">
          <q-btn flat label="Cancel" color="grey-7" no-caps v-close-popup />
          <q-btn
            color="primary"
            :label="`Pay ₹${finalAmount} & Activate`"
            icon="lock"
            no-caps
            unelevated
            class="q-px-lg text-weight-bold"
            :loading="isProcessingPayment"
            @click="processPayment"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- =====================================================
         PAYMENT SUCCESS CELEBRATION MODAL
    ====================================================== -->
    <q-dialog v-model="successDialog" persistent>
      <q-card class="success-card text-center q-pa-lg" style="width: 440px; max-width: 90vw; border-radius: 16px;">
        <div class="success-icon-wrap q-mx-auto q-mb-md">
          <q-icon name="verified" color="positive" size="64px" />
        </div>
        <div class="text-h5 text-weight-bolder text-dark">Subscription Activated!</div>
        <div class="text-body2 text-grey-7 q-mt-sm">
          You have successfully subscribed to <strong>{{ activePlan?.planName }}</strong>.
        </div>

        <q-banner class="bg-amber-1 text-amber-10 rounded-borders q-mt-md text-left text-body2">
          <template #avatar>
            <q-icon name="hourglass_top" color="warning" />
          </template>
          <strong>Next Step: Document Verification</strong><br />
          Your uploaded documents are in queue for verification. Once approved, you will be authorized to go online and accept rides!
        </q-banner>

        <div class="q-mt-lg">
          <q-btn
            color="primary"
            label="Proceed to Document Verification"
            icon-right="arrow_forward"
            no-caps
            unelevated
            class="full-width q-py-sm text-weight-bold"
            @click="goToVerification"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useDriverOnboarding, VEHICLE_CONFIG } from '@/composables/useDriverOnboarding'
import api from '@/config/api'
import { createStripeCheckoutSession, redirectToStripeCheckout } from '@/services/payment.service'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const PENDING_SUBSCRIPTION_KEY = 'batohi_pending_subscription'

// Destructure composable methods and state
const {
  vehicleCategory,
  isFreeTrialAvailable,
  isProfileCompleted,
  isSubscribed,
  activePlan,
  isVerified,
  canTakeRides,
  currentStage,
  fetchDriverStatus,
  setVehicleCategory,
  activateSubscription,
  claimFreeTrial
} = useDriverOnboarding()

// Local Reactive References
const activeVehicleCategory = ref(route.query.vehicle || vehicleCategory.value || 'bike')
const checkoutDialog = ref(false)
const freeTrialDialog = ref(false)
const successDialog = ref(false)
const selectedPlan = ref(null)
const couponCode = ref('')
const couponApplied = ref(false)
const discountAmount = ref(0)
const paymentMethod = ref('card')
const isProcessingPayment = ref(false)

// Dynamic Plans list from API
const plansList = ref([])

// Dynamic computation for displayed plans (falls back to local config if API yields empty)
const displayingPlans = computed(() => {
  if (plansList.value && plansList.value.length > 0) {
    return plansList.value
  }
  return currentCategoryConfig.value?.plans || []
})

// Config for currently selected vehicle tab
const currentCategoryConfig = computed(() => {
  return VEHICLE_CONFIG[activeVehicleCategory.value] || VEHICLE_CONFIG.bike
})

const isPlanActive = plan => {
  if (!plan || !activePlan.value) return false
  return activePlan.value.planId === plan.id && activePlan.value.status === 'active'
}

// Fetch Plans from Backend based on Category
const fetchPlansForCategory = async (category) => {
  try {
    const response = await api.get(`/driver/plans?category=${category}`)
    if (response.data && response.data.success && response.data.plans?.length > 0) {
      plansList.value = response.data.plans
    } else {
      // Fallback to local config if backend returns empty list
      plansList.value = VEHICLE_CONFIG[category]?.plans || []
    }
  } catch (error) {
    console.warn('Failed to fetch backend subscription plans, using fallback config:', error)
    plansList.value = VEHICLE_CONFIG[category]?.plans || []
  }
}

// Handle vehicle category tab change
const onCategoryChange = (val) => {
  activeVehicleCategory.value = val
  setVehicleCategory(val)
  fetchPlansForCategory(val)
}

// Open Free Trial Dialog
const openFreeTrialDialog = () => {
  freeTrialDialog.value = true
}

// Activate Free Trial via API
const handleActivateFreeTrial = async () => {
  isProcessingPayment.value = true
  try {
    const res = await claimFreeTrial(activeVehicleCategory.value)
    if (res && res.success) {
      freeTrialDialog.value = false
      successDialog.value = true
      $q.notify({
        type: 'positive',
        message: res.message || 'Free trial activated successfully!'
      })
      await fetchDriverStatus()
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Failed to claim free trial'
    })
  } finally {
    isProcessingPayment.value = false
  }
}

// Final calculated total
const normalizeAmount = value => {
  const numeric = Number(value ?? 0)
  if (!Number.isFinite(numeric)) return 0
  return Number(numeric.toFixed(2))
}

const normalizeAmountMinor = value => {
  return Math.round(normalizeAmount(value) * 100)
}

const finalMinorAmount = computed(() => {
  if (!selectedPlan.value) return 0

  let amt = parseFloat(selectedPlan.value.price || 0)
  if (couponApplied.value) {
    amt = Math.max(0, amt - Number(discountAmount.value || 0))
  }

  return normalizeAmountMinor(amt)
})

const finalAmount = computed(() => {
  if (!selectedPlan.value) return 0
  let amt = parseFloat(selectedPlan.value.price || 0)
  if (couponApplied.value) {
    amt = Math.max(0, amt - discountAmount.value)
  }
  return normalizeAmount(amt)
})

const savePendingSubscription = () => {
  if (!selectedPlan.value) return

  const pending = {
    plan: {
      ...selectedPlan.value,
      name: selectedPlan.value.name || selectedPlan.value.planName,
      price: selectedPlan.value.price,
      payableAmount: selectedPlan.value.price,
      payableAmountMinor: selectedPlan.value.price
    },
    vehicleCategory: activeVehicleCategory.value,
    amount: selectedPlan.value.price,
    amountMinor: selectedPlan.value.price,
    paymentMethod: paymentMethod.value,
    couponCode: couponApplied.value ? couponCode.value : null,
    timestamp: Date.now()
  }

  sessionStorage.setItem(PENDING_SUBSCRIPTION_KEY, JSON.stringify(pending))
}

const clearPendingSubscription = () => {
  sessionStorage.removeItem(PENDING_SUBSCRIPTION_KEY)
}

const handleCheckoutCallback = async () => {
  const query = route.query || {}
  const sessionId =
    query.checkout_session_id ||
    query.checkoutSessionId ||
    query.session_id ||
    query.sessionId ||
    query.id

  const isSuccessRoute =
    route.name === 'DriverSubscriptionSuccess' ||
    route.path?.includes('/subscription/success') ||
    route.fullPath?.includes('/subscription/success')

  const isSuccess =
    query.success === 'true' ||
    query.payment_status === 'paid' ||
    query.status === 'success' ||
    query.result === 'success' ||
    isSuccessRoute

  const isCancelled =
    query.canceled === 'true' ||
    query.cancelled === 'true' ||
    query.payment_status === 'cancelled' ||
    query.status === 'cancelled'

  if (isCancelled) {
    clearPendingSubscription()
    $q.notify({
      type: 'info',
      message: 'Stripe checkout was cancelled. You can retry the subscription anytime.'
    })
    return
  }

  if (!isSuccess) {
    return
  }

  if (!sessionId && isSuccessRoute) {
    try {
      await fetchDriverStatus()
      clearPendingSubscription()
      successDialog.value = true
      return
    } catch (error) {
      console.error('Failed to refresh subscription status on success route:', error)
    }
  }

  const pendingRaw = sessionStorage.getItem(PENDING_SUBSCRIPTION_KEY)
  let pending = null

  try {
    pending = pendingRaw ? JSON.parse(pendingRaw) : null
  } catch (error) {
    console.warn('Unable to parse pending subscription state:', error)
  }

  try {
    if (pending?.plan) {
      const result = await activateSubscription(pending.plan, {
        paymentMethod: pending.paymentMethod || paymentMethod.value,
        couponCode: pending.couponCode,
        transactionId: sessionId,
        isStripeCheckout: true
      })

      if (result?.success) {
        clearPendingSubscription()
        checkoutDialog.value = false
        successDialog.value = true
        await fetchDriverStatus()
        await fetchPlansForCategory(activeVehicleCategory.value)
        return
      }
    }

    await fetchDriverStatus()
    clearPendingSubscription()
    successDialog.value = true
  } catch (error) {
    console.error('Failed to finalize subscription after Stripe return:', error)
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Subscription was paid but activation is still pending.'
    })
  }
}

// Date formatter helper
const formatDate = (isoStr) => {
  if (!isoStr) return 'N/A'
  try {
    const d = new Date(isoStr)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch (e) {
    return isoStr
  }
}

// Open Checkout Modal
const openCheckout = (plan) => {
  selectedPlan.value = plan
  couponCode.value = ''
  couponApplied.value = false
  discountAmount.value = 0
  paymentMethod.value = 'card'
  checkoutDialog.value = true
}

// Validate and Apply Coupon Code via API
const applyCoupon = async () => {
  if (!couponCode.value) {
    $q.notify({ type: 'warning', message: 'Please enter a coupon code' })
    return
  }

  try {
    const response = await api.post('/driver/validate-coupon', {
      code: couponCode.value,
      planId: selectedPlan.value?.id || selectedPlan.value?._id
    })

    if (response.data && response.data.success) {
      couponApplied.value = true
      discountAmount.value = response.data.discountAmount
      $q.notify({
        type: 'positive',
        message: response.data.message || `Coupon applied! ₹${response.data.discountAmount} discount granted.`
      })
    }
  } catch (error) {
    couponApplied.value = false
    discountAmount.value = 0
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Invalid coupon code'
    })
  }
}

// Process Payment & Activate Subscription via API
const processPayment = async () => {
  if (!selectedPlan.value) return


  isProcessingPayment.value = true
  try {
    const payload = {
      planId: selectedPlan.value.id || selectedPlan.value._id,
      planName: selectedPlan.value.name || selectedPlan.value.planName,
      vehicleCategory: activeVehicleCategory.value,
      amount: Number(selectedPlan.value.price),
      amountMinor: Number(selectedPlan.value.price),
      baseAmount: Number(selectedPlan.value.price),
      baseAmountMinor:Number(selectedPlan.value.price),
      currency: 'INR',
      paymentMethod: paymentMethod.value,
      couponCode: couponApplied.value ? couponCode.value : null,
      checkoutType: 'subscription'
    }

    savePendingSubscription()

    try {
      const stripeSession = await createStripeCheckoutSession(payload)
      const redirected = await redirectToStripeCheckout(stripeSession)

      if (redirected) {
        checkoutDialog.value = false
        return
      }
    } catch (stripeError) {
      console.warn('Stripe checkout unavailable, falling back to default subscription activation:', stripeError)
    }

    const res = await activateSubscription(selectedPlan.value, {
      paymentMethod: paymentMethod.value,
      couponCode: couponApplied.value ? couponCode.value : null
    })

    if (res && res.success) {
      clearPendingSubscription()
      checkoutDialog.value = false
      successDialog.value = true

      $q.notify({
        type: 'positive',
        message: res.message || 'Subscription activated successfully!'
      })

      await fetchDriverStatus()
      await fetchPlansForCategory(activeVehicleCategory.value)
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Payment processing failed'
    })
  } finally {
    isProcessingPayment.value = false
  }
}

// Navigate to Document Verification
const goToVerification = () => {
  successDialog.value = false
  router.push({ name: 'DriverVerification' })
}

// On Component Mount: Sync driver status, set vehicle category from query or active subscription, and load plans
onMounted(async () => {
  try {
    await handleCheckoutCallback()
    await fetchDriverStatus()

    // 1. Check URL query override first
    if (route.query.vehicle && VEHICLE_CONFIG[route.query.vehicle.toLowerCase()]) {
      activeVehicleCategory.value = route.query.vehicle.toLowerCase()
    }
    // 2. Otherwise align category with driver's active subscription (if active)
    else if (isSubscribed.value && activePlan.value?.vehicleCategory) {
      activeVehicleCategory.value = activePlan.value.vehicleCategory.toLowerCase()
    }

    setVehicleCategory(activeVehicleCategory.value)
    await fetchPlansForCategory(activeVehicleCategory.value)
  } catch (error) {
    console.error('Initialization error:', error)
  }
})
</script>

<style scoped>
.driver-subscription-page {
  background: #f8fafc;
  min-height: 100vh;
}

.max-w-700 {
  max-width: 700px;
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

/* Active Plan Card */
.active-plan-card {
  background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%);
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.3);
}

.trial-promo-card {
  background: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: 16px;
}

/* Plan Card */
.plan-card {
  background: #ffffff;
  border-radius: 16px;
  position: relative;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  overflow: hidden;
}

.plan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.1);
}

.plan-featured {
  border: 2px solid #0284c7 !important;
  box-shadow: 0 10px 30px -5px rgba(2, 132, 199, 0.2);
}

.plan-bonus-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #16a34a;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.plan-price-row {
  display: flex;
  align-items: baseline;
}

.currency-symbol {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin-right: 2px;
}

.price-val {
  font-size: 38px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
}

.price-period {
  font-size: 14px;
  color: #64748b;
  margin-left: 6px;
}

.selected-plan-banner {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}
</style>
