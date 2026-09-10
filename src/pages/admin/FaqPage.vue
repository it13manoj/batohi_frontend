<template>
  <q-page class="faq-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->

    <div class="page-header row items-center justify-between q-mb-lg">

      <div>
        <div class="page-title">
          Frequently Asked Questions
        </div>

        <div class="page-subtitle">
          Find answers to common questions about BatohiDrive
        </div>
      </div>

      <!-- ADMIN ACTION -->
      <q-btn
        color="primary"
        icon="add"
        label="Add FAQ"
        unelevated
        no-caps
        @click="addFaq"
      />

    </div>


    <!-- =====================================================
         SEARCH SECTION
    ====================================================== -->

    <q-card
      flat
      bordered
      class="search-card q-mb-lg"
    >

      <q-card-section>

        <div class="row items-center q-col-gutter-md">

          <!-- SEARCH -->
          <div class="col-12 col-md-8">

            <q-input
              v-model="searchQuery"
              outlined
              dense
              clearable
              placeholder="Search frequently asked questions..."
            >

              <template #prepend>
                <q-icon name="search" />
              </template>

            </q-input>

          </div>


          <!-- CATEGORY -->
          <div class="col-12 col-md-4">

            <q-select
              v-model="selectedCategory"
              :options="categoryOptions"
              outlined
              dense
              emit-value
              map-options
              label="Category"
            >

              <template #prepend>
                <q-icon name="category" />
              </template>

            </q-select>

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         FAQ CONTENT
    ====================================================== -->

    <div class="row q-col-gutter-lg">

      <!-- =================================================
           LEFT CATEGORY SIDEBAR
      ================================================== -->

      <div class="col-12 col-md-3">

        <q-card
          flat
          bordered
          class="category-card"
        >

          <q-card-section>

            <div class="section-title">
              Categories
            </div>

          </q-card-section>


          <q-list>

            <q-item
              v-for="category in categories"
              :key="category.value"
              clickable
              :active="
                selectedCategory === category.value
              "
              active-class="active-category"
              @click="selectedCategory = category.value"
            >

              <q-item-section avatar>

                <q-icon
                  :name="category.icon"
                  size="21px"
                />

              </q-item-section>


              <q-item-section>

                <q-item-label>
                  {{ category.label }}
                </q-item-label>

              </q-item-section>


              <q-item-section side>

                <q-badge
                  color="grey-3"
                  text-color="grey-8"
                  rounded
                >
                  {{ getCategoryCount(category.value) }}
                </q-badge>

              </q-item-section>

            </q-item>

          </q-list>

        </q-card>

      </div>


      <!-- =================================================
           FAQ LIST
      ================================================== -->

      <div class="col-12 col-md-9">

        <q-card
          flat
          bordered
          class="faq-card"
        >

          <!-- CARD HEADER -->
          <q-card-section
            class="faq-card-header"
          >

            <div>

              <div class="section-title">
                Common Questions
              </div>

              <div class="text-caption text-grey-6 q-mt-xs">
                {{ filteredFaqs.length }} questions found
              </div>

            </div>

          </q-card-section>


          <q-separator />


          <!-- FAQ LIST -->
          <q-list separator>

            <template
              v-if="filteredFaqs.length"
            >

              <q-expansion-item
                v-for="faq in filteredFaqs"
                :key="faq.id"
                expand-separator
                class="faq-item"
              >

                <!-- QUESTION -->
                <template #header>

                  <q-item-section avatar>

                    <q-avatar
                      color="blue-1"
                      text-color="primary"
                      size="38px"
                    >
                      <q-icon
                        name="help_outline"
                        size="20px"
                      />
                    </q-avatar>

                  </q-item-section>


                  <q-item-section>

                    <q-item-label
                      class="faq-question"
                    >
                      {{ faq.question }}
                    </q-item-label>

                    <q-item-label
                      caption
                      class="q-mt-xs"
                    >
                      {{ faq.category }}
                    </q-item-label>

                  </q-item-section>


                  <!-- ADMIN ACTIONS -->
                  <q-item-section
                    side
                    @click.stop
                  >

                    <div class="row items-center">

                      <q-btn
                        flat
                        round
                        dense
                        icon="edit"
                        color="primary"
                        @click.stop="editFaq(faq)"
                      >
                        <q-tooltip>
                          Edit FAQ
                        </q-tooltip>
                      </q-btn>


                      <q-btn
                        flat
                        round
                        dense
                        icon="delete"
                        color="negative"
                        @click.stop="deleteFaq(faq)"
                      >
                        <q-tooltip>
                          Delete FAQ
                        </q-tooltip>
                      </q-btn>

                    </div>

                  </q-item-section>

                </template>


                <!-- ANSWER -->
                <q-card>

                  <q-card-section
                    class="faq-answer"
                  >

                    {{ faq.answer }}

                  </q-card-section>

                </q-card>

              </q-expansion-item>

            </template>


            <!-- =================================================
                 NO RESULT
            ================================================== -->

            <div
              v-else
              class="empty-state"
            >

              <q-icon
                name="search_off"
                size="60px"
                color="grey-5"
              />

              <div class="text-h6 q-mt-md">
                No FAQs Found
              </div>

              <div class="text-grey-6 q-mt-xs">
                Try changing your search or category.
              </div>

              <q-btn
                flat
                color="primary"
                label="Clear Filters"
                no-caps
                class="q-mt-md"
                @click="clearFilters"
              />

            </div>

          </q-list>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         SUPPORT SECTION
    ====================================================== -->

    <q-card
      flat
      bordered
      class="support-card q-mt-lg"
    >

      <q-card-section>

        <div class="row items-center">

          <q-avatar
            color="blue-1"
            text-color="primary"
            size="52px"
          >

            <q-icon
              name="support_agent"
              size="28px"
            />

          </q-avatar>


          <div class="q-ml-md">

            <div class="text-subtitle1 text-weight-bold">
              Still need help?
            </div>

            <div class="text-grey-6">
              Contact the BatohiDrive support team for assistance.
            </div>

          </div>


          <q-space />


          <q-btn
            outline
            color="primary"
            icon="mail"
            label="Contact Support"
            no-caps
            @click="contactSupport"
          />

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         ADD / EDIT FAQ DIALOG
    ====================================================== -->

    <q-dialog v-model="showFaqDialog">

      <q-card
        style="width: 600px; max-width: 95vw"
      >

        <!-- DIALOG HEADER -->
        <q-card-section
          class="row items-center"
        >

          <div class="text-h6 text-weight-bold">
            {{ editingFaq ? 'Edit FAQ' : 'Add FAQ' }}
          </div>

          <q-space />

          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
          />

        </q-card-section>


        <q-separator />


        <!-- FORM -->
        <q-card-section>

          <!-- QUESTION -->
          <q-input
            v-model="faqForm.question"
            outlined
            label="Question"
            placeholder="Enter FAQ question"
            class="q-mb-md"
          />


          <!-- CATEGORY -->
          <q-select
            v-model="faqForm.category"
            :options="categoryOptions.filter(
              item => item.value !== 'all'
            )"
            outlined
            emit-value
            map-options
            label="Category"
            class="q-mb-md"
          />


          <!-- ANSWER -->
          <q-input
            v-model="faqForm.answer"
            outlined
            type="textarea"
            autogrow
            label="Answer"
            placeholder="Enter FAQ answer"
          />

        </q-card-section>


        <q-separator />


        <!-- ACTIONS -->
        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            label="Cancel"
            color="grey-7"
            no-caps
            v-close-popup
          />

          <q-btn
            unelevated
            label="Save FAQ"
            color="primary"
            no-caps
            @click="saveFaq"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>

import {
  ref,
  computed
} from 'vue'

import {
  useQuasar
} from 'quasar'


// ======================================================
// QUASAR
// ======================================================

const $q = useQuasar()


// ======================================================
// SEARCH
// ======================================================

const searchQuery = ref('')

const selectedCategory = ref('all')


// ======================================================
// DIALOG
// ======================================================

const showFaqDialog = ref(false)

const editingFaq = ref(null)


// ======================================================
// CATEGORY OPTIONS
// ======================================================

const categoryOptions = [

  {
    label: 'All Categories',
    value: 'all'
  },

  {
    label: 'Bookings',
    value: 'Bookings'
  },

  {
    label: 'Vehicles',
    value: 'Vehicles'
  },

  {
    label: 'Payments',
    value: 'Payments'
  },

  {
    label: 'Drivers',
    value: 'Drivers'
  },

  {
    label: 'Account',
    value: 'Account'
  },

  {
    label: 'Cancellation',
    value: 'Cancellation'
  }

]


// ======================================================
// CATEGORY SIDEBAR
// ======================================================

const categories = [

  {
    label: 'All Questions',
    value: 'all',
    icon: 'apps'
  },

  {
    label: 'Bookings',
    value: 'Bookings',
    icon: 'event'
  },

  {
    label: 'Vehicles',
    value: 'Vehicles',
    icon: 'directions_car'
  },

  {
    label: 'Payments',
    value: 'Payments',
    icon: 'payments'
  },

  {
    label: 'Drivers',
    value: 'Drivers',
    icon: 'local_taxi'
  },

  {
    label: 'Account',
    value: 'Account',
    icon: 'person'
  },

  {
    label: 'Cancellation',
    value: 'Cancellation',
    icon: 'event_busy'
  }

]


// ======================================================
// FAQ DATA
// ======================================================

const faqs = ref([

  {
    id: 1,

    question:
      'How can a customer book a vehicle?',

    answer:
      'Customers can search for an available vehicle, select the required vehicle, enter their booking details and complete the payment process to confirm the booking.',

    category: 'Bookings'
  },


  {
    id: 2,

    question:
      'How can an agent add a new vehicle?',

    answer:
      'An agent can open the Vehicles section from the Agent Panel and select Add Vehicle. After entering the vehicle details, documents and required information, the vehicle can be submitted for approval.',

    category: 'Vehicles'
  },


  {
    id: 3,

    question:
      'How can I check booking payment status?',

    answer:
      'Payment status can be checked from the booking details or Payments section. The system displays whether the payment is pending, successful, failed or refunded.',

    category: 'Payments'
  },


  {
    id: 4,

    question:
      'How are drivers assigned to vehicles?',

    answer:
      'Authorized agents or administrators can assign an available driver to an eligible vehicle or booking from the respective management section.',

    category: 'Drivers'
  },


  {
    id: 5,

    question:
      'How can I update my profile information?',

    answer:
      'Open the Profile section from your panel, update the required information and save the changes.',

    category: 'Account'
  },


  {
    id: 6,

    question:
      'Can a booking be cancelled?',

    answer:
      'Yes. A booking can be cancelled according to the applicable cancellation policy. Any applicable cancellation charges or refund amount depend on the cancellation terms.',

    category: 'Cancellation'
  },


  {
    id: 7,

    question:
      'What happens after a booking is confirmed?',

    answer:
      'After confirmation, the booking details are stored in the system and the relevant customer, agent and driver information can be managed through their respective panels.',

    category: 'Bookings'
  },


  {
    id: 8,

    question:
      'How can an admin manage vehicles?',

    answer:
      'Administrators can manage registered vehicles from the Vehicles section, including reviewing vehicle information and managing vehicle records.',

    category: 'Vehicles'
  },


  {
    id: 9,

    question:
      'What payment methods are supported?',

    answer:
      'Available payment methods depend on the payment gateway configured for BatohiDrive. Customers can select an available payment method during checkout.',

    category: 'Payments'
  },


  {
    id: 10,

    question:
      'What should I do if I have a problem with my account?',

    answer:
      'If you experience an account-related problem, verify your account information first. If the issue continues, contact BatohiDrive support for assistance.',

    category: 'Account'
  }

])


// ======================================================
// FAQ FORM
// ======================================================

const faqForm = ref({

  question: '',

  category: 'Bookings',

  answer: ''

})


// ======================================================
// FILTERED FAQS
// ======================================================

const filteredFaqs = computed(() => {

  const query =
    searchQuery.value
      .trim()
      .toLowerCase()


  return faqs.value.filter(faq => {

    const matchesCategory =
      selectedCategory.value === 'all' ||
      faq.category === selectedCategory.value


    const matchesSearch =
      !query ||
      faq.question
        .toLowerCase()
        .includes(query) ||
      faq.answer
        .toLowerCase()
        .includes(query) ||
      faq.category
        .toLowerCase()
        .includes(query)


    return (
      matchesCategory &&
      matchesSearch
    )

  })

})


// ======================================================
// CATEGORY COUNT
// ======================================================

function getCategoryCount(category) {

  if (category === 'all') {

    return faqs.value.length

  }

  return faqs.value.filter(
    faq => faq.category === category
  ).length

}


// ======================================================
// CLEAR FILTERS
// ======================================================

function clearFilters() {

  searchQuery.value = ''

  selectedCategory.value = 'all'

}


// ======================================================
// ADD FAQ
// ======================================================

function addFaq() {

  editingFaq.value = null

  faqForm.value = {

    question: '',

    category: 'Bookings',

    answer: ''

  }

  showFaqDialog.value = true

}


// ======================================================
// EDIT FAQ
// ======================================================

function editFaq(faq) {

  editingFaq.value = faq

  faqForm.value = {

    question: faq.question,

    category: faq.category,

    answer: faq.answer

  }

  showFaqDialog.value = true

}


// ======================================================
// SAVE FAQ
// ======================================================

function saveFaq() {

  if (!faqForm.value.question.trim()) {

    $q.notify({

      type: 'negative',

      message:
        'Please enter the FAQ question.'

    })

    return

  }


  if (!faqForm.value.answer.trim()) {

    $q.notify({

      type: 'negative',

      message:
        'Please enter the FAQ answer.'

    })

    return

  }


  if (editingFaq.value) {

    editingFaq.value.question =
      faqForm.value.question

    editingFaq.value.category =
      faqForm.value.category

    editingFaq.value.answer =
      faqForm.value.answer


    $q.notify({

      type: 'positive',

      message:
        'FAQ updated successfully.'

    })

  } else {

    faqs.value.push({

      id:
        Date.now(),

      question:
        faqForm.value.question,

      category:
        faqForm.value.category,

      answer:
        faqForm.value.answer

    })


    $q.notify({

      type: 'positive',

      message:
        'FAQ added successfully.'

    })

  }


  showFaqDialog.value = false

}


// ======================================================
// DELETE FAQ
// ======================================================

function deleteFaq(faq) {

  $q.dialog({

    title: 'Delete FAQ',

    message:
      'Are you sure you want to delete this FAQ?',

    cancel: {

      label: 'Cancel',

      flat: true

    },

    ok: {

      label: 'Delete',

      color: 'negative',

      unelevated: true

    },

    persistent: true

  }).onOk(() => {

    const index =
      faqs.value.findIndex(
        item => item.id === faq.id
      )


    if (index !== -1) {

      faqs.value.splice(index, 1)

    }


    $q.notify({

      type: 'positive',

      message:
        'FAQ deleted successfully.'

    })

  })

}


// ======================================================
// CONTACT SUPPORT
// ======================================================

function contactSupport() {

  $q.notify({

    type: 'info',

    message:
      'Support contact functionality will be connected soon.'

  })

}

</script>


<style scoped>

/* ======================================================
   PAGE
====================================================== */

.faq-page {

  background: #f5f7fb;

  min-height: 100vh;

}


/* ======================================================
   PAGE HEADER
====================================================== */

.page-header {

  padding: 8px 4px;

}


.page-title {

  font-size: 25px;

  font-weight: 700;

  color: #1f2937;

}


.page-subtitle {

  font-size: 14px;

  color: #6b7280;

  margin-top: 5px;

}


/* ======================================================
   SEARCH CARD
====================================================== */

.search-card {

  background: #ffffff;

  border-radius: 12px;

}


/* ======================================================
   CATEGORY CARD
====================================================== */

.category-card {

  background: #ffffff;

  border-radius: 12px;

  overflow: hidden;

}


.section-title {

  font-size: 17px;

  font-weight: 700;

  color: #1f2937;

}


.category-card .q-item {

  min-height: 48px;

  color: #4b5563;

  margin: 2px 8px;

  border-radius: 8px;

}


.category-card .q-item:hover {

  background: #f1f5f9;

}


.active-category {

  background: #e8f1ff !important;

  color: #1976d2 !important;

  font-weight: 600;

}


/* ======================================================
   FAQ CARD
====================================================== */

.faq-card {

  background: #ffffff;

  border-radius: 12px;

  overflow: hidden;

}


.faq-card-header {

  padding: 18px 20px;

}


/* ======================================================
   FAQ ITEM
====================================================== */

.faq-item {

  transition: 0.2s ease;

}


.faq-item:hover {

  background: #fafafa;

}


.faq-question {

  font-size: 15px;

  font-weight: 600;

  color: #1f2937;

}


.faq-answer {

  color: #4b5563;

  font-size: 14px;

  line-height: 1.7;

  padding-left: 72px;

  padding-right: 30px;

  background: #fafbfc;

}


/* ======================================================
   EMPTY STATE
====================================================== */

.empty-state {

  text-align: center;

  padding: 70px 20px;

}


/* ======================================================
   SUPPORT
====================================================== */

.support-card {

  background: #ffffff;

  border-radius: 12px;

}


.support-card .q-card-section {

  padding: 20px;

}


/* ======================================================
   RESPONSIVE
====================================================== */

@media (max-width: 768px) {

  .faq-page {

    padding: 12px !important;

  }


  .page-header {

    align-items: flex-start;

    gap: 15px;

  }


  .page-title {

    font-size: 21px;

  }


  .support-card .row {

    gap: 15px;

  }


  .support-card .q-space {

    display: none;

  }


  .faq-answer {

    padding-left: 20px;

    padding-right: 20px;

  }

}

</style>
