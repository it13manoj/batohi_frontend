<template>
  <q-page class="profile-page">

    <!-- =====================================================
     PAGE HEADER
====================================================== -->

    <div class="page-header">
      <div>
        <div class="page-title"> My Profile </div>

        <div class="page-subtitle">
          Manage your personal information and account settings
        </div>
      </div>

      <q-btn
        flat
        color="primary"
        icon="arrow_back"
        label="Back to Dashboard"
        @click="goBack"
      />
    </div>

    <!-- =====================================================
     PROFILE CONTAINER
====================================================== -->

    <div class="profile-container">
      <q-card class="profile-card">
        <!-- =================================================
         PROFILE HERO
    ================================================== -->

        <div class="profile-hero">
          <div class="hero-background"></div>

          <div class="profile-top">
            <!-- PROFILE PHOTO -->

            <div class="profile-image-wrapper">
              <img
                :src="profileImage"
                alt="Profile Photo"
                class="profile-image"
                @error="(e) => e.target.src = ''"
              />

              <q-btn
                round
                unelevated
                color="primary"
                icon="photo_camera"
                class="camera-button"
                @click="openFilePicker"
              >
                <q-tooltip> Change Profile Photo </q-tooltip>
              </q-btn>

              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden-file"
                style="display: none;"
                @change="handleImageUpload"
              />
            </div>
                    <!-- BASIC INFORMATION -->

            <div class="profile-basic">
              <div class="profile-name">
                {{ form.name || 'Customer Name' }}
              </div>

              <div class="profile-email">
                <q-icon name="email" size="16px" class="q-mr-xs" />

                {{ form.email || 'customer@example.com' }}
              </div>

              <div class="profile-mobile">
                <q-icon name="phone" size="16px" class="q-mr-xs" />

                {{ form.mobile || 'Mobile Number' }}
              </div>

              <q-badge color="positive" class="active-badge">
                <q-icon name="check_circle" size="14px" class="q-mr-xs" />

                Active Account
              </q-badge>
            </div>

            <!-- EDIT ACTION -->

            <div class="profile-action">
              <q-btn
                v-if="!editMode"
                outline
                color="primary"
                icon="edit"
                label="Edit Profile"
                @click="startEdit"
              />

              <div v-else class="edit-actions">
                <q-btn flat color="grey-7" label="Cancel" @click="cancelEdit" />

                <q-btn
                  unelevated
                  color="primary"
                  icon="save"
                  label="Save Changes"
                  :loading="saving"
                  @click="saveProfile"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- =================================================
         PERSONAL INFORMATION
    ================================================== -->

        <q-card-section class="section-padding">
          <div class="section-heading">
            <div class="section-icon blue-icon">
              <q-icon name="person" size="22px" />
            </div>

            <div>
              <div class="section-title"> Personal Information </div>

              <div class="section-description">
                Your basic personal and identity details
              </div>
            </div>
          </div>

          <div class="row q-col-gutter-lg q-mt-lg">
            <!-- FULL NAME -->

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.name"
                outlined
                label="Full Name"
                :readonly="!editMode"
                :bg-color="editMode ? 'white' : 'grey-1'"
                :rules="[val => !!val || 'Full name is required']"
              >
                <template #prepend>
                  <q-icon name="person" color="primary" />
                </template>
              </q-input>
            </div>

            <!-- EMAIL -->

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.email"
                outlined
                label="Email Address"
                type="email"
                :readonly="!editMode"
                :bg-color="editMode ? 'white' : 'grey-1'"
              >
                <template #prepend>
                  <q-icon name="email" color="primary" />
                </template>
              </q-input>
            </div>

            <!-- MOBILE -->

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.mobile"
                outlined
                label="Mobile Number"
                :readonly="!editMode"
                :bg-color="editMode ? 'white' : 'grey-1'"
                maxlength="10"
              >
                <template #prepend>
                  <q-icon name="phone" color="primary" />
                </template>
              </q-input>
            </div>

            <!-- DATE OF BIRTH -->

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.dateOfBirth"
                outlined
                label="Date of Birth"
                :readonly="!editMode"
                :bg-color="editMode ? 'white' : 'grey-1'"
              >
                <template #prepend>
                  <q-icon name="calendar_month" color="primary" />
                </template>
              </q-input>
            </div>

            <!-- GENDER -->

            <div class="col-12 col-md-6">
              <q-select
                v-model="form.gender"
                outlined
                label="Gender"
                :options="genderOptions"
                :readonly="!editMode"
                :bg-color="editMode ? 'white' : 'grey-1'"
              >
                <template #prepend>
                  <q-icon name="wc" color="primary" />
                </template>
              </q-select>
            </div>

            <!-- AADHAAR -->

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.aadhaar"
                outlined
                label="Aadhaar Card Number"
                :readonly="!editMode"
                :bg-color="editMode ? 'white' : 'grey-1'"
                maxlength="12"
                inputmode="numeric"
                hint="Enter 12 digit Aadhaar number"
              >
                <template #prepend>
                  <q-icon name="badge" color="primary" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <!-- =================================================
         ADDRESS INFORMATION
    ================================================== -->

        <q-card-section class="section-padding">
          <div class="section-heading">
            <div class="section-icon orange-icon">
              <q-icon name="location_on" size="22px" />
            </div>

            <div>
              <div class="section-title"> Address Information </div>

              <div class="section-description">
                Your current residential address
              </div>
            </div>
          </div>

          <div class="row q-col-gutter-lg q-mt-lg">
            <!-- ADDRESS -->

            <div class="col-12">
              <q-input
                v-model="form.address"
                outlined
                type="textarea"
                label="Address"
                :readonly="!editMode"
                :bg-color="editMode ? 'white' : 'grey-1'"
                rows="3"
              >
                <template #prepend>
                  <q-icon name="home" color="primary" />
                </template>
              </q-input>
            </div>

            <!-- STATE -->

            <div class="col-12 col-md-4">
              <q-select
                v-model="form.state"
                outlined
                label="State"
                :options="stateOptions"
                :readonly="!editMode"
                :bg-color="editMode ? 'white' : 'grey-1'"
              >
                <template #prepend>
                  <q-icon name="map" color="primary" />
                </template>
              </q-select>
            </div>

            <!-- CITY -->

            <div class="col-12 col-md-4">
              <q-input
                v-model="form.city"
                outlined
                label="City"
                :readonly="!editMode"
                :bg-color="editMode ? 'white' : 'grey-1'"
              >
                <template #prepend>
                  <q-icon name="location_city" color="primary" />
                </template>
              </q-input>
            </div>

            <!-- PINCODE -->

            <div class="col-12 col-md-4">
              <q-input
                v-model="form.pincode"
                outlined
                label="Pincode"
                :readonly="!editMode"
                :bg-color="editMode ? 'white' : 'grey-1'"
                maxlength="6"
              >
                <template #prepend>
                  <q-icon name="markunread_mailbox" color="primary" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <!-- =================================================
         ACCOUNT INFORMATION
    ================================================== -->

        <q-card-section class="section-padding">
          <div class="section-heading">
            <div class="section-icon purple-icon">
              <q-icon name="manage_accounts" size="22px" />
            </div>

            <div>
              <div class="section-title"> Account Information </div>

              <div class="section-description">
                Account and security information
              </div>
            </div>
          </div>

          <div class="account-info-grid">
            <!-- STATUS -->

            <div class="account-item">
              <div class="account-item-icon green-icon">
                <q-icon name="verified_user" size="25px" />
              </div>

              <div>
                <div class="account-label"> Account Status </div>

                <div class="account-value status-active"> Active </div>
              </div>
            </div>

            <!-- MEMBER SINCE -->

            <div class="account-item">
              <div class="account-item-icon blue-icon">
                <q-icon name="calendar_today" size="25px" />
              </div>

              <div>
                <div class="account-label"> Member Since </div>

                <div class="account-value">
                  {{ form.memberSince }}
                </div>
              </div>
            </div>

            <!-- PASSWORD -->

            <div class="account-item">
              <div class="account-item-icon orange-icon">
                <q-icon name="security" size="25px" />
              </div>

              <div>
                <div class="account-label"> Password </div>

                <div class="account-value"> •••••••• </div>
              </div>
            </div>

            <!-- IDENTITY -->

            <div class="account-item">
              <div class="account-item-icon purple-icon">
                <q-icon name="badge" size="25px" />
              </div>

              <div>
                <div class="account-label"> Identity Verification </div>

                <div class="account-value">
                  {{ form.aadhaar ? 'Provided' : 'Pending' }}
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <!-- =================================================
         SECURITY
    ================================================== -->

        <q-card-section class="section-padding">
          <div class="security-row">
            <div class="security-left">
              <div class="security-icon">
                <q-icon name="lock" size="25px" />
              </div>

              <div>
                <div class="security-title"> Change Password </div>

                <div class="security-description">
                  Update your password regularly to keep your account secure.
                </div>
              </div>
            </div>

            <q-btn
              outline
              color="primary"
              label="Change Password"
              icon="key"
              @click="changePassword"
            />
          </div>
        </q-card-section>

        <q-separator />

        <!-- =================================================
         LOGOUT
    ================================================== -->

        <q-card-section class="section-padding">
          <div class="logout-row">
            <div class="logout-left">
              <div class="logout-icon">
                <q-icon name="logout" size="24px" />
              </div>

              <div>
                <div class="logout-title"> Logout </div>

                <div class="logout-description">
                  Sign out from your BatohiDrive account.
                </div>
              </div>
            </div>

            <q-btn
              outline
              color="negative"
              icon="logout"
              label="Logout"
              @click="logout"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- =====================================================
     CHANGE PASSWORD DIALOG
====================================================== -->

    <q-dialog v-model="passwordDialog">
      <q-card class="password-dialog">
        <q-card-section class="dialog-header">
          <div>
            <div class="dialog-title"> Change Password </div>

            <div class="dialog-description">
              Create a strong password for your account.
            </div>
          </div>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-lg">
          <q-input
            v-model="passwordForm.currentPassword"
            outlined
            label="Current Password"
            type="password"
            class="q-mb-md"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <q-input
            v-model="passwordForm.newPassword"
            outlined
            label="New Password"
            type="password"
            class="q-mb-md"
          >
            <template #prepend>
              <q-icon name="lock_reset" />
            </template>
          </q-input>

          <q-input
            v-model="passwordForm.confirmPassword"
            outlined
            label="Confirm New Password"
            type="password"
          >
            <template #prepend>
              <q-icon name="verified" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-lg">
          <q-btn flat label="Cancel" color="grey-7" v-close-popup />

          <q-btn
            unelevated
            color="primary"
            label="Update Password"
            icon="lock_reset"
            @click="updatePassword"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref , onMounted, computed } from 'vue'

import { useRouter } from 'vue-router'

import { Notify, Dialog } from 'quasar'
import api, { imagesBaseUrl } from '@/config/api'

const router = useRouter()

// =====================================================
// PROFILE IMAGE
// =====================================================

const fileInput = ref(null)



const openFilePicker = () => {
  fileInput.value?.click()
}


const form = ref({
  name: 'Customer Name',

  email: 'customer@example.com',

  mobile: '+91 9876543210',

  dateOfBirth: '',

  gender: '',

  aadhaar: '',

  address: '',

  state: '',

  city: '',

  pincode: '',

  memberSince: 'August 2026',
  profileImages: ''
})

const profileImagePreview = ref(null)

const handleImageUpload = (event) => {
  const file = event.target.files?.[0]

  if (!file) {
    return
  }

  if (!file.type.startsWith('image/')) {
    Notify.create({
      type: 'negative',
      message: 'Please select a valid image file'
    })
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    Notify.create({
      type: 'negative',
      message: 'Image size should not exceed 5 MB'
    })
    return
  }

  // Store file in form
  form.value.profileImage = file

  // Create preview URL
  profileImagePreview.value = URL.createObjectURL(file)
}

// =====================================================
// PROFILE FORM
// =====================================================



// =====================================================
// GENDER OPTIONS
// =====================================================

const genderOptions = [
  'Male',

  'Female',

  'Other'
]

// =====================================================
// STATE OPTIONS
// =====================================================

const stateOptions = [
  'Andhra Pradesh',

  'Arunachal Pradesh',

  'Assam',

  'Bihar',

  'Chhattisgarh',

  'Goa',

  'Gujarat',

  'Haryana',

  'Himachal Pradesh',

  'Jharkhand',

  'Karnataka',

  'Kerala',

  'Madhya Pradesh',

  'Maharashtra',

  'Manipur',

  'Meghalaya',

  'Mizoram',

  'Nagaland',

  'Odisha',

  'Punjab',

  'Rajasthan',

  'Sikkim',

  'Tamil Nadu',

  'Telangana',

  'Tripura',

  'Uttar Pradesh',

  'Uttarakhand',

  'West Bengal'
]

// ===============================
// Ref to hold selected file or local preview URL
const selectedImageFile = ref(null)
const selectedImagePreview = ref(null)


// Computed property handles precedence:
// 1. Newly selected file preview (Blob URL)
// 2. Server image URL (if filename exists in form state)
// 3. Default fallback avatar
const profileImage = computed(() => {
  if (selectedImagePreview.value) {
    return selectedImagePreview.value
  }

  if (form.value.profileImages) {
    // Generates: https://api.batohidriver.com/uploads/images/users/{user_id}/profile/{filename}
    return `${imagesBaseUrl}/images/users/${form.value.userId}/profile/${form.value.profileImages}`
  }

  return ''
})

// Fetch Profile from API
const fetchProfile = async () => {
  try {
    const response = await api.get('/users/profile')
    const data = response.data?.data || response.data

    if (data) {
      form.value = {
        ...form.value,
        userId: data.user_id,
        name: [data.first_name, data.last_name].filter(Boolean).join(' ') || data.user?.username || '',
        email: data.email || data.user?.email || '',
        mobile: data.mobile_number || data.user?.mobile_no || '',
        gender: data.gender || form.value.gender,
        dateOfBirth: data.date_of_birth || form.value.dateOfBirth,
        address: data.address || form.value.address,
        city: data.city || form.value.city,
        state: data.state || form.value.state,
        pincode: data.pincode || form.value.pincode,
        country: data.country || form.value.country || 'India',
        alternateMobile: data.alternate_mobile || form.value.alternateMobile || '',
        emergencyContactName: data.emergency_contact_name || form.value.emergencyContactName || '',
        emergencyContactNumber: data.emergency_contact_number || form.value.emergencyContactNumber || '',
        preferredLanguage: data.preferred_language || form.value.preferredLanguage || 'English',
        profileImages: data.profile_image || ''
      }
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
  }
}

  onMounted(()=>{
    fetchProfile()
  })
//=====================GET PROFILE=================


// =====================================================
// EDIT MODE
// =====================================================

const editMode = ref(false)

const saving = ref(false)

const oldForm = ref(null)

const startEdit = () => {
  oldForm.value = JSON.parse(JSON.stringify(form.value))

  editMode.value = true
}

const cancelEdit = () => {
  if (oldForm.value) {
    form.value = JSON.parse(JSON.stringify(oldForm.value))
  }

  editMode.value = false
}

// =====================================================
// SAVE PROFILE
// =====================================================



const saveProfile = async () => {
  try {
    saving.value = true

    // Create FormData object
    const formData = new FormData()

    // Split name into firstName and lastName if stored as a single string
    const nameParts = (form.value.name || '').trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Append text fields expected by Node.js backend
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('gender', form.value.gender || '')
    formData.append('dateOfBirth', form.value.dateOfBirth || '')
    formData.append('address', form.value.address || '')
    formData.append('city', form.value.city || '')
    formData.append('state', form.value.state || '')
    formData.append('pincode', form.value.pincode || '')

    // Append file if selected
    if (form.value.profileImage instanceof File) {
      formData.append('profileImage', form.value.profileImage)
    }

    // Call API (Axios automatically handles multipart/form-data with FormData)
    const response = await api.post('/users/profile', formData)

    Notify.create({
      type: 'positive',
      message: response.data.message || 'Profile saved successfully!',
      position: 'top'
    })

    // Refresh profile data if needed
    if (typeof fetchProfile === 'function') {
      await fetchProfile()
    }
  } catch (error) {
    console.error('Error saving profile:', error)
    Notify.create({
      type: 'negative',
      message: error.response?.data?.message || 'Failed to save profile',
      position: 'top'
    })
  } finally {
    saving.value = false
  }
}

// =====================================================
// CHANGE PASSWORD
// =====================================================

const passwordDialog = ref(false)

const passwordForm = ref({
  currentPassword: '',

  newPassword: '',

  confirmPassword: ''
})

const changePassword = () => {
  passwordDialog.value = true
}

const updatePassword = async () => {
  if (!passwordForm.value.currentPassword) {
    Notify.create({
      type: 'negative',

      message: 'Please enter current password'
    })

    return
  }

  if (!passwordForm.value.newPassword) {
    Notify.create({
      type: 'negative',

      message: 'Please enter new password'
    })

    return
  }

  if (passwordForm.value.newPassword.length < 6) {
    Notify.create({
      type: 'negative',

      message: 'New password must be at least 6 characters'
    })

    return
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    Notify.create({
      type: 'negative',

      message: 'Passwords do not match'
    })

    return
  }

  try {
    /*
      API CALL WILL COME HERE
    */

    await new Promise(resolve => {
      setTimeout(resolve, 700)
    })

    Notify.create({
      type: 'positive',

      message: 'Password updated successfully'
    })

    passwordDialog.value = false

    passwordForm.value = {
      currentPassword: '',

      newPassword: '',

      confirmPassword: ''
    }
  } catch (error) {
    console.error(error)

    Notify.create({
      type: 'negative',

      message: 'Unable to change password'
    })
  }
}

// =====================================================
// LOGOUT
// =====================================================

const logout = () => {
  Dialog.create({
    title: 'Logout',

    message: 'Are you sure you want to logout from BatohiDrive?',

    cancel: {
      label: 'Cancel',

      flat: true
    },

    ok: {
      label: 'Logout',

      color: 'negative',

      unelevated: true
    },

    persistent: true
  }).onOk(() => {
    localStorage.removeItem('token')

    localStorage.removeItem('user')

    router.push('/')
  })
}

// =====================================================
// BACK TO DASHBOARD
// =====================================================

const goBack = () => {
  router.push('/customer/dashboard')
}
</script>

<style scoped>
/* =====================================================
   PAGE
===================================================== */

.profile-page {
  min-height: 100vh;

  padding: 25px;

  background: linear-gradient(135deg, #f5f7fb 0%, #eef3ff 100%);
}

/* =====================================================
   HEADER
===================================================== */

.page-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;
}

.page-title {
  font-size: 28px;

  font-weight: 750;

  color: #172033;
}

.page-subtitle {
  margin-top: 5px;

  color: #6b7280;

  font-size: 14px;
}

/* =====================================================
   CONTAINER
===================================================== */

.profile-container {
  max-width: 1150px;

  margin: auto;
}

/* =====================================================
   PROFILE CARD
===================================================== */

.profile-card {
  border-radius: 20px;

  overflow: hidden;

  background: white;

  box-shadow: 0 10px 40px rgba(31, 41, 55, 0.08);
}

/* =====================================================
   HERO
===================================================== */

.profile-hero {
  position: relative;

  overflow: hidden;
}

.hero-background {
  position: absolute;

  inset: 0;

  height: 125px;

  background: linear-gradient(135deg, #f3e0a4, #fae779, #f7c94d);
}

.profile-top {
  position: relative;

  z-index: 2;

  display: flex;

  align-items: flex-end;

  gap: 25px;

  padding: 55px 30px 30px;
}

/* =====================================================
   PROFILE IMAGE
===================================================== */

.profile-image-wrapper {
  position: relative;

  width: 120px;

  height: 120px;

  flex-shrink: 0;
}

.profile-image {
  width: 120px;

  height: 120px;

  object-fit: cover;

  border-radius: 50%;

  border: 5px solid white;

  background: #f1f5f9;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);
}

.camera-button {
  position: absolute;

  right: 2px;

  bottom: 3px;

  width: 38px;

  height: 38px;
}

.hidden-file {
  display: none;
}

/* =====================================================
   BASIC PROFILE
===================================================== */

.profile-basic {
  flex: 1;

  padding-bottom: 4px;
}

.profile-name {
  font-size: 25px;

  font-weight: 750;

  color: #172033;
}

.profile-email,
.profile-mobile {
  display: flex;

  align-items: center;

  color: #070b13;

  font-size: 13px;

  margin-top: 5px;
}

.profile-mobile {
  margin-top: 3px;
}

.active-badge {
  margin-top: 9px;

  padding: 5px 9px;

  border-radius: 20px;
}

.profile-action {
  margin-left: auto;

  padding-bottom: 5px;
}

.edit-actions {
  display: flex;

  gap: 8px;
}

/* =====================================================
   SECTION
===================================================== */

.section-padding {
  padding: 28px 30px;
}

.section-heading {
  display: flex;

  align-items: center;

  gap: 13px;
}

.section-icon {
  width: 44px;

  height: 44px;

  border-radius: 12px;

  display: flex;

  align-items: center;

  justify-content: center;
}

.blue-icon {
  background: #eaf2ff;

  color: #1976d2;
}

.orange-icon {
  background: #fff4e5;

  color: #f57c00;
}

.purple-icon {
  background: #f2eafe;

  color: #7e57c2;
}

.green-icon {
  background: #e9f9ef;

  color: #16a34a;
}

.section-title {
  font-size: 18px;

  font-weight: 700;

  color: #202938;
}

.section-description {
  color: #8991a1;

  font-size: 13px;

  margin-top: 3px;
}

/* =====================================================
   INPUTS
===================================================== */

.profile-card :deep(.q-field--outlined .q-field__control) {
  border-radius: 10px;
}

.profile-card :deep(.q-field--outlined.q-field--readonly .q-field__control) {
  background: #f8fafc;
}

/* =====================================================
   ACCOUNT GRID
===================================================== */

.account-info-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 15px;

  margin-top: 25px;
}

.account-item {
  display: flex;

  align-items: center;

  gap: 13px;

  padding: 17px;

  border-radius: 13px;

  background: #f8fafc;

  border: 1px solid #edf0f5;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.account-item:hover {
  transform: translateY(-2px);

  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
}

.account-item-icon {
  width: 45px;

  height: 45px;

  border-radius: 11px;

  display: flex;

  align-items: center;

  justify-content: center;
}

.account-label {
  font-size: 11px;

  color: #8991a1;
}

.account-value {
  font-size: 14px;

  font-weight: 650;

  color: #293241;

  margin-top: 3px;
}

.status-active {
  color: #16a34a;
}

/* =====================================================
   SECURITY
===================================================== */

.security-row {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;
}

.security-left {
  display: flex;

  align-items: center;

  gap: 15px;
}

.security-icon {
  width: 50px;

  height: 50px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 13px;

  background: #fff4e5;

  color: #f57c00;
}

.security-title {
  font-size: 16px;

  font-weight: 650;

  color: #252b35;
}

.security-description {
  font-size: 13px;

  color: #7b8190;

  margin-top: 4px;
}

/* =====================================================
   LOGOUT
===================================================== */

.logout-row {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;
}

.logout-left {
  display: flex;

  align-items: center;

  gap: 15px;
}

.logout-icon {
  width: 48px;

  height: 48px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 12px;

  background: #fff0f0;

  color: #d32f2f;
}

.logout-title {
  font-size: 16px;

  font-weight: 650;
}

.logout-description {
  color: #7b8190;

  font-size: 13px;

  margin-top: 4px;
}

/* =====================================================
   PASSWORD DIALOG
===================================================== */

.password-dialog {
  width: 480px;

  max-width: 95vw;

  border-radius: 18px;

  overflow: hidden;
}

.dialog-header {
  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  padding: 22px 24px;
}

.dialog-title {
  font-size: 21px;

  font-weight: 750;

  color: #172033;
}

.dialog-description {
  color: #7b8190;

  font-size: 13px;

  margin-top: 5px;
}

/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 1000px) {
  .account-info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .profile-page {
    padding: 15px;
  }

  .page-header {
    align-items: flex-start;

    gap: 15px;
  }

  .page-header .q-btn {
    display: none;
  }

  .page-title {
    font-size: 23px;
  }

  .profile-top {
    flex-direction: column;

    align-items: center;

    text-align: center;

    padding-top: 65px;
  }

  .profile-basic {
    width: 100%;
  }

  .profile-email,
  .profile-mobile {
    justify-content: center;
  }

  .profile-action {
    margin-left: 0;

    padding-bottom: 0;
  }

  .section-padding {
    padding: 22px 18px;
  }

  .account-info-grid {
    grid-template-columns: 1fr;
  }

  .security-row,
  .logout-row {
    flex-direction: column;

    align-items: flex-start;
  }

  .security-row .q-btn,
  .logout-row .q-btn {
    width: 100%;
  }
}

@media (max-width: 500px) {
  .profile-image-wrapper,
  .profile-image {
    width: 105px;

    height: 105px;
  }

  .profile-name {
    font-size: 21px;
  }

  .edit-actions {
    width: 100%;
  }

  .edit-actions .q-btn {
    flex: 1;
  }
}
</style>
