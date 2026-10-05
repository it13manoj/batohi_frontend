<template>
  <q-page class="faq-page">
    <!-- =====================================================
         HEADER
    ====================================================== -->
    <div class="faq-header">
      <div class="faq-header-content">
        <div class="header-icon">
          <q-icon name="help_outline" size="38px" />
        </div>

        <div>
          <div class="page-title"> Frequently Asked Questions </div>

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
      <q-card flat bordered class="search-card">
        <q-input
          v-model="search"
          outlined
          rounded
          clearable
          placeholder="Search your question..."
          class="faq-search"
        >
          <template #prepend>
            <q-icon name="search" color="primary" />
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
              <div class="answer-content" v-html="faq.answer" />

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
            <q-icon name="search_off" size="64px" color="grey-5" />

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
      <q-card flat class="support-card q-mt-xl">
        <q-card-section>
          <div class="row items-center">
            <div class="support-icon">
              <q-icon name="support_agent" size="32px" color="primary" />
            </div>

            <div class="col q-ml-md">
              <div class="text-h6 text-weight-bold"> Still need help? </div>

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
                <q-icon name="description" size="28px" color="primary" />

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
                <q-icon name="privacy_tip" size="28px" color="primary" />

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
                <q-icon name="event_busy" size="28px" color="primary" />

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
        Use the search and booking flow available on the customer dashboard. Select your trip details, choose an available vehicle, review the booking information, and complete payment to confirm the service.
      </p>
      <p>
        Once confirmed, you can track the booking from the My Bookings section of your account.
      </p>
    `
  },
  {
    id: 2,
    category: 'Booking',
    question: 'Who is responsible for the vehicle and driver?',
    answer: `
      <p>
        The relevant driver and vehicle owner are responsible for the vehicle, driver documents, registration, insurance, and safe operation of the service.
      </p>
      <p>
        BatohiDrive provides the platform access and booking facilitation, but does not own each vehicle listed on the app.
      </p>
    `
  },
  {
    id: 3,
    category: 'Booking',
    question: 'How do I know if my booking is confirmed?',
    answer: `
      <p>
        A booking is considered confirmed only after the payment and booking process has been successfully completed and you receive the platform confirmation.
      </p>
      <p>
        You can check the status in the My Bookings section of your account.
      </p>
    `
  },
  {
    id: 4,
    category: 'Payment',
    question: 'What payment methods are available?',
    answer: `
      <p>
        BatohiDrive supports the payment methods made available during the booking and checkout flow.
      </p>
      <p>
        The available payment options are displayed before payment confirmation.
      </p>
    `
  },
  {
    id: 5,
    category: 'Payment',
    question: 'When will my payment be charged?',
    answer: `
      <p>
        Payment is processed according to the checkout flow and the booking terms shown before confirmation.
      </p>
      <p>
        Please review the final amount before completing the transaction.
      </p>
    `
  },
  {
    id: 6,
    category: 'Cancellation',
    question: 'How can I cancel my booking?',
    answer: `
      <p>
        You can cancel an eligible booking from the My Bookings section of your account.
      </p>
      <p>
        Cancellation rules and any applicable charges depend on the specific booking terms and the cancellation policy.
      </p>
    `
  },
  {
    id: 7,
    category: 'Cancellation',
    question: 'Will I receive a refund if I cancel my booking?',
    answer: `
      <p>
        Refund eligibility depends on the cancellation terms and the reason for cancellation.
      </p>
      <p>
        Some bookings may be fully refundable, partially refundable, or non-refundable depending on the policy associated with that booking.
      </p>
    `
  },
  {
    id: 8,
    category: 'Vehicle',
    question: 'Can I choose a specific vehicle?',
    answer: `
      <p>
        Yes, when available. You may select a vehicle based on your search results and preferences.
      </p>
      <p>
        Vehicle availability can vary by location, date, time, and service conditions.
      </p>
    `
  },
  {
    id: 9,
    category: 'Vehicle',
    question: 'Can I see vehicle details before booking?',
    answer: `
      <p>
        Yes. Vehicle details are typically displayed before confirmation so that you can review the vehicle category, features, and service information.
      </p>
    `
  },
  {
    id: 10,
    category: 'Driver',
    question: 'Will a driver be assigned to my booking?',
    answer: `
      <p>
        Driver assignment depends on the service type and availability. If a driver is included in the service, the relevant booking details will be provided through the platform.
      </p>
      <p>
        Customers are expected to use the driver information only for the relevant booking and service context.
      </p>
    `
  },
  {
    id: 11,
    category: 'Account',
    question: 'How can I update my profile information?',
    answer: `
      <p>
        Open your profile from the account menu and update the available fields that can be edited.
      </p>
      <p>
        Keep your personal and contact details current so your bookings and communications remain accurate.
      </p>
    `
  },
  {
    id: 12,
    category: 'Account',
    question: 'I forgot my password. What should I do?',
    answer: `
      <p>
        Use the Forgot Password option on the login page and follow the verification steps to reset your password.
      </p>
      <p>
        Keep your login credentials secure and do not share them with anyone.
      </p>
    `
  },
  {
    id: 13,
    category: 'Policy',
    question: 'Is BatohiDrive the owner of the vehicle used for service?',
    answer: `
      <p>
        Generally, no. BatohiDrive provides the platform and booking access, while the driver or vehicle owner remains responsible for the vehicle and its lawful operation.
      </p>
      <p>
        Customers should verify the booking, vehicle, and service details shown in the app before the trip begins.
      </p>
    `
  },
  {
    id: 14,
    category: 'Support',
    question: 'How can I contact BatohiDrive support?',
    answer: `
      <p>
        You can contact support through the support option available in the customer panel or through the official support channel shown in the app.
      </p>
      <p>
        Keep your booking ID and relevant details ready so the support team can review the issue quickly.
      </p>
    `
  }
])

// =====================================================
// CATEGORIES
// =====================================================

const categories = computed(() => {
  return [...new Set(faqs.value.map(faq => faq.category))]
})

// =====================================================
// FILTER FAQ
// =====================================================

const filteredFaqs = computed(() => {
  const keyword = search.value.toLowerCase().trim()

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
