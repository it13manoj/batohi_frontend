<template>
  <q-page class="driver-faq-page q-pa-md">
    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header q-mb-lg">
      <div class="row items-center no-wrap">
        <div class="header-icon">
          <q-icon name="help_outline" size="30px" color="primary" />
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
    <q-card flat bordered class="search-card q-mb-lg">
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
    <q-card flat bordered class="category-card q-mb-lg">
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
    <div v-if="filteredFaqs.length" class="faq-list">
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
              <q-icon name="lightbulb" color="primary" size="20px" />

              <span> Answer </span>
            </div>

            <div class="answer-text q-mt-sm">
              {{ faq.answer }}
            </div>

            <!-- Additional Points -->
            <ul v-if="faq.points && faq.points.length" class="answer-list">
              <li v-for="(point, index) in faq.points" :key="index">
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
    <q-card v-else flat bordered class="empty-card">
      <q-icon name="search_off" size="55px" color="grey-5" />

      <div class="text-h6 q-mt-md"> No questions found </div>

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

            <div class="text-subtitle1 text-weight-bold q-mt-md"> Support </div>

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
    <q-card flat bordered class="support-card q-mt-lg">
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
              Our support team is available to help you with trips, customers,
              payments and account-related issues.
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
            <q-icon name="description" size="32px" color="primary" />

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
            <q-icon name="privacy_tip" size="32px" color="primary" />

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
            <q-icon name="info" size="32px" color="primary" />

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
  'Vehicle',
  'Documents',
  'Earnings',
  'Cancellation',
  'Safety',
  'Support'
]

const faqs = ref([
  {
    id: 1,
    category: 'Account',
    icon: 'person',
    question: 'Who is responsible for the vehicle and driver documents?',
    answer:
      'The driver is responsible for the vehicle, legal compliance, driver documents, and operational safety. BatohiDrive provides the platform and subscription access, but does not own the vehicle or operate the trip business directly.',
    points: [
      'The driver must provide accurate ownership or authorization information when listing a vehicle.',
      'The driver must keep all required licenses, registrations, and insurance documents valid.',
      'Any missing or false vehicle information may lead to account restriction or suspension.'
    ]
  },
  {
    id: 2,
    category: 'Account',
    icon: 'lock',
    question: 'What if I forget my password or cannot access my account?',
    answer:
      'Use the forgot password option on the login page or contact support through the driver panel for account recovery help.',
    points: [
      'Verify the registered mobile number or email before resetting.',
      'Do not share your account credentials with anyone.',
      'Support may ask for identity verification before approving account recovery.'
    ]
  },
  {
    id: 3,
    category: 'Trips',
    icon: 'route',
    question: 'Where can I see my assigned trips?',
    answer:
      'Assigned trips can be viewed in the Trips or My Trips section of your driver panel.',
    points: [
      'Check pickup location, route, trip status, and customer information.',
      'Update trip status only after actual trip action is completed.',
      'If the trip details are wrong, contact support immediately.'
    ]
  },
  {
    id: 4,
    category: 'Trips',
    icon: 'play_circle',
    question: 'How do I start and complete a trip?',
    answer:
      'Open the assigned booking and use the Start Trip option when you are at the pickup location. Complete the trip when the ride is finished and update the booking status in the app.',
    points: [
      'Verify the pickup location and customer before starting.',
      'Do not mark the trip complete before the ride is actually finished.',
      'If there is a problem, contact support instead of making an incorrect status update.'
    ]
  },
  {
    id: 5,
    category: 'Bookings',
    icon: 'event',
    question: 'How do I receive new bookings?',
    answer:
      'New or assigned bookings appear in the driver panel and may also trigger notifications depending on the system configuration.',
    points: [
      'Check your booking list regularly.',
      'Review pickup time and route before accepting or starting the trip.',
      'Do not use customer information outside the assigned trip.'
    ]
  },
  {
    id: 6,
    category: 'Vehicle',
    icon: 'directions_car',
    question: 'Can I change my registered vehicle or owner details?',
    answer:
      'Yes, but the updated information must be accurate and may require document verification before it is accepted on the platform.',
    points: [
      'Updated vehicle details must match the actual legal status of the vehicle.',
      'Any change in ownership or authorization must be reported promptly.',
      'Failure to update documents may cause trip or account issues.'
    ]
  },
  {
    id: 7,
    category: 'Vehicle',
    icon: 'build',
    question: 'What if my vehicle breaks down during a trip?',
    answer:
      'Move to a safe place if possible, prioritize safety, and contact support or emergency services as needed.',
    points: [
      'Do not continue driving an unsafe vehicle.',
      'Inform the platform support team as soon as it is safe to do so.',
      'Provide accurate details about the incident and trip status.'
    ]
  },
  {
    id: 8,
    category: 'Documents',
    icon: 'folder',
    question: 'Where can I check my driver and vehicle documents?',
    answer:
      'If document management is enabled for your account, you can view and update required documents from the driver panel or vehicle section.',
    points: [
      'Keep all required documents valid and up to date.',
      'Upload updated documents when requested.',
      'Do not operate without legally required valid documents.'
    ]
  },
  {
    id: 9,
    category: 'Documents',
    icon: 'verified',
    question: 'What happens if my documents expire?',
    answer:
      'Expired or invalid documents may block bookings or trigger account restrictions. Drivers should renew them before expiry whenever possible.',
    points: [
      'Monitor expiry dates regularly.',
      'Submit renewal documents before the expiry date.',
      'Do not continue to operate with expired documents.'
    ]
  },
  {
    id: 10,
    category: 'Earnings',
    icon: 'currency_rupee',
    question: 'Where can I see my earnings and payouts?',
    answer:
      'Earnings and payment information are available in the Earnings or Payments section of the driver panel, depending on your account setup.',
    points: [
      'Check completed rides and payout status.',
      'Make sure bank and payout information is accurate.',
      'Contact support if a payment appears incorrect or delayed.'
    ]
  },
  {
    id: 11,
    category: 'Earnings',
    icon: 'money_off',
    question: 'Is the subscription fee refundable?',
    answer:
      'Usually no, subscription and platform access fees are non-refundable once the service has been activated or used, except in limited cases such as duplicate billing, wrong charge, or platform access failure.',
    points: [
      'Deferred or unused access may be reviewed in limited cases.',
      'No refund is given for low earnings or inactivity.',
      'Submit a refund request through support with full payment details.'
    ]
  },
  {
    id: 12,
    category: 'Cancellation',
    icon: 'event_busy',
    question: 'Can I cancel a trip?',
    answer:
      'Trip cancellation should only happen for valid reasons and must follow the platform process. Repeated or unnecessary cancellations may affect your account status.',
    points: [
      'Contact support if you cannot complete a trip.',
      'Do not cancel without a valid reason.',
      'Provide the correct reason when requesting cancellation or support.'
    ]
  },
  {
    id: 13,
    category: 'Safety',
    icon: 'health_and_safety',
    question: 'What should I do in case of an emergency?',
    answer:
      'Prioritize safety, contact emergency services if required, and inform BatohiDrive support as soon as safe to do so.',
    points: [
      'Move to a safe place when possible.',
      'Do not continue unsafe driving.',
      'Provide honest and clear information about the incident.'
    ]
  },
  {
    id: 14,
    category: 'Safety',
    icon: 'security',
    question: 'What safety rules must I follow as a driver?',
    answer:
      'Drivers must follow all traffic laws, drive responsibly, and ensure the vehicle is safe to operate before and during trips.',
    points: [
      'Follow local traffic laws and road safety rules.',
      'Do not drive under the influence of alcohol or drugs.',
      'Do not use a phone in a way that affects safe driving.',
      'Use all required safety measures and procedures.'
    ]
  },
  {
    id: 15,
    category: 'Support',
    icon: 'support_agent',
    question: 'How can I contact BatohiDrive support?',
    answer:
      'You can contact support through the support option in the driver panel or the official support channel available to your account.',
    points: [
      'Include booking ID, issue summary, and screenshots if possible.',
      'Report serious issues promptly.',
      'Support may ask for verification before resolving account or payment concerns.'
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

    const questionMatch = faq.question.toLowerCase().includes(keyword)

    const answerMatch = faq.answer.toLowerCase().includes(keyword)

    const pointsMatch = faq.points.some(point =>
      point.toLowerCase().includes(keyword)
    )

    return questionMatch || answerMatch || pointsMatch
  })
})

// =====================================================
// CATEGORY ICON
// =====================================================

const getCategoryIcon = category => {
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

const goTo = route => {
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
