<template>
  <q-page class="terms-page q-pa-md">
    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header q-mb-lg">
      <div class="row items-center no-wrap">
        <div class="header-icon">
          <q-icon name="description" size="30px" color="primary" />
        </div>

        <div class="q-ml-md">
          <div class="text-h5 text-weight-bold"> Terms & Conditions </div>

          <div class="text-grey-7 q-mt-xs">
            Please read the terms and conditions for driving with BatohiDrive
          </div>
        </div>
      </div>

      <q-badge color="blue-1" text-color="primary" class="q-mt-md">
        Driver Terms
      </q-badge>
    </div>

    <!-- =====================================================
         LAST UPDATED
    ====================================================== -->
    <q-card flat bordered class="info-card q-mb-md">
      <q-card-section>
        <div class="row items-center">
          <q-icon name="update" color="primary" size="22px" class="q-mr-sm" />

          <div>
            <div class="text-weight-medium"> Last Updated </div>

            <div class="text-grey-7 text-caption"> September 2, 2026 </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- =====================================================
         SEARCH
    ====================================================== -->
    <q-card flat bordered class="search-card q-mb-lg">
      <q-card-section>
        <q-input
          v-model="searchText"
          outlined
          dense
          clearable
          placeholder="Search terms and conditions..."
          class="search-input"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
    </q-card>

    <!-- =====================================================
         TERMS CONTENT
    ====================================================== -->
    <div v-if="filteredSections.length">
      <q-card
        v-for="(section, index) in filteredSections"
        :key="index"
        flat
        bordered
        class="terms-card q-mb-md"
      >
        <q-card-section>
          <div class="row items-start no-wrap">
            <div class="section-number">
              {{ index + 1 }}
            </div>

            <div class="section-content">
              <div class="section-title">
                {{ section.title }}
              </div>

              <div
                v-for="(paragraph, pIndex) in section.content"
                :key="pIndex"
                class="section-text"
              >
                {{ paragraph }}
              </div>

              <!-- Bullet points -->
              <ul v-if="section.points" class="terms-list">
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

    <!-- =====================================================
         NO SEARCH RESULT
    ====================================================== -->
    <q-card v-else flat bordered class="empty-card">
      <q-card-section class="text-center q-pa-xl">
        <q-icon name="search_off" size="55px" color="grey-5" />

        <div class="text-h6 text-grey-8 q-mt-md"> No results found </div>

        <div class="text-grey-6 q-mt-sm">
          We couldn't find any terms matching your search.
        </div>

        <q-btn
          flat
          color="primary"
          label="Clear Search"
          icon="clear"
          class="q-mt-md"
          @click="searchText = ''"
        />
      </q-card-section>
    </q-card>

    <!-- =====================================================
         DRIVER RESPONSIBILITIES
    ====================================================== -->
    <q-card flat bordered class="responsibility-card q-mt-lg">
      <q-card-section>
        <div class="row items-center">
          <q-icon
            name="verified_user"
            color="primary"
            size="25px"
            class="q-mr-sm"
          />

          <div class="text-h6 text-weight-bold"> Driver Responsibilities </div>
        </div>

        <div class="responsibility-grid q-mt-md">
          <div
            v-for="item in responsibilities"
            :key="item.title"
            class="responsibility-item"
          >
            <q-icon :name="item.icon" color="primary" size="22px" />

            <div class="q-ml-sm">
              <div class="text-weight-medium">
                {{ item.title }}
              </div>

              <div class="text-caption text-grey-7">
                {{ item.description }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- =====================================================
         SUPPORT SECTION
    ====================================================== -->
    <q-card flat class="support-card q-mt-lg">
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="row items-center">
            <q-icon name="support_agent" size="32px" color="primary" />

            <div class="q-ml-md">
              <div class="text-subtitle1 text-weight-bold"> Need Help? </div>

              <div class="text-grey-7">
                Contact BatohiDrive support if you have questions about these
                terms.
              </div>
            </div>
          </div>

          <q-btn
            unelevated
            color="primary"
            icon="support_agent"
            label="Contact Support"
            @click="contactSupport"
          />
        </div>
      </q-card-section>
    </q-card>

    <!-- =====================================================
         RELATED INFORMATION
    ====================================================== -->
    <div class="text-subtitle1 text-weight-bold q-mt-xl q-mb-md">
      Driver Information
    </div>

    <div class="row q-col-gutter-md">
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
            <q-icon name="privacy_tip" color="primary" size="30px" />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Privacy Policy
            </div>

            <div class="text-grey-7 text-caption q-mt-xs">
              Learn how your driver information is handled.
            </div>

            <div class="text-primary text-caption q-mt-md">
              View Privacy Policy
              <q-icon name="arrow_forward" size="16px" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- FAQ -->
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

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Driver FAQ
            </div>

            <div class="text-grey-7 text-caption q-mt-xs">
              Find answers to common driver questions.
            </div>

            <div class="text-primary text-caption q-mt-md">
              View FAQ
              <q-icon name="arrow_forward" size="16px" />
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
            <q-icon name="info" color="primary" size="30px" />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              About BatohiDrive
            </div>

            <div class="text-grey-7 text-caption q-mt-xs">
              Learn more about BatohiDrive and our services.
            </div>

            <div class="text-primary text-caption q-mt-md">
              About Us
              <q-icon name="arrow_forward" size="16px" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// =====================================================
// ROUTER
// =====================================================

const router = useRouter()

// =====================================================
// SEARCH
// =====================================================

const searchText = ref('')

// =====================================================
// TERMS & CONDITIONS
// =====================================================

const sections = [
  {
    title: 'Acceptance of Terms',
    content: [
      'By registering as a driver with BatohiDrive and using the driver panel, you agree to follow these Terms & Conditions.',
      'If you do not agree with any part of these terms, you should not use the BatohiDrive driver services.'
    ]
  },
  {
    title: 'Driver Eligibility',
    content: [
      'Drivers must meet all eligibility requirements established by BatohiDrive and applicable laws.'
    ],
    points: [
      'Provide accurate personal and vehicle information.',
      'Maintain a valid driving licence and required permits.',
      'Meet the minimum age and legal eligibility requirements.',
      'Provide valid vehicle registration, insurance, and compliance documents.',
      'Complete any required driver verification process.'
    ]
  },
  {
    title: 'Driver Account Responsibility',
    content: [
      'Your driver account is personal and must be kept secure. You are responsible for all activity performed through your account.'
    ],
    points: [
      'Do not share your account with another person.',
      'Keep your mobile number and profile information accurate and updated.',
      'Report unauthorized access immediately to BatohiDrive support.',
      'Provide truthful and complete information at all times.'
    ]
  },
  {
    title: 'Vehicle Ownership and Authorization',
    content: [
      'If a driver adds a vehicle or ride to the platform, the driver must provide, and ensure accuracy of, all legal and ownership-related information.'
    ],
    points: [
      'The driver must be the lawful owner or have valid authorization to use the vehicle on the platform.',
      'The driver must disclose all required owner details when relevant.',
      'Vehicle documents must be valid, updated, and available when requested.',
      'Any change in ownership, registration, or legal use must be updated immediately.',
      'False or incomplete ownership information may lead to suspension or termination.'
    ]
  },
  {
    title: 'Vehicle Requirements',
    content: [
      'Drivers are responsible for ensuring the vehicle used on the platform is safe, roadworthy, clean, and legally permitted for operation.'
    ],
    points: [
      'Keep the vehicle in safe operating condition.',
      'Maintain valid registration and insurance.',
      'Complete required inspections or documentation updates.',
      'Keep required vehicle documents available during operation.',
      'Report vehicle defects or breakdowns without delay.'
    ]
  },
  {
    title: 'Trip and Booking Responsibilities',
    content: [
      'Drivers are expected to handle assigned bookings responsibly and complete trips according to the information provided through the BatohiDrive platform.'
    ],
    points: [
      'Review booking details before accepting or starting a trip.',
      'Reach the pickup point as reasonably possible within the scheduled time.',
      'Confirm correct customer and trip information before starting a ride.',
      'Use the designated trip workflow and update trip status correctly.',
      'Complete the trip in accordance with platform and safety requirements.'
    ]
  },
  {
    title: 'Driver Conduct',
    content: [
      'Drivers must maintain professional and respectful conduct while using the platform and while providing transport services.'
    ],
    points: [
      'Do not use abusive, threatening, discriminatory, or offensive language.',
      'Do not misuse customer information or personal data.',
      'Do not manipulate trip details or platform records.',
      'Do not allow unauthorized persons to operate the driver account.',
      'Promptly report incidents, complaints, or suspicious activity to support.'
    ]
  },
  {
    title: 'Safety and Road Compliance',
    content: [
      'Safety is a fundamental responsibility of every driver using the platform.'
    ],
    points: [
      'Follow all applicable traffic and road laws.',
      'Drive responsibly and safely at all times.',
      'Do not drive under the influence of alcohol or drugs.',
      'Do not use mobile devices in a way that violates safety laws.',
      'Use required safety equipment and procedures.',
      'Prioritize the safety of passengers, road users, and yourself.'
    ]
  },
  {
    title: 'Driver and Vehicle Documents',
    content: [
      'All required driver and vehicle documents must remain valid during the period in which the driver provides services through BatohiDrive.'
    ],
    points: [
      'Driving licence.',
      'Vehicle registration documents.',
      'Insurance records.',
      'Any permits or certificates required by law or platform policy.',
      'Any other documents requested by BatohiDrive for compliance or verification.'
    ]
  },
  {
    title: 'Earnings and Payments',
    content: [
      'Driver earnings are calculated according to the applicable BatohiDrive pricing, commission, and payment structure.'
    ],
    points: [
      'Review earnings through the driver panel.',
      'Keep payment information accurate and up to date.',
      'Payments may be subject to deductions, fees, or platform charges as applicable.',
      'Payment timing depends on the settlement process of the platform.'
    ]
  },
  {
    title: 'Cancellation and Service Issues',
    content: [
      'Drivers should accept and complete bookings responsibly. Unnecessary or repeated cancellations may affect performance, account standing, or service access.'
    ],
    points: [
      'Avoid cancelling trips without a valid reason.',
      'Report emergencies or obstacles to support as soon as reasonably possible.',
      'Do not encourage customers to cancel in unauthorized ways.',
      'Follow the official cancellation process if a trip cannot continue.'
    ]
  },
  {
    title: 'Incident and Emergency Handling',
    content: [
      'If a breakdown, accident, medical emergency, or other serious event occurs during a trip, the driver must prioritize safety and contact appropriate services when necessary.'
    ],
    points: [
      'Move to a safe location when possible.',
      'Seek emergency assistance when required.',
      'Inform BatohiDrive support as soon as it is safe to do so.',
      'Provide correct and honest information about the event.'
    ]
  },
  {
    title: 'Prohibited Activities',
    content: [
      'Drivers must not use the BatohiDrive platform for illegal, fraudulent, or unauthorized activities.'
    ],
    points: [
      'Fraudulent bookings or trip manipulation.',
      'Submitting false, misleading, or forged documents.',
      'Unauthorized use of another driver account.',
      'Misuse or disclosure of customer information.',
      'Any activity that violates local, state, or national laws.'
    ]
  },
  {
    title: 'Account Suspension or Termination',
    content: [
      'BatohiDrive may restrict, suspend, or terminate a driver account where there is a violation of these terms, safety requirements, platform policy, or applicable law.'
    ],
    points: [
      'Serious safety violations or repeated misconduct.',
      'Fraud or false documentation.',
      'Invalid or expired required documents.',
      'Repeated breach of booking and customer-related rules.',
      'Failure to cooperate with support or compliance requests.'
    ]
  },
  {
    title: 'Privacy and Customer Information',
    content: [
      'Drivers may receive customer information that is necessary to complete a booking, but such information must only be used for legitimate BatohiDrive service needs.'
    ],
    points: [
      'Do not share customer information with third parties.',
      'Do not use customer information for personal purposes.',
      'Do not contact customers outside the approved service context.',
      'Follow the BatohiDrive Privacy Policy at all times.'
    ]
  },
  {
    title: 'Support and Complaint Handling',
    content: [
      'Drivers may contact BatohiDrive support for help with bookings, customer issues, vehicle concerns, payments, digital issues, or documentation questions.'
    ],
    points: [
      'Report serious incidents promptly.',
      'Give clear information when raising a complaint.',
      'Cooperate with reasonable investigations.',
      'Follow support instructions regarding active trips or account issues.'
    ]
  },
  {
    title: 'Changes to These Terms',
    content: [
      'BatohiDrive may update these Terms & Conditions from time to time to reflect changes in services, platform policy, technical systems, or legal requirements.',
      'Updated terms will be made available through the driver panel or the official platform notice.'
    ]
  },
  {
    title: 'Governing Law',
    content: [
      'These Terms & Conditions are governed by the laws of the applicable jurisdiction where BatohiDrive operates, and any dispute must be handled under the applicable legal framework.'
    ]
  },
  {
    title: 'Contact BatohiDrive',
    content: [
      'If you have questions regarding these Terms & Conditions, contact BatohiDrive support through the driver menu or the official support channel provided by the platform.'
    ]
  }
]

const responsibilities = [
  {
    icon: 'verified_user',
    title: 'Valid Documents',
    description: 'Keep your driver and vehicle documents valid and current.'
  },
  {
    icon: 'directions_car',
    title: 'Safe Vehicle',
    description: 'Maintain a roadworthy and clean vehicle.'
  },
  {
    icon: 'traffic',
    title: 'Safe Driving',
    description: 'Follow traffic laws and drive responsibly.'
  },
  {
    icon: 'person',
    title: 'Professional Behaviour',
    description: 'Treat customers respectfully and professionally.'
  },
  {
    icon: 'event_available',
    title: 'Trip Commitment',
    description: 'Complete bookings responsibly and follow trip process.'
  },
  {
    icon: 'support_agent',
    title: 'Report Issues',
    description:
      'Contact support whenever a serious problem or incident occurs.'
  }
]

// =====================================================
// FILTERED SECTIONS
// =====================================================

const filteredSections = computed(() => {
  const search = searchText.value.trim().toLowerCase()

  if (!search) {
    return sections
  }

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

// =====================================================
// NAVIGATION
// =====================================================

const goTo = path => {
  router.push(path)
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

.terms-page {
  min-height: 100%;
  background: #f7f8fa;
}

/* =====================================================
   HEADER
===================================================== */

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

/* =====================================================
   CARDS
===================================================== */

.info-card,
.search-card,
.terms-card,
.responsibility-card,
.related-card {
  background: #ffffff;
  border-radius: 14px;
}

.terms-card {
  transition: 0.2s ease;
}

.terms-card:hover {
  transform: translateY(-1px);
}

/* =====================================================
   SEARCH
===================================================== */

.search-input {
  max-width: 600px;
}

/* =====================================================
   SECTION
===================================================== */

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

/* =====================================================
   LIST
===================================================== */

.terms-list {
  margin: 12px 0 0;
  padding-left: 20px;
  color: #5f6368;
}

.terms-list li {
  margin-bottom: 8px;
  line-height: 1.6;
}

/* =====================================================
   RESPONSIBILITIES
===================================================== */

.responsibility-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.responsibility-item {
  display: flex;
  align-items: flex-start;

  padding: 16px;

  border: 1px solid #edf0f4;
  border-radius: 12px;

  background: #fafbfc;
}

/* =====================================================
   RELATED CARDS
===================================================== */

.related-card {
  height: 100%;
  cursor: pointer;
  transition: 0.2s ease;
}

.related-card:hover {
  transform: translateY(-2px);
  border-color: #1976d2;
}

/* =====================================================
   SUPPORT
===================================================== */

.support-card {
  background: #eaf2ff;
  border-radius: 14px;
}

/* =====================================================
   EMPTY
===================================================== */

.empty-card {
  background: #ffffff;
  border-radius: 14px;
}

/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 900px) {
  .responsibility-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .terms-page {
    padding: 12px !important;
  }

  .page-header .text-h5 {
    font-size: 20px;
  }

  .section-content {
    margin-left: 12px;
  }

  .section-title {
    font-size: 16px;
  }

  .responsibility-grid {
    grid-template-columns: 1fr;
  }

  .support-card .row {
    align-items: flex-start;
    flex-direction: column;
  }

  .support-card .q-btn {
    margin-top: 16px;
    width: 100%;
  }
}
</style>
