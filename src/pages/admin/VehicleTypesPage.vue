<template>
  <q-page class="vehicle-types-page">

    <!-- ========================================= -->
    <!-- PAGE HEADER -->
    <!-- ========================================= -->

    <div class="page-header">

      <div>
        <div class="page-title">
          Vehicle Types
        </div>

        <div class="page-subtitle">
          Manage vehicle categories available on BatohiDrive
        </div>
      </div>

      <q-btn
        unelevated
        color="primary"
        icon="add"
        label="Add Vehicle Type"
        @click="openAddDialog"
      />

    </div>


    <!-- ========================================= -->
    <!-- STATISTICS -->
    <!-- ========================================= -->

    <div class="row q-col-gutter-md q-mb-lg">

      <!-- Total Types -->
      <div class="col-12 col-sm-6 col-md-4">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <q-avatar
                color="blue-1"
                text-color="primary"
                size="50px"
              >
                <q-icon
                  name="category"
                  size="28px"
                />
              </q-avatar>

              <div class="stat-info">

                <div class="stat-label">
                  Total Types
                </div>

                <div class="stat-value">
                  {{ totalTypes }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Active Types -->
      <div class="col-12 col-sm-6 col-md-4">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <q-avatar
                color="green-1"
                text-color="positive"
                size="50px"
              >
                <q-icon
                  name="check_circle"
                  size="28px"
                />
              </q-avatar>

              <div class="stat-info">

                <div class="stat-label">
                  Active Types
                </div>

                <div class="stat-value">
                  {{ activeTypes }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Inactive Types -->
      <div class="col-12 col-sm-6 col-md-4">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <q-avatar
                color="red-1"
                text-color="negative"
                size="50px"
              >
                <q-icon
                  name="cancel"
                  size="28px"
                />
              </q-avatar>

              <div class="stat-info">

                <div class="stat-label">
                  Inactive Types
                </div>

                <div class="stat-value">
                  {{ inactiveTypes }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- ========================================= -->
    <!-- VEHICLE TYPES CARD -->
    <!-- ========================================= -->

    <q-card class="vehicle-type-card">

      <!-- TABLE HEADER -->
      <q-card-section class="table-header">

        <div>

          <div class="table-title">
            Vehicle Type List
          </div>

          <div class="table-subtitle">
            Manage vehicle categories
          </div>

        </div>


        <div class="table-actions">

          <!-- Search -->
          <q-input
            v-model="search"
            outlined
            dense
            debounce="300"
            placeholder="Search vehicle type..."
            clearable
            class="search-input"
          >

            <template #prepend>
              <q-icon name="search" />
            </template>

          </q-input>


          <!-- Status Filter -->
          <q-select
            v-model="statusFilter"
            :options="statusOptions"
            outlined
            dense
            emit-value
            map-options
            label="Status"
            class="status-filter"
          />

        </div>

      </q-card-section>


      <q-separator />


      <!-- ========================================= -->
      <!-- TABLE -->
      <!-- ========================================= -->

      <q-table
        :rows="filteredVehicleTypes"
        :columns="columns"
        row-key="id"
        flat
        :loading="loading"
        v-model:pagination="pagination"
        no-data-label="No vehicle types found"
        class="vehicle-type-table"
      >

        <!-- ===================================== -->
        <!-- VEHICLE TYPE -->
        <!-- ===================================== -->

        <template #body-cell-type="props">

          <q-td :props="props">

            <div class="vehicle-type-info">

              <q-avatar
                size="52px"
                color="blue-1"
                text-color="primary"
                rounded
              >

                <img
                  v-if="props.row.image"
                  :src="props.row.image"
                  alt="Vehicle Type"
                >

                <q-icon
                  v-else
                  :name="props.row.icon || 'directions_car'"
                  size="28px"
                />

              </q-avatar>


              <div class="vehicle-type-details">

                <div class="vehicle-type-name">
                  {{ props.row.name }}
                </div>

              </div>

            </div>

          </q-td>

        </template>


        <!-- ===================================== -->
        <!-- DESCRIPTION -->
        <!-- ===================================== -->

        <template #body-cell-description="props">

          <q-td :props="props">

            <div class="description">
              {{ props.row.description || '—' }}
            </div>

          </q-td>

        </template>


        <!-- ===================================== -->
        <!-- SEATS -->
        <!-- ===================================== -->

        <template #body-cell-seats="props">

          <q-td
            :props="props"
            class="text-center"
          >

            <q-chip
              dense
              color="blue-1"
              text-color="primary"
              icon="airline_seat_recline_normal"
            >

              {{ props.row.seats }}

            </q-chip>

          </q-td>

        </template>


        <!-- ===================================== -->
        <!-- VEHICLES -->
        <!-- ===================================== -->

        <template #body-cell-vehicles="props">

          <q-td
            :props="props"
            class="text-center"
          >

            <div class="vehicle-count">

              <q-icon
                name="directions_car"
                color="primary"
                size="18px"
                class="q-mr-xs"
              />

              {{ props.row.vehicles }}

            </div>

          </q-td>

        </template>


        <!-- ===================================== -->
        <!-- STATUS -->
        <!-- ===================================== -->

        <template #body-cell-status="props">

          <q-td
            :props="props"
            class="text-center"
          >

            <q-chip
              dense
              :color="getStatusColor(props.row.status)"
              :text-color="getStatusTextColor(props.row.status)"
            >

              <q-icon
                :name="getStatusIcon(props.row.status)"
                size="16px"
                class="q-mr-xs"
              />

              {{ props.row.status }}

            </q-chip>

          </q-td>

        </template>


        <!-- ===================================== -->
        <!-- ACTIONS -->
        <!-- ===================================== -->

        <template #body-cell-actions="props">

          <q-td
            :props="props"
            class="text-right"
          >

            <!-- View -->
            <q-btn
              flat
              round
              dense
              icon="visibility"
              color="primary"
              @click="viewVehicleType(props.row)"
            >

              <q-tooltip>
                View
              </q-tooltip>

            </q-btn>


            <!-- Edit -->
            <q-btn
              flat
              round
              dense
              icon="edit"
              color="warning"
              @click="editVehicleType(props.row)"
            >

              <q-tooltip>
                Edit
              </q-tooltip>

            </q-btn>


            <!-- Delete -->
            <q-btn
              flat
              round
              dense
              icon="delete"
              color="negative"
              @click="confirmDelete(props.row)"
            >

              <q-tooltip>
                Delete
              </q-tooltip>

            </q-btn>

          </q-td>

        </template>

      </q-table>

    </q-card>


    <!-- ========================================= -->
    <!-- ADD / EDIT DIALOG -->
    <!-- ========================================= -->

    <q-dialog v-model="vehicleTypeDialog">

      <q-card
        style="width: 650px; max-width: 95vw"
      >

        <!-- Header -->
        <q-card-section class="row items-center">

          <div class="text-h6">

            {{
              editingVehicleType
                ? 'Edit Vehicle Type'
                : 'Add Vehicle Type'
            }}

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


        <!-- Form -->
        <q-card-section>

          <div class="row q-col-gutter-md">

            <!-- Vehicle Type Name -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="vehicleTypeForm.name"
                outlined
                label="Vehicle Type Name *"
              />

            </div>


            <!-- Number of Seats -->
            <div class="col-12 col-md-6">

              <q-input
                v-model.number="vehicleTypeForm.seats"
                outlined
                type="number"
                min="1"
                label="Number of Seats *"
              />

            </div>


            <!-- Icon -->
            <div class="col-12 col-md-6">

              <q-select
                v-model="vehicleTypeForm.icon"
                outlined
                label="Icon"
                :options="iconOptions"
              />

            </div>


            <!-- Status -->
            <div class="col-12 col-md-6">

              <q-select
                v-model="vehicleTypeForm.status"
                outlined
                label="Status"
                :options="[
                  'Active',
                  'Inactive'
                ]"
              />

            </div>


            <!-- Description -->
            <div class="col-12">

              <q-input
                v-model="vehicleTypeForm.description"
                outlined
                type="textarea"
                rows="3"
                label="Description"
              />

            </div>


            <!-- Image -->
            <div class="col-12">

              <q-file
                v-model="vehicleImage"
                outlined
                label="Vehicle Type Image"
                accept="image/*"
                clearable
              >

                <template #prepend>

                  <q-icon name="image" />

                </template>

              </q-file>

            </div>

          </div>

        </q-card-section>


        <!-- Actions -->
        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            label="Cancel"
            color="grey"
            v-close-popup
          />

          <q-btn
            unelevated
            color="primary"
            :label="
              editingVehicleType
                ? 'Update Vehicle Type'
                : 'Add Vehicle Type'
            "
            @click="saveVehicleType"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- ========================================= -->
    <!-- VIEW DIALOG -->
    <!-- ========================================= -->

    <q-dialog v-model="viewDialog">

      <q-card
        style="width: 550px; max-width: 95vw"
      >

        <!-- Header -->
        <q-card-section class="row items-center">

          <div class="text-h6">
            Vehicle Type Details
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


        <q-card-section
          v-if="selectedVehicleType"
        >

          <!-- Image -->
          <div class="text-center q-mb-lg">

            <q-avatar
              size="100px"
              color="blue-1"
              text-color="primary"
              rounded
            >

              <img
                v-if="selectedVehicleType.image"
                :src="selectedVehicleType.image"
                alt="Vehicle Type"
              >

              <q-icon
                v-else
                :name="
                  selectedVehicleType.icon ||
                  'directions_car'
                "
                size="50px"
              />

            </q-avatar>


            <div class="text-h6 q-mt-md">

              {{ selectedVehicleType.name }}

            </div>


            <q-chip
              dense
              :color="
                getStatusColor(
                  selectedVehicleType.status
                )
              "
              :text-color="
                getStatusTextColor(
                  selectedVehicleType.status
                )
              "
              class="q-mt-sm"
            >

              <q-icon
                :name="
                  getStatusIcon(
                    selectedVehicleType.status
                  )
                "
                size="16px"
                class="q-mr-xs"
              />

              {{ selectedVehicleType.status }}

            </q-chip>

          </div>


          <!-- Details -->
          <q-list separator>

            <!-- Description -->
            <q-item>

              <q-item-section avatar>

                <q-icon name="description" />

              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Description
                </q-item-label>

                <q-item-label>
                  {{ selectedVehicleType.description || '—' }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- Seats -->
            <q-item>

              <q-item-section avatar>

                <q-icon
                  name="airline_seat_recline_normal"
                />

              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Seats
                </q-item-label>

                <q-item-label>
                  {{ selectedVehicleType.seats }} Seats
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- Total Vehicles -->
            <q-item>

              <q-item-section avatar>

                <q-icon name="directions_car" />

              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Total Vehicles
                </q-item-label>

                <q-item-label>
                  {{ selectedVehicleType.vehicles }}
                </q-item-label>

              </q-item-section>

            </q-item>

          </q-list>

        </q-card-section>

      </q-card>

    </q-dialog>


    <!-- ========================================= -->
    <!-- DELETE DIALOG -->
    <!-- ========================================= -->

    <q-dialog v-model="deleteDialog">

      <q-card
        style="width: 400px; max-width: 95vw"
      >

        <q-card-section>

          <div class="text-h6">
            Delete Vehicle Type
          </div>

        </q-card-section>


        <q-card-section>

          Are you sure you want to delete

          <strong>
            {{ selectedVehicleType?.name }}
          </strong>

          ?

        </q-card-section>


        <q-card-actions align="right">

          <q-btn
            flat
            label="Cancel"
            v-close-popup
          />

          <q-btn
            unelevated
            color="negative"
            label="Delete"
            @click="deleteVehicleType"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>

import {
  ref,
  computed,
  onMounted
} from 'vue'

import {
  Notify
} from 'quasar'


// ============================================
// LOADING
// ============================================

const loading = ref(false)


// ============================================
// SEARCH
// ============================================

const search = ref('')


// ============================================
// STATUS FILTER
// ============================================

const statusFilter = ref('all')


const statusOptions = [

  {
    label: 'All Status',
    value: 'all'
  },

  {
    label: 'Active',
    value: 'Active'
  },

  {
    label: 'Inactive',
    value: 'Inactive'
  }

]


// ============================================
// PAGINATION
// ============================================

const pagination = ref({

  page: 1,

  rowsPerPage: 10

})


// ============================================
// TABLE COLUMNS
// ============================================

const columns = [

  {
    name: 'type',
    label: 'VEHICLE TYPE',
    field: 'name',
    align: 'left',
    sortable: true
  },

  {
    name: 'description',
    label: 'DESCRIPTION',
    field: 'description',
    align: 'left'
  },

  {
    name: 'seats',
    label: 'SEATS',
    field: 'seats',
    align: 'center',
    sortable: true
  },

  {
    name: 'vehicles',
    label: 'VEHICLES',
    field: 'vehicles',
    align: 'center',
    sortable: true
  },

  {
    name: 'status',
    label: 'STATUS',
    field: 'status',
    align: 'center',
    sortable: true
  },

  {
    name: 'actions',
    label: 'ACTIONS',
    field: 'actions',
    align: 'right'
  }

]


// ============================================
// ICON OPTIONS
// ============================================

const iconOptions = [

  'directions_car',

  'airport_shuttle',

  'local_shipping',

  'two_wheeler',

  'electric_car',

  'directions_bus',

  'local_taxi'

]


// ============================================
// VEHICLE TYPES DATA
// ============================================

const vehicleTypes = ref([

  {
    id: 1,
    name: 'Hatchback',
    description:
      'Compact and economical cars suitable for city travel.',
    seats: 5,
    vehicles: 28,
    status: 'Active',
    icon: 'directions_car',
    image: ''
  },

  {
    id: 2,
    name: 'Sedan',
    description:
      'Comfortable cars suitable for family and business travel.',
    seats: 5,
    vehicles: 35,
    status: 'Active',
    icon: 'directions_car',
    image: ''
  },

  {
    id: 3,
    name: 'SUV',
    description:
      'Spacious vehicles suitable for long journeys and families.',
    seats: 7,
    vehicles: 22,
    status: 'Active',
    icon: 'directions_car',
    image: ''
  },

  {
    id: 4,
    name: 'Luxury',
    description:
      'Premium vehicles for luxury and executive travel.',
    seats: 5,
    vehicles: 10,
    status: 'Active',
    icon: 'directions_car',
    image: ''
  },

  {
    id: 5,
    name: 'Tempo Traveller',
    description:
      'Large passenger vehicle suitable for group travel.',
    seats: 12,
    vehicles: 8,
    status: 'Active',
    icon: 'airport_shuttle',
    image: ''
  },

  {
    id: 6,
    name: 'Bus',
    description:
      'Large capacity vehicle for group transportation.',
    seats: 30,
    vehicles: 4,
    status: 'Inactive',
    icon: 'directions_bus',
    image: ''
  }

])


// ============================================
// FILTERED DATA
// ============================================

const filteredVehicleTypes = computed(() => {

  let data = [
    ...vehicleTypes.value
  ]


  // Status filter

  if (
    statusFilter.value !== 'all'
  ) {

    data = data.filter(
      item =>
        item.status ===
        statusFilter.value
    )

  }


  // Search

  if (search.value) {

    const keyword =
      search.value
        .toLowerCase()
        .trim()


    data = data.filter(item =>

      item.name
        .toLowerCase()
        .includes(keyword)

      ||

      (item.description || '')
        .toLowerCase()
        .includes(keyword)

    )

  }


  return data

})


// ============================================
// STATISTICS
// ============================================

const totalTypes = computed(() => {

  return vehicleTypes.value.length

})


const activeTypes = computed(() => {

  return vehicleTypes.value.filter(
    item =>
      item.status === 'Active'
  ).length

})


const inactiveTypes = computed(() => {

  return vehicleTypes.value.filter(
    item =>
      item.status === 'Inactive'
  ).length

})


// ============================================
// DIALOGS
// ============================================

const vehicleTypeDialog =
  ref(false)

const viewDialog =
  ref(false)

const deleteDialog =
  ref(false)


// ============================================
// SELECTED ITEM
// ============================================

const selectedVehicleType =
  ref(null)

const editingVehicleType =
  ref(false)


// ============================================
// IMAGE
// ============================================

const vehicleImage =
  ref(null)


// ============================================
// FORM
// ============================================

const vehicleTypeForm = ref({

  id: null,

  name: '',

  description: '',

  seats: 5,

  vehicles: 0,

  status: 'Active',

  icon: 'directions_car'

})


// ============================================
// ADD
// ============================================

const openAddDialog = () => {

  editingVehicleType.value =
    false


  vehicleImage.value =
    null


  vehicleTypeForm.value = {

    id: null,

    name: '',

    description: '',

    seats: 5,

    vehicles: 0,

    status: 'Active',

    icon: 'directions_car'

  }


  vehicleTypeDialog.value =
    true

}


// ============================================
// EDIT
// ============================================

const editVehicleType = item => {

  editingVehicleType.value =
    true


  vehicleImage.value =
    null


  vehicleTypeForm.value = {

    id: item.id,

    name: item.name,

    description: item.description,

    seats: item.seats,

    vehicles: item.vehicles,

    status: item.status,

    icon: item.icon

  }


  vehicleTypeDialog.value =
    true

}


// ============================================
// SAVE
// ============================================

const saveVehicleType = () => {

  // Name validation

  if (!vehicleTypeForm.value.name.trim()) {

    Notify.create({

      type: 'negative',

      message:
        'Vehicle type name is required'

    })

    return

  }


  // Seats validation

  if (
    !vehicleTypeForm.value.seats ||
    vehicleTypeForm.value.seats < 1
  ) {

    Notify.create({

      type: 'negative',

      message:
        'Please enter valid number of seats'

    })

    return

  }


  // Image preview

  let image = ''

  if (vehicleImage.value) {

    image =
      URL.createObjectURL(
        vehicleImage.value
      )

  }


  // ==========================================
  // EDIT
  // ==========================================

  if (editingVehicleType.value) {

    const index =
      vehicleTypes.value.findIndex(
        item =>
          item.id ===
          vehicleTypeForm.value.id
      )


    if (index !== -1) {

      vehicleTypes.value[index] = {

        ...vehicleTypes.value[index],

        ...vehicleTypeForm.value,

        image:
          image ||
          vehicleTypes.value[index].image

      }

    }


    Notify.create({

      type: 'positive',

      message:
        'Vehicle type updated successfully'

    })

  }


  // ==========================================
  // ADD
  // ==========================================

  else {

    const newVehicleType = {

      ...vehicleTypeForm.value,

      id: Date.now(),

      image,

      vehicles: Number(
        vehicleTypeForm.value.vehicles || 0
      )

    }


    vehicleTypes.value.unshift(
      newVehicleType
    )


    Notify.create({

      type: 'positive',

      message:
        'Vehicle type added successfully'

    })

  }


  vehicleTypeDialog.value =
    false

}


// ============================================
// VIEW
// ============================================

const viewVehicleType = item => {

  selectedVehicleType.value =
    item

  viewDialog.value =
    true

}


// ============================================
// DELETE CONFIRM
// ============================================

const confirmDelete = item => {

  selectedVehicleType.value =
    item

  deleteDialog.value =
    true

}


// ============================================
// DELETE
// ============================================

const deleteVehicleType = () => {

  if (
    !selectedVehicleType.value
  ) {

    return

  }


  vehicleTypes.value =
    vehicleTypes.value.filter(
      item =>
        item.id !==
        selectedVehicleType.value.id
    )


  deleteDialog.value =
    false


  Notify.create({

    type: 'positive',

    message:
      'Vehicle type deleted successfully'

  })


  selectedVehicleType.value =
    null

}


// ============================================
// STATUS
// ============================================

const getStatusColor = status => {

  return status === 'Active'
    ? 'green-1'
    : 'red-1'

}


const getStatusTextColor = status => {

  return status === 'Active'
    ? 'positive'
    : 'negative'

}


const getStatusIcon = status => {

  return status === 'Active'
    ? 'check_circle'
    : 'cancel'

}


// ============================================
// API PLACEHOLDER
// ============================================

const fetchVehicleTypes =
  async () => {

    loading.value = true

    try {

      /*
       * Connect your API here.
       *
       * Example:
       *
       * const response = await axios.get(
       *   `${BASE_URL}/vehicle-types`,
       *   {
       *     headers: {
       *       Authorization:
       *         `Bearer ${localStorage.getItem('token')}`
       *     }
       *   }
       * )
       *
       * vehicleTypes.value =
       *   response.data.data
       */

    } catch (error) {

      console.error(
        'Vehicle Type API Error:',
        error
      )


      Notify.create({

        type: 'negative',

        message:
          'Unable to load vehicle types'

      })

    } finally {

      loading.value = false

    }

  }


// ============================================
// PAGE LOAD
// ============================================

onMounted(() => {

  fetchVehicleTypes()

})

</script>


<style scoped>

/* ========================================= */
/* PAGE */
/* ========================================= */

.vehicle-types-page {

  padding: 24px;

  background: #f5f7fb;

  min-height:
    calc(100vh - 64px);

}


/* ========================================= */
/* HEADER */
/* ========================================= */

.page-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 24px;

}


.page-title {

  font-size: 26px;

  font-weight: 700;

  color: #1f2937;

}


.page-subtitle {

  font-size: 13px;

  color: #6b7280;

  margin-top: 4px;

}


/* ========================================= */
/* STAT CARD */
/* ========================================= */

.stat-card {

  background: #ffffff;

  border-radius: 12px;

  box-shadow:
    0 2px 10px
    rgba(0, 0, 0, 0.04);

}


.stat-content {

  display: flex;

  align-items: center;

}


.stat-info {

  margin-left: 14px;

}


.stat-label {

  font-size: 13px;

  color: #6b7280;

}


.stat-value {

  font-size: 25px;

  font-weight: 700;

  color: #1f2937;

  margin-top: 3px;

}


/* ========================================= */
/* CARD */
/* ========================================= */

.vehicle-type-card {

  border-radius: 12px;

  background: #ffffff;

  box-shadow:
    0 2px 10px
    rgba(0, 0, 0, 0.04);

}


/* ========================================= */
/* TABLE HEADER */
/* ========================================= */

.table-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

}


.table-title {

  font-size: 18px;

  font-weight: 700;

  color: #1f2937;

}


.table-subtitle {

  font-size: 12px;

  color: #9ca3af;

  margin-top: 3px;

}


.table-actions {

  display: flex;

  gap: 10px;

  align-items: center;

}


.search-input {

  width: 240px;

}


.status-filter {

  width: 145px;

}


/* ========================================= */
/* VEHICLE TYPE */
/* ========================================= */

.vehicle-type-info {

  display: flex;

  align-items: center;

}


.vehicle-type-details {

  margin-left: 12px;

}


.vehicle-type-name {

  font-size: 14px;

  font-weight: 600;

  color: #1f2937;

}


/* ========================================= */
/* DESCRIPTION */
/* ========================================= */

.description {

  max-width: 300px;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

  font-size: 12px;

  color: #6b7280;

}


/* ========================================= */
/* VEHICLE COUNT */
/* ========================================= */

.vehicle-count {

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 600;

}


/* ========================================= */
/* TABLE */
/* ========================================= */

.vehicle-type-table {

  border-radius:
    0 0 12px 12px;

}


.vehicle-type-table :deep(th) {

  font-size: 11px;

  font-weight: 700;

  color: #6b7280;

  background: #fafafa;

}


.vehicle-type-table :deep(td) {

  height: 72px;

}


/* ========================================= */
/* RESPONSIVE */
/* ========================================= */

@media (max-width: 1000px) {

  .table-header {

    flex-direction: column;

    align-items: stretch;

  }


  .table-actions {

    width: 100%;

  }


  .search-input {

    flex: 1;

    width: auto;

  }

}


@media (max-width: 600px) {

  .vehicle-types-page {

    padding: 16px;

  }


  .page-header {

    flex-direction: column;

    align-items: flex-start;

    gap: 15px;

  }


  .page-title {

    font-size: 22px;

  }


  .table-actions {

    flex-direction: column;

    align-items: stretch;

  }


  .search-input,

  .status-filter {

    width: 100%;

  }

}

</style>
