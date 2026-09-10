```vue
<template>
  <q-page class="refund-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Refund Policy
        </div>

        <div class="text-grey-7 q-mt-xs">
          Manage refund rules and refund information for BatohiDrive bookings
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
         REFUND SETTINGS
    ====================================================== -->
    <q-card flat bordered class="q-mb-md">

      <q-card-section>

        <div class="text-subtitle1 text-weight-bold q-mb-md">
          Refund Settings
        </div>

        <div class="row q-col-gutter-md">

          <!-- FULL REFUND -->
          <div class="col-12 col-md-4">

            <q-input
              v-model.number="refundSettings.fullRefundHours"
              outlined
              type="number"
              label="Full Refund Window"
              hint="Hours before pickup"
            >
              <template #prepend>
                <q-icon name="schedule" />
              </template>
            </q-input>

          </div>


          <!-- PARTIAL REFUND -->
          <div class="col-12 col-md-4">

            <q-input
              v-model.number="refundSettings.partialRefundPercentage"
              outlined
              type="number"
              label="Partial Refund"
              suffix="%"
              min="0"
              max="100"
            >
              <template #prepend>
                <q-icon name="currency_rupee" />
              </template>
            </q-input>

          </div>


          <!-- PROCESSING TIME -->
          <div class="col-12 col-md-4">

            <q-input
              v-model.number="refundSettings.processingDays"
              outlined
              type="number"
              label="Refund Processing Time"
              suffix="days"
              min="0"
            >
              <template #prepend>
                <q-icon name="update" />
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
              placeholder="Search refund policy..."
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
         REFUND POLICY SECTIONS
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
          class="refund-card"
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
              class="refund-content"
              v-html="section.content"
            />

          </q-card-section>


          <q-separator />


          <!-- SECTION FOOTER -->
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
              name="currency_rupee"
              size="60px"
              color="grey-5"
            />

            <div class="text-h6 q-mt-md">
              No Refund Policy Sections Found
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
              Manage refund policy content
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

            <!-- SECTION TITLE -->
            <q-input
              v-model="form.title"
              outlined
              label="Section Title"
              placeholder="Enter section title"
              :rules="[
                val => !!val || 'Section title is required'
              ]"
            />


            <!-- SECTION CONTENT -->
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
              Refund Policy Preview
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


        <!-- PREVIEW CONTENT -->
        <q-page-container>

          <q-page class="preview-page">

            <div class="preview-container">

              <!-- TITLE -->
              <div class="text-h4 text-weight-bold text-center q-mb-sm">
                Refund Policy
              </div>

              <div class="text-center text-grey-6 q-mb-xl">
                BatohiDrive
              </div>


              <!-- REFUND SUMMARY -->
              <q-card
                flat
                bordered
                class="q-mb-xl"
              >

                <q-card-section>

                  <div class="text-subtitle1 text-weight-bold q-mb-md">
                    Refund Summary
                  </div>

                  <div class="row q-col-gutter-md">

                    <!-- FULL REFUND -->
                    <div class="col-12 col-md-4">

                      <div class="text-caption text-grey-6">
                        Full Refund Window
                      </div>

                      <div class="text-subtitle1 text-weight-bold">
                        {{ refundSettings.fullRefundHours }} hours
                      </div>

                    </div>


                    <!-- PARTIAL REFUND -->
                    <div class="col-12 col-md-4">

                      <div class="text-caption text-grey-6">
                        Partial Refund
                      </div>

                      <div class="text-subtitle1 text-weight-bold">
                        {{ refundSettings.partialRefundPercentage }}%
                      </div>

                    </div>


                    <!-- PROCESSING -->
                    <div class="col-12 col-md-4">

                      <div class="text-caption text-grey-6">
                        Processing Time
                      </div>

                      <div class="text-subtitle1 text-weight-bold">
                        {{ refundSettings.processingDays }} days
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
                  class="refund-content"
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
   REFUND SETTINGS
========================================================= */

const refundSettings = ref({

  fullRefundHours: 24,

  partialRefundPercentage: 50,

  processingDays: 7

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
   REFUND POLICY SECTIONS
========================================================= */

const sections = ref([

  {
    id: 1,

    title: 'Introduction',

    content: `
      <p>
        BatohiDrive aims to provide a clear and transparent refund
        process for customers who cancel eligible vehicle bookings.
      </p>

      <p>
        Refund eligibility depends on the cancellation time, booking
        conditions and the reason for cancellation.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 2,

    title: 'Eligibility for Refund',

    content: `
      <p>
        A refund may be available when a booking is cancelled within
        the applicable cancellation period.
      </p>

      <ul>
        <li>The booking must be eligible for cancellation.</li>
        <li>The cancellation must be completed through the approved process.</li>
        <li>Any applicable cancellation charges may be deducted.</li>
      </ul>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 3,

    title: 'Full Refund',

    content: `
      <p>
        Customers who cancel an eligible booking at least
        <strong>24 hours before the scheduled pickup time</strong>
        may be eligible for a full refund.
      </p>

      <p>
        The actual refund amount may depend on the terms associated
        with the specific booking.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 4,

    title: 'Partial Refund',

    content: `
      <p>
        Bookings cancelled within a specified period before pickup
        may qualify for a partial refund.
      </p>

      <p>
        Applicable cancellation charges, service charges or other
        non-refundable amounts may be deducted before the refund
        is issued.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 5,

    title: 'Non-Refundable Amounts',

    content: `
      <p>
        Certain charges may be non-refundable depending on the
        booking terms.
      </p>

      <ul>
        <li>Applicable cancellation charges.</li>
        <li>Non-refundable service charges.</li>
        <li>Charges already incurred for completed services.</li>
        <li>Other charges clearly identified as non-refundable.</li>
      </ul>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 6,

    title: 'Refund Processing',

    content: `
      <p>
        Once a refund is approved, it will normally be initiated
        to the original payment method used for the booking.
      </p>

      <p>
        Refund processing may take several business days depending
        on the payment gateway, bank or financial institution.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 7,

    title: 'Refund for Booking Cancelled by BatohiDrive',

    content: `
      <p>
        If BatohiDrive or the vehicle provider cancels an eligible
        booking before the scheduled pickup time, the customer may
        be entitled to a refund according to the circumstances.
      </p>

      <p>
        Where applicable, the refund will be processed to the
        original payment method.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 8,

    title: 'Failed or Duplicate Payments',

    content: `
      <p>
        If an amount is deducted from a customer's account due to
        a failed, duplicate or unsuccessful transaction, the amount
        may be automatically reversed or refunded according to the
        payment provider's processing rules.
      </p>

      <p>
        Customers should contact support if the amount is not
        received within the expected processing period.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 9,

    title: 'Refund to Original Payment Method',

    content: `
      <p>
        Refunds will generally be issued to the same payment method
        used for the original transaction.
      </p>

      <p>
        Requests to send a refund to a different payment method may
        require additional verification and may not always be possible.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 10,

    title: 'Refund Disputes',

    content: `
      <p>
        If you believe a refund has been calculated incorrectly or
        has not been received within the expected timeframe, please
        contact BatohiDrive customer support.
      </p>

      <p>
        Please provide your booking reference and relevant payment
        details so that the transaction can be reviewed.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 11,

    title: 'Policy Changes',

    content: `
      <p>
        BatohiDrive may update this Refund Policy from time to time.
        Changes will be published through the platform.
      </p>

      <p>
        Customers should review the applicable refund terms before
        making a booking.
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
   OPEN ADD DIALOG
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
   OPEN EDIT DIALOG
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

      message: 'Refund policy section updated successfully'

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

      message: 'Refund policy section added successfully'

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

      message: 'Refund policy section deleted successfully'

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

    message: 'Refund Policy saved successfully',

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

.refund-page {

  min-height: 100vh;

  background: #f7f8fa;

}


/* =========================================================
   REFUND CARD
========================================================= */

.refund-card {

  border-radius: 12px;

  background: #ffffff;

  transition: all 0.2s ease;

}


.refund-card:hover {

  box-shadow:
    0 4px 18px rgba(0, 0, 0, 0.07);

}


/* =========================================================
   CONTENT
========================================================= */

.refund-content {

  color: #555;

  line-height: 1.7;

  font-size: 14px;

}


.refund-content :deep(p) {

  margin-top: 0;

  margin-bottom: 12px;

}


.refund-content :deep(ul),
.refund-content :deep(ol) {

  padding-left: 25px;

}


.refund-content :deep(li) {

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

  .refund-page {

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
