<template>
  <q-page class="terms-page">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="terms-header">

      <div class="header-content">

        <div class="header-icon">
          <q-icon
            name="description"
            size="36px"
          />
        </div>

        <div class="col">

          <div class="page-title">
            Terms & Conditions
          </div>

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
      <q-card
        flat
        bordered
        class="search-card q-mb-lg"
      >

        <q-input
          v-model="search"
          outlined
          dense
          rounded
          clearable
          placeholder="Search terms and conditions..."
        >

          <template #prepend>
            <q-icon
              name="search"
              color="primary"
            />
          </template>

        </q-input>

      </q-card>


      <!-- ===================================================
           LAST UPDATED
      ==================================================== -->
      <q-card
        flat
        bordered
        class="notice-card q-mb-lg"
      >

        <q-card-section>

          <div class="row items-center no-wrap">

            <q-icon
              name="info"
              color="primary"
              size="24px"
              class="q-mr-md"
            />

            <div>

              <div class="text-weight-medium">
                Terms & Conditions
              </div>

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

          <q-card
            flat
            bordered
            class="toc-card"
          >

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

                  <q-icon
                    name="chevron_right"
                    size="18px"
                    color="primary"
                  />

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
                <div
                  class="section-content q-mt-md"
                  v-html="section.content"
                />

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

                <q-icon
                  name="search_off"
                  size="60px"
                  color="grey-5"
                />

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
      <q-card
        flat
        bordered
        class="agreement-card q-mt-xl q-mb-xl"
      >

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
                By using BatohiDrive services, you acknowledge that you
                have read, understood and agreed to these Terms &
                Conditions and other applicable policies.
              </div>

            </div>

          </div>

        </q-card-section>

      </q-card>


      <!-- ===================================================
           RELATED POLICIES
      ==================================================== -->
      <div class="related-section q-mb-xl">

        <div class="text-h6 text-weight-bold q-mb-md">
          Related Policies
        </div>

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

                <q-icon
                  name="privacy_tip"
                  size="30px"
                  color="primary"
                />

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

                <q-icon
                  name="event_busy"
                  size="30px"
                  color="primary"
                />

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

                <q-icon
                  name="currency_rupee"
                  size="30px"
                  color="primary"
                />

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
        Welcome to <strong>BatohiDrive</strong>. These Terms &
        Conditions govern your access to and use of the BatohiDrive
        platform and vehicle booking services.
      </p>

      <p>
        By accessing or using our services, you agree to comply with
        these Terms & Conditions and all applicable laws and regulations.
      </p>
    `
  },


  {
    id: 2,

    title: 'Eligibility',

    content: `
      <p>
        You must provide accurate information when creating and using
        your BatohiDrive account.
      </p>

      <p>
        You are responsible for ensuring that the information associated
        with your account remains accurate and up to date.
      </p>

      <p>
        You must also meet any age, identification or other eligibility
        requirements applicable to the service you are booking.
      </p>
    `
  },


  {
    id: 3,

    title: 'Account Registration',

    content: `
      <p>
        Customers may need to create an account to access certain
        BatohiDrive services.
      </p>

      <ul>
        <li>Provide accurate registration information.</li>
        <li>Keep your login credentials secure.</li>
        <li>Do not share your account with unauthorized persons.</li>
        <li>Notify BatohiDrive if you believe your account has been
            accessed without authorization.</li>
      </ul>

      <p>
        You are responsible for activities performed through your account.
      </p>
    `
  },


  {
    id: 4,

    title: 'Vehicle Booking',

    content: `
      <p>
        BatohiDrive provides a platform through which customers can
        search and book available vehicles.
      </p>

      <p>
        Vehicle availability, pricing, features and booking conditions
        may vary depending on the vehicle, location, date and service
        selected.
      </p>

      <p>
        Customers should carefully review all booking information before
        confirming a booking.
      </p>
    `
  },


  {
    id: 5,

    title: 'Booking Confirmation',

    content: `
      <p>
        A booking is considered confirmed only after the booking process
        has been successfully completed and confirmation is provided by
        BatohiDrive.
      </p>

      <p>
        Customers should retain their booking information for future
        reference.
      </p>
    `
  },


  {
    id: 6,

    title: 'Pricing and Payments',

    content: `
      <p>
        The applicable booking amount will be displayed during the
        booking process before payment confirmation.
      </p>

      <ul>
        <li>Review the final booking amount before payment.</li>
        <li>Use an authorized payment method.</li>
        <li>Do not attempt unauthorized or fraudulent transactions.</li>
      </ul>

      <p>
        Payment processing may be handled through third-party payment
        service providers.
      </p>
    `
  },


  {
    id: 7,

    title: 'Cancellation of Booking',

    content: `
      <p>
        Customers may cancel eligible bookings according to the
        cancellation terms applicable to their booking.
      </p>

      <p>
        Cancellation charges, refund eligibility and applicable
        conditions may depend on the time of cancellation and the
        selected service.
      </p>

      <p>
        Please review the BatohiDrive Cancellation Policy before
        cancelling a booking.
      </p>
    `
  },


  {
    id: 8,

    title: 'Refunds',

    content: `
      <p>
        Refunds are handled according to the applicable BatohiDrive
        Refund Policy.
      </p>

      <p>
        The refund amount may depend on the cancellation time,
        booking conditions, payment status and other applicable rules.
      </p>

      <p>
        Approved refunds may take additional time to appear in the
        customer's original payment account depending on the payment
        provider.
      </p>
    `
  },


  {
    id: 9,

    title: 'Customer Responsibilities',

    content: `
      <p>
        Customers are expected to use BatohiDrive services responsibly.
      </p>

      <ul>
        <li>Provide correct booking information.</li>
        <li>Follow applicable vehicle and service rules.</li>
        <li>Respect drivers and service partners.</li>
        <li>Do not misuse the BatohiDrive platform.</li>
        <li>Do not provide false or misleading information.</li>
        <li>Do not use the service for unlawful activities.</li>
      </ul>
    `
  },


  {
    id: 10,

    title: 'Vehicle Usage',

    content: `
      <p>
        Customers must use the booked vehicle in accordance with the
        applicable booking conditions and instructions.
      </p>

      <p>
        Any additional requirements, restrictions or charges associated
        with a particular vehicle or service will be communicated as
        applicable.
      </p>
    `
  },


  {
    id: 11,

    title: 'Driver and Service Partner',

    content: `
      <p>
        Where driver services are included, customers are expected to
        behave respectfully and follow reasonable instructions relating
        to safety and vehicle usage.
      </p>

      <p>
        BatohiDrive may work with independent drivers, vehicle owners
        or service partners to provide transportation services.
      </p>
    `
  },


  {
    id: 12,

    title: 'Prohibited Activities',

    content: `
      <p>
        Customers must not use BatohiDrive services for activities that
        violate applicable laws or the policies of the platform.
      </p>

      <ul>
        <li>Fraudulent transactions.</li>
        <li>Unauthorized account access.</li>
        <li>Illegal activities.</li>
        <li>Misuse of vehicles or services.</li>
        <li>Attempting to disrupt the platform.</li>
        <li>Providing false information.</li>
      </ul>
    `
  },


  {
    id: 13,

    title: 'Platform Availability',

    content: `
      <p>
        BatohiDrive aims to provide reliable access to its platform,
        but uninterrupted availability cannot always be guaranteed.
      </p>

      <p>
        Services may occasionally be unavailable due to maintenance,
        technical problems, network issues or circumstances beyond our
        reasonable control.
      </p>
    `
  },


  {
    id: 14,

    title: 'Limitation of Liability',

    content: `
      <p>
        BatohiDrive will make reasonable efforts to provide accurate
        platform information and reliable services.
      </p>

      <p>
        However, circumstances outside our reasonable control may affect
        vehicle availability, travel schedules, service delivery or
        platform availability.
      </p>
    `
  },


  {
    id: 15,

    title: 'Privacy',

    content: `
      <p>
        Your use of BatohiDrive is also subject to our Privacy Policy.
      </p>

      <p>
        Please review the Privacy Policy to understand how personal
        information may be collected, used and protected.
      </p>
    `
  },


  {
    id: 16,

    title: 'Changes to Terms & Conditions',

    content: `
      <p>
        BatohiDrive may update these Terms & Conditions from time to
        time to reflect changes in services, technology, legal
        requirements or business practices.
      </p>

      <p>
        Updated terms will be made available through the platform.
        Customers are encouraged to review this page periodically.
      </p>
    `
  },


  {
    id: 17,

    title: 'Contact and Support',

    content: `
      <p>
        If you have questions regarding these Terms & Conditions,
        booking rules or BatohiDrive services, please contact our
        customer support team through the available support channels.
      </p>

      <p>
        When contacting support about a booking, please provide your
        booking information where appropriate.
      </p>
    `
  }

])


// =====================================================
// FILTERED SECTIONS
// =====================================================

const filteredSections = computed(() => {

  const keyword = search.value
    .toLowerCase()
    .trim()

  if (!keyword) {
    return sections.value
  }

  return sections.value.filter(section => {

    return (
      section.title
        .toLowerCase()
        .includes(keyword) ||

      section.content
        .toLowerCase()
        .includes(keyword)
    )

  })

})


// =====================================================
// SCROLL TO SECTION
// =====================================================

const scrollToSection = (id) => {

  const element = document.getElementById(
    `terms-section-${id}`
  )

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

  box-shadow:
    0 5px 18px rgba(0, 0, 0, 0.07);
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
