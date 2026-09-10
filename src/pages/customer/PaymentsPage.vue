<template>
  <q-page class="payment-page">

    <!-- Header -->
    <div class="page-header">
      <div>
        <div class="page-title">Payment</div>
        <div class="page-subtitle">
          Complete your payment securely
        </div>
      </div>

      <q-btn
        flat
        color="primary"
        icon="arrow_back"
        label="Back to Dashboard"
        @click="goBack"
      />
    </div>

    <div class="payment-container">

      <!-- Payment Summary -->
      <q-card class="payment-card">

        <q-card-section>
          <div class="section-title">
            Payment Summary
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>

          <div class="summary-row">
            <span>Booking Amount</span>
            <strong>₹ {{ bookingAmount }}</strong>
          </div>

          <div class="summary-row">
            <span>Tax</span>
            <strong>₹ {{ tax }}</strong>
          </div>

          <div class="summary-row">
            <span>Discount</span>
            <strong class="discount">
              - ₹ {{ discount }}
            </strong>
          </div>

          <q-separator class="q-my-md" />

          <div class="total-row">
            <span>Total Amount</span>
            <strong>₹ {{ totalAmount }}</strong>
          </div>

        </q-card-section>

      </q-card>


      <!-- Payment Method -->
      <q-card class="payment-card">

        <q-card-section>
          <div class="section-title">
            Select Payment Method
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>

          <q-option-group
            v-model="paymentMethod"
            :options="paymentOptions"
            color="primary"
            type="radio"
          />

        </q-card-section>

        <q-separator />

        <q-card-section>

          <!-- UPI -->
          <div v-if="paymentMethod === 'upi'" class="payment-method">

            <div class="method-title">
              UPI Payment
            </div>

            <q-input
              v-model="upiId"
              outlined
              label="UPI ID"
              placeholder="example@upi"
              class="q-mt-md"
            />

          </div>


          <!-- Card -->
          <div v-if="paymentMethod === 'card'" class="payment-method">

            <div class="method-title">
              Card Payment
            </div>

            <q-input
              v-model="cardNumber"
              outlined
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              class="q-mt-md"
              maxlength="19"
            />

            <div class="row q-col-gutter-md q-mt-sm">

              <div class="col-6">
                <q-input
                  v-model="expiry"
                  outlined
                  label="Expiry Date"
                  placeholder="MM/YY"
                />
              </div>

              <div class="col-6">
                <q-input
                  v-model="cvv"
                  outlined
                  label="CVV"
                  type="password"
                  maxlength="3"
                />
              </div>

            </div>

          </div>


          <!-- Net Banking -->
          <div
            v-if="paymentMethod === 'netbanking'"
            class="payment-method"
          >

            <div class="method-title">
              Net Banking
            </div>

            <q-select
              v-model="bank"
              outlined
              label="Select Bank"
              :options="banks"
              class="q-mt-md"
            />

          </div>


          <!-- Cash -->
          <div
            v-if="paymentMethod === 'cash'"
            class="payment-method"
          >

            <q-banner rounded class="bg-grey-2">
              Cash payment can be completed at the time of
              service/booking.
            </q-banner>

          </div>

        </q-card-section>

        <q-separator />

        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            label="Cancel"
            color="grey"
            @click="goBack"
          />

          <q-btn
            color="primary"
            label="Pay Now"
            icon="payment"
            :loading="processing"
            @click="processPayment"
          />

        </q-card-actions>

      </q-card>

    </div>

  </q-page>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'

const router = useRouter()

// ===============================
// Payment Data
// ===============================

const bookingAmount = ref(5000)
const tax = ref(500)
const discount = ref(0)

const totalAmount = computed(() => {
  return bookingAmount.value + tax.value - discount.value
})


// ===============================
// Payment Method
// ===============================

const paymentMethod = ref('upi')

const paymentOptions = [
  {
    label: 'UPI',
    value: 'upi'
  },
  {
    label: 'Credit / Debit Card',
    value: 'card'
  },
  {
    label: 'Net Banking',
    value: 'netbanking'
  },
  {
    label: 'Cash',
    value: 'cash'
  }
]


// ===============================
// UPI
// ===============================

const upiId = ref('')


// ===============================
// Card
// ===============================

const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')


// ===============================
// Net Banking
// ===============================

const bank = ref('')

const banks = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank',
  'Bank of Baroda'
]


// ===============================
// Processing
// ===============================

const processing = ref(false)


// ===============================
// Back To Dashboard
// ===============================

const goBack = () => {
  router.push('/customer/dashboard')
}


// ===============================
// Process Payment
// ===============================

const processPayment = async () => {

  if (paymentMethod.value === 'upi' && !upiId.value) {

    Notify.create({
      type: 'negative',
      message: 'Please enter your UPI ID'
    })

    return
  }


  if (paymentMethod.value === 'card') {

    if (!cardNumber.value || !expiry.value || !cvv.value) {

      Notify.create({
        type: 'negative',
        message: 'Please enter complete card details'
      })

      return
    }
  }


  if (
    paymentMethod.value === 'netbanking' &&
    !bank.value
  ) {

    Notify.create({
      type: 'negative',
      message: 'Please select your bank'
    })

    return
  }


  processing.value = true

  try {

    /*
      API PAYMENT CODE WILL COME HERE

      Example:

      const response = await axios.post(
        `${BASE_URL}/payment/create`,
        {
          amount: totalAmount.value,
          payment_method: paymentMethod.value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    */


    await new Promise(resolve => setTimeout(resolve, 1500))


    Notify.create({
      type: 'positive',
      message: 'Payment successful!'
    })


    router.push('/customer/dashboard')

  } catch (error) {

    console.error('Payment Error:', error)

    Notify.create({
      type: 'negative',
      message: 'Payment failed. Please try again.'
    })

  } finally {

    processing.value = false

  }
}
</script>


<style scoped>

.payment-page {
  background: #f5f7fb;
  padding: 25px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
}

.page-subtitle {
  color: #777;
  margin-top: 5px;
}

.payment-container {
  max-width: 900px;
  margin: auto;
  display: grid;
  gap: 20px;
}

.payment-card {
  border-radius: 12px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 16px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
}

.discount {
  color: #21ba45;
}

.method-title {
  font-size: 17px;
  font-weight: 600;
}

@media (max-width: 600px) {

  .payment-page {
    padding: 15px;
  }

  .page-header {
    align-items: flex-start;
  }

  .page-title {
    font-size: 22px;
  }

}

</style>
