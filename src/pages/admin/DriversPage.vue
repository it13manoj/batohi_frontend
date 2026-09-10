```vue
<template>
  <q-page class="customers-page">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->

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


    <!-- =====================================================
         STATISTICS
    ====================================================== -->

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


    <!-- =====================================================
         CUSTOMER TABLE
    ====================================================== -->

    <q-card class="customer-card">

      <!-- Table Header -->
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


      <!-- =====================================================
           TABLE
      ====================================================== -->

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
            {{ props.row.email }}
          </q-td>

        </template>


        <!-- MOBILE -->
        <template #body-cell-mobile="props">

          <q-td :props="props">

            <q-icon
              name="phone"
              size="16px"
              class="q-mr-xs"
            />

            {{ props.row.mobile }}

          </q-td>

        </template>


        <!-- GENDER -->
        <template #body-cell-gender="props">

          <q-td :props="props">

            {{ props.row.gender || '-' }}

          </q-td>

        </template>


        <!-- AGENCY TYPE -->
        <template #body-cell-agencyType="props">

          <q-td :props="props">

            <q-chip
              dense
              :color="
                props.row.agencyType === 'Owner'
                  ? 'blue-1'
                  : 'purple-1'
              "
              :text-color="
                props.row.agencyType === 'Owner'
                  ? 'primary'
                  : 'purple'
              "
            >
              {{ props.row.agencyType }}
            </q-chip>

          </q-td>

        </template>


        <!-- INSURANCE -->
        <template #body-cell-insurance="props">

          <q-td :props="props">

            <q-chip
              dense
              :color="
                props.row.insurance === 'Yes'
                  ? 'green-1'
                  : 'red-1'
              "
              :text-color="
                props.row.insurance === 'Yes'
                  ? 'positive'
                  : 'negative'
              "
            >

              <q-icon
                :name="
                  props.row.insurance === 'Yes'
                    ? 'verified'
                    : 'cancel'
                "
                size="16px"
                class="q-mr-xs"
              />

              {{ props.row.insurance }}

            </q-chip>

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


    <!-- =====================================================
         ADD / EDIT CUSTOMER
    ====================================================== -->

    <q-dialog v-model="customerDialog">

      <q-card class="customer-form-card">

        <!-- Header -->
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


        <!-- Form -->
        <q-card-section>

          <div class="row q-col-gutter-md">


            <!-- =================================================
                 CUSTOMER PHOTO
            ================================================== -->

            <div class="col-12">

              <div class="upload-section">

                <q-avatar
                  size="100px"
                  color="primary"
                  text-color="white"
                  class="image-preview"
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


                <div class="upload-info">

                  <div class="upload-title">
                    Customer Photo
                  </div>

                  <div class="upload-description">
                    Upload customer profile photo
                  </div>

                  <q-file
                    v-model="photoFile"
                    outlined
                    dense
                    accept="image/*"
                    label="Choose Photo"
                    @update:model-value="handlePhotoUpload"
                  >

                    <template #prepend>
                      <q-icon name="photo_camera" />
                    </template>

                  </q-file>

                </div>

              </div>

            </div>


            <!-- =================================================
                 FULL NAME
            ================================================== -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="customerForm.name"
                outlined
                label="Full Name *"
              >

                <template #prepend>
                  <q-icon name="person" />
                </template>

              </q-input>

            </div>


            <!-- =================================================
                 EMAIL
            ================================================== -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="customerForm.email"
                outlined
                type="email"
                label="Email *"
              >

                <template #prepend>
                  <q-icon name="email" />
                </template>

              </q-input>

            </div>


            <!-- =================================================
                 MOBILE
            ================================================== -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="customerForm.mobile"
                outlined
                label="Mobile Number *"
                maxlength="10"
                inputmode="numeric"
              >

                <template #prepend>
                  <q-icon name="phone" />
                </template>

              </q-input>

            </div>


            <!-- =================================================
                 AADHAAR
            ================================================== -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="customerForm.aadhaar"
                outlined
                label="Aadhaar Card Number *"
                maxlength="12"
                inputmode="numeric"
              >

                <template #prepend>
                  <q-icon name="badge" />
                </template>

              </q-input>

            </div>


            <!-- =================================================
                 GENDER
            ================================================== -->

            <div class="col-12 col-md-6">

              <q-select
                v-model="customerForm.gender"
                outlined
                label="Gender *"
                :options="genderOptions"
              >

                <template #prepend>
                  <q-icon name="wc" />
                </template>

              </q-select>

            </div>


            <!-- =================================================
                 AGENCY TYPE
            ================================================== -->

            <div class="col-12 col-md-6">

              <q-select
                v-model="customerForm.agencyType"
                outlined
                label="Agency Type *"
                :options="agencyTypeOptions"
              >

                <template #prepend>
                  <q-icon name="business_center" />
                </template>

              </q-select>

            </div>


            <!-- =================================================
                 INSURANCE
            ================================================== -->

            <div class="col-12 col-md-6">

              <q-select
                v-model="customerForm.insurance"
                outlined
                label="Insurance *"
                :options="insuranceOptions"
              >

                <template #prepend>
                  <q-icon name="security" />
                </template>

              </q-select>

            </div>


            <!-- =================================================
                 INSURANCE NUMBER
            ================================================== -->

            <div
              v-if="customerForm.insurance === 'Yes'"
              class="col-12 col-md-6"
            >

              <q-input
                v-model="customerForm.insuranceNumber"
                outlined
                label="Insurance Number *"
              >

                <template #prepend>
                  <q-icon name="confirmation_number" />
                </template>

              </q-input>

            </div>


            <!-- =================================================
                 INSURANCE EXPIRY DATE
            ================================================== -->

            <div
              v-if="customerForm.insurance === 'Yes'"
              class="col-12 col-md-6"
            >

              <q-input
                v-model="customerForm.insuranceExpiry"
                outlined
                label="Insurance Expiry Date *"
                readonly
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
                    v-model="customerForm.insuranceExpiry"
                    mask="YYYY-MM-DD"
                  >

                    <div class="row items-center justify-end q-gutter-sm">

                      <q-btn
                        v-close-popup
                        label="Close"
                        color="primary"
                        flat
                      />

                    </div>

                  </q-date>

                </q-popup-proxy>

              </q-input>

            </div>


            <!-- =================================================
                 STATE
            ================================================== -->

            <div class="col-12 col-md-6">

              <q-select
                v-model="customerForm.state"
                outlined
                label="State *"
                :options="stateOptions"
                @update:model-value="onStateChange"
              >

                <template #prepend>
                  <q-icon name="map" />
                </template>

              </q-select>

            </div>


            <!-- =================================================
                 CITY
            ================================================== -->

            <div class="col-12 col-md-6">

              <q-select
                v-model="customerForm.city"
                outlined
                label="City *"
                :options="availableCities"
                :disable="!customerForm.state"
              >

                <template #prepend>
                  <q-icon name="location_city" />
                </template>

              </q-select>

            </div>


            <!-- =================================================
                 LICENSE PHOTO
            ================================================== -->

            <div class="col-12">

              <div class="document-upload">

                <div class="document-preview">

                  <img
                    v-if="customerForm.licensePhoto"
                    :src="customerForm.licensePhoto"
                    alt="License"
                  />

                  <q-icon
                    v-else
                    name="credit_card"
                    size="42px"
                  />

                </div>


                <div class="document-content">

                  <div class="document-title">
                    Driving License Photo
                  </div>

                  <div class="document-subtitle">
                    Upload driving license image
                  </div>


                  <q-file
                    v-model="licenseFile"
                    outlined
                    dense
                    accept="image/*"
                    label="Choose License Photo"
                    @update:model-value="handleLicenseUpload"
                  >

                    <template #prepend>
                      <q-icon name="upload_file" />
                    </template>

                  </q-file>

                </div>

              </div>

            </div>


            <!-- =================================================
                 STATUS
            ================================================== -->

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


            <!-- =================================================
                 ADDRESS
            ================================================== -->

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


        <!-- =====================================================
             FORM ACTIONS
        ====================================================== -->

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


    <!-- =====================================================
         VIEW CUSTOMER
    ====================================================== -->

    <q-dialog v-model="viewDialog">

      <q-card class="view-customer-card">

        <!-- Header -->
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

          <div class="profile-section">

            <q-avatar
              size="110px"
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


            <div class="profile-name">
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


            <!-- Agency -->
            <q-item>

              <q-item-section avatar>
                <q-icon name="business_center" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Agency Type
                </q-item-label>

                <q-item-label>
                  {{ selectedCustomer.agencyType || '-' }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- Insurance -->
            <q-item>

              <q-item-section avatar>
                <q-icon name="security" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Insurance
                </q-item-label>

                <q-item-label>
                  {{ selectedCustomer.insurance || '-' }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- Insurance Number -->
            <q-item
              v-if="selectedCustomer.insurance === 'Yes'"
            >

              <q-item-section avatar>
                <q-icon name="confirmation_number" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Insurance Number
                </q-item-label>

                <q-item-label>
                  {{ selectedCustomer.insuranceNumber || '-' }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- Insurance Expiry -->
            <q-item
              v-if="selectedCustomer.insurance === 'Yes'"
            >

              <q-item-section avatar>
                <q-icon name="event" />
              </q-item-section>

              <q-item-section>

                <q-item-label caption>
                  Insurance Expiry
                </q-item-label>

                <q-item-label>
                  {{ formatDate(selectedCustomer.insuranceExpiry) }}
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
                  Bookings
                </q-item-label>

                <q-item-label>
                  {{ selectedCustomer.bookings }}
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
                  {{ selectedCustomer.address || '-' }}
                </q-item-label>

              </q-item-section>

            </q-item>


            <!-- License -->
            <q-item
              v-if="selectedCustomer.licensePhoto"
            >

              <q-item-section>

                <q-item-label caption>
                  Driving License
                </q-item-label>

                <q-img
                  :src="selectedCustomer.licensePhoto"
                  class="license-view-image"
                  fit="contain"
                />

              </q-item-section>

            </q-item>

          </q-list>

        </q-card-section>

      </q-card>

    </q-dialog>


    <!-- =====================================================
         DELETE DIALOG
    ====================================================== -->

    <q-dialog v-model="deleteDialog">

      <q-card class="delete-card">

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


const agencyTypeOptions = [

  'Owner',
  'Agent'

]


const insuranceOptions = [

  'Yes',
  'No'

]


/* =========================================================
   STATE / CITY
========================================================= */

const stateCities = {

  Bihar: [
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

  Delhi: [
    'New Delhi',
    'Delhi'
  ],

  Jharkhand: [
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

  Rajasthan: [
    'Jaipur',
    'Jodhpur',
    'Udaipur',
    'Kota'
  ],

  Maharashtra: [
    'Mumbai',
    'Pune',
    'Nagpur',
    'Nashik'
  ]

}


const stateOptions =
  Object.keys(stateCities)


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
    align: 'left'
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
    name: 'agencyType',
    label: 'AGENCY',
    field: 'agencyType',
    align: 'center'
  },

  {
    name: 'insurance',
    label: 'INSURANCE',
    field: 'insurance',
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
    align: 'center'
  },

  {
    name: 'bookings',
    label: 'BOOKINGS',
    field: 'bookings',
    align: 'center'
  },

  {
    name: 'createdAt',
    label: 'REGISTERED',
    field: 'createdAt',
    align: 'left'
  },

  {
    name: 'actions',
    label: 'ACTIONS',
    field: 'actions',
    align: 'right'
  }

]


/* =========================================================
   DEMO CUSTOMER DATA
========================================================= */

const customers = ref([

  {
    id: 1,

    name: 'Rahul Sharma',

    email: 'rahul@example.com',

    mobile: '9876543210',

    aadhaar: '123456789012',

    gender: 'Male',

    insurance: 'Yes',

    insuranceExpiry: '2027-08-15',

    insuranceNumber: 'INS123456789',

    agencyType: 'Owner',

    state: 'Delhi',

    city: 'New Delhi',

    licensePhoto: '',

    image: '',

    status: 'Active',

    bookings: 12,

    createdAt: '2026-08-01',

    address: 'New Delhi, India'

  },


  {
    id: 2,

    name: 'Priya Singh',

    email: 'priya@example.com',

    mobile: '9876543211',

    aadhaar: '234567890123',

    gender: 'Female',

    insurance: 'Yes',

    insuranceExpiry: '2027-06-20',

    insuranceNumber: 'INS987654321',

    agencyType: 'Agent',

    state: 'Uttar Pradesh',

    city: 'Noida',

    licensePhoto: '',

    image: '',

    status: 'Active',

    bookings: 8,

    createdAt: '2026-07-22',

    address: 'Noida, Uttar Pradesh'

  },


  {
    id: 3,

    name: 'Amit Kumar',

    email: 'amit@example.com',

    mobile: '9876543212',

    aadhaar: '345678901234',

    gender: 'Male',

    insurance: 'No',

    insuranceExpiry: '',

    insuranceNumber: '',

    agencyType: 'Owner',

    state: 'Bihar',

    city: 'Buxar',

    licensePhoto: '',

    image: '',

    status: 'Inactive',

    bookings: 3,

    createdAt: '2026-07-10',

    address: 'Buxar, Bihar'

  },


  {
    id: 4,

    name: 'Neha Verma',

    email: 'neha@example.com',

    mobile: '9876543213',

    aadhaar: '456789012345',

    gender: 'Female',

    insurance: 'Yes',

    insuranceExpiry: '2027-12-10',

    insuranceNumber: 'INS456789123',

    agencyType: 'Agent',

    state: 'Uttar Pradesh',

    city: 'Lucknow',

    licensePhoto: '',

    image: '',

    status: 'Active',

    bookings: 15,

    createdAt: '2026-06-28',

    address: 'Lucknow, Uttar Pradesh'

  }

])


/* =========================================================
   FILTER
========================================================= */

const filteredCustomers = computed(() => {

  let data = [...customers.value]


  /* STATUS */

  if (statusFilter.value !== 'all') {

    data = data.filter(
      customer =>
        customer.status ===
        statusFilter.value
    )

  }


  /* SEARCH */

  if (search.value) {

    const keyword =
      search.value
        .toLowerCase()
        .trim()


    data = data.filter(customer => {

      return (

        customer.name
          ?.toLowerCase()
          .includes(keyword)

        ||

        customer.email
          ?.toLowerCase()
          .includes(keyword)

        ||

        customer.mobile
          ?.includes(keyword)

        ||

        customer.aadhaar
          ?.includes(keyword)

        ||

        customer.city
          ?.toLowerCase()
          .includes(keyword)

        ||

        customer.state
          ?.toLowerCase()
          .includes(keyword)

        ||

        customer.agencyType
          ?.toLowerCase()
          .includes(keyword)

      )

    })

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

  return 4

})


/* =========================================================
   DIALOGS
========================================================= */

const customerDialog = ref(false)

const viewDialog = ref(false)

const deleteDialog = ref(false)


/* =========================================================
   SELECTED
========================================================= */

const selectedCustomer = ref(null)

const editingCustomer = ref(false)


/* =========================================================
   FILES
========================================================= */

const photoFile = ref(null)

const licenseFile = ref(null)


/* =========================================================
   EMPTY FORM
========================================================= */

const createEmptyForm = () => ({

  id: null,

  name: '',

  email: '',

  mobile: '',

  aadhaar: '',

  gender: '',

  insurance: 'No',

  insuranceExpiry: '',

  insuranceNumber: '',

  state: '',

  city: '',

  licensePhoto: '',

  agencyType: '',

  status: 'Active',

  address: '',

  image: ''

})


const customerForm = ref(
  createEmptyForm()
)


/* =========================================================
   ADD
========================================================= */

const openAddDialog = () => {

  editingCustomer.value = false

  customerForm.value =
    createEmptyForm()

  photoFile.value = null

  licenseFile.value = null

  customerDialog.value = true

}


/* =========================================================
   EDIT
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

    insurance:
      customer.insurance || 'No',

    insuranceExpiry:
      customer.insuranceExpiry || '',

    insuranceNumber:
      customer.insuranceNumber || '',

    state: customer.state || '',

    city: customer.city || '',

    licensePhoto:
      customer.licensePhoto || '',

    agencyType:
      customer.agencyType || '',

    status:
      customer.status || 'Active',

    address:
      customer.address || '',

    image:
      customer.image || ''

  }


  photoFile.value = null

  licenseFile.value = null

  customerDialog.value = true

}


/* =========================================================
   STATE CHANGE
========================================================= */

const onStateChange = () => {

  customerForm.value.city = ''

}


/* =========================================================
   CUSTOMER PHOTO UPLOAD
========================================================= */

const handlePhotoUpload = file => {

  if (!file) {
    return
  }


  const reader =
    new FileReader()


  reader.onload = event => {

    customerForm.value.image =
      event.target.result

  }


  reader.readAsDataURL(file)

}


/* =========================================================
   LICENSE PHOTO UPLOAD
========================================================= */

const handleLicenseUpload = file => {

  if (!file) {
    return
  }


  const reader =
    new FileReader()


  reader.onload = event => {

    customerForm.value.licensePhoto =
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
        'Enter valid email address'

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


  /* AGENCY */

  if (!customerForm.value.agencyType) {

    Notify.create({

      type: 'negative',

      message:
        'Please select agency type'

    })

    return

  }


  /* INSURANCE */

  if (!customerForm.value.insurance) {

    Notify.create({

      type: 'negative',

      message:
        'Please select insurance'

    })

    return

  }


  /* INSURANCE DETAILS */

  if (
    customerForm.value.insurance === 'Yes'
  ) {

    if (
      !customerForm.value.insuranceNumber
    ) {

      Notify.create({

        type: 'negative',

        message:
          'Insurance number is required'

      })

      return

    }


    if (
      !customerForm.value.insuranceExpiry
    ) {

      Notify.create({

        type: 'negative',

        message:
          'Insurance expiry date is required'

      })

      return

    }

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


  /* =====================================================
     UPDATE
  ====================================================== */

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


  /* =====================================================
     ADD
  ====================================================== */

  else {

    customers.value.unshift({

      ...customerForm.value,

      id: Date.now(),

      bookings: 0,

      createdAt:
        new Date()
          .toISOString()
          .split('T')[0]

    })


    Notify.create({

      type: 'positive',

      message:
        'Customer added successfully'

    })

  }


  customerDialog.value = false

}


/* =========================================================
   VIEW
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
   DELETE
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

    .map(
      word =>
        word.charAt(0)
    )

    .join('')

    .substring(0, 2)

    .toUpperCase()

}


/* =========================================================
   DATE
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
     * Connect API here.
     *
     * Example:
     *
     * const response =
     *   await axios.get(
     *     '/customers'
     *   )
     *
     * customers.value =
     *   response.data.data
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
   MOUNT
========================================================= */

onMounted(() => {

  fetchCustomers()

})

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.customers-page {

  padding: 24px;

  background: #f5f7fb;

  min-height:
    calc(100vh - 64px);

}


/* =====================================================
   HEADER
===================================================== */

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


/* =====================================================
   STAT CARD
===================================================== */

.stat-card {

  background: #fff;

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


/* =====================================================
   CUSTOMER CARD
===================================================== */

.customer-card {

  background: #fff;

  border-radius: 12px;

  box-shadow:
    0 2px 10px
    rgba(0, 0, 0, 0.04);

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

  align-items: center;

  gap: 10px;

}


.search-input {

  width: 240px;

}


.status-filter {

  width: 140px;

}


/* =====================================================
   CUSTOMER
===================================================== */

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

}


.location-text {

  font-size: 13px;

  font-weight: 500;

}


.location-state {

  font-size: 11px;

  color: #9ca3af;

  margin-top: 2px;

}


/* =====================================================
   FORM
===================================================== */

.customer-form-card {

  width: 760px;

  max-width: 95vw;

  border-radius: 14px;

}


/* =====================================================
   UPLOAD
===================================================== */

.upload-section {

  display: flex;

  align-items: center;

  gap: 20px;

  padding: 16px;

  background: #f8fafc;

  border-radius: 12px;

}


.image-preview {

  overflow: hidden;

  flex-shrink: 0;

}


.image-preview img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


.upload-info {

  flex: 1;

}


.upload-title {

  font-size: 15px;

  font-weight: 600;

}


.upload-description {

  font-size: 12px;

  color: #9ca3af;

  margin: 4px 0 10px;

}


/* =====================================================
   LICENSE
===================================================== */

.document-upload {

  display: flex;

  align-items: center;

  gap: 18px;

  padding: 16px;

  border: 1px dashed #d1d5db;

  border-radius: 12px;

  background: #fafafa;

}


.document-preview {

  width: 110px;

  height: 75px;

  border-radius: 8px;

  overflow: hidden;

  background: #eef2ff;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

}


.document-preview img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


.document-content {

  flex: 1;

}


.document-title {

  font-size: 15px;

  font-weight: 600;

}


.document-subtitle {

  font-size: 12px;

  color: #9ca3af;

  margin: 3px 0 10px;

}


/* =====================================================
   VIEW
===================================================== */

.view-customer-card {

  width: 540px;

  max-width: 95vw;

  border-radius: 14px;

}


.profile-section {

  display: flex;

  flex-direction: column;

  align-items: center;

  margin-bottom: 20px;

}


.profile-name {

  font-size: 20px;

  font-weight: 700;

  margin-top: 10px;

  margin-bottom: 5px;

}


.license-view-image {

  width: 100%;

  max-height: 250px;

  margin-top: 10px;

  border-radius: 8px;

}


/* =====================================================
   DELETE
===================================================== */

.delete-card {

  width: 400px;

  max-width: 95vw;

  border-radius: 12px;

}


/* =====================================================
   RESPONSIVE
===================================================== */

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

}


@media (max-width: 600px) {

  .page-header {

    flex-direction: column;

    align-items: flex-start;

    gap: 15px;

  }


  .table-actions {

    flex-direction: column;

    align-items: stretch;

  }


  .search-input,

  .status-filter {

    width: 100%;

  }


  .upload-section,

  .document-upload {

    flex-direction: column;

    align-items: flex-start;

  }

}

</style>
```
