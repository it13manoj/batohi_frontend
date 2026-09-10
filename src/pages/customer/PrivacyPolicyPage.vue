<template>
  <q-page class="privacy-page">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="privacy-header">

      <div class="header-content">

        <div class="header-icon">
          <q-icon
            name="privacy_tip"
            size="36px"
          />
        </div>

        <div class="col">

          <div class="page-title">
            Privacy Policy
          </div>

          <div class="page-subtitle">
            Learn how BatohiDrive collects, uses and protects your information
          </div>

        </div>

      </div>

    </div>


    <!-- =====================================================
         MAIN CONTAINER
    ====================================================== -->
    <div class="privacy-container">

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
          placeholder="Search privacy policy..."
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
           POLICY INFORMATION
      ==================================================== -->
      <q-card
        flat
        bordered
        class="policy-info-card q-mb-lg"
      >

        <q-card-section>

          <div class="row items-center no-wrap">

            <q-icon
              name="verified_user"
              color="primary"
              size="28px"
              class="q-mr-md"
            />

            <div class="col">

              <div class="text-subtitle1 text-weight-bold">
                Your Privacy Matters
              </div>

              <div class="text-caption text-grey-7 q-mt-xs">
                Last updated: 02 September 2026
              </div>

            </div>

          </div>

          <div class="policy-intro q-mt-md">
            BatohiDrive respects your privacy and is committed to
            protecting your personal information. This Privacy Policy
            explains how information may be collected, used and protected
            when you use our platform and services.
          </div>

        </q-card-section>

      </q-card>


      <!-- ===================================================
           CONTENT
      ==================================================== -->
      <div class="row q-col-gutter-lg">

        <!-- =================================================
             TABLE OF CONTENTS
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
             POLICY SECTIONS
        ================================================== -->
        <div class="col-12 col-md-9">

          <div class="privacy-content">

            <q-card
              v-for="(section, index) in filteredSections"
              :key="section.id"
              :id="`privacy-section-${section.id}`"
              flat
              bordered
              class="privacy-section q-mb-md"
            >

              <q-card-section>

                <!-- Section Header -->
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
                 EMPTY STATE
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
           PRIVACY COMMITMENT
      ==================================================== -->
      <q-card
        flat
        bordered
        class="commitment-card q-mt-xl"
      >

        <q-card-section>

          <div class="row items-start no-wrap">

            <div class="commitment-icon">

              <q-icon
                name="security"
                size="28px"
                color="primary"
              />

            </div>

            <div class="col q-ml-md">

              <div class="text-subtitle1 text-weight-bold">
                Our Commitment to Your Privacy
              </div>

              <div class="text-grey-7 q-mt-sm">
                We aim to handle your information responsibly and use
                appropriate measures to protect it. We also encourage you
                to keep your account credentials secure and contact support
                if you notice any suspicious account activity.
              </div>

            </div>

          </div>

        </q-card-section>

      </q-card>


      <!-- ===================================================
           RELATED POLICIES
      ==================================================== -->
      <div class="related-section q-mt-xl q-mb-xl">

        <div class="text-h6 text-weight-bold q-mb-md">
          Related Policies
        </div>

        <div class="row q-col-gutter-md">

          <!-- Terms -->
          <div class="col-12 col-sm-4">

            <q-card
              flat
              bordered
              clickable
              class="related-card"
              @click="goToTerms"
            >

              <q-card-section>

                <q-icon
                  name="description"
                  size="30px"
                  color="primary"
                />

                <div class="text-subtitle1 text-weight-bold q-mt-sm">
                  Terms & Conditions
                </div>

                <div class="text-caption text-grey-7 q-mt-xs">
                  Read the terms for using BatohiDrive.
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
// PRIVACY POLICY SECTIONS
// =====================================================

const sections = ref([

  {
    id: 1,

    title: 'Introduction',

    content: `
      <p>
        Welcome to <strong>BatohiDrive</strong>. We respect your privacy
        and are committed to protecting your personal information.
      </p>

      <p>
        This Privacy Policy explains how information may be collected,
        used, stored and protected when you access or use BatohiDrive
        services.
      </p>
    `
  },


  {
    id: 2,

    title: 'Information We Collect',

    content: `
      <p>
        Depending on how you use BatohiDrive, we may collect information
        necessary to provide our services.
      </p>

      <ul>
        <li>Name and contact information.</li>
        <li>Account and profile information.</li>
        <li>Booking and trip information.</li>
        <li>Vehicle and service preferences.</li>
        <li>Payment and transaction-related information.</li>
        <li>Information you provide when contacting support.</li>
      </ul>
    `
  },


  {
    id: 3,

    title: 'Account Information',

    content: `
      <p>
        When you create a BatohiDrive account, you may be required to
        provide information such as your name, mobile number, email
        address and other account details.
      </p>

      <p>
        You are responsible for keeping your account information accurate
        and up to date.
      </p>
    `
  },


  {
    id: 4,

    title: 'Booking Information',

    content: `
      <p>
        When you search for or book a vehicle, information related to
        your booking may be collected.
      </p>

      <ul>
        <li>Pickup location.</li>
        <li>Destination.</li>
        <li>Travel date and time.</li>
        <li>Selected vehicle.</li>
        <li>Booking status.</li>
        <li>Transaction details.</li>
      </ul>

      <p>
        This information helps us process and manage your bookings.
      </p>
    `
  },


  {
    id: 5,

    title: 'How We Use Your Information',

    content: `
      <p>
        Information collected through BatohiDrive may be used to:
      </p>

      <ul>
        <li>Create and manage your account.</li>
        <li>Process vehicle bookings.</li>
        <li>Provide requested transportation services.</li>
        <li>Process payments and refunds.</li>
        <li>Communicate booking updates.</li>
        <li>Provide customer support.</li>
        <li>Improve our platform and services.</li>
        <li>Help maintain platform security.</li>
      </ul>
    `
  },


  {
    id: 6,

    title: 'Payment Information',

    content: `
      <p>
        Payments may be processed through third-party payment service
        providers.
      </p>

      <p>
        Payment providers may process payment information according to
        their own privacy policies and security practices.
      </p>

      <p>
        BatohiDrive may receive transaction-related information needed
        to confirm and manage your booking.
      </p>
    `
  },


  {
    id: 7,

    title: 'Location Information',

    content: `
      <p>
        Certain BatohiDrive services may require location information,
        such as pickup or destination details, to provide the requested
        transportation service.
      </p>

      <p>
        Location information is used only as necessary for the relevant
        service and booking experience.
      </p>
    `
  },


  {
    id: 8,

    title: 'Cookies and Similar Technologies',

    content: `
      <p>
        BatohiDrive may use cookies or similar technologies to support
        website functionality and improve the user experience.
      </p>

      <p>
        These technologies may help remember preferences, maintain
        sessions and understand how users interact with the platform.
      </p>
    `
  },


  {
    id: 9,

    title: 'Sharing of Information',

    content: `
      <p>
        We may share relevant information with service providers or
        partners when necessary to provide BatohiDrive services.
      </p>

      <p>
        For example, information necessary to complete a booking may be
        shared with an applicable driver, vehicle owner or service partner.
      </p>

      <p>
        We may also disclose information when required by applicable law
        or legal process.
      </p>
    `
  },


  {
    id: 10,

    title: 'Data Security',

    content: `
      <p>
        BatohiDrive takes reasonable measures to help protect your
        information against unauthorized access, misuse, alteration
        or disclosure.
      </p>

      <p>
        However, no internet-based system can be guaranteed to be
        completely secure.
      </p>
    `
  },


  {
    id: 11,

    title: 'Data Retention',

    content: `
      <p>
        We may retain information for as long as reasonably necessary
        to provide services, maintain business records, resolve disputes,
        comply with legal requirements and enforce applicable agreements.
      </p>
    `
  },


  {
    id: 12,

    title: 'Your Account Security',

    content: `
      <p>
        You are responsible for keeping your BatohiDrive login credentials
        confidential.
      </p>

      <ul>
        <li>Do not share your password with others.</li>
        <li>Use a strong and unique password.</li>
        <li>Log out when using a shared device.</li>
        <li>Notify support if you suspect unauthorized account access.</li>
      </ul>
    `
  },


  {
    id: 13,

    title: 'Third-Party Services',

    content: `
      <p>
        BatohiDrive may use third-party services for functions such as
        payment processing, analytics, communication or other platform
        services.
      </p>

      <p>
        These third parties may have their own privacy policies and terms
        governing how information is handled.
      </p>
    `
  },


  {
    id: 14,

    title: 'Your Privacy Rights',

    content: `
      <p>
        Depending on applicable law, you may have rights relating to
        your personal information.
      </p>

      <p>
        These may include requesting access to, correction of or deletion
        of certain personal information, subject to applicable legal
        requirements and limitations.
      </p>

      <p>
        You may contact BatohiDrive support for privacy-related requests.
      </p>
    `
  },


  {
    id: 15,

    title: 'Children’s Privacy',

    content: `
      <p>
        BatohiDrive services are not intended to be used by individuals
        who are not legally eligible to use the applicable service.
      </p>

      <p>
        We do not knowingly seek to collect personal information from
        children in violation of applicable law.
      </p>
    `
  },


  {
    id: 16,

    title: 'Changes to Privacy Policy',

    content: `
      <p>
        BatohiDrive may update this Privacy Policy from time to time
        to reflect changes in our services, technology, legal requirements
        or business practices.
      </p>

      <p>
        The updated Privacy Policy will be made available through the
        platform. Customers are encouraged to review this page periodically.
      </p>
    `
  },


  {
    id: 17,

    title: 'Contact Us',

    content: `
      <p>
        If you have questions, concerns or requests regarding this
        Privacy Policy or the handling of your information, please contact
        BatohiDrive support through the available customer support channels.
      </p>

      <p>
        When contacting support, please provide sufficient information
        to help us understand and respond to your request.
      </p>
    `
  }

])


// =====================================================
// FILTER SECTIONS
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
    `privacy-section-${id}`
  )

  if (element) {

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })

  }

}


// =====================================================
// TERMS & CONDITIONS
// =====================================================

const goToTerms = () => {

  router.push('/customer/terms-and-conditions')

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

.privacy-page {
  min-height: 100%;
  background: #f7f8fa;
}


/* =====================================================
   HEADER
===================================================== */

.privacy-header {
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

.privacy-container {
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
   POLICY INFO
===================================================== */

.policy-info-card {
  border-radius: 12px;
  background: #ffffff;
}

.policy-intro {
  color: #555;
  font-size: 14px;
  line-height: 1.8;
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
   PRIVACY SECTION
===================================================== */

.privacy-section {
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
   COMMITMENT
===================================================== */

.commitment-card {
  border-radius: 12px;
  background: #ffffff;
}

.commitment-icon {
  width: 52px;
  height: 52px;

  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(25, 118, 210, 0.1);
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

  .privacy-header {
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

  .privacy-container {
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
