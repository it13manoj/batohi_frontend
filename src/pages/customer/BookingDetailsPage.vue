<template>
  <q-page class="booking-details-page">
    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header">
      <div>
        <div class="page-title"> Booking Details </div>
        <div class="page-subtitle">
          View complete information about your booking and download invoice.
        </div>
      </div>

      <div class="row items-center q-gutter-sm">
        <q-btn
          v-if="isActiveRide"
          unelevated
          rounded
          color="secondary"
          icon="near_me"
          label="Track Live Ride"
          class="pulse-btn"
          @click="trackRide"
        />

        <q-btn
          flat
          color="primary"
          icon="arrow_back"
          label="Back to My Bookings"
          @click="goBack"
        />
      </div>
    </div>

    <!-- =====================================================
         LOADING
    ====================================================== -->
    <div v-if="loading" class="loading-container">
      <q-spinner color="primary" size="50px" />
      <div class="loading-text"> Loading booking details... </div>
    </div>

    <!-- =====================================================
         BOOKING CONTENT
    ====================================================== -->
    <div v-else-if="booking" class="booking-container">
      <!-- =================================================
           BOOKING HEADER CARD
      ================================================== -->
      <q-card class="booking-header-card">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <div class="booking-number">
                Booking #{{ booking.bookingNumber }}
              </div>
              <div class="booking-created">
                Booked on {{ formatDate(booking.createdAt) }}
              </div>
            </div>

            <div class="row items-center q-gutter-sm">
              <q-badge
                v-if="booking.otp && isActiveRide"
                color="deep-orange"
                class="otp-badge q-pa-sm text-weight-bold"
              >
                <q-icon name="pin" size="16px" class="q-mr-xs" />
                Ride OTP: {{ booking.otp }}
              </q-badge>

              <q-badge
                :color="getStatusColor(booking.status)"
                class="status-badge"
              >
                {{ booking.status }}
              </q-badge>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- =================================================
           MAIN CONTENT
      ================================================== -->
      <div class="row q-col-gutter-lg q-mt-lg">
        <!-- =================================================
             LEFT SIDE
        ================================================== -->
        <div class="col-12 col-md-8">
          <!-- =================================================
               VEHICLE CARD
          ================================================== -->
          <q-card class="details-card">
            <q-card-section>
              <div class="section-title">
                <q-icon name="directions_car" color="primary" size="27px" />
                Vehicle Information
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="vehicle-info">
                <div class="vehicle-image">
                  <q-icon name="directions_car" size="70px" color="primary" />
                </div>

                <div class="vehicle-content">
                  <div class="vehicle-name">
                    {{ booking.vehicleName }}
                  </div>

                  <div class="vehicle-type">
                    {{ booking.vehicleType }}
                  </div>

                  <div class="vehicle-features">
                    <div class="vehicle-feature">
                      <q-icon name="people" color="primary" />
                      {{ booking.passengers || 4 }} Passengers
                    </div>

                    <div v-if="booking.vehicleNumber" class="vehicle-feature">
                      <q-icon name="badge" color="primary" />
                      Reg: {{ booking.vehicleNumber }}
                    </div>

                    <div class="vehicle-feature">
                      <q-icon name="person" color="primary" />
                      Driver Included
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- =================================================
               DRIVER INFORMATION CARD (Dynamic)
          ================================================== -->
          <q-card v-if="booking.driverName" class="details-card q-mt-lg">
            <q-card-section>
              <div class="section-title">
                <q-icon
                  name="airline_seat_recline_normal"
                  color="primary"
                  size="27px"
                />
                Assigned Driver
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="driver-card-inner row items-center justify-between">
                <div class="row items-center q-gutter-md">
                  <q-avatar size="56px" color="blue-1" text-color="primary">
                    <img
                      v-if="booking.driverImage"
                      :src="booking.driverImage"
                    />
                    <q-icon v-else name="person" size="32px" />
                  </q-avatar>

                  <div>
                    <div class="text-subtitle1 text-weight-bold text-dark">
                      {{ booking.driverName }}
                    </div>
                    <div
                      v-if="booking.vehicleNumber"
                      class="text-caption text-grey-7"
                    >
                      Plate: <strong>{{ booking.vehicleNumber }}</strong>
                    </div>
                    <div
                      v-if="booking.driverRating"
                      class="row items-center q-gutter-xs text-amber-9 q-mt-xs"
                    >
                      <q-icon name="star" size="16px" />
                      <span class="text-weight-bold text-caption"
                        >{{ booking.driverRating }} / 5.0</span
                      >
                    </div>
                  </div>
                </div>

                <div v-if="booking.driverMobile" class="q-mt-sm-none q-mt-sm">
                  <q-btn
                    unelevated
                    rounded
                    color="positive"
                    icon="phone"
                    label="Call Driver"
                    :href="'tel:' + booking.driverMobile"
                    target="_blank"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- =================================================
               TRIP DETAILS
          ================================================== -->
          <q-card class="details-card q-mt-lg">
            <q-card-section>
              <div class="section-title">
                <q-icon name="route" color="primary" size="27px" />
                Trip Details
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="trip-route">
                <!-- PICKUP -->
                <div class="location-item">
                  <div class="location-icon pickup-icon">
                    <q-icon
                      name="radio_button_checked"
                      color="positive"
                      size="20px"
                    />
                  </div>
                  <div class="location-content">
                    <div class="location-label"> Pickup Location </div>
                    <div class="location-value">
                      {{ booking.pickupLocation }}
                    </div>
                  </div>
                </div>

                <div class="route-line"></div>

                <!-- DROP -->
                <div class="location-item">
                  <div class="location-icon drop-icon">
                    <q-icon name="location_on" color="negative" size="22px" />
                  </div>
                  <div class="location-content">
                    <div class="location-label"> Drop Location </div>
                    <div class="location-value">
                      {{ booking.dropLocation }}
                    </div>
                  </div>
                </div>
              </div>

              <q-separator class="q-my-lg" />

              <div class="trip-info-grid">
                <!-- DATE -->
                <div class="trip-info">
                  <div class="trip-info-icon">
                    <q-icon name="event" color="primary" size="24px" />
                  </div>
                  <div>
                    <div class="trip-info-label"> Journey Date </div>
                    <div class="trip-info-value">
                      {{ formatDate(booking.bookingDate) }}
                    </div>
                  </div>
                </div>

                <!-- TIME -->
                <div class="trip-info">
                  <div class="trip-info-icon">
                    <q-icon name="schedule" color="primary" size="24px" />
                  </div>
                  <div>
                    <div class="trip-info-label"> Pickup Time </div>
                    <div class="trip-info-value">
                      {{ booking.bookingTime }}
                    </div>
                  </div>
                </div>

                <!-- PASSENGERS -->
                <div class="trip-info">
                  <div class="trip-info-icon">
                    <q-icon name="groups" color="primary" size="24px" />
                  </div>
                  <div>
                    <div class="trip-info-label"> Passengers </div>
                    <div class="trip-info-value">
                      {{ booking.passengers || 4 }}
                    </div>
                  </div>
                </div>

                <!-- DISTANCE -->
                <div class="trip-info">
                  <div class="trip-info-icon">
                    <q-icon name="straighten" color="primary" size="24px" />
                  </div>
                  <div>
                    <div class="trip-info-label"> Distance </div>
                    <div class="trip-info-value">
                      {{ booking.distance || 'Estimated on route' }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- RETURN DETAILS -->
              <div v-if="booking.returnTrip" class="return-box q-mt-lg">
                <div class="return-title">
                  <q-icon name="event_repeat" color="primary" />
                  Return Journey
                </div>

                <div class="return-details">
                  <div>
                    <span>Return Date</span>
                    <strong>{{ formatDate(booking.returnDate) }}</strong>
                  </div>
                  <div>
                    <span>Return Time</span>
                    <strong>{{ booking.returnTime }}</strong>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- =================================================
               CUSTOMER INFORMATION
          ================================================== -->
          <q-card class="details-card q-mt-lg">
            <q-card-section>
              <div class="section-title">
                <q-icon name="person" color="primary" size="27px" />
                Customer Information
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="customer-grid">
                <div class="customer-item">
                  <div class="customer-label"> Full Name </div>
                  <div class="customer-value">
                    {{ booking.customerName }}
                  </div>
                </div>

                <div class="customer-item">
                  <div class="customer-label"> Mobile Number </div>
                  <div class="customer-value">
                    {{ booking.mobile || 'N/A' }}
                  </div>
                </div>

                <div class="customer-item">
                  <div class="customer-label"> Email </div>
                  <div class="customer-value">
                    {{ booking.email || 'customer@batohidriver.com' }}
                  </div>
                </div>

                <div class="customer-item">
                  <div class="customer-label"> Special Request </div>
                  <div class="customer-value">
                    {{ booking.specialRequest || 'None' }}
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- =================================================
               BOOKING TIMELINE
          ================================================== -->
          <q-card class="details-card q-mt-lg">
            <q-card-section>
              <div class="section-title">
                <q-icon name="timeline" color="primary" size="27px" />
                Booking Timeline
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <q-timeline color="primary">
                <q-timeline-entry
                  title="Booking Created"
                  :subtitle="formatDateTime(booking.createdAt)"
                  icon="add_circle"
                >
                  <div> Your booking request was created successfully. </div>
                </q-timeline-entry>

                <q-timeline-entry
                  v-if="booking.status !== 'Pending'"
                  title="Booking Confirmed / Assigned"
                  :subtitle="
                    formatDateTime(booking.confirmedAt || booking.createdAt)
                  "
                  icon="check_circle"
                  color="positive"
                >
                  <div> Vehicle booking has been confirmed. </div>
                </q-timeline-entry>

                <q-timeline-entry
                  v-if="['Started', 'Completed'].includes(booking.status)"
                  title="Trip Started"
                  :subtitle="
                    formatDateTime(booking.confirmedAt || booking.createdAt)
                  "
                  icon="directions_car"
                  color="primary"
                >
                  <div> The ride is currently in progress. </div>
                </q-timeline-entry>

                <q-timeline-entry
                  v-if="booking.paymentStatus === 'Paid'"
                  title="Payment Completed"
                  :subtitle="
                    formatDateTime(booking.paidAt || booking.createdAt)
                  "
                  icon="payments"
                  color="positive"
                >
                  <div> Payment has been received successfully. </div>
                </q-timeline-entry>

                <q-timeline-entry
                  v-if="booking.status === 'Completed'"
                  title="Trip Completed"
                  :subtitle="
                    formatDateTime(booking.completedAt || booking.confirmedAt)
                  "
                  icon="task_alt"
                  color="teal"
                >
                  <div> Your trip has been completed. </div>
                </q-timeline-entry>

                <q-timeline-entry
                  v-if="booking.status === 'Cancelled'"
                  title="Booking Cancelled"
                  :subtitle="formatDateTime(booking.cancelledAt)"
                  icon="cancel"
                  color="negative"
                >
                  <div> This booking has been cancelled. </div>
                </q-timeline-entry>
              </q-timeline>
            </q-card-section>
          </q-card>
        </div>

        <!-- =================================================
             RIGHT SIDE
        ================================================== -->
        <div class="col-12 col-md-4">
          <!-- =================================================
               PAYMENT SUMMARY
          ================================================== -->
          <q-card class="summary-card">
            <q-card-section>
              <div class="section-title">
                <q-icon name="receipt_long" color="primary" size="27px" />
                Payment Summary
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="summary-row">
                <span>Vehicle Fare</span>
                <strong>₹{{ formatAmount(booking.vehicleFare) }}</strong>
              </div>

              <div class="summary-row">
                <span>Taxes & GST (5%)</span>
                <strong>₹{{ formatAmount(booking.tax) }}</strong>
              </div>

              <div v-if="booking.discount" class="summary-row">
                <span>Discount</span>
                <strong class="discount"
                  >- ₹{{ formatAmount(booking.discount) }}</strong
                >
              </div>

              <q-separator class="q-my-md" />

              <div class="total-row">
                <span>Total Amount</span>
                <strong>₹{{ formatAmount(booking.totalAmount) }}</strong>
              </div>

              <div class="payment-status">
                <q-icon
                  :name="
                    booking.paymentStatus === 'Paid'
                      ? 'check_circle'
                      : 'schedule'
                  "
                  :color="
                    booking.paymentStatus === 'Paid' ? 'positive' : 'orange'
                  "
                  size="22px"
                />
                <span>Payment: {{ booking.paymentStatus }}</span>
              </div>
            </q-card-section>
          </q-card>

          <!-- =================================================
               ACTIONS
          ================================================== -->
          <q-card class="action-card q-mt-lg">
            <q-card-section>
              <div class="action-title"> Booking Actions </div>

              <!-- TRACK RIDE (For Active Rides) -->
              <q-btn
                v-if="isActiveRide"
                unelevated
                rounded
                color="secondary"
                icon="near_me"
                label="Track Live Ride"
                class="full-width q-mb-sm pulse-btn"
                @click="trackRide"
              />

              <!-- MAKE PAYMENT -->
              <q-btn
                v-if="
                  booking.paymentStatus !== 'Paid' &&
                  booking.status !== 'Cancelled'
                "
                unelevated
                rounded
                color="primary"
                icon="payments"
                label="Make Payment"
                class="full-width q-mb-sm"
                @click="makePayment"
              />

              <!-- DOWNLOAD INVOICE (Dynamic!) -->
              <q-btn
                unelevated
                rounded
                color="primary"
                icon="download"
                label="Download Invoice"
                class="full-width q-mb-sm"
                @click="downloadInvoiceAction"
              />

              <!-- VIEW INVOICE (Opens preview dialog) -->
              <q-btn
                outline
                rounded
                color="primary"
                icon="receipt_long"
                label="View Invoice"
                class="full-width q-mb-sm"
                @click="viewInvoiceModal"
              />

              <!-- CANCEL BOOKING -->
              <q-btn
                v-if="canCancel"
                flat
                rounded
                color="negative"
                icon="cancel"
                label="Cancel Booking"
                class="full-width"
                @click="openCancelDialog"
              />

              <!-- BOOK AGAIN -->
              <q-btn
                v-if="
                  booking.status === 'Completed' ||
                  booking.status === 'Cancelled'
                "
                flat
                rounded
                color="primary"
                icon="directions_car"
                label="Book Again"
                class="full-width q-mt-sm"
                @click="bookAgain"
              />
            </q-card-section>
          </q-card>

          <!-- =================================================
               SUPPORT
          ================================================== -->
          <q-card class="support-card q-mt-lg">
            <q-card-section>
              <div class="support-content">
                <q-icon name="support_agent" color="primary" size="35px" />
                <div>
                  <div class="support-title"> Need Help? </div>
                  <div class="support-text">
                    Contact our 24x7 support team for booking assistance.
                  </div>
                </div>
              </div>

              <q-btn
                flat
                rounded
                color="primary"
                icon="headset_mic"
                label="Contact Support"
                class="full-width q-mt-md"
                @click="contactSupport"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- =====================================================
         NOT FOUND
    ====================================================== -->
    <q-card v-else class="empty-card">
      <q-card-section class="empty-content">
        <q-icon name="search_off" size="70px" color="grey-5" />
        <div class="empty-title"> Booking Not Found </div>
        <div class="empty-text">
          We could not find the requested booking details.
        </div>
        <q-btn
          unelevated
          rounded
          color="primary"
          icon="arrow_back"
          label="Back to My Bookings"
          class="q-mt-md"
          @click="goBack"
        />
      </q-card-section>
    </q-card>

    <!-- =====================================================
         CANCEL DIALOG
    ====================================================== -->
    <q-dialog v-model="showCancelDialog">
      <q-card style="width: 480px; max-width: 95vw">
        <q-card-section>
          <div class="dialog-title">
            <q-icon name="warning" color="negative" size="28px" />
            Cancel Booking
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="dialog-text">
            Are you sure you want to cancel booking
            <strong>#{{ booking?.bookingNumber }}</strong
            >?
          </div>
          <div class="cancel-note q-mt-md">
            Cancellation charges may apply according to the booking cancellation
            policy.
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat color="grey-7" label="Keep Booking" v-close-popup />
          <q-btn
            unelevated
            color="negative"
            icon="cancel"
            label="Cancel Booking"
            :loading="cancelling"
            @click="cancelBooking"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- =====================================================
         INVOICE PREVIEW DIALOG
    ====================================================== -->
    <q-dialog v-model="showInvoicePreviewDialog" maximized-on-mobile>
      <q-card style="width: 780px; max-width: 95vw; border-radius: 12px">
        <q-card-section class="row items-center justify-between q-pb-none">
          <div
            class="text-h6 text-weight-bold text-primary row items-center q-gutter-sm"
          >
            <q-icon name="receipt_long" size="26px" />
            <span>Tax Invoice</span>
            <q-badge
              color="blue-1"
              text-color="primary"
              class="q-ml-sm text-weight-bold"
            >
              {{ currentInvoice?.invoiceNumber }}
            </q-badge>
          </div>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-separator class="q-my-md" />

        <q-card-section
          class="q-pt-none"
          v-if="currentInvoice"
          style="max-height: 70vh; overflow-y: auto"
        >
          <div class="invoice-preview-container q-pa-md bg-white">
            <div class="row justify-between items-start q-mb-md">
              <div>
                <div class="text-h5 text-weight-bolder text-primary"
                  >BatohiDrive</div
                >
                <div class="text-caption text-grey-7"
                  >Batohi Technologies Pvt. Ltd.</div
                >
                <div class="text-caption text-grey-6"
                  >Patna, Bihar, India - 800001</div
                >
                <div class="text-caption text-grey-6"
                  >GSTIN: 10AAACB1234F1Z5</div
                >
              </div>
              <div class="text-right">
                <q-badge
                  :color="
                    currentInvoice.paymentStatus === 'Paid'
                      ? 'positive'
                      : 'warning'
                  "
                  class="q-pa-xs text-weight-bold"
                  style="font-size: 13px"
                >
                  {{ currentInvoice.paymentStatus.toUpperCase() }}
                </q-badge>
                <div class="text-caption text-grey-7 q-mt-xs"
                  >Date: {{ currentInvoice.invoiceDate }}</div
                >
                <div class="text-caption text-grey-7"
                  >Booking: {{ currentInvoice.bookingNumber }}</div
                >
              </div>
            </div>

            <q-separator class="q-my-md" />

            <div class="row q-col-gutter-md q-mb-md">
              <div class="col-12 col-sm-6">
                <div
                  class="text-subtitle2 text-weight-bold text-primary q-mb-xs"
                  >Billed To</div
                >
                <div class="text-body2 text-weight-medium">{{
                  currentInvoice.customerName
                }}</div>
                <div class="text-caption text-grey-7"
                  >Phone: {{ currentInvoice.mobile || 'N/A' }}</div
                >
                <div class="text-caption text-grey-7"
                  >Email: {{ currentInvoice.email || 'N/A' }}</div
                >
              </div>
              <div class="col-12 col-sm-6">
                <div
                  class="text-subtitle2 text-weight-bold text-primary q-mb-xs"
                  >Ride & Driver Details</div
                >
                <div class="text-body2 text-weight-medium"
                  >{{ currentInvoice.vehicleName }} ({{
                    currentInvoice.vehicleType
                  }})</div
                >
                <div class="text-caption text-grey-7"
                  >Vehicle Reg: {{ currentInvoice.vehicleNumber || 'N/A' }}</div
                >
                <div class="text-caption text-grey-7"
                  >Driver: {{ currentInvoice.driverName }} ({{
                    currentInvoice.driverMobile || 'N/A'
                  }})</div
                >
              </div>
            </div>

            <!-- Route Info -->
            <div class="bg-grey-1 q-pa-sm rounded-borders q-mb-md">
              <div class="text-caption text-weight-bold text-grey-8 q-mb-xs"
                >Trip Route</div
              >
              <div class="row items-center q-gutter-xs text-caption">
                <q-badge color="positive" label="Pickup" class="q-mr-xs" />
                <span class="text-weight-medium">{{
                  currentInvoice.pickupLocation
                }}</span>
              </div>
              <div class="row items-center q-gutter-xs text-caption q-mt-xs">
                <q-badge color="negative" label="Drop" class="q-mr-xs" />
                <span class="text-weight-medium">{{
                  currentInvoice.dropLocation
                }}</span>
              </div>
              <div
                class="text-caption text-grey-7 q-mt-xs"
                v-if="currentInvoice.distance"
              >
                Distance: <strong>{{ currentInvoice.distance }}</strong>
              </div>
            </div>

            <!-- Fare Breakdown Table -->
            <q-markup-table flat bordered dense class="q-mb-md">
              <thead class="bg-grey-2">
                <tr>
                  <th class="text-left">Description</th>
                  <th class="text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left">Base Vehicle Fare</td>
                  <td class="text-right"
                    >₹{{ formatAmount(currentInvoice.vehicleFare) }}</td
                  >
                </tr>
                <tr>
                  <td class="text-left">Central GST (CGST @ 2.5%)</td>
                  <td class="text-right"
                    >₹{{ formatAmount(currentInvoice.cgst) }}</td
                  >
                </tr>
                <tr>
                  <td class="text-left">State GST (SGST @ 2.5%)</td>
                  <td class="text-right"
                    >₹{{ formatAmount(currentInvoice.sgst) }}</td
                  >
                </tr>
                <tr v-if="currentInvoice.discount">
                  <td class="text-left text-positive"
                    >Promotional Discount Applied</td
                  >
                  <td class="text-right text-positive"
                    >-₹{{ formatAmount(currentInvoice.discount) }}</td
                  >
                </tr>
                <tr class="text-weight-bold bg-blue-1 text-primary">
                  <td class="text-left text-subtitle2"
                    >Total Amount (Inclusive of Taxes)</td
                  >
                  <td class="text-right text-subtitle2"
                    >₹{{ formatAmount(currentInvoice.totalAmount) }}</td
                  >
                </tr>
              </tbody>
            </q-markup-table>

            <div class="text-caption text-grey-7 text-italic">
              * This is an electronically generated tax invoice for passenger
              road transportation.
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="between" class="q-pa-md">
          <q-btn
            flat
            color="primary"
            icon="description"
            label="Download File (.html)"
            @click="downloadInvoiceFileAction"
          />
          <div class="q-gutter-sm">
            <q-btn flat color="grey-7" label="Close" v-close-popup />
            <q-btn
              unelevated
              color="primary"
              icon="print"
              label="Print / Save PDF"
              @click="downloadInvoiceAction"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import bookingService from '@/services/booking.service'
import invoiceService from '@/services/invoice.service'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

// State
const loading = ref(true)
const booking = ref(null)
const showCancelDialog = ref(false)
const cancelling = ref(false)

const showInvoicePreviewDialog = ref(false)
const currentInvoice = ref(null)

// Parse Booking ID from route query or route params
const bookingId = computed(() => {
  return (
    Number(route.params.bookingId) ||
    Number(route.params.id) ||
    Number(route.query.bookingId) ||
    Number(route.query.id) ||
    null
  )
})

// Check if booking is in active progress
const isActiveRide = computed(() => {
  if (!booking.value) return false
  const status = String(booking.value.status || '').toLowerCase()
  return ['pending', 'accepted', 'confirmed', 'started'].includes(status)
})

// Load Booking Details dynamically from API
const loadBookingDetails = async () => {
  loading.value = true
  try {
    if (!bookingId.value) {
      booking.value = null
      return
    }

    const data = await bookingService.getBookingById(bookingId.value)
    booking.value = data
  } catch (error) {
    console.error('Error loading booking:', error)
    booking.value = null
    $q.notify({
      type: 'negative',
      message: 'Unable to load booking details',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

// Track Live Ride
const trackRide = () => {
  if (!booking.value?.id) return
  router.push({
    name: 'ride-tracking',
    params: { bookingId: booking.value.id }
  })
}

// Status Color helper
const getStatusColor = status => {
  switch (String(status).trim()) {
    case 'Confirmed':
      return 'positive'
    case 'Accepted':
      return 'primary'
    case 'Started':
      return 'indigo'
    case 'Pending':
      return 'orange'
    case 'Completed':
      return 'teal'
    case 'Cancelled':
    case 'Rejected':
      return 'negative'
    default:
      return 'grey'
  }
}

// Can Cancel
const canCancel = computed(() => {
  if (!booking.value) return false
  const status = String(booking.value.status).toLowerCase()
  return status === 'pending' || status === 'confirmed' || status === 'accepted'
})

const openCancelDialog = () => {
  showCancelDialog.value = true
}

// Cancel Booking via API
const cancelBooking = async () => {
  if (!booking.value) return
  cancelling.value = true
  try {
    await bookingService.cancelBooking(booking.value.id)
    booking.value.status = 'Cancelled'
    booking.value.cancelledAt = new Date().toISOString()
    showCancelDialog.value = false
    $q.notify({
      type: 'positive',
      message: 'Booking cancelled successfully',
      position: 'top'
    })
  } catch (err) {
    console.error('Error cancelling booking:', err)
    $q.notify({
      type: 'negative',
      message: err.response?.data?.message || 'Failed to cancel booking',
      position: 'top'
    })
  } finally {
    cancelling.value = false
  }
}

// Make Payment
const makePayment = () => {
  router.push({
    name: 'customer-payments',
    query: {
      bookingId: booking.value.id,
      amount: booking.value.totalAmount
    }
  })
}

// View Invoice Modal
const viewInvoiceModal = () => {
  if (!booking.value) return
  currentInvoice.value = invoiceService.mapBookingToInvoice(booking.value)
  showInvoicePreviewDialog.value = true
}

// Download Invoice Action (generates printable Tax Invoice & triggers print/PDF)
const downloadInvoiceAction = () => {
  if (!booking.value) return
  const inv = invoiceService.mapBookingToInvoice(booking.value)
  invoiceService.downloadInvoice(inv)
  $q.notify({
    type: 'positive',
    message: `Tax Invoice ${inv.invoiceNumber} opened for printing / PDF save.`,
    position: 'top',
    icon: 'receipt_long'
  })
}

// Direct File Download Action (.html standalone file)
const downloadInvoiceFileAction = () => {
  if (!booking.value) return
  const inv = invoiceService.mapBookingToInvoice(booking.value)
  invoiceService.downloadInvoiceFile(inv)
  $q.notify({
    type: 'positive',
    message: `Invoice ${inv.invoiceNumber} file downloaded to your device.`,
    position: 'top',
    icon: 'download'
  })
}

// Book Again
const bookAgain = () => {
  router.push({
    name: 'customer-search-vehicle',
    query: {
      vehicleId: booking.value.vehicleId
    }
  })
}

// Contact Support
const contactSupport = () => {
  $q.notify({
    type: 'info',
    message: 'Our support team has been notified and will contact you shortly.',
    position: 'top'
  })
}

// Back
const goBack = () => {
  router.push({
    name: 'customer-my-bookings'
  })
}

// Format Date
const formatDate = date => {
  if (!date) return '-'
  const dateObject = new Date(date)
  if (isNaN(dateObject.getTime())) return String(date)
  return dateObject.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

// Format Date Time
const formatDateTime = date => {
  if (!date) return '-'
  const dateObject = new Date(date)
  if (isNaN(dateObject.getTime())) return String(date)
  return dateObject.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Format Amount
const formatAmount = amount => {
  return Number(amount || 0).toLocaleString('en-IN')
}

onMounted(() => {
  loadBookingDetails()
})
</script>

<style scoped>
/* =====================================================
   PAGE
===================================================== */
.booking-details-page {
  min-height: 100%;
  padding: 28px;
  background: #f5f7fb;
}

/* =====================================================
   HEADER
===================================================== */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-title {
  font-size: 27px;
  font-weight: 700;
  color: #172033;
}

.page-subtitle {
  margin-top: 4px;
  color: #6d788d;
  font-size: 14px;
}

.pulse-btn {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(38, 166, 154, 0.6);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(38, 166, 154, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(38, 166, 154, 0);
  }
}

/* =====================================================
   LOADING
===================================================== */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 360px;
}

.loading-text {
  margin-top: 14px;
  font-size: 15px;
  color: #6d788d;
}

/* =====================================================
   BOOKING HEADER CARD
===================================================== */
.booking-header-card {
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.booking-number {
  font-size: 21px;
  font-weight: 700;
  color: #172033;
}

.booking-created {
  margin-top: 4px;
  color: #6d788d;
  font-size: 13px;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}

.otp-badge {
  border-radius: 8px;
  letter-spacing: 0.5px;
}

/* =====================================================
   DETAILS CARD
===================================================== */
.details-card {
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  font-weight: 700;
  color: #172033;
}

/* =====================================================
   VEHICLE
===================================================== */
.vehicle-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.vehicle-image {
  width: 110px;
  height: 90px;
  border-radius: 12px;
  background: #eef4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.vehicle-name {
  font-size: 18px;
  font-weight: 700;
  color: #172033;
}

.vehicle-type {
  margin-top: 3px;
  color: #6d788d;
  font-size: 14px;
}

.vehicle-features {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
}

.vehicle-feature {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #4b5563;
  background: #f3f4f6;
  padding: 4px 10px;
  border-radius: 6px;
}

/* =====================================================
   DRIVER
===================================================== */
.driver-card-inner {
  padding: 4px 0;
}

/* =====================================================
   TRIP ROUTE
===================================================== */
.trip-route {
  display: flex;
  flex-direction: column;
}

.location-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.location-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pickup-icon {
  background: #ecfdf5;
}

.drop-icon {
  background: #fef2f2;
}

.route-line {
  width: 2px;
  height: 30px;
  background: #dbe2ea;
  margin-left: 17px;
}

.location-label {
  font-size: 12px;
  color: #8a94a6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.location-value {
  font-size: 15px;
  font-weight: 600;
  color: #172033;
  margin-top: 3px;
}

.trip-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.trip-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.trip-info-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #eef4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.trip-info-label {
  font-size: 12px;
  color: #8a94a6;
}

.trip-info-value {
  font-size: 14px;
  font-weight: 600;
  color: #172033;
  margin-top: 2px;
}

.return-box {
  padding: 14px;
  border-radius: 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.return-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: #15803d;
  font-size: 14px;
  margin-bottom: 8px;
}

.return-details {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

/* =====================================================
   CUSTOMER GRID
===================================================== */
.customer-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.customer-label {
  font-size: 12px;
  color: #8a94a6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.customer-value {
  font-size: 14px;
  font-weight: 600;
  color: #172033;
  margin-top: 4px;
}

/* =====================================================
   PAYMENT SUMMARY CARD
===================================================== */
.summary-card {
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: #586377;
}

.summary-row strong {
  color: #172033;
}

.summary-row .discount {
  color: #10b981;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  color: #172033;
  margin-bottom: 14px;
}

.payment-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #f9fafb;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

/* =====================================================
   ACTIONS CARD
===================================================== */
.action-card {
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.action-title {
  font-size: 16px;
  font-weight: 700;
  color: #172033;
  margin-bottom: 14px;
}

/* =====================================================
   SUPPORT CARD
===================================================== */
.support-card {
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.support-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.support-title {
  font-size: 15px;
  font-weight: 700;
  color: #172033;
}

.support-text {
  font-size: 12px;
  color: #6d788d;
  margin-top: 2px;
}

/* =====================================================
   EMPTY
===================================================== */
.empty-card {
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.empty-content {
  text-align: center;
  padding: 48px 24px;
}

.empty-title {
  font-size: 20px;
  font-weight: 700;
  color: #172033;
  margin-top: 14px;
}

.empty-text {
  color: #6d788d;
  font-size: 14px;
  margin-top: 6px;
}

/* =====================================================
   CANCEL DIALOG
===================================================== */
.dialog-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #172033;
}

.dialog-text {
  font-size: 14px;
  color: #4b5563;
}

.cancel-note {
  padding: 12px;
  border-radius: 10px;
  background: #fff7ed;
  color: #9a5b16;
  font-size: 13px;
  line-height: 1.5;
}

/* =====================================================
   INVOICE PREVIEW MODAL
===================================================== */
.invoice-preview-container {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

/* =====================================================
   RESPONSIVE
===================================================== */
@media (max-width: 768px) {
  .booking-details-page {
    padding: 16px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .page-title {
    font-size: 23px;
  }

  .page-header .q-btn {
    width: 100%;
  }

  .vehicle-info {
    align-items: flex-start;
    flex-direction: column;
  }

  .vehicle-image {
    width: 100%;
    height: 140px;
  }

  .trip-info-grid {
    grid-template-columns: 1fr;
  }

  .customer-grid {
    grid-template-columns: 1fr;
  }

  .return-details {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
