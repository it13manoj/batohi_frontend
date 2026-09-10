<template>
  <q-page class="booking-page">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->

    <div class="page-header">

      <div>
        <div class="page-title">
          Book Your Vehicle
        </div>

        <div class="page-subtitle">
          Enter your trip details to complete your booking.
        </div>
      </div>

      <q-btn
        flat
        color="primary"
        icon="arrow_back"
        label="Back"
        @click="goBack"
      />

    </div>


    <!-- =====================================================
         MAIN CONTENT
    ====================================================== -->

    <div class="booking-container">

      <div class="row q-col-gutter-lg">

        <!-- =================================================
             LEFT SIDE - BOOKING FORM
        ================================================== -->

        <div class="col-12 col-md-8">

          <q-card class="booking-card">

            <q-card-section>

              <div class="section-title">
                <q-icon
                  name="directions_car"
                  color="primary"
                  size="26px"
                />

                Trip Details
              </div>

              <div class="section-subtitle">
                Please provide your pickup and journey information.
              </div>

            </q-card-section>

            <q-separator />

            <q-card-section>

              <q-form
                ref="bookingForm"
                @submit.prevent="submitBooking"
              >

                <!-- =================================================
                     PICKUP LOCATION
                ================================================== -->

                <div class="form-section-title">
                  Pickup Location
                </div>

                <q-input
                  v-model="form.pickupLocation"
                  outlined
                  label="Pickup Location"
                  placeholder="Enter pickup location"
                  :rules="[
                    val => !!val || 'Pickup location is required'
                  ]"
                  class="q-mb-lg"
                >

                  <template #prepend>
                    <q-icon
                      name="location_on"
                      color="positive"
                    />
                  </template>

                </q-input>


                <!-- =================================================
                     DROP LOCATION
                ================================================== -->

                <div class="form-section-title">
                  Drop Location
                </div>

                <q-input
                  v-model="form.dropLocation"
                  outlined
                  label="Drop Location"
                  placeholder="Enter drop location"
                  :rules="[
                    val => !!val || 'Drop location is required'
                  ]"
                  class="q-mb-lg"
                >

                  <template #prepend>
                    <q-icon
                      name="location_on"
                      color="negative"
                    />
                  </template>

                </q-input>


                <!-- =================================================
                     JOURNEY DATE & TIME
                ================================================== -->

                <div class="form-section-title">
                  Journey Details
                </div>

                <div class="row q-col-gutter-md">

                  <!-- DATE -->

                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model="form.bookingDate"
                      outlined
                      label="Journey Date"
                      readonly
                      :rules="[
                        val => !!val || 'Journey date is required'
                      ]"
                    >

                      <template #prepend>
                        <q-icon name="event" />
                      </template>

                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >

                        <q-date
                          v-model="form.bookingDate"
                          :options="dateOptions"
                        />

                      </q-popup-proxy>

                    </q-input>

                  </div>


                  <!-- TIME -->

                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model="form.bookingTime"
                      outlined
                      label="Pickup Time"
                      readonly
                      :rules="[
                        val => !!val || 'Pickup time is required'
                      ]"
                    >

                      <template #prepend>
                        <q-icon name="schedule" />
                      </template>

                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >

                        <q-time
                          v-model="form.bookingTime"
                          format24h
                        />

                      </q-popup-proxy>

                    </q-input>

                  </div>

                </div>


                <!-- =================================================
                     RETURN TRIP
                ================================================== -->

                <div class="form-section-title q-mt-lg">
                  Return Trip
                </div>

                <q-toggle
                  v-model="form.returnTrip"
                  label="I need a return trip"
                  color="primary"
                />


                <div
                  v-if="form.returnTrip"
                  class="row q-col-gutter-md q-mt-sm"
                >

                  <!-- RETURN DATE -->

                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model="form.returnDate"
                      outlined
                      label="Return Date"
                      readonly
                      :rules="[
                        val =>
                          !form.returnTrip ||
                          !!val ||
                          'Return date is required'
                      ]"
                    >

                      <template #prepend>
                        <q-icon name="event_repeat" />
                      </template>

                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >

                        <q-date
                          v-model="form.returnDate"
                          :options="returnDateOptions"
                        />

                      </q-popup-proxy>

                    </q-input>

                  </div>


                  <!-- RETURN TIME -->

                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model="form.returnTime"
                      outlined
                      label="Return Time"
                      readonly
                      :rules="[
                        val =>
                          !form.returnTrip ||
                          !!val ||
                          'Return time is required'
                      ]"
                    >

                      <template #prepend>
                        <q-icon name="schedule" />
                      </template>

                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >

                        <q-time
                          v-model="form.returnTime"
                          format24h
                        />

                      </q-popup-proxy>

                    </q-input>

                  </div>

                </div>


                <!-- =================================================
                     PASSENGERS
                ================================================== -->

                <div class="form-section-title q-mt-lg">
                  Passengers
                </div>

                <div class="row q-col-gutter-md">

                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model.number="form.passengers"
                      outlined
                      type="number"
                      min="1"
                      label="Number of Passengers"
                      :rules="[
                        val =>
                          Number(val) > 0 ||
                          'At least one passenger is required'
                      ]"
                    >

                      <template #prepend>
                        <q-icon name="people" />
                      </template>

                    </q-input>

                  </div>

                </div>


                <!-- =================================================
                     CUSTOMER INFORMATION
                ================================================== -->

                <div class="form-section-title q-mt-lg">
                  Customer Information
                </div>

                <div class="row q-col-gutter-md">

                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model="form.customerName"
                      outlined
                      label="Full Name"
                      placeholder="Enter your name"
                      :rules="[
                        val => !!val || 'Name is required'
                      ]"
                    >

                      <template #prepend>
                        <q-icon name="person" />
                      </template>

                    </q-input>

                  </div>


                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model="form.mobile"
                      outlined
                      label="Mobile Number"
                      placeholder="Enter mobile number"
                      maxlength="10"
                      :rules="[
                        val =>
                          /^[0-9]{10}$/.test(val) ||
                          'Enter valid 10 digit mobile number'
                      ]"
                    >

                      <template #prepend>
                        <q-icon name="phone" />
                      </template>

                    </q-input>

                  </div>

                </div>


                <!-- =================================================
                     SPECIAL REQUEST
                ================================================== -->

                <div class="form-section-title q-mt-lg">
                  Special Request
                </div>

                <q-input
                  v-model="form.specialRequest"
                  outlined
                  type="textarea"
                  rows="4"
                  label="Additional Information"
                  placeholder="Any special requirement..."
                />


                <!-- =================================================
                     SUBMIT BUTTON
                ================================================== -->

                <div class="q-mt-xl">

                  <q-btn
                    type="submit"
                    unelevated
                    rounded
                    color="primary"
                    size="lg"
                    icon="event_available"
                    label="Continue Booking"
                    class="full-width"
                  />

                </div>

              </q-form>

            </q-card-section>

          </q-card>

        </div>


        <!-- =================================================
             RIGHT SIDE - BOOKING SUMMARY
        ================================================== -->

        <div class="col-12 col-md-4">

          <q-card class="summary-card">

            <q-card-section>

              <div class="section-title">

                <q-icon
                  name="receipt_long"
                  color="primary"
                  size="26px"
                />

                Booking Summary

              </div>

            </q-card-section>

            <q-separator />


            <q-card-section>

              <!-- VEHICLE -->

              <div class="vehicle-summary">

                <div class="vehicle-icon">

                  <q-icon
                    name="directions_car"
                    size="55px"
                    color="primary"
                  />

                </div>

                <div>

                  <div class="vehicle-name">
                    {{ vehicle.name }}
                  </div>

                  <div class="vehicle-type">
                    {{ vehicle.type }}
                  </div>

                </div>

              </div>


              <q-separator class="q-my-lg" />


              <!-- VEHICLE ID -->

              <div class="summary-row">

                <span>
                  Vehicle ID
                </span>

                <strong>
                  {{ vehicle.id }}
                </strong>

              </div>


              <!-- VEHICLE TYPE -->

              <div class="summary-row">

                <span>
                  Vehicle Type
                </span>

                <strong>
                  {{ vehicle.type }}
                </strong>

              </div>


              <!-- PASSENGERS -->

              <div class="summary-row">

                <span>
                  Passengers
                </span>

                <strong>
                  {{ form.passengers }}
                </strong>

              </div>


              <!-- PICKUP -->

              <div class="summary-row">

                <span>
                  Pickup
                </span>

                <strong>
                  {{ form.pickupLocation || 'Not selected' }}
                </strong>

              </div>


              <!-- DROP -->

              <div class="summary-row">

                <span>
                  Drop
                </span>

                <strong>
                  {{ form.dropLocation || 'Not selected' }}
                </strong>

              </div>


              <!-- DATE -->

              <div class="summary-row">

                <span>
                  Date
                </span>

                <strong>
                  {{ form.bookingDate || 'Not selected' }}
                </strong>

              </div>


              <!-- TIME -->

              <div class="summary-row">

                <span>
                  Time
                </span>

                <strong>
                  {{ form.bookingTime || 'Not selected' }}
                </strong>

              </div>


              <q-separator class="q-my-lg" />


              <!-- PRICE -->

              <div class="price-row">

                <span>
                  Vehicle Fare
                </span>

                <strong>
                  ₹{{ vehicle.price }}
                </strong>

              </div>


              <div class="price-row">

                <span>
                  Tax
                </span>

                <strong>
                  ₹{{ taxAmount }}
                </strong>

              </div>


              <q-separator class="q-my-md" />


              <div class="total-row">

                <span>
                  Estimated Total
                </span>

                <strong>
                  ₹{{ totalAmount }}
                </strong>

              </div>

            </q-card-section>

          </q-card>


          <!-- =================================================
               SECURE BOOKING
          ================================================== -->

          <q-card class="secure-card q-mt-lg">

            <q-card-section>

              <div class="secure-content">

                <q-icon
                  name="verified_user"
                  color="positive"
                  size="32px"
                />

                <div>

                  <div class="secure-title">
                    Secure Booking
                  </div>

                  <div class="secure-text">
                    Your booking information is safe and secure.
                  </div>

                </div>

              </div>

            </q-card-section>

          </q-card>

        </div>

      </div>

    </div>


    <!-- =====================================================
         CONFIRM BOOKING DIALOG
    ====================================================== -->

    <q-dialog v-model="showConfirmDialog">

      <q-card
        style="width: 520px; max-width: 95vw"
      >

        <q-card-section>

          <div class="section-title">

            <q-icon
              name="event_available"
              color="primary"
              size="26px"
            />

            Confirm Booking

          </div>

        </q-card-section>

        <q-separator />


        <q-card-section>

          <div class="confirm-row">
            <span>Vehicle</span>
            <strong>{{ vehicle.name }}</strong>
          </div>

          <div class="confirm-row">
            <span>Vehicle Type</span>
            <strong>{{ vehicle.type }}</strong>
          </div>

          <div class="confirm-row">
            <span>Pickup</span>
            <strong>{{ form.pickupLocation }}</strong>
          </div>

          <div class="confirm-row">
            <span>Drop</span>
            <strong>{{ form.dropLocation }}</strong>
          </div>

          <div class="confirm-row">
            <span>Date</span>
            <strong>{{ form.bookingDate }}</strong>
          </div>

          <div class="confirm-row">
            <span>Time</span>
            <strong>{{ form.bookingTime }}</strong>
          </div>

          <div class="confirm-row">
            <span>Passengers</span>
            <strong>{{ form.passengers }}</strong>
          </div>


          <q-separator class="q-my-md" />


          <div class="confirm-total">

            <span>
              Total Amount
            </span>

            <strong>
              ₹{{ totalAmount }}
            </strong>

          </div>

        </q-card-section>


        <q-card-actions align="right">

          <q-btn
            flat
            color="grey-7"
            label="Cancel"
            v-close-popup
          />

          <q-btn
            unelevated
            color="primary"
            label="Confirm Booking"
            icon="check"
            @click="confirmBooking"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>

import {
  ref,
  computed
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
// VEHICLE DATA FROM VEHICLE DETAILS PAGE
// =====================================================

const vehicle = ref({

  id: Number(route.query.vehicleId) || 1,

  name:
    route.query.vehicleName ||
    'Selected Vehicle',

  type:
    route.query.vehicleType ||
    'Vehicle',

  price:
    route.query.price ||
    '0'

})


// =====================================================
// BOOKING FORM
// =====================================================

const bookingForm = ref(null)

const form = ref({

  pickupLocation: '',

  dropLocation: '',

  bookingDate: '',

  bookingTime: '',

  returnTrip: false,

  returnDate: '',

  returnTime: '',

  passengers: 1,

  customerName: '',

  mobile: '',

  specialRequest: ''

})


// =====================================================
// CONFIRM DIALOG
// =====================================================

const showConfirmDialog = ref(false)


// =====================================================
// PRICE
// =====================================================

const numericPrice = computed(() => {

  return Number(
    String(vehicle.value.price)
      .replace(/,/g, '')
  ) || 0

})


const taxAmount = computed(() => {

  const tax =
    numericPrice.value * 0.05

  return tax.toLocaleString('en-IN', {
    maximumFractionDigits: 2
  })

})


const totalAmount = computed(() => {

  const total =
    numericPrice.value +
    numericPrice.value * 0.05

  return total.toLocaleString('en-IN', {
    maximumFractionDigits: 2
  })

})


// =====================================================
// DATE OPTIONS
// =====================================================

const dateOptions = (date) => {

  const today =
    new Date()

  const selected =
    new Date(date)

  today.setHours(
    0,
    0,
    0,
    0
  )

  return selected >= today

}


// =====================================================
// RETURN DATE OPTIONS
// =====================================================

const returnDateOptions = (date) => {

  if (!form.value.bookingDate) {

    return dateOptions(date)

  }

  const bookingDate =
    new Date(form.value.bookingDate)

  const selectedDate =
    new Date(date)

  bookingDate.setHours(
    0,
    0,
    0,
    0
  )

  return selectedDate >= bookingDate

}


// =====================================================
// SUBMIT BOOKING FORM
// =====================================================

const submitBooking = async () => {

  const valid =
    await bookingForm.value.validate()

  if (!valid) {

    return

  }

  showConfirmDialog.value = true

}


// =====================================================
// CONFIRM BOOKING
// =====================================================

const confirmBooking = () => {

  /*
   * This is currently only frontend confirmation.
   *
   * Later you can replace this section with:
   *
   * await bookingService.createBooking(payload)
   */


  const payload = {

    vehicle_id:
      vehicle.value.id,

    pickup_location:
      form.value.pickupLocation,

    drop_location:
      form.value.dropLocation,

    booking_date:
      form.value.bookingDate,

    booking_time:
      form.value.bookingTime,

    return_trip:
      form.value.returnTrip,

    return_date:
      form.value.returnTrip
        ? form.value.returnDate
        : null,

    return_time:
      form.value.returnTrip
        ? form.value.returnTime
        : null,

    passengers:
      Number(form.value.passengers),

    customer_name:
      form.value.customerName,

    mobile:
      form.value.mobile,

    special_request:
      form.value.specialRequest,

    vehicle_fare:
      numericPrice.value,

    tax:
      numericPrice.value * 0.05,

    total_amount:
      numericPrice.value * 1.05

  }


  console.log(
    'Booking Payload:',
    payload
  )


  showConfirmDialog.value = false


  $q.notify({

    type: 'positive',

    message:
      'Booking details confirmed successfully',

    position: 'top'

  })


  /*
   * After API integration you can navigate:
   *
   * router.push({
   *   name: 'customer-payments',
   *   query: {
   *     bookingId: response.data.id
   *   }
   * })
   */

}


// =====================================================
// BACK
// =====================================================

const goBack = () => {

  router.back()

}

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.booking-page {

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
   CARD
===================================================== */

.booking-card,
.summary-card,
.secure-card {

  border-radius: 16px;

  background: white;

  box-shadow:
    0 5px 20px rgba(
      0,
      0,
      0,
      0.05
    );

}


/* =====================================================
   SECTION TITLE
===================================================== */

.section-title {

  display: flex;

  align-items: center;

  gap: 10px;

  color: #172033;

  font-size: 20px;

  font-weight: 700;

}


.section-subtitle {

  margin-top: 6px;

  color: #7b8494;

  font-size: 14px;

}


/* =====================================================
   FORM TITLE
===================================================== */

.form-section-title {

  margin-bottom: 12px;

  color: #172033;

  font-size: 16px;

  font-weight: 700;

}


/* =====================================================
   VEHICLE SUMMARY
===================================================== */

.vehicle-summary {

  display: flex;

  align-items: center;

  gap: 15px;

}


.vehicle-icon {

  display: flex;

  align-items: center;

  justify-content: center;

  width: 85px;

  height: 70px;

  border-radius: 12px;

  background: #eef4fb;

}


.vehicle-name {

  color: #172033;

  font-size: 17px;

  font-weight: 700;

}


.vehicle-type {

  margin-top: 4px;

  color: #7b8494;

  font-size: 13px;

}


/* =====================================================
   SUMMARY
===================================================== */

.summary-row {

  display: flex;

  justify-content: space-between;

  gap: 15px;

  padding: 9px 0;

  color: #6b7280;

  font-size: 14px;

}


.summary-row strong {

  max-width: 60%;

  color: #172033;

  text-align: right;

  word-break: break-word;

}


/* =====================================================
   PRICE
===================================================== */

.price-row {

  display: flex;

  justify-content: space-between;

  padding: 7px 0;

  color: #6b7280;

  font-size: 14px;

}


.price-row strong {

  color: #172033;

}


.total-row {

  display: flex;

  align-items: center;

  justify-content: space-between;

  color: #172033;

  font-size: 17px;

  font-weight: 700;

}


.total-row strong {

  color: #1976d2;

  font-size: 23px;

}


/* =====================================================
   SECURE
===================================================== */

.secure-content {

  display: flex;

  align-items: center;

  gap: 12px;

}


.secure-title {

  color: #172033;

  font-weight: 700;

}


.secure-text {

  margin-top: 4px;

  color: #7b8494;

  font-size: 12px;

}


/* =====================================================
   CONFIRM
===================================================== */

.confirm-row {

  display: flex;

  justify-content: space-between;

  gap: 15px;

  padding: 9px 0;

  border-bottom: 1px solid #f0f0f0;

}


.confirm-row span {

  color: #6b7280;

}


.confirm-row strong {

  color: #172033;

  text-align: right;

}


.confirm-total {

  display: flex;

  align-items: center;

  justify-content: space-between;

  font-size: 17px;

  font-weight: 700;

}


.confirm-total strong {

  color: #1976d2;

  font-size: 23px;

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 768px) {

  .booking-page {

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


  .summary-card {

    margin-top: 5px;

  }

}

</style>
