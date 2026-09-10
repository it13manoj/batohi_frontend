```vue
<template>
  <q-page class="agent-drivers-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Drivers
        </div>

        <div class="text-grey-7">
          Manage drivers assigned to your agent account
        </div>
      </div>

      <!-- ADD DRIVER -->
      <q-btn
        color="primary"
        icon="person_add"
        label="Add Driver"
        unelevated
        @click="openAddDriverDialog"
      />

    </div>


    <!-- =====================================================
         SUMMARY CARDS
    ====================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- TOTAL -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card
          flat
          bordered
          class="summary-card"
        >
          <q-card-section class="row items-center">

            <q-avatar
              color="blue-1"
              text-color="primary"
              icon="groups"
            />

            <div class="q-ml-md">
              <div class="text-caption text-grey-7">
                Total Drivers
              </div>

              <div class="text-h5 text-weight-bold">
                {{ drivers.length }}
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>


      <!-- ACTIVE -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card
          flat
          bordered
          class="summary-card"
        >
          <q-card-section class="row items-center">

            <q-avatar
              color="green-1"
              text-color="positive"
              icon="check_circle"
            />

            <div class="q-ml-md">
              <div class="text-caption text-grey-7">
                Active
              </div>

              <div class="text-h5 text-weight-bold">
                {{ activeDrivers }}
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>


      <!-- AVAILABLE -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card
          flat
          bordered
          class="summary-card"
        >
          <q-card-section class="row items-center">

            <q-avatar
              color="purple-1"
              text-color="purple"
              icon="person_pin_circle"
            />

            <div class="q-ml-md">
              <div class="text-caption text-grey-7">
                Available
              </div>

              <div class="text-h5 text-weight-bold">
                {{ availableDrivers }}
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>


      <!-- INACTIVE -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card
          flat
          bordered
          class="summary-card"
        >
          <q-card-section class="row items-center">

            <q-avatar
              color="red-1"
              text-color="negative"
              icon="block"
            />

            <div class="q-ml-md">
              <div class="text-caption text-grey-7">
                Inactive
              </div>

              <div class="text-h5 text-weight-bold">
                {{ inactiveDrivers }}
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>

    </div>


    <!-- =====================================================
         MAIN DRIVER CARD
    ====================================================== -->
    <q-card
      flat
      bordered
      class="main-card"
    >

      <!-- FILTERS -->
      <q-card-section>

        <div class="row q-col-gutter-md items-center">

          <!-- SEARCH -->
          <div class="col-12 col-md-5">

            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search driver, mobile or license number..."
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>

          </div>


          <!-- STATUS -->
          <div class="col-12 col-sm-6 col-md-3">

            <q-select
              v-model="statusFilter"
              :options="statusOptions"
              outlined
              dense
              clearable
              emit-value
              map-options
              label="Status"
            />

          </div>


          <!-- AVAILABILITY -->
          <div class="col-12 col-sm-6 col-md-3">

            <q-select
              v-model="availabilityFilter"
              :options="availabilityOptions"
              outlined
              dense
              clearable
              emit-value
              map-options
              label="Availability"
            />

          </div>


          <!-- REFRESH -->
          <div class="col-12 col-md-1 flex flex-center">

            <q-btn
              flat
              round
              dense
              color="primary"
              icon="refresh"
              :loading="loading"
              @click="getDrivers"
            >
              <q-tooltip>
                Refresh Drivers
              </q-tooltip>
            </q-btn>

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- ===================================================
           DRIVER TABLE
      ==================================================== -->
      <q-card-section class="q-pa-none">

        <q-table
          flat
          :rows="filteredDrivers"
          :columns="columns"
          row-key="id"
          :loading="loading"
          v-model:pagination="pagination"
          class="drivers-table"
          no-data-label="No drivers found"
          no-results-label="No matching drivers found"
          :rows-per-page-options="[10, 20, 50, 100]"
        >

          <!-- DRIVER -->
          <template #body-cell-driver="props">

            <q-td :props="props">

              <div class="row items-center no-wrap">

                <q-avatar
                  size="48px"
                  color="primary"
                  text-color="white"
                  class="driver-avatar"
                >

                  <img
                    v-if="props.row.image"
                    :src="props.row.image"
                    alt="Driver"
                    @error="handleImageError"
                  />

                  <span v-else>
                    {{ getInitials(props.row.name) }}
                  </span>

                </q-avatar>


                <div class="q-ml-md">

                  <div class="text-weight-bold">
                    {{ props.row.name }}
                  </div>

                  <div class="text-caption text-grey-7">
                    {{ props.row.mobile }}
                  </div>

                  <div
                    v-if="props.row.email"
                    class="text-caption text-grey-6"
                  >
                    {{ props.row.email }}
                  </div>

                </div>

              </div>

            </q-td>

          </template>


          <!-- LICENSE -->
          <template #body-cell-license="props">

            <q-td :props="props">

              <div class="license-number">
                {{ props.row.licenseNumber || '-' }}
              </div>

              <div
                v-if="props.row.licenseExpiry"
                class="text-caption"
                :class="
                  isLicenseExpired(props.row.licenseExpiry)
                    ? 'text-negative'
                    : 'text-grey-7'
                "
              >

                {{
                  isLicenseExpired(props.row.licenseExpiry)
                    ? 'License Expired'
                    : `Expiry: ${formatDate(props.row.licenseExpiry)}`
                }}

              </div>

            </q-td>

          </template>


          <!-- EXPERIENCE -->
          <template #body-cell-experience="props">

            <q-td :props="props">

              <div class="text-weight-medium">
                {{ props.row.experience || 0 }} years
              </div>

            </q-td>

          </template>


          <!-- VEHICLE -->
          <template #body-cell-vehicle="props">

            <q-td :props="props">

              <div
                v-if="props.row.vehicleName"
                class="row items-center no-wrap"
              >

                <q-icon
                  name="directions_car"
                  color="primary"
                  size="20px"
                />

                <div class="q-ml-sm">

                  <div class="text-weight-medium">
                    {{ props.row.vehicleName }}
                  </div>

                  <div class="text-caption text-grey-7">
                    {{ props.row.vehicleRegistration || '-' }}
                  </div>

                </div>

              </div>

              <span
                v-else
                class="text-grey-6"
              >
                Not Assigned
              </span>

            </q-td>

          </template>


          <!-- AVAILABILITY -->
          <template #body-cell-availability="props">

            <q-td
              :props="props"
              class="text-center"
            >

              <q-chip
                dense
                :color="getAvailabilityColor(props.row.availability)"
                text-color="white"
              >

                <q-icon
                  :name="getAvailabilityIcon(props.row.availability)"
                  size="15px"
                  class="q-mr-xs"
                />

                {{ props.row.availability }}

              </q-chip>

            </q-td>

          </template>


          <!-- STATUS -->
          <template #body-cell-status="props">

            <q-td
              :props="props"
              class="text-center"
            >

              <q-chip
                dense
                :color="getStatusColor(props.row.status)"
                text-color="white"
              >

                <q-icon
                  :name="getStatusIcon(props.row.status)"
                  size="15px"
                  class="q-mr-xs"
                />

                {{ props.row.status }}

              </q-chip>

            </q-td>

          </template>


          <!-- ACTIONS -->
          <template #body-cell-actions="props">

            <q-td
              :props="props"
              class="text-right"
            >

              <!-- VIEW -->
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="visibility"
                @click="viewDriver(props.row)"
              >
                <q-tooltip>
                  View Driver
                </q-tooltip>
              </q-btn>


              <!-- EDIT -->
              <q-btn
                flat
                round
                dense
                color="orange"
                icon="edit"
                @click="editDriver(props.row)"
              >
                <q-tooltip>
                  Edit Driver
                </q-tooltip>
              </q-btn>


              <!-- ACTIVATE / DEACTIVATE -->
              <q-btn
                flat
                round
                dense
                :color="
                  props.row.status === 'Active'
                    ? 'negative'
                    : 'positive'
                "
                :icon="
                  props.row.status === 'Active'
                    ? 'block'
                    : 'check_circle'
                "
                @click="toggleDriverStatus(props.row)"
              >

                <q-tooltip>
                  {{
                    props.row.status === 'Active'
                      ? 'Deactivate'
                      : 'Activate'
                  }}
                </q-tooltip>

              </q-btn>


              <!-- DELETE -->
              <q-btn
                flat
                round
                dense
                color="negative"
                icon="delete"
                @click="deleteDriver(props.row)"
              >
                <q-tooltip>
                  Delete Driver
                </q-tooltip>
              </q-btn>

            </q-td>

          </template>

        </q-table>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         DRIVER DETAILS DIALOG
    ====================================================== -->
    <q-dialog v-model="detailsDialog">

      <q-card class="driver-details-dialog">

        <q-card-section class="row items-center justify-between">

          <div>

            <div class="text-h6 text-weight-bold">
              Driver Details
            </div>

            <div class="text-caption text-grey-7">
              Driver information
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


        <q-card-section v-if="selectedDriver">

          <!-- PROFILE -->
          <div class="text-center q-mb-lg">

            <q-avatar
              size="90px"
              color="primary"
              text-color="white"
            >

              <img
                v-if="selectedDriver.image"
                :src="selectedDriver.image"
                alt="Driver"
                @error="handleImageError"
              />

              <span v-else>
                {{ getInitials(selectedDriver.name) }}
              </span>

            </q-avatar>


            <div class="text-h6 text-weight-bold q-mt-md">
              {{ selectedDriver.name }}
            </div>

            <div class="text-grey-7">
              {{ selectedDriver.mobile }}
            </div>


            <div class="q-mt-sm">

              <q-chip
                dense
                :color="getStatusColor(selectedDriver.status)"
                text-color="white"
              >
                <q-icon
                  :name="getStatusIcon(selectedDriver.status)"
                  size="15px"
                  class="q-mr-xs"
                />
                {{ selectedDriver.status }}
              </q-chip>


              <q-chip
                dense
                :color="
                  getAvailabilityColor(
                    selectedDriver.availability
                  )
                "
                text-color="white"
              >
                <q-icon
                  :name="
                    getAvailabilityIcon(
                      selectedDriver.availability
                    )
                  "
                  size="15px"
                  class="q-mr-xs"
                />
                {{ selectedDriver.availability }}
              </q-chip>

            </div>

          </div>


          <!-- PERSONAL INFORMATION -->
          <div class="detail-section">

            <div class="detail-section-title">
              Personal Information
            </div>

            <div class="row q-col-gutter-md">

              <div class="col-12 col-sm-6">
                <div class="detail-item">
                  <span>Full Name</span>
                  <strong>
                    {{ selectedDriver.name }}
                  </strong>
                </div>
              </div>


              <div class="col-12 col-sm-6">
                <div class="detail-item">
                  <span>Mobile Number</span>
                  <strong>
                    {{ selectedDriver.mobile }}
                  </strong>
                </div>
              </div>


              <div class="col-12 col-sm-6">
                <div class="detail-item">
                  <span>Email</span>
                  <strong>
                    {{ selectedDriver.email || '-' }}
                  </strong>
                </div>
              </div>


              <div class="col-12 col-sm-6">
                <div class="detail-item">
                  <span>Date of Birth</span>
                  <strong>
                    {{ formatDate(selectedDriver.dateOfBirth) }}
                  </strong>
                </div>
              </div>

            </div>

          </div>


          <!-- LICENSE -->
          <div class="detail-section">

            <div class="detail-section-title">
              Driving License
            </div>

            <div class="row q-col-gutter-md">

              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    License Number
                  </span>

                  <strong>
                    {{ selectedDriver.licenseNumber || '-' }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    License Expiry
                  </span>

                  <strong
                    :class="
                      isLicenseExpired(
                        selectedDriver.licenseExpiry
                      )
                        ? 'text-negative'
                        : ''
                    "
                  >
                    {{
                      formatDate(
                        selectedDriver.licenseExpiry
                      )
                    }}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          <!-- VEHICLE -->
          <div class="detail-section">

            <div class="detail-section-title">
              Assigned Vehicle
            </div>

            <div class="row q-col-gutter-md">

              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Vehicle
                  </span>

                  <strong>
                    {{
                      selectedDriver.vehicleName ||
                      'Not Assigned'
                    }}
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Registration Number
                  </span>

                  <strong>
                    {{
                      selectedDriver.vehicleRegistration ||
                      '-'
                    }}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          <!-- PROFESSIONAL -->
          <div class="detail-section">

            <div class="detail-section-title">
              Professional Information
            </div>

            <div class="row q-col-gutter-md">

              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Driving Experience
                  </span>

                  <strong>
                    {{ selectedDriver.experience || 0 }}
                    years
                  </strong>

                </div>

              </div>


              <div class="col-12 col-sm-6">

                <div class="detail-item">

                  <span>
                    Availability
                  </span>

                  <strong>
                    {{ selectedDriver.availability }}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          <!-- ADDRESS -->
          <div
            v-if="selectedDriver.address"
            class="detail-section"
          >

            <div class="detail-section-title">
              Address
            </div>

            <div class="notes-box">
              {{ selectedDriver.address }}
            </div>

          </div>

        </q-card-section>


        <!-- FOOTER -->
        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            color="grey-7"
            label="Close"
            v-close-popup
          />

          <q-btn
            v-if="selectedDriver"
            color="primary"
            icon="edit"
            label="Edit Driver"
            unelevated
            @click="editFromDetails"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- =====================================================
         ADD DRIVER DIALOG
    ====================================================== -->
    <q-dialog
      v-model="addDriverDialog"
      persistent
    >

      <q-card class="add-driver-dialog">

        <!-- HEADER -->
        <q-card-section class="row items-center justify-between">

          <div>

            <div class="text-h6 text-weight-bold">
              Add Driver
            </div>

            <div class="text-caption text-grey-7">
              Add a new driver to your agent account
            </div>

          </div>

          <q-btn
            flat
            round
            dense
            icon="close"
            :disable="savingDriver"
            @click="closeAddDriverDialog"
          />

        </q-card-section>


        <q-separator />


        <!-- FORM -->
        <q-form
          ref="addDriverForm"
          @submit.prevent="saveDriver"
        >

          <q-card-section class="dialog-body">

            <div class="row q-col-gutter-md">


              <!-- DRIVER IMAGE -->
              <div class="col-12 flex flex-center">

                <div class="driver-image-wrapper">

                  <q-avatar
                    size="90px"
                    color="blue-1"
                    text-color="primary"
                  >

                    <img
                      v-if="driverImagePreview"
                      :src="driverImagePreview"
                      alt="Driver"
                    />

                    <q-icon
                      v-else
                      name="person"
                      size="45px"
                    />

                  </q-avatar>


                  <q-btn
                    round
                    dense
                    size="sm"
                    color="primary"
                    icon="camera_alt"
                    class="image-upload-btn"
                    :disable="savingDriver"
                    @click="openImagePicker"
                  />

                </div>


                <q-file
                  ref="driverImageInput"
                  v-model="driverForm.image"
                  accept="image/*"
                  style="display: none"
                  @update:model-value="previewDriverImage"
                />

              </div>


              <!-- NAME -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model.trim="driverForm.name"
                  outlined
                  dense
                  label="Driver Name *"
                  :rules="[
                    val =>
                      !!val ||
                      'Driver name is required'
                  ]"
                >

                  <template #prepend>
                    <q-icon name="person" />
                  </template>

                </q-input>

              </div>


              <!-- MOBILE -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="driverForm.mobile"
                  outlined
                  dense
                  label="Mobile Number *"
                  type="tel"
                  maxlength="10"
                  @update:model-value="sanitizeMobile"
                  :rules="[
                    val =>
                      !!val ||
                      'Mobile number is required',

                    val =>
                      /^[6-9][0-9]{9}$/.test(val) ||
                      'Enter valid mobile number'
                  ]"
                >

                  <template #prepend>
                    <q-icon name="phone" />
                  </template>

                </q-input>

              </div>


              <!-- EMAIL -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model.trim="driverForm.email"
                  outlined
                  dense
                  type="email"
                  label="Email Address"
                >

                  <template #prepend>
                    <q-icon name="email" />
                  </template>

                </q-input>

              </div>


              <!-- DOB -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="driverForm.dateOfBirth"
                  outlined
                  dense
                  readonly
                  label="Date of Birth"
                >

                  <template #prepend>
                    <q-icon name="calendar_month" />
                  </template>

                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >

                    <q-date
                      v-model="driverForm.dateOfBirth"
                      mask="YYYY-MM-DD"
                    />

                  </q-popup-proxy>

                </q-input>

              </div>


              <!-- LICENSE NUMBER -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model.trim="driverForm.licenseNumber"
                  outlined
                  dense
                  label="Driving License Number *"
                  :rules="[
                    val =>
                      !!val ||
                      'License number is required'
                  ]"
                >

                  <template #prepend>
                    <q-icon name="badge" />
                  </template>

                </q-input>

              </div>


              <!-- LICENSE EXPIRY -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="driverForm.licenseExpiry"
                  outlined
                  dense
                  readonly
                  label="License Expiry *"
                  :rules="[
                    val =>
                      !!val ||
                      'License expiry is required'
                  ]"
                >

                  <template #prepend>
                    <q-icon name="event" />
                  </template>

                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >

                    <q-date
                      v-model="driverForm.licenseExpiry"
                      mask="YYYY-MM-DD"
                    />

                  </q-popup-proxy>

                </q-input>

              </div>


              <!-- EXPERIENCE -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model.number="driverForm.experience"
                  outlined
                  dense
                  type="number"
                  min="0"
                  max="50"
                  label="Driving Experience (Years)"
                >

                  <template #prepend>
                    <q-icon name="workspace_premium" />
                  </template>

                </q-input>

              </div>


              <!-- VEHICLE -->
              <div class="col-12 col-md-6">

                <q-select
                  v-model="driverForm.vehicleId"
                  outlined
                  dense
                  label="Assign Vehicle"
                  :options="vehicleOptions"
                  emit-value
                  map-options
                  clearable
                  :loading="vehiclesLoading"
                >

                  <template #prepend>
                    <q-icon name="directions_car" />
                  </template>

                  <template #no-option>

                    <q-item>

                      <q-item-section class="text-grey">
                        No vehicles available
                      </q-item-section>

                    </q-item>

                  </template>

                </q-select>

              </div>


              <!-- AVAILABILITY -->
              <div class="col-12 col-md-6">

                <q-select
                  v-model="driverForm.availability"
                  outlined
                  dense
                  label="Availability"
                  :options="availabilityOptions"
                  emit-value
                  map-options
                >

                  <template #prepend>
                    <q-icon name="person_pin_circle" />
                  </template>

                </q-select>

              </div>


              <!-- STATUS -->
              <div class="col-12 col-md-6">

                <div class="status-box">

                  <q-toggle
                    v-model="driverForm.status"
                    :true-value="'Active'"
                    :false-value="'Inactive'"
                    color="positive"
                  />

                  <div>

                    <div class="text-weight-medium">
                      Driver is {{ driverForm.status }}
                    </div>

                    <div class="text-caption text-grey-6">
                      Active drivers can be assigned to bookings.
                    </div>

                  </div>

                </div>

              </div>


              <!-- ADDRESS -->
              <div class="col-12">

                <q-input
                  v-model.trim="driverForm.address"
                  outlined
                  type="textarea"
                  rows="2"
                  label="Address"
                >

                  <template #prepend>
                    <q-icon name="location_on" />
                  </template>

                </q-input>

              </div>

            </div>

          </q-card-section>


          <q-separator />


          <!-- FOOTER -->
          <q-card-actions
            align="right"
            class="q-pa-md"
          >

            <q-btn
              flat
              color="grey-7"
              label="Cancel"
              :disable="savingDriver"
              @click="closeAddDriverDialog"
            />

            <q-btn
              color="primary"
              icon="save"
              label="Save Driver"
              unelevated
              type="submit"
              :loading="savingDriver"
            />

          </q-card-actions>

        </q-form>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>

import {
  ref,
  computed,
  onMounted,
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
   QUASAR / ROUTER
========================================================= */

const $q = useQuasar()

const router = useRouter()


/* =========================================================
   API ENDPOINTS
   Change these only if your backend routes are different.
========================================================= */

const DRIVERS_ENDPOINT = '/agents/drivers'

const VEHICLES_ENDPOINT = '/agents/vehicles'


/* =========================================================
   ADD DRIVER DIALOG
========================================================= */

const addDriverDialog = ref(false)

const addDriverForm = ref(null)

const savingDriver = ref(false)

const driverImageInput = ref(null)

const driverImagePreview = ref(null)


/* =========================================================
   DRIVER FORM
========================================================= */

const getDefaultDriverForm = () => ({
  name: '',
  mobile: '',
  email: '',
  dateOfBirth: '',
  licenseNumber: '',
  licenseExpiry: '',
  experience: 0,
  vehicleId: null,
  availability: 'Available',
  status: 'Active',
  address: '',
  image: null
})

const driverForm = ref(
  getDefaultDriverForm()
)


/* =========================================================
   VEHICLES
========================================================= */

const vehicleOptions = ref([])

const vehiclesLoading = ref(false)


/* =========================================================
   AVAILABILITY
========================================================= */

const availabilityOptions = [

  {
    label: 'Available',
    value: 'Available'
  },

  {
    label: 'Busy',
    value: 'Busy'
  },

  {
    label: 'On Leave',
    value: 'On Leave'
  }

]


/* =========================================================
   TABLE COLUMNS
========================================================= */

const columns = [

  {
    name: 'driver',
    label: 'Driver',
    field: 'name',
    align: 'left',
    sortable: true
  },

  {
    name: 'license',
    label: 'License',
    field: 'licenseNumber',
    align: 'left',
    sortable: true
  },

  {
    name: 'experience',
    label: 'Experience',
    field: 'experience',
    align: 'left',
    sortable: true
  },

  {
    name: 'vehicle',
    label: 'Vehicle',
    field: 'vehicleName',
    align: 'left',
    sortable: true
  },

  {
    name: 'availability',
    label: 'Availability',
    field: 'availability',
    align: 'center',
    sortable: true
  },

  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'center',
    sortable: true
  },

  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'right'
  }

]


/* =========================================================
   PAGINATION
========================================================= */

const pagination = ref({

  page: 1,

  rowsPerPage: 10

})


/* =========================================================
   DRIVER DATA
========================================================= */

const drivers = ref([])

const loading = ref(false)


/* =========================================================
   FILTERS
========================================================= */

const search = ref('')

const statusFilter = ref(null)

const availabilityFilter = ref(null)


/* =========================================================
   STATUS OPTIONS
========================================================= */

const statusOptions = [

  {
    label: 'Active',
    value: 'Active'
  },

  {
    label: 'Inactive',
    value: 'Inactive'
  }

]


/* =========================================================
   DETAILS DIALOG
========================================================= */

const detailsDialog = ref(false)

const selectedDriver = ref(null)


/* =========================================================
   FILTERED DRIVERS
========================================================= */

const filteredDrivers = computed(() => {

  const keyword =
    search.value
      .toLowerCase()
      .trim()


  return drivers.value.filter(driver => {

    const matchesSearch =

      !keyword ||

      String(driver.name || '')
        .toLowerCase()
        .includes(keyword) ||

      String(driver.mobile || '')
        .toLowerCase()
        .includes(keyword) ||

      String(driver.email || '')
        .toLowerCase()
        .includes(keyword) ||

      String(driver.licenseNumber || '')
        .toLowerCase()
        .includes(keyword) ||

      String(driver.vehicleName || '')
        .toLowerCase()
        .includes(keyword) ||

      String(driver.vehicleRegistration || '')
        .toLowerCase()
        .includes(keyword)


    const matchesStatus =

      !statusFilter.value ||

      driver.status ===
      statusFilter.value


    const matchesAvailability =

      !availabilityFilter.value ||

      driver.availability ===
      availabilityFilter.value


    return (
      matchesSearch &&
      matchesStatus &&
      matchesAvailability
    )

  })

})


/* =========================================================
   SUMMARY COUNTS
========================================================= */

const activeDrivers = computed(() => {

  return drivers.value.filter(
    driver =>
      driver.status === 'Active'
  ).length

})


const availableDrivers = computed(() => {

  return drivers.value.filter(
    driver =>
      driver.availability === 'Available'
  ).length

})


const inactiveDrivers = computed(() => {

  return drivers.value.filter(
    driver =>
      driver.status === 'Inactive'
  ).length

})


/* =========================================================
   API ERROR MESSAGE
========================================================= */

const getApiErrorMessage = (
  error,
  fallback
) => {

  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  )

}


/* =========================================================
   GET DRIVERS
========================================================= */

const getDrivers = async () => {

  try {

    loading.value = true


    const response =
      await axios.get(
        DRIVERS_ENDPOINT
      )


    const responseData =
      response.data


    let data = []


    if (
      Array.isArray(responseData)
    ) {

      data = responseData

    } else if (
      Array.isArray(responseData?.data)
    ) {

      data = responseData.data

    } else if (
      Array.isArray(responseData?.rows)
    ) {

      data = responseData.rows

    } else if (
      Array.isArray(responseData?.drivers)
    ) {

      data = responseData.drivers

    }


    drivers.value =
      data.map(normalizeDriver)


  } catch (error) {

    console.error(
      'Get Drivers Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        getApiErrorMessage(
          error,
          'Unable to load drivers.'
        )

    })

  } finally {

    loading.value = false

  }

}


/* =========================================================
   NORMALIZE DRIVER
========================================================= */

const normalizeDriver = driver => {

  return {

    id:
      driver.id ??
      driver.driverId,

    name:
      driver.name ||
      driver.driverName ||
      driver.user?.name ||
      'Driver',

    mobile:
      driver.mobile ||
      driver.phone ||
      driver.mobileNumber ||
      driver.user?.mobile ||
      driver.user?.phone ||
      '-',

    email:
      driver.email ||
      driver.user?.email ||
      '',

    image:
      driver.image ||
      driver.profileImage ||
      driver.profile_image ||
      driver.avatar ||
      driver.user?.image ||
      '',

    dateOfBirth:
      driver.dateOfBirth ||
      driver.date_of_birth ||
      driver.dob ||
      '',

    licenseNumber:
      driver.licenseNumber ||
      driver.license_number ||
      driver.drivingLicenseNumber ||
      driver.driving_license_number ||
      '',

    licenseExpiry:
      driver.licenseExpiry ||
      driver.license_expiry ||
      '',

    experience:
      Number(
        driver.experience ??
        driver.experienceYears ??
        driver.drivingExperience ??
        0
      ),

    vehicleId:
      driver.vehicleId ??
      driver.vehicle?.id ??
      null,

    vehicleName:
      driver.vehicleName ||
      driver.vehicle?.name ||
      driver.vehicle?.vehicleName ||
      '',

    vehicleRegistration:
      driver.vehicleRegistration ||
      driver.vehicle?.registrationNumber ||
      driver.vehicle?.registration_number ||
      driver.vehicle?.registration ||
      '',

    availability:
      driver.availability ||
      driver.availabilityStatus ||
      'Available',

    status:
      driver.status ||
      'Active',

    address:
      driver.address ||
      driver.fullAddress ||
      driver.full_address ||
      ''

  }

}


/* =========================================================
   LOAD VEHICLES
========================================================= */

const getVehicles = async () => {

  try {

    vehiclesLoading.value = true


    const response =
      await axios.get(
        VEHICLES_ENDPOINT
      )


    const responseData =
      response.data


    let data = []


    if (
      Array.isArray(responseData)
    ) {

      data = responseData

    } else if (
      Array.isArray(responseData?.data)
    ) {

      data = responseData.data

    } else if (
      Array.isArray(responseData?.rows)
    ) {

      data = responseData.rows

    } else if (
      Array.isArray(responseData?.vehicles)
    ) {

      data = responseData.vehicles

    }


    vehicleOptions.value =
      data.map(vehicle => ({

        label:
          vehicle.name ||
          vehicle.vehicleName ||
          vehicle.model ||
          `Vehicle ${vehicle.id}`,

        value:
          vehicle.id

      }))


  } catch (error) {

    console.error(
      'Get Vehicles Error:',
      error
    )


    $q.notify({

      type: 'warning',

      message:
        getApiErrorMessage(
          error,
          'Unable to load vehicles.'
        )

    })

  } finally {

    vehiclesLoading.value = false

  }

}


/* =========================================================
   OPEN ADD DRIVER
========================================================= */

const openAddDriverDialog = async () => {

  resetDriverForm()

  addDriverDialog.value = true

  await getVehicles()

}


/* =========================================================
   CLOSE ADD DRIVER
========================================================= */

const closeAddDriverDialog = () => {

  if (savingDriver.value) {
    return
  }


  addDriverDialog.value = false

  resetDriverForm()

}


/* =========================================================
   RESET FORM
========================================================= */

const resetDriverForm = () => {

  driverForm.value =
    getDefaultDriverForm()


  driverImagePreview.value =
    null


  if (addDriverForm.value) {

    addDriverForm.value.resetValidation()

  }

}


/* =========================================================
   IMAGE PICKER
========================================================= */

const openImagePicker = () => {

  driverImageInput.value?.pickFiles()

}


/* =========================================================
   IMAGE PREVIEW
========================================================= */

const previewDriverImage = file => {

  if (
    driverImagePreview.value
  ) {

    URL.revokeObjectURL(
      driverImagePreview.value
    )

    driverImagePreview.value =
      null

  }


  if (!file) {
    return
  }


  driverImagePreview.value =
    URL.createObjectURL(file)

}


/* =========================================================
   IMAGE ERROR
========================================================= */

const handleImageError = event => {

  event.target.style.display =
    'none'

}


/* =========================================================
   MOBILE SANITIZE
========================================================= */

const sanitizeMobile = value => {

  driverForm.value.mobile =
    String(value || '')
      .replace(/\D/g, '')
      .substring(0, 10)

}


/* =========================================================
   SAVE DRIVER
========================================================= */

const saveDriver = async () => {

  const isValid =
    await addDriverForm.value?.validate()


  if (!isValid) {

    $q.notify({

      type: 'warning',

      message:
        'Please complete all required fields.'

    })

    return

  }


  try {

    savingDriver.value = true


    /*
     * FormData is used because the driver
     * can contain an image.
     */

    const formData =
      new FormData()


    formData.append(
      'name',
      driverForm.value.name.trim()
    )

    formData.append(
      'mobile',
      driverForm.value.mobile
    )


    if (
      driverForm.value.email
    ) {

      formData.append(
        'email',
        driverForm.value.email.trim()
      )

    }


    if (
      driverForm.value.dateOfBirth
    ) {

      formData.append(
        'dateOfBirth',
        driverForm.value.dateOfBirth
      )

    }


    formData.append(
      'licenseNumber',
      driverForm.value.licenseNumber.trim()
    )


    formData.append(
      'licenseExpiry',
      driverForm.value.licenseExpiry
    )


    formData.append(
      'experience',
      String(
        driverForm.value.experience || 0
      )
    )


    if (
      driverForm.value.vehicleId !== null &&
      driverForm.value.vehicleId !== ''
    ) {

      formData.append(
        'vehicleId',
        String(
          driverForm.value.vehicleId
        )
      )

    }


    formData.append(
      'availability',
      driverForm.value.availability
    )


    formData.append(
      'status',
      driverForm.value.status
    )


    if (
      driverForm.value.address
    ) {

      formData.append(
        'address',
        driverForm.value.address.trim()
      )

    }


    if (
      driverForm.value.image
    ) {

      formData.append(
        'image',
        driverForm.value.image
      )

    }


    const response =
      await axios.post(
        DRIVERS_ENDPOINT,
        formData
      )


    const createdDriver =
      response.data?.data ||
      response.data?.driver ||
      response.data


    /*
     * If backend returns the created driver,
     * immediately add it to the table.
     */

    if (
      createdDriver &&
      typeof createdDriver === 'object' &&
      !Array.isArray(createdDriver)
    ) {

      drivers.value.unshift(
        normalizeDriver(
          createdDriver
        )
      )

    } else {

      /*
       * Otherwise reload the complete
       * driver list.
       */

      await getDrivers()

    }


    $q.notify({

      type: 'positive',

      message:
        'Driver added successfully.'

    })


    addDriverDialog.value =
      false


    resetDriverForm()


  } catch (error) {

    console.error(
      'Save Driver Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        getApiErrorMessage(
          error,
          'Unable to add driver.'
        )

    })

  } finally {

    savingDriver.value = false

  }

}


/* =========================================================
   EDIT DRIVER
========================================================= */

const editDriver = driver => {

  if (!driver?.id) {

    $q.notify({

      type: 'warning',

      message:
        'Driver ID is missing.'

    })

    return

  }


  router.push({

    name: 'AgentEditDriver',

    params: {
      id: driver.id
    }

  }).catch(error => {

    console.error(
      'Edit Driver Navigation Error:',
      error
    )

  })

}


/* =========================================================
   EDIT FROM DETAILS
========================================================= */

const editFromDetails = () => {

  if (!selectedDriver.value) {
    return
  }


  const driverId =
    selectedDriver.value.id


  detailsDialog.value =
    false


  editDriver({
    id: driverId
  })

}


/* =========================================================
   VIEW DRIVER
========================================================= */

const viewDriver = driver => {

  selectedDriver.value =
    driver

  detailsDialog.value =
    true

}


/* =========================================================
   TOGGLE DRIVER STATUS
========================================================= */

const toggleDriverStatus = driver => {

  const newStatus =
    driver.status === 'Active'
      ? 'Inactive'
      : 'Active'


  const actionText =
    newStatus === 'Active'
      ? 'activate'
      : 'deactivate'


  $q.dialog({

    title:
      `${
        actionText.charAt(0).toUpperCase() +
        actionText.slice(1)
      } Driver`,

    message:
      `Are you sure you want to ${actionText} ${driver.name}?`,

    cancel: {
      label: 'Cancel',
      flat: true
    },

    persistent: true,

    ok: {

      label:
        newStatus === 'Active'
          ? 'Activate'
          : 'Deactivate',

      color:
        newStatus === 'Active'
          ? 'positive'
          : 'negative'

    }

  }).onOk(async () => {

    try {

      $q.loading.show({

        message:
          'Updating driver status...'

      })


      await axios.patch(

        `${DRIVERS_ENDPOINT}/${driver.id}/status`,

        {
          status: newStatus
        }

      )


      driver.status =
        newStatus


      $q.notify({

        type: 'positive',

        message:
          `Driver ${newStatus.toLowerCase()} successfully.`

      })


    } catch (error) {

      console.error(
        'Driver Status Error:',
        error
      )


      $q.notify({

        type: 'negative',

        message:
          getApiErrorMessage(
            error,
            'Unable to update driver status.'
          )

      })

    } finally {

      $q.loading.hide()

    }

  })

}


/* =========================================================
   DELETE DRIVER
========================================================= */

const deleteDriver = driver => {

  $q.dialog({

    title:
      'Delete Driver',

    message:
      `Are you sure you want to permanently delete ${driver.name}?`,

    cancel: {

      label: 'Cancel',

      flat: true

    },

    persistent: true,

    ok: {

      label: 'Delete',

      color: 'negative',

      icon: 'delete'

    }

  }).onOk(async () => {

    try {

      $q.loading.show({

        message:
          'Deleting driver...'

      })


      await axios.delete(

        `${DRIVERS_ENDPOINT}/${driver.id}`

      )


      drivers.value =
        drivers.value.filter(
          item =>
            item.id !== driver.id
        )


      if (
        selectedDriver.value?.id ===
        driver.id
      ) {

        selectedDriver.value =
          null

        detailsDialog.value =
          false

      }


      $q.notify({

        type: 'positive',

        message:
          'Driver deleted successfully.'

      })


    } catch (error) {

      console.error(
        'Delete Driver Error:',
        error
      )


      $q.notify({

        type: 'negative',

        message:
          getApiErrorMessage(
            error,
            'Unable to delete driver.'
          )

      })

    } finally {

      $q.loading.hide()

    }

  })

}


/* =========================================================
   GET INITIALS
========================================================= */

const getInitials = name => {

  if (!name) {
    return 'D'
  }


  return String(name)
    .trim()
    .split(/\s+/)
    .map(word =>
      word.charAt(0)
    )
    .join('')
    .substring(0, 2)
    .toUpperCase()

}


/* =========================================================
   FORMAT DATE
========================================================= */

const formatDate = date => {

  if (!date) {
    return '-'
  }


  const parsedDate =
    new Date(date)


  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {

    return date

  }


  return parsedDate.toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  )

}


/* =========================================================
   LICENSE EXPIRED
========================================================= */

const isLicenseExpired = date => {

  if (!date) {
    return false
  }


  const expiry =
    new Date(date)


  if (
    Number.isNaN(
      expiry.getTime()
    )
  ) {

    return false

  }


  const today =
    new Date()


  today.setHours(
    0,
    0,
    0,
    0
  )


  expiry.setHours(
    0,
    0,
    0,
    0
  )


  return expiry < today

}


/* =========================================================
   STATUS COLOR
========================================================= */

const getStatusColor = status => {

  switch (status) {

    case 'Active':
      return 'positive'

    case 'Inactive':
      return 'negative'

    default:
      return 'grey'

  }

}


/* =========================================================
   STATUS ICON
========================================================= */

const getStatusIcon = status => {

  switch (status) {

    case 'Active':
      return 'check_circle'

    case 'Inactive':
      return 'block'

    default:
      return 'help'

  }

}


/* =========================================================
   AVAILABILITY COLOR
========================================================= */

const getAvailabilityColor = availability => {

  switch (availability) {

    case 'Available':
      return 'positive'

    case 'Busy':
      return 'orange'

    case 'On Leave':
      return 'purple'

    default:
      return 'grey'

  }

}


/* =========================================================
   AVAILABILITY ICON
========================================================= */

const getAvailabilityIcon = availability => {

  switch (availability) {

    case 'Available':
      return 'person_pin_circle'

    case 'Busy':
      return 'schedule'

    case 'On Leave':
      return 'event_busy'

    default:
      return 'help'

  }

}


/* =========================================================
   LOAD PAGE
========================================================= */

onMounted(async () => {

  await getDrivers()

})


/* =========================================================
   CLEANUP IMAGE URL
========================================================= */

onBeforeUnmount(() => {

  if (
    driverImagePreview.value
  ) {

    URL.revokeObjectURL(
      driverImagePreview.value
    )

  }

})

</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.agent-drivers-page {
  background: #f5f7fb;
  min-height: 100%;
}


/* =========================================================
   SUMMARY CARD
========================================================= */

.summary-card {
  background: #ffffff;
  border-radius: 14px;
  transition: all 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 24px
    rgba(15, 23, 42, 0.08);
}


/* =========================================================
   MAIN CARD
========================================================= */

.main-card {
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
}


/* =========================================================
   TABLE
========================================================= */

.drivers-table {
  width: 100%;
}


/* =========================================================
   DRIVER AVATAR
========================================================= */

.driver-avatar {
  border: 1px solid #e5e7eb;
  overflow: hidden;
  flex-shrink: 0;
}

.driver-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


/* =========================================================
   LICENSE
========================================================= */

.license-number {
  font-weight: 600;
  letter-spacing: 0.4px;
}


/* =========================================================
   DETAILS DIALOG
========================================================= */

.driver-details-dialog {
  width: 700px;
  max-width: 95vw;
  border-radius: 16px;
  overflow: hidden;
}


/* =========================================================
   ADD DRIVER DIALOG
========================================================= */

.add-driver-dialog {
  width: 760px;
  max-width: 95vw;
  border-radius: 16px;
  overflow: hidden;
}


/* =========================================================
   DIALOG BODY
========================================================= */

.dialog-body {
  max-height: 70vh;
  overflow-y: auto;
}


/* =========================================================
   DETAIL SECTION
========================================================= */

.detail-section {
  margin-bottom: 20px;
}

.detail-section-title {
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 10px;
}


/* =========================================================
   DETAIL ITEM
========================================================= */

.detail-item {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 14px;
}

.detail-item span {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.detail-item strong {
  display: block;
  font-size: 14px;
  color: #1f2937;
  word-break: break-word;
}


/* =========================================================
   NOTES / ADDRESS
========================================================= */

.notes-box {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 14px;
  color: #4b5563;
  line-height: 1.6;
}


/* =========================================================
   DRIVER IMAGE
========================================================= */

.driver-image-wrapper {
  position: relative;
  display: inline-flex;
  margin-bottom: 15px;
}

.driver-image-wrapper .q-avatar {
  border: 2px solid #e5e7eb;
  overflow: hidden;
}

.driver-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-upload-btn {
  position: absolute;
  right: -5px;
  bottom: 0;
}


/* =========================================================
   STATUS BOX
========================================================= */

.status-box {
  min-height: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 768px) {

  .agent-drivers-page {
    padding: 12px !important;
  }

  .text-h5 {
    font-size: 21px;
  }

  .driver-details-dialog,
  .add-driver-dialog {
    width: 95vw;
  }

  .dialog-body {
    max-height: 65vh;
  }

}


/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 480px) {

  .agent-drivers-page {
    padding: 8px !important;
  }

  .summary-card {
    border-radius: 10px;
  }

  .main-card {
    border-radius: 10px;
  }

}

</style>
```
