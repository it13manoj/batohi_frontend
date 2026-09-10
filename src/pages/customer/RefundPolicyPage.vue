<template>
  <q-page class="refund-policy-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header q-mb-lg">
      <div class="row items-center no-wrap">
        <div class="header-icon">
          <q-icon
            name="currency_rupee"
            size="30px"
            color="primary"
          />
        </div>

        <div class="q-ml-md">
          <div class="text-h5 text-weight-bold">
            Refund Policy
          </div>

          <div class="text-grey-7 q-mt-xs">
            Learn how refunds are calculated, processed and credited
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
    <q-card
      flat
      bordered
      class="intro-card q-mb-lg"
    >
      <div class="row items-start no-wrap">

        <q-avatar
          color="primary"
          text-color="white"
          icon="currency_rupee"
          size="50px"
        />

        <div class="q-ml-md">
          <div class="text-h6 text-weight-bold">
            Refund Policy
          </div>

          <div class="text-grey-7 q-mt-xs">
            Last updated: 02 September 2026
          </div>

          <div class="intro-text q-mt-md">
            This Refund Policy explains when customers may be eligible
            for a refund after cancelling a vehicle booking or when a
            booking cannot be fulfilled by BatohiDrive.
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

        <q-card
          flat
          bordered
          class="navigation-card"
        >
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
                <q-icon
                  :name="section.icon"
                  color="primary"
                  size="20px"
                />
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
          <q-icon
            name="search_off"
            size="50px"
            color="grey-5"
          />

          <div class="text-h6 q-mt-md">
            No results found
          </div>

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

          <q-card
            flat
            bordered
            class="policy-card"
          >

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
                <li
                  v-for="(point, index) in section.points"
                  :key="index"
                >
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
    <q-card
      flat
      bordered
      class="summary-card q-mt-lg"
    >

      <div class="text-h6 text-weight-bold q-mb-md">
        Refund Summary
      </div>

      <div class="row q-col-gutter-md">

        <!-- Full Refund -->
        <div class="col-12 col-sm-4">
          <div class="refund-box">

            <q-icon
              name="check_circle"
              size="30px"
              color="positive"
            />

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

            <q-icon
              name="pie_chart"
              size="30px"
              color="orange"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              Partial Refund
            </div>

            <div class="text-grey-7 q-mt-xs">
              Late cancellations may qualify for a partial refund
              after applicable cancellation charges are deducted.
            </div>

          </div>
        </div>

        <!-- No Refund -->
        <div class="col-12 col-sm-4">
          <div class="refund-box">

            <q-icon
              name="money_off"
              size="30px"
              color="negative"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              No Refund
            </div>

            <div class="text-grey-7 q-mt-xs">
              Certain cancellations, no-shows or non-refundable
              bookings may not qualify for a refund.
            </div>

          </div>
        </div>

      </div>

    </q-card>

    <!-- =====================================================
         REFUND PROCESS
    ====================================================== -->
    <q-card
      flat
      bordered
      class="process-card q-mt-lg"
    >

      <div class="text-h6 text-weight-bold q-mb-lg">
        How Your Refund Works
      </div>

      <div class="row q-col-gutter-md">

        <!-- Step 1 -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="process-step">

            <q-avatar
              color="primary"
              text-color="white"
              size="40px"
            >
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

            <q-avatar
              color="primary"
              text-color="white"
              size="40px"
            >
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

            <q-avatar
              color="primary"
              text-color="white"
              size="40px"
            >
              3
            </q-avatar>

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Refund Processed
            </div>

            <div class="text-grey-7 q-mt-xs">
              Eligible refunds are initiated through the applicable payment method.
            </div>

          </div>
        </div>

        <!-- Step 4 -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="process-step">

            <q-avatar
              color="primary"
              text-color="white"
              size="40px"
            >
              4
            </q-avatar>

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Amount Credited
            </div>

            <div class="text-grey-7 q-mt-xs">
              The refunded amount is credited according to the payment provider's processing time.
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

            <q-icon
              name="description"
              size="32px"
              color="primary"
            />

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

            <q-icon
              name="privacy_tip"
              size="32px"
              color="primary"
            />

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

            <q-icon
              name="event_busy"
              size="32px"
              color="primary"
            />

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
      'This Refund Policy explains the circumstances under which customers may receive a refund for vehicle bookings made through BatohiDrive.',
      'Refund eligibility depends on the applicable booking terms, cancellation time, payment status and reason for cancellation.'
    ],
    points: []
  },

  {
    id: 'refund-eligibility',
    title: '2. Refund Eligibility',
    icon: 'check_circle',
    content: [
      'A customer may be eligible for a refund when a booking is cancelled within the applicable cancellation period or when BatohiDrive is unable to provide the confirmed service.',
      'The final refund amount is determined according to the cancellation and refund terms applicable to the booking.'
    ],
    points: [
      'Check the cancellation terms before cancelling your booking.',
      'Refund eligibility may differ between bookings.',
      'Applicable cancellation charges may be deducted from the refund amount.'
    ]
  },

  {
    id: 'full-refund',
    title: '3. Full Refund',
    icon: 'verified',
    content: [
      'A full refund may be provided when a booking is cancelled within an eligible free-cancellation period or when BatohiDrive cancels a booking under circumstances where the customer is entitled to a full refund.',
      'The refundable amount will generally correspond to the eligible amount actually paid by the customer.'
    ],
    points: [
      'The booking must qualify for a full refund.',
      'Applicable non-refundable charges may be excluded.',
      'The refund will normally be sent through the original payment method.'
    ]
  },

  {
    id: 'partial-refund',
    title: '4. Partial Refund',
    icon: 'pie_chart',
    content: [
      'A partial refund may apply when a customer cancels after the free-cancellation period but before the booking becomes non-refundable.',
      'Any applicable cancellation charge will generally be deducted before calculating the refundable amount.'
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
      'Some bookings or charges may be non-refundable. Customers should carefully review the applicable booking terms before making a payment.',
      'If a booking is marked as non-refundable, cancellation may not result in a refund unless an exception is approved.'
    ],
    points: [
      'No-show bookings may be non-refundable.',
      'Certain late cancellations may be non-refundable.',
      'Specific service charges may not qualify for a refund.'
    ]
  },

  {
    id: 'cancellation-refund',
    title: '6. Refund After Cancellation',
    icon: 'event_busy',
    content: [
      'When a customer successfully cancels an eligible booking, BatohiDrive will determine the refund amount based on the cancellation policy associated with that booking.',
      'The customer may receive a cancellation confirmation containing information about the refund, where applicable.'
    ],
    points: [
      'Cancellation must be successfully recorded.',
      'Refund amount depends on the applicable cancellation terms.',
      'Processing may begin after the cancellation has been verified.'
    ]
  },

  {
    id: 'batohidrive-cancellation',
    title: '7. Refund When BatohiDrive Cancels',
    icon: 'admin_panel_settings',
    content: [
      'If BatohiDrive cancels a confirmed booking because the vehicle, driver or service cannot be provided, an eligible refund may be issued according to the circumstances.',
      'Customers will be informed about the cancellation and refund process whenever reasonably possible.'
    ],
    points: [
      'Eligible booking amounts may be refunded.',
      'Alternative arrangements may be offered where available.',
      'The applicable refund amount depends on the circumstances of cancellation.'
    ]
  },

  {
    id: 'failed-payment',
    title: '8. Failed or Duplicate Payments',
    icon: 'payment',
    content: [
      'If a payment fails but the amount is temporarily deducted from the customer account, the amount may be automatically reversed by the payment provider.',
      'If a customer is charged more than once for the same booking, the duplicate transaction may be reviewed for refund.'
    ],
    points: [
      'Keep the payment transaction reference if available.',
      'Contact support if an amount is not reversed within the expected processing period.',
      'Duplicate payment claims may require transaction verification.'
    ]
  },

  {
    id: 'refund-method',
    title: '9. Refund to Original Payment Method',
    icon: 'account_balance',
    content: [
      'Eligible refunds are generally processed through the original payment method used for the booking.',
      'BatohiDrive may not always be able to change the destination account or payment method after a refund has been initiated.'
    ],
    points: [
      'Refunds may be credited to the original card, bank account or payment account.',
      'Payment-provider rules may affect the refund process.',
      'Customers should ensure their payment account remains active.'
    ]
  },

  {
    id: 'processing-time',
    title: '10. Refund Processing Time',
    icon: 'schedule',
    content: [
      'After an eligible refund has been initiated, the time required for the amount to appear in the customer account may vary depending on the payment gateway, bank or financial institution.',
      'BatohiDrive cannot guarantee the exact time required by a third-party payment provider.'
    ],
    points: [
      'Refund processing may take several business days.',
      'Bank holidays and weekends may affect processing time.',
      'Contact support if the refund exceeds the communicated processing period.'
    ]
  },

  {
    id: 'refund-charges',
    title: '11. Charges and Deductions',
    icon: 'receipt_long',
    content: [
      'The final refund amount may be reduced by applicable cancellation charges, non-refundable fees or other amounts permitted under the booking terms.',
      'Any applicable deduction will depend on the terms associated with the booking.'
    ],
    points: [
      'Cancellation charges may be deducted.',
      'Certain transaction or service charges may be non-refundable.',
      'The customer will receive the eligible amount after applicable deductions.'
    ]
  },

  {
    id: 'refund-disputes',
    title: '12. Refund Disputes',
    icon: 'gavel',
    content: [
      'If a customer believes that an incorrect refund amount has been issued or a refund has not been received, they may contact BatohiDrive support for review.',
      'The support team may request booking and payment information to investigate the issue.'
    ],
    points: [
      'Provide your booking ID.',
      'Provide the payment transaction reference if available.',
      'Mention the date of cancellation.',
      'Provide any refund confirmation received.'
    ]
  },

  {
    id: 'emergency-refund',
    title: '13. Emergency or Exceptional Refunds',
    icon: 'emergency',
    content: [
      'In exceptional circumstances, BatohiDrive may review a refund request outside the standard refund terms.',
      'Such requests are considered on a case-by-case basis and approval is not guaranteed.'
    ],
    points: [
      'Contact support as soon as possible.',
      'Explain the circumstances clearly.',
      'Provide supporting information where reasonably required.'
    ]
  },

  {
    id: 'customer-responsibility',
    title: '14. Customer Responsibility',
    icon: 'person',
    content: [
      'Customers are responsible for reviewing booking, cancellation and refund terms before confirming a booking.',
      'Customers should also ensure that their payment and account information is accurate.'
    ],
    points: [
      'Review refund conditions before payment.',
      'Cancel bookings through the official BatohiDrive platform.',
      'Keep booking and payment confirmations.',
      'Contact support promptly if an issue occurs.'
    ]
  },

  {
    id: 'policy-changes',
    title: '15. Changes to Refund Policy',
    icon: 'update',
    content: [
      'BatohiDrive may update this Refund Policy from time to time to reflect changes in services, payment processes, operational requirements or applicable regulations.',
      'The latest version of the policy will be made available through the BatohiDrive platform.'
    ],
    points: [
      'Customers should review the policy before making a booking.',
      'Policy updates may be published on the platform.',
      'The terms applicable to an existing booking may depend on the date and terms of that booking.'
    ]
  },

  {
    id: 'contact-us',
    title: '16. Contact Us',
    icon: 'support_agent',
    content: [
      'If you have questions about your refund, cancellation charges or refund processing status, please contact BatohiDrive customer support.',
      'Keep your booking ID and payment information available so that the support team can assist you efficiently.'
    ],
    points: [
      'Provide your booking ID.',
      'Explain your refund concern clearly.',
      'Share the relevant payment or cancellation details.',
      'Allow reasonable time for the support team to investigate.'
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
    const titleMatch =
      section.title.toLowerCase().includes(keyword)

    const contentMatch =
      section.content.some(text =>
        text.toLowerCase().includes(keyword)
      )

    const pointsMatch =
      section.points.some(point =>
        point.toLowerCase().includes(keyword)
      )

    return titleMatch || contentMatch || pointsMatch
  })
})

// =====================================================
// SCROLL TO SECTION
// =====================================================

const scrollToSection = (id) => {
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

const goTo = (route) => {
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
