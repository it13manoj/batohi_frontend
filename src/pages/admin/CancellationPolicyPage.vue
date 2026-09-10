```vue
<template>
  <q-page class="cancellation-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Cancellation Policy
        </div>

        <div class="text-grey-7 q-mt-xs">
          Manage cancellation and refund policies for BatohiDrive bookings
        </div>
      </div>

      <div class="row q-gutter-sm">

        <q-btn
          outline
          color="primary"
          icon="visibility"
          label="Preview"
          @click="openPreview"
        />

        <q-btn
          color="primary"
          icon="save"
          label="Save Changes"
          unelevated
          @click="savePolicy"
        />

      </div>

    </div>


    <!-- =====================================================
         POLICY SETTINGS
    ====================================================== -->
    <q-card flat bordered class="q-mb-md">

      <q-card-section>

        <div class="text-subtitle1 text-weight-bold q-mb-md">
          Policy Settings
        </div>

        <div class="row q-col-gutter-md">

          <!-- CANCELLATION WINDOW -->
          <div class="col-12 col-md-4">

            <q-input
              v-model.number="policySettings.freeCancellationHours"
              outlined
              type="number"
              label="Free Cancellation Hours"
              hint="Hours before pickup"
            >
              <template #prepend>
                <q-icon name="schedule" />
              </template>
            </q-input>

          </div>


          <!-- REFUND PERCENTAGE -->
          <div class="col-12 col-md-4">

            <q-input
              v-model.number="policySettings.refundPercentage"
              outlined
              type="number"
              label="Refund Percentage"
              suffix="%"
              min="0"
              max="100"
            >
              <template #prepend>
                <q-icon name="currency_rupee" />
              </template>
            </q-input>

          </div>


          <!-- PROCESSING FEE -->
          <div class="col-12 col-md-4">

            <q-input
              v-model.number="policySettings.processingFee"
              outlined
              type="number"
              label="Cancellation Processing Fee"
              suffix="%"
              min="0"
              max="100"
            >
              <template #prepend>
                <q-icon name="percent" />
              </template>
            </q-input>

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         SEARCH + ADD
    ====================================================== -->
    <q-card flat bordered class="q-mb-md">

      <q-card-section>

        <div class="row items-center q-col-gutter-md">

          <div class="col-12 col-md-8">

            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search cancellation policy..."
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>

          </div>


          <div class="col-12 col-md-4 text-right">

            <q-btn
              color="primary"
              icon="add"
              label="Add Section"
              unelevated
              @click="openAddDialog"
            />

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         POLICY SECTIONS
    ====================================================== -->
    <div class="row q-col-gutter-md">

      <div
        v-for="(section, index) in filteredSections"
        :key="section.id"
        class="col-12"
      >

        <q-card
          flat
          bordered
          class="policy-card"
        >

          <!-- SECTION HEADER -->
          <q-card-section>

            <div class="row items-center justify-between">

              <div class="row items-center">

                <q-avatar
                  color="primary"
                  text-color="white"
                  size="42px"
                >
                  {{ index + 1 }}
                </q-avatar>

                <div class="q-ml-md">

                  <div class="text-subtitle1 text-weight-bold">
                    {{ section.title }}
                  </div>

                  <div class="text-caption text-grey-6">
                    Last updated: {{ section.updatedAt }}
                  </div>

                </div>

              </div>


              <!-- ACTIONS -->
              <div class="row items-center q-gutter-xs">

                <q-chip
                  dense
                  :color="section.active ? 'positive' : 'grey'"
                  text-color="white"
                >
                  {{ section.active ? 'Active' : 'Inactive' }}
                </q-chip>

                <q-btn
                  flat
                  round
                  dense
                  icon="edit"
                  color="primary"
                  @click="openEditDialog(section)"
                >
                  <q-tooltip>
                    Edit Section
                  </q-tooltip>
                </q-btn>

                <q-btn
                  flat
                  round
                  dense
                  icon="delete"
                  color="negative"
                  @click="deleteSection(section)"
                >
                  <q-tooltip>
                    Delete Section
                  </q-tooltip>
                </q-btn>

              </div>

            </div>

          </q-card-section>


          <q-separator />


          <!-- SECTION CONTENT -->
          <q-card-section>

            <div
              class="policy-content"
              v-html="section.content"
            />

          </q-card-section>


          <q-separator />


          <!-- FOOTER -->
          <q-card-actions align="right">

            <q-toggle
              v-model="section.active"
              color="primary"
              label="Active"
            />

          </q-card-actions>

        </q-card>

      </div>


      <!-- ===================================================
           EMPTY STATE
      ==================================================== -->
      <div
        v-if="filteredSections.length === 0"
        class="col-12"
      >

        <q-card flat bordered>

          <q-card-section class="text-center q-pa-xl">

            <q-icon
              name="event_busy"
              size="60px"
              color="grey-5"
            />

            <div class="text-h6 q-mt-md">
              No Cancellation Policy Sections Found
            </div>

            <div class="text-grey-6 q-mt-sm">
              Try another search or add a new section.
            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         ADD / EDIT DIALOG
    ====================================================== -->
    <q-dialog v-model="showDialog">

      <q-card
        style="width: 850px; max-width: 95vw;"
      >

        <!-- DIALOG HEADER -->
        <q-card-section class="row items-center justify-between">

          <div>

            <div class="text-h6 text-weight-bold">
              {{ isEditing ? 'Edit Section' : 'Add Section' }}
            </div>

            <div class="text-caption text-grey-6">
              Manage cancellation policy content
            </div>

          </div>

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

          <div class="q-gutter-md">

            <!-- TITLE -->
            <q-input
              v-model="form.title"
              outlined
              label="Section Title"
              placeholder="Enter section title"
              :rules="[
                val => !!val || 'Section title is required'
              ]"
            />


            <!-- CONTENT -->
            <q-editor
              v-model="form.content"
              min-height="300px"
              :toolbar="[
                [
                  'bold',
                  'italic',
                  'underline',
                  'strike'
                ],
                [
                  'quote',
                  'unordered',
                  'ordered'
                ],
                [
                  'undo',
                  'redo'
                ],
                [
                  'link'
                ]
              ]"
            />


            <!-- ACTIVE -->
            <q-toggle
              v-model="form.active"
              color="primary"
              label="Active Section"
            />

          </div>

        </q-card-section>


        <q-separator />


        <!-- DIALOG ACTIONS -->
        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            label="Cancel"
            color="grey-7"
            v-close-popup
          />

          <q-btn
            color="primary"
            :label="isEditing ? 'Update Section' : 'Add Section'"
            unelevated
            @click="saveSection"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- =====================================================
         PREVIEW DIALOG
    ====================================================== -->
    <q-dialog
      v-model="showPreview"
      maximized
    >

      <q-card>

        <!-- PREVIEW HEADER -->
        <q-header
          bordered
          class="bg-white text-dark"
        >

          <q-toolbar>

            <q-toolbar-title>
              Cancellation Policy Preview
            </q-toolbar-title>

            <q-btn
              flat
              round
              dense
              icon="close"
              v-close-popup
            />

          </q-toolbar>

        </q-header>


        <!-- PREVIEW -->
        <q-page-container>

          <q-page class="preview-page">

            <div class="preview-container">

              <!-- TITLE -->
              <div class="text-h4 text-weight-bold text-center q-mb-sm">
                Cancellation Policy
              </div>

              <div class="text-center text-grey-6 q-mb-xl">
                BatohiDrive
              </div>


              <!-- POLICY SUMMARY -->
              <q-card
                flat
                bordered
                class="q-mb-xl"
              >

                <q-card-section>

                  <div class="text-subtitle1 text-weight-bold q-mb-md">
                    Cancellation Summary
                  </div>

                  <div class="row q-col-gutter-md">

                    <div class="col-12 col-md-4">

                      <div class="text-caption text-grey-6">
                        Free Cancellation
                      </div>

                      <div class="text-subtitle1 text-weight-bold">
                        {{ policySettings.freeCancellationHours }} hours
                      </div>

                    </div>


                    <div class="col-12 col-md-4">

                      <div class="text-caption text-grey-6">
                        Refund
                      </div>

                      <div class="text-subtitle1 text-weight-bold">
                        {{ policySettings.refundPercentage }}%
                      </div>

                    </div>


                    <div class="col-12 col-md-4">

                      <div class="text-caption text-grey-6">
                        Processing Fee
                      </div>

                      <div class="text-subtitle1 text-weight-bold">
                        {{ policySettings.processingFee }}%
                      </div>

                    </div>

                  </div>

                </q-card-section>

              </q-card>


              <!-- ACTIVE SECTIONS -->
              <div
                v-for="(section, index) in activeSections"
                :key="section.id"
                class="preview-section"
              >

                <div class="text-h6 text-weight-bold q-mb-sm">
                  {{ index + 1 }}. {{ section.title }}
                </div>

                <div
                  class="policy-content"
                  v-html="section.content"
                />

              </div>


              <q-separator class="q-my-xl" />


              <div class="text-caption text-grey-6 text-center">
                Last updated: {{ getCurrentDate() }}
              </div>

            </div>

          </q-page>

        </q-page-container>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>

import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()


/* =========================================================
   SEARCH
========================================================= */

const search = ref('')


/* =========================================================
   DIALOG STATES
========================================================= */

const showDialog = ref(false)

const showPreview = ref(false)

const isEditing = ref(false)


/* =========================================================
   POLICY SETTINGS
========================================================= */

const policySettings = ref({

  freeCancellationHours: 24,

  refundPercentage: 100,

  processingFee: 0

})


/* =========================================================
   FORM
========================================================= */

const form = ref({

  id: null,

  title: '',

  content: '',

  active: true

})


/* =========================================================
   CANCELLATION POLICY SECTIONS
========================================================= */

const sections = ref([

  {
    id: 1,

    title: 'Introduction',

    content: `
      <p>
        BatohiDrive understands that plans can change. This
        Cancellation Policy explains the conditions under which
        users can cancel their vehicle bookings and receive refunds.
      </p>

      <p>
        Cancellation and refund eligibility may depend on the
        time remaining before the scheduled pickup.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 2,

    title: 'Free Cancellation',

    content: `
      <p>
        Users may cancel their booking without a cancellation charge
        when the cancellation is made at least
        <strong>24 hours before the scheduled pickup time</strong>.
      </p>

      <p>
        Eligible cancellations may receive a refund according to
        the applicable booking and payment terms.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 3,

    title: 'Cancellation Within 24 Hours',

    content: `
      <p>
        If a booking is cancelled less than 24 hours before the
        scheduled pickup time, a cancellation charge may apply.
      </p>

      <p>
        The amount refunded will depend on the applicable booking
        terms and the time at which the cancellation is made.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 4,

    title: 'Cancellation After Pickup Time',

    content: `
      <p>
        Cancellations made after the scheduled pickup time may be
        treated as a no-show or late cancellation.
      </p>

      <p>
        In such cases, the user may not be eligible for a refund,
        subject to the specific terms of the booking.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 5,

    title: 'Refund Policy',

    content: `
      <p>
        Where a refund is applicable, the refund will generally be
        processed to the original payment method used for the booking.
      </p>

      <p>
        The time required for the refund to appear in the user's
        account may depend on the payment provider or bank.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 6,

    title: 'Cancellation Charges',

    content: `
      <p>
        Cancellation charges may be deducted from the booking amount
        depending on the applicable cancellation period.
      </p>

      <ul>
        <li>Early cancellation may qualify for a full refund.</li>
        <li>Late cancellation may attract a cancellation charge.</li>
        <li>No-show bookings may not qualify for a refund.</li>
      </ul>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 7,

    title: 'Cancellation by BatohiDrive',

    content: `
      <p>
        In certain circumstances, BatohiDrive or the vehicle provider
        may need to cancel a booking due to vehicle availability,
        operational issues, safety concerns or other circumstances.
      </p>

      <p>
        Where applicable, users will be informed and eligible refunds
        will be processed according to the circumstances of the
        cancellation.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 8,

    title: 'Changes to Booking',

    content: `
      <p>
        If you need to change your booking instead of cancelling it,
        the availability and pricing of the requested changes may
        need to be checked.
      </p>

      <p>
        Changes may be subject to additional charges depending on
        the booking conditions.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 9,

    title: 'How to Cancel a Booking',

    content: `
      <p>
        To cancel a booking, open your booking details in the
        BatohiDrive application or website and select the
        cancellation option.
      </p>

      <p>
        Follow the instructions shown on screen to complete the
        cancellation request.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 10,

    title: 'Policy Changes',

    content: `
      <p>
        BatohiDrive may update this Cancellation Policy from time
        to time. Any changes will be published through the platform.
      </p>

      <p>
        Users are encouraged to review the cancellation terms before
        confirming a booking.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  }

])


/* =========================================================
   FILTERED SECTIONS
========================================================= */

const filteredSections = computed(() => {

  if (!search.value) {

    return sections.value

  }


  const keyword = search.value.toLowerCase()


  return sections.value.filter(section =>

    section.title
      .toLowerCase()
      .includes(keyword)

    ||

    section.content
      .toLowerCase()
      .includes(keyword)

  )

})


/* =========================================================
   ACTIVE SECTIONS
========================================================= */

const activeSections = computed(() => {

  return sections.value.filter(
    section => section.active
  )

})


/* =========================================================
   ADD SECTION
========================================================= */

function openAddDialog() {

  isEditing.value = false

  form.value = {

    id: null,

    title: '',

    content: '',

    active: true

  }

  showDialog.value = true

}


/* =========================================================
   EDIT SECTION
========================================================= */

function openEditDialog(section) {

  isEditing.value = true

  form.value = {

    id: section.id,

    title: section.title,

    content: section.content,

    active: section.active

  }

  showDialog.value = true

}


/* =========================================================
   SAVE SECTION
========================================================= */

function saveSection() {

  if (!form.value.title.trim()) {

    $q.notify({

      type: 'negative',

      message: 'Please enter section title'

    })

    return

  }


  if (!form.value.content.trim()) {

    $q.notify({

      type: 'negative',

      message: 'Please enter section content'

    })

    return

  }


  /* ================= EDIT ================= */

  if (isEditing.value) {

    const index = sections.value.findIndex(
      item => item.id === form.value.id
    )


    if (index !== -1) {

      sections.value[index] = {

        ...sections.value[index],

        title: form.value.title,

        content: form.value.content,

        active: form.value.active,

        updatedAt: getCurrentDate()

      }

    }


    $q.notify({

      type: 'positive',

      message: 'Cancellation policy section updated successfully'

    })

  }


  /* ================= ADD ================= */

  else {

    sections.value.push({

      id: Date.now(),

      title: form.value.title,

      content: form.value.content,

      active: form.value.active,

      updatedAt: getCurrentDate()

    })


    $q.notify({

      type: 'positive',

      message: 'Cancellation policy section added successfully'

    })

  }


  showDialog.value = false

}


/* =========================================================
   DELETE SECTION
========================================================= */

function deleteSection(section) {

  $q.dialog({

    title: 'Delete Section',

    message:
      `Are you sure you want to delete "${section.title}"?`,

    cancel: true,

    persistent: true

  }).onOk(() => {

    const index = sections.value.findIndex(
      item => item.id === section.id
    )


    if (index !== -1) {

      sections.value.splice(index, 1)

    }


    $q.notify({

      type: 'positive',

      message: 'Cancellation policy section deleted successfully'

    })

  })

}


/* =========================================================
   SAVE POLICY
========================================================= */

function savePolicy() {

  // API integration can be added here later.

  $q.notify({

    type: 'positive',

    message: 'Cancellation Policy saved successfully',

    icon: 'check_circle'

  })

}


/* =========================================================
   PREVIEW
========================================================= */

function openPreview() {

  showPreview.value = true

}


/* =========================================================
   CURRENT DATE
========================================================= */

function getCurrentDate() {

  const date = new Date()

  return date.toLocaleDateString(

    'en-GB',

    {

      day: '2-digit',

      month: 'short',

      year: 'numeric'

    }

  )

}

</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.cancellation-page {

  min-height: 100vh;

  background: #f7f8fa;

}


/* =========================================================
   POLICY CARD
========================================================= */

.policy-card {

  border-radius: 12px;

  background: #ffffff;

  transition: all 0.2s ease;

}


.policy-card:hover {

  box-shadow:
    0 4px 18px rgba(0, 0, 0, 0.07);

}


/* =========================================================
   CONTENT
========================================================= */

.policy-content {

  color: #555;

  line-height: 1.7;

  font-size: 14px;

}


.policy-content :deep(p) {

  margin-top: 0;

  margin-bottom: 12px;

}


.policy-content :deep(ul),
.policy-content :deep(ol) {

  padding-left: 25px;

}


.policy-content :deep(li) {

  margin-bottom: 6px;

}


/* =========================================================
   PREVIEW
========================================================= */

.preview-page {

  background: #f7f8fa;

  padding: 40px 20px;

}


.preview-container {

  max-width: 900px;

  margin: 0 auto;

  background: #ffffff;

  padding: 40px;

  border-radius: 12px;

}


.preview-section {

  margin-bottom: 35px;

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 600px) {

  .cancellation-page {

    padding: 12px !important;

  }


  .preview-page {

    padding: 20px 10px;

  }


  .preview-container {

    padding: 20px;

  }

}

</style>
```
