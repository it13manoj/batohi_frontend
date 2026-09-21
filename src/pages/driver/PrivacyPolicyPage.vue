<template>
  <q-page class="privacy-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header q-mb-lg">

      <div class="row items-center no-wrap">

        <div class="header-icon">
          <q-icon
            name="privacy_tip"
            size="30px"
            color="primary"
          />
        </div>

        <div class="q-ml-md">

          <div class="text-h5 text-weight-bold">
            Privacy Policy
          </div>

          <div class="text-grey-7 q-mt-xs">
            Learn how BatohiDrive collects, uses, and protects your information
          </div>

        </div>

      </div>

      <q-badge
        color="blue-1"
        text-color="primary"
        class="q-mt-md"
      >
        Driver Privacy
      </q-badge>

    </div>


    <!-- =====================================================
         LAST UPDATED
    ====================================================== -->
    <q-card
      flat
      bordered
      class="info-card q-mb-md"
    >

      <q-card-section>

        <div class="row items-center">

          <q-icon
            name="update"
            color="primary"
            size="22px"
            class="q-mr-sm"
          />

          <div>
            <div class="text-weight-medium">
              Last Updated
            </div>

            <div class="text-grey-7 text-caption">
              September 2, 2026
            </div>
          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         SEARCH
    ====================================================== -->
    <q-card
      flat
      bordered
      class="search-card q-mb-lg"
    >

      <q-card-section>

        <q-input
          v-model="searchText"
          outlined
          dense
          clearable
          placeholder="Search privacy policy..."
          class="search-input"
        >

          <template #prepend>
            <q-icon name="search" />
          </template>

        </q-input>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         PRIVACY SECTIONS
    ====================================================== -->
    <div v-if="filteredSections.length">

      <q-card
        v-for="(section, index) in filteredSections"
        :key="index"
        flat
        bordered
        class="privacy-card q-mb-md"
      >

        <q-card-section>

          <div class="row items-start no-wrap">

            <!-- Section Number -->
            <div class="section-number">
              {{ index + 1 }}
            </div>

            <!-- Content -->
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


              <!-- Bullet Points -->
              <ul
                v-if="section.points"
                class="privacy-list"
              >

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
    <q-card
      v-else
      flat
      bordered
      class="empty-card"
    >

      <q-card-section class="text-center q-pa-xl">

        <q-icon
          name="search_off"
          size="55px"
          color="grey-5"
        />

        <div class="text-h6 text-grey-8 q-mt-md">
          No results found
        </div>

        <div class="text-grey-6 q-mt-sm">
          We couldn't find anything matching your search.
        </div>

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


    <!-- =====================================================
         INFORMATION WE COLLECT
    ====================================================== -->
    <q-card
      v-if="!searchText"
      flat
      bordered
      class="data-card q-mt-lg"
    >

      <q-card-section>

        <div class="row items-center">

          <q-icon
            name="storage"
            color="primary"
            size="26px"
            class="q-mr-sm"
          />

          <div class="text-h6 text-weight-bold">
            Information We May Collect
          </div>

        </div>


        <div class="data-grid q-mt-md">

          <div
            v-for="item in dataTypes"
            :key="item.title"
            class="data-item"
          >

            <div class="data-icon">
              <q-icon
                :name="item.icon"
                color="primary"
                size="23px"
              />
            </div>

            <div class="q-ml-md">

              <div class="text-weight-medium">
                {{ item.title }}
              </div>

              <div class="text-caption text-grey-7 q-mt-xs">
                {{ item.description }}
              </div>

            </div>

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         DRIVER DATA SAFETY
    ====================================================== -->
    <q-card
      v-if="!searchText"
      flat
      class="security-card q-mt-lg"
    >

      <q-card-section>

        <div class="row items-start no-wrap">

          <q-icon
            name="shield"
            size="34px"
            color="primary"
          />

          <div class="q-ml-md">

            <div class="text-h6 text-weight-bold">
              Your Information Matters
            </div>

            <div class="text-grey-7 q-mt-sm">
              BatohiDrive takes reasonable steps to protect driver
              information and uses personal data only for legitimate
              business, service, safety, legal, and operational purposes.
            </div>

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         SUPPORT
    ====================================================== -->
    <q-card
      v-if="!searchText"
      flat
      class="support-card q-mt-lg"
    >

      <q-card-section>

        <div class="row items-center justify-between">

          <div class="row items-center">

            <q-icon
              name="support_agent"
              size="32px"
              color="primary"
            />

            <div class="q-ml-md">

              <div class="text-subtitle1 text-weight-bold">
                Privacy Questions?
              </div>

              <div class="text-grey-7">
                Contact BatohiDrive support if you have questions
                about your personal information.
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
    <div
      v-if="!searchText"
      class="text-subtitle1 text-weight-bold q-mt-xl q-mb-md"
    >
      Driver Information
    </div>


    <div
      v-if="!searchText"
      class="row q-col-gutter-md"
    >

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
              color="primary"
              size="30px"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Terms & Conditions
            </div>

            <div class="text-grey-7 text-caption q-mt-xs">
              Review the terms for using BatohiDrive as a driver.
            </div>

            <div class="text-primary text-caption q-mt-md">
              View Terms
              <q-icon
                name="arrow_forward"
                size="16px"
              />
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

            <q-icon
              name="help_outline"
              color="primary"
              size="30px"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Driver FAQ
            </div>

            <div class="text-grey-7 text-caption q-mt-xs">
              Find answers to common driver questions.
            </div>

            <div class="text-primary text-caption q-mt-md">
              View FAQ
              <q-icon
                name="arrow_forward"
                size="16px"
              />
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
              color="primary"
              size="30px"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              About BatohiDrive
            </div>

            <div class="text-grey-7 text-caption q-mt-xs">
              Learn more about BatohiDrive.
            </div>

            <div class="text-primary text-caption q-mt-md">
              About Us
              <q-icon
                name="arrow_forward"
                size="16px"
              />
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
// PRIVACY POLICY SECTIONS
// =====================================================

const sections = [
  {
    title: 'Introduction',
    content: [
      'BatohiDrive respects the privacy of drivers using its platform. This Privacy Policy explains how driver information may be collected, used, stored, and protected.',
      'By registering as a driver and using the BatohiDrive driver panel, you agree that your information may be processed according to this policy.'
    ]
  },
  {
    title: 'Information We Collect',
    content: [
      'Depending on the services used, BatohiDrive may collect information necessary to create, verify, and operate a driver account.'
    ],
    points: [
      'Full name, contact number, email address, profile information, and account details.',
      'Driving licence, identity verification, and background-check information when required.',
      'Vehicle registration, insurance, ownership or authorization details, and vehicle documents.',
      'Bank account and payout information required for driver payments.',
      'Trip, route, booking, pickup, and payment records generated through the platform.',
      'Device, location, app usage, and communication data needed for operational support and safety.'
    ]
  },
  {
    title: 'Vehicle and Ride Ownership Information',
    content: [
      'If a driver adds a vehicle or ride to the platform, the driver must provide complete and accurate information about the vehicle and its legal usage.'
    ],
    points: [
      'Vehicle owner name and legal authorization to use the vehicle on the platform.',
      'Registration number, model, color, and vehicle details.',
      'Insurance and compliance documents required for legal operation.',
      'Any ownership or authorization information that may affect the driver’s right to list the vehicle.',
      'Prompt update of any change in ownership, status, or legal authorization.'
    ]
  },
  {
    title: 'Purpose of Data Collection',
    content: [
      'BatohiDrive may use driver information for legitimate platform, service, safety, legal, and business purposes.'
    ],
    points: [
      'Create, manage, and verify the driver account.',
      'Enable booking assignment, trip coordination, and service delivery.',
      'Process subscriptions, commissions, deductions, and settlements.',
      'Verify driver and vehicle eligibility and legal compliance.',
      'Provide support, track issues, and resolve disputes.',
      'Protect against fraud, misuse, misconduct, and account security issues.',
      'Comply with legal, tax, regulatory, or enforcement requirements.'
    ]
  },
  {
    title: 'Location and Trip Information',
    content: [
      'The platform may collect location and trip data when required for navigation, trip management, pickup coordination, safety monitoring, and support services.'
    ],
    points: [
      'Pickup and drop locations for assigned trips.',
      'Driver location during active or assigned rides.',
      'Trip time, route, status, and completion information.',
      'Relevant data needed to monitor service quality or resolve incidents.'
    ]
  },
  {
    title: 'Sharing of Information',
    content: [
      'BatohiDrive may share information with third parties when necessary to operate the platform, complete bookings, provide support, protect users, or comply with applicable law.'
    ],
    points: [
      'Customer information only to the extent necessary to complete the relevant trip.',
      'Authorized service providers for hosting, analytics, payment, security, and support.',
      'Regulators, government authorities, or law enforcement when legally required.',
      'Insurance, legal, or compliance partners when required for claims, verification, or disputes.',
      'Other relevant parties as required for safety, security, or fraudulent activity investigation.'
    ]
  },
  {
    title: 'Driver Responsibility for Vehicle and Owner Details',
    content: [
      'The driver is solely responsible for providing correct information about the vehicle, ownership, and legal authorization to use the vehicle on the platform.'
    ],
    points: [
      'The driver must ensure that the vehicle is legally owned, registered, or lawfully authorized for use.',
      'The driver must confirm that all registration, insurance, and compliance documents are valid.',
      'The driver must provide accurate owner details and disclose any third-party ownership or authorization if applicable.',
      'Any change in ownership, registration status, or legal use must be updated immediately.',
      'Failure to provide accurate information may result in account restriction, suspension, or legal consequences.'
    ]
  },
  {
    title: 'Security Measures',
    content: [
      'BatohiDrive uses reasonable technical and organizational safeguards to protect driver information from unauthorized access, misuse, alteration, or disclosure.'
    ],
    points: [
      'Restricted access to personal data in line with role and operational need.',
      'Use of secure application and platform infrastructure where available.',
      'Monitoring for suspicious activity, unauthorized access, or misuse.',
      'Drivers must keep passwords, OTPs, and account credentials secure.'
    ]
  },
  {
    title: 'Data Retention',
    content: [
      'Driver information may be retained for as long as needed to provide services, manage accounts, satisfy legal obligations, resolve disputes, maintain security, or support business operations.'
    ]
  },
  {
    title: 'Customer Information Handling',
    content: [
      'Drivers may receive limited customer information necessary to complete bookings, but must use it only for the relevant trip or service.'
    ],
    points: [
      'Customer information must not be shared with unrelated third parties.',
      'Customer information must not be used for personal or commercial purposes outside the ride/service context.',
      'Any concern about misuse or privacy violation must be reported immediately to support.'
    ]
  },
  {
    title: 'Communication and Notifications',
    content: [
      'BatohiDrive may communicate with drivers through the app, email, SMS, notifications, and other available support channels.'
    ],
    points: [
      'Booking updates and trip notifications.',
      'Verification and document expiry reminders.',
      'Payment, payout, and subscription notices.',
      'Safety alerts and service-related announcements.',
      'Support messages and policy updates.'
    ]
  },
  {
    title: 'Your Rights and Requests',
    content: [
      'Drivers may request access to or correction of their personal data, subject to applicable laws and platform verification requirements.'
    ],
    points: [
      'Request data access or correction where applicable.',
      'Request information about how personal data is processed.',
      'Request support if data appears incomplete, inaccurate, or outdated.',
      'Raise concerns regarding data privacy or misuse through the support channel.'
    ]
  },
  {
    title: 'Third-Party Services',
    content: [
      'BatohiDrive may use third-party providers for hosting, payments, analytics, support, communication, and security-related services.'
    ],
    points: [
      'Third parties process data only as needed to provide the required service.',
      'The company remains responsible for the use of the platform and driver data.',
      'Drivers must review applicable platform and service terms when necessary.'
    ]
  },
  {
    title: 'Policy Updates',
    content: [
      'BatohiDrive may update this Privacy Policy from time to time to reflect changes in services, regulatory requirements, or business practices.',
      'Continued use of the driver platform after an update means the driver accepts the revised policy.'
    ]
  },
  {
    title: 'Contact and Support',
    content: [
      'If you have questions about this Privacy Policy or want to request support regarding your personal data, please contact the BatohiDrive support team through the driver panel or official support channel.'
    ]
  }
]

const dataTypes = [
  { icon: 'person', title: 'Profile Information', description: 'Name, mobile, email, account details, and profile information.' },
  { icon: 'directions_car', title: 'Vehicle Information', description: 'Vehicle number, model, color, registration, insurance, and ownership details.' },
  { icon: 'description', title: 'Documents', description: 'Driving licence, KYC, vehicle papers, and verification records.' },
  { icon: 'location_on', title: 'Location', description: 'Trip pickup, route, and active location data needed for service operation.' },
  { icon: 'route', title: 'Trip Information', description: 'Trip status, booking details, destination, history, and completion records.' },
  { icon: 'account_balance_wallet', title: 'Payments', description: 'Payout details, subscription records, and payment transactions.' }
]


// =====================================================
// FILTERED SECTIONS
// =====================================================

const filteredSections = computed(() => {

  const search = searchText.value
    .trim()
    .toLowerCase()

  if (!search) {
    return sections
  }

  return sections.filter(section => {

    const titleMatch =
      section.title.toLowerCase().includes(search)

    const contentMatch =
      section.content.some(item =>
        item.toLowerCase().includes(search)
      )

    const pointsMatch =
      section.points?.some(item =>
        item.toLowerCase().includes(search)
      )

    return titleMatch || contentMatch || pointsMatch

  })

})


// =====================================================
// NAVIGATION
// =====================================================

const goTo = (path) => {
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

.privacy-page {
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
.privacy-card,
.data-card,
.related-card,
.empty-card {
  background: #ffffff;
  border-radius: 14px;
}

.privacy-card {
  transition: 0.2s ease;
}

.privacy-card:hover {
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

.privacy-list {
  margin: 12px 0 0;
  padding-left: 20px;

  color: #5f6368;
}

.privacy-list li {
  margin-bottom: 8px;
  line-height: 1.6;
}


/* =====================================================
   DATA GRID
===================================================== */

.data-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.data-item {
  display: flex;
  align-items: flex-start;

  padding: 16px;

  border: 1px solid #edf0f4;
  border-radius: 12px;

  background: #fafbfc;
}

.data-icon {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 10px;
  background: #eaf2ff;
}


/* =====================================================
   SECURITY
===================================================== */

.security-card {
  background: #eaf2ff;
  border-radius: 14px;
}


/* =====================================================
   SUPPORT
===================================================== */

.support-card {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #dbe7f8;
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
   RESPONSIVE
===================================================== */

@media (max-width: 900px) {

  .data-grid {
    grid-template-columns: repeat(2, 1fr);
  }

}


@media (max-width: 600px) {

  .privacy-page {
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

  .data-grid {
    grid-template-columns: 1fr;
  }

  .support-card .row {
    align-items: flex-start;
    flex-direction: column;
  }

  .support-card .q-btn {
    width: 100%;
    margin-top: 16px;
  }

}

</style>
