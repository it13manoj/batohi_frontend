<template>
  <q-page class="driver-faq-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header q-mb-lg">
      <div class="row items-center no-wrap">

        <div class="header-icon">
          <q-icon
            name="help_outline"
            size="30px"
            color="primary"
          />
        </div>

        <div class="q-ml-md">
          <div class="text-h5 text-weight-bold">
            Frequently Asked Questions
          </div>

          <div class="text-grey-7 q-mt-xs">
            Find answers to common questions about driving with BatohiDrive
          </div>
        </div>

      </div>
    </div>

    <!-- =====================================================
         SEARCH
    ====================================================== -->
    <q-card
      flat
      bordered
      class="search-card q-mb-lg"
    >
      <q-input
        v-model="search"
        outlined
        dense
        clearable
        placeholder="Search your question..."
        class="search-input"
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card>

    <!-- =====================================================
         CATEGORY FILTER
    ====================================================== -->
    <q-card
      flat
      bordered
      class="category-card q-mb-lg"
    >
      <div class="text-subtitle1 text-weight-bold q-mb-md">
        Browse by Category
      </div>

      <div class="category-list">

        <q-btn
          v-for="category in categories"
          :key="category"
          :label="category"
          :icon="getCategoryIcon(category)"
          :color="selectedCategory === category ? 'primary' : 'grey-7'"
          :outline="selectedCategory !== category"
          unelevated
          no-caps
          class="category-btn"
          @click="selectedCategory = category"
        />

      </div>
    </q-card>

    <!-- =====================================================
         FAQ LIST
    ====================================================== -->
    <div
      v-if="filteredFaqs.length"
      class="faq-list"
    >

      <q-card
        v-for="faq in filteredFaqs"
        :key="faq.id"
        flat
        bordered
        class="faq-card q-mb-md"
      >

        <q-expansion-item
          expand-separator
          :icon="faq.icon"
          :label="faq.question"
          :caption="faq.category"
          header-class="faq-header"
          expand-icon-class="text-primary"
        >

          <q-card-section class="faq-answer">

            <div class="answer-label">
              <q-icon
                name="lightbulb"
                color="primary"
                size="20px"
              />

              <span>
                Answer
              </span>
            </div>

            <div class="answer-text q-mt-sm">
              {{ faq.answer }}
            </div>

            <!-- Additional Points -->
            <ul
              v-if="faq.points && faq.points.length"
              class="answer-list"
            >
              <li
                v-for="(point, index) in faq.points"
                :key="index"
              >
                {{ point }}
              </li>
            </ul>

          </q-card-section>

        </q-expansion-item>

      </q-card>

    </div>

    <!-- =====================================================
         EMPTY STATE
    ====================================================== -->
    <q-card
      v-else
      flat
      bordered
      class="empty-card"
    >

      <q-icon
        name="search_off"
        size="55px"
        color="grey-5"
      />

      <div class="text-h6 q-mt-md">
        No questions found
      </div>

      <div class="text-grey-6 q-mt-sm">
        Try searching with a different keyword or category.
      </div>

      <q-btn
        v-if="search || selectedCategory !== 'All'"
        flat
        color="primary"
        label="Clear Filters"
        icon="filter_alt_off"
        class="q-mt-md"
        @click="clearFilters"
      />

    </q-card>

    <!-- =====================================================
         QUICK DRIVER HELP
    ====================================================== -->
    <div class="text-h6 text-weight-bold q-mt-xl q-mb-md">
      Quick Driver Help
    </div>

    <div class="row q-col-gutter-md">

      <!-- My Trips -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card
          flat
          bordered
          class="help-card"
          clickable
          @click="goTo('/driver/assigned-trips')"
        >
          <q-card-section>

            <q-avatar
              color="blue-1"
              text-color="primary"
              icon="route"
              size="48px"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              My Trips
            </div>

            <div class="text-grey-7 q-mt-xs">
              View your assigned and completed trips.
            </div>

          </q-card-section>
        </q-card>
      </div>

      <!-- Earnings -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card
          flat
          bordered
          class="help-card"
          clickable
          @click="goTo('/driver/earnings')"
        >
          <q-card-section>

            <q-avatar
              color="green-1"
              text-color="positive"
              icon="currency_rupee"
              size="48px"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Earnings
            </div>

            <div class="text-grey-7 q-mt-xs">
              Check your earnings and payment information.
            </div>

          </q-card-section>
        </q-card>
      </div>

      <!-- Vehicle -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card
          flat
          bordered
          class="help-card"
          clickable
          @click="goTo('/driver/management')"
        >
          <q-card-section>

            <q-avatar
              color="orange-1"
              text-color="orange-8"
              icon="directions_car"
              size="48px"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              My Vehicle
            </div>

            <div class="text-grey-7 q-mt-xs">
              Manage your vehicle and related information.
            </div>

          </q-card-section>
        </q-card>
      </div>

      <!-- Support -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card
          flat
          bordered
          class="help-card"
          clickable
          @click="contactSupport"
        >
          <q-card-section>

            <q-avatar
              color="purple-1"
              text-color="purple"
              icon="support_agent"
              size="48px"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Support
            </div>

            <div class="text-grey-7 q-mt-xs">
              Contact support for help with driver issues.
            </div>

          </q-card-section>
        </q-card>
      </div>

    </div>

    <!-- =====================================================
         SUPPORT CARD
    ====================================================== -->
    <q-card
      flat
      bordered
      class="support-card q-mt-lg"
    >

      <div class="row items-center justify-between">

        <div class="row items-center">

          <q-avatar
            color="blue-1"
            text-color="primary"
            icon="support_agent"
            size="52px"
          />

          <div class="q-ml-md">

            <div class="text-subtitle1 text-weight-bold">
              Still need help?
            </div>

            <div class="text-grey-7 q-mt-xs">
              Our support team is available to help you with
              trips, customers, payments and account-related issues.
            </div>

          </div>

        </div>

        <q-btn
          color="primary"
          unelevated
          icon="support_agent"
          label="Contact Support"
          class="q-mt-sm"
          @click="contactSupport"
        />

      </div>

    </q-card>

    <!-- =====================================================
         DRIVER INFORMATION
    ====================================================== -->
    <div class="text-h6 text-weight-bold q-mt-xl q-mb-md">
      Driver Information
    </div>

    <div class="row q-col-gutter-md">

      <!-- Terms -->
      <div class="col-12 col-md-4">

        <q-card
          flat
          bordered
          class="related-card"
          clickable
          @click="goTo('/driver/terms-and-conditions')"
        >

          <q-card-section>

            <q-icon
              name="description"
              size="32px"
              color="primary"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              Terms & Conditions
            </div>

            <div class="text-grey-7 q-mt-xs">
              Review the terms and conditions applicable to drivers.
            </div>

          </q-card-section>

        </q-card>

      </div>

      <!-- Privacy -->
      <div class="col-12 col-md-4">

        <q-card
          flat
          bordered
          class="related-card"
          clickable
          @click="goTo('/driver/privacy-policy')"
        >

          <q-card-section>

            <q-icon
              name="privacy_tip"
              size="32px"
              color="primary"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              Privacy Policy
            </div>

            <div class="text-grey-7 q-mt-xs">
              Learn how driver information is handled and protected.
            </div>

          </q-card-section>

        </q-card>

      </div>

      <!-- About -->
      <div class="col-12 col-md-4">

        <q-card
          flat
          bordered
          class="related-card"
          clickable
          @click="goTo('/driver/about-us')"
        >

          <q-card-section>

            <q-icon
              name="info"
              size="32px"
              color="primary"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              About BatohiDrive
            </div>

            <div class="text-grey-7 q-mt-xs">
              Learn more about BatohiDrive and our services.
            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>

  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// =====================================================
// SEARCH & CATEGORY
// =====================================================

const search = ref('')
const selectedCategory = ref('All')

// =====================================================
// CATEGORIES
// =====================================================

const categories = [
  'All',
  'Account',
  'Trips',
  'Bookings',
  'Customer',
  'Vehicle',
  'Documents',
  'Earnings',
  'Cancellation',
  'Safety',
  'Support'
]

// =====================================================
// FAQ DATA
// =====================================================

const faqs = ref([
  {
    id: 1,
    category: 'Account',
    icon: 'person',
    question: 'How can I update my driver profile?',
    answer:
      'You can update your available profile information from the My Profile section of your driver panel.',
    points: [
      'Open My Profile from the driver menu.',
      'Update the information that can be edited.',
      'Save your changes after reviewing the details.'
    ]
  },

  {
    id: 2,
    category: 'Account',
    icon: 'lock',
    question: 'What should I do if I forget my password?',
    answer:
      'Use the Forgot Password option on the login page to reset your account password.',
    points: [
      'Enter your registered mobile number or email address.',
      'Verify the OTP if required.',
      'Create a new password and log in again.'
    ]
  },

  {
    id: 3,
    category: 'Trips',
    icon: 'route',
    question: 'Where can I see my assigned trips?',
    answer:
      'Assigned trips can be viewed from the My Trips or Trips section of your driver panel.',
    points: [
      'Check upcoming trips for future bookings.',
      'Open a trip to view customer and pickup information.',
      'Update the trip status according to the actual trip progress.'
    ]
  },

  {
    id: 4,
    category: 'Trips',
    icon: 'play_circle',
    question: 'How do I start a trip?',
    answer:
      'When you reach the pickup location and are ready to begin the trip, open the assigned booking and use the available Start Trip option.',
    points: [
      'Verify the booking information.',
      'Confirm that you are at the correct pickup location.',
      'Start the trip using the driver panel.'
    ]
  },

  {
    id: 5,
    category: 'Trips',
    icon: 'task_alt',
    question: 'How do I complete a trip?',
    answer:
      'After the customer journey has been completed, use the Complete Trip option available in the trip details.',
    points: [
      'Make sure the trip has actually been completed.',
      'Review the trip details.',
      'Update the trip status to completed.'
    ]
  },

  {
    id: 6,
    category: 'Bookings',
    icon: 'event',
    question: 'How will I receive a new booking?',
    answer:
      'When a booking is assigned to you, the booking information may appear in your driver panel and you may receive a notification depending on the system configuration.',
    points: [
      'Check your upcoming bookings regularly.',
      'Review pickup date and time.',
      'Review customer and vehicle information before accepting or starting the trip.'
    ]
  },

  {
    id: 7,
    category: 'Bookings',
    icon: 'visibility',
    question: 'What information can I see about a booking?',
    answer:
      'Depending on the booking and your driver permissions, you may see information such as customer details, pickup location, destination, scheduled time and vehicle information.',
    points: [
      'Only use customer information for the assigned trip.',
      'Keep customer information private.',
      'Contact support if booking information appears incorrect.'
    ]
  },

  {
    id: 8,
    category: 'Customer',
    icon: 'person',
    question: 'What should I do if I cannot find the customer?',
    answer:
      'First verify the pickup location and booking details. If you still cannot locate the customer, contact the customer using the available communication option or contact BatohiDrive support.',
    points: [
      'Wait at the correct pickup location.',
      'Check the scheduled pickup time.',
      'Contact support if the customer cannot be located.'
    ]
  },

  {
    id: 9,
    category: 'Customer',
    icon: 'support_agent',
    question: 'What should I do if a customer has a complaint?',
    answer:
      'Remain professional and try to understand the customers concern. If the issue cannot be resolved directly, contact BatohiDrive support.',
    points: [
      'Communicate politely with the customer.',
      'Do not argue with the customer.',
      'Report serious issues to support.'
    ]
  },

  {
    id: 10,
    category: 'Vehicle',
    icon: 'directions_car',
    question: 'Can I change my registered vehicle?',
    answer:
      'Vehicle changes depend on the driver account and system configuration. Contact the appropriate BatohiDrive team if you need to update your registered vehicle.',
    points: [
      'Vehicle information must be accurate.',
      'Required vehicle documents may need to be submitted.',
      'The updated vehicle may require verification before use.'
    ]
  },

  {
    id: 11,
    category: 'Vehicle',
    icon: 'build',
    question: 'What should I do if my vehicle breaks down during a trip?',
    answer:
      'Move to a safe location if possible and contact BatohiDrive support immediately. Explain the situation and provide the booking details.',
    points: [
      'Prioritize the safety of yourself and the customer.',
      'Do not continue driving an unsafe vehicle.',
      'Inform support as soon as possible.'
    ]
  },

  {
    id: 12,
    category: 'Documents',
    icon: 'folder',
    question: 'Where can I check my vehicle documents?',
    answer:
      'If document management is enabled for your driver account, you can view relevant document information from the vehicle or document section of your driver panel.',
    points: [
      'Keep documents valid and up to date.',
      'Upload clear document copies when requested.',
      'Contact support if a document status appears incorrect.'
    ]
  },

  {
    id: 13,
    category: 'Documents',
    icon: 'verified',
    question: 'What happens if my driver documents expire?',
    answer:
      'Expired documents may affect your ability to receive or complete bookings. You should update documents before their expiry date whenever possible.',
    points: [
      'Monitor document expiry dates.',
      'Submit updated documents when requested.',
      'Do not operate without legally required valid documents.'
    ]
  },

  {
    id: 14,
    category: 'Earnings',
    icon: 'currency_rupee',
    question: 'Where can I see my earnings?',
    answer:
      'Your available earnings information can be viewed from the Earnings section of the driver panel.',
    points: [
      'Check completed trip earnings.',
      'Review your earnings history.',
      'Contact support if an earning appears incorrect.'
    ]
  },

  {
    id: 15,
    category: 'Earnings',
    icon: 'account_balance',
    question: 'When will my earnings be paid?',
    answer:
      'Payment timing depends on the BatohiDrive payment and settlement process configured for your driver account.',
    points: [
      'Make sure your payment information is correct.',
      'Check your earnings history.',
      'Contact support if a payment is delayed beyond the applicable period.'
    ]
  },

  {
    id: 16,
    category: 'Cancellation',
    icon: 'event_busy',
    question: 'What should I do if a customer wants to cancel a trip?',
    answer:
      'Ask the customer to follow the official cancellation process. If assistance is required, contact BatohiDrive support instead of cancelling the trip incorrectly from your side.',
    points: [
      'Do not make false cancellation updates.',
      'Follow the official cancellation procedure.',
      'Contact support if the situation is unclear.'
    ]
  },

  {
    id: 17,
    category: 'Cancellation',
    icon: 'cancel',
    question: 'Can I cancel an assigned trip?',
    answer:
      'Drivers should not cancel assigned trips without a valid reason or without following the BatohiDrive driver procedure. If you cannot complete a trip, contact support as soon as possible.',
    points: [
      'Inform support immediately.',
      'Explain the reason for cancellation.',
      'Avoid unnecessary trip cancellations.'
    ]
  },

  {
    id: 18,
    category: 'Safety',
    icon: 'health_and_safety',
    question: 'What should I do in case of an emergency?',
    answer:
      'In an emergency, prioritize the safety of yourself and the customer and contact the appropriate emergency service when necessary. Inform BatohiDrive support as soon as it is safe to do so.',
    points: [
      'Move to a safe location when possible.',
      'Contact emergency services when required.',
      'Inform BatohiDrive support about the incident.'
    ]
  },

  {
    id: 19,
    category: 'Safety',
    icon: 'security',
    question: 'What safety rules should I follow while driving?',
    answer:
      'Drivers should follow applicable traffic laws, drive responsibly and ensure that the vehicle is safe to operate.',
    points: [
      'Follow speed limits and traffic rules.',
      'Do not drive under the influence of alcohol or drugs.',
      'Do not use a mobile phone in a way that compromises safe driving.',
      'Use appropriate safety equipment and procedures.'
    ]
  },

  {
    id: 20,
    category: 'Support',
    icon: 'support_agent',
    question: 'How can I contact BatohiDrive support?',
    answer:
      'You can contact BatohiDrive support through the support option available in your driver panel.',
    points: [
      'Keep your booking ID available.',
      'Explain your issue clearly.',
      'Provide screenshots or relevant information when requested.'
    ]
  },

  {
    id: 21,
    category: 'Support',
    icon: 'report_problem',
    question: 'What should I do if there is an issue with the driver app?',
    answer:
      'First check your internet connection and try reopening the application or page. If the issue continues, contact BatohiDrive support.',
    points: [
      'Check your internet connection.',
      'Refresh or reopen the application.',
      'Record the error message if possible.',
      'Contact support with the relevant details.'
    ]
  }
])

// =====================================================
// FILTERED FAQS
// =====================================================

const filteredFaqs = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  return faqs.value.filter(faq => {

    const categoryMatch =
      selectedCategory.value === 'All' ||
      faq.category === selectedCategory.value

    if (!categoryMatch) {
      return false
    }

    if (!keyword) {
      return true
    }

    const questionMatch =
      faq.question.toLowerCase().includes(keyword)

    const answerMatch =
      faq.answer.toLowerCase().includes(keyword)

    const pointsMatch =
      faq.points.some(point =>
        point.toLowerCase().includes(keyword)
      )

    return questionMatch || answerMatch || pointsMatch
  })
})

// =====================================================
// CATEGORY ICON
// =====================================================

const getCategoryIcon = (category) => {
  const icons = {
    All: 'apps',
    Account: 'person',
    Trips: 'route',
    Bookings: 'event',
    Customer: 'groups',
    Vehicle: 'directions_car',
    Documents: 'description',
    Earnings: 'currency_rupee',
    Cancellation: 'event_busy',
    Safety: 'health_and_safety',
    Support: 'support_agent'
  }

  return icons[category] || 'help_outline'
}

// =====================================================
// CLEAR FILTERS
// =====================================================

const clearFilters = () => {
  search.value = ''
  selectedCategory.value = 'All'
}

// =====================================================
// ROUTING
// =====================================================

const goTo = (route) => {
  router.push(route)
}

// =====================================================
// SUPPORT
// =====================================================

const contactSupport = () => {
  router.push('/driver/support')
}
</script>

<style scoped>
/* =====================================================
   PAGE
===================================================== */

.driver-faq-page {
  min-height: 100vh;
  background: #f7f8fa;
}

/* =====================================================
   HEADER
===================================================== */

.page-header {
  padding: 4px 0;
}

.header-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: #e3f2fd;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* =====================================================
   SEARCH
===================================================== */

.search-card {
  padding: 12px;
  border-radius: 12px;
  background: #ffffff;
}

.search-input {
  max-width: 650px;
}

/* =====================================================
   CATEGORY
===================================================== */

.category-card {
  padding: 20px;
  border-radius: 14px;
  background: #ffffff;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-btn {
  border-radius: 20px;
}

/* =====================================================
   FAQ
===================================================== */

.faq-card {
  border-radius: 14px;
  background: #ffffff;
  overflow: hidden;
}

.faq-header {
  min-height: 68px;
}

.faq-answer {
  background: #fafafa;
  border-top: 1px solid #eeeeee;
}

.answer-label {
  display: flex;
  align-items: center;
  gap: 7px;

  color: #1976d2;
  font-weight: 600;
  font-size: 14px;
}

.answer-text {
  color: #555;
  line-height: 1.75;
  font-size: 15px;
}

.answer-list {
  margin-top: 14px;
  padding-left: 22px;
  color: #555;
}

.answer-list li {
  margin-bottom: 8px;
}

/* =====================================================
   EMPTY
===================================================== */

.empty-card {
  min-height: 300px;
  border-radius: 14px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  background: #ffffff;
}

/* =====================================================
   QUICK HELP
===================================================== */

.help-card {
  height: 100%;
  border-radius: 14px;
  background: #ffffff;

  cursor: pointer;

  transition: all 0.2s ease;
}

.help-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08);
}

/* =====================================================
   SUPPORT
===================================================== */

.support-card {
  padding: 20px;
  border-radius: 14px;
  background: #ffffff;
}

/* =====================================================
   RELATED INFORMATION
===================================================== */

.related-card {
  height: 100%;
  border-radius: 14px;
  background: #ffffff;

  cursor: pointer;

  transition: all 0.2s ease;
}

.related-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08);
}

/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 768px) {

  .driver-faq-page {
    padding: 12px !important;
  }

  .page-header .text-h5 {
    font-size: 20px;
  }

  .category-card {
    padding: 16px;
  }

  .category-list {
    gap: 7px;
  }

  .category-btn {
    font-size: 12px;
  }

  .faq-header {
    min-height: 62px;
  }

  .support-card {
    padding: 16px;
  }

  .support-card .row {
    align-items: flex-start;
  }
}
</style>
