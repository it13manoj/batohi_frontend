<template>
  <q-page class="about-us-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          About Us
        </div>

        <div class="text-grey-7 q-mt-xs">
          Manage the About Us content displayed on BatohiDrive
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
          @click="saveAboutUs"
        />
      </div>

    </div>


    <!-- =====================================================
         SEARCH + ADD SECTION
    ====================================================== -->
    <q-card flat bordered class="content-card q-mb-lg">

      <q-card-section>
        <div class="row items-center justify-between">

          <div>
            <div class="text-subtitle1 text-weight-bold">
              About Us Sections
            </div>

            <div class="text-caption text-grey-7">
              Manage the information shown on the About Us page
            </div>
          </div>

          <q-btn
            color="primary"
            icon="add"
            label="Add Section"
            @click="openAddDialog"
          />

        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>

        <q-input
          v-model="search"
          outlined
          dense
          clearable
          placeholder="Search sections..."
          class="search-input"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         SECTION LIST
    ====================================================== -->
    <div
      v-if="filteredSections.length"
      class="section-list"
    >

      <q-card
        v-for="(section, index) in filteredSections"
        :key="section.id"
        flat
        bordered
        class="section-card q-mb-md"
      >

        <q-card-section>

          <div class="row items-start no-wrap">

            <!-- Number -->
            <q-avatar
              color="primary"
              text-color="white"
              size="42px"
              class="q-mr-md"
            >
              {{ index + 1 }}
            </q-avatar>


            <!-- Content -->
            <div class="col">

              <div class="row items-center justify-between">

                <div>
                  <div class="text-subtitle1 text-weight-bold">
                    {{ section.title }}
                  </div>

                  <div class="text-caption text-grey-6 q-mt-xs">
                    Last updated: {{ section.updatedAt }}
                  </div>
                </div>


                <div class="row items-center q-gutter-sm">

                  <q-chip
                    :color="section.active ? 'positive' : 'grey'"
                    text-color="white"
                    size="sm"
                    :label="section.active ? 'Active' : 'Inactive'"
                  />

                  <q-btn
                    flat
                    round
                    dense
                    color="primary"
                    icon="edit"
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
                    color="negative"
                    icon="delete"
                    @click="deleteSection(section.id)"
                  >
                    <q-tooltip>
                      Delete Section
                    </q-tooltip>
                  </q-btn>

                </div>

              </div>


              <!-- Section Content -->
              <div
                class="section-content q-mt-md"
                v-html="section.content"
              />


              <!-- Active Toggle -->
              <div class="row items-center q-mt-md">

                <q-toggle
                  v-model="section.active"
                  color="primary"
                  label="Show this section on About Us page"
                />

              </div>

            </div>

          </div>

        </q-card-section>

      </q-card>

    </div>


    <!-- =====================================================
         EMPTY STATE
    ====================================================== -->
    <q-card
      v-else
      flat
      bordered
      class="empty-card"
    >

      <q-card-section class="text-center q-pa-xl">

        <q-icon
          name="info"
          size="60px"
          color="grey-5"
        />

        <div class="text-h6 q-mt-md">
          No sections found
        </div>

        <div class="text-grey-7 q-mt-sm">
          Try changing your search or add a new About Us section.
        </div>

        <q-btn
          color="primary"
          icon="add"
          label="Add Section"
          class="q-mt-md"
          @click="openAddDialog"
        />

      </q-card-section>

    </q-card>


    <!-- =====================================================
         ADD / EDIT DIALOG
    ====================================================== -->
    <q-dialog v-model="showDialog">

      <q-card
        class="dialog-card"
        style="width: 850px; max-width: 95vw;"
      >

        <q-card-section class="row items-center justify-between">

          <div>
            <div class="text-h6 text-weight-bold">
              {{ isEditing ? 'Edit Section' : 'Add Section' }}
            </div>

            <div class="text-caption text-grey-7">
              Enter the information for this About Us section
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


        <q-card-section>

          <!-- Title -->
          <q-input
            v-model="form.title"
            outlined
            label="Section Title"
            placeholder="Enter section title"
            class="q-mb-md"
          />


          <!-- Content -->
          <div class="text-subtitle2 q-mb-sm">
            Section Content
          </div>

          <q-editor
            v-model="form.content"
            min-height="250px"
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
                'link'
              ],
              [
                'undo',
                'redo'
              ]
            ]"
          />


          <!-- Active -->
          <q-toggle
            v-model="form.active"
            color="primary"
            label="Show this section on About Us page"
            class="q-mt-md"
          />

        </q-card-section>


        <q-separator />


        <q-card-actions align="right" class="q-pa-md">

          <q-btn
            flat
            label="Cancel"
            color="grey-7"
            v-close-popup
          />

          <q-btn
            color="primary"
            icon="save"
            :label="isEditing ? 'Update Section' : 'Add Section'"
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

      <q-layout view="hHh LpR fFf">

        <!-- Preview Header -->
        <q-header
          elevated
          class="bg-primary text-white"
        >

          <q-toolbar>

            <q-toolbar-title>
              About Us Preview
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


        <q-page-container>

          <q-page class="preview-page q-pa-lg">

            <div class="preview-container">

              <!-- Page Title -->
              <div class="text-center q-mb-xl">

                <div class="text-h3 text-weight-bold">
                  About BatohiDrive
                </div>

                <div class="text-subtitle1 text-grey-7 q-mt-sm">
                  Your trusted vehicle booking and transportation partner
                </div>

              </div>


              <!-- Active Sections -->
              <q-card
                v-for="section in activeSections"
                :key="section.id"
                flat
                bordered
                class="preview-section q-mb-lg"
              >

                <q-card-section>

                  <div class="text-h5 text-weight-bold q-mb-md">
                    {{ section.title }}
                  </div>

                  <div
                    class="preview-content"
                    v-html="section.content"
                  />

                </q-card-section>

              </q-card>


              <!-- No Active Sections -->
              <div
                v-if="activeSections.length === 0"
                class="text-center text-grey-7 q-pa-xl"
              >
                No active sections available.
              </div>

            </div>

          </q-page>

        </q-page-container>

      </q-layout>

    </q-dialog>

  </q-page>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()


// =====================================================
// SEARCH
// =====================================================

const search = ref('')


// =====================================================
// DIALOGS
// =====================================================

const showDialog = ref(false)
const showPreview = ref(false)

const isEditing = ref(false)


// =====================================================
// FORM
// =====================================================

const form = ref({
  id: null,
  title: '',
  content: '',
  active: true
})


// =====================================================
// ABOUT US SECTIONS
// =====================================================

const sections = ref([

  {
    id: 1,
    title: 'Who We Are',
    updatedAt: '02 Sep 2026',
    active: true,
    content: `
      <p>
        BatohiDrive is a modern vehicle booking and transportation platform
        designed to make travel simple, convenient and reliable.
      </p>

      <p>
        We connect customers with trusted vehicles and professional drivers
        while providing a smooth booking experience from start to finish.
      </p>
    `
  },

  {
    id: 2,
    title: 'Our Mission',
    updatedAt: '02 Sep 2026',
    active: true,
    content: `
      <p>
        Our mission is to make vehicle booking easier and more accessible
        for everyone.
      </p>

      <p>
        We focus on providing reliable vehicles, transparent information,
        convenient booking and excellent customer service.
      </p>
    `
  },

  {
    id: 3,
    title: 'Our Vision',
    updatedAt: '02 Sep 2026',
    active: true,
    content: `
      <p>
        Our vision is to become a trusted transportation platform that
        connects customers, drivers and vehicle partners through technology.
      </p>

      <p>
        We aim to create a safe, transparent and convenient travel ecosystem.
      </p>
    `
  },

  {
    id: 4,
    title: 'What We Offer',
    updatedAt: '02 Sep 2026',
    active: true,
    content: `
      <ul>
        <li>Easy vehicle search and booking</li>
        <li>Multiple vehicle options</li>
        <li>Professional driver services</li>
        <li>Transparent booking information</li>
        <li>Convenient online booking management</li>
        <li>Customer support</li>
      </ul>
    `
  },

  {
    id: 5,
    title: 'Why Choose BatohiDrive',
    updatedAt: '02 Sep 2026',
    active: true,
    content: `
      <p>
        BatohiDrive is built with customers in mind. We focus on reliability,
        convenience and transparency throughout the booking process.
      </p>

      <ul>
        <li>Simple and user-friendly booking process</li>
        <li>Reliable vehicle options</li>
        <li>Professional service</li>
        <li>Transparent information</li>
        <li>Customer-focused support</li>
      </ul>
    `
  },

  {
    id: 6,
    title: 'Safety & Reliability',
    updatedAt: '02 Sep 2026',
    active: true,
    content: `
      <p>
        Customer safety and service reliability are important priorities
        at BatohiDrive.
      </p>

      <p>
        We work to maintain appropriate vehicle and driver information
        so customers can make informed booking decisions.
      </p>
    `
  },

  {
    id: 7,
    title: 'Our Commitment',
    updatedAt: '02 Sep 2026',
    active: true,
    content: `
      <p>
        We are committed to continuously improving our platform and services.
        Customer feedback helps us improve the booking experience and build
        better transportation solutions.
      </p>
    `
  },

  {
    id: 8,
    title: 'Contact Us',
    updatedAt: '02 Sep 2026',
    active: true,
    content: `
      <p>
        If you have any questions, suggestions or need assistance with your
        booking, our support team is available to help.
      </p>

      <p>
        Please contact BatohiDrive through the official support channels
        provided on our website or application.
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

  return sections.value.filter(section =>
    section.title.toLowerCase().includes(keyword) ||
    section.content.toLowerCase().includes(keyword)
  )

})


// =====================================================
// ACTIVE SECTIONS
// =====================================================

const activeSections = computed(() => {

  return sections.value.filter(section => section.active)

})


// =====================================================
// RESET FORM
// =====================================================

const resetForm = () => {

  form.value = {
    id: null,
    title: '',
    content: '',
    active: true
  }

}


// =====================================================
// OPEN ADD DIALOG
// =====================================================

const openAddDialog = () => {

  isEditing.value = false

  resetForm()

  showDialog.value = true

}


// =====================================================
// OPEN EDIT DIALOG
// =====================================================

const openEditDialog = (section) => {

  isEditing.value = true

  form.value = {
    id: section.id,
    title: section.title,
    content: section.content,
    active: section.active
  }

  showDialog.value = true

}


// =====================================================
// SAVE SECTION
// =====================================================

const saveSection = () => {

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


  // EDIT
  if (isEditing.value) {

    const index = sections.value.findIndex(
      section => section.id === form.value.id
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
      message: 'About Us section updated successfully'
    })

  }

  // ADD
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
      message: 'About Us section added successfully'
    })

  }


  showDialog.value = false

  resetForm()

}


// =====================================================
// DELETE SECTION
// =====================================================

const deleteSection = (id) => {

  $q.dialog({

    title: 'Delete Section',

    message:
      'Are you sure you want to delete this About Us section?',

    cancel: true,

    persistent: true

  }).onOk(() => {

    sections.value = sections.value.filter(
      section => section.id !== id
    )

    $q.notify({
      type: 'positive',
      message: 'Section deleted successfully'
    })

  })

}


// =====================================================
// SAVE ABOUT US
// =====================================================

const saveAboutUs = () => {

  /*
    API integration can be added here later.

    Example:

    await api.post('/admin/about-us', {
      sections: sections.value
    })
  */

  $q.notify({

    type: 'positive',

    message: 'About Us changes saved successfully',

    icon: 'check_circle'

  })

}


// =====================================================
// PREVIEW
// =====================================================

const openPreview = () => {

  showPreview.value = true

}


// =====================================================
// CURRENT DATE
// =====================================================

const getCurrentDate = () => {

  return new Date().toLocaleDateString(
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

/* =====================================================
   PAGE
===================================================== */

.about-us-page {
  background: #f7f8fa;
  min-height: 100%;
}


/* =====================================================
   CARDS
===================================================== */

.content-card,
.section-card,
.empty-card {
  border-radius: 12px;
  background: #ffffff;
}


/* =====================================================
   SEARCH
===================================================== */

.search-input {
  max-width: 450px;
}


/* =====================================================
   SECTION CARD
===================================================== */

.section-card {
  transition: 0.2s ease;
}

.section-card:hover {
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
}


/* =====================================================
   SECTION CONTENT
===================================================== */

.section-content {
  color: #555;
  line-height: 1.7;
  font-size: 14px;
}

.section-content :deep(p) {
  margin-top: 0;
  margin-bottom: 10px;
}

.section-content :deep(ul),
.section-content :deep(ol) {
  padding-left: 22px;
}


/* =====================================================
   DIALOG
===================================================== */

.dialog-card {
  border-radius: 14px;
}


/* =====================================================
   PREVIEW
===================================================== */

.preview-page {
  background: #f7f8fa;
}

.preview-container {
  max-width: 1000px;
  margin: 0 auto;
}

.preview-section {
  border-radius: 12px;
  background: #ffffff;
}

.preview-content {
  color: #555;
  line-height: 1.8;
  font-size: 15px;
}

.preview-content :deep(p) {
  margin-top: 0;
  margin-bottom: 14px;
}

.preview-content :deep(ul),
.preview-content :deep(ol) {
  padding-left: 24px;
}


/* =====================================================
   EMPTY STATE
===================================================== */

.empty-card {
  min-height: 300px;
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 768px) {

  .about-us-page {
    padding: 12px !important;
  }

  .section-card .row {
    flex-wrap: wrap;
  }

  .section-card .q-avatar {
    margin-bottom: 10px;
  }

}

</style>
