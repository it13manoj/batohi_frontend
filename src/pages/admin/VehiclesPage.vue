<template>
  <q-page class="vehicles-page">

    <!-- ================================================= -->
    <!-- PAGE HEADER -->
    <!-- ================================================= -->
    <div class="page-header">

      <div>
        <div class="page-title">
          Vehicles
        </div>

        <div class="page-subtitle">
          Manage all vehicles available on BatohiDrive
        </div>
      </div>

      <q-btn
        color="primary"
        icon="add"
        label="Add Vehicle"
        unelevated
        no-caps
        @click="openAddVehicle"
      />

    </div>


    <!-- ================================================= -->
    <!-- STAT CARDS -->
    <!-- ================================================= -->
    <div class="row q-col-gutter-md q-mb-md">

      <!-- Total -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-content">

              <div>
                <div class="stat-label">
                  Total Vehicles
                </div>

                <div class="stat-value">
                  {{ vehicles.length }}
                </div>
              </div>

              <q-avatar
                size="52px"
                color="blue-1"
                text-color="primary"
              >
                <q-icon
                  name="directions_car"
                  size="28px"
                />
              </q-avatar>

            </div>
          </q-card-section>
        </q-card>
      </div>


      <!-- Available -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-content">

              <div>
                <div class="stat-label">
                  Available
                </div>

                <div class="stat-value">
                  {{ availableVehicles }}
                </div>
              </div>

              <q-avatar
                size="52px"
                color="green-1"
                text-color="positive"
              >
                <q-icon
                  name="check_circle"
                  size="28px"
                />
              </q-avatar>

            </div>
          </q-card-section>
        </q-card>
      </div>


      <!-- Booked -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-content">

              <div>
                <div class="stat-label">
                  Booked
                </div>

                <div class="stat-value">
                  {{ bookedVehicles }}
                </div>
              </div>

              <q-avatar
                size="52px"
                color="orange-1"
                text-color="orange"
              >
                <q-icon
                  name="event_available"
                  size="28px"
                />
              </q-avatar>

            </div>
          </q-card-section>
        </q-card>
      </div>


      <!-- Maintenance -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-content">

              <div>
                <div class="stat-label">
                  Maintenance
                </div>

                <div class="stat-value">
                  {{ maintenanceVehicles }}
                </div>
              </div>

              <q-avatar
                size="52px"
                color="red-1"
                text-color="negative"
              >
                <q-icon
                  name="build"
                  size="28px"
                />
              </q-avatar>

            </div>
          </q-card-section>
        </q-card>
      </div>

    </div>


    <!-- ================================================= -->
    <!-- VEHICLE TABLE -->
    <!-- ================================================= -->
    <q-card class="vehicle-card">

      <q-card-section>

        <!-- TABLE HEADER -->
        <div class="table-header">

          <div>
            <div class="table-title">
              Vehicle List
            </div>

            <div class="table-subtitle">
              View and manage all registered vehicles
            </div>
          </div>


          <div class="table-actions">

            <!-- Search -->
            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search vehicle..."
              style="width: 240px"
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>


            <!-- Type -->
            <q-select
              v-model="typeFilter"
              :options="typeOptions"
              outlined
              dense
              emit-value
              map-options
              style="width: 150px"
            />


            <!-- Status -->
            <q-select
              v-model="statusFilter"
              :options="statusOptions"
              outlined
              dense
              emit-value
              map-options
              style="width: 150px"
            />

          </div>

        </div>


        <!-- ================================================= -->
        <!-- TABLE -->
        <!-- ================================================= -->
        <q-table
          flat
          bordered
          class="vehicle-table q-mt-md"
          :rows="filteredVehicles"
          :columns="columns"
          row-key="id"
          :loading="loading"
          :rows-per-page-options="[10, 20, 50]"
        >

          <!-- VEHICLE -->
          <template #body-cell-vehicle="props">

            <q-td :props="props">

              <div class="vehicle-info">

                <q-avatar
                  size="55px"
                  rounded
                  color="grey-2"
                >

                  <img
                    v-if="props.row.vehicleImage"
                    :src="props.row.vehicleImage"
                    alt="Vehicle"
                  >

                  <q-icon
                    v-else
                    name="directions_car"
                    size="30px"
                    color="primary"
                  />

                </q-avatar>


                <div class="q-ml-md">

                  <div class="vehicle-name">
                    {{ props.row.name }}
                  </div>

                  <div class="vehicle-id">
                    ID: #{{ props.row.id }}
                  </div>

                </div>

              </div>

            </q-td>

          </template>


          <!-- VEHICLE TYPE -->
          <template #body-cell-type="props">

            <q-td :props="props">

              <q-badge
                color="blue-1"
                text-color="primary"
              >
                {{ props.row.type }}
              </q-badge>

            </q-td>

          </template>


          <!-- VEHICLE NUMBER -->
          <template #body-cell-vehicleNumber="props">

            <q-td :props="props">

              <span class="vehicle-number">
                {{ props.row.vehicleNumber || '-' }}
              </span>

            </q-td>

          </template>


          <!-- COLOR -->
          <template #body-cell-color="props">

            <q-td :props="props">

              <div class="color-cell">

                <span
                  class="color-dot"
                  :style="{
                    backgroundColor:
                      getColorCode(props.row.color)
                  }"
                ></span>

                {{ props.row.color || '-' }}

              </div>

            </q-td>

          </template>


          <!-- DRIVER -->
          <template #body-cell-driver="props">

            <q-td :props="props">

              <div class="driver-cell">
                <q-icon
                  name="person"
                  size="18px"
                  color="grey-6"
                  class="q-mr-xs"
                />

                {{ props.row.driverName || '-' }}

              </div>

            </q-td>

          </template>


          <!-- INSURANCE -->
          <template #body-cell-insurance="props">

            <q-td :props="props">

              <q-badge
                :color="
                  props.row.vehicleInsurance
                    ? 'positive'
                    : 'grey'
                "
              >
                {{
                  props.row.vehicleInsurance
                    ? 'Insured'
                    : 'Not Insured'
                }}
              </q-badge>

            </q-td>

          </template>


          <!-- STATUS -->
          <template #body-cell-status="props">

            <q-td :props="props">

              <q-badge
                :color="getStatusColor(props.row.status)"
                rounded
                class="status-badge"
              >

                <q-icon
                  :name="getStatusIcon(props.row.status)"
                  class="q-mr-xs"
                />

                {{ props.row.status }}

              </q-badge>

            </q-td>

          </template>


          <!-- ACTIONS -->
          <template #body-cell-actions="props">

            <q-td
              :props="props"
              class="text-center"
            >

              <!-- View -->
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="visibility"
                @click="viewVehicle(props.row)"
              >
                <q-tooltip>
                  View Vehicle
                </q-tooltip>
              </q-btn>


              <!-- Edit -->
              <q-btn
                flat
                round
                dense
                color="orange"
                icon="edit"
                @click="editVehicle(props.row)"
              >
                <q-tooltip>
                  Edit Vehicle
                </q-tooltip>
              </q-btn>


              <!-- Delete -->
              <q-btn
                flat
                round
                dense
                color="negative"
                icon="delete"
                @click="deleteVehicle(props.row)"
              >
                <q-tooltip>
                  Delete Vehicle
                </q-tooltip>
              </q-btn>

            </q-td>

          </template>


          <!-- NO DATA -->
          <template #no-data>

            <div class="full-width text-center q-pa-xl">

              <q-icon
                name="directions_car"
                size="60px"
                color="grey-5"
              />

              <div class="text-h6 text-grey-7 q-mt-md">
                No vehicles found
              </div>

              <div class="text-grey-5">
                Try changing your search or filter.
              </div>

            </div>

          </template>

        </q-table>

      </q-card-section>

    </q-card>


    <!-- ================================================= -->
    <!-- ADD / EDIT VEHICLE DIALOG -->
    <!-- ================================================= -->
    <q-dialog
      v-model="vehicleDialog"
      persistent
    >

      <q-card
        class="vehicle-form-card"
      >

        <!-- FORM HEADER -->
        <q-card-section class="form-header">

          <div>

            <div class="form-title">
              {{ editMode ? 'Edit Vehicle' : 'Add Vehicle' }}
            </div>

            <div class="form-subtitle">
              {{
                editMode
                  ? 'Update vehicle information'
                  : 'Enter vehicle information'
              }}
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
        <q-card-section class="form-body">

          <!-- ================================================= -->
          <!-- VEHICLE BASIC INFORMATION -->
          <!-- ================================================= -->

          <div class="section-title">
            <q-icon
              name="directions_car"
              color="primary"
              class="q-mr-sm"
            />
            Vehicle Information
          </div>


          <div class="row q-col-gutter-md">

            <!-- Vehicle Name -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="vehicleForm.name"
                label="Vehicle Name *"
                placeholder="Example: Toyota Innova Crysta"
                outlined
                dense
              />

            </div>


            <!-- Vehicle Type -->
            <div class="col-12 col-md-6">

              <q-select
                v-model="vehicleForm.type"
                label="Vehicle Type *"
                :options="vehicleTypeOptions"
                outlined
                dense
              />

            </div>


            <!-- Brand -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="vehicleForm.brand"
                label="Brand *"
                placeholder="Example: Toyota"
                outlined
                dense
              />

            </div>


            <!-- Model -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="vehicleForm.model"
                label="Model"
                placeholder="Example: Innova Crysta"
                outlined
                dense
              />

            </div>


            <!-- Vehicle Number -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="vehicleForm.vehicleNumber"
                label="Vehicle Number *"
                placeholder="Example: BR01AB1234"
                outlined
                dense
                maxlength="20"
              >
                <template #prepend>
                  <q-icon name="confirmation_number" />
                </template>
              </q-input>

            </div>


            <!-- Manufacturing Year -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="vehicleForm.year"
                label="Manufacturing Year"
                type="number"
                outlined
                dense
              />

            </div>


            <!-- Price -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="vehicleForm.price"
                label="Price Per Day"
                type="number"
                prefix="₹"
                outlined
                dense
              />

            </div>


            <!-- Seats -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="vehicleForm.seats"
                label="Number of Seats"
                type="number"
                outlined
                dense
              />

            </div>


            <!-- Fuel -->
            <div class="col-12 col-md-6">

              <q-select
                v-model="vehicleForm.fuel"
                label="Fuel Type"
                :options="fuelOptions"
                outlined
                dense
              />

            </div>


            <!-- Transmission -->
            <div class="col-12 col-md-6">

              <q-select
                v-model="vehicleForm.transmission"
                label="Transmission"
                :options="transmissionOptions"
                outlined
                dense
              />

            </div>


            <!-- Vehicle Color -->
            <div class="col-12 col-md-6">

              <q-select
                v-model="vehicleForm.color"
                label="Vehicle Color *"
                :options="colorOptions"
                outlined
                dense
              />

            </div>


            <!-- Status -->
            <div class="col-12 col-md-6">

              <q-select
                v-model="vehicleForm.status"
                label="Status"
                :options="vehicleStatusOptions"
                outlined
                dense
              />

            </div>

          </div>


          <!-- ================================================= -->
          <!-- DRIVER INFORMATION -->
          <!-- ================================================= -->

          <div class="section-title q-mt-lg">

            <q-icon
              name="person"
              color="primary"
              class="q-mr-sm"
            />

            Driver Information

          </div>


          <div class="row q-col-gutter-md">

            <!-- Driver Name -->
            <div class="col-12">

              <q-input
                v-model="vehicleForm.driverName"
                label="Driver Name"
                placeholder="Enter driver name"
                outlined
                dense
              >
                <template #prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

            </div>

          </div>


          <!-- ================================================= -->
          <!-- VEHICLE INSURANCE -->
          <!-- ================================================= -->

          <div class="section-title q-mt-lg">

            <q-icon
              name="verified_user"
              color="primary"
              class="q-mr-sm"
            />

            Vehicle Insurance

          </div>


          <div class="row q-col-gutter-md">

            <!-- Insurance -->
            <div class="col-12 col-md-6">

              <q-select
                v-model="vehicleForm.vehicleInsurance"
                label="Vehicle Insurance"
                :options="insuranceOptions"
                emit-value
                map-options
                outlined
                dense
              />

            </div>


            <!-- Insurance Number -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="vehicleForm.insuranceNumber"
                label="Insurance Number"
                placeholder="Enter insurance number"
                outlined
                dense
              />

            </div>


            <!-- Insurance Expiry -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="vehicleForm.insuranceExpiry"
                label="Insurance Expiry Date"
                type="date"
                outlined
                dense
              />

            </div>

          </div>


          <!-- ================================================= -->
          <!-- VEHICLE IMAGE -->
          <!-- ================================================= -->

          <div class="section-title q-mt-lg">

            <q-icon
              name="image"
              color="primary"
              class="q-mr-sm"
            />

            Vehicle Images

          </div>


          <div class="row q-col-gutter-md">

            <!-- Vehicle Image -->
            <div class="col-12 col-md-6">

              <div class="upload-label">
                Vehicle Image
              </div>

              <q-file
                v-model="vehicleImageFile"
                outlined
                dense
                accept="image/*"
                label="Upload Vehicle Image"
                @update:model-value="
                  handleVehicleImage
                "
              >

                <template #prepend>
                  <q-icon name="directions_car" />
                </template>

              </q-file>


              <div
                v-if="vehicleForm.vehicleImage"
                class="image-preview-box"
              >

                <img
                  :src="vehicleForm.vehicleImage"
                  alt="Vehicle Image"
                />

              </div>

            </div>


            <!-- Number Plate Image -->
            <div class="col-12 col-md-6">

              <div class="upload-label">
                Number Plate Image
              </div>

              <q-file
                v-model="numberPlateImageFile"
                outlined
                dense
                accept="image/*"
                label="Upload Number Plate Image"
                @update:model-value="
                  handleNumberPlateImage
                "
              >

                <template #prepend>
                  <q-icon name="crop_16_9" />
                </template>

              </q-file>


              <div
                v-if="vehicleForm.numberPlateImage"
                class="image-preview-box"
              >

                <img
                  :src="vehicleForm.numberPlateImage"
                  alt="Number Plate"
                />

              </div>

            </div>


            <!-- Insurance Image -->
            <div class="col-12 col-md-6">

              <div class="upload-label">
                Insurance Image
              </div>

              <q-file
                v-model="insuranceImageFile"
                outlined
                dense
                accept="image/*,.pdf"
                label="Upload Insurance Image"
                @update:model-value="
                  handleInsuranceImage
                "
              >

                <template #prepend>
                  <q-icon name="description" />
                </template>

              </q-file>


              <div
                v-if="vehicleForm.insuranceImage"
                class="image-preview-box"
              >

                <img
                  :src="vehicleForm.insuranceImage"
                  alt="Insurance"
                />

              </div>

            </div>

          </div>


          <!-- ================================================= -->
          <!-- DOCUMENT SUMMARY -->
          <!-- ================================================= -->

          <div class="document-note q-mt-lg">

            <q-icon
              name="info"
              size="20px"
              class="q-mr-sm"
            />

            Upload clear and valid images for the vehicle,
            number plate and insurance documents.

          </div>

        </q-card-section>


        <q-separator />


        <!-- FORM ACTIONS -->
        <q-card-actions
          align="right"
          class="form-actions"
        >

          <q-btn
            flat
            label="Cancel"
            color="grey-7"
            v-close-popup
          />

          <q-btn
            color="primary"
            :label="
              editMode
                ? 'Update Vehicle'
                : 'Add Vehicle'
            "
            unelevated
            icon="save"
            @click="saveVehicle"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- ================================================= -->
    <!-- VIEW VEHICLE DIALOG -->
    <!-- ================================================= -->
    <q-dialog v-model="viewDialog">

      <q-card
        v-if="selectedVehicle"
        class="view-card"
      >

        <!-- MAIN IMAGE -->
        <div class="vehicle-view-image">

          <img
            v-if="selectedVehicle.vehicleImage"
            :src="selectedVehicle.vehicleImage"
            alt="Vehicle"
          />

          <q-icon
            v-else
            name="directions_car"
            size="100px"
            color="grey-5"
          />

        </div>


        <!-- HEADER -->
        <q-card-section>

          <div class="row items-center">

            <div>

              <div class="text-h6">
                {{ selectedVehicle.name }}
              </div>

              <div class="text-caption text-grey">
                Vehicle ID #{{ selectedVehicle.id }}
              </div>

            </div>

            <q-space />

            <q-badge
              :color="
                getStatusColor(
                  selectedVehicle.status
                )
              "
              rounded
            >
              {{ selectedVehicle.status }}
            </q-badge>

          </div>

        </q-card-section>


        <q-separator />


        <!-- DETAILS -->
        <q-card-section>

          <div class="view-section-title">
            Vehicle Details
          </div>


          <div class="vehicle-details-grid">

            <div class="detail-item">
              <span>Vehicle Name</span>
              <strong>
                {{ selectedVehicle.name || '-' }}
              </strong>
            </div>


            <div class="detail-item">
              <span>Vehicle Number</span>
              <strong>
                {{ selectedVehicle.vehicleNumber || '-' }}
              </strong>
            </div>


            <div class="detail-item">
              <span>Brand</span>
              <strong>
                {{ selectedVehicle.brand || '-' }}
              </strong>
            </div>


            <div class="detail-item">
              <span>Model</span>
              <strong>
                {{ selectedVehicle.model || '-' }}
              </strong>
            </div>


            <div class="detail-item">
              <span>Type</span>
              <strong>
                {{ selectedVehicle.type || '-' }}
              </strong>
            </div>


            <div class="detail-item">
              <span>Vehicle Color</span>
              <strong>
                {{ selectedVehicle.color || '-' }}
              </strong>
            </div>


            <div class="detail-item">
              <span>Year</span>
              <strong>
                {{ selectedVehicle.year || '-' }}
              </strong>
            </div>


            <div class="detail-item">
              <span>Seats</span>
              <strong>
                {{ selectedVehicle.seats || '-' }}
              </strong>
            </div>


            <div class="detail-item">
              <span>Fuel</span>
              <strong>
                {{ selectedVehicle.fuel || '-' }}
              </strong>
            </div>


            <div class="detail-item">
              <span>Transmission</span>
              <strong>
                {{ selectedVehicle.transmission || '-' }}
              </strong>
            </div>


            <div class="detail-item">
              <span>Price / Day</span>
              <strong>
                ₹{{ selectedVehicle.price || 0 }}
              </strong>
            </div>


            <div class="detail-item">
              <span>Total Bookings</span>
              <strong>
                {{ selectedVehicle.bookings || 0 }}
              </strong>
            </div>

          </div>


          <!-- DRIVER -->
          <div class="view-section-title q-mt-lg">
            Driver Information
          </div>

          <div class="vehicle-details-grid">

            <div class="detail-item">
              <span>Driver Name</span>
              <strong>
                {{ selectedVehicle.driverName || '-' }}
              </strong>
            </div>

          </div>


          <!-- INSURANCE -->
          <div class="view-section-title q-mt-lg">
            Insurance Information
          </div>

          <div class="vehicle-details-grid">

            <div class="detail-item">
              <span>Vehicle Insurance</span>

              <strong>
                {{
                  selectedVehicle.vehicleInsurance
                    ? 'Insured'
                    : 'Not Insured'
                }}
              </strong>

            </div>


            <div class="detail-item">
              <span>Insurance Number</span>

              <strong>
                {{
                  selectedVehicle.insuranceNumber || '-'
                }}
              </strong>

            </div>


            <div class="detail-item">
              <span>Insurance Expiry</span>

              <strong>
                {{
                  selectedVehicle.insuranceExpiry || '-'
                }}
              </strong>

            </div>

          </div>


          <!-- DOCUMENT IMAGES -->
          <div class="view-section-title q-mt-lg">
            Vehicle Documents
          </div>


          <div class="document-preview-grid">

            <!-- Number Plate -->
            <div
              v-if="selectedVehicle.numberPlateImage"
              class="document-preview"
            >

              <div class="document-title">
                Number Plate
              </div>

              <img
                :src="
                  selectedVehicle.numberPlateImage
                "
                alt="Number Plate"
              />

            </div>


            <!-- Insurance -->
            <div
              v-if="selectedVehicle.insuranceImage"
              class="document-preview"
            >

              <div class="document-title">
                Insurance
              </div>

              <img
                :src="
                  selectedVehicle.insuranceImage
                "
                alt="Insurance"
              />

            </div>

          </div>

        </q-card-section>


        <q-card-actions align="right">

          <q-btn
            flat
            color="primary"
            label="Close"
            v-close-popup
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
  Notify
} from 'quasar'


// =====================================================
// STATE
// =====================================================

const loading = ref(false)

const search = ref('')

const typeFilter = ref('all')

const statusFilter = ref('all')

const vehicleDialog = ref(false)

const viewDialog = ref(false)

const editMode = ref(false)

const selectedVehicle = ref(null)


// =====================================================
// FILE STATES
// =====================================================

const vehicleImageFile = ref(null)

const numberPlateImageFile = ref(null)

const insuranceImageFile = ref(null)


// =====================================================
// FILTER OPTIONS
// =====================================================

const typeOptions = [

  {
    label: 'All Types',
    value: 'all'
  },

  {
    label: 'Car',
    value: 'Car'
  },

  {
    label: 'SUV',
    value: 'SUV'
  },

  {
    label: 'Sedan',
    value: 'Sedan'
  },

  {
    label: 'Hatchback',
    value: 'Hatchback'
  },

  {
    label: 'Luxury',
    value: 'Luxury'
  }

]


const statusOptions = [

  {
    label: 'All Status',
    value: 'all'
  },

  {
    label: 'Available',
    value: 'Available'
  },

  {
    label: 'Booked',
    value: 'Booked'
  },

  {
    label: 'Maintenance',
    value: 'Maintenance'
  },

  {
    label: 'Inactive',
    value: 'Inactive'
  }

]


const vehicleTypeOptions = [

  'Car',
  'SUV',
  'Sedan',
  'Hatchback',
  'Luxury'

]


const fuelOptions = [

  'Petrol',
  'Diesel',
  'CNG',
  'Electric',
  'Hybrid'

]


const transmissionOptions = [

  'Manual',
  'Automatic'

]


const vehicleStatusOptions = [

  'Available',
  'Booked',
  'Maintenance',
  'Inactive'

]


const colorOptions = [

  'White',
  'Black',
  'Silver',
  'Grey',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Orange',
  'Brown',
  'Other'

]


const insuranceOptions = [

  {
    label: 'Insured',
    value: true
  },

  {
    label: 'Not Insured',
    value: false
  }

]


// =====================================================
// FORM
// =====================================================

const getEmptyForm = () => ({

  id: null,

  // Basic
  name: '',
  type: 'Car',
  brand: '',
  model: '',
  vehicleNumber: '',
  year: '',
  price: '',
  seats: 5,
  fuel: 'Petrol',
  transmission: 'Manual',
  color: 'White',

  // Driver
  driverName: '',

  // Insurance
  vehicleInsurance: true,
  insuranceNumber: '',
  insuranceExpiry: '',

  // Images
  vehicleImage: '',
  numberPlateImage: '',
  insuranceImage: '',

  // System
  status: 'Available',
  bookings: 0

})


const vehicleForm = ref(
  getEmptyForm()
)


// =====================================================
// TABLE COLUMNS
// =====================================================

const columns = [

  {
    name: 'vehicle',
    label: 'Vehicle',
    field: 'name',
    align: 'left',
    sortable: true
  },

  {
    name: 'type',
    label: 'Type',
    field: 'type',
    align: 'center',
    sortable: true
  },

  {
    name: 'vehicleNumber',
    label: 'Vehicle Number',
    field: 'vehicleNumber',
    align: 'left',
    sortable: true
  },

  {
    name: 'color',
    label: 'Color',
    field: 'color',
    align: 'left',
    sortable: true
  },

  {
    name: 'driver',
    label: 'Driver',
    field: 'driverName',
    align: 'left'
  },

  {
    name: 'insurance',
    label: 'Insurance',
    field: 'vehicleInsurance',
    align: 'center'
  },

  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'center'
  },

  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center'
  }

]


// =====================================================
// DEMO VEHICLES
// =====================================================

const vehicles = ref([

  {

    id: 2001,

    name: 'Toyota Innova Crysta',

    type: 'SUV',

    brand: 'Toyota',

    model: 'Innova Crysta',

    vehicleNumber: 'BR01AB1234',

    year: 2024,

    price: 4500,

    seats: 7,

    fuel: 'Diesel',

    transmission: 'Automatic',

    color: 'White',

    driverName: 'Raj Kumar',

    vehicleInsurance: true,

    insuranceNumber: 'INS-TOY-2024-001',

    insuranceExpiry: '2027-04-20',

    numberPlateImage: '',

    vehicleImage: '',

    insuranceImage: '',

    bookings: 32,

    status: 'Available'

  },


  {

    id: 2002,

    name: 'Maruti Swift Dzire',

    type: 'Sedan',

    brand: 'Maruti Suzuki',

    model: 'Swift Dzire',

    vehicleNumber: 'BR01CD5678',

    year: 2023,

    price: 2800,

    seats: 5,

    fuel: 'Petrol',

    transmission: 'Manual',

    color: 'Silver',

    driverName: 'Amit Kumar',

    vehicleInsurance: true,

    insuranceNumber: 'INS-MAR-2023-002',

    insuranceExpiry: '2026-12-10',

    numberPlateImage: '',

    vehicleImage: '',

    insuranceImage: '',

    bookings: 25,

    status: 'Booked'

  },


  {

    id: 2003,

    name: 'Hyundai Creta',

    type: 'SUV',

    brand: 'Hyundai',

    model: 'Creta',

    vehicleNumber: 'BR01EF9012',

    year: 2024,

    price: 3800,

    seats: 5,

    fuel: 'Diesel',

    transmission: 'Automatic',

    color: 'Black',

    driverName: 'Sanjay Singh',

    vehicleInsurance: true,

    insuranceNumber: 'INS-HYU-2024-003',

    insuranceExpiry: '2027-01-15',

    numberPlateImage: '',

    vehicleImage: '',

    insuranceImage: '',

    bookings: 18,

    status: 'Available'

  },


  {

    id: 2004,

    name: 'Honda City',

    type: 'Sedan',

    brand: 'Honda',

    model: 'City',

    vehicleNumber: 'BR01GH3456',

    year: 2022,

    price: 3200,

    seats: 5,

    fuel: 'Petrol',

    transmission: 'Automatic',

    color: 'Red',

    driverName: 'Ravi Kumar',

    vehicleInsurance: true,

    insuranceNumber: 'INS-HON-2022-004',

    insuranceExpiry: '2026-09-25',

    numberPlateImage: '',

    vehicleImage: '',

    insuranceImage: '',

    bookings: 14,

    status: 'Maintenance'

  },


  {

    id: 2005,

    name: 'Mahindra XUV700',

    type: 'SUV',

    brand: 'Mahindra',

    model: 'XUV700',

    vehicleNumber: 'BR01IJ7890',

    year: 2024,

    price: 5200,

    seats: 7,

    fuel: 'Diesel',

    transmission: 'Automatic',

    color: 'Blue',

    driverName: 'Vijay Kumar',

    vehicleInsurance: true,

    insuranceNumber: 'INS-MAH-2024-005',

    insuranceExpiry: '2027-05-18',

    numberPlateImage: '',

    vehicleImage: '',

    insuranceImage: '',

    bookings: 27,

    status: 'Available'

  },


  {

    id: 2006,

    name: 'Tata Nexon',

    type: 'SUV',

    brand: 'Tata',

    model: 'Nexon',

    vehicleNumber: 'BR01KL1122',

    year: 2023,

    price: 3000,

    seats: 5,

    fuel: 'CNG',

    transmission: 'Manual',

    color: 'Grey',

    driverName: 'Deepak Kumar',

    vehicleInsurance: true,

    insuranceNumber: 'INS-TAT-2023-006',

    insuranceExpiry: '2026-11-30',

    numberPlateImage: '',

    vehicleImage: '',

    insuranceImage: '',

    bookings: 11,

    status: 'Booked'

  },


  {

    id: 2007,

    name: 'Maruti Baleno',

    type: 'Hatchback',

    brand: 'Maruti Suzuki',

    model: 'Baleno',

    vehicleNumber: 'BR01MN3344',

    year: 2023,

    price: 2400,

    seats: 5,

    fuel: 'Petrol',

    transmission: 'Manual',

    color: 'Blue',

    driverName: 'Manoj Kumar',

    vehicleInsurance: true,

    insuranceNumber: 'INS-MAR-2023-007',

    insuranceExpiry: '2027-02-20',

    numberPlateImage: '',

    vehicleImage: '',

    insuranceImage: '',

    bookings: 9,

    status: 'Available'

  },


  {

    id: 2008,

    name: 'BMW 5 Series',

    type: 'Luxury',

    brand: 'BMW',

    model: '5 Series',

    vehicleNumber: 'BR01OP5566',

    year: 2025,

    price: 8500,

    seats: 5,

    fuel: 'Petrol',

    transmission: 'Automatic',

    color: 'Black',

    driverName: 'Arun Singh',

    vehicleInsurance: true,

    insuranceNumber: 'INS-BMW-2025-008',

    insuranceExpiry: '2028-03-12',

    numberPlateImage: '',

    vehicleImage: '',

    insuranceImage: '',

    bookings: 6,

    status: 'Inactive'

  }

])


// =====================================================
// FILTERED VEHICLES
// =====================================================

const filteredVehicles = computed(() => {

  let result = vehicles.value


  // Search
  if (search.value) {

    const keyword =
      search.value
        .toLowerCase()
        .trim()


    result = result.filter(vehicle =>

      String(vehicle.name || '')
        .toLowerCase()
        .includes(keyword)

      ||

      String(vehicle.brand || '')
        .toLowerCase()
        .includes(keyword)

      ||

      String(vehicle.model || '')
        .toLowerCase()
        .includes(keyword)

      ||

      String(vehicle.vehicleNumber || '')
        .toLowerCase()
        .includes(keyword)

      ||

      String(vehicle.driverName || '')
        .toLowerCase()
        .includes(keyword)

      ||

      String(vehicle.color || '')
        .toLowerCase()
        .includes(keyword)

      ||

      String(vehicle.id)
        .includes(keyword)

    )

  }


  // Type
  if (
    typeFilter.value !== 'all'
  ) {

    result =
      result.filter(
        vehicle =>
          vehicle.type ===
          typeFilter.value
      )

  }


  // Status
  if (
    statusFilter.value !== 'all'
  ) {

    result =
      result.filter(
        vehicle =>
          vehicle.status ===
          statusFilter.value
      )

  }


  return result

})


// =====================================================
// STATISTICS
// =====================================================

const availableVehicles =
  computed(() => {

    return vehicles.value.filter(
      vehicle =>
        vehicle.status ===
        'Available'
    ).length

  })


const bookedVehicles =
  computed(() => {

    return vehicles.value.filter(
      vehicle =>
        vehicle.status ===
        'Booked'
    ).length

  })


const maintenanceVehicles =
  computed(() => {

    return vehicles.value.filter(
      vehicle =>
        vehicle.status ===
        'Maintenance'
    ).length

  })


// =====================================================
// STATUS COLOR
// =====================================================

const getStatusColor = (
  status
) => {

  switch (status) {

    case 'Available':
      return 'positive'

    case 'Booked':
      return 'primary'

    case 'Maintenance':
      return 'warning'

    case 'Inactive':
      return 'negative'

    default:
      return 'grey'

  }

}


// =====================================================
// STATUS ICON
// =====================================================

const getStatusIcon = (
  status
) => {

  switch (status) {

    case 'Available':
      return 'check_circle'

    case 'Booked':
      return 'event'

    case 'Maintenance':
      return 'build'

    case 'Inactive':
      return 'cancel'

    default:
      return 'info'

  }

}


// =====================================================
// COLOR CODE
// =====================================================

const getColorCode = (
  color
) => {

  const colors = {

    White: '#ffffff',

    Black: '#111827',

    Silver: '#c0c0c0',

    Grey: '#6b7280',

    Red: '#ef4444',

    Blue: '#3b82f6',

    Green: '#22c55e',

    Yellow: '#eab308',

    Orange: '#f97316',

    Brown: '#92400e',

    Other: '#9ca3af'

  }


  return colors[color] || '#9ca3af'

}


// =====================================================
// RESET FILES
// =====================================================

const resetFiles = () => {

  vehicleImageFile.value = null

  numberPlateImageFile.value = null

  insuranceImageFile.value = null

}


// =====================================================
// ADD VEHICLE
// =====================================================

const openAddVehicle = () => {

  editMode.value = false

  vehicleForm.value =
    getEmptyForm()

  resetFiles()

  vehicleDialog.value = true

}


// =====================================================
// EDIT VEHICLE
// =====================================================

const editVehicle = (
  vehicle
) => {

  editMode.value = true

  vehicleForm.value = {
    ...getEmptyForm(),
    ...vehicle
  }

  resetFiles()

  vehicleDialog.value = true

}


// =====================================================
// IMAGE HANDLERS
// =====================================================

const handleVehicleImage = (
  file
) => {

  if (!file) return

  const reader =
    new FileReader()

  reader.onload = event => {

    vehicleForm.value.vehicleImage =
      event.target.result

  }

  reader.readAsDataURL(file)

}


const handleNumberPlateImage = (
  file
) => {

  if (!file) return

  const reader =
    new FileReader()

  reader.onload = event => {

    vehicleForm.value.numberPlateImage =
      event.target.result

  }

  reader.readAsDataURL(file)

}


const handleInsuranceImage = (
  file
) => {

  if (!file) return

  // Preview only image files
  if (
    file.type &&
    file.type.startsWith('image/')
  ) {

    const reader =
      new FileReader()

    reader.onload = event => {

      vehicleForm.value.insuranceImage =
        event.target.result

    }

    reader.readAsDataURL(file)

  } else {

    vehicleForm.value.insuranceImage = ''

  }

}


// =====================================================
// SAVE VEHICLE
// =====================================================

const saveVehicle = () => {

  // Vehicle name
  if (
    !vehicleForm.value.name
      .trim()
  ) {

    Notify.create({

      type: 'warning',

      message:
        'Please enter vehicle name'

    })

    return

  }


  // Brand
  if (
    !vehicleForm.value.brand
      .trim()
  ) {

    Notify.create({

      type: 'warning',

      message:
        'Please enter vehicle brand'

    })

    return

  }


  // Vehicle number
  if (
    !vehicleForm.value.vehicleNumber
      .trim()
  ) {

    Notify.create({

      type: 'warning',

      message:
        'Please enter vehicle number'

    })

    return

  }


  // Edit
  if (editMode.value) {

    const index =
      vehicles.value.findIndex(
        vehicle =>
          vehicle.id ===
          vehicleForm.value.id
      )


    if (index !== -1) {

      vehicles.value[index] = {
        ...vehicles.value[index],
        ...vehicleForm.value
      }

    }


    Notify.create({

      type: 'positive',

      message:
        'Vehicle updated successfully'

    })

  }


  // Add
  else {

    const ids =
      vehicles.value.map(
        vehicle =>
          vehicle.id
      )


    const newId =
      ids.length
        ? Math.max(...ids) + 1
        : 2001


    const newVehicle = {

      ...vehicleForm.value,

      id: newId,

      bookings: 0

    }


    vehicles.value.unshift(
      newVehicle
    )


    Notify.create({

      type: 'positive',

      message:
        'Vehicle added successfully'

    })

  }


  vehicleDialog.value = false

  resetFiles()

}


// =====================================================
// VIEW VEHICLE
// =====================================================

const viewVehicle = (
  vehicle
) => {

  selectedVehicle.value =
    vehicle

  viewDialog.value = true

}


// =====================================================
// DELETE VEHICLE
// =====================================================

const deleteVehicle = (
  vehicle
) => {

  if (
    !confirm(
      `Are you sure you want to delete ${vehicle.name}?`
    )
  ) {

    return

  }


  const index =
    vehicles.value.findIndex(
      item =>
        item.id ===
        vehicle.id
    )


  if (index !== -1) {

    vehicles.value.splice(
      index,
      1
    )


    Notify.create({

      type: 'positive',

      message:
        'Vehicle deleted successfully'

    })

  }

}

</script>


<style scoped>

/* ================================================= */
/* PAGE */
/* ================================================= */

.vehicles-page {

  padding: 24px;

  background: #f5f7fb;

  min-height: 100vh;

}


/* ================================================= */
/* PAGE HEADER */
/* ================================================= */

.page-header {

  display: flex;

  justify-content:
    space-between;

  align-items: center;

  margin-bottom: 24px;

}

.page-title {

  font-size: 28px;

  font-weight: 700;

  color: #1f2937;

}

.page-subtitle {

  font-size: 14px;

  color: #6b7280;

  margin-top: 4px;

}


/* ================================================= */
/* STAT CARDS */
/* ================================================= */

.stat-card {

  border-radius: 14px;

  background: #ffffff;

  box-shadow:
    0 3px 15px
    rgba(0, 0, 0, 0.05);

}

.stat-content {

  display: flex;

  justify-content:
    space-between;

  align-items: center;

}

.stat-label {

  color: #6b7280;

  font-size: 14px;

}

.stat-value {

  color: #1f2937;

  font-size: 28px;

  font-weight: 700;

  margin-top: 6px;

}


/* ================================================= */
/* VEHICLE CARD */
/* ================================================= */

.vehicle-card {

  border-radius: 14px;

  background: #ffffff;

  box-shadow:
    0 3px 15px
    rgba(0, 0, 0, 0.05);

}


/* ================================================= */
/* TABLE HEADER */
/* ================================================= */

.table-header {

  display: flex;

  justify-content:
    space-between;

  align-items: center;

  gap: 20px;

}

.table-title {

  font-size: 19px;

  font-weight: 700;

}

.table-subtitle {

  color: #888;

  font-size: 13px;

  margin-top: 3px;

}

.table-actions {

  display: flex;

  align-items: center;

  gap: 10px;

}


/* ================================================= */
/* VEHICLE */
/* ================================================= */

.vehicle-info {

  display: flex;

  align-items: center;

}

.vehicle-name {

  font-weight: 600;

  color: #1f2937;

}

.vehicle-id {

  font-size: 11px;

  color: #999;

  margin-top: 2px;

}

.vehicle-number {

  font-weight: 600;

  letter-spacing: .5px;

}

.driver-cell {

  display: flex;

  align-items: center;

}


/* ================================================= */
/* COLOR */
/* ================================================= */

.color-cell {

  display: flex;

  align-items: center;

  gap: 8px;

}

.color-dot {

  width: 15px;

  height: 15px;

  border-radius: 50%;

  border: 1px solid #d1d5db;

  display: inline-block;

}


/* ================================================= */
/* STATUS */
/* ================================================= */

.status-badge {

  padding: 6px 10px;

}


/* ================================================= */
/* FORM DIALOG */
/* ================================================= */

.vehicle-form-card {

  width: 850px;

  max-width: 95vw;

  border-radius: 14px;

  overflow: hidden;

}

.form-header {

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  padding: 20px 24px;

}

.form-title {

  font-size: 20px;

  font-weight: 700;

  color: #1f2937;

}

.form-subtitle {

  color: #888;

  font-size: 13px;

  margin-top: 4px;

}

.form-body {

  max-height: 75vh;

  overflow-y: auto;

  padding: 24px;

}

.form-actions {

  padding: 15px 24px;

}


/* ================================================= */
/* FORM SECTION */
/* ================================================= */

.section-title {

  display: flex;

  align-items: center;

  font-size: 16px;

  font-weight: 700;

  color: #1f2937;

  padding-bottom: 12px;

  margin-bottom: 16px;

  border-bottom:
    1px solid #edf0f4;

}

.upload-label {

  font-size: 13px;

  font-weight: 600;

  color: #4b5563;

  margin-bottom: 7px;

}


/* ================================================= */
/* IMAGE PREVIEW */
/* ================================================= */

.image-preview-box {

  width: 100%;

  height: 150px;

  margin-top: 10px;

  border-radius: 8px;

  overflow: hidden;

  background: #f5f7fb;

  border: 1px solid #e5e7eb;

  display: flex;

  justify-content: center;

  align-items: center;

}

.image-preview-box img {

  width: 100%;

  height: 100%;

  object-fit: contain;

}


/* ================================================= */
/* NOTE */
/* ================================================= */

.document-note {

  display: flex;

  align-items: center;

  padding: 12px 14px;

  border-radius: 8px;

  background: #eff6ff;

  color: #2563eb;

  font-size: 13px;

}


/* ================================================= */
/* VIEW CARD */
/* ================================================= */

.view-card {

  width: 700px;

  max-width: 95vw;

  border-radius: 14px;

  overflow: hidden;

}


/* ================================================= */
/* VIEW IMAGE */
/* ================================================= */

.vehicle-view-image {

  height: 260px;

  display: flex;

  justify-content: center;

  align-items: center;

  background: #f5f7fb;

  overflow: hidden;

}

.vehicle-view-image img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


/* ================================================= */
/* VIEW SECTION */
/* ================================================= */

.view-section-title {

  font-size: 16px;

  font-weight: 700;

  color: #1f2937;

  margin-bottom: 12px;

}


/* ================================================= */
/* VEHICLE DETAILS */
/* ================================================= */

.vehicle-details-grid {

  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 12px;

}

.detail-item {

  padding: 12px;

  border-radius: 8px;

  background: #f7f8fa;

}

.detail-item span {

  display: block;

  font-size: 12px;

  color: #888;

  margin-bottom: 4px;

}

.detail-item strong {

  font-size: 14px;

  color: #222;

}


/* ================================================= */
/* DOCUMENT PREVIEW */
/* ================================================= */

.document-preview-grid {

  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 15px;

}

.document-preview {

  border: 1px solid #e5e7eb;

  border-radius: 10px;

  overflow: hidden;

  background: #f9fafb;

}

.document-title {

  padding: 10px;

  font-size: 13px;

  font-weight: 600;

  color: #374151;

}

.document-preview img {

  width: 100%;

  height: 150px;

  object-fit: contain;

  background: #ffffff;

}


/* ================================================= */
/* MOBILE */
/* ================================================= */

@media (max-width: 900px) {

  .table-header {

    flex-direction: column;

    align-items: stretch;

  }

  .table-actions {

    flex-wrap: wrap;

  }

  .vehicle-form-card {

    width: 95vw;

  }

}


@media (max-width: 600px) {

  .vehicles-page {

    padding: 15px;

  }

  .page-header {

    flex-direction: column;

    align-items: flex-start;

    gap: 15px;

  }

  .table-actions {

    flex-direction: column;

    align-items: stretch;

  }

  .table-actions .q-input,
  .table-actions .q-select {

    width: 100% !important;

  }

  .vehicle-details-grid {

    grid-template-columns: 1fr;

  }

  .document-preview-grid {

    grid-template-columns: 1fr;

  }

  .form-body {

    padding: 16px;

  }

}

</style>
