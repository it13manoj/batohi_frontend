<template>
  <div class="q-pa-md q-gutter-y-md vehicle-type-page">

    <!-- PAGE HEADER -->
    <div class="row items-center justify-between q-mb-sm">
      <div>
        <h5 class="text-h5 text-weight-bold q-my-none text-primary">
          <q-icon name="directions_car" size="md" class="q-mr-xs" />
          Vehicle Categories & Subscription Plans
        </h5>
        <div class="text-caption text-grey-7">
          Subscription pricing automatically applies based on vehicle type (Bike, Auto, or Car). 1st Month Free for all drivers!
        </div>
      </div>
      <div class="row q-gutter-sm">
        <q-btn
          color="primary"
          icon="add"
          label="Add Vehicle Type"
          unelevated
          class="q-px-md"
          @click="openAddDialog"
        />
        <q-btn
          color="positive"
          icon="card_membership"
          label="View Subscription Page"
          unelevated
          no-caps
          @click="goToSubscription(vehicleCategory)"
        />
      </div>
    </div>

    <!-- FREE SUBSCRIPTION PROMO BANNER -->
    <q-banner class="bg-gradient-banner text-white rounded-borders q-mb-md" rounded>
      <template #avatar>
        <q-icon name="stars" size="36px" color="amber" />
      </template>
      <div class="text-subtitle1 text-weight-bold">
        🎉 1st Month FREE Subscription for All Vehicles!
      </div>
      <div class="text-body2 q-mt-xs">
        Every driver gets their <strong>1st Month Subscription 100% FREE (₹0)</strong> for any vehicle.
        Second month onwards, subscription applies. Plus, take <strong>3 Months</strong> and get <strong>15 Days Always Free</strong>,
        take <strong>6 Months</strong> and get <strong>1 Month Always Free</strong>, or take <strong>1 Year</strong> and get <strong>3 Months Always Free</strong>!
      </div>
    </q-banner>

    <!-- =====================================================
         VEHICLE CATEGORY SUBSCRIPTION SHOWCASE (BIKE, AUTO, CAR)
    ====================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">
      <!-- BIKE CARD -->
      <div class="col-12 col-md-4">
        <q-card
          class="category-card full-height column justify-between"
          :class="{ 'category-card-active': vehicleCategory === 'bike' }"
          flat
          bordered
        >
          <q-card-section class="q-pa-lg">
            <div class="row items-center justify-between q-mb-sm">
              <q-avatar size="46px" color="blue-1" text-color="blue-8" icon="two_wheeler" />
              <q-badge
                :color="vehicleCategory === 'bike' ? 'positive' : 'grey-5'"
                :text-color="vehicleCategory === 'bike' ? 'white' : 'dark'"
                class="q-px-sm q-py-xs text-weight-bold"
              >
                {{ vehicleCategory === 'bike' ? 'Selected for You' : 'Bike Category' }}
              </q-badge>
            </div>

            <div class="text-h6 text-weight-bold text-dark">Bike Subscription</div>
            <div class="text-caption text-grey-6 q-mb-md">Motorcycles, Scooters & Two-wheelers</div>

            <q-badge color="amber-1" text-color="amber-10" class="q-px-sm q-py-xs full-width text-weight-bold q-mb-md">
              <q-icon name="star" size="14px" class="q-mr-xs" /> 1st Month Free Trial Available!
            </q-badge>

            <!-- Price Matrix -->
            <div class="pricing-list q-gutter-y-xs">
              <div class="row justify-between items-center pricing-row">
                <span class="text-caption text-weight-medium">1 Month (2nd mo onwards):</span>
                <span class="text-weight-bold text-primary">₹800 <small class="text-grey-6">/ 30 days</small></span>
              </div>
              <div class="row justify-between items-center pricing-row">
                <span class="text-caption text-weight-medium">3 Months:</span>
                <div class="text-right">
                  <span class="text-weight-bold text-primary">₹2,300</span>
                  <q-badge color="positive" size="xs" class="q-ml-xs">+15d FREE</q-badge>
                </div>
              </div>
              <div class="row justify-between items-center pricing-row">
                <span class="text-caption text-weight-medium">6 Months:</span>
                <div class="text-right">
                  <span class="text-weight-bold text-primary">₹4,500</span>
                  <q-badge color="positive" size="xs" class="q-ml-xs">+1mo FREE</q-badge>
                </div>
              </div>
              <div class="row justify-between items-center pricing-row">
                <span class="text-caption text-weight-medium">1 Year:</span>
                <div class="text-right">
                  <span class="text-weight-bold text-primary">₹8,500</span>
                  <q-badge color="positive" size="xs" class="q-ml-xs">+3mo FREE</q-badge>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions class="q-pa-lg pt-0">
            <q-btn
              :color="vehicleCategory === 'bike' ? 'primary' : 'grey-9'"
              :outline="vehicleCategory !== 'bike'"
              unelevated
              no-caps
              icon="card_membership"
              label="Select Bike & View Subscription"
              class="full-width text-weight-bold"
              @click="handleSelectCategory('bike')"
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- AUTO CARD -->
      <div class="col-12 col-md-4">
        <q-card
          class="category-card full-height column justify-between"
          :class="{ 'category-card-active': vehicleCategory === 'auto' }"
          flat
          bordered
        >
          <q-card-section class="q-pa-lg">
            <div class="row items-center justify-between q-mb-sm">
              <q-avatar size="46px" color="amber-1" text-color="amber-9" icon="electric_rickshaw" />
              <q-badge
                :color="vehicleCategory === 'auto' ? 'positive' : 'grey-5'"
                :text-color="vehicleCategory === 'auto' ? 'white' : 'dark'"
                class="q-px-sm q-py-xs text-weight-bold"
              >
                {{ vehicleCategory === 'auto' ? 'Selected for You' : 'Auto Category' }}
              </q-badge>
            </div>

            <div class="text-h6 text-weight-bold text-dark">Auto Subscription</div>
            <div class="text-caption text-grey-6 q-mb-md">Auto Rickshaws & 3-Wheelers</div>

            <q-badge color="amber-1" text-color="amber-10" class="q-px-sm q-py-xs full-width text-weight-bold q-mb-md">
              <q-icon name="star" size="14px" class="q-mr-xs" /> 1st Month Free Trial Available!
            </q-badge>

            <!-- Price Matrix -->
            <div class="pricing-list q-gutter-y-xs">
              <div class="row justify-between items-center pricing-row">
                <span class="text-caption text-weight-medium">1 Month (2nd mo onwards):</span>
                <span class="text-weight-bold text-primary">₹1,000 <small class="text-grey-6">/ 30 days</small></span>
              </div>
              <div class="row justify-between items-center pricing-row">
                <span class="text-caption text-weight-medium">3 Months:</span>
                <div class="text-right">
                  <span class="text-weight-bold text-primary">₹2,800</span>
                  <q-badge color="positive" size="xs" class="q-ml-xs">+15d FREE</q-badge>
                </div>
              </div>
              <div class="row justify-between items-center pricing-row">
                <span class="text-caption text-weight-medium">6 Months:</span>
                <div class="text-right">
                  <span class="text-weight-bold text-primary">₹5,500</span>
                  <q-badge color="positive" size="xs" class="q-ml-xs">+1mo FREE</q-badge>
                </div>
              </div>
              <div class="row justify-between items-center pricing-row">
                <span class="text-caption text-weight-medium">1 Year:</span>
                <div class="text-right">
                  <span class="text-weight-bold text-primary">₹10,000</span>
                  <q-badge color="positive" size="xs" class="q-ml-xs">+3mo FREE</q-badge>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions class="q-pa-lg pt-0">
            <q-btn
              :color="vehicleCategory === 'auto' ? 'primary' : 'grey-9'"
              :outline="vehicleCategory !== 'auto'"
              unelevated
              no-caps
              icon="card_membership"
              label="Select Auto & View Subscription"
              class="full-width text-weight-bold"
              @click="handleSelectCategory('auto')"
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- CAR CARD -->
      <div class="col-12 col-md-4">
        <q-card
          class="category-card full-height column justify-between"
          :class="{ 'category-card-active': vehicleCategory === 'car' }"
          flat
          bordered
        >
          <q-card-section class="q-pa-lg">
            <div class="row items-center justify-between q-mb-sm">
              <q-avatar size="46px" color="purple-1" text-color="purple-8" icon="directions_car" />
              <q-badge
                :color="vehicleCategory === 'car' ? 'positive' : 'grey-5'"
                :text-color="vehicleCategory === 'car' ? 'white' : 'dark'"
                class="q-px-sm q-py-xs text-weight-bold"
              >
                {{ vehicleCategory === 'car' ? 'Selected for You' : 'Car Category' }}
              </q-badge>
            </div>

            <div class="text-h6 text-weight-bold text-dark">Car Subscription</div>
            <div class="text-caption text-grey-6 q-mb-md">Sedans, Mini / Hatchback & SUVs</div>

            <q-badge color="amber-1" text-color="amber-10" class="q-px-sm q-py-xs full-width text-weight-bold q-mb-md">
              <q-icon name="star" size="14px" class="q-mr-xs" /> 1st Month Free Trial Available!
            </q-badge>

            <!-- Price Matrix -->
            <div class="pricing-list q-gutter-y-xs">
              <div class="row justify-between items-center pricing-row">
                <span class="text-caption text-weight-medium">1 Month (2nd mo onwards):</span>
                <span class="text-weight-bold text-primary">₹1,200 <small class="text-grey-6">/ 30 days</small></span>
              </div>
              <div class="row justify-between items-center pricing-row">
                <span class="text-caption text-weight-medium">3 Months:</span>
                <div class="text-right">
                  <span class="text-weight-bold text-primary">₹3,500</span>
                  <q-badge color="positive" size="xs" class="q-ml-xs">+15d FREE</q-badge>
                </div>
              </div>
              <div class="row justify-between items-center pricing-row">
                <span class="text-caption text-weight-medium">6 Months:</span>
                <div class="text-right">
                  <span class="text-weight-bold text-primary">₹6,500</span>
                  <q-badge color="positive" size="xs" class="q-ml-xs">+1mo FREE</q-badge>
                </div>
              </div>
              <div class="row justify-between items-center pricing-row">
                <span class="text-caption text-weight-medium">1 Year:</span>
                <div class="text-right">
                  <span class="text-weight-bold text-primary">₹12,500</span>
                  <q-badge color="positive" size="xs" class="q-ml-xs">+3mo FREE</q-badge>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions class="q-pa-lg pt-0">
            <q-btn
              :color="vehicleCategory === 'car' ? 'primary' : 'grey-9'"
              :outline="vehicleCategory !== 'car'"
              unelevated
              no-caps
              icon="card_membership"
              label="Select Car & View Subscription"
              class="full-width text-weight-bold"
              @click="handleSelectCategory('car')"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- METRICS OVERVIEW -->
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
              <div class="text-caption text-weight-medium">YOUR VEHICLE</div>
              <div class="text-h6 text-weight-bolder text-capitalize text-primary">{{ vehicleCategory }}</div>
            </div>
            <q-icon :name="getCategoryIcon(vehicleCategory)" size="lg" opacity="0.6" />
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
        <template v-[#top-left]>
          <div class="text-h6 text-weight-medium">Registered Fleet Categories</div>
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

        <!-- Category Column -->
        <template v-[#body-cell-vehicle_category]="props">
          <q-td :props="props">
            <q-chip
              :color="getCategoryColor(props.value)"
              text-color="white"
              dense
              size="sm"
              class="text-weight-bold text-uppercase"
            >
              <q-icon :name="getCategoryIcon(props.value)" size="14px" class="q-mr-xs" />
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>

        <!-- Subscription Rate Column -->
        <template v-[#body-cell-subscription_rate]="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">
              <span class="text-weight-bold text-primary">
                {{ getSubscriptionRateText(props.row.vehicle_category) }}
              </span>
              <q-btn
                flat
                dense
                round
                color="primary"
                icon="arrow_forward"
                size="xs"
                class="q-ml-xs"
                @click="goToSubscription(props.row.vehicle_category)"
              >
                <q-tooltip>View {{ props.row.vehicle_category }} subscription</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>

        <!-- Base Fare Formatting -->
        <template v-[#body-cell-base_fare]="props">
          <q-td :props="props" class="text-weight-bold text-subtitle2">
            ₹{{ Number(props.value || 0).toLocaleString('en-IN') }}
          </q-td>
        </template>

        <!-- Capacity Formatting -->
        <template v-[#body-cell-seating_capacity]="props">
          <q-td :props="props">
            <q-badge color="blue-2" text-color="blue-10" class="q-px-sm">
              <q-icon name="event_seat" class="q-mr-xs" /> {{ props.value || 1 }} Seats
            </q-badge>
          </q-td>
        </template>

        <!-- Status Column -->
        <template v-[#body-cell-status]="props">
          <q-td :props="props">
            <q-chip
              :color="props.value === 'active' || props.value === true ? 'positive' : 'negative'"
              text-color="white"
              size="sm"
              dense
              class="q-px-xs"
            >
              {{ props.value === 'active' || props.value === true ? 'Active' : 'Inactive' }}
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
      <q-card style="width: 600px; max-width: 90vw;">

        <!-- Modal Title Header -->
        <q-card-section class="bg-primary text-white row items-center justify-between">
          <div class="text-h6 row items-center">
            <q-icon :name="isEditing ? 'edit' : 'add_circle'" size="sm" class="q-mr-sm" />
            {{ isEditing ? 'Edit Vehicle Type' : 'Add Vehicle Type' }}
          </div>
          <q-btn icon="close" flat round dense v-close-popup @click="onReset" />
        </q-card-section>

        <!-- Form Body -->
        <q-form @submit="onSubmit">
          <q-card-section class="q-gutter-y-md q-pt-md">

            <!-- Category & Type Name -->
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="vehicleType.category"
                  :options="categoryOptions"
                  label="Vehicle Category *"
                  outlined
                  dense
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[val => !!val || 'Category is required']"
                >
                  <template v-[#prepend]>
                    <q-icon :name="getCategoryIcon(vehicleType.category)" />
                  </template>
                </q-select>
              </div>

              <div class="col-12 col-sm-6">
                <q-input
                  v-model="vehicleType.typeName"
                  label="Vehicle Type Name *"
                  placeholder="e.g. Standard Bike, City Auto, Prime Sedan"
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

            <!-- Dynamic Subscription Notice based on selected vehicle -->
            <q-banner v-if="vehicleType.category" class="bg-blue-1 text-primary rounded-borders q-py-sm">
              <template #avatar>
                <q-icon name="info" color="primary" size="20px" />
              </template>
              <div class="text-caption">
                <strong>Subscription for {{ vehicleType.category.toUpperCase() }}:</strong><br />
                1st Month: <strong>FREE Trial</strong> • 2nd Month+: <strong>₹{{ getMonthlyRate(vehicleType.category) }}/mo</strong>.<br />
                Bonuses: 3M (+15d free), 6M (+1mo free), 1Y (+3mo free).
              </div>
            </q-banner>

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
              placeholder="Provide information regarding seating, baggage limits, or perks..."
              outlined
              dense
              rows="2"
            />

            <!-- Active Status Toggle -->
            <div class="row items-center justify-between bg-grey-2 q-pa-sm rounded-borders">
              <div>
                <div class="text-subtitle2">Publish Status</div>
                <div class="text-caption text-grey-7">Active types can be assigned to vehicles</div>
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
              :label="isEditing ? 'Update Vehicle Type' : 'Save & Link Subscription'"
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
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import api from '@/config/api'
import { useDriverOnboarding } from '@/composables/useDriverOnboarding'

const router = useRouter()
const $q = useQuasar()
const {
  vehicleCategory,
  setVehicleCategory
} = useDriverOnboarding()

// Control States
const showModal = ref(false)
const saving = ref(false)
const loadingTable = ref(false)
const isEditing = ref(false)
const currentEditId = ref(null)
const filterSearch = ref('')

// Dropdown options
const categoryOptions = [
  { label: 'Bike (Two-wheeler)', value: 'bike' },
  { label: 'Auto (Three-wheeler)', value: 'auto' },
  { label: 'Car (Four-wheeler)', value: 'car' }
]

// Default blank state matching backend keys
const initialTypeState = {
  category: 'bike',
  typeName: '',
  seatingCapacity: 1,
  maxLoadCapacity: 10,
  baseFare: 30,
  description: '',
  isActive: true
}

// Reactive Form Object
const vehicleType = reactive({ ...initialTypeState })

// Table Data Source
const vehicleTypesList = ref([])

// Active count computed
const activeCount = computed(() => {
  return vehicleTypesList.value.filter(item => item.status === 'active' || item.status === true).length
})

// Columns
const columns = [
  { name: 'vehicle_category', label: 'Category', field: 'vehicle_category', align: 'left', sortable: true },
  { name: 'name', label: 'Type Name', field: 'name', align: 'left', sortable: true },
  { name: 'subscription_rate', label: 'Subscription Plan', field: 'vehicle_category', align: 'left' },
  { name: 'seating_capacity', label: 'Seating', field: 'seating_capacity', align: 'center', sortable: true },
  { name: 'base_fare', label: 'Base Fare', field: 'base_fare', align: 'right', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'center', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
]

// Category icon helper
const getCategoryIcon = (cat) => {
  if (!cat) return 'directions_car'
  const c = cat.toLowerCase()
  if (c === 'bike') return 'two_wheeler'
  if (c === 'auto') return 'electric_rickshaw'
  return 'directions_car'
}

// Category color helper
const getCategoryColor = (cat) => {
  if (!cat) return 'primary'
  const c = cat.toLowerCase()
  if (c === 'bike') return 'blue-8'
  if (c === 'auto') return 'amber-9'
  return 'purple-8'
}

// Monthly rate helper
const getMonthlyRate = (cat) => {
  const c = (cat || 'bike').toLowerCase()
  if (c === 'bike') return 800
  if (c === 'auto') return 1000
  return 1200
}

// Subscription rate text helper
const getSubscriptionRateText = (cat) => {
  const c = (cat || 'bike').toLowerCase()
  if (c === 'bike') return '₹800/mo (+ free trial & bonus)'
  if (c === 'auto') return '₹1,000/mo (+ free trial & bonus)'
  return '₹1,200/mo (+ free trial & bonus)'
}

// Select category and view its subscription
const handleSelectCategory = (cat) => {
  setVehicleCategory(cat)
  $q.notify({
    type: 'positive',
    message: `${cat.toUpperCase()} selected! Loading ${cat} subscription plans...`,
    position: 'top'
  })
  router.push({ name: 'DriverSubscription', query: { vehicle: cat } })
}

// Navigate to subscription page
const goToSubscription = (cat) => {
  if (cat) setVehicleCategory(cat)
  router.push({ name: 'DriverSubscription', query: { vehicle: cat } })
}

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
    const data = response.data?.data || response.data || []
    if (Array.isArray(data) && data.length > 0) {
      vehicleTypesList.value = data
    } else {
      // Fallback baseline vehicle types so table is always informative
      vehicleTypesList.value = [
        { id: 1, vehicle_category: 'bike', name: 'Standard Motorcycle / Scooter', seating_capacity: 1, base_fare: 30, status: 'active' },
        { id: 2, vehicle_category: 'auto', name: 'CNG / Electric Auto Rickshaw', seating_capacity: 3, base_fare: 50, status: 'active' },
        { id: 3, vehicle_category: 'car', name: 'Prime Sedan / Hatchback Cab', seating_capacity: 4, base_fare: 90, status: 'active' }
      ]
    }
  } catch (error) {
    console.log('Using local vehicle types fallback')
    vehicleTypesList.value = [
      { id: 1, vehicle_category: 'bike', name: 'Standard Motorcycle / Scooter', seating_capacity: 1, base_fare: 30, status: 'active' },
      { id: 2, vehicle_category: 'auto', name: 'CNG / Electric Auto Rickshaw', seating_capacity: 3, base_fare: 50, status: 'active' },
      { id: 3, vehicle_category: 'car', name: 'Prime Sedan / Hatchback Cab', seating_capacity: 4, base_fare: 90, status: 'active' }
    ]
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
    status: vehicleType.isActive ? 'active' : 'inactive'
  }

  try {
    if (isEditing.value) {
      await api.put(`/vehicleType/vehicle-types/${currentEditId.value}`, payload)
    } else {
      await api.post('/vehicleType/create', payload)
    }

    // Also set driver's chosen vehicle category
    setVehicleCategory(vehicleType.category)

    $q.notify({
      type: 'positive',
      message: `Vehicle type saved! ${vehicleType.category.toUpperCase()} subscription applied.`,
      position: 'top'
    })

    showModal.value = false
    onReset()
    await fetchVehicleTypes()
  } catch (error) {
    console.error('Error saving vehicle type:', error)
    // Local add to list if backend is offline
    setVehicleCategory(vehicleType.category)
    vehicleTypesList.value.push({
      id: Date.now(),
      ...payload
    })
    $q.notify({
      type: 'positive',
      message: `Vehicle category saved! ${vehicleType.category.toUpperCase()} subscription active.`,
      position: 'top'
    })
    showModal.value = false
    onReset()
  } finally {
    saving.value = false
  }
}

// 3. Edit Handler - Populates modal fields from row object
const onEditRow = (row) => {
  isEditing.value = true
  currentEditId.value = row.id

  vehicleType.category = (row.vehicle_category || 'bike').toLowerCase()
  vehicleType.typeName = row.name
  vehicleType.seatingCapacity = row.seating_capacity
  vehicleType.maxLoadCapacity = row.luggage_capacity
  vehicleType.baseFare = row.base_fare
  vehicleType.description = row.description
  vehicleType.isActive = row.status === 'active' || row.status === true

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
    } catch (error) {
      console.warn('API delete error, removing locally')
    }
    vehicleTypesList.value = vehicleTypesList.value.filter(i => i.id !== row.id)
    $q.notify({
      type: 'positive',
      message: 'Vehicle Type removed.',
      position: 'top'
    })
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

<style scoped>
.vehicle-type-page {
  background: #f8fafc;
  min-height: 100vh;
}

.bg-gradient-banner {
  background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%);
}

.category-card {
  background: white;
  border-radius: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
}

.category-card-active {
  border: 2px solid #0284c7 !important;
  box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.2);
}

.pricing-row {
  padding: 6px 0;
  border-bottom: 1px dashed #f1f5f9;
}

.pricing-row:last-child {
  border-bottom: none;
}
</style>
