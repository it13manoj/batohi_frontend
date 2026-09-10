```vue
<template>
  <q-page class="driver-management-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header row items-center justify-between q-mb-lg">

      <div>
        <div class="page-title">
          Management
        </div>

        <div class="page-subtitle">
          Manage your vehicle, documents, availability and account settings
        </div>
      </div>

      <q-btn
        color="primary"
        icon="save"
        label="Save Changes"
        unelevated
        :loading="saving"
        @click="saveAll"
      />

    </div>


    <!-- =====================================================
         QUICK STATUS CARDS
    ====================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- Assigned Vehicle -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="status-card">

          <q-card-section class="status-card-content">

            <div class="vehicle-status-image">
              <img
                :src="management.vehiclePhoto"
                alt="Vehicle"
                @error="handleVehicleImageError"
              />
            </div>

            <div class="status-info">

              <div class="status-label">
                Assigned Vehicle
              </div>

              <div class="status-value">
                {{ management.vehicleName }}
              </div>

              <div class="status-sub">
                {{ management.vehicleNumber }}
              </div>

            </div>

            <q-badge
              color="positive"
              label="Active"
              rounded
            />

          </q-card-section>

        </q-card>
      </div>


      <!-- Documents -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="status-card">

          <q-card-section class="status-card-content">

            <q-icon
              name="description"
              size="38px"
              color="primary"
              class="status-icon"
            />

            <div class="status-info">

              <div class="status-label">
                Documents
              </div>

              <div class="status-value">
                {{ approvedDocuments }}/{{ documents.length }}
              </div>

              <div class="status-sub">
                Documents Approved
              </div>

            </div>

            <q-badge
              :color="approvedDocuments === documents.length ? 'positive' : 'warning'"
              :label="approvedDocuments === documents.length ? 'Complete' : 'Pending'"
              rounded
            />

          </q-card-section>

        </q-card>
      </div>


      <!-- Availability -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="status-card">

          <q-card-section class="status-card-content">

            <q-icon
              name="schedule"
              size="38px"
              color="orange"
              class="status-icon"
            />

            <div class="status-info">

              <div class="status-label">
                Availability
              </div>

              <div class="status-value">
                {{ availabilityDays }}
              </div>

              <div class="status-sub">
                Days Available
              </div>

            </div>

            <q-badge
              color="positive"
              label="Available"
              rounded
            />

          </q-card-section>

        </q-card>
      </div>


      <!-- Account -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="status-card">

          <q-card-section class="status-card-content">

            <q-icon
              name="account_circle"
              size="38px"
              color="purple"
              class="status-icon"
            />

            <div class="status-info">

              <div class="status-label">
                Account
              </div>

              <div class="status-value">
                Active
              </div>

              <div class="status-sub">
                Driver Account
              </div>

            </div>

            <q-badge
              color="positive"
              label="Verified"
              rounded
            />

          </q-card-section>

        </q-card>
      </div>

    </div>


    <!-- =====================================================
         MAIN CONTENT
    ====================================================== -->
    <div class="row q-col-gutter-lg">

      <!-- ===================================================
           LEFT COLUMN
      ==================================================== -->
      <div class="col-12 col-lg-8">


        <!-- =================================================
             VEHICLE MANAGEMENT
        ================================================== -->
        <q-card class="management-card q-mb-lg">

          <q-card-section class="card-header">

            <div>
              <div class="card-title">
                Vehicle Management
              </div>

              <div class="card-subtitle">
                Manage your assigned vehicle information
              </div>
            </div>

            <q-btn
              flat
              round
              color="primary"
              icon="edit"
              @click="openVehicleDialog"
            >
              <q-tooltip>
                Edit Vehicle
              </q-tooltip>
            </q-btn>

          </q-card-section>


          <q-separator />


          <!-- Vehicle Image -->
          <q-card-section>

            <div class="vehicle-main-preview">

              <div class="vehicle-image-wrapper">

                <img
                  :src="management.vehiclePhoto"
                  alt="Assigned Vehicle"
                  class="vehicle-main-image"
                  @error="handleVehicleImageError"
                />

                <q-badge
                  color="positive"
                  class="vehicle-active-badge"
                >
                  <q-icon
                    name="check_circle"
                    size="15px"
                    class="q-mr-xs"
                  />
                  Assigned
                </q-badge>

                <q-btn
                  round
                  unelevated
                  color="primary"
                  icon="photo_camera"
                  class="vehicle-photo-edit-btn"
                  @click="openVehicleDialog"
                >
                  <q-tooltip>
                    Change Vehicle Photo
                  </q-tooltip>
                </q-btn>

              </div>


              <div class="vehicle-preview-info">

                <div class="vehicle-preview-title">
                  {{ management.vehicleName }}
                </div>

                <div class="vehicle-preview-number">
                  {{ management.vehicleNumber }}
                </div>

                <div class="row q-gutter-sm q-mt-md">

                  <q-badge
                    color="blue-grey-7"
                    outline
                  >
                    {{ management.vehicleType }}
                  </q-badge>

                  <q-badge
                    color="primary"
                    outline
                  >
                    {{ management.vehicleColor }}
                  </q-badge>

                  <q-badge
                    color="positive"
                    outline
                  >
                    {{ management.fuelType }}
                  </q-badge>

                </div>

              </div>

            </div>

          </q-card-section>


          <q-separator />


          <!-- Vehicle Details -->
          <q-card-section>

            <div class="section-mini-title q-mb-md">
              Vehicle Details
            </div>

            <div class="info-grid">

              <div class="info-item">
                <div class="info-label">Vehicle Name</div>
                <div class="info-value">
                  {{ management.vehicleName }}
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">Vehicle Type</div>
                <div class="info-value">
                  {{ management.vehicleType }}
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">Vehicle Model</div>
                <div class="info-value">
                  {{ management.vehicleModel }}
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">Vehicle Number</div>
                <div class="info-value">
                  {{ management.vehicleNumber }}
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">Vehicle Color</div>
                <div class="info-value">
                  {{ management.vehicleColor }}
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">Registration Year</div>
                <div class="info-value">
                  {{ management.registrationYear }}
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">Seating Capacity</div>
                <div class="info-value">
                  {{ management.seatingCapacity }} Seats
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">Fuel Type</div>
                <div class="info-value">
                  {{ management.fuelType }}
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">Air Conditioning</div>
                <div class="info-value">

                  <q-badge
                    :color="management.acEnabled ? 'positive' : 'grey'"
                  >
                    {{ management.acEnabled ? 'Available' : 'Not Available' }}
                  </q-badge>

                </div>
              </div>

              <div class="info-item">
                <div class="info-label">Vehicle Status</div>
                <div class="info-value">

                  <q-badge
                    color="positive"
                    rounded
                  >
                    Active
                  </q-badge>

                </div>
              </div>

              <div class="info-item">
                <div class="info-label">Assigned Date</div>
                <div class="info-value">
                  {{ formatDate(management.assignedDate) }}
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">Insurance Expiry</div>
                <div class="info-value">
                  {{ formatDate(management.insuranceExpiry) }}
                </div>
              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- =================================================
             VEHICLE SETTINGS
        ================================================== -->
        <q-card class="management-card q-mb-lg">

          <q-card-section class="card-header">

            <div>
              <div class="card-title">
                Vehicle Settings
              </div>

              <div class="card-subtitle">
                Configure vehicle features and trip readiness
              </div>
            </div>

            <q-icon
              name="settings"
              color="primary"
              size="28px"
            />

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div class="settings-list">

              <!-- AC -->
              <div class="setting-row">

                <div class="setting-left">

                  <div class="setting-icon">
                    <q-icon
                      name="ac_unit"
                      color="primary"
                    />
                  </div>

                  <div>
                    <div class="setting-title">
                      Air Conditioning
                    </div>

                    <div class="setting-description">
                      Enable AC information for passengers
                    </div>
                  </div>

                </div>

                <q-toggle
                  v-model="vehicleSettings.acEnabled"
                  color="primary"
                />

              </div>


              <!-- GPS -->
              <div class="setting-row">

                <div class="setting-left">

                  <div class="setting-icon">
                    <q-icon
                      name="gps_fixed"
                      color="positive"
                    />
                  </div>

                  <div>
                    <div class="setting-title">
                      GPS Tracking
                    </div>

                    <div class="setting-description">
                      Allow vehicle location tracking during trips
                    </div>
                  </div>

                </div>

                <q-toggle
                  v-model="vehicleSettings.gpsTracking"
                  color="positive"
                />

              </div>


              <!-- Commercial Permit -->
              <div class="setting-row">

                <div class="setting-left">

                  <div class="setting-icon">
                    <q-icon
                      name="verified"
                      color="orange"
                    />
                  </div>

                  <div>
                    <div class="setting-title">
                      Commercial Permit
                    </div>

                    <div class="setting-description">
                      Vehicle is registered for commercial use
                    </div>
                  </div>

                </div>

                <q-toggle
                  v-model="vehicleSettings.commercialPermit"
                  color="orange"
                />

              </div>


              <!-- Trip Ready -->
              <div class="setting-row">

                <div class="setting-left">

                  <div class="setting-icon">
                    <q-icon
                      name="directions_car"
                      color="purple"
                    />
                  </div>

                  <div>
                    <div class="setting-title">
                      Vehicle Trip Ready
                    </div>

                    <div class="setting-description">
                      Vehicle is ready to accept new trips
                    </div>
                  </div>

                </div>

                <q-toggle
                  v-model="vehicleSettings.tripReady"
                  color="purple"
                />

              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- =================================================
             DOCUMENTS
        ================================================== -->
        <q-card class="management-card q-mb-lg">

          <q-card-section class="card-header">

            <div>
              <div class="card-title">
                Vehicle Documents
              </div>

              <div class="card-subtitle">
                Manage your required vehicle and driver documents
              </div>
            </div>

          </q-card-section>

          <q-separator />


          <q-list separator>

            <q-item
              v-for="document in documents"
              :key="document.id"
              class="document-row"
            >

              <q-item-section avatar>

                <q-avatar
                  size="44px"
                  color="blue-grey-1"
                  text-color="primary"
                >
                  <q-icon :name="document.icon" />
                </q-avatar>

              </q-item-section>


              <q-item-section>

                <q-item-label class="document-name">
                  {{ document.name }}
                </q-item-label>

                <q-item-label caption>
                  {{ document.number }}
                </q-item-label>

              </q-item-section>


              <q-item-section side>

                <div class="row items-center q-gutter-sm">

                  <q-badge
                    :color="getDocumentStatusColor(document.status)"
                    rounded
                  >
                    {{ document.status }}
                  </q-badge>

                  <q-btn
                    flat
                    round
                    dense
                    icon="visibility"
                    color="primary"
                    @click="viewDocument(document)"
                  />

                  <q-btn
                    flat
                    round
                    dense
                    icon="upload_file"
                    color="grey-7"
                    @click="openDocumentDialog(document)"
                  />

                </div>

              </q-item-section>

            </q-item>

          </q-list>

        </q-card>


        <!-- =================================================
             AVAILABILITY
        ================================================== -->
        <q-card class="management-card">

          <q-card-section class="card-header">

            <div>
              <div class="card-title">
                Availability Schedule
              </div>

              <div class="card-subtitle">
                Set your weekly driving availability
              </div>
            </div>

            <q-icon
              name="event_available"
              color="primary"
              size="28px"
            />

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div
              v-for="day in schedule"
              :key="day.day"
              class="schedule-row"
            >

              <div class="schedule-day">
                {{ day.day }}
              </div>

              <q-toggle
                v-model="day.available"
                color="positive"
              />

              <div
                v-if="day.available"
                class="schedule-time"
              >

                <q-input
                  v-model="day.start"
                  type="time"
                  outlined
                  dense
                  label="Start"
                  class="time-input"
                />

                <span class="time-separator">
                  to
                </span>

                <q-input
                  v-model="day.end"
                  type="time"
                  outlined
                  dense
                  label="End"
                  class="time-input"
                />

              </div>

              <div
                v-else
                class="text-grey-6"
              >
                Not Available
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- ===================================================
           RIGHT COLUMN
      ==================================================== -->
      <div class="col-12 col-lg-4">


        <!-- =================================================
             ACCOUNT SETTINGS
        ================================================== -->
        <q-card class="management-card q-mb-lg">

          <q-card-section class="card-header">

            <div>
              <div class="card-title">
                Account Settings
              </div>

              <div class="card-subtitle">
                Manage driver account preferences
              </div>
            </div>

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div class="account-setting">

              <div>
                <div class="setting-title">
                  Notifications
                </div>

                <div class="setting-description">
                  Receive trip notifications
                </div>
              </div>

              <q-toggle
                v-model="settings.notifications"
                color="primary"
              />

            </div>


            <div class="account-setting">

              <div>
                <div class="setting-title">
                  SMS Alerts
                </div>

                <div class="setting-description">
                  Receive important SMS alerts
                </div>
              </div>

              <q-toggle
                v-model="settings.smsAlerts"
                color="primary"
              />

            </div>


            <div class="account-setting">

              <div>
                <div class="setting-title">
                  Email Updates
                </div>

                <div class="setting-description">
                  Receive account updates by email
                </div>
              </div>

              <q-toggle
                v-model="settings.emailUpdates"
                color="primary"
              />

            </div>


            <div class="account-setting">

              <div>
                <div class="setting-title">
                  Two Factor Authentication
                </div>

                <div class="setting-description">
                  Extra security for your account
                </div>
              </div>

              <q-toggle
                v-model="settings.twoFactor"
                color="positive"
              />

            </div>

          </q-card-section>

        </q-card>


        <!-- =================================================
             PAYMENT DETAILS
        ================================================== -->
        <q-card class="management-card q-mb-lg">

          <q-card-section class="card-header">

            <div>
              <div class="card-title">
                Payment Details
              </div>

              <div class="card-subtitle">
                Manage your payment information
              </div>
            </div>

            <q-btn
              flat
              round
              icon="edit"
              color="primary"
              @click="paymentDialog = true"
            />

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div class="payment-box">

              <q-icon
                name="account_balance"
                size="32px"
                color="primary"
              />

              <div class="payment-info">

                <div class="payment-bank">
                  {{ payment.bankName }}
                </div>

                <div class="payment-account">
                  **** **** {{ payment.accountNumber.slice(-4) }}
                </div>

                <div class="payment-holder">
                  {{ payment.accountHolder }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- =================================================
             ACCOUNT ACTIONS
        ================================================== -->
        <q-card class="management-card danger-card">

          <q-card-section class="card-header">

            <div>
              <div class="card-title">
                Account Actions
              </div>

              <div class="card-subtitle">
                Manage your driver account
              </div>
            </div>

          </q-card-section>

          <q-separator />

          <q-card-section>

            <q-btn
              outline
              color="negative"
              icon="block"
              label="Deactivate Account"
              class="full-width"
              @click="deactivateAccount"
            />

            <div class="danger-note q-mt-md">
              Deactivating your account may prevent you from receiving new trips.
            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         VEHICLE EDIT DIALOG
    ====================================================== -->
    <q-dialog v-model="vehicleDialog">

      <q-card class="dialog-card">

        <q-card-section class="dialog-header">

          <div>
            <div class="text-h6 text-weight-bold">
              Vehicle Information
            </div>

            <div class="text-caption text-grey-6">
              Update your assigned vehicle details
            </div>
          </div>

          <q-btn
            flat
            round
            icon="close"
            v-close-popup
          />

        </q-card-section>

        <q-separator />


        <q-card-section class="q-pa-lg">

          <!-- Vehicle Photo -->
          <div class="vehicle-dialog-photo-section">

            <div class="vehicle-dialog-photo">

              <img
                :src="vehiclePhotoPreview || management.vehiclePhoto"
                alt="Vehicle Preview"
                @error="handleVehicleImageError"
              />

              <div class="photo-overlay">

                <q-icon
                  name="photo_camera"
                  size="28px"
                  color="white"
                />

              </div>

            </div>

            <q-file
              v-model="vehiclePhotoFile"
              label="Change Vehicle Photo"
              outlined
              dense
              accept="image/*"
              max-file-size="5242880"
              class="vehicle-photo-file"
              @update:model-value="previewVehiclePhoto"
            >
              <template #prepend>
                <q-icon name="photo_camera" />
              </template>
            </q-file>

            <div class="text-caption text-grey-6 q-mt-xs">
              JPG, PNG or WEBP. Maximum size 5 MB.
            </div>

          </div>


          <!-- Vehicle Fields -->
          <div class="row q-col-gutter-md q-mt-md">

            <div class="col-12 col-md-6">

              <q-input
                v-model="management.vehicleName"
                outlined
                label="Vehicle Name"
                dense
              />

            </div>


            <div class="col-12 col-md-6">

              <q-select
                v-model="management.vehicleType"
                outlined
                dense
                label="Vehicle Type"
                :options="vehicleTypeOptions"
              />

            </div>


            <div class="col-12 col-md-6">

              <q-input
                v-model="management.vehicleModel"
                outlined
                label="Vehicle Model"
                dense
              />

            </div>


            <div class="col-12 col-md-6">

              <q-input
                v-model="management.vehicleNumber"
                outlined
                label="Vehicle Number"
                dense
              />

            </div>


            <div class="col-12 col-md-6">

              <q-input
                v-model="management.vehicleColor"
                outlined
                label="Vehicle Color"
                dense
              />

            </div>


            <div class="col-12 col-md-6">

              <q-input
                v-model="management.registrationYear"
                outlined
                label="Registration Year"
                type="number"
                dense
              />

            </div>


            <div class="col-12 col-md-6">

              <q-input
                v-model="management.seatingCapacity"
                outlined
                label="Seating Capacity"
                type="number"
                dense
              />

            </div>


            <div class="col-12 col-md-6">

              <q-select
                v-model="management.fuelType"
                outlined
                dense
                label="Fuel Type"
                :options="fuelTypeOptions"
              />

            </div>


            <div class="col-12 col-md-6">

              <q-input
                v-model="management.assignedDate"
                outlined
                dense
                type="date"
                label="Assigned Date"
              />

            </div>


            <div class="col-12 col-md-6">

              <q-input
                v-model="management.insuranceExpiry"
                outlined
                dense
                type="date"
                label="Insurance Expiry"
              />

            </div>


            <div class="col-12">

              <q-toggle
                v-model="management.acEnabled"
                label="Air Conditioning Available"
                color="primary"
              />

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            label="Cancel"
            color="grey-7"
            v-close-popup
          />

          <q-btn
            color="primary"
            label="Save Vehicle"
            icon="save"
            unelevated
            @click="saveVehicle"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- =====================================================
         DOCUMENT UPLOAD DIALOG
    ====================================================== -->
    <q-dialog v-model="documentDialog">

      <q-card class="dialog-card">

        <q-card-section class="dialog-header">

          <div>
            <div class="text-h6 text-weight-bold">
              Upload Document
            </div>

            <div class="text-caption text-grey-6">
              {{ selectedDocument?.name }}
            </div>
          </div>

          <q-btn
            flat
            round
            icon="close"
            v-close-popup
          />

        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-lg">

          <q-file
            v-model="documentFile"
            outlined
            label="Select Document"
            accept=".pdf,.jpg,.jpeg,.png"
            max-file-size="10485760"
          >
            <template #prepend>
              <q-icon name="upload_file" />
            </template>
          </q-file>

          <div class="text-caption text-grey-6 q-mt-sm">
            Accepted formats: PDF, JPG, JPEG and PNG. Maximum 10 MB.
          </div>

        </q-card-section>

        <q-separator />

        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            label="Cancel"
            v-close-popup
          />

          <q-btn
            color="primary"
            label="Upload"
            icon="cloud_upload"
            unelevated
            @click="uploadDocument"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- =====================================================
         DOCUMENT VIEW DIALOG
    ====================================================== -->
    <q-dialog v-model="documentViewDialog">

      <q-card class="document-view-card">

        <q-card-section class="dialog-header">

          <div>
            <div class="text-h6 text-weight-bold">
              Document Details
            </div>
          </div>

          <q-btn
            flat
            round
            icon="close"
            v-close-popup
          />

        </q-card-section>

        <q-separator />

        <q-card-section>

          <div
            v-if="selectedDocument"
            class="document-preview"
          >

            <q-icon
              :name="selectedDocument.icon"
              size="64px"
              color="primary"
            />

            <div class="text-h6 q-mt-md">
              {{ selectedDocument.name }}
            </div>

            <div class="text-grey-7 q-mt-sm">
              {{ selectedDocument.number }}
            </div>

            <q-badge
              :color="getDocumentStatusColor(selectedDocument.status)"
              class="q-mt-md"
            >
              {{ selectedDocument.status }}
            </q-badge>

          </div>

        </q-card-section>

      </q-card>

    </q-dialog>


    <!-- =====================================================
         PAYMENT DIALOG
    ====================================================== -->
    <q-dialog v-model="paymentDialog">

      <q-card class="dialog-card">

        <q-card-section class="dialog-header">

          <div>
            <div class="text-h6 text-weight-bold">
              Payment Details
            </div>

            <div class="text-caption text-grey-6">
              Update your bank account information
            </div>
          </div>

          <q-btn
            flat
            round
            icon="close"
            v-close-popup
          />

        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-lg">

          <q-input
            v-model="payment.bankName"
            outlined
            dense
            label="Bank Name"
            class="q-mb-md"
          />

          <q-input
            v-model="payment.accountHolder"
            outlined
            dense
            label="Account Holder Name"
            class="q-mb-md"
          />

          <q-input
            v-model="payment.accountNumber"
            outlined
            dense
            label="Account Number"
            class="q-mb-md"
          />

          <q-input
            v-model="payment.ifsc"
            outlined
            dense
            label="IFSC Code"
          />

        </q-card-section>

        <q-separator />

        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            label="Cancel"
            v-close-popup
          />

          <q-btn
            color="primary"
            label="Save Payment"
            icon="save"
            unelevated
            @click="savePayment"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>
import { computed, reactive, ref } from 'vue'
import { useQuasar } from 'quasar'


// =====================================================
// QUASAR
// =====================================================
const $q = useQuasar()


// =====================================================
// LOADING
// =====================================================
const saving = ref(false)


// =====================================================
// DIALOG STATES
// =====================================================
const vehicleDialog = ref(false)
const documentDialog = ref(false)
const documentViewDialog = ref(false)
const paymentDialog = ref(false)


// =====================================================
// FILE STATES
// =====================================================
const vehiclePhotoFile = ref(null)
const vehiclePhotoPreview = ref('')

const documentFile = ref(null)


// =====================================================
// SELECTED DOCUMENT
// =====================================================
const selectedDocument = ref(null)


// =====================================================
// VEHICLE PLACEHOLDER
// =====================================================
const vehiclePlaceholder =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg"
         width="900"
         height="550"
         viewBox="0 0 900 550">

      <rect width="900" height="550" fill="#f3f5f7"/>

      <circle
        cx="450"
        cy="220"
        r="70"
        fill="#dce1e6"
      />

      <path
        d="M330 340
           C340 290 390 270 450 270
           C510 270 560 290 570 340
           L600 360
           L600 390
           L300 390
           L300 360 Z"
        fill="#aeb6bf"
      />

      <text
        x="450"
        y="450"
        text-anchor="middle"
        font-family="Arial"
        font-size="32"
        fill="#707982">
        Vehicle Photo
      </text>

    </svg>
  `)


// =====================================================
// MANAGEMENT / VEHICLE DATA
// =====================================================
const management = reactive({

  vehiclePhoto:
    new URL(
      '../../assets/images/vehicle.png',
      import.meta.url
    ).href,

  vehicleName: 'Toyota Innova Crysta',

  vehicleType: 'SUV',

  vehicleModel: '2.4 ZX 7 STR',

  vehicleNumber: 'BR01AB1234',

  vehicleColor: 'White',

  registrationYear: 2024,

  seatingCapacity: 7,

  fuelType: 'Diesel',

  acEnabled: true,

  assignedDate: '2026-01-12',

  insuranceExpiry: '2026-12-31',

  availability: true

})


// =====================================================
// VEHICLE SETTINGS
// =====================================================
const vehicleSettings = reactive({

  acEnabled: true,

  gpsTracking: true,

  commercialPermit: true,

  tripReady: true

})


// =====================================================
// VEHICLE TYPE OPTIONS
// =====================================================
const vehicleTypeOptions = [
  'Sedan',
  'Hatchback',
  'SUV',
  'MUV',
  'Tempo Traveller',
  'Luxury'
]


// =====================================================
// FUEL TYPE OPTIONS
// =====================================================
const fuelTypeOptions = [
  'Petrol',
  'Diesel',
  'CNG',
  'Electric',
  'Hybrid'
]


// =====================================================
// DOCUMENTS
// =====================================================
const documents = ref([

  {
    id: 1,
    name: 'Driving License',
    number: 'DL-BR-2024-001245',
    status: 'Approved',
    icon: 'badge'
  },

  {
    id: 2,
    name: 'Vehicle RC',
    number: 'BR01AB1234',
    status: 'Approved',
    icon: 'directions_car'
  },

  {
    id: 3,
    name: 'Vehicle Insurance',
    number: 'INS-2026-458921',
    status: 'Approved',
    icon: 'security'
  },

  {
    id: 4,
    name: 'Fitness Certificate',
    number: 'FIT-2026-784512',
    status: 'Pending',
    icon: 'fact_check'
  }

])


// =====================================================
// SCHEDULE
// =====================================================
const schedule = ref([

  {
    day: 'Monday',
    available: true,
    start: '08:00',
    end: '20:00'
  },

  {
    day: 'Tuesday',
    available: true,
    start: '08:00',
    end: '20:00'
  },

  {
    day: 'Wednesday',
    available: true,
    start: '08:00',
    end: '20:00'
  },

  {
    day: 'Thursday',
    available: true,
    start: '08:00',
    end: '20:00'
  },

  {
    day: 'Friday',
    available: true,
    start: '08:00',
    end: '20:00'
  },

  {
    day: 'Saturday',
    available: true,
    start: '09:00',
    end: '18:00'
  },

  {
    day: 'Sunday',
    available: false,
    start: '10:00',
    end: '16:00'
  }

])


// =====================================================
// ACCOUNT SETTINGS
// =====================================================
const settings = reactive({

  notifications: true,

  smsAlerts: true,

  emailUpdates: true,

  twoFactor: false

})


// =====================================================
// PAYMENT DETAILS
// =====================================================
const payment = reactive({

  bankName: 'State Bank of India',

  accountHolder: 'Driver Account',

  accountNumber: '123456789012',

  ifsc: 'SBIN0001234'

})


// =====================================================
// COMPUTED
// =====================================================
const approvedDocuments = computed(() => {

  return documents.value.filter(
    document => document.status === 'Approved'
  ).length

})


const availabilityDays = computed(() => {

  return schedule.value.filter(
    day => day.available
  ).length

})


// =====================================================
// VEHICLE IMAGE ERROR
// =====================================================
function handleVehicleImageError(event) {

  if (event.target.src !== vehiclePlaceholder) {

    event.target.src = vehiclePlaceholder

  }

}


// =====================================================
// OPEN VEHICLE DIALOG
// =====================================================
function openVehicleDialog() {

  vehiclePhotoFile.value = null

  vehiclePhotoPreview.value = management.vehiclePhoto

  vehicleDialog.value = true

}


// =====================================================
// VEHICLE PHOTO PREVIEW
// =====================================================
function previewVehiclePhoto(file) {

  if (!file) {
    return
  }

  vehiclePhotoPreview.value =
    URL.createObjectURL(file)

}


// =====================================================
// SAVE VEHICLE
// =====================================================
function saveVehicle() {

  if (
    vehiclePhotoFile.value &&
    vehiclePhotoPreview.value
  ) {

    management.vehiclePhoto =
      vehiclePhotoPreview.value

  }

  vehicleDialog.value = false

  $q.notify({
    type: 'positive',
    message: 'Vehicle information updated successfully',
    icon: 'check_circle'
  })

}


// =====================================================
// DOCUMENT STATUS COLOR
// =====================================================
function getDocumentStatusColor(status) {

  if (status === 'Approved') {
    return 'positive'
  }

  if (status === 'Pending') {
    return 'warning'
  }

  if (status === 'Rejected') {
    return 'negative'
  }

  return 'grey'

}


// =====================================================
// OPEN DOCUMENT DIALOG
// =====================================================
function openDocumentDialog(document) {

  selectedDocument.value = document

  documentFile.value = null

  documentDialog.value = true

}


// =====================================================
// VIEW DOCUMENT
// =====================================================
function viewDocument(document) {

  selectedDocument.value = document

  documentViewDialog.value = true

}


// =====================================================
// UPLOAD DOCUMENT
// =====================================================
function uploadDocument() {

  if (!documentFile.value) {

    $q.notify({
      type: 'warning',
      message: 'Please select a document first',
      icon: 'warning'
    })

    return

  }

  if (selectedDocument.value) {

    selectedDocument.value.status = 'Pending'

  }

  documentDialog.value = false

  $q.notify({
    type: 'positive',
    message: 'Document uploaded successfully',
    icon: 'cloud_upload'
  })

}


// =====================================================
// SAVE PAYMENT
// =====================================================
function savePayment() {

  paymentDialog.value = false

  $q.notify({
    type: 'positive',
    message: 'Payment details updated successfully',
    icon: 'check_circle'
  })

}


// =====================================================
// SAVE ALL
// =====================================================
async function saveAll() {

  saving.value = true

  try {

    // -----------------------------------------------
    // API integration can be added here later
    // -----------------------------------------------

    await new Promise(resolve => {
      setTimeout(resolve, 800)
    })

    $q.notify({
      type: 'positive',
      message: 'All management changes saved successfully',
      icon: 'save'
    })

  } finally {

    saving.value = false

  }

}


// =====================================================
// DEACTIVATE ACCOUNT
// =====================================================
function deactivateAccount() {

  $q.dialog({

    title: 'Deactivate Account',

    message:
      'Are you sure you want to deactivate your driver account?',

    cancel: true,

    persistent: true,

    ok: {
      label: 'Deactivate',
      color: 'negative'
    }

  }).onOk(() => {

    $q.notify({
      type: 'warning',
      message: 'Account deactivation request submitted',
      icon: 'block'
    })

  })

}


// =====================================================
// FORMAT DATE
// =====================================================
function formatDate(date) {

  if (!date) {
    return '-'
  }

  const formattedDate = new Date(date)

  if (Number.isNaN(formattedDate.getTime())) {
    return date
  }

  return formattedDate.toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  )

}
</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.driver-management-page {
  background: #f6f8fb;
  min-height: 100vh;
}


/* =====================================================
   PAGE HEADER
===================================================== */

.page-header {
  gap: 20px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #17202a;
}

.page-subtitle {
  margin-top: 5px;
  color: #718096;
  font-size: 14px;
}


/* =====================================================
   STATUS CARDS
===================================================== */

.status-card {
  border-radius: 14px;
  border: 1px solid #e8edf3;
  box-shadow: 0 3px 14px rgba(30, 50, 70, 0.05);
  background: #ffffff;
}

.status-card-content {
  min-height: 110px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-icon {
  flex-shrink: 0;
}

.status-info {
  flex: 1;
  min-width: 0;
}

.status-label {
  font-size: 12px;
  color: #718096;
  margin-bottom: 4px;
}

.status-value {
  font-size: 16px;
  font-weight: 700;
  color: #202a34;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-sub {
  color: #8a94a0;
  font-size: 12px;
  margin-top: 2px;
}


/* =====================================================
   STATUS VEHICLE IMAGE
===================================================== */

.vehicle-status-image {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;
  background: #edf1f5;
  flex-shrink: 0;
}

.vehicle-status-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


/* =====================================================
   MANAGEMENT CARD
===================================================== */

.management-card {
  border-radius: 16px;
  border: 1px solid #e7ecf2;
  background: #ffffff;
  box-shadow: 0 4px 18px rgba(30, 50, 70, 0.05);
  overflow: hidden;
}

.card-header {
  min-height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2933;
}

.card-subtitle {
  margin-top: 4px;
  font-size: 13px;
  color: #7b8794;
}

.section-mini-title {
  font-size: 15px;
  font-weight: 700;
  color: #263238;
}


/* =====================================================
   MAIN VEHICLE PREVIEW
===================================================== */

.vehicle-main-preview {
  display: flex;
  gap: 24px;
  align-items: center;
}

.vehicle-image-wrapper {
  width: 280px;
  height: 180px;
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: #edf1f5;
  flex-shrink: 0;
}

.vehicle-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vehicle-active-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 9px;
}

.vehicle-photo-edit-btn {
  position: absolute;
  right: 12px;
  bottom: 12px;
}

.vehicle-preview-info {
  flex: 1;
}

.vehicle-preview-title {
  font-size: 24px;
  font-weight: 700;
  color: #202a34;
}

.vehicle-preview-number {
  font-size: 16px;
  color: #697586;
  margin-top: 5px;
  letter-spacing: 1px;
  font-weight: 600;
}


/* =====================================================
   INFORMATION GRID
===================================================== */

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.info-item {
  padding: 14px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #edf1f5;
}

.info-label {
  font-size: 12px;
  color: #7b8794;
  margin-bottom: 6px;
}

.info-value {
  font-size: 14px;
  color: #263238;
  font-weight: 600;
}


/* =====================================================
   VEHICLE SETTINGS
===================================================== */

.settings-list {
  display: flex;
  flex-direction: column;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 1px solid #edf1f5;
}

.setting-row:last-child {
  border-bottom: none;
}

.setting-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.setting-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.setting-title {
  font-size: 14px;
  font-weight: 600;
  color: #263238;
}

.setting-description {
  font-size: 12px;
  color: #87919d;
  margin-top: 3px;
}


/* =====================================================
   DOCUMENTS
===================================================== */

.document-row {
  min-height: 78px;
}

.document-name {
  font-weight: 600;
  color: #263238;
}

.document-row:hover {
  background: #fafbfd;
}


/* =====================================================
   AVAILABILITY
===================================================== */

.schedule-row {
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 70px;
  border-bottom: 1px solid #edf1f5;
}

.schedule-row:last-child {
  border-bottom: none;
}

.schedule-day {
  width: 100px;
  font-weight: 600;
  color: #263238;
}

.schedule-time {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.time-input {
  width: 140px;
}

.time-separator {
  color: #87919d;
}


/* =====================================================
   ACCOUNT SETTINGS
===================================================== */

.account-setting {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 16px 0;
  border-bottom: 1px solid #edf1f5;
}

.account-setting:last-child {
  border-bottom: none;
}


/* =====================================================
   PAYMENT
===================================================== */

.payment-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px;
  border-radius: 12px;
  background: #f7f9fc;
  border: 1px solid #edf1f5;
}

.payment-info {
  min-width: 0;
}

.payment-bank {
  font-size: 15px;
  font-weight: 700;
  color: #263238;
}

.payment-account {
  font-size: 14px;
  color: #6b7785;
  margin-top: 4px;
}

.payment-holder {
  font-size: 12px;
  color: #8a94a0;
  margin-top: 4px;
}


/* =====================================================
   DANGER CARD
===================================================== */

.danger-card {
  border-color: #f3d4d4;
}

.danger-note {
  font-size: 12px;
  line-height: 1.5;
  color: #9b4d4d;
  background: #fff6f6;
  padding: 10px 12px;
  border-radius: 8px;
}


/* =====================================================
   DIALOG
===================================================== */

.dialog-card {
  width: 760px;
  max-width: 95vw;
  border-radius: 16px;
}

.document-view-card {
  width: 500px;
  max-width: 95vw;
  border-radius: 16px;
}

.dialog-header {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


/* =====================================================
   VEHICLE DIALOG PHOTO
===================================================== */

.vehicle-dialog-photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vehicle-dialog-photo {
  width: 280px;
  height: 175px;
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  background: #edf1f5;
  border: 1px solid #e2e8f0;
}

.vehicle-dialog-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.08);
  pointer-events: none;
}

.vehicle-photo-file {
  width: 280px;
  max-width: 100%;
  margin-top: 14px;
}


/* =====================================================
   DOCUMENT PREVIEW
===================================================== */

.document-preview {
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 900px) {

  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .vehicle-main-preview {
    align-items: flex-start;
  }

  .vehicle-image-wrapper {
    width: 220px;
    height: 150px;
  }

}


@media (max-width: 600px) {

  .driver-management-page {
    padding: 12px !important;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .page-title {
    font-size: 24px;
  }

  .page-header .q-btn {
    width: 100%;
  }

  .vehicle-main-preview {
    flex-direction: column;
  }

  .vehicle-image-wrapper {
    width: 100%;
    height: 210px;
  }

  .vehicle-preview-title {
    font-size: 20px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .schedule-row {
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px 0;
  }

  .schedule-day {
    width: 100%;
  }

  .schedule-time {
    width: 100%;
  }

  .time-input {
    flex: 1;
    width: auto;
  }

  .document-row {
    padding: 10px 0;
  }

  .document-row .q-item__section--side {
    padding-left: 5px;
  }

  .dialog-card {
    width: 100%;
  }

}

</style>
```
