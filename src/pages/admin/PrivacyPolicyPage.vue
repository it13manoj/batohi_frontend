```vue
<template>
  <q-page class="privacy-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Privacy Policy
        </div>

        <div class="text-grey-7 q-mt-xs">
          Manage the privacy policy displayed to BatohiDrive users
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
          @click="savePrivacyPolicy"
        />

      </div>

    </div>


    <!-- =====================================================
         SEARCH + ADD SECTION
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
              placeholder="Search privacy policy..."
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
         PRIVACY POLICY SECTIONS
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
          class="privacy-card"
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


              <!-- ACTION BUTTONS -->
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
              class="privacy-content"
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
              name="privacy_tip"
              size="60px"
              color="grey-5"
            />

            <div class="text-h6 q-mt-md">
              No Privacy Policy Sections Found
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
              Manage privacy policy content
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
         PRIVACY POLICY PREVIEW
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
              Privacy Policy Preview
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
                Privacy Policy
              </div>

              <div class="text-center text-grey-6 q-mb-xl">
                BatohiDrive
              </div>


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
                  class="privacy-content"
                  v-html="section.content"
                />

              </div>


              <!-- LAST UPDATED -->
              <q-separator class="q-my-xl" />

              <div class="text-caption text-grey-6 text-center">
                Last updated:
                {{ getCurrentDate() }}
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
   PRIVACY POLICY DATA
========================================================= */

const sections = ref([

  {
    id: 1,

    title: 'Introduction',

    content: `
      <p>
        At <strong>BatohiDrive</strong>, we respect your privacy and
        are committed to protecting your personal information.
      </p>

      <p>
        This Privacy Policy explains how we collect, use, store and
        protect information when you use our platform and services.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 2,

    title: 'Information We Collect',

    content: `
      <p>
        We may collect information that you provide when creating
        an account, making a booking or communicating with us.
      </p>

      <ul>
        <li>Name and contact information</li>
        <li>Account information</li>
        <li>Vehicle booking information</li>
        <li>Payment-related information</li>
        <li>Information provided when contacting support</li>
      </ul>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 3,

    title: 'How We Use Your Information',

    content: `
      <p>
        Information collected through BatohiDrive may be used to:
      </p>

      <ul>
        <li>Create and manage your account.</li>
        <li>Process vehicle bookings.</li>
        <li>Provide customer support.</li>
        <li>Send important service notifications.</li>
        <li>Improve our platform and services.</li>
        <li>Maintain security and prevent misuse.</li>
      </ul>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 4,

    title: 'Booking and Payment Information',

    content: `
      <p>
        When you make a vehicle booking, certain information may
        be required to process and manage your booking.
      </p>

      <p>
        Payment information may be processed through authorized
        payment service providers. We do not intentionally store
        sensitive payment information unless required for legitimate
        business or legal purposes.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 5,

    title: 'Information Sharing',

    content: `
      <p>
        We do not sell your personal information.
      </p>

      <p>
        Information may be shared with service providers or other
        parties when necessary to provide our services, process
        bookings, maintain security, comply with legal requirements,
        or protect the rights of BatohiDrive and its users.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 6,

    title: 'Data Security',

    content: `
      <p>
        We take reasonable technical and organizational measures
        to protect your information against unauthorized access,
        alteration, disclosure or destruction.
      </p>

      <p>
        However, no online service can guarantee complete security
        of information transmitted over the internet.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 7,

    title: 'Cookies and Similar Technologies',

    content: `
      <p>
        BatohiDrive may use cookies or similar technologies to
        improve website functionality, understand usage patterns,
        remember preferences and improve the user experience.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 8,

    title: 'User Rights',

    content: `
      <p>
        Depending on applicable law, you may have rights regarding
        your personal information, including requesting access,
        correction or deletion of certain information.
      </p>

      <p>
        Requests can be submitted through our customer support
        channels.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 9,

    title: 'Data Retention',

    content: `
      <p>
        We retain personal information only for as long as necessary
        to provide our services, fulfill legitimate business
        purposes, resolve disputes, enforce agreements or comply
        with applicable legal requirements.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 10,

    title: 'Changes to Privacy Policy',

    content: `
      <p>
        BatohiDrive may update this Privacy Policy from time to time.
        Any changes will be reflected on this page.
      </p>

      <p>
        We recommend reviewing this policy periodically to stay
        informed about how your information is handled.
      </p>
    `,

    active: true,

    updatedAt: '02 Sep 2026'
  },


  {
    id: 11,

    title: 'Contact Us',

    content: `
      <p>
        If you have questions, concerns or requests regarding this
        Privacy Policy, please contact the BatohiDrive support team.
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

      message: 'Privacy policy section updated successfully'

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

      message: 'Privacy policy section added successfully'

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

      message: 'Privacy policy section deleted successfully'

    })

  })

}


/* =========================================================
   SAVE PRIVACY POLICY
========================================================= */

function savePrivacyPolicy() {

  // API integration can be added here later.

  $q.notify({

    type: 'positive',

    message: 'Privacy Policy saved successfully',

    icon: 'check_circle'

  })

}


/* =========================================================
   OPEN PREVIEW
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

.privacy-page {
  min-height: 100vh;
  background: #f7f8fa;
}


/* =========================================================
   PRIVACY CARD
========================================================= */

.privacy-card {

  border-radius: 12px;

  background: #ffffff;

  transition: all 0.2s ease;

}


.privacy-card:hover {

  box-shadow:
    0 4px 18px rgba(0, 0, 0, 0.07);

}


/* =========================================================
   CONTENT
========================================================= */

.privacy-content {

  color: #555;

  line-height: 1.7;

  font-size: 14px;

}


.privacy-content :deep(p) {

  margin-top: 0;

  margin-bottom: 12px;

}


.privacy-content :deep(ul),
.privacy-content :deep(ol) {

  padding-left: 25px;

}


.privacy-content :deep(li) {

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

  .privacy-page {

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
