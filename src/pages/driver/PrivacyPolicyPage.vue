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
      'BatohiDrive respects the privacy of drivers using its platform. This Privacy Policy explains how information relating to drivers may be collected, used, stored, and protected.',
      'By using the BatohiDrive driver platform, you acknowledge that your information may be processed as described in this policy.'
    ]
  },

  {
    title: 'Information We Collect',
    content: [
      'Depending on the services you use, BatohiDrive may collect information necessary to create and operate your driver account.'
    ],
    points: [
      'Name and contact information.',
      'Profile information and account details.',
      'Driving licence and verification information.',
      'Vehicle registration and insurance information.',
      'Vehicle details such as model, number, and other relevant information.',
      'Bank or payment information required for driver payments.',
      'Documents submitted for verification.'
    ]
  },

  {
    title: 'Trip and Booking Information',
    content: [
      'When you accept or complete bookings through BatohiDrive, information relating to the trip may be recorded for service delivery, operational, safety, and support purposes.'
    ],
    points: [
      'Booking details.',
      'Pickup and destination information.',
      'Trip status and timestamps.',
      'Customer-related information necessary to complete the booking.',
      'Trip completion information.',
      'Cancellation information.'
    ]
  },

  {
    title: 'Location Information',
    content: [
      'Location information may be collected while you are using driver services where it is necessary for trip management, customer pickup, safety, navigation, service monitoring, or other legitimate platform purposes.'
    ],
    points: [
      'Help identify your location during an active trip.',
      'Assist with customer pickup.',
      'Support trip management.',
      'Improve operational and safety processes.',
      'Investigate service-related incidents when necessary.'
    ]
  },

  {
    title: 'Vehicle Information',
    content: [
      'Information about your registered vehicle may be collected and stored to verify that the vehicle meets applicable requirements and to support trip operations.'
    ],
    points: [
      'Vehicle number.',
      'Vehicle type and model.',
      'Vehicle colour.',
      'Registration information.',
      'Insurance information.',
      'Vehicle documents and verification records.'
    ]
  },

  {
    title: 'How We Use Your Information',
    content: [
      'BatohiDrive may use driver information for legitimate operational, service, safety, legal, and business purposes.'
    ],
    points: [
      'Create and manage your driver account.',
      'Verify your identity and documents.',
      'Assign and manage bookings.',
      'Facilitate communication between drivers and customers.',
      'Calculate and process driver earnings.',
      'Provide customer and driver support.',
      'Maintain platform security.',
      'Detect and prevent fraud or misuse.',
      'Improve platform performance and services.',
      'Comply with applicable legal requirements.'
    ]
  },

  {
    title: 'Customer Information Available to Drivers',
    content: [
      'Drivers may receive limited customer information that is necessary to complete an assigned booking.'
    ],
    points: [
      'Use customer information only for the relevant booking.',
      'Do not save or share customer information for personal purposes.',
      'Do not misuse customer contact details.',
      'Do not disclose customer information to unauthorized persons.'
    ]
  },

  {
    title: 'Communication',
    content: [
      'BatohiDrive may communicate with drivers through the application, phone, SMS, email, notifications, or other available communication channels.'
    ],
    points: [
      'Booking and trip notifications.',
      'Account-related messages.',
      'Document expiry reminders.',
      'Payment and earnings information.',
      'Safety and service notifications.',
      'Support communications.',
      'Important policy updates.'
    ]
  },

  {
    title: 'Earnings and Payment Information',
    content: [
      'Information related to driver earnings and payments may be processed to calculate, record, and facilitate payments for completed services.'
    ],
    points: [
      'Trip earnings.',
      'Applicable platform charges or deductions.',
      'Payment status.',
      'Payment account information.',
      'Transaction records.'
    ]
  },

  {
    title: 'Document and Verification Information',
    content: [
      'Driver and vehicle documents may be collected to verify eligibility and compliance with platform requirements.'
    ],
    points: [
      'Driving licence.',
      'Vehicle registration documents.',
      'Insurance documents.',
      'Required permits or certificates.',
      'Other verification documents requested by BatohiDrive.'
    ]
  },

  {
    title: 'Data Security',
    content: [
      'BatohiDrive takes reasonable measures to protect driver information from unauthorized access, misuse, alteration, disclosure, or loss.'
    ],
    points: [
      'Access to information may be restricted to authorized personnel.',
      'Account security measures may be used to protect driver accounts.',
      'Information may be monitored for security and fraud prevention.',
      'Drivers should keep their passwords and login credentials confidential.'
    ]
  },

  {
    title: 'Sharing of Information',
    content: [
      'BatohiDrive may share information where necessary to operate the platform, provide services, protect users, or comply with applicable requirements.'
    ],
    points: [
      'With customers when information is necessary to complete a booking.',
      'With authorized service providers supporting platform operations.',
      'With payment or financial service providers where required.',
      'With authorities when legally required.',
      'With relevant parties when necessary to investigate safety, fraud, or security incidents.'
    ]
  },

  {
    title: 'Fraud and Security Monitoring',
    content: [
      'BatohiDrive may monitor platform activity to identify suspicious behaviour, fraudulent activity, account misuse, or security threats.'
    ],
    points: [
      'Unusual booking activity.',
      'Suspicious account activity.',
      'Document irregularities.',
      'Payment-related fraud.',
      'Unauthorized account access.',
      'Repeated policy violations.'
    ]
  },

  {
    title: 'Data Retention',
    content: [
      'Driver information may be retained for as long as reasonably necessary for service delivery, account management, legal compliance, dispute resolution, security, accounting, and legitimate business purposes.'
    ]
  },

  {
    title: 'Your Responsibilities',
    content: [
      'Drivers are responsible for protecting their own account information and using customer information appropriately.'
    ],
    points: [
      'Keep your login credentials secure.',
      'Keep your profile information accurate.',
      'Do not share your account with another person.',
      'Do not misuse customer information.',
      'Report suspected unauthorized account access.',
      'Report privacy or security concerns to BatohiDrive.'
    ]
  },

  {
    title: 'Third-Party Services',
    content: [
      'BatohiDrive may use third-party service providers to support functions such as hosting, communication, payments, analytics, security, or other platform operations.',
      'Where applicable, such providers may process information only for purposes related to the services they provide.'
    ]
  },

  {
    title: 'Children and Minors',
    content: [
      'The BatohiDrive driver platform is intended for eligible drivers who meet applicable age and legal requirements. BatohiDrive does not knowingly provide driver accounts to persons who do not meet these requirements.'
    ]
  },

  {
    title: 'Policy Updates',
    content: [
      'BatohiDrive may update this Privacy Policy from time to time to reflect changes in services, technology, legal requirements, or business practices.',
      'Updated versions may be made available through the driver platform.'
    ]
  },

  {
    title: 'Privacy Concerns and Support',
    content: [
      'If you have questions, concerns, or requests regarding your personal information, please contact BatohiDrive support through the available support channels.'
    ]
  },

  {
    title: 'Contact BatohiDrive',
    content: [
      'For questions regarding this Privacy Policy or the handling of driver information, please contact BatohiDrive support through the driver application or the official support channel provided by the platform.'
    ]
  }

]


// =====================================================
// DATA TYPES
// =====================================================

const dataTypes = [

  {
    icon: 'person',
    title: 'Profile Information',
    description: 'Name, contact details, account and verification information.'
  },

  {
    icon: 'directions_car',
    title: 'Vehicle Information',
    description: 'Vehicle number, model, colour, registration and insurance details.'
  },

  {
    icon: 'description',
    title: 'Documents',
    description: 'Driving licence, insurance and other required documents.'
  },

  {
    icon: 'location_on',
    title: 'Location',
    description: 'Location information used for active trip and operational purposes.'
  },

  {
    icon: 'route',
    title: 'Trip Information',
    description: 'Booking, trip status, pickup and destination information.'
  },

  {
    icon: 'account_balance_wallet',
    title: 'Earnings',
    description: 'Trip earnings, payment status and transaction information.'
  }

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
