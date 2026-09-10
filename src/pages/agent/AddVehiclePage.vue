# AddVehiclePage.vue

```vue
<template>
  <q-page class="add-vehicle-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center q-mb-lg">

      <q-btn
        flat
        round
        dense
        icon="arrow_back"
        color="primary"
        class="q-mr-md"
        @click="goBack"
      />

      <div>
        <div class="text-h5 text-weight-bold">
          Add Vehicle
        </div>

        <div class="text-grey-7">
          Add a new vehicle to your agent account
        </div>
      </div>

    </div>


    <!-- =====================================================
         MAIN FORM
    ====================================================== -->
    <q-form
      ref="vehicleFormRef"
      @submit="saveVehicle"
    >

      <div class="row q-col-gutter-lg">


        <!-- =================================================
             LEFT COLUMN
        ================================================== -->
        <div class="col-12 col-md-8">

          <!-- VEHICLE INFORMATION -->
          <q-card
            flat
            bordered
            class="form-card q-mb-lg"
          >

            <q-card-section>

              <div class="section-title">
                Vehicle Information
              </div>

              <div class="section-description">
                Enter the basic information about the vehicle.
              </div>

            </q-card-section>

            <q-separator />

            <q-card-section>

              <div class="row q-col-gutter-md">


                <!-- VEHICLE NAME -->
                <div class="col-12 col-md-6">

                  <q-input
                    v-model="form.name"
                    outlined
                    label="Vehicle Name *"
                    placeholder="Example: Toyota Innova"
                    :rules="[
                      val =>
                        !!val?.trim() ||
                        'Vehicle name is required'
                    ]"
                  >
                    <template #prepend>
                      <q-icon name="directions_car" />
                    </template>

                  </q-input>

                </div>


                <!-- VEHICLE TYPE -->
                <div class="col-12 col-md-6">

                  <q-select
                    v-model="form.type"
                    :options="vehicleTypes"
                    outlined
                    label="Vehicle Type *"
                    :rules="[
                      val =>
                        !!val ||
                        'Vehicle type is required'
                    ]"
                  >
                    <template #prepend>
                      <q-icon name="category" />
                    </template>

                  </q-select>

                </div>


                <!-- BRAND -->
                <div class="col-12 col-md-6">

                  <q-input
                    v-model="form.brand"
                    outlined
                    label="Brand *"
                    placeholder="Example: Toyota"
                    :rules="[
                      val =>
                        !!val?.trim() ||
                        'Brand is required'
                    ]"
                  />

                </div>


                <!-- MODEL -->
                <div class="col-12 col-md-6">

                  <q-input
                    v-model="form.model"
                    outlined
                    label="Model *"
                    placeholder="Example: Crysta"
                    :rules="[
                      val =>
                        !!val?.trim() ||
                        'Model is required'
                    ]"
                  />

                </div>


                <!-- REGISTRATION NUMBER -->
                <div class="col-12 col-md-6">

                  <q-input
                    v-model="form.registrationNumber"
                    outlined
                    label="Registration Number *"
                    placeholder="Example: BR01AB1234"
                    :rules="[
                      val =>
                        !!val?.trim() ||
                        'Registration number is required'
                    ]"
                    @update:model-value="
                      value =>
                        form.registrationNumber =
                          value.toUpperCase()
                    "
                  >
                    <template #prepend>
                      <q-icon name="confirmation_number" />
                    </template>

                  </q-input>

                </div>


                <!-- MANUFACTURING YEAR -->
                <div class="col-12 col-md-6">

                  <q-input
                    v-model.number="form.year"
                    outlined
                    type="number"
                    label="Manufacturing Year"
                    min="1900"
                    :max="currentYear"
                  >
                    <template #prepend>
                      <q-icon name="calendar_today" />
                    </template>

                  </q-input>

                </div>


                <!-- SEATS -->
                <div class="col-12 col-md-6">

                  <q-input
                    v-model.number="form.seats"
                    outlined
                    type="number"
                    label="Number of Seats *"
                    min="1"
                    max="100"
                    :rules="[
                      val =>
                        Number(val) > 0 ||
                        'Seats are required'
                    ]"
                  >
                    <template #prepend>
                      <q-icon name="airline_seat_recline_normal" />
                    </template>

                  </q-input>

                </div>


                <!-- PRICE -->
                <div class="col-12 col-md-6">

                  <q-input
                    v-model.number="form.price"
                    outlined
                    type="number"
                    label="Price Per Day *"
                    min="0"
                    :rules="[
                      val =>
                        Number(val) >= 0 ||
                        'Enter a valid price'
                    ]"
                  >
                    <template #prepend>
                      <q-icon name="currency_rupee" />
                    </template>

                    <template #append>
                      <span class="text-grey-7">
                        / day
                      </span>
                    </template>

                  </q-input>

                </div>

              </div>

            </q-card-section>

          </q-card>


          <!-- =================================================
               VEHICLE FEATURES
          ================================================== -->
          <q-card
            flat
            bordered
            class="form-card q-mb-lg"
          >

            <q-card-section>

              <div class="section-title">
                Vehicle Features
              </div>

              <div class="section-description">
                Select the features available in this vehicle.
              </div>

            </q-card-section>

            <q-separator />

            <q-card-section>

              <div class="row q-col-gutter-sm">

                <div
                  v-for="feature in featureOptions"
                  :key="feature.value"
                  class="col-12 col-sm-6 col-md-4"
                >

                  <q-checkbox
                    v-model="form.features"
                    :val="feature.value"
                    :label="feature.label"
                    color="primary"
                  />

                </div>

              </div>

            </q-card-section>

          </q-card>


          <!-- =================================================
               ADDITIONAL INFORMATION
          ================================================== -->
          <q-card
            flat
            bordered
            class="form-card"
          >

            <q-card-section>

              <div class="section-title">
                Additional Information
              </div>

            </q-card-section>

            <q-separator />

            <q-card-section>

              <q-input
                v-model="form.description"
                outlined
                type="textarea"
                autogrow
                label="Vehicle Description"
                placeholder="Enter additional details about the vehicle..."
              />

            </q-card-section>

          </q-card>

        </div>


        <!-- =================================================
             RIGHT COLUMN
        ================================================== -->
        <div class="col-12 col-md-4">


          <!-- =================================================
               VEHICLE IMAGE
          ================================================== -->
          <q-card
            flat
            bordered
            class="form-card q-mb-lg"
          >

            <q-card-section>

              <div class="section-title">
                Vehicle Image
              </div>

              <div class="section-description">
                Upload the main image of your vehicle.
              </div>

            </q-card-section>

            <q-separator />

            <q-card-section>

              <!-- IMAGE PREVIEW -->
              <div
                v-if="imagePreview"
                class="image-preview"
              >

                <q-img
                  :src="imagePreview"
                  fit="cover"
                  class="preview-image"
                />

                <q-btn
                  round
                  dense
                  color="negative"
                  icon="close"
                  class="remove-image-btn"
                  @click="removeImage"
                />

              </div>


              <!-- UPLOAD -->
              <q-file
                v-else
                v-model="form.image"
                outlined
                accept="image/*"
                label="Choose Vehicle Image"
                clearable
                @update:model-value="handleImageChange"
              >

                <template #prepend>
                  <q-icon name="cloud_upload" />
                </template>

              </q-file>


              <div class="text-caption text-grey-6 q-mt-sm">
                JPG, PNG or WEBP. Maximum recommended size:
                5 MB.
              </div>

            </q-card-section>

          </q-card>


          <!-- =================================================
               VEHICLE STATUS
          ================================================== -->
          <q-card
            flat
            bordered
            class="form-card q-mb-lg"
          >

            <q-card-section>

              <div class="section-title">
                Vehicle Status
              </div>

            </q-card-section>

            <q-separator />

            <q-card-section>

              <q-toggle
                v-model="form.active"
                color="positive"
                label="Vehicle is Active"
              />

              <div class="text-caption text-grey-6 q-mt-sm">
                Active vehicles can be shown as available
                for bookings.
              </div>

            </q-card-section>

          </q-card>


          <!-- =================================================
               ACTIONS
          ================================================== -->
          <q-card
            flat
            bordered
            class="form-card"
          >

            <q-card-section>

              <q-btn
                type="submit"
                color="primary"
                icon="save"
                label="Save Vehicle"
                unelevated
                class="full-width q-mb-sm"
                :loading="saving"
              />

              <q-btn
                flat
                color="grey-7"
                label="Cancel"
                class="full-width"
                :disable="saving"
                @click="goBack"
              />

            </q-card-section>

          </q-card>

        </div>

      </div>

    </q-form>

  </q-page>
</template>


<script setup>

import {
  ref,
  reactive,
  computed,
  onBeforeUnmount
} from 'vue'

import {
  useQuasar
} from 'quasar'

import {
  useRouter
} from 'vue-router'

import axios from 'axios'


/* =========================================================
   QUASAR
========================================================= */

const $q = useQuasar()


/* =========================================================
   ROUTER
========================================================= */

const router = useRouter()


/* =========================================================
   FORM REF
========================================================= */

const vehicleFormRef = ref(null)


/* =========================================================
   SAVING
========================================================= */

const saving = ref(false)


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
  new Date().getFullYear()


/* =========================================================
   VEHICLE TYPES
========================================================= */

const vehicleTypes = [

  'Car',

  'SUV',

  'Sedan',

  'Hatchback',

  'Bike',

  'Tempo Traveller',

  'Van',

  'Bus'

]


/* =========================================================
   FEATURES
========================================================= */

const featureOptions = [

  {
    label: 'Air Conditioning',
    value: 'ac'
  },

  {
    label: 'GPS',
    value: 'gps'
  },

  {
    label: 'Bluetooth',
    value: 'bluetooth'
  },

  {
    label: 'USB Charging',
    value: 'usb'
  },

  {
    label: 'Music System',
    value: 'music_system'
  },

  {
    label: 'Power Windows',
    value: 'power_windows'
  },

  {
    label: 'Central Locking',
    value: 'central_locking'
  },

  {
    label: 'Airbags',
    value: 'airbags'
  },

  {
    label: 'Child Seat',
    value: 'child_seat'
  },

  {
    label: 'Sunroof',
    value: 'sunroof'
  },

  {
    label: 'Rear Camera',
    value: 'rear_camera'
  },

  {
    label: 'Parking Sensors',
    value: 'parking_sensors'
  }

]


/* =========================================================
   FORM
========================================================= */

const form = reactive({

  name: '',

  type: '',

  brand: '',

  model: '',

  registrationNumber: '',

  year: currentYear,

  seats: 4,

  price: '',

  fuelType: 'Petrol',

  transmission: 'Manual',

  features: [],

  description: '',

  image: null,

  active: true

})


/* =========================================================
   IMAGE PREVIEW
========================================================= */

const imagePreview = ref('')


/* =========================================================
   HANDLE IMAGE
========================================================= */

const handleImageChange = file => {

  if (!file) {
    return
  }


  /* -----------------------------------------------
     Validate file type
  ------------------------------------------------ */

  if (!file.type.startsWith('image/')) {

    form.image = null

    $q.notify({

      type: 'warning',

      message:
        'Please select a valid image file.'

    })

    return

  }


  /* -----------------------------------------------
     Validate file size
  ------------------------------------------------ */

  const maxSize =
    5 * 1024 * 1024


  if (file.size > maxSize) {

    form.image = null

    $q.notify({

      type: 'warning',

      message:
        'Image size must be less than 5 MB.'

    })

    return

  }


  /* -----------------------------------------------
     Create preview
  ------------------------------------------------ */

  if (imagePreview.value) {

    URL.revokeObjectURL(
      imagePreview.value
    )

  }


  imagePreview.value =
    URL.createObjectURL(file)

}


/* =========================================================
   REMOVE IMAGE
========================================================= */

const removeImage = () => {

  if (imagePreview.value) {

    URL.revokeObjectURL(
      imagePreview.value
    )

  }

  imagePreview.value = ''

  form.image = null

}


/* =========================================================
   SAVE VEHICLE
========================================================= */

const saveVehicle = async () => {

  /* -----------------------------------------------
     Validate form
  ------------------------------------------------ */

  const valid =
    await vehicleFormRef.value?.validate()


  if (!valid) {

    $q.notify({

      type: 'warning',

      message:
        'Please fill all required fields.'

    })

    return

  }


  /* -----------------------------------------------
     Registration number
  ------------------------------------------------ */

  form.registrationNumber =
    form.registrationNumber
      .trim()
      .toUpperCase()


  try {

    saving.value = true


    /* ---------------------------------------------
       FormData
    ---------------------------------------------- */

    const formData =
      new FormData()


    formData.append(
      'name',
      form.name.trim()
    )

    formData.append(
      'type',
      form.type
    )

    formData.append(
      'brand',
      form.brand.trim()
    )

    formData.append(
      'model',
      form.model.trim()
    )

    formData.append(
      'registrationNumber',
      form.registrationNumber
    )

    formData.append(
      'year',
      String(form.year || '')
    )

    formData.append(
      'seats',
      String(form.seats || '')
    )

    formData.append(
      'price',
      String(form.price || '')
    )

    formData.append(
      'fuelType',
      form.fuelType
    )

    formData.append(
      'transmission',
      form.transmission
    )

    formData.append(
      'features',
      JSON.stringify(form.features)
    )

    formData.append(
      'description',
      form.description.trim()
    )

    formData.append(
      'status',
      form.active
        ? 'Active'
        : 'Inactive'
    )


    /* ---------------------------------------------
       IMAGE
    ---------------------------------------------- */

    if (form.image instanceof File) {

      formData.append(
        'image',
        form.image
      )

    }


    /* ---------------------------------------------
       API CALL
    ---------------------------------------------- */

    const response =
      await axios.post(
        '/agents/vehicles',
        formData
      )


    console.log(
      'Vehicle Created:',
      response.data
    )


    /* ---------------------------------------------
       SUCCESS
    ---------------------------------------------- */

    $q.notify({

      type: 'positive',

      message:
        'Vehicle added successfully.'

    })


    /* ---------------------------------------------
       Redirect
    ---------------------------------------------- */

    router.push({
      name: 'AgentVehicles'
    })


  } catch (error) {

    console.error(
      'Add Vehicle Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        error.response?.data?.message ||
        'Unable to add vehicle.'

    })

  } finally {

    saving.value = false

  }

}


/* =========================================================
   GO BACK
========================================================= */

const goBack = () => {

  router.push({
    name: 'agent-vehicles'
  })

}


/* =========================================================
   CLEANUP
========================================================= */

onBeforeUnmount(() => {

  if (imagePreview.value) {

    URL.revokeObjectURL(
      imagePreview.value
    )

  }

})

</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.add-vehicle-page {
  background: #f5f7fb;
  min-height: 100%;
}


/* =========================================================
   FORM CARD
========================================================= */

.form-card {
  background: #ffffff;
  border-radius: 14px;
}


/* =========================================================
   SECTION
========================================================= */

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}


.section-description {
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
}


/* =========================================================
   IMAGE
========================================================= */

.image-preview {
  position: relative;
  width: 100%;
}


.preview-image {
  width: 100%;
  height: 220px;
  border-radius: 12px;
  background: #f1f5f9;
}


.remove-image-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 600px) {

  .add-vehicle-page {
    padding: 12px !important;
  }

  .text-h5 {
    font-size: 21px;
  }

  .preview-image {
    height: 180px;
  }

}

</style>
```
