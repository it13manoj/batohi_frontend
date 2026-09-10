<template>
  <q-page class="terms-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Terms & Conditions
        </div>

        <div class="text-grey-7 q-mt-xs">
          Manage the terms and conditions displayed to BatohiDrive users
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
          @click="saveTerms"
        />
      </div>

    </div>


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
              placeholder="Search terms and conditions..."
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
         TERMS SECTIONS
    ====================================================== -->
    <div class="row q-col-gutter-md">

      <div
        v-for="(section, index) in filteredSections"
        :key="section.id"
        class="col-12"
      >

        <q-card flat bordered class="terms-card">

          <!-- CARD HEADER -->
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


          <!-- CONTENT -->
          <q-card-section>

            <div
              class="terms-content"
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


      <!-- EMPTY STATE -->
      <div
        v-if="filteredSections.length === 0"
        class="col-12"
      >

        <q-card flat bordered>

          <q-card-section class="text-center q-pa-xl">

            <q-icon
              name="description"
              size="60px"
              color="grey-5"
            />

            <div class="text-h6 q-mt-md">
              No Terms & Conditions Found
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
              Manage terms and conditions content
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
              :rules="[val => !!val || 'Section title is required']"
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


            <!-- STATUS -->
            <q-toggle
              v-model="form.active"
              color="primary"
              label="Active Section"
            />

          </div>

        </q-card-section>


        <q-separator />


        <!-- DIALOG ACTIONS -->
        <q-card-actions align="right" class="q-pa-md">

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
              Terms & Conditions Preview
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

              <div class="text-h4 text-weight-bold text-center q-mb-sm">
                Terms & Conditions
              </div>

              <div class="text-center text-grey-6 q-mb-xl">
                BatohiDrive
              </div>


              <div
                v-for="(section, index) in activeSections"
                :key="section.id"
                class="preview-section"
              >

                <div class="text-h6 text-weight-bold q-mb-sm">
                  {{ index + 1 }}. {{ section.title }}
                </div>

                <div
                  class="terms-content"
                  v-html="section.content"
                />

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
   FORM
========================================================= */

const form = ref({
  id: null,
  title: '',
  content: '',
  active: true
})


/* =========================================================
   TERMS DATA
========================================================= */

const sections = ref([

  {
    id: 1,
    title: 'Introduction',
    content: `
      <p>
        Welcome to <strong>BatohiDrive</strong>. By accessing or using
        our platform, you agree to comply with these Terms & Conditions.
      </p>

      <p>
        Please read these terms carefully before using our services.
      </p>
    `,
    active: true,
    updatedAt: '02 Sep 2026'
  },

  {
    id: 2,
    title: 'User Account',
    content: `
      <p>
        Users are responsible for providing accurate and complete
        information while creating their account.
      </p>

      <ul>
        <li>Keep your account information updated.</li>
        <li>Keep your login credentials secure.</li>
        <li>Do not share your account with another person.</li>
      </ul>
    `,
    active: true,
    updatedAt: '02 Sep 2026'
  },

  {
    id: 3,
    title: 'Vehicle Booking',
    content: `
      <p>
        BatohiDrive allows users to search and book available vehicles
        through the platform.
      </p>

      <p>
        Vehicle availability, pricing and booking conditions may vary
        depending on the vehicle and service provider.
      </p>
    `,
    active: true,
    updatedAt: '02 Sep 2026'
  },

  {
    id: 4,
    title: 'Payments and Cancellation',
    content: `
      <p>
        Users agree to pay all applicable charges associated with their
        booking.
      </p>

      <p>
        Cancellation and refund policies may vary depending on the
        booking conditions.
      </p>
    `,
    active: true,
    updatedAt: '02 Sep 2026'
  },

  {
    id: 5,
    title: 'User Responsibilities',
    content: `
      <p>
        Users must use the vehicle responsibly and follow all applicable
        traffic and safety laws.
      </p>

      <ul>
        <li>Do not use the vehicle for illegal activities.</li>
        <li>Follow traffic regulations.</li>
        <li>Return the vehicle according to the agreed booking terms.</li>
      </ul>
    `,
    active: true,
    updatedAt: '02 Sep 2026'
  },

  {
    id: 6,
    title: 'Privacy',
    content: `
      <p>
        We respect your privacy and handle personal information in
        accordance with our Privacy Policy.
      </p>
    `,
    active: true,
    updatedAt: '02 Sep 2026'
  },

  {
    id: 7,
    title: 'Changes to Terms',
    content: `
      <p>
        BatohiDrive reserves the right to update or modify these
        Terms & Conditions whenever necessary.
      </p>

      <p>
        Users are encouraged to review this page periodically for
        any changes.
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
    section.title.toLowerCase().includes(keyword) ||
    section.content.toLowerCase().includes(keyword)
  )

})


/* =========================================================
   ACTIVE SECTIONS
========================================================= */

const activeSections = computed(() => {

  return sections.value.filter(section => section.active)

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
      message: 'Section updated successfully'
    })

  } else {

    sections.value.push({

      id: Date.now(),

      title: form.value.title,

      content: form.value.content,

      active: form.value.active,

      updatedAt: getCurrentDate()

    })

    $q.notify({
      type: 'positive',
      message: 'Section added successfully'
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
      message: 'Section deleted successfully'
    })

  })

}


/* =========================================================
   SAVE TERMS
========================================================= */

function saveTerms() {

  // Later connect this function with API

  $q.notify({

    type: 'positive',

    message: 'Terms & Conditions saved successfully',

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

.terms-page {
  background: #f7f8fa;
  min-height: 100vh;
}


/* =========================================================
   TERMS CARD
========================================================= */

.terms-card {
  border-radius: 12px;
  background: #ffffff;
  transition: all 0.2s ease;
}

.terms-card:hover {
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
}


/* =========================================================
   CONTENT
========================================================= */

.terms-content {
  color: #555;
  line-height: 1.7;
  font-size: 14px;
}

.terms-content :deep(p) {
  margin-top: 0;
  margin-bottom: 12px;
}

.terms-content :deep(ul),
.terms-content :deep(ol) {
  padding-left: 25px;
}

.terms-content :deep(li) {
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

  .terms-page {
    padding: 12px !important;
  }

  .preview-container {
    padding: 20px;
  }

  .preview-page {
    padding: 20px 10px;
  }

}

</style>
