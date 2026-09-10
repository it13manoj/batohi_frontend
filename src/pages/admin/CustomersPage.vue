```vue
<template>
  <q-page class="customers-page">

    <!-- ===================================================== -->
    <!-- PAGE HEADER -->
    <!-- ===================================================== -->

    <div class="page-header">

      <div>
        <div class="page-title">
          Customers
        </div>

        <div class="page-subtitle">
          Manage BatohiDrive customers
        </div>
      </div>

      <q-btn
        unelevated
        color="primary"
        icon="person_add"
        label="Add Customer"
        @click="openAddDialog"
      />

    </div>


    <!-- ===================================================== -->
    <!-- STATISTICS -->
    <!-- ===================================================== -->

    <div class="row q-col-gutter-md q-mb-lg">

      <!-- Total -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <q-avatar
                color="blue-1"
                text-color="primary"
                size="50px"
              >
                <q-icon
                  name="people"
                  size="28px"
                />
              </q-avatar>

              <div class="stat-info">

                <div class="stat-label">
                  Total Customers
                </div>

                <div class="stat-value">
                  {{ totalCustomers }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Active -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <q-avatar
                color="green-1"
                text-color="positive"
                size="50px"
              >
                <q-icon
                  name="person"
                  size="28px"
                />
              </q-avatar>

              <div class="stat-info">

                <div class="stat-label">
                  Active Customers
                </div>

                <div class="stat-value">
                  {{ activeCustomers }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- Inactive -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <q-avatar
                color="orange-1"
                text-color="orange"
                size="50px"
              >
                <q-icon
                  name="person_off"
                  size="28px"
                />
              </q-avatar>

              <div class="stat-info">

                <div class="stat-label">
                  Inactive
                </div>

                <div class="stat-value">
                  {{ inactiveCustomers }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- New -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">

          <q-card-section>

            <div class="stat-content">

              <q-avatar
                color="purple-1"
                text-color="purple"
                size="50px"
              >
                <q-icon
                  name="person_add"
                  size="28px"
                />
              </q-avatar>

              <div class="stat-info">

                <div class="stat-label">
                  New This Month
                </div>

                <div class="stat-value">
                  {{ newCustomers }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- ===================================================== -->
    <!-- CUSTOMER TABLE -->
    <!-- ===================================================== -->

    <q-card class="customer-card">

      <!-- TABLE HEADER -->
      <q-card-section class="table-header">

        <div>

          <div class="table-title">
            Customer List
          </div>

          <div class="table-subtitle">
            View and manage registered customers
          </div>

        </div>


        <div class="table-actions">

          <!-- Search -->
          <q-input
            v-model="search"
            outlined
            dense
            debounce="300"
            placeholder="Search customer..."
            class="search-input"
            clearable
          >

            <template #prepend>
              <q-icon name="search" />
            </template>

          </q-input>


          <!-- Status -->
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


      <!-- CUSTOMER TABLE -->

      <q-table
        :rows="filteredCustomers"
        :columns="columns"
        row-key="id"
        flat
        :loading="loading"
        :pagination="pagination"
        @update:pagination="pagination = $event"
        no-data-label="No customers found"
        class="customer-table"
      >

        <!-- CUSTOMER -->
        <template #body-cell-customer="props">

          <q-td :props="props">

            <div class="customer-info">

              <q-avatar
                size="42px"
                color="primary"
                text-color="white"
              >

                <img
                  v-if="props.row.image"
                  :src="props.row.image"
                  alt="Customer"
                />

                <span v-else>
                  {{ getInitials(props.row.name) }}
                </span>

              </q-avatar>


              <div class="customer-details">

                <div class="customer-name">
                  {{ props.row.name }}
                </div>

                <div class="customer-id">
                  ID: #{{ props.row.id }}
                </div>

              </div>

            </div>

          </q-td>

        </template>


        <!-- EMAIL -->
        <template #body-cell-email="props">

          <q-td :props="props">

            <div class="email-text">
              {{ props.row.email }}
            </div>

          </q-td>

        </template>


        <!-- MOBILE -->
        <template #body-cell-mobile="props">

          <q-td :props="props">

            <div class="mobile-text">

              <q-icon
                name="phone"
                size="16px"
                class="q-mr-xs"
              />

              {{ props.row.mobile }}

            </div>

          </q-td>

        </template>


        <!-- GENDER -->
        <template #body-cell-gender="props">

          <q-td :props="props">

            {{ props.row.gender || '-' }}

          </q-td>

        </template>


        <!-- LOCATION -->
        <template #body-cell-location="props">

          <q-td :props="props">

            <div class="location-text">

              {{ props.row.city || '-' }}

              <div class="location-state">
                {{ props.row.state || '' }}
              </div>

            </div>

          </q-td>

        </template>


        <!-- STATUS -->
        <template #body-cell-status="props">

          <q-td :props="props">

            <q-chip
              dense
              :color="
                props.row.status === 'Active'
                  ? 'green-1'
                  : 'red-1'
              "
              :text-color="
                props.row.status === 'Active'
                  ? 'positive'
                  : 'negative'
              "
            >

              <q-icon
                :name="
                  props.row.status === 'Active'
                    ? 'check_circle'
                    : 'cancel'
                "
                size="16px"
                class="q-mr-xs"
              />

              {{ props.row.status }}

            </q-chip>

          </q-td>

        </template>


        <!-- BOOKINGS -->
        <template #body-cell-bookings="props">

          <q-td :props="props">

            <q-badge
              color="blue-1"
              text-color="primary"
              class="booking-badge"
            >
              {{ props.row.bookings }}
            </q-badge>

          </q-td>

        </template>


        <!-- REGISTERED -->
        <template #body-cell-createdAt="props">

          <q-td :props="props">

            {{ formatDate(props.row.createdAt) }}

          </q-td>

        </template>


        <!-- ACTIONS -->
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
              @click="viewCustomer(props.row)"
            >
              <q-tooltip>
                View Customer
              </q-tooltip>
            </q-btn>


            <!-- Edit -->
            <q-btn
              flat
              round
              dense
              icon="edit"
              color="warning"
              @click="editCustomer(props.row)"
            >
              <q-tooltip>
                Edit Customer
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
                Delete Customer
              </q-tooltip>
            </q-btn>

          </q-td>

        </template>

      </q-table>

    </q-card>


    <!-- ===================================================== -->
    <!-- ADD / EDIT CUSTOMER DIALOG -->
    <!-- ===================================================== -->

    <q-dialog v-model="customerDialog">

      <q-card
        class="customer-form-card"
      >

        <!-- HEADER -->
        <q-card-section class="row items-center">

          <div class="text-h6">

            {{
              editingCustomer
                ? 'Edit Customer'
                : 'Add Customer'
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


        <!-- FORM -->
        <q-card-section>

          <div class="row q-col-gutter-md">


            <!-- ================================================= -->
            <!-- PHOTO -->
            <!-- ================================================= -->

            <div class="col-12">

              <div class="photo-upload-wrapper">

                <q-avatar
                  size="100px"
                  color="primary"
                  text-color="white"
                  class="customer-photo-preview"
                >

                  <img
                    v-if="customerForm.image"
                    :src="customerForm.image"
                    alt="Customer Photo"
                  />

                  <q-icon
                    v-else
                    name="person"
                    size="45px"
                  />

                </q-avatar>


                <div class="photo-upload-content">

                  <div class="photo-title">
                    Customer Photo
                  </div>

                  <div class="photo-subtitle">
                    Upload customer profile photo
                  </div>

                  <q-file
                    v-model="photoFile"
                    outlined
                    dense
                    accept="image/*"
                    label="Choose Photo"
                    class="photo-input"
                    @update:model-value="handlePhotoUpload"
                  >

                    <template #prepend>
                      <q-icon name="photo_camera" />
                    </template>

                  </q-file>

                </div>

              </div>

            </div>


            <!-- ================================================= -->
            <!-- FULL NAME -->
            <!-- ================================================= -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="customerForm.name"
                outlined
                label="Full Name *"
                :rules="[
                  val => !!val || 'Name is required'
                ]"
              />

            </div>


            <!-- ================================================= -->
            <!-- EMAIL -->
            <!-- ================================================= -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="customerForm.email"
                outlined
                type="email"
                label="Email *"
                :rules="[
                  val => !!val || 'Email is required',
                  val =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
                    || 'Enter valid email'
                ]"
              />

            </div>


            <!-- ================================================= -->
            <!-- MOBILE -->
            <!-- ================================================= -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="customerForm.mobile"
                outlined
                label="Mobile Number *"
                maxlength="10"
                inputmode="numeric"
                :rules="[
                  val => !!val || 'Mobile number is required',
                  val =>
                    /^[6-9]\d{9}$/.test(val)
                    || 'Enter valid 10 digit mobile number'
                ]"
              >

                <template #prepend>
                  <q-icon name="phone" />
                </template>

              </q-input>

            </div>


            <!-- ================================================= -->
            <!-- AADHAAR -->
            <!-- ================================================= -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="customerForm.aadhaar"
                outlined
                label="Aadhaar Card Number *"
                maxlength="12"
                inputmode="numeric"
                :rules="[
                  val => !!val || 'Aadhaar number is required',
                  val =>
                    /^\d{12}$/.test(val)
                    || 'Enter valid 12 digit Aadhaar number'
                ]"
              >

                <template #prepend>
                  <q-icon name="badge" />
                </template>

              </q-input>

            </div>


            <!-- ================================================= -->
            <!-- GENDER -->
            <!-- ================================================= -->

            <div class="col-12 col-md-6">

              <q-select
                v-model="customerForm.gender"
                outlined
                label="Gender *"
                :options="genderOptions"
                :rules="[
                  val => !!val || 'Gender is required'
                ]"
              >

                <template #prepend>
                  <q-icon name="wc" />
                </template>

              </q-select>

            </div>


            <!-- ================================================= -->
            <!-- STATE -->
            <!-- ================================================= -->

            <div class="col-12 col-md-6">

              <q-select
                v-model="customerForm.state"
                outlined
                label="State *"
                :options="stateOptions"
                :rules="[
                  val => !!val || 'State is required'
                ]"
                @update:model-value="onStateChange"
              >

                <template #prepend>
                  <q-icon name="map" />
                </template>

              </q-select>

            </div>


            <!-- ================================================= -->
            <!-- CITY -->
            <!-- ================================================= -->

            <div class="col-12 col-md-6">

              <q-select
                v-model="customerForm.city"
                outlined
                label="City *"
                :options="availableCities"
                :disable="!customerForm.state"
                :rules="[
                  val => !!val || 'City is required'
                ]"
              >

                <template #prepend>
                  <q-icon name="location_city" />
                </template>

              </q-select>

            </div>


            <!-- ================================================= -->
            <!-- STATUS -->
            <!-- ================================================= -->

            <div class="col-12 col-md-6">

              <q-select
                v-model="customerForm.status"
                outlined
                label="Status"
                :options="[
                  'Active',
                  'Inactive'
                ]"
              >

                <template #prepend>
                  <q-icon name="toggle_on" />
                </template>

              </q-select>

            </div>


            <!-- ================================================= -->
            <!-- ADDRESS -->
            <!-- ================================================= -->

            <div class="col-12">

              <q-input
                v-model="customerForm.address"
                outlined
                type="textarea"
                rows="3"
                label="Address"
              >

                <template #prepend>
                  <q-icon name="location_on" />
                </template>

              </q-input>

            </div>

          </div>

        </q-card-section>


        <!-- ACTIONS -->
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
              editingCustomer
                ? 'Update Customer'
                : 'Add Customer'
            "
            @click="saveCustomer"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- ===================================================== -->
    <!-- VIEW CUSTOMER DIALOG -->
    <!-- ===================================================== -->

    <q-dialog v-model="viewDialog">

      <q-card
        class="view-customer-card"
      >

        <!-- HEADER -->
        <q-card-section class="row items-center">

          <div class="text-h6">
            Customer Details
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
          v-if="selectedCustomer"
        >

          <!-- PROFILE -->
          <div class="text-center q-mb-lg">

            <q-avatar
              size="100px"
              color="primary"
              text-color="white"
            >

              <img
                v-if="selectedCustomer.image"
                :src="selectedCustomer.image"
                alt="Customer"
              />

              <span v-else>
                {{ getInitials(selectedCustomer.name) }}
              </span>

            </q-avatar>


            <div class="text-h6 q-mt-sm">
              {{ selectedCustomer.name }}
            </div>


            <q-chip
              dense
              :color="
                selectedCustomer.status === 'Active'
                  ? 'green-1'
                  : 'red-1'
              "
              :text-color="
                selectedCustomer.status === 'Active'
                  ? 'positive'
                  : 'negative'
              "
            >
              {{ selectedCustomer.status }}
            </q-chip>

          </div>


          <!-- DETAILS -->
          <q-list separator>


            <!-- Email -->
            <q-item>

              <q-item-section avatar>
                <q-icon name="email" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Email
                </q-item-label>

                <q-item-label>
                  {{ selectedCustomer.email || '-' }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- Mobile -->
            <q-item>

              <q-item-section avatar>
                <q-icon name="phone" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Mobile
                </q-item-label>

                <q-item-label>
                  {{ selectedCustomer.mobile || '-' }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- Aadhaar -->
            <q-item>

              <q-item-section avatar>
                <q-icon name="badge" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Aadhaar Card
                </q-item-label>

                <q-item-label>
                  {{ maskAadhaar(selectedCustomer.aadhaar) }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- Gender -->
            <q-item>

              <q-item-section avatar>
                <q-icon name="wc" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Gender
                </q-item-label>

                <q-item-label>
                  {{ selectedCustomer.gender || '-' }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- State -->
            <q-item>

              <q-item-section avatar>
                <q-icon name="map" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  State
                </q-item-label>

                <q-item-label>
                  {{ selectedCustomer.state || '-' }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- City -->
            <q-item>

              <q-item-section avatar>
                <q-icon name="location_city" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  City
                </q-item-label>

                <q-item-label>
                  {{ selectedCustomer.city || '-' }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- Bookings -->
            <q-item>

              <q-item-section avatar>
                <q-icon name="event" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Total Bookings
                </q-item-label>

                <q-item-label>
                  {{ selectedCustomer.bookings }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- Registered -->
            <q-item>

              <q-item-section avatar>
                <q-icon name="calendar_month" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Registered
                </q-item-label>

                <q-item-label>
                  {{ formatDate(selectedCustomer.createdAt) }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- Address -->
            <q-item>

              <q-item-section avatar>
                <q-icon name="location_on" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Address
                </q-item-label>

                <q-item-label>
                  {{ selectedCustomer.address || 'Not available' }}
                </q-item-label>

              </q-item-section>

            </q-item>

          </q-list>

        </q-card-section>

      </q-card>

    </q-dialog>


    <!-- ===================================================== -->
    <!-- DELETE DIALOG -->
    <!-- ===================================================== -->

    <q-dialog v-model="deleteDialog">

      <q-card
        style="width: 400px; max-width: 95vw"
      >

        <q-card-section>

          <div class="text-h6">
            Delete Customer
          </div>

        </q-card-section>


        <q-card-section>

          Are you sure you want to delete

          <strong>
            {{ selectedCustomer?.name }}
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
            @click="deleteCustomer"
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


/* =========================================================
   LOADING
========================================================= */

const loading = ref(false)


/* =========================================================
   SEARCH
========================================================= */

const search = ref('')

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


/* =========================================================
   PAGINATION
========================================================= */

const pagination = ref({

  page: 1,

  rowsPerPage: 10

})


/* =========================================================
   FORM OPTIONS
========================================================= */

const genderOptions = [
  'Male',
  'Female',
  'Other'
]


/*
 * State and City data
 *
 * You can add more states/cities
 * according to your project/API.
 */

const stateCities = {

  'Bihar': [
    'Buxar',
    'Patna',
    'Ara',
    'Gaya',
    'Muzaffarpur',
    'Bhagalpur',
    'Darbhanga'
  ],

  'Uttar Pradesh': [
    'Varanasi',
    'Gorakhpur',
    'Lucknow',
    'Kanpur',
    'Prayagraj',
    'Noida',
    'Agra'
  ],

  'Delhi': [
    'New Delhi',
    'Delhi'
  ],

  'Jharkhand': [
    'Ranchi',
    'Dhanbad',
    'Jamshedpur',
    'Bokaro'
  ],

  'West Bengal': [
    'Kolkata',
    'Howrah',
    'Durgapur',
    'Siliguri'
  ],

  'Madhya Pradesh': [
    'Bhopal',
    'Indore',
    'Gwalior',
    'Jabalpur'
  ],

  'Rajasthan': [
    'Jaipur',
    'Jodhpur',
    'Udaipur',
    'Kota'
  ],

  'Maharashtra': [
    'Mumbai',
    'Pune',
    'Nagpur',
    'Nashik'
  ]

}


const stateOptions = Object.keys(stateCities)


const availableCities = computed(() => {

  if (!customerForm.value.state) {
    return []
  }

  return stateCities[
    customerForm.value.state
  ] || []

})


/* =========================================================
   TABLE COLUMNS
========================================================= */

const columns = [

  {
    name: 'customer',
    label: 'CUSTOMER',
    field: 'name',
    align: 'left',
    sortable: true
  },

  {
    name: 'email',
    label: 'EMAIL',
    field: 'email',
    align: 'left',
    sortable: true
  },

  {
    name: 'mobile',
    label: 'MOBILE',
    field: 'mobile',
    align: 'left'
  },

  {
    name: 'gender',
    label: 'GENDER',
    field: 'gender',
    align: 'center'
  },

  {
    name: 'location',
    label: 'LOCATION',
    field: 'city',
    align: 'left'
  },

  {
    name: 'status',
    label: 'STATUS',
    field: 'status',
    align: 'center',
    sortable: true
  },

  {
    name: 'bookings',
    label: 'BOOKINGS',
    field: 'bookings',
    align: 'center',
    sortable: true
  },

  {
    name: 'createdAt',
    label: 'REGISTERED',
    field: 'createdAt',
    align: 'left',
    sortable: true
  },

  {
    name: 'actions',
    label: 'ACTIONS',
    field: 'actions',
    align: 'right'
  }

]


/* =========================================================
   CUSTOMER DATA
========================================================= */

const customers = ref([

  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    mobile: '9876543210',
    aadhaar: '123456789012',
    gender: 'Male',
    state: 'Delhi',
    city: 'New Delhi',
    status: 'Active',
    bookings: 12,
    createdAt: '2026-08-01',
    address: 'New Delhi, India',
    image: ''
  },

  {
    id: 2,
    name: 'Priya Singh',
    email: 'priya@example.com',
    mobile: '9876543211',
    aadhaar: '234567890123',
    gender: 'Female',
    state: 'Uttar Pradesh',
    city: 'Noida',
    status: 'Active',
    bookings: 8,
    createdAt: '2026-07-22',
    address: 'Noida, Uttar Pradesh',
    image: ''
  },

  {
    id: 3,
    name: 'Amit Kumar',
    email: 'amit@example.com',
    mobile: '9876543212',
    aadhaar: '345678901234',
    gender: 'Male',
    state: 'Haryana',
    city: 'Gurugram',
    status: 'Inactive',
    bookings: 3,
    createdAt: '2026-07-10',
    address: 'Gurugram, Haryana',
    image: ''
  },

  {
    id: 4,
    name: 'Neha Verma',
    email: 'neha@example.com',
    mobile: '9876543213',
    aadhaar: '456789012345',
    gender: 'Female',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    status: 'Active',
    bookings: 15,
    createdAt: '2026-06-28',
    address: 'Lucknow, Uttar Pradesh',
    image: ''
  },

  {
    id: 5,
    name: 'Rohit Gupta',
    email: 'rohit@example.com',
    mobile: '9876543214',
    aadhaar: '567890123456',
    gender: 'Male',
    state: 'Rajasthan',
    city: 'Jaipur',
    status: 'Active',
    bookings: 6,
    createdAt: '2026-06-20',
    address: 'Jaipur, Rajasthan',
    image: ''
  },

  {
    id: 6,
    name: 'Anjali Yadav',
    email: 'anjali@example.com',
    mobile: '9876543215',
    aadhaar: '678901234567',
    gender: 'Female',
    state: 'Uttar Pradesh',
    city: 'Kanpur',
    status: 'Inactive',
    bookings: 2,
    createdAt: '2026-06-15',
    address: 'Kanpur, Uttar Pradesh',
    image: ''
  },

  {
    id: 7,
    name: 'Vikas Mishra',
    email: 'vikas@example.com',
    mobile: '9876543216',
    aadhaar: '789012345678',
    gender: 'Male',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    status: 'Active',
    bookings: 10,
    createdAt: '2026-06-10',
    address: 'Bhopal, Madhya Pradesh',
    image: ''
  },

  {
    id: 8,
    name: 'Pooja Sharma',
    email: 'pooja@example.com',
    mobile: '9876543217',
    aadhaar: '890123456789',
    gender: 'Female',
    state: 'Uttar Pradesh',
    city: 'Agra',
    status: 'Active',
    bookings: 5,
    createdAt: '2026-06-05',
    address: 'Agra, Uttar Pradesh',
    image: ''
  }

])


/* =========================================================
   FILTERED CUSTOMERS
========================================================= */

const filteredCustomers = computed(() => {

  let data = [...customers.value]


  /* STATUS FILTER */

  if (statusFilter.value !== 'all') {

    data = data.filter(
      customer =>
        customer.status === statusFilter.value
    )

  }


  /* SEARCH */

  if (search.value) {

    const keyword =
      search.value
        .toLowerCase()
        .trim()


    data = data.filter(customer =>

      customer.name
        .toLowerCase()
        .includes(keyword)

      ||

      customer.email
        .toLowerCase()
        .includes(keyword)

      ||

      customer.mobile
        .includes(keyword)

      ||

      customer.aadhaar
        .includes(keyword)

      ||

      customer.city
        ?.toLowerCase()
        .includes(keyword)

      ||

      customer.state
        ?.toLowerCase()
        .includes(keyword)

    )

  }


  return data

})


/* =========================================================
   STATISTICS
========================================================= */

const totalCustomers = computed(() => {

  return customers.value.length

})


const activeCustomers = computed(() => {

  return customers.value.filter(
    customer =>
      customer.status === 'Active'
  ).length

})


const inactiveCustomers = computed(() => {

  return customers.value.filter(
    customer =>
      customer.status === 'Inactive'
  ).length

})


const newCustomers = computed(() => {

  /*
   * Replace this with API monthly calculation
   * when backend is connected.
   */

  return 4

})


/* =========================================================
   DIALOGS
========================================================= */

const customerDialog = ref(false)

const viewDialog = ref(false)

const deleteDialog = ref(false)


/* =========================================================
   SELECTED CUSTOMER
========================================================= */

const selectedCustomer = ref(null)

const editingCustomer = ref(false)


/* =========================================================
   PHOTO
========================================================= */

const photoFile = ref(null)


/* =========================================================
   CUSTOMER FORM
========================================================= */

const createEmptyForm = () => ({

  id: null,

  name: '',

  email: '',

  mobile: '',

  aadhaar: '',

  gender: '',

  state: '',

  city: '',

  status: 'Active',

  address: '',

  image: ''

})


const customerForm = ref(
  createEmptyForm()
)


/* =========================================================
   ADD CUSTOMER
========================================================= */

const openAddDialog = () => {

  editingCustomer.value = false

  customerForm.value =
    createEmptyForm()

  photoFile.value = null

  customerDialog.value = true

}


/* =========================================================
   EDIT CUSTOMER
========================================================= */

const editCustomer = customer => {

  editingCustomer.value = true

  customerForm.value = {

    id: customer.id,

    name: customer.name || '',

    email: customer.email || '',

    mobile: customer.mobile || '',

    aadhaar: customer.aadhaar || '',

    gender: customer.gender || '',

    state: customer.state || '',

    city: customer.city || '',

    status: customer.status || 'Active',

    address: customer.address || '',

    image: customer.image || ''

  }

  photoFile.value = null

  customerDialog.value = true

}


/* =========================================================
   STATE CHANGE
========================================================= */

const onStateChange = () => {

  /*
   * Reset city whenever state changes.
   */

  customerForm.value.city = ''

}


/* =========================================================
   PHOTO UPLOAD
========================================================= */

const handlePhotoUpload = file => {

  if (!file) {
    return
  }


  /*
   * Convert image to Base64 for demo/local use.
   *
   * When API is connected, send the actual File
   * using FormData instead.
   */

  const reader = new FileReader()

  reader.onload = event => {

    customerForm.value.image =
      event.target.result

  }

  reader.readAsDataURL(file)

}


/* =========================================================
   SAVE CUSTOMER
========================================================= */

const saveCustomer = () => {

  /* NAME */

  if (!customerForm.value.name) {

    Notify.create({

      type: 'negative',

      message:
        'Customer name is required'

    })

    return

  }


  /* EMAIL */

  if (
    !customerForm.value.email
    ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(customerForm.value.email)
  ) {

    Notify.create({

      type: 'negative',

      message:
        'Enter a valid email address'

    })

    return

  }


  /* MOBILE */

  if (
    !/^[6-9]\d{9}$/
      .test(customerForm.value.mobile)
  ) {

    Notify.create({

      type: 'negative',

      message:
        'Enter valid 10 digit mobile number'

    })

    return

  }


  /* AADHAAR */

  if (
    !/^\d{12}$/
      .test(customerForm.value.aadhaar)
  ) {

    Notify.create({

      type: 'negative',

      message:
        'Enter valid 12 digit Aadhaar number'

    })

    return

  }


  /* GENDER */

  if (!customerForm.value.gender) {

    Notify.create({

      type: 'negative',

      message:
        'Please select gender'

    })

    return

  }


  /* STATE */

  if (!customerForm.value.state) {

    Notify.create({

      type: 'negative',

      message:
        'Please select state'

    })

    return

  }


  /* CITY */

  if (!customerForm.value.city) {

    Notify.create({

      type: 'negative',

      message:
        'Please select city'

    })

    return

  }


  /* ===================================================== */
  /* UPDATE */
  /* ===================================================== */

  if (editingCustomer.value) {

    const index =
      customers.value.findIndex(
        customer =>
          customer.id ===
          customerForm.value.id
      )


    if (index !== -1) {

      customers.value[index] = {

        ...customers.value[index],

        ...customerForm.value

      }

    }


    Notify.create({

      type: 'positive',

      message:
        'Customer updated successfully'

    })

  }


  /* ===================================================== */
  /* ADD */
  /* ===================================================== */

  else {

    const newCustomer = {

      ...customerForm.value,

      id: Date.now(),

      bookings: 0,

      createdAt:
        new Date()
          .toISOString()
          .split('T')[0]

    }


    customers.value.unshift(
      newCustomer
    )


    Notify.create({

      type: 'positive',

      message:
        'Customer added successfully'

    })

  }


  customerDialog.value = false

}


/* =========================================================
   VIEW CUSTOMER
========================================================= */

const viewCustomer = customer => {

  selectedCustomer.value =
    customer

  viewDialog.value = true

}


/* =========================================================
   MASK AADHAAR
========================================================= */

const maskAadhaar = aadhaar => {

  if (!aadhaar) {
    return '-'
  }


  if (aadhaar.length !== 12) {
    return aadhaar
  }


  return `XXXX-XXXX-${aadhaar.slice(-4)}`

}


/* =========================================================
   DELETE CONFIRMATION
========================================================= */

const confirmDelete = customer => {

  selectedCustomer.value =
    customer

  deleteDialog.value = true

}


/* =========================================================
   DELETE CUSTOMER
========================================================= */

const deleteCustomer = () => {

  if (!selectedCustomer.value) {
    return
  }


  customers.value =
    customers.value.filter(
      customer =>
        customer.id !==
        selectedCustomer.value.id
    )


  deleteDialog.value = false


  Notify.create({

    type: 'positive',

    message:
      'Customer deleted successfully'

  })


  selectedCustomer.value = null

}


/* =========================================================
   INITIALS
========================================================= */

const getInitials = name => {

  if (!name) {
    return 'C'
  }


  return name

    .split(' ')

    .map(word =>
      word.charAt(0)
    )

    .join('')

    .substring(0, 2)

    .toUpperCase()

}


/* =========================================================
   DATE FORMAT
========================================================= */

const formatDate = date => {

  if (!date) {
    return '-'
  }


  return new Date(date)
    .toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    )

}


/* =========================================================
   API PLACEHOLDER
========================================================= */

const fetchCustomers = async () => {

  loading.value = true

  try {

    /*
     * Later connect your API here.
     *
     * Example:
     *
     * const response = await axios.get(
     *   `${BASE_URL}/customers`,
     *   {
     *     headers: {
     *       Authorization:
     *         `Bearer ${localStorage.getItem('token')}`
     *     }
     *   }
     * )
     *
     * customers.value = response.data.data
     */

  }

  catch (error) {

    console.error(
      'Customer API Error:',
      error
    )


    Notify.create({

      type: 'negative',

      message:
        'Unable to load customers'

    })

  }

  finally {

    loading.value = false

  }

}


/* =========================================================
   PAGE LOAD
========================================================= */

onMounted(() => {

  fetchCustomers()

})

</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.customers-page {

  padding: 24px;

  background: #f5f7fb;

  min-height: calc(100vh - 64px);

}


/* =========================================================
   PAGE HEADER
========================================================= */

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


/* =========================================================
   STAT CARD
========================================================= */

.stat-card {

  background: #ffffff;

  border-radius: 12px;

  box-shadow:
    0 2px 10px
    rgba(
      0,
      0,
      0,
      0.04
    );

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


/* =========================================================
   CUSTOMER CARD
========================================================= */

.customer-card {

  border-radius: 12px;

  background: #ffffff;

  box-shadow:
    0 2px 10px
    rgba(
      0,
      0,
      0,
      0.04
    );

}


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

  width: 140px;

}


/* =========================================================
   CUSTOMER INFO
========================================================= */

.customer-info {

  display: flex;

  align-items: center;

}


.customer-details {

  margin-left: 10px;

}


.customer-name {

  font-size: 14px;

  font-weight: 600;

  color: #1f2937;

}


.customer-id {

  font-size: 11px;

  color: #9ca3af;

  margin-top: 2px;

}


.email-text {

  color: #4b5563;

  font-size: 13px;

}


.mobile-text {

  color: #4b5563;

  font-size: 13px;

}


.location-text {

  font-size: 13px;

  color: #374151;

  font-weight: 500;

}


.location-state {

  font-size: 11px;

  color: #9ca3af;

  margin-top: 2px;

}


.booking-badge {

  padding: 6px 10px;

  border-radius: 6px;

  font-weight: 600;

}


/* =========================================================
   TABLE
========================================================= */

.customer-table {

  border-radius: 0 0 12px 12px;

}


.customer-table :deep(th) {

  font-size: 11px;

  font-weight: 700;

  color: #6b7280;

  background: #fafafa;

}


.customer-table :deep(td) {

  height: 65px;

}


/* =========================================================
   ADD / EDIT FORM
========================================================= */

.customer-form-card {

  width: 700px;

  max-width: 95vw;

  border-radius: 14px;

}


/* =========================================================
   PHOTO UPLOAD
========================================================= */

.photo-upload-wrapper {

  display: flex;

  align-items: center;

  gap: 20px;

  padding: 16px;

  background: #f8fafc;

  border-radius: 12px;

  margin-bottom: 10px;

}


.customer-photo-preview {

  overflow: hidden;

  flex-shrink: 0;

}


.customer-photo-preview img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


.photo-upload-content {

  flex: 1;

}


.photo-title {

  font-size: 15px;

  font-weight: 600;

  color: #1f2937;

}


.photo-subtitle {

  font-size: 12px;

  color: #9ca3af;

  margin: 3px 0 10px;

}


.photo-input {

  max-width: 280px;

}


/* =========================================================
   VIEW CUSTOMER
========================================================= */

.view-customer-card {

  width: 500px;

  max-width: 95vw;

  border-radius: 14px;

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 900px) {

  .customers-page {

    padding: 16px;

  }


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


  .status-filter {

    width: 150px;

  }

}


@media (max-width: 600px) {

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


  .photo-upload-wrapper {

    flex-direction: column;

    align-items: flex-start;

  }


  .photo-input {

    max-width: 100%;

    width: 100%;

  }

}

</style>
```
