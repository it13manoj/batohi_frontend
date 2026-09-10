<template>
  <q-page class="about-us-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header q-mb-lg">
      <div class="row items-center no-wrap">

        <div class="header-icon">
          <q-icon
            name="info"
            size="30px"
            color="primary"
          />
        </div>

        <div class="q-ml-md">
          <div class="text-h5 text-weight-bold">
            About BatohiDrive
          </div>

          <div class="text-grey-7 q-mt-xs">
            Learn more about BatohiDrive, our services and our commitment
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
        placeholder="Search About BatohiDrive..."
        class="search-input"
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card>

    <!-- =====================================================
         HERO / INTRODUCTION
    ====================================================== -->
    <q-card
      flat
      bordered
      class="hero-card q-mb-lg"
    >
      <div class="row items-center">

        <div class="col-12 col-md-8">

          <div class="hero-badge">
            <q-icon
              name="directions_car"
              size="18px"
              color="primary"
            />

            <span>
              Your Trusted Vehicle Booking Platform
            </span>
          </div>

          <div class="text-h4 text-weight-bold q-mt-md">
            Welcome to BatohiDrive
          </div>

          <div class="hero-text q-mt-md">
            BatohiDrive is a vehicle booking platform designed to make
            vehicle discovery and booking simple, convenient and reliable.
            We connect customers with suitable vehicles and service
            partners through an easy-to-use digital platform.
          </div>

          <div class="row q-gutter-sm q-mt-lg">

            <q-btn
              color="primary"
              unelevated
              icon="search"
              label="Search Vehicles"
              @click="goTo('/customer/search-vehicle')"
            />

            <q-btn
              outline
              color="primary"
              icon="help_outline"
              label="View FAQ"
              @click="goTo('/customer/faq')"
            />

          </div>

        </div>

        <div class="col-12 col-md-4">

          <div class="hero-illustration">
            <q-icon
              name="directions_car"
              size="110px"
              color="primary"
            />

            <div class="illustration-text">
              Easy • Reliable • Convenient
            </div>
          </div>

        </div>

      </div>
    </q-card>

    <!-- =====================================================
         SEARCH EMPTY STATE
    ====================================================== -->
    <q-card
      v-if="filteredSections.length === 0"
      flat
      bordered
      class="empty-card q-mb-lg"
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

    <!-- =====================================================
         ABOUT SECTIONS
    ====================================================== -->
    <div
      v-for="section in filteredSections"
      :key="section.id"
      :id="section.id"
      class="about-section"
    >

      <q-card
        flat
        bordered
        class="section-card"
      >

        <!-- Section Header -->
        <div class="section-header row items-center no-wrap">

          <q-avatar
            color="blue-1"
            text-color="primary"
            :icon="section.icon"
            size="44px"
          />

          <div class="q-ml-md">
            <div class="text-h6 text-weight-bold">
              {{ section.title }}
            </div>
          </div>

        </div>

        <!-- Section Content -->
        <div class="section-content">

          <p
            v-for="(paragraph, index) in section.content"
            :key="index"
            class="about-paragraph"
          >
            {{ paragraph }}
          </p>

          <ul
            v-if="section.points && section.points.length"
            class="about-list"
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

    <!-- =====================================================
         WHY CHOOSE BATOHIDRIVE
    ====================================================== -->
    <div class="text-h6 text-weight-bold q-mt-xl q-mb-md">
      Why Choose BatohiDrive?
    </div>

    <div class="row q-col-gutter-md">

      <!-- Easy Booking -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card
          flat
          bordered
          class="feature-card"
        >
          <q-card-section class="text-center">

            <q-avatar
              color="blue-1"
              text-color="primary"
              icon="touch_app"
              size="52px"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Easy Booking
            </div>

            <div class="text-grey-7 q-mt-sm">
              Find and book a suitable vehicle through a simple
              booking experience.
            </div>

          </q-card-section>
        </q-card>
      </div>

      <!-- Vehicle Choices -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card
          flat
          bordered
          class="feature-card"
        >
          <q-card-section class="text-center">

            <q-avatar
              color="blue-1"
              text-color="primary"
              icon="directions_car"
              size="52px"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Vehicle Choices
            </div>

            <div class="text-grey-7 q-mt-sm">
              Explore available vehicles based on your travel
              requirements.
            </div>

          </q-card-section>
        </q-card>
      </div>

      <!-- Reliable Service -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card
          flat
          bordered
          class="feature-card"
        >
          <q-card-section class="text-center">

            <q-avatar
              color="blue-1"
              text-color="primary"
              icon="verified"
              size="52px"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Reliable Service
            </div>

            <div class="text-grey-7 q-mt-sm">
              We aim to provide a dependable and transparent
              vehicle booking experience.
            </div>

          </q-card-section>
        </q-card>
      </div>

      <!-- Customer Support -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card
          flat
          bordered
          class="feature-card"
        >
          <q-card-section class="text-center">

            <q-avatar
              color="blue-1"
              text-color="primary"
              icon="support_agent"
              size="52px"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-md">
              Customer Support
            </div>

            <div class="text-grey-7 q-mt-sm">
              Get assistance when you need help with your booking
              or account.
            </div>

          </q-card-section>
        </q-card>
      </div>

    </div>

    <!-- =====================================================
         OUR COMMITMENT
    ====================================================== -->
    <q-card
      flat
      bordered
      class="commitment-card q-mt-lg"
    >

      <div class="row items-center">

        <div class="col-12 col-md-8">

          <div class="text-h6 text-weight-bold">
            Our Commitment
          </div>

          <div class="commitment-text q-mt-md">
            We are committed to continuously improving BatohiDrive
            and creating a better experience for customers, drivers
            and service partners. Our goal is to make vehicle booking
            more accessible, transparent and convenient.
          </div>

          <div class="row q-gutter-md q-mt-md">

            <div class="commitment-item">
              <q-icon
                name="check_circle"
                color="positive"
                size="20px"
              />
              <span>Customer-focused service</span>
            </div>

            <div class="commitment-item">
              <q-icon
                name="check_circle"
                color="positive"
                size="20px"
              />
              <span>Transparent experience</span>
            </div>

            <div class="commitment-item">
              <q-icon
                name="check_circle"
                color="positive"
                size="20px"
              />
              <span>Continuous improvement</span>
            </div>

          </div>

        </div>

        <div class="col-12 col-md-4">

          <div class="commitment-icon">
            <q-icon
              name="handshake"
              size="80px"
              color="primary"
            />
          </div>

        </div>

      </div>

    </q-card>

    <!-- =====================================================
         CONTACT US
    ====================================================== -->
    <q-card
      flat
      bordered
      class="contact-card q-mt-lg"
    >

      <div class="row items-center justify-between">

        <div class="row items-center">

          <q-avatar
            color="blue-1"
            text-color="primary"
            icon="support_agent"
            size="52px"
          />

          <div class="q-ml-md">

            <div class="text-subtitle1 text-weight-bold">
              Have Questions?
            </div>

            <div class="text-grey-7 q-mt-xs">
              Our support team is here to help you with your
              BatohiDrive experience.
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

    <!-- =====================================================
         RELATED INFORMATION
    ====================================================== -->
    <div class="text-h6 text-weight-bold q-mt-xl q-mb-md">
      More Information
    </div>

    <div class="row q-col-gutter-md">

      <!-- FAQ -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="related-card"
          clickable
          @click="goTo('/customer/faq')"
        >

          <q-card-section>

            <q-icon
              name="help_outline"
              size="32px"
              color="primary"
            />

            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              FAQ
            </div>

            <div class="text-grey-7 q-mt-xs">
              Find answers to frequently asked questions.
            </div>

          </q-card-section>

        </q-card>

      </div>

      <!-- Terms -->
      <div class="col-12 col-sm-6 col-md-3">

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
              Review the terms for using BatohiDrive.
            </div>

          </q-card-section>

        </q-card>

      </div>

      <!-- Privacy -->
      <div class="col-12 col-sm-6 col-md-3">

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
              Learn how your information is protected.
            </div>

          </q-card-section>

        </q-card>

      </div>

      <!-- Cancellation -->
      <div class="col-12 col-sm-6 col-md-3">

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
              Understand cancellation rules and charges.
            </div>

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

// =====================================================
// SEARCH
// =====================================================

const search = ref('')

// =====================================================
// ABOUT US CONTENT
// =====================================================

const sections = ref([
  {
    id: 'who-we-are',
    title: 'Who We Are',
    icon: 'groups',

    content: [
      'BatohiDrive is a digital vehicle booking platform created to simplify the process of finding and booking vehicles for customers.',
      'Our platform brings customers, drivers and vehicle service partners together through a convenient and easy-to-use online experience.'
    ],

    points: [
      'Simple vehicle discovery',
      'Convenient online booking',
      'Customer-focused service',
      'Digital booking management'
    ]
  },

  {
    id: 'our-mission',
    title: 'Our Mission',
    icon: 'flag',

    content: [
      'Our mission is to make vehicle booking simple, accessible and convenient for everyone.',
      'We aim to reduce the complexity involved in finding suitable vehicles and managing bookings while providing a transparent customer experience.'
    ],

    points: [
      'Make vehicle booking easier',
      'Provide a simple digital experience',
      'Support customers throughout their booking journey',
      'Continuously improve our platform'
    ]
  },

  {
    id: 'our-vision',
    title: 'Our Vision',
    icon: 'visibility',

    content: [
      'Our vision is to build a trusted and user-friendly vehicle booking platform that customers can rely on for their transportation needs.',
      'We want BatohiDrive to become a convenient platform where customers can discover vehicles, make bookings and manage their travel requirements with confidence.'
    ],

    points: [
      'Build customer trust',
      'Improve digital vehicle booking',
      'Create a reliable service ecosystem',
      'Deliver a better booking experience'
    ]
  },

  {
    id: 'what-we-offer',
    title: 'What We Offer',
    icon: 'local_offer',

    content: [
      'BatohiDrive provides a platform where customers can explore available vehicles and make bookings according to their requirements.',
      'The available services and vehicle options may vary depending on location, availability and service partners.'
    ],

    points: [
      'Vehicle search',
      'Vehicle details and availability',
      'Online booking',
      'Booking management',
      'Customer support',
      'Service and booking information'
    ]
  },

  {
    id: 'how-it-works',
    title: 'How BatohiDrive Works',
    icon: 'route',

    content: [
      'Using BatohiDrive is designed to be straightforward. Customers can search for available vehicles, review vehicle information and proceed with a booking when they find a suitable option.',
      'After a booking is confirmed, customers can manage their booking and access relevant information through their account.'
    ],

    points: [
      'Search for a vehicle',
      'Review vehicle details',
      'Select your preferred option',
      'Complete the booking process',
      'Manage your booking from your account'
    ]
  },

  {
    id: 'safety-reliability',
    title: 'Safety & Reliability',
    icon: 'verified_user',

    content: [
      'We understand that reliability is important when choosing a vehicle booking service.',
      'BatohiDrive aims to provide customers with clear booking information and a dependable platform experience while working with service partners.'
    ],

    points: [
      'Clear booking information',
      'Transparent policies',
      'Secure account access',
      'Support for booking-related concerns'
    ]
  },

  {
    id: 'customer-first',
    title: 'Customer First',
    icon: 'favorite',

    content: [
      'Customers are at the centre of the BatohiDrive experience. We aim to make every stage of the booking journey as simple and transparent as possible.',
      'Feedback from customers helps us understand what can be improved and allows us to continue developing our services.'
    ],

    points: [
      'Simple user experience',
      'Clear information',
      'Responsive support',
      'Continuous improvement based on feedback'
    ]
  },

  {
    id: 'our-commitment',
    title: 'Our Commitment',
    icon: 'handshake',

    content: [
      'We are committed to continuously improving our platform and providing a better experience for customers, drivers and service partners.',
      'As BatohiDrive grows, we will continue working toward better technology, better service and greater convenience.'
    ],

    points: [
      'Improve platform usability',
      'Enhance customer experience',
      'Support service partners',
      'Maintain transparent communication'
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
// ROUTING
// =====================================================

const goTo = (route) => {
  router.push(route)
}

// =====================================================
// CONTACT SUPPORT
// =====================================================

const contactSupport = () => {
  router.push('/customer/support')
}
</script>

<style scoped>
/* =====================================================
   PAGE
===================================================== */

.about-us-page {
  min-height: 100vh;
  background: #f7f8fa;
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
   HERO
===================================================== */

.hero-card {
  padding: 28px;
  border-radius: 16px;
  background: #ffffff;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 7px 12px;
  border-radius: 20px;

  background: #e3f2fd;
  color: #1976d2;

  font-size: 13px;
  font-weight: 600;
}

.hero-text {
  max-width: 760px;
  color: #555;
  line-height: 1.8;
  font-size: 15px;
}

.hero-illustration {
  min-height: 220px;
  border-radius: 16px;

  background: #f5f9ff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-left: 20px;
}

.illustration-text {
  margin-top: 10px;
  color: #1976d2;
  font-size: 14px;
  font-weight: 600;
}

/* =====================================================
   EMPTY
===================================================== */

.empty-card {
  min-height: 280px;
  border-radius: 14px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}

/* =====================================================
   ABOUT SECTIONS
===================================================== */

.about-section {
  scroll-margin-top: 25px;
  margin-bottom: 16px;
}

.section-card {
  border-radius: 14px;
  background: #ffffff;
}

.section-header {
  padding: 20px;
  border-bottom: 1px solid #eeeeee;
}

.section-content {
  padding: 20px;

  color: #555;
  line-height: 1.75;
}

.about-paragraph {
  margin: 0 0 12px;
}

.about-paragraph:last-child {
  margin-bottom: 0;
}

.about-list {
  margin-top: 12px;
  padding-left: 22px;
}

.about-list li {
  margin-bottom: 8px;
}

/* =====================================================
   FEATURES
===================================================== */

.feature-card {
  height: 100%;
  border-radius: 14px;
  background: #ffffff;

  transition: all 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08);
}

/* =====================================================
   COMMITMENT
===================================================== */

.commitment-card {
  padding: 24px;
  border-radius: 14px;
  background: #ffffff;
}

.commitment-text {
  color: #555;
  line-height: 1.75;
}

.commitment-item {
  display: flex;
  align-items: center;
  gap: 7px;

  color: #555;
  font-size: 14px;
}

.commitment-icon {
  min-height: 180px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;
  background: #f5f9ff;
}

/* =====================================================
   CONTACT
===================================================== */

.contact-card {
  padding: 20px;
  border-radius: 14px;
  background: #ffffff;
}

/* =====================================================
   RELATED
===================================================== */

.related-card {
  height: 100%;
  border-radius: 14px;
  background: #ffffff;

  cursor: pointer;

  transition: all 0.2s ease;
}

.related-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08);
}

/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 768px) {

  .about-us-page {
    padding: 12px !important;
  }

  .page-header .text-h5 {
    font-size: 20px;
  }

  .hero-card {
    padding: 18px;
  }

  .hero-card .text-h4 {
    font-size: 28px;
  }

  .hero-illustration {
    margin-left: 0;
    margin-top: 20px;
    min-height: 160px;
  }

  .section-header {
    padding: 16px;
  }

  .section-content {
    padding: 16px;
  }

  .commitment-card {
    padding: 18px;
  }

  .commitment-icon {
    margin-top: 20px;
    min-height: 140px;
  }

  .contact-card {
    padding: 16px;
  }

  .contact-card .row {
    align-items: flex-start;
  }
}
</style>
