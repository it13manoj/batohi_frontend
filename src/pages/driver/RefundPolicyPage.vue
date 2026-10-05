<template>
  <q-page class="refund-page q-pa-md">
    <div class="page-header q-mb-lg">
      <div class="row items-center no-wrap">
        <div class="header-icon">
          <q-icon name="money_off" size="30px" color="primary" />
        </div>

        <div class="q-ml-md">
          <div class="text-h5 text-weight-bold">Refund Policy</div>
          <div class="text-grey-7 q-mt-xs">
            Understand how platform and subscription charges are handled for
            drivers.
          </div>
        </div>
      </div>

      <q-badge color="blue-1" text-color="primary" class="q-mt-md">
        Driver Refund Policy
      </q-badge>
    </div>

    <q-card flat bordered class="info-card q-mb-md">
      <q-card-section>
        <div class="row items-center">
          <q-icon name="update" color="primary" size="22px" class="q-mr-sm" />
          <div>
            <div class="text-weight-medium">Last Updated</div>
            <div class="text-grey-7 text-caption">September 21, 2026</div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="search-card q-mb-lg">
      <q-card-section>
        <q-input
          v-model="searchText"
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
      </q-card-section>
    </q-card>

    <div v-if="filteredSections.length">
      <q-card
        v-for="(section, index) in filteredSections"
        :key="index"
        flat
        bordered
        class="refund-card q-mb-md"
      >
        <q-card-section>
          <div class="row items-start no-wrap">
            <div class="section-number">{{ index + 1 }}</div>

            <div class="section-content">
              <div class="section-title">{{ section.title }}</div>

              <div
                v-for="(paragraph, pIndex) in section.content"
                :key="pIndex"
                class="section-text"
              >
                {{ paragraph }}
              </div>

              <ul v-if="section.points" class="refund-list">
                <li
                  v-for="(point, pointIndex) in section.points"
                  :key="pointIndex"
                >
                  {{ point }}
                </li>
              </ul>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <q-card v-else flat bordered class="empty-card">
      <q-card-section class="text-center q-pa-xl">
        <q-icon name="search_off" size="55px" color="grey-5" />
        <div class="text-h6 text-grey-8 q-mt-md">No results found</div>
        <div class="text-grey-6 q-mt-sm"
          >We could not find any refund policy section matching your
          search.</div
        >
        <q-btn
          flat
          color="primary"
          icon="clear"
          label="Clear Search"
          class="q-mt-md"
          @click="searchText = ''"
        />
      </q-card-section>
    </q-card>

    <q-card flat bordered class="summary-card q-mt-lg">
      <q-card-section>
        <div class="row items-center">
          <q-icon
            name="warning_amber"
            color="primary"
            size="26px"
            class="q-mr-sm"
          />
          <div class="text-h6 text-weight-bold">Important Notice</div>
        </div>

        <div class="summary-text q-mt-md">
          Most platform subscription fees are non-refundable once the driver
          account or service access has been activated. The company may review
          refund requests only in limited cases such as duplicate charges,
          incorrect billing, or a platform error that prevented access. Drivers
          should read the policy carefully before paying any fee.
        </div>
      </q-card-section>
    </q-card>

    <div class="text-subtitle1 text-weight-bold q-mt-xl q-mb-md"
      >Related Driver Information</div
    >

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4">
        <q-card
          flat
          bordered
          class="related-card"
          clickable
          @click="goTo('/driver/privacy-policy')"
        >
          <q-card-section>
            <q-icon name="privacy_tip" color="primary" size="30px" />
            <div class="text-subtitle1 text-weight-bold q-mt-md"
              >Privacy Policy</div
            >
            <div class="text-grey-7 text-caption q-mt-xs"
              >Understand how your information is handled.</div
            >
            <div class="text-primary text-caption q-mt-md"
              >View Policy <q-icon name="arrow_forward" size="16px"
            /></div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card
          flat
          bordered
          class="related-card"
          clickable
          @click="goTo('/driver/terms-and-conditions')"
        >
          <q-card-section>
            <q-icon name="description" color="primary" size="30px" />
            <div class="text-subtitle1 text-weight-bold q-mt-md"
              >Terms & Conditions</div
            >
            <div class="text-grey-7 text-caption q-mt-xs"
              >Review the legal responsibilities of driving on the
              platform.</div
            >
            <div class="text-primary text-caption q-mt-md"
              >View Terms <q-icon name="arrow_forward" size="16px"
            /></div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card
          flat
          bordered
          class="related-card"
          clickable
          @click="goTo('/driver/faq')"
        >
          <q-card-section>
            <q-icon name="help_outline" color="primary" size="30px" />
            <div class="text-subtitle1 text-weight-bold q-mt-md"
              >Driver FAQ</div
            >
            <div class="text-grey-7 text-caption q-mt-xs"
              >Find quick answers to common questions.</div
            >
            <div class="text-primary text-caption q-mt-md"
              >View FAQ <q-icon name="arrow_forward" size="16px"
            /></div>
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
const searchText = ref('')

const sections = [
  {
    title: 'Introduction',
    content: [
      'This Refund Policy explains how fees, subscriptions, and platform charges are handled for drivers using the BatohiDrive driver panel and platform services.',
      'By subscribing to or using the platform, the driver agrees to this refund policy and acknowledges that the company provides access to the platform but does not own the vehicle, trip, or operating business.'
    ]
  },
  {
    title: 'Subscription and Access Fees',
    content: [
      'Drivers may be required to pay subscription fees, onboarding charges, access fees, or other platform charges to use selected driver services on the platform.',
      'All such fees are due as specified in the account, plan, or payment details available to the driver.'
    ],
    points: [
      'Subscription access is granted only for the selected service period.',
      'The driver is responsible for ensuring payment details are valid and current.',
      'Pending or failed payment may restrict account access.',
      'Access to services may be suspended until the relevant payment is cleared.'
    ]
  },
  {
    title: 'General Refund Position',
    content: [
      'In general, fees paid for platform access or subscription services are non-refundable once the account or service has been activated or used.',
      'The platform is a digital service and the driver receives access to the software and operations environment for the selected period.'
    ],
    points: [
      'No refund for used service periods.',
      'No refund for a driver account that has already become active.',
      'No refund for loss of bookings, low demand, or business performance.',
      'No refund for services already consumed or access already granted.'
    ]
  },
  {
    title: 'Limited Cases for Refund Review',
    content: [
      'A refund may be considered only in limited circumstances where the payment was incorrect, duplicated, unauthorized, or the platform failed to provide access due to a technical issue under the company’s control.'
    ],
    points: [
      'Duplicate payments or repeated charges.',
      'Incorrect billing or wrong plan charge.',
      'Failed platform activation where the company did not provide the service.',
      'Technical failure preventing access before the service was used.'
    ]
  },
  {
    title: 'No Refund for Operational Reasons',
    content: [
      'The platform does not offer refunds for business, operational, or market-related reasons outside of the limited conditions stated in this policy.'
    ],
    points: [
      'No refund for low ride volume or low customer demand.',
      'No refund because the driver did not earn enough income.',
      'No refund because the driver changed plans or decided not to operate.',
      'No refund for account inactivity or inactive usage.'
    ]
  },
  {
    title: 'Cancellation Before Activation',
    content: [
      'If a driver cancels before the account is activated or before access is granted, the company may consider a refund depending on the service status and payment records.'
    ],
    points: [
      'Refund review is based on the actual activation status.',
      'Only unused, unactivated payments may qualify for review.',
      'Once the account is active, the fee is generally non-refundable.',
      'Any refund decision is made after review of the payment and account records.'
    ]
  },
  {
    title: 'Chargeback and Dispute Handling',
    content: [
      'If a driver raises a payment dispute without first contacting support, the company may temporarily suspend account access until the issue is resolved.',
      'The company may reject a chargeback request if the charge is valid and the service was provided as agreed.'
    ],
    points: [
      'Drivers must contact support before initiating a formal dispute.',
      'The company may request evidence of payment and account use.',
      'Unresolved disputes may lead to account restriction.',
      'Valid service charges remain payable even if a dispute is not approved.'
    ]
  },
  {
    title: 'Processing Time',
    content: [
      'Approved refunds, if any, are processed through the original payment method or as permitted by the payment provider. The timing depends on the payment processor and banking system.'
    ],
    points: [
      'The company will review the request within a reasonable period.',
      'Refund timing is not controlled by the company after the payment leaves the platform.',
      'Some banks may take additional time to reflect the refund.'
    ]
  },
  {
    title: 'No Refund After Violation or Suspension',
    content: [
      'If a driver account is suspended, restricted, or terminated due to policy violation, fraud, false information, or non-compliance, the company may withhold any refund request.'
    ],
    points: [
      'False or misleading information may lead to no refund.',
      'Violation of platform rules can result in account restriction.',
      'The company may cancel access without refund if the driver is in violation.',
      'Any unpaid balance remains payable regardless of account status.'
    ]
  },
  {
    title: 'Refund Requests',
    content: [
      'Drivers who believe they qualify for a refund must submit a request through the official support channel with details such as the payment reference, account email, date of payment, and reason for request.'
    ],
    points: [
      'Support may ask for payment screenshots or records.',
      'Only one valid request per issue will be reviewed.',
      'The company may reject incomplete or unsupported requests.',
      'Final decision rests with the company after review.'
    ]
  },
  {
    title: 'Legal Exceptions',
    content: [
      'If local law requires a different refund treatment, the legal requirement will apply instead of any part of this policy.'
    ]
  },
  {
    title: 'Policy Updates',
    content: [
      'The company may update this Refund Policy from time to time. Continued use of the platform after a change is posted means the driver accepts the updated policy.'
    ]
  },
  {
    title: 'Contact Support',
    content: [
      'If you need help with a refund request or payment issue, please contact the BatohiDrive support team through the driver support section. The company may ask for account details and payment records before reviewing a request.'
    ]
  }
]

const filteredSections = computed(() => {
  const search = searchText.value.trim().toLowerCase()

  if (!search) return sections

  return sections.filter(section => {
    const titleMatch = section.title.toLowerCase().includes(search)
    const contentMatch = section.content.some(item =>
      item.toLowerCase().includes(search)
    )
    const pointsMatch = section.points?.some(item =>
      item.toLowerCase().includes(search)
    )

    return titleMatch || contentMatch || pointsMatch
  })
})

const goTo = route => {
  router.push(route)
}
</script>

<style scoped>
.refund-page {
  min-height: 100%;
  background: #f7f8fa;
}

.page-header {
  background: transparent;
}

.header-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #eaf2ff;
}

.info-card,
.search-card,
.refund-card,
.summary-card,
.related-card,
.empty-card {
  background: #ffffff;
  border-radius: 14px;
}

.search-input {
  max-width: 600px;
}

.section-number {
  min-width: 34px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #eaf2ff;
  color: #1976d2;
  font-weight: 700;
  font-size: 14px;
}

.section-content {
  flex: 1;
  margin-left: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 10px;
}

.section-text {
  color: #5f6368;
  line-height: 1.7;
  margin-bottom: 8px;
}

.refund-list {
  margin: 12px 0 0;
  padding-left: 20px;
  color: #5f6368;
}

.refund-list li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.summary-text {
  color: #5f6368;
  line-height: 1.7;
}

.related-card {
  height: 100%;
  cursor: pointer;
  transition: 0.2s ease;
}

.related-card:hover {
  transform: translateY(-2px);
  border-color: #1976d2;
}

@media (max-width: 768px) {
  .refund-page {
    padding: 12px !important;
  }

  .section-content {
    margin-left: 12px;
  }
}
</style>
