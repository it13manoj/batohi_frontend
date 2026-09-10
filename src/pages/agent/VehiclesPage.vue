<template>
  <q-page class="agent-vehicles-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Vehicles
        </div>

        <div class="text-grey-7">
          Manage vehicles assigned to your agent account
        </div>
      </div>

      <!-- ADD VEHICLE -->
      <q-btn
        color="primary"
        icon="add"
        label="Add Vehicle"
        unelevated
        @click="goToAddVehicle"
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
              icon="directions_car"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Total Vehicles
              </div>

              <div class="text-h5 text-weight-bold">
                {{ vehicles.length }}
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
              color="green-1"
              text-color="positive"
              icon="check_circle"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Available
              </div>

              <div class="text-h5 text-weight-bold">
                {{ availableVehicles }}
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- BOOKED -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card
          flat
          bordered
          class="summary-card"
        >

          <q-card-section class="row items-center">

            <q-avatar
              color="orange-1"
              text-color="orange"
              icon="event_available"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-7">
                Booked
              </div>

              <div class="text-h5 text-weight-bold">
                {{ bookedVehicles }}
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
                {{ inactiveVehicles }}
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         VEHICLES CARD
    ====================================================== -->
    <q-card
      flat
      bordered
      class="main-card"
    >

      <!-- ===================================================
           FILTER SECTION
      ==================================================== -->
      <q-card-section>

        <div class="row q-col-gutter-md items-center">

          <!-- SEARCH -->
          <div class="col-12 col-md-5">

            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search vehicle, brand or registration..."
            >

              <template #prepend>
                <q-icon name="search" />
              </template>

            </q-input>

          </div>


          <!-- VEHICLE TYPE -->
          <div class="col-12 col-md-3">

            <q-select
              v-model="typeFilter"
              :options="vehicleTypeOptions"
              outlined
              dense
              emit-value
              map-options
              label="Vehicle Type"
              clearable
            />

          </div>


          <!-- STATUS -->
          <div class="col-12 col-md-3">

            <q-select
              v-model="statusFilter"
              :options="statusOptions"
              outlined
              dense
              emit-value
              map-options
              label="Status"
              clearable
            />

          </div>


          <!-- REFRESH -->
          <div class="col-12 col-md-1 flex flex-center">

            <q-btn
              round
              flat
              color="primary"
              icon="refresh"
              :loading="loading"
              @click="getVehicles"
            >

              <q-tooltip>
                Refresh Vehicles
              </q-tooltip>

            </q-btn>

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- ===================================================
           TABLE
      ==================================================== -->
      <q-card-section class="q-pa-none">

        <q-table
          flat
          :rows="filteredVehicles"
          :columns="columns"
          row-key="id"
          :loading="loading"
          :pagination="pagination"
          no-data-label="No vehicles found"
          class="vehicles-table"
        >

          <!-- ===============================================
               VEHICLE
          ================================================ -->
          <template #body-cell-vehicle="props">

            <q-td :props="props">

              <div class="row items-center no-wrap">

                <!-- IMAGE -->
                <q-avatar
                  rounded
                  size="55px"
                  class="vehicle-image"
                >

                  <img
                    :src="
                      props.row.image ||
                      defaultVehicleImage
                    "
                    alt="Vehicle"
                  />

                </q-avatar>


                <!-- DETAILS -->
                <div class="q-ml-md">

                  <div class="text-weight-bold">
                    {{ props.row.name }}
                  </div>

                  <div class="text-caption text-grey-7">
                    {{ props.row.registrationNumber }}
                  </div>

                </div>

              </div>

            </q-td>

          </template>


          <!-- ===============================================
               TYPE
          ================================================ -->
          <template #body-cell-type="props">

            <q-td :props="props">

              <q-chip
                dense
                color="blue-1"
                text-color="primary"
              >

                {{ props.row.type }}

              </q-chip>

            </q-td>

          </template>


          <!-- ===============================================
               BRAND
          ================================================ -->
          <template #body-cell-brand="props">

            <q-td :props="props">

              <div class="text-weight-medium">
                {{ props.row.brand || '-' }}
              </div>

              <div
                v-if="props.row.model"
                class="text-caption text-grey-7"
              >
                {{ props.row.model }}
              </div>

            </q-td>

          </template>


          <!-- ===============================================
               REGISTRATION
          ================================================ -->
          <template #body-cell-registrationNumber="props">

            <q-td :props="props">

              <span class="registration-number">
                {{ props.row.registrationNumber || '-' }}
              </span>

            </q-td>

          </template>


          <!-- ===============================================
               PRICE
          ================================================ -->
          <template #body-cell-price="props">

            <q-td :props="props">

              <div class="text-weight-bold">
                ₹{{ formatPrice(props.row.price) }}
              </div>

              <div class="text-caption text-grey-7">
                per day
              </div>

            </q-td>

          </template>


          <!-- ===============================================
               STATUS
          ================================================ -->
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
                  size="16px"
                  class="q-mr-xs"
                />

                {{ props.row.status }}

              </q-chip>

            </q-td>

          </template>


          <!-- ===============================================
               ACTIONS
          ================================================ -->
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
                @click="viewVehicle(props.row)"
              >

                <q-tooltip>
                  View Vehicle
                </q-tooltip>

              </q-btn>


              <!-- EDIT -->
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
                @click="
                  toggleVehicleStatus(props.row)
                "
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
                @click="deleteVehicle(props.row)"
              >

                <q-tooltip>
                  Delete Vehicle
                </q-tooltip>

              </q-btn>

            </q-td>

          </template>

        </q-table>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         VEHICLE DETAILS DIALOG
    ====================================================== -->
    <q-dialog v-model="detailsDialog">

      <q-card class="details-dialog">

        <!-- HEADER -->
        <q-card-section
          class="row items-center justify-between"
        >

          <div class="text-h6 text-weight-bold">
            Vehicle Details
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


        <!-- DETAILS -->
        <q-card-section v-if="selectedVehicle">

          <!-- IMAGE -->
          <div class="text-center q-mb-lg">

            <q-img
              :src="
                selectedVehicle.image ||
                defaultVehicleImage
              "
              class="vehicle-detail-image"
              fit="cover"
            />

            <div class="text-h6 text-weight-bold q-mt-md">
              {{ selectedVehicle.name }}
            </div>

            <div class="text-grey-7">
              {{ selectedVehicle.registrationNumber }}
            </div>

            <q-chip
              dense
              class="q-mt-sm"
              :color="
                getStatusColor(
                  selectedVehicle.status
                )
              "
              text-color="white"
            >

              {{ selectedVehicle.status }}

            </q-chip>

          </div>


          <!-- DETAILS GRID -->
          <div class="row q-col-gutter-md">

            <!-- TYPE -->
            <div class="col-6">

              <div class="detail-item">

                <span>
                  Vehicle Type
                </span>

                <strong>
                  {{ selectedVehicle.type || '-' }}
                </strong>

              </div>

            </div>


            <!-- BRAND -->
            <div class="col-6">

              <div class="detail-item">

                <span>
                  Brand
                </span>

                <strong>
                  {{ selectedVehicle.brand || '-' }}
                </strong>

              </div>

            </div>


            <!-- MODEL -->
            <div class="col-6">

              <div class="detail-item">

                <span>
                  Model
                </span>

                <strong>
                  {{ selectedVehicle.model || '-' }}
                </strong>

              </div>

            </div>


            <!-- REGISTRATION -->
            <div class="col-6">

              <div class="detail-item">

                <span>
                  Registration
                </span>

                <strong>
                  {{
                    selectedVehicle.registrationNumber ||
                    '-'
                  }}
                </strong>

              </div>

            </div>


            <!-- YEAR -->
            <div class="col-6">

              <div class="detail-item">

                <span>
                  Manufacturing Year
                </span>

                <strong>
                  {{ selectedVehicle.year || '-' }}
                </strong>

              </div>

            </div>


            <!-- SEATS -->
            <div class="col-6">

              <div class="detail-item">

                <span>
                  Seats
                </span>

                <strong>
                  {{ selectedVehicle.seats || '-' }}
                </strong>

              </div>

            </div>


            <!-- FUEL -->
            <div class="col-6">

              <div class="detail-item">

                <span>
                  Fuel Type
                </span>

                <strong>
                  {{ selectedVehicle.fuelType || '-' }}
                </strong>

              </div>

            </div>


            <!-- TRANSMISSION -->
            <div class="col-6">

              <div class="detail-item">

                <span>
                  Transmission
                </span>

                <strong>
                  {{ selectedVehicle.transmission || '-' }}
                </strong>

              </div>

            </div>


            <!-- PRICE -->
            <div class="col-12">

              <div class="detail-item">

                <span>
                  Price Per Day
                </span>

                <strong>
                  ₹{{ formatPrice(selectedVehicle.price) }}
                </strong>

              </div>

            </div>

          </div>


          <!-- DESCRIPTION -->
          <div
            v-if="selectedVehicle.description"
            class="q-mt-md"
          >

            <div class="text-subtitle2 text-weight-bold q-mb-xs">
              Description
            </div>

            <div class="description-box">
              {{ selectedVehicle.description }}
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
            v-if="selectedVehicle"
            color="primary"
            icon="edit"
            label="Edit"
            unelevated
            @click="editFromDetails"
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
   DEFAULT IMAGE
========================================================= */

const defaultVehicleImage =
  'https://cdn.quasar.dev/img/parallax2.jpg'


/* =========================================================
   TABLE COLUMNS
========================================================= */

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
    align: 'left',
    sortable: true
  },

  {
    name: 'brand',
    label: 'Brand',
    field: 'brand',
    align: 'left',
    sortable: true
  },

  {
    name: 'registrationNumber',
    label: 'Registration',
    field: 'registrationNumber',
    align: 'left'
  },

  {
    name: 'price',
    label: 'Price',
    field: 'price',
    align: 'left',
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
   FILTERS
========================================================= */

const search = ref('')

const typeFilter = ref(null)

const statusFilter = ref(null)


/* =========================================================
   VEHICLE TYPE OPTIONS
========================================================= */

const vehicleTypeOptions = [

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
    label: 'Bike',
    value: 'Bike'
  },

  {
    label: 'Tempo Traveller',
    value: 'Tempo Traveller'
  },

  {
    label: 'Van',
    value: 'Van'
  },

  {
    label: 'Bus',
    value: 'Bus'
  }

]


/* =========================================================
   STATUS OPTIONS
========================================================= */

const statusOptions = [

  {
    label: 'Active',
    value: 'Active'
  },

  {
    label: 'Booked',
    value: 'Booked'
  },

  {
    label: 'Inactive',
    value: 'Inactive'
  }

]


/* =========================================================
   VEHICLES
========================================================= */

const vehicles = ref([])

const loading = ref(false)


/* =========================================================
   DETAILS DIALOG
========================================================= */

const detailsDialog = ref(false)

const selectedVehicle = ref(null)


/* =========================================================
   FILTERED VEHICLES
========================================================= */

const filteredVehicles = computed(() => {

  const keyword =
    search.value
      .toLowerCase()
      .trim()


  return vehicles.value.filter(vehicle => {

    const matchesSearch =

      !keyword ||

      vehicle.name
        ?.toLowerCase()
        .includes(keyword) ||

      vehicle.registrationNumber
        ?.toLowerCase()
        .includes(keyword) ||

      vehicle.brand
        ?.toLowerCase()
        .includes(keyword) ||

      vehicle.model
        ?.toLowerCase()
        .includes(keyword)


    const matchesType =

      !typeFilter.value ||

      vehicle.type === typeFilter.value


    const matchesStatus =

      !statusFilter.value ||

      vehicle.status === statusFilter.value


    return (
      matchesSearch &&
      matchesType &&
      matchesStatus
    )

  })

})


/* =========================================================
   SUMMARY
========================================================= */

const availableVehicles = computed(() => {

  return vehicles.value.filter(
    vehicle =>
      vehicle.status === 'Active'
  ).length

})


const bookedVehicles = computed(() => {

  return vehicles.value.filter(
    vehicle =>
      vehicle.status === 'Booked'
  ).length

})


const inactiveVehicles = computed(() => {

  return vehicles.value.filter(
    vehicle =>
      vehicle.status === 'Inactive'
  ).length

})


/* =========================================================
   GET VEHICLES
========================================================= */

const getVehicles = async () => {

  try {

    loading.value = true


    /*
     * Change this URL if your backend
     * uses another endpoint.
     */

    const response =
      await axios.get(
        '/agents/vehicles'
      )


    const data =
      response.data?.data ||
      response.data ||
      []


    vehicles.value =
      Array.isArray(data)
        ? data.map(normalizeVehicle)
        : []


  } catch (error) {

    console.error(
      'Get Vehicles Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        error.response?.data?.message ||
        'Unable to load vehicles.'

    })

  } finally {

    loading.value = false

  }

}


/* =========================================================
   NORMALIZE VEHICLE
========================================================= */

const normalizeVehicle = vehicle => {

  return {

    id:
      vehicle.id,

    name:
      vehicle.name ||
      vehicle.vehicleName ||
      'Vehicle',

    type:
      vehicle.type ||
      vehicle.vehicleType ||
      '',

    brand:
      vehicle.brand ||
      '',

    model:
      vehicle.model ||
      '',

    registrationNumber:
      vehicle.registrationNumber ||
      vehicle.registration_number ||
      '',

    year:
      vehicle.year ||
      vehicle.manufacturingYear ||
      '',

    seats:
      vehicle.seats ||
      vehicle.numberOfSeats ||
      4,

    price:
      vehicle.price ||
      vehicle.pricePerDay ||
      0,

    fuelType:
      vehicle.fuelType ||
      vehicle.fuel_type ||
      '',

    transmission:
      vehicle.transmission ||
      '',

    image:
      vehicle.image ||
      vehicle.vehicleImage ||
      vehicle.imageUrl ||
      '',

    description:
      vehicle.description ||
      '',

    status:
      vehicle.status ||
      'Active'

  }

}


/* =========================================================
   ADD VEHICLE PAGE
========================================================= */

const goToAddVehicle = () => {

  router.push({
    name: 'agent-add-vehicle'
  })

}


/* =========================================================
   EDIT VEHICLE PAGE
========================================================= */

const editVehicle = vehicle => {

  router.push({

    name: 'AgentEditVehicle',

    params: {
      id: vehicle.id
    }

  })

}


/* =========================================================
   EDIT FROM DETAILS
========================================================= */

const editFromDetails = () => {

  if (!selectedVehicle.value) {
    return
  }


  const vehicleId =
    selectedVehicle.value.id


  detailsDialog.value = false


  router.push({

    name: 'AgentEditVehicle',

    params: {
      id: vehicleId
    }

  })

}


/* =========================================================
   VIEW VEHICLE
========================================================= */

const viewVehicle = vehicle => {

  selectedVehicle.value =
    vehicle

  detailsDialog.value =
    true

}


/* =========================================================
   TOGGLE VEHICLE STATUS
========================================================= */

const toggleVehicleStatus = vehicle => {

  const newStatus =
    vehicle.status === 'Active'
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
      } Vehicle`,

    message:
      `Are you sure you want to ${actionText} ${vehicle.name}?`,

    cancel: true,

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
        message: 'Updating vehicle status...'
      })


      await axios.patch(

        `/agents/vehicles/${vehicle.id}/status`,

        {
          status: newStatus
        }

      )


      vehicle.status =
        newStatus


      $q.notify({

        type: 'positive',

        message:
          `Vehicle ${newStatus.toLowerCase()} successfully.`

      })


    } catch (error) {

      console.error(
        'Vehicle Status Error:',
        error
      )


      $q.notify({

        type: 'negative',

        message:
          error.response?.data?.message ||
          'Unable to update vehicle status.'

      })

    } finally {

      $q.loading.hide()

    }

  })

}


/* =========================================================
   DELETE VEHICLE
========================================================= */

const deleteVehicle = vehicle => {

  $q.dialog({

    title:
      'Delete Vehicle',

    message:
      `Are you sure you want to permanently delete ${vehicle.name}?`,

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
        message: 'Deleting vehicle...'
      })


      await axios.delete(

        `/agents/vehicles/${vehicle.id}`

      )


      vehicles.value =
        vehicles.value.filter(
          item =>
            item.id !== vehicle.id
        )


      if (
        selectedVehicle.value?.id ===
        vehicle.id
      ) {

        selectedVehicle.value =
          null

        detailsDialog.value =
          false

      }


      $q.notify({

        type: 'positive',

        message:
          'Vehicle deleted successfully.'

      })


    } catch (error) {

      console.error(
        'Delete Vehicle Error:',
        error
      )


      $q.notify({

        type: 'negative',

        message:
          error.response?.data?.message ||
          'Unable to delete vehicle.'

      })

    } finally {

      $q.loading.hide()

    }

  })

}


/* =========================================================
   STATUS COLOR
========================================================= */

const getStatusColor = status => {

  switch (status) {

    case 'Active':
      return 'positive'

    case 'Booked':
      return 'orange'

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

    case 'Booked':
      return 'event_available'

    case 'Inactive':
      return 'block'

    default:
      return 'help'

  }

}


/* =========================================================
   PRICE FORMAT
========================================================= */

const formatPrice = price => {

  const number =
    Number(price) || 0


  return number.toLocaleString(
    'en-IN'
  )

}


/* =========================================================
   PAGE LOAD
========================================================= */

onMounted(() => {

  getVehicles()

})

</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.agent-vehicles-page {
  background: #f5f7fb;
  min-height: 100%;
}


/* =========================================================
   SUMMARY CARDS
========================================================= */

.summary-card {
  background: #ffffff;
  border-radius: 14px;
  transition: all 0.2s ease;
}


.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
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

.vehicles-table {
  width: 100%;
}


.vehicle-image {
  background: #f1f5f9;
  border: 1px solid #e5e7eb;
}


.vehicle-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.registration-number {
  font-weight: 600;
  letter-spacing: 0.5px;
}


/* =========================================================
   DETAILS DIALOG
========================================================= */

.details-dialog {
  width: 620px;
  max-width: 95vw;
  border-radius: 16px;
}


.vehicle-detail-image {
  width: 220px;
  height: 145px;
  border-radius: 14px;
  background: #f1f5f9;
}


/* =========================================================
   DETAIL ITEMS
========================================================= */

.detail-item {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 15px;
}


.detail-item span {
  display: block;
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 5px;
}


.detail-item strong {
  display: block;
  color: #1f2937;
  font-size: 14px;
}


/* =========================================================
   DESCRIPTION
========================================================= */

.description-box {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 15px;
  color: #4b5563;
  line-height: 1.6;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 768px) {

  .agent-vehicles-page {
    padding: 12px !important;
  }


  .text-h5 {
    font-size: 21px;
  }


  .details-dialog {
    width: 95vw;
  }

}


@media (max-width: 600px) {

  .vehicle-detail-image {
    width: 180px;
    height: 120px;
  }


  .summary-card {
    border-radius: 10px;
  }

}

</style>
