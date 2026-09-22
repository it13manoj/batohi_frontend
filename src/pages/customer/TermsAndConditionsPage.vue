<template>
  <q-page class="terms-page">
    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="terms-header">
      <div class="header-content">
        <div class="header-icon">
          <q-icon name="description" size="36px" />
        </div>

        <div class="col">
          <div class="page-title"> Terms & Conditions </div>

          <div class="page-subtitle">
            Please read these terms carefully before using BatohiDrive
          </div>
        </div>
      </div>
    </div>

    <!-- =====================================================
         MAIN CONTENT
    ====================================================== -->
    <div class="terms-container">
      <!-- ===================================================
           SEARCH
      ==================================================== -->
      <q-card flat bordered class="search-card q-mb-lg">
        <q-input
          v-model="search"
          outlined
          dense
          rounded
          clearable
          placeholder="Search terms and conditions..."
        >
          <template #prepend>
            <q-icon name="search" color="primary" />
          </template>
        </q-input>
      </q-card>

      <!-- ===================================================
           LAST UPDATED
      ==================================================== -->
      <q-card flat bordered class="notice-card q-mb-lg">
        <q-card-section>
          <div class="row items-center no-wrap">
            <q-icon name="info" color="primary" size="24px" class="q-mr-md" />

            <div>
              <div class="text-weight-medium"> Terms & Conditions </div>

              <div class="text-caption text-grey-7 q-mt-xs">
                Last updated: 02 September 2026
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- ===================================================
           CONTENT LAYOUT
      ==================================================== -->
      <div class="row q-col-gutter-lg">
        <!-- =================================================
             LEFT: TABLE OF CONTENTS
        ================================================== -->
        <div class="col-12 col-md-3">
          <q-card flat bordered class="toc-card">
            <q-card-section>
              <div class="text-subtitle1 text-weight-bold q-mb-md">
                Quick Navigation
              </div>

              <div class="toc-list">
                <div
                  v-for="section in filteredSections"
                  :key="section.id"
                  class="toc-item"
                  @click="scrollToSection(section.id)"
                >
                  <q-icon name="chevron_right" size="18px" color="primary" />

                  <span>
                    {{ section.title }}
                  </span>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- =================================================
             RIGHT: TERMS CONTENT
        ================================================== -->
        <div class="col-12 col-md-9">
          <div class="terms-content">
            <q-card
              v-for="(section, index) in filteredSections"
              :key="section.id"
              :id="`terms-section-${section.id}`"
              flat
              bordered
              class="terms-section q-mb-md"
            >
              <q-card-section>
                <!-- Section Heading -->
                <div class="section-heading">
                  <q-avatar
                    color="primary"
                    text-color="white"
                    size="34px"
                    class="q-mr-sm"
                  >
                    {{ index + 1 }}
                  </q-avatar>

                  <div class="section-title">
                    {{ section.title }}
                  </div>
                </div>

                <!-- Section Content -->
                <div class="section-content q-mt-md" v-html="section.content" />
              </q-card-section>
            </q-card>

            <!-- =============================================
                 NO SEARCH RESULT
            ============================================== -->
            <q-card
              v-if="filteredSections.length === 0"
              flat
              bordered
              class="empty-card"
            >
              <q-card-section class="text-center q-pa-xl">
                <q-icon name="search_off" size="60px" color="grey-5" />

                <div class="text-h6 text-weight-bold q-mt-md">
                  No matching section found
                </div>

                <div class="text-grey-7 q-mt-sm">
                  Try searching with a different keyword.
                </div>

                <q-btn
                  flat
                  color="primary"
                  label="Clear Search"
                  class="q-mt-md"
                  @click="search = ''"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- ===================================================
           ACCEPTANCE / FOOTER NOTICE
      ==================================================== -->
      <q-card flat bordered class="agreement-card q-mt-xl q-mb-xl">
        <q-card-section>
          <div class="row items-start no-wrap">
            <q-icon
              name="verified_user"
              color="primary"
              size="28px"
              class="q-mr-md"
            />

            <div>
              <div class="text-subtitle1 text-weight-bold">
                Using BatohiDrive
              </div>

              <div class="text-grey-7 q-mt-sm">
                By using BatohiDrive services, you acknowledge that you have
                read, understood and agreed to these Terms & Conditions and
                other applicable policies.
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- ===================================================
           RELATED POLICIES
      ==================================================== -->
      <div class="related-section q-mb-xl">
        <div class="text-h6 text-weight-bold q-mb-md"> Related Policies </div>

        <div class="row q-col-gutter-md">
          <!-- Privacy -->
          <div class="col-12 col-sm-4">
            <q-card
              flat
              bordered
              clickable
              class="related-card"
              @click="goToPrivacy"
            >
              <q-card-section>
                <q-icon name="privacy_tip" size="30px" color="primary" />

                <div class="text-subtitle1 text-weight-bold q-mt-sm">
                  Privacy Policy
                </div>

                <div class="text-caption text-grey-7 q-mt-xs">
                  Learn how your information is handled.
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Cancellation -->
          <div class="col-12 col-sm-4">
            <q-card
              flat
              bordered
              clickable
              class="related-card"
              @click="goToCancellation"
            >
              <q-card-section>
                <q-icon name="event_busy" size="30px" color="primary" />

                <div class="text-subtitle1 text-weight-bold q-mt-sm">
                  Cancellation Policy
                </div>

                <div class="text-caption text-grey-7 q-mt-xs">
                  Learn about booking cancellation rules.
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Refund -->
          <div class="col-12 col-sm-4">
            <q-card
              flat
              bordered
              clickable
              class="related-card"
              @click="goToRefund"
            >
              <q-card-section>
                <q-icon name="currency_rupee" size="30px" color="primary" />

                <div class="text-subtitle1 text-weight-bold q-mt-sm">
                  Refund Policy
                </div>

                <div class="text-caption text-grey-7 q-mt-xs">
                  Learn about refunds and payment returns.
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// =====================================================
// SEARCH
// =====================================================

const search = ref('')

// =====================================================
// TERMS SECTIONS
// =====================================================

const sections = ref([
  {
    id: 1,
    title: 'Introduction',
    content: `
      <p>
        Welcome to <strong>BatohiDrive</strong>. These Terms & Conditions govern your access to and use of the BatohiDrive platform and online booking services.
      </p>
      <p>
        By accessing or using the platform, you agree to comply with these Terms & Conditions and all applicable laws and regulations.
      </p>
    `
  },
  {
    id: 2,
    title: 'Platform Role',
    content: `
      <p>
        BatohiDrive operates as a digital marketplace and platform that enables customers to search, compare, and book available vehicle and mobility services.
      </p>
      <p>
        The platform provides software access and service facilitation. The actual vehicle, driver, vehicle ownership, legal registration, insurance status, and operational execution remain the responsibility of the relevant driver or vehicle owner.
      </p>
    `
  },
  {
    id: 3,
    title: 'Eligibility and Account',
    content: `
      <p>
        Customers must provide accurate information when creating and using their BatohiDrive account.
      </p>
      <ul>
        <li>Use accurate account and contact information.</li>
        <li>Keep your login credentials secure.</li>
        <li>Do not share your account with unauthorized persons.</li>
        <li>Notify support immediately if you believe your account has been accessed without authorization.</li>
      </ul>
    `
  },
  {
    id: 4,
    title: 'Booking Process',
    content: `
      <p>
        Customers may use the BatohiDrive platform to search, compare, and book available vehicle services.
      </p>
      <p>
        Availability, pricing, vehicle details, and service conditions may vary by location, date, time, and service provider.
      </p>
      <p>
        Customers should review all booking details before confirming a request or making payment.
      </p>
    `
  },
  {
    id: 5,
    title: 'Booking Confirmation',
    content: `
      <p>
        A booking is considered confirmed only after the booking process has been successfully completed and the customer receives the appropriate confirmation from the platform.
      </p>
      <p>
        Customers are responsible for keeping their booking records and relevant details for future reference.
      </p>
    `
  },
  {
    id: 6,
    title: 'Pricing, Payment, and Charges',
    content: `
      <p>
        All relevant booking amounts, fees, or charges will be shown before payment confirmation where applicable.
      </p>
      <ul>
        <li>Review the final amount before confirming payment.</li>
        <li>Use an authorized payment method.</li>
        <li>Do not attempt unauthorized or fraudulent transactions.</li>
        <li>Payment processing may be handled through third-party payment providers.</li>
      </ul>
    `
  },
  {
    id: 7,
    title: 'Cancellation and Refunds',
    content: `
      <p>
        Customers may cancel eligible bookings in line with the applicable cancellation and refund terms for the selected booking.
      </p>
      <p>
        Refunds, cancellation charges, and eligibility depend on the booking type, cancellation time, and the policy applicable to that booking.
      </p>
    `
  },
  {
    id: 8,
    title: 'Customer Responsibilities',
    content: `
      <p>
        Customers are expected to use the BatohiDrive platform responsibly and lawfully.
      </p>
      <ul>
        <li>Provide correct and truthful booking information.</li>
        <li>Follow booking instructions and service rules.</li>
        <li>Respect drivers, vehicle owners, and service partners.</li>
        <li>Do not misuse the platform or customer information.</li>
        <li>Do not use the service for unlawful or fraudulent activity.</li>
      </ul>
    `
  },
  {
    id: 9,
    title: 'Driver and Vehicle Responsibilities',
    content: `
      <p>
        Drivers and vehicle owners remain responsible for the condition, legality, registration, insurance, licensing, and safe operation of the vehicle and service being provided.
      </p>
      <p>
        BatohiDrive does not own or operate the vehicles used for services, and it is not the legal owner or operator of each vehicle listed on the platform.
      </p>
    `
  },
  {
    id: 10,
    title: 'Prohibited Activities',
    content: `
      <p>
        Customers must not use BatohiDrive services for activities that violate applicable law or the policies of the platform.
      </p>
      <ul>
        <li>Fraudulent or abusive booking activity.</li>
        <li>Unauthorized account access or account sharing.</li>
        <li>Misuse of personal or trip information.</li>
        <li>Attempts to disrupt or manipulate the platform.</li>
        <li>Any unlawful, unsafe, or misleading use of the service.</li>
      </ul>
    `
  },
  {
    id: 11,
    title: 'Platform Availability',
    content: `
      <p>
        BatohiDrive strives to maintain access to the platform, but uninterrupted availability cannot always be guaranteed.
      </p>
      <p>
        Technical issues, maintenance, network issues, external events, or force majeure conditions may affect service availability or booking completion.
      </p>
    `
  },
  {
    id: 12,
    title: 'Limitation of Liability',
    content: `
      <p>
        BatohiDrive is responsible for the platform and service facilitation it provides, but it does not control or guarantee the condition, legality, driver conduct, vehicle ownership, or operational execution of independent drivers and vehicle owners.
      </p>
      <p>
        Where possible, the platform will support problem resolution, but ultimate responsibility for vehicle operation and service execution remains with the relevant driver or vehicle owner.
      </p>
    `
  },
  {
    id: 13,
    title: 'Privacy and Personal Information',
    content: `
      <p>
        Your use of BatohiDrive is also subject to our Privacy Policy.
      </p>
      <p>
        Please review the Privacy Policy to understand how personal information may be collected, used, and protected.
      </p>
    `
  },
  {
    id: 14,
    title: 'Modifications to Terms',
    content: `
      <p>
        BatohiDrive may update these Terms & Conditions from time to time to reflect changes in services, technology, legal requirements, or business practices.
      </p>
      <p>
        Updated terms will be available through the platform, and continued use of the platform indicates your acceptance of the updated document.
      </p>
    `
  },
  {
    id: 15,
    title: 'Contact and Support',
    content: `
      <p>
        If you have questions regarding these Terms & Conditions, booking rules, payment issues, or service concerns, contact BatohiDrive support through the available customer support channels.
      </p>
    `
  }
])

// =====================================================
// FILTERED SECTIONS
// =====================================================

const filteredSections = computed(() => {
  const keyword = search.value.toLowerCase().trim()

  if (!keyword) {
    return sections.value
  }

  return sections.value.filter(section => {
    return (
      section.title.toLowerCase().includes(keyword) ||
      section.content.toLowerCase().includes(keyword)
    )
  })
})

// =====================================================
// SCROLL TO SECTION
// =====================================================

const scrollToSection = id => {
  const element = document.getElementById(`terms-section-${id}`)

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// =====================================================
// PRIVACY POLICY
// =====================================================

const goToPrivacy = () => {
  router.push('/customer/privacy-policy')
}

// =====================================================
// CANCELLATION POLICY
// =====================================================

const goToCancellation = () => {
  router.push('/customer/cancellation-policy')
}

// =====================================================
// REFUND POLICY
// =====================================================

const goToRefund = () => {
  router.push('/customer/refund-policy')
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

.terms-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 28px 24px;
}

.header-content {
  max-width: 1100px;
  margin: auto;

  display: flex;
  align-items: center;
}

.header-icon {
  width: 62px;
  height: 62px;

  border-radius: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(25, 118, 210, 0.1);
  color: #1976d2;

  margin-right: 16px;
}

/* =====================================================
   TITLE
===================================================== */

.page-title {
  font-size: 27px;
  font-weight: 700;
  color: #1f2937;
}

.page-subtitle {
  margin-top: 5px;
  color: #6b7280;
  font-size: 14px;
}

/* =====================================================
   CONTAINER
===================================================== */

.terms-container {
  max-width: 1100px;
  margin: auto;
  padding: 28px 20px;
}

/* =====================================================
   SEARCH
===================================================== */

.search-card {
  border-radius: 12px;
  background: #ffffff;
  padding: 8px;
}

/* =====================================================
   NOTICE
===================================================== */

.notice-card {
  border-radius: 12px;
  background: #ffffff;
}

/* =====================================================
   TABLE OF CONTENTS
===================================================== */

.toc-card {
  border-radius: 12px;
  background: #ffffff;

  position: sticky;
  top: 20px;
}

.toc-list {
  display: flex;
  flex-direction: column;
}

.toc-item {
  display: flex;
  align-items: flex-start;

  padding: 9px 6px;

  color: #555;
  font-size: 13px;

  border-radius: 7px;

  cursor: pointer;

  transition: all 0.2s ease;
}

.toc-item:hover {
  background: rgba(25, 118, 210, 0.08);
  color: #1976d2;
}

.toc-item span {
  margin-left: 3px;
}

/* =====================================================
   TERMS SECTION
===================================================== */

.terms-section {
  background: #ffffff;
  border-radius: 12px;

  scroll-margin-top: 20px;
}

.section-heading {
  display: flex;
  align-items: center;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

/* =====================================================
   CONTENT
===================================================== */

.section-content {
  color: #555;
  font-size: 14px;
  line-height: 1.8;
}

.section-content :deep(p) {
  margin-top: 0;
  margin-bottom: 14px;
}

.section-content :deep(ul),
.section-content :deep(ol) {
  padding-left: 24px;
  margin-top: 8px;
  margin-bottom: 14px;
}

.section-content :deep(li) {
  margin-bottom: 7px;
}

/* =====================================================
   AGREEMENT
===================================================== */

.agreement-card {
  border-radius: 12px;
  background: #ffffff;
}

/* =====================================================
   RELATED POLICIES
===================================================== */

.related-card {
  height: 100%;

  border-radius: 12px;
  background: #ffffff;

  transition: all 0.2s ease;
}

.related-card:hover {
  transform: translateY(-2px);

  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.07);
}

/* =====================================================
   EMPTY
===================================================== */

.empty-card {
  border-radius: 12px;
  background: #ffffff;
}

/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 768px) {
  .terms-header {
    padding: 20px 16px;
  }

  .header-content {
    align-items: flex-start;
  }

  .header-icon {
    width: 52px;
    height: 52px;
  }

  .page-title {
    font-size: 21px;
  }

  .page-subtitle {
    font-size: 13px;
  }

  .terms-container {
    padding: 20px 12px;
  }

  .toc-card {
    position: static;
  }

  .toc-list {
    max-height: 250px;
    overflow-y: auto;
  }

  .section-title {
    font-size: 16px;
  }
}
</style>
