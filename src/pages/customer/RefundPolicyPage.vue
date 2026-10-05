<template>
  <q-page class="refund-policy-page q-pa-md">
    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header q-mb-lg">
      <div class="row items-center no-wrap">
        <div class="header-icon">
          <q-icon name="currency_rupee" size="30px" color="primary" />
        </div>

        <div class="q-ml-md">
          <div class="text-h5 text-weight-bold"> Refund Policy </div>

          <div class="text-grey-7 q-mt-xs">
            Learn how refunds are calculated, processed and credited
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
        placeholder="Search refund policy..."
        class="search-input"
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card>

    <!-- =====================================================
         INTRODUCTION
    ====================================================== -->
    <q-card flat bordered class="intro-card q-mb-lg">
      <div class="row items-start no-wrap">
        <q-avatar
          color="primary"
          text-color="white"
          icon="currency_rupee"
          size="50px"
        />

        <div class="q-ml-md">
          <div class="text-h6 text-weight-bold"> Refund Policy </div>

          <div class="text-grey-7 q-mt-xs">
            Last updated: 02 September 2026
          </div>

          <div class="intro-text q-mt-md">
            This Refund Policy explains when customers may be eligible for a
            refund after cancelling a vehicle booking or when a booking cannot
            be fulfilled by BatohiDrive.
          </div>
        </div>
      </div>
    </q-card>

    <!-- =====================================================
         MAIN CONTENT
    ====================================================== -->
    <div class="row q-col-gutter-lg">
      <!-- ===================================================
           QUICK NAVIGATION
      ==================================================== -->
      <div class="col-12 col-md-3">
        <q-card flat bordered class="navigation-card">
          <div class="text-subtitle1 text-weight-bold q-mb-md">
            Quick Navigation
          </div>

          <q-list separator>
            <q-item
              v-for="section in filteredSections"
              :key="section.id"
              clickable
              v-ripple
              class="navigation-item"
              @click="scrollToSection(section.id)"
            >
              <q-item-section avatar>
                <q-icon :name="section.icon" color="primary" size="20px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  {{ section.title }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <div
            v-if="filteredSections.length === 0"
            class="text-grey-6 text-center q-pa-md"
          >
            No sections found
          </div>
        </q-card>
      </div>

      <!-- ===================================================
           POLICY CONTENT
      ==================================================== -->
      <div class="col-12 col-md-9">
        <!-- Empty Search -->
        <q-card
          v-if="filteredSections.length === 0"
          flat
          bordered
          class="empty-card"
        >
          <q-icon name="search_off" size="50px" color="grey-5" />

          <div class="text-h6 q-mt-md"> No results found </div>

          <div class="text-grey-6 q-mt-sm">
            Try searching with a different keyword.
          </div>
        </q-card>

        <!-- Policy Sections -->
        <div
          v-for="section in filteredSections"
          :key="section.id"
          :id="section.id"
          class="policy-section"
        >
          <q-card flat bordered class="policy-card">
            <!-- Section Header -->
            <div class="section-header row items-center no-wrap">
              <q-avatar
                color="blue-1"
                text-color="primary"
                :icon="section.icon"
                size="42px"
              />

              <div class="q-ml-md">
                <div class="text-h6 text-weight-bold">
                  {{ section.title }}
                </div>
              </div>
            </div>

            <!-- Section Content -->
            <div class="section-content q-mt-md">
              <p
                v-for="(paragraph, index) in section.content"
                :key="index"
                class="policy-paragraph"
              >
                {{ paragraph }}
              </p>

              <!-- Bullet Points -->
              <ul
                v-if="section.points && section.points.length"
                class="policy-list"
              >
                <li v-for="(point, index) in section.points" :key="index">
                  {{ point }}
                </li>
              </ul>
            </div>
          </q-card>
        </div>
      </div>
    </div>

    <!-- =====================================================
         REFUND SUMMARY
    ====================================================== -->
    <q-card flat bordered class="summary-card q-mt-lg">
      <div class="text-h6 text-weight-bold q-mb-md"> Refund Summary </div>

      <div class="row q-col-gutter-md">
        <!-- Full Refund -->
        <div class="col-12 col-sm-4">
          <div class="refund-box">
            <q-icon name="check_circle" size="30px" color="positive" />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              Full Refund
            </div>

            <div class="text-grey-7 q-mt-xs">
              Eligible cancellations made within the applicable
              free-cancellation period may qualify for a full refund.
            </div>
          </div>
        </div>

        <!-- Partial Refund -->
        <div class="col-12 col-sm-4">
          <div class="refund-box">
            <q-icon name="pie_chart" size="30px" color="orange" />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              Partial Refund
            </div>

            <div class="text-grey-7 q-mt-xs">
              Late cancellations may qualify for a partial refund after
              applicable cancellation charges are deducted.
            </div>
          </div>
        </div>

        <!-- No Refund -->
        <div class="col-12 col-sm-4">
          <div class="refund-box">
            <q-icon name="money_off" size="30px" color="negative" />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              No Refund
            </div>

            <div class="text-grey-7 q-mt-xs">
              Certain cancellations, no-shows or non-refundable bookings may not
              qualify for a refund.
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <!-- =====================================================
         REFUND PROCESS
    ====================================================== -->
    <q-card flat bordered class="process-card q-mt-lg">
      <div class="text-h6 text-weight-bold q-mb-lg">
        How Your Refund Works
      </div>

      <div class="row q-col-gutter-md">
        <!-- Step 1 -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="process-step">
            <q-avatar color="primary" text-color="white" size="40px">
              1
            </q-avatar>

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Cancel Booking
            </div>

            <div class="text-grey-7 q-mt-xs">
              Cancel your eligible booking through BatohiDrive.
            </div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="process-step">
            <q-avatar color="primary" text-color="white" size="40px">
              2
            </q-avatar>

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Refund Review
            </div>

            <div class="text-grey-7 q-mt-xs">
              The booking and applicable cancellation terms are reviewed.
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="process-step">
            <q-avatar color="primary" text-color="white" size="40px">
              3
            </q-avatar>

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Refund Processed
            </div>

            <div class="text-grey-7 q-mt-xs">
              Eligible refunds are initiated through the applicable payment
              method.
            </div>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="process-step">
            <q-avatar color="primary" text-color="white" size="40px">
              4
            </q-avatar>

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Amount Credited
            </div>

            <div class="text-grey-7 q-mt-xs">
              The refunded amount is credited according to the payment
              provider's processing time.
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <!-- =====================================================
         RELATED POLICIES
    ====================================================== -->
    <div class="text-h6 text-weight-bold q-mt-xl q-mb-md">
      Related Policies
    </div>

    <div class="row q-col-gutter-md">
      <!-- Terms -->
      <div class="col-12 col-md-4">
        <q-card
          flat
          bordered
          class="related-card"
          clickable
          @click="goTo('/customer/terms-and-conditions')"
        >
          <q-card-section>
            <q-icon name="description" size="32px" color="primary" />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              Terms & Conditions
            </div>

            <div class="text-grey-7 q-mt-xs">
              Review the terms applicable to using BatohiDrive.
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
          @click="goTo('/customer/privacy-policy')"
        >
          <q-card-section>
            <q-icon name="privacy_tip" size="32px" color="primary" />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              Privacy Policy
            </div>

            <div class="text-grey-7 q-mt-xs">
              Learn how your personal information is collected and protected.
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Cancellation -->
      <div class="col-12 col-md-4">
        <q-card
          flat
          bordered
          class="related-card"
          clickable
          @click="goTo('/customer/cancellation-policy')"
        >
          <q-card-section>
            <q-icon name="event_busy" size="32px" color="primary" />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              Cancellation Policy
            </div>

            <div class="text-grey-7 q-mt-xs">
              Understand cancellation rules and applicable charges.
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- =====================================================
         SUPPORT
    ====================================================== -->
    <q-card flat bordered class="support-card q-mt-lg">
      <div class="row items-center justify-between">
        <div class="row items-center">
          <q-avatar
            color="blue-1"
            text-color="primary"
            icon="support_agent"
            size="48px"
          />

          <div class="q-ml-md">
            <div class="text-subtitle1 text-weight-bold">
              Need help with your refund?
            </div>

            <div class="text-grey-7 q-mt-xs">
              Contact BatohiDrive support if you have questions about a refund.
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
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// =====================================================
// SEARCH
// =====================================================

const search = ref('')

// =====================================================
// REFUND POLICY DATA
// =====================================================

const sections = ref([
  {
    id: 'introduction',
    title: '1. Introduction',
    icon: 'info',
    content: [
      'This Refund Policy explains when a customer may be eligible for a refund for a booking made through BatohiDrive.',
      'Refund eligibility depends on the applicable booking terms, cancellation timing, payment status, and the reason the booking is cancelled or cannot be completed.'
    ],
    points: []
  },
  {
    id: 'refund-eligibility',
    title: '2. Refund Eligibility',
    icon: 'check_circle',
    content: [
      'A customer may be eligible for a refund when a booking is cancelled within an eligible cancellation period or when BatohiDrive is unable to provide the confirmed service.',
      'The final refund amount is determined according to the booking terms, cancellation policy, and the circumstances of the booking.'
    ],
    points: [
      'Review the relevant booking terms before confirming payment.',
      'Some bookings may have different refund conditions.',
      'Applicable charges or deductions may reduce the final refund amount.'
    ]
  },
  {
    id: 'full-refund',
    title: '3. Full Refund',
    icon: 'verified',
    content: [
      'A full refund may be provided when a booking is cancelled within an eligible free-cancellation period or where BatohiDrive cancels the booking and the customer is entitled to a full refund.',
      'The refundable amount generally corresponds to the eligible amount actually paid by the customer.'
    ],
    points: [
      'The booking must qualify for a full refund.',
      'Non-refundable charges may be excluded where the booking terms allow it.',
      'Eligible refund amounts are normally returned to the original payment method.'
    ]
  },
  {
    id: 'partial-refund',
    title: '4. Partial Refund',
    icon: 'pie_chart',
    content: [
      'A partial refund may apply when a booking is cancelled after the free-cancellation window but before it becomes fully non-refundable.',
      'Applicable cancellation charges or fees may be deducted before calculating the final refund amount.'
    ],
    points: [
      'The refund percentage may vary depending on the booking terms.',
      'Late cancellation may reduce the refundable amount.',
      'The final refund amount will be communicated or displayed where applicable.'
    ]
  },
  {
    id: 'non-refundable',
    title: '5. Non-Refundable Bookings',
    icon: 'money_off',
    content: [
      'Some bookings or charges may be non-refundable. Customers should review the applicable booking terms before making a payment.',
      'If a booking is marked as non-refundable, cancellation may not lead to a refund unless a specific exception is approved under the policy.'
    ],
    points: [
      'No-show bookings may be non-refundable.',
      'Late cancellations may be non-refundable.',
      'Certain service-related fees may not qualify for a refund.'
    ]
  },
  {
    id: 'platform-cancellation',
    title: '6. Platform or Service Cancellation',
    icon: 'event_busy',
    content: [
      'If BatohiDrive is unable to provide the confirmed service because of a platform error, service unavailability, or a confirmed booking issue, the customer may be entitled to refund review based on the circumstances.',
      'The platform will notify the customer about the cancellation or issue and the applicable refund process when possible.'
    ],
    points: [
      'Eligible booking amounts may be reviewed for refund.',
      'Alternative arrangements may be offered when available.',
      'The applicable refund depends on the nature of the service failure.'
    ]
  },
  {
    id: 'failed-payment',
    title: '7. Failed or Duplicate Payments',
    icon: 'payment',
    content: [
      'If a payment fails but the amount is temporarily deducted, the payment provider may automatically reverse it.',
      'If a customer is charged more than once for the same booking, the duplicate charge may be reviewed for refund.'
    ],
    points: [
      'Keep the payment reference if available.',
      'Contact support if the duplicate or failed payment is not reversed within the expected period.',
      'Verification may be required before a duplicate payment is refunded.'
    ]
  },
  {
    id: 'refund-method',
    title: '8. Refund Method and Timing',
    icon: 'account_balance',
    content: [
      'Eligible refunds are generally processed using the original payment method used for the booking.',
      'The time required for the funds to appear in the customer account depends on the payment provider, bank, or other financial institution.'
    ],
    points: [
      'Refunds may be returned to the original card, wallet, or bank account.',
      'Payment provider rules may affect the process.',
      'Customers should make sure their payment account remains active.'
    ]
  },
  {
    id: 'processing-time',
    title: '9. Processing Time',
    icon: 'schedule',
    content: [
      'After an eligible refund is processed, the actual crediting time may vary depending on the payment gateway, bank, or financial institution.',
      'BatohiDrive cannot guarantee the exact processing time required by third-party payment providers.'
    ],
    points: [
      'Refunds may take several business days.',
      'Bank holidays and weekends may affect timing.',
      'Contact support if the refund exceeds the expected period.'
    ]
  },
  {
    id: 'charges',
    title: '10. Charges and Deductions',
    icon: 'receipt_long',
    content: [
      'The final refund amount may be reduced by cancellation charges, non-refundable fees, or other amounts allowed under the booking terms.',
      'Any deduction depends on the booking-specific terms and circumstances.'
    ],
    points: [
      'Cancellation fees may be deducted.',
      'Certain transaction or service charges may be non-refundable.',
      'The customer receives the eligible amount after applicable deductions.'
    ]
  },
  {
    id: 'disputes',
    title: '11. Refund Disputes and Review',
    icon: 'gavel',
    content: [
      'If a customer believes that a refund amount is incorrect or a refund has not been received, they may contact BatohiDrive support for review.',
      'The support team may request booking and payment information to investigate the issue.'
    ],
    points: [
      'Provide your booking ID.',
      'Provide the transaction reference if available.',
      'State the date of cancellation and the issue clearly.',
      'Include any refund confirmation message you received.'
    ]
  },
  {
    id: 'customer-responsibility',
    title: '12. Customer Responsibility',
    icon: 'person',
    content: [
      'Customers are responsible for checking booking terms before confirming a booking and for keeping their payment and account information accurate.',
      'Customers should also use the official BatohiDrive platform for cancellations and refund requests.'
    ],
    points: [
      'Review cancellation and refund terms before payment.',
      'Cancel through the official booking flow.',
      'Keep booking and payment confirmations.',
      'Report refund issues promptly.'
    ]
  },
  {
    id: 'policy-changes',
    title: '13. Changes to the Refund Policy',
    icon: 'update',
    content: [
      'BatohiDrive may update this Refund Policy from time to time to reflect changes in services, payment processes, business practices, or legal requirements.',
      'The latest version will be made available through the BatohiDrive platform.'
    ],
    points: [
      'Review the policy periodically.',
      'Policy updates may be published on the platform.',
      'Booking terms are determined according to the applicable policy at the time of booking.'
    ]
  },
  {
    id: 'contact-us',
    title: '14. Contact Us',
    icon: 'support_agent',
    content: [
      'If you have questions about refunds, cancellations, duplicate charges, or booking issues, contact BatohiDrive support through the official support channel.',
      'Keep your booking ID and payment information available so the support team can assist quickly.'
    ],
    points: [
      'Provide the booking ID.',
      'Explain the refund issue clearly.',
      'Share relevant payment or cancellation details.'
    ]
  }
])

// =====================================================
// FILTER SECTIONS
// =====================================================

const filteredSections = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  if (!keyword) {
    return sections.value
  }

  return sections.value.filter(section => {
    const titleMatch = section.title.toLowerCase().includes(keyword)

    const contentMatch = section.content.some(text =>
      text.toLowerCase().includes(keyword)
    )

    const pointsMatch = section.points.some(point =>
      point.toLowerCase().includes(keyword)
    )

    return titleMatch || contentMatch || pointsMatch
  })
})

// =====================================================
// SCROLL TO SECTION
// =====================================================

const scrollToSection = id => {
  const element = document.getElementById(id)

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
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
  router.push('/customer/support')
}
</script>

<style scoped>
/* =====================================================
   PAGE
===================================================== */

.refund-policy-page {
  background: #f7f8fa;
  min-height: 100vh;
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
   INTRO
===================================================== */

.intro-card {
  padding: 22px;
  border-radius: 14px;
  background: #ffffff;
}

.intro-text {
  line-height: 1.7;
  color: #555;
}

/* =====================================================
   NAVIGATION
===================================================== */

.navigation-card {
  border-radius: 14px;
  position: sticky;
  top: 20px;
  overflow: hidden;
}

.navigation-item {
  min-height: 44px;
}

.navigation-item:hover {
  background: #f5f9ff;
}

/* =====================================================
   POLICY
===================================================== */

.policy-section {
  scroll-margin-top: 25px;
  margin-bottom: 16px;
}

.policy-card {
  border-radius: 14px;
  background: #ffffff;
}

.section-header {
  padding-bottom: 14px;
  border-bottom: 1px solid #eeeeee;
}

.section-content {
  color: #555;
  line-height: 1.75;
}

.policy-paragraph {
  margin: 0 0 12px;
}

.policy-paragraph:last-child {
  margin-bottom: 0;
}

.policy-list {
  margin-top: 10px;
  padding-left: 22px;
}

.policy-list li {
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
}

/* =====================================================
   REFUND SUMMARY
===================================================== */

.summary-card {
  padding: 22px;
  border-radius: 14px;
  background: #ffffff;
}

.refund-box {
  height: 100%;
  padding: 18px;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  background: #fafafa;
}

/* =====================================================
   REFUND PROCESS
===================================================== */

.process-card {
  padding: 22px;
  border-radius: 14px;
  background: #ffffff;
}

.process-step {
  height: 100%;
  padding: 18px;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  background: #fafafa;
}

/* =====================================================
   RELATED POLICIES
===================================================== */

.related-card {
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #ffffff;
}

.related-card:hover {
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
   RESPONSIVE
===================================================== */

@media (max-width: 768px) {
  .refund-policy-page {
    padding: 12px !important;
  }

  .page-header .text-h5 {
    font-size: 20px;
  }

  .intro-card {
    padding: 16px;
  }

  .navigation-card {
    position: static;
  }

  .section-header {
    padding: 16px;
  }

  .section-content {
    padding: 0 16px 16px;
  }

  .support-card {
    padding: 16px;
  }

  .support-card .row {
    align-items: flex-start;
  }
}
</style>
