<template>
  <q-page class="terms-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header q-mb-lg">

      <div class="row items-center no-wrap">

        <div class="header-icon">
          <q-icon
            name="description"
            size="30px"
            color="primary"
          />
        </div>

        <div class="q-ml-md">

          <div class="text-h5 text-weight-bold">
            Terms & Conditions
          </div>

          <div class="text-grey-7 q-mt-xs">
            Please read the terms and conditions for driving with BatohiDrive
          </div>

        </div>

      </div>

      <q-badge
        color="blue-1"
        text-color="primary"
        class="q-mt-md"
      >
        Driver Terms
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
              <ul
                v-if="section.points"
                class="terms-list"
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
    <q-card
      flat
      bordered
      class="responsibility-card q-mt-lg"
    >

      <q-card-section>

        <div class="row items-center">

          <q-icon
            name="verified_user"
            color="primary"
            size="25px"
            class="q-mr-sm"
          />

          <div class="text-h6 text-weight-bold">
            Driver Responsibilities
          </div>

        </div>

        <div class="responsibility-grid q-mt-md">

          <div
            v-for="item in responsibilities"
            :key="item.title"
            class="responsibility-item"
          >

            <q-icon
              :name="item.icon"
              color="primary"
              size="22px"
            />

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
    <q-card
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
                Need Help?
              </div>

              <div class="text-grey-7">
                Contact BatohiDrive support if you have questions
                about these terms.
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

            <q-icon
              name="privacy_tip"
              color="primary"
              size="30px"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Privacy Policy
            </div>

            <div class="text-grey-7 text-caption q-mt-xs">
              Learn how your driver information is handled.
            </div>

            <div class="text-primary text-caption q-mt-md">
              View Privacy Policy
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
              Learn more about BatohiDrive and our services.
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
// TERMS & CONDITIONS
// =====================================================

const sections = [

  {
    title: 'Acceptance of Terms',
    content: [
      'By registering as a driver with BatohiDrive and using the driver platform, you agree to follow these Terms & Conditions.',
      'If you do not agree with any part of these terms, you should not use the BatohiDrive driver services.'
    ]
  },

  {
    title: 'Driver Eligibility',
    content: [
      'Drivers must meet all eligibility requirements established by BatohiDrive and applicable laws.'
    ],
    points: [
      'Provide accurate personal and driver information.',
      'Maintain a valid driving licence.',
      'Meet the required minimum age and eligibility requirements.',
      'Provide valid vehicle registration and insurance documents.',
      'Complete any required driver verification process.'
    ]
  },

  {
    title: 'Driver Account',
    content: [
      'Your driver account is personal to you. You are responsible for maintaining the security of your account and login credentials.'
    ],
    points: [
      'Do not share your account with another person.',
      'Keep your mobile number and profile information updated.',
      'Immediately report unauthorized access to BatohiDrive.',
      'Provide truthful and accurate information at all times.'
    ]
  },

  {
    title: 'Driver Profile Information',
    content: [
      'Drivers must ensure that all information provided in their profile is accurate and up to date.'
    ],
    points: [
      'Driver name and contact information.',
      'Driving licence information.',
      'Vehicle details.',
      'Bank or payment information where applicable.',
      'Required identity and verification information.'
    ]
  },

  {
    title: 'Vehicle Requirements',
    content: [
      'Drivers are responsible for ensuring that the vehicle used for BatohiDrive trips is safe, clean, properly maintained, and legally permitted for use.'
    ],
    points: [
      'Keep the vehicle in safe operating condition.',
      'Maintain valid registration and insurance.',
      'Complete required vehicle inspections.',
      'Keep required vehicle documents available.',
      'Immediately report serious vehicle problems.'
    ]
  },

  {
    title: 'Trip and Booking Responsibilities',
    content: [
      'Drivers are expected to properly manage assigned bookings and complete trips according to the information provided through the BatohiDrive platform.'
    ],
    points: [
      'Review booking details before starting a trip.',
      'Arrive at the pickup location on time whenever reasonably possible.',
      'Confirm the correct customer before starting the trip.',
      'Follow the designated trip process.',
      'Complete the trip correctly through the driver application.'
    ]
  },

  {
    title: 'Customer Interaction',
    content: [
      'Drivers must treat all customers respectfully and professionally.'
    ],
    points: [
      'Communicate politely with customers.',
      'Respect customer privacy.',
      'Do not engage in threatening, abusive, or discriminatory behaviour.',
      'Do not request unnecessary personal information.',
      'Report serious customer-related issues to BatohiDrive support.'
    ]
  },

  {
    title: 'Driver Conduct',
    content: [
      'Drivers must maintain professional conduct while using the BatohiDrive platform and while providing services to customers.'
    ],
    points: [
      'Do not use abusive or offensive language.',
      'Do not harass or threaten customers.',
      'Do not misuse customer information.',
      'Do not intentionally manipulate trip information.',
      'Do not allow unauthorized persons to operate your driver account.'
    ]
  },

  {
    title: 'Driving and Safety',
    content: [
      'Safety is a fundamental responsibility of every BatohiDrive driver.'
    ],
    points: [
      'Follow all applicable traffic laws.',
      'Drive responsibly and safely.',
      'Do not drive under the influence of alcohol or drugs.',
      'Do not use a mobile phone in a way that violates traffic laws.',
      'Use appropriate safety equipment where required.',
      'Prioritize the safety of customers and other road users.'
    ]
  },

  {
    title: 'Driver Documents',
    content: [
      'All required driver and vehicle documents must remain valid during the period in which you provide services through BatohiDrive.'
    ],
    points: [
      'Driving licence.',
      'Vehicle registration documents.',
      'Vehicle insurance.',
      'Required permits or certificates.',
      'Any other documents requested by BatohiDrive.'
    ]
  },

  {
    title: 'Earnings and Payments',
    content: [
      'Driver earnings are calculated according to the applicable BatohiDrive pricing, commission, and payment structure.'
    ],
    points: [
      'Review your earnings through the driver panel.',
      'Keep payment information accurate.',
      'Payments may be subject to applicable deductions or platform charges.',
      'Payment timing may depend on the applicable payment schedule.'
    ]
  },

  {
    title: 'Cancellation of Bookings',
    content: [
      'Drivers should accept and complete bookings responsibly. Unnecessary or repeated cancellations may affect driver performance or account status.'
    ],
    points: [
      'Avoid cancelling trips without a valid reason.',
      'Inform support when an emergency prevents trip completion.',
      'Do not encourage customers to cancel bookings improperly.',
      'Follow BatohiDrive cancellation procedures.'
    ]
  },

  {
    title: 'Vehicle Breakdown or Emergency',
    content: [
      'If a vehicle breakdown, accident, medical emergency, or other serious incident occurs during a trip, the driver must prioritize safety and contact the appropriate emergency services when necessary.'
    ],
    points: [
      'Move to a safe location where possible.',
      'Assist customers within reasonable and safe limits.',
      'Contact emergency services when required.',
      'Inform BatohiDrive support as soon as reasonably possible.'
    ]
  },

  {
    title: 'Prohibited Activities',
    content: [
      'Drivers must not use the BatohiDrive platform for illegal, fraudulent, or unauthorized activities.'
    ],
    points: [
      'Fraudulent bookings or trip activity.',
      'Providing false documents.',
      'Manipulating trip information.',
      'Unauthorized use of another driver account.',
      'Misuse of customer information.',
      'Any activity that violates applicable laws.'
    ]
  },

  {
    title: 'Account Suspension or Termination',
    content: [
      'BatohiDrive may restrict, suspend, or terminate a driver account where there is a violation of these terms, applicable law, safety requirements, or platform policies.'
    ],
    points: [
      'Serious safety violations.',
      'Fraudulent activity.',
      'Invalid or expired required documents.',
      'Repeated policy violations.',
      'Customer safety or security concerns.',
      'Providing false or misleading information.'
    ]
  },

  {
    title: 'Privacy and Customer Information',
    content: [
      'Drivers may receive customer information that is necessary to provide a booking. Such information must only be used for legitimate BatohiDrive services.'
    ],
    points: [
      'Do not share customer information with unauthorized persons.',
      'Do not use customer information for personal purposes.',
      'Do not contact customers outside legitimate service requirements.',
      'Follow the BatohiDrive Privacy Policy.'
    ]
  },

  {
    title: 'Support and Complaints',
    content: [
      'Drivers can contact BatohiDrive support for assistance with bookings, customers, payments, vehicles, documents, or technical issues.'
    ],
    points: [
      'Report serious incidents promptly.',
      'Provide accurate information when submitting a complaint.',
      'Cooperate with reasonable investigations.',
      'Follow support instructions regarding active bookings.'
    ]
  },

  {
    title: 'Changes to These Terms',
    content: [
      'BatohiDrive may update these Terms & Conditions from time to time to reflect changes in services, policies, technology, or applicable requirements.',
      'Updated terms will be made available through the platform.'
    ]
  },

  {
    title: 'Governing Law',
    content: [
      'These Terms & Conditions are subject to applicable laws and regulations governing the services provided through BatohiDrive.'
    ]
  },

  {
    title: 'Contact BatohiDrive',
    content: [
      'If you have questions regarding these Terms & Conditions, please contact BatohiDrive support through the driver application or support channel provided by the platform.'
    ]
  }

]


// =====================================================
// DRIVER RESPONSIBILITIES
// =====================================================

const responsibilities = [

  {
    icon: 'verified_user',
    title: 'Valid Documents',
    description: 'Keep your driver and vehicle documents valid.'
  },

  {
    icon: 'directions_car',
    title: 'Safe Vehicle',
    description: 'Maintain a clean and roadworthy vehicle.'
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
    description: 'Complete assigned bookings responsibly.'
  },

  {
    icon: 'support_agent',
    title: 'Report Issues',
    description: 'Contact support when serious problems occur.'
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
