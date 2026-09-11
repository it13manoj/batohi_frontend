<template>
  <div class="q-pa-md q-gutter-y-md">

    <!-- PAGE HEADER -->
    <div class="row items-center justify-between q-mb-sm">
      <div>
        <h5 class="text-h5 text-weight-bold q-my-none text-primary">
          <q-icon name="directions_car" size="md" class="q-mr-xs" />
          Vehicle Type Management
        </h5>
        <div class="text-caption text-grey-7">Manage fleet categories, seating capacities, and pricing models</div>
      </div>
      <q-btn
        color="primary"
        icon="add"
        label="Add Vehicle Type"
        unelevated
        class="q-px-md"
        @click="openAddDialog"
      />
    </div>

    <!-- METRICS CARDS -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-4">
        <q-card flat bordered class="bg-blue-1 text-blue-9">
          <q-card-section class="row items-center justify-between q-py-sm">
            <div>
              <div class="text-caption text-weight-medium">TOTAL TYPES</div>
              <div class="text-h5 text-weight-bolder">{{ vehicleTypesList.length }}</div>
            </div>
            <q-icon name="minor_crash" size="lg" opacity="0.6" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card flat bordered class="bg-green-1 text-green-9">
          <q-card-section class="row items-center justify-between q-py-sm">
            <div>
              <div class="text-caption text-weight-medium">ACTIVE TYPES</div>
              <div class="text-h5 text-weight-bolder">{{ activeCount }}</div>
            </div>
            <q-icon name="check_circle" size="lg" opacity="0.6" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card flat bordered class="bg-grey-2 text-grey-9">
          <q-card-section class="row items-center justify-between q-py-sm">
            <div>
              <div class="text-caption text-weight-medium">INACTIVE TYPES</div>
              <div class="text-h5 text-weight-bolder">{{ vehicleTypesList.length - activeCount }}</div>
            </div>
            <q-icon name="pause_circle" size="lg" opacity="0.6" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- MAIN VEHICLE TYPES TABLE CARD -->
    <q-card flat bordered>
      <q-table
        :rows="vehicleTypesList"
        :columns="columns"
        row-key="id"
        :loading="loadingTable"
        :filter="filterSearch"
        flat
        class="no-border"
      >
        <!-- Top Toolbar Slot -->
        <template v-[#top-left]>
          <div class="text-h6 text-weight-medium">All Vehicle Categories</div>
        </template>

        <template v-[#top-right]>
          <div class="row q-gutter-sm items-center">
            <q-input
              v-model="filterSearch"
              dense
              outlined
              clearable
              placeholder="Search types..."
              style="min-width: 250px"
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
              @click="fetchVehicleTypes"
            >
              <q-tooltip>Refresh Table</q-tooltip>
            </q-btn>
          </div>
        </template>

        <!-- Category Custom Display -->
        <template v-[#body-cell-category]="props">
          <q-td :props="props">
            <q-chip outline color="primary" dense size="sm" class="text-weight-bold">
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>

        <!-- Base Fare Formatting -->
        <template v-[#body-cell-baseFare]="props">
          <q-td :props="props" class="text-weight-bold text-subtitle2">
            ₹{{ Number(props.value).toLocaleString('en-IN') }}
          </q-td>
        </template>

        <!-- Capacity Formatting -->
        <template v-[#body-cell-seatingCapacity]="props">
          <q-td :props="props">
            <q-badge color="blue-2" text-color="blue-10" class="q-px-sm">
              <q-icon name="event_seat" class="q-mr-xs" /> {{ props.value }} Seats
            </q-badge>
          </q-td>
        </template>

        <template v-[#body-cell-maxLoadCapacity]="props">
          <q-td :props="props">
            <q-badge color="amber-2" text-color="amber-10" class="q-px-sm">
              <q-icon name="scale" class="q-mr-xs" /> {{ props.value || 0 }} Kg
            </q-badge>
          </q-td>
        </template>

        <!-- Status Toggle in Table Cell -->
        <template v-[#body-cell-isActive]="props">
          <q-td :props="props">
            <q-chip
              :color="props.value ? 'positive' : 'negative'"
              text-color="white"
              size="sm"
              dense
              class="q-px-xs"
            >
              {{ props.value ? 'Active' : 'Inactive' }}
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
              <q-tooltip>Edit Record</q-tooltip>
            </q-btn>
            <q-btn
              icon="delete"
              color="negative"
              flat
              round
              dense
              @click="onDeleteRow(props.row)"
            >
              <q-tooltip>Delete Record</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- POPUP MODAL DIALOG (Add / Edit Form) -->
    <q-dialog v-model="showModal" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 600px; max-width: 90vw;;">

        <!-- Modal Title Header -->
        <q-card-section class="bg-primary text-white row items-center justify-between">
          <div class="text-h6 row items-center">
            <q-icon :name="isEditing ? 'edit' : 'add_circle'" size="sm" class="q-mr-sm" />
            {{ isEditing ? 'Edit Vehicle Type' : 'Create New Vehicle Type' }}
          </div>
          <q-btn icon="close" flat round dense v-close-popup @click="onReset" />
        </q-card-section>

        <!-- Form Body -->
        <q-form @submit="onSubmit">
          <q-card-section class="q-gutter-y-md q-pt-md" style="top: 10px;">

            <!-- Category & Type Name -->
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="vehicleType.category"
                  :options="categoryOptions"
                  label="Vehicle Category *"
                  outlined
                  dense
                  lazy-rules
                  :rules="[val => !!val || 'Category is required']"
                >
                  <template v-[#prepend]>
                    <q-icon name="category" />
                  </template>
                </q-select>
              </div>

              <div class="col-12 col-sm-6">
                <q-input
                  v-model="vehicleType.typeName"
                  label="Vehicle Type Name *"
                  placeholder="e.g. Sedan, SUV, Heavy Truck"
                  outlined
                  dense
                  lazy-rules
                  :rules="[val => !!val || 'Vehicle type name is required']"
                >
                  <template v-[#prepend]>
                    <q-icon name="minor_crash" />
                  </template>
                </q-input>
              </div>
            </div>

            <!-- Capacities & Fare -->
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-4">
                <q-input
                  v-model.number="vehicleType.seatingCapacity"
                  type="number"
                  label="Seats *"
                  outlined
                  dense
                  lazy-rules
                  :rules="[
                    val => val !== null && val !== '' || 'Required',
                    val => val > 0 || 'Must be > 0'
                  ]"
                >
                  <template v-[#prepend]>
                    <q-icon name="event_seat" />
                  </template>
                </q-input>
              </div>

              <div class="col-12 col-sm-4">
                <q-input
                  v-model.number="vehicleType.maxLoadCapacity"
                  type="number"
                  label="Max Load (Kg)"
                  outlined
                  dense
                >
                  <template v-[#prepend]>
                    <q-icon name="scale" />
                  </template>
                </q-input>
              </div>

              <div class="col-12 col-sm-4">
                <q-input
                  v-model.number="vehicleType.baseFare"
                  type="number"
                  label="Base Fare *"
                  prefix="₹"
                  outlined
                  dense
                  lazy-rules
                  :rules="[val => val !== null && val !== '' || 'Required']"
                >
                  <template v-[#prepend]>
                    <q-icon name="payments" />
                  </template>
                </q-input>
              </div>
            </div>

            <!-- Description -->
            <q-input
              v-model="vehicleType.description"
              type="textarea"
              label="Description"
              placeholder="Provide information regarding fuel type, baggage limits, or perks..."
              outlined
              dense
              rows="3"
            />

            <!-- Active Status Toggle -->
            <div class="row items-center justify-between bg-grey-2 q-pa-sm rounded-borders">
              <div>
                <div class="text-subtitle2">Publish Status</div>
                <div class="text-caption text-grey-7">Active types can be selected during trip creation</div>
              </div>
              <q-toggle
                v-model="vehicleType.isActive"
                checked-icon="check"
                color="positive"
                unchecked-icon="clear"
                :label="vehicleType.isActive ? 'Active' : 'Inactive'"
              />
            </div>

          </q-card-section>

          <q-separator />

          <!-- Modal Action Buttons -->
          <q-card-actions align="right" class="q-pa-md bg-grey-1">
            <q-btn
              label="Cancel"
              color="grey-7"
              flat
              v-close-popup
              @click="onReset"
            />
            <q-btn
              :label="isEditing ? 'Update Vehicle Type' : 'Save Vehicle Type'"
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

// Dropdown options
const categoryOptions = [
  'bike',
  'auto',
  'car'
]

// Default blank state matching backend keys
const initialTypeState = {
  vehicle_category: null,
  name: '',
  seating_capacity: null,
  luggage_capacity: null,
  base_fare: null,
  description: '',
  status: 'active'
}

// Reactive Form Object
const vehicleType = reactive({ ...initialTypeState })

// Table Data Source
const vehicleTypesList = ref([])

// Computed Metrics matching the 'status' string key
const activeCount = computed(() => {
  return vehicleTypesList.value.filter(item => item.status === 'active').length
})

// Table Columns matching backend response keys
const columns = [
  { name: 'vehicle_category', label: 'Category', field: 'vehicle_category', align: 'left', sortable: true },
  { name: 'name', label: 'Type Name', field: 'name', align: 'left', sortable: true },
  { name: 'seating_capacity', label: 'Seating', field: 'seating_capacity', align: 'center', sortable: true },
  { name: 'luggage_capacity', label: 'Load Limit', field: 'luggage_capacity', align: 'center', sortable: true },
  { name: 'base_fare', label: 'Base Fare', field: 'base_fare', align: 'right', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'center', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
]

// Open Add Modal
const openAddDialog = () => {
  onReset()
  showModal.value = true
}

// 1. Fetch Vehicle Types List from API
const fetchVehicleTypes = async () => {
  loadingTable.value = true
  try {
    const response = await api.get('/vehicleType/vehicle-types')
    vehicleTypesList.value = response.data?.data || response.data || []
  } catch (error) {
    console.error('Error fetching list:', error)
    $q.notify({
      type: 'negative',
      message: 'Failed to load vehicle types list.',
      position: 'top'
    })
  } finally {
    loadingTable.value = false
  }
}

// 2. Submit Handler (Handles Create & Update)
const onSubmit = async () => {
  saving.value = true

  const payload = {

    vehicle_category: vehicleType.category,

    name: vehicleType.typeName,

    seating_capacity: vehicleType.seatingCapacity,

    luggage_capacity: vehicleType.maxLoadCapacity || 0,

    base_fare: vehicleType.baseFare,

    description: vehicleType.description,

    isActive: vehicleType.isActive

  }

  try {
    if (isEditing.value) {
      await api.put(`/vehicleType/vehicle-types/${currentEditId.value}`, payload)
      $q.notify({
        type: 'positive',
        message: 'Vehicle Type updated successfully!',
        position: 'top'
      })
    } else {
      await api.post('/vehicleType/create', payload)
      $q.notify({
        type: 'positive',
        message: 'Vehicle Type added successfully!',
        position: 'top'
      })
    }

    showModal.value = false
    onReset()
    await fetchVehicleTypes()
  } catch (error) {
    console.error('Error saving vehicle type:', error)
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Operation failed.',
      position: 'top'
    })
  } finally {
    saving.value = false
  }
}

// 3. Edit Handler - Populates modal fields from row object
const onEditRow = (row) => {
  isEditing.value = true
  currentEditId.value = row.id

  vehicleType.vehicle_category = row.vehicle_category
  vehicleType.name = row.name
  vehicleType.seating_capacity = row.seating_capacity
  vehicleType.luggage_capacity = row.luggage_capacity
  vehicleType.base_fare = row.base_fare
  vehicleType.description = row.description
  vehicleType.status = row.status || 'active'

  showModal.value = true
}

// 4. Delete Handler
const onDeleteRow = (row) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: `Are you sure you want to delete "${row.name}"?`,
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await api.delete(`/vehicleType/vehicle-types/${row.id}`)
      $q.notify({
        type: 'positive',
        message: 'Vehicle Type deleted successfully!',
        position: 'top'
      })
      await fetchVehicleTypes()
    } catch (error) {
      console.error('Error deleting:', error)
      $q.notify({
        type: 'negative',
        message: 'Failed to delete vehicle type.',
        position: 'top'
      })
    }
  })
}

// Reset State
const onReset = () => {
  Object.assign(vehicleType, initialTypeState)
  isEditing.value = false
  currentEditId.value = null
}

onMounted(() => {
  fetchVehicleTypes()
})
</script>
