<template>
  <q-page class="driver-profile-page q-pa-md">
    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="page-header q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold"> My Profile </div>

        <div class="text-grey-7 q-mt-xs">
          Manage your personal information, documents and agency details
        </div>
      </div>

      <q-btn
        color="primary"
        icon="edit"
        label="Edit Profile"
        no-caps
        unelevated
        class="edit-profile-btn"
        @click="startEdit"
      />
    </div>

    <!-- =====================================================
         PROFILE LAYOUT
    ====================================================== -->
    <div class="row q-col-gutter-lg">
      <!-- ===================================================
           LEFT SIDEBAR
      ==================================================== -->
      <div class="col-12 col-md-4">
        <!-- PROFILE CARD -->
        <q-card class="modern-card profile-main-card">
          <q-card-section class="text-center q-pa-lg">
            <!-- Profile Photo -->
            <div class="profile-image-wrapper">
              <q-avatar size="125px" class="profile-avatar">
                <img
                  v-if="profile.photo"
                  :src="`${imagesBaseUrl}${profile.photo}`"
                  alt="Driver Profile"
                />

                <span v-else class="profile-initials">
                  {{ getInitials(profile.name) }}
                </span>
              </q-avatar>

              <!-- Camera Button -->
              <q-btn
                round
                unelevated
                color="primary"
                icon="photo_camera"
                class="profile-camera-btn"
                @click="openProfilePicker"
              >
                <q-tooltip> Change Profile Photo </q-tooltip>
              </q-btn>

              <input
                ref="profileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleProfilePhoto"
              />
            </div>

            <!-- Name -->
            <div class="text-h6 text-weight-bold q-mt-md">
              {{ profile.name || 'Driver Name' }}
            </div>

            <div class="text-grey-6 q-mt-xs">
              Driver ID: {{ profile.driverId }}
            </div>

            <!-- Active Badge -->
            <q-badge color="positive" rounded class="q-mt-md status-badge">
              <q-icon name="check_circle" size="14px" class="q-mr-xs" />
              Active Driver
            </q-badge>
          </q-card-section>

          <q-separator />

          <!-- Quick Information -->
          <q-card-section class="q-pa-lg">
            <div class="section-mini-title"> Contact Information </div>

            <div class="profile-info-item">
              <div class="info-icon">
                <q-icon name="phone" size="20px" />
              </div>

              <div class="info-content">
                <div class="text-caption text-grey-6"> Phone Number </div>

                <div class="text-weight-medium">
                  {{ profile.phone || 'Not provided' }}
                </div>
              </div>
            </div>

            <div class="profile-info-item">
              <div class="info-icon">
                <q-icon name="email" size="20px" />
              </div>

              <div class="info-content">
                <div class="text-caption text-grey-6"> Email Address </div>

                <div class="text-weight-medium">
                  {{ profile.email || 'Not provided' }}
                </div>
              </div>
            </div>

            <div class="profile-info-item">
              <div class="info-icon">
                <q-icon name="location_on" size="20px" />
              </div>

              <div class="info-content">
                <div class="text-caption text-grey-6"> Location </div>

                <div class="text-weight-medium">
                  {{ profile.city || 'Not provided' }},
                  {{ profile.state || '' }}
                </div>
              </div>
            </div>

            <div class="profile-info-item">
              <div class="info-icon">
                <q-icon name="business" size="20px" />
              </div>

              <div class="info-content">
                <div class="text-caption text-grey-6"> Agency Type </div>

                <div class="text-weight-medium">
                  {{ profile.agencyType }}
                </div>
              </div>
            </div>

            <div class="profile-info-item">
              <div class="info-icon">
                <q-icon name="calendar_month" size="20px" />
              </div>

              <div class="info-content">
                <div class="text-caption text-grey-6"> Joined </div>

                <div class="text-weight-medium">
                  {{ profile.joinedDate }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- =================================================
             DRIVER RATING
        ================================================== -->
        <q-card class="modern-card q-mt-lg">
          <q-card-section class="q-pa-lg">
            <div class="section-heading">
              <div>
                <div class="text-subtitle1 text-weight-bold">
                  Driver Rating
                </div>

                <div class="text-caption text-grey-6"> Customer feedback </div>
              </div>

              <q-icon name="star" color="amber" size="28px" />
            </div>

            <div class="rating-container q-mt-lg">
              <div class="rating-number">
                {{ profile.rating }}
              </div>

              <div class="q-ml-md">
                <div class="rating-stars">
                  <q-icon
                    v-for="star in 5"
                    :key="star"
                    name="star"
                    :color="
                      star <= Math.round(profile.rating) ? 'amber' : 'grey-4'
                    "
                    size="21px"
                  />
                </div>

                <div class="text-caption text-grey-6 q-mt-xs">
                  {{ profile.totalReviews }} customer reviews
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- ===================================================
           RIGHT CONTENT
      ==================================================== -->
      <div class="col-12 col-md-8">
        <!-- =================================================
             PERSONAL INFORMATION
        ================================================== -->
        <q-card class="modern-card q-mb-lg">
          <q-card-section class="card-header">
            <div class="section-heading">
              <div class="section-icon">
                <q-icon name="person" size="22px" />
              </div>

              <div>
                <div class="text-h6 text-weight-bold">
                  Personal Information
                </div>

                <div class="text-caption text-grey-6">
                  Your basic personal information
                </div>
              </div>
            </div>

            <q-btn flat round icon="edit" color="primary" @click="startEdit">
              <q-tooltip> Edit Information </q-tooltip>
            </q-btn>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="row q-col-gutter-md">
              <!-- Full Name -->
              <div class="col-12 col-md-6">
                <q-input
                  v-model="profile.name"
                  label="Full Name"
                  outlined
                  dense
                  :readonly="!editMode"
                >
                  <template #prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <!-- Phone -->
              <div class="col-12 col-md-6">
                <q-input
                  v-model="profile.phone"
                  label="Phone Number"
                  outlined
                  dense
                  :readonly="!editMode"
                >
                  <template #prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <!-- Email -->
              <div class="col-12 col-md-6">
                <q-input
                  v-model="profile.email"
                  label="Email Address"
                  outlined
                  dense
                  type="email"
                  :readonly="!editMode"
                >
                  <template #prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>

              <!-- Aadhaar -->
              <div class="col-12 col-md-6">
                <q-input
                  v-model="profile.aadharNumber"
                  label="Aadhaar Card Number"
                  outlined
                  dense
                  maxlength="12"
                  :readonly="!editMode"
                >
                  <template #prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <!-- DOB -->
              <div class="col-12 col-md-6">
                <q-input
                  v-model="profile.dateOfBirth"
                  label="Date of Birth"
                  outlined
                  dense
                  :readonly="!editMode"
                >
                  <template #prepend>
                    <q-icon name="cake" />
                  </template>

                  <template #append>
                    <q-icon v-if="editMode" name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="profile.dateOfBirth"
                          mask="YYYY-MM-DD"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <!-- Gender -->
              <div class="col-12 col-md-6">
                <q-select
                  v-model="profile.gender"
                  :options="genderOptions"
                  label="Gender"
                  outlined
                  dense
                  :readonly="!editMode"
                >
                  <template #prepend>
                    <q-icon name="wc" />
                  </template>
                </q-select>
              </div>

              <!-- Agency Type -->
              <div class="col-12 col-md-6">
                <q-select
                  v-model="profile.agencyType"
                  :options="agencyTypeOptions"
                  label="Agency Type"
                  outlined
                  dense
                  :readonly="!editMode"
                >
                  <template #prepend>
                    <q-icon name="business_center" />
                  </template>
                </q-select>
              </div>

              <!-- State -->
              <div class="col-12 col-md-6">
                <q-select
                  v-model="profile.state"
                  :options="stateOptions"
                  label="State"
                  outlined
                  dense
                  :readonly="!editMode"
                >
                  <template #prepend>
                    <q-icon name="map" />
                  </template>
                </q-select>
              </div>

              <!-- City -->
              <div class="col-12 col-md-6">
                <q-input
                  v-model="profile.city"
                  label="City"
                  outlined
                  dense
                  :readonly="!editMode"
                >
                  <template #prepend>
                    <q-icon name="location_city" />
                  </template>
                </q-input>
              </div>

              <!-- Address -->
              <div class="col-12">
                <q-input
                  v-model="profile.address"
                  label="Address"
                  outlined
                  dense
                  type="textarea"
                  rows="2"
                  :readonly="!editMode"
                >
                  <template #prepend>
                    <q-icon name="home" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>

          <!-- Save Actions -->
          <q-card-actions v-if="editMode" align="right" class="q-pa-lg">
            <q-btn
              flat
              label="Cancel"
              color="grey-7"
              no-caps
              @click="cancelEdit"
            />

            <q-btn
              color="primary"
              icon="save"
              label="Save Changes"
              no-caps
              unelevated
              :loading="saving"
              @click="saveProfile"
            />
          </q-card-actions>
        </q-card>

        <!-- =================================================
             AADHAAR CARD
        ================================================== -->
        <q-card class="modern-card q-mb-lg">
          <q-card-section class="card-header">
            <div class="section-heading">
              <div class="section-icon">
                <q-icon name="badge" size="22px" />
              </div>

              <div>
                <div class="text-h6 text-weight-bold"> Aadhaar Card </div>

                <div class="text-caption text-grey-6">
                  Aadhaar identification document
                </div>
              </div>
            </div>

            <q-badge color="positive" rounded>
              <q-icon name="verified" size="14px" class="q-mr-xs" />
              Verified
            </q-badge>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  v-model="profile.aadharNumber"
                  label="Aadhaar Card Number"
                  outlined
                  dense
                  readonly
                >
                  <template #prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <!-- Aadhaar Photo -->
              <div class="col-12 col-md-6">
                <div class="document-upload-box">
                  <div class="document-icon">
                    <q-icon name="description" size="30px" />
                  </div>

                  <div class="document-details">
                    <div class="text-weight-medium"> Aadhaar Card Photo </div>

                    <div class="text-caption text-grey-6">
                      {{ profile.aadharPhoto ? 'Uploaded' : 'Not uploaded' }}
                    </div>
                  </div>

                  <q-btn
                    outline
                    color="primary"
                    icon="upload"
                    label="Upload"
                    no-caps
                    @click="openAadharPicker"
                  />

                  <input
                    ref="aadharInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleAadharPhoto"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- =================================================
             PAN CARD
        ================================================== -->
        <q-card class="modern-card q-mb-lg">
          <q-card-section class="card-header">
            <div class="section-heading">
              <div class="section-icon">
                <q-icon name="credit_card" size="22px" />
              </div>

              <div>
                <div class="text-h6 text-weight-bold"> PAN Card </div>

                <div class="text-caption text-grey-6">
                  Permanent Account Number identification document
                </div>
              </div>
            </div>

            <q-badge color="positive" rounded>
              <q-icon name="verified" size="14px" class="q-mr-xs" />
              Verified
            </q-badge>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="row q-col-gutter-md">
              <!-- PAN Number -->
              <div class="col-12 col-md-6">
                <q-input
                  v-model="profile.panNumber"
                  label="PAN Card Number"
                  outlined
                  dense
                  maxlength="10"
                  readonly
                >
                  <template #prepend>
                    <q-icon name="credit_card" />
                  </template>
                </q-input>
              </div>

              <!-- PAN Photo -->
              <div class="col-12 col-md-6">
                <div class="document-upload-box">
                  <div class="document-icon">
                    <q-icon name="description" size="30px" />
                  </div>

                  <div class="document-details">
                    <div class="text-weight-medium"> PAN Card Photo </div>

                    <div class="text-caption text-grey-6">
                      {{ profile.panPhoto ? 'Uploaded' : 'Not uploaded' }}
                    </div>
                  </div>

                  <q-btn
                    outline
                    color="primary"
                    icon="upload"
                    label="Upload"
                    no-caps
                    @click="openPanPicker"
                  />

                  <input
                    ref="panInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handlePanPhoto"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- =================================================
             DRIVING LICENSE
        ================================================== -->
        <q-card class="modern-card q-mb-lg">
          <q-card-section class="card-header">
            <div class="section-heading">
              <div class="section-icon">
                <q-icon name="directions_car" size="22px" />
              </div>

              <div>
                <div class="text-h6 text-weight-bold"> Driving License </div>

                <div class="text-caption text-grey-6">
                  Your driving license information
                </div>
              </div>
            </div>

            <q-badge color="positive" rounded>
              <q-icon name="verified" size="14px" class="q-mr-xs" />
              Verified
            </q-badge>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="row q-col-gutter-md">
              <!-- License Number -->
              <div class="col-12 col-md-6">
                <q-input
                  v-model="profile.licenseNumber"
                  label="License Number"
                  outlined
                  dense
                  readonly
                >
                  <template #prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <!-- License Expiry -->
              <div class="col-12 col-md-6">
                <q-input
                  v-model="profile.licenseExpiry"
                  label="License Expiry Date"
                  outlined
                  dense
                  readonly
                >
                  <template #prepend>
                    <q-icon name="event" />
                  </template>
                </q-input>
              </div>

              <!-- License Photo -->
              <div class="col-12">
                <div class="document-upload-box">
                  <div class="document-icon">
                    <q-icon name="credit_card" size="30px" />
                  </div>

                  <div class="document-details">
                    <div class="text-weight-medium">
                      Driving License Photo
                    </div>

                    <div class="text-caption text-grey-6">
                      {{
                        profile.licensePhoto
                          ? 'License photo uploaded'
                          : 'Upload license photo'
                      }}
                    </div>
                  </div>

                  <q-btn
                    outline
                    color="primary"
                    icon="upload"
                    label="Upload"
                    no-caps
                    @click="openLicensePicker"
                  />

                  <input
                    ref="licenseInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleLicensePhoto"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- =================================================
             VEHICLE INSURANCE
        ================================================== -->
        <q-card class="modern-card q-mb-lg">
          <q-card-section class="card-header">
            <div class="section-heading">
              <div class="section-icon">
                <q-icon name="shield" size="22px" />
              </div>

              <div>
                <div class="text-h6 text-weight-bold"> Vehicle Insurance </div>

                <div class="text-caption text-grey-6">
                  Vehicle insurance information
                </div>
              </div>
            </div>

            <q-badge :color="insuranceStatusColor" rounded>
              {{ insuranceStatus }}
            </q-badge>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="row q-col-gutter-md">
              <!-- Insurance Number -->
              <div class="col-12 col-md-6">
                <q-input
                  v-model="profile.insuranceNumber"
                  label="Insurance Number"
                  outlined
                  dense
                  :readonly="!editMode"
                >
                  <template #prepend>
                    <q-icon name="confirmation_number" />
                  </template>
                </q-input>
              </div>

              <!-- Insurance Expiry -->
              <div class="col-12 col-md-6">
                <q-input
                  v-model="profile.insuranceExpiry"
                  label="Insurance Expiry Date"
                  outlined
                  dense
                  :readonly="!editMode"
                >
                  <template #prepend>
                    <q-icon name="event" />
                  </template>

                  <template #append>
                    <q-icon v-if="editMode" name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="profile.insuranceExpiry"
                          mask="YYYY-MM-DD"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <!-- Insurance Photo -->
              <div class="col-12">
                <div class="document-upload-box">
                  <div class="document-icon insurance-icon">
                    <q-icon name="security" size="30px" />
                  </div>

                  <div class="document-details">
                    <div class="text-weight-medium"> Insurance Document </div>

                    <div class="text-caption text-grey-6">
                      {{
                        profile.insurancePhoto
                          ? 'Insurance document uploaded'
                          : 'Upload insurance document'
                      }}
                    </div>
                  </div>

                  <q-btn
                    outline
                    color="primary"
                    icon="upload"
                    label="Upload"
                    no-caps
                    @click="openInsurancePicker"
                  />

                  <input
                    ref="insuranceInput"
                    type="file"
                    accept="image/*,.pdf"
                    class="hidden"
                    @change="handleInsurancePhoto"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- =================================================
             ACCOUNT SECURITY
        ================================================== -->
        <q-card class="modern-card">
          <q-card-section class="card-header">
            <div class="section-heading">
              <div class="section-icon">
                <q-icon name="security" size="22px" />
              </div>

              <div>
                <div class="text-h6 text-weight-bold"> Account Security </div>

                <div class="text-caption text-grey-6">
                  Manage your account security
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-list separator>
            <q-item
              clickable
              v-ripple
              @click="changePassword"
              class="security-item"
            >
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" icon="lock" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-medium">
                  Change Password
                </q-item-label>

                <q-item-label caption>
                  Update your account password
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="chevron_right" color="grey-6" />
              </q-item-section>
            </q-item>

            <q-item class="security-item">
              <q-item-section avatar>
                <q-avatar
                  color="grey-3"
                  text-color="grey-8"
                  icon="verified_user"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-medium">
                  Account Status
                </q-item-label>

                <q-item-label caption>
                  Your driver account is active
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-badge color="positive" label="Active" rounded />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- =====================================================
         CHANGE PASSWORD DIALOG
    ====================================================== -->
    <q-dialog v-model="passwordDialog">
      <q-card class="password-dialog">
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="text-h6 text-weight-bold"> Change Password </div>

            <div class="text-caption text-grey-6">
              Update your account password
            </div>
          </div>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-lg">
          <!-- Current Password -->
          <q-input
            v-model="passwordForm.currentPassword"
            outlined
            dense
            label="Current Password"
            :type="showCurrentPassword ? 'text' : 'password'"
            class="q-mb-md"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>

            <template #append>
              <q-icon
                :name="showCurrentPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showCurrentPassword = !showCurrentPassword"
              />
            </template>
          </q-input>

          <!-- New Password -->
          <q-input
            v-model="passwordForm.newPassword"
            outlined
            dense
            label="New Password"
            :type="showNewPassword ? 'text' : 'password'"
            class="q-mb-md"
          >
            <template #prepend>
              <q-icon name="lock_reset" />
            </template>

            <template #append>
              <q-icon
                :name="showNewPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showNewPassword = !showNewPassword"
              />
            </template>
          </q-input>

          <!-- Confirm Password -->
          <q-input
            v-model="passwordForm.confirmPassword"
            outlined
            dense
            label="Confirm New Password"
            :type="showConfirmPassword ? 'text' : 'password'"
          >
            <template #prepend>
              <q-icon name="lock_reset" />
            </template>

            <template #append>
              <q-icon
                :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </q-input>

          <div class="password-hint q-mt-md">
            <q-icon name="info" size="18px" />

            <span> Password must contain at least 6 characters. </span>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-lg">
          <q-btn flat label="Cancel" color="grey-7" no-caps v-close-popup />

          <q-btn
            color="primary"
            label="Update Password"
            icon="lock"
            no-caps
            unelevated
            :loading="changingPassword"
            @click="updatePassword"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

import { Notify } from 'quasar'
import api, { imagesBaseUrl } from '@/config/api'

/* =====================================================
   STATE
===================================================== */

const editMode = ref(false)

const saving = ref(false)

const changingPassword = ref(false)

const passwordDialog = ref(false)

/* =====================================================
   FILE INPUTS
===================================================== */

const profileInput = ref(null)

const aadharInput = ref(null)

const panInput = ref(null)

const licenseInput = ref(null)

const insuranceInput = ref(null)

/* =====================================================
   PASSWORD VISIBILITY
===================================================== */

const showCurrentPassword = ref(false)

const showNewPassword = ref(false)

const showConfirmPassword = ref(false)

/* =====================================================
   PROFILE DATA
===================================================== */

const profile = reactive({
  name: '',
  driverId: '',
  phone: '',
  email: '',
  photo: '',

  aadharNumber: '',
  aadharPhoto: '',

  panNumber: '',
  panPhoto: '',

  dateOfBirth: '',
  gender: '',

  agencyType: '',
  state: '',
  city: '',
  address: '',

  joinedDate: '',

  rating: 0,
  totalReviews: 0,

  licenseNumber: '',
  licenseExpiry: '',
  licensePhoto: '',

  insuranceNumber: '',
  insuranceExpiry: '',
  insurancePhoto: ''
})

const fetchProfileData = async () => {
  try {
    const response = await api.get('/driver/profile')

    console.log('Profile API Response:', response.data)

    const driver = response.data?.data

    if (!driver) {
      console.error('Driver data not found')
      return
    }

    // ==========================================
    // BASIC PROFILE
    // ==========================================

    profile.name = `${driver.first_name || ''} ${driver.last_name || ''}`.trim()

    profile.driverId = driver.driver_code || ''

    profile.phone = driver.mobile_number || ''

    profile.email = driver.email || ''

    profile.photo = driver.profile_image || ''

    // ==========================================
    // AADHAAR
    // ==========================================

    profile.aadharNumber = driver.aadhaar_number || ''

    profile.aadharPhoto = driver.aadhaar_image || ''

    // ==========================================
    // PAN
    // ==========================================

    profile.panNumber = driver.pan_number || ''

    profile.panPhoto = driver.pan_image || ''

    // ==========================================
    // PERSONAL DETAILS
    // ==========================================

    profile.dateOfBirth = driver.date_of_birth || ''

    profile.gender = driver.gender || ''

    // ==========================================
    // LOCATION
    // ==========================================

    profile.state = driver.state || ''

    profile.city = driver.city || ''

    profile.address = driver.address || ''

    // ==========================================
    // DRIVER DETAILS
    // ==========================================

    profile.licenseNumber = driver.driving_license_no || ''

    profile.licenseExpiry = driver.license_expiry_date || ''

    profile.licensePhoto = driver.license_image || ''

    // ==========================================
    // RATING
    // ==========================================

    profile.rating = Number(driver.rating || 0)

    profile.totalReviews = Number(driver.total_rides || 0)

    // ==========================================
    // JOINED DATE
    // ==========================================

    if (driver.created_at) {
      profile.joinedDate = new Date(driver.created_at).toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      )
    }

    // ==========================================
    // AGENCY TYPE
    // ==========================================

    // API response mein agencyType nahi hai.
    // Isliye currently default value rakhi hai.
    profile.agencyType = 'Owner'

    // ==========================================
    // INSURANCE
    // ==========================================

    // API response mein insurance fields nahi hain.
    // Jab backend se aayenge tab map kar sakte hain.

    profile.insuranceNumber = driver.insurance_number || ''

    profile.insuranceExpiry = driver.insurance_expiry_date || ''

    profile.insurancePhoto = driver.insurance_image || ''

    console.log('Mapped Profile:', profile)
  } catch (error) {
    console.error('Error fetching driver profile:', error)
  }
}

onMounted(() => {
  fetchProfileData()
})

/* =====================================================
   ORIGINAL PROFILE
===================================================== */

const originalProfile = ref(null)

/* =====================================================
   OPTIONS
===================================================== */

const genderOptions = ['Male', 'Female', 'Other']

const agencyTypeOptions = ['Owner', 'Agent']

const stateOptions = [
  'Bihar',
  'Uttar Pradesh',
  'Jharkhand',
  'West Bengal',
  'Delhi',
  'Madhya Pradesh',
  'Rajasthan',
  'Maharashtra'
]

/* =====================================================
   PASSWORD FORM
===================================================== */

const passwordForm = reactive({
  currentPassword: '',

  newPassword: '',

  confirmPassword: ''
})

/* =====================================================
   INSURANCE STATUS
===================================================== */

const insuranceStatus = computed(() => {
  if (!profile.insuranceExpiry) {
    return 'Not Available'
  }

  const today = new Date()

  const expiry = new Date(profile.insuranceExpiry)

  if (expiry < today) {
    return 'Expired'
  }

  return 'Active'
})

const insuranceStatusColor = computed(() => {
  if (insuranceStatus.value === 'Expired') {
    return 'negative'
  }

  if (insuranceStatus.value === 'Active') {
    return 'positive'
  }

  return 'grey'
})

/* =====================================================
   INITIALS
===================================================== */

function getInitials(name) {
  if (!name) {
    return 'D'
  }

  return name
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

/* =====================================================
   START EDIT
===================================================== */

function startEdit() {
  originalProfile.value = {
    ...profile
  }

  editMode.value = true
}

/* =====================================================
   CANCEL EDIT
===================================================== */

function cancelEdit() {
  if (originalProfile.value) {
    Object.assign(profile, originalProfile.value)
  }

  editMode.value = false
}

/* =====================================================
   SAVE PROFILE
===================================================== */

async function saveProfile() {
  if (!profile.name?.trim()) {
    Notify.create({
      type: 'warning',
      message: 'Please enter your full name'
    })

    return
  }

  if (!profile.phone?.trim()) {
    Notify.create({
      type: 'warning',
      message: 'Please enter your phone number'
    })

    return
  }

  if (profile.aadharNumber && profile.aadharNumber.length !== 12) {
    Notify.create({
      type: 'warning',
      message: 'Aadhaar number must contain 12 digits'
    })

    return
  }

  if (
    profile.panNumber &&
    !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(profile.panNumber)
  ) {
    Notify.create({
      type: 'warning',
      message: 'Please enter a valid PAN number'
    })

    return
  }

  saving.value = true

  try {
    /*
      Connect API here:

      await api.put(
        '/driver/profile',
        profile
      )
    */

    await new Promise(resolve => setTimeout(resolve, 700))

    originalProfile.value = {
      ...profile
    }

    editMode.value = false

    Notify.create({
      type: 'positive',
      message: 'Profile updated successfully',
      icon: 'check_circle'
    })
  } catch (error) {
    console.error('Profile Update Error:', error)

    Notify.create({
      type: 'negative',
      message: 'Unable to update profile'
    })
  } finally {
    saving.value = false
  }
}

/* =====================================================
   PROFILE PHOTO
===================================================== */

function openProfilePicker() {
  profileInput.value?.click()
}

function handleProfilePhoto(event) {
  const file = event.target.files?.[0]

  if (!file) return

  if (!file.type.startsWith('image/')) {
    Notify.create({
      type: 'warning',
      message: 'Please select an image file'
    })

    return
  }

  if (file.size > 5 * 1024 * 1024) {
    Notify.create({
      type: 'warning',
      message: 'Image size must be less than 5 MB'
    })

    return
  }

  profile.photo = URL.createObjectURL(file)

  Notify.create({
    type: 'positive',
    message: 'Profile photo selected'
  })
}

/* =====================================================
   AADHAAR PHOTO
===================================================== */

function openAadharPicker() {
  aadharInput.value?.click()
}

function handleAadharPhoto(event) {
  const file = event.target.files?.[0]

  if (!file) return

  if (!file.type.startsWith('image/')) {
    Notify.create({
      type: 'warning',
      message: 'Please select an Aadhaar image'
    })

    return
  }

  if (file.size > 5 * 1024 * 1024) {
    Notify.create({
      type: 'warning',
      message: 'Image size must be less than 5 MB'
    })

    return
  }

  profile.aadharPhoto = URL.createObjectURL(file)

  Notify.create({
    type: 'positive',
    message: 'Aadhaar card photo selected'
  })
}

/* =====================================================
   PAN PHOTO
===================================================== */

function openPanPicker() {
  panInput.value?.click()
}

function handlePanPhoto(event) {
  const file = event.target.files?.[0]

  if (!file) return

  if (!file.type.startsWith('image/')) {
    Notify.create({
      type: 'warning',
      message: 'Please select a PAN card image'
    })

    return
  }

  if (file.size > 5 * 1024 * 1024) {
    Notify.create({
      type: 'warning',
      message: 'Image size must be less than 5 MB'
    })

    return
  }

  profile.panPhoto = URL.createObjectURL(file)

  Notify.create({
    type: 'positive',
    message: 'PAN card photo selected'
  })
}

/* =====================================================
   LICENSE PHOTO
===================================================== */

function openLicensePicker() {
  licenseInput.value?.click()
}

function handleLicensePhoto(event) {
  const file = event.target.files?.[0]

  if (!file) return

  if (!file.type.startsWith('image/')) {
    Notify.create({
      type: 'warning',
      message: 'Please select a license image'
    })

    return
  }

  if (file.size > 5 * 1024 * 1024) {
    Notify.create({
      type: 'warning',
      message: 'Image size must be less than 5 MB'
    })

    return
  }

  profile.licensePhoto = URL.createObjectURL(file)

  Notify.create({
    type: 'positive',
    message: 'License photo selected'
  })
}

/* =====================================================
   INSURANCE PHOTO
===================================================== */

function openInsurancePicker() {
  insuranceInput.value?.click()
}

function handleInsurancePhoto(event) {
  const file = event.target.files?.[0]

  if (!file) return

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf'
  ]

  if (!allowedTypes.includes(file.type)) {
    Notify.create({
      type: 'warning',
      message: 'Please select an image or PDF file'
    })

    return
  }

  if (file.size > 5 * 1024 * 1024) {
    Notify.create({
      type: 'warning',
      message: 'File size must be less than 5 MB'
    })

    return
  }

  profile.insurancePhoto = URL.createObjectURL(file)

  Notify.create({
    type: 'positive',
    message: 'Insurance document selected'
  })
}

/* =====================================================
   CHANGE PASSWORD
===================================================== */

function changePassword() {
  passwordForm.currentPassword = ''

  passwordForm.newPassword = ''

  passwordForm.confirmPassword = ''

  showCurrentPassword.value = false

  showNewPassword.value = false

  showConfirmPassword.value = false

  passwordDialog.value = true
}

/* =====================================================
   UPDATE PASSWORD
===================================================== */

async function updatePassword() {
  if (!passwordForm.currentPassword) {
    Notify.create({
      type: 'warning',
      message: 'Enter your current password'
    })

    return
  }

  if (!passwordForm.newPassword) {
    Notify.create({
      type: 'warning',
      message: 'Enter a new password'
    })

    return
  }

  if (passwordForm.newPassword.length < 6) {
    Notify.create({
      type: 'warning',
      message: 'Password must contain at least 6 characters'
    })

    return
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    Notify.create({
      type: 'negative',
      message: 'Passwords do not match'
    })

    return
  }

  changingPassword.value = true

  try {
    /*
      Connect API here:

      await api.put(
        '/driver/change-password',
        passwordForm
      )
    */

    await new Promise(resolve => setTimeout(resolve, 700))

    passwordDialog.value = false

    Notify.create({
      type: 'positive',
      message: 'Password changed successfully',
      icon: 'check_circle'
    })
  } catch (error) {
    console.error('Password Error:', error)

    Notify.create({
      type: 'negative',
      message: 'Unable to change password'
    })
  } finally {
    changingPassword.value = false
  }
}

/* =====================================================
   LOAD PROFILE
===================================================== */

async function loadProfile() {
  /*
    Connect API here:

    const response =
      await api.get('/driver/profile')

    Object.assign(
      profile,
      response.data.data
    )
  */
}

/* =====================================================
   MOUNT
===================================================== */

onMounted(() => {
  originalProfile.value = {
    ...profile
  }

  loadProfile()
})
</script>

<style scoped>
/* =====================================================
   PAGE
===================================================== */

.driver-profile-page {
  min-height: 100%;
  background: #f6f8fb;
}

/* =====================================================
   PAGE HEADER
===================================================== */

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.edit-profile-btn {
  border-radius: 9px;
  padding: 9px 18px;
}

/* =====================================================
   MODERN CARD
===================================================== */

.modern-card {
  border-radius: 16px;
  border: 1px solid #e8ecf2;
  background: #ffffff;
  box-shadow: 0 4px 18px rgba(20, 40, 80, 0.04);
  overflow: hidden;
}

/* =====================================================
   PROFILE CARD
===================================================== */

.profile-main-card {
  position: relative;
}

/* =====================================================
   PROFILE PHOTO
===================================================== */

.profile-image-wrapper {
  position: relative;
  display: inline-block;
}

.profile-avatar {
  background: #e9efff;
  color: #1976d2;
  border: 5px solid #ffffff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-initials {
  font-size: 36px;
  font-weight: 700;
}

.profile-camera-btn {
  position: absolute;
  right: 2px;
  bottom: 3px;
  width: 40px;
  height: 40px;
  border: 3px solid #ffffff;
}

/* =====================================================
   STATUS
===================================================== */

.status-badge {
  padding: 6px 11px;
  font-size: 12px;
}

/* =====================================================
   SECTION TITLES
===================================================== */

.section-mini-title {
  font-size: 12px;
  font-weight: 700;
  color: #8a94a6;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 12px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 13px;
}

.section-icon {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: #edf3ff;
  color: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* =====================================================
   CARD HEADER
===================================================== */

.card-header {
  min-height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

/* =====================================================
   PROFILE INFORMATION
===================================================== */

.profile-info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid #f0f2f5;
}

.profile-info-item:last-child {
  border-bottom: none;
}

.info-icon {
  width: 38px;
  height: 38px;
  min-width: 38px;
  border-radius: 10px;
  background: #f1f5fb;
  color: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-content {
  min-width: 0;
  overflow: hidden;
}

.info-content .text-weight-medium {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* =====================================================
   RATING
===================================================== */

.rating-container {
  display: flex;
  align-items: center;
}

.rating-number {
  font-size: 40px;
  line-height: 1;
  font-weight: 800;
  color: #202733;
}

.rating-stars {
  display: flex;
  align-items: center;
  gap: 2px;
}

/* =====================================================
   DOCUMENT UPLOAD
===================================================== */

.document-upload-box {
  min-height: 76px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 15px;
  border: 1px dashed #cfd6e2;
  border-radius: 12px;
  background: #fafbfd;
}

.document-icon {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 10px;
  background: #edf3ff;
  color: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.insurance-icon {
  background: #eef8f2;
  color: #21a366;
}

.document-details {
  flex: 1;
  min-width: 0;
}

.document-details .text-weight-medium {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* =====================================================
   SECURITY
===================================================== */

.security-item {
  min-height: 78px;
  padding: 10px 20px;
}

/* =====================================================
   PASSWORD DIALOG
===================================================== */

.password-dialog {
  width: 460px;
  max-width: 95vw;
  border-radius: 16px;
}

/* =====================================================
   PASSWORD HINT
===================================================== */

.password-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #f2f6ff;
  color: #667085;
  font-size: 12px;
}

/* =====================================================
   INPUT IMPROVEMENTS
===================================================== */

:deep(.q-field--outlined .q-field__control) {
  border-radius: 9px;
}

:deep(.q-field--readonly .q-field__control) {
  background: #fafbfc;
}

:deep(.q-field__prepend) {
  color: #7c8798;
}

/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 768px) {
  .driver-profile-page {
    padding: 12px !important;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .edit-profile-btn {
    width: 100%;
  }

  .card-header {
    align-items: flex-start;
  }

  .document-upload-box {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .modern-card {
    border-radius: 12px;
  }

  .profile-avatar {
    width: 105px !important;
    height: 105px !important;
  }

  .profile-initials {
    font-size: 30px;
  }

  .profile-camera-btn {
    width: 36px;
    height: 36px;
  }

  .rating-number {
    font-size: 34px;
  }

  .document-upload-box {
    align-items: flex-start;
  }
}
</style>
