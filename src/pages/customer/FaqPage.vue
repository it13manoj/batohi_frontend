<template>
  <q-page class="faq-page">

    <!-- =====================================================
         HEADER
    ====================================================== -->
    <div class="faq-header">

      <div class="faq-header-content">

        <div class="header-icon">
          <q-icon
            name="help_outline"
            size="38px"
          />
        </div>

        <div>
          <div class="page-title">
            Frequently Asked Questions
          </div>

          <div class="page-subtitle">
            Find answers to common questions about BatohiDrive
          </div>
        </div>

      </div>

    </div>


    <!-- =====================================================
         SEARCH
    ====================================================== -->
    <div class="container">

      <q-card
        flat
        bordered
        class="search-card"
      >

        <q-input
          v-model="search"
          outlined
          rounded
          clearable
          placeholder="Search your question..."
          class="faq-search"
        >

          <template #prepend>
            <q-icon
              name="search"
              color="primary"
            />
          </template>

        </q-input>

      </q-card>


      <!-- =====================================================
           CATEGORY FILTER
      ====================================================== -->
      <div class="category-wrapper q-mt-lg">

        <q-btn
          :outline="selectedCategory !== 'All'"
          :unelevated="selectedCategory === 'All'"
          color="primary"
          label="All"
          class="category-btn"
          @click="selectedCategory = 'All'"
        />

        <q-btn
          v-for="category in categories"
          :key="category"
          :outline="selectedCategory !== category"
          :unelevated="selectedCategory === category"
          color="primary"
          :label="category"
          class="category-btn"
          @click="selectedCategory = category"
        />

      </div>


      <!-- =====================================================
           FAQ LIST
      ====================================================== -->
      <div class="faq-list q-mt-lg">

        <q-card
          v-for="faq in filteredFaqs"
          :key="faq.id"
          flat
          bordered
          class="faq-card"
        >

          <q-expansion-item
            expand-separator
            :label="faq.question"
            :default-opened="false"
            header-class="faq-question"
          >

            <q-card-section class="faq-answer">

              <div
                class="answer-content"
                v-html="faq.answer"
              />

              <div class="faq-category">

                <q-chip
                  dense
                  size="sm"
                  color="grey-2"
                  text-color="grey-8"
                  :label="faq.category"
                />

              </div>

            </q-card-section>

          </q-expansion-item>

        </q-card>


        <!-- =================================================
             EMPTY STATE
        ================================================== -->
        <q-card
          v-if="filteredFaqs.length === 0"
          flat
          bordered
          class="empty-card"
        >

          <q-card-section class="text-center q-pa-xl">

            <q-icon
              name="search_off"
              size="64px"
              color="grey-5"
            />

            <div class="text-h6 text-weight-bold q-mt-md">
              No questions found
            </div>

            <div class="text-grey-7 q-mt-sm">
              We couldn't find any FAQ matching your search.
            </div>

            <q-btn
              flat
              color="primary"
              label="Clear Search"
              class="q-mt-md"
              @click="clearSearch"
            />

          </q-card-section>

        </q-card>

      </div>


      <!-- =====================================================
           CONTACT SUPPORT
      ====================================================== -->
      <q-card
        flat
        class="support-card q-mt-xl"
      >

        <q-card-section>

          <div class="row items-center">

            <div class="support-icon">
              <q-icon
                name="support_agent"
                size="32px"
                color="primary"
              />
            </div>

            <div class="col q-ml-md">

              <div class="text-h6 text-weight-bold">
                Still need help?
              </div>

              <div class="text-grey-7 q-mt-xs">
                Our support team is here to help you with your booking.
              </div>

            </div>

            <q-btn
              color="primary"
              unelevated
              icon="headset_mic"
              label="Contact Support"
              @click="contactSupport"
            />

          </div>

        </q-card-section>

      </q-card>


      <!-- =====================================================
           QUICK LINKS
      ====================================================== -->
      <div class="quick-links q-mt-xl q-mb-xl">

        <div class="text-subtitle1 text-weight-bold q-mb-md">
          Helpful Information
        </div>

        <div class="row q-col-gutter-md">

          <!-- Terms -->
          <div class="col-12 col-sm-4">

            <q-card
              flat
              bordered
              class="quick-card"
              clickable
              @click="goToTerms"
            >

              <q-card-section>

                <q-icon
                  name="description"
                  size="28px"
                  color="primary"
                />

                <div class="text-subtitle1 text-weight-bold q-mt-sm">
                  Terms & Conditions
                </div>

                <div class="text-caption text-grey-7 q-mt-xs">
                  Read our terms and conditions.
                </div>

              </q-card-section>

            </q-card>

          </div>


          <!-- Privacy -->
          <div class="col-12 col-sm-4">

            <q-card
              flat
              bordered
              class="quick-card"
              clickable
              @click="goToPrivacy"
            >

              <q-card-section>

                <q-icon
                  name="privacy_tip"
                  size="28px"
                  color="primary"
                />

                <div class="text-subtitle1 text-weight-bold q-mt-sm">
                  Privacy Policy
                </div>

                <div class="text-caption text-grey-7 q-mt-xs">
                  Learn how we protect your information.
                </div>

              </q-card-section>

            </q-card>

          </div>


          <!-- Cancellation -->
          <div class="col-12 col-sm-4">

            <q-card
              flat
              bordered
              class="quick-card"
              clickable
              @click="goToCancellation"
            >

              <q-card-section>

                <q-icon
                  name="event_busy"
                  size="28px"
                  color="primary"
                />

                <div class="text-subtitle1 text-weight-bold q-mt-sm">
                  Cancellation Policy
                </div>

                <div class="text-caption text-grey-7 q-mt-xs">
                  Learn about booking cancellation rules.
                </div>

              </q-card-section>

            </q-card>

          </div>

        </div>

      </div>

    </div>

  </q-page>
</template>


<script setup>

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()


// =====================================================
// SEARCH
// =====================================================

const search = ref('')


// =====================================================
// CATEGORY
// =====================================================

const selectedCategory = ref('All')


// =====================================================
// FAQ DATA
// =====================================================

const faqs = ref([

  {
    id: 1,
    category: 'Booking',

    question: 'How can I book a vehicle on BatohiDrive?',

    answer: `
      <p>
        Booking a vehicle on BatohiDrive is simple.
      </p>

      <ol>
        <li>Open the <strong>Search Vehicle</strong> section.</li>
        <li>Enter your pickup location and travel details.</li>
        <li>Select a vehicle that suits your requirements.</li>
        <li>Review the vehicle and booking details.</li>
        <li>Continue with the booking and payment process.</li>
      </ol>

      <p>
        Once your booking is successfully confirmed, you can view it
        from the <strong>My Bookings</strong> section.
      </p>
    `
  },

  {
    id: 2,
    category: 'Booking',

    question: 'How can I search for available vehicles?',

    answer: `
      <p>
        Go to the <strong>Search Vehicle</strong> page from your customer
        dashboard.
      </p>

      <p>
        Enter your pickup location, destination and required travel
        details. Available vehicles will then be displayed based on
        your search criteria.
      </p>
    `
  },

  {
    id: 3,
    category: 'Booking',

    question: 'How do I know if my booking is confirmed?',

    answer: `
      <p>
        After successfully completing your booking, you can check its
        status from the <strong>My Bookings</strong> section.
      </p>

      <p>
        A confirmed booking will display its booking status along with
        the vehicle and trip information.
      </p>
    `
  },

  {
    id: 4,
    category: 'Payment',

    question: 'What payment methods are available?',

    answer: `
      <p>
        BatohiDrive supports the payment methods made available during
        the checkout process.
      </p>

      <p>
        The available payment options will be displayed before you
        confirm your booking.
      </p>
    `
  },

  {
    id: 5,
    category: 'Payment',

    question: 'When will my payment be charged?',

    answer: `
      <p>
        Payment is processed according to the booking and payment
        instructions shown during checkout.
      </p>

      <p>
        Always review the final amount before completing your payment.
      </p>
    `
  },

  {
    id: 6,
    category: 'Cancellation',

    question: 'How can I cancel my booking?',

    answer: `
      <p>
        You can cancel an eligible booking from the
        <strong>My Bookings</strong> section.
      </p>

      <p>
        Open the booking you want to cancel and select the
        <strong>Cancel Booking</strong> option.
      </p>

      <p>
        Cancellation eligibility and applicable charges depend on the
        cancellation policy associated with your booking.
      </p>
    `
  },

  {
    id: 7,
    category: 'Cancellation',

    question: 'Will I receive a refund if I cancel my booking?',

    answer: `
      <p>
        Refund eligibility depends on the cancellation terms applicable
        to your booking.
      </p>

      <p>
        The refund amount may vary depending on when the booking is
        cancelled and the applicable cancellation rules.
      </p>

      <p>
        Please check the <strong>Refund Policy</strong> before cancelling
        your booking.
      </p>
    `
  },

  {
    id: 8,
    category: 'Vehicle',

    question: 'Can I choose a specific vehicle?',

    answer: `
      <p>
        Yes. When available, you can select a vehicle from the vehicles
        displayed for your search.
      </p>

      <p>
        Vehicle availability depends on your selected location,
        date and booking requirements.
      </p>
    `
  },

  {
    id: 9,
    category: 'Vehicle',

    question: 'Can I see vehicle details before booking?',

    answer: `
      <p>
        Yes. You can open the vehicle details page before completing
        your booking.
      </p>

      <p>
        Vehicle information may include vehicle type, seating capacity,
        images, features and other relevant booking information.
      </p>
    `
  },

  {
    id: 10,
    category: 'Driver',

    question: 'Will a driver be provided with my booking?',

    answer: `
      <p>
        Driver availability depends on the type of vehicle and service
        selected during booking.
      </p>

      <p>
        If a driver is included, the relevant driver information will
        be provided according to the booking details.
      </p>
    `
  },

  {
    id: 11,
    category: 'Account',

    question: 'How can I update my profile information?',

    answer: `
      <p>
        Open your customer profile from the account menu.
      </p>

      <p>
        From there, you can update the profile information that is
        available for editing.
      </p>
    `
  },

  {
    id: 12,
    category: 'Account',

    question: 'I forgot my password. What should I do?',

    answer: `
      <p>
        On the login page, select <strong>Forgot Password</strong>.
      </p>

      <p>
        Follow the verification steps to verify your account and create
        a new password.
      </p>
    `
  },

  {
    id: 13,
    category: 'Booking',

    question: 'Where can I see my previous bookings?',

    answer: `
      <p>
        You can view your previous and current bookings from the
        <strong>My Bookings</strong> section of your customer panel.
      </p>

      <p>
        You can also check the status and details of individual bookings
        from there.
      </p>
    `
  },

  {
    id: 14,
    category: 'Support',

    question: 'How can I contact BatohiDrive support?',

    answer: `
      <p>
        You can contact BatohiDrive support using the support options
        available in your customer panel.
      </p>

      <p>
        When contacting support about a booking, keep your booking
        information available so the team can assist you more quickly.
      </p>
    `
  }

])


// =====================================================
// CATEGORIES
// =====================================================

const categories = computed(() => {

  return [
    ...new Set(
      faqs.value.map(faq => faq.category)
    )
  ]

})


// =====================================================
// FILTER FAQ
// =====================================================

const filteredFaqs = computed(() => {

  const keyword = search.value
    .toLowerCase()
    .trim()

  return faqs.value.filter(faq => {

    const matchesCategory =
      selectedCategory.value === 'All' ||
      faq.category === selectedCategory.value

    const matchesSearch =
      !keyword ||
      faq.question.toLowerCase().includes(keyword) ||
      faq.answer.toLowerCase().includes(keyword) ||
      faq.category.toLowerCase().includes(keyword)

    return matchesCategory && matchesSearch

  })

})


// =====================================================
// CLEAR SEARCH
// =====================================================

const clearSearch = () => {

  search.value = ''

  selectedCategory.value = 'All'

}


// =====================================================
// CONTACT SUPPORT
// =====================================================

const contactSupport = () => {

  $q.notify({
    type: 'info',
    message: 'Support section will be available soon.',
    icon: 'support_agent'
  })

  // Later you can navigate to:
  // router.push('/customer/support')

}


// =====================================================
// TERMS
// =====================================================

const goToTerms = () => {

  router.push('/customer/terms-and-conditions')

}


// =====================================================
// PRIVACY
// =====================================================

const goToPrivacy = () => {

  router.push('/customer/privacy-policy')

}


// =====================================================
// CANCELLATION
// =====================================================

const goToCancellation = () => {

  router.push('/customer/cancellation-policy')

}

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.faq-page {
  min-height: 100%;
  background: #f7f8fa;
}


/* =====================================================
   HEADER
===================================================== */

.faq-header {
  background: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  padding: 28px 24px;
}

.faq-header-content {
  max-width: 1100px;
  margin: auto;

  display: flex;
  align-items: center;
}

.header-icon {
  width: 62px;
  height: 62px;

  border-radius: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(25, 118, 210, 0.1);
  color: #1976d2;

  margin-right: 16px;
}


/* =====================================================
   TITLES
===================================================== */

.page-title {
  font-size: 27px;
  font-weight: 700;
  color: #1f2937;
}

.page-subtitle {
  color: #6b7280;
  margin-top: 5px;
  font-size: 14px;
}


/* =====================================================
   CONTAINER
===================================================== */

.container {
  max-width: 1100px;
  margin: auto;
  padding: 28px 20px;
}


/* =====================================================
   SEARCH CARD
===================================================== */

.search-card {
  border-radius: 14px;
  padding: 8px;
  background: #ffffff;
}

.faq-search {
  width: 100%;
}


/* =====================================================
   CATEGORY
===================================================== */

.category-wrapper {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.category-btn {
  border-radius: 8px;
  min-height: 38px;
}


/* =====================================================
   FAQ CARD
===================================================== */

.faq-card {
  background: #ffffff;
  border-radius: 12px;
  margin-bottom: 12px;

  overflow: hidden;

  transition: all 0.2s ease;
}

.faq-card:hover {
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
}


/* =====================================================
   FAQ QUESTION
===================================================== */

.faq-question {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  min-height: 62px;
}


/* =====================================================
   FAQ ANSWER
===================================================== */

.faq-answer {
  background: #fafafa;
  color: #555;
}

.answer-content {
  font-size: 14px;
  line-height: 1.8;
}

.answer-content :deep(p) {
  margin-top: 0;
  margin-bottom: 12px;
}

.answer-content :deep(ul),
.answer-content :deep(ol) {
  padding-left: 22px;
}

.answer-content :deep(li) {
  margin-bottom: 6px;
}


/* =====================================================
   CATEGORY CHIP
===================================================== */

.faq-category {
  margin-top: 15px;
}


/* =====================================================
   EMPTY STATE
===================================================== */

.empty-card {
  border-radius: 12px;
  background: #ffffff;
}


/* =====================================================
   SUPPORT
===================================================== */

.support-card {
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e4e7eb;
}

.support-icon {
  width: 55px;
  height: 55px;

  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(25, 118, 210, 0.1);
}


/* =====================================================
   QUICK LINKS
===================================================== */

.quick-card {
  border-radius: 12px;
  background: #ffffff;

  height: 100%;

  transition: all 0.2s ease;
}

.quick-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.07);
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 600px) {

  .faq-header {
    padding: 20px 16px;
  }

  .faq-header-content {
    align-items: flex-start;
  }

  .header-icon {
    width: 52px;
    height: 52px;
  }

  .page-title {
    font-size: 21px;
  }

  .page-subtitle {
    font-size: 13px;
  }

  .container {
    padding: 20px 12px;
  }

  .support-card .row {
    align-items: flex-start;
  }

  .support-card .q-btn {
    width: 100%;
    margin-top: 15px;
  }

}

</style>
