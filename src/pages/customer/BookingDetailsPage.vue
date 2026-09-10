<template>
  <q-page class="booking-details-page">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->

    <div class="page-header">

      <div>

        <div class="page-title">
          Booking Details
        </div>

        <div class="page-subtitle">
          View complete information about your booking.
        </div>

      </div>


      <q-btn
        flat
        color="primary"
        icon="arrow_back"
        label="Back to My Bookings"
        @click="goBack"
      />

    </div>


    <!-- =====================================================
         LOADING
    ====================================================== -->

    <div
      v-if="loading"
      class="loading-container"
    >

      <q-spinner
        color="primary"
        size="50px"
      />

      <div class="loading-text">
        Loading booking details...
      </div>

    </div>


    <!-- =====================================================
         BOOKING CONTENT
    ====================================================== -->

    <div
      v-else-if="booking"
      class="booking-container"
    >

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


            <q-badge
              :color="getStatusColor(booking.status)"
              class="status-badge"
            >

              {{ booking.status }}

            </q-badge>

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

                <q-icon
                  name="directions_car"
                  color="primary"
                  size="27px"
                />

                Vehicle Information

              </div>

            </q-card-section>

            <q-separator />

            <q-card-section>

              <div class="vehicle-info">

                <div class="vehicle-image">

                  <q-icon
                    name="directions_car"
                    size="70px"
                    color="primary"
                  />

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

                      <q-icon
                        name="people"
                        color="primary"
                      />

                      {{ booking.passengers }}
                      Passengers

                    </div>


                    <div class="vehicle-feature">

                      <q-icon
                        name="person"
                        color="primary"
                      />

                      Driver Included

                    </div>

                  </div>

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

                <q-icon
                  name="route"
                  color="primary"
                  size="27px"
                />

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

                    <div class="location-label">
                      Pickup Location
                    </div>

                    <div class="location-value">
                      {{ booking.pickupLocation }}
                    </div>

                  </div>

                </div>


                <div class="route-line"></div>


                <!-- DROP -->

                <div class="location-item">

                  <div class="location-icon drop-icon">

                    <q-icon
                      name="location_on"
                      color="negative"
                      size="22px"
                    />

                  </div>

                  <div class="location-content">

                    <div class="location-label">
                      Drop Location
                    </div>

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

                    <q-icon
                      name="event"
                      color="primary"
                      size="24px"
                    />

                  </div>

                  <div>

                    <div class="trip-info-label">
                      Journey Date
                    </div>

                    <div class="trip-info-value">
                      {{ formatDate(booking.bookingDate) }}
                    </div>

                  </div>

                </div>


                <!-- TIME -->

                <div class="trip-info">

                  <div class="trip-info-icon">

                    <q-icon
                      name="schedule"
                      color="primary"
                      size="24px"
                    />

                  </div>

                  <div>

                    <div class="trip-info-label">
                      Pickup Time
                    </div>

                    <div class="trip-info-value">
                      {{ booking.bookingTime }}
                    </div>

                  </div>

                </div>


                <!-- PASSENGERS -->

                <div class="trip-info">

                  <div class="trip-info-icon">

                    <q-icon
                      name="groups"
                      color="primary"
                      size="24px"
                    />

                  </div>

                  <div>

                    <div class="trip-info-label">
                      Passengers
                    </div>

                    <div class="trip-info-value">
                      {{ booking.passengers }}
                    </div>

                  </div>

                </div>


                <!-- RETURN -->

                <div class="trip-info">

                  <div class="trip-info-icon">

                    <q-icon
                      name="sync_alt"
                      color="primary"
                      size="24px"
                    />

                  </div>

                  <div>

                    <div class="trip-info-label">
                      Return Trip
                    </div>

                    <div class="trip-info-value">

                      {{
                        booking.returnTrip
                          ? 'Yes'
                          : 'No'
                      }}

                    </div>

                  </div>

                </div>

              </div>


              <!-- RETURN DETAILS -->

              <div
                v-if="booking.returnTrip"
                class="return-box q-mt-lg"
              >

                <div class="return-title">

                  <q-icon
                    name="event_repeat"
                    color="primary"
                  />

                  Return Journey

                </div>


                <div class="return-details">

                  <div>

                    <span>
                      Return Date
                    </span>

                    <strong>
                      {{ formatDate(booking.returnDate) }}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Return Time
                    </span>

                    <strong>
                      {{ booking.returnTime }}
                    </strong>

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

                <q-icon
                  name="person"
                  color="primary"
                  size="27px"
                />

                Customer Information

              </div>

            </q-card-section>

            <q-separator />


            <q-card-section>

              <div class="customer-grid">

                <div class="customer-item">

                  <div class="customer-label">
                    Full Name
                  </div>

                  <div class="customer-value">
                    {{ booking.customerName }}
                  </div>

                </div>


                <div class="customer-item">

                  <div class="customer-label">
                    Mobile Number
                  </div>

                  <div class="customer-value">
                    {{ booking.mobile }}
                  </div>

                </div>


                <div class="customer-item">

                  <div class="customer-label">
                    Special Request
                  </div>

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

                <q-icon
                  name="timeline"
                  color="primary"
                  size="27px"
                />

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

                  <div>
                    Your booking request was created successfully.
                  </div>

                </q-timeline-entry>


                <q-timeline-entry
                  v-if="booking.status !== 'Pending'"
                  title="Booking Confirmed"
                  :subtitle="formatDateTime(booking.confirmedAt)"
                  icon="check_circle"
                  color="positive"
                >

                  <div>
                    Your vehicle booking has been confirmed.
                  </div>

                </q-timeline-entry>


                <q-timeline-entry
                  v-if="booking.paymentStatus === 'Paid'"
                  title="Payment Completed"
                  :subtitle="formatDateTime(booking.paidAt)"
                  icon="payments"
                  color="positive"
                >

                  <div>
                    Payment has been received successfully.
                  </div>

                </q-timeline-entry>


                <q-timeline-entry
                  v-if="booking.status === 'Completed'"
                  title="Trip Completed"
                  :subtitle="formatDateTime(booking.completedAt)"
                  icon="task_alt"
                  color="teal"
                >

                  <div>
                    Your trip has been completed.
                  </div>

                </q-timeline-entry>


                <q-timeline-entry
                  v-if="booking.status === 'Cancelled'"
                  title="Booking Cancelled"
                  :subtitle="formatDateTime(booking.cancelledAt)"
                  icon="cancel"
                  color="negative"
                >

                  <div>
                    This booking has been cancelled.
                  </div>

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

                <q-icon
                  name="receipt_long"
                  color="primary"
                  size="27px"
                />

                Payment Summary

              </div>

            </q-card-section>

            <q-separator />


            <q-card-section>

              <div class="summary-row">

                <span>
                  Vehicle Fare
                </span>

                <strong>
                  ₹{{ formatAmount(booking.vehicleFare) }}
                </strong>

              </div>


              <div class="summary-row">

                <span>
                  Tax
                </span>

                <strong>
                  ₹{{ formatAmount(booking.tax) }}
                </strong>

              </div>


              <div class="summary-row">

                <span>
                  Discount
                </span>

                <strong class="discount">
                  - ₹{{ formatAmount(booking.discount) }}
                </strong>

              </div>


              <q-separator class="q-my-md" />


              <div class="total-row">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{{ formatAmount(booking.totalAmount) }}
                </strong>

              </div>


              <div class="payment-status">

                <q-icon
                  :name="
                    booking.paymentStatus === 'Paid'
                      ? 'check_circle'
                      : 'schedule'
                  "
                  :color="
                    booking.paymentStatus === 'Paid'
                      ? 'positive'
                      : 'orange'
                  "
                  size="22px"
                />

                <span>
                  Payment:
                  {{ booking.paymentStatus }}
                </span>

              </div>

            </q-card-section>

          </q-card>


          <!-- =================================================
               ACTIONS
          ================================================== -->

          <q-card class="action-card q-mt-lg">

            <q-card-section>

              <div class="action-title">
                Booking Actions
              </div>


              <!-- PAYMENT -->

              <q-btn
                v-if="booking.paymentStatus !== 'Paid'
                  && booking.status !== 'Cancelled'"
                unelevated
                rounded
                color="primary"
                icon="payments"
                label="Make Payment"
                class="full-width q-mb-sm"
                @click="makePayment"
              />


              <!-- INVOICE -->

              <q-btn
                v-if="booking.paymentStatus === 'Paid'"
                outline
                rounded
                color="primary"
                icon="receipt_long"
                label="View Invoice"
                class="full-width q-mb-sm"
                @click="viewInvoice"
              />


              <!-- CANCEL -->

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
                v-if="booking.status === 'Completed'
                  || booking.status === 'Cancelled'"
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

                <q-icon
                  name="support_agent"
                  color="primary"
                  size="35px"
                />

                <div>

                  <div class="support-title">
                    Need Help?
                  </div>

                  <div class="support-text">
                    Contact our support team for booking assistance.
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

    <q-card
      v-else
      class="empty-card"
    >

      <q-card-section class="empty-content">

        <q-icon
          name="search_off"
          size="70px"
          color="grey-5"
        />

        <div class="empty-title">
          Booking Not Found
        </div>

        <div class="empty-text">
          We could not find the requested booking.
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

      <q-card
        style="width: 480px; max-width: 95vw"
      >

        <q-card-section>

          <div class="dialog-title">

            <q-icon
              name="warning"
              color="negative"
              size="28px"
            />

            Cancel Booking

          </div>

        </q-card-section>

        <q-separator />

        <q-card-section>

          <div class="dialog-text">

            Are you sure you want to cancel booking

            <strong>
              #{{ booking?.bookingNumber }}
            </strong>?

          </div>

          <div class="cancel-note q-mt-md">

            Cancellation charges may apply according to
            the booking cancellation policy.

          </div>

        </q-card-section>

        <q-card-actions align="right">

          <q-btn
            flat
            color="grey-7"
            label="Keep Booking"
            v-close-popup
          />

          <q-btn
            unelevated
            color="negative"
            icon="cancel"
            label="Cancel Booking"
            @click="cancelBooking"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>

import {
  ref,
  computed,
  onMounted
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import {
  useQuasar
} from 'quasar'


// =====================================================
// ROUTER
// =====================================================

const router = useRouter()

const route = useRoute()

const $q = useQuasar()


// =====================================================
// STATE
// =====================================================

const loading = ref(true)

const booking = ref(null)

const showCancelDialog = ref(false)


// =====================================================
// BOOKING ID
// =====================================================

const bookingId = computed(() => {

  return Number(
    route.query.bookingId
  ) || null

})


// =====================================================
// TEMPORARY BOOKING DATA
// =====================================================
//
// This data matches the booking structure used
// in MyBookingsPage.vue.
//
// Replace loadBookingDetails() with your API call
// when booking.service.js is connected.
// =====================================================

const demoBookings = {

  1: {

    id: 1,

    bookingNumber: 'BK-10001',

    vehicleId: 1,

    vehicleName:
      'Toyota Innova Crysta',

    vehicleType:
      'MPV',

    passengers: 5,

    bookingDate:
      '2026-08-25',

    bookingTime:
      '09:00 AM',

    pickupLocation:
      'Patna Airport',

    dropLocation:
      'Muzaffarpur',

    returnTrip: false,

    returnDate: null,

    returnTime: null,

    customerName:
      'Customer',

    mobile:
      '9876543210',

    specialRequest:
      'Please provide a clean vehicle.',

    vehicleFare:
      2500,

    tax:
      125,

    discount:
      0,

    totalAmount:
      2625,

    status:
      'Confirmed',

    paymentStatus:
      'Paid',

    createdAt:
      '2026-08-20 10:30:00',

    confirmedAt:
      '2026-08-20 10:45:00',

    paidAt:
      '2026-08-20 11:00:00',

    completedAt:
      null,

    cancelledAt:
      null

  },


  2: {

    id: 2,

    bookingNumber: 'BK-10002',

    vehicleId: 2,

    vehicleName:
      'Mahindra Scorpio',

    vehicleType:
      'SUV',

    passengers: 4,

    bookingDate:
      '2026-08-28',

    bookingTime:
      '08:30 AM',

    pickupLocation:
      'Patna Railway Station',

    dropLocation:
      'Gaya',

    returnTrip: false,

    returnDate: null,

    returnTime: null,

    customerName:
      'Customer',

    mobile:
      '9876543210',

    specialRequest:
      '',

    vehicleFare:
      2800,

    tax:
      140,

    discount:
      0,

    totalAmount:
      2940,

    status:
      'Pending',

    paymentStatus:
      'Pending',

    createdAt:
      '2026-08-20 14:20:00',

    confirmedAt:
      null,

    paidAt:
      null,

    completedAt:
      null,

    cancelledAt:
      null

  },


  3: {

    id: 3,

    bookingNumber:
      'BK-10003',

    vehicleId: 3,

    vehicleName:
      'Maruti Ertiga',

    vehicleType:
      'MPV',

    passengers: 4,

    bookingDate:
      '2026-08-10',

    bookingTime:
      '10:00 AM',

    pickupLocation:
      'Muzaffarpur',

    dropLocation:
      'Patna',

    returnTrip: false,

    returnDate: null,

    returnTime: null,

    customerName:
      'Customer',

    mobile:
      '9876543210',

    specialRequest:
      '',

    vehicleFare:
      2000,

    tax:
      100,

    discount:
      0,

    totalAmount:
      2100,

    status:
      'Completed',

    paymentStatus:
      'Paid',

    createdAt:
      '2026-08-05 10:00:00',

    confirmedAt:
      '2026-08-05 10:20:00',

    paidAt:
      '2026-08-05 10:30:00',

    completedAt:
      '2026-08-10 18:00:00',

    cancelledAt:
      null

  }

}


// =====================================================
// LOAD BOOKING DETAILS
// =====================================================

const loadBookingDetails = async () => {

  loading.value = true


  try {

    if (!bookingId.value) {

      booking.value = null

      return

    }


    /*
     * TEMPORARY:
     *
     * Using local demo data.
     *
     * Later replace with:
     *
     * const response =
     *   await bookingService.getBookingById(
     *     bookingId.value
     *   )
     *
     * booking.value =
     *   response.data
     */


    booking.value =
      demoBookings[
        bookingId.value
      ] || null

  }
  catch (error) {

    console.error(
      'Error loading booking:',
      error
    )

    booking.value = null

    $q.notify({

      type: 'negative',

      message:
        'Unable to load booking details',

      position: 'top'

    })

  }
  finally {

    loading.value = false

  }

}


// =====================================================
// STATUS COLOR
// =====================================================

const getStatusColor = (status) => {

  switch (status) {

    case 'Confirmed':
      return 'positive'

    case 'Pending':
      return 'orange'

    case 'Completed':
      return 'teal'

    case 'Cancelled':
      return 'negative'

    case 'Rejected':
      return 'negative'

    default:
      return 'grey'

  }

}


// =====================================================
// CAN CANCEL
// =====================================================

const canCancel = computed(() => {

  if (!booking.value) {

    return false

  }


  return (

    booking.value.status ===
      'Pending'

    ||

    booking.value.status ===
      'Confirmed'

  )

})


// =====================================================
// CANCEL DIALOG
// =====================================================

const openCancelDialog = () => {

  showCancelDialog.value = true

}


// =====================================================
// CANCEL BOOKING
// =====================================================

const cancelBooking = async () => {

  if (!booking.value) {

    return

  }


  /*
   * TEMPORARY:
   *
   * Replace with:
   *
   * await bookingService.cancelBooking(
   *   booking.value.id
   * )
   */


  booking.value.status =
    'Cancelled'

  booking.value.cancelledAt =
    new Date().toISOString()


  showCancelDialog.value =
    false


  $q.notify({

    type: 'positive',

    message:
      'Booking cancelled successfully',

    position: 'top'

  })

}


// =====================================================
// MAKE PAYMENT
// =====================================================

const makePayment = () => {

  router.push({

    name:
      'customer-payments',

    query: {

      bookingId:
        booking.value.id,

      amount:
        booking.value.totalAmount

    }

  })

}


// =====================================================
// VIEW INVOICE
// =====================================================

const viewInvoice = () => {

  router.push({

    name:
      'customer-invoices',

    query: {

      bookingId:
        booking.value.id

    }

  })

}


// =====================================================
// BOOK AGAIN
// =====================================================

const bookAgain = () => {

  router.push({

    name:
      'customer-search-vehicle',

    query: {

      vehicleId:
        booking.value.vehicleId

    }

  })

}


// =====================================================
// CONTACT SUPPORT
// =====================================================

const contactSupport = () => {

  $q.notify({

    type: 'info',

    message:
      'Our support team will contact you shortly.',

    position: 'top'

  })

}


// =====================================================
// BACK
// =====================================================

const goBack = () => {

  router.push({

    name:
      'customer-my-bookings'

  })

}


// =====================================================
// FORMAT DATE
// =====================================================

const formatDate = (date) => {

  if (!date) {

    return '-'

  }


  const dateObject =
    new Date(date)


  return dateObject.toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  )

}


// =====================================================
// FORMAT DATE TIME
// =====================================================

const formatDateTime = (date) => {

  if (!date) {

    return '-'

  }


  const dateObject =
    new Date(date)


  return dateObject.toLocaleString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  )

}


// =====================================================
// FORMAT AMOUNT
// =====================================================

const formatAmount = (amount) => {

  return Number(
    amount || 0
  ).toLocaleString(
    'en-IN'
  )

}


// =====================================================
// MOUNT
// =====================================================

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

  color: #172033;

  font-size: 28px;

  font-weight: 700;

}


.page-subtitle {

  margin-top: 5px;

  color: #6b7280;

  font-size: 15px;

}


/* =====================================================
   CONTAINER
===================================================== */

.booking-container {

  max-width: 1200px;

  margin: auto;

}


/* =====================================================
   HEADER CARD
===================================================== */

.booking-header-card {

  border-radius: 16px;

  background: white;

  box-shadow:
    0 5px 20px rgba(
      0,
      0,
      0,
      0.04
    );

}


.booking-number {

  color: #172033;

  font-size: 21px;

  font-weight: 700;

}


.booking-created {

  margin-top: 5px;

  color: #7b8494;

  font-size: 13px;

}


.status-badge {

  padding: 8px 14px;

  border-radius: 20px;

  font-size: 13px;

  font-weight: 600;

}


/* =====================================================
   DETAILS CARD
===================================================== */

.details-card,
.summary-card,
.action-card,
.support-card {

  border-radius: 16px;

  background: white;

  box-shadow:
    0 5px 20px rgba(
      0,
      0,
      0,
      0.04
    );

}


.section-title {

  display: flex;

  align-items: center;

  gap: 10px;

  color: #172033;

  font-size: 19px;

  font-weight: 700;

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

  display: flex;

  align-items: center;

  justify-content: center;

  width: 125px;

  height: 105px;

  flex-shrink: 0;

  border-radius: 15px;

  background: #eef4fb;

}


.vehicle-name {

  color: #172033;

  font-size: 23px;

  font-weight: 700;

}


.vehicle-type {

  margin-top: 5px;

  color: #7b8494;

  font-size: 14px;

}


.vehicle-features {

  display: flex;

  flex-wrap: wrap;

  gap: 18px;

  margin-top: 15px;

}


.vehicle-feature {

  display: flex;

  align-items: center;

  gap: 6px;

  color: #5f6878;

  font-size: 13px;

}


/* =====================================================
   LOCATION ROUTE
===================================================== */

.location-item {

  display: flex;

  align-items: flex-start;

  gap: 14px;

}


.location-icon {

  display: flex;

  align-items: center;

  justify-content: center;

  width: 38px;

  height: 38px;

  flex-shrink: 0;

  border-radius: 50%;

}


.pickup-icon {

  background: #eaf8ef;

}


.drop-icon {

  background: #fff0f0;

}


.location-content {

  padding-top: 3px;

}


.location-label {

  color: #8a92a0;

  font-size: 12px;

}


.location-value {

  margin-top: 4px;

  color: #172033;

  font-size: 15px;

  font-weight: 600;

}


.route-line {

  width: 2px;

  height: 25px;

  margin-left: 18px;

  background: #dce3ec;

}


/* =====================================================
   TRIP INFO
===================================================== */

.trip-info-grid {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 20px;

}


.trip-info {

  display: flex;

  align-items: center;

  gap: 12px;

}


.trip-info-icon {

  display: flex;

  align-items: center;

  justify-content: center;

  width: 45px;

  height: 45px;

  border-radius: 11px;

  background: #eef4fb;

}


.trip-info-label {

  color: #8a92a0;

  font-size: 11px;

}


.trip-info-value {

  margin-top: 4px;

  color: #172033;

  font-size: 14px;

  font-weight: 600;

}


/* =====================================================
   RETURN
===================================================== */

.return-box {

  padding: 16px;

  border-radius: 12px;

  background: #f7f9fc;

}


.return-title {

  display: flex;

  align-items: center;

  gap: 8px;

  color: #172033;

  font-size: 14px;

  font-weight: 700;

}


.return-details {

  display: flex;

  gap: 40px;

  margin-top: 12px;

}


.return-details span {

  display: block;

  color: #8a92a0;

  font-size: 11px;

}


.return-details strong {

  display: block;

  margin-top: 3px;

  color: #172033;

  font-size: 14px;

}


/* =====================================================
   CUSTOMER
===================================================== */

.customer-grid {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 20px;

}


.customer-item {

  padding: 14px;

  border-radius: 11px;

  background: #f7f9fc;

}


.customer-label {

  color: #8a92a0;

  font-size: 11px;

}


.customer-value {

  margin-top: 5px;

  color: #172033;

  font-size: 14px;

  font-weight: 600;

}


/* =====================================================
   SUMMARY
===================================================== */

.summary-row {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

  padding: 9px 0;

  color: #6b7280;

  font-size: 14px;

}


.summary-row strong {

  color: #172033;

}


.discount {

  color: #16a05d !important;

}


.total-row {

  display: flex;

  align-items: center;

  justify-content: space-between;

  color: #172033;

  font-size: 16px;

  font-weight: 700;

}


.total-row strong {

  color: #1976d2;

  font-size: 23px;

}


.payment-status {

  display: flex;

  align-items: center;

  gap: 8px;

  margin-top: 18px;

  padding: 11px;

  border-radius: 10px;

  background: #f7f9fc;

  color: #4f5969;

  font-size: 13px;

}


/* =====================================================
   ACTIONS
===================================================== */

.action-title {

  margin-bottom: 15px;

  color: #172033;

  font-size: 17px;

  font-weight: 700;

}


/* =====================================================
   SUPPORT
===================================================== */

.support-content {

  display: flex;

  align-items: center;

  gap: 12px;

}


.support-title {

  color: #172033;

  font-weight: 700;

}


.support-text {

  margin-top: 4px;

  color: #7b8494;

  font-size: 12px;

  line-height: 1.5;

}


/* =====================================================
   LOADING
===================================================== */

.loading-container {

  display: flex;

  align-items: center;

  justify-content: center;

  flex-direction: column;

  min-height: 400px;

}


.loading-text {

  margin-top: 15px;

  color: #7b8494;

  font-size: 14px;

}


/* =====================================================
   EMPTY
===================================================== */

.empty-card {

  max-width: 600px;

  margin: 50px auto;

  border-radius: 16px;

  background: white;

}


.empty-content {

  display: flex;

  align-items: center;

  justify-content: center;

  flex-direction: column;

  padding: 70px 20px;

  text-align: center;

}


.empty-title {

  margin-top: 15px;

  color: #172033;

  font-size: 21px;

  font-weight: 700;

}


.empty-text {

  margin-top: 7px;

  color: #7b8494;

  font-size: 14px;

}


/* =====================================================
   DIALOG
===================================================== */

.dialog-title {

  display: flex;

  align-items: center;

  gap: 10px;

  color: #172033;

  font-size: 20px;

  font-weight: 700;

}


.dialog-text {

  color: #4f5969;

  font-size: 15px;

  line-height: 1.6;

}


.dialog-text strong {

  color: #172033;

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
   MOBILE
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

    height: 160px;

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
