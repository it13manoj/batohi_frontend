<template>
  <q-page class="admin-profile-page q-pa-md">

    <!-- ================= HEADER ================= -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          My Profile
        </div>

        <div class="text-grey-7">
          Manage your administrator profile and account
        </div>
      </div>

      <q-btn
        color="primary"
        icon="save"
        label="Save Changes"
        unelevated
        :loading="saving"
        @click="updateProfile"
      />

    </div>


    <!-- ================= PROFILE CONTENT ================= -->
    <div class="row q-col-gutter-lg">

      <!-- ================= LEFT PROFILE CARD ================= -->
      <div class="col-12 col-md-4">

        <q-card class="profile-card">

          <q-card-section class="text-center">

            <!-- PROFILE IMAGE -->
            <div class="profile-image-wrapper">

              <q-avatar
                size="120px"
                class="profile-avatar"
              >

                <img
                  v-if="profilePreview"
                  :src="profilePreview"
                  alt="Admin Profile"
                />

                <span
                  v-else
                  class="profile-initial"
                >
                  {{ profileInitial }}
                </span>

              </q-avatar>

              <!-- CAMERA BUTTON -->
              <q-btn
                round
                dense
                color="primary"
                icon="camera_alt"
                class="profile-camera-btn"
                @click="openImagePicker"
              />

            </div>

            <!-- HIDDEN FILE INPUT -->
            <input
              ref="imageInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleProfileImage"
            />


            <div class="text-h6 text-weight-bold q-mt-md">
              {{ profile.name }}
            </div>

            <div class="text-grey-6">
              {{ profile.role }}
            </div>


            <!-- STATUS -->
            <q-badge
              color="positive"
              class="q-mt-md"
              label="Active"
            />

          </q-card-section>


          <q-separator />


          <!-- PROFILE SUMMARY -->
          <q-card-section>

            <div class="profile-info-row">

              <q-icon
                name="email"
                color="primary"
              />

              <div>
                <div class="text-caption text-grey-6">
                  Email
                </div>

                <div>
                  {{ profile.email }}
                </div>
              </div>

            </div>


            <div class="profile-info-row">

              <q-icon
                name="phone"
                color="primary"
              />

              <div>
                <div class="text-caption text-grey-6">
                  Mobile
                </div>

                <div>
                  {{ profile.mobile }}
                </div>
              </div>

            </div>


            <div class="profile-info-row">

              <q-icon
                name="calendar_today"
                color="primary"
              />

              <div>
                <div class="text-caption text-grey-6">
                  Joined
                </div>

                <div>
                  {{ profile.joinedDate }}
                </div>
              </div>

            </div>


            <div class="profile-info-row">

              <q-icon
                name="login"
                color="primary"
              />

              <div>
                <div class="text-caption text-grey-6">
                  Last Login
                </div>

                <div>
                  {{ profile.lastLogin }}
                </div>
              </div>

            </div>

          </q-card-section>

        </q-card>


        <!-- ================= SECURITY STATUS ================= -->
        <q-card class="security-card q-mt-lg">

          <q-card-section>

            <div class="row items-center">

              <q-icon
                name="security"
                color="primary"
                size="28px"
              />

              <div class="q-ml-md">

                <div class="text-subtitle1 text-weight-bold">
                  Account Security
                </div>

                <div class="text-caption text-grey-6">
                  Your account security status
                </div>

              </div>

            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div class="security-row">

              <span>
                Email Verified
              </span>

              <q-icon
                name="check_circle"
                color="positive"
              />

            </div>


            <div class="security-row">

              <span>
                Mobile Verified
              </span>

              <q-icon
                name="check_circle"
                color="positive"
              />

            </div>


            <div class="security-row">

              <span>
                Two Factor Authentication
              </span>

              <q-toggle
                v-model="profile.twoFactorEnabled"
                color="positive"
                @update:model-value="updateTwoFactor"
              />

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- ================= RIGHT CONTENT ================= -->
      <div class="col-12 col-md-8">


        <!-- ================= PERSONAL INFORMATION ================= -->
        <q-card class="profile-card">

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Personal Information
            </div>

            <div class="text-caption text-grey-6">
              Update your personal and contact information
            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div class="row q-col-gutter-lg">

              <!-- NAME -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="profile.name"
                  outlined
                  label="Full Name"
                  :rules="[
                    val =>
                      !!val ||
                      'Name is required'
                  ]"
                >

                  <template #prepend>

                    <q-icon name="person" />

                  </template>

                </q-input>

              </div>


              <!-- EMAIL -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="profile.email"
                  outlined
                  type="email"
                  label="Email Address"
                >

                  <template #prepend>

                    <q-icon name="email" />

                  </template>

                </q-input>

              </div>


              <!-- MOBILE -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="profile.mobile"
                  outlined
                  label="Mobile Number"
                >

                  <template #prepend>

                    <q-icon name="phone" />

                  </template>

                </q-input>

              </div>


              <!-- ROLE -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="profile.role"
                  outlined
                  label="Role"
                  readonly
                >

                  <template #prepend>

                    <q-icon name="admin_panel_settings" />

                  </template>

                </q-input>

              </div>


              <!-- GENDER -->
              <div class="col-12 col-md-6">

                <q-select
                  v-model="profile.gender"
                  outlined
                  label="Gender"
                  :options="genderOptions"
                  emit-value
                  map-options
                >

                  <template #prepend>

                    <q-icon name="wc" />

                  </template>

                </q-select>

              </div>


              <!-- DATE OF BIRTH -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="profile.dateOfBirth"
                  outlined
                  type="date"
                  label="Date of Birth"
                >

                  <template #prepend>

                    <q-icon name="cake" />

                  </template>

                </q-input>

              </div>


              <!-- ADDRESS -->
              <div class="col-12">

                <q-input
                  v-model="profile.address"
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

        </q-card>


        <!-- ================= CHANGE PASSWORD ================= -->
        <q-card class="profile-card q-mt-lg">

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Change Password
            </div>

            <div class="text-caption text-grey-6">
              Keep your administrator account secure
            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div class="row q-col-gutter-lg">

              <!-- CURRENT PASSWORD -->
              <div class="col-12">

                <q-input
                  v-model="password.current"
                  outlined
                  label="Current Password"
                  :type="
                    showCurrentPassword
                      ? 'text'
                      : 'password'
                  "
                >

                  <template #prepend>

                    <q-icon name="lock" />

                  </template>

                  <template #append>

                    <q-icon
                      :name="
                        showCurrentPassword
                          ? 'visibility_off'
                          : 'visibility'
                      "
                      class="cursor-pointer"
                      @click="
                        showCurrentPassword =
                          !showCurrentPassword
                      "
                    />

                  </template>

                </q-input>

              </div>


              <!-- NEW PASSWORD -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="password.newPassword"
                  outlined
                  label="New Password"
                  :type="
                    showNewPassword
                      ? 'text'
                      : 'password'
                  "
                >

                  <template #prepend>

                    <q-icon name="lock_reset" />

                  </template>

                  <template #append>

                    <q-icon
                      :name="
                        showNewPassword
                          ? 'visibility_off'
                          : 'visibility'
                      "
                      class="cursor-pointer"
                      @click="
                        showNewPassword =
                          !showNewPassword
                      "
                    />

                  </template>

                </q-input>

              </div>


              <!-- CONFIRM PASSWORD -->
              <div class="col-12 col-md-6">

                <q-input
                  v-model="password.confirmPassword"
                  outlined
                  label="Confirm New Password"
                  :type="
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  "
                >

                  <template #prepend>

                    <q-icon name="lock_reset" />

                  </template>

                  <template #append>

                    <q-icon
                      :name="
                        showConfirmPassword
                          ? 'visibility_off'
                          : 'visibility'
                      "
                      class="cursor-pointer"
                      @click="
                        showConfirmPassword =
                          !showConfirmPassword
                      "
                    />

                  </template>

                </q-input>

              </div>

            </div>


            <q-btn
              color="primary"
              outline
              icon="lock"
              label="Change Password"
              class="q-mt-md"
              :loading="changingPassword"
              @click="changePassword"
            />

          </q-card-section>

        </q-card>


        <!-- ================= LOGIN ACTIVITY ================= -->
        <q-card class="profile-card q-mt-lg">

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              Recent Login Activity
            </div>

            <div class="text-caption text-grey-6">
              Recent login sessions for your account
            </div>

          </q-card-section>


          <q-separator />


          <q-card-section>

            <div
              v-for="login in loginActivity"
              :key="login.id"
              class="login-item"
            >

              <q-avatar
                color="blue-1"
                text-color="primary"
                size="42px"
              >

                <q-icon
                  :name="
                    login.device === 'Mobile'
                      ? 'phone_android'
                      : 'computer'
                  "
                />

              </q-avatar>


              <div class="q-ml-md">

                <div class="text-weight-bold">
                  {{ login.device }}
                </div>

                <div class="text-caption text-grey-6">
                  {{ login.browser }}
                </div>

                <div class="text-caption text-grey-6">
                  {{ login.location }}
                </div>

              </div>


              <q-space />


              <div class="text-right">

                <div class="text-caption">
                  {{ login.date }}
                </div>

                <q-badge
                  :color="
                    login.current
                      ? 'positive'
                      : 'grey'
                  "
                  :label="
                    login.current
                      ? 'Current Session'
                      : 'Logged Out'
                  "
                />

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>

  </q-page>
</template>


<script setup>

import {
  ref,
  reactive,
  computed,
  onMounted
} from 'vue'

import {
  useQuasar
} from 'quasar'

import axios from 'axios'


const $q = useQuasar()


// =====================================================
// STATE
// =====================================================

const saving = ref(false)

const changingPassword = ref(false)

const imageInput = ref(null)

const profilePreview = ref('')


// =====================================================
// PASSWORD VISIBILITY
// =====================================================

const showCurrentPassword = ref(false)

const showNewPassword = ref(false)

const showConfirmPassword = ref(false)


// =====================================================
// PROFILE DATA
// =====================================================

const profile = reactive({

  name: 'Admin',

  email: 'admin@batohidrive.com',

  mobile: '+91 9876543210',

  role: 'Super Admin',

  gender: 'male',

  dateOfBirth: '',

  address: '',

  joinedDate: '01 January 2026',

  lastLogin: '25 August 2026, 02:10 PM',

  twoFactorEnabled: false

})


// =====================================================
// PASSWORD
// =====================================================

const password = reactive({

  current: '',

  newPassword: '',

  confirmPassword: ''

})


// =====================================================
// OPTIONS
// =====================================================

const genderOptions = [

  {
    label: 'Male',
    value: 'male'
  },

  {
    label: 'Female',
    value: 'female'
  },

  {
    label: 'Other',
    value: 'other'
  }

]


// =====================================================
// PROFILE INITIAL
// =====================================================

const profileInitial = computed(() => {

  if (!profile.name) {
    return 'A'
  }

  return profile.name
    .trim()
    .charAt(0)
    .toUpperCase()

})


// =====================================================
// LOGIN ACTIVITY
// =====================================================

const loginActivity = ref([

  {
    id: 1,

    device: 'Desktop',

    browser: 'Chrome on Windows',

    location: 'India',

    date: '25 Aug 2026, 02:10 PM',

    current: true

  },

  {
    id: 2,

    device: 'Mobile',

    browser: 'Chrome on Android',

    location: 'India',

    date: '24 Aug 2026, 09:45 AM',

    current: false

  },

  {
    id: 3,

    device: 'Desktop',

    browser: 'Chrome on Windows',

    location: 'India',

    date: '22 Aug 2026, 11:30 AM',

    current: false

  }

])


// =====================================================
// IMAGE PICKER
// =====================================================

function openImagePicker() {

  imageInput.value?.click()

}


// =====================================================
// PROFILE IMAGE
// =====================================================

function handleProfileImage(event) {

  const file =
    event.target.files?.[0]


  if (!file) {
    return
  }


  // Check file size

  if (
    file.size >
    2 * 1024 * 1024
  ) {

    $q.notify({

      type: 'negative',

      message:
        'Profile image must be less than 2MB'

    })

    return

  }


  // Check file type

  if (
    !file.type.startsWith('image/')
  ) {

    $q.notify({

      type: 'negative',

      message:
        'Please select a valid image'

    })

    return

  }


  profilePreview.value =
    URL.createObjectURL(file)

}


// =====================================================
// LOAD PROFILE
// =====================================================

async function loadProfile() {

  try {

    /*
     * =================================================
     * CONNECT YOUR API HERE
     * =================================================
     *
     * const response = await axios.get(
     *   '/admin/profile'
     * )
     *
     * Object.assign(
     *   profile,
     *   response.data.data
     * )
     *
     * profilePreview.value =
     *   response.data.data.profileImage
     */


  } catch (error) {

    console.error(
      'Load Profile Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        'Unable to load profile'

    })

  }

}


// =====================================================
// UPDATE PROFILE
// =====================================================

async function updateProfile() {

  if (!profile.name.trim()) {

    $q.notify({

      type: 'negative',

      message:
        'Please enter your name'

    })

    return

  }


  if (!profile.email.trim()) {

    $q.notify({

      type: 'negative',

      message:
        'Please enter your email'

    })

    return

  }


  saving.value = true


  try {

    /*
     * =================================================
     * JSON API EXAMPLE
     * =================================================
     *
     * await axios.put(
     *   '/admin/profile',
     *   {
     *     name: profile.name,
     *     email: profile.email,
     *     mobile: profile.mobile,
     *     gender: profile.gender,
     *     dateOfBirth:
     *       profile.dateOfBirth,
     *     address:
     *       profile.address
     *   }
     * )
     */


    /*
     * =================================================
     * FOR IMAGE + DATA USE FORMDATA
     * =================================================
     *
     * const formData = new FormData()
     *
     * formData.append(
     *   'name',
     *   profile.name
     * )
     *
     * formData.append(
     *   'email',
     *   profile.email
     * )
     *
     * formData.append(
     *   'mobile',
     *   profile.mobile
     * )
     *
     * formData.append(
     *   'gender',
     *   profile.gender
     * )
     *
     * formData.append(
     *   'dateOfBirth',
     *   profile.dateOfBirth
     * )
     *
     * formData.append(
     *   'address',
     *   profile.address
     * )
     *
     * if (
     *   imageInput.value?.files?.[0]
     * ) {
     *
     *   formData.append(
     *     'profileImage',
     *     imageInput.value.files[0]
     *   )
     *
     * }
     *
     *
     * await axios.put(
     *   '/admin/profile',
     *   formData
     * )
     */


    $q.notify({

      type: 'positive',

      message:
        'Profile updated successfully'

    })

  } catch (error) {

    console.error(
      'Update Profile Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        'Unable to update profile'

    })

  } finally {

    saving.value = false

  }

}


// =====================================================
// CHANGE PASSWORD
// =====================================================

async function changePassword() {

  if (
    !password.current ||
    !password.newPassword ||
    !password.confirmPassword
  ) {

    $q.notify({

      type: 'negative',

      message:
        'Please fill all password fields'

    })

    return

  }


  if (
    password.newPassword.length < 8
  ) {

    $q.notify({

      type: 'negative',

      message:
        'New password must contain at least 8 characters'

    })

    return

  }


  if (
    password.newPassword !==
    password.confirmPassword
  ) {

    $q.notify({

      type: 'negative',

      message:
        'Passwords do not match'

    })

    return

  }


  changingPassword.value = true


  try {

    /*
     * =================================================
     * PASSWORD API
     * =================================================
     *
     * await axios.post(
     *   '/admin/change-password',
     *   {
     *     currentPassword:
     *       password.current,
     *
     *     newPassword:
     *       password.newPassword
     *   }
     * )
     */


    password.current = ''

    password.newPassword = ''

    password.confirmPassword = ''


    $q.notify({

      type: 'positive',

      message:
        'Password changed successfully'

    })

  } catch (error) {

    console.error(
      'Change Password Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        'Unable to change password'

    })

  } finally {

    changingPassword.value = false

  }

}


// =====================================================
// TWO FACTOR
// =====================================================

async function updateTwoFactor(value) {

  try {

    /*
     * =================================================
     * API
     * =================================================
     *
     * await axios.put(
     *   '/admin/profile/two-factor',
     *   {
     *     enabled: value
     *   }
     * )
     */


    $q.notify({

      type: 'positive',

      message: value
        ? 'Two-factor authentication enabled'
        : 'Two-factor authentication disabled'

    })

  } catch (error) {

    profile.twoFactorEnabled =
      !value


    $q.notify({

      type: 'negative',

      message:
        'Unable to update security settings'

    })

  }

}


// =====================================================
// MOUNT
// =====================================================

onMounted(() => {

  loadProfile()

})

</script>


<style scoped>

.admin-profile-page {
  background: #f5f7fb;
  min-height: 100%;
}


/* =========================================
   PROFILE CARD
========================================= */

.profile-card,
.security-card {

  border-radius: 12px;

  border: 1px solid #e7eaf0;

  box-shadow:
    0 2px 10px
    rgba(0, 0, 0, 0.04);

}


/* =========================================
   PROFILE IMAGE
========================================= */

.profile-image-wrapper {

  width: 120px;

  height: 120px;

  margin: 0 auto;

  position: relative;

}


.profile-avatar {

  width: 120px;

  height: 120px;

  background: #eaf3ff;

  color: #1976d2;

  border: 4px solid #ffffff;

  box-shadow:
    0 3px 12px
    rgba(0, 0, 0, 0.12);

}


.profile-avatar img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


.profile-initial {

  font-size: 42px;

  font-weight: 700;

}


/* =========================================
   CAMERA BUTTON
========================================= */

.profile-camera-btn {

  position: absolute;

  right: -3px;

  bottom: -3px;

  border: 3px solid white;

}


/* =========================================
   PROFILE INFO
========================================= */

.profile-info-row {

  display: flex;

  align-items: center;

  gap: 14px;

  padding: 12px 0;

}


.profile-info-row + .profile-info-row {

  border-top: 1px solid #eeeeee;

}


/* =========================================
   SECURITY
========================================= */

.security-row {

  display: flex;

  align-items: center;

  justify-content: space-between;

  min-height: 48px;

}


.security-row + .security-row {

  border-top: 1px solid #eeeeee;

}


/* =========================================
   LOGIN ACTIVITY
========================================= */

.login-item {

  display: flex;

  align-items: center;

  padding: 14px 0;

}


.login-item + .login-item {

  border-top: 1px solid #eeeeee;

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 768px) {

  .admin-profile-page {

    padding: 12px !important;

  }


  .login-item {

    align-items: flex-start;

  }

}

</style>
