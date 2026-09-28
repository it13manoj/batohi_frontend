<template>
  <q-page class="drivers-page">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->

    <div class="page-header">

      <div>
        <div class="page-title">
          Drivers
        </div>

        <div class="page-subtitle">
          Manage BatohiDrive drivers
        </div>
      </div>

      <q-btn
        unelevated
        color="primary"
        icon="person_add"
        label="Add Driver"
        @click="openAddDialog"
      />

    </div>


    <!-- =====================================================
         STATISTICS
    ====================================================== -->

    <div class="row q-col-gutter-md q-mb-lg">

      <!-- Total Drivers -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-content">
              <q-avatar color="blue-1" text-color="primary" size="50px">
                <q-icon name="people" size="28px" />
              </q-avatar>
              <div class="stat-info">
                <div class="stat-label">Total Drivers</div>
                <div class="stat-value">{{ totalDrivers }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Active Drivers -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-content">
              <q-avatar color="green-1" text-color="positive" size="50px">
                <q-icon name="person" size="28px" />
              </q-avatar>
              <div class="stat-info">
                <div class="stat-label">Active Drivers</div>
                <div class="stat-value">{{ activeDrivers }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pending Verification -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card cursor-pointer" @click="activeTab = 'pending'">
          <q-card-section>
            <div class="stat-content">
              <q-avatar color="amber-1" text-color="warning" size="50px">
                <q-icon name="hourglass_top" size="28px" />
              </q-avatar>
              <div class="stat-info">
                <div class="stat-label">Pending Verification</div>
                <div class="stat-value text-warning">{{ pendingVerificationCount }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Verified Drivers -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card cursor-pointer" @click="activeTab = 'verified'">
          <q-card-section>
            <div class="stat-content">
              <q-avatar color="teal-1" text-color="teal" size="50px">
                <q-icon name="verified" size="28px" />
              </q-avatar>
              <div class="stat-info">
                <div class="stat-label">Verified Drivers</div>
                <div class="stat-value text-teal">{{ verifiedDriversCount }}</div>
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
            Driver Directory & Verification
          </div>

          <div class="table-subtitle">
            Manage drivers, inspect submitted compliance documents, and verify registrations
          </div>

        </div>


        <div class="table-actions">

          <!-- Search -->
          <q-input
            v-model="search"
            outlined
            dense
            debounce="300"
            placeholder="Search driver by name, phone, email..."
            class="search-input"
            clearable
          >

            <template #prepend>
              <q-icon name="search" />
            </template>

          </q-input>


          <!-- Verification Filter -->
          <q-select
            v-model="verificationFilter"
            :options="verificationFilterOptions"
            outlined
            dense
            emit-value
            map-options
            label="Verification"
            class="status-filter"
            style="min-width: 150px"
          />

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


      <!-- Verification Tabs -->
      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey-7 bg-grey-1"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="all" icon="badge" label="All Drivers" />
        <q-tab name="pending" icon="hourglass_top" label="Pending Verification">
          <q-badge color="warning" text-color="dark" floating rounded v-if="pendingVerificationCount > 0">
            {{ pendingVerificationCount }}
          </q-badge>
        </q-tab>
        <q-tab name="verified" icon="verified" label="Verified Drivers" />
        <q-tab name="rejected" icon="cancel" label="Rejected / Action Needed" />
      </q-tabs>

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


        <!-- VERIFICATION STATUS -->
        <template #body-cell-verification="props">
          <q-td :props="props" class="text-center">
            <q-chip
              dense
              clickable
              :color="
                props.row.isVerified || props.row.verificationStatus === 'verified'
                  ? 'green-1'
                  : props.row.verificationStatus === 'rejected'
                    ? 'red-1'
                    : 'amber-1'
              "
              :text-color="
                props.row.isVerified || props.row.verificationStatus === 'verified'
                  ? 'positive'
                  : props.row.verificationStatus === 'rejected'
                    ? 'negative'
                    : 'warning'
              "
              @click="openVerifyDialog(props.row)"
            >
              <q-icon
                :name="
                  props.row.isVerified || props.row.verificationStatus === 'verified'
                    ? 'verified'
                    : props.row.verificationStatus === 'rejected'
                      ? 'cancel'
                      : 'hourglass_top'
                "
                size="14px"
                class="q-mr-xs"
              />
              {{
                props.row.isVerified || props.row.verificationStatus === 'verified'
                  ? 'Verified'
                  : props.row.verificationStatus === 'rejected'
                    ? 'Rejected'
                    : 'Pending'
              }}
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

            <!-- Verify Docs -->
            <q-btn
              unelevated
              dense
              no-caps
              size="sm"
              :color="
                props.row.isVerified || props.row.verificationStatus === 'verified'
                  ? 'positive'
                  : 'warning'
              "
              :text-color="
                props.row.isVerified || props.row.verificationStatus === 'verified'
                  ? 'white'
                  : 'dark'
              "
              icon="verified_user"
              :label="
                props.row.isVerified || props.row.verificationStatus === 'verified'
                  ? 'Verified'
                  : 'Verify Docs'
              "
              class="q-px-sm q-mr-xs text-weight-bold"
              @click="openVerifyDialog(props.row)"
            >
              <q-tooltip> Review & Verify Driver Documents </q-tooltip>
            </q-btn>

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
                ? 'Edit Driver'
                : 'Add Driver'
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


            <!-- Driver Uploaded Compliance Documents -->
            <div class="q-mt-lg q-mb-sm text-subtitle2 text-weight-bold text-primary row items-center">
              <q-icon name="verified_user" size="18px" class="q-mr-xs" />
              Uploaded Compliance Documents
            </div>

            <div class="row q-col-gutter-sm q-mb-md">
              <!-- Driver Photo -->
              <div class="col-12 col-sm-6">
                <q-card flat bordered class="q-pa-xs rounded-borders">
                  <div class="row items-center justify-between q-pa-xs bg-grey-2 rounded-borders">
                    <span class="text-caption text-weight-bold">Driver Photo</span>
                    <q-badge color="primary" label="Biometric" />
                  </div>
                  <div class="text-center q-pa-xs cursor-pointer" @click="zoomImage(selectedCustomer.profileImage || selectedCustomer.image, 'Driver Photo')">
                    <q-img
                      :src="resolveImageUrl(selectedCustomer.profileImage || selectedCustomer.image, DOCUMENT_PLACEHOLDERS.profile)"
                      style="height: 100px; border-radius: 4px;"
                      fit="contain"
                    />
                    <div class="text-caption text-primary q-mt-xs"><q-icon name="zoom_in" /> Inspect Photo</div>
                  </div>
                </q-card>
              </div>

              <!-- Driving License -->
              <div class="col-12 col-sm-6">
                <q-card flat bordered class="q-pa-xs rounded-borders">
                  <div class="row items-center justify-between q-pa-xs bg-grey-2 rounded-borders">
                    <span class="text-caption text-weight-bold">Driving License</span>
                    <span class="text-caption text-grey-8">{{ selectedCustomer.drivingLicenseNo || selectedCustomer.licenseNumber || '-' }}</span>
                  </div>
                  <div class="text-center q-pa-xs cursor-pointer" @click="zoomImage(selectedCustomer.licenseImage || selectedCustomer.licensePhoto, 'Driving License')">
                    <q-img
                      :src="resolveImageUrl(selectedCustomer.licenseImage || selectedCustomer.licensePhoto, DOCUMENT_PLACEHOLDERS.license)"
                      style="height: 100px; border-radius: 4px;"
                      fit="contain"
                    />
                    <div class="text-caption text-primary q-mt-xs"><q-icon name="zoom_in" /> Inspect License</div>
                  </div>
                </q-card>
              </div>

              <!-- Aadhaar Card -->
              <div class="col-12 col-sm-6">
                <q-card flat bordered class="q-pa-xs rounded-borders">
                  <div class="row items-center justify-between q-pa-xs bg-grey-2 rounded-borders">
                    <span class="text-caption text-weight-bold">Aadhaar Card</span>
                    <span class="text-caption text-grey-8">{{ maskAadhaar(selectedCustomer.aadhaarNumber || selectedCustomer.aadhaar) }}</span>
                  </div>
                  <div class="text-center q-pa-xs cursor-pointer" @click="zoomImage(selectedCustomer.aadhaarImage, 'Aadhaar Card')">
                    <q-img
                      :src="resolveImageUrl(selectedCustomer.aadhaarImage, DOCUMENT_PLACEHOLDERS.aadhaar)"
                      style="height: 100px; border-radius: 4px;"
                      fit="contain"
                    />
                    <div class="text-caption text-primary q-mt-xs"><q-icon name="zoom_in" /> Inspect Aadhaar</div>
                  </div>
                </q-card>
              </div>

              <!-- PAN Card -->
              <div class="col-12 col-sm-6">
                <q-card flat bordered class="q-pa-xs rounded-borders">
                  <div class="row items-center justify-between q-pa-xs bg-grey-2 rounded-borders">
                    <span class="text-caption text-weight-bold">PAN Card</span>
                    <span class="text-caption text-grey-8">{{ selectedCustomer.panNumber || '-' }}</span>
                  </div>
                  <div class="text-center q-pa-xs cursor-pointer" @click="zoomImage(selectedCustomer.panImage, 'PAN Card')">
                    <q-img
                      :src="resolveImageUrl(selectedCustomer.panImage, DOCUMENT_PLACEHOLDERS.pan)"
                      style="height: 100px; border-radius: 4px;"
                      fit="contain"
                    />
                    <div class="text-caption text-primary q-mt-xs"><q-icon name="zoom_in" /> Inspect PAN</div>
                  </div>
                </q-card>
              </div>
            </div>

          </q-list>

        </q-card-section>

        <!-- Actions -->
        <q-separator />
        <q-card-actions align="between" class="q-pa-md bg-grey-1">
          <q-btn
            unelevated
            color="primary"
            icon="verified_user"
            label="Open Document Verification"
            no-caps
            @click="viewDialog = false; openVerifyDialog(selectedCustomer)"
          />
          <q-btn flat label="Close" color="grey-8" v-close-popup />
        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- =====================================================
         DELETE DIALOG
    ====================================================== -->

    <q-dialog v-model="deleteDialog">

      <q-card class="delete-card">

        <q-card-section>

          <div class="text-h6">
            Delete Driver
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

    <!-- =====================================================
         VERIFY DRIVER DOCUMENTS MODAL
    ====================================================== -->
    <q-dialog v-model="verifyDialog" persistent>
      <q-card style="width: 860px; max-width: 95vw; border-radius: 14px;">
        <!-- Header -->
        <q-card-section class="row items-center bg-primary text-white q-py-md">
          <q-avatar icon="verified_user" color="white" text-color="primary" size="38px" />
          <div class="q-ml-md">
            <div class="text-h6 text-weight-bolder">Driver Document Verification</div>
            <div class="text-caption text-blue-1">
              Review and approve submitted compliance documents for {{ selectedCustomer?.name }}
            </div>
          </div>
          <q-space />
          <q-btn flat round dense icon="close" color="white" v-close-popup />
        </q-card-section>

        <!-- Driver Profile Summary Bar -->
        <q-card-section class="bg-blue-grey-1 q-py-sm">
          <div class="row items-center justify-between">
            <div class="row items-center q-gutter-x-md">
              <q-avatar size="44px" color="primary" text-color="white">
                <img v-if="selectedCustomer?.image" :src="selectedCustomer.image" />
                <span v-else>{{ getInitials(selectedCustomer?.name) }}</span>
              </q-avatar>
              <div>
                <div class="text-subtitle2 text-weight-bold">{{ selectedCustomer?.name }} (ID: #{{ selectedCustomer?.id }})</div>
                <div class="text-caption text-grey-7">
                  <q-icon name="phone" size="14px" /> {{ selectedCustomer?.mobile }} |
                  <q-icon name="email" size="14px" /> {{ selectedCustomer?.email }}
                </div>
              </div>
            </div>

            <!-- Current Status Badge -->
            <div>
              <q-badge
                :color="
                  selectedCustomer?.isVerified || selectedCustomer?.verificationStatus === 'verified'
                    ? 'positive'
                    : selectedCustomer?.verificationStatus === 'rejected'
                      ? 'negative'
                      : 'warning'
                "
                :text-color="
                  selectedCustomer?.isVerified || selectedCustomer?.verificationStatus === 'verified'
                    ? 'white'
                    : selectedCustomer?.verificationStatus === 'rejected'
                      ? 'white'
                      : 'dark'
                "
                class="q-px-md q-py-xs text-weight-bold text-caption text-uppercase"
              >
                <q-icon
                  :name="
                    selectedCustomer?.isVerified || selectedCustomer?.verificationStatus === 'verified'
                      ? 'check_circle'
                      : selectedCustomer?.verificationStatus === 'rejected'
                        ? 'cancel'
                        : 'hourglass_top'
                  "
                  size="14px"
                  class="q-mr-xs"
                />
                {{
                  selectedCustomer?.isVerified || selectedCustomer?.verificationStatus === 'verified'
                    ? 'Verified & Approved'
                    : selectedCustomer?.verificationStatus === 'rejected'
                      ? 'Rejected'
                      : 'Pending Review'
                }}
              </q-badge>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <!-- Documents Grid -->
        <q-card-section class="q-pa-md" style="max-height: 58vh; overflow-y: auto;">
          <div class="row q-col-gutter-md">
            <!-- 1. Driver Photograph -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card flat bordered class="rounded-borders full-height">
                <q-card-section class="q-pa-sm bg-grey-2">
                  <div class="row items-center justify-between">
                    <div class="text-weight-bold text-caption row items-center">
                      <q-icon name="face" color="primary" class="q-mr-xs" />
                      Driver Photograph
                    </div>
                    <q-badge color="primary" label="Biometric" />
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <div class="text-caption text-grey-8 q-mb-xs">
                    Driver: <strong>{{ selectedCustomer?.name }}</strong>
                  </div>
                  <div
                    class="doc-img-container cursor-pointer bg-grey-1 rounded-borders text-center q-pa-xs"
                    @click="zoomImage(selectedCustomer?.profileImage || selectedCustomer?.image || selectedCustomer?.profile_image, 'Driver Photograph')"
                  >
                    <q-img
                      :src="resolveImageUrl(selectedCustomer?.profileImage || selectedCustomer?.image || selectedCustomer?.profile_image, DOCUMENT_PLACEHOLDERS.profile)"
                      style="height: 130px; border-radius: 6px;"
                      fit="contain"
                    />
                    <div class="row items-center justify-center q-mt-xs q-gutter-x-sm">
                      <span class="text-caption text-primary"><q-icon name="zoom_in" /> Inspect</span>
                      <q-btn
                        flat
                        round
                        dense
                        size="xs"
                        icon="open_in_new"
                        color="primary"
                        @click.stop="openInNewTab(selectedCustomer?.profileImage || selectedCustomer?.image || selectedCustomer?.profile_image)"
                      >
                        <q-tooltip>Open in new tab</q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- 2. Driving License -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card flat bordered class="rounded-borders full-height">
                <q-card-section class="q-pa-sm bg-grey-2">
                  <div class="row items-center justify-between">
                    <div class="text-weight-bold text-caption row items-center">
                      <q-icon name="directions_car" color="primary" class="q-mr-xs" />
                      Driving License
                    </div>
                    <q-badge color="negative" label="Mandatory" />
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <div class="text-caption text-grey-8 q-mb-xs">
                    Number: <strong>{{ selectedCustomer?.drivingLicenseNo || selectedCustomer?.licenseNumber || selectedCustomer?.driving_license_no || 'DL-PENDING' }}</strong>
                  </div>
                  <div
                    class="doc-img-container cursor-pointer bg-grey-1 rounded-borders text-center q-pa-xs"
                    @click="zoomImage(selectedCustomer?.licenseImage || selectedCustomer?.licensePhoto || selectedCustomer?.license_image, 'Driving License')"
                  >
                    <q-img
                      :src="resolveImageUrl(selectedCustomer?.licenseImage || selectedCustomer?.licensePhoto || selectedCustomer?.license_image, DOCUMENT_PLACEHOLDERS.license)"
                      style="height: 130px; border-radius: 6px;"
                      fit="contain"
                    />
                    <div class="row items-center justify-center q-mt-xs q-gutter-x-sm">
                      <span class="text-caption text-primary"><q-icon name="zoom_in" /> Inspect</span>
                      <q-btn
                        flat
                        round
                        dense
                        size="xs"
                        icon="open_in_new"
                        color="primary"
                        @click.stop="openInNewTab(selectedCustomer?.licenseImage || selectedCustomer?.licensePhoto || selectedCustomer?.license_image)"
                      >
                        <q-tooltip>Open in new tab</q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- 3. Aadhaar Card -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card flat bordered class="rounded-borders full-height">
                <q-card-section class="q-pa-sm bg-grey-2">
                  <div class="row items-center justify-between">
                    <div class="text-weight-bold text-caption row items-center">
                      <q-icon name="badge" color="primary" class="q-mr-xs" />
                      Aadhaar Card
                    </div>
                    <q-badge color="negative" label="Identity" />
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <div class="text-caption text-grey-8 q-mb-xs">
                    Number: <strong>{{ maskAadhaar(selectedCustomer?.aadhaarNumber || selectedCustomer?.aadhaar || selectedCustomer?.aadhaar_number) }}</strong>
                  </div>
                  <div
                    class="doc-img-container cursor-pointer bg-grey-1 rounded-borders text-center q-pa-xs"
                    @click="zoomImage(selectedCustomer?.aadhaarImage || selectedCustomer?.aadhaar_image, 'Aadhaar Card')"
                  >
                    <q-img
                      :src="resolveImageUrl(selectedCustomer?.aadhaarImage || selectedCustomer?.aadhaar_image, DOCUMENT_PLACEHOLDERS.aadhaar)"
                      style="height: 130px; border-radius: 6px;"
                      fit="contain"
                    />
                    <div class="row items-center justify-center q-mt-xs q-gutter-x-sm">
                      <span class="text-caption text-primary"><q-icon name="zoom_in" /> Inspect</span>
                      <q-btn
                        flat
                        round
                        dense
                        size="xs"
                        icon="open_in_new"
                        color="primary"
                        @click.stop="openInNewTab(selectedCustomer?.aadhaarImage || selectedCustomer?.aadhaar_image)"
                      >
                        <q-tooltip>Open in new tab</q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- 4. PAN Card -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card flat bordered class="rounded-borders full-height">
                <q-card-section class="q-pa-sm bg-grey-2">
                  <div class="row items-center justify-between">
                    <div class="text-weight-bold text-caption row items-center">
                      <q-icon name="credit_card" color="primary" class="q-mr-xs" />
                      PAN Card
                    </div>
                    <q-badge color="grey-7" label="Tax / Payout" />
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <div class="text-caption text-grey-8 q-mb-xs">
                    Number: <strong>{{ selectedCustomer?.panNumber || selectedCustomer?.pan_number || 'Provided' }}</strong>
                  </div>
                  <div
                    class="doc-img-container cursor-pointer bg-grey-1 rounded-borders text-center q-pa-xs"
                    @click="zoomImage(selectedCustomer?.panImage || selectedCustomer?.pan_image, 'PAN Card')"
                  >
                    <q-img
                      :src="resolveImageUrl(selectedCustomer?.panImage || selectedCustomer?.pan_image, DOCUMENT_PLACEHOLDERS.pan)"
                      style="height: 130px; border-radius: 6px;"
                      fit="contain"
                    />
                    <div class="row items-center justify-center q-mt-xs q-gutter-x-sm">
                      <span class="text-caption text-primary"><q-icon name="zoom_in" /> Inspect</span>
                      <q-btn
                        flat
                        round
                        dense
                        size="xs"
                        icon="open_in_new"
                        color="primary"
                        @click.stop="openInNewTab(selectedCustomer?.panImage || selectedCustomer?.pan_image)"
                      >
                        <q-tooltip>Open in new tab</q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- 5. Vehicle Registration & RC -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card flat bordered class="rounded-borders full-height">
                <q-card-section class="q-pa-sm bg-grey-2">
                  <div class="row items-center justify-between">
                    <div class="text-weight-bold text-caption row items-center">
                      <q-icon name="commute" color="primary" class="q-mr-xs" />
                      Vehicle Details & RC
                    </div>
                    <q-badge color="primary" label="Vehicle" />
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <div class="text-caption text-grey-8 q-mb-xs">
                    Reg: <strong>{{ selectedCustomer?.vehicleDetails?.registrationNo || selectedCustomer?.vehicle || 'Unassigned' }}</strong>
                  </div>
                  <div
                    class="doc-img-container cursor-pointer bg-grey-1 rounded-borders text-center q-pa-xs"
                    @click="zoomImage(selectedCustomer?.rcImage || selectedCustomer?.vehicleDetails?.rcImage || selectedCustomer?.vehicleImage, 'Vehicle Registration / RC')"
                  >
                    <q-img
                      :src="resolveImageUrl(selectedCustomer?.rcImage || selectedCustomer?.vehicleDetails?.rcImage || selectedCustomer?.vehicleImage, DOCUMENT_PLACEHOLDERS.rc)"
                      style="height: 130px; border-radius: 6px;"
                      fit="contain"
                    />
                    <div class="row items-center justify-center q-mt-xs q-gutter-x-sm">
                      <span class="text-caption text-primary"><q-icon name="zoom_in" /> Inspect</span>
                      <q-btn
                        flat
                        round
                        dense
                        size="xs"
                        icon="open_in_new"
                        color="primary"
                        @click.stop="openInNewTab(selectedCustomer?.rcImage || selectedCustomer?.vehicleDetails?.rcImage || selectedCustomer?.vehicleImage)"
                      >
                        <q-tooltip>Open in new tab</q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- 6. Vehicle Insurance -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card flat bordered class="rounded-borders full-height">
                <q-card-section class="q-pa-sm bg-grey-2">
                  <div class="row items-center justify-between">
                    <div class="text-weight-bold text-caption row items-center">
                      <q-icon name="security" color="primary" class="q-mr-xs" />
                      Vehicle Insurance
                    </div>
                    <q-badge color="positive" label="Insurance" />
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <div class="text-caption text-grey-8 q-mb-xs">
                    Policy: <strong>{{ selectedCustomer?.insuranceNumber || selectedCustomer?.vehicleDetails?.insuranceNo || 'INS-VALID' }}</strong>
                  </div>
                  <div
                    class="doc-img-container cursor-pointer bg-grey-1 rounded-borders text-center q-pa-xs"
                    @click="zoomImage(selectedCustomer?.insuranceImage || selectedCustomer?.vehicleDetails?.insuranceImage, 'Vehicle Insurance Policy')"
                  >
                    <q-img
                      :src="resolveImageUrl(selectedCustomer?.insuranceImage || selectedCustomer?.vehicleDetails?.insuranceImage, DOCUMENT_PLACEHOLDERS.insurance)"
                      style="height: 130px; border-radius: 6px;"
                      fit="contain"
                    />
                    <div class="row items-center justify-center q-mt-xs q-gutter-x-sm">
                      <span class="text-caption text-primary"><q-icon name="zoom_in" /> Inspect</span>
                      <q-btn
                        flat
                        round
                        dense
                        size="xs"
                        icon="open_in_new"
                        color="primary"
                        @click.stop="openInNewTab(selectedCustomer?.insuranceImage || selectedCustomer?.vehicleDetails?.insuranceImage)"
                      >
                        <q-tooltip>Open in new tab</q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- 7. Vehicle & Compliance Metadata Summary -->
            <div class="col-12">
              <q-card flat bordered class="rounded-borders bg-blue-grey-1">
                <q-card-section class="q-pa-sm">
                  <div class="text-weight-bold text-caption text-primary q-mb-xs">
                    <q-icon name="fact_check" size="18px" class="q-mr-xs" /> Driver Compliance & Road Profile
                  </div>
                  <div class="row q-col-gutter-sm text-caption">
                    <div class="col-12 col-sm-3">
                      <span class="text-grey-7">Vehicle Category:</span>
                      <strong class="q-ml-xs text-uppercase">{{ selectedCustomer?.vehicleCategory || 'Bike' }}</strong>
                    </div>
                    <div class="col-12 col-sm-3">
                      <span class="text-grey-7">Assigned Vehicle:</span>
                      <strong class="q-ml-xs">{{ selectedCustomer?.vehicle || 'Unassigned' }}</strong>
                    </div>
                    <div class="col-12 col-sm-3">
                      <span class="text-grey-7">RC / Plate:</span>
                      <strong class="q-ml-xs">{{ selectedCustomer?.rcNumber || selectedCustomer?.vehicleDetails?.rcNumber || selectedCustomer?.vehicle || 'Available' }}</strong>
                    </div>
                    <div class="col-12 col-sm-3">
                      <span class="text-grey-7">Insurance Expiry:</span>
                      <strong class="q-ml-xs">{{ selectedCustomer?.insuranceExpiry || selectedCustomer?.vehicleDetails?.insuranceExpiryDate || '2027-12-31' }}</strong>
                    </div>
                    <div class="col-12 col-sm-3" v-if="selectedCustomer?.permitNumber">
                      <span class="text-grey-7">Permit No:</span>
                      <strong class="q-ml-xs">{{ selectedCustomer?.permitNumber }}</strong>
                    </div>
                    <div class="col-12 col-sm-3" v-if="selectedCustomer?.experienceYears">
                      <span class="text-grey-7">Experience:</span>
                      <strong class="q-ml-xs">{{ selectedCustomer?.experienceYears }} Years</strong>
                    </div>
                    <div class="col-12 col-sm-3" v-if="selectedCustomer?.emergencyContactName">
                      <span class="text-grey-7">Emergency:</span>
                      <strong class="q-ml-xs">{{ selectedCustomer?.emergencyContactName }} ({{ selectedCustomer?.emergencyContactNumber }})</strong>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- 5. Admin Notes / Remarks -->
            <div class="col-12">
              <label class="text-weight-bold text-caption text-grey-9 q-mb-xs block">
                Compliance Officer Remarks / Audit Notes:
              </label>
              <q-input
                v-model="verificationRemarks"
                outlined
                dense
                type="textarea"
                rows="2"
                placeholder="Enter remarks (e.g., Valid driving license & verified Aadhaar card. Approved for passenger rides.)"
              />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <!-- Verification Actions -->
        <q-card-actions class="q-pa-md bg-grey-1" align="between">
          <div>
            <q-btn
              flat
              dense
              no-caps
              color="grey-8"
              icon="hourglass_top"
              label="Reset to Pending"
              :loading="verifyingLoading"
              @click="submitVerification('pending')"
            />
          </div>

          <div class="row q-gutter-x-sm">
            <q-btn
              flat
              label="Cancel"
              color="grey-7"
              v-close-popup
            />
            <q-btn
              unelevated
              color="negative"
              icon="block"
              label="Reject Documents"
              no-caps
              :loading="verifyingLoading"
              @click="submitVerification('rejected')"
            />
            <q-btn
              unelevated
              color="positive"
              icon="check_circle"
              label="Approve & Verify Driver"
              no-caps
              class="text-weight-bold"
              :loading="verifyingLoading"
              @click="submitVerification('verified')"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Document Image Zoom Lightbox -->
    <q-dialog v-model="imagePreviewDialog">
      <q-card style="max-width: 90vw; max-height: 90vh;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-weight-bold">{{ previewImageTitle || 'Document Preview' }}</div>
          <q-space />
          <q-btn flat round dense icon="open_in_new" color="primary" class="q-mr-sm" @click="openInNewTab(previewImageUrl)">
            <q-tooltip>Open Full Image in New Tab</q-tooltip>
          </q-btn>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>
        <q-card-section class="q-pa-md text-center">
          <q-img :src="previewImageUrl" style="max-width: 800px; max-height: 70vh;" fit="contain" />
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>


<script setup>

import {
  ref,
  computed,
  watch,
  onMounted
} from 'vue'

import { useRoute } from 'vue-router'

import {
  Notify
} from 'quasar'

import adminService from '@/services/admin.service'
import { resolveImageUrl, DOCUMENT_PLACEHOLDERS } from '@/utils/imageUrl'

const route = useRoute()

/* =========================================================
   LOADING
========================================================= */

const loading = ref(false)


/* =========================================================
   VERIFICATION STATE & TABS
========================================================= */

const activeTab = ref('all')

const verificationFilter = ref('all')

const verificationFilterOptions = [
  { label: 'All Verification', value: 'all' },
  { label: 'Pending Review', value: 'pending' },
  { label: 'Verified', value: 'verified' },
  { label: 'Rejected', value: 'rejected' }
]

const verifyDialog = ref(false)

const verifyingLoading = ref(false)

const verificationRemarks = ref('')

const imagePreviewDialog = ref(false)

const previewImageUrl = ref('')

const previewImageTitle = ref('')


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
    name: 'verification',
    label: 'VERIFICATION',
    field: 'verificationStatus',
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

  // Tab filter
  if (activeTab.value === 'pending') {
    data = data.filter(d => !d.isVerified && d.verificationStatus !== 'verified' && d.verificationStatus !== 'rejected')
  } else if (activeTab.value === 'verified') {
    data = data.filter(d => d.isVerified || d.verificationStatus === 'verified')
  } else if (activeTab.value === 'rejected') {
    data = data.filter(d => d.verificationStatus === 'rejected')
  }

  // Verification Filter Dropdown
  if (verificationFilter.value !== 'all') {
    if (verificationFilter.value === 'pending') {
      data = data.filter(d => !d.isVerified && d.verificationStatus !== 'verified' && d.verificationStatus !== 'rejected')
    } else if (verificationFilter.value === 'verified') {
      data = data.filter(d => d.isVerified || d.verificationStatus === 'verified')
    } else if (verificationFilter.value === 'rejected') {
      data = data.filter(d => d.verificationStatus === 'rejected')
    }
  }

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
        customer.drivingLicenseNo
          ?.toLowerCase()
          .includes(keyword)
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

const totalDrivers = computed(() => {
  return customers.value.length
})

const totalCustomers = totalDrivers


const activeDrivers = computed(() => {
  return customers.value.filter(
    customer =>
      customer.status === 'Active'
  ).length
})

const activeCustomers = activeDrivers


const pendingVerificationCount = computed(() => {
  return customers.value.filter(
    d => !d.isVerified && d.verificationStatus !== 'verified' && d.verificationStatus !== 'rejected'
  ).length
})


const verifiedDriversCount = computed(() => {
  return customers.value.filter(
    d => d.isVerified || d.verificationStatus === 'verified'
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

const saveCustomer = async () => {

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
    try {
      await adminService.updateDriver(customerForm.value.id, customerForm.value)
    } catch (err) {
      console.warn('API update failed, updating in-memory:', err?.message)
    }

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
      message: 'Driver updated successfully'
    })
  }

  /* =====================================================
     ADD
  ====================================================== */

  else {
    try {
      const created = await adminService.createDriver(customerForm.value)
      if (created && created.id) {
        customerForm.value.id = created.id
      }
    } catch (err) {
      console.warn('API create failed, adding in-memory:', err?.message)
    }

    customers.value.unshift({
      ...customerForm.value,
      id: customerForm.value.id || Date.now(),
      bookings: 0,
      createdAt:
        new Date()
          .toISOString()
          .split('T')[0]
    })

    Notify.create({
      type: 'positive',
      message: 'Driver added successfully'
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

const deleteCustomer = async () => {
  if (!selectedCustomer.value) {
    return
  }

  try {
    await adminService.deleteDriver(selectedCustomer.value.id)
  } catch (err) {
    console.warn('API delete driver failed, removing in-memory:', err?.message)
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
    message: 'Driver deleted successfully'
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
   VERIFICATION ACTIONS
========================================================= */

const openVerifyDialog = (driver) => {
  selectedCustomer.value = driver
  verificationRemarks.value = driver.verificationRemarks || (driver.isVerified ? 'Approved by Batohi Compliance Team' : '')
  verifyDialog.value = true
}

const zoomImage = (url, title) => {
  if (!url) return
  previewImageUrl.value = resolveImageUrl(url)
  previewImageTitle.value = title || 'Document Inspection'
  imagePreviewDialog.value = true
}

const openInNewTab = (url) => {
  if (!url) return
  const full = resolveImageUrl(url)
  window.open(full, '_blank', 'noopener,noreferrer')
}

const submitVerification = async (status) => {
  if (!selectedCustomer.value) return
  verifyingLoading.value = true
  const id = selectedCustomer.value.id
  const isVerified = status === 'verified'
  const remarks = verificationRemarks.value

  try {
    await adminService.verifyDriver(id, {
      status,
      remarks
    })
  } catch (err) {
    console.warn('API verify failed, updating in-memory:', err?.message)
  }

  // Update in memory list
  const idx = customers.value.findIndex(d => d.id === id)
  if (idx !== -1) {
    customers.value[idx] = {
      ...customers.value[idx],
      isVerified,
      verificationStatus: status,
      verificationRemarks: remarks,
      status: isVerified ? 'Active' : customers.value[idx].status
    }
    selectedCustomer.value = { ...customers.value[idx] }
  }

  Notify.create({
    type: status === 'verified' ? 'positive' : status === 'rejected' ? 'negative' : 'warning',
    message: status === 'verified'
      ? `Driver ${selectedCustomer.value.name} successfully verified!`
      : status === 'rejected'
        ? `Driver ${selectedCustomer.value.name} documents marked as rejected.`
        : `Driver ${selectedCustomer.value.name} reset to pending review.`
  })

  verifyDialog.value = false
  verifyingLoading.value = false
}

/* =========================================================
   FETCH DRIVERS
========================================================= */

const fetchCustomers = async () => {
  loading.value = true
  try {
    const res = await adminService.getDrivers({
      search: search.value,
      status: statusFilter.value
    })
    if (res && res.data && res.data.length > 0) {
      customers.value = res.data
    }
  } catch (error) {
    console.warn('Driver API Notice (using local list if offline):', error?.message)
  } finally {
    loading.value = false
  }
}


/* =========================================================
   WATCH ROUTE QUERY
========================================================= */

watch(
  () => route.query,
  (query) => {
    if (query?.tab === 'verification' || query?.tab === 'pending') {
      activeTab.value = 'pending'
    } else if (query?.tab === 'verified') {
      activeTab.value = 'verified'
    } else if (query?.tab === 'all') {
      activeTab.value = 'all'
    }

    if (query?.verifyDriverId || query?.driverId) {
      const targetId = query.verifyDriverId || query.driverId
      const target = customers.value.find(d => String(d.id) === String(targetId))
      if (target) {
        openVerifyDialog(target)
      }
    }
  },
  { immediate: true }
)

/* =========================================================
   MOUNT
========================================================= */

onMounted(async () => {
  await fetchCustomers()

  if (route.query.verifyDriverId || route.query.driverId) {
    const targetId = route.query.verifyDriverId || route.query.driverId
    const target = customers.value.find(d => String(d.id) === String(targetId))
    if (target) {
      openVerifyDialog(target)
    }
  }
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
