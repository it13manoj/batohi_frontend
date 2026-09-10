<template>
  <q-page class="cancellation-policy-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header q-mb-lg">
      <div class="row items-center no-wrap">
        <div class="header-icon">
          <q-icon
            name="event_busy"
            size="30px"
            color="primary"
          />
        </div>

        <div class="q-ml-md">
          <div class="text-h5 text-weight-bold">
            Cancellation Policy
          </div>

          <div class="text-grey-7 q-mt-xs">
            Learn about booking cancellation rules, charges and refunds
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
        placeholder="Search cancellation policy..."
        class="search-input"
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card>

    <!-- =====================================================
         POLICY INTRODUCTION
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
          icon="event_busy"
          size="50px"
        />

        <div class="q-ml-md">
          <div class="text-h6 text-weight-bold">
            Cancellation Policy
          </div>

          <div class="text-grey-7 q-mt-xs">
            Last updated: 02 September 2026
          </div>

          <div class="intro-text q-mt-md">
            At BatohiDrive, we understand that plans can change.
            This cancellation policy explains when you can cancel a
            vehicle booking, applicable cancellation charges and how
            eligible refunds are processed.
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
              @click="scrollToSection(section.id)"
              class="navigation-item"
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
         CANCELLATION CHARGE SUMMARY
    ====================================================== -->
    <q-card
      flat
      bordered
      class="summary-card q-mt-lg"
    >
      <div class="text-h6 text-weight-bold q-mb-md">
        Cancellation Charge Summary
      </div>

      <div class="row q-col-gutter-md">

        <div class="col-12 col-sm-4">
          <div class="charge-box">
            <q-icon
              name="check_circle"
              size="30px"
              color="positive"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              Early Cancellation
            </div>

            <div class="text-grey-7 q-mt-xs">
              Cancel within the eligible free-cancellation period
              and no cancellation charge may apply.
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-4">
          <div class="charge-box">
            <q-icon
              name="schedule"
              size="30px"
              color="orange"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              Late Cancellation
            </div>

            <div class="text-grey-7 q-mt-xs">
              A cancellation charge may apply when a booking is
              cancelled close to the scheduled pickup time.
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-4">
          <div class="charge-box">
            <q-icon
              name="cancel"
              size="30px"
              color="negative"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              No-Show
            </div>

            <div class="text-grey-7 q-mt-xs">
              Failure to arrive for the booking may result in
              cancellation charges according to the booking terms.
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

      <!-- Refund -->
      <div class="col-12 col-md-4">
        <q-card
          flat
          bordered
          class="related-card"
          clickable
          @click="goTo('/customer/refund-policy')"
        >
          <q-card-section>
            <q-icon
              name="currency_rupee"
              size="32px"
              color="primary"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              Refund Policy
            </div>

            <div class="text-grey-7 q-mt-xs">
              Understand how eligible refunds are processed.
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
              Need help with a cancellation?
            </div>

            <div class="text-grey-7 q-mt-xs">
              Contact BatohiDrive support for assistance with your booking.
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
// CANCELLATION POLICY DATA
// =====================================================

const sections = ref([
  {
    id: 'introduction',
    title: '1. Introduction',
    icon: 'info',
    content: [
      'This Cancellation Policy explains the rules applicable when a customer cancels a vehicle booking made through BatohiDrive.',
      'Cancellation charges and refund eligibility may depend on the vehicle, booking type, cancellation time and specific booking terms.'
    ],
    points: []
  },

  {
    id: 'customer-cancellation',
    title: '2. Customer Cancellation',
    icon: 'person',
    content: [
      'Customers may request cancellation of an eligible booking through the BatohiDrive platform or by contacting customer support.',
      'The cancellation request will be considered based on the time at which the cancellation is successfully recorded by the system.'
    ],
    points: [
      'Always check the cancellation terms before confirming your booking.',
      'Cancellation charges may vary depending on the booking.',
      'A cancellation confirmation should be retained for your records.'
    ]
  },

  {
    id: 'free-cancellation',
    title: '3. Free Cancellation',
    icon: 'check_circle',
    content: [
      'Some bookings may allow free cancellation if the customer cancels within the free-cancellation period specified for that booking.',
      'If the booking is cancelled within the eligible period, the customer may receive a refund of the eligible booking amount according to the applicable refund policy.'
    ],
    points: [
      'Free cancellation is not guaranteed for every booking.',
      'The applicable cancellation period will depend on the booking terms.',
      'Payment gateway or transaction charges may be treated separately where applicable.'
    ]
  },

  {
    id: 'late-cancellation',
    title: '4. Late Cancellation',
    icon: 'schedule',
    content: [
      'A late cancellation occurs when a customer cancels a booking after the free-cancellation period has expired.',
      'Late cancellation may result in a cancellation charge or partial refund depending on the terms of the booking.'
    ],
    points: [
      'Cancellation charges may increase closer to the pickup time.',
      'The exact applicable amount will be determined according to the booking policy.',
      'Customers should cancel as early as possible to avoid additional charges.'
    ]
  },

  {
    id: 'same-day-cancellation',
    title: '5. Same-Day Cancellation',
    icon: 'today',
    content: [
      'Bookings cancelled on the scheduled pickup date may be subject to stricter cancellation rules.',
      'Depending on the booking terms, same-day cancellations may result in a partial refund or no refund.'
    ],
    points: [
      'Check your booking details before cancelling.',
      'Contact support if an emergency prevents you from using the booking.',
      'Any exception will be reviewed according to the applicable policy.'
    ]
  },

  {
    id: 'no-show',
    title: '6. No-Show Policy',
    icon: 'person_off',
    content: [
      'A no-show occurs when a customer does not arrive for the booking and does not cancel it through the approved cancellation process.',
      'No-show bookings may be treated as cancelled and may not qualify for a full refund.'
    ],
    points: [
      'Customers should cancel the booking if they are unable to use it.',
      'Failure to appear at the pickup location may result in charges.',
      'Any refund will depend on the applicable booking terms.'
    ]
  },

  {
    id: 'driver-delay',
    title: '7. Driver or Service Delay',
    icon: 'directions_car',
    content: [
      'If a booking is affected by an unexpected delay from the driver or service partner, customers should contact BatohiDrive support before cancelling whenever possible.',
      'BatohiDrive may review the situation and determine whether cancellation charges should apply.'
    ],
    points: [
      'Report significant delays to customer support.',
      'Do not cancel immediately if support is already handling the issue.',
      'Any refund or adjustment will depend on the circumstances.'
    ]
  },

  {
    id: 'batohidrive-cancellation',
    title: '8. Cancellation by BatohiDrive',
    icon: 'admin_panel_settings',
    content: [
      'BatohiDrive may cancel a booking when the vehicle, driver or service cannot be provided, or when cancellation is necessary for safety, operational or other legitimate reasons.',
      'When BatohiDrive cancels a confirmed booking, eligible customers may receive a refund according to the applicable refund policy.'
    ],
    points: [
      'Customers will be informed when cancellation is initiated by BatohiDrive whenever reasonably possible.',
      'Eligible refunds may be processed through the original payment method.',
      'Alternative arrangements may be offered where available.'
    ]
  },

  {
    id: 'emergency-cancellation',
    title: '9. Emergency Cancellation',
    icon: 'emergency',
    content: [
      'Customers facing genuine emergencies should contact BatohiDrive support as soon as possible.',
      'Emergency cancellation requests may be reviewed on a case-by-case basis. Approval of an exception is not guaranteed.'
    ],
    points: [
      'Provide accurate information about the emergency.',
      'Contact support as soon as the situation becomes known.',
      'Any approved exception will be subject to internal review.'
    ]
  },

  {
    id: 'cancellation-process',
    title: '10. Cancellation Process',
    icon: 'touch_app',
    content: [
      'Customers can cancel eligible bookings using the cancellation option available in their BatohiDrive account or by contacting customer support.',
      'After successful cancellation, the customer should receive a cancellation confirmation.'
    ],
    points: [
      'Open your booking from the booking section.',
      'Select the cancellation option.',
      'Review any applicable cancellation charge.',
      'Confirm the cancellation.',
      'Keep the cancellation confirmation for reference.'
    ]
  },

  {
    id: 'refund-after-cancellation',
    title: '11. Refund After Cancellation',
    icon: 'currency_rupee',
    content: [
      'If a cancelled booking is eligible for a refund, the refund will be processed according to the BatohiDrive Refund Policy.',
      'The time required for the refund to appear in the customer account may depend on the payment method and financial institution.'
    ],
    points: [
      'Refund eligibility depends on the cancellation terms.',
      'Refunds are generally returned through the original payment method.',
      'Bank or payment-provider processing times may vary.'
    ]
  },

  {
    id: 'non-refundable',
    title: '12. Non-Refundable Amounts',
    icon: 'money_off',
    content: [
      'Certain amounts may be non-refundable depending on the booking terms and applicable charges.',
      'Any non-refundable amount should be displayed or communicated during the applicable booking or cancellation process.'
    ],
    points: [
      'Cancellation charges may be deducted from the refundable amount.',
      'Third-party transaction charges may be treated separately.',
      'The final refund amount will depend on the applicable booking terms.'
    ]
  },

  {
    id: 'modification',
    title: '13. Booking Modification',
    icon: 'edit_calendar',
    content: [
      'A customer may request changes to an existing booking where modification is supported.',
      'Changes to pickup time, date, vehicle or other booking information may be subject to availability and additional charges.'
    ],
    points: [
      'Modification is not always available for every booking.',
      'A change may be treated as cancellation and a new booking where required.',
      'Any additional amount will be communicated before confirmation.'
    ]
  },

  {
    id: 'disputes',
    title: '14. Cancellation Disputes',
    icon: 'gavel',
    content: [
      'If a customer believes that an incorrect cancellation charge has been applied, they may contact BatohiDrive support for review.',
      'The customer should provide the booking details and relevant cancellation information so that the matter can be investigated.'
    ],
    points: [
      'Provide your booking ID.',
      'Mention the date and time of cancellation.',
      'Provide any relevant payment or cancellation confirmation.',
      'Allow reasonable time for the support team to investigate.'
    ]
  },

  {
    id: 'policy-changes',
    title: '15. Changes to Cancellation Policy',
    icon: 'update',
    content: [
      'BatohiDrive may update this Cancellation Policy from time to time to reflect operational, legal or service changes.',
      'The updated policy will apply according to the date and terms communicated by BatohiDrive.'
    ],
    points: [
      'Customers should review the policy before making a booking.',
      'Changes may be published on the BatohiDrive platform.',
      'Existing bookings may remain subject to the terms applicable at the time of booking, where required.'
    ]
  },

  {
    id: 'contact-us',
    title: '16. Contact Us',
    icon: 'support_agent',
    content: [
      'If you have questions about cancelling a booking, applicable charges or refund eligibility, please contact BatohiDrive customer support.',
      'Our support team can help review your booking and explain the applicable cancellation terms.'
    ],
    points: [
      'Keep your booking ID available.',
      'Provide accurate cancellation details.',
      'Contact support as early as possible when you need assistance.'
    ]
  }
])

// =====================================================
// FILTERED SECTIONS
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

.cancellation-policy-page {
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
   INTRO CARD
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
   POLICY SECTION
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
   SUMMARY
===================================================== */

.summary-card {
  padding: 22px;
  border-radius: 14px;
  background: #ffffff;
}

.charge-box {
  height: 100%;
  padding: 18px;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  background: #fafafa;
}

/* =====================================================
   RELATED POLICY
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
  .cancellation-policy-page {
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

  .policy-card {
    padding: 0;
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
