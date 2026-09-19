<template>
  <q-page class="trip-details-page q-pa-md">
    <!-- =====================================================
         LOADING STATE
    ====================================================== -->
    <div
      v-if="loading"
      class="row justify-center items-center q-pa-xl"
      style="min-height: 400px"
    >
      <div class="text-center">
        <q-spinner-dots color="primary" size="50px" />
        <div class="text-grey-7 q-mt-md text-subtitle1"
          >Loading trip details...</div
        >
      </div>
    </div>

    <!-- =====================================================
         TRIP CONTENT
    ====================================================== -->
    <div v-else-if="trip">
      <!-- =====================================================
           PAGE HEADER
      ====================================================== -->
      <div class="row items-center justify-between q-mb-lg">
        <div class="row items-center">
          <q-btn
            flat
            round
            icon="arrow_back"
            color="grey-8"
            class="q-mr-sm"
            @click="goBack"
          >
            <q-tooltip>Back</q-tooltip>
          </q-btn>

          <div>
            <div class="text-h5 text-weight-bold text-dark"> Trip Details </div>
            <div class="text-grey-7 q-mt-xs">
              Booking #{{ trip.bookingNumber }}
            </div>
          </div>
        </div>

        <div class="row items-center q-gutter-sm">
          <q-badge
            v-if="trip.otp && trip.status === 'accepted'"
            color="deep-orange"
            class="q-pa-xs text-weight-bold"
          >
            Customer OTP: {{ trip.otp }}
          </q-badge>

          <q-badge
            :color="statusColor(trip.status)"
            class="status-badge text-weight-bold"
          >
            {{ formatStatus(trip.status) }}
          </q-badge>
        </div>
      </div>

      <!-- =====================================================
           TOP SUMMARY CARDS
      ====================================================== -->
      <div class="row q-col-gutter-md q-mb-lg">
        <!-- Date -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="summary-card">
            <q-card-section class="row items-center">
              <q-avatar color="blue-1" text-color="primary" size="45px">
                <q-icon name="event" size="24px" />
              </q-avatar>
              <div class="q-ml-md">
                <div class="text-caption text-grey-6">Trip Date</div>
                <div class="text-body1 text-weight-bold text-dark">
                  {{ formatDate(trip.date) }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Time -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="summary-card">
            <q-card-section class="row items-center">
              <q-avatar color="orange-1" text-color="orange" size="45px">
                <q-icon name="schedule" size="24px" />
              </q-avatar>
              <div class="q-ml-md">
                <div class="text-caption text-grey-6">Pickup Time</div>
                <div class="text-body1 text-weight-bold text-dark">
                  {{ trip.time }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Distance -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="summary-card">
            <q-card-section class="row items-center">
              <q-avatar color="green-1" text-color="positive" size="45px">
                <q-icon name="straighten" size="24px" />
              </q-avatar>
              <div class="q-ml-md">
                <div class="text-caption text-grey-6">Distance</div>
                <div class="text-body1 text-weight-bold text-dark">
                  {{ trip.distance }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Earnings -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="summary-card">
            <q-card-section class="row items-center">
              <q-avatar color="purple-1" text-color="purple" size="45px">
                <q-icon name="payments" size="24px" />
              </q-avatar>
              <div class="q-ml-md">
                <div class="text-caption text-grey-6">Your Net Earnings</div>
                <div class="text-body1 text-weight-bold text-primary">
                  ₹{{ formatAmount(trip.driverEarnings) }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- =====================================================
           MAIN CONTENT
      ====================================================== -->
      <div class="row q-col-gutter-lg">
        <!-- ===================================================
             LEFT COLUMN
        ==================================================== -->
        <div class="col-12 col-lg-8">
          <!-- =================================================
               ROUTE CARD
          ================================================== -->
          <q-card class="content-card q-mb-lg">
            <q-card-section>
              <div class="section-title text-dark">
                <q-icon name="route" color="primary" class="q-mr-sm" />
                Trip Route Details
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <!-- Pickup -->
              <div class="location-row">
                <div class="location-marker pickup-marker">
                  <q-icon name="radio_button_checked" size="20px" />
                </div>
                <div class="location-info">
                  <div class="text-caption text-grey-6">Pickup Location</div>
                  <div class="text-body1 text-weight-bold text-dark">
                    {{ trip.pickup }}
                  </div>
                  <div
                    v-if="trip.pickupLandmark"
                    class="text-caption text-grey-6 q-mt-xs"
                  >
                    Landmark: {{ trip.pickupLandmark }}
                  </div>
                </div>
              </div>

              <!-- Route Line -->
              <div class="location-line">
                <div class="route-line"></div>
              </div>

              <!-- Drop -->
              <div class="location-row">
                <div class="location-marker drop-marker">
                  <q-icon name="location_on" size="21px" />
                </div>
                <div class="location-info">
                  <div class="text-caption text-grey-6">Drop-off Location</div>
                  <div class="text-body1 text-weight-bold text-dark">
                    {{ trip.drop }}
                  </div>
                  <div
                    v-if="trip.dropLandmark"
                    class="text-caption text-grey-6 q-mt-xs"
                  >
                    Landmark: {{ trip.dropLandmark }}
                  </div>
                </div>
              </div>
            </q-card-section>

            <!-- Navigation Buttons -->
            <q-separator />
            <q-card-actions class="q-pa-md q-gutter-sm">
              <q-btn
                outline
                color="primary"
                icon="navigation"
                label="Navigate to Pickup"
                @click="navigateToPickup"
              />
              <q-btn
                outline
                color="deep-orange"
                icon="place"
                label="Navigate to Drop-off"
                @click="navigateToDrop"
              />
              <q-btn
                outline
                color="secondary"
                icon="map"
                label="View Full Route"
                @click="viewRoute"
              />
            </q-card-actions>
          </q-card>

          <!-- =================================================
               CUSTOMER CARD
          ================================================== -->
          <q-card class="content-card q-mb-lg">
            <q-card-section>
              <div class="section-title text-dark">
                <q-icon name="person" color="primary" class="q-mr-sm" />
                Customer Information
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="row items-center">
                <q-avatar size="60px" color="primary" text-color="white">
                  <img
                    v-if="trip.customer.avatar"
                    :src="trip.customer.avatar"
                  />
                  <span v-else>{{ trip.customer.name.charAt(0) }}</span>
                </q-avatar>

                <div class="q-ml-md">
                  <div class="text-h6 text-weight-bold text-dark">
                    {{ trip.customer.name }}
                  </div>
                  <div class="text-caption text-grey-6"> Customer / Rider </div>
                </div>

                <q-space />

                <div class="row q-gutter-sm">
                  <q-btn
                    round
                    outline
                    color="positive"
                    icon="phone"
                    @click="callCustomer"
                  >
                    <q-tooltip>Call Customer</q-tooltip>
                  </q-btn>

                  <q-btn
                    round
                    outline
                    color="primary"
                    icon="message"
                    @click="messageCustomer"
                  >
                    <q-tooltip>Message Customer</q-tooltip>
                  </q-btn>
                </div>
              </div>

              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <div class="info-item">
                    <q-icon name="phone" color="grey-7" />
                    <div class="q-ml-sm">
                      <div class="text-caption text-grey-6">Phone Number</div>
                      <div class="text-body2 text-weight-medium text-dark">
                        {{ trip.customer.phone }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-sm-6">
                  <div class="info-item">
                    <q-icon name="email" color="grey-7" />
                    <div class="q-ml-sm">
                      <div class="text-caption text-grey-6">Email Address</div>
                      <div class="text-body2 text-weight-medium text-dark">
                        {{ trip.customer.email }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- =================================================
               VEHICLE CARD
          ================================================== -->
          <q-card class="content-card q-mb-lg">
            <q-card-section>
              <div class="section-title text-dark">
                <q-icon name="directions_car" color="primary" class="q-mr-sm" />
                Assigned Vehicle Information
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="row items-center">
                <q-avatar size="60px" color="blue-1" text-color="primary">
                  <q-icon name="directions_car" size="32px" />
                </q-avatar>

                <div class="q-ml-md">
                  <div class="text-h6 text-weight-bold text-dark">
                    {{ trip.vehicle.name }}
                  </div>
                  <div class="text-caption text-grey-7">
                    Plate: <strong>{{ trip.vehicle.number }}</strong>
                  </div>
                </div>
              </div>

              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-6 col-sm-3">
                  <div class="vehicle-info">
                    <div class="text-caption text-grey-6">Type</div>
                    <div class="text-body2 text-weight-medium text-dark">
                      {{ trip.vehicle.type }}
                    </div>
                  </div>
                </div>

                <div class="col-6 col-sm-3">
                  <div class="vehicle-info">
                    <div class="text-caption text-grey-6">Model</div>
                    <div class="text-body2 text-weight-medium text-dark">
                      {{ trip.vehicle.model }}
                    </div>
                  </div>
                </div>

                <div class="col-6 col-sm-3">
                  <div class="vehicle-info">
                    <div class="text-caption text-grey-6">Seats</div>
                    <div class="text-body2 text-weight-medium text-dark">
                      {{ trip.vehicle.seats }}
                    </div>
                  </div>
                </div>

                <div class="col-6 col-sm-3">
                  <div class="vehicle-info">
                    <div class="text-caption text-grey-6">Fuel</div>
                    <div class="text-body2 text-weight-medium text-dark">
                      {{ trip.vehicle.fuel }}
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- =================================================
               TRIP TIMELINE
          ================================================== -->
          <q-card class="content-card">
            <q-card-section>
              <div class="section-title text-dark">
                <q-icon name="timeline" color="primary" class="q-mr-sm" />
                Trip Timeline
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <q-timeline color="primary">
                <q-timeline-entry
                  title="Booking Assigned"
                  :subtitle="trip.timeline.assigned || 'Assigned'"
                  icon="assignment"
                >
                  Trip was created and assigned to you.
                </q-timeline-entry>

                <q-timeline-entry
                  title="Trip Accepted"
                  :subtitle="trip.timeline.accepted || 'Pending Acceptance'"
                  icon="check"
                  :color="trip.timeline.accepted ? 'positive' : 'grey'"
                >
                  {{
                    trip.timeline.accepted
                      ? 'You accepted this trip.'
                      : 'Waiting for driver acceptance.'
                  }}
                </q-timeline-entry>

                <q-timeline-entry
                  title="Trip Started"
                  :subtitle="trip.timeline.started || 'Not started'"
                  icon="play_arrow"
                  :color="trip.timeline.started ? 'positive' : 'grey'"
                >
                  {{
                    trip.timeline.started
                      ? 'Trip started from pickup location.'
                      : 'Pending OTP verification.'
                  }}
                </q-timeline-entry>

                <q-timeline-entry
                  v-if="trip.status === 'cancelled'"
                  title="Trip Cancelled"
                  :subtitle="trip.timeline.cancelled || 'Cancelled'"
                  icon="cancel"
                  color="negative"
                >
                  This trip has been cancelled.
                </q-timeline-entry>

                <q-timeline-entry
                  v-else
                  title="Trip Completed"
                  :subtitle="trip.timeline.completed || 'Not completed'"
                  icon="flag"
                  :color="trip.timeline.completed ? 'positive' : 'grey'"
                >
                  {{
                    trip.timeline.completed
                      ? 'Destination reached successfully.'
                      : 'Trip destination in progress.'
                  }}
                </q-timeline-entry>
              </q-timeline>
            </q-card-section>
          </q-card>
        </div>

        <!-- ===================================================
             RIGHT COLUMN
        ==================================================== -->
        <div class="col-12 col-lg-4">
          <!-- =================================================
               BOOKING SUMMARY
          ================================================== -->
          <q-card class="content-card q-mb-lg">
            <q-card-section>
              <div class="section-title text-dark"> Booking Summary </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="summary-row">
                <span class="text-grey-7">Booking ID</span>
                <strong class="text-dark">{{ trip.bookingNumber }}</strong>
              </div>

              <div class="summary-row">
                <span class="text-grey-7">Trip Date</span>
                <strong class="text-dark">{{ formatDate(trip.date) }}</strong>
              </div>

              <div class="summary-row">
                <span class="text-grey-7">Pickup Time</span>
                <strong class="text-dark">{{ trip.time }}</strong>
              </div>

              <div class="summary-row">
                <span class="text-grey-7">Distance</span>
                <strong class="text-dark">{{ trip.distance }}</strong>
              </div>

              <div class="summary-row">
                <span class="text-grey-7">Payment Method</span>
                <strong class="text-dark">{{ trip.paymentMethod }}</strong>
              </div>

              <q-separator class="q-my-md" />

              <div class="summary-row">
                <span class="text-grey-7">Trip Fare</span>
                <strong class="text-dark"
                  >₹{{ formatAmount(trip.fare) }}</strong
                >
              </div>

              <div class="summary-row">
                <span class="text-grey-7">Platform Fee (10%)</span>
                <strong class="text-negative"
                  >- ₹{{ formatAmount(trip.platformFee) }}</strong
                >
              </div>

              <q-separator class="q-my-md" />

              <div class="summary-row total-row">
                <span>Your Net Earnings</span>
                <strong class="text-primary"
                  >₹{{ formatAmount(trip.driverEarnings) }}</strong
                >
              </div>
            </q-card-section>
          </q-card>

          <!-- =================================================
               PAYMENT STATUS
          ================================================== -->
          <q-card class="content-card q-mb-lg">
            <q-card-section>
              <div class="section-title text-dark"> Payment Status </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="row items-center">
                <q-avatar size="44px" color="green-1" text-color="positive">
                  <q-icon name="payments" />
                </q-avatar>

                <div class="q-ml-md">
                  <div class="text-body1 text-weight-bold text-dark">
                    ₹{{ formatAmount(trip.fare) }}
                  </div>
                  <div class="text-caption text-grey-6">
                    {{ trip.paymentMethod }}
                  </div>
                </div>

                <q-space />

                <q-badge
                  :color="trip.paymentStatus === 'Paid' ? 'positive' : 'orange'"
                  class="text-weight-bold"
                >
                  {{ trip.paymentStatus }}
                </q-badge>
              </div>
            </q-card-section>
          </q-card>

          <!-- =================================================
               TRIP ACTIONS
          ================================================== -->
          <q-card class="content-card">
            <q-card-section>
              <div class="section-title q-mb-md text-dark">
                Trip Operations
              </div>

              <!-- PENDING ACTIONS -->
              <div v-if="trip.status === 'pending'" class="q-gutter-y-sm">
                <q-btn
                  unelevated
                  color="primary"
                  icon="check"
                  label="Accept Trip"
                  class="full-width"
                  :loading="isAccepting"
                  @click="acceptTripAction"
                />
                <q-btn
                  flat
                  color="negative"
                  icon="close"
                  label="Reject Trip"
                  class="full-width"
                  @click="openCancelDialog('reject')"
                />
              </div>

              <!-- ACCEPTED ACTIONS -->
              <div v-if="trip.status === 'accepted'" class="q-gutter-y-sm">
                <q-btn
                  unelevated
                  color="positive"
                  icon="play_arrow"
                  label="Start Trip (Enter OTP)"
                  class="full-width"
                  @click="openStartTripModal"
                />
                <q-btn
                  flat
                  color="negative"
                  icon="cancel"
                  label="Cancel Trip"
                  class="full-width"
                  @click="openCancelDialog('cancel')"
                />
              </div>

              <!-- STARTED ACTIONS -->
              <div v-if="trip.status === 'started'" class="q-gutter-y-sm">
                <q-btn
                  unelevated
                  color="positive"
                  icon="check_circle"
                  label="Complete Trip"
                  class="full-width"
                  :loading="isCompleting"
                  @click="completeTripAction"
                />
              </div>

              <!-- COMPLETED ACTIONS -->
              <div v-if="trip.status === 'completed'" class="q-gutter-y-sm">
                <q-btn
                  unelevated
                  color="primary"
                  icon="receipt_long"
                  label="Download Trip Receipt / Tax Invoice"
                  class="full-width"
                  @click="downloadReceiptAction"
                />
                <q-btn
                  flat
                  color="grey-8"
                  icon="dashboard"
                  label="Back to Dashboard"
                  class="full-width"
                  @click="goBack"
                />
              </div>

              <!-- SHORTCUT BUTTONS (Always available for active trips) -->
              <div
                v-if="['pending', 'accepted', 'started'].includes(trip.status)"
                class="q-mt-md q-gutter-y-sm"
              >
                <q-separator class="q-my-sm" />
                <q-btn
                  outline
                  color="positive"
                  icon="phone"
                  label="Call Customer"
                  class="full-width"
                  @click="callCustomer"
                />
                <q-btn
                  outline
                  color="primary"
                  icon="navigation"
                  label="Navigate via GPS"
                  class="full-width"
                  @click="navigateToPickup"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- =====================================================
         NOT FOUND STATE
    ====================================================== -->
    <q-card v-else class="content-card q-pa-xl text-center">
      <q-icon name="search_off" size="64px" color="grey-5" />
      <div class="text-h6 text-weight-bold text-dark q-mt-md">
        Trip Record Not Found
      </div>
      <div class="text-grey-7 q-mt-xs">
        The requested trip could not be found or you do not have permission to
        view it.
      </div>
      <q-btn
        unelevated
        color="primary"
        icon="arrow_back"
        label="Back to Dashboard"
        class="q-mt-lg"
        @click="goBack"
      />
    </q-card>

    <!-- =====================================================
         OTP VERIFICATION MODAL DIALOG
    ====================================================== -->
    <q-dialog v-model="showOtpDialog" persistent>
      <q-card style="width: 420px; max-width: 95vw; border-radius: 12px">
        <q-card-section class="row items-center q-pb-none">
          <div
            class="text-h6 text-weight-bold text-dark row items-center q-gutter-xs"
          >
            <q-icon name="lock_open" color="positive" size="26px" />
            <span>Verify Rider OTP</span>
          </div>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-sm">
          <div class="text-caption text-grey-7 q-mb-md">
            Ask the rider for their 4-digit Ride OTP to start this journey.
          </div>

          <q-input
            v-model="otpInput"
            outlined
            autofocus
            maxlength="6"
            placeholder="Enter 4-digit OTP"
            class="text-h6 text-center"
            input-class="text-center text-weight-bolder"
            @keyup.enter="verifyOtpAndStart"
          >
            <template #prepend>
              <q-icon name="pin" color="primary" />
            </template>
          </q-input>

          <div
            v-if="trip?.otp"
            class="text-caption text-grey-6 text-center q-mt-sm"
          >
            (Demo hint: customer OTP is <strong>{{ trip.otp }}</strong
            >)
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat color="grey-7" label="Cancel" v-close-popup />
          <q-btn
            unelevated
            color="positive"
            icon="play_arrow"
            label="Verify & Start Ride"
            :loading="isVerifyingOtp"
            :disable="!otpInput || otpInput.trim().length < 4"
            @click="verifyOtpAndStart"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- =====================================================
         CANCEL / REJECT MODAL DIALOG
    ====================================================== -->
    <q-dialog v-model="showCancelDialog">
      <q-card style="width: 440px; max-width: 95vw; border-radius: 12px">
        <q-card-section>
          <div
            class="text-h6 text-weight-bold text-negative row items-center q-gutter-xs"
          >
            <q-icon name="warning" size="24px" />
            <span>{{
              cancelActionType === 'reject'
                ? 'Reject Ride Request'
                : 'Cancel Trip'
            }}</span>
          </div>
          <div class="text-caption text-grey-7 q-mt-xs">
            Are you sure you want to {{ cancelActionType }} booking
            <strong>#{{ trip?.bookingNumber }}</strong
            >?
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="cancelReason"
            outlined
            type="textarea"
            rows="2"
            label="Reason (Optional)"
            placeholder="e.g. Vehicle issue, heavy traffic, customer not answering"
          />
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat color="grey-7" label="Go Back" v-close-popup />
          <q-btn
            unelevated
            color="negative"
            icon="cancel"
            :label="
              cancelActionType === 'reject'
                ? 'Confirm Reject'
                : 'Confirm Cancel'
            "
            :loading="isCancelling"
            @click="confirmCancelOrReject"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import driverService from '@/services/driver.service'
import invoiceService from '@/services/invoice.service'

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

// State
const loading = ref(true)
const trip = ref(null)

const isAccepting = ref(false)
const isCompleting = ref(false)
const isCancelling = ref(false)
const isVerifyingOtp = ref(false)

const showOtpDialog = ref(false)
const otpInput = ref('')

const showCancelDialog = ref(false)
const cancelActionType = ref('cancel')
const cancelReason = ref('')

// Extract Trip ID from route parameters or query
const tripId = computed(() => {
  return (
    Number(route.params.id) ||
    Number(route.params.bookingId) ||
    Number(route.query.id) ||
    Number(route.query.tripId) ||
    Number(route.query.bookingId) ||
    null
  )
})

// Format Helpers
function formatDate(date) {
  if (!date) return '-'
  const d = new Date(date)
  if (isNaN(d.getTime())) return String(date)
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

function formatAmount(amount) {
  return Number(amount || 0).toLocaleString('en-IN')
}

function formatStatus(status) {
  const statusMap = {
    pending: 'Pending Acceptance',
    accepted: 'Accepted / En Route',
    started: 'Ride In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    rejected: 'Rejected'
  }
  return statusMap[String(status).toLowerCase()] || status
}

function statusColor(status) {
  const colors = {
    pending: 'orange',
    accepted: 'primary',
    started: 'indigo',
    completed: 'positive',
    cancelled: 'negative',
    rejected: 'negative'
  }
  return colors[String(status).toLowerCase()] || 'grey'
}

// Fetch Trip Details
const loadTrip = async () => {
  loading.value = true
  try {
    if (!tripId.value) {
      trip.value = null
      return
    }

    const data = await driverService.getTripDetails(tripId.value)
    trip.value = data
  } catch (error) {
    console.error('Error loading trip details:', error)
    $q.notify({
      type: 'negative',
      message: 'Failed to load trip details'
    })
  } finally {
    loading.value = false
  }
}

// Accept Trip Action
async function acceptTripAction() {
  if (!trip.value?.id) return
  isAccepting.value = true
  try {
    const res = await driverService.acceptTrip(trip.value.id)
    if (res?.success !== false) {
      trip.value.status = 'accepted'
      if (trip.value.timeline) {
        trip.value.timeline.accepted = new Date().toLocaleString('en-IN')
      }
      $q.notify({
        type: 'positive',
        message: 'Trip accepted successfully! Proceed to pickup location.'
      })
    } else {
      throw new Error(res?.message || 'Unable to accept trip')
    }
  } catch (err) {
    console.error('Accept trip error:', err)
    $q.notify({
      type: 'negative',
      message:
        err.response?.data?.message || err.message || 'Failed to accept trip'
    })
  } finally {
    isAccepting.value = false
  }
}

// Open OTP dialog to Start Trip
function openStartTripModal() {
  otpInput.value = ''
  showOtpDialog.value = true
}

// Verify OTP & Start Trip
async function verifyOtpAndStart() {
  const otp = otpInput.value.trim()
  if (otp.length < 4 || !trip.value?.id) return

  isVerifyingOtp.value = true
  try {
    const res = await driverService.startTrip(trip.value.id, otp)
    if (res?.success !== false) {
      trip.value.status = 'started'
      if (trip.value.timeline) {
        trip.value.timeline.started = new Date().toLocaleString('en-IN')
      }
      showOtpDialog.value = false
      $q.notify({
        type: 'positive',
        message: 'OTP verified! Trip started successfully.'
      })
    } else {
      throw new Error(res?.message || 'Invalid OTP code')
    }
  } catch (err) {
    console.error('Start trip error:', err)
    $q.notify({
      type: 'negative',
      message:
        err.response?.data?.message || err.message || 'Incorrect OTP code'
    })
  } finally {
    isVerifyingOtp.value = false
  }
}

// Complete Trip Action
function completeTripAction() {
  if (!trip.value?.id) return

  $q.dialog({
    title: 'Complete Trip',
    message: `Have you reached the destination and dropped off ${trip.value.customer.name}?`,
    cancel: true,
    persistent: true
  }).onOk(async () => {
    isCompleting.value = true
    try {
      const res = await driverService.completeTrip(trip.value.id)
      if (res?.success !== false) {
        trip.value.status = 'completed'
        trip.value.paymentStatus = 'Paid'
        if (trip.value.timeline) {
          trip.value.timeline.completed = new Date().toLocaleString('en-IN')
        }
        $q.notify({
          type: 'positive',
          message: `Trip completed! Earnings of ₹${formatAmount(trip.value.driverEarnings)} added to your wallet.`,
          icon: 'check_circle'
        })
      } else {
        throw new Error(res?.message || 'Unable to complete trip')
      }
    } catch (err) {
      console.error('Complete trip error:', err)
      $q.notify({
        type: 'negative',
        message:
          err.response?.data?.message ||
          err.message ||
          'Failed to complete trip'
      })
    } finally {
      isCompleting.value = false
    }
  })
}

// Cancel or Reject Dialog
function openCancelDialog(type) {
  cancelActionType.value = type
  cancelReason.value = ''
  showCancelDialog.value = true
}

async function confirmCancelOrReject() {
  if (!trip.value?.id) return
  isCancelling.value = true
  try {
    if (cancelActionType.value === 'reject') {
      await driverService.rejectTrip(trip.value.id, cancelReason.value)
      trip.value.status = 'rejected'
      $q.notify({
        type: 'info',
        message: 'Ride request rejected.'
      })
    } else {
      await driverService.cancelTrip(trip.value.id, cancelReason.value)
      trip.value.status = 'cancelled'
      if (trip.value.timeline) {
        trip.value.timeline.cancelled = new Date().toLocaleString('en-IN')
      }
      $q.notify({
        type: 'negative',
        message: 'Trip cancelled.'
      })
    }
    showCancelDialog.value = false
  } catch (err) {
    console.error('Cancel/Reject error:', err)
    $q.notify({
      type: 'negative',
      message: err.response?.data?.message || 'Failed to process cancellation'
    })
  } finally {
    isCancelling.value = false
  }
}

// Call & Message Customer
function callCustomer() {
  if (!trip.value?.customer?.phone) return
  window.open(`tel:${trip.value.customer.phone}`, '_self')
}

function messageCustomer() {
  if (!trip.value?.customer?.phone) return
  window.open(`sms:${trip.value.customer.phone}`, '_self')
}

// Navigation Handlers
function navigateToPickup() {
  if (!trip.value) return
  if (trip.value.pickupLat && trip.value.pickupLng) {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${trip.value.pickupLat},${trip.value.pickupLng}`,
      '_blank'
    )
  } else {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip.value.pickup)}`,
      '_blank'
    )
  }
}

function navigateToDrop() {
  if (!trip.value) return
  if (trip.value.dropLat && trip.value.dropLng) {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${trip.value.dropLat},${trip.value.dropLng}`,
      '_blank'
    )
  } else {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip.value.drop)}`,
      '_blank'
    )
  }
}

function viewRoute() {
  if (!trip.value) return
  let origin = encodeURIComponent(trip.value.pickup)
  let destination = encodeURIComponent(trip.value.drop)

  if (trip.value.pickupLat && trip.value.pickupLng) {
    origin = `${trip.value.pickupLat},${trip.value.pickupLng}`
  }
  if (trip.value.dropLat && trip.value.dropLng) {
    destination = `${trip.value.dropLat},${trip.value.dropLng}`
  }

  window.open(
    `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`,
    '_blank'
  )
}

// Download Trip Receipt / Tax Invoice
function downloadReceiptAction() {
  if (!trip.value) return
  const invoiceData = {
    id: trip.value.id,
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(trip.value.id).padStart(4, '0')}`,
    bookingNumber: trip.value.bookingNumber,
    bookingDate: trip.value.date,
    bookingTime: trip.value.time,
    invoiceDate: trip.value.date,
    pickupLocation: trip.value.pickup,
    dropLocation: trip.value.drop,
    distance: trip.value.distance,
    vehicleName: trip.value.vehicle.name,
    vehicleType: trip.value.vehicle.type,
    vehicleNumber: trip.value.vehicle.number,
    driverName: 'You (Driver)',
    driverMobile: '',
    customerName: trip.value.customer.name,
    mobile: trip.value.customer.phone,
    email: trip.value.customer.email,
    vehicleFare: Math.round(trip.value.fare / 1.05),
    tax: Math.round(trip.value.fare - trip.value.fare / 1.05),
    totalAmount: trip.value.fare,
    paymentStatus: 'Paid',
    paymentMethod: trip.value.paymentMethod
  }
  invoiceService.downloadInvoice(invoiceData)
  $q.notify({
    type: 'positive',
    message: 'Trip receipt opened for printing / PDF save.',
    icon: 'receipt_long'
  })
}

// Navigation back
function goBack() {
  router.push({ name: 'DriverDashboard' })
}

onMounted(() => {
  loadTrip()
})
</script>

<style scoped>
/* =====================================================
   PAGE
===================================================== */
.trip-details-page {
  min-height: 100vh;
  background: #f6f8fb;
}

/* =====================================================
   SUMMARY CARDS
===================================================== */
.summary-card {
  border-radius: 14px;
  border: 1px solid #e7eaf0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

/* =====================================================
   CONTENT CARD
===================================================== */
.content-card {
  border-radius: 16px;
  border: 1px solid #e7eaf0;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.05);
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 700;
}

/* =====================================================
   STATUS
===================================================== */
.status-badge {
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
}

/* =====================================================
   LOCATION
===================================================== */
.location-row {
  display: flex;
  align-items: flex-start;
}

.location-marker {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pickup-marker {
  background: #e8f1ff;
  color: #1976d2;
}

.drop-marker {
  background: #ffebee;
  color: #e53935;
}

.location-info {
  margin-left: 14px;
  flex: 1;
}

.location-line {
  height: 42px;
  margin-left: 16px;
  display: flex;
  align-items: center;
}

.route-line {
  height: 100%;
  border-left: 2px dashed #cfd4da;
}

/* =====================================================
   INFO & VEHICLE
===================================================== */
.info-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f8f9fb;
  border-radius: 10px;
}

.vehicle-info {
  padding: 12px;
  background: #f8f9fb;
  border-radius: 10px;
}

/* =====================================================
   SUMMARY ROW
===================================================== */
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.total-row {
  font-size: 17px;
  font-weight: 700;
}

/* =====================================================
   MOBILE
===================================================== */
@media (max-width: 600px) {
  .trip-details-page {
    padding: 12px !important;
  }

  .content-card {
    border-radius: 12px;
  }

  .summary-card {
    border-radius: 12px;
  }

  .status-badge {
    padding: 6px 10px;
  }
}
</style>
