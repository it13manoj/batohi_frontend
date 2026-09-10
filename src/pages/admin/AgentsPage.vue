```vue
<template>
  <q-page class="agency-page">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->

    <div class="page-header">

      <div>
        <div class="page-title">
          Agencies
        </div>

        <div class="page-subtitle">
          Manage agency registration and documents
        </div>
      </div>

      <q-btn
        unelevated
        color="primary"
        icon="add_business"
        label="Add Agency"
        @click="openAddDialog"
      />

    </div>


    <!-- =====================================================
         STATISTICS
    ====================================================== -->

    <div class="row q-col-gutter-md q-mb-lg">

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
                  name="business"
                  size="28px"
                />
              </q-avatar>

              <div class="stat-info">

                <div class="stat-label">
                  Total Agencies
                </div>

                <div class="stat-value">
                  {{ totalAgencies }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


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
                  name="verified"
                  size="28px"
                />
              </q-avatar>

              <div class="stat-info">

                <div class="stat-label">
                  Active Agencies
                </div>

                <div class="stat-value">
                  {{ activeAgencies }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


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
                  name="schedule"
                  size="28px"
                />
              </q-avatar>

              <div class="stat-info">

                <div class="stat-label">
                  Documents Expiring
                </div>

                <div class="stat-value">
                  {{ expiringDocuments }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


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
                  name="location_city"
                  size="28px"
                />
              </q-avatar>

              <div class="stat-info">

                <div class="stat-label">
                  Cities
                </div>

                <div class="stat-value">
                  {{ totalCities }}
                </div>

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         TABLE
    ====================================================== -->

    <q-card class="agency-card">

      <q-card-section class="table-header">

        <div>

          <div class="table-title">
            Agency List
          </div>

          <div class="table-subtitle">
            View and manage registered agencies
          </div>

        </div>


        <div class="table-actions">

          <q-input
            v-model="search"
            outlined
            dense
            debounce="300"
            clearable
            placeholder="Search agency..."
            class="search-input"
          >

            <template #prepend>
              <q-icon name="search" />
            </template>

          </q-input>


          <q-select
            v-model="statusFilter"
            outlined
            dense
            emit-value
            map-options
            :options="statusOptions"
            label="Status"
            class="status-filter"
          />

        </div>

      </q-card-section>


      <q-separator />


      <!-- =====================================================
           AGENCY TABLE
      ====================================================== -->

      <q-table
        :rows="filteredAgencies"
        :columns="columns"
        row-key="id"
        flat
        :loading="loading"
        :pagination="pagination"
        @update:pagination="pagination = $event"
        no-data-label="No agencies found"
        class="agency-table"
      >


        <!-- AGENCY -->

        <template #body-cell-agency="props">

          <q-td :props="props">

            <div class="agency-info">

              <q-avatar
                size="45px"
                color="primary"
                text-color="white"
              >

                <img
                  v-if="props.row.agencyPhoto"
                  :src="props.row.agencyPhoto"
                  alt="Agency"
                />

                <span v-else>
                  {{ getInitials(props.row.agencyName) }}
                </span>

              </q-avatar>


              <div class="agency-details">

                <div class="agency-name">
                  {{ props.row.agencyName }}
                </div>

                <div class="agency-id">
                  ID: #{{ props.row.id }}
                </div>

              </div>

            </div>

          </q-td>

        </template>


        <!-- PERSONAL -->

        <template #body-cell-person="props">

          <q-td :props="props">

            <div>
              {{ props.row.gender || '-' }}
            </div>

            <div class="small-text">
              {{ props.row.city || '-' }}
            </div>

          </q-td>

        </template>


        <!-- GST -->

        <template #body-cell-gst="props">

          <q-td :props="props">

            <div class="document-number">
              {{ props.row.gstNumber || '-' }}
            </div>

            <q-chip
              v-if="props.row.gstNumber"
              dense
              size="sm"
              :color="
                isExpired(props.row.gstExpiry)
                  ? 'red-1'
                  : 'green-1'
              "
              :text-color="
                isExpired(props.row.gstExpiry)
                  ? 'negative'
                  : 'positive'
              "
            >
              {{
                isExpired(props.row.gstExpiry)
                  ? 'Expired'
                  : 'Valid'
              }}
            </q-chip>

          </q-td>

        </template>


        <!-- LICENSE -->

        <template #body-cell-license="props">

          <q-td :props="props">

            <div class="document-number">
              {{ props.row.agencyLicenseNumber || '-' }}
            </div>

            <div class="small-text">
              {{ formatDate(props.row.agencyLicenseExpiry) }}
            </div>

          </q-td>

        </template>


        <!-- LOCATION -->

        <template #body-cell-location="props">

          <q-td :props="props">

            <div>
              {{ props.row.city || '-' }}
            </div>

            <div class="small-text">
              {{ props.row.state || '' }}
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


        <!-- ACTIONS -->

        <template #body-cell-actions="props">

          <q-td
            :props="props"
            class="text-right"
          >

            <q-btn
              flat
              round
              dense
              icon="visibility"
              color="primary"
              @click="viewAgency(props.row)"
            >
              <q-tooltip>
                View Agency
              </q-tooltip>
            </q-btn>


            <q-btn
              flat
              round
              dense
              icon="edit"
              color="warning"
              @click="editAgency(props.row)"
            >
              <q-tooltip>
                Edit Agency
              </q-tooltip>
            </q-btn>


            <q-btn
              flat
              round
              dense
              icon="delete"
              color="negative"
              @click="confirmDelete(props.row)"
            >
              <q-tooltip>
                Delete Agency
              </q-tooltip>
            </q-btn>

          </q-td>

        </template>

      </q-table>

    </q-card>


    <!-- =====================================================
         ADD / EDIT DIALOG
    ====================================================== -->

    <q-dialog
      v-model="agencyDialog"
      persistent
    >

      <q-card class="agency-form-card">


        <!-- HEADER -->

        <q-card-section class="row items-center">

          <div>

            <div class="form-title">

              {{
                editingAgency
                  ? 'Edit Agency'
                  : 'Add Agency'
              }}

            </div>

            <div class="form-subtitle">
              Enter agency and document details
            </div>

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


        <q-scroll-area class="form-scroll">


          <q-card-section>


            <!-- =================================================
                 PERSONAL DETAILS
            ================================================== -->

            <div class="section-title">
              <q-icon
                name="person"
                class="q-mr-sm"
              />
              Personal Details
            </div>


            <div class="row q-col-gutter-md">


              <!-- AADHAAR -->

              <div class="col-12 col-md-6">

                <q-input
                  v-model="agencyForm.aadhaar"
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


              <!-- GENDER -->

              <div class="col-12 col-md-6">

                <q-select
                  v-model="agencyForm.gender"
                  outlined
                  label="Gender *"
                  :options="genderOptions"
                >

                  <template #prepend>
                    <q-icon name="wc" />
                  </template>

                </q-select>

              </div>


              <!-- STATE -->

              <div class="col-12 col-md-6">

                <q-select
                  v-model="agencyForm.state"
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


              <!-- CITY -->

              <div class="col-12 col-md-6">

                <q-select
                  v-model="agencyForm.city"
                  outlined
                  label="City *"
                  :options="availableCities"
                  :disable="!agencyForm.state"
                >

                  <template #prepend>
                    <q-icon name="location_city" />
                  </template>

                </q-select>

              </div>


              <!-- PHOTO -->

              <div class="col-12">

                <div class="upload-box">

                  <q-avatar
                    size="95px"
                    color="primary"
                    text-color="white"
                  >

                    <img
                      v-if="agencyForm.photo"
                      :src="agencyForm.photo"
                      alt="Photo"
                    />

                    <q-icon
                      v-else
                      name="person"
                      size="40px"
                    />

                  </q-avatar>


                  <div class="upload-content">

                    <div class="upload-title">
                      Photo
                    </div>

                    <div class="upload-description">
                      Upload applicant photo
                    </div>

                    <q-file
                      v-model="photoFile"
                      outlined
                      dense
                      accept="image/*"
                      label="Choose Photo"
                      @update:model-value="
                        handlePhotoUpload
                      "
                    >

                      <template #prepend>
                        <q-icon name="photo_camera" />
                      </template>

                    </q-file>

                  </div>

                </div>

              </div>

            </div>


            <!-- =================================================
                 GST
            ================================================== -->

            <div class="section-title q-mt-lg">

              <q-icon
                name="receipt_long"
                class="q-mr-sm"
              />

              GST Details

            </div>


            <div class="row q-col-gutter-md">


              <!-- GST NUMBER -->

              <div class="col-12 col-md-6">

                <q-input
                  v-model="agencyForm.gstNumber"
                  outlined
                  label="GST Number"
                  maxlength="15"
                  style="text-transform: uppercase"
                >

                  <template #prepend>
                    <q-icon name="numbers" />
                  </template>

                </q-input>

              </div>


              <!-- GST EXPIRY -->

              <div class="col-12 col-md-6">

                <q-input
                  v-model="agencyForm.gstExpiry"
                  outlined
                  readonly
                  label="GST Expiry Date"
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
                      v-model="agencyForm.gstExpiry"
                      mask="YYYY-MM-DD"
                    >

                      <div class="row justify-end">

                        <q-btn
                          flat
                          label="Close"
                          color="primary"
                          v-close-popup
                        />

                      </div>

                    </q-date>

                  </q-popup-proxy>

                </q-input>

              </div>


              <!-- GST CERTIFICATE -->

              <div class="col-12">

                <DocumentUpload
                  title="GST Certificate"
                  subtitle="Upload GST certificate"
                  :preview="agencyForm.gstCertificate"
                  :file="gstCertificateFile"
                  @update="
                    handleDocumentUpload(
                      $event,
                      'gstCertificate'
                    )
                  "
                />

              </div>

            </div>


            <!-- =================================================
                 AGENCY DETAILS
            ================================================== -->

            <div class="section-title q-mt-lg">

              <q-icon
                name="business"
                class="q-mr-sm"
              />

              Agency Details

            </div>


            <div class="row q-col-gutter-md">


              <!-- AGENCY NAME -->

              <div class="col-12 col-md-6">

                <q-input
                  v-model="agencyForm.agencyName"
                  outlined
                  label="Agency Name *"
                >

                  <template #prepend>
                    <q-icon name="business" />
                  </template>

                </q-input>

              </div>


              <!-- AGENCY OPENING -->

              <div class="col-12 col-md-6">

                <q-input
                  v-model="agencyForm.agencyOpening"
                  outlined
                  label="Agency Opening"
                  hint="Example: 09:00 AM"
                >

                  <template #prepend>
                    <q-icon name="schedule" />
                  </template>

                </q-input>

              </div>


              <!-- CELL -->

              <div class="col-12 col-md-6">

                <q-input
                  v-model="agencyForm.agencyCellNumber"
                  outlined
                  label="Agency Cell Number"
                  maxlength="10"
                  inputmode="numeric"
                >

                  <template #prepend>
                    <q-icon name="phone" />
                  </template>

                </q-input>

              </div>


              <!-- EMAIL -->

              <div class="col-12 col-md-6">

                <q-input
                  v-model="agencyForm.agencyEmail"
                  outlined
                  type="email"
                  label="Agency Email"
                >

                  <template #prepend>
                    <q-icon name="email" />
                  </template>

                </q-input>

              </div>


              <!-- ADDRESS -->

              <div class="col-12">

                <q-input
                  v-model="agencyForm.agencyAddress"
                  outlined
                  type="textarea"
                  rows="3"
                  label="Agency Address"
                >

                  <template #prepend>
                    <q-icon name="location_on" />
                  </template>

                </q-input>

              </div>


              <!-- AGENCY PHOTO -->

              <div class="col-12">

                <DocumentUpload
                  title="Agency Photo"
                  subtitle="Upload agency photo"
                  :preview="agencyForm.agencyPhoto"
                  @update="
                    handleDocumentUpload(
                      $event,
                      'agencyPhoto'
                    )
                  "
                />

              </div>

            </div>


            <!-- =================================================
                 AGENCY CERTIFICATE
            ================================================== -->

            <div class="section-title q-mt-lg">

              <q-icon
                name="workspace_premium"
                class="q-mr-sm"
              />

              Agency Certificate

            </div>


            <div class="row q-col-gutter-md">


              <div class="col-12 col-md-6">

                <q-input
                  v-model="agencyForm.agencyCertificateExpiry"
                  outlined
                  readonly
                  label="Agency Certificate Expiry Date"
                >

                  <template #prepend>
                    <q-icon name="event" />
                  </template>


                  <q-popup-proxy
                    cover
                  >

                    <q-date
                      v-model="
                        agencyForm.agencyCertificateExpiry
                      "
                      mask="YYYY-MM-DD"
                    />

                  </q-popup-proxy>

                </q-input>

              </div>


              <div class="col-12">

                <DocumentUpload
                  title="Agency Certificate"
                  subtitle="Upload agency certificate"
                  :preview="agencyForm.agencyCertificate"
                  @update="
                    handleDocumentUpload(
                      $event,
                      'agencyCertificate'
                    )
                  "
                />

              </div>

            </div>


            <!-- =================================================
                 AGENCY LICENSE
            ================================================== -->

            <div class="section-title q-mt-lg">

              <q-icon
                name="card_membership"
                class="q-mr-sm"
              />

              Agency License

            </div>


            <div class="row q-col-gutter-md">


              <!-- NUMBER -->

              <div class="col-12 col-md-6">

                <q-input
                  v-model="agencyForm.agencyLicenseNumber"
                  outlined
                  label="Agency License Number"
                >

                  <template #prepend>
                    <q-icon name="numbers" />
                  </template>

                </q-input>

              </div>


              <!-- EXPIRY -->

              <div class="col-12 col-md-6">

                <q-input
                  v-model="agencyForm.agencyLicenseExpiry"
                  outlined
                  readonly
                  label="Agency License Expiry Date"
                >

                  <template #prepend>
                    <q-icon name="event" />
                  </template>


                  <q-popup-proxy cover>

                    <q-date
                      v-model="
                        agencyForm.agencyLicenseExpiry
                      "
                      mask="YYYY-MM-DD"
                    />

                  </q-popup-proxy>

                </q-input>

              </div>


              <!-- PHOTO -->

              <div class="col-12">

                <DocumentUpload
                  title="Agency License Photo"
                  subtitle="Upload agency license"
                  :preview="agencyForm.agencyLicensePhoto"
                  @update="
                    handleDocumentUpload(
                      $event,
                      'agencyLicensePhoto'
                    )
                  "
                />

              </div>

            </div>


            <!-- =================================================
                 PAN
            ================================================== -->

            <div class="section-title q-mt-lg">

              <q-icon
                name="account_balance"
                class="q-mr-sm"
              />

              Agency PAN

            </div>


            <div class="row q-col-gutter-md">


              <div class="col-12 col-md-6">

                <q-input
                  v-model="agencyForm.agencyPanNumber"
                  outlined
                  label="Agency PAN Number"
                  maxlength="10"
                  style="text-transform: uppercase"
                >

                  <template #prepend>
                    <q-icon name="badge" />
                  </template>

                </q-input>

              </div>


              <div class="col-12">

                <DocumentUpload
                  title="Agency PAN Photo"
                  subtitle="Upload PAN card"
                  :preview="agencyForm.agencyPanPhoto"
                  @update="
                    handleDocumentUpload(
                      $event,
                      'agencyPanPhoto'
                    )
                  "
                />

              </div>

            </div>


            <!-- =================================================
                 TAN
            ================================================== -->

            <div class="section-title q-mt-lg">

              <q-icon
                name="description"
                class="q-mr-sm"
              />

              Agency TAN

            </div>


            <div class="row q-col-gutter-md">


              <div class="col-12 col-md-6">

                <q-input
                  v-model="agencyForm.agencyTanNumber"
                  outlined
                  label="Agency TAN Number"
                  maxlength="10"
                  style="text-transform: uppercase"
                >

                  <template #prepend>
                    <q-icon name="numbers" />
                  </template>

                </q-input>

              </div>


              <div class="col-12">

                <DocumentUpload
                  title="Agency TAN Photo"
                  subtitle="Upload TAN document"
                  :preview="agencyForm.agencyTanPhoto"
                  @update="
                    handleDocumentUpload(
                      $event,
                      'agencyTanPhoto'
                    )
                  "
                />

              </div>

            </div>


            <!-- =================================================
                 FSSAI
            ================================================== -->

            <div class="section-title q-mt-lg">

              <q-icon
                name="restaurant"
                class="q-mr-sm"
              />

              Agency FSSAI

            </div>


            <div class="row q-col-gutter-md">


              <div class="col-12 col-md-4">

                <q-input
                  v-model="agencyForm.agencyFssaiNumber"
                  outlined
                  label="Agency FSSAI Number"
                >

                  <template #prepend>
                    <q-icon name="numbers" />
                  </template>

                </q-input>

              </div>


              <div class="col-12 col-md-4">

                <q-input
                  v-model="agencyForm.agencyFssaiExpiry"
                  outlined
                  readonly
                  label="Agency FSSAI Expiry Date"
                >

                  <template #prepend>
                    <q-icon name="event" />
                  </template>


                  <q-popup-proxy cover>

                    <q-date
                      v-model="
                        agencyForm.agencyFssaiExpiry
                      "
                      mask="YYYY-MM-DD"
                    />

                  </q-popup-proxy>

                </q-input>

              </div>


              <div class="col-12">

                <DocumentUpload
                  title="Agency FSSAI Photo"
                  subtitle="Upload FSSAI certificate"
                  :preview="agencyForm.agencyFssaiPhoto"
                  @update="
                    handleDocumentUpload(
                      $event,
                      'agencyFssaiPhoto'
                    )
                  "
                />

              </div>

            </div>


            <!-- =================================================
                 REGISTRATION
            ================================================== -->

            <div class="section-title q-mt-lg">

              <q-icon
                name="app_registration"
                class="q-mr-sm"
              />

              Agency Registration

            </div>


            <div class="row q-col-gutter-md">


              <div class="col-12 col-md-4">

                <q-input
                  v-model="
                    agencyForm.agencyRegistrationNumber
                  "
                  outlined
                  label="Agency Registration Number"
                >

                  <template #prepend>
                    <q-icon name="numbers" />
                  </template>

                </q-input>

              </div>


              <div class="col-12 col-md-4">

                <q-input
                  v-model="
                    agencyForm.agencyRegistrationExpiry
                  "
                  outlined
                  readonly
                  label="Registration Expiry Date"
                >

                  <template #prepend>
                    <q-icon name="event" />
                  </template>


                  <q-popup-proxy cover>

                    <q-date
                      v-model="
                        agencyForm.agencyRegistrationExpiry
                      "
                      mask="YYYY-MM-DD"
                    />

                  </q-popup-proxy>

                </q-input>

              </div>


              <div class="col-12">

                <DocumentUpload
                  title="Agency Registration Photo"
                  subtitle="Upload registration certificate"
                  :preview="
                    agencyForm.agencyRegistrationPhoto
                  "
                  @update="
                    handleDocumentUpload(
                      $event,
                      'agencyRegistrationPhoto'
                    )
                  "
                />

              </div>

            </div>


            <!-- =================================================
                 OTHER DOCUMENT
            ================================================== -->

            <div class="section-title q-mt-lg">

              <q-icon
                name="folder"
                class="q-mr-sm"
              />

              Other Document

            </div>


            <div class="row q-col-gutter-md">


              <div class="col-12 col-md-6">

                <q-input
                  v-model="
                    agencyForm.otherDocumentName
                  "
                  outlined
                  label="Agency Other Document Name"
                >

                  <template #prepend>
                    <q-icon name="description" />
                  </template>

                </q-input>

              </div>


              <div class="col-12">

                <DocumentUpload
                  title="Other Document"
                  subtitle="Upload additional document"
                  :preview="
                    agencyForm.otherDocument
                  "
                  @update="
                    handleDocumentUpload(
                      $event,
                      'otherDocument'
                    )
                  "
                />

              </div>

            </div>


            <!-- =================================================
                 STATUS
            ================================================== -->

            <div class="section-title q-mt-lg">

              <q-icon
                name="toggle_on"
                class="q-mr-sm"
              />

              Account Status

            </div>


            <div class="row q-col-gutter-md">

              <div class="col-12 col-md-6">

                <q-select
                  v-model="agencyForm.status"
                  outlined
                  label="Status"
                  :options="[
                    'Active',
                    'Inactive'
                  ]"
                />

              </div>

            </div>

          </q-card-section>

        </q-scroll-area>


        <!-- =====================================================
             ACTIONS
        ====================================================== -->

        <q-separator />

        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            color="grey"
            label="Cancel"
            v-close-popup
          />

          <q-btn
            unelevated
            color="primary"
            :label="
              editingAgency
                ? 'Update Agency'
                : 'Add Agency'
            "
            @click="saveAgency"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- =====================================================
         VIEW DIALOG
    ====================================================== -->

    <q-dialog v-model="viewDialog">

      <q-card class="view-card">


        <q-card-section class="row items-center">

          <div class="text-h6">
            Agency Details
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


        <q-scroll-area class="view-scroll">

          <q-card-section
            v-if="selectedAgency"
          >


            <!-- PROFILE -->

            <div class="profile-section">

              <q-avatar
                size="110px"
                color="primary"
                text-color="white"
              >

                <img
                  v-if="
                    selectedAgency.agencyPhoto
                  "
                  :src="
                    selectedAgency.agencyPhoto
                  "
                  alt="Agency"
                />

                <span v-else>
                  {{
                    getInitials(
                      selectedAgency.agencyName
                    )
                  }}
                </span>

              </q-avatar>


              <div class="profile-name">

                {{
                  selectedAgency.agencyName
                }}

              </div>


              <q-chip
                dense
                :color="
                  selectedAgency.status ===
                  'Active'
                    ? 'green-1'
                    : 'red-1'
                "
                :text-color="
                  selectedAgency.status ===
                  'Active'
                    ? 'positive'
                    : 'negative'
                "
              >

                {{ selectedAgency.status }}

              </q-chip>

            </div>


            <!-- =================================================
                 PERSONAL DETAILS
            ================================================== -->

            <div class="view-section-title">
              Personal Details
            </div>


            <q-list separator>

              <DetailItem
                icon="badge"
                label="Aadhaar Card"
                :value="
                  maskAadhaar(
                    selectedAgency.aadhaar
                  )
                "
              />

              <DetailItem
                icon="wc"
                label="Gender"
                :value="
                  selectedAgency.gender
                "
              />

              <DetailItem
                icon="map"
                label="State"
                :value="
                  selectedAgency.state
                "
              />

              <DetailItem
                icon="location_city"
                label="City"
                :value="
                  selectedAgency.city
                "
              />

            </q-list>


            <!-- =================================================
                 GST
            ================================================== -->

            <div class="view-section-title">
              GST Details
            </div>


            <q-list separator>

              <DetailItem
                icon="numbers"
                label="GST Number"
                :value="
                  selectedAgency.gstNumber
                "
              />

              <DetailItem
                icon="event"
                label="GST Expiry"
                :value="
                  formatDate(
                    selectedAgency.gstExpiry
                  )
                "
              />

            </q-list>


            <!-- =================================================
                 AGENCY
            ================================================== -->

            <div class="view-section-title">
              Agency Details
            </div>


            <q-list separator>

              <DetailItem
                icon="business"
                label="Agency Name"
                :value="
                  selectedAgency.agencyName
                "
              />

              <DetailItem
                icon="schedule"
                label="Agency Opening"
                :value="
                  selectedAgency.agencyOpening
                "
              />

              <DetailItem
                icon="phone"
                label="Agency Cell Number"
                :value="
                  selectedAgency.agencyCellNumber
                "
              />

              <DetailItem
                icon="email"
                label="Agency Email"
                :value="
                  selectedAgency.agencyEmail
                "
              />

              <DetailItem
                icon="location_on"
                label="Agency Address"
                :value="
                  selectedAgency.agencyAddress
                "
              />

            </q-list>


            <!-- =================================================
                 DOCUMENTS
            ================================================== -->

            <div class="view-section-title">
              Agency Documents
            </div>


            <div class="document-grid">


              <DocumentView
                title="GST Certificate"
                :image="
                  selectedAgency.gstCertificate
                "
              />


              <DocumentView
                title="Agency Certificate"
                :image="
                  selectedAgency.agencyCertificate
                "
              />


              <DocumentView
                title="Agency License"
                :image="
                  selectedAgency.agencyLicensePhoto
                "
              />


              <DocumentView
                title="Agency PAN"
                :image="
                  selectedAgency.agencyPanPhoto
                "
              />


              <DocumentView
                title="Agency TAN"
                :image="
                  selectedAgency.agencyTanPhoto
                "
              />


              <DocumentView
                title="Agency FSSAI"
                :image="
                  selectedAgency.agencyFssaiPhoto
                "
              />


              <DocumentView
                title="Agency Registration"
                :image="
                  selectedAgency.agencyRegistrationPhoto
                "
              />


              <DocumentView
                title="Other Document"
                :image="
                  selectedAgency.otherDocument
                "
              />

            </div>


            <!-- LICENSE -->

            <q-list separator>

              <DetailItem
                icon="card_membership"
                label="License Number"
                :value="
                  selectedAgency.agencyLicenseNumber
                "
              />

              <DetailItem
                icon="event"
                label="License Expiry"
                :value="
                  formatDate(
                    selectedAgency.agencyLicenseExpiry
                  )
                "
              />


              <DetailItem
                icon="badge"
                label="PAN Number"
                :value="
                  selectedAgency.agencyPanNumber
                "
              />


              <DetailItem
                icon="numbers"
                label="TAN Number"
                :value="
                  selectedAgency.agencyTanNumber
                "
              />


              <DetailItem
                icon="restaurant"
                label="FSSAI Number"
                :value="
                  selectedAgency.agencyFssaiNumber
                "
              />


              <DetailItem
                icon="event"
                label="FSSAI Expiry"
                :value="
                  formatDate(
                    selectedAgency.agencyFssaiExpiry
                  )
                "
              />


              <DetailItem
                icon="app_registration"
                label="Registration Number"
                :value="
                  selectedAgency.agencyRegistrationNumber
                "
              />


              <DetailItem
                icon="event"
                label="Registration Expiry"
                :value="
                  formatDate(
                    selectedAgency.agencyRegistrationExpiry
                  )
                "
              />


              <DetailItem
                icon="description"
                label="Other Document Name"
                :value="
                  selectedAgency.otherDocumentName
                "
              />

            </q-list>

          </q-card-section>

        </q-scroll-area>

      </q-card>

    </q-dialog>


    <!-- =====================================================
         DELETE DIALOG
    ====================================================== -->

    <q-dialog v-model="deleteDialog">

      <q-card class="delete-card">

        <q-card-section>

          <div class="text-h6">
            Delete Agency
          </div>

        </q-card-section>


        <q-card-section>

          Are you sure you want to delete

          <strong>
            {{ selectedAgency?.agencyName }}
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
            @click="deleteAgency"
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
   SEARCH / FILTER
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
   OPTIONS
========================================================= */

const genderOptions = [

  'Male',
  'Female',
  'Other'

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
  ],

  'Madhya Pradesh': [
    'Bhopal',
    'Indore',
    'Gwalior',
    'Jabalpur'
  ]

}


const stateOptions =
  Object.keys(stateCities)


const availableCities = computed(() => {

  return agencyForm.value.state
    ? stateCities[
        agencyForm.value.state
      ] || []
    : []

})


/* =========================================================
   TABLE COLUMNS
========================================================= */

const columns = [

  {
    name: 'agency',
    label: 'AGENCY',
    field: 'agencyName',
    align: 'left',
    sortable: true
  },

  {
    name: 'person',
    label: 'PERSON',
    field: 'gender',
    align: 'left'
  },

  {
    name: 'gst',
    label: 'GST',
    field: 'gstNumber',
    align: 'left'
  },

  {
    name: 'license',
    label: 'LICENSE',
    field: 'agencyLicenseNumber',
    align: 'left'
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
    name: 'actions',
    label: 'ACTIONS',
    field: 'actions',
    align: 'right'
  }

]


/* =========================================================
   DEMO DATA
========================================================= */

const agencies = ref([

  {

    id: 1,

    aadhaar: '123456789012',

    photo: '',

    gender: 'Male',

    state: 'Bihar',

    city: 'Buxar',

    gstNumber: '10ABCDE1234F1Z5',

    gstCertificate: '',

    gstExpiry: '2027-08-20',

    agencyName: 'Batohi Travel Agency',

    agencyOpening: '09:00 AM',

    agencyCellNumber: '9876543210',

    agencyEmail: 'batohi@example.com',

    agencyAddress: 'Buxar, Bihar',

    agencyCertificate: '',

    agencyCertificateExpiry: '2028-01-10',

    agencyLicenseNumber: 'LIC123456',

    agencyLicenseExpiry: '2027-12-20',

    agencyLicensePhoto: '',

    agencyPhoto: '',

    agencyPanNumber: 'ABCDE1234F',

    agencyPanPhoto: '',

    agencyTanNumber: 'BLRA12345B',

    agencyTanPhoto: '',

    agencyFssaiNumber: '12345678901234',

    agencyFssaiPhoto: '',

    agencyFssaiExpiry: '2027-10-10',

    agencyRegistrationNumber: 'REG123456',

    agencyRegistrationPhoto: '',

    agencyRegistrationExpiry: '2028-05-15',

    otherDocumentName: '',

    otherDocument: '',

    status: 'Active'

  },

  {

    id: 2,

    aadhaar: '234567890123',

    photo: '',

    gender: 'Female',

    state: 'Uttar Pradesh',

    city: 'Varanasi',

    gstNumber: '09ABCDE5678F1Z2',

    gstCertificate: '',

    gstExpiry: '2027-05-10',

    agencyName: 'Shree Tour & Travels',

    agencyOpening: '10:00 AM',

    agencyCellNumber: '9876543211',

    agencyEmail: 'shree@example.com',

    agencyAddress: 'Varanasi, Uttar Pradesh',

    agencyCertificate: '',

    agencyCertificateExpiry: '2027-12-01',

    agencyLicenseNumber: 'LIC789456',

    agencyLicenseExpiry: '2027-11-20',

    agencyLicensePhoto: '',

    agencyPhoto: '',

    agencyPanNumber: 'BCDEF2345G',

    agencyPanPhoto: '',

    agencyTanNumber: 'BLRA67890C',

    agencyTanPhoto: '',

    agencyFssaiNumber: '98765432101234',

    agencyFssaiPhoto: '',

    agencyFssaiExpiry: '2027-09-20',

    agencyRegistrationNumber: 'REG789456',

    agencyRegistrationPhoto: '',

    agencyRegistrationExpiry: '2028-01-20',

    otherDocumentName: '',

    otherDocument: '',

    status: 'Active'

  }

])


/* =========================================================
   FORM
========================================================= */

const createEmptyForm = () => ({

  id: null,

  aadhaar: '',

  photo: '',

  gender: '',

  state: '',

  city: '',

  gstNumber: '',

  gstCertificate: '',

  gstExpiry: '',

  agencyName: '',

  agencyOpening: '',

  agencyCellNumber: '',

  agencyEmail: '',

  agencyAddress: '',

  agencyCertificate: '',

  agencyCertificateExpiry: '',

  agencyLicenseNumber: '',

  agencyLicenseExpiry: '',

  agencyLicensePhoto: '',

  agencyPhoto: '',

  agencyPanNumber: '',

  agencyPanPhoto: '',

  agencyTanNumber: '',

  agencyTanPhoto: '',

  agencyFssaiNumber: '',

  agencyFssaiPhoto: '',

  agencyFssaiExpiry: '',

  agencyRegistrationNumber: '',

  agencyRegistrationPhoto: '',

  agencyRegistrationExpiry: '',

  otherDocumentName: '',

  otherDocument: '',

  status: 'Active'

})


const agencyForm = ref(
  createEmptyForm()
)


/* =========================================================
   DIALOGS
========================================================= */

const agencyDialog = ref(false)

const viewDialog = ref(false)

const deleteDialog = ref(false)

const editingAgency = ref(false)

const selectedAgency = ref(null)


/* =========================================================
   FILES
========================================================= */

const photoFile = ref(null)

const gstCertificateFile = ref(null)


/* =========================================================
   FILTERED DATA
========================================================= */

const filteredAgencies = computed(() => {

  let result = [
    ...agencies.value
  ]


  if (
    statusFilter.value !== 'all'
  ) {

    result = result.filter(
      agency =>
        agency.status ===
        statusFilter.value
    )

  }


  if (search.value) {

    const keyword =
      search.value
        .toLowerCase()
        .trim()


    result = result.filter(
      agency =>

        agency.agencyName
          ?.toLowerCase()
          .includes(keyword)

        ||

        agency.agencyEmail
          ?.toLowerCase()
          .includes(keyword)

        ||

        agency.agencyCellNumber
          ?.includes(keyword)

        ||

        agency.gstNumber
          ?.toLowerCase()
          .includes(keyword)

        ||

        agency.agencyLicenseNumber
          ?.toLowerCase()
          .includes(keyword)

        ||

        agency.agencyPanNumber
          ?.toLowerCase()
          .includes(keyword)

        ||

        agency.city
          ?.toLowerCase()
          .includes(keyword)

        ||

        agency.state
          ?.toLowerCase()
          .includes(keyword)

    )

  }


  return result

})


/* =========================================================
   STATISTICS
========================================================= */

const totalAgencies = computed(() => {

  return agencies.value.length

})


const activeAgencies = computed(() => {

  return agencies.value.filter(
    agency =>
      agency.status === 'Active'
  ).length

})


const totalCities = computed(() => {

  return new Set(
    agencies.value
      .map(agency => agency.city)
      .filter(Boolean)
  ).size

})


const expiringDocuments = computed(() => {

  let count = 0

  agencies.value.forEach(
    agency => {

      const dates = [

        agency.gstExpiry,

        agency.agencyCertificateExpiry,

        agency.agencyLicenseExpiry,

        agency.agencyFssaiExpiry,

        agency.agencyRegistrationExpiry

      ]


      dates.forEach(date => {

        if (
          date &&
          !isExpired(date)
        ) {

          const diff =
            new Date(date) -
            new Date()

          const days =
            diff /
            (1000 * 60 * 60 * 24)


          if (
            days <= 30 &&
            days >= 0
          ) {

            count++

          }

        }

      })

    }
  )


  return count

})


/* =========================================================
   ADD
========================================================= */

const openAddDialog = () => {

  editingAgency.value = false

  agencyForm.value =
    createEmptyForm()

  photoFile.value = null

  gstCertificateFile.value = null

  agencyDialog.value = true

}


/* =========================================================
   EDIT
========================================================= */

const editAgency = agency => {

  editingAgency.value = true

  agencyForm.value = {
    ...createEmptyForm(),
    ...agency
  }

  photoFile.value = null

  gstCertificateFile.value = null

  agencyDialog.value = true

}


/* =========================================================
   STATE CHANGE
========================================================= */

const onStateChange = () => {

  agencyForm.value.city = ''

}


/* =========================================================
   FILE UPLOAD
========================================================= */

const readFile = file => {

  return new Promise(
    resolve => {

      const reader =
        new FileReader()

      reader.onload =
        event => {

          resolve(
            event.target.result
          )

        }

      reader.readAsDataURL(file)

    }
  )

}


/* =========================================================
   PHOTO UPLOAD
========================================================= */

const handlePhotoUpload = async file => {

  if (!file) return

  agencyForm.value.photo =
    await readFile(file)

}


/* =========================================================
   DOCUMENT UPLOAD
========================================================= */

const handleDocumentUpload = async (
  file,
  field
) => {

  if (!file) return

  agencyForm.value[field] =
    await readFile(file)

}


/* =========================================================
   SAVE
========================================================= */

const saveAgency = () => {


  /* AGENCY NAME */

  if (!agencyForm.value.agencyName) {

    Notify.create({

      type: 'negative',

      message:
        'Agency name is required'

    })

    return

  }


  /* AADHAAR */

  if (
    agencyForm.value.aadhaar &&
    !/^\d{12}$/.test(
      agencyForm.value.aadhaar
    )
  ) {

    Notify.create({

      type: 'negative',

      message:
        'Aadhaar must contain 12 digits'

    })

    return

  }


  /* MOBILE */

  if (
    agencyForm.value.agencyCellNumber &&
    !/^[6-9]\d{9}$/.test(
      agencyForm.value.agencyCellNumber
    )
  ) {

    Notify.create({

      type: 'negative',

      message:
        'Enter valid agency cell number'

    })

    return

  }


  /* EMAIL */

  if (
    agencyForm.value.agencyEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(
        agencyForm.value.agencyEmail
      )
  ) {

    Notify.create({

      type: 'negative',

      message:
        'Enter valid agency email'

    })

    return

  }


  /* UPDATE */

  if (editingAgency.value) {

    const index =
      agencies.value.findIndex(
        agency =>
          agency.id ===
          agencyForm.value.id
      )


    if (index !== -1) {

      agencies.value[index] = {
        ...agencies.value[index],
        ...agencyForm.value
      }

    }


    Notify.create({

      type: 'positive',

      message:
        'Agency updated successfully'

    })

  }


  /* ADD */

  else {

    agencies.value.unshift({

      ...agencyForm.value,

      id: Date.now()

    })


    Notify.create({

      type: 'positive',

      message:
        'Agency added successfully'

    })

  }


  agencyDialog.value = false

}


/* =========================================================
   VIEW
========================================================= */

const viewAgency = agency => {

  selectedAgency.value =
    agency

  viewDialog.value = true

}


/* =========================================================
   DELETE
========================================================= */

const confirmDelete = agency => {

  selectedAgency.value =
    agency

  deleteDialog.value = true

}


const deleteAgency = () => {

  if (!selectedAgency.value) {
    return
  }


  agencies.value =
    agencies.value.filter(
      agency =>
        agency.id !==
        selectedAgency.value.id
    )


  deleteDialog.value = false

  selectedAgency.value = null


  Notify.create({

    type: 'positive',

    message:
      'Agency deleted successfully'

  })

}


/* =========================================================
   INITIALS
========================================================= */

const getInitials = name => {

  if (!name) {
    return 'A'
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
   MASK AADHAAR
========================================================= */

const maskAadhaar = value => {

  if (!value) {
    return '-'
  }


  if (value.length !== 12) {
    return value
  }


  return `XXXX-XXXX-${value.slice(-4)}`

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
   EXPIRY
========================================================= */

const isExpired = date => {

  if (!date) {
    return false
  }


  return new Date(date) <
    new Date()

}


/* =========================================================
   API PLACEHOLDER
========================================================= */

const fetchAgencies = async () => {

  loading.value = true

  try {

    /*
      Connect your backend API here.

      Example:

      const response =
        await axios.get('/agencies')

      agencies.value =
        response.data.data
    */

  }

  catch (error) {

    console.error(
      'Agency API Error:',
      error
    )

  }

  finally {

    loading.value = false

  }

}


/* =========================================================
   MOUNT
========================================================= */

onMounted(() => {

  fetchAgencies()

})

</script>


<!-- =========================================================
     DOCUMENT UPLOAD COMPONENT
========================================================= -->

<script>

import {
  defineComponent,
  h
} from 'vue'


export default defineComponent({

  components: {

    DocumentUpload:
      defineComponent({

        props: {

          title: String,

          subtitle: String,

          preview: String

        },

        emits: [
          'update'
        ],

        setup(
          props,
          { emit }
        ) {

          const onFile =
            file => {

              emit(
                'update',
                file
              )

            }


          return () =>

            h(
              'div',
              {
                class:
                  'document-upload'
              },

              [

                h(
                  'div',
                  {
                    class:
                      'document-preview'
                  },

                  props.preview

                    ?

                    h(
                      'img',
                      {
                        src:
                          props.preview,
                        alt:
                          props.title
                      }
                    )

                    :

                    h(
                      'span',
                      {},
                      'DOC'
                    )

                ),


                h(
                  'div',
                  {
                    class:
                      'document-content'
                  },

                  [

                    h(
                      'div',
                      {
                        class:
                          'document-title'
                      },
                      props.title
                    ),

                    h(
                      'div',
                      {
                        class:
                          'document-subtitle'
                      },
                      props.subtitle
                    ),

                    h(
                      'input',
                      {
                        type:
                          'file',

                        accept:
                          'image/*,.pdf',

                        class:
                          'document-input',

                        onChange:
                          event =>
                            onFile(
                              event
                                .target
                                .files[0]
                            )
                      }
                    )

                  ]

                )

              ]

            )

        }

      }),


    DetailItem:
      defineComponent({

        props: {

          icon: String,

          label: String,

          value: String

        },

        setup(props) {

          return () =>

            h(
              'div',
              {
                class:
                  'detail-item'
              },

              [

                h(
                  'div',
                  {
                    class:
                      'detail-icon'
                  },

                  [
                    h(
                      'span',
                      {
                        class:
                          'material-icons'
                      },
                      props.icon
                    )
                  ]

                ),

                h(
                  'div',
                  {
                    class:
                      'detail-content'
                  },

                  [

                    h(
                      'div',
                      {
                        class:
                          'detail-label'
                      },
                      props.label
                    ),

                    h(
                      'div',
                      {
                        class:
                          'detail-value'
                      },
                      props.value || '-'
                    )

                  ]

                )

              ]

            )

        }

      }),


    DocumentView:
      defineComponent({

        props: {

          title: String,

          image: String

        },

        setup(props) {

          return () =>

            h(
              'div',
              {
                class:
                  'document-view'
              },

              [

                h(
                  'div',
                  {
                    class:
                      'document-view-title'
                  },
                  props.title
                ),

                props.image

                  ?

                  h(
                    'img',
                    {
                      src:
                        props.image,
                      alt:
                        props.title
                    }
                  )

                  :

                  h(
                    'div',
                    {
                      class:
                        'no-document'
                    },
                    'No document uploaded'
                  )

              ]

            )

        }

      })

  }

})

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.agency-page {

  padding: 24px;

  min-height:
    calc(100vh - 64px);

  background: #f5f7fb;

}


/* =====================================================
   HEADER
===================================================== */

.page-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 24px;

}


.page-title {

  font-size: 26px;

  font-weight: 700;

  color: #1f2937;

}


.page-subtitle {

  margin-top: 4px;

  color: #6b7280;

  font-size: 13px;

}


/* =====================================================
   STATISTICS
===================================================== */

.stat-card {

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


.stat-content {

  display: flex;

  align-items: center;

}


.stat-info {

  margin-left: 14px;

}


.stat-label {

  color: #6b7280;

  font-size: 13px;

}


.stat-value {

  margin-top: 3px;

  color: #1f2937;

  font-size: 25px;

  font-weight: 700;

}


/* =====================================================
   TABLE
===================================================== */

.agency-card {

  border-radius: 12px;

  background: #fff;

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

  justify-content: space-between;

  align-items: center;

  gap: 20px;

}


.table-title {

  font-size: 18px;

  font-weight: 700;

}


.table-subtitle {

  color: #9ca3af;

  font-size: 12px;

  margin-top: 3px;

}


.table-actions {

  display: flex;

  gap: 10px;

}


.search-input {

  width: 240px;

}


.status-filter {

  width: 140px;

}


/* =====================================================
   AGENCY
===================================================== */

.agency-info {

  display: flex;

  align-items: center;

}


.agency-details {

  margin-left: 10px;

}


.agency-name {

  font-size: 14px;

  font-weight: 600;

}


.agency-id {

  color: #9ca3af;

  font-size: 11px;

}


.small-text {

  color: #9ca3af;

  font-size: 11px;

  margin-top: 3px;

}


.document-number {

  font-size: 13px;

  font-weight: 500;

}


/* =====================================================
   FORM
===================================================== */

.agency-form-card {

  width: 850px;

  max-width: 96vw;

  border-radius: 14px;

}


.form-scroll {

  height: 72vh;

}


.form-title {

  font-size: 20px;

  font-weight: 700;

}


.form-subtitle {

  margin-top: 3px;

  color: #9ca3af;

  font-size: 12px;

}


.section-title {

  display: flex;

  align-items: center;

  margin-bottom: 16px;

  padding-bottom: 8px;

  border-bottom: 1px solid #e5e7eb;

  color: #1f2937;

  font-size: 16px;

  font-weight: 700;

}


/* =====================================================
   UPLOAD
===================================================== */

.upload-box {

  display: flex;

  align-items: center;

  gap: 20px;

  padding: 18px;

  border-radius: 12px;

  background: #f8fafc;

}


.upload-content {

  flex: 1;

}


.upload-title {

  font-size: 15px;

  font-weight: 600;

}


.upload-description {

  margin: 4px 0 10px;

  color: #9ca3af;

  font-size: 12px;

}


/* =====================================================
   DOCUMENT UPLOAD
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

  width: 100px;

  height: 70px;

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;

  flex-shrink: 0;

  border-radius: 8px;

  background: #eef2ff;

}


.document-preview img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


.document-preview span {

  color: #6366f1;

  font-size: 12px;

  font-weight: 700;

}


.document-content {

  flex: 1;

}


.document-title {

  font-size: 14px;

  font-weight: 600;

}


.document-subtitle {

  margin: 4px 0 10px;

  color: #9ca3af;

  font-size: 12px;

}


.document-input {

  width: 100%;

}


/* =====================================================
   VIEW
===================================================== */

.view-card {

  width: 650px;

  max-width: 96vw;

  border-radius: 14px;

}


.view-scroll {

  height: 75vh;

}


.profile-section {

  display: flex;

  flex-direction: column;

  align-items: center;

  margin-bottom: 25px;

}


.profile-name {

  margin-top: 10px;

  margin-bottom: 5px;

  font-size: 21px;

  font-weight: 700;

}


.view-section-title {

  margin-top: 25px;

  margin-bottom: 10px;

  padding-bottom: 8px;

  border-bottom: 1px solid #e5e7eb;

  font-size: 16px;

  font-weight: 700;

}


/* =====================================================
   DETAIL
===================================================== */

.detail-item {

  display: flex;

  align-items: center;

  padding: 12px 0;

}


.detail-icon {

  width: 42px;

  color: #6366f1;

}


.detail-content {

  flex: 1;

}


.detail-label {

  color: #9ca3af;

  font-size: 11px;

}


.detail-value {

  margin-top: 2px;

  color: #1f2937;

  font-size: 14px;

}


/* =====================================================
   DOCUMENT GRID
===================================================== */

.document-grid {

  display: grid;

  grid-template-columns:
    repeat(
      2,
      1fr
    );

  gap: 15px;

}


.document-view {

  padding: 12px;

  border: 1px solid #e5e7eb;

  border-radius: 10px;

}


.document-view-title {

  margin-bottom: 8px;

  font-size: 13px;

  font-weight: 600;

}


.document-view img {

  width: 100%;

  height: 150px;

  object-fit: contain;

  border-radius: 7px;

  background: #f8fafc;

}


.no-document {

  height: 100px;

  display: flex;

  align-items: center;

  justify-content: center;

  color: #9ca3af;

  background: #f8fafc;

  border-radius: 7px;

  font-size: 12px;

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

@media (max-width: 800px) {

  .agency-page {

    padding: 16px;

  }


  .page-header {

    align-items: flex-start;

    flex-direction: column;

    gap: 15px;

  }


  .table-header {

    align-items: stretch;

    flex-direction: column;

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

  .table-actions {

    flex-direction: column;

  }


  .search-input,

  .status-filter {

    width: 100%;

  }


  .upload-box,

  .document-upload {

    align-items: flex-start;

    flex-direction: column;

  }


  .document-grid {

    grid-template-columns:
      1fr;

  }

}

</style>
```
