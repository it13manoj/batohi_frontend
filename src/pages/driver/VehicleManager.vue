<template>
  <div class="q-pa-md q-gutter-y-md">

    <!-- PAGE HEADER -->
    <div class="row items-center justify-between q-mb-sm">
      <div>
        <h5 class="text-h5 text-weight-bold q-my-none text-primary">
          <q-icon name="directions_car" size="md" class="q-mr-xs" />
          Fleet & Vehicle Management
        </h5>
        <div class="text-caption text-grey-7">Manage fleet vehicles, specifications, status, and compliance documentation</div>
      </div>
      <q-btn
        color="primary"
        icon="add"
        label="Add Vehicle"
        unelevated
        class="q-px-md"
        @click="openAddDialog"
      />
    </div>

    <!-- METRICS CARDS -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-3">
        <q-card flat bordered class="bg-blue-1 text-blue-9">
          <q-card-section class="row items-center justify-between q-py-sm">
            <div>
              <div class="text-caption text-weight-medium">TOTAL VEHICLES</div>
              <div class="text-h5 text-weight-bolder">{{ vehicleList.length }}</div>
            </div>
            <q-icon name="minor_crash" size="lg" style="opacity: 0.6" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-3">
        <q-card flat bordered class="bg-green-1 text-green-9">
          <q-card-section class="row items-center justify-between q-py-sm">
            <div>
              <div class="text-caption text-weight-medium">ACTIVE</div>
              <div class="text-h5 text-weight-bolder">{{ activeCount }}</div>
            </div>
            <q-icon name="check_circle" size="lg" style="opacity: 0.6" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-3">
        <q-card flat bordered class="bg-amber-1 text-amber-9">
          <q-card-section class="row items-center justify-between q-py-sm">
            <div>
              <div class="text-caption text-weight-medium">MAINTENANCE</div>
              <div class="text-h5 text-weight-bolder">{{ maintenanceCount }}</div>
            </div>
            <q-icon name="build" size="lg" style="opacity: 0.6" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-3">
        <q-card flat bordered class="bg-grey-2 text-grey-9">
          <q-card-section class="row items-center justify-between q-py-sm">
            <div>
              <div class="text-caption text-weight-medium">INACTIVE</div>
              <div class="text-h5 text-weight-bolder">{{ inactiveCount }}</div>
            </div>
            <q-icon name="pause_circle" size="lg" style="opacity: 0.6" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- VEHICLES TABLE CARD -->
    <q-card flat bordered>
      <q-table
        :rows="vehicleList"
        :columns="columns"
        row-key="id"
        :loading="loadingTable"
        :filter="filterSearch"
        flat
        class="no-border"
      >
        <!-- Top Toolbar -->
        <template v-[#top-left]>
          <div class="text-h6 text-weight-medium">Registered Vehicles</div>
        </template>

        <template v-[#top-right]>
          <div class="row q-gutter-sm items-center">
            <q-input
              v-model="filterSearch"
              dense
              outlined
              clearable
              placeholder="Search registration, name, model..."
              style="min-width: 280px"
            >
              <template v-[#prepend]>
                <q-icon name="search" />
              </template>
            </q-input>

            <q-btn
              icon="refresh"
              flat
              round
              dense
              color="grey-8"
              @click="fetchVehicles"
            >
              <q-tooltip>Refresh List</q-tooltip>
            </q-btn>
          </div>
        </template>

        <!-- Registration No Column -->
        <template v-[#body-cell-registration_no]="props">
          <q-td :props="props">
            <q-chip outline color="primary" dense class="text-weight-bold text-uppercase">
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>

        <!-- Vehicle Type Display -->
        <template v-[#body-cell-vehicle_type_id]="props">
          <q-td :props="props">
            <q-badge color="purple-2" text-color="purple-10" class="q-px-sm">
              {{ getVehicleTypeLabel(props.value) }}
            </q-badge>
          </q-td>
        </template>

        <!-- Manufacturer & Model Column -->
        <template v-[#body-cell-manufacturer]="props">
          <q-td :props="props">
            <div>{{ props.row.manufacturer || '-' }}</div>
            <div class="text-caption text-grey-7">{{ props.row.model || '-' }}</div>
          </q-td>
        </template>

        <!-- Seating & Fuel Column -->
        <template v-[#body-cell-seating_capacity]="props">
          <q-td :props="props">
            <q-badge color="blue-2" text-color="blue-10" class="q-mr-xs">
              <q-icon name="event_seat" class="q-mr-xs" /> {{ props.value }}
            </q-badge>
            <q-badge color="teal-2" text-color="teal-10">
              <q-icon name="local_gas_station" class="q-mr-xs" /> {{ props.row.fuel_type || 'N/A' }}
            </q-badge>
          </q-td>
        </template>

        <!-- Status Column -->
        <template v-[#body-cell-status]="props">
          <q-td :props="props">
            <q-chip
              :color="getStatusColor(props.value)"
              text-color="white"
              size="sm"
              dense
              class="text-capitalize q-px-xs"
            >
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>

        <!-- Actions Column -->
        <template v-[#body-cell-actions]="props">
          <q-td :props="props" class="q-gutter-x-xs">
            <q-btn
              icon="edit"
              color="primary"
              flat
              round
              dense
              @click="onEditRow(props.row)"
            >
              <q-tooltip>Edit Vehicle</q-tooltip>
            </q-btn>
            <q-btn
              icon="delete"
              color="negative"
              flat
              round
              dense
              @click="onDeleteRow(props.row)"
            >
              <q-tooltip>Delete Vehicle</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- ADD / EDIT VEHICLE DIALOG POPUP -->
    <q-dialog v-model="showModal" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 850px; max-width: 95vw;">

        <!-- Header -->
        <q-card-section class="bg-primary text-white row items-center justify-between">
          <div class="text-h6 row items-center">
            <q-icon :name="isEditing ? 'edit' : 'add_circle'" size="sm" class="q-mr-sm" />
            {{ isEditing ? 'Edit Vehicle Details' : 'Add New Vehicle' }}
          </div>
          <q-btn icon="close" flat round dense v-close-popup @click="onReset" />
        </q-card-section>

        <!-- Form -->
        <q-form @submit.prevent="onSubmit">
          <q-card-section class="q-gutter-y-md q-pt-lg" style="max-height: 75vh; overflow-y: auto;">

            <!-- SECTION 1: BASIC INFORMATION -->
            <div class="text-subtitle2 text-primary text-weight-bold row items-center">
              <q-icon name="info" size="xs" class="q-mr-xs" />
              Basic Information
            </div>
            <q-separator />

            <div class="row q-col-gutter-md q-mt-xs">
              <!-- Vehicle Type -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-select
                  v-model="form.vehicle_type_id"
                  :options="vehicleTypeOptions"
                  option-value="id"
                  option-label="label"
                  emit-value
                  map-options
                  label="Vehicle Type *"
                  outlined
                  dense
                  lazy-rules
                  :rules="[val => !!val || 'Select vehicle type']"
                >
                  <template v-[#prepend]><q-icon name="category" /></template>
                </q-select>
              </div>

              <!-- Registration No -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  v-model="form.registration_no"
                  label="Registration No. *"
                  placeholder="e.g. MH02AB1234"
                  outlined
                  dense
                  class="text-uppercase"
                  lazy-rules
                  :rules="[val => !!val && val.trim().length > 0 || 'Required']"
                >
                  <template v-[#prepend]><q-icon name="pin" /></template>
                </q-input>
              </div>

              <!-- Vehicle Name -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  v-model="form.vehicle_name"
                  label="Vehicle Name *"
                  placeholder="e.g. Express Fleet 01"
                  outlined
                  dense
                  lazy-rules
                  :rules="[val => !!val && val.trim().length > 0 || 'Required']"
                >
                  <template v-[#prepend]><q-icon name="badge" /></template>
                </q-input>
              </div>

              <!-- Manufacturer -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  v-model="form.manufacturer"
                  label="Manufacturer"
                  placeholder="e.g. Tata Motors"
                  outlined
                  dense
                >
                  <template v-[#prepend]><q-icon name="precision_manufacturing" /></template>
                </q-input>
              </div>

              <!-- Model -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  v-model="form.model"
                  label="Model"
                  placeholder="e.g. Ace Gold"
                  outlined
                  dense
                >
                  <template v-[#prepend]><q-icon name="car_repair" /></template>
                </q-input>
              </div>

              <!-- Manufacturing Year -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  v-model.number="form.manufacturing_year"
                  type="number"
                  label="Manufacturing Year"
                  placeholder="e.g. 2023"
                  outlined
                  dense
                  :rules="[val => !val || (val >= 1900 && val <= currentYear) || 'Invalid year']"
                >
                  <template v-[#prepend]><q-icon name="calendar_today" /></template>
                </q-input>
              </div>
            </div>

            <!-- SECTION 2: SPECIFICATIONS -->
            <div class="text-subtitle2 text-primary text-weight-bold row items-center q-mt-md">
              <q-icon name="tune" size="xs" class="q-mr-xs" />
              Specifications
            </div>
            <q-separator />

            <div class="row q-col-gutter-md q-mt-xs">
              <!-- Colour -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  v-model="form.colour"
                  label="Colour"
                  placeholder="e.g. White"
                  outlined
                  dense
                >
                  <template v-[#prepend]><q-icon name="palette" /></template>
                </q-input>
              </div>

              <!-- Seating Capacity -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  v-model.number="form.seating_capacity"
                  type="number"
                  label="Seating Capacity *"
                  outlined
                  dense
                  lazy-rules
                  :rules="[
                    val => val !== null && val !== '' || 'Required',
                    val => val > 0 || 'Must be > 0'
                  ]"
                >
                  <template v-[#prepend]><q-icon name="event_seat" /></template>
                </q-input>
              </div>

              <!-- Fuel Type -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-select
                  v-model="form.fuel_type"
                  :options="fuelTypeOptions"
                  label="Fuel Type *"
                  outlined
                  dense
                  lazy-rules
                  :rules="[val => !!val || 'Select fuel type']"
                >
                  <template v-[#prepend]><q-icon name="local_gas_station" /></template>
                </q-select>
              </div>
            </div>

            <!-- SECTION 3: DOCUMENTATION & VALIDITY -->
            <div class="text-subtitle2 text-primary text-weight-bold row items-center q-mt-md">
              <q-icon name="assignment" size="xs" class="q-mr-xs" />
              Documentation & Status
            </div>
            <q-separator />

            <div class="row q-col-gutter-md q-mt-xs">
              <!-- RC Number -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  v-model="form.rc_number"
                  label="RC Number"
                  outlined
                  dense
                  class="text-uppercase"
                >
                  <template v-[#prepend]><q-icon name="description" /></template>
                </q-input>
              </div>

              <!-- Insurance Number -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  v-model="form.insurance_no"
                  label="Insurance Policy No."
                  outlined
                  dense
                >
                  <template v-[#prepend]><q-icon name="health_and_safety" /></template>
                </q-input>
              </div>

              <!-- Insurance Expiry Date -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  v-model="form.insurance_expiry_date"
                  label="Insurance Expiry Date"
                  outlined
                  dense
                  readonly
                >
                  <template v-[#prepend]>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.insurance_expiry_date" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                  <template #append>
                    <q-icon  name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="form.insurance_expiry_date"
                          mask="YYYY-MM-DD"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <!-- Permit Number -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  v-model="form.permit_number"
                  label="Permit Number"
                  outlined
                  dense
                >
                  <template v-[#prepend]><q-icon name="verified_user" /></template>
                </q-input>
              </div>

              <!-- Permit Expiry Date -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  v-model="form.permit_expiry_date"
                  label="Permit Expiry Date"
                  outlined
                  dense

                >
                  <template v-[#prepend]>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.permit_expiry_date" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                  <template #append>
                    <q-icon  name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="form.permit_expiry_date"
                          mask="YYYY-MM-DD"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <!-- Vehicle Status -->
              <div class="col-12 col-sm-6 col-md-4">
                <q-select
                  v-model="form.status"
                  :options="statusOptions"
                  label="Status *"
                  outlined
                  dense
                  emit-value
                  map-options
                >
                  <template v-[#prepend]><q-icon name="toggle_on" /></template>
                </q-select>
              </div>
            </div>

          </q-card-section>

          <q-separator />

          <!-- Modal Actions -->
          <q-card-actions align="right" class="q-pa-md bg-grey-1">
            <q-btn label="Cancel" color="grey-7" flat v-close-popup @click="onReset" />
            <q-btn
              :label="isEditing ? 'Update Vehicle' : 'Save Vehicle'"
              type="submit"
              color="primary"
              unelevated
              :loading="saving"
            />
          </q-card-actions>
        </q-form>

      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import api from '@/config/api'

const $q = useQuasar()

// Control States
const showModal = ref(false)
const saving = ref(false)
const loadingTable = ref(false)
const isEditing = ref(false)
const currentEditId = ref(null)
const filterSearch = ref('')

const currentYear = computed(() => new Date().getFullYear())

// Dropdowns
const fuelTypeOptions = ['Petrol', 'Diesel', 'CNG', 'EV', 'Hybrid']

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Under Maintenance', value: 'maintenance' }
]

const vehicleTypeOptions = ref([])
const vehicleList = ref([])

// Initial Blank Form State
const initialFormState = {
  vehicle_type_id: null,
  registration_no: '',
  vehicle_name: '',
  manufacturer: '',
  model: '',
  manufacturing_year: null,
  colour: '',
  seating_capacity: null,
  fuel_type: null,
  rc_number: '',
  insurance_no: '',
  insurance_expiry_date: null,
  permit_number: '',
  permit_expiry_date: null,
  status: 'active'
}

const form = reactive({ ...initialFormState })

// Computed Counters
const activeCount = computed(() => vehicleList.value.filter(v => v.status === 'active').length)
const maintenanceCount = computed(() => vehicleList.value.filter(v => v.status === 'maintenance').length)
const inactiveCount = computed(() => vehicleList.value.filter(v => v.status === 'inactive').length)

// Table Columns
const columns = [
  { name: 'registration_no', label: 'Reg. No', field: 'registration_no', align: 'left', sortable: true },
  { name: 'vehicle_name', label: 'Vehicle Name', field: 'vehicle_name', align: 'left', sortable: true },
  { name: 'vehicle_type_id', label: 'Category', field: 'vehicle_type_id', align: 'left', sortable: true },
  { name: 'manufacturer', label: 'Make & Model', field: 'manufacturer', align: 'left', sortable: true },
  { name: 'seating_capacity', label: 'Specs', field: 'seating_capacity', align: 'center' },
  { name: 'status', label: 'Status', field: 'status', align: 'center', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
]

// Fetch Vehicles List
const fetchVehicles = async () => {
  loadingTable.value = true
  try {
    const response = await api.get('/vehicle/findBydriver')
    vehicleList.value = response.data?.data || response.data || []
  } catch (error) {
    console.error('Fetch Vehicles Error:', error)
    $q.notify({ type: 'negative', message: 'Failed to load vehicle list.', position: 'top' })
  } finally {
    loadingTable.value = false
  }
}

// Fetch Vehicle Types for Dropdown
const fetchVehicleTypes = async () => {
  try {
    const response = await api.get('/vehicleType/vehicle-types')
    const data = response.data?.data || response.data || []
    vehicleTypeOptions.value = data.map(type => ({
      id: type.id,
      label: `${type.name} (${type.vehicle_category})`
    }))
  } catch (error) {
    console.error('Fetch Vehicle Types Error:', error)
  }
}

// Helper: Get label from vehicleTypeOptions
const getVehicleTypeLabel = (typeId) => {
  const match = vehicleTypeOptions.value.find(t => t.id === typeId)
  return match ? match.label : `Type ID: ${typeId}`
}

// Helper: Status badge color
const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'positive'
    case 'maintenance': return 'warning'
    default: return 'negative'
  }
}

// Dialog Openers
const openAddDialog = () => {
  onReset()
  showModal.value = true
}

// Form Edit Row Mapping
const onEditRow = (row) => {
  isEditing.value = true
  currentEditId.value = row.id

  Object.assign(form, {
    vehicle_type_id: row.vehicle_type_id,
    registration_no: row.registration_no,
    vehicle_name: row.vehicle_name,
    manufacturer: row.manufacturer,
    model: row.model,
    manufacturing_year: row.manufacturing_year,
    colour: row.colour,
    seating_capacity: row.seating_capacity,
    fuel_type: row.fuel_type,
    rc_number: row.rc_number,
    insurance_no: row.insurance_no,
    insurance_expiry_date: row.insurance_expiry_date ? row.insurance_expiry_date.split('T')[0] : null,
    permit_number: row.permit_number,
    permit_expiry_date: row.permit_expiry_date ? row.permit_expiry_date.split('T')[0] : null,
    status: row.status || 'active'
  })

  showModal.value = true
}

// Submit Create/Update
const onSubmit = async () => {
  saving.value = true

  const payload = {
    ...form,
    registration_no: form.registration_no ? form.registration_no.toUpperCase().trim() : '',
    rc_number: form.rc_number ? form.rc_number.toUpperCase().trim() : null,
    manufacturing_year: form.manufacturing_year ? Number(form.manufacturing_year) : null,
    seating_capacity: Number(form.seating_capacity)
  }

  try {
    if (isEditing.value) {
      await api.put(`/vehicles/${currentEditId.value}`, payload)
      $q.notify({ type: 'positive', message: 'Vehicle updated successfully!', position: 'top' })
    } else {
      await api.post('/vehicle/create', payload)
      $q.notify({ type: 'positive', message: 'Vehicle added successfully!', position: 'top' })
    }

    showModal.value = false
    onReset()
    await fetchVehicles()
  } catch (error) {
    console.error('Save Vehicle Error:', error)
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Failed to save vehicle details.',
      position: 'top'
    })
  } finally {
    saving.value = false
  }
}

// Delete Handler
const onDeleteRow = (row) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: `Are you sure you want to delete vehicle "${row.registration_no}"?`,
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await api.delete(`/vehicles/${row.id}`)
      $q.notify({ type: 'positive', message: 'Vehicle deleted successfully!', position: 'top' })
      await fetchVehicles()
    } catch (error) {
      console.error('Delete Vehicle Error:', error)
      $q.notify({ type: 'negative', message: 'Failed to delete vehicle.', position: 'top' })
    }
  })
}

// Reset Form State
const onReset = () => {
  Object.assign(form, initialFormState)
  isEditing.value = false
  currentEditId.value = null
}

onMounted(() => {
  fetchVehicles()
  fetchVehicleTypes()
})
</script>
